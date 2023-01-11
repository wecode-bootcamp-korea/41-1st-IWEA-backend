const userService = require("../services/userService");
const { asyncErrorHandler } = require("../utils/error");

const signup = asyncErrorHandler(async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  if (!name || !email || !password || !phoneNumber || !address) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await userService.signup(name, email, password, phoneNumber, address);

  return res.status(201).json({ message: "userCreated" });
});

const signin = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  jwtToken = await userService.signin(email, password);

  return res.status(200).json({ accessToken: jwtToken });
});

const userInfo = asyncErrorHandler(async (req, res) => {
  const info = await userService.userInfo(req.userId);

  return res.status(200).json({ data: info });
});

module.exports = {
  signup,
  signin,
  userInfo,
};
