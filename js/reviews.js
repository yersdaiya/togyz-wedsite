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