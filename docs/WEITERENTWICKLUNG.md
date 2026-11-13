# Weiterentwicklung gegenüber den bereitgestellten Dateien

## Grundlage

Praktikum 1 enthält das Lastenheft und Menüvorlagen, Praktikum 2 den Webauftritt mit Pflichtenheft. Praktikum 3 dokumentiert eine separate WordPress-/CiviCRM-Aufgabe und wird nicht integriert. Die Originalarchive bleiben unverändert außerhalb dieses Projektordners.

## Änderungen in der neuen Fassung

| Vorher | Neue Umsetzung |
| --- | --- |
| Startseite lädt ein nicht vorhandenes PNG statt des gelieferten JPG | Korrekt referenziertes, komprimiertes WebP aus dem gelieferten Bild |
| Fehlerhafte Viewport-Angabe | Korrekte mobile Viewport-Konfiguration und abgestufte Layouts |
| Reservierungslogik greift auch auf Seiten ohne Datumsfeld zu | Eine gemeinsame Seite mit vorhandenen, beschrifteten Steuerelementen |
| Preise in Gleitkommazahlen und Mengen über globale Arrays | Cent-Beträge und Produkt-/Größenkombinationen als Schlüssel |
| Doppelte HTML-IDs und Inline-Handler | Eindeutige IDs und getrennte Ereignisbehandlung |
| Bei Buchung wird Datum nicht durchgehend geprüft | Zentrale Validierung von Datum, Uhrzeit, Tischwahl und Kapazität |
| Ausgewählte Tische bleiben bei Zeitraumänderung bestehen | Tischwahl wird bei Datum-/Uhrzeitwechsel zurückgesetzt |
| Starre Namens-/Straßenregeln | Namen mit internationaler Schreibweise und Hausnummern wie 12a möglich |
| Zahlungsoptionen ohne Anbindung erscheinen als Bezahlprozess | Abholung/Lieferung führt zu einer Auswahlübersicht ohne Zahlung |
| Direkt eingebundene Standortkarte | Eigener Standortbereich mit schematischer Vorschau; Google Maps lädt nach Klick; Link zur Routenplanung |
| Schwarz-orange Vorlage mit langen Formularfenstern | Eigenständige responsive Gestaltung, Warenkorbdialog und ruhiger Tischplan |

Die 40 Menüpositionen und 50 Preisvarianten der ursprünglichen Bestellseite bleiben erhalten. Schreibweisen wurden vereinheitlicht. Die Tischzahl bleibt bei den sechs Tischen des tatsächlich gelieferten Frontends; die davon abweichende Nennung von zehn Tischen im ursprünglichen Lastenheft wird nicht als implementiert behauptet.

Die neue Fassung wurde mit KI-Unterstützung erstellt. Sie ist als spätere Portfolio-Weiterentwicklung gekennzeichnet, nicht als damaliger unveränderter Abgabestand.

Die spätere Gestaltungsergänzung verwendet eigene SVG-Zeichnungen für Pizza, Pasta und Basilikum. Sternförmige Trenner wurden durch schlichte Linien ersetzt. Die Speisekarte nutzt große, transparente Pizza- und Pasta-Zeichnungen im Abschnittshintergrund; die einzelnen Produktkarten bleiben ruhig mit Nummer, Beschreibung und Auswahl. Der Standortbereich enthält kleine Lebensmittelillustrationen und ein zurückhaltendes Basilikum-Motiv im Hintergrund.
