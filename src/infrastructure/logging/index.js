const winston = require('winston');

const init = () => {
  const logger = winston.createLogger({
    level: (process.env.LOG_LEVEL || 'debug').toLowerCase(),
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple(),
    ),

    // I'll be using Console only for the purpose of this API
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    transports: new winston.transports.Console(),
  });

  return logger;
};

module.exports = init;
