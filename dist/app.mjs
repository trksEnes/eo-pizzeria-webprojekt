import { menu, categories } from './menu.mjs';
import { euro, itemKey, updateQuantity, cartLines, cartTotal, localDate, availableTimes, occupiedTables, reservationError, checkoutError } from './logic.mjs';

const $ = selector => document.querySelector(selector);
const cart = new Map(); // Ausschließlich flüchtiger Zustand. Kein localStorage, keine API.
const selectedTables = new Set();
let category = 'pizza', toastTimer, previousFocus, afterInfoClose = null;
const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const button = (label, className, action, ariaLabel) => {
  const node = create('button', className, label); node.type = 'button';
  if (ariaLabel) node.setAttribute('aria-label', ariaLabel);
  node.addEventListener('click', action); return node;
};
function notify(message) {
  const toast = $('#toast'); clearTimeout(toastTimer);
  toast.textContent = message; toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}
function showError(id, message) {
  const target = $(id); target.textContent = message; target.hidden = !message;
  if (message) target.focus();
}
function renderMenu() {
  const query = $('#menu-search').value.trim().toLocaleLowerCase('de');
  const filtered = menu.filter(item => item.category === category && `${item.name} ${item.description}`.toLocaleLowerCase('de').includes(query));
  const container = $('#menu-grid'); container.replaceChildren();
  $('#category-note').textContent = categories.find(c => c.id === category).note;
  $('#result-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'Auswahl' : 'zur Auswahl'}`;
  if (!filtered.length) {
    const empty = create('div', 'empty-results');
    empty.append(create('h3', '', 'Heute mal etwas anderes?'), create('p', '', 'Dazu haben wir in dieser Kategorie nichts gefunden. Probiere einen anderen Suchbegriff.'), button('Suche zurücksetzen', 'text-link', () => { $('#menu-search').value = ''; renderMenu(); $('#menu-search').focus(); }));
    container.append(empty); return;
  }
  filtered.forEach(item => {
    const number = menu.filter(p => p.category === category).indexOf(item) + 1;
    const article = create('article', 'dish'); article.dataset.product = item.id;
    const info = create('div', 'dish-info'), controls = create('div', 'dish-controls');
    const select = create('select'); select.setAttribute('aria-label', `Größe für ${item.name}`);
    item.variants.forEach((v, index) => { const option = create('option', '', v.label); option.value = index; select.append(option); });
    const price = create('span', 'dish-price', euro(item.variants[0].cents));
    select.addEventListener('change', () => { price.textContent = euro(item.variants[Number(select.value)].cents); });
    const add = button('+', 'dish-add', () => {
      const variant = Number(select.value), key = itemKey(item.id, variant), count = cart.get(key)?.quantity ?? 0;
      if (count >= 20) { notify('Maximal 20 Stück pro Auswahl.'); return; }
      updateQuantity(cart, item.id, variant, count + 1); renderCart();
      notify(`${item.name} · ${item.variants[variant].label} hinzugefügt`);
    }, `${item.name} zum Warenkorb hinzufügen`);
    controls.append(select, price, add);
    info.append(create('h3', '', item.name), create('p', '', item.description), controls);
    article.append(create('span', 'dish-number', String(number).padStart(2, '0')), info);
    container.append(article);
  });
}
for (const tab of document.querySelectorAll('[data-category]')) {
  tab.addEventListener('click', () => {
    category = tab.dataset.category;
    document.querySelectorAll('[data-category]').forEach(node => node.setAttribute('aria-pressed', String(node === tab)));
    renderMenu();
  });
}
$('#menu-search').addEventListener('input', renderMenu);

const cartDialog = $('#cart-dialog');
function renderCart() {
  const lines = cartLines(cart), total = cartTotal(cart), count = lines.reduce((sum, p) => sum + p.quantity, 0);
  $('#cart-count').textContent = count;
  $('#open-cart').setAttribute('aria-label', `Warenkorb öffnen, ${count} Artikel`);
  $('#floating-count').textContent = count; $('#floating-total').textContent = euro(total);
  $('#floating-cart').hidden = count === 0 || cartDialog.open;
  $('#cart-summary').hidden = !lines.length;
  $('#cart-total').textContent = euro(total); $('#checkout-total').textContent = euro(total);
  const container = $('#cart-lines'); container.replaceChildren();
  if (!lines.length) {
    const empty = create('div', 'empty-cart'); empty.append(create('div', 'empty-symbol', 'Ciao!'), create('h3', '', 'Hier fehlt noch dein Lieblingsgericht.'), create('p', '', 'Pizza, Pasta oder doch beides? Deine Auswahl wartet in der Speisekarte.')); container.append(empty);
  }
  lines.forEach(item => {
    const row = create('div', 'cart-line'), top = create('div', 'cart-line-top');
    top.append(create('span', '', item.name), create('span', '', euro(item.cents * item.quantity)));
    const quantityRow = create('div', 'quantity-row'), control = create('div', 'quantity-control');
    const change = quantity => {
      const focusedLabel = document.activeElement?.getAttribute('aria-label');
      updateQuantity(cart, item.id, item.variant, quantity); renderCart();
      // Nach dem Neuzeichnen bleibt der Tastaturfokus in der Mengensteuerung.
      const next = [...container.querySelectorAll('.cart-line')].find(n => n.dataset.key === itemKey(item.id, item.variant));
      const matching = next && [...next.querySelectorAll('button')].find(node => node.getAttribute('aria-label') === focusedLabel && !node.disabled);
      (matching ?? next?.querySelector('button') ?? $('#continue-shopping')).focus();
    };
    const minus = button('−', '', () => change(item.quantity - 1), `Einmal weniger ${item.name}, ${item.label}`);
    const plus = button('+', '', () => change(item.quantity + 1), `Einmal mehr ${item.name}, ${item.label}`); plus.disabled = item.quantity >= 20;
    control.append(minus, create('span', '', String(item.quantity)), plus);
    quantityRow.append(control, button('Entfernen', 'remove-item', () => change(0), `${item.name}, ${item.label}, entfernen`));
    row.dataset.key = itemKey(item.id, item.variant);
    row.append(top, create('p', 'cart-line-label', `${item.label} · ${euro(item.cents)} pro Stück`), quantityRow); container.append(row);
  });
}
function openCart() {
  previousFocus = document.activeElement;
  $('#cart-view').hidden = false; $('#checkout-form').hidden = true; $('#order-receipt').hidden = true;
  $('#cart-title').textContent = 'Deine Auswahl.';
  renderCart(); cartDialog.showModal(); $('#floating-cart').hidden = true;
}
function closeCart() { cartDialog.close(); }
$('#open-cart').addEventListener('click', openCart);
$('#floating-cart').addEventListener('click', openCart);
$('#close-cart').addEventListener('click', closeCart);
$('#continue-shopping').addEventListener('click', closeCart);
cartDialog.addEventListener('close', () => {
  $('#checkout-form').reset(); setDeliveryFields(); showError('#checkout-error', '');
  renderCart(); previousFocus?.focus();
});
$('#go-checkout').addEventListener('click', () => {
  if (!cart.size) return;
  $('#cart-view').hidden = true; $('#checkout-form').hidden = false;
  $('#cart-title').textContent = 'Fast am Ziel.'; $('#checkout-name').focus();
});
$('#back-cart').addEventListener('click', () => { $('#cart-view').hidden = false; $('#checkout-form').hidden = true; $('#cart-title').textContent = 'Deine Auswahl.'; $('#go-checkout').focus(); });
function setDeliveryFields() {
  const delivery = $('#checkout-form').elements.mode.value === 'delivery';
  $('#delivery-fields').hidden = !delivery; $('#delivery-fields').disabled = !delivery;
  $('#pay-note').textContent = delivery ? 'Bezahlung bei Lieferung: bar oder mit Karte.' : 'Bezahlung bei Abholung: bar oder mit Karte.';
}
document.querySelectorAll('input[name="mode"]').forEach(radio => radio.addEventListener('change', () => { setDeliveryFields(); showError('#checkout-error', ''); }));
function detailList(rows) {
  const list = create('dl');
  for (const [label, value] of rows) {
    const row = create('div'); row.append(create('dt', '', label), create('dd', '', String(value))); list.append(row);
  }
  return list;
}
$('#checkout-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget, data = Object.fromEntries(new FormData(form));
  const error = checkoutError(data, cart); showError('#checkout-error', error); if (error) return;
  const total = cartTotal(cart), items = cartLines(cart), list = create('ul', 'receipt-list');
  items.forEach(p => { const row = create('li'); row.append(create('span', '', `${p.quantity} × ${p.name} · ${p.label}`), create('strong', '', euro(p.quantity * p.cents))); list.append(row); });
  const details = $('#order-details');
  const rows = [['Name', data.name.trim()], ['Auswahl', data.mode === 'pickup' ? 'Abholung' : 'Lieferung']];
  if (data.mode === 'delivery') rows.push(['Adresse', `${data.street.trim()} ${data.house.trim()}, ${data.postcode} ${data.city.trim()}`]);
  rows.push(['Gesamtbetrag', euro(total)]);
  details.replaceChildren(detailList(rows), list);
  form.reset(); setDeliveryFields(); $('#checkout-form').hidden = true;
  $('#order-receipt').hidden = false; $('#cart-title').textContent = 'Buon appetito.';
  cart.clear(); renderCart(); $('#finish-order').focus();
});
$('#finish-order').addEventListener('click', () => { $('#order-details').replaceChildren(); closeCart(); location.hash = 'speisekarte'; });
// Entfernt auch die flüchtige Bestellübersicht beim Schließen über Escape oder X.
cartDialog.addEventListener('close', () => $('#order-details').replaceChildren());

const dateInput = $('#reservation-date'), timeInput = $('#reservation-time');
function dateLabel(value) {
  const [y, m, d] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(y, m - 1, d, 12));
}
function refreshTimes() {
  dateInput.min = localDate();
  const previous = timeInput.value, times = availableTimes(dateInput.value);
  timeInput.replaceChildren();
  if (!times.length) { const option = create('option', '', 'Keine Uhrzeit frei'); option.value = ''; timeInput.append(option); timeInput.disabled = true; }
  else {
    timeInput.disabled = false;
    times.forEach(time => { const option = create('option', '', time); option.value = time; timeInput.append(option); });
    if (times.includes(previous)) timeInput.value = previous;
  }
  selectedTables.clear(); renderTables(); showError('#reservation-error', '');
}
function renderTables() {
  const container = $('#table-grid'); container.replaceChildren();
  const hasSlot = Boolean(timeInput.value && availableTimes(dateInput.value).includes(timeInput.value));
  const busy = hasSlot ? occupiedTables(dateInput.value, timeInput.value) : [];
  for (let i = 1; i <= 6; i++) {
    const table = button(`Tisch ${i}`, 'table', () => {
      if (selectedTables.has(i)) selectedTables.delete(i);
      else if (selectedTables.size < 2) selectedTables.add(i);
      else { notify('Du kannst höchstens zwei Tische auswählen.'); return; }
      renderTables(); container.querySelector(`[data-table="${i}"]`)?.focus(); showError('#reservation-error', '');
    }, `Tisch ${i}, vier Plätze${!hasSlot ? ', nicht verfügbar' : busy.includes(i) ? ', belegt' : ', frei'}`);
    table.dataset.table = i; table.disabled = !hasSlot || busy.includes(i);
    table.setAttribute('aria-pressed', String(selectedTables.has(i))); container.append(table);
  }
  $('#selection-note').textContent = !hasSlot ? 'Für diesen Tag ist keine Uhrzeit verfügbar.' : selectedTables.size ? `Tisch ${[...selectedTables].sort().join(' & ')} · ${selectedTables.size * 4} Sitzplätze ausgewählt` : Number($('#guests').value) > 4 ? 'Bitte wähle zwei freie Tische für deine Gruppe.' : 'Wähle einen freien Tisch.';
}
dateInput.addEventListener('change', refreshTimes);
timeInput.addEventListener('change', () => { selectedTables.clear(); renderTables(); showError('#reservation-error', ''); });
$('#guests').addEventListener('change', renderTables);
const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); dateInput.value = localDate(tomorrow); refreshTimes();
$('#reservation-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget, data = Object.fromEntries(new FormData(form));
  data.guests = Number(data.guests); data.tables = [...selectedTables].sort();
  const error = reservationError(data); showError('#reservation-error', error); if (error) return;
  showInfo('DEIN ABEND BEI E&O', 'Deine Reservierungsübersicht.', detailList([
    ['Name', data.name.trim()], ['Tag', dateLabel(data.date)], ['Uhrzeit', `${data.time} Uhr`], ['Personen', data.guests], ['Tisch', data.tables.join(' & ')]
  ]), () => {
    $('#reservation-name').value = ''; $('#reservation-email').value = ''; $('#reservation-phone').value = '';
    selectedTables.clear(); renderTables();
  });
});

// Die Karte wird erst nach einer bewussten Auswahl von Google geladen.
$('#load-map').addEventListener('click', () => {
  const frame = create('iframe');
  frame.title = 'Standort in Düsseldorf auf Google Maps';
  frame.referrerPolicy = 'no-referrer';
  frame.allowFullscreen = true;
  frame.src = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2498.743627318916!2d6.767579632715796!3d51.22379829834074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDEzJzIzLjQiTiA2wrA0NicwOS4yIkU!5e0!3m2!1sde!2sde!4v1732195644086!5m2!1sde!2sde";
  $('#map-preview').remove();
  $('#location-map').append(frame);
  $('#map-status').textContent = 'Google Maps wird geladen. Alternativ kannst du den Link Route planen verwenden.';
  frame.focus();
}, { once: true });

const infoDialog = $('#info-dialog');
function showInfo(eyebrow, title, content, onClose = null) {
  afterInfoClose = onClose; $('#info-eyebrow').textContent = eyebrow; $('#info-title').textContent = title;
  $('#info-content').replaceChildren(content); infoDialog.showModal();
}
$('#privacy-open').addEventListener('click', () => {
  const content = create('div');
  content.append(create('p', '', 'Deine Eingaben werden ausschließlich für die Darstellung deiner Auswahl verwendet. Sie werden nicht an ein Restaurant übermittelt und nicht dauerhaft gespeichert.'), create('p', '', 'Der Warenkorb und die Tischauswahl existieren nur während der aktuellen Seitennutzung. Beim Neuladen werden sie zurückgesetzt. Diese Seite verwendet keine Analysewerkzeuge oder eingebundenen Drittanbieter-Schriften.'), create('p', '', 'Die Google-Maps-Karte wird erst nach einem Klick auf Google Maps laden eingebunden. Dabei entsteht eine Verbindung zu Google; unter anderem kann deine IP-Adresse übertragen werden. Route planen öffnet Google Maps in einem neuen Tab. Die Auswahl wird nicht gespeichert.'), create('p', '', 'Die Website wird als statische Projektwebsite ausgeliefert. Die Anwendung speichert keine Bestell- oder Reservierungsdaten. Beim Seitenaufruf können beim Hosting-Anbieter technisch erforderliche Verbindungsdaten anfallen.'));
  showInfo('DEINE DATEN', 'Kurz & transparent.', content);
});
$('#close-info').addEventListener('click', () => infoDialog.close());
$('#info-done').addEventListener('click', () => infoDialog.close());
infoDialog.addEventListener('close', () => { $('#info-content').replaceChildren(); const callback = afterInfoClose; afterInfoClose = null; callback?.(); });
for (const dialog of [cartDialog, infoDialog]) {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}
$('#nav-toggle').addEventListener('click', () => {
  const expanded = $('#nav-toggle').getAttribute('aria-expanded') !== 'true';
  $('#nav-toggle').setAttribute('aria-expanded', String(expanded)); $('#nav-toggle').setAttribute('aria-label', expanded ? 'Menü schließen' : 'Menü öffnen'); $('#navigation').classList.toggle('open', expanded);
});
for (const link of document.querySelectorAll('#navigation a')) link.addEventListener('click', () => { $('#navigation').classList.remove('open'); $('#nav-toggle').setAttribute('aria-expanded', 'false'); $('#nav-toggle').setAttribute('aria-label', 'Menü öffnen'); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { $('#navigation').classList.remove('open'); $('#nav-toggle').setAttribute('aria-expanded', 'false'); $('#nav-toggle').setAttribute('aria-label', 'Menü öffnen'); } });
renderMenu(); renderCart();
