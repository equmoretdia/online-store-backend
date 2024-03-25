const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRole");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", checkRole("ADMIN"), ctrl.create);

module.exports = router;
