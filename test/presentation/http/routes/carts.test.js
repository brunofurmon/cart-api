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

    it.each([-100, 0, 'a', '', undefined])('Should return Bad Request when a productId is wrong', async (productId) => {
      const { body } = await request(server)
        .post('/api/cart/product')
        .send({ productId, quantity: 1, price: 1 })
        .expect(400);

      expect(body).toEqual({ message: 'The "productId" property must be present and be a positive integer.' });
    });

    it.each([-100, 0, 'a', '', undefined])('Should return Bad Request when a quantity is wrong', async (quantity) => {
      const { body } = await request(server)
        .post('/api/cart/product')
        .send({ productId: 1, quantity, price: 1 })
        .expect(400);

      expect(body).toEqual({ message: 'The "quantity" property must be present and be a positive non-zero integer.' });
    });

    it.each([-1, 0, '-10', 'a', '0,01', '', undefined])('Should return Bad Request when the price is wrong', async (price) => {
      const { body } = await request(server)
        .post('/api/cart/product')
        .send({ productId: 1, quantity: 1, price })
        .expect(400);

      expect(body).toEqual({ message: 'The "price" decimal number must be present and >= 0.01 (use . for decimal separator).' });
    });
  });

  describe('DELETE /api/cart/product/:productId', () => {
    it('Should succesfully remove 1 product from a cart with 2 of them', async () => {
      const { body } = await request(server)
        .delete('/api/cart/product/1')
        .send({ quantity: 1 })
        .expect(200);

      expect(body).toEqual({ items: [], totalPrice: 0 });
    });

    it.each([-100, 0, 'a'])('Should return Bad Request when a productId is wrong', async (productId) => {
      const { body } = await request(server)
        .delete(`/api/cart/product/${productId}`)
        .send({ quantity: 1 })
        .expect(400);

      expect(body).toEqual({ message: 'The "productId" property must be present and be a positive integer.' });
    });

    it.each([-100, 0, 'a'])('Should return Bad Request when a quantity is wrong', async (quantity) => {
      const { body } = await request(server)
        .delete('/api/cart/product/1')
        .send({ quantity })
        .expect(400);

      expect(body).toEqual({ message: 'The "quantity" property must be present and be a positive non-zero integer.' });
    });
  });

  describe('Scenario testing', () => {
    afterEach(async () => {
      await request(server).delete('/api/cart/product/1').send({ quantity: 3 }).expect(200);
      await request(server).delete('/api/cart/product/2').send({ quantity: 3 }).expect(200);
      await request(server).delete('/api/cart/product/3').send({ quantity: 3 }).expect(200);
    });

    it('The customer bought 3 t-shirts - The total price on this case must be USD 25.98', async () => {
      const { body } = await request(server).post('/api/cart/product').send({ productId: 1, quantity: 3, price: 12.99 }).expect(200);

      expect(body.totalPrice).toBeCloseTo(25.98);
    });

    it('The customer bought 2 t-shirts and 2 jeans - The total price on this case must be USD 62.99', async () => {
      await request(server).post('/api/cart/product').send({ productId: 1, quantity: 2, price: 12.99 }).expect(200);
      const { body } = await request(server).post('/api/cart/product').send({ productId: 2, quantity: 2, price: 25.00 }).expect(200);

      expect(body.totalPrice).toBeCloseTo(62.99);
    });
    it('The customer bought 1 T-shirt, 2 Jeans and 3 Dress - The total price on this case must be USD 91,30', async () => {
      await request(server).post('/api/cart/product').send({ productId: 1, quantity: 1, price: 12.99 }).expect(200);
      await request(server).post('/api/cart/product').send({ productId: 2, quantity: 2, price: 25.00 }).expect(200);
      const { body } = await request(server).post('/api/cart/product').send({ productId: 3, quantity: 3, price: 20.65 }).expect(200);

      expect(body.totalPrice).toBeCloseTo(91.30);
    });
  });
});
