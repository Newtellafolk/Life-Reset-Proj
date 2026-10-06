# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: plain HTML/CSS/JS as a single self-contained file. Chosen because the immediate goal is a clickable prototype to test the concept with the team and real users, shareable as a link with no dev server or build step; if the idea validates, engineering rebuilds it properly rather than extending this file.

## Users

People facing several overlapping life problems at once who don't know where to start, and who are reluctant to ask people around them for help — they fear being judged or getting negative reactions, or feel the people around them can only listen, not actually help them think it through.

## Product Purpose

Life Reset (เรียกสติ) is an AI companion app that helps such a user calm down enough to think clearly, then helps them break apart and prioritize the problems crowding their life, one step at a time. Success is the user leaving a session feeling calmer, with a concrete, small next step for at least one problem — not with a diagnosis or a lecture.

## Positioning

Not a general-purpose Q&A chatbot and not a clinical therapy product. Its mechanism is a "thinking companion" conversation that opens by grounding the user emotionally (ดึงสติ) before any problem-solving starts, then collaboratively prioritizes multiple simultaneous problems (AI proposes an order, the user always has final say) and breaks the chosen one into small checkable Action Steps. A neighboring Q&A chatbot could not truthfully copy this without adopting the same grounding-first, non-judgmental, user-controlled-priority sequence.

## Operating Context

- Used mobile-first, in moments of stress during the day, not at a desk.
- Anonymous-first: a full session (text or voice, problem capture, prioritization, Action Steps) works with no signup. Signup is only invited later, at a moment the value is already obvious (nearing the monthly Usage quota, or wanting History to survive across devices).
- Voice input uses speech-to-text; the Companion still responds in text, with an optional listen/read-aloud control. This prototype simulates full voice-conversation UI states (listening / thinking / speaking) without real speech processing.
- Usage is metered in Sessions per month (a Session = one continuous text/voice conversation), surfaced with an upgrade moment near the quota limit.

## Capabilities and Constraints

- **Grounding first**: every conversation opens by calming/centering the user before problem-solving begins.
- **Problem capture**: free-form text or voice, no forced up-front category picker; the Companion auto-tags a category afterward.
- **Prioritization**: the Companion proposes an initial order across open Problems (asking which will worsen fastest if ignored); the user can always drag-reorder, and the user's order always wins.
- **Action Steps**: once a Problem is prioritized, the Companion breaks it into small checkable sub-steps — this is the progress-tracking mechanism.
- **History**: grouped by Problem, not chronologically by conversation.
- **Privacy controls**: delete history per-problem or entirely; a per-session "Forget Mode" toggle that stops that session's content from carrying into future ones; visibility into what data is held / export.
- **No pressuring re-engagement**: explicitly no productivity-app-style push notifications nudging the user back in.
- **Safety Net**: crisis-indicating language in any conversation (including under Forget Mode) immediately surfaces the 1323 mental health hotline (Thailand Department of Mental Health) as a referral. This is a lightweight detection-and-referral trip-wire, not a clinical escalation system — see [docs/adr/0001](docs/adr/0001-lightweight-safety-net-not-clinical-escalation.md).
- **Undecided**: exact crisis-keyword detection logic, real-time voice (full spoken back-and-forth) as a future mode, pricing/paywall mechanics beyond showing an upgrade moment, the Companion's final persona name (a placeholder name is used in this prototype and is expected to change).

## Brand Commitments

- Product name: เรียกสติ (Life Reset).
- The AI is voiced as a named "thinking companion" (เพื่อนช่วยคิด), never as a therapist, advisor, or diagnosing authority — see [CONTEXT.md](CONTEXT.md).

## Success Measures

Two measures, both recorded locally per Session/Problem: (1) Calm Check, the person's own before→after rating of how calm they feel; (2) whether the first Action Step of a Problem is completed within 24 hours. These replace vague "feels helpful" judgments and are the basis for deciding whether the product delivers its promise.

## Audience Scope

First release is for people 18 and over (working-age adults), anonymous by default. Under-18 users are out of scope until legal and safeguarding review.

## Capabilities Added Since v1

Mood Check-in (once a day, inside Grounding), Reflection after a Problem's last Action Step, Paused status and Decide for Me (ADR-0003), Board reordering by hold-and-drag, grip or the "⋯" menu with undo, Action Steps shown one at a time, and a user-selectable color theme (mint is default). The Core Value v2 spec (`.scratch/core-value-v2/spec.md`) adds the real conversation engine, a fast path to talking, a real Grounding Exercise and Calm Check, a Focus View, editable Problems and steps, a quota that never interrupts (ADR-0004), and local-first persistence with honest claims (ADR-0005).

## Evidence on Hand

None yet — no existing copy, testimonials, screenshots, or brand assets. This prototype originates the first visual and verbal expression of the product; nothing here should be treated as pre-existing brand truth to preserve.

## Product Principles

1. Grounding before problem-solving, every time — never open a session by demanding the user organize their thoughts first.
2. The user always keeps final control over priority and pace; the Companion suggests, never dictates.
3. Trust is the product's scarcest resource — anonymous-first, no judgmental copy, no pressuring notifications, and a visible (not hidden) safety net.
4. Break the overwhelming into the checkable — every acknowledged problem earns small, concrete next steps, not just a label.

## Accessibility & Inclusion

No specific standard confirmed yet beyond general good practice; the product's premise (users who feel unable to ask for help) makes low cognitive load and non-judgmental, plain-language copy a functional requirement, not just an accessibility nicety.
