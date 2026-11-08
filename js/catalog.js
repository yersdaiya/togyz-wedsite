'use strict';

const productCategories = {
  1: 'shirts', 2: 'trousers', 3: 'shirts', 4: 'trousers',
  5: 'shirts', 6: 'tshirts', 7: 'trousers', 8: 'dresses',
  9: 'shirts', 10: 'trousers', 11: 'tops', 12: 'skirts'
};

const catalogCategoryLabels = {
  kz: {
    all: 'Барлық категория', trousers: 'Шалбар', shirts: 'Жейде / рубашка',
    dresses: 'Көйлек', tshirts: 'Футболка', tops: 'Блузка / кофта', skirts: 'Белдемше'
  },
  ru: {
    all: 'Все категории', trousers: 'Брюки', shirts: 'Рубашки',
    dresses: 'Платья', tshirts: 'Футболки', tops: 'Блузки / кофты', skirts: 'Юбки'
  },
  en: {
    all: 'All categories', trousers: 'Trousers', shirts: 'Shirts',
    dresses: 'Dresses', tshirts: 'T-shirts', tops: 'Tops', skirts: 'Skirts'
  }
};

let activeCategory = 'all';
let activeSearchText = '';

document.addEventListener('DOMContentLoaded', () => {
  createCatalogSearch();
  renderLookCards();
  updateCartBadge();
});

window.renderCatalog = function() {
  createCatalogSearch();
  renderLookCards();
  updateCartBadge();
};

window.addEventListener('language-changed', () => {
  createCatalogSearch();
  renderLookCards();
  updateCartBadge();
});

function createCatalogSearch() {
  const container = document.getElementById('product-grid-container');
  if (!container) return;

  let toolbar = document.getElementById('catalog-search-toolbar');
  if (!toolbar) {
    toolbar = document.createElement('div');
    toolbar.id = 'catalog-search-toolbar';
    toolbar.className = 'row g-2 align-items-center mb-4';
    container.parentNode.insertBefore(toolbar, container);
  }

  const lang = localStorage.getItem('selectedLanguage') || 'kz';
  const labels = catalogCategoryLabels[lang] || catalogCategoryLabels.kz;
  const placeholder = lang === 'ru' ? 'Поиск товара...' : lang === 'en' ? 'Search products...' : 'Тауарды іздеу...';
  const searchLabel = lang === 'ru' ? 'Поиск' : lang === 'en' ? 'Search' : 'Іздеу';

  toolbar.innerHTML = `
    <div class="col-12 col-md-6">
      <label for="catalog-search-input" class="form-label small fw-semibold mb-1">${searchLabel}</label>
      <input id="catalog-search-input" type="search" class="form-control"
        placeholder="${placeholder}" value="${escapeCatalogText(activeSearchText)}">
    </div>
    <div class="col-12 col-md-6">
      <label for="catalog-category-select" class="form-label small fw-semibold mb-1">${lang === 'ru' ? 'Категория' : lang === 'en' ? 'Category' : 'Категория'}</label>
      <select id="catalog-category-select" class="form-select">
        ${Object.entries(labels).map(([value, label]) =>
          `<option value="${value}" ${activeCategory === value ? 'selected' : ''}>${label}</option>`
        ).join('')}
      </select>
    </div>
  `;

  const searchInput = toolbar.querySelector('#catalog-search-input');
  const categorySelect = toolbar.querySelector('#catalog-category-select');

  searchInput.addEventListener('input', () => {
    activeSearchText = searchInput.value.trim().toLocaleLowerCase();
    renderLookCards();
  });

  categorySelect.addEventListener('change', () => {
    activeCategory = categorySelect.value;
    renderLookCards();
  });
}

function escapeCatalogText(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function productMatchesFilters(item, lang) {
  const category = productCategories[item.id] || 'tops';
  if (activeCategory !== 'all' && category !== activeCategory) return false;

  if (!activeSearchText) return true;

  const searchableText = [
    item.nameKz, item.nameRu, item.nameEn,
    catalogCategoryLabels.kz[category],
    catalogCategoryLabels.ru[category],
    catalogCategoryLabels.en[category]
  ].join(' ').toLocaleLowerCase();

  const aliases = {
    trousers: 'шалбар брюки pants trousers джинсы',
    shirts: 'рубашка рубашки жейде shirt shirts блузка blouse',
    dresses: 'көйлек платье dress dresses',
    tshirts: 'футболка футболки t-shirt tshirt',
    tops: 'кофта кофты блузка топ blouse top',
    skirts: 'юбка юбки белдемше skirt skirts'
  };

  return searchableText.includes(activeSearchText) ||
    (aliases[category] || '').includes(activeSearchText);
}

function renderLookCards() {
  const container = document.getElementById('product-grid-container');
  if (!container) return;

  container.innerHTML = '';
  const lang = localStorage.getItem('selectedLanguage') || 'kz';
  const labelSizeText = translations[lang]?.labelSize || 'Size:';
  const btnAddToCartText = translations[lang]?.btnAddToCart || 'Add to Cart';

  let visibleProducts = 0;

  looksData.forEach(look => {
    const filteredItems = look.items.filter(item => productMatchesFilters(item, lang));
    if (filteredItems.length === 0) return;
    visibleProducts += filteredItems.length;

    const lookTitle = lang === 'ru' ? look.titleRu : (lang === 'en' ? look.titleEn : look.titleKz);
    const lookDesc = lang === 'ru' ? look.descRu : (lang === 'en' ? look.descEn : look.descKz);

    const lookBlock = document.createElement('div');
    lookBlock.className = 'look-card-wrapper mb-5 p-4 rounded-4 border shadow-sm';
    lookBlock.style.backgroundColor = '#FDFCF9';

    let itemsHTML = '';
    const totalItems = filteredItems.length;

    filteredItems.forEach((item, index) => {
      const itemName = lang === 'ru' ? item.nameRu : (lang === 'en' ? item.nameEn : item.nameKz);

      itemsHTML += `
        <div class="col-12 col-sm-6">
          <div class="card h-100 border-0 rounded-4 p-3 shadow-sm position-relative" style="background-color: #FFFFFF;">
            <div class="position-absolute top-0 start-0 m-3 z-1">
              <span class="badge text-dark bg-light border opacity-75">${index + 1}/${totalItems}</span>
            </div>
            <div class="text-center mb-3">
              <img src="${item.image}" class="img-fluid rounded-3" alt="${escapeCatalogText(itemName)}" style="height: 280px; object-fit: contain;">
            </div>
            <div class="card-body p-0 d-flex flex-column text-start">
              <h3 class="h6 fw-bold mb-1 text-dark">${escapeCatalogText(itemName)}</h3>
              <p class="fw-bold fs-5 mb-2" style="color: #5C061C;">${item.price.toLocaleString()} ₸</p>
              <div class="mb-3">
                <label class="form-label small text-muted mb-1 d-block">${labelSizeText}</label>
                <div class="btn-group w-100 size-selector-group" role="group">
                  <input type="radio" class="btn-check" name="size-${item.id}" id="size-s-${item.id}" value="S" checked>
                  <label class="btn btn-outline-secondary btn-sm" for="size-s-${item.id}">S</label>
                  <input type="radio" class="btn-check" name="size-${item.id}" id="size-m-${item.id}" value="M">
                  <label class="btn btn-outline-secondary btn-sm" for="size-m-${item.id}">M</label>
                  <input type="radio" class="btn-check" name="size-${item.id}" id="size-l-${item.id}" value="L">
                  <label class="btn btn-outline-secondary btn-sm" for="size-l-${item.id}">L</label>
                  <input type="radio" class="btn-check" name="size-${item.id}" id="size-xl-${item.id}" value="XL">
                  <label class="btn btn-outline-secondary btn-sm" for="size-xl-${item.id}">XL</label>
                </div>
              </div>
              <button type="button" class="btn btn-sm w-100 mt-auto py-2 fw-semibold add-to-cart-btn"
                data-id="${item.id}" style="background-color: #5C061C; color: #ffffff; border: none; border-radius: 8px;">
                🛍️ ${btnAddToCartText}
              </button>
            </div>
          </div>
        </div>
      `;
    });

    lookBlock.innerHTML = `
      <div class="row g-4 align-items-stretch">
        <div class="col-12 col-lg-5">
          <div class="h-100 rounded-4 overflow-hidden shadow-sm">
            <img src="${look.lookImage}" class="w-100 h-100 object-fit-cover" alt="${escapeCatalogText(lookTitle)}" style="min-height: 420px; max-height: 580px;">
          </div>
        </div>
        <div class="col-12 col-lg-7 d-flex flex-column justify-content-between">
          <div class="mb-3">
            <h2 class="display-6 fw-bold mb-1" style="color: #5C061C; font-family: serif;">${escapeCatalogText(lookTitle)}</h2>
            <p class="fst-italic text-secondary fs-6 mb-0">${escapeCatalogText(lookDesc)}</p>
          </div>
          <div class="row g-3">${itemsHTML}</div>
        </div>
      </div>
    `;
    container.appendChild(lookBlock);
  });

  if (visibleProducts === 0) {
    const lang = localStorage.getItem('selectedLanguage') || 'kz';
    const message = lang === 'ru' ? 'Товары не найдены' : lang === 'en' ? 'No products found' : 'Тауар табылмады';
    container.innerHTML = `<p class="text-center text-muted py-5">${message}</p>`;
  }

  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = parseInt(btn.getAttribute('data-id'), 10);
      const selectedSizeInput = document.querySelector(`input[name="size-${itemId}"]:checked`);
      const size = selectedSizeInput ? selectedSizeInput.value : 'S';
      addToCart(itemId, size);
      btn.classList.add('btn-bounce');
      setTimeout(() => btn.classList.remove('btn-bounce'), 200);
    });
  });
}

function addToCart(itemId, size) {
  const item = productsData.find(p => p.id === itemId);
  if (!item) return;

  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingIndex = cart.findIndex(c => c.id === itemId && c.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({
      id: item.id, nameKz: item.nameKz, nameRu: item.nameRu, nameEn: item.nameEn,
      price: item.price, image: item.image, size: size, color: 'Black', quantity: 1
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  document.querySelectorAll('a[href="cart.html"]').forEach(link => {
    const lang = localStorage.getItem('selectedLanguage') || 'kz';
    const t = translations[lang] || translations.kz;
    const baseText = t.navCart ? t.navCart.replace('🛒', '').trim() : 'СЕБЕТ';
    link.innerHTML = totalCount > 0
      ? `${baseText} <span class="badge rounded-pill bg-danger bounce-animation" id="cart-badge-count">${totalCount}</span> 🛒`
      : `${baseText} 🛒`;
  });
}

window.updateCartBadge = updateCartBadge;