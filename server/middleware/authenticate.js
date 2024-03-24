const jwt = require("jsonwebtoken");

const { ApiError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(ApiError(401));
  }
  try {
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
