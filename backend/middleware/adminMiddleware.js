const verifyAdmin = (req, res, next) => {

  if (req.user.role !== "staff") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

  next();

};

module.exports = verifyAdmin;