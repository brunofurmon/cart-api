const request = require('supertest');
const server = require('../../../../src/container').resolve('httpServer');

describe('Cart API', () => {
  describe('GET /api/cart', () => {
    it('should return the cart', async () => {
      const { body } = await request(server)
        .get('/api/cart')
        .expect(200);

      expect(body).toEqual({ items: [], totalPrice: 0 });
    });
  });

  describe('POST /api/cart/product', () => {
    it('Should succesfully add a product to the cart', async () => {
      const { body } = await request(server)
        .post('/api/cart/product')
        .send({ productId: 1, quantity: 1, price: 1 })
        .expect(200);

      expect(body).toEqual({ items: [{ productId: 1, quantity: 1, price: 1 }], totalPrice: 1 });
    });

    it.each([-100, 0, 'a'])('Should return Bad Request when a productId is wrong', async (productId) => {
      const { body } = await request(server)
        .post('/api/cart/product')
        .send({ productId, quantity: 1, price: 1 })
        .expect(400);

      expect(body).toEqual({ message: 'The "productId" property must be present and be a positive integer.' });
    });

    it.each([-100, 0, 'a'])('Should return Bad Request when a quantity is wrong', async (quantity) => {
      const { body } = await request(server)
        .post('/api/cart/product')
        .send({ productId: 1, quantity, price: 1 })
        .expect(400);

      expect(body).toEqual({ message: 'The "quantity" property must be present and be a positive non-zero integer.' });
    });

    it.each([-1, 0, '-10', 'a', '0,01'])('Should return Bad Request when the price is wrong', async (price) => {
      const { body } = await request(server)
        .post('/api/cart/product')
        .send({ productId: 1, quantity: 1, price })
        .expect(400);

      expect(body).toEqual({ message: 'The "price" decimal number must be present and >= 0.01 (use . for decimal separator).' });
    });
  });
});
