---
title: Changelog
description: Versionshinweise für den Invisyne Hub.
---

## 1.4.0

*2026-06-24*

### Highlights

> Hub 1.4 stellt die Benutzeroberfläche auf das Invisyne Design System um, führt ein systemweites Änderungsprotokoll ein und legt im Hintergrund die Grundlage für die kommende DeepView-Integration.

---

### Neue Funktionen

- **Änderungsprotokoll** — Auf Detailseiten von Crawlern und Benutzern ist die jeweils letzte Änderung mit Zeitstempel sichtbar.
- **Aktualisiertes Design** — Die Hub-Benutzeroberfläche wurde auf das Invisyne Design System umgestellt und unterstützt jetzt vollständig Light- und Dark-Mode.
- **Zweisprachige Versionshinweise** — Versions-Highlights auf der Software-Download-Seite werden jetzt in Deutsch und Englisch angezeigt.

---

## 1.3.0

*2026-04-16*

### Highlights

> Version 1.3.0 überarbeitet den Software-Bereich grundlegend: Hauptversionen erhalten eine eigene Detailseite mit Highlights, Versionshistorie und Release Notes.
> Zusätzlich wird auf der Anmeldeseite ein Link zur Kontobeantragung bereitgestellt.

---

### Neue Funktionen

- **Überarbeiteter Software-Bereich** — Hauptversionen sind nun einzeln aufgeführt; eine Detailseite zeigt Highlights, die vollständige Versionshistorie sowie die Release Notes. Patch-Versionen erscheinen innerhalb der jeweiligen Detailansicht. Die Dateigröße wird direkt unter dem Download-Link angezeigt.

- **Kontobeantragung** — Auf der Anmeldeseite steht ein Link "Noch kein Konto?" zur Verfügung, über den eine Kontoerstellung per E-Mail angefragt werden kann.

### Fehlerbehebungen

Keine.

---

## 1.2.0

*2026-03-19*

### Highlights

> Version 1.2.0 verbessert den Software-Bereich im Kundenbereich: Das Veröffentlichungsdatum wird nun pro Version angezeigt, und die Darstellung wurde in mehreren Punkten korrigiert.

---

### Neue Funktionen

- **Veröffentlichungsdatum** — Im Software-Bereich wird das Veröffentlichungsdatum pro Firmware-Version angezeigt.

### Fehlerbehebungen

- **Download-Schaltfläche** — Der Download-Button wird ausgeblendet, wenn für eine Version kein Download verfügbar ist.

- **Versionsbezeichnung** — Die Bezeichnung im Software-Bereich zeigte unabhängig vom Release-Typ stets "Bug Fixes" an. Dies wurde korrigiert.

---

## 1.1.0

*2026-03-05*

### Highlights

> Mit Version 1.1.0 steht im Kundenbereich ein neuer Software-Downloadbereich zur Verfügung.
> Darüber hinaus wurde die Kontoverwaltung um eine Profilseite mit Passwortänderung ergänzt und der Registrierungsprozess um eine E-Mail-Bestätigung erweitert.

---

### Neue Funktionen

- **Software-Downloads** — Neuer Bereich "Software" mit einer Übersicht aller verfügbaren Edge- und Companion-Firmware-Versionen. Pro Version stehen Download, Dokumentation und Release Notes zur Verfügung.

- **Mein Konto** — Neue Profilseite zur Anzeige und Bearbeitung der eigenen Kontodaten sowie zur Änderung des Passworts.

- **E-Mail-Bestätigung** — Neu angelegte Benutzer müssen ihre E-Mail-Adresse bestätigen, bevor eine Anmeldung möglich ist.

### Fehlerbehebungen

Keine.

---

## 1.0.0

*2025-11-12*

### Highlights

> Erstes Release des Invisyne Hub — einer neuen webbasierten Plattform zur zentralen Verwaltung von Crawler-Flotten.
> Über eine rollenbasierte Weboberfläche lassen sich Edge-Geräte verwalten und installierte Firmware-Versionen nachverfolgen.
> Mit diesem Release steht die vollständige Kernfunktionalität für Geräte- und Benutzerverwaltung zur Verfügung.

---

### Neue Funktionen

- **Anmeldung** — Sichere Authentifizierung per JWT-Token; Login ist auch über einen Refresh Token möglich, sodass die Companion App dauerhaft mit dem Hub kommunizieren kann.

- **Geräteverwaltung** — Crawler können angelegt und bearbeitet werden. Eine Übersichts- und Detailansicht zeigt den aktuellen Status aller zugeordneten Geräte inkl. Standort und Notizen.

- **Benutzerverwaltung** — Eigene Benutzer lassen sich anlegen und deren Zugriffsrechte verwalten.

- **Oberfläche** — Neues UI/UX-Design, Sortier- und Filterfunktionen in allen Listen sowie Mehrsprachigkeit (Deutsch/Englisch).

### Fehlerbehebungen

- **Fehlerhafte Rückmeldung bei ungültigen Tokens** — Ungültige Zugangstokens lösten fälschlicherweise einen Serverfehler aus statt einer Authentifizierungsfehlermeldung.

---

### Technischer Anhang

#### Grundlegende Änderungen

Keine — Erstveröffentlichung.
