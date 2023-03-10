import dotenv from "dotenv";

dotenv.config();

const port = process.env.port || 3001;
const username = process.env.username || "";
const password = process.env.password || "";
const mongoURI = `mongodb+srv://${username}:${password}@sessionapi.pinykug.mongodb.net/?retryWrites=true&w=majority`;
const sessionSecret = process.env.sessionSecret || "";
const accessTokenLt = process.env.accessTokenLt || "";
const refreshTokenLt = process.env.refreshTokenLt || "";
const privateKey = process.env.privateKey || "";
const publicKey = process.env.publicKey || "";

export default {
  port,
  username,
  mongoURI,
  sessionSecret,
  accessTokenLt,
  refreshTokenLt,
  publicKey,
  privateKey,
};
