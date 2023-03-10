import express from "express";
import sessionRoutes from "./routes/session.routes";
import config from "./config/config";
import session from "express-session";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { productRoutes } from "./routes/product.routes";

/**
 * Regarding the express-session 'VSCode not loading merged declaration' issue: https://github.com/expressjs/session/issues/792
 */

const app = express();
const store = new session.MemoryStore();

/**
 * mongoDB connection is slow due to the fact that it is connecting to localhost instead direct to a IPv6 like 127.0.0.1.
 * How to fix this? > https://stackoverflow.com/questions/14652231/mongodb-takes-3-minutes-to-connect
 */

mongoose
  .set("strictQuery", true)
  .connect(config.mongoURI)
  .then(() => {
    console.log("Connected to mongoDB");
    startServer();
  })
  .catch((error) => {
    console.log(error);
    return;
  });

const startServer = () => {
  app.use(
    session({
      secret: config.sessionSecret,
      cookie: { maxAge: 30000 },
      resave: false,
      saveUninitialized: false,
      store,
    })
  );
  app.use(express.json());
  app.use(cors());
  app.use("/session", sessionRoutes);
  app.use("/user", userRoutes);
  app.use("/product", productRoutes);
  app.use(cookieParser());

  app.listen(config.port, () => console.log(`App is listening at port: ${config.port}`));
};
