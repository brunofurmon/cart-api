const Cart = require('../../domain/cart/model');

// Mapper function
const toDomainModel = (data) => {
  const cart = new Cart({ ...data });
  return cart;
};

const init = ({ db }) => {
  // Gets the single cart from db
  const getCart = async () => {
    const data = await db.read('carts');

    const cart = toDomainModel(data);
    return cart;
  };

  // Updates content on the cart
  const updateCart = async (data) => {
    const result = await db.update('carts', data);

    const cart = toDomainModel(result);
    return cart;
  };

  return {
    getCart,
    updateCart,
  };
};

module.exports = init;
