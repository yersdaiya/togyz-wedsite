'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setupLanguageDropdown();
  updateAuthUI();
  initScrollAnimations();

  // Бет жүктелгенде сақталған тілді қолдану
  const savedLang = localStorage.getItem('selectedLanguage') || 'kz';
  changeLanguage(savedLang);
});

function setupLanguageDropdown() {
  if (document.getElementById('language-select')) return;

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

    const selectEl = document.getElementById('language-select');
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
  
  // Переключательдегі таңдауды синхрондау
  const langSelect = document.getElementById('language-select');
  if (langSelect) langSelect.value = lang;

  const t = translations[lang];
  if (!t) return;

  // 1. Барлық data-i18n атрибуты бар елементтерді ауыстыру
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

  // 2. Навбар сілтемелерін ауыстыру
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'index.html') link.textContent = t.navHome;
    if (href === 'catalog.html') link.textContent = t.navCatalog;
    if (href === 'size-guide.html') link.textContent = t.navSize;
    if (href === 'order.html') link.textContent = t.navOrder;
    if (href === 'reviews.html') link.textContent = t.navReviews;
    if (href === 'cart.html') link.textContent = t.navCart;
  });

  // 3. Профиль мәтінін жаңарту
  updateAuthUI();

  // 4. Егер Каталог бетінде болсақ, карточкаларды қайта рендерлеу
  if (typeof window.renderCatalog === 'function') {
    window.renderCatalog();
  }

  // 5. Оқиғаны басқа модульдерге жіберу
  window.dispatchEvent(new Event('language-changed'));
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