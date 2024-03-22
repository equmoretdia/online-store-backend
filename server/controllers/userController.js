const ApiError = require("../error/ApiError");

const registration = async (req, res) => {};
const login = async (req, res) => {};
const checkAuth = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return next(ApiError.error(449));
  }
  res.json(id);
};

module.exports = { registration, login, checkAuth };

// const checkAuth = async (req, res) => {
//     const query = req.query;
//     res.json(query);
//     console.log(query);
// };
