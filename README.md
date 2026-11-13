# E&O Pizzeria

**Responsive Pizzeria-Website mit HTML, CSS und JavaScript · Enes Türksever**

## Die Aufgabe

Im Webentwicklungspraktikum sollte ich eine Pizzeria-Website planen und umsetzen. In meinem Pflichtenheft habe ich dafür die Seitenstruktur, die Funktionen und das Verhalten der Bestell- und Tischauswahl beschrieben.

Ziel war, dass Besucher das Angebot kennenlernen, ihre Essensauswahl zusammenstellen und passende Tische für einen Besuch auswählen können. Die Website sollte auf Smartphone, Tablet und Desktop verständlich bedienbar sein.

## So habe ich die Anforderungen umgesetzt

| Anforderung | Meine Umsetzung |
| --- | --- |
| Ein übersichtliches Speisenangebot | 40 Menüeinträge in den Kategorien Pizza, Pasta und Getränke; Suche nach Name und Beschreibung |
| Unterschiedliche Pizzagrößen und Preise | Auswahl zwischen 26 und 35 cm; jede Größe wird als eigene Warenkorbposition mit dem zugehörigen Preis geführt |
| Eine nachvollziehbare Bestellauswahl | Artikel hinzufügen, Mengen ändern und Positionen entfernen; Berechnung in ganzen Cent-Beträgen |
| Abholung und Lieferung unterscheiden | Passende Eingabefelder je Auswahl; Prüfung der benötigten Kontakt- und Adressangaben vor der Zusammenfassung |
| Tische für einen Besuch auswählen | Tischplan mit Datum, Uhrzeit und beispielhafter Belegung; Prüfung, ob die gewählten Tische genügend Plätze bieten |
| Den Standort finden | Standortbereich mit Routenplanung; die Google-Karte wird erst auf Wunsch geladen |
| Bedienung auf verschiedenen Geräten | Responsive Layouts, mobile Navigation, Tastaturbedienung und beschriftete Formulare und Dialoge |

## Gestaltung und technische Entscheidungen

Die Gestaltung greift das Thema Pizzeria mit Cremetönen, dunklem Grün, Tomatenrot, großer Serifenschrift und dezenten Pizza- und Pasta-Illustrationen auf. Speisekarte, Warenkorb und Tischwahl bilden die zentralen Bereiche der Website.

Umgesetzt habe ich die Website mit **HTML, CSS und JavaScript**. Menüeinträge, Berechnungen und Darstellung liegen in getrennten Modulen. So lassen sich Gerichte und Preise ändern, ohne die gesamte Oberfläche anzupassen. Nutzereingaben werden als Text ausgegeben; die Preisberechnung vermeidet Rundungsfehler durch ganze Cent-Beträge.

## Umfang der Anwendung

Das Projekt bildet die Auswahl und Eingabe im Browser ab. Es nimmt keine echten Bestellungen oder Reservierungen entgegen und speichert keine Formulardaten dauerhaft. Die Tischbelegung dient zur Demonstration der Auswahlregeln.

## Dokumentation

- [Pflichtenheft](docs/PFLICHTENHEFT.md)
- [Technischer Aufbau, lokale Vorschau und Tests](docs/WEITERENTWICKLUNG.md)
- [Prüfstand](docs/PRUEFUNG.md)

## Bildmaterial

Das Ofenfoto wurde aus dem vorhandenen Projektmaterial übernommen und als WebP optimiert. Eine gesonderte Bildlizenz ist in den Ausgangsdateien nicht angegeben. Favicon und SVG-Illustrationen wurden für die Website erstellt.
