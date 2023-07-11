const CartRepositoryBuilder = require('../../../src/infrastructure/repositories/cart');

describe('Cart Repository', () => {
  let CartRepository;
  let dbMock;

  beforeEach(() => {
    dbMock = {
      read: jest.fn(),
      update: jest.fn(),
    };

    CartRepository = CartRepositoryBuilder({ db: dbMock });
  });

  describe('getCart', () => {
    it('Should get the cart from the database', async () => {
      const cart = { items: [], totalPrice: 0 };
      dbMock.read.mockResolvedValue(cart);

      const result = await CartRepository.getCart();

      expect(dbMock.read).toHaveBeenCalledWith('carts');
      expect(result).toEqual(cart);
    });
  });

  describe('updateCart', () => {
    it('should update the cart on the database', async () => {
      const cart = {
        items: [
          { productId: 1, quantity: 1, price: 25 },
          { productId: 2, quantity: 2, price: 12.99 },
        ],
        totalPrice: 37.99,
      };
      dbMock.update.mockResolvedValue(cart);

      const result = await CartRepository.updateCart(cart);

      expect(dbMock.update).toHaveBeenCalledWith('carts', cart);
      expect(result).toEqual(cart);
    });
  });
});
