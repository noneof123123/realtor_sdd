(function () {
  'use strict';

  var appRoot = document.getElementById('app');

  function redirect(path, message) {
    window.RealtorStorage.setFlash(message);
    window.location.href = path;
  }

  function formValues(form) {
    var values = {};
    new FormData(form).forEach(function (value, key) {
      values[key] = typeof value === 'string' ? value.trim() : value;
    });
    return values;
  }

  function handleSubmit(event) {
    var form = event.target;
    var entity = form.getAttribute('data-entity');
    var mode = form.getAttribute('data-mode');
    var values;
    var id;
    var result;

    if (!entity || !mode) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!window.confirm(mode === 'update' ? 'Save these changes?' : 'Confirm and save this record?')) return;

    values = formValues(form);
    id = new URLSearchParams(window.location.search).get('id');

    if (entity === 'realty') {
      result = mode === 'update' ? window.RealtorRealties.update(id, values) : window.RealtorRealties.create(values);
      if (result.ok) redirect('realties.html', result.message);
    } else if (entity === 'tenant') {
      result = mode === 'update' ? window.RealtorTenants.update(id, values) : window.RealtorTenants.create(values);
      if (result.ok) redirect('tenants.html', result.message);
    } else if (entity === 'rental') {
      result = window.RealtorRentals.create(values);
      if (result.ok) redirect('rent-realty.html', result.message);
    }

    if (result && !result.ok) window.RealtorUI.showFormError(form, result.message);
  }

  function start() {
    var page = document.body.getAttribute('data-page') || 'dashboard';
    var flash;

    if (!appRoot || !window.RealtorStorage || !window.RealtorUI) return;
    window.RealtorStorage.initialize();
    flash = window.RealtorStorage.takeFlash();
    appRoot.innerHTML = window.RealtorUI.render(page, flash);
    appRoot.addEventListener('submit', handleSubmit);
    window.RealtorUI.bind(appRoot);
  }

  window.RealtorApp = { start: start };
  start();
}());
