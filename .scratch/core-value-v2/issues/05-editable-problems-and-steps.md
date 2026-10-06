# Editable Problems and Action Steps, and shrinking big steps

Status: done

Let the user add a Problem, rename or delete it, and add, edit or delete its Action Steps. Let the Companion shrink a step into a smaller one when asked or when the user says it is too big.

Acceptance:
- All edits work on the Board and in History's detail, and persist (ticket 07).
- Deleting a Problem asks for confirmation and offers undo.
- "Too big to start" on a step replaces it with a smaller first step and keeps the original as a later step.
- Editing never changes a Problem's Paused/Done status unintentionally.

Blocked by: 01 for the shrink behavior; manual editing can ship first.

## Done

Add a Problem (title, category, optional steps) from the Board; rename or change category and delete from the steps sheet (delete asks first and offers undo; History also has a delete button). Steps can be edited, added (max 12), deleted with undo, and starter steps can be suggested when a Problem has none. "This step is too big" (link in the sheet and Focus View, or said in chat) inserts a smaller first step and keeps the original; it can be shrunk twice, then says it cannot go smaller. Editing never changes Paused/Done status; a Problem whose steps are all done offers to close with Reflection.
