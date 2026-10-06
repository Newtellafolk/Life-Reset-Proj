---
name: เรียกสติ (Life Reset)
description: A sticky-note corkboard world for an AI thinking companion — warm, tactile, and plain-spoken.
colors:
  kraft: "#C9A66B"
  kraft-dark: "#A9834F"
  cream: "#F5EEDD"
  cream-2: "#ECDFC0"
  coral: "#D97B5F"
  coral-dark: "#BD6247"
  coral-solid: "#B8532F"
  ink: "#3A3530"
  ink-soft: "#7A6E5E"
  ink-faint: "#A79A85"
  paper: "#FBF6EA"
  paper-2: "#F3ECDA"
  line: "#E1D2AE"
  safe: "#5C7A5E"
  safe-bg: "#E3ECDF"
typography:
  display:
    fontFamily: "Mali, IBM Plex Sans Thai, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "IBM Plex Sans Thai, system-ui, -apple-system, sans-serif"
    fontWeight: 400
    fontSize: "14px"
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Sans Thai, system-ui, sans-serif"
    fontWeight: 700
    fontSize: "11.5px"
rounded:
  note: "3px 12px 12px 12px"
  panel: "12px"
  pill: "999px"
  sheet: "22px 22px 0 0"
spacing:
  sm: "8px"
  md: "16px"
  lg: "22px"
components:
  button-primary:
    backgroundColor: "{colors.coral-solid}"
    textColor: "#ffffff"
    rounded: "12px"
    padding: "13px 18px"
  button-quiet:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "10px"
    padding: "9px 14px"
  note-rank-badge:
    backgroundColor: "{colors.coral-solid}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
---

# Design System: เรียกสติ (Life Reset)

## Overview

**Creative North Star: "The Sticky-Note Priority Board"**

Every problem the user raises becomes a real paper note on a corkboard — something they can see, pick up, resize by urgency, and pin. The system refuses two ruts at once: the generic pastel-gradient wellness app, and the plain scrolling chat log that makes this feel like just another Q&A bot. Instead the whole product — chat, board, history, even settings — stays inside one tactile paper-and-cork world, so "a friend helping you think" reads as a place you visit, not a feature list.

The palette is Restrained (kraft + cream neutrals, one coral accent) because the audience is here to calm down and think, not to be dazzled. Warmth comes from material (paper, cork, a brass pushpin) rather than from saturation. Nothing in the system claims clinical authority: no medical-blue, no clipboard-and-checkmark iconography, no stethoscope. Where a category needs a badge or a system needs a control, the vocabulary comes from an actual corkboard — a pushpin, a torn note corner, a strip of tape — never a generic chip or rounded-lg card doing the same job with no material behind it.

**Key Characteristics:**
- One signature silhouette (the torn-corner note) carries every "this is a piece of content someone wrote" surface — chat messages, board notes, mini-notes.
- Urgency and progress are shown as size, ink-weight, and motion (a note growing, a checklist filling, a resolved note dissolving) rather than color-coding — color stays reserved for the one coral accent.
- Solid, white-text buttons use `coral-solid` (#B8532F), a deliberately deepened variant of the accent — the lighter `coral` (#D97B5F, and its dark-mode value #E2896A) never carries white text directly; it is a border/fill/decoration color, not a text-contrast-bearing one.

## Colors

Warm neutrals (kraft board, cream paper) carry the page; coral is the only accent and is spent on pins, priority, and primary actions — never on more than one thing on screen at a time.

### Primary
- **Coral** (`#D97B5F`, dark-mode `#E2896A`): the one accent. Pushpins, tape, borders, dashed callouts, drag handles at rest. Never used as a background behind white text — see the Coral / Coral-Solid rule below.
- **Coral Solid** (`#B8532F`, constant across both themes): the accessible, deepened accent used only where white text sits directly on top of it — primary buttons, the round send/mic buttons, rank badges, the filled checkbox. Kept constant across themes because it is tuned for exactly one job (4.5:1+ against white), not for atmosphere.
- **Coral Dark** (`#BD6247`, dark-mode `#D0754F`): mid-strength coral for small text-on-paper uses — the "พี่เสก โซโล" sender label, category tags, note-rank text before it's filled.

### Neutral
- **Kraft** (`#C9A66B`, dark-mode `#8C6B3D`): the corkboard surface itself — the Board screen's ground and the mini-corkboard inside chat.
- **Kraft Dark** (`#A9834F`, dark-mode `#6E5330`): tape on the user's own notes, the desktop-only backdrop behind the phone frame.
- **Cream** (`#F5EEDD`, dark-mode `#221A11`): the app's base background — a wall, not a screen.
- **Cream 2** (`#ECDFC0`, dark-mode `#2B2116`): secondary background for the page surround and input fields' resting tone.
- **Paper** (`#FBF6EA`, dark-mode `#2C2216`): every note and card's own surface — chat slips, board notes, sheets.
- **Paper 2** (`#F3ECDA`, dark-mode `#352A1B`): recessed surfaces sitting on paper — text inputs, quiet buttons, settings rows.
- **Ink** (`#3A3530`, dark-mode `#EFE4D2`): primary text.
- **Ink Soft** (`#7A6E5E`, dark-mode `#C7B89E`): secondary text, descriptions, sub-labels.
- **Ink Faint** (`#A79A85`, dark-mode `#9A8A6E`): tertiary/meta text — nav labels at rest, placeholders.
- **Line** (`#E1D2AE`, dark-mode `#4A3A24`): every border and divider.

### Semantic
- **Safe** (`#5C7A5E`, dark-mode `#9BC49E`) on **Safe Background** (`#E3ECDF`, dark-mode `#28331F`): reserved exclusively for the Safety Net card and the crisis hotline action. It is the only place green appears, which is what makes it legible as "this message is different" the moment it's needed.

### Mint theme (default)
The default palette is now "ฟ้า-มิ้นท์"; the warm kraft/coral set described above is the user-selectable alternative ("อบอุ่น") in Settings. The mint palette swaps the whole token set to a mint board (`#8FC7B8`) with a sky-blue accent (`#5B9BD5`/`#2C5F8A` solid), toggled from Settings via `data-color-theme="mint"` on the root element. Same material world (paper notes, pushpins, torn corners) — only the hue family changes. Light-only for now; it does not yet have its own dark-mode redefinition.

### Named Rules
**The Coral / Coral-Solid Rule.** `coral` decorates; `coral-solid` carries white text. Never swap them — the lighter `coral` fails contrast under white at both theme's values, which is exactly the bug the mechanical review caught before ship.

**The One Accent Rule.** Coral is the only saturated color in the system. A screen may use it once for its single most important action or marker (today's top-priority pin, the primary button); it never marks two things on the same screen at once.

## Typography

**Display Font:** Mali (with IBM Plex Sans Thai, system-ui, sans-serif fallback)
**Body Font:** IBM Plex Sans Thai (with system-ui, -apple-system, sans-serif fallback)

**Character:** Mali is a genuine handwriting-style Thai display face — used only where something reads as *written by hand on the note itself* (a note's title, a screen's big heading, the onboarding headline). IBM Plex Sans Thai carries everything functional: body copy, labels, buttons, nav. The pairing keeps the "handwritten note" identity from ever compromising legibility of the actual instructions and data around it.

### Hierarchy
- **Display** (Mali, 700, 19–24px, 1.4 line-height): screen headlines, onboarding titles, a note's title once opened in its sheet.
- **Title** (Mali, 700, 15–17px): a board note's own title — sized by urgency (15px small problems, 19px the most urgent).
- **Body** (Plex Sans Thai, 400, 14px, 1.6–1.75 line-height): chat message text, step text, descriptions.
- **Label** (Plex Sans Thai, 700, 11–11.5px): nav labels, category tags, status pills, rank badges. 11px is a hard floor in this system — nothing functional goes smaller.

### Named Rules
**The Handwriting-Is-Earned Rule.** Mali only appears on content that is conceptually "written," never on UI chrome (buttons, nav, labels always stay in Plex Sans Thai). Mixing them the other way would make controls feel like decoration instead of instructions.

## Layout

Mobile-first, single column, capped at 430px even on desktop — where the viewport is wider, the whole app renders as a phone sitting on a warm kraft desk backdrop rather than stretching to fill the window, which keeps the "personal object in your hands" framing intact everywhere it's viewed. A fixed top app bar (screen title + usage pill) and bottom tab bar (four tabs) frame a scrollable content area in between; only that inner area scrolls, never the page itself. Spacing runs on an 8/16/22px rhythm — `gap`/`padding` on flex containers, never ad-hoc margins.

## Elevation & Depth

Paper on cork, not glass on glass: shadows read as a physical note lifted slightly off its surface, never as a glow. `shadow-note` is a two-part shadow (a 3px hard "resting" shadow plus a soft 18px ambient one) used on every note-shaped surface. `shadow-pop` is a heavier version for sheets and modals rising off the whole page. `shadow-btn` is the one exception with color — a warm coral-tinted lift under primary buttons in light mode only; it swaps to a neutral black shadow in dark mode, because a colored glow against a dark background is the generic "AI app" tell this system explicitly avoids.

### Shadow Vocabulary
- **Note** (`0 3px 0 rgba(58,53,48,.06), 0 10px 18px -8px rgba(58,53,48,.35)`; dark-mode uses black at higher opacity): every note, chat slip, mini-note.
- **Pop** (`0 18px 40px -12px rgba(40,32,20,.45)`; dark-mode black): sheets, modals, the desktop phone-frame itself.
- **Btn** (light: `0 8px 18px -6px rgba(184,83,47,.45)`; dark: neutral black): primary buttons only.

### Named Rules
**The No-Glow-On-Dark Rule.** A colored, blurred shadow may only appear on a light ground. Every dark-mode shadow token resolves to neutral black.

## Shapes

**The torn-corner note** (`border-radius: 3px 12px 12px 12px`) is the system's one signature silhouette — a sharp top-left corner (where a physical note would be pinned or torn from a pad) with soft corners everywhere else. It marks anything that is *someone's own content*: a chat message, a board note, a mini-note, the bottom sheet's card. The user's own chat messages mirror it (`12px 3px 12px 12px`, sharp corner on the right) to read as "from the other side of the conversation" without introducing a second shape language.

Everything else — buttons, pills, panels, the corkboard surface itself — uses plain, uniform radii (10–16px, or full pill for badges/status) so the torn-corner shape stays legible as a distinct, meaningful signal rather than a house style applied everywhere.

## Components

### Buttons
- **Shape:** uniform 12px radius (10px for small buttons).
- **Primary:** `coral-solid` background, white text, `shadow-btn`. The only filled, high-emphasis action per screen.
- **Quiet:** `paper-2` background, `ink` text, `line` border — the default for secondary actions ("ดูขั้นตอน", "ปิดหน้าต่างนี้").
- **Ghost:** transparent, `ink-soft` text, `line` border — tertiary/dismissive actions.
- **Danger:** transparent, muted red text and border — reserved for destructive settings actions (delete history).

### The Note (signature component)
The system's one custom, load-bearing component. A `paper` surface, torn-corner radius, `shadow-note`, and a small colored **tape** or **pin** element (coral for AI/priority, kraft-dark for the user's own) marking who it belongs to or that it's the top priority. Board notes additionally scale their own title's font-size by urgency (15/17/19px) and carry a rank badge and progress bar; chat notes carry a sender label and, on AI notes, a "ฟังเสียง" listen control.

### Chips / Pills
- **Chip:** `paper-2` background, pill radius, 11.5px label weight — suggested replies, extracted-category tags.
- **Status pill:** same shape, semantic-colored background per state (new = paper-2/neutral, active = warm amber, done = `safe-bg`/`safe`, paused = `paper-2` with a dashed border and `ink-faint` text — deliberately quieter than "new," never alarming).

### Session start, Calm Check and Grounding Exercise
A session opens with Companion cards, never gates: the Mood Check-in (once a day) and a grounding card holding an optional 1-5 Calm Check (round numbered buttons, deliberately not faces, with "ยังวุ่นอยู่ / สงบดี" at the ends) and two quiet offers, "หายใจด้วยกัน 1 นาที" and "5-4-3-2-1". The exercise is a full-stage `cream` overlay: a single breathing circle (paper tinted with the accent, 10-second cycle, still under reduced motion) or one instruction at a time in the handwriting face. "ข้ามไว้ก่อน" is always visible; it is a `text-link`, never a primary action. The same Calm row returns as an "after" card, which ends with a plain sentence comparing the two numbers, never a score or streak.

### Focus View
The Board opens on one `note.top` at large size: title, progress, the next Action Step in the label/text pair, a `btn-primary` "ทำข้อนี้เสร็จแล้ว", and a quiet "ดูเรื่องอื่นทั้งหมด (n เรื่อง) — ไม่ต้องรีบ" below. Expanded view is the reorderable stack; a quiet "ย่อให้เหลือเรื่องเดียว" returns to focus.

### Editing, confirmation and the data view
Adding or renaming a Problem uses the same bottom modal as the usage screen (labeled fields on `paper-2`, one `btn-primary`, a ghost cancel); destructive actions always go through an in-app confirm modal (never the browser's `confirm()`, which sandboxed pages block) and are followed by the "เลิกทำ" toast. Step editing happens inside the steps sheet as plain rows (an input and a "ลบ" text-link each), so it never looks like a different screen. "ข้อนี้ใหญ่เกินไป ช่วยย่อให้หน่อย" and "แก้ไขขั้นตอน" are `text-link`s: help that is always available but never competes with the primary action. A Problem that is sample data or created under Forget Mode carries "· ตัวอย่าง" / "· ชั่วคราว" after its category so the person can see it will not be kept. The data view is a read-only textarea with a copy button, because downloads are blocked in sandboxed pages.

### Operator console (testing only)
A plain, dense utility surface (not part of the paper world) shown only in test mode: message log, context line, quick phrases, form for Problems and flags. It exists to run Wizard-of-Oz sessions and is never shown to participants.

### Board reordering
Notes stay in one vertical stack (position = priority). Three ways to reorder, all producing the same "เลิกทำ" undo toast: press-and-hold anywhere on a note (350ms) then drag; the 44px grip at the note's foot (immediate drag); or the "⋯" menu with "ทำเรื่องนี้ก่อน / ย้ายขึ้น / ย้ายลง" for users who can't or don't want to drag. Note size follows rank, not a stored urgency: rank 1 is large, the last of three or more is small, the rest medium — so a manual reorder never leaves size and order contradicting each other.

### Decide for Me / Paused (low-effort path)
A quiet `btn-quiet` button above the board ("ไม่อยากเลือกวันนี้ — ให้พี่เสก โซโลเลือกให้") re-runs Prioritization on tap only — never automatically (see ADR-0003). A Paused note stays on the board at 55% opacity with no rank badge and a single "เอากลับมาทำต่อ" action in place of its drag handle, so stepping away from a Problem never reads as deleting it. Action Steps default to one-at-a-time (a small "ข้อ X จาก Y" counter plus a "ดูทั้งหมด" link to expand) with a "ยังไม่พร้อมสำหรับเรื่องนี้ตอนนี้" action at the foot of the sheet that pauses the Problem — both exist so a tired user is never confronted with a full list or a closed door.

### Bottom Navigation
Four flat icon+label tabs, `ink-faint` at rest, `coral-dark` on a soft coral-tinted background when active. Icons are hand-drawn-weight line SVGs (1.8px stroke), never a filled icon set — kept consistent with the sketched, paper-world line quality used throughout.

### Sheets & Modals
Bottom-anchored, `sheet` radius (rounded top corners only), `shadow-pop`, sliding up from fully off-screen. Used for a note's Action Steps and for the Usage/Upgrade screen — never a centered dialog, to keep every overlay feeling like "something sliding up from your board," consistent with the world.

### Mood Check-in
A note-slip like any other Companion message, holding five small circular face icons (line-drawn, same 1.8px stroke as every other icon) instead of prose. Tapping one commits immediately — `coral-solid` fill marks the selection — and reveals an optional, unlabeled-as-required note field below it; nothing here is a required field. The same five-icon face glyph reappears, read-only, in the History screen's recent-days strip.

### Reflection
Replaces the checklist in place the instant the last Action Step is checked, inside the same sheet — never a new screen. Four outcome rows (`reflect-opt`, full-width, icon + label, `coral-solid` when selected) read as a trend, not a face: a down chevron, a flat line, and two upward strokes of increasing angle, deliberately distinct from the Mood Check-in's face glyphs since the two capture different things (a feeling vs. an outcome). Skippable via a `text-link`; picking an outcome reveals the same optional note pattern as Mood Check-in, plus an explicit `btn-primary` "ปิดปัญหานี้เลย" the user presses when ready — never an auto-timeout — so writing a note is never a race against the sheet closing on its own.

### Safety Net Card
The one component allowed to break the coral-only rule: `safe`/`safe-bg` green, a shield icon, and a solid-filled call-to-action linking `tel:1323`. Its visual distinctness from every other message is deliberate — it must never be mistaken for a normal note.

## Do's and Don'ts

### Do:
- **Do** keep coral to one accent per screen (the One Accent Rule) — reach for size, weight, or position before reaching for a second color.
- **Do** use `coral-solid`, never `coral`, wherever text sits directly on a coral fill.
- **Do** keep all functional/interactive text at 11px or larger.
- **Do** use the torn-corner note shape for anything that is "someone's own written content"; keep it exclusive to that role so it stays meaningful.

### Don't:
- **Don't** introduce a colored, blurred shadow on a dark background (The No-Glow-On-Dark Rule).
- **Don't** stack a card-shaped container inside another card-shaped container outside the one deliberate exception (the mini-corkboard inside a chat note, which is a real corkboard-in-a-note, not accidental nesting) — flatten with spacing/dividers instead.
- **Don't** use the meditation-app palette (mint/teal gradients, floating blob illustrations) or a clinical blue/white dashboard look anywhere in this product — both were explicitly rolled and rejected in favor of this world.
- **Don't** add a second saturated accent color; if a new state needs color, reach for the existing `safe` semantic pair before inventing one.
