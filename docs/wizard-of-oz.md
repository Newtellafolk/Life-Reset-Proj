# Running a Wizard-of-Oz test

The Companion can be answered by a human operator instead of the built-in rules, so the core conversation can be tested before any LLM is connected. Nothing leaves the browser: participant and operator talk over a same-browser channel.

## Setup (two windows of the same browser)

1. Window A (participant): open the app, go to ตั้งค่า → สำหรับทีมทดสอบ, turn on **ให้ผู้ดำเนินการตอบ**.
2. Window B (operator): open the app, go to ตั้งค่า → สำหรับทีมทดสอบ, press **ใช้หน้าต่างนี้เป็นคอนโซลผู้ดำเนินการ**. (Or open the file with `?operator=1`; for the participant use `?wizard=1`.)
3. In window A the setting text changes to "ผู้ดำเนินการเชื่อมต่อแล้ว". Hand window A to the participant.

## What the operator can do

- Read each message, plus the participant's Calm Check, today's mood and the problems on their Board.
- Reply in the Companion's voice (quick phrases available).
- Attach Problems the participant described (title, category, one small step per line); they appear on the Board.
- Tick **ถามเรื่องที่แย่ลงเร็วสุด** to ask the prioritization question, **ขอ Calm Check หลังคุย** to ask the "after" rating, or **ขึ้นการ์ดสายด่วน 1323** to show the Safety Net card.

## Safeguards

- The engine always raises the Safety Net on the participant side for crisis phrases, even if the operator misses them.
- If nobody answers within 45 seconds the built-in rules reply, so the participant is never left waiting.
- Do not run tests with real participants until the Safety Net phrase list and the Companion Rulebook have been reviewed (tickets 08 and 09).

## Limits

Cross-device operation (operator on another computer) needs a small server and is not built. Data is in memory only and is lost on reload.
