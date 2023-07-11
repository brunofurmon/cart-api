// Test methods for inMemory database
const dbBuilder = require('../../../src/infrastructure/database/inMemory');

describe('inMemory database', () => {
  let database;
  let logger;

  beforeEach(() => {
    logger = {
      debug: jest.fn(),
    };
    database = dbBuilder({ logger });
  });

  describe('read', () => {
    it('Should read data from database', async () => {
      const data = await database.read('carts');
      expect(data).toEqual({ items: [], totalPrice: 0 });
      expect(logger.debug).toHaveBeenCalledWith('Reading carts with id: 1');
    });
  });

  describe('update', () => {
    it('Should update cart in database', async () => {
      const data = await database.update(
        'carts',
        {
          items:
            [{ productId: 1, price: 12.99, quantity: 1 }],
          totalPrice: 12.99,
        },
      );
      expect(data).toEqual(
        {
          items:
            [{ productId: 1, price: 12.99, quantity: 1 }],
          totalPrice: 12.99,
        },
      );
      expect(logger.debug).toHaveBeenCalledWith('Updating carts with id: 1 with data: {"items":[{"productId":1,"price":12.99,"quantity":1}],"totalPrice":12.99}');
    });
  });
});
