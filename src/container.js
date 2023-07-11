const awilix = require('awilix');

const cartServiceBuilder = require('./domain/cart/service');
const httpServerBuilder = require('./presentation/http/server');
const loggerBuilder = require('./infrastructure/logging');
const dbBuilder = require('./infrastructure/database/inMemory');
const cartRepositoryBuilder = require('./infrastructure/repositories/cart');

const container = awilix.createContainer();

container.register({
  cartService: awilix.asFunction(cartServiceBuilder),
  httpServer: awilix.asFunction(httpServerBuilder),
  logger: awilix.asFunction(loggerBuilder),
  cartRepository: awilix.asFunction(cartRepositoryBuilder),
  db: awilix.asFunction(dbBuilder),
});

module.exports = container;
