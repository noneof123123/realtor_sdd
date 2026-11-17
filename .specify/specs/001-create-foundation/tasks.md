# Tasks - Foundation

- [x] Create the base structure in `/app` with `index.html`, `pages/`, `css/styles.css` and the `js/` modules defined in the spec.
- [x] Implement `app.js` to handle bootstrap and basic routing between pages.
- [x] Implement `storage.js` as a single persistence layer, applying key conventions and flash messaging defined in the constitution.
- [x] Implement a basic seed with realistic initial data (minimum 6 realties and 3 tenants).
- [x] Define and establish the rental base model with a `tenantId` reference and structural coherence between realty, tenant, and contract.
- [x] Implement `ui.js` with reusable rendering (sidebar, metrics, cards, badges, alerts, flash messages and confirmations).
- [x] Implement domain modules `realties.js`, `tenants.js` and `rentals.js` with a base contract and extension points, applying the module pattern defined in the constitution.
- [x] Build a desktop-first visual system in `styles.css` with tokens and reusable components (buttons, forms, badges, alerts).
- [x] Implement consistent outlined SVG iconography in the sidebar, quick actions and metadata cards.
- [x] Fix the main sidebar menu with four entries (`Dashboard`, `My realties`, `New realty`, `Rental register`) showing a title, subtitle and active state.
- [x] Implement deterministic images from the seed with `https://picsum.photos/seed/<id>/800/500` and visual fallback when loading fails.
- [ ] Verify that opening the main file in the web browser is enough to see the app working without installing anything or setting up a server.
