# E&O Pizzeria

Eine responsive Pizzeria-Website mit Speisekarte, Warenkorb, Abhol- und Lieferauswahl sowie einer interaktiven Tischauswahl. **Portfolio-Weiterentwicklung eines bestehenden Hochschul-Testatprojekts.**

[Website ansehen](https://trksEnes.github.io/eo-pizzeria-webprojekt/) · [Pflichtenheft](docs/PFLICHTENHEFT.md) · [Prüfstand](docs/PRUEFUNG.md)

## Projektkontext und Urheberschaft

Das ursprüngliche Hochschulprojekt von Enes Türksever umfasste die Anforderungsplanung und die Umsetzung einer Pizzeria-Website. Grundlage dieser Weiterentwicklung sind das eigene Lastenheft, das Pflichtenheft und die HTML-/CSS-/JavaScript-Dateien aus den Praktika 1 und 2.

Die aktuelle Fassung wurde im November 2026 mit KI-Unterstützung neu gestaltet und technisch überarbeitet. Die neue Gestaltung, die modularisierte Logik und die Tests gehören zur Weiterentwicklung; sie werden nicht als unveränderte damalige Prüfungsabgabe dargestellt. Praktikum 3 (WordPress/CiviCRM) ist ein eigenständiges Thema und nicht Bestandteil dieses Projekts.

## Lokal ansehen

Voraussetzung: Python 3. Keine Installation von Bibliotheken notwendig.

```sh
python3 tools/preview.py
```

Danach `http://127.0.0.1:8765` öffnen. Mit `Strg+C` beenden. Alternativ kann `dist/` von einem beliebigen statischen Webserver ausgeliefert werden. ES-Module benötigen HTTP; ein Doppelklick auf die HTML-Datei ist nicht der vorgesehene Startweg.

## Was funktioniert

- 40 Menüeinträge mit insgesamt 50 Preisvarianten aus der damaligen Bestellseite.
- Kategorien Pizza, Pasta und Getränke sowie Suche innerhalb der aktiven Kategorie.
- Pizzen mit 26 oder 35 cm, getrennte Warenkorbpositionen pro Größe.
- Mengenänderung, Entfernen, leere Zustände und Preisberechnung in ganzen Cent-Beträgen.
- Abholung oder Lieferung mit jeweils passenden Eingabefeldern und Validierung.
- Tagesabhängige Zeitauswahl, sechs Tische mit je vier Plätzen und bis zu zwei auswählbare Tische.
- Reproduzierbare Beispielbelegung je Datum und Uhrzeit; Prüfung der Sitzplatzanzahl.
- Zusammenfassungen der Bestell- und Reservierungsauswahl.
- Standortbereich mit Google Maps nach Klick und externer Routenplanung.
- Mobile Navigation, Tastaturbedienung, beschriftete Formularfelder und native Dialoge.

## Bewusste Abgrenzung

**Dies ist eine Frontend-Demo. Es werden keine Bestellungen, Zahlungen oder Reservierungen angenommen.** Die abschließenden Ansichten sind Zusammenfassungen der eingegebenen Auswahl, keine Zusagen eines Restaurants.

Es gibt keine Datenbank, keinen API-Endpunkt und keine E-Mail- oder Zahlungsanbindung. Warenkorb, Auswahl und Eingaben existieren nur flüchtig auf der aktuellen Seite. Die Anwendung selbst verwendet weder `localStorage` noch `sessionStorage`, Cookies oder IndexedDB. Für die nach Klick geladene Google-Karte gelten zusätzlich die Datenverarbeitung und Speichermechanismen des Kartenanbieters. Neuladen setzt den Zustand zurück. Beim Schließen der Übersichten werden die dafür verwendeten personenbezogenen Angaben gelöscht.

Ein statischer HTTP-Server liefert die Dateien aus; er ist keine Bestell- oder Reservierungsanwendung. Ein Produktivbetrieb würde eine eigenständige Backend-, Datenschutz-, Zahlungs- und Betriebsplanung benötigen.

## Technik und Aufbau

| Datei | Aufgabe |
| --- | --- |
| `dist/index.html` | Semantische Seitenstruktur, Formulare und Dialoge |
| `dist/style.css` | Gestaltungsvariablen, responsive Layouts und Zustände |
| `dist/menu.mjs` | Speisekartendaten und Preisvarianten |
| `dist/logic.mjs` | Getrennt prüfbare Warenkorb-, Datums- und Validierungslogik |
| `dist/app.mjs` | DOM-Darstellung und flüchtiger Anwendungszustand |
| `tests/logic.test.mjs` | Automatisierte Tests für zentrale Regeln |
| `docs/PFLICHTENHEFT.md` | Aktualisierte Anforderungen und Abnahmekriterien |
| `docs/WEITERENTWICKLUNG.md` | Änderungen gegenüber den gelieferten Dateien |
| `docs/PRUEFUNG.md` | Prüfstand, Browserabläufe und bekannte Grenzen |

Die Website benötigt keine JavaScript-Bibliotheken, externen Schriften oder Analysewerkzeuge. Die optionale Google-Maps-Einbettung lädt erst nach einem bewussten Klick; zuvor bleibt eine lokal gezeichnete schematische Vorschau sichtbar. Die Routenplanung öffnet Google Maps extern. Die Markierung wurde aus der ursprünglichen Vorlage übernommen; eine reale Restaurantadresse wurde nicht neu verifiziert oder ergänzt. Nutzereingaben werden mit `textContent` dargestellt, nicht als HTML eingesetzt.

## Veröffentlichung

Der Quellstand liegt auf `main`. GitHub Pages liefert den Inhalt von `dist/` über den Veröffentlichungsbranch `gh-pages` aus. Änderungen am Quellstand müssen auch in diesen Branch übernommen werden. Der Branch enthält ausschließlich die statischen Website-Dateien und `.nojekyll`.

## Tests

Mit Node.js ab Version 20:

```sh
node --test tests/*.test.mjs
```

Die Tests prüfen unter anderem unterschiedliche Pizzagrößen, exakte Summen, Mengenbegrenzungen, ungültige Daten, Tageswechsel, vergangene Uhrzeiten, reproduzierbare Belegung und abgewiesene Reservierungs-/Bestellangaben. Ein erfolgreicher Test dieser Regeln ersetzt keine Prüfung einer echten Restaurantanbindung – eine solche gibt es hier nicht.

## Bildquelle

`dist/assets/pizza-ofen.webp` ist eine für die Webdarstellung verkleinerte und komprimierte Fassung des gelieferten Bildes `banner-bild.jpg` aus Praktikum 2. Der ursprüngliche Fotograf und die ursprüngliche Lizenz sind in den gelieferten Dateien nicht dokumentiert. Das Bild wurde aus dem bereitgestellten Projektmaterial übernommen; eine gesonderte Bildlizenz wird durch dieses Repository nicht erteilt. Die Bilddatei enthält keine übernommenen EXIF-Metadaten. Das Favicon und die einfachen grafischen Elemente sind für diese Weiterentwicklung erstellt.

Die originalen ZIP-Dateien, Installationsanleitungen, PDFs, Zugangsdaten und persönlichen Angaben aus anderen Praktika sind nicht Bestandteil dieses Projektordners.
