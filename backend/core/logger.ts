export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG"
}

export const logger = {
  info(message: string, meta?: any) {
    this.log(LogLevel.INFO, message, meta);
  },
  warn(message: string, meta?: any) {
    this.log(LogLevel.WARN, message, meta);
  },
  error(message: string, error?: any, meta?: any) {
    const errorMeta = error instanceof Error 
      ? { message: error.message, stack: error.stack, ...meta }
      : { error, ...meta };
    this.log(LogLevel.ERROR, message, errorMeta);
  },
  debug(message: string, meta?: any) {
    if (process.env.NODE_ENV !== "production") {
      this.log(LogLevel.DEBUG, message, meta);
    }
  },
  log(level: LogLevel, message: string, meta?: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(meta ? { metadata: meta } : {})
    };
    if (level === LogLevel.ERROR) {
      console.error(JSON.stringify(logEntry));
    } else if (level === LogLevel.WARN) {
      console.warn(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }
};
