const { Device, DeviceInfo } = require("../models/models");
const { ctrlWrapper } = require("../helpers");

const create = async (req, res) => {};

const getAll = async (req, res) => {};

const getOne = async (req, res) => {
  const { id } = req.params;
  const device = await Device.findOne({
    where: { id },
    include: [{ model: DeviceInfo, as: "info" }],
  });
  return res.json(device);
};

module.exports = { create, getAll, getOne: ctrlWrapper(getOne) };
