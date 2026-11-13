# E&O Pizzeria

**Responsive Pizzeria-Website mit HTML, CSS und JavaScript · Enes Türksever**

## Aufgabe und Umsetzung

Im Webentwicklungspraktikum war die Aufgabe, eine Pizzeria-Website zu planen und umzusetzen. Auf Grundlage meines Pflichtenhefts habe ich eine Speisekarte mit Bestellauswahl und eine interaktive Tischauswahl realisiert.

Die Website verbindet eine responsive Gestaltung mit filterbaren Menüeinträgen, einem Warenkorb und Formularvalidierung. Die Anwendungslogik ist von der Darstellung getrennt und wird durch automatisierte Tests geprüft.

## Funktionen

- Speisekarte mit 40 Einträgen: Pizza, Pasta und Getränke.
- Suche und Kategorieauswahl; Pizzen in zwei Größen mit getrennten Preisen.
- Warenkorb mit Mengenänderung und exakter Preisberechnung in Cent.
- Auswahl zwischen Abholung und Lieferung mit passenden Formularfeldern.
- Tischplan mit Datums- und Zeitauswahl sowie Prüfung der Sitzplatzanzahl.
- Standortbereich mit optionaler Google-Karte und Routenplanung.
- Responsive Ansichten, Tastaturbedienung und zugängliche Dialoge.

## Technik

HTML · CSS · JavaScript (ES-Module) · SVG · Node.js-Testframework

Die Website kommt ohne Framework und externe Schriftarten aus. Menü, Geschäftslogik und Darstellung liegen in getrennten Modulen. Nutzereingaben werden als Text ausgegeben.

## Lokal starten

Voraussetzung: Python 3.

```sh
python3 tools/preview.py
```

Danach `http://127.0.0.1:8765` öffnen. Die Dateien aus `dist/` können auch von einem anderen statischen Webserver ausgeliefert werden.

## Tests

Mit Node.js ab Version 20:

```sh
node --test tests/*.test.mjs
```

Zehn Tests prüfen unter anderem Preisberechnung, Pizzagrößen, Mengenbegrenzungen, Datum und Uhrzeit, Tischbelegung, Sitzplatzkapazität und Formulareingaben.

## Dokumentation

- [Pflichtenheft](docs/PFLICHTENHEFT.md)
- [Technischer Aufbau](docs/WEITERENTWICKLUNG.md)
- [Prüfstand](docs/PRUEFUNG.md)

## Umfang

Die Anwendung ist ein Frontend-Projekt. Bestellungen und Reservierungen werden nicht an ein Restaurant übermittelt. Es gibt keine Datenbank, Zahlungsabwicklung oder E-Mail-Anbindung. Warenkorb und Formulardaten bleiben nur während der aktuellen Seitennutzung erhalten; Neuladen setzt sie zurück. Google Maps wird erst nach einem bewussten Klick eingebunden.

## Bildmaterial

Das Ofenfoto wurde aus dem vorhandenen Projektmaterial übernommen und als WebP optimiert. Eine gesonderte Bildlizenz ist in den Ausgangsdateien nicht angegeben. Favicon und SVG-Illustrationen wurden für die Website erstellt.
