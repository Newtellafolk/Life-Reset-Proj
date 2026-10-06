# Core Value v2: make the Companion actually help

Status: ready-for-agent

## Problem Statement

The current prototype looks right and clicks through, but the parts that must help a person are simulated: the Companion is a fixed script, Problems and Action Steps are hard-coded, the "ดึงสติ" step is one sentence, nothing persists, and several on-screen promises (swipe to delete, data access, "ข้อมูลเป็นของคุณคนเดียว") are not backed by anything. A person who arrives overwhelmed must also pass four onboarding slides, a Mood Check-in and a Grounding message before they can say a word, and the monthly quota can interrupt them mid-conversation. We cannot yet tell whether the product calms anyone or gets them to a first small step.

## Solution

Rebuild the core loop around one real, testable conversation engine, and shorten the path to being heard. A person can talk immediately; the Companion (an LLM, or a human operator during early tests) listens, offers a real Grounding Exercise they can skip, extracts their actual Problems, proposes an order by genuinely asking what worsens fastest, and shrinks any Action Step that feels too big. The Board leads with one thing for today instead of everything at once. Problems and steps are editable by the user. A one-tap Calm Check before and after measures whether the session helped. The quota never cuts a conversation, and Grounding and the Safety Net are always free. History persists locally, and every claim in the UI is true.

## User Stories

1. As an overwhelmed person opening the app, I want to be able to start talking right away, so that I'm not made to read or tap through screens before being heard.
2. As a first-time user, I want a single short welcome that tells me what this is and that I can stay anonymous, so that I understand it without a long tour.
3. As a user, I want the Companion to offer a short Grounding Exercise (breathing or 5-4-3-2-1), so that I feel calmer before I try to think.
4. As a user who just wants to talk, I want to skip the Grounding Exercise without any penalty, so that I'm never forced through a ritual.
5. As a user, I want to rate how calm I feel with one tap before and after a session, so that I can see whether it helped.
6. As the team, I want to compare Calm Check ratings before and after each Session, so that we can tell whether the product delivers its promise.
7. As a user, I want the Companion to respond to what I actually said, not a canned reply, so that I feel heard.
8. As a user who mentions several problems, I want the Companion to pull out the ones I actually named, so that the Board reflects my real life.
9. As a user who raises a new problem in a later conversation, I want it added to my Board, so that nothing I say is lost.
10. As a user, I want the Companion to ask me which problem will get worse fastest if ignored, so that the proposed order comes from my own answer.
11. As a user, I want "ให้พี่เสก โซโลเลือกให้" to re-run that reasoning rather than re-sort fixed numbers, so that its suggestion reflects my current situation.
12. As a user with many problems, I want the Board to lead with one thing for today, so that I'm not confronted with everything at once.
13. As a user, I want to expand the Board to see all problems when I choose to, so that I keep the full picture.
14. As a user, I want to add a Problem myself, so that I'm not dependent on the conversation to record it.
15. As a user, I want to rename or delete a Problem, so that the Board matches how I think about it.
16. As a user, I want to edit, add and remove Action Steps, so that the plan fits my real situation.
17. As a user who finds a step too big to start, I want the Companion to break it into a smaller one, so that I can begin.
18. As a user who is bored or tired of the checklist, I want to pause a Problem without guilt, so that I'm never pushed.
19. As a user in distress, I want the Safety Net to recognize many ways of saying I'm in crisis, so that help is surfaced even if I don't use exact words.
20. As a user who triggered the Safety Net, I want the conversation to continue gently afterward rather than going silent, so that I don't feel dropped.
21. As a user, I want my Board, History and Mood Check-ins to still be there when I come back, so that the app has a memory I can rely on.
22. As an anonymous user, I want to be invited to save my data only when it matters, so that signing up is never a barrier.
23. As a user, I want every statement in Settings to be true, so that I can trust the privacy and data claims.
24. As a user, I want my Session to never be cut off mid-conversation by a quota prompt, so that I'm not interrupted when I'm most vulnerable.
25. As a user, I want Grounding, the Safety Net and reading my own History to be free regardless of quota, so that essential help is never paywalled.
26. As a user, I want to be told plainly how my messages are processed, so that I can decide what to share.
27. As the product owner, I want the Companion's rules written down and reviewed, so that it never gives advice outside a wellness-companion role.
28. As a developer, I want the conversation engine behind one interface that a human operator or an LLM can both satisfy, so that early tests can run before the full AI is built.
29. As a developer, I want Session counting, problem extraction and safety detection tested through that one interface, so that behavior is verified without touching the UI.
30. As the team, I want shipped features to have specs and up-to-date product docs, so that agents and people share one picture.

## Implementation Decisions

- **One seam, the Session engine.** A single interface takes the user's turn plus current Session state and returns: the Companion's reply, any newly extracted Problems, a safety flag, and quota accounting for the Session. A human operator and an LLM adapter both implement it; the UI never knows which. All behavior below is built and verified through it.
- **Session boundary (assumption to confirm in implementation):** a Session starts at the first user message after the app opens and ends after 30 minutes idle or when the app is closed. The monthly quota counts Sessions, not messages. Starting a Session never triggers a modal; at most a quiet indicator shows remaining Sessions.
- **Quota rule (ADR-0004):** the quota may block *starting* a new Session, never interrupt one in progress. Grounding Exercise, the Safety Net, and reading existing History are never gated. The quota number is a placeholder to be set from observed behavior.
- **Fast path:** the welcome becomes a single short screen; the primary action is to talk (text or voice). Mood Check-in and Grounding are offered inline and are skippable, not gates before the first message.
- **Grounding Exercise:** a short guided exercise (breathing, 5-4-3-2-1) the Companion offers; always skippable. Not a clinical technique claim.
- **Calm Check:** one tap on a short scale before and after a Session, stored per Session. It is a measurement of the product, shown to the user as their own trend only. A Calm Check alone never triggers the Safety Net.
- **Success measures:** (1) Calm Check before→after, (2) whether the first Action Step is completed within 24 hours. Both recorded per Session/Problem locally for analysis.
- **Problem extraction:** from the user's actual words, across Sessions; new Problems are added to the Board; the user can add, rename, delete Problems and add, edit, delete Action Steps. The Companion may shrink a step on request or when the user says it is too big.
- **Prioritization:** the Companion genuinely asks which Problem worsens fastest if ignored and derives urgency from the answer. "Decide for Me" re-runs this; it remains opt-in per ADR-0003.
- **Board default view:** shows the top Problem ("เรื่องเดียววันนี้") prominently with the rest collapsed behind an expand control; reordering behavior from the existing Board remains.
- **Persistence (ADR-0005):** local-first storage on the device; no server copy until the user chooses to save/sign up. The invitation to save appears at meaningful moments (quota approaching, wanting History on another device), per ADR-0002.
- **Honest claims:** remove or build every statement that is not backed by behavior (swipe-to-delete, data-access row, download, Forget Mode wording). State plainly when messages leave the device for processing.
- **Safety Net:** expanded phrase and meaning coverage in Thai; after the card appears the Companion continues with a gentle, non-clinical reply. The phrase list and post-card behavior are reviewed by a qualified mental-health professional before any real-user test.
- **Audience:** 18 and over for the first release.
- **Companion Rulebook:** a written, reviewed document of what the Companion will and will not do (no diagnosis, no directive financial/relationship/medical advice, how it declines, when it refers out) is a prerequisite for any LLM-backed test.
- **Docs hygiene:** PRODUCT.md, CONTEXT.md, DESIGN.md and ADRs updated for shipped features; specs written for features that have none; the mood-check-in module extracted per its own spec.

## Testing Decisions

- A good test drives the Session engine through its interface and asserts observable results (reply present, Problems extracted, safety flag, Session counted once), never UI structure or internals. Replies from an LLM are asserted on properties (does not diagnose, includes a referral when the safety flag is set), not exact text.
- The one seam is the Session engine. UI behavior (fast path, Focus View, editing, undo) is exercised through it where it carries logic; pure presentation is not unit tested.
- Key behaviors: Session start/end boundaries and once-per-Session counting; quota blocks only new Sessions; Grounding/Safety/History never gated; extraction of a new Problem in a later Session; Safety Net coverage on a Thai phrase corpus including indirect expressions; Forget Mode discards notes but keeps levels; Calm Check recorded before and after.
- Prior art: none in this repo; the existing prototype has no test infrastructure. The mood-check-in spec already defines the first module to test.

## Out of Scope

- Server-side accounts, sync, and payments (only the local-first foundation and the save invitation).
- Real-time voice conversation (speech-to-text input and read-aloud remain).
- Push notifications or any reminder mechanism (ADR-0002 boundary).
- Clinical features, diagnosis, or claims of treatment (ADR-0001 boundary).
- Final pricing and the final quota number.
- Dark-mode variant of the mint theme.
- Under-18 users.

## Further Notes

- Derived from an audit of the prototype and a grilling session; every recommendation was accepted without change.
- Ordering decided: tickets 01–04 first because they answer "does it actually help"; the rest follow.
- Tickets 08 and 09 need human input (clinical review, rulebook authoring) and are labeled `ready-for-human`.
- New terms added to `CONTEXT.md`: Calm Check, Grounding Exercise, Focus View. ADR-0004 (quota never interrupts) and ADR-0005 (local-first, honest data claims) record the two hard-to-reverse decisions.
