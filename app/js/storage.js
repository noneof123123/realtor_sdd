(function () {
  'use strict';

  var KEYS = {
    realties: 'realtor.realties',
    tenants: 'realtor.tenants',
    rentals: 'realtor.rentals',
    flash: 'realtor.flash'
  };
  var REALTY_STATES = ['available', 'rented', 'in maintenance'];
  var CONTRACT_STATES = ['active', 'pending', 'finalized'];

  function createSeedPhotoUrl(id) {
    return 'https://picsum.photos/seed/' + encodeURIComponent(id) + '/800/500';
  }

  function seedRealties() {
    var homes = [
      ['realty-101', 'Sunlit garden apartment', '18 Maple Row, Portland, OR', 1850, 'A calm, renovated home near neighborhood cafes and transit.', 'available', 2, 1],
      ['realty-102', 'Brickline city loft', '402 NW Alder St, Portland, OR', 2450, 'Open-plan loft with tall windows and exposed brick.', 'rented', 1, 1],
      ['realty-103', 'Cedar Ridge townhouse', '77 Cedar Ridge Dr, Beaverton, OR', 2950, 'Three-level home with a small fenced patio and garage.', 'available', 3, 2],
      ['realty-104', 'Rosewater cottage', '9 Rosewater Ln, Lake Oswego, OR', 2150, 'Character cottage with a bright kitchen and garden.', 'in maintenance', 2, 1],
      ['realty-105', 'Riverbend family home', '1207 Riverbend Ave, Portland, OR', 3400, 'Spacious family home with a covered deck and office.', 'rented', 4, 2],
      ['realty-106', 'Juniper studio', '55 SE Juniper St, Portland, OR', 1325, 'Efficient studio in a well-kept, walkable building.', 'available', 0, 1]
    ];

    return homes.map(function (home, index) {
      return {
        id: home[0], title: home[1], address: home[2], price: home[3],
        description: home[4], status: home[5], bedrooms: home[6], bathrooms: home[7],
        image: createSeedPhotoUrl(home[0]), createdAt: '2026-01-' + String(index + 5).padStart(2, '0') + 'T09:00:00.000Z'
      };
    });
  }

  function seedTenants() {
    return [
      { id: 'tenant-201', name: 'Morgan Ellis', email: 'morgan.ellis@example.com', phone: '(503) 555-0142', documentId: 'OR-482910', notes: 'Prefers email for routine updates.', createdAt: '2026-01-08T10:00:00.000Z', updatedAt: '2026-01-08T10:00:00.000Z' },
      { id: 'tenant-202', name: 'Jamie Chen', email: 'jamie.chen@example.com', phone: '(503) 555-0178', documentId: 'OR-539127', notes: 'Has one indoor cat.', createdAt: '2026-01-12T10:00:00.000Z', updatedAt: '2026-01-12T10:00:00.000Z' },
      { id: 'tenant-203', name: 'Taylor Brooks', email: 'taylor.brooks@example.com', phone: '(971) 555-0116', documentId: 'OR-604385', notes: 'Emergency contact is on file.', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z' }
    ];
  }

  function seedRentals() {
    return [
      { id: 'rental-301', realtyId: 'realty-102', tenantId: 'tenant-202', startDate: '2026-02-01', endDate: '2027-01-31', rentAmount: 2450, contractStatus: 'active', createdAt: '2026-01-20T12:00:00.000Z' },
      { id: 'rental-302', realtyId: 'realty-105', tenantId: 'tenant-203', startDate: '2026-03-01', endDate: '2027-02-28', rentAmount: 3400, contractStatus: 'active', createdAt: '2026-02-11T12:00:00.000Z' },
      { id: 'rental-303', realtyId: 'realty-101', tenantId: 'tenant-201', startDate: '2025-02-01', endDate: '2026-01-31', rentAmount: 1800, contractStatus: 'finalized', createdAt: '2025-01-18T12:00:00.000Z' }
    ];
  }

  function read(key, fallback) {
    try {
      var value = window.localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function initialize() {
    var seeds = {};
    seeds[KEYS.realties] = seedRealties();
    seeds[KEYS.tenants] = seedTenants();
    seeds[KEYS.rentals] = seedRentals();
    Object.keys(seeds).forEach(function (key) {
      if (window.localStorage.getItem(key) === null) write(key, seeds[key]);
    });
  }

  function setFlash(message) {
    write(KEYS.flash, { message: message, createdAt: new Date().toISOString() });
  }

  function takeFlash() {
    var flash = read(KEYS.flash, null);
    try { window.localStorage.removeItem(KEYS.flash); } catch (error) { /* Storage may be unavailable. */ }
    return flash && flash.message ? flash.message : '';
  }

  window.RealtorStorage = {
    keys: KEYS,
    realtyStates: REALTY_STATES,
    contractStates: CONTRACT_STATES,
    read: read,
    write: write,
    initialize: initialize,
    setFlash: setFlash,
    takeFlash: takeFlash,
    createSeedPhotoUrl: createSeedPhotoUrl
  };
}());
