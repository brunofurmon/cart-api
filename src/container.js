const awilix = require('awilix');

const cartServiceBuilder = require('./domain/cart/service');
const httpServerBuilder = require('./presentation/http/server');

const container = awilix.createContainer();

container.register({
  cartService: awilix.asFunction(cartServiceBuilder),
  httpServer: awilix.asFunction(httpServerBuilder),
});

module.exports = container;
