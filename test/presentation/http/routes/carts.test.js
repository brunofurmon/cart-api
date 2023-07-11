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
});
