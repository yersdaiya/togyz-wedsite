'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setupLanguageDropdown();
  updateAuthUI();
  initScrollAnimations();
  
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }

  const savedLang = localStorage.getItem('selectedLanguage') || 'kz';
  changeLanguage(savedLang);
});

function setupLanguageDropdown() {
  const langSelect = document.getElementById('language-select');
  
  if (!langSelect) {
    const authContainer = document.querySelector('#mainNavbar .auth-buttons-container') || document.querySelector('#mainNavbar .d-flex');
    if (authContainer) {
      const langWrapper = document.createElement('div');
      langWrapper.className = 'ms-2 d-inline-block align-middle';
      langWrapper.innerHTML = `
        <select id="language-select" class="form-select form-select-sm" style="width: auto; cursor: pointer; border-color: #5C061C; color: #5C061C; font-weight: bold; background-color: #FFFDF9;">
          <option value="kz">🇰🇿 KZ</option>
          <option value="ru">🇷🇺 RU</option>
          <option value="en">🇬🇧 EN</option>
        </select>
      `;
      authContainer.appendChild(langWrapper);
    }
  }

  const selectEl = document.getElementById('language-select');
  if (selectEl) {
    selectEl.value = localStorage.getItem('selectedLanguage') || 'kz';
    selectEl.addEventListener('change', (e) => {
      changeLanguage(e.target.value);
    });
  }
}

function updateAuthUI() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const authContainer = document.querySelector('#mainNavbar .auth-buttons-container') || document.querySelector('#mainNavbar .d-flex');
  if (!authContainer) return;

  const loginBtn = document.getElementById('nav-login-btn');
  const signupBtn = document.getElementById('nav-signup-btn');
  let userProfileBadge = document.getElementById('user-profile-badge');

  if (currentUser) {
    if (loginBtn) loginBtn.classList.add('d-none');
    if (signupBtn) signupBtn.classList.add('d-none');

    if (!userProfileBadge) {
      userProfileBadge = document.createElement('div');
      userProfileBadge.id = 'user-profile-badge';
      userProfileBadge.className = 'd-flex align-items-center gap-2';
      authContainer.insertBefore(userProfileBadge, authContainer.firstChild);
    }

    const currentLang = localStorage.getItem('selectedLanguage') || 'kz';
    const greeting = translations[currentLang]?.userGreeting || 'Сәлеметсіз бе';
    const logoutText = translations[currentLang]?.navLogout || 'Шығу';

    userProfileBadge.innerHTML = `
      <span class="badge text-bg-light border px-2 py-2 fs-6" style="color: #5C061C; font-weight: 600;">
        👤 ${greeting}, ${currentUser.name}!
      </span>
      <button id="logout-btn" class="btn btn-outline-danger btn-sm">${logoutText}</button>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      location.reload();
    });
  } else {
    if (loginBtn) loginBtn.classList.remove('d-none');
    if (signupBtn) signupBtn.classList.remove('d-none');
    if (userProfileBadge) userProfileBadge.remove();
  }
}

function changeLanguage(lang) {
  localStorage.setItem('selectedLanguage', lang);
  
  const langSelect = document.getElementById('language-select');
  if (langSelect) langSelect.value = lang;

  const t = translations[lang];
  if (!t) return;

  // 1. Атрибут data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // 2. Полная обработка текста на всех страницах
  translatePageFallback(lang);
  updateAuthUI();

  if (typeof window.renderCatalog === 'function') {
    window.renderCatalog();
  }
  if (typeof window.renderCartUI === 'function') {
    window.renderCartUI();
  }

  window.dispatchEvent(new Event('language-changed'));
}

function translatePageFallback(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('h1, h2, h3, h4, h5, p, span, div, a, li, th, td, label, button').forEach(el => {
    if (el.children.length > 0 && el.tagName !== 'A') return;

    const txt = el.textContent.trim();

    // Index (Главная)
    if (txt === 'Дүкен туралы' || txt === 'О магазине' || txt === 'About Us') el.textContent = t.aboutTitle;
    if (txt.includes('заманауи әрі сәнді әйелдер') || txt.includes('один из популярных брендов') || txt.includes('is one of the popular')) el.textContent = t.aboutDesc;
    if (txt === 'Дүкеннен көрініс' || txt === 'Галерея магазина' || txt === 'Store View') el.textContent = t.galleryTitle;
    if (txt === 'Жайлы атмосфера мен эстетикалық кеңістік' || txt === 'Уютная атмосфера и эстетичное пространство' || txt === 'Cozy atmosphere and aesthetic space') el.textContent = t.gallerySubtitle;
    if (txt === 'Бренд философиясы' || txt === 'Философия бренда' || txt === 'Brand Philosophy') el.textContent = t.philosophyTitle;
    if (txt === 'МЕКЕНЖАЙЫМЫЗ МЕН БАЙЛАНЫС' || txt === 'НАШ АДРЕС И КОНТАКТЫ' || txt === 'OUR LOCATION & CONTACTS') el.textContent = t.contactTitle;

    // Филиалы и контакты
    if (txt.includes('1-филиал') || txt.includes('филиал 1') || txt.includes('Branch 1')) el.textContent = t.branch1;
    if (txt.includes('2-филиал') || txt.includes('филиал 2') || txt.includes('Branch 2')) el.textContent = t.branch2;
    if (txt === 'Мекенжайлары:' || txt === 'Адреса:' || txt === 'Addresses:') el.textContent = t.addressLabel;
    if (txt.includes('2GIS картасынан қарау') || txt.includes('Посмотреть на карте 2GIS') || txt.includes('View on 2GIS Map')) el.textContent = t.mapLink;
    if (txt.includes('Жұмыс уақыты:') || txt.includes('Время работы:') || txt.includes('Working Hours:')) el.textContent = t.workHours;
    if (txt === 'Телефон:' || txt === 'Phone:') el.textContent = t.phoneLabel;

    // Size Guide
    if (txt === 'Өлшемдер кестесі' || txt === 'Таблица размеров' || txt === 'Size Guide') el.textContent = t.sizeGuideTitle;
    if (txt.includes('Өзіңізге сәйкес киім өлшемін') || txt.includes('Определите подходящий размер') || txt.includes('Determine your suitable clothing')) el.textContent = t.sizeGuideSub;
    if (txt === 'Өлшемді қалай анықтауға болады?' || txt === 'Как определить свой размер?' || txt === 'How to measure?') el.textContent = t.howToMeasureTitle;

    // Cart
    if (txt === 'СІЗДІҢ СЕБЕТІҢІЗ' || txt === 'ВАША КОРЗИНА' || txt === 'YOUR CART') el.textContent = t.cartTitle;
    if (txt === 'Таңдалған тауарларыңызды тексеріңіз' || txt === 'Проверьте выбранные товары' || txt === 'Check your selected items') el.textContent = t.cartSub;
    if (txt === 'Тауар' || txt === 'Товар' || txt === 'Product') el.textContent = t.thProduct;
    if (txt === 'Түсі' || txt === 'Цвет' || txt === 'Color') el.textContent = t.thColor;
    if (txt === 'Бағасы' || txt === 'Цена' || txt === 'Price') el.textContent = t.thPrice;
    if (txt === 'Жою' || txt === 'Удалить' || txt === 'Delete') el.textContent = t.thDelete;
    if (txt === 'Тапсырыс қорытындысы' || txt === 'Итого заказа' || txt === 'Order Summary') el.textContent = t.summaryTitle;
    if (txt === 'Тауар саны:' || txt === 'Количество товаров:' || txt === 'Total items:') el.textContent = t.summaryItemCount;
    if (txt === 'Барлығы:' || txt === 'Итого:' || txt === 'Total:') el.textContent = t.summaryTotal;
    if (txt.includes('Тапсырысты рәсімдеу') || txt.includes('Оформить заказ') || txt.includes('Proceed to Checkout')) el.textContent = t.btnCheckout;
    if (txt === 'Сатып алуды жалғастыру' || txt === 'Продолжить покупки' || txt === 'Continue Shopping') el.textContent = t.btnContinueShopping;
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('section, .card, h1, h2');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
  });
}