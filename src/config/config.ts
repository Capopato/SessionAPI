import dotenv from "dotenv";

dotenv.config();

const port = process.env.port || 3001;
const username = process.env.username || "";
const password = process.env.password || "";
const mongoURI = `mongodb+srv://${username}:${password}@sessionapi.pinykug.mongodb.net/?retryWrites=true&w=majority`;
const sessionSecret = process.env.sessionSecret || "";
const accessTokenLt = new Date(Date.now() + 1 * 60 * 1000);
const refreshTokenLt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
const privateKey = process.env.privateKey || "";
const publicKey = process.env.publicKey || "";
const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
const oneMinut = 1 * 60 * 1000; // number of milliseconds in a minut

export default {
  port,
  username,
  mongoURI,
  sessionSecret,
  accessTokenLt,
  refreshTokenLt,
  publicKey,
  privateKey,
  oneDay,
  oneMinut,
};
