const { sign } = require("jsonwebtoken");

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET_KEY;
  const token = sign({ userId: id }, secret, { expiresIn: "1d" });
  return token;
};
module.exports = generateToken;
