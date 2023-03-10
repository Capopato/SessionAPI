import jwt from "jsonwebtoken";
import config from "../config/config";

export const signJWT = (user: object, expireTime: string) => {
  return jwt.sign(user, config.privateKey, {
    expiresIn: expireTime,
    algorithm: "RS256",
  });
};

export const validateJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  }
};
