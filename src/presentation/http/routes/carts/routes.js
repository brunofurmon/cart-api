const express = require('express');

const router = express.Router({ mergeParams: true });

function init({ cartService }) {
  router.get('/cart', async (_, res) => {
    const cart = await cartService.getCart();
    res.json(cart);
  });

  return router;
}

module.exports.init = init;
