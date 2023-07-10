const container = require('../container');

let server;
const gracefulShutdown = async () => {
  console.log('Received kill signal, shutting down gracefully');
  await server.close();
};

(async () => {
  const httpServer = container.resolve('httpServer');

  server = httpServer.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
})();

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
