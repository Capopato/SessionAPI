import dotenv from "dotenv";

dotenv.config();

const port = process.env.port || 3001;
const username = process.env.username || "";
const password = process.env.password || "";
// const mongoURI = `mongodb+srv://${username}:${password}@restapidb.i67ryjf.mongodb.net/?retryWrites=true&w=majority`;
const mongoURI = `mongodb+srv://${username}:${password}@sessionapi.pinykug.mongodb.net/?retryWrites=true&w=majority`;

export default {
  port,
  username,
  mongoURI,
};
