---
name: sync-agent
description: Sync AGENTS.md with the latest project changes. If not exist, build it from scratch.
---

Objective
- Maintain `AGENTS.md` always up to date with the latest project changes.
- If `AGENTS.md` does not exist, build it from scratch with a complete guide and actionable information about the agents.

Inputs
- BASE_DIR: ./
- AGENTS_FILE: AGENTS.md

Mandatory workflow

1. Read work context and rules:
  - .github/copilot-instructions.md
  - .specify/memory/constitution.md
  - active spec: spec.md, plan.md task,md

2. Detect relevant project changes: 
  - Inspect current folder structure and files.
  - Prioritize changes in `/app`, `.specify` and `.github`.
  - Identify additions, removals and modifications that affect the system behavior or workflow.

3. Sync `AGENTS.md`:
  - If exist: update only the necessary (incremental focus, avoid rewriting the entire file).
  - If not exist: create a new `AGENTS.md` with a complete initial structure.
  - Preserve utility manual content when not contradict the real repository state.
  - Remove onsolete or inconsistent information.

4. Requare `AGENTS.md` structure (minimum):
   - Project resume and purpose.
   - Technical restriction stack.
   - Current folder structure.
   - Key modules and responsabilities.
   - Operative agents workflow (how to contribute, validate changes and keep consistency).
   - Spec-Driven Development (SDD) workflow and rules applicable to the repo.
   - List of critical files and their purpuse.Current 
   - Section "Last sincronization" with current date and short detected changes summary.

5. Quality criteria:
  - Clear content, actionable and without ambiguity.
  - Without fabricating files, commands or no present capabilities.
  - Keep coherence with the consttution and the active spec.
  - Use ASCII.

Mandatori output at end of the flow

1. Indicate if `AGENTS.md` was created or updated.
2. Resume the changes detected and applied to `AGENTS.md`. 
3. List the project files considered to syncronization.
4. Confirm that the information is aligned with `.specify` and current repo state.