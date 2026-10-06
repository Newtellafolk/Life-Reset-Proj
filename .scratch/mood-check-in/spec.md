# Mood Check-in

Status: ready-for-agent

## Problem Statement

People using เรียกสติ (Life Reset) get a fresh, generic Grounding opener every time they talk to the Companion, and every conversation is a disconnected snapshot — there's no low-effort way for someone to notice how their day-to-day mood has actually been trending, and no way for that first moment of a conversation to feel calibrated to how they're doing right now instead of identical every time.

## Solution

Add a Mood Check-in: a once-a-day, one-tap pick from five mood levels (plus an optional private note) as part of the Grounding step, the first time someone opens a Session on a given local calendar day. When today's level is low, the Companion's opening tone can acknowledge it without treating it as a crisis — that stays strictly separate from the Safety Net's keyword-based detection. Recorded levels build into a short recent-history strip on the History screen so a person can see their own pattern over time, without any push reminder ever asking them to check in.

## User Stories

1. As a person opening the app for the first time that day, I want to be asked how I'm feeling in one tap, so that I can start the conversation without extra effort.
2. As a person who has already checked in today, I want to not be asked again when I open another Session later the same day, so that the check-in doesn't feel repetitive or nagging.
3. As a person feeling low that day, I want the Companion's opening message to feel gentler than usual, so that I feel met where I am rather than greeted the same generic way every time.
4. As a person who wants to say more than an emoji conveys, I want an optional text note attached to my mood check-in, so that I can express nuance without it becoming a full conversation.
5. As a person who wrote a private note, I want to know the Companion will never read or respond to it, so that I feel safe writing whatever I actually feel.
6. As a person having an ordinary bad day (not a crisis), I want tapping the lowest mood level to NOT trigger the Safety Net hotline card, so that I'm not alarmed by an over-reaction to a normal low mood.
7. As a person in a real crisis, I want the Safety Net to still trigger from what I actually type, so that help is still surfaced when it's truly needed, independent of the Mood Check-in feature.
8. As a person curious about my own patterns, I want to see a short strip of my recent mood history on the History screen, so that I can notice trends without hunting for a separate feature.
9. As a person who has turned on Forget Mode for a session, I want that day's mood level to still be saved to my history, so that my long-term pattern isn't broken just because I wanted this one conversation kept private.
10. As a person who wrote a note while Forget Mode was on, I want that note text discarded along with the rest of the session, so that anything I typed freely stays exactly as private as the conversation itself.
11. As a person who values not being nagged, I want zero push notifications reminding me to check in, so that the app never pressures me the way it explicitly promises not to.
12. As a person who skips a day (or many days), I want the app to just show a gap in my history rather than any error or guilt-inducing message, so that missing a day carries no penalty.
13. As a person using the app anonymously (no account), I want my Mood Check-in history to work the same as it does for a signed-in user, so that anonymous-first isn't a second-class experience.
14. As a person with limited patience for onboarding-style flows, I want the check-in to take one tap with no required fields, so that it never feels like filling out a form.
15. As a person reviewing my History screen, I want the mood strip to be visually distinct from (and above) my problem-grouped history, so that I don't confuse a mood entry with a Problem.
16. As a person browsing the mood history strip, I want to see roughly the last 7–14 days at a glance, so that I get a sense of a pattern without needing a full calendar or chart.
17. As a person who deletes all history from Settings, I want my mood history included in that deletion, so that "delete everything" actually means everything.
18. As a developer building this feature, I want the day-boundary logic (what counts as "today") to be based on the device's local calendar day, so that check-in gating behaves the way a person naturally expects.
19. As a person who never opens a Session on a given day, I want no Mood Check-in prompt to appear at all that day, so that the feature never asks for attention on its own.
20. As a person with a mood entry already on record for today, I want the Grounding step to skip straight past the check-in prompt, so that opening a second conversation the same day feels normal, not blocked.

## Implementation Decisions

- **New domain module** (`mood-checkin`, no DOM dependency): the single seam this feature is built and tested against.
  - `isDueToday(history, now)` → boolean: true when no entry exists for `now`'s local calendar date.
  - `recordEntry(history, { date, level, note })` → new history array. `level` is an integer 1–5; `note` is an optional string.
  - `applyForgetMode(entry)` → the entry with `note` stripped, `date`/`level` preserved. Called before persisting whenever Forget Mode is active for that session.
  - `recentHistory(history, days)` → the last N calendar days of entries for the History screen's strip, leaving real gaps for days with no entry (never backfilled/synthesized).
- **Data shape**: one Mood Check-in entry = `{ date: <local calendar date>, level: 1-5, note?: string }`. At most one entry per calendar date; the UI's `isDueToday` gate is what prevents a second entry for the same date, not a uniqueness check inside `recordEntry` itself.
- **Placement**: the check-in prompt is the first thing inside Chat's Grounding step, shown only on the first Session opened each local calendar day. It is never a separate screen, tab, or standalone entry point (per Q3 of the grilling session).
- **Input**: five discrete, tap-to-select mood levels plus an optional free-text note. No required fields, no multi-step form. The exact icon/label set per level is a content decision for implementation (see Out of Scope).
- **Companion tone**: when today's entry exists and its level is low, the Grounding opener selects a gentler variant of its opening copy. This is a copy-selection branch only — it does not touch Problem prioritization, Action Steps, or any other Companion logic.
- **Safety Net boundary (binds ADR-0001)**: a Mood Check-in level or note, by itself, is explicitly excluded from every Safety Net trigger condition. Safety Net continues to fire only from keyword detection in typed/spoken conversation text, unchanged by this feature.
- **Forget Mode interaction**: the day's mood `level` is exempt from Forget Mode and is always persisted to history. An attached `note` is not exempt — it is discarded under the same rule that discards the rest of that Session's content when Forget Mode is on.
- **No reminders (binds ADR-0002)**: no push notification, in-app banner-on-a-later-open, or any other reminder mechanism prompts a check-in on a day the user hasn't opened the app. This spec does not reopen that boundary.
- **History screen**: a mood history strip (last 7–14 days) renders above the existing Problem-grouped list. It must read as visually distinct from a Problem/note card per `DESIGN.md`'s component vocabulary — not a reuse of the note-card silhouette.
- **Settings "ลบประวัติทั้งหมด"**: must also clear Mood Check-in history — "delete all" means all.
- **Anonymous-first (binds ADR-0002)**: Mood Check-in history is stored the same way Problem history is for an anonymous user; this feature introduces no account requirement.

## Testing Decisions

- A good test here exercises the `mood-checkin` module's pure functions by observable behavior (given a history array and a date, what comes back) — never by inspecting DOM structure, internal variable names, or any UI framework's internals.
- **The one seam**: the `mood-checkin` domain module (`isDueToday`, `recordEntry`, `applyForgetMode`, `recentHistory`). Everything else in this feature — the prompt's rendering, the tap interaction, the Companion's copy-branch selection, the history strip's markup — is UI wiring around this seam, exercised through it rather than unit-tested on its own, keeping the seam count at one.
- **Prior art**: none yet. This repo is currently a throwaway single-file HTML/JS prototype with no test infrastructure (see `PRODUCT.md`'s Stack decision). This module should be the first piece of this feature to get real unit tests, in whichever test runner the rebuilt stack adopts.
- **Key behaviors to cover**: once-per-day gating across a date boundary (including local-timezone edge cases at midnight), that no code path produces two entries for the same calendar date, that `applyForgetMode` strips `note` but preserves `date`/`level`, and that `recentHistory` reports real gaps rather than synthesizing missing days.

## Out of Scope

- Editing or overwriting today's Mood Check-in after it's submitted — not discussed during grilling; treat as unsupported unless a future spec adds it.
- Any visualization beyond a simple recent-days strip (charts, monthly calendars, mood-vs-Problem correlation views).
- Any change to Problem prioritization, Action Steps, or the Companion's conversational logic beyond the single gentler-opener copy branch described above.
- Multiple check-ins per calendar day (explicitly decided against for this MVP).
- Any reminder/notification mechanism (explicitly decided against; would require reopening ADR-0002).
- The exact 5 mood icons/labels and their copy — a content/visual decision for implementation, not a product decision this spec makes.
- Rebuilding the prototype's stack. This spec describes the feature for the eventual real implementation, not an extension of the current single-file HTML prototype (per `PRODUCT.md`'s Stack decision, that prototype is disposable once the concept validates).

## Further Notes

- Synthesized from a grilling session that resolved this feature against existing project constraints without reopening any of them: `PRODUCT.md`'s non-pressuring and anonymous-first boundaries, ADR-0001 (lightweight Safety Net, not clinical escalation), and ADR-0002 (anonymous-first accounts).
- `CONTEXT.md` already carries the canonical **Mood Check-in** glossary entry (added during grilling) — use that term, not "daily mood" or "mood log", throughout implementation and any follow-up tickets.
- If a future decision relaxes the "no reminder" rule or allows multiple check-ins per day, that reopens ADR-0002 and deserves its own ADR update rather than a silent change inside this feature's implementation.
