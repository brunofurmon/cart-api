class Cart {
  constructor({ items, totalPrice }) {
    this.items = items || [];
    this.totalPrice = totalPrice || 0;
  }
}

module.exports = Cart;
