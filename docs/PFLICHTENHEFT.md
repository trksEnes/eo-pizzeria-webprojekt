# Pflichtenheft – E&O Pizzeria

**Autor:** Enes Türksever

Dieses Pflichtenheft beschreibt die Anforderungen und die technische Umsetzung der Pizzeria-Website.

## 1. Ziel

Die Website stellt eine Pizzeria mit Speisekarte und Öffnungszeiten dar. Besucher können ihre Essensauswahl zusammenstellen und eine Tischkonstellation auswählen. Die Bedienung soll auf Smartphone, Tablet und Desktop nachvollziehbar funktionieren.

## 2. Systemgrenzen

Die Umsetzung besteht aus statischen Dateien und JavaScript im Browser. Ein HTTP-Server ist nur für die Dateiauslieferung erforderlich. Es werden keine Restaurantprozesse ausgelöst. Insbesondere gibt es keine dauerhafte Speicherung, Datenbank, API, Zahlung, E-Mail-/SMS-Bestätigung, tatsächliche Tischbelegung oder Weitergabe an ein Restaurant. Die eigene Anwendung setzt keine Browser-Speicher ein. Die optionale Google-Karte ist ein separat nach Klick eingebundener Drittanbieterdienst.

## 3. Seitenstruktur und Gestaltung

- Eine gemeinsame Seite mit Sprungnavigation zu Start, Speisekarte, Reservierung, Besuchsinformationen und Standort.
- Eigenständige Pizzeria-Gestaltung mit Cremetönen, dunklem Grün, Tomatenrot, großer Serifenschrift, vorhandenem Ofenfoto und eigenen Lebensmittelillustrationen.
- Die ursprünglichen Farben dienen als Ausgangspunkt, werden aber für die neue Gestaltung angepasst.
- Warenkorb und Zusammenfassungen erscheinen in Dialogen; Eingaben werden nicht durch Seitenwechsel verloren.

## 4. Funktionale Anforderungen

| ID | Anforderung | Abnahmekriterium |
| --- | --- | --- |
| F01 | Alle vorhandenen Menüpositionen darstellen | 10 Pizzen mit je zwei Größen, 10 Pastagerichte und 20 Getränkepositionen; insgesamt 50 Preisvarianten |
| F02 | Kategorien und Suche | Kategorieumschaltung aktualisiert die Liste; Suche berücksichtigt Name und Beschreibung innerhalb dieser Kategorie; leere Trefferliste hat Rücksetzfunktion |
| F03 | Größe auswählen | 26 und 35 cm erhalten eigene Preise und getrennte Warenkorbpositionen |
| F04 | Warenkorb bearbeiten | Hinzufügen, Erhöhen, Verringern und Entfernen funktionieren; 0 entfernt die Position; maximal 20 Stück pro Variante |
| F05 | Preise korrekt berechnen | Rechnung mit ganzen Cent-Beträgen; Ausgabe als deutsches Euroformat |
| F06 | Abholung und Lieferung auswählen | Abholung erfordert einen Namen; Lieferung zusätzlich E-Mail, Telefon und vollständige Adresse; ausgeblendete Lieferfelder sind deaktiviert |
| F07 | Eingaben prüfen | Fehlende/ungültige Angaben zeigen eine konkrete Meldung; Namen mit Umlauten, Bindestrich oder Apostroph bleiben möglich; Hausnummern können Buchstaben enthalten |
| F08 | Bestellauswahl zusammenfassen | Nach gültigen Angaben werden Artikel, Mengen, Erfüllungsart und Betrag dargestellt; kein Netzwerkversand; keine tatsächliche Bestätigung eines Restaurants |
| F09 | Datum und Uhrzeit wählen | Keine vergangenen Daten; heutige vergangene Uhrzeiten werden nicht angeboten; Zeitauswahl folgt Werktag oder Wochenende |
| F10 | Tischbelegung darstellen | Sechs Tische mit vier Sitzplätzen; ein bis drei beispielhaft belegte Tische je Zeitraum; gleicher Zeitraum erzeugt gleiche Belegung |
| F11 | Tischwahl prüfen | Ein oder zwei freie Tische auswählbar; bis acht Personen; ausgewählte Sitzplätze reichen aus; bei Zeitraumwechsel wird Auswahl zurückgesetzt |
| F12 | Reservierungsauswahl zusammenfassen | Name, Tag, Uhrzeit, Personenzahl und Tische anzeigen; keine tatsächliche Buchung oder externe Übertragung |
| F13 | Mobile Navigation | Menüknopf öffnet Navigation und gibt Zustand aus; Links und Escape schließen das Menü |
| F14 | Flüchtiger Zustand | Keine Speicher- oder Tracking-APIs für Warenkorb/Formulare; Neuladen setzt alles zurück; Eingaben einer abgeschlossenen Übersicht werden beim Schließen gelöscht |
| F15 | Standortkarte | Schematische lokale Vorschau, Google Maps erst nach Klick; beschrifteter Kartenrahmen und externer Link zur Routenplanung; Markierung aus der ursprünglichen Vorlage |

## 5. Zeitfenster

Die Öffnungszeiten aus der Vorlage lauten: Montag bis Freitag 16:30–21:30 Uhr, Samstag und Sonntag 14:00–21:30 Uhr, Feiertage 17:30–21:30 Uhr.

Für die Bedienprobe werden werktags 16:30, 17:30, 18:30, 19:30 und 20:30 Uhr angeboten, am Wochenende 14:00 bis 21:00 Uhr in Stundenschritten. Eine Feiertagsdatenbank, Aufenthaltsdauer, Tischzusammenlegung im echten Raum und tatsächliche Restaurantverfügbarkeit sind nicht implementiert. Diese Grenzen sind Teil der Demo-Abgrenzung.

Die Lieferschätzung 30–55 Minuten und Abholung ab etwa 30 Minuten stammen aus der Vorlage. Sie sind illustrative Angaben dieser Website.

## 6. Nicht funktionale Anforderungen

- **Responsivität:** Bedienbare Ansicht ab 360 CSS-Pixeln, kein horizontaler Seitenüberlauf.
- **Zugänglichkeit:** Semantische Überschriften, Alternativtext, Beschriftungen, sichtbarer Fokus, native Dialoge und verringerte Bewegung bei entsprechender Systemeinstellung.
- **Datensparsamkeit:** Keine persistente Speicherung von Formulardaten, keine Analysewerkzeuge und keine eingebundenen Drittanbieter-Schriften. Die optionale Google-Karte lädt erst nach Klick mit Hinweis auf die Verbindung zu Google.
- **Wartbarkeit:** Menü als Datenmodul; zentrale Gestaltungsvariablen; Logik getrennt von DOM und Darstellung.
- **Leistung:** Bild für die Webnutzung optimiert; kein Framework-Bundle und keine externen Laufzeitabhängigkeiten.
- **Sicherheit der Darstellung:** Nutzereingaben nicht als HTML interpretieren; keine Zugangsdaten im auszuliefernden Verzeichnis.

## 7. Nachweise und Abnahme

Automatisierte Logiktests und manuelle Browserprüfungen sind getrennte Nachweise. Die Abnahme umfasst mindestens:

1. Zwei unterschiedlich große Pizzen auswählen und korrekte Summe prüfen.
2. Menge verändern, Position entfernen und leeren Warenkorb ansehen.
3. Lieferung ohne Adresse zurückweisen; anschließend gültige Bestellübersicht prüfen.
4. Belegten Tisch nicht auswählen können; für fünf bis acht Personen zwei Tische verlangen.
5. Vergangenes Datum sowie eine ungültige Uhrzeit zurückweisen.
6. Gleichen Zeitraum erneut wählen: Belegung bleibt gleich, alte Auswahl bleibt nicht bestehen.
7. Namen mit Umlaut, Apostroph und Bindestrich zulassen; Zeichenketten nicht als HTML ausführen.
8. Nach Neuladen leeren Zustand prüfen.
9. Desktop- und Smartphoneansicht mit Tastatur und Dialogschließung überprüfen.

## 8. Nicht Bestandteil

Benutzerkonten, Zahlungsanbieter, Versand, Stornierungen und ein Backend gehören nicht zum Funktionsumfang. Die Website bildet ausschließlich die Auswahl und Eingabe im Browser ab.
