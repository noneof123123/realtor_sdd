(function (global) {
  "use strict";

  var icons = {
    dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    realties: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>',
    add: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
    rentals: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v18H7z"/><path d="M10 7h4M10 11h4M10 15h4"/></svg>',
    tenants: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M16 8h5M18.5 5.5v5"/></svg>',
    building: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V6l8-3 8 3v15M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2"/></svg>',
    key: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M16 6l3 3M14 8l3 3"/></svg>',
    alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg>'
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function icon(name) { return icons[name] || icons.building; }

  function badge(status) {
    var normalized = String(status).toLowerCase();
    var label = normalized === "in maintenance" ? "In maintenance" : normalized.charAt(0).toUpperCase() + normalized.slice(1);
    return '<span class="badge badge--' + escapeHtml(normalized.replace(/ /g, "-")) + '"><span class="badge__dot"></span>' + escapeHtml(label) + '</span>';
  }

  function alert(message, type) {
    return '<div class="alert alert--' + escapeHtml(type || "success") + '" role="alert">' + icon("alert") + '<span>' + escapeHtml(message) + '</span></div>';
  }

  function confirmAction(message) { return global.confirm(message); }

  function mountShell(activeKey, title, subtitle, content) {
    var target = global.document.getElementById("app") || global.document.body;
    var inPages = global.location.pathname.indexOf("/pages/") !== -1;
    var root = inPages ? "../" : "";
    var entries = [
      { key: "dashboard", label: "Dashboard", sub: "Overview", href: root + "index.html", icon: "dashboard" },
      { key: "realties", label: "My realties", sub: "Properties", href: root + "pages/realties.html", icon: "realties" },
      { key: "new-realty", label: "New realty", sub: "Add property", href: root + "pages/add-realty.html", icon: "add" },
      { key: "rentals", label: "Rental register", sub: "Contracts", href: root + "pages/rent-realty.html", icon: "rentals" },
      { key: "tenants", label: "Tenants", sub: "Contacts", href: root + "pages/tenants.html", icon: "tenants" }
    ];
    var menu = entries.map(function (entry) {
      var active = entry.key === activeKey ? " is-active" : "";
      return '<a class="side-link' + active + '" href="' + entry.href + '" title="' + escapeHtml(entry.label) + '"><i></i>' + icon(entry.icon) + '<span>' + escapeHtml(entry.label) + '</span></a>';
    }).join("");
    var tenantMode = activeKey === "tenants" || activeKey === "add-tenant" || activeKey === "edit-tenant";
    var actionHref = tenantMode ? root + "pages/add-tenant.html" : root + "pages/add-realty.html";
    var actionLabel = tenantMode ? "Add tenant" : "Add realty";
    target.innerHTML = '<div class="layout"><aside class="sidebar"><a class="brand" href="' + root + 'index.html" aria-label="RealtorX home"><span class="brand-mark">' + icon("building") + '</span><span>RealtorX<small>PROPERTY MANAGEMENT</small></span></a><p class="side-caption">WORKSPACE</p><nav class="side-nav" aria-label="Main navigation">' + menu + '</nav><div class="sidebar-bottom"><div class="help-card"><span class="help-icon">' + icon("alert") + '</span><strong>Property support</strong><p>Manage your realty catalog and rentals.</p></div><div class="profile"><span class="avatar">AM</span><span><strong>Alex Morgan</strong><small>Administrator</small></span><span class="profile-dots">...</span></div></div></aside><main class="main-area"><header class="topbar"><div><p class="eyebrow">RealtorX workspace</p><h1>' + escapeHtml(title) + '</h1><p>' + escapeHtml(subtitle) + '</p></div><a class="button button--primary topbar-action" href="' + actionHref + '">' + icon("add") + '<span>' + actionLabel + '</span></a></header><div class="content">' + content + '</div></main></div>';
  }

  function metricCard(label, value, detail, iconName) {
    return '<article class="metric-card"><div class="metric-card__icon">' + icon(iconName) + '</div><div><p>' + escapeHtml(label) + '</p><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(detail) + '</small></div></article>';
  }

  function bindImageFallbacks(root) {
    (root || global.document).querySelectorAll("img[data-fallback]").forEach(function (image) {
      image.addEventListener("error", function () {
        image.classList.add("is-fallback");
        image.removeAttribute("src");
        if (image.parentElement) image.parentElement.classList.add("is-fallback");
      });
    });
  }

  function realtyCard(realty) {
    var description = String(realty.description || "No description provided.");
    var editHref = "edit-realty.html?id=" + encodeURIComponent(realty.id);
    return '<article class="realty-card"><div class="realty-photo"><img src="' + escapeHtml(realty.image) + '" alt="' + escapeHtml(realty.title) + '" data-fallback="realty"><span class="photo-tag">' + badge(realty.status) + '</span><a class="photo-edit" href="' + editHref + '" aria-label="Edit ' + escapeHtml(realty.title) + '">' + icon("building") + '</a></div><div class="realty-card-body"><div class="realty-card-heading"><h3>' + escapeHtml(realty.title) + '</h3><p class="address">' + icon("building") + '<span>' + escapeHtml(realty.address) + '</span></p></div><p class="realty-description">' + escapeHtml(description) + '</p><div class="realty-meta"><span>' + icon("building") + escapeHtml(realty.bedrooms) + ' beds</span><span>' + icon("building") + escapeHtml(realty.bathrooms) + ' baths</span><strong>$' + escapeHtml(realty.price) + '<small>/month</small></strong></div><div class="realty-card-footer"><a class="text-link" href="' + editHref + '">Edit realty ' + icon("building") + '</a></div></div></article>';
  }

  function renderPropertyCard(realty) { return realtyCard(realty); }

  function renderTenantRow(tenant) {
    var initials = String(tenant.name || "?").split(/\s+/).map(function (part) { return part.charAt(0); }).slice(0, 2).join("").toUpperCase();
    var editHref = "edit-tenant.html?id=" + encodeURIComponent(tenant.id);
    return '<article class="tenant-card"><span class="tenant-avatar">' + escapeHtml(initials) + '</span><div class="tenant-info"><h3>' + escapeHtml(tenant.name) + '</h3><a href="mailto:' + escapeHtml(tenant.email) + '">' + escapeHtml(tenant.email) + '</a><p>' + escapeHtml(tenant.phone) + ' · ' + escapeHtml(tenant.documentId) + '</p>' + (tenant.notes ? '<p>' + escapeHtml(tenant.notes) + '</p>' : '') + '</div><a class="icon-button" href="' + editHref + '" aria-label="Edit ' + escapeHtml(tenant.name) + '">' + icon("building") + '</a></article>';
  }

  function render(page, flash) {
    var isPage = page === "realties";
    var isAdd = page === "add-realty";
    var isEdit = page === "edit-realty";
    var isTenantPage = page === "tenants";
    var isAddTenant = page === "add-tenant";
    var isEditTenant = page === "edit-tenant";
    var base = isPage ? "" : "../";
    var content = "";

    if (isPage) {
      var items = window.RealtorRealties.listRealties({ status: "all" });
      var cards = items.map(function (item) { return realtyCard(item); }).join("");
      content = (flash ? '<div class="flash-message">' + icon("alert") + '<span>' + escapeHtml(flash.message) + '</span></div>' : '')
        + '<div class="toolbar"><div class="status-filters" role="group" aria-label="Filter realties by status">'
        + '<button type="button" class="filter-button is-active" data-status="all">All</button>'
        + '<button type="button" class="filter-button" data-status="available">Available</button>'
        + '<button type="button" class="filter-button" data-status="rented">Rented</button>'
        + '<button type="button" class="filter-button" data-status="in maintenance">In maintenance</button>'
        + '</div><span class="result-count" id="result-count">' + items.length + ' realties</span></div>'
        + '<div class="realty-grid realty-grid--listing" id="realty-grid">' + (cards || '<div class="empty-state--panel">No realties available.</div>') + '</div>';
    } else if (isAdd || isEdit) {
      var id = isEdit ? new URLSearchParams(window.location.search).get("id") : null;
      var item = isEdit ? window.RealtorRealties.getRealtyById(id) : null;
      if (isEdit && !item) {
        content = '<div class="empty-state--panel"><h2>Realty not found</h2><a class="button button--quiet" href="realties.html">Back to realties</a></div>';
      } else {
        item = item || { title: "", address: "", price: "", description: "", status: "available", bedrooms: "", bathrooms: "", image: "" };
        content = (flash ? '<div class="flash-message">' + icon("alert") + '<span>' + escapeHtml(flash.message) + '</span></div>' : '')
          + '<form class="form-panel" data-entity="realty" data-mode="' + (isEdit ? 'update' : 'create') + '">'
          + '<div class="form-intro"><span class="form-icon">' + icon("building") + '</span><div><h2>' + (isEdit ? "Edit realty" : "Add a new realty") + '</h2><p>Fields marked <b>*</b> are required.</p></div></div>'
          + '<div class="field"><label for="title">Title <b>*</b></label><input id="title" name="title" required value="' + escapeHtml(item.title) + '"></div>'
          + '<div class="field"><label for="address">Address <b>*</b></label><input id="address" name="address" required value="' + escapeHtml(item.address) + '"></div>'
          + '<div class="field-row"><div class="field"><label for="price">Monthly price <b>*</b></label><input id="price" name="price" type="number" min="0.01" step="0.01" required value="' + escapeHtml(item.price) + '"></div>'
          + '<div class="field"><label for="bedrooms">Bedrooms <b>*</b></label><input id="bedrooms" name="bedrooms" type="number" min="1" step="1" required value="' + escapeHtml(item.bedrooms) + '"></div>'
          + '<div class="field"><label for="bathrooms">Bathrooms <b>*</b></label><input id="bathrooms" name="bathrooms" type="number" min="1" step="1" required value="' + escapeHtml(item.bathrooms) + '"></div></div>'
          + '<div class="field"><label for="status">State <b>*</b></label><select id="status" name="status" required>'
          + window.RealtorStorage.REALTY_STATES.map(function (status) { return '<option value="' + escapeHtml(status) + '"' + (item.status === status ? ' selected' : '') + '>' + escapeHtml(status) + '</option>'; }).join("")
          + '</select></div><div class="field"><label for="description">Description</label><textarea id="description" name="description">' + escapeHtml(item.description) + '</textarea></div>'
          + '<div class="field"><label for="image">Image URL</label><input id="image" name="image" type="url" placeholder="Optional image URL" value="' + escapeHtml(item.image) + '"></div>'
          + '<div class="form-error" hidden></div><div class="form-actions"><a class="button button--quiet" href="realties.html">Cancel</a><button class="button button--primary" type="submit">' + (isEdit ? 'Save changes' : 'Create realty') + '</button></div></form>';
      }
    } else if (isTenantPage) {
      var tenants = window.RealtorTenants.listTenants({ search: "" });
      var tenantCards = tenants.map(renderTenantRow).join("");
      content = (flash ? '<div class="flash-message">' + icon("alert") + '<span>' + escapeHtml(flash.message) + '</span></div>' : '')
        + '<div class="toolbar"><label class="search-field" for="tenant-search">' + icon("tenants") + '<input id="tenant-search" type="search" placeholder="Search tenants by name"></label><span class="result-count" id="tenant-count">' + tenants.length + ' tenants</span></div>'
        + '<div class="tenant-grid" id="tenant-grid">' + (tenantCards || '<div class="empty-state--panel">No tenants yet. <a class="text-link" href="add-tenant.html">Add a tenant</a></div>') + '</div>';
    } else if (isAddTenant || isEditTenant) {
      var tenantId = isEditTenant ? new URLSearchParams(window.location.search).get("id") : null;
      var tenant = isEditTenant ? window.RealtorTenants.getTenantById(tenantId) : null;
      if (isEditTenant && !tenant) {
        content = '<div class="empty-state--panel"><h2>Tenant not found</h2><a class="button button--quiet" href="tenants.html">Back to tenants</a></div>';
      } else {
        tenant = tenant || { name: "", email: "", phone: "", documentId: "", notes: "" };
        content = (flash ? '<div class="flash-message">' + icon("alert") + '<span>' + escapeHtml(flash.message) + '</span></div>' : '')
          + '<form class="form-panel" data-entity="tenant" data-mode="' + (isEditTenant ? 'update' : 'create') + '">'
          + '<div class="form-intro"><span class="form-icon">' + icon("tenants") + '</span><div><h2>' + (isEditTenant ? 'Edit tenant' : 'Add a new tenant') + '</h2><p>Fields marked <b>*</b> are required.</p></div></div>'
          + '<div class="field-row"><div class="field"><label for="name">Name <b>*</b></label><input id="name" name="name" required value="' + escapeHtml(tenant.name) + '"></div><div class="field"><label for="email">Email <b>*</b></label><input id="email" name="email" type="email" required value="' + escapeHtml(tenant.email) + '"></div></div>'
          + '<div class="field-row"><div class="field"><label for="phone">Phone <b>*</b></label><input id="phone" name="phone" required value="' + escapeHtml(tenant.phone) + '"></div><div class="field"><label for="documentId">Document ID <b>*</b></label><input id="documentId" name="documentId" required value="' + escapeHtml(tenant.documentId) + '"></div></div>'
          + '<div class="field"><label for="notes">Notes</label><textarea id="notes" name="notes">' + escapeHtml(tenant.notes) + '</textarea></div>'
          + '<div class="form-error" hidden></div><div class="form-actions"><a class="button button--quiet" href="tenants.html">Cancel</a><button class="button button--primary" type="submit">' + (isEditTenant ? 'Save changes' : 'Create tenant') + '</button></div></form>';
      }
    } else {
      content = '<div class="empty-state--panel"><h2>Realties</h2><a class="button button--primary" href="pages/realties.html">Open realties</a></div>';
    }

    var title = isAdd ? "Add realty" : isEdit ? "Edit realty" : isTenantPage ? "Tenants" : isAddTenant ? "Add tenant" : isEditTenant ? "Edit tenant" : "My realties";
    var subtitle = isPage ? "Manage your property portfolio" : "Create or update a property";
    mountShell(isPage ? "realties" : isAdd ? "new-realty" : isTenantPage ? "tenants" : isAddTenant ? "add-tenant" : isEditTenant ? "edit-tenant" : "realties", title, subtitle, content);
    return global.document.getElementById("app").innerHTML;
  }

  function flash() {
    var item = global.RealtorStorage.consumeFlash();
    return item ? alert(item.message, item.type) : "";
  }

  function showFormError(form, message) {
    var target = form.querySelector(".form-error");
    if (!target) return;
    target.textContent = message;
    target.hidden = false;
  }

  function bind(root) {
    bindImageFallbacks(root);

    var tenantSearch = root.querySelector("#tenant-search");
    if (tenantSearch) {
      tenantSearch.addEventListener("input", function () {
        var items = window.RealtorTenants.listTenants({ search: tenantSearch.value });
        var grid = root.querySelector("#tenant-grid");
        grid.innerHTML = items.map(renderTenantRow).join("") || '<div class="empty-state--panel">No tenants match this name.</div>';
        root.querySelector("#tenant-count").textContent = items.length + (items.length === 1 ? " tenant" : " tenants");
      });
    }

    var buttons = root.querySelectorAll(".filter-button");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var status = button.getAttribute("data-status");
        buttons.forEach(function (item) { item.classList.remove("is-active"); });
        button.classList.add("is-active");
        var items = window.RealtorRealties.listRealties({ status: status });
        var grid = root.querySelector("#realty-grid");
        var cards = items.map(function (item) { return realtyCard(item); }).join("");
        grid.innerHTML = cards || '<div class="empty-state--panel">No realties match this state.</div>';
        root.querySelector("#result-count").textContent = items.length + (items.length === 1 ? " realty" : " realties");
        bindImageFallbacks(grid);
      });
    });
  }

  global.RealtorUI = { escapeHtml: escapeHtml, icon: icon, badge: badge, alert: alert, confirmAction: confirmAction, mountShell: mountShell, metricCard: metricCard, realtyCard: realtyCard, renderTenantRow: renderTenantRow, bindImageFallbacks: bindImageFallbacks, flash: flash, renderPropertyCard: renderPropertyCard, render: render, showFormError: showFormError, bind: bind };
})(window);
