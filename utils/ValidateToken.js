const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (request, response, next) => {
  const token = request.header(process.env.TOKEN_HEADER_KEY);
  if (!token) {
    return response.status(401).json({ message: "Access denied" });
  }
  try {
    const verified = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );
    next(verified._id);
  } catch (error) {
    response.status(400).json({ message: "Invalid token" });
  }
};

module.exports = validateToken;
