const create = async (req, res) => {};

const getAll = async (req, res) => {
  res.status(200).json({ message: "it's working!" });
};

module.exports = { create, getAll };
