'use strict';

let userCart = JSON.parse(localStorage.getItem('userCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderCartUI();
  updateCartBadge();

  // Кликті ұстау (себетке қосу, көбейту, азайту)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      if (btn.dataset.processing === 'true') return;
      btn.dataset.processing = 'true';
      setTimeout(() => { delete btn.dataset.processing; }, 300);

      const productId = parseInt(btn.getAttribute('data-id'));
      const card = btn.closest('.card');
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

      btn.classList.add('btn-bounce');
      setTimeout(() => btn.classList.remove('btn-bounce'), 200);
    }
  });

  window.addEventListener('language-changed', () => {
    renderCartUI();
    updateCartBadge();
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
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem('userCart', JSON.stringify(userCart));
  renderCartUI();
}

// Тауар санын азайту (-)
window.decreaseQty = function(index) {
  if (userCart[index].quantity > 1) {
    userCart[index].quantity -= 1;
  } else {
    userCart.splice(index, 1); // 1-ден азайса, өшіріледі
  }
  saveCart();
  updateCartBadge();
};

// Тауар санын көбейту (+)
window.increaseQty = function(index) {
  userCart[index].quantity += 1;
  saveCart();
  updateCartBadge();
};

window.removeItem = function(index) {
  userCart.splice(index, 1);
  saveCart();
  updateCartBadge();
};

function updateCartBadge() {
  const totalCount = userCart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const cartNavLinks = document.querySelectorAll('a[href="cart.html"]');
  cartNavLinks.forEach(link => {
    const lang = localStorage.getItem('selectedLanguage') || 'kz';
    const t = typeof translations !== 'undefined' ? (translations[lang] || translations.kz) : null;
    const baseText = t && t.navCart ? t.navCart.replace('🛒', '').trim() : 'СЕБЕТ';

    if (totalCount > 0) {
      link.innerHTML = `${baseText} <span class="badge rounded-pill bg-danger bounce-animation" id="cart-badge-count">${totalCount}</span> 🛒`;
    } else {
      link.innerHTML = `${baseText} 🛒`;
    }
  });
}

function renderCartUI() {
  const cartList = document.getElementById('cart-items-list');
  const cartTotal = document.getElementById('cart-total-price');
  const cartCount = document.getElementById('cart-item-count');
  const emptyMsg = document.getElementById('empty-cart-message');

  if (!cartList) return;
  cartList.innerHTML = '';

  const lang = localStorage.getItem('selectedLanguage') || 'kz';

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
    const itemColor = lang === 'ru' ? product.colorRu : (lang === 'en' ? product.colorEn : product.colorKz);

    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;
    totalItems += item.quantity;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="align-middle"><strong>${itemName}</strong></td>
      <td class="align-middle"><span class="badge text-bg-light border px-2 py-1">${item.size}</span></td>
      <td class="align-middle">${itemColor}</td>
      <td class="align-middle">
        <div class="d-inline-flex align-items-center gap-2">
          <button type="button" class="btn cart-qty-btn" onclick="decreaseQty(${index})">-</button>
          <span class="cart-qty-count">${item.quantity}</span>
          <button type="button" class="btn cart-qty-btn" onclick="increaseQty(${index})">+</button>
        </div>
      </td>
      <td class="fw-bold text-end align-middle">${itemTotal.toLocaleString()} ₸</td>
      <td class="text-center align-middle">
        <button type="button" class="btn btn-outline-danger btn-sm rounded-circle px-2" onclick="removeItem(${index})">✕</button>
      </td>
    `;
    cartList.appendChild(row);
  });

  if (cartTotal) cartTotal.textContent = `${totalSum.toLocaleString()} ₸`;
  if (cartCount) cartCount.textContent = totalItems.toString();
}