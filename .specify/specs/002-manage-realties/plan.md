# Technical plan - Manage Realties
This spec is implemented as a self-contained realties administrator. This plan only includes list, insert, edit, validation and persistence of the catalog, without assuming dashboards, contracts, tenants or other derived workflows.

## Pages
- `app/pages/realties.html`
- `app/pages/add-realty.html`
- `app/pages/edit-realty.html`

## Module
- `js/realties.js` exposes:
  - `createRealty(data)`
  - `updateRealty(id, data)`
  - `getRealtyById(id)`
  - `listRealties({status})`
  - `validateRealty(data)`

## Validations
- Mandatory fields: title, address, price, status, bedrooms, bathrooms.
- `price`, `bedrooms`, `bathrooms` must be numbers > 0.
- `description` must persist as readable text for cards and editions.
- `image` optional: if empty, assign a deterministic URL from `createSeedPhotoUrl(id)`.


## Render
- `ui.js` exposes `renderPropertyCard(property)` with a grid of 3 columns on desktop.
- Filtering by state is implemented on the client, without page reload.
- The card keeps visual structure regardless of title length, description, or metadata.
- The main action available in this spec is editing the realty.

## Persistence
- All I/O goes through `storage.js` with key `realtor.realties`.
- Any property persists according to the base model defined in `001-create-foundation`.
- `updatedAt` is updated automatically on every `updateProperty` call.

## Out of scope of this plan
- Metrics for initial or dashboard pages.
- Availability from contracts or the rental workflow.
- Relations between tenants and realties, or other entities.