class Cart {
  constructor({ id, userId, cartItems }) {
    this.id = id;
    this.userId = userId;
    this.items = cartItems;
  }
}

module.exports = Cart;
