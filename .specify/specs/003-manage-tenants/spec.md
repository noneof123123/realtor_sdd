# Spec 003: Tenants management

## State
implemented

## Dependencies
- 001-create-foundation

## Context
This spec introduces the second system business entity as a self-contained capacity: tenant management. It must be understood and implemented without assuming the existence of rentals, dashboard or other templates.

## Objective
Allow registering, listing, and editing tenants with a consistent interface, clear validations and data integrity, keeping the app adaptable to gradual growth.

## Pages

### `pages/tenants.html` - List
- Complete tenants list
- Each item shows: name, email, phone, document and summary notes if present.
- Basic search by name (minimum viable).
- Visual message if there are no tenants.
- Actions: edit, view detail (optional).

### `pages/add-tenant.html` - Insert
- Form with validation for:
  - `name` (mandatory)
  - `email` (mandatory, valid format)
  - `phone` (mandatory)
  - `documentId` (mandatory, unique)
  - `notes` (optional)

### `pages/edit-tenant.html` - Edit
- Load existing data
- Allow updating all fields except for `id`
- Update `updatedAt`

## Model


```
Tenant {
    id: string
    name: string
    email: string
    phone: string
    documentId: string
    notes: string
    createdAt: ISO date
    updatedAt: ISO date
}
```

## Business rules

- `documentId` must be unique between tenants.
- `email` must pass basic format validation.
- Mandatory validation before persistence.
- Visual messages for success/error.
- Visual confirmation before saving relevant changes.
- In this version, tenant deletion is not included.

## Gradual evolution

- This spec only covers the basic tenant CRUD.
- Any feature related to rentals, contracts, dashboard or global metrics must be defined in later specs.
  
## Test data
- Minimum 3 tenants as seed with realistic, distinct data.

## Visual Criteria
- List with cards or rows consistent with the project visual system.
- Reusable form components, badges and existing messages.

## Out of scope of this spec
- Delete tenants.
- Detailed rental history by tenant.
- Rental form or contract integration.
- Dashboard, global metrics or quick start access.
- Bulk import.
- External identity verification.
