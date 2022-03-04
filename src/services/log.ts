import winston from "winston";
const { combine, timestamp, prettyPrint, colorize } = winston.format;
const winstonRequestLogger = require("winston-request-logger");

/**
 * Enum for logging levels
 * @readonly
 * @enum {string}
 */
export enum LogLevel {
    Error = "error",
    Warn = "warn",
    Info = "info",
    Verbose = "verbose",
    Debug = "debug",
    Silly = "silly"
}

// Create console logging format
const myConsoleFormat = winston.format.printf((info: any) => {
    let msg = info.message;

    // Request log
    if (msg.method) {
        msg = `${msg.method}: ${msg.url}`;
    }
    return `${info.level}: ${msg})`;
});

// Create Winston logger
const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? LogLevel.Info : LogLevel.Silly,
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston.transports.Console({ format: combine(colorize(), myConsoleFormat) })
    ]
});

// Log requests using winston
export const requestLogger = winstonRequestLogger.create(logger);

/**
 * Log an error
 * @param {Error} error - A javascript Error object that includes a stack trace.
 */
export function logError(error: Error) {
    if (!error) {
        return;
    }
    logger.error(error.stack);
}

/**
 * Log an error
 * @param {LogLevel} level - The logging level that you wish to log. (Error is NOT allowed, use logError())
 * @param {Error} message - The message that you wish to log.
 * @param {Error} source - The source where you are logging from (e.g. function name).
 */
export function logMessage(level: LogLevel, message: any, source: string) {
    if (level === LogLevel.Error && process.env.NODE_ENV !== "production") {
        throw new Error("Trying to log error using logMessage(). Use logError() instead.");
    }
    logger.log(level, `[${source}]: ${message}`);
}