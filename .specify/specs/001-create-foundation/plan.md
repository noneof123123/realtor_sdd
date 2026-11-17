# Technical Plan - Foundation

## Architecture

Static multi-page frontend in `/app`, executable with `file://`. The solution is organized by domains and modules with a single responsibility to keep low coupling.

## JS Module Responsibilities

- `app.js` - initialization, basic routing between pages, general start.
- `storage.js` - read, write, initial seed and Local Storage utilities.
- `ui.js` - navbar, cards, buttons, forms, alerts, badges and reusable rendering.
- `realties.js` - base domain contract for realties and extension points.
- `tenants.js` - base domain contract for tenants and extension points.
- `rentals.js` - base domain contract for rentals and extension points.

## Technical decisions

1. Module pattern:
    - The Module Pattern defined in the constitution will be implemented in all `/app/js` files.
    - `app.js` orchestrates startup and delegates to domain public APIs.

2. Persistence:
   - `storage.js` centralizes read/write operations, seeding and flash messaging.
   - Key and persistence conventions are consumed from the canonical constitution definition.
   - Idempotent initialization: seed only when no previous data exists.

3. Reusable visual system:
   - Design tokens centralized in `styles.css`.
   - Relaxed BEM convention (`block`, `block__element`, `block--modifier`).
   - Common shell: sidebar + header + main content.
   - Outlined SVG iconography centralized in `ui.js` and styled in `styles.css`.
   - Fixed main side menu with four entries and an active state for `activeKey` in `mountShell`.

4. Seed images:
   - `createSeedPhotoUrl(id)` generates `https://picsum.photos/seed/<id>/800/500`.
   - The final URL is persisted in the `image` field.
   - Visual fallback in cards when an image can't be loaded (`is-fallback`).

5. Minimal accessibility:
   - Associated labels for inputs.
   - Descriptive `alt` text for images.
   - Visible focus on interactive elements.

## No Duplicate Rules

- This plan does not define global stack restrictions, scope, or data models.
- When a decision is normative, it is referenced in the constitution instead of repeated here.

## Traceability with the spec and constitution

- This plan details implementation decisions.
- Immutable rules and general scope remain in `.specify/memory/constitution.md`; functional acceptance criteria are in `spec.md`.
