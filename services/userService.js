const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

const signup = async (name, email, password, phoneNumber, address) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.signup(
    name,
    email,
    hashedPassword,
    phoneNumber,
    address
  );

  return createUser;
};

const signin = async (email, password) => {
  const hashedPassword = await userDao.getHashedPassword(email);
  const compare = await bcrypt.compare(password, hashedPassword);

  if (!compare) {
    const err = new Error("PASSWORD_DOES_NOT_MATCH");
    err.statusCode = 401;
    throw err;
  }

  const userData = await userDao.getUserId(email);

  const payLoad = { userData: userData.userId };
  const jwtToken = jwt.sign(payLoad, process.env.secretKey);

  return jwtToken;
};

const userInfo = async (userId) => {
  const info = await userDao.userInfo(userId);

  return info;
};

module.exports = {
  signup,
  signin,
  userInfo,
};
