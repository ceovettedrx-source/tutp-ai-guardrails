// Script sanity for model text (server/lang-check.js).
//   node --test tests/unit/lang-check.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { foreignScript, foreignScriptIn } from '../src/lang-check.js';

test('a Georgian letter inside a Telugu word is caught (the glitch seen in a recorded Telugu note)', () => {
  assert.equal(foreignScript('ఆక్సిజన్‌ బైపროడక్ట్‌గా విడుదల'), 'რ');
  assert.equal(foreignScript('ఆక్సిజన్‌ విడుదల అవుతుంది'), '');
});

test('Latin, every Indian script, digits, symbols and punctuation pass', () => {
  for (const s of ['Displacement', 'స్థానభ్రంశం (Displacement)', 'विस्थापन', 'இடப்பெயர்ச்சி', 'ಕನ್ನಡ', 'മലയാളം', 'বাংলা', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'ଓଡ଼ିଆ', 'اردو', '3/4 × 2 = 1.5 m/s² ₹500 ✓', '', null]) {
    assert.equal(foreignScript(s), '', String(s));
  }
  assert.equal(foreignScript('привет'), 'п');
  assert.equal(foreignScript('日本語'), '日');
});

test('it looks inside objects and arrays', () => {
  assert.equal(foreignScriptIn({ a: ['ok', { b: 'bad რ' }] }), 'რ');
  assert.equal(foreignScriptIn({ a: ['ok', { b: 'fine' }], n: 4 }), '');
});

