export var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
export const logger = {
    info(message, meta) {
        this.log(LogLevel.INFO, message, meta);
    },
    warn(message, meta) {
        this.log(LogLevel.WARN, message, meta);
    },
    error(message, error, meta) {
        const errorMeta = error instanceof Error
            ? { message: error.message, stack: error.stack, ...meta }
            : { error, ...meta };
        this.log(LogLevel.ERROR, message, errorMeta);
    },
    debug(message, meta) {
        if (process.env.NODE_ENV !== "production") {
            this.log(LogLevel.DEBUG, message, meta);
        }
    },
    log(level, message, meta) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...(meta ? { metadata: meta } : {})
        };
        if (level === LogLevel.ERROR) {
            console.error(JSON.stringify(logEntry));
        }
        else if (level === LogLevel.WARN) {
            console.warn(JSON.stringify(logEntry));
        }
        else {
            console.log(JSON.stringify(logEntry));
        }
    }
};
