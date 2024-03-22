const { ApiError, ctrlWrapper } = require("../helpers");

const registration = async (req, res) => {};

const login = async (req, res) => {};

const checkAuth = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    // return next(httpError(403));
    throw ApiError(500, "bad luck");
  }
  res.json(id);
};

module.exports = { registration, login, checkAuth: ctrlWrapper(checkAuth) };

// const checkAuth = async (req, res) => {
//     const query = req.query;
//     res.json(query);
//     console.log(query);
// };
