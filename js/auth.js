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