# Session engine behind one interface

Status: ready-for-agent

Build the single seam for the whole feature set: an interface that takes a user turn plus Session state and returns the Companion's reply, newly extracted Problems, a safety flag, and Session/quota accounting. Provide two implementations: a human-operator adapter (for Wizard-of-Oz tests) and an LLM adapter. Replace the scripted `demoStage` flow in the prototype with calls through this interface.

Acceptance:
- The UI calls only the interface; swapping adapters needs no UI change.
- Typing different messages produces different, relevant replies; extracted Problems come from the user's words, including in later Sessions.
- Session start/end follows the boundary in the spec (first message; 30 min idle or close); a Session is counted once.
- Tests drive the interface as described in the spec's Testing Decisions.

Blocked by: 09 (Companion Rulebook) for the LLM adapter only; the operator adapter can ship first.

## Progress

Done: the Session engine seam (one interface, no DOM) with the scripted adapter, the Wizard-of-Oz operator adapter (BroadcastChannel; operator console in the same file), real problem extraction from the user's words across Sessions, Session boundaries (first message / 30 min idle / explicit end), once-per-Session counting, and the engine-level safety floor. 15 tests in tests/engine.test.js (run: node --test tests/engine.test.js).

Remaining: the LLM adapter (blocked by 09, the Companion Rulebook), and a cross-device operator channel (current operator console works between two windows of the same browser only).
