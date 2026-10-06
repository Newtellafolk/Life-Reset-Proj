---
status: accepted
---

# Opt-in "decide for me" does not weaken user-controlled priority

Some users facing many Problems at once don't want to make another decision — they're the reason the "จัดลำดับความสำคัญ" recommend-then-let-the-user-drag pattern still felt like work. We added a single "ให้พี่เสก โซโลเลือกให้" button on the Board that re-runs the Companion's priority suggestion and applies it immediately, and a "ยังไม่พร้อมตอนนี้" action that sets a Problem to a new Paused status. Both remain compatible with the standing principle that the user always controls final priority (see `CONTEXT.md`'s Prioritization entry) because the user must explicitly tap to invoke either one — the Companion never reorders or pauses a Problem on its own initiative. We rejected making Companion-driven ordering the default (even as a first pass before the user's first drag) because that would cross from "suggests" to "decides," which is the line the original principle was drawn to hold. Future work should keep this opt-in shape: any new low-effort/automated path is fine exactly as long as the user is the one who asks for it each time.
