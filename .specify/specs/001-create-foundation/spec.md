# Spec 001: Project foundations

## State
pending


## Dependencies
none

## Context
Define the technical and visual bases shared by all system capabilities. This spec focuses on verifiable results for foundation implementations; the immutable rules (stack, limits, canonical models and out of scope) are inherited from the constitution and not defined here.

## Objective
Build a technically and visually consistent document with the functional capabilities (dashboard, realties, tenants, rentals).

## Normative references
This spec inherits and fully respects `.specify/memory/constitution.md`. In case of any conflict, the constitution is the law.

## Acceptance criteria
1. The app works when opened directly from `/app/index.html` via `file://`, without a server or build steps.
2. The base structure exists inside `/app`:
    - `index.html`.
    - `css/styles.css`.
    - `js/app.js`, `js/storage.js`, `js/ui.js`, `js/realties.js`, `js/tenants.js`, `js/rentals.js`.
    - `pages/realties.html`, `pages/add-realty.html`, `pages/edit-realty.html`, `pages/rent-realty.html`, `pages/tenants.html`, `pages/add-tenant.html`, `pages/edit-tenant.html`.
3. The base JS modules in `/app/js` apply the patterns and rules defined in the constitution, verifiable in `app.js`, `storage.js`, `ui.js`, `realties.js`, `tenants.js` and `rentals.js`. 
4. The data persistence will be centralized in `js/storage.js`, including the initial seed and flash messaging between pages, according to the key conventions established in the constitution.
5. The base visual system is desktop-first and reusable:
   - Layout with sidebar + main content.
   - Metric cards and entity cards.
   - Forms, badges, alerts, flash messages.
   - Consistent SVG outline iconography.
   - Side menu with the four main entries: `Dashboard`, `My realties`, `New realty`, `Rental register`.
6. Initial seed:
   - Minimum 6 realties with varied states.
   - Minimum 3 realistic tenants.
   - Coherent rentals referencing realties and tenants by `id`.
   - Deterministic image per realty from `https://picsum.photos/seed/<id>/800/500`.
   - Fallback visual when an image doesn't load.
7. The UI base implements the minimum interaction flow from end to end in reusable pages and components, keeping validation, confirmation and visual feedback according to the constitution.


## Out of scope
Apply restrictions directly from the constitution's out-of-scope definitions.
