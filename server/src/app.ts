import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import {version} from '../package.json'

import logger from './utils/logger'

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    },
});

app.get("/", (_, res) => res.send(`Server is up and running version ${version}`));

httpServer.listen(port, host, () => {
    logger.info("Server is listening");
    logger.info(`http://${host}:${port}`);
});


