const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // check if token exists
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // remove "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;