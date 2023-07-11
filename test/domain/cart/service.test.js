const cartRepository = {
  getCart: jest.fn(),
  updateCart: jest.fn(),
};

const CartService = require('../../../src/domain/cart/service')({ cartRepository });

describe('CartService', () => {
  describe('AddProduct', () => {
    it('Should return a cart with one product', () => {
      const cart = { items: [] };
      const product = { id: 1, price: 1 };
      const quantity = 1;
      const expected = { items: [{ productId: 1, quantity: 1, price: 1 }] };

      const actual = CartService.addProduct(cart, product, quantity);

      expect(actual).resolves.toStrictEqual(expected);
    });

    it('Should return 2 items of the same product when adding 1 to the existing cart', () => {
      const cart = { items: [{ productId: 1, quantity: 1, price: 1 }] };
      const product = { id: 1, price: 1 };
      const quantity = 1;
      const expected = { items: [{ productId: 1, quantity: 2, price: 1 }] };

      const actual = CartService.addProduct(cart, product, quantity);

      expect(actual).resolves.toStrictEqual(expected);
    });

    it('Should persist the cart after adding a product', () => {
      const cart = { items: [] };
      const product = { id: 1, price: 1 };
      const quantity = 1;
      const expected = { items: [{ productId: 1, quantity: 1, price: 1 }] };

      CartService.addProduct(cart, product, quantity);

      expect(cartRepository.updateCart).toHaveBeenCalledWith(expected);
    });
  });

  describe('RemoveProduct', () => {
    it('Should return a cart with one product when subtracting', () => {
      const cart = { items: [{ productId: 1, quantity: 2, price: 1 }] };
      const product = { id: 1 };
      const quantity = 1;
      const expected = { items: [{ productId: 1, quantity: 1, price: 1 }] };

      const actual = CartService.removeProduct(cart, product, quantity);

      expect(actual).toStrictEqual(expected);
    });

    it('Should return an empty cart when a quantity is exactly removed', () => {
      const cart = { items: [{ productId: 1, quantity: 1, price: 1 }] };
      const product = { id: 1 };
      const quantity = 1;
      const expected = { items: [] };

      const actual = CartService.removeProduct(cart, product, quantity);

      expect(actual).toStrictEqual(expected);
    });

    it('Should return a cart with no items even if the value to be removed exceeds the quantity', () => {
      const cart = { items: [{ productId: 1, quantity: 1, price: 1 }] };
      const product = { id: 1 };
      const quantity = 2;
      const expected = { items: [] };

      const actual = CartService.removeProduct(cart, product, quantity);

      expect(actual).toStrictEqual(expected);
    });

    it('Should remove an empty cart when the product being removed is not present', () => {
      const cart = { items: [] };
      const product = { id: 1 };
      const quantity = 1;
      const expected = { items: [] };

      const actual = CartService.removeProduct(cart, product, quantity);

      expect(actual).toStrictEqual(expected);
    });
  });

  // Sample test cases can be found here
  describe('GetTotalPrice', () => {
    it('Should return the total price of a cart with one product', () => {
      const cart = { items: [{ productId: 1, quantity: 1, price: 12.99 }] };
      const expected = 12.99;

      const actual = CartService.getTotalPrice(cart);

      expect(actual).toBe(expected);
    });

    it('Should return the total price of a cart with two different products', () => {
      const cart = {
        items: [
          { productId: 1, quantity: 1, price: 25 },
          { productId: 2, quantity: 1, price: 12.99 }],
      };
      const expected = 37.99;

      const actual = CartService.getTotalPrice(cart);

      expect(actual).toBe(expected);
    });

    it('Should return the total price of a cart with two of the same product', () => {
      const cart = {
        items: [
          { productId: 1, quantity: 2, price: 25 },
        ],
      };
      const expected = 50;

      const actual = CartService.getTotalPrice(cart);

      expect(actual).toBe(expected);
    });

    // "3 t-shirts"
    it('Should return a simples discounted 3rd item', () => {
      const cart = {
        items: [
          { productId: 1, quantity: 3, price: 12.99 },
        ],
      };
      // This result is fixed to 2 decimal places (str representation)
      const expected = '25.98';

      const actual = CartService.getTotalPrice(cart);

      expect(actual.toFixed(2)).toBe(expected);
    });

    it('Should discount the cheapest item of them all with 3 items', () => {
      const cart = {
        items: [
          { productId: 1, quantity: 1, price: 25 },
          { productId: 2, quantity: 2, price: 12.99 },
        ],
      };
      const expected = 37.99;

      const actual = CartService.getTotalPrice(cart);

      expect(actual).toBe(expected);
    });

    // "2 shirts and 2 jeans"
    it('Should subtract the cheapest item of 2 of 2 different items', () => {
      const cart = {
        items: [
          { productId: 1, quantity: 2, price: 25 },
          { productId: 2, quantity: 2, price: 12.99 },
        ],
      };
      const expected = 62.99;

      const actual = CartService.getTotalPrice(cart);

      expect(actual).toBe(expected);
    });

    // "1 T-shirt, 2 Jeans and 3 Dress"
    it('Should subtract 2 different item prices from the total', () => {
      const cart = {
        items: [
          { productId: 1, quantity: 1, price: 12.99 },
          { productId: 2, quantity: 2, price: 25 },
          { productId: 3, quantity: 3, price: 20.65 },
        ],
      };
      const expected = '91.30';

      const actual = CartService.getTotalPrice(cart);

      expect(actual.toFixed(2)).toBe(expected);
    });
  });
});
