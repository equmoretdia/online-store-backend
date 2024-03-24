const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Basket } = require("../models/models");
const { ApiError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const registration = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    throw ApiError(400, "wrong email or password!");
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    throw ApiError(400, "user with this email has been registered already!");
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ email, password: hashPassword, role });
  const basket = await Basket.create({ userId: user.id });
  const token = jwt.sign({ id: user.id, email, role }, SECRET_KEY, {
    expiresIn: "24h",
  });
  return res.json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw ApiError(401, "Email or password invalid!");
  }
  const comparePassword = await bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    throw ApiError(401, "Invalid password!");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  return res.json({ token });
};

const checkAuth = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    // return next(httpError(403));
    throw ApiError(500, "bad luck");
  }
  res.json(id);
};

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  checkAuth: ctrlWrapper(checkAuth),
};

// const checkAuth = async (req, res) => {
//     const query = req.query;
//     res.json(query);
//     console.log(query);
// };
