import { tokenModel } from "../models/validateToken.model";
import { signJWT, validateJWT } from "./jwt.utils";
import User from "../models/user.model";

export const reissueNewAccessToken = async (refreshToken: string) => {
  const validRefreshToken = validateJWT(refreshToken);

  if (!validRefreshToken.decoded) {
    return "";
  }

  let username = (validRefreshToken.decoded as tokenModel)._doc.username;
  let session = (validRefreshToken.decoded as tokenModel)._doc._id;

  if (!username) {
    return;
  }

  const findUser = await User.find({ username: username });
  const user = await User.findById(findUser[0].id);

  if (!user) {
    return;
  }

  const newAccessToken = signJWT({ ...user });
  return newAccessToken;
};
