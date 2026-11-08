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
    if (txt === 'Өлшемдер кестесі' || txt === 'Таблица размеров' || txt === 'Size Guide') el.textContent = t.sizeGuideTitle;$("#hide").click(function(){
  $("p").hide();
});

$("#show").click(function(){
  $("p").show();
});
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

// TOGYZ Dark / Light Mode — барлық беттерде жұмыс істейді.
document.addEventListener('DOMContentLoaded', () => {
  initTogyzTheme();
});

function initTogyzTheme() {
  if (!document.getElementById('togyz-theme-styles')) {
    const style = document.createElement('style');
    style.id = 'togyz-theme-styles';
    style.textContent = `
      body.togyz-dark {
        background-color: #171515 !important;
        color: #f2eeee !important;
        color-scheme: dark;
      }
      body.togyz-dark main,
      body.togyz-dark section,
      body.togyz-dark footer,
      body.togyz-dark .container,
      body.togyz-dark .container-fluid {
        color: #f2eeee;
      }
      body.togyz-dark .navbar,
      body.togyz-dark .bg-light,
      body.togyz-dark .look-card-wrapper,
      body.togyz-dark .card,
      body.togyz-dark .modal-content,
      body.togyz-dark .table,
      body.togyz-dark .list-group-item {
        background-color: #242020 !important;
        color: #f2eeee !important;
        border-color: #514747 !important;
      }
      /* Dark theme for size guide and cart tables */
      body.togyz-dark .bg-white,
      body.togyz-dark .table-responsive,
      body.togyz-dark #cart-main-container .table-responsive,
      body.togyz-dark #size-table-section .table-responsive,
      body.togyz-dark .card-body {
        background-color: #242020 !important;
        color: #f2eeee !important;
        border-color: #514747 !important;
      }
      body.togyz-dark .table {
        --bs-table-bg: #242020;
        --bs-table-color: #f2eeee;
        --bs-table-striped-bg: #302a2a;
        --bs-table-striped-color: #f2eeee;
        --bs-table-hover-bg: #3a3030;
        --bs-table-hover-color: #ffffff;
        --bs-table-border-color: #514747;
        color: #f2eeee !important;
        background-color: #242020 !important;
      }
      body.togyz-dark .table > :not(caption) > * > * {
        background-color: var(--bs-table-bg) !important;
        color: var(--bs-table-color) !important;
        border-color: var(--bs-table-border-color) !important;
        box-shadow: none !important;
      }
      body.togyz-dark .table-striped > tbody > tr:nth-of-type(odd) > * {
        --bs-table-bg: #302a2a;
        --bs-table-color: #f2eeee;
      }
      body.togyz-dark .table thead th {
        background-color: #352b2d !important;
        color: #ffffff !important;
      }
      body.togyz-dark .table .badge.text-bg-light {
        background-color: #403638 !important;
        color: #ffffff !important;
        border-color: #76636a !important;
      }
      body.togyz-dark .text-dark,
      body.togyz-dark .text-body,
      body.togyz-dark h1,
      body.togyz-dark h2,
      body.togyz-dark h3,
      body.togyz-dark h4,
      body.togyz-dark h5,
      body.togyz-dark p,
      body.togyz-dark label,
      body.togyz-dark th,
      body.togyz-dark td,
      body.togyz-dark .nav-link,
      body.togyz-dark .navbar-brand {
        color: #f2eeee !important;
      }
      body.togyz-dark .text-muted,
      body.togyz-dark .text-secondary,
      body.togyz-dark .text-body-secondary {
        color: #c1b8b8 !important;
      }
      body.togyz-dark input,
      body.togyz-dark select,
      body.togyz-dark textarea {
        background-color: #302a2a !important;
        color: #f2eeee !important;
        border-color: #625555 !important;
      }
      body.togyz-dark input::placeholder,
      body.togyz-dark textarea::placeholder {
        color: #b9aeae !important;
      }
      body.togyz-dark .border,
      body.togyz-dark .border-top,
      body.togyz-dark .border-bottom {
        border-color: #514747 !important;
      }
      body.togyz-dark .btn-outline-secondary {
        color: #eee !important;
        border-color: #948686 !important;
      }
      body.togyz-dark .btn-outline-secondary:hover,
      body.togyz-dark .btn-outline-secondary.active {
        background-color: #5c061c !important;
        color: #fff !important;
      }
      body.togyz-dark .modal-overlay {
        background-color: rgba(0,0,0,.78) !important;
      }
      #togyz-theme-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        min-width: 36px;
        padding: 0;
        border: 1px solid #5C061C;
        border-radius: 50%;
        background: #fffdf9;
        color: #5C061C;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
      }
      body.togyz-dark #togyz-theme-toggle {
        background: #302a2a;
        color: #fff;
        border-color: #a56a7a;
      }
    `;
    document.head.appendChild(style);
  }

  const savedTheme = localStorage.getItem('togyzTheme') || 'light';
  applyTogyzTheme(savedTheme);

  const authContainer =
    document.querySelector('.auth-buttons-container') ||
    document.querySelector('#mainNavbar .navbar-nav')?.parentElement ||
    document.querySelector('.navbar .container');

  if (!authContainer || document.getElementById('togyz-theme-toggle')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'togyz-theme-toggle';
  button.className = 'ms-2';
  button.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('togyz-dark') ? 'light' : 'dark';
    applyTogyzTheme(nextTheme);
    localStorage.setItem('togyzTheme', nextTheme);
  });
  authContainer.appendChild(button);
  updateTogyzThemeButton();
}

function applyTogyzTheme(theme) {
  document.body.classList.toggle('togyz-dark', theme === 'dark');
  updateTogyzThemeButton();
}

function updateTogyzThemeButton() {
  const button = document.getElementById('togyz-theme-toggle');
  if (!button) return;
  const isDark = document.body.classList.contains('togyz-dark');
  const lang = localStorage.getItem('selectedLanguage') || 'kz';
  // Keep the navbar compact: show only the theme icon, without extra text.
  button.textContent = isDark ? '☀️' : '🌙';
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  button.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
}

window.addEventListener('language-changed', updateTogyzThemeButton);