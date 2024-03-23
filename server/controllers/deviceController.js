const { Device, DeviceInfo } = require("../models/models");
const { ctrlWrapper } = require("../helpers");

const create = async (req, res) => {};

const getAll = async (req, res) => {
  let { brandId, typeId, limit, page } = req.query;
  page = page || 1;
  limit = limit || 9;
  let offset = page * limit - limit;
  let devices;
  if (!brandId && !typeId) {
    devices = await Device.findAndCountAll({ limit, offset });
  }
  if (brandId && !typeId) {
    devices = await Device.findAndCountAll({
      where: { brandId },
      limit,
      offset,
    });
  }
  if (!brandId && typeId) {
    devices = await Device.findAndCountAll({
      where: { typeId },
      limit,
      offset,
    });
  }
  if (brandId && typeId) {
    devices = await Device.findAndCountAll({
      where: { typeId, brandId },
      limit,
      offset,
    });
  }
  return res.json(devices);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const device = await Device.findOne({
    where: { id },
    include: [{ model: DeviceInfo, as: "info" }],
  });
  return res.json(device);
};

module.exports = {
  create,
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
};
