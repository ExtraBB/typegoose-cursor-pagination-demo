// Imports
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

import { requestLogger } from "./services/log";
import { getUsers } from "./controllers/user-controller";
import * as UserRoutes from "./routes/user-routes";

// Create express
export const createApp = () => {
    const app = express();

    // Middleware
    app.set("port", process.env.PORT || 3000);
    app.set("trust proxy", true);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });
    app.use(requestLogger);

    // Routes
    app.get(UserRoutes.GetUsers, getUsers);

    return app;
};
