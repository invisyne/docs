---
title: Changelog
description: Versionshinweise für den Invisyne Companion.
---

## 1.1.0

*2026-04-16*

### Highlights

> Version 1.1.0 ergänzt den Companion um einen Run-Datenexport: Messdaten können über einen definierten Zeitraum als CSV-Datei heruntergeladen werden.

---

### Neue Funktionen

- **Run-Datenexport** — Messdaten lassen sich über einen neuen Run-Export als CSV-Datei herunterladen. Bei Zeitintervallen über 8 Stunden wird ein Hinweis angezeigt, da die Dateigröße und Dauer des Exports entsprechend zunehmen können. Der vollständige Signalpfad ist im Dateinamen enthalten, um Duplikate zu vermeiden.

### Fehlerbehebungen

Keine.

---

### Systemvoraussetzungen

| Anforderung    | Details                                                                 |
|----------------|-------------------------------------------------------------------------|
| Betriebssystem | Windows                                                                 |
| Netzwerk       | PC muss sich im selben lokalen Netzwerk (LAN) befinden wie das Edge-Gerät |
| Kompatibilität | Invisyne Edge ab Version 2.21                                           |

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

- **Daten-Backup & Export** — Gerätedaten (Konfigurationen, Logs) können gesichert und als CSV exportiert werden.

### Fehlerbehebungen

- **Geräte-Discovery auf allen Netzwerkadaptern** — Crawler wurden auf Systemen mit mehreren Netzwerkadaptern nicht zuverlässig erkannt. Die Discovery läuft nun stabil auf allen verfügbaren Adaptern ohne Windows-Firewall-Konflikt.

---

### Systemvoraussetzungen

| Anforderung    | Details                                                                 |
|----------------|-------------------------------------------------------------------------|
| Betriebssystem | Windows                                                                 |
| Netzwerk       | PC muss sich im selben lokalen Netzwerk (LAN) befinden wie das Edge-Gerät |
| Kompatibilität | Invisyne Edge ab Version 2.19                                           |
