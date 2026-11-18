# Tasks - Tenant management

## Storage and model
- [x] Add key `realtor.tenants` in `storage.js`.
- [x] Implement `buildTenantRecord(data, overrides)` in `storage.js`.
- [x] Implement `getTenants()` and `saveTenants()` in `storage.js`.
- [x] Extend `ensureSeedData()` to create 3 realistic tenants if they don't exist.

## Domain module
- [x] Create `js/tenants.js` (IIFE) that exposes `window.RealtorTenants`.
- [x] Implement `createTenant`, `updateTenant`, `getTenantById`, `listTenants`, `findByDocumentId`.
- [x] Implement `validateTenant(data)` to centralize validation rules.
- [x] Validate email with basic regex.
- [x] Validate unique `documentId` in insert and edit.

## Pages
- [x] Build `pages/tenants.html` with list and basic search by name.
- [x] Build `pages/add-tenant.html` with validated form.
- [x] Build `pages/edit-tenant.html` with existing data load and update of `updatedAt`.
- [x] Show empty state when there are no tenants.
- [x] Show success/error messages and confirmations.

## Shared UI
- [x] Keep access to tenants in the base navigation of the app.
- [x] Implement `renderTenantRow(tenant)` in `ui.js`.

## Verification
- [x] Validate that deleting Local Storage generates 3 coherent tenants.
- [x] Validate basic search by name and uniqueness of `documentId`.