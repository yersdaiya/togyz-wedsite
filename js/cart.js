'use strict';

let userCart = JSON.parse(localStorage.getItem('userCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderCartUI();

  // Добавление в корзину
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      
      const card = e.target.closest('.card');
      let selectedSize = 'S';

      if (card) {
        const checkedRadio = card.querySelector('input[type="radio"]:checked');
        const selectBox = card.querySelector('select');
        if (checkedRadio) {
          selectedSize = checkedRadio.value;
        } else if (selectBox) {
          selectedSize = selectBox.value;
        }
      }

      addToCart(productId, selectedSize);
    }
  });

  // Перерисовка корзины при смене языка
  window.addEventListener('language-changed', () => {
    renderCartUI();
  });
});

function addToCart(id, size) {
  const product = productsData.find(p => p.id === id);
  if (!product) return;

  const existing = userCart.find(item => item.id === id && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    userCart.push({
      id: product.id,
      price: product.price,
      size: size,
      quantity: 1
    });
  }

  saveCart();

  const lang = localStorage.getItem('selectedLanguage') || 'kz';
  const successMsg = lang === 'ru' ? 'Товар добавлен в корзину! 🛒' : 
                    (lang === 'en' ? 'Item added to cart! 🛒' : 'Тауар себетке сәтті қосылды! 🛒');
  alert(successMsg);
}

function saveCart() {
  localStorage.setItem('userCart', JSON.stringify(userCart));
  renderCartUI();
}

function renderCartUI() {
  const cartList = document.getElementById('cart-items-list');
  const cartTotal = document.getElementById('cart-total-price');
  const cartCount = document.getElementById('cart-item-count');
  const emptyMsg = document.getElementById('empty-cart-message');

  if (!cartList) return;
  cartList.innerHTML = '';

  const lang = localStorage.getItem('selectedLanguage') || 'kz';
  const colorText = lang === 'ru' ? 'Черный' : (lang === 'en' ? 'Black' : 'Қара');

  if (userCart.length === 0) {
    if (emptyMsg) emptyMsg.classList.remove('d-none');
    if (cartTotal) cartTotal.textContent = '0 ₸';
    if (cartCount) cartCount.textContent = '0';
    return;
  }

  if (emptyMsg) emptyMsg.classList.add('d-none');

  let totalSum = 0;
  let totalItems = 0;

  userCart.forEach((item, index) => {
    const product = productsData.find(p => p.id === item.id);
    if (!product) return;

    const itemName = lang === 'ru' ? product.nameRu : (lang === 'en' ? product.nameEn : product.nameKz);
    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;
    totalItems += item.quantity;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${itemName}</strong></td>
      <td><span class="badge text-bg-light border px-2 py-1">${item.size}</span></td>
      <td>${colorText}</td>
      <td class="fw-bold text-end">${itemTotal.toLocaleString()} ₸</td>
      <td class="text-center">
        <button type="button" class="btn btn-outline-danger btn-sm rounded-circle px-2" onclick="removeItem(${index})">✕</button>
      </td>
    `;
    cartList.appendChild(row);
  });

  if (cartTotal) cartTotal.textContent = `${totalSum.toLocaleString()} ₸`;
  if (cartCount) cartCount.textContent = totalItems.toString();
}

window.removeItem = function(index) {
  userCart.splice(index, 1);
  saveCart();
};