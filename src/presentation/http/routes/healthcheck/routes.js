const express = require('express');

const router = express.Router({ mergeParams: true });

function init() {
  router.get(
    '/healthcheck',
    async (_, res) => res.send({
      status: 'ok',
      serverDate: new Date().toISOString(),
    }),
  );

  return router;
}

module.exports.init = init;
