const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/typeController");
const checkRole = require("../middleware/checkRole");

router.get("/", ctrl.getAll);
router.post("/", checkRole("ADMIN"), ctrl.create);

module.exports = router;
