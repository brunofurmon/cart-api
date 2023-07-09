const init = () => ({
  // Adds products to a cart. If the product already exists in the cart, the quantity is updated.
  addProduct: (cart, product, quantity) => {
    const cartItem = cart.items.find((item) => item.productId === product.id);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ productId: product.id, price: product.price, quantity });
    }
    return cart;
  },

  // Removes products from a cart. Removes the product item if the quantity is 0 or less.
  removeProduct: (cart, product, quantity) => {
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
  },

  // In this project, total price always returns the "Get 3 for the price of 2" discount,
  // where the discounted pieces are always the ones with the lowest price.
  // In a production environment, a promotion with these (or even different) rules could be
  // applied to a cart, changing the total price.
  getTotalPrice: (cart) => {
    // get the cart items in price order
    const sortedItems = cart.items.sort((a, b) => a.price - b.price);
    let total = 0;
    let itemsCount = 0;

    sortedItems.forEach((item) => {
      total += item.price * item.quantity;
      itemsCount += item.quantity;
    });

    const discountedItems = Math.floor(itemsCount / 3);
    if (discountedItems > 0) {
      for (let i = 0; i < discountedItems; i += 1) {
        total -= sortedItems[i].price;
      }
    }

    return total;
  },
});

module.exports = init;
