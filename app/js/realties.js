(function () {
  'use strict';

  var storage = window.RealtorStorage;

  function list() {
    return storage.read(storage.keys.realties, []);
  }

  function getById(id) {
    return list().find(function (realty) { return realty.id === id; }) || null;
  }

  function validate(values) {
    var price = Number(values.price);
    var bedrooms = Number(values.bedrooms);
    var bathrooms = Number(values.bathrooms);
    if (!values.title || !values.address) return 'Property name and address are required.';
    if (!Number.isFinite(price) || price <= 0) return 'Monthly rent must be greater than zero.';
    if (!Number.isInteger(bedrooms) || bedrooms < 0 || !Number.isInteger(bathrooms) || bathrooms < 0) return 'Bedrooms and bathrooms must be whole numbers of zero or more.';
    return '';
  }

  function create(values) {
    var message = validate(values);
    var realties = list();
    var id;
    var realty;
    if (message) return { ok: false, message: message };
    id = 'realty-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    realty = {
      id: id,
      title: values.title,
      address: values.address,
      price: Number(values.price),
      description: values.description || '',
      status: 'available',
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      image: storage.createSeedPhotoUrl(id),
      createdAt: new Date().toISOString()
    };
    if (!storage.write(storage.keys.realties, realties.concat(realty))) return { ok: false, message: 'The property could not be saved in this browser.' };
    return { ok: true, value: realty, message: 'Property added successfully.' };
  }

  function update(id, values) {
    var message = validate(values);
    var realties = list();
    var existing = realties.find(function (item) { return item.id === id; });
    var updated;
    if (!existing) return { ok: false, message: 'This property could not be found.' };
    if (message) return { ok: false, message: message };
    updated = Object.assign({}, existing, {
      title: values.title,
      address: values.address,
      price: Number(values.price),
      description: values.description || '',
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms)
    });
    if (!storage.write(storage.keys.realties, realties.map(function (item) { return item.id === id ? updated : item; }))) {
      return { ok: false, message: 'The property could not be updated in this browser.' };
    }
    return { ok: true, value: updated, message: 'Property updated successfully.' };
  }

  window.RealtorRealties = { list: list, getById: getById, create: create, update: update, validate: validate };
}());
