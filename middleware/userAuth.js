import jwt from "jsonwebtoken";
import config from "config";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
    let token = req.header('x-auth-token');
    
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, config.get("ACCESS_SECRET"));
        
        // Fetch user to check suspension status
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send("User not found.");
        }
        
        if (user.isSuspended) {
            return res.status(403).send("Account suspended. Please contact support.");
        }

        req.user = {id: decoded.id, role: decoded.role};
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
}

export default userAuth;