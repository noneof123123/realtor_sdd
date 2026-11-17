# Agent Guide

## Project Purpose

Homebase is a static real estate rental manager for tracking realties, tenants, and rental agreements. It uses Spec-Driven Development (SDD). The active specification is `001-create-foundation`; its state is pending, with direct browser verification still unchecked in its task list.

## Technical Constraints

- Use HTML, CSS, and vanilla JavaScript only.
- Keep functional application files under `app/`.
- Do not add frameworks, TypeScript, npm packages, CSS preprocessors, a backend, or a package manager.
- The application is intended to open directly from `app/index.html` using `file://`; a server or build step is not required by the spec.
- Use IIFEs exposing APIs on `window.Realtor*`; do not use ES module imports or exports.
- Only `app/js/storage.js` may read or write browser Local Storage. Keep the namespaced keys and entity models defined in the constitution.
- Follow the constitution for accessibility, validation, confirmations, visual feedback, seed data, and UI conventions.

## Current Structure

```text
.
|-- AGENTS.md
|-- .github/
|   |-- copilot-instructions.md
|   `-- prompts/
|       |-- execute-spec.prompt.md
|       `-- sync-agent.prompt.md
|-- .specify/
|   |-- memory/constitution.md
|   `-- specs/001-create-foundation/
|       |-- spec.md
|       |-- plan.md
|       `-- tasks.md
`-- app/
    |-- index.html
    |-- css/styles.css
    |-- js/
    |   |-- app.js
    |   |-- storage.js
    |   |-- ui.js
    |   |-- realties.js
    |   |-- tenants.js
    |   `-- rentals.js
    `-- pages/
        |-- realties.html
        |-- add-realty.html
        |-- edit-realty.html
        |-- rent-realty.html
        |-- tenants.html
        |-- add-tenant.html
        `-- edit-tenant.html
```

## Key Modules and Responsibilities

- `app/index.html`: Dashboard document and script loading order.
- `app/css/styles.css`: Design tokens, layout, reusable components, and responsive styling.
- `app/js/app.js`: Startup, form submission, confirmation, and page navigation.
- `app/js/storage.js`: Local Storage access, key/state definitions, initial seed, and cross-page flash messages.
- `app/js/ui.js`: Shared page shell, navigation, cards, forms, badges, alerts, and rendering.
- `app/js/realties.js`: Realty listing, validation, creation, and update operations.
- `app/js/tenants.js`: Tenant listing, validation, creation, and update operations.
- `app/js/rentals.js`: Rental validation/creation and realty status consistency.
- `app/pages/*.html`: Static documents for realty, tenant, and rental workflows.

## Agent Workflow

1. Read `.github/copilot-instructions.md` before repository work.
2. Read `.specify/memory/constitution.md`, then the active spec's `spec.md`, `plan.md`, and `tasks.md`, in that order.
3. Treat `.specify` as authoritative. Do not implement behavior outside the active spec or conflict with the constitution.
4. Inspect the existing `app/` and task checklist before changes. Work sequentially on unchecked tasks only; mark a task complete only after its work or verification is actually done.
5. Keep application functionality within the specified `app/` structure. For changes to agent documentation, preserve this file's factual alignment with the constitution and repository.
6. Validate using the active spec's acceptance criteria. No build, test, or package-manager command is currently defined in the repository. The remaining foundation task is to open `app/index.html` in a browser and verify it renders without a server or installation.
7. Keep this guide synchronized when project structure, modules, constraints, or workflow change.

## SDD and Critical References

- `.github/copilot-instructions.md`: Repository-wide SDD rules and mandatory reading order.
- `.specify/memory/constitution.md`: Binding stack, file layout, data models, persistence keys, UI/UX, and scope rules.
- `.specify/specs/001-create-foundation/spec.md`: Foundation requirements and acceptance criteria.
- `.specify/specs/001-create-foundation/plan.md`: Architecture and technical decisions for the foundation.
- `.specify/specs/001-create-foundation/tasks.md`: Sequential checklist; currently only direct-browser verification remains unchecked.
- `.github/prompts/execute-spec.prompt.md`: Reusable workflow prompt for executing a selected spec.
- `.github/prompts/sync-agent.prompt.md`: Workflow prompt for synchronizing this guide.

## Last Synchronization

2026-11-17 - Created this guide. The app foundation is present; its checklist has all implementation items checked, while direct browser verification remains pending. The execute-spec prompt and foundation task list are modified, and the sync-agent prompt is newly added. No build or test configuration is present.
