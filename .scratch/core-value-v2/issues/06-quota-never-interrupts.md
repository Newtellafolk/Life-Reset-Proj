# Quota that never interrupts

Status: ready-for-agent

Count Sessions, not messages. Remove the modal that opens when the quota is reached mid-conversation. The quota may only block starting a new Session. Grounding Exercise, the Safety Net, and reading History are never gated. See ADR-0004.

Acceptance:
- Sending messages inside a Session never changes the counter or opens a modal.
- At the limit, an in-progress Session continues; only the next Session start shows the limit.
- Messages that trigger the Safety Net are never blocked or counted against the person.
- The limit value is a single configuration, not hard-coded across the UI.

Blocked by: 01 (Session definition).

## Progress

Partly done as a side effect of 01: Sessions (not messages) are counted once, the mid-conversation modal is gone, a new Session is blocked at the limit while a Session in progress and safety messages never are. Still open: make the limit a single configuration value, and confirm the Grounding Exercise and History reading stay ungated when new Sessions are blocked (they currently are).
