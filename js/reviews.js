$(function () {
  'use strict';

  const $form = $('#add-review-form');
  if (!$form.length) return;

  const $name = $form.find('#review-name, input[type="text"]').first();
  const $comment = $form.find('textarea').first();
  if (!$name.length || !$comment.length) return;

  // Символдар санағышын қосу
  const $counter = $('<p class="small text-muted mb-2">0/500</p>');
  $comment.after($counter);

  // Пікірлер шығатын контейнерді табу немесе жасау
  let $list = $('#reviews-list, #reviews-container, #recent-reviews').first();
  if (!$list.length) {
    $list = $form.closest('section, main, .container');
  }

  let $generated = $('#togyz-added-reviews');
  if (!$generated.length) {
    $generated = $('<div class="row g-3 mt-3" id="togyz-added-reviews"></div>');
    $list.append($generated);
  }

  function getSavedReviews() {
    try {
      return JSON.parse(localStorage.getItem('togyzReviews') || '[]');
    } catch {
      return [];
    }
  }

  function renderReviews() {
    $generated.empty();
    const reviews = getSavedReviews();

    $.each(reviews, function (index, r) {
      const $card = $(`
        <div class="col-12 col-md-6 review-card" style="display: none;">
          <div class="card p-3 shadow-sm border h-100" style="background-color: #FDFCF9; border-color: #5C061C !important;">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="mb-0 fw-bold" style="color: #5C061C;">${r.name}</h5>
              <span class="badge bg-warning text-dark">⭐ 5/5</span>
            </div>
            <p class="mb-2 text-dark">${r.text}</p>
            <small class="text-muted mt-auto">${r.date}</small>
          </div>
        </div>
      `);
      $generated.append($card);
      $card.fadeIn(300); // Эффект: Пікір шыққанда жайлап пайда болу
    });
  }

  // Инпутқа жазған сайын символдарды санау
  $comment.on('input', function () {
    const len = $(this).val().length;
    $counter.text(len + '/500');
  });

  // Форманы жіберу
  $form.on('submit', function (e) {
    e.preventDefault();

    const n = $.trim($name.val());
    const txt = $.trim($comment.val());

    if (n.length < 2 || txt.length < 10 || txt.length > 500) {
      alert('Атыңыз кемінде 2 әріп, ал пікір 10 мен 500 символ аралығында болуы керек.');
      return;
    }

    const reviews = getSavedReviews();
    reviews.unshift({ name: n, text: txt, date: new Date().toLocaleString() });
    localStorage.setItem('togyzReviews', JSON.stringify(reviews));

    $form[0].reset();
    $counter.text('0/500');
    
    renderReviews();

    // Сәтті жіберілген туралы хабарлама немесе анимация
    $form.slideUp(200, function() {
      $(this).slideDown(300);
    });
  });

  renderReviews();
});
$(function () {
  'use strict';

  const $form = $('#add-review-form');
  if (!$form.length) return;

  const $name = $form.find('#review-name, input[type="text"]').first();
  const $comment = $form.find('textarea').first();
  if (!$name.length || !$comment.length) return;

  let selectedRating = 5;
  let uploadedPhotoBase64 = '';

  // Тілдерге сәйкес сөздерді анықтау
  function getReviewTexts() {
    const lang = localStorage.getItem('selectedLanguage') || 'kz';
    if (lang === 'ru') {
      return {
        ratingLabel: 'Оценка (выберите звезды):',
        photoLabel: '📷 Добавить фото (необязательно):',
        removeBtn: '✕ Удалить',
        alertMsg: 'Имя должно содержать не менее 2 символов, а отзыв — от 10 до 500 символов.'
      };
    } else if (lang === 'en') {
      return {
        ratingLabel: 'Rating (select stars):',
        photoLabel: '📷 Add photo (optional):',
        removeBtn: '✕ Remove',
        alertMsg: 'Name must be at least 2 characters, and review between 10 and 500 characters.'
      };
    } else {
      return {
        ratingLabel: 'Бағалау (Жұлдызша таңдаңыз):',
        photoLabel: '📷 Фото қосу (міндетті емес):',
        removeBtn: '✕ Өшіру',
        alertMsg: 'Атыңыз кемінде 2 әріп, ал пікір 10 мен 500 символ аралығында болуы керек.'
      };
    }
  }

  const texts = getReviewTexts();

  // 1. ЖҰЛДЫЗШАЛАР ЖӘНЕ ФОТО ЖҮКТЕУ БЛОГЫ
  const $extraControls = $(`
    <div class="mb-3 review-dynamic-label-rating">
      <label class="form-label fw-semibold d-block mb-1">${texts.ratingLabel}</label>
      <div id="star-rating-picker" class="d-inline-flex gap-1 fs-3" style="cursor: pointer; user-select: none;">
        <span data-val="1" class="star-item text-warning">★</span>
        <span data-val="2" class="star-item text-warning">★</span>
        <span data-val="3" class="star-item text-warning">★</span>
        <span data-val="4" class="star-item text-warning">★</span>
        <span data-val="5" class="star-item text-warning">★</span>
      </div>
      <span id="rating-label" class="ms-2 small text-muted fw-bold">(5/5)</span>
    </div>

    <div class="mb-3 review-dynamic-label-photo">
      <label for="review-photo-input" class="form-label fw-semibold">${texts.photoLabel}</label>
      <input type="file" id="review-photo-input" class="form-control form-control-sm" accept="image/*">
      <div id="review-photo-preview" class="mt-2 d-none">
        <img src="" alt="Preview" class="rounded-3 border" style="max-height: 110px; object-fit: cover;">
        <button type="button" id="remove-photo-btn" class="btn btn-sm btn-outline-danger ms-2">${texts.removeBtn}</button>
      </div>
    </div>
  `);

  $comment.closest('.mb-3, div').before($extraControls);

  // Тіл өзгөрген кезде динамикалық мәтіндерді жаңарту
  window.addEventListener('language-changed', () => {
    const t = getReviewTexts();
    $('.review-dynamic-label-rating label').text(t.ratingLabel);
    $('.review-dynamic-label-photo label').text(t.photoLabel);
    $('#remove-photo-btn').text(t.removeBtn);
  });

  // Жұлдызшаны басқанда бояу
  $('#star-rating-picker .star-item').on('click', function () {
    selectedRating = parseInt($(this).data('val'), 10);
    $('#rating-label').text(`(${selectedRating}/5)`);

    $('#star-rating-picker .star-item').each(function () {
      const val = parseInt($(this).data('val'), 10);
      if (val <= selectedRating) {
        $(this).removeClass('text-secondary opacity-50').addClass('text-warning');
      } else {
        $(this).removeClass('text-warning').addClass('text-secondary opacity-50');
      }
    });
  });

  // Фото жүктегенде оқу
  $('#review-photo-input').on('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const maxWidth = 500;
        const scale = maxWidth / img.width;
        canvas.width = img.width > maxWidth ? maxWidth : img.width;
        canvas.height = img.width > maxWidth ? img.height * scale : img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        uploadedPhotoBase64 = canvas.toDataURL('image/jpeg', 0.75);

        $('#review-photo-preview img').attr('src', uploadedPhotoBase64);
        $('#review-photo-preview').removeClass('d-none');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  $('#remove-photo-btn').on('click', function () {
    uploadedPhotoBase64 = '';
    $('#review-photo-input').val('');
    $('#review-photo-preview').addClass('d-none');
  });

  const $counter = $('<p class="small text-muted mb-2">0/500</p>');
  $comment.after($counter);

  let $list = $('#reviews-list, #reviews-container, #recent-reviews').first();
  if (!$list.length) {
    $list = $form.closest('section, main, .container');
  }

  let $generated = $('#togyz-added-reviews');
  if (!$generated.length) {
    $generated = $('<div class="row g-3 mt-3" id="togyz-added-reviews"></div>');
    $list.append($generated);
  }

  function getSavedReviews() {
    try {
      return JSON.parse(localStorage.getItem('togyzReviews') || '[]');
    } catch {
      return [];
    }
  }

  function renderReviews() {
    $generated.empty();
    const reviews = getSavedReviews();

    $.each(reviews, function (index, r) {
      const rating = r.rating || 5;
      const starsHtml = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      const photoHtml = r.photo
        ? `<div class="mb-2"><img src="${r.photo}" alt="Review photo" class="img-fluid rounded-3 border" style="max-height: 220px; width: 100%; object-fit: cover;"></div>`
        : '';

      const $card = $(`
        <div class="col-12 col-md-6 review-card" style="display: none;">
          <div class="card p-3 shadow-sm border h-100" style="background-color: #FDFCF9; border-color: #5C061C !important;">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="mb-0 fw-bold" style="color: #5C061C;">${r.name}</h5>
              <span class="badge bg-warning text-dark fs-6">${starsHtml} (${rating}/5)</span>
            </div>
            ${photoHtml}
            <p class="mb-2 text-dark">${r.text}</p>
            <small class="text-muted mt-auto">${r.date}</small>
          </div>
        </div>
      `);
      $generated.append($card);
      $card.fadeIn(300);
    });
  }

  $comment.on('input', function () {
    const len = $(this).val().length;
    $counter.text(len + '/500');
  });

  // Пікірді жіберу
  $form.on('submit', function (e) {
    e.preventDefault();

    const n = $.trim($name.val());
    const txt = $.trim($comment.val());
    const t = getReviewTexts();

    if (n.length < 2 || txt.length < 10 || txt.length > 500) {
      alert(t.alertMsg);
      return;
    }

    const reviews = getSavedReviews();
    reviews.unshift({
      name: n,
      text: txt,
      rating: selectedRating,
      photo: uploadedPhotoBase64,
      date: new Date().toLocaleString()
    });
    localStorage.setItem('togyzReviews', JSON.stringify(reviews));

    $form[0].reset();
    $counter.text('0/500');
    selectedRating = 5;
    uploadedPhotoBase64 = '';
    $('#rating-label').text('(5/5)');
    $('#star-rating-picker .star-item').removeClass('text-secondary opacity-50').addClass('text-warning');
    $('#review-photo-preview').addClass('d-none');

    renderReviews();

    $form.slideUp(200, function () {
      $(this).slideDown(300);
    });
  });

  renderReviews();
});