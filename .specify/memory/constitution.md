# Project Constitution
> This file defines the immutable rules of the project. No spec, plan, or task can contradict it. In case of doubt or conflict, this file is the absolute truth.


---

## 1. Project Description
**Real estate rentals manager** web application built using Spec-Driven Development. Allows registering real estate rentals, tenants and rental agreements with local data persistence in the web browser.

## 2. Technology Stack
- **Allowed languages:** HTML, CSS and vanilla JavaScript only.
- **Persistence:** Web browser Local Storage.
- **Prohibited:** frameworks (React, Vue, jQuery), npm libraries, TypeScript, CSS preprocessors and any backend.
- **Without package manager:** npm, yarn and pnpm are out of the scope. This project doesn't have `package.json`.

## 3. Files Structure
All functional code will be located inside `/app`. No files can be created outside this folder.


```
app/
    index.html
    css/styles.css
    js/
        app.js
        storage.js
        ui.js
        realties.js
        tenants.js
        rentals.js
    pages/
        realties.html
        add-realty.html
        edit-realty.html
        rent-realty.html
        tenants.html
        add-tenant.html
        edit-tenant.html

```

App opens directly with `app/index.html` via `file://`.
Server is not required.


## 4. Code patterns
- Any JS file is an **IIFE** that exposes its API in `window.RealtorXxx`.
- `import`/`export` ESM will not be used to guarantee compatibility with `file://`.
- No `async/await` except where necessity justifies it.
- Strict responsibility separation:
  

| Module | Responsibility |
|---|---|
| `app.js` | Bootstrap, initialization and routing between pages |
| `storage.js` | Only layer authorized for read/write in Local Storage |
| `ui.js` | Reusable rendering: navbar, cards, badges, alerts, forms |
| `realty.js` | Realties domain: CRUD and validations |
| `tenants.js` | Tenants domain: CRUD and validations |
| `rentals.js` | Rentals domain: register and state consistency |

---


## 5. Persistence and data
- **Only `storage.js`** accesses `localStorage`. No other module does it directly.
- Mandatory namespaced keys:
  - `realtor.realties`
  - `realtor.tenants`
  - `realtor.rentals`
  - `realtor.flash` (message between pages)
- At the beginning, if there's no data, an automatic seed is generated.

## 6. Domain entities

The system has three entities. The specs must respect these models.

**Realty:** `id`, `title`, `address`, `price`, `description`, `status`, `bedrooms`, `bathrooms`, `image`, `createdAt`.

**Tenant:** `id`, `name`, `email`, `phone`, `documentId`, `notes`, `createdAt`, `updatedAt`.

**Rental:** `id`, `realtyId`, `tenantId`, `startDate`, `endDate`, `rentAmount`, `contractStatus`, `createdAt`.

Realty states: `available` | `rented` | `in maintenance`

Contract states: `active` | `pending` | `finalized`

The states are defined in `storage.js` and reused by all modules.

---

## 7. UI/UX criteria

- Modern style, clean and professional. Visual references: Notion, Google Keep, management dashboards.

- **Desktop-first** with responsive layouts for tablet and mobile.
- Global composition: fixed sidebar + main content area.
- Reusable and mandatory components: navbar, realty cards, metric cards, quick access, state badges, forms, alerts and flash messages.
- Visual: soft shadows, rounded corners, spacing, clear typography hierarchy.
- Iconography: outlined SVG, no emojis or Unicode characters as functional icons.


---

## 8. Quality rules

- Any form validates mandatory fields before persistence.
- All sensitive actions (create, edit, state change) show confirmation to the user.
- All operations show a visual message for success or error.
- The messages between pages are transmitted by `realtor.flash` in Local Storage.


---


## 9. Test data

- Minimum **6 Realties** with multiple states (`available`, `rented`, `in maintenance`).
- Minimum **3 Tenants** with realistic data.
- The rental seed must reference seeded Realties and Tenants by `id`.
- Any Realty has a deterministic image from `https://picsum.photos/seed/<id>/800/500`.
- The image field stores the final URL in Local Storage.
- If an external image fails, the card shows a fallback without breaking the layout. 


---


## 10. Specs organization

- Any business feature/capability exists in its own spec inside `.specify/specs/`.
- Monolithic specs are not allowed.
- Mandatory reading order before any change: `constitution.md` -> `spec.md` -> `plan.md` -> `task.md`.


---




## 11. Out of scope

The following topics are explicitly excluded from this project:

- Authorization and Authentication.
- Backend or remote database.
- Payment or billing.
- External service integrations.
- Entity deletion (out of scope in this version).


--- 
