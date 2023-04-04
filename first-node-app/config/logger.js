const { createLogger, format, transports } = require('winston');

const createLog = (controllerName) =>
  createLogger({
    level: 'info',
    format: format.combine(
      format.simple(),
      format.timestamp(),
      format.printf(
        (info) =>
          `${info.timestamp} ${controllerName.toUpperCase()} - ${
            info.controller || ''
          } [${info.level.toUpperCase()}] ${info.message}`
      )
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        maxsize: 512000,
        maxFiles: 5,
        filename: `logs/error.log`,
        level: 'error',
      }),
      new transports.File({
        maxsize: 512000,
        maxFiles: 5,
        filename: `logs/combined.log`,
        level: 'info',
      }),
    ],
  });

module.exports = createLog;
