# Board leads with one thing for today

Status: done

Change the Board's default view to show the top Problem prominently (the Focus View, "เรื่องเดียววันนี้") with the others collapsed behind a clear expand control. Keep existing reordering, Decide for Me, Pause and Reflection behavior. Make "Decide for Me" re-run the Companion's prioritization question (ticket 01) instead of re-sorting stored numbers.

Acceptance:
- On open, the user sees one Problem and its next Action Step, not all Problems.
- One tap expands to the full Board; the choice is not forced.
- Paused Problems stay visible only in the expanded view.
- Existing undo toast works in both views.

Blocked by: 01 for the real prioritization question; the view itself can ship first.

## Done

The Board opens on one Problem and its next Action Step ("ทำข้อนี้เสร็จแล้ว" completes it inline, and the last step opens Reflection); everything else is behind "ดูเรื่องอื่นทั้งหมด" and can be collapsed again. "Decide for Me" now asks the prioritization question (one tap, or "ไม่แน่ใจ ให้เดาให้"), and the Companion asks the same question in chat after extracting two or more Problems. Undo works for both.
