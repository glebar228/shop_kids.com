

const getCart = JSON.parse(localStorage.getItem('cart')) || [];
const totalCards = document.querySelector('.total-cart');

const totalQuan = getCart.reduce((prev, product) => {
  return prev + product.quantity;
}, 0);

totalCards.textContent = totalQuan
