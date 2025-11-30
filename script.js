/** @format */
const cards = document.querySelectorAll('.card');
const wrapperSlider = document.querySelector('.warpper-slider');
const widthCard = document.querySelector('.card').clientWidth + 20;
const setCard = document.querySelectorAll('.card');
const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const btnGoup = document.querySelector('.btn-goup');
const totalCard = document.querySelector('.total-cart');
const quantityCount = document.querySelectorAll('.quantity-count');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function updataQu() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  document.querySelectorAll('.card').forEach((card, index) => {
    const id = card.id;

    const quantityEl = card.querySelector('.quantity-count');

    const incart = cart.find((item) => item.id == id);

    quantityEl.textContent = incart ? incart.quantity : 1;
  });
  localStorage.setItem('cart', JSON.stringify(cart))
}

updataQu()


const total = cart.reduce((prev, product) => {
  return prev + product.quantity;
}, 0);

totalCard.textContent = total;

document.addEventListener('scroll', goup);
btnGoup.addEventListener('click', scrollGoup);

function goup() {
  const offset = document.documentElement.clientHeight;
  const coords = window.pageYOffset;

  if (coords > offset) {
    btnGoup.classList.add('active');
  } else {
    btnGoup.classList.remove('active');
  }
}

function scrollGoup() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -70);
    setTimeout(scrollGoup, 0);
  }
}

let daySale = 4;

const endDate = new Date();
endDate.setDate(endDate.getDate() + daySale);

const timer = setInterval(() => {
  const now = new Date();
  const diff = endDate - now;

  if (diff <= 0) {
    clearInterval(timer);
    days.textContent = 0;
    hours.textContent = 0;
    minutes.textContent = 0;
    seconds.textContent = 0;
    return;
  }

  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
  const secondsLeft = Math.floor((diff / 1000) % 60);

  days.textContent = daysLeft;
  hours.textContent = hoursLeft;
  minutes.textContent = minutesLeft;
  seconds.textContent = secondsLeft;
}, 1000);

document.addEventListener(
  'click',
  (e) => {
    if (e.target.classList.contains('btn-detaile')) {
      location.href = 'infoproduct.html';
    } else if (e.target.closest('#btnRight')) {
      wrapperSlider.scrollLeft += widthCard;
    } else if (e.target.closest('#btnLeft')) {
      wrapperSlider.scrollLeft -= widthCard;
    }
  },
  1000,
);

cards.forEach((card, index) => {
  const wrapperStars = card.querySelector('.wrapper-stars');

  const isCartStorege = JSON.parse(localStorage.getItem('cart')) || [];

  const incart = isCartStorege.some((item) => item.id == card.id);

  if (incart) {
    const btnAdd = card.querySelector('.btn-add-cart');
    btnAdd.classList.add('active');
    btnAdd.textContent = 'В корзине';
  }

  let starCount = parseInt(localStorage.getItem(`starCount_${index}`)) || 0;
  let removing = false;

  function renderStars() {
    wrapperStars.innerHTML = '';
    if (starCount === 0) {
      wrapperStars.innerHTML = `<img src="img/starEmpty.png" alt="starEmpty" class="img-star-empty">`;
    } else {
      for (let i = 0; i < starCount; i++) {
        const img = document.createElement('img');
        img.className = 'img-star';
        img.src = 'img/star.png';
        wrapperStars.appendChild(img);
      }
    }
  }

  function updateStars() {
    if (!removing) {
      starCount++;
      if (starCount >= 5) removing = true;
    } else {
      starCount--;
      if (starCount <= 0) {
        removing = false;
        starCount = 0;
      }
    }

    localStorage.setItem(`starCount_${index}`, starCount);
    renderStars();
  }

  renderStars();

  wrapperStars.addEventListener('click', updateStars);
});

//add to cart

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-add-cart')) {
    const cartElem = e.target.closest('.card');
    const id = cartElem.id;
    const img = cartElem.querySelector('.img-card').src;
    const title = cartElem.querySelector('.title-card').textContent;
    const articul = cartElem.querySelector('.card-cod').textContent;
    const prices = cartElem.querySelector('.price-card').textContent;
    const price = parseInt(prices.replace(/\D/g, ''), 10);
        const scladem = Math.round(Math.random() * 20);

    const card = { id, img, title, articul, scladem, price, quantity: 1 };
    const getCart = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(getCart);
    const existCart = cart.find((item) => item.id == id);
    if (existCart) {
      existCart.quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart.push(card);
      e.target.classList.add('active');
      e.target.textContent = 'В корзине';

      const total = cart.reduce((prev, product) => {
        return prev + product.quantity;
      }, 0);

      totalCard.textContent = total;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  } else if (e.target.classList.contains('btn-detaile')) {
    const cartElem = e.target.closest('.card');
    const id = cartElem.id;
    const img = cartElem.querySelector('.img-card').src;
    const title = cartElem.querySelector('.title-card').textContent;
    const articul = cartElem.querySelector('.card-cod').textContent;
    const prices = cartElem.querySelector('.price-card').textContent;
    const price = parseInt(prices.replace(/\D/g, ''), 10);
    const scladem = Math.round(Math.random() * 20);

    const card = { id, img, title, articul, price, scladem, quantity: 1 };

    localStorage.setItem('infoproduct', JSON.stringify(card));
  } else if (e.target.classList.contains('plus')) {
    const cardEl = e.target.closest('.card');
    const id = cardEl.id

    updateQuantityPlus(id);


  } else if (e.target.classList.contains('mainus')) {
    const cardEl = e.target.closest('.card');
    const id = cardEl.id
    updateQuantityMainus(id)

  } else if (e.target.classList.contains('img-card')) {
    const cardElem = e.target.closest('.card');
    const img = cardElem.querySelector('.img-card').src;
    const title = cardElem.querySelector('.title-card').textContent;
    const price = cardElem.querySelector('.price-card').textContent;

    const imgPopup = document.querySelector('.img-popup');
    const titlePopup = document.querySelector('.title-popup');
    const pricePopup = document.querySelector('.price-popup');

    imgPopup.src = img;
    titlePopup.textContent = title;
    pricePopup.textContent = price;

    document.querySelector('.wrapper-popup').classList.add('active');
  } else if (e.target.classList.contains('btn-popup')) {
    document.querySelector('.wrapper-popup').classList.remove('active');
  }
});

function updateQuantityPlus(id) {

  const cartDate = JSON.parse(localStorage.getItem('cart')) || []

  const productInCart = cartDate.find((item) => item.id == id);

  if (productInCart) {
    productInCart.quantity++;
    localStorage.setItem('cart', JSON.stringify(cartDate))
    updataQu()

  }


  localStorage.setItem('cart', JSON.stringify(cartDate));
}

function updateQuantityMainus(id) {

  const cartDate = JSON.parse(localStorage.getItem('cart')) || []

  const productInCart = cartDate.find((item) => item.id == id);

  if (productInCart) {
    productInCart.quantity--;
    if(productInCart.quantity <= 1) {
      productInCart.quantity = 1
    }
    localStorage.setItem('cart', JSON.stringify(cartDate))
    updataQu()

  }


  localStorage.setItem('cart', JSON.stringify(cartDate));
}

//animation

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

const callback = (entires, observer) => {
  entires.forEach((enty) => {
    if (enty.isIntersecting) {
      enty.target.classList.add('active');
      observer.unobserve(enty.target);
    }
  });
};

const observer = new IntersectionObserver(callback, options);
const targets = document.querySelectorAll('.anim');
targets.forEach((targe) => {
  observer.observe(targe);
});
