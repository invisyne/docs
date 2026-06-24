---
title: Changelog
description: Versionshinweise für den Invisyne Companion.
---

## 1.2.0

*2026-06-24*

### Highlights

> Version 1.2.0 ermöglicht für die Nutzung von DeepView ein optionales Login über den Invisyne Hub und speichert Sitzungsdaten sicher lokal.
> Runs lassen sich nun in einen DeepView-Workspace hochladen und dort analysieren.
> Zudem wurde ein Anzeigefehler auf der Updater-Seite bei fehlgeschlagenen Updates behoben.

---

### Neue Funktionen

- **Hub-Anmeldung** — Die Anmeldung erfolgt über die Hub-Zugangsdaten. Die Anmeldeseite entspricht dem Design des Hubs. Anmeldeinformationen können lokal verschlüsselt gespeichert werden, sodass sie bei erneutem Öffnen der Anwendung erhalten bleiben.

- **DeepView-Integration** — Runs und Zeitraum basierte Datenexporte können direkt aus dem Companion in den kundeneigenen DeepView-Workspace hochgeladen werden.

### Fehlerbehebungen

- **Updater-Seite zeigte falschen Erfolgsstatus** — Nach einem fehlgeschlagenen Crawler-Update wurde auf der Updater-Seite fälschlicherweise „Erfolgreich" angezeigt, während die Hauptansicht den Fehler korrekt auswies. Der angezeigte Status ist nun in beiden Ansichten konsistent.

---

### Voraussetzungen

- Für DeepView wird ein Abonnement benötigt.

---

## 1.1.0

*2026-04-16*

### Highlights

> Version 1.1.0 ergänzt den Companion um einen Run-Datenexport: Messdaten können über einen definierten Zeitraum als CSV-Datei heruntergeladen werden.

---

### Neue Funktionen

- **Run-Datenexport** — Messdaten lassen sich über einen neuen Run-Export als CSV-Datei herunterladen.

- **Neues CSV-Export-Format** — Alle CSV-Exporte (Run-Export und Zeitraum-Export) verwenden ab Version 1.1.0 ein einheitliches Breitformat: eine Zeitspalte gefolgt von einer Spalte pro konfiguriertem Messpunkt. Zwei Kopfzeilen — eine Kurzbezeichnung und der vollständige Datenpfad — ermöglichen die eindeutige Zuordnung bei gleichnamigen Messpunkten. Als Spaltentrennzeichen wird „;" verwendet, Dezimalzeichen ist „.". Das Format ist für die direkte Verwendung in Excel optimiert. Beim Zeitraum-Export entfällt die bisherige Dateigrößenbegrenzung — alle Daten werden in eine einzige Datei geschrieben.

### Fehlerbehebungen

Keine.

---

### Voraussetzungen

- Runs sind nur auf Crawlern ab Version 2.21 verfügbar.

---

## 1.0.2

*2026-03-27*

### Highlights

> Erstes Release des Invisyne Companion — einer Windows-Desktop-Applikation zur lokalen Verwaltung von Invisyne Edge-Geräten im Netzwerk.
> Geräte im selben lokalen Netzwerk werden automatisch erkannt und in einer einheitlichen Geräteliste angezeigt.

---

### Neue Funktionen

- **Geräte-Discovery** — Automatische Suche und Auflistung aller Invisyne Edge-Geräte im selben lokalen Netzwerk. Geräte lassen sich ohne manuelle IP-Eingabe auffinden und identifizieren.

- **Lokales Management** — Netzwerk-Parameter (IP-Adresse, DNS, Gateway) können direkt gesetzt werden. Live-Status und technische Gerätedaten sind abrufbar; ein Direktsprung in die WebUI des Geräts ist möglich.

- **Firmware & Software-Updates** — Firmware- und Software-Updates lassen sich direkt auf den Edge-Geräten installieren.

- **Messdaten-Export** — Konfigurierte Messpunkte lassen sich über einen wählbaren Zeitraum als CSV exportieren. Überschreitet der Exportzeitraum die einstellbare Maximaldauer pro Datei, werden automatisch mehrere Dateien erstellt. Die CSV-Dateien verwenden ein eigenes Format mit den Spalten Zeit, Signal und Wert.

### Fehlerbehebungen

- **Geräte-Discovery auf allen Netzwerkadaptern** — Crawler wurden auf Systemen mit mehreren Netzwerkadaptern nicht zuverlässig erkannt. Die Discovery läuft nun stabil auf allen verfügbaren Adaptern ohne Windows-Firewall-Konflikt.

---

### Voraussetzungen

| Anforderung    | Details                                                                                                                                     |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Betriebssystem | Windows 10, 11                                                                                                                              |
| Netzwerk       | PC muss sich physisch im selben Netzwerk befinden wie das Edge-Gerät                                                                        |
| Kompatibilität | Für Updater und vollständige Netzwerkkonfiguration wird ein Crawler ab Version 2.18 benötigt                                                 |
