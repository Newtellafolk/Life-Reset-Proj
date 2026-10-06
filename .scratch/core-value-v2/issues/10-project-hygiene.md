# Project hygiene

Status: ready-for-agent

Bring the repo's documents and code in line with what was built. Write specs for shipped features that have none (Decide for Me and Pause, Reflection, Board reordering and undo, color themes). Extract the mood-check-in logic into the module its spec describes. Remove unused code (`state.chat`, `dragCtx`, unused locals). Reconcile DESIGN.md's token list with values actually used so the detector's advisories drop.

Acceptance:
- Each shipped feature has a spec in `.scratch/`.
- Mood logic lives in its own module with the four functions from its spec.
- Detector output has no warnings other than the documented mini-corkboard exception.

Blocked by: none.
