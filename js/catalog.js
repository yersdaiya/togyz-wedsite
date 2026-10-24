'use strict';

document.addEventListener('DOMContentLoaded', () => {
  renderLookCards();
});

// Тіл өзгергенде динамикалық түрде қайта рендер жасау
window.renderCatalog = function() {
  renderLookCards();
};

window.addEventListener('language-changed', () => {
  renderLookCards();
});

function renderLookCards() {
  const container = document.getElementById('product-grid-container');
  if (!container) return;

  container.innerHTML = '';
  const lang = localStorage.getItem('selectedLanguage') || 'kz';

  const labelSizeText = translations[lang]?.labelSize || 'Size:';
  const btnAddToCartText = translations[lang]?.btnAddToCart || 'Add to Cart';

  looksData.forEach(look => {
    const lookTitle = lang === 'ru' ? look.titleRu : (lang === 'en' ? look.titleEn : look.titleKz);
    const lookDesc = lang === 'ru' ? look.descRu : (lang === 'en' ? look.descEn : look.descKz);

    const lookBlock = document.createElement('div');
    lookBlock.className = 'look-card-wrapper mb-5 p-4 rounded-4 border shadow-sm';
    lookBlock.style.backgroundColor = '#FDFCF9';

    let itemsHTML = '';
    const totalItems = look.items.length;

    look.items.forEach((item, index) => {
      const itemName = lang === 'ru' ? item.nameRu : (lang === 'en' ? item.nameEn : item.nameKz);

      itemsHTML += `
        <div class="col-12 col-sm-6">
          <div class="card h-100 border-0 rounded-4 p-3 shadow-sm position-relative" style="background-color: #FFFFFF;">
            
            <div class="position-absolute top-0 start-0 m-3 z-1">
              <span class="badge text-dark bg-light border opacity-75">${index + 1}/${totalItems}</span>
            </div>

            <div class="text-center mb-3">
              <img src="${item.image}" class="img-fluid rounded-3" alt="${itemName}" style="height: 280px; object-fit: contain;">
            </div>

            <div class="card-body p-0 d-flex flex-column text-start">
              <h3 class="h6 fw-bold mb-1 text-dark">${itemName}</h3>
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

              <button type="button" class="btn btn-sm w-100 mt-auto py-2 fw-semibold add-to-cart-btn" data-id="${item.id}" style="background-color: #5C061C; color: #ffffff; border: none; border-radius: 8px;">
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
            <img src="${look.lookImage}" class="w-100 h-100 object-fit-cover" alt="${lookTitle}" style="min-height: 420px; max-height: 580px;">
          </div>
        </div>

        <div class="col-12 col-lg-7 d-flex flex-column justify-content-between">
          <div class="mb-3">
            <h2 class="display-6 fw-bold mb-1" style="color: #5C061C; font-family: serif;">${lookTitle}</h2>
            <p class="fst-italic text-secondary fs-6 mb-0">${lookDesc}</p>
          </div>

          <div class="row g-3">
            ${itemsHTML}
          </div>
        </div>
      </div>
    `;

    container.appendChild(lookBlock);
  });
}