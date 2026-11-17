(function () {
  'use strict';

  var storage = window.RealtorStorage;

  function list() {
    return storage.read(storage.keys.tenants, []);
  }

  function getById(id) {
    return list().find(function (tenant) { return tenant.id === id; }) || null;
  }

  function validate(values) {
    if (!values.name || !values.email || !values.phone) return 'Name, email, and phone are required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return 'Enter a valid email address.';
    return '';
  }

  function create(values) {
    var message = validate(values);
    var tenants = list();
    var now = new Date().toISOString();
    var tenant;
    if (message) return { ok: false, message: message };
    tenant = {
      id: 'tenant-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: values.name,
      email: values.email,
      phone: values.phone,
      documentId: values.documentId || '',
      notes: values.notes || '',
      createdAt: now,
      updatedAt: now
    };
    if (!storage.write(storage.keys.tenants, tenants.concat(tenant))) return { ok: false, message: 'The tenant could not be saved in this browser.' };
    return { ok: true, value: tenant, message: 'Tenant added successfully.' };
  }

  function update(id, values) {
    var message = validate(values);
    var tenants = list();
    var existing = tenants.find(function (item) { return item.id === id; });
    var updated;
    if (!existing) return { ok: false, message: 'This tenant could not be found.' };
    if (message) return { ok: false, message: message };
    updated = Object.assign({}, existing, {
      name: values.name,
      email: values.email,
      phone: values.phone,
      documentId: values.documentId || '',
      notes: values.notes || '',
      updatedAt: new Date().toISOString()
    });
    if (!storage.write(storage.keys.tenants, tenants.map(function (item) { return item.id === id ? updated : item; }))) {
      return { ok: false, message: 'The tenant could not be updated in this browser.' };
    }
    return { ok: true, value: updated, message: 'Tenant updated successfully.' };
  }

  window.RealtorTenants = { list: list, getById: getById, create: create, update: update, validate: validate };
}());
