# Spec 002 - Manage realties

## State
implemented

## Dependencies
- 001-create-foundation

## Context
This spec defines the first business capability: administering the realties catalog. It must be independent and understandable by itself, without assuming the existence of other entities, templates, or additional workflows.

## Objective
Allow the user to create, edit, list and filter realties with a consistent visual interface, keeping data integrity and a clear desktop and mobile experience.

## Pages

### `pages/realties.html` - List
- Complete realties list
- Each card shows: image, title, address, price, short description, bedrooms, bathrooms, state, and main edit actions.
- Filter by states
- Visible state badge
- Visual message if there are no results
- Exactly 3 realties to filter in desktop
- Responsive adaptation for desktop and mobile

### `pages/add-realty.html` - Insert
- Realty registration form with validations:
  - `title`, `address`, `price`, `description`, `status`, `bedrooms`, `bathrooms`, `image`

### `pages/edit-realty.html` - Edit
- Successful data load
- Edit keeping consistency
- Update `updatedAt` on save

## Model

```txt
realty {
    id: string
    title: string
    address: string
    price: number
    description: string
    status: 'available' | 'rented' | 'in maintenance'
    bedrooms: number
    bathrooms: number
    image: string
    createdAt: string
    updatedAt: string
}

```


## Business rules

- Can create realties at any moment.
- Can update realties at any moment.
- The realty state can change between `available`, `rented`, `in maintenance`.
- The image is optional; if provided, a deterministic URL will be assigned based on its `id`.
- Mandatory validation before persisting.
- Visual messages of success/error before any operation.
- Visible confirmation before saving relevant changes.
- In this version, the deletion of realties is not contemplated.
- The realty module does not depend on relations with other entities to achieve this spec.

## Visual Criteria

- Consistent visual structure in all cards.
- Uniform height in the image/header section.
- Consistent body distribution regardless of the title or description length.
- Consistent price and action buttons alignment between cards.
- Text variation must not break the general alignment.

## Out of scope in this spec

- Contracts or rent register.
- Administration of tenants or other related entities.
- Dashboard, global metrics, or quick start access.
- Workflows from other system capabilities.
- Search by text, advanced sorting.
- Delete realties.