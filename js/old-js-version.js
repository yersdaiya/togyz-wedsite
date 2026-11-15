///home///
'use strict';
document.addEventListener('DOMContentLoaded',()=>{if(!location.pathname.endsWith('/index.html')&&!location.pathname.endsWith('/'))return;const main=document.querySelector('main');if(!main)return;const heading=main.querySelector('h1');if(heading)heading.dataset.i18n='homeAbout';document.addEventListener('togyz:language',()=>{if(heading)heading.textContent=tr('homeAbout');});});
///auth///
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Кіру формалары
  const loginForms = document.querySelectorAll('#index-login-form, #catalog-login-form, #order-login-form, #reviews-login-form, #size-login-form, #cart-login-form');
  
  loginForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value || 'User';
      const userName = email.split('@')[0];

      // Профильді localStorage-ке сақтау
      localStorage.setItem('currentUser', JSON.stringify({ name: userName, email: email }));

      const currentLang = localStorage.getItem('selectedLanguage') || 'kz';
      const msg = currentLang === 'ru' ? `Добро пожаловать, ${userName}!` : 
                 (currentLang === 'en' ? `Welcome, ${userName}!` : `Қош келдіңіз, ${userName}!`);
      
      alert(msg);
      window.location.hash = '';
      location.reload();
    });
  });

  // Тіркелу формалары
  const signupForms = document.querySelectorAll('#index-signup-form, #catalog-signup-form, #order-signup-form, #reviews-signup-form, #size-signup-form, #cart-signup-form');

  signupForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('#reg-name')?.value || 'User';
      const emailInput = form.querySelector('#reg-email')?.value || '';
      const passInput = form.querySelector('input[type="password"]')?.value || '';

      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passRegex.test(passInput)) {
        alert('Қате! Құпия сөз кемінде 8 символдан, бас әріптен және саннан тұруы керек!');
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify({ name: nameInput, email: emailInput }));

      alert('Тіркелу сәтті аяқталды!');
      window.location.hash = '';
      location.reload();
    });
  });
});
///main///
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
///data///
'use strict';

const looksData = [
  {
    id: 1,
    titleKz: "1-ОБРАЗ", titleRu: "1-ОБРАЗ", titleEn: "OUTFIT 1",
    descKz: "Жұмсақ реңктер мен жеңіл стиль — күнделікті мінсіз образ.",
    descRu: "Мягкие оттенки и легкий стиль — идеальный повседневный образ.",
    descEn: "Soft shades and effortless style — a perfect everyday look.",
    lookImage: "images/togyz(1).png",
    items: [
      { id: 1, nameKz: "Ұзартылған жейде", nameRu: "Удлиненная рубашка", nameEn: "Long Shirt", price: 23000, image: "images/item1.png", colorKz: "Сары", colorRu: "Желтый", colorEn: "Yellow" },
      { id: 2, nameKz: "Джинсы шалбар", nameRu: "Джинсы", nameEn: "Jeans", price: 13990, image: "images/item2.png", colorKz: "Ашық көк", colorRu: "Светло-синий", colorEn: "Light Blue" }
    ]
  },
  {
    id: 2,
    titleKz: "2-ОБРАЗ", titleRu: "2-ОБРАЗ", titleEn: "OUTFIT 2",
    descKz: "Нәзік әрі сәнді үйлесім — арнайы кездесулерге арналған.",
    descRu: "Утонченное и стильное сочетание для особых встреч.",
    descEn: "Elegant and stylish combination for special occasions.",
    lookImage: "images/togyz(2).png",
    items: [
      { id: 3, nameKz: "Сәнді Блузка", nameRu: "Блузка", nameEn: "Blouse", price: 16990, image: "images/item3.png", colorKz: "Қоңыр", colorRu: "Коричневый", colorEn: "Brown" },
      { id: 4, nameKz: "Аладдин шалбар", nameRu: "Брюки-аладдины", nameEn: "Aladdin Pants", price: 13990, image: "images/item4.png", colorKz: "Мөлчный", colorRu: "Молочный", colorEn: "Milky" }
    ]
  },
  {
    id: 3,
    titleKz: "3-ОБРАЗ", titleRu: "3-ОБРАЗ", titleEn: "OUTFIT 3",
    descKz: "Көпқұрамды ыңғайлы стиль.",
    descRu: "Многослойный комфортный образ.",
    descEn: "Multi-piece comfortable daily outfit.",
    lookImage: "images/togyz(3).png",
    items: [
      { id: 5, nameKz: "Торкөзді жейде", nameRu: "Клетчатая рубашка", nameEn: "Plaid Shirt", price: 11990, image: "images/item5.png", colorKz: "Қара", colorRu: "Черный", colorEn: "Black" },
      { id: 6, nameKz: "Базалық Футболка", nameRu: "Футболка", nameEn: "T-Shirt", price: 7990, image: "images/item6.png", colorKz: "Ақ (принтпен)", colorRu: "Белый с принтом", colorEn: "White with print" },
      { id: 7, nameKz: "Күнделікті Шалбар", nameRu: "Брюки", nameEn: "Pants", price: 15990, image: "images/item7.png", colorKz: "Қызыл", colorRu: "Красный", colorEn: "Red" }
    ]
  },
  {
    id: 4,
    titleKz: "4-ОБРАЗ", titleRu: "4-ОБРАЗ", titleEn: "OUTFIT 4",
    descKz: "Табиғи матадан жасалған жеңіл көйлек.",
    descRu: "Легкое платье из натуральной ткани.",
    descEn: "Light dress made of natural linen fabric.",
    lookImage: "images/togyz(4).png",
    items: [
      { id: 8, nameKz: "Зығыр көйлек", nameRu: "Платье из льна", nameEn: "Linen Dress", price: 39990, image: "images/item8.png", colorKz: "Мөлчный", colorRu: "Молочный", colorEn: "Milky" }
    ]
  },
  {
    id: 5,
    titleKz: "5-ОБРАЗ", titleRu: "5-ОБРАЗ", titleEn: "OUTFIT 5",
    descKz: "Заманауи классикалық комплект.",
    descRu: "Современный классический комплект.",
    descEn: "Modern classic suit set.",
    lookImage: "images/togyz(5).png",
    items: [
      { id: 9, nameKz: "Сәнді жейде", nameRu: "Стильная рубашка", nameEn: "Stylish shirt", price: 26990, image: "images/item9.png", colorKz: "Бордовый", colorRu: "Бордовый", colorEn: "Bordeaux" },
      { id: 10, nameKz: "Классикалық шалбар", nameRu: "Классические брюки", nameEn: "Classic Pants", price: 11990, image: "images/item10.png", colorKz: "Бордовый", colorRu: "Бордовый", colorEn: "Bordeaux" }
    ]
  },
  {
    id: 6,
    titleKz: "6-ОБРАЗ", titleRu: "6-ОБРАЗ", titleEn: "OUTFIT 6",
    descKz: "Кешкі серуенге арналған сәнді образ.",
    descRu: "Стильный образ для вечерних прогулок.",
    descEn: "Trendy outfit for evening walks.",
    lookImage: "images/togyz(6).png",
    items: [
      { id: 11, nameKz: "Кофта", nameRu: "Кофта", nameEn: "Blouse", price: 19990, image: "images/item11.png", colorKz: "Ақ", colorRu: "Белый", colorEn: "White" },
      { id: 12, nameKz: "Белдемше", nameRu: "Юбка", nameEn: "Skirt", price: 36990, image: "images/item12.png", colorKz: "Ашық көк", colorRu: "Светло-синий", colorEn: "Light Blue" }
    ]
  }
];

const productsData = looksData.flatMap(look => look.items);

const translations = {
  kz: {
    navHome: "БАСТЫ БЕТ", navCatalog: "КАТАЛОГ", navSize: "ӨЛШЕМДЕР КЕСТЕСІ", navOrder: "ТАПСЫРЫС БЕРУ", navReviews: "ПІКІРЛЕР", navCart: "СЕБЕТ 🛒", navLogin: "Кіру", navRegister: "Тіркелу", navLogout: "Шығу",
    userGreeting: "Сәлеметсіз бе",
    
    // Index
    aboutTitle: "Дүкен туралы",
    aboutDesc: "TOGYZ BRAND — заманауи әрі сәнді әйелдер киімін ұсынатын Қазақстандағы танымал брендтердің бірі.",
    galleryTitle: "Дүкеннен көрініс", gallerySubtitle: "Жайлы атмосфера мен эстетикалық кеңістік",
    branch1: "Астана қ., 1-филиал (Қабанбай Батыр 49А)",
    branch2: "Астана қ., 2-филиал (Әлихан Бөкейхан 16/1)",
    philosophyTitle: "Бренд философиясы",
    philosophyQuote: "«Біз жай ғана киім сатпаймыз, біз әрбір әйелдің өзіне деген сенімділігі мен ерекше стилін қалыптастыруға көмектесеміз.»",
    philosophyAuthor: "— Тоғыз брендінің негізін қалаушы (2025 жыл)",
    contactTitle: "МЕКЕНЖАЙЫМЫЗ МЕН БАЙЛАНЫС",
    addressLabel: "Мекенжайлары:",
    mapLink: "2GIS картасынан қарау",
    workHours: "Жұмыс уақыты: Күнделікті 11:00 - 20:30",
    phoneLabel: "Телефон:",

    // Size Guide
    sizeGuideTitle: "Өлшемдер кестесі",
    sizeGuideSub: "Өзіңізге сәйкес киім өлшемін кесте арқылы анықтаңыз",
    howToMeasureTitle: "Өлшемді қалай анықтауға болады?",
    thBust: "Көкірек айналымы (см)", thWaist: "Бел айналымы (см)", thHips: "Жамбас айналымы (см)",

    // Cart
    cartTitle: "СІЗДІҢ СЕБЕТІҢІЗ",
    cartSub: "Таңдалған тауарларыңызды тексеріңіз",
    thProduct: "Тауар", thSize: "Өлшемі", thColor: "Түсі", thPrice: "Бағасы", thDelete: "Жою",
    cartEmptyMsg: "Себетіңіз бос",
    summaryTitle: "Тапсырыс қорытындысы", summaryItemCount: "Тауар саны:", summaryTotal: "Барлығы:",
    btnCheckout: "Тапсырысты рәсімдеу →", btnContinueShopping: "Сатып алуды жалғастыру",

    // Order & Reviews
    orderTitle: "ТАПСЫРЫС БЕРУ", orderSub: "Тапсырыс беру үшін төмендегі форманы толтырыңыз",
    fullNameLabel: "Аты-жөніңіз:", phFullName: "Толық аты-жөніңізді енгізіңіз",
    phoneInputLabel: "Телефон нөміріңіз:",
    regionLabel: "Жеткізу аймағы (Қала / Облыс):", optSelectRegion: "Аймақты таңдаңыз...",
    addressInputLabel: "Жеткізу мекенжайы:", phAddress: "көше, үй, пәтер",
    paymentLabel: "Төлем түрі:", optSelectPayment: "Төлем әдісін таңдаңыз...",
    btnConfirmOrder: "Тапсырысты растау", btnBackCatalog: "Каталогқа оралу",

    reviewsTitle: "ТҰТЫНУШЫЛАРДЫҢ ПІКІРЛЕРІ", addReviewTitle: "Пікір қалдыру",
    nameLabel: "Атыңыз:", phReviewName: "Атыңызды енгізіңіз",
    reviewLabel: "Пікіріңіз:", phReviewComment: "Дүкен немесе киім сапасы туралы пікіріңізді жазыңыз...",
    btnSendReview: "Пікірді жіберу", latestReviewsTitle: "Соңғы пікірлер",

    // Catalog & Common
    catalogMainTitle: "КҮЗГІ ТОПТАМАСЫ", catalogSubTitle: "Әр образдың құрамындағы киімдерді жеке таңдаңыз",
    labelSize: "Өлшемі:", btnAddToCart: "Себетке қосу 🛍️",
    footerText: "© 2026 TOGYZ BRAND. Барлық құқықтар қорғалған.",
    modalLoginTitle: "Жүйеге кіру", modalSignupTitle: "Тіркелу", labelName: "Аты-жөні:", labelPass: "Құпия сөз:"
  },
  ru: {
    navHome: "ГЛАВНАЯ", navCatalog: "КАТАЛОГ", navSize: "ТАБЛИЦА РАЗМЕРОВ", navOrder: "ОФОРМИТЬ ЗАКАЗ", navReviews: "ОТЗЫВЫ", navCart: "КОРЗИНА 🛒", navLogin: "Войти", navRegister: "Регистрация", navLogout: "Выйти",
    userGreeting: "Здравствуйте",

    aboutTitle: "О магазине",
    aboutDesc: "TOGYZ BRAND — один из популярных брендов современной и стильной женской одежды в Казахстане.",
    galleryTitle: "Галерея магазина", gallerySubtitle: "Уютная атмосфера и эстетичное пространство",
    branch1: "г. Астана, филиал 1 (Кабанбай батыра 49А)",
    branch2: "г. Астана, филиал 2 (Алихана Бокейхана 16/1)",
    philosophyTitle: "Философия бренда",
    philosophyQuote: "«Мы не просто продаем одежду, мы помогаем каждой женщине обрести уверенность и свой уникальный стиль.»",
    philosophyAuthor: "— Основатель бренда Togyz (2025 год)",
    contactTitle: "НАШ АДРЕС И КОНТАКТЫ",
    addressLabel: "Адреса:",
    mapLink: "Посмотреть на карте 2GIS",
    workHours: "Время работы: Ежедневно с 11:00 до 20:30",
    phoneLabel: "Телефон:",

    sizeGuideTitle: "Таблица размеров",
    sizeGuideSub: "Определите подходящий размер одежды с помощью таблицы",
    howToMeasureTitle: "Как определить свой размер?",
    thBust: "Обхват груди (см)", thWaist: "Обхват талии (см)", thHips: "Обхват бедер (см)",

    cartTitle: "ВАША КОРЗИНА",
    cartSub: "Проверьте выбранные товары",
    thProduct: "Товар", thSize: "Размер", thColor: "Цвет", thPrice: "Цена", thDelete: "Удалить",
    cartEmptyMsg: "Ваша корзина пуста",
    summaryTitle: "Итого заказа", summaryItemCount: "Количество товаров:", summaryTotal: "Итого:",
    btnCheckout: "Оформить заказ →", btnContinueShopping: "Продолжить покупки",

    orderTitle: "ОФОРМЛЕНИЕ ЗАКАЗА", orderSub: "Заполните форму ниже для оформления заказа",
    fullNameLabel: "Ваше ФИО:", phFullName: "Введите ваше полное ФИО",
    phoneInputLabel: "Номер телефона:",
    regionLabel: "Регион доставки (Город / Область):", optSelectRegion: "Выберите регион...",
    addressInputLabel: "Адрес доставки:", phAddress: "улица, дом, квартира",
    paymentLabel: "Способ оплаты:", optSelectPayment: "Выберите способ оплаты...",
    btnConfirmOrder: "Подтвердить заказ", btnBackCatalog: "Вернуться в каталог",

    reviewsTitle: "ОТЗЫВЫ ПОКУПАТЕЛЕЙ", addReviewTitle: "Оставить отзыв",
    nameLabel: "Ваше имя:", phReviewName: "Введите ваше имя",
    reviewLabel: "Ваш отзыв:", phReviewComment: "Напишите ваш отзыв о магазине или качестве одежды...",
    btnSendReview: "Отправить отзыв", latestReviewsTitle: "Последние отзывы",

    catalogMainTitle: "ОСЕННЯЯ КОЛЛЕКЦИЯ", catalogSubTitle: "Выберите отдельные элементы одежды из каждого образа",
    labelSize: "Размер:", btnAddToCart: "В корзину 🛍️",
    footerText: "© 2026 TOGYZ BRAND. Все права защищены.",
    modalLoginTitle: "Вход в аккаунт", modalSignupTitle: "Регистрация", labelName: "ФИО:", labelPass: "Пароль:"
  },
  en: {
    navHome: "HOME", navCatalog: "CATALOG", navSize: "SIZE GUIDE", navOrder: "ORDER", navReviews: "REVIEWS", navCart: "CART 🛒", navLogin: "Login", navRegister: "Register", navLogout: "Logout",
    userGreeting: "Hello",

    aboutTitle: "About Us",
    aboutDesc: "TOGYZ BRAND is one of the popular modern women's fashion brands in Kazakhstan.",
    galleryTitle: "Store View", gallerySubtitle: "Cozy atmosphere and aesthetic space",
    branch1: "Astana city, Branch 1 (Kabanbay Batyr 49A)",
    branch2: "Astana city, Branch 2 (Alikhan Bokeikhan 16/1)",
    philosophyTitle: "Brand Philosophy",
    philosophyQuote: "“We don't just sell clothes, we help every woman build confidence and shape her unique style.”",
    philosophyAuthor: "— Founder of Togyz Brand (2025)",
    contactTitle: "OUR LOCATION & CONTACTS",
    addressLabel: "Addresses:",
    mapLink: "View on 2GIS Map",
    workHours: "Working Hours: Daily 11:00 AM - 8:30 PM",
    phoneLabel: "Phone:",

    sizeGuideTitle: "Size Guide",
    sizeGuideSub: "Determine your suitable clothing size using the table below",
    howToMeasureTitle: "How to measure?",
    thBust: "Bust Circumference (cm)", thWaist: "Waist Circumference (cm)", thHips: "Hips Circumference (cm)",

    cartTitle: "YOUR CART",
    cartSub: "Check your selected items",
    thProduct: "Product", thSize: "Size", thColor: "Color", thPrice: "Price", thDelete: "Delete",
    cartEmptyMsg: "Your cart is empty",
    summaryTitle: "Order Summary", summaryItemCount: "Total items:", summaryTotal: "Total:",
    btnCheckout: "Proceed to Checkout →", btnContinueShopping: "Continue Shopping",

    orderTitle: "PLACE ORDER", orderSub: "Fill out the form below to complete your purchase",
    fullNameLabel: "Full Name:", phFullName: "Enter your full name",
    phoneInputLabel: "Phone Number:",
    regionLabel: "Delivery Region (City / Region):", optSelectRegion: "Select a region...",
    addressInputLabel: "Delivery Address:", phAddress: "street, building, apartment",
    paymentLabel: "Payment Method:", optSelectPayment: "Select a payment method...",
    btnConfirmOrder: "Confirm Order", btnBackCatalog: "Back to Catalog",

    reviewsTitle: "CUSTOMER REVIEWS", addReviewTitle: "Leave a Review",
    nameLabel: "Your Name:", phReviewName: "Enter your name",
    reviewLabel: "Your Review:", phReviewComment: "Write your review about the store or clothing quality...",
    btnSendReview: "Submit Review", latestReviewsTitle: "Latest Reviews",

    catalogMainTitle: "AUTUMN COLLECTION", catalogSubTitle: "Shop individual pieces from each outfit",
    labelSize: "Size:", btnAddToCart: "Add to Cart 🛍️",
    footerText: "© 2026 TOGYZ BRAND. All rights reserved.",
    modalLoginTitle: "Account Login", modalSignupTitle: "Registration", labelName: "Full Name:", labelPass: "Password:"
  }
};
///catalog///
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  renderLookCards();
  updateCartBadge();
});

// Тіл өзгергенде динамикалық түрде қайта рендер жасау
window.renderCatalog = function() {
  renderLookCards();
  updateCartBadge();
};

window.addEventListener('language-changed', () => {
  renderLookCards();
  updateCartBadge();
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

  // Батырмаларға басу оқиғасын қосу (Себетке қосу және анимация)
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(btn.getAttribute('data-id'));
      const selectedSizeInput = document.querySelector(`input[name="size-${itemId}"]:checked`);
      const size = selectedSizeInput ? selectedSizeInput.value : 'S';

      addToCart(itemId, size);

      // Батырмаға басылу анимациясын беру
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
      id: item.id,
      nameKz: item.nameKz,
      nameRu: item.nameRu,
      nameEn: item.nameEn,
      price: item.price,
      image: item.image,
      size: size,
      color: 'Black',
      quantity: 1
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cart));
  updateCartBadge();
  // Ескерту терезесі (alert) шықпайтын болды, орнына тек анимация мен сан жұмыс істейді!
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const cartNavLinks = document.querySelectorAll('a[href="cart.html"]');
  cartNavLinks.forEach(link => {
    const lang = localStorage.getItem('selectedLanguage') || 'kz';
    const t = translations[lang] || translations.kz;
    const baseText = t.navCart ? t.navCart.replace('🛒', '').trim() : 'СЕБЕТ';

    if (totalCount > 0) {
      link.innerHTML = `${baseText} <span class="badge rounded-pill bg-danger bounce-animation" id="cart-badge-count">${totalCount}</span> 🛒`;
    } else {
      link.innerHTML = `${baseText} 🛒`;
    }
  });
}

window.updateCartBadge = updateCartBadge;
///size-guide///
'use strict';
document.addEventListener('DOMContentLoaded',()=>{const main=document.querySelector('main');if(!main||!location.pathname.endsWith('size-guide.html'))return;let box=document.querySelector('#togyz-size-picker');if(box)return;box=el('section','container border rounded p-3 my-4');box.id='togyz-size-picker';const title=el('h2','h4',tr('sizeRecommendation'));box.append(title);const fields=['chest','waist','hips'].map((x,i)=>{const group=el('div','mb-2');const lbl=el('label','form-label',tr(['sizeChest','sizeWaist','sizeHips'][i]));const input=el('input','form-control');input.type='number';input.min='1';input.max='250';lbl.append(input);group.append(lbl);box.append(group);return input;});const btn=el('button','btn btn-dark',tr('sizeResult'));const result=el('p','mt-3');result.setAttribute('role','status');box.append(btn,result);main.append(box);btn.addEventListener('click',()=>{const values=fields.map(x=>Number(x.value));if(values.some(v=>v<40||v>200)){result.textContent='Please enter realistic measurements (cm).';return;}const sizes=[{s:'S',c:[84,88],w:[64,68],h:[92,96]},{s:'M',c:[88,92],w:[68,72],h:[96,100]},{s:'L',c:[92,96],w:[72,76],h:[100,104]},{s:'XL',c:[96,100],w:[76,80],h:[104,108]}];const matches=sizes.find(x=>values[0]>=x.c[0]&&values[0]<=x.c[1]&&values[1]>=x.w[0]&&values[1]<=x.w[1]&&values[2]>=x.h[0]&&values[2]<=x.h[1]);result.textContent=matches?tr('sizeResult')+': '+matches.s:'No exact size in the table; please check the measurements.';});document.addEventListener('togyz:language',()=>{title.textContent=tr('sizeRecommendation');btn.textContent=tr('sizeResult');});});
///order///
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#order-checkout-form, #checkout-form');
  if (!form) return;

  let summary = document.querySelector('#togyz-order-summary');
  if (!summary) {
    summary = typeof el === 'function' 
      ? el('div', 'alert alert-light border mb-3') 
      : document.createElement('div');
    summary.className = 'alert alert-light border mb-3';
    summary.id = 'togyz-order-summary';
    form.prepend(summary);
  }

  const success = document.querySelector('#order-success-message, #order-confirmation') || form;

  function render() {
    if (typeof readCart !== 'function') return;
    const cart = readCart();
    summary.replaceChildren();

    const totals = typeof cartTotals === 'function' ? cartTotals() : { total: 0 };
    const totalText = typeof tr === 'function' ? tr('cartTotal') : 'Барлығы';
    const totalMoney = typeof money === 'function' ? money(totals.total) : `${totals.total} ₸`;

    if (typeof el === 'function') {
      summary.append(el('strong', '', totalText + ': ' + totalMoney));
    } else {
      const strong = document.createElement('strong');
      strong.textContent = totalText + ': ' + totalMoney;
      summary.append(strong);
    }

    const currentLang = typeof language === 'function' ? language() : (localStorage.getItem('selectedLanguage') || 'kz');

    cart.forEach(x => {
      const p = typeof productsData !== 'undefined' ? productsData.find(y => y.id === x.id) : null;
      if (p) {
        const nameKey = currentLang === 'ru' ? 'nameRu' : (currentLang === 'en' ? 'nameEn' : 'nameKz');
        const pElem = typeof el === 'function' 
          ? el('p', 'mb-1', p[nameKey] + ' (' + x.size + ') × ' + x.quantity)
          : document.createElement('p');
        
        if (typeof el !== 'function') {
          pElem.className = 'mb-1';
          pElem.textContent = p[nameKey] + ' (' + x.size + ') × ' + x.quantity;
        }
        summary.append(pElem);
      }
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = [...form.querySelectorAll('input, select, textarea')].filter(
      x => x.type !== 'hidden' && x.type !== 'submit' && x.type !== 'button'
    );

    let first = null;

    inputs.forEach(n => {
      n.classList.remove('is-invalid');
      const required = n.required || ['fullname', 'phone', 'region', 'address', 'payment'].some(
        word => (n.id + ' ' + n.name).toLowerCase().includes(word)
      );

      if (required && !n.value.trim()) {
        n.classList.add('is-invalid');
        first ||= n;
      }
    });

    const phone = inputs.find(x => (x.name + ' ' + x.id).toLowerCase().includes('phone'));
    if (phone && phone.value.replace(/\D/g, '').length < 10) {
      phone.classList.add('is-invalid');
      first ||= phone;
    }

    if (first) {
      first.focus();
      if (typeof statusMessage === 'function') {
        statusMessage(form, 'Please check required fields and phone number.', 'error');
      }
      return;
    }

    const cart = typeof readCart === 'function' ? readCart() : [];
    if (!cart.length) {
      if (typeof statusMessage === 'function') {
        const emptyMsg = typeof tr === 'function' ? tr('cartEmpty') : 'Себет бос';
        statusMessage(form, emptyMsg, 'error');
      }
      return;
    }

    const total = typeof cartTotals === 'function' ? cartTotals().total : 0;
    const ref = 'TG-' + Math.floor(100000 + Math.random() * 900000);
    const entry = { ref, total, date: new Date().toLocaleString(), items: cart.map(x => ({ ...x })) };

    const key = window.TogyzDemoProfile?.profileOrdersKey?.() || 'togyzOrders:guest';
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem(key) || '[]');
    } catch {}

    orders.push(entry);
    localStorage.setItem(key, JSON.stringify(orders));

    if (typeof writeCart === 'function') writeCart([]);

    if (typeof statusMessage === 'function') {
      const demoMsg = typeof tr === 'function' ? tr('demo') : 'Тапсырыс қабылданды';
      statusMessage(success, ref + ' — ' + demoMsg);
    }

    form.reset();
    render();
  });

  document.addEventListener('togyz:language', render);
  document.addEventListener('togyz:profile', render);
  render();
});
///reviews///
'use strict';
document.addEventListener('DOMContentLoaded',()=>{const form=document.querySelector('#add-review-form');if(!form)return;const name=form.querySelector('#review-name,input[type="text"]');const comment=form.querySelector('textarea');if(!name||!comment)return;const counter=el('p','small text-muted');comment.after(counter);const list=document.querySelector('#reviews-list,#reviews-container,#recent-reviews')||document.querySelector('#add-review-form')?.parentElement?.parentElement;const saved=()=>{try{return JSON.parse(localStorage.getItem('togyzReviews')||'[]');}catch{return [];}};let generated=document.querySelector('#togyz-added-reviews');if(!generated){generated=el('div','row g-3 mt-3');generated.id='togyz-added-reviews';list?.append(generated);}function render(){generated.replaceChildren();saved().forEach(r=>{const card=el('article','col-12 col-md-6');const body=el('div','card p-3');body.append(el('h3','h5',r.name));body.append(el('p','',r.text));body.append(el('small','text-muted',r.date));card.append(body);generated.append(card);});}comment.addEventListener('input',()=>counter.textContent=comment.value.length+'/500');form.addEventListener('submit',e=>{e.preventDefault();const n=name.value.trim(),txt=comment.value.trim();if(n.length<2||txt.length<10||txt.length>500){statusMessage(form,'Name: 2+ characters. Review: 10–500 characters.','error');return;}const a=saved();a.unshift({name:n,text:txt,date:new Date().toLocaleString()});localStorage.setItem('togyzReviews',JSON.stringify(a));form.reset();counter.textContent='0/500';statusMessage(form,tr('reviewAdded'));render();});render();});
///cart///
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
