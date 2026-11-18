(function (global) {
  "use strict";

  function validateRealty(data) {
    data = data || {};
    var required = ["title", "address", "price", "status", "bedrooms", "bathrooms"];
    for (var i = 0; i < required.length; i += 1) {
      if (String(data[required[i]] == null ? "" : data[required[i]]).trim() === "") {
        return { valid: false, error: "Please complete all required fields." };
      }
    }
    var numericFields = ["price", "bedrooms", "bathrooms"];
    for (var j = 0; j < numericFields.length; j += 1) {
      var value = Number(data[numericFields[j]]);
      if (!Number.isFinite(value) || value <= 0) {
        return { valid: false, error: numericFields[j] + " must be a number greater than zero." };
      }
    }
    if (global.RealtorStorage.REALTY_STATES.indexOf(data.status) === -1) {
      return { valid: false, error: "Invalid realty state." };
    }
    return { valid: true, error: null };
  }

  function createSeedPhotoUrl(id) {
    return "https://picsum.photos/seed/" + encodeURIComponent(id) + "/800/500";
  }

  function createRealty(data) {
    var validation = validateRealty(data);
    if (!validation.valid) return { ok: false, message: validation.error };
    var id = data.id || "rlt-" + Date.now().toString(36);
    var now = new Date().toISOString();
    var record = {
      id: id,
      title: String(data.title).trim(),
      address: String(data.address).trim(),
      price: Number(data.price),
      description: String(data.description || "").trim(),
      status: data.status,
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      image: String(data.image || "").trim() ? String(data.image).trim() : createSeedPhotoUrl(id),
      createdAt: data.createdAt || now,
      updatedAt: now
    };
    var items = global.RealtorStorage.getRealties();
    items.push(record);
    global.RealtorStorage.saveRealties(items);
    return { ok: true, item: record, message: "Realty created successfully." };
  }

  function updateRealty(id, changes) {
    var items = global.RealtorStorage.getRealties();
    var index = -1;
    for (var i = 0; i < items.length; i += 1) if (items[i].id === id) index = i;
    if (index < 0) return { ok: false, message: "Realty not found." };
    var record = Object.assign({}, items[index], changes, {
      title: String(changes.title).trim(),
      address: String(changes.address).trim(),
      price: Number(changes.price),
      description: String(changes.description || "").trim(),
      bedrooms: Number(changes.bedrooms),
      bathrooms: Number(changes.bathrooms),
      image: String(changes.image || "").trim() ? String(changes.image).trim() : createSeedPhotoUrl(id),
      updatedAt: new Date().toISOString()
    });
    var validation = validateRealty(record);
    if (!validation.valid) return { ok: false, message: validation.error };
    items[index] = record;
    global.RealtorStorage.saveRealties(items);
    return { ok: true, item: record, message: "Realty updated successfully." };
  }

  function getRealtyById(id) {
    var items = global.RealtorStorage.getRealties();
    for (var i = 0; i < items.length; i += 1) if (items[i].id === id) return items[i];
    return null;
  }

  function listRealties(options) {
    var items = global.RealtorStorage.getRealties();
    options = options || {};
    if (!options.status || options.status === "all") return items.slice();
    return items.filter(function (item) { return item.status === options.status; });
  }

  global.RealtorRealties = {
    createRealty: createRealty,
    updateRealty: updateRealty,
    getRealtyById: getRealtyById,
    listRealties: listRealties,
    validateRealty: validateRealty,
    createSeedPhotoUrl: createSeedPhotoUrl,
    create: createRealty,
    update: updateRealty,
    getById: getRealtyById,
    list: listRealties,
    validate: validateRealty
  };
})(window);
