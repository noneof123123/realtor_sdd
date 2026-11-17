(function () {
  'use strict';

  function list() {
    return window.RealtorStorage.read(window.RealtorStorage.keys.rentals, []);
  }

  function getById(id) {
    return list().find(function (rental) { return rental.id === id; }) || null;
  }

  function create(values) {
    var realties = window.RealtorStorage.read(window.RealtorStorage.keys.realties, []);
    var tenants = window.RealtorStorage.read(window.RealtorStorage.keys.tenants, []);
    var rentals = list();
    var realty = realties.find(function (item) { return item.id === values.realtyId; });
    var tenant = tenants.find(function (item) { return item.id === values.tenantId; });
    var status = values.contractStatus || 'active';
    var start = new Date(values.startDate);
    var end = new Date(values.endDate);
    var amount = Number(values.rentAmount);
    var nextRental;
    var nextRentals;
    var nextRealties;

    if (!realty) return { ok: false, message: 'Choose a valid realty.' };
    if (!tenant) return { ok: false, message: 'Choose a valid tenant.' };
    if (realty.status !== 'available') return { ok: false, message: 'Only available realties can be rented.' };
    if (!values.startDate || !values.endDate || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return { ok: false, message: 'Enter valid contract dates; the end date must follow the start date.' };
    }
    if (!Number.isFinite(amount) || amount <= 0) return { ok: false, message: 'Rent must be greater than zero.' };
    if (window.RealtorStorage.contractStates.indexOf(status) === -1) return { ok: false, message: 'Choose a valid contract status.' };

    nextRental = {
      id: 'rental-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      realtyId: realty.id,
      tenantId: tenant.id,
      startDate: values.startDate,
      endDate: values.endDate,
      rentAmount: amount,
      contractStatus: status,
      createdAt: new Date().toISOString()
    };
    nextRentals = rentals.concat(nextRental);
    nextRealties = realties.map(function (item) {
      return item.id === realty.id && status === 'active' ? Object.assign({}, item, { status: 'rented' }) : item;
    });

    if (!window.RealtorStorage.write(window.RealtorStorage.keys.rentals, nextRentals)) {
      return { ok: false, message: 'The rental could not be saved in this browser.' };
    }
    if (!window.RealtorStorage.write(window.RealtorStorage.keys.realties, nextRealties)) {
      window.RealtorStorage.write(window.RealtorStorage.keys.rentals, rentals);
      return { ok: false, message: 'The realty status could not be updated; no rental was saved.' };
    }
    return { ok: true, value: nextRental, message: 'Rental registered successfully.' };
  }

  window.RealtorRentals = { list: list, getById: getById, create: create };
}());
