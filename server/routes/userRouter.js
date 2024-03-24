const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

router.post("/registration", ctrl.registration);
router.post("/login", ctrl.login);
router.get("/auth", authenticate, ctrl.checkAuth);

module.exports = router;
