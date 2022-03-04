// Setup environment variables
import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import { logMessage, LogLevel } from "./services/log";
import { connectDB } from "./services/database";

const app = createApp();
const port = process.env.NODE_ENV === "test" ? 3002 : app.get("port");
const server = app.listen(port, () => {
  logMessage(LogLevel.Verbose, `App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode"`, "server");
  logMessage(LogLevel.Verbose, "Press CTRL-C to stop\n", "server");
});

connectDB(process.env.MONGODB_URI);

export default server;
