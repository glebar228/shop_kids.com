const infoProduct = JSON.parse(localStorage.getItem('infoproduct')) || [];
const wrapperinfomainleft = document.querySelector('.wrapper-info-main-left');
const getCart = JSON.parse(localStorage.getItem('cart')) || [];
const totalCards = document.querySelector('.total-cart');
const imginfoproduct = document.querySelector('.img-info-bottom');
const imginfoproduct2 = document.querySelector('.img-info-bottom2');

function renderInfoCard() {
  for (let key in infoProduct) {
    const {
      id,
      img,
      title,
      articul,
      price,
      scladem,
      quantity = 1,
    } = infoProduct;

    const imgHome = document.querySelector('.img-hom');
    imgHome.style.marginTop = '30px';
    imgHome.src = img;

    imginfoproduct.src = img;
    imginfoproduct2.src = img;

    const articultext = document.querySelector('.artikul');
    articultext.textContent = articul;

    const titleInfoCard = document.querySelector('.title-info-card');
    titleInfoCard.textContent = title;

    const spanprice = document.querySelector('.span-price');
    spanprice.textContent = `${price.toLocaleString('kk-KZ') + 'тг.'}`;

    const sklademnumb = document.querySelector('.scladem-numb');
    sklademnumb.textContent = scladem;

    const infoQuantity = document.querySelector('.info-quantity');
    infoQuantity.textContent = quantity;
    const inCart = getCart.find((item) => item.id == id);

    infoQuantity.textContent = quantity;

    if (inCart) {
      infoQuantity.textContent = inCart.quantity;
    }
  }
}

renderInfoCard();

const totalQuan = getCart.reduce((prev, product) => {
  return prev + product.quantity;
}, 0);

totalCards.textContent = totalQuan;

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-info-add-cart')) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existCart = cart.find((item) => item.id == infoProduct.id);
    if (existCart) {
      if (existCart.quantity >= infoProduct.scladem) return;

      existCart.quantity++;
      totalCards.textContent++;
      document.querySelector('.info-quantity').textContent++;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart.push(infoProduct);
      totalCards.textContent++;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  } else if (e.target.classList.contains('btnPlus')) {
    const id = infoProduct.id;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const inCart = cart.find((item) => item.id == id);

    if (inCart) {
      if (inCart.quantity >= infoProduct.scladem) return;
      inCart.quantity++;
      totalCards.textContent++;
      document.querySelector('.info-quantity').textContent++;
      if (
        document.querySelector('.info-quantity').textContent >=
        infoProduct.scladem
      ) {
        document.querySelector('.info-quantity').textContent =
          infoProduct.scladem;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  } else if (e.target.classList.contains('btnMainus')) {
    const id = infoProduct.id;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const inCart = cart.find((item) => item.id == id);

    if (inCart) {
      inCart.quantity--;
      if (inCart.quantity <= 1) {
        inCart.quantity = 1;
      }

      document.querySelector('.info-quantity').textContent--;
      if (document.querySelector('.info-quantity').textContent <= 1) {
        document.querySelector('.info-quantity').textContent = 1;
      }
    }
    totalCards.textContent--;
    if (totalCards.textContent <= 1) {
      totalCards.textContent = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
});
