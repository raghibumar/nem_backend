require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decodedToken = jwt.verify(token, jwtSecret);
    if (decodedToken) {
      const userId = decodedToken.user.id;
      req.body.userId = userId;
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Please login first");
  }
};

module.exports = { authenticate };
