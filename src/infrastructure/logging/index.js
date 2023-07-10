const winston = require('winston');

const init = () => {
  const logger = winston.createLogger({
    level: (process.env.LOG_LEVEL || 'debug').toLowerCase(),
    format: winston.format.json(),
    defaultMeta: { service: 'cart-api' },
  });

  // I'll be using Console only for the purpose of this API
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));

  return logger;
};

module.exports = init;
