# Technical Plan - Tenants

This spec is implemented as a self-contained tenant management file. This plan only includes list, insert, edit, validation and entity persistence, without assuming rentals, dashboard or other workflows.

## New pages
- `app/pages/tenants.html`
- `app/pages/add-tenant.html`
- `app/pages/edit-tenant.html`

## New module
- `js/tenants.js` (IIFE) exposes: `window.RealtorTenants` with:
  - `createTenant(data)`
  - `updateTenant(id, data)`
  - `getTenantById(id)`
  - `listTenants({ search })`
  - `findByDocumentId(documentId)`
  - `validateTenant(data)`

## storage.js Extension
- new key: `realtor.tenants`
- Functions: `getTenants()`, `saveTenants(tenants)`
- Function `buildTenantRecord(date, overrides)` similar to `buildRealtyRecord`
- Extend `ensureSeedData()` to create 3 tenants if they don't exist

## Specific validations
- Email: basic regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- Unique `documentId`: check in `createTenant` and `updateTenant`.

## Navigation
- Keep access to tenants in the app's base navbar, without quick access dependencies or extra screens.

## Render
- `ui.js` exposes `renderTenantRow(tenant)` for the list.
- The list shows contract and document data format consistent with the base visual system.

## Out of scope
- Rent form integration, contracts or lookup between entities.
- Metrics for dashboard or initial pages.
- Activity history of rentals by tenant.