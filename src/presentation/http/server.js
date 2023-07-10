const http = require('http');
const express = require('express');
const cors = require('cors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const healtcheckRouterBuilder = require('./routes/healthcheck/routes');

const init = () => {
  const app = express();

  // Security enforcement
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(compress);
  app.use(cors());

  // Routing
  app.use('/api', healtcheckRouterBuilder.init());
  const httpServer = http.createServer(app);
  return httpServer;
};

module.exports = init;
