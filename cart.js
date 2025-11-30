const btnContinue = document.querySelector('.btn-continue');

let getCart = JSON.parse(localStorage.getItem('cart')) || [];
const cart = document.querySelector('.cart');
const totalPriceNds = document.querySelector('.totalPriceNds');
const textNds = document.querySelector('.text-nds');
const countCard = document.querySelector('.countCard');
const totalPrice = document.querySelector('.totalPrice');
const wrapperCartLeft = document.querySelector('.wrapper-cart-left');
const btnClearCart = document.querySelector('.btn-clear-cart');
const listcartprices = document.querySelector('.list-cart-prices');
const totalCardes = document.querySelector('.total-cart')

function renderCart() {
  cart.innerHTML = '';
  listcartprices.innerHTML = ""

  const totalQuantity = getCart.reduce((prev, product) => {
    return prev + product.quantity;
  }, 0)

  totalCardes.textContent = totalQuantity

  if (getCart.length === 0) {
    wrapperCartLeft.style.display = 'flex';
    wrapperCartLeft.style.alignItems = 'center';
    wrapperCartLeft.style.justifyContent = 'center';
    wrapperCartLeft.innerHTML = `<p class="cart-empty">Kорзина пуста</p>`;
    document.querySelector('.wrapper-cart-right').style.display = 'none';
    document.querySelector('.btn-clear-cart').style.display = 'none';
  }

  const totalCard = getCart.reduce((prev, item) => {
    return prev + item.quantity;
  }, 0);

  countCard.textContent = `${totalCard}` + ' шт.';

  const total = getCart.reduce((prev, item) => {
    return (prev + item.price * item.quantity) * 1.12;
  }, 0);

  const totalCartPrice = getCart.reduce((prev, item) => {
    return prev + item.price * item.quantity;
  }, 0);

  const nds = total - totalCartPrice;
  textNds.textContent = `${nds.toLocaleString('kk-KZ') + ' тг.'}`;

  totalPriceNds.textContent = `${total.toLocaleString('kk-KZ') + ' тг.'}`;

  totalPrice.textContent = `${totalCartPrice.toLocaleString('kk-KZ')} тг.`;

  if (getCart) {
    getCart.forEach((product, index) => {
      const { id, img, title, articul, scladem, price, quantity = 1 } = product;

      const quaPrice = price * quantity;

      const quaPriceLocal = quaPrice.toLocaleString('kk-KZ')

      const newCard = document.createElement('div');
      newCard.setAttribute('id', id);
      newCard.className = 'card-cart';
      newCard.innerHTML = `
        <img src="${img}" alt="img" class="img-cart-card" />
            <ul class="card-params">
                 <li class="title-cart-card">${title}</li>
                <li>
                 <span class="artilcl-number"> ${articul}</span>
                  </li>
                  <li><span class="params">В наличии: ${scladem}</span></li>
                </ul>
                <span class="price-cart-one">${
                  price.toLocaleString('kk-KZ') + ' тг'
                } TG</span>
                <div class="warapper-info-quantity">
                  <span data-index="${index}" class="btnMainus">-</span>
                  <span class="info-quantity">${quantity}</span>
                  <span data-index="${index}" class="btnPlus">+</span>
                </div>
                <span>x</span>
                <span class="price-cart">${
                  quaPriceLocal + ' тг'
                }</span>
                <button data-index="${index}"
                class="btn-cart-card-delete">X</button>
            `;
      cart.appendChild(newCard);

      const li = document.createElement('li');
      li.innerHTML = `
              <span class="title-cart-right">${title}</span>
                 <div class="warapper-info-quantity">
                   <span data-index='${index}'class="btnMainus">-</span>
                    <span class="info-quantity">${quantity}</span>
                  <span data-index="${index}" class="btnPlus">+</span>
                </div>
              <span data-index="${index}" class="price-cart-right">${quaPriceLocal + 'тг.'}</span>
      `

      listcartprices.appendChild(li)
    });
  }
}

renderCart();


document.addEventListener('click', (e) => {
  const index = e.target.getAttribute('data-index');
  if (e.target.classList.contains('btnPlus')) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    if(getCart[index].quantity >= getCart[index].scladem) {
      getCart[index].quantity = getCart[index].scladem
    }
    getCart[index].quantity++;
  } else if (e.target.classList.contains('btnMainus')) {
    getCart[index].quantity--;
    if (getCart[index].quantity <= 1) {
      getCart[index].quantity = 1;
    }
  } else if (e.target.classList.contains('btn-cart-card-delete')) {
    getCart.splice(index, 1);
  } else if (e.target.classList.contains('btn-clear-cart')) {
    localStorage.removeItem('cart');
    getCart = []
  }

  localStorage.setItem('cart', JSON.stringify(getCart));
  renderCart();
});

btnContinue.addEventListener('click', () => {
  location.href = 'index.html';
});
