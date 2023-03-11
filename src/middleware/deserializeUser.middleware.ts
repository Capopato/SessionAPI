import { Request, Response, NextFunction } from "express";
import { validateJWT } from "../utils/jwt.utils";
import { reissueNewAccessToken } from "../utils/newAccessToken.util";
import config from "../config/config";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers.cookie;
  if (!headers) {
    res.status(400);
    return;
  }
  let accessToken = "";
  let refreshToken = "";

  const cookies = headers.split("; ");
  //   console.log(cookies);

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] == "accessToken") {
      accessToken = cookie[1];
    }
    if (cookie[0] == "refreshToken") {
      refreshToken = cookie[1];
    }
  }
  //   console.log(validateJWT(refreshToken));

  if (!accessToken && !refreshToken) {
    res.status(440);
    return next();
  }

  if (accessToken) {
    const validateAccessToken = validateJWT(accessToken);
    if (validateAccessToken.decoded && validateAccessToken.expired == false) {
      return next();
    } else {
      res.status(440);
      return next();
    }
  }

  if (!accessToken || refreshToken) {
    const newAccessToken = await reissueNewAccessToken(refreshToken);

    if (!newAccessToken) {
      res.status(440);
      return next();
    }

    res.cookie("newAccessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      expires: config.accessTokenLt,
    });

    next();
  }
  return next();
};
