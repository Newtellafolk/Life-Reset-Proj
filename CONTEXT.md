# Life Reset (เรียกสติ)

An AI companion app that helps a user who is facing several overlapping life problems at once feel calm enough to think, then break those problems apart and decide what to tackle first — without feeling judged.

## Language

**Thinking Companion (เพื่อนช่วยคิด)**:
The AI's persona: a companion that reflects and helps the user think, never a diagnosing or prescribing authority.
_Avoid_: Therapist, advisor, counselor, coach (implies clinical/professional authority the product explicitly does not claim)

**Grounding (ดึงสติ)**:
The opening phase of a conversation where the Companion calms and centers the user before any problem-solving begins.
_Avoid_: Check-in, warm-up

**Problem (ปัญหา)**:
A discrete life issue the user raises in their own words (typed or spoken); a single conversation can surface several Problems at once. Each Problem is auto-tagged with a category, carries a Priority, and persists across sessions with an evolving status. The History screen groups past conversation by Problem, not by time.
_Avoid_: Issue, task, topic

**Forget Mode (โหมดคุยแล้วลืม)**:
A toggle that stops what is said while it is on from being kept on the device: Problems the Companion extracts from the conversation are shown for that visit but never saved (they are marked "ชั่วคราว"), and free-text notes are discarded. Mood levels, Calm Checks and Reflection outcomes are measurements, not content, and are still saved. Exists to let a user who is not ready to be "known" still use the app fully.
_Avoid_: Incognito mode, private mode

**Prioritization (จัดลำดับความสำคัญ)**:
The step where the Companion proposes an initial order across the user's open Problems (by asking which will worsen fastest if ignored), after which the user can always drag-reorder. The user's manual order always wins over the Companion's suggestion.
_Avoid_: Ranking, sorting

**Decide for Me (ให้พี่เสก โซโลเลือกให้)**:
A single opt-in action on the Board that re-runs the Companion's Prioritization and applies it immediately, for a user who doesn't want to make the ordering decision themselves right now. It never runs on its own — only when the user taps for it — which is what keeps it inside the Prioritization principle rather than replacing it (see ADR-0003).
_Avoid_: Auto-sort, AI takeover

**Safety Net**:
A keyword/intent detector that, on spotting crisis-indicating language (e.g. self-harm), immediately surfaces crisis-hotline information (e.g. 1323). It is a referral trip-wire, not a clinical escalation or intervention system.
_Avoid_: Crisis management, escalation system

**Session**:
One continuous conversation with the Companion, by text and/or voice. A Session starts at the first user message after the app opens and ends after 30 minutes idle or when the app closes. Sessions are the unit the monthly Usage quota counts against; the quota may block starting a new Session but never interrupts one in progress (ADR-0004).
_Avoid_: Conversation, chat, thread (when precision matters — those are fine as casual UI copy, not as the metered unit)

**Mood Check-in**:
A once-per-day, tap-to-select 5-level emoji entry (with an optional free-text note) captured as part of Grounding the first time the user opens a Session that calendar day. Its purpose is pattern-tracking for the user's own reflection first; the Companion may open more gently when the level is low, but a Mood Check-in alone never triggers the Safety Net — only conversation text does (see Safety Net). The mood level itself is exempt from Forget Mode and always saved to the mood history shown on the History screen; an attached free-text note is not exempt and is discarded like any other session content when Forget Mode is on.
_Avoid_: Daily mood, mood log (as the primary term — "Mood Check-in" is the canonical name)

**Action Step**:
A small, checkable sub-step the Companion breaks a Problem into once it is prioritized. The mechanic behind the progress-tracking screen. Shown one at a time by default (with a small "step X of Y" counter and a link to see them all) rather than as a full list up front, so a tired user is never confronted with the whole list at once.
_Avoid_: Task, to-do

**Paused (พักไว้ก่อน)**:
A Problem status a user sets explicitly (via "ยังไม่พร้อมตอนนี้") when they don't want to engage with that Problem right now. Distinct from New/Active/Done — it exists so stepping away from a Problem for a while reads as a normal, guilt-free choice rather than failure or abandonment. A Paused Problem stays visible (dimmed, not hidden) on the Board and can always be resumed back to its prior status.
_Avoid_: Snoozed, archived, abandoned

**Reflection**:
An optional, skippable prompt shown inline in the Action Steps sheet the instant a Problem's last Action Step is checked off, before that Problem dissolves off the Board. Captures a quick outcome pick (แย่ลง/เหมือนเดิม/ดีขึ้นบ้าง/ดีขึ้นเยอะ) plus an optional free-text note, and is attached to that Problem's entry in History. Follows the same rule as Mood Check-in: the picked outcome always persists through Forget Mode; an attached note does not. A Reflection outcome alone never triggers the Safety Net — only conversation text does (see Safety Net).
_Avoid_: Feedback, rating, survey

**Grounding Exercise**:
A short, always-skippable guided exercise (breathing, 5-4-3-2-1) the Companion offers during Grounding. It makes no clinical claim and is never required before the person can speak.
_Avoid_: Therapy exercise, treatment, meditation session

**Calm Check**:
A one-tap rating of how calm the person feels, taken before and after a Session and stored per Session. It is the product's own measure of whether a Session helped, shown to the user only as their own trend. A Calm Check alone never triggers the Safety Net.
_Avoid_: Mood Check-in (a different thing: a daily feeling, not a per-Session before/after measure)

**Focus View (เรื่องเดียววันนี้)**:
The Board's default view: the top Problem and its next Action Step shown prominently, with all other Problems collapsed behind an explicit expand control, so a person with many Problems is not confronted with all of them at once.
_Avoid_: Dashboard, summary

## Product boundary

Life Reset is positioned as a **wellness/coaching companion**: it does not diagnose, treat, or claim to replace a licensed therapist. This boundary is deliberate and load-bearing — it shapes copy, the Safety Net's scope, and what the app is allowed to claim anywhere in the UI.

The product is also deliberately **anonymous-first** (no signup required to start a Session) and **non-pressuring by design**: no productivity-app-style push notifications nudging the user back in. Both constraints exist to protect the trust of a user who is already afraid of being judged, and should be treated as boundaries, not defaults to optimize away later.
