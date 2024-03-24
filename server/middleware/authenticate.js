const jwt = require("jsonwebtoken");

const { ApiError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ");
    if (!token) {
      next(ApiError(401));
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    next(ApiError(401));
  }
};

module.exports = authenticate;
