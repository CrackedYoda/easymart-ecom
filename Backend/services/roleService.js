const roleAuth = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).send('Access denied. Insufficient permissions.');
        }
        next();
    }
}

export default roleAuth;