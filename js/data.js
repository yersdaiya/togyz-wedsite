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