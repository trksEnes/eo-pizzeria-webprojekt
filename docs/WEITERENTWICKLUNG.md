# Technischer Aufbau

## Seitenstruktur

Die Website enthält Startbereich, Speisekarte, Tischauswahl, Besuchsinformationen und Standort. Der Warenkorb und die Zusammenfassungen werden in Dialogen angezeigt.

## Module

| Datei | Aufgabe |
| --- | --- |
| `index.html` | Semantische Seitenstruktur, Formulare und Dialoge |
| `style.css` | Farben, Typografie, responsive Layouts und Interaktionszustände |
| `menu.mjs` | Menüeinträge, Größen und Preise |
| `logic.mjs` | Preisberechnung, Mengenregeln, Zeitfenster und Validierung |
| `app.mjs` | Ereignisbehandlung, DOM-Darstellung und Seitenzustand |

## Warenkorb und Formulare

Produkte werden über Artikel und Größe unterschieden. Die Berechnung erfolgt in ganzen Cent-Beträgen. Für Abholung und Lieferung gelten unterschiedliche Pflichtfelder. Ungültige Angaben werden vor der Zusammenfassung abgefangen.

## Tischwahl

Sechs Tische bieten je vier Plätze. Die Beispielbelegung ist für einen gewählten Zeitraum reproduzierbar. Bei einem Wechsel von Datum oder Uhrzeit wird die Auswahl zurückgesetzt. Die Validierung prüft freie Tische, Personenzahl und ausreichende Sitzplätze.

## Darstellung und Datenverarbeitung

Die Gestaltung nutzt Cremetöne, dunkles Grün, Tomatenrot und eigene SVG-Illustrationen. Der Zustand bleibt ausschließlich im Arbeitsspeicher der geöffneten Seite. Es gibt keine Bestellübertragung oder dauerhafte Speicherung. Die Google-Karte lädt erst nach einem Klick.

## Prüfung

Die zentrale Logik wird mit dem Testframework von Node.js geprüft. Manuelle Browserprüfungen ergänzen die Tests um responsive Darstellung, Tastaturbedienung und Dialogabläufe.

## Lokale Vorschau starten

Voraussetzung: Python 3. Im Projektordner ausführen:

```sh
python3 tools/preview.py
```

Danach `http://127.0.0.1:8765` öffnen. Die Dateien aus `dist/` können auch von einem anderen statischen Webserver ausgeliefert werden. Python wird nur für die lokale Vorschau benötigt; die Website selbst besteht aus HTML, CSS und JavaScript.

## Automatisierte Tests ausführen

Voraussetzung: Node.js ab Version 20. Im Projektordner ausführen:

```sh
node --test tests/*.test.mjs
```

Zehn Tests prüfen unter anderem Preisberechnung, Pizzagrößen, Mengenbegrenzungen, Datum und Uhrzeit, Tischbelegung, Sitzplatzkapazität und Formulareingaben.
