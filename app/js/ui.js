(function () {
  'use strict';

  var icons = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-6h-4v6H4a1 1 0 0 1-1-1z"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-4h6v4M8 7h1m6 0h1M8 11h1m6 0h1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8 2 2-2 2 2 2-3 3-2-2-2 2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.5a4 4 0 0 1 0 7.75M20 21v-2a4 4 0 0 0-3-3.87"/>',
    arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    bed: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M5 10V6h5v4m4 0V6h5v4M3 18v2m18-2v2"/>',
    bath: '<path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Zm2 0V6a3 3 0 0 1 6 0v1m-6 10v3m14-3v3"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>'
  };

  function icon(name, className) {
    return '<svg class="icon ' + (className || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icons[name] || icons.home) + '</svg>';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function route(page) {
    var file = page === 'dashboard' ? 'index.html' : page + '.html';
    return document.body.getAttribute('data-page') === 'dashboard' ? (page === 'dashboard' ? '../index.html' : 'pages/' + file) : (page === 'dashboard' ? '../index.html' : file);
  }

  function money(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value) || 0);
  }

  function badge(status) {
    var label = status === 'in maintenance' ? 'In maintenance' : status.charAt(0).toUpperCase() + status.slice(1);
    return '<span class="badge badge--' + escapeHtml(status.replaceAll(' ', '-')) + '">' + escapeHtml(label) + '</span>';
  }

  function field(name, label, value, type, required, placeholder) {
    var safe = escapeHtml(value || '');
    var requiredAttr = required ? ' required' : '';
    var hint = placeholder ? ' placeholder="' + escapeHtml(placeholder) + '"' : '';
    if (type === 'textarea') return '<label class="field"><span>' + label + (required ? ' <b>*</b>' : '') + '</span><textarea name="' + name + '" rows="3"' + requiredAttr + hint + '>' + safe + '</textarea></label>';
    return '<label class="field"><span>' + label + (required ? ' <b>*</b>' : '') + '</span><input name="' + name + '" type="' + (type || 'text') + '" value="' + safe + '"' + requiredAttr + hint + (type === 'number' ? ' min="0" step="1"' : '') + '></label>';
  }

  function shell(page, title, subtitle, content, flash) {
    var menu = [
      { key: 'dashboard', label: 'Dashboard', icon: 'home' },
      { key: 'realties', label: 'My realties', icon: 'building' },
      { key: 'add-realty', label: 'New realty', icon: 'plus' },
      { key: 'rent-realty', label: 'Rental register', icon: 'key' }
    ];
    var menuHtml = menu.map(function (item) {
      var active = page === item.key || (item.key === 'add-realty' && page === 'edit-realty');
      return '<a class="side-link' + (active ? ' is-active' : '') + '" href="' + route(item.key) + '"' + (active ? ' aria-current="page"' : '') + '>' + icon(item.icon) + '<span>' + item.label + '</span>' + (active ? '<i></i>' : '') + '</a>';
    }).join('');
    return '<div class="layout"><aside class="sidebar"><a class="brand" href="' + route('dashboard') + '"><span class="brand-mark">' + icon('home') + '</span><span>homebase<small>PROPERTY MANAGER</small></span></a><div class="side-caption">WORKSPACE</div><nav class="side-nav" aria-label="Main navigation">' + menuHtml + '</nav><div class="sidebar-bottom"><div class="help-card"><span class="help-icon">' + icon('check') + '</span><strong>All in one place</strong><p>Your properties, tenants and agreements.</p></div><div class="profile"><span class="avatar">AR</span><span><strong>Alex Rivera</strong><small>Property owner</small></span><span class="profile-dots" aria-hidden="true">•••</span></div></div></aside><div class="main-area"><header class="topbar"><div><span class="eyebrow">YOUR RENTAL WORKSPACE</span><h1>' + title + '</h1><p>' + subtitle + '</p></div><a class="button button--primary topbar-action" href="' + route('add-realty') + '">' + icon('plus') + ' Add a realty</a></header><main class="content">' + (flash ? '<div class="flash-message" role="status">' + icon('check') + '<span>' + escapeHtml(flash) + '</span><button type="button" class="flash-close" aria-label="Dismiss message">×</button></div>' : '') + content + '</main><footer class="footer">A calmer way to manage your rental portfolio <span>•</span> Homebase</footer></div></div>';
  }

  function realtyCard(realty) {
    return '<article class="realty-card" data-search="' + escapeHtml((realty.title + ' ' + realty.address + ' ' + realty.status).toLowerCase()) + '"><div class="realty-photo"><img src="' + escapeHtml(realty.image) + '" alt="' + escapeHtml(realty.title) + ' exterior" data-fallback><span class="photo-tag">' + badge(realty.status) + '</span><a class="photo-edit" href="' + route('edit-realty') + '?id=' + encodeURIComponent(realty.id) + '" aria-label="Edit ' + escapeHtml(realty.title) + '">' + icon('edit') + '</a></div><div class="realty-card-body"><div class="realty-card-heading"><div><h3>' + escapeHtml(realty.title) + '</h3><p class="address">' + icon('pin') + escapeHtml(realty.address) + '</p></div></div><div class="realty-meta"><span>' + icon('bed') + escapeHtml(realty.bedrooms) + ' beds</span><span>' + icon('bath') + escapeHtml(realty.bathrooms) + ' baths</span><strong>' + money(realty.price) + '<small> / month</small></strong></div><div class="realty-card-footer"><a href="' + route('rent-realty') + '" class="text-link">View rental register ' + icon('arrow') + '</a></div></div></article>';
  }

  function dashboard(realties, tenants, rentals) {
    var available = realties.filter(function (item) { return item.status === 'available'; }).length;
    var occupied = realties.filter(function (item) { return item.status === 'rented'; }).length;
    var monthly = rentals.filter(function (item) { return item.contractStatus === 'active'; }).reduce(function (sum, item) { return sum + Number(item.rentAmount); }, 0);
    var cards = [
      { label: 'Total realties', value: realties.length, note: 'Across your portfolio', icon: 'building', tone: 'lavender' },
      { label: 'Currently rented', value: occupied, note: 'Active agreements', icon: 'key', tone: 'mint' },
      { label: 'Available now', value: available, note: 'Ready for a tenant', icon: 'home', tone: 'peach' },
      { label: 'Monthly rent', value: money(monthly), note: 'From active rentals', icon: 'calendar', tone: 'blue' }
    ];
    var metricHtml = cards.map(function (item) { return '<article class="metric-card"><span class="metric-icon metric-icon--' + item.tone + '">' + icon(item.icon) + '</span><span class="metric-label">' + item.label + '</span><strong>' + item.value + '</strong><small>' + item.note + '</small></article>'; }).join('');
    return '<section class="welcome-banner"><div><span class="welcome-kicker">MONDAY, LET’S GET ORGANIZED</span><h2>Your properties are in good hands.</h2><p>A clear overview of your rentals, tenants and next steps.</p></div><div class="welcome-art" aria-hidden="true">' + icon('home') + '<span></span><i></i></div></section><section class="metrics-grid" aria-label="Portfolio overview">' + metricHtml + '</section><section class="section-block"><div class="section-heading"><div><span class="eyebrow">YOUR PORTFOLIO</span><h2>Recently added realties</h2></div><a class="text-link" href="' + route('realties') + '">View all ' + icon('arrow') + '</a></div><div class="realty-grid">' + realties.slice(0, 3).map(realtyCard).join('') + '</div></section><section class="dashboard-bottom"><article class="quick-card"><div class="section-heading"><div><span class="eyebrow">GET STARTED</span><h2>Quick actions</h2></div></div><div class="quick-actions"><a href="' + route('add-realty') + '"><span class="quick-icon quick-icon--lavender">' + icon('plus') + '</span><span><strong>Add a realty</strong><small>Grow your portfolio</small></span>' + icon('arrow') + '</a><a href="' + route('rent-realty') + '"><span class="quick-icon quick-icon--mint">' + icon('key') + '</span><span><strong>Register a rental</strong><small>Connect a tenant and realty</small></span>' + icon('arrow') + '</a><a href="' + route('tenants') + '"><span class="quick-icon quick-icon--peach">' + icon('users') + '</span><span><strong>Manage tenants</strong><small>' + tenants.length + ' people in your directory</small></span>' + icon('arrow') + '</a></div></article><article class="note-card"><span class="note-mark">“</span><p>A well-organized home makes room for better relationships.</p><span>YOUR HOMEBASE NOTE</span></article></section>';
  }

  function realtiesView(realties) {
    return '<div class="toolbar"><label class="search-field">' + icon('search') + '<input type="search" data-search-input placeholder="Search realties…" aria-label="Search realties"></label><span class="result-count">' + realties.length + ' properties</span></div><div class="realty-grid realty-grid--listing">' + realties.map(realtyCard).join('') + '</div>';
  }

  function realtyForm(existing) {
    var editing = Boolean(existing);
    return '<section class="form-panel"><div class="form-intro"><span class="form-icon">' + icon(editing ? 'edit' : 'building') + '</span><div><h2>' + (editing ? 'Property details' : 'Tell us about your property') + '</h2><p>Fields marked with <b>*</b> are required.</p></div></div><form data-entity="realty" data-mode="' + (editing ? 'update' : 'create') + '">' + field('title', 'Property name', existing && existing.title, 'text', true, 'e.g. Sunlit garden apartment') + field('address', 'Street address', existing && existing.address, 'text', true, 'Street, city, state') + '<div class="field-row">' + field('price', 'Monthly rent ($)', existing && existing.price, 'number', true, '1850') + field('bedrooms', 'Bedrooms', existing && existing.bedrooms, 'number', true, '2') + field('bathrooms', 'Bathrooms', existing && existing.bathrooms, 'number', true, '1') + '</div>' + field('description', 'Description', existing && existing.description, 'textarea', false, 'A few details that make this place special…') + (editing ? '<div class="current-status"><span>Current status</span>' + badge(existing.status) + '</div>' : '') + '<div class="form-error" role="alert" hidden></div><div class="form-actions"><a class="button button--quiet" href="' + route('realties') + '">Cancel</a><button class="button button--primary" type="submit">' + icon('check') + (editing ? ' Save changes' : ' Add property') + '</button></div></form></section>';
  }

  function tenantsView(tenants) {
    var rows = tenants.map(function (tenant) {
      return '<article class="tenant-card"><span class="tenant-avatar">' + escapeHtml(tenant.name.split(' ').map(function (part) { return part.charAt(0); }).slice(0, 2).join('')) + '</span><div class="tenant-info"><h3>' + escapeHtml(tenant.name) + '</h3><a href="mailto:' + escapeHtml(tenant.email) + '">' + escapeHtml(tenant.email) + '</a><p>' + escapeHtml(tenant.phone) + '</p></div><a class="icon-button" href="' + route('edit-tenant') + '?id=' + encodeURIComponent(tenant.id) + '" aria-label="Edit ' + escapeHtml(tenant.name) + '">' + icon('edit') + '</a></article>';
    }).join('');
    return '<div class="section-heading section-heading--standalone"><div><span class="eyebrow">YOUR DIRECTORY</span><h2>People who make it home</h2><p>Keep tenant details organized in one place.</p></div><a class="button button--primary" href="' + route('add-tenant') + '">' + icon('plus') + ' Add tenant</a></div><div class="tenant-grid">' + (rows || '<p class="empty-state">No tenants yet. Add your first tenant to get started.</p>') + '</div>';
  }

  function tenantForm(existing) {
    var editing = Boolean(existing);
    return '<section class="form-panel"><div class="form-intro"><span class="form-icon">' + icon('users') + '</span><div><h2>' + (editing ? 'Update tenant details' : 'Add someone to your directory') + '</h2><p>Fields marked with <b>*</b> are required.</p></div></div><form data-entity="tenant" data-mode="' + (editing ? 'update' : 'create') + '">' + field('name', 'Full name', existing && existing.name, 'text', true, 'First and last name') + '<div class="field-row">' + field('email', 'Email address', existing && existing.email, 'email', true, 'name@example.com') + field('phone', 'Phone number', existing && existing.phone, 'tel', true, '(555) 555-0100') + '</div>' + field('documentId', 'Document ID', existing && existing.documentId, 'text', false, 'Optional identification') + field('notes', 'Notes', existing && existing.notes, 'textarea', false, 'Helpful details to remember…') + '<div class="form-error" role="alert" hidden></div><div class="form-actions"><a class="button button--quiet" href="' + route('tenants') + '">Cancel</a><button class="button button--primary" type="submit">' + icon('check') + (editing ? ' Save changes' : ' Add tenant') + '</button></div></form></section>';
  }

  function rentalsView(realties, tenants, rentals) {
    var available = realties.filter(function (item) { return item.status === 'available'; });
    var options = available.map(function (item) { return '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.title) + ' — ' + money(item.price) + '</option>'; }).join('');
    var tenantOptions = tenants.map(function (tenant) { return '<option value="' + escapeHtml(tenant.id) + '">' + escapeHtml(tenant.name) + '</option>'; }).join('');
    var history = rentals.slice().reverse().map(function (rental) {
      var realty = realties.find(function (item) { return item.id === rental.realtyId; });
      var tenant = tenants.find(function (item) { return item.id === rental.tenantId; });
      return '<tr><td><strong>' + escapeHtml(realty ? realty.title : 'Unknown realty') + '</strong><small>' + escapeHtml(realty ? realty.address : '') + '</small></td><td>' + escapeHtml(tenant ? tenant.name : 'Unknown tenant') + '</td><td>' + escapeHtml(rental.startDate) + '<small>to ' + escapeHtml(rental.endDate) + '</small></td><td><strong>' + money(rental.rentAmount) + '</strong></td><td>' + badge(rental.contractStatus) + '</td></tr>';
    }).join('');
    var createForm = '<section class="form-panel rental-form"><div class="form-intro"><span class="form-icon">' + icon('key') + '</span><div><h2>Start a new agreement</h2><p>Connect an available realty with a tenant.</p></div></div>' + (available.length && tenants.length ? '<form data-entity="rental" data-mode="create"><div class="field-row"><label class="field"><span>Available realty <b>*</b></span><select name="realtyId" required><option value="">Choose a property</option>' + options + '</select></label><label class="field"><span>Tenant <b>*</b></span><select name="tenantId" required><option value="">Choose a tenant</option>' + tenantOptions + '</select></label></div><div class="field-row">' + field('startDate', 'Start date', '', 'date', true) + field('endDate', 'End date', '', 'date', true) + field('rentAmount', 'Monthly rent ($)', '', 'number', true, '1850') + '</div><div class="field-row"><label class="field"><span>Contract status</span><select name="contractStatus"><option value="active">Active</option><option value="pending">Pending</option></select></label></div><div class="form-error" role="alert" hidden></div><div class="form-actions"><button class="button button--primary" type="submit">' + icon('check') + ' Register rental</button></div></form>' : '<div class="empty-callout">' + icon('check') + '<p>' + (tenants.length ? 'Add an available realty before creating a rental.' : 'Add a tenant and an available realty before creating a rental.') + '</p></div>') + '</section>';
    return createForm + '<section class="section-block rental-history"><div class="section-heading"><div><span class="eyebrow">AGREEMENTS</span><h2>Rental history</h2></div><span class="result-count">' + rentals.length + ' records</span></div><div class="table-wrap"><table><thead><tr><th>Realty</th><th>Tenant</th><th>Term</th><th>Monthly rent</th><th>Status</th></tr></thead><tbody>' + (history || '<tr><td colspan="5" class="empty-state">No rental records yet.</td></tr>') + '</tbody></table></div></section>';
  }

  function render(page, flash) {
    var realties = window.RealtorStorage.read(window.RealtorStorage.keys.realties, []);
    var tenants = window.RealtorStorage.read(window.RealtorStorage.keys.tenants, []);
    var rentals = window.RealtorStorage.read(window.RealtorStorage.keys.rentals, []);
    var id = new URLSearchParams(window.location.search).get('id');
    var realty = realties.find(function (item) { return item.id === id; });
    var tenant = tenants.find(function (item) { return item.id === id; });
    var title = 'Your dashboard';
    var subtitle = 'A little more clarity for your day-to-day.';
    var content = dashboard(realties, tenants, rentals);

    if (page === 'realties') { title = 'My realties'; subtitle = 'Every space, detail and status at a glance.'; content = realtiesView(realties); }
    if (page === 'add-realty' || page === 'edit-realty') { title = page === 'edit-realty' ? 'Edit realty' : 'Add a realty'; subtitle = 'Keep your property details accurate and up to date.'; content = realtyForm(page === 'edit-realty' ? realty : null); }
    if (page === 'tenants') { title = 'Tenant directory'; subtitle = 'Build thoughtful, well-organized tenant relationships.'; content = tenantsView(tenants); }
    if (page === 'add-tenant' || page === 'edit-tenant') { title = page === 'edit-tenant' ? 'Edit tenant' : 'Add a tenant'; subtitle = 'Keep important contact details close at hand.'; content = tenantForm(page === 'edit-tenant' ? tenant : null); }
    if (page === 'rent-realty') { title = 'Rental register'; subtitle = 'Bring a realty and tenant together in a clear agreement.'; content = rentalsView(realties, tenants, rentals); }
    if ((page === 'edit-realty' && !realty) || (page === 'edit-tenant' && !tenant)) content = '<div class="empty-state empty-state--panel">This record could not be found. <a class="text-link" href="' + route(page === 'edit-realty' ? 'realties' : 'tenants') + '">Return to the list ' + icon('arrow') + '</a></div>';
    return shell(page, title, subtitle, content, flash);
  }

  function bind(root) {
    root.addEventListener('error', function (event) {
      if (event.target.matches('img[data-fallback]')) event.target.closest('.realty-photo').classList.add('is-fallback');
    }, true);
    root.addEventListener('input', function (event) {
      if (!event.target.matches('[data-search-input]')) return;
      var query = event.target.value.toLowerCase();
      root.querySelectorAll('.realty-card[data-search]').forEach(function (card) {
        card.hidden = card.getAttribute('data-search').indexOf(query) === -1;
      });
    });
    root.addEventListener('click', function (event) {
      if (event.target.closest('.flash-close')) event.target.closest('.flash-message').remove();
    });
  }

  function showFormError(form, message) {
    var error = form.querySelector('.form-error');
    if (!error) return;
    error.textContent = message;
    error.hidden = false;
    error.focus();
  }

  window.RealtorUI = { render: render, bind: bind, showFormError: showFormError, icon: icon };
}());
