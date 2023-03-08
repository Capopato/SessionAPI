import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface userModel extends Document {
  username: string;
  password: string;
  passwordCheck: string;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string): Promise<boolean>;
}

export const userSchema: Schema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  passwordCheck: { type: String },
});

userSchema.pre("save", function (next) {
  const user = this as userModel;
  const salt = 10;

  if (user.password && user.isModified("password")) {
    try {
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashedPassword;
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    next();
  }
});

userSchema.methods.hashPassword = async function (password: string): Promise<string> {
  const hashedPassword = bcrypt.hashSync(password, 10);
  password = hashedPassword;
  return password;
};

userSchema.methods.comparePassword = async function (passwordCheck: string): Promise<boolean> {
  const user = this as userModel;

  return bcrypt.compare(passwordCheck, user.password).catch((error) => false);
};

export default mongoose.model<userModel>("User", userSchema);
