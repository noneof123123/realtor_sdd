(function (global) {
  "use strict";

  function validateTenant(data) {
    data = data || {};
    if (!String(data.name || "").trim()) return { valid: false, error: "Name is required." };
    if (!String(data.email || "").trim()) return { valid: false, error: "Email is required." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim())) return { valid: false, error: "Enter a valid email address." };
    if (!String(data.phone || "").trim()) return { valid: false, error: "Phone is required." };
    if (!String(data.documentId || "").trim()) return { valid: false, error: "Document ID is required." };
    return { valid: true, error: null };
  }

  function findByDocumentId(documentId) {
    var normalized = String(documentId || "").trim().toLowerCase();
    var items = global.RealtorStorage.getTenants();
    for (var i = 0; i < items.length; i += 1) {
      if (String(items[i].documentId || "").trim().toLowerCase() === normalized) return items[i];
    }
    return null;
  }

  function createTenant(data) {
    var validation = validateTenant(data);
    if (!validation.valid) return { ok: false, message: validation.error };
    if (findByDocumentId(data.documentId)) return { ok: false, message: "Document ID must be unique." };

    var record = global.RealtorStorage.buildTenantRecord(data, {
      id: data.id || "tn-" + Date.now().toString(36),
      name: String(data.name).trim(),
      email: String(data.email).trim(),
      phone: String(data.phone).trim(),
      documentId: String(data.documentId).trim(),
      notes: String(data.notes || "").trim()
    });
    var items = global.RealtorStorage.getTenants();
    items.push(record);
    global.RealtorStorage.saveTenants(items);
    return { ok: true, item: record, message: "Tenant created successfully." };
  }

  function updateTenant(id, changes) {
    var items = global.RealtorStorage.getTenants();
    var index = -1;
    for (var i = 0; i < items.length; i += 1) if (items[i].id === id) index = i;
    if (index < 0) return { ok: false, message: "Tenant not found." };

    var record = Object.assign({}, items[index], changes, {
      name: String(changes.name || "").trim(),
      email: String(changes.email || "").trim(),
      phone: String(changes.phone || "").trim(),
      documentId: String(changes.documentId || "").trim(),
      notes: String(changes.notes || "").trim()
    });
    var validation = validateTenant(record);
    if (!validation.valid) return { ok: false, message: validation.error };

    var duplicate = findByDocumentId(record.documentId);
    if (duplicate && duplicate.id !== id) return { ok: false, message: "Document ID must be unique." };

    record.updatedAt = new Date().toISOString();
    items[index] = record;
    global.RealtorStorage.saveTenants(items);
    return { ok: true, item: record, message: "Tenant updated successfully." };
  }

  function getTenantById(id) {
    var items = global.RealtorStorage.getTenants();
    for (var i = 0; i < items.length; i += 1) if (items[i].id === id) return items[i];
    return null;
  }

  function listTenants(options) {
    var items = global.RealtorStorage.getTenants();
    options = options || {};
    var search = String(options.search || "").trim().toLowerCase();
    if (!search) return items.slice();
    return items.filter(function (item) {
      return String(item.name || "").toLowerCase().indexOf(search) !== -1;
    });
  }

  global.RealtorTenants = {
    validateTenant: validateTenant,
    createTenant: createTenant,
    updateTenant: updateTenant,
    getTenantById: getTenantById,
    listTenants: listTenants,
    findByDocumentId: findByDocumentId,
    validate: validateTenant,
    create: createTenant,
    update: updateTenant,
    getById: getTenantById,
    list: listTenants
  };
})(window);
