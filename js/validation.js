/* TechNova Computer Academy - validation.js
   Client-side validation for forms marked with [data-validate].
   NOTE: forms are NOT sent anywhere. A backend is required for real delivery or storage. */
(function () {
  'use strict';
  var RULES = {
    email: { re: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Enter a valid email address, for example name@example.com.' },
    phone: { re: /^\+?[0-9][0-9\s-]{8,14}$/, msg: 'Enter a valid phone number with 10 to 15 digits.' },
    name: { re: /^[A-Za-z][A-Za-z .'-]{1,}$/, msg: 'Enter your name using letters only.' }
  };

  function getError(f) {
    var v = f.value.trim();
    if (f.required && !v) return f.tagName === 'SELECT' ? 'Please choose an option.' : 'This field is required.';
    if (!v) return '';
    var rule = RULES[f.getAttribute('data-type')];
    if (rule && !rule.re.test(v)) return rule.msg;
    var min = parseInt(f.getAttribute('minlength'), 10);
    if (min && v.length < min) return 'Please enter at least ' + min + ' characters.';
    return '';
  }

  function check(f) {
    var msg = getError(f), box = document.getElementById('err-' + f.id);
    if (box) box.textContent = msg;
    if (msg) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid');
    return !msg;
  }

  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
    var result = form.querySelector('.form-result');
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { check(f); });
      f.addEventListener('input', function () { if (f.hasAttribute('aria-invalid')) check(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (result) result.hidden = true;
      var bad = fields.filter(function (f) { return !check(f); });
      if (bad.length) { bad[0].focus(); return; }
      if (result) {
        result.textContent = 'Thank you. Your entries passed validation. This is a front-end demo: nothing was sent or saved. Connect a backend to receive real messages.';
        result.hidden = false;
      }
      form.reset();
    });
  });
})();
