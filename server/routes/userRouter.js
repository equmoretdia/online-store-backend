const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

router.post("/registration", ctrl.registration);
router.post("/login", ctrl.login);
router.get("/auth", ctrl.checkAuth);

module.exports = router;
