const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/userInfo", validateToken, userController.userInfo);

module.exports = {
  router,
};
