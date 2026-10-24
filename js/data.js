'use strict';

const looksData = [
  {
    id: 1,
    titleKz: "1-ОБРАЗ",
    titleRu: "1-ОБРАЗ",
    titleEn: "OUTFIT 1",
    descKz: "Жұмсақ реңктер мен жеңіл стиль — күнделікті мінсіз образ.",
    descRu: "Мягкие оттенки и легкий стиль — идеальный повседневный образ.",
    descEn: "Soft shades and effortless style — a perfect everyday look.",
    lookImage: "images/togyz(1).png",
    items: [
      { id: 1, nameKz: "Ұзартылған жейде", nameRu: "Удлиненная рубашка", nameEn: "Long Shirt", price: 23000, image: "images/item1.png" },
      { id: 2, nameKz: "Джинсы шалбар", nameRu: "Джинсы", nameEn: "Jeans", price: 13990, image: "images/item2.png" }
    ]
  },
  {
    id: 2,
    titleKz: "2-ОБРАЗ",
    titleRu: "2-ОБРАЗ",
    titleEn: "OUTFIT 2",
    descKz: "Нәзік әрі сәнді үйлесім — арнайы кездесулерге арналған.",
    descRu: "Утонченное и стильное сочетание для особых встреч.",
    descEn: "Elegant and stylish combination for special occasions.",
    lookImage: "images/togyz(2).png",
    items: [
      { id: 3, nameKz: "Сәнді Блузка", nameRu: "Блузка", nameEn: "Blouse", price: 16990, image: "images/item3.png" },
      { id: 4, nameKz: "Аладдин шалбар", nameRu: "Брюки-аладдины", nameEn: "Aladdin Pants", price: 13990, image: "images/item4.png" }
    ]
  },
  {
    id: 3,
    titleKz: "3-ОБРАЗ",
    titleRu: "3-ОБРАЗ",
    titleEn: "OUTFIT 3",
    descKz: "Көпқұрамды ыңғайлы стиль.",
    descRu: "Многослойный комфортный образ.",
    descEn: "Multi-piece comfortable daily outfit.",
    lookImage: "images/togyz(3).png",
    items: [
      { id: 5, nameKz: "Торкөзді жейде", nameRu: "Клетчатая рубашка", nameEn: "Plaid Shirt", price: 11990, image: "images/item5.png" },
      { id: 6, nameKz: "Базалық Футболка", nameRu: "Футболка", nameEn: "T-Shirt", price: 7990, image: "images/item6.png" },
      { id: 7, nameKz: "Күнделікті Шалбар", nameRu: "Брюки", nameEn: "Pants", price: 15990, image: "images/item7.png" }
    ]
  },
  {
    id: 4,
    titleKz: "4-ОБРАЗ",
    titleRu: "4-ОБРАЗ",
    titleEn: "OUTFIT 4",
    descKz: "Табиғи матадан жасалған жеңіл көйлек.",
    descRu: "Легкое платье из натуральной ткани.",
    descEn: "Light dress made of natural linen fabric.",
    lookImage: "images/togyz(4).png",
    items: [
      { id: 8, nameKz: "Зығыр көйлек", nameRu: "Платье из льна", nameEn: "Linen Dress", price: 39990, image: "images/item8.png" }
    ]
  },
  {
    id: 5,
    titleKz: "5-ОБРАЗ",
    titleRu: "5-ОБРАЗ",
    titleEn: "OUTFIT 5",
    descKz: "Заманауи классикалық комплект.",
    descRu: "Современный классический комплект.",
    descEn: "Modern classic suit set.",
    lookImage: "images/togyz(5).png",
    items: [
      { id: 9, nameKz: "Костюм-комплект", nameRu: "Костюм-комплект", nameEn: "Suit Set", price: 26990, image: "images/item9.png" },
      { id: 10, nameKz: "Сәнді кофта", nameRu: "Стильная кофта", nameEn: "Trendy Top", price: 11990, image: "images/item10.png" }
    ]
  },
  {
    id: 6,
    titleKz: "6-ОБРАЗ",
    titleRu: "6-ОБРАЗ",
    titleEn: "OUTFIT 6",
    descKz: "Кешкі серуенге арналған сәнді образ.",
    descRu: "Стильный образ для вечерних прогулок.",
    descEn: "Trendy outfit for evening walks.",
    lookImage: "images/togyz(6).png",
    items: [
      { id: 11, nameKz: "Белдемше", nameRu: "Юбка", nameEn: "Skirt", price: 19990, image: "images/item11.png" },
      { id: 12, nameKz: "Толық образ (Комплект)", nameRu: "Полный образ (Комплект)", nameEn: "Full Look (Set)", price: 36990, image: "images/item12.png" }
    ]
  }
];

const productsData = looksData.flatMap(look => look.items);

const translations = {
  kz: {
    navHome: "БАСТЫ БЕТ", navCatalog: "КАТАЛОГ", navSize: "ӨЛШЕМДЕР КЕСТЕСІ", navOrder: "ТАПСЫРЫС БЕРУ", navReviews: "ПІКІРЛЕР", navCart: "СЕБЕТ 🛒", navLogin: "Кіру", navRegister: "Тіркелу", navLogout: "Шығу",
    userGreeting: "Сәлеметсіз бе",

    // Order page
    orderTitle: "ТАПСЫРЫС БЕРУ", orderSub: "Тапсырыс беру үшін төмендегі форманы толтырыңыз",
    fullNameLabel: "Аты-жөніңіз:",
    phFullName: "Толық аты-жөніңізді енгізіңіз",
    phoneInputLabel: "Телефон нөміріңіз:",
    regionLabel: "Жеткізу аймағы (Қала / Облыс):",
    optSelectRegion: "Аймақты таңдаңыз...",
    addressInputLabel: "Жеткізу мекенжайы:",
    phAddress: "көше, үй, пәтер",
    paymentLabel: "Төлем түрі:",
    optSelectPayment: "Төлем әдісін таңдаңыз...",
    btnConfirmOrder: "Тапсырысты растау", btnBackCatalog: "Каталогқа оралу",

    // Reviews page
    reviewsTitle: "ТҰТЫНУШЫЛАРДЫҢ ПІКІРЛЕРІ", addReviewTitle: "Пікір қалдыру",
    nameLabel: "Атыңыз:",
    phReviewName: "Атыңызды енгізіңіз",
    reviewLabel: "Пікіріңіз:",
    phReviewComment: "Дүкен немесе киім сапасы туралы пікіріңізді жазыңыз...",
    btnSendReview: "Пікірді жіберу", latestReviewsTitle: "Соңғы пікірлер",

    // Catalog & common
    catalogMainTitle: "КҮЗГІ ТОПТАМАСЫ", catalogSubTitle: "Әр образдың құрамындағы киімдерді жеке таңдаңыз",
    labelSize: "Өлшемі:", btnAddToCart: "Add to Cart",
    footerText: "© 2026 TOGYZ BRAND. Барлық құқықтар қорғалған.", modalLoginTitle: "Жүйеге кіру", modalSignupTitle: "Тіркелу", labelName: "Аты-жөні:", labelPass: "Құпия сөз:"
  },
  ru: {
    navHome: "ГЛАВНАЯ", navCatalog: "КАТАЛОГ", navSize: "ТАБЛИЦА РАЗМЕРОВ", navOrder: "ОФОРМИТЬ ЗАКАЗ", navReviews: "ОТЗЫВЫ", navCart: "КОРЗИНА 🛒", navLogin: "Войти", navRegister: "Регистрация", navLogout: "Выйти",
    userGreeting: "Здравствуйте",

    // Order page
    orderTitle: "ОФОРМЛЕНИЕ ЗАКАЗА", orderSub: "Заполните форму ниже для оформления заказа",
    fullNameLabel: "Ваше ФИО:",
    phFullName: "Введите ваше полное ФИО",
    phoneInputLabel: "Номер телефона:",
    regionLabel: "Регион доставки (Город / Область):",
    optSelectRegion: "Выберите регион...",
    addressInputLabel: "Адрес доставки:",
    phAddress: "улица, дом, квартира",
    paymentLabel: "Способ оплаты:",
    optSelectPayment: "Выберите способ оплаты...",
    btnConfirmOrder: "Подтвердить заказ", btnBackCatalog: "Вернуться в каталог",

    // Reviews page
    reviewsTitle: "ОТЗЫВЫ ПОКУПАТЕЛЕЙ", addReviewTitle: "Оставить отзыв",
    nameLabel: "Ваше имя:",
    phReviewName: "Введите ваше имя",
    reviewLabel: "Ваш отзыв:",
    phReviewComment: "Напишите ваш отзыв о магазине или качестве одежды...",
    btnSendReview: "Отправить отзыв", latestReviewsTitle: "Последние отзывы",

    // Catalog & common
    catalogMainTitle: "ОСЕННЯЯ КОЛЛЕКЦИЯ", catalogSubTitle: "Выберите отдельные элементы одежды из каждого образа",
    labelSize: "Размер:", btnAddToCart: "Add to Cart",
    footerText: "© 2026 TOGYZ BRAND. Все права защищены.", modalLoginTitle: "Вход в аккаунт", modalSignupTitle: "Регистрация", labelName: "ФИО:", labelPass: "Пароль:"
  },
  en: {
    navHome: "HOME", navCatalog: "CATALOG", navSize: "SIZE GUIDE", navOrder: "ORDER", navReviews: "REVIEWS", navCart: "CART 🛒", navLogin: "Login", navRegister: "Register", navLogout: "Logout",
    userGreeting: "Hello",

    // Order page
    orderTitle: "PLACE ORDER", orderSub: "Fill out the form below to complete your purchase",
    fullNameLabel: "Full Name:",
    phFullName: "Enter your full name",
    phoneInputLabel: "Phone Number:",
    regionLabel: "Delivery Region (City / Region):",
    optSelectRegion: "Select a region...",
    addressInputLabel: "Delivery Address:",
    phAddress: "street, building, apartment",
    paymentLabel: "Payment Method:",
    optSelectPayment: "Select a payment method...",
    btnConfirmOrder: "Confirm Order", btnBackCatalog: "Back to Catalog",

    // Reviews page
    reviewsTitle: "CUSTOMER REVIEWS", addReviewTitle: "Leave a Review",
    nameLabel: "Your Name:",
    phReviewName: "Enter your name",
    reviewLabel: "Your Review:",
    phReviewComment: "Write your review about the store or clothing quality...",
    btnSendReview: "Submit Review", latestReviewsTitle: "Latest Reviews",

    // Catalog & common
    catalogMainTitle: "AUTUMN COLLECTION", catalogSubTitle: "Shop individual pieces from each outfit",
    labelSize: "Size:", btnAddToCart: "Add to Cart",
    footerText: "© 2026 TOGYZ BRAND. All rights reserved.", modalLoginTitle: "Account Login", modalSignupTitle: "Registration", labelName: "Full Name:", labelPass: "Password:"
  }
};