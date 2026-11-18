---
name: execute-spec
description: Reusable template for execute any spec. Only change the SPEC_NAME and run the complete SDD workflow.
---

Configuration
- SPEC_NAME: 003-manage-tenants

Route resolution rule
- SPEC_DIR = .specify/specs/${SPEC_NAME}


- SPEC_FILE = ${SPEC_DIR}/spec.md
- PLAN_FILE = ${SPEC_DIR}/plan.md
- TASKS_FILE = ${SPEC_DIR}/tasks.md

Mandatory flow

1. Read and folow
  - .github/copilot-instructions.md
  - AGENTS.md
  - specify/memory/constitution.md
  - ${SPEC_FILE}
  - ${PLAN_FILE}
  - ${TASKS_FILE}

2. Use this files as unic source of thruth for the spec implementation.
3. Before create or edit, inspect the current /app state an {TASKS_FILE} to avoid duplicate work. Respect already implemented.
4. Execute only pending checkboxes (- [ ]) in the {TASK_FILE} in secuential order.
5. Mark as complete (- [x]) when a task is finished.
6. Build and extend only the files inside the mandatory structure defined in te activve spec.
7. Do not use frameworks, npm, backend or functional files out of the /app.
8. All persistent must past through js/storage.js using the keys:
  - realtor.realties
  - realtor.tenants
  - realtor.rentals
  - realtor.flash
9. Stop only if exist ambiguity or contradiction between files.

Mandatory output at end of the flow

1. What was created or modified.
2. What files were created or modified.
3. What tasks of the {TASKS_FILE} were mark as completed.
4. Inside the {SPEC_FILE} must update in the section the STATUS to implemented. 
5. What is pending in the {TASKS_FILE} and why (if applicable).
6. What pending specs can be executed next (if applicable). 
