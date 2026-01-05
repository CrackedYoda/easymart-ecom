import User from "../../models/user.js";
import Customers from "../../models/customer.js";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import { getDeviceInfo } from "../../helpers/getdevice.js";
import { events } from "../../shared/events.js";
import { eventEmitter } from "../../services/eventService.js";
import { getOrSetCachedData, deleteCachedData } from "../../helpers/cacheData.js";


export const signUp = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      userEmail: req.validatedData.userEmail.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        field: "userEmail",
        message: "User with this email already exists",
      });
    }
    const userPhone = await User.findOne({
      userPhone: req.validatedData.userPhone,
    });
    if (userPhone) {
      return res.status(400).json({
        success: false,
        field: "userPhone",
        message: "User with this phone number already exists",
      });
    }
    const customerPhone = await Customers.findOne({
      phone: req.validatedData.userPhone,
    });
    if (customerPhone) {
      return res
        .status(400)
        .send("Phone number already associated with a customer");
    }
    // Hash password

    const newUser = await User.create({
      userName: req.validatedData.userName,
      userEmail: req.validatedData.userEmail,
      userPassword: req.validatedData.userPassword,
      userPhone: req.validatedData.userPhone,
      role: req.validatedData.role.toUpperCase() || "USER",
    });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getOrSetCachedData("users", User.find().select("-userPassword"), 20);
    if (!users) {
      return res.status(404).send("Users not found");
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const users = await getOrSetCachedData(`user:${req.user.id}`, User.findById(req.user.id).select("-userPassword"), 20);
    if (!users) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateUserPassword = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(404).send("User not found");
    }
    const newPassword = req.validatedData.userPassword;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    currentUser.set({ userPassword: hashedPassword });
    await currentUser.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    await deleteCachedData(`user:${req.params.id}`);
    await deleteCachedData("users");

    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: (req.validatedData.userEmail.toLowerCase()) });

    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          field: "userEmail",
          message: "Invalid email or password",
        });
    }

    // Compare passwords
    const validPassword = await user.comparePassword(
      req.validatedData.userPassword
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({
          success: false,
          field: "userPassword",
          message: "Invalid email or password",
        });
    }
    const rememberMe = req.validatedData.rememberMe;
    if (user.isSuspended) {
      return res.status(403).json({
        success: false,
        message: "Account suspended. Please contact support.",
      });     
    }

    const { device, os, browser } = await getDeviceInfo(req);
    // Jwt sign and send token in cookie
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      config.get("ACCESS_SECRET"),
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign({ id: user._id, role: user.role}, config.get("REFRESH_SECRET"), {expiresIn: rememberMe? "7d": "1d"})

    user.refreshToken.push({token: refreshToken, deviceInfo: {device, os, browser}});
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
    eventEmitter(events.USER_LOGGED_IN, user)
    console.log (config.get("ACCESS_SECRET" ))
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    const decoded = jwt.verify(token, config.get("REFRESH_SECRET"));
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send("User not found.");
    }

    const tokenIndex = user.refreshToken.findIndex((t) => t.token === token);

    if (tokenIndex === -1) {
      return res.status(401).send("Invalid refresh token.");
    }
    const { deviceInfo } = user.refreshToken[tokenIndex];
    user.refreshToken.splice(tokenIndex, 1);
    await user.save();

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      config.get("ACCESS_SECRET"),
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign({ id: user._id, role: user.role}, config.get("REFRESH_SECRET"), {expiresIn: "7d"});
    user.refreshToken.push({ token: newRefreshToken, deviceInfo });
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(400).send("No refresh token provided.");
    }

    const decoded = jwt.verify(token, config.get("REFRESH_SECRET"));
    const user = await User.findById(decoded.id);
    if (user) {
      user.refreshToken = user.refreshToken.filter((t) => t.token !== token);
      await user.save();
    } 
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.send("Logged out successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
