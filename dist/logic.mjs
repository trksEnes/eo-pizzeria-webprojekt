import { menu } from './menu.mjs';
export const euro = cents => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
export const itemKey = (id, variant) => `${id}:${variant}`;
export function getVariant(id, variant) {
  const item = menu.find(p => p.id === id);
  if (!item || !Number.isInteger(variant) || !item.variants[variant]) throw new Error('Unbekanntes Produkt.');
  return { ...item, variant, ...item.variants[variant] };
}
export function updateQuantity(cart, id, variant, quantity) {
  getVariant(id, variant);
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 20) throw new Error('Bitte zwischen 0 und 20 Stück wählen.');
  const key = itemKey(id, variant);
  if (quantity === 0) cart.delete(key); else cart.set(key, { id, variant, quantity });
}
export function cartLines(cart) { return [...cart.values()].map(p => ({ ...getVariant(p.id, p.variant), quantity: p.quantity })); }
export function cartTotal(cart) { return cartLines(cart).reduce((sum, p) => sum + p.cents * p.quantity, 0); }
export function localDate(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
export function parseDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d, 12);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
}
export function availableTimes(value, now = new Date()) {
  const date = parseDay(value);
  if (!date || value < localDate(now)) return [];
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  const slots = weekend ? ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'] : ['16:30', '17:30', '18:30', '19:30', '20:30'];
  return slots.filter(time => value !== localDate(now) || time > `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
}
// Reproduzierbare Beispielbelegung: kein Zufallssprung beim erneuten Anklicken.
export function occupiedTables(date, time) {
  let seed = 2166136261;
  for (const char of `${date}|${time}`) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
  const count = 1 + seed % 3, result = new Set();
  for (let step = 0; result.size < count && step < 30; step++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    result.add(1 + seed % 6);
  }
  return [...result].sort((a, b) => a - b);
}
export function validName(value) { return typeof value === 'string' && value.trim().length >= 2 && value.trim().length <= 80 && /\p{L}/u.test(value) && !/[<>\x00-\x1F]/.test(value); }
export const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160;
export const validPhone = value => /^[+\d\s()./-]{7,25}$/.test(value) && value.replace(/\D/g, '').length >= 7;
export function reservationError(data, now = new Date()) {
  if (!parseDay(data.date) || data.date < localDate(now)) return 'Bitte wähle heute oder einen zukünftigen Tag.';
  if (!availableTimes(data.date, now).includes(data.time)) return 'Bitte wähle eine verfügbare Uhrzeit.';
  if (!Number.isInteger(data.guests) || data.guests < 1 || data.guests > 8) return 'Bitte wähle zwischen 1 und 8 Personen.';
  if (!data.tables.length || data.tables.length > 2 || new Set(data.tables).size !== data.tables.length || data.tables.some(t => !Number.isInteger(t) || t < 1 || t > 6 || occupiedTables(data.date, data.time).includes(t))) return 'Bitte wähle einen oder zwei freie Tische.';
  if (data.tables.length * 4 < data.guests) return 'Für mehr als vier Personen wähle bitte zwei Tische.';
  if (!validName(data.name)) return 'Bitte gib deinen Namen ein (mindestens zwei Zeichen).';
  if (!validEmail(data.email)) return 'Bitte prüfe deine E-Mail-Adresse.';
  if (!validPhone(data.phone)) return 'Bitte prüfe deine Telefonnummer.';
  return '';
}
export function checkoutError(data, cart) {
  if (!cart.size) return 'Dein Warenkorb ist noch leer.';
  if (!validName(data.name)) return 'Bitte gib deinen Namen ein (mindestens zwei Zeichen).';
  if (!['pickup', 'delivery'].includes(data.mode)) return 'Bitte wähle Abholung oder Lieferung.';
  if (data.mode === 'delivery') {
    if (!validEmail(data.email)) return 'Bitte prüfe deine E-Mail-Adresse.';
    if (!validPhone(data.phone)) return 'Bitte prüfe deine Telefonnummer.';
    if (!data.street?.trim() || !data.house?.trim() || !/^\d{5}$/.test(data.postcode ?? '') || !data.city?.trim()) return 'Bitte ergänze die vollständige Lieferadresse mit fünfstelliger Postleitzahl.';
    if ([data.street, data.house, data.city].some(x => /[<>\x00-\x1F]/.test(x))) return 'Bitte prüfe deine Lieferadresse.';
  }
  return '';
}
