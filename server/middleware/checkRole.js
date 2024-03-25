const jwt = require("jsonwebtoken");

const { ApiError } = require("../helpers");

const { SECRET_KEY } = process.env;

const checkRole = (role) => {
  return async function (req, res, next) {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
      if (bearer !== "Bearer") {
        throw ApiError(401);
      }
      if (!token) {
        throw ApiError(401);
      }
      const decoded = await jwt.verify(token, SECRET_KEY);
      if (decoded.role !== role) {
        throw ApiError(403);
      }
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = checkRole;
