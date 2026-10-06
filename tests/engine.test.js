// Tests drive the Session engine through its interface only (spec: .scratch/core-value-v2/spec.md).
// Run: node --test tests/
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadEngine() {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const m = html.match(/<script id="lre-engine">([\s\S]*?)<\/script>/);
  assert.ok(m, 'engine script block exists in index.html');
  const sandbox = { module: { exports: {} }, setTimeout, clearTimeout, Promise, Date };
  vm.createContext(sandbox);
  vm.runInContext(m[1], sandbox);
  return sandbox.module.exports;
}

const LRE = loadEngine();
const plain = x => JSON.parse(JSON.stringify(x));
const MIN = 60 * 1000;

function makeEngine(opts) {
  return LRE.createEngine(Object.assign({ adapter: LRE.createScriptedAdapter({ delayMs: 0 }) }, opts));
}

test('different messages get different, relevant replies and problems from the user\'s own words', async () => {
  const e = makeEngine();
  const a = await e.takeTurn('เงินเดือนไม่พอ, หัวหน้าชอบโยนงานให้', { problems: [] }, 1000);
  assert.deepStrictEqual(plain(a.payload.problems.map(p => p.cat)), ['การเงิน', 'การงาน']);
  assert.strictEqual(a.payload.problems[0].title, 'เงินเดือนไม่พอ');
  assert.strictEqual(a.payload.problems[1].title, 'หัวหน้าชอบโยนงานให้');
  assert.ok(a.payload.problems.every(p => p.steps.length > 0));
  assert.strictEqual(a.payload.askPriority, true);

  const e2 = makeEngine();
  const b = await e2.takeTurn('ตอนนี้เครียดเรื่องเงิน งาน แล้วก็แฟนด้วย', { problems: [] }, 1000);
  assert.deepStrictEqual(plain(b.payload.problems.map(p => p.cat)), ['การเงิน', 'การงาน', 'ความสัมพันธ์']);
  assert.ok(b.payload.reply.includes('การเงิน'));
});

test('a new problem raised in a later Session is extracted; a repeated category is not duplicated', async () => {
  const e = makeEngine();
  const first = await e.takeTurn('เครียดเรื่องเงิน', { problems: [] }, 0);
  assert.strictEqual(first.payload.problems.length, 1);
  const existing = [{ cat: 'การเงิน', status: 'new' }];
  const later = await e.takeTurn('ช่วงนี้นอนไม่หลับด้วย แล้วก็เรื่องเงินอีก', { problems: existing }, 60 * MIN);
  assert.strictEqual(later.startedNewSession, true);
  assert.deepStrictEqual(plain(later.payload.problems.map(p => p.cat)), ['สุขภาพ']);
});

test('text with no recognizable problem yields a reply but no problems', async () => {
  const e = makeEngine();
  const r = await e.takeTurn('วันนี้ไม่รู้จะเริ่มยังไง', { problems: [] }, 0);
  assert.strictEqual(r.payload.problems.length, 0);
  assert.ok(r.payload.reply.length > 0);
});

test('a Session is counted once, however many messages it holds', async () => {
  const e = makeEngine();
  await e.takeTurn('สวัสดี', {}, 0);
  await e.takeTurn('เล่าต่อ', {}, 1 * MIN);
  await e.takeTurn('อีกนิด', {}, 2 * MIN);
  assert.strictEqual(e.usage.used, 1);
  assert.strictEqual(e.session.turns, 3);
});

test('a Session ends after 30 idle minutes and the next message starts a new counted Session', async () => {
  const e = makeEngine();
  await e.takeTurn('สวัสดี', {}, 0);
  assert.strictEqual(e.isActive(29 * MIN), true);
  assert.strictEqual(e.isActive(31 * MIN), false);
  const r = await e.takeTurn('กลับมาแล้ว', {}, 31 * MIN);
  assert.strictEqual(r.startedNewSession, true);
  assert.strictEqual(e.usage.used, 2);
  assert.strictEqual(e.completed.length, 1);
});

test('quota blocks only starting a new Session, never one in progress', async () => {
  const e = makeEngine({ used: 4, limit: 5 });
  await e.takeTurn('เริ่มเซสชันที่ 5', {}, 0);
  assert.strictEqual(e.usage.used, 5);
  const inside = await e.takeTurn('ยังคุยต่อได้', {}, 1 * MIN);
  assert.ok(!inside.blocked, 'in-progress Session is never interrupted');
  const next = await e.takeTurn('เริ่มใหม่หลังหมดเวลา', {}, 40 * MIN);
  assert.strictEqual(next.blocked, true);
  assert.strictEqual(next.reason, 'quota');
});

test('the Safety Net is never blocked by the quota and does not consume it', async () => {
  const e = makeEngine({ used: 5, limit: 5 });
  const r = await e.takeTurn('อยากตาย', {}, 0);
  assert.ok(!r.blocked);
  assert.strictEqual(r.payload.safety, true);
  assert.strictEqual(e.usage.used, 5);
});

test('the safety flag is raised by the engine even if the adapter ignores it', async () => {
  const lazy = { respond: () => Promise.resolve({ reply: 'ok' }) };
  const e = LRE.createEngine({ adapter: lazy });
  const r = await e.takeTurn('ไม่อยากมีชีวิตอยู่แล้ว', {}, 0);
  assert.strictEqual(r.payload.safety, true);
});

test('Calm Check before/after and exercise are recorded per Session, including before the first message', async () => {
  const e = makeEngine();
  e.recordCalm('before', 2);
  e.recordExercise('breath', true);
  await e.takeTurn('สวัสดี', {}, 0);
  assert.strictEqual(e.session.calmBefore, 2);
  assert.deepStrictEqual(plain(e.session.exercise), { kind: 'breath', completed: true });
  e.recordCalm('after', 4);
  assert.strictEqual(e.session.calmAfter, 4);
  const ended = e.endSession();
  assert.strictEqual(ended.calmAfter, 4);
  assert.strictEqual(e.isActive(), false);
  assert.strictEqual(e.allSessions().length, 1);
});

test('a Calm Check offer for "after" appears once, after enough turns', async () => {
  const e = makeEngine();
  for (let i = 0; i < 4; i++) await e.takeTurn('คุย ' + i, {}, i * MIN);
  assert.strictEqual(e.shouldOfferCalmAfter(4 * MIN), false);
  await e.takeTurn('คุยอีก', {}, 4 * MIN);
  assert.strictEqual(e.shouldOfferCalmAfter(4 * MIN), true);
  e.markAfterOffered();
  assert.strictEqual(e.shouldOfferCalmAfter(4 * MIN), false);
});

test('Safety Net recognises the current phrase list', () => {
  ['อยากตาย', 'ฆ่าตัวตาย', 'ทำร้ายตัวเอง'].forEach(p => assert.strictEqual(LRE.detectSafety('ช่วงนี้ ' + p), true));
  assert.strictEqual(LRE.detectSafety('เครียดเรื่องงานมาก'), false);
});

function linkedChannels() {
  const a = { onmessage: null }, b = { onmessage: null };
  a.postMessage = d => setImmediate(() => b.onmessage && b.onmessage({ data: d }));
  b.postMessage = d => setImmediate(() => a.onmessage && a.onmessage({ data: d }));
  return { participant: a, operator: b };
}

test('operator adapter: a human reply (with problems and flags) comes back through the same interface', async () => {
  const { participant, operator } = linkedChannels();
  const fallback = LRE.createScriptedAdapter({ delayMs: 0 });
  const adapter = LRE.createOperatorAdapter(participant, fallback, { timeoutMs: 2000 });
  const e = LRE.createEngine({ adapter });
  operator.onmessage = m => {
    if (m.data.type === 'turn') {
      operator.postMessage({
        type: 'reply', id: m.data.id, reply: 'ฟังอยู่นะ ตอนนี้หนักตรงไหนที่สุด',
        problems: [{ title: 'หนี้บัตร', cat: 'การเงิน', steps: ['ดูยอดรวม'] }], askPriority: true
      });
    }
  };
  const r = await e.takeTurn('เงินไม่พอ', { problems: [] }, 0);
  assert.strictEqual(r.payload.reply, 'ฟังอยู่นะ ตอนนี้หนักตรงไหนที่สุด');
  assert.strictEqual(r.payload.problems[0].title, 'หนี้บัตร');
  assert.strictEqual(r.payload.askPriority, true);
});

test('operator adapter: falls back to the scripted reply if no operator answers in time', async () => {
  const { participant } = linkedChannels();
  const fallback = LRE.createScriptedAdapter({ delayMs: 0 });
  const adapter = LRE.createOperatorAdapter(participant, fallback, { timeoutMs: 30 });
  const e = LRE.createEngine({ adapter });
  const r = await e.takeTurn('เครียดเรื่องเงิน', { problems: [] }, 0);
  assert.strictEqual(r.payload.problems[0].cat, 'การเงิน');
});

test('operator adapter: the safety floor still applies when a human operator misses a crisis message', async () => {
  const { participant, operator } = linkedChannels();
  const adapter = LRE.createOperatorAdapter(participant, LRE.createScriptedAdapter({ delayMs: 0 }), { timeoutMs: 2000 });
  const e = LRE.createEngine({ adapter });
  operator.onmessage = m => m.data.type === 'turn' && operator.postMessage({ type: 'reply', id: m.data.id, reply: 'โอเคนะ' });
  const r = await e.takeTurn('ทำร้ายตัวเอง', {}, 0);
  assert.strictEqual(r.payload.safety, true);
});

test('operator adapter: unsolicited operator messages are delivered as pushes', async () => {
  const { participant, operator } = linkedChannels();
  const pushed = [];
  LRE.createOperatorAdapter(participant, LRE.createScriptedAdapter({ delayMs: 0 }), { onPush: p => pushed.push(p) });
  operator.postMessage({ type: 'reply', id: null, reply: 'พี่อยู่ตรงนี้นะ', askCalmAfter: true });
  await new Promise(r => setTimeout(r, 20));
  assert.strictEqual(pushed.length, 1);
  assert.strictEqual(pushed[0].askCalmAfter, true);
});

// ---- ticket 05: shrinking a step that is too big ----
test('shrinkStep gives a smaller first step, a smaller one again, then admits it cannot go smaller', () => {
  const first = LRE.shrinkStep('ส่งข้อความสั้นๆ ทักไปก่อน', 1);
  assert.ok(first.length > 0 && first !== 'ส่งข้อความสั้นๆ ทักไปก่อน');
  const second = LRE.shrinkStep(first, 2);
  assert.ok(second.length > 0 && second !== first);
  assert.strictEqual(LRE.shrinkStep(second, 3), null);
  assert.ok(LRE.shrinkStep('อะไรสักอย่างที่ไม่มีคำเฉพาะ', 1).length > 0);
});

test('the scripted adapter turns "this step is too big" into a shrink request only when there is a step to shrink', async () => {
  const e = makeEngine();
  const withStep = await e.takeTurn('ข้อนี้ใหญ่เกินไปสำหรับฉันตอนนี้', { problems: [], focusStep: 'จดรายจ่าย' }, 0);
  assert.strictEqual(withStep.payload.shrinkNext, true);
  const e2 = makeEngine();
  const noStep = await e2.takeTurn('ข้อนี้ใหญ่เกินไปสำหรับฉันตอนนี้', { problems: [] }, 0);
  assert.strictEqual(noStep.payload.shrinkNext, false);
  assert.strictEqual(LRE.detectShrinkRequest('ไม่รู้จะเริ่มตรงไหนเลย'), false, 'a vague "where to start" must not trigger shrinking');
});

test('starter steps exist for every category, including the catch-all', () => {
  LRE.categories().forEach(cat => assert.ok(LRE.starterSteps(cat).length > 0, cat));
  assert.ok(LRE.categories().includes('อื่นๆ'));
});

// ---- ticket 07: local-first persistence ----
const NOW = new Date(2026, 9, 7, 12, 0, 0).getTime();
function snapshot(extra) {
  return Object.assign({
    problems: [
      { id: 'a', title: 'เรื่องที่เก็บไว้', cat: 'การเงิน', status: 'active', urgency: 3, steps: [{ t: 'x', done: true }] },
      { id: 'b', title: 'เรื่องที่คุยตอนเปิดโหมดลืม', cat: 'การงาน', status: 'new', urgency: 3, steps: [], ephemeral: true }
    ],
    order: ['a', 'b'],
    moodHistory: [{ date: '2026-10-07', level: 2 }],
    usage: { used: 3, limit: 5 },
    completed: [{ id: 's1', calmBefore: 2, calmAfter: 4, exercise: { kind: 'breath', completed: true } }],
    session: null,
    pending: { calmBefore: null, exercise: null },
    theme: 'mint'
  }, extra);
}

test('persistence round-trips Problems, mood, usage and calm data', () => {
  const back = LRE.restoreState(LRE.serializeState(snapshot(), NOW), NOW);
  assert.strictEqual(back.problems[0].title, 'เรื่องที่เก็บไว้');
  assert.strictEqual(back.problems[0].steps[0].done, true);
  assert.strictEqual(back.moodHistory[0].level, 2);
  assert.strictEqual(back.usage.used, 3);
  assert.strictEqual(back.completed[0].calmAfter, 4);
  assert.strictEqual(back.completed[0].exercise.completed, true);
  assert.strictEqual(back.theme, 'mint');
});

test('Forget Mode: Problems created while it was on are never written to storage, and drop out of the order', () => {
  const saved = JSON.parse(LRE.serializeState(snapshot(), NOW));
  assert.deepStrictEqual(saved.problems.map(p => p.id), ['a']);
  assert.deepStrictEqual(saved.order, ['a']);
  // ...while the mood level and calm data still persist
  assert.strictEqual(saved.moodHistory.length, 1);
  assert.strictEqual(saved.completed.length, 1);
});

test('the monthly quota resets when the month changes, and not before', () => {
  const json = LRE.serializeState(snapshot(), NOW);
  assert.strictEqual(LRE.restoreState(json, new Date(2026, 9, 28).getTime()).usage.used, 3);
  assert.strictEqual(LRE.restoreState(json, new Date(2026, 10, 1).getTime()).usage.used, 0);
});

test('corrupt or foreign storage is ignored instead of breaking the app', () => {
  assert.strictEqual(LRE.restoreState('not json', NOW), null);
  assert.strictEqual(LRE.restoreState('{"v":2}', NOW), null);
  assert.strictEqual(LRE.restoreState('{"v":1,"problems":"x","order":[]}', NOW), null);
  assert.strictEqual(LRE.restoreState(null, NOW), null);
});

test('an order entry pointing at a missing Problem is dropped on restore', () => {
  const json = JSON.stringify({ v: 1, month: LRE.monthKey(NOW), problems: [{ id: 'a' }], order: ['a', 'ghost'] });
  assert.deepStrictEqual(Array.from(LRE.restoreState(json, NOW).order), ['a']);
});

test('sample data (flagged) is never persisted as if it were the person own data', () => {
  const snap = snapshot({
    problems: [{ id: 's1', title: 'ตัวอย่าง', cat: 'การเงิน', status: 'new', steps: [], sample: true, ephemeral: true }],
    order: ['s1'],
    moodHistory: [{ date: '2026-10-01', level: 3, sample: true }, { date: '2026-10-07', level: 2 }]
  });
  const saved = JSON.parse(LRE.serializeState(snap, NOW));
  assert.strictEqual(saved.problems.length, 0);
  assert.deepStrictEqual(saved.moodHistory.map(e => e.date), ['2026-10-07']);
});
