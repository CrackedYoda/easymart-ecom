const roleAuth = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
        if (!req.user) {
            return res.status(401).send('Access denied. Not authenticated.');
        }
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).send('Access denied. Insufficient permissions.');
        }
        next();} catch (error) {
        res.status(500).send(error.message);
        
        }
    }
}

export default roleAuth;