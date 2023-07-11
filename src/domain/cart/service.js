const init = ({ cartRepository }) => {
  // In this project, total price always returns the "Get 3 for the price of 2" discount,
  // where the discounted pieces are always the ones with the lowest price.
  // In a production environment, a promotion with these (or even different) rules could be
  // applied to a cart, changing the total price.
  const getTotalPrice = (cart) => {
    let total = 0;
    let itemsCount = 0;

    const prices = [];
    cart.items.forEach((item) => {
      const { price, quantity } = item;
      total += price * quantity;
      itemsCount += quantity;

      for (let i = 0; i < quantity; i += 1) {
        prices.push(price);
      }
    });
    prices.sort((a, b) => a - b);

    const discountedItems = Math.floor(itemsCount / 3);
    if (discountedItems > 0) {
      for (let i = 0; i < discountedItems; i += 1) {
        total -= prices[i];
      }
    }

    return total;
  };

  // Gets the cart.
  const getCart = async () => {
    const cart = await cartRepository.getCart();
    return cart;
  };

  // Adds products to a cart. If the product already exists in the cart, the quantity is updated.
  const addProduct = async (productId, quantity, price) => {
    const cart = await cartRepository.getCart();

    const cartItem = cart.items.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ productId, price, quantity });
    }

    cart.totalPrice = getTotalPrice(cart);

    await cartRepository.updateCart(cart);

    return cart;
  };

  // Removes products from a cart. Removes the product item if the quantity is 0 or less.
  const removeProduct = (cart, product, quantity) => {
    const cartProduct = cart.items.filter((item) => item.productId === product.id);

    if (cartProduct.length === 0) {
      return cart;
    }
    const item = cartProduct[0];
    item.quantity -= quantity;
    if (item.quantity <= 0) {
      const updatedCart = { ...cart };

      updatedCart.items = cart.items.filter((cartItem) => cartItem.productId !== product.id);

      return updatedCart;
    }

    return cart;
  };

  return {
    getCart,
    addProduct,
    removeProduct,
    getTotalPrice,
  };
};

module.exports = init;
