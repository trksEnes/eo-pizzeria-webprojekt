import test from 'node:test';
import assert from 'node:assert/strict';
import { menu } from '../dist/menu.mjs';
import { updateQuantity, cartLines, cartTotal, parseDay, availableTimes, occupiedTables, reservationError, checkoutError, validName } from '../dist/logic.mjs';

test('vollständige Speisekarte: 40 Positionen, 50 Varianten, eindeutige Schlüssel', () => {
  assert.equal(menu.length, 40); assert.equal(menu.reduce((n, p) => n + p.variants.length, 0), 50);
  assert.equal(new Set(menu.map(p => p.id)).size, 40);
  assert.ok(menu.every(p => p.variants.every(v => Number.isSafeInteger(v.cents) && v.cents > 0)));
});
test('Pizzagrößen bleiben getrennt und Eurobeträge werden exakt addiert', () => {
  const cart = new Map(); updateQuantity(cart, 'margherita', 0, 2); updateQuantity(cart, 'margherita', 1, 1); updateQuantity(cart, 'sprite', 0, 3);
  assert.equal(cartLines(cart).length, 3); assert.equal(cartTotal(cart), 3320);
  updateQuantity(cart, 'margherita', 0, 1); assert.equal(cartTotal(cart), 2640);
  updateQuantity(cart, 'margherita', 1, 0); assert.equal(cartTotal(cart), 1490);
});
test('ungültige Mengen und unbekannte Produkte/Größen werden abgewiesen', () => {
  const cart = new Map();
  for (const quantity of [-1, 1.5, 21, NaN, Infinity]) assert.throws(() => updateQuantity(cart, 'margherita', 0, quantity));
  assert.throws(() => updateQuantity(cart, 'falsch', 0, 1)); assert.throws(() => updateQuantity(cart, 'margherita', 2, 1));
  assert.equal(cart.size, 0);
});
test('ungültige Kalendertage, Schaltjahre und vergangene Daten', () => {
  assert.equal(parseDay('2026-02-29'), null); assert.ok(parseDay('2028-02-29'));
  assert.equal(parseDay('2026-13-01'), null); assert.equal(parseDay('2026-04-31'), null);
  assert.deepEqual(availableTimes('2026-11-12', new Date(2026, 10, 13, 12)), []);
});
test('Werktage und Wochenende haben passende Slots; heutige Zeiten liegen in der Zukunft', () => {
  const now = new Date(2026, 10, 13, 18, 30);
  assert.deepEqual(availableTimes('2026-11-13', now), ['19:30', '20:30']);
  assert.equal(availableTimes('2026-11-14', now)[0], '14:00');
  assert.deepEqual(availableTimes('2026-11-13', new Date(2026, 10, 13, 23)), []);
});
test('Belegung bleibt stabil, eindeutig, begrenzt und lässt freie Tische übrig', () => {
  const signatures = new Set();
  for (let day = 1; day <= 28; day++) {
    const date = `2026-11-${String(day).padStart(2, '0')}`, busy = occupiedTables(date, '17:30');
    assert.deepEqual(busy, occupiedTables(date, '17:30')); assert.equal(new Set(busy).size, busy.length);
    assert.ok(busy.length >= 1 && busy.length <= 3); assert.ok(busy.every(n => n >= 1 && n <= 6)); signatures.add(busy.join(','));
  }
  assert.ok(signatures.size > 3);
});
const now = new Date(2026, 10, 13, 12);
const date = '2026-11-14', time = '18:00';
const free = [1,2,3,4,5,6].filter(n => !occupiedTables(date, time).includes(n));
const reservation = { date, time, guests: 2, tables: [free[0]], name: "Anne-Marie O’Neill", email: 'gast@example.com', phone: '+49 151 12345678' };
test('gültige Reservierung mit internationalem Namen; Gruppe braucht genügend Plätze', () => {
  assert.equal(reservationError(reservation, now), '');
  assert.match(reservationError({ ...reservation, guests: 5 }, now), /zwei Tische/);
  assert.equal(reservationError({ ...reservation, guests: 8, tables: free.slice(0, 2) }, now), '');
});
test('belegte, doppelte oder fremde Tische und ungültige Zeit werden abgefangen', () => {
  assert.match(reservationError({ ...reservation, tables: [occupiedTables(date, time)[0]] }, now), /freie Tische/);
  assert.match(reservationError({ ...reservation, tables: [free[0], free[0]] }, now), /freie Tische/);
  assert.match(reservationError({ ...reservation, tables: [99] }, now), /freie Tische/);
  assert.match(reservationError({ ...reservation, time: '03:00' }, now), /Uhrzeit/);
  assert.match(reservationError({ ...reservation, email: 'ohne-mail' }, now), /E-Mail/);
});
test('Namen erlauben Umlaute und Apostrophe, weisen HTML und reine Ziffern zurück', () => {
  for (const name of ['Enes Türksever', "O'Connor", 'Anne-Marie', '李明']) assert.ok(validName(name));
  for (const name of ['1', '1234', '<img src=x>', '']) assert.equal(validName(name), false);
});
test('Abholung, Lieferung, Hausnummern mit Buchstaben und Leerzustand', () => {
  const cart = new Map(); const data = { name: 'Testperson', mode: 'pickup' };
  assert.match(checkoutError(data, cart), /leer/); updateQuantity(cart, 'margherita', 0, 1);
  assert.equal(checkoutError(data, cart), '');
  assert.ok(checkoutError({ ...data, mode: 'delivery' }, cart));
  const delivery = { ...data, mode: 'delivery', email: 'gast@example.com', phone: '0211 1234567', street: 'Straße des 17. Juni', house: '12a', postcode: '40213', city: 'Düsseldorf' };
  assert.equal(checkoutError(delivery, cart), ''); assert.match(checkoutError({ ...delivery, postcode: '123' }, cart), /Postleitzahl/);
});
