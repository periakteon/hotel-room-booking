import "dotenv/config";
import "./utils/env";
import express, { Application } from "express";
import { Server, createServer } from "http";
import helmet from "helmet";
import router from "./routes";
import log from "./utils/logger";
import connectToDb from "./utils/connectToDb";

const app: Application = express();
const server: Server = createServer(app);
const port = process.env.PORT ?? 3000;

// Helmet middleware to secure Express app by setting various HTTP headers
app.use(helmet());

// Parse incoming JSON payloads
app.use(express.json());

// Register routes
app.use(router);

server.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);

  connectToDb();
});
