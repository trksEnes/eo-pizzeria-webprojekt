# Prüfstand

**Stand:** 13. November 2026 · **Umfang:** statische Frontend-Demo

## Automatisierte Prüfungen

Alle zehn Logiktests bestanden. Geprüft wurden Speisekartenvollständigkeit (40 Positionen / 50 Varianten), getrennte Pizzagrößen, exakte Cent-Summen, Mengenbegrenzung, ungültige und vergangene Kalendertage, Zeitauswahl, stabile Tischbelegung, Sitzplatzkapazität, Namen und Kontakt-/Lieferangaben.

Zusätzlich: JavaScript-Syntax geprüft, eindeutige HTML-IDs, gültige interne Sprungziele und vorhandene lokale Ressourcen. Warenkorb und Formulare enthalten keine Netzwerkaufrufe oder Speicher-APIs; Nutzereingaben werden nicht als HTML eingesetzt. Die später ergänzte Standortkarte wird erst nach Klick von Google eingebunden; die Routenplanung ist ein externer Link. Die neuen Textdateien wurden auf übernommene Namen anderer Beteiligter, interne Hochschul-Adressen und typische Zugangsdaten-Muster geprüft.

## Manuell im Browser geprüft

| Ablauf | Ergebnis |
| --- | --- |
| Zwei Margherita-Größen hinzufügen | Getrennte Positionen, zunächst 18,30 € |
| Kleine Margherita auf zwei Stück erhöhen | Gesamtbetrag 25,10 € |
| Lieferung ohne Pflichtangaben abschließen | Konkrete Fehlermeldung, keine Übersicht |
| Lieferung mit synthetischen Testdaten | Auswahlübersicht mit Artikeln, Mengen, Adresse und korrektem Betrag |
| Übersicht schließen und Warenkorb erneut öffnen | Leerer Warenkorb; vorherige Angaben entfernt |
| Kategorien wechseln und erfolglose Suche zurücksetzen | 10 Pizzen, 10 Pastagerichte, 20 Getränke; Rücksetzen funktioniert |
| Fünf Personen mit einem Tisch | Kapazitätsfehler |
| Fünf Personen mit zwei freien Tischen | Passende Reservierungsübersicht |
| Übersicht schließen | Name, E-Mail, Telefon und Tischwahl geleert |
| Uhrzeit wechseln und ursprüngliche Uhrzeit erneut wählen | Alte Tischwahl entfernt, ursprüngliche Beispielbelegung unverändert |
| Vergangenes Datum auswählen | Keine verfügbaren Uhrzeiten und keine auswählbaren Tische; Absenden abgewiesen |
| Seite mit gefülltem Warenkorb neu laden | Artikelzähler wieder null |
| Menü, Warenkorb und Escape mit Tastatur | Navigation/Dialoge schließen; Mengensteuerung behält den Fokus |
| Datenschutzdialog | Erläutert die flüchtige Verarbeitung und fehlende Restaurantübertragung |

Ansichten bei 360, 390, 768 und 1440 CSS-Pixeln geprüft: kein horizontaler Seitenüberlauf. Speisekarte, Dialog und Tischplan wurden auf schmaler Ansicht visuell geprüft. Das Ofenfoto wird geladen. In den erfassten Browsermeldungen waren keine JavaScript-Fehler oder Warnungen vorhanden.

## Grenzen

- Keine Prüfung auf physischer Smartphone-Hardware oder in sämtlichen Browsern; kein vollständiges Barrierefreiheits-Audit.
- Feiertage und reale Verfügbarkeit sind nicht angebunden; die Zeitauswahl unterscheidet Werktag und Wochenende.
- Es wurden keine echten Bestellungen, Zahlungen oder Reservierungen ausgelöst. Diese Funktionen haben bewusst keine Restaurantanbindung.
- Das ursprüngliche Quellenmaterial wurde nicht verändert. Es ist nicht Bestandteil des zur Weitergabe vorbereiteten Projektpakets.

## Aktueller Gestaltungsstand

Die Speisekarte verwendet große dekorative Pizza- und Pasta-Konturen im Hintergrund; Produktkarten zeigen Nummern, Beschreibung und Auswahl. Im Standortbereich bleiben die Lebensmittelillustrationen und das Basilikum-Motiv erhalten. Die vier Bannerbegriffe stehen in gleich breiten, zentrierten Feldern; mobil in zwei Reihen. Abholung und Lieferung verwenden schlichte Taschen- und Lieferwagen-Symbole.

Diese Anpassungen wurden bei 741 und 360 CSS-Pixeln ohne horizontalen Seitenüberlauf geprüft. Die optionale Karte lädt erst nach Klick. Hosting erfolgt statisch über GitHub Pages; es gibt weiterhin keine Bestell- oder Reservierungsanbindung.
