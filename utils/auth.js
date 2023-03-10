const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message: error.message });
  }

  const decoded = await jwt.verify(accessToken, process.env.secretKey);

  if (!decoded) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;

    return res.status(error.statusCode).json({ message: error.message });
  }

  req.userId = decoded.userId;
  next();
};

module.exports = {
  validateToken,
};
