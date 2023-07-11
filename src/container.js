const awilix = require('awilix');

const cartServiceBuilder = require('./domain/cart/service');
const httpServerBuilder = require('./presentation/http/server');
const loggerBuilder = require('./infrastructure/logging');
const dbBuilder = require('./infrastructure/logging');
const cartRepositoryBuilder = require('./infrastructure/repositories/cart');

const container = awilix.createContainer();

container.register({
  cartService: awilix.asFunction(cartServiceBuilder),
  httpServer: awilix.asFunction(httpServerBuilder),
  logger: awilix.asFunction(loggerBuilder),
  db: awilix.asFunction(dbBuilder),
  cartRepository: awilix.asFunction(cartRepositoryBuilder),
});

module.exports = container;
