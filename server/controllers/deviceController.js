const path = require("path");
const uuid = require("uuid");

const { Device, DeviceInfo } = require("../models/models");
const { ctrlWrapper } = require("../helpers");

const create = async (req, res) => {
  let { name, price, brandId, typeId, info } = req.body;
  const { img } = req.files;
  const fileName = uuid.v4() + ".jpg";
  img.mv(path.resolve(__dirname, "..", "public", fileName));
  const device = await Device.create({
    name,
    price,
    brandId,
    typeId,
    img: fileName,
  });

  if (info) {
    info = JSON.parse(info);
    info.forEach((i) =>
      DeviceInfo.create({
        title: i.title,
        description: i.description,
        deviceId: device.id,
      })
    );
  }

  return res.json(device);
};

const getAll = async (req, res) => {
  let { brandId, typeId, limit, page } = req.query;
  page = page || 1;
  limit = limit || 4;
  let offset = page * limit - limit;
  let devices;
  if (!brandId && !typeId) {
    // devices = await Device.findAll();
    devices = await Device.findAndCountAll({ limit, offset });
  }
  if (brandId && !typeId) {
    // devices = await Device.findAll({ where: { brandId } });
    devices = await Device.findAndCountAll({
      where: { brandId },
      limit,
      offset,
    });
  }
  if (!brandId && typeId) {
    // devices = await Device.findAll({ where: { typeId } });
    devices = await Device.findAndCountAll({
      where: { typeId },
      limit,
      offset,
    });
  }
  if (brandId && typeId) {
    // devices = await Device.findAll({ where: { brandId, typeId } });
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
  create: ctrlWrapper(create),
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
};
