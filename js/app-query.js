/* 
  TOGYZ BRAND — Assignment 4 (jQuery)
  jQuery Version: 3.7.1
  Why jQuery is used: To simplify DOM manipulation, handle event delegation for dynamic cart items,
  and implement smooth UI effects (fadeIn, slideToggle) with concise code.
*/

$(function () {
  'use strict';

  // LocalStorage-тен себетті жүктеу
  let userCart = JSON.parse(localStorage.getItem('userCart')) || [];

  /* =========================================================
     1. SELECTORS, TRAVERSAL & DELEGATION (Себетке тауар қосу)
     Replacing plain JS addEventListener with jQuery delegated event
     ========================================================= */
  $(document).on('click', '.add-to-cart-btn', function (e) {
    e.preventDefault();
    const $btn = $(this); // $(this) қолданылды

    // Қайталап басылып кетпеуі үшін (Debounce)
    if ($btn.data('processing')) return;
    $btn.data('processing', true);
    setTimeout(() => $btn.removeData('processing'), 300);

    const productId = parseInt($btn.attr('data-id'), 10);
    const $card = $btn.closest('.card'); // Traversal: .closest()
    let selectedSize = 'S';

    if ($card.length) {
      const checkedSize = $card.find('input[type="radio"]:checked').val(); // Traversal: .find()
      const selectSize = $card.find('select').val();
      selectedSize = checkedSize || selectSize || 'S';
    }

    addToCart(productId, selectedSize);

    // Chaining & Animation: батырма секіру эффектісі
    $btn.addClass('btn-bounce').delay(200).queue(function (next) {
      $(this).removeClass('btn-bounce');
      next();
    });
  });

  /* =========================================================
     2. CART QUANTITY MANAGEMENT (+ және - батырмалары)
     Delegated events for dynamically rendered cart items
     ========================================================= */
  $(document).on('click', '.btn-increase-qty', function () {
    const index = $(this).closest('tr').data('index'); // Traversal: .closest()
    userCart[index].quantity += 1;
    saveCart();
  });

  $(document).on('click', '.btn-decrease-qty', function () {
    const index = $(this).closest('tr').data('index');
    if (userCart[index].quantity > 1) {
      userCart[index].quantity -= 1;
    } else {
      userCart.splice(index, 1);
    }
    saveCart();
  });

  $(document).on('click', '.btn-remove-item', function () {
    const index = $(this).closest('tr').data('index');
    // Effect: Ұяшық жоғалар алдында жайлап өшуі (.fadeOut)
    $(this).closest('tr').fadeOut(300, function () {
      userCart.splice(index, 1);
      saveCart();
    });
  });

  /* =========================================================
     3. CART LOGIC & RENDER (DOM manipulation with .append & .html)
     ========================================================= */
  function addToCart(id, size) {
    const product = typeof productsData !== 'undefined' 
      ? productsData.find(p => p.id === id) 
      : null;
    if (!product) return;

    const existing = userCart.find(item => item.id === id && item.size === size);
    if (existing) {
      existing.quantity += 1;
    } else {
      userCart.push({ id: product.id, price: product.price, size: size, quantity: 1 });
    }

    saveCart();
  }

  function saveCart() {
    localStorage.setItem('userCart', JSON.stringify(userCart));
    renderCartUI();
    updateCartBadge();
  }

  function updateCartBadge() {
    const totalCount = userCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const $badge = $('#cart-badge-count');

    if (totalCount > 0) {
      if ($badge.length) {
        $badge.text(totalCount).fadeIn(100);
      } else {
        $('a[href="cart.html"]').append(` <span class="badge rounded-pill bg-danger" id="cart-badge-count">${totalCount}</span>`);
      }
    } else {
      $badge.fadeOut(200, function () { $(this).remove(); });
    }
  }

  function renderCartUI() {
    const $cartList = $('#cart-items-list');
    const $cartTotal = $('#cart-total-price');
    const $cartCount = $('#cart-item-count');
    const $emptyMsg = $('#empty-cart-message');

    if (!$cartList.length) return;
    $cartList.empty(); // .empty() арқылы тазалау

    const lang = localStorage.getItem('selectedLanguage') || 'kz';

    if (userCart.length === 0) {
      $emptyMsg.removeClass('d-none').fadeIn(200);
      $cartTotal.text('0 ₸');
      $cartCount.text('0');
      return;
    }

    $emptyMsg.addClass('d-none');

    let totalSum = 0;
    let totalItems = 0;

    // Array-ден .each() арқылы кестені құру
    $.each(userCart, function (index, item) {
      const product = typeof productsData !== 'undefined' 
        ? productsData.find(p => p.id === item.id) 
        : null;
      if (!product) return;

      const itemName = lang === 'ru' ? product.nameRu : (lang === 'en' ? product.nameEn : product.nameKz);
      const itemColor = lang === 'ru' ? product.colorRu : (lang === 'en' ? product.colorEn : product.colorKz);
      const itemTotal = item.price * item.quantity;

      totalSum += itemTotal;
      totalItems += item.quantity;

      const $row = $(`
        <tr data-index="${index}">
          <td class="align-middle"><strong>${itemName}</strong></td>
          <td class="align-middle"><span class="badge text-bg-light border px-2 py-1">${item.size}</span></td>
          <td class="align-middle">${itemColor}</td>
          <td class="align-middle">
            <div class="d-inline-flex align-items-center gap-2">
              <button type="button" class="btn cart-qty-btn btn-decrease-qty">-</button>
              <span class="cart-qty-count">${item.quantity}</span>
              <button type="button" class="btn cart-qty-btn btn-increase-qty">+</button>
            </div>
          </td>
          <td class="fw-bold text-end align-middle">${itemTotal.toLocaleString()} ₸</td>
          <td class="text-center align-middle">
            <button type="button" class="btn btn-outline-danger btn-sm rounded-circle px-2 btn-remove-item">✕</button>
          </td>
        </tr>
      `);

      $cartList.append($row); // .append() қолданылды
    });

    $cartTotal.text(`${totalSum.toLocaleString()} ₸`);
    $cartCount.text(totalItems.toString());
  }

  /* =========================================================
     4. FORM VALIDATION WITH JQUERY (order.html формасы)
     ========================================================= */
  $('#order-checkout-form').on('submit', function (e) {
    e.preventDefault(); // preventDefault қолданылды

    let isValid = true;
    const $form = $(this);

    // Әр инпутты тексеру (.trim() және .addClass('is-invalid'))
    $form.find('input[required], select[required]').each(function () {
      const $field = $(this);
      const val = $.trim($field.val());

      if (!val) {
        $field.addClass('is-invalid');
        isValid = false;
      } else {
        $field.removeClass('is-invalid');
      }
    });

    // Телефон форматын тексеру
    const $phone = $form.find('#phone');
    if ($phone.length) {
      const phoneDigits = $phone.val().replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        $phone.addClass('is-invalid');
        isValid = false;
      }
    }

    if (!isValid) return;

    // Сәтті орындалғанда эффект көрсету
    $form.slideUp(400, function () {
      $('#order-success-message').fadeIn(300).removeClass('d-none');
    });
  });

  // Элементті түзеткен сәтте қатені тазалау (.on('input change'))
  $('#order-checkout-form').on('input change', '.is-invalid', function () {
    $(this).removeClass('is-invalid');
  });

  // Алғашқы іске қосу
  renderCartUI();
  updateCartBadge();
});