(function (global) {
  "use strict";

  var KEYS = {
    realties: "realtor.realties",
    tenants: "realtor.tenants",
    rentals: "realtor.rentals",
    flash: "realtor.flash"
  };

  var REALTY_STATES = ["available", "rented", "in maintenance"];
  var CONTRACT_STATES = ["active", "pending", "finalized"];

  function read(key) {
    var raw = global.localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (error) { return null; }
  }

  function write(key, value) {
    global.localStorage.setItem(key, JSON.stringify(value));
  }

  function seed() {
    var realties = read(KEYS.realties);
    var tenants = read(KEYS.tenants);
    var rentals = read(KEYS.rentals);

    if (!realties) {
      realties = [
        { id: "rlt-001", title: "Maplewood Residence", address: "18 Maple Street, Austin", price: 2450, description: "Bright family home near green parks.", status: "available", bedrooms: 3, bathrooms: 2, image: "https://picsum.photos/seed/rlt-001/800/500", createdAt: "2026-10-02T09:00:00.000Z" },
        { id: "rlt-002", title: "Riverside Loft", address: "42 River Avenue, Portland", price: 2100, description: "Modern loft with river views.", status: "rented", bedrooms: 2, bathrooms: 1, image: "https://picsum.photos/seed/rlt-002/800/500", createdAt: "2026-10-05T10:30:00.000Z" },
        { id: "rlt-003", title: "Oak Grove Villa", address: "7 Oak Grove, Denver", price: 3200, description: "Spacious villa with a private patio.", status: "available", bedrooms: 4, bathrooms: 3, image: "https://picsum.photos/seed/rlt-003/800/500", createdAt: "2026-10-08T14:15:00.000Z" },
        { id: "rlt-004", title: "Sunset Apartments", address: "103 Sunset Boulevard, Los Angeles", price: 1850, description: "Central apartment with sunset views.", status: "in maintenance", bedrooms: 1, bathrooms: 1, image: "https://picsum.photos/seed/rlt-004/800/500", createdAt: "2026-10-12T11:45:00.000Z" },
        { id: "rlt-005", title: "Cedar Park Townhouse", address: "29 Cedar Lane, Seattle", price: 2750, description: "Townhouse close to shops and transit.", status: "rented", bedrooms: 3, bathrooms: 2, image: "https://picsum.photos/seed/rlt-005/800/500", createdAt: "2026-10-16T16:20:00.000Z" },
        { id: "rlt-006", title: "Hillcrest Studio", address: "56 Hillcrest Road, Boston", price: 1600, description: "Efficient studio in a quiet neighborhood.", status: "available", bedrooms: 1, bathrooms: 1, image: "https://picsum.photos/seed/rlt-006/800/500", createdAt: "2026-10-20T08:10:00.000Z" }
      ];
      write(KEYS.realties, realties);
    }

    if (!tenants) {
      tenants = [
        { id: "tn-001", name: "Sophia Martinez", email: "sophia.martinez@example.com", phone: "+1 512 555 0101", documentId: "TX-48291", notes: "Prefers long-term leases.", createdAt: "2026-10-03T09:00:00.000Z", updatedAt: "2026-10-03T09:00:00.000Z" },
        { id: "tn-002", name: "Daniel Kim", email: "daniel.kim@example.com", phone: "+1 503 555 0188", documentId: "OR-73142", notes: "No pets.", createdAt: "2026-10-09T12:00:00.000Z", updatedAt: "2026-10-09T12:00:00.000Z" },
        { id: "tn-003", name: "Emma Thompson", email: "emma.thompson@example.com", phone: "+1 206 555 0147", documentId: "WA-61903", notes: "Remote professional.", createdAt: "2026-10-14T15:30:00.000Z", updatedAt: "2026-10-14T15:30:00.000Z" }
      ];
      write(KEYS.tenants, tenants);
    }

    if (!rentals) {
      rentals = [
        { id: "rnt-001", realtyId: "rlt-002", tenantId: "tn-002", startDate: "2026-09-01", endDate: "2027-08-31", rentAmount: 2100, contractStatus: "active", createdAt: "2026-08-20T10:00:00.000Z" },
        { id: "rnt-002", realtyId: "rlt-005", tenantId: "tn-003", startDate: "2026-10-01", endDate: "2027-09-30", rentAmount: 2750, contractStatus: "active", createdAt: "2026-09-18T13:00:00.000Z" }
      ];
      write(KEYS.rentals, rentals);
    }
  }

  function ensureSeedData() {
    seed();
  }

  function buildTenantRecord(data, overrides) {
    var now = new Date().toISOString();
    data = data || {};
    return Object.assign({}, data, {
      id: data.id || "tn-" + Date.now().toString(36),
      name: String(data.name || "").trim(),
      email: String(data.email || "").trim(),
      phone: String(data.phone || "").trim(),
      documentId: String(data.documentId || "").trim(),
      notes: String(data.notes || "").trim(),
      createdAt: data.createdAt || now,
      updatedAt: data.updatedAt || now
    }, overrides || {});
  }

  function init() {
    ensureSeedData();
  }

  function getRealties() { return read(KEYS.realties) || []; }
  function getTenants() { return read(KEYS.tenants) || []; }
  function getRentals() { return read(KEYS.rentals) || []; }
  function saveRealties(value) { write(KEYS.realties, value); }
  function saveTenants(value) { write(KEYS.tenants, value); }
  function saveRentals(value) { write(KEYS.rentals, value); }
  function setFlash(message, type) { write(KEYS.flash, { message: message, type: type || "success", createdAt: Date.now() }); }
  function consumeFlash() { var flash = read(KEYS.flash); if (flash) global.localStorage.removeItem(KEYS.flash); return flash; }

  global.RealtorStorage = {
    KEYS: KEYS,
    keys: KEYS,
    REALTY_STATES: REALTY_STATES,
    realtyStates: REALTY_STATES,
    CONTRACT_STATES: CONTRACT_STATES,
    contractStates: CONTRACT_STATES,
    initialize: init,
    init: init,
    ensureSeedData: ensureSeedData,
    buildTenantRecord: buildTenantRecord,
    read: function (key, fallback) { var value = read(key); return value == null ? (fallback == null ? null : fallback) : value; },
    write: function (key, value) { try { write(key, value); return true; } catch (error) { return false; } },
    getRealties: getRealties,
    getTenants: getTenants,
    getRentals: getRentals,
    saveRealties: saveRealties,
    saveTenants: saveTenants,
    saveRentals: saveRentals,
    setFlash: setFlash,
    takeFlash: consumeFlash,
    consumeFlash: consumeFlash
  };
})(window);
