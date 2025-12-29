
const merchant = (req, res, next) => {
  if (req.user.role !== 'merchant' && req.user.role !== 'admin') {
    return res.status(403).send("Access denied. Merchants only.");
  }
  next();
};

export default merchant;
