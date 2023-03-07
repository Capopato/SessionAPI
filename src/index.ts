import express from "express";
import sessionRoutes from "./routes/session.routes";
import config from "./config/config";
import session from "express-session";
import authRoutes from "./routes/auth.routes";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";

export const store = new session.MemoryStore();

/**
 * Regarding the express-session 'VSCode not loading merged declaration' issue: https://github.com/expressjs/session/issues/792
 */

const app = express();

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
      secret: "Some secret",
      cookie: { maxAge: 5000 },
      saveUninitialized: true,
      store,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded());
  app.use("/session", sessionRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);

  app.listen(config.port, () => console.log(`App is listening at port: ${config.port}`));
};
