const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  // defaultMeta: { service: 'your-service-name' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/combined.log" })
  ],
  exceptionHandlers: [new transports.File({ filename: "log/exceptions.log" })]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

process.on("unhandledRejection", ex => {
  throw ex;
});

module.exports = logger;
