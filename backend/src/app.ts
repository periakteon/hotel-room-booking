import "dotenv/config";
import "./utils/env";
import express, { Application } from "express";
import { Server, createServer } from "http";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import log from "./utils/logger";
import connectToDb from "./utils/connectToDb";
import { getEnvVar } from "./utils/env";

const app: Application = express();
const server: Server = createServer(app);
const port = process.env.PORT ?? 8000;

// Helmet middleware to secure Express app by setting various HTTP headers
app.use(helmet());

// Parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: getEnvVar("APP_ORIGIN"),
    credentials: true,
  })
);

app.use(cookieParser());

// Register routes
app.use(router);

server.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);

  connectToDb();
});
