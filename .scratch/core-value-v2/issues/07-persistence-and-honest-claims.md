# Local persistence and honest claims

Status: done

Persist Board, History, Mood Check-ins, Reflections and Calm Checks on the device so the app remembers across reloads. Add the invitation to save/sign up only at meaningful moments (ADR-0002). Remove or build every UI statement not backed by behavior, and state plainly how messages are processed. See ADR-0005.

Acceptance:
- Reloading keeps all data; deleting all history from Settings really clears it, including mood history.
- "ปัดรายการไปทางซ้ายเพื่อลบ" is built or the text removed; the data-access row and download either work or are removed.
- Forget Mode wording matches what it actually does.
- Settings explains in plain Thai whether and how messages leave the device.

Blocked by: none.

## Done

Board, History, Mood Check-ins, Calm Checks, usage, theme and the active Session persist in the browser (localStorage, autosaved), and the monthly quota resets when the month changes. If the browser blocks storage, Settings says so plainly. Forget Mode now truly means conversation-derived Problems are not saved. Sample data is never saved. Settings text was rewritten to match behavior: the swipe-to-delete claim is gone (delete buttons exist), the data row explains where data lives and when messages could leave the device, and "download" became a view-and-copy dialog that also works inside sandboxed pages. All confirmations are in-app dialogs (browser confirm() is blocked in sandboxed pages).

Still open: there is no account or sync yet, so the "save invitation" is limited to honest copy when the quota blocks a new Session (no sign-up button exists).
