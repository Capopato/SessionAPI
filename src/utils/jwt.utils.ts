import jwt from "jsonwebtoken";
import config from "../config/config";
import { userModel } from "../models/user.model";

export const signJWT = (user: userModel, options?: jwt.SignOptions) => {
  return jwt.sign(user, config.privateKey, {
    ...(options && options),
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
