const userService = require("../services/userService");

const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    if (!name || !email || !password || !phoneNumber || !address) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signup(name, email, password, phoneNumber, address);

    return res.status(201).json({ message: "userCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "KEY_ERROR" });
    }

    jwtToken = await userService.signin(email, password);

    return res.status(200).json({ accessToken: jwtToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 401).json({ message: err.message });
  }
};

module.exports = {
  signup,
  signin,
};
