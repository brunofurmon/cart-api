const express = require('express');

const { validateAddProduct, validate } = require('../../middleware/validators');

const router = express.Router({ mergeParams: true });

function init({ cartService }) {
  router.get('/cart', async (_, res) => {
    const cart = await cartService.getCart();
    res.json(cart);
  });

  router.post(
    '/cart/product',
    validateAddProduct,
    validate,
    async (req, res) => {
      const cart = await cartService.addProduct(
        req.body.productId,
        req.body.quantity,
        req.body.price,
      );
      res.json(cart);
    },
  );

  return router;
}

module.exports.init = init;
