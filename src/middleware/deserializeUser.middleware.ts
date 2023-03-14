import { Request, Response, NextFunction } from "express";
import { signJWT, validateJWT } from "../utils/jwt.utils";
import { reissueNewAccessToken } from "../utils/newAccessToken.util";
import config from "../config/config";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.cookie;
  if (!header) {
    return next();
  }

  let accessToken = "";
  let refreshToken = "";

  const cookies = header.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0].includes("accessToken")) {
      accessToken = cookie[1];
    } else if (cookie[0].includes("refreshToken")) {
      refreshToken = cookie[1];
    }
  }

  if (!accessToken && !refreshToken) {
    res.status(400).send("Session not allowed 1.");
  }

  if (accessToken) {
    const validateAccessToken = validateJWT(accessToken);
    if (validateAccessToken.expired == false) {
      return next();
    }
  }

  if (!accessToken && refreshToken) {
    const newAccessToken = await reissueNewAccessToken(refreshToken);

    if (!newAccessToken) {
      return res.status(400).send("Session not allowed 2.");
    }

    res.cookie("newAccessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      expires: config.accessTokenLt,
    });
    return next();
  }
};
