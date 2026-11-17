# Copilot Instructions

Always use Spec-Driven Development in this repository.

Before making any changes, identify the active spec and read in this order:

- .specify/memory/constitution.md
- .specify/specs/<active-spec>/spec.md
- .specify/specs/<active-spec>/plan.md
- .specify/specs/<active-spec>/tasks.md

Rules:
- Consider all documents in `.specify` as the source of truth.
- Do not implement functionalities not described in `spec.md`.
- Follow `plan.md` for architecture and sequencing.
- Execute tasks one by one based on `tasks.md`.
- Work only on the pending checkboxes (`- [ ]`) and mark them when the task is complete.
- If there are no pending tasks, do not implement: validate consistency among the constitution, spec, plan, tasks, and existing code.
