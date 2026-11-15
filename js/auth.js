'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => {
    if (input.parentNode.classList.contains('password-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'password-wrapper position-relative d-flex align-items-center';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'btn position-absolute end-0 border-0 bg-transparent text-secondary';
    toggleBtn.style.zIndex = '10';
    toggleBtn.style.padding = '0.375rem 0.75rem';
    toggleBtn.innerHTML = '👁️';
    wrapper.appendChild(toggleBtn);


    toggleBtn.addEventListener('click', () => {
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      toggleBtn.innerHTML = type === 'password' ? '👁️' : '🙈';
    });
  });


  const loginForms = document.querySelectorAll('#index-login-form, #catalog-login-form, #order-login-form, #reviews-login-form, #size-login-form, #cart-login-form');
  
  loginForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value || 'User';
      const userName = email.split('@')[0];


      localStorage.setItem('currentUser', JSON.stringify({ name: userName, email: email }));

      const currentLang = localStorage.getItem('selectedLanguage') || 'kz';
      const msg = currentLang === 'ru' ? `Добро пожаловать, ${userName}!` : 
                 (currentLang === 'en' ? `Welcome, ${userName}!` : `Қош келдіңіз, ${userName}!`);
      
      alert(msg);
      window.location.hash = '';
      location.reload();
    });
  });


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