const container = require('../container');

const logger = container.resolve('logger');

let server;
const gracefulShutdown = async () => {
  logger.info('Received kill signal, shutting down gracefully');
  await server.close();
};

(async () => {
  const httpServer = container.resolve('httpServer');

  server = httpServer.listen(process.env.SERVER_PORT, () => {
    logger.info(`Server is running on port ${process.env.SERVER_PORT}`);
  });
})();

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
