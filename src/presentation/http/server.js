const http = require('http');
const express = require('express');
const cors = require('cors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const healtcheckRouterBuilder = require('./routes/healthcheck/routes');
const cartRouterBuilder = require('./routes/carts/routes');

const swaggerDocument = require('./swaggerDocs.json');

const init = (container) => {
  const app = express();

  // Security enforcement
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(compress);
  app.use(cors());

  // Routing
  app.use('/', healtcheckRouterBuilder.init());
  app.use('/api', cartRouterBuilder.init(container));

  // API Docs
  app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  const httpServer = http.createServer(app);
  return httpServer;
};

module.exports = init;
