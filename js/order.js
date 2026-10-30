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