'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#order-checkout-form, #checkout-form');
  if (!form) return;

  // ==========================================
  // 1. ТЕЛЕФОН НӨМІРІН ТЕК ЦИФРМЕН ЖАЗУ + МАСКА
  // ==========================================
  const phoneInput = form.querySelector('#phone, input[name*="phone"], input[type="tel"]');
  if (phoneInput) {
    phoneInput.setAttribute('inputmode', 'numeric');
    phoneInput.setAttribute('maxlength', '18');

    phoneInput.addEventListener('input', function () {
      // Барлық әріптер мен артық таңбаларды өшіру
      let digits = this.value.replace(/\D/g, '');

      if (!digits) {
        this.value = '';
        return;
      }

      // Бірінші сан 8 болса 7-ге ауыстыру
      if (digits[0] === '8') digits = '7' + digits.slice(1);
      if (digits[0] !== '7') digits = '7' + digits;

      digits = digits.substring(0, 11);

      let formatted = '+7';
      if (digits.length > 1) formatted += ' (' + digits.substring(1, 4);
      if (digits.length >= 5) formatted += ') ' + digits.substring(4, 7);
      if (digits.length >= 8) formatted += '-' + digits.substring(7, 9);
      if (digits.length >= 10) formatted += '-' + digits.substring(9, 11);

      this.value = formatted;
    });
  }

  // =========================================================
  // 2. БАРЛЫҚ ҚАЛАЛАРДЫҢ КӨШЕЛЕРІ + КАРТА ЗНАЧОГЫ (📍)
  // =========================================================
  const regionalStreets = {
    astana: ['Қабанбай батыр даңғылы, ', 'Әлихан Бөкейхан көшесі, ', 'Тұран даңғылы, ', 'Мәңгілік Ел даңғылы, ', 'Сарайшық көшесі, ', 'Республика даңғылы, ', 'Сығанақ көшесі, ', 'Достық көшесі, '],
    almaty: ['Абай даңғылы, ', 'Әл-Фараби даңғылы, ', 'Достық даңғылы, ', 'Төле би көшесі, ', 'Сейфуллин даңғылы, ', 'Назарбаев даңғылы, ', 'Розыбакиев көшесі, ', 'Гоголь көшесі, '],
    shymkent: ['Тәуке хан даңғылы, ', 'Республика даңғылы, ', 'Бәйдібек би даңғылы, ', 'Қонаев даңғылы, ', 'Желтоқсан көшесі, ', 'Адырбеков көшесі, '],
    oral: ['Назарбаев даңғылы, ', 'Әбілқайыр хан даңғылы, ', 'Брусиловский көшесі, ', 'Сырым Датұлы көшесі, ', 'Еуразия даңғылы, ', 'Мөңкеұлы көшесі, ', 'Құрманғазы көшесі, '],
    aktobe: ['Әбілқайыр хан даңғылы, ', 'Әлия Молдағұлова даңғылы, ', 'Сәңкібай батыр даңғылы, ', 'Марат Оспанов көшесі, ', 'Тұрғындар қалашығы, '],
    atyrau: ['Сәтбаев даңғылы, ', 'Азаттық даңғылы, ', 'Махамбет Өтемісұлы көшесі, ', 'Бейбарыс даңғылы, ', 'Авангард 3-шағын аудан, '],
    aktau: ['14-шағын аудан, ', '15-шағын аудан, ', '17-шағын аудан, ', 'Абай даңғылы, ', 'Назарбаев даңғылы, '],
    karaganda: ['Бұқар жырау даңғылы, ', 'Нұркен Әбдіров даңғылы, ', 'Ермеков көшесі, ', 'Гоголь көшесі, ', 'Шахтерлер даңғылы, '],
    taraz: ['Төле би даңғылы, ', 'Абай даңғылы, ', 'Жамбыл даңғылы, ', 'Сүлейменов көшесі, '],
    pavlodar: ['Назарбаев даңғылы, ', 'Сәтбаев көшесі, ', 'Торайғыров көшесі, ', 'Лермонтов көшесі, '],
    oskemen: ['Назарбаев даңғылы, ', 'Әуезов даңғылы, ', 'Қабанбай батыр көшесі, ', 'Сәтбаев даңғылы, '],
    semey: ['Шәкәрім даңғылы, ', 'Абай көшесі, ', 'Қабанбай батыр көшесі, ', 'Мәңгілік Ел көшесі, '],
    kostanay: ['Әл-Фараби даңғылы, ', 'Абай даңғылы, ', 'Тәуелсіздік көшесі, ', 'Баймағамбетов көшесі, '],
    kyzylorda: ['Жібек жолы даңғылы, ', 'Абай даңғылы, ', 'Әйтеке би көшесі, ', 'Сұлтан Бейбарыс көшесі, '],
    petropavl: ['Қазақстан Конституциясы көшесі, ', 'Нұрсұлтан Назарбаев көшесі, ', 'Жамбыл Жабаев көшесі, '],
    kokshetau: ['Абай көшесі, ', 'Назарбаев даңғылы, ', 'Әуезов көшесі, '],
    turkistan: ['Тәуке хан даңғылы, ', 'Б. Саттарханов даңғылы, ', 'Әмір Темір көшесі, '],
    taldykorgan: ['Тәуелсіздік көшесі, ', 'Назарбаев даңғылы, ', 'Қабанбай батыр көшесі, '],
    default: ['Абай көшесі, ', 'Тәуелсіздік даңғылы, ', 'Бейбітшілік көшесі, ', 'Достық даңғылы, ', 'Жеңіс даңғылы, ']
  };

  function getRegionInfo(selectEl) {
    if (!selectEl) return { key: 'default', cityName: '' };
    const text = (selectEl.options[selectEl.selectedIndex]?.text || '').toLowerCase();
    const val = (selectEl.value || '').toLowerCase();
    const combined = text + ' ' + val;

    if (combined.includes('астана') || combined.includes('astana')) return { key: 'astana', cityName: 'Астана' };
    if (combined.includes('алматы') || combined.includes('almaty')) return { key: 'almaty', cityName: 'Алматы' };
    if (combined.includes('шымкент') || combined.includes('shymkent')) return { key: 'shymkent', cityName: 'Шымкент' };
    if (combined.includes('орал') || combined.includes('уральск') || combined.includes('бқо') || combined.includes('зко')) return { key: 'oral', cityName: 'Уральск' };
    if (combined.includes('ақтөбе') || combined.includes('актобе')) return { key: 'aktobe', cityName: 'Актобе' };
    if (combined.includes('атырау') || combined.includes('atyrau')) return { key: 'atyrau', cityName: 'Атырау' };
    if (combined.includes('ақтау') || combined.includes('актау') || combined.includes('маңғыстау')) return { key: 'aktau', cityName: 'Актау' };
    if (combined.includes('қарағанды') || combined.includes('караганда')) return { key: 'karaganda', cityName: 'Караганда' };
    if (combined.includes('тараз') || combined.includes('жамбыл')) return { key: 'taraz', cityName: 'Тараз' };
    if (combined.includes('павлодар')) return { key: 'pavlodar', cityName: 'Павлодар' };
    if (combined.includes('өскемен') || combined.includes('усть-каменогорск') || combined.includes('шқо') || combined.includes('вко')) return { key: 'oskemen', cityName: 'Усть-Каменогорск' };
    if (combined.includes('семей') || combined.includes('абай облысы')) return { key: 'semey', cityName: 'Семей' };
    if (combined.includes('қостанай') || combined.includes('костанай')) return { key: 'kostanay', cityName: 'Костанай' };
    if (combined.includes('қызылорда') || combined.includes('кызылорда')) return { key: 'kyzylorda', cityName: 'Кызылорда' };
    if (combined.includes('петропавл') || combined.includes('петропавловск') || combined.includes('сқо') || combined.includes('ско')) return { key: 'petropavl', cityName: 'Петропавловск' };
    if (combined.includes('көкшетау') || combined.includes('кокшетау') || combined.includes('ақмола')) return { key: 'kokshetau', cityName: 'Кокшетау' };
    if (combined.includes('түркістан') || combined.includes('туркестан')) return { key: 'turkistan', cityName: 'Туркестан' };
    if (combined.includes('талдықорған') || combined.includes('талдыкорган') || combined.includes('жетісу')) return { key: 'taldykorgan', cityName: 'Талдыкорган' };

    const cleanCity = selectEl.selectedIndex > 0 ? selectEl.options[selectEl.selectedIndex].text.split('(')[0].trim() : '';
    return { key: 'default', cityName: cleanCity };
  }

  function setupAddressWithMap() {
    const regionSelect = form.querySelector('#region, select[name*="region"]');
    const addressInput = form.querySelector('#address, input[name*="address"]');
    if (!addressInput) return;

    // Инпуттың оң жағына карта белгішесін (📍) қою
    if (!addressInput.parentNode.classList.contains('address-map-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'address-map-wrapper position-relative d-flex align-items-center';
      addressInput.parentNode.insertBefore(wrapper, addressInput);
      wrapper.appendChild(addressInput);
      addressInput.style.paddingRight = '42px';

      const mapBtn = document.createElement('button');
      mapBtn.type = 'button';
      mapBtn.className = 'btn position-absolute end-0 border-0 bg-transparent';
      mapBtn.style.zIndex = '10';
      mapBtn.title = 'Картадан қарау (2GIS / Google Maps)';
      mapBtn.innerHTML = '📍';
      wrapper.appendChild(mapBtn);

      // Карта белгішесін басқанда сол мекенжайды картадан ашу
      mapBtn.addEventListener('click', () => {
        const { cityName } = getRegionInfo(regionSelect);
        const addr = addressInput.value.trim();
        const query = encodeURIComponent(`${cityName} ${addr}`.trim() || 'Қазақстан');
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
      });
    }

    let datalist = document.getElementById('kz-streets-list');
    if (!datalist) {
      datalist = document.createElement('datalist');
      datalist.id = 'kz-streets-list';
      document.body.appendChild(datalist);
    }
    addressInput.setAttribute('list', 'kz-streets-list');

    function updateLocalDatalist() {
      const { key } = getRegionInfo(regionSelect);
      const list = regionalStreets[key] || regionalStreets.default;
      datalist.innerHTML = list.map(st => `<option value="${st}">`).join('');
    }

    if (regionSelect) {
      regionSelect.addEventListener('change', updateLocalDatalist);
    }
    updateLocalDatalist();

    // Нақты картадан барлық көшелерді іздеу (OpenStreetMap Nominatim API)
    let debounceTimer;
    addressInput.addEventListener('input', () => {
      const query = addressInput.value.trim();
      if (query.length < 2) return;

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const { cityName } = getRegionInfo(regionSelect);
        const searchQuery = cityName ? `${cityName}, ${query}` : `${query}, Казахстан`;

        try {
          const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=kz&limit=8&q=${encodeURIComponent(searchQuery)}`;
          const response = await fetch(url, { headers: { 'Accept-Language': 'ru,kk' } });
          if (!response.ok) return;

          const places = await response.json();
          if (places && places.length > 0) {
            datalist.innerHTML = places.map(p => {
              const shortAddress = p.display_name.split(',').slice(0, 3).join(',').trim();
              return `<option value="${shortAddress}">`;
            }).join('');
          }
        } catch (err) {
          // Офлайн кезде локалды көшелер қала береді
        }
      }, 350);
    });
  }

  setupAddressWithMap();

  // ==========================================
  // 3. ТАПСЫРЫС ТІЗІМІ ЖӘНЕ РАСТАУ ЛОГИКАСЫ
  // ==========================================
  function readCart() {
    return JSON.parse(localStorage.getItem('userCart') || localStorage.getItem('cartItems') || '[]');
  }

  function getCartTotals() {
    const cart = readCart();
    return cart.reduce((acc, item) => {
      acc.total += (item.price * item.quantity);
      acc.count += item.quantity;
      return acc;
    }, { total: 0, count: 0 });
  }

  let summary = document.querySelector('#togyz-order-summary');
  if (!summary) {
    summary = document.createElement('div');
    summary.className = 'alert alert-light border mb-4 p-3 rounded-3 shadow-sm';
    summary.id = 'togyz-order-summary';
    form.prepend(summary);
  }

  const successMessageDiv = document.querySelector('#order-success-message, #order-confirmation') || (() => {
    const div = document.createElement('div');
    div.id = 'order-success-message';
    div.className = 'alert alert-success text-center p-4 rounded-4 shadow-sm d-none';
    form.parentNode.insertBefore(div, form);
    return div;
  })();

  function renderOrderSummary() {
    const cart = readCart();
    summary.innerHTML = '';

    const currentLang = localStorage.getItem('selectedLanguage') || 'kz';
    const totals = getCartTotals();

    const titleText = currentLang === 'ru' ? 'Ваш заказ:' : (currentLang === 'en' ? 'Your Order:' : 'Сіздің тапсырысыңыз:');
    const totalText = currentLang === 'ru' ? 'Итого' : (currentLang === 'en' ? 'Total' : 'Барлығы');

    let html = `<h5 class="fw-bold mb-3" style="color: #5C061C;">🛒 ${titleText}</h5>`;
    
    if (cart.length === 0) {
      html += `<p class="text-muted mb-0">${currentLang === 'ru' ? 'Корзина пуста' : (currentLang === 'en' ? 'Cart is empty' : 'Себет бос')}</p>`;
    } else {
      html += `<ul class="list-group list-group-flush mb-3">`;
      cart.forEach(item => {
        const product = typeof productsData !== 'undefined' ? productsData.find(p => p.id === item.id) : null;
        if (product) {
          const name = currentLang === 'ru' ? product.nameRu : (currentLang === 'en' ? product.nameEn : product.nameKz);
          html += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0">
              <span>${name} <small class="text-muted">(${item.size})</small> × ${item.quantity}</span>
              <span class="fw-semibold">${(item.price * item.quantity).toLocaleString()} ₸</span>
            </li>`;
        }
      });
      html += `</ul>`;
      html += `<div class="d-flex justify-content-between fw-bold fs-6 border-top pt-2">
                <span>${totalText}:</span>
                <span style="color: #5C061C;">${totals.total.toLocaleString()} ₸</span>
              </div>`;
    }

    summary.innerHTML = html;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = [...form.querySelectorAll('input, select, textarea')].filter(
      x => x.type !== 'hidden' && x.type !== 'submit' && x.type !== 'button'
    );

    let firstInvalid = null;

    inputs.forEach(input => {
      input.classList.remove('is-invalid');
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('is-invalid');
        firstInvalid ||= input;
      }
    });

    if (phoneInput && phoneInput.value.replace(/\D/g, '').length < 11) {
      phoneInput.classList.add('is-invalid');
      firstInvalid ||= phoneInput;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      alert('Барлық міндетті өрістерді және телефон нөмірін (11 цифр) толық толтырыңыз!');
      return;
    }

    const cart = readCart();
    if (!cart.length) {
      alert('Себетіңіз бос!');
      return;
    }

    const orderRef = 'TG-' + Math.floor(100000 + Math.random() * 900000);
    
    localStorage.removeItem('userCart');
    localStorage.removeItem('cartItems');
    if (typeof updateCartBadge === 'function') updateCartBadge();

    form.style.display = 'none';
    if (summary) summary.style.display = 'none';

    const currentLang = localStorage.getItem('selectedLanguage') || 'kz';
    let successHtml = '';

    if (currentLang === 'ru') {
      successHtml = `
        <h3 class="text-success fw-bold mb-3">✅ Заказ успешно оформлен!</h3>
        <p class="fs-5 mb-2">Номер заказа: <strong>${orderRef}</strong></p>
        <p class="text-muted mb-4">Спасибо за покупку! Курьер свяжется с вами в ближайшее время. Ожидайте доставку.</p>
        <a href="index.html" class="btn text-white px-4 py-2 fw-semibold" style="background-color: #5C061C; border-radius: 8px;">На главную</a>
      `;
    } else if (currentLang === 'en') {
      successHtml = `
        <h3 class="text-success fw-bold mb-3">✅ Order Placed Successfully!</h3>
        <p class="fs-5 mb-2">Order Reference: <strong>${orderRef}</strong></p>
        <p class="text-muted mb-4">Thank you for your purchase! Our courier will contact you soon. Please wait for delivery.</p>
        <a href="index.html" class="btn text-white px-4 py-2 fw-semibold" style="background-color: #5C061C; border-radius: 8px;">Home</a>
      `;
    } else {
      successHtml = `
        <h3 class="fw-bold mb-3" style="color: #5C061C;">🎉 Тапсырысыңыз сәтті қабылданды!</h3>
        <p class="fs-5 mb-2">Тапсырыс нөмірі: <strong>${orderRef}</strong></p>
        <p class="text-muted mb-4">Сатып алғаныңызға рақмет! Курьер жуыр арада хабарласады, курьерді күтіңіз.</p>
        <a href="catalog.html" class="btn text-white px-4 py-2 fw-semibold" style="background-color: #5C061C; border-radius: 8px;">Сатып алуды жалғастыру</a>
      `;
    }

    successMessageDiv.innerHTML = successHtml;
    successMessageDiv.classList.remove('d-none');
  });

  window.addEventListener('language-changed', renderOrderSummary);
  renderOrderSummary();
});