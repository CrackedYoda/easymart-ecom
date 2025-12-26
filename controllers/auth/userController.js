import User from "../../models/user.js";
import Customers from "../../models/customer.js";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
export const addUser = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      userEmail: req.validatedData.userEmail,
    });

    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }
    const userPhone = await User.findOne({
      userPhone: req.validatedData.userPhone,
    });
    if (userPhone) {
      return res.status(400).send("User with this phone number already exists");
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
      role: req.validatedData.role || 'user',
    });

    
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findById(req.user.id).select("-userPassword");
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-userPassword");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const currentUser =  await User.findById(req.user.id);
    if(!currentUser){
      return res.status(404).send("User not found");
    }
   const newPassword = await req.validatedData.userPassword;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(
      newPassword,
      salt
    );
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

    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: req.validatedData.userEmail });

    if (!user) {
      return res.status(401).json({success: false, field: "userEmail", message: "Invalid email or password"});
    }

    // Compare passwords
    const validPassword = await user.comparePassword(
      req.validatedData.userPassword
    );
    const rememberMe = req.validatedData.rememberMe;

    if (!validPassword) {
      return res.status(401).json({success: false, field: "userPassword", message: "Invalid email or password"});
    }
    // Jwt sign and send token in cookie
    const token = jwt.sign({ id: user._id, role: user.role }, config.get("JWT_SECRET"), {
      expiresIn: rememberMe ? '7d' : '1h',
    });
    
    res.header('x-auth-token', token).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
