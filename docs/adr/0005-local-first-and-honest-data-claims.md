---
status: accepted
---

# Local-first storage, and no claim the product can't back

User data (Problems, History, Mood Check-ins, Reflections, Calm Checks) lives on the device by default; nothing is copied to a server until the person chooses to save or sign up, which also fits the anonymous-first account model (ADR-0002). Because messages must still be sent to a processor for the Companion to reply, every privacy statement in the UI must say plainly what leaves the device and why, and any statement or control the product does not actually back (for example "ข้อมูลเป็นของคุณคนเดียว" stated absolutely, swipe-to-delete, a data-access screen with no action) is removed or built before anyone outside the team uses it. We chose honesty over reassurance because the audience is, by definition, afraid of being judged or exposed; a trust claim that later proves false is worse than a modest, accurate one. Reversing local-first later (a server-first design) would change the privacy model and migration story, so any move in that direction needs its own decision.
