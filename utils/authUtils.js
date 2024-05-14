import { compare, hash } from "bcrypt";

const { sign, verify } = require("jsonwebtoken");

const hashedPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValidPassword = await compare(password, hashedPassword);
  return isValidPassword;
};

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey, {
    expiresIn: "24h",
    algorithm: "HS256",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const tokenVerification = verify(token, process.env.privateKey);
    return tokenVerification;
  } catch (error) {
    console.log("verification failed ", error);
    return false;
  }
};

export { generateToken, verifyToken, hashedPassword, verifyPassword };
