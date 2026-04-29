---
title: Changelog
description: Versionshinweise für den Invisyne Edge.
---

## 2.21.0

*2026-04-16*

### Highlights

> Version 2.21.0 bringt einen vollständigen Run-Datenexport: Messdaten lassen sich über konfigurierbare Runs als CSV herunterladen. Ergänzend ermöglicht ein neuer Gateway-Reconnect-Mechanismus die manuelle Wiederherstellung von Verbindungen direkt aus der Benutzeroberfläche.

---

### Neue Funktionen

- **Run-Export** — Runs lassen sich als CSV-Datei herunterladen. Die Oberfläche zeigt alle abgeschlossenen Durchläufe und bietet direkten Download-Zugriff auf die exportierten Daten.
- **Run-Konfiguration** — Runs lassen sich über die Oberfläche anlegen und konfigurieren. Unterstützte Trigger-Typen: Alarm-Trigger (mit Vorlauf- und Nachlaufzeit), externer Trigger (Start & Stop), Zeit-Trigger (Start & Stop) sowie Intervall-Trigger. Bestehende Konfigurationen können aktiviert und deaktiviert werden.
- **Variablenpfad in Run-Konfiguration** — Run-Variablen unterstützen jetzt einen zusätzlichen Parameter für den vollständigen Gruppenpfad zur Variable (z. B. `Gerät3/Gruppe2/Variable12`).
- **Gateway Endpoint Reconnect** — Bei Verbindungsproblemen lässt sich die Verbindung eines Gateway-Endpoints manuell über die Oberfläche erzwingen. Vor dem Reconnect wird die Broker-Konfiguration aktualisiert. Verbindungsstatus und Endpoint-Details sind direkt einsehbar.
- **Gateway Insights: Erweiterte Systemdaten** — Das System übermittelt jetzt zusätzliche Geräteinformationen an den Hub: Geräte-ID, Softwareversion, MAC-Adressen, Hersteller, Seriennummer sowie den verfügbaren Speicherplatz der Datenbank-Partition.

### Fehlerbehebungen

- **Run ohne Variablen** — Ein Run ohne definierte Prozessvariablen führte beim CSV-Export zu einem Fehler. Der Run wird nun nicht mehr aktiv geschaltet, wenn keine Variablen hinterlegt sind.
- **E-Mail-Benachrichtigungen bei Alarmen** — E-Mail-Benachrichtigungen für Grafana-Alarme konnten nach Version 2.18 nicht mehr gesendet werden, da der zugrunde liegende Systemdienst nicht mehr verfügbar war. Der Gerätename wird nun korrekt über den neuen OS-Dienst ermittelt.
- **Run Intervall-Initialisierung** — Runs vom Typ Intervall wurden beim Anlegen nicht korrekt initialisiert: Die Startzeit wurde nicht gesetzt und der erste Datensatz wurde übersprungen.

---

### Technischer Anhang

#### Komponentenversionen

| Gruppe   | Komponente          | Version   | Hinweise |
|----------|---------------------|-----------|----------|
| Web UI   | Advanced            | 4.10.13   |          |
| App      | Batching            | 1.0.0     | Neu      |
| Core     | Notification Hub    | 1.1.0     |          |
| Gateway  | Endpoint AWS        | 1.5.2     |          |
| Gateway  | Dispatcher Insights | 1.11.7    |          |
| System   | Proxy               | 1.20-2.21 |          |
| Host     | Docker Config       | 1.0.2     |          |

#### Grundlegende Änderungen

- **Neustart erforderlich** — Dieses Update löst automatisch einen Neustart des Geräts aus. Beim Update von Version 2.20 wird zudem geprüft, ob die notwendigen DEB Crawler Packs installiert sind.

---

## 2.20.0

*2026-03-03*

> **Hinweis: Systemneustart erforderlich**
> Dieses Update erfordert einen Systemneustart. Der Neustart kann zu einem beliebigen Zeitpunkt durchgeführt werden, muss jedoch vor einem weiteren Update erfolgen.
>
> Das Update beinhaltet eine Vorab-Validierung der installierten Pakete (Voraussetzung: Version 2.19). Schlägt die Validierung fehl, wird der Update-Vorgang abgebrochen — es werden keine Änderungen vorgenommen.

---

### Highlights

> Version 2.20.0 führt den OPC UA Konnektor ein: Anbindung an OPC-UA-fähige Geräte mit gesicherter Verbindung, Variablen-Explorer und Statusanzeige. Mehrere Fehlerbehebungen im OPC- und Gateway-Bereich verbessern die Stabilität.

---

### Neue Funktionen

- **OPC UA Konnektor** — Anbindung an OPC-UA-fähige Geräte ist jetzt möglich. Der Konnektor unterstützt die graduelle Exploration des Gerätevariablenbaums (kein Vorladen der Gesamtstruktur), gesicherte Verbindungen mit Passwort-Authentifizierung sowie alle gängigen Daten- und Zugriffstypen (Bool, String, DateTime, Array u. a.).
- **OPC Quick Insights** — Verbindungsstatus, Fehler- und Warnmeldungen des OPC-Konnektors werden in der Quick-Insights-Ansicht angezeigt, analog zum Simatic-Konnektor.
- **OPC Performance-Test** — Der Performance-Test-Button für den OPC-Konnektor ist jetzt aktiv und liefert valide Testergebnisse.
- **Geräte-ID (Crawler-ID)** — Jedes Gerät erhält eine eindeutige UUID, die über die Systeminfo-Route bereitgestellt wird. Diese ID ermöglicht die zuverlässige Zuordnung des Geräts in Hub und Companion.
- **Updater: Subversionen** — Update-Bundles können jetzt eine Subversion setzen, ohne die Hauptversion anzuheben. Dies ermöglicht das Nachrüsten einzelner Komponenten oder Sonderfunktionen.

### Fehlerbehebungen

- **OPC: Passwortänderung am Gerät** — Eine Passwortänderung am OPC-Gerät wurde nach dem ersten Mal ignoriert und erst nach einem Container-Neustart wirksam. Die Ursache lag in einer fehlerhaften Deduplizierung von Konfigurationsnachrichten.
- **OPC: Rekonfiguration von Variablen** — Änderungen an Variablen (z. B. Intervall, Aktivierung) wurden vom Konnektor nicht übernommen. Konfigurationsevents werden jetzt korrekt verarbeitet.
- **OPC: Fehlerhaftes Performance-Test-Ergebnis** — Der Performance-Test lieferte kein valides Ergebnis, wenn die Abtastrate nicht erreicht werden konnte. Das Ergebnis wird nun korrekt als fehlgeschlagen ausgewiesen.
- **OPC Quick Insights: Unverständliche Meldungen** — Statusmeldungen bei Verbindungs- und Passwortproblemen waren teilweise unverständlich formuliert. Die Meldungen wurden überarbeitet und an das Format des Simatic-Konnektors angeglichen.
- **Gateway: Senden-Schalter erforderte Neustart** — Der Schalter im MX-Dispatcher-Bereich zum Steuern des Sendevorgangs wurde erst nach einem Geräteneustart wirksam. Die Änderung wird jetzt sofort übernommen.

---

### Technischer Anhang

#### Komponentenversionen

| Komponente                      | Version          | Hinweise |
|--------------------------------|------------------|-------|
| OS Image                       |                  |       |
| Web UI Advanced                | 4.9.20           |       |
| Web UI API                     | 1.24.1           |       |
| Source Control (SourceConfig)  | 1.3.1            |       |
| Gateway Manager                | 1.10.0           |       |
| Host Updater                   | 2.4.0            |       |
| Host Proxy                     | 1.20-20260217    |       |
| Source OPC                     | 1.7.2            |       |

#### Grundlegende Änderungen

- Upgrade nur von **v2.19** unterstützt. Stelle sicher, dass v2.19 vollständig installiert ist, bevor dieses Update angewendet wird.

---

## 2.19.0

*2026-01-30*

> **Hinweis: Automatischer Neustart**
> Dieses Update startet das Gerät direkt automatisch neu, da für den zweiten Installationsschritt der neue Updater benötigt wird.
>
> Das Update beinhaltet eine Vorab-Validierung der installierten Pakete (Voraussetzung: Version 2.18). Schlägt die Validierung fehl, wird der Update-Vorgang abgebrochen — es werden keine Änderungen vorgenommen.

---

### Highlights

> Version 2.19.0 bringt umfangreiche Verbesserungen am Simatic-Konnektor: schnellerer Verbindungsaufbau, graduelle Exploration ohne Vorladen der Gesamtstruktur und optimierter RAM-Verbrauch. Die Bedienoberfläche wurde um Statusabhängigkeiten und eine klarere Variablenstruktur erweitert.

---

### Neue Funktionen

- **Simatic: Graduelle Exploration** — Die Variablenstruktur eines Simatic-Geräts wird jetzt schrittweise geladen, ohne die Gesamtstruktur vorab herunterzuladen. Dies verhindert Abstürze bei großen Programmstrukturen und reduziert den RAM-Verbrauch deutlich.
- **Simatic: Direkte Datenbaustein-Adressierung** — Datenbausteine sind jetzt ohne überlagerte Gruppenebenen direkt zugänglich.
- **UI: Variablenstruktur** — Arrays werden im Variablen-Explorer explizit als Arrays gekennzeichnet (Anzeige der Arraygröße). Datenbausteine und Gruppenstrukturen werden alphanumerisch sortiert.
- **UI: Statusabhängige Steuerungssperre** — Performance-Test und Import-von-Gerät-Funktion sind gesperrt, solange keine Verbindung zum Gerät besteht.
- **Konfigurationsmigration** — Für Geräte mit bestehender Variablenkonfiguration steht ein separates Update-Paket zur Verfügung, das die Konfiguration auf das neue Simatic-Format migriert. Hinweis: Nach der Migration müssen Grafana-Dashboards neu konfiguriert werden.
- **Updater: Skriptausführung** — Das Update-System unterstützt jetzt Pre- und Post-Installationsskripte, die als Teil eines Update-Bundles ausgeführt werden.

### Fehlerbehebungen

- **Simatic: Langsamer Verbindungsaufbau** — Der Verbindungsaufbau zur SPS konnte bei manchen Geräten bis zu 5 Minuten dauern. Verbindungsaufbau und Statusanzeige wurden vollständig überarbeitet.
- **Simatic: Performance-Test lieferte ungültige Ergebnisse** — Der Performance-Test gab bei nicht erreichbarer Abtastrate keine validen Ergebnisse zurück. Ergebnisse und Codestruktur wurden überarbeitet.
- **Simatic: Passwortschutz beim Anlegen immer aktiv** — Beim Anlegen eines neuen Simatic-Geräts war der Passwortschutz stets vorausgewählt, auch wenn kein Passwort angegeben wurde.
- **Simatic: Deaktivierte Exclude-List ignorierte Variablen** — Eine deaktivierte Exclude-List führte dazu, dass vorübergehend nicht verfügbare Variablen dauerhaft ignoriert wurden. Die Exclude-List ist jetzt immer aktiv und über konfigurierbare Parameter einstellbar.
- **Simatic: Health-Status bei falschem Passwort** — Nach einer Passwortänderung mit falschem Passwort wurde der Health-Status nicht korrekt auf „Unhealthy" gesetzt. Erst ein Neustart des Konnektors stellte den korrekten Zustand wieder her.
- **NTP: Dienst nach Neustart inaktiv** — Der NTP-Dienst schaltete sich nach einem Systemneustart ab.

---

### Technischer Anhang

#### Komponentenversionen

| Komponente                          | Version       | Notes             |
|------------------------------------|---------------|-------------------|
| OS Image                           |               |                   |
| Web UI Advanced                    | 4.9.17        |                   |
| Source Control (SourceConfig)      | 1.3.0         |                   |
| Host DateTime                      | 1.3.2         |                   |
| Host Updater                       | 2.2.1         |                   |
| Host Dockerenvironment             | 1.0.1         |                   |
| Source Simatic                     | 4.4.2         |                   |
| APP Redprocessor                   | 0.1.0         | newly registered  |
| APP Redprocessor Browser           | 1.0           | newly registered  |
| Source Modbus                      | 3.5.1         | newly registered  |
| Core Gateway Manager               | 1.9.7         | newly registered  |
| Core Auth                          | 1.1.1         | newly registered  |
| Core Database Management           | 1.2.6         | newly registered  |
| Core Grafana Connector             | 1.3.2         | newly registered  |
| Core Notification Hub              | 1.0.21        | newly registered  |
| Core Source Info                   | 1.0.0         | newly registered  |
| Core Struct Import CSV             | 1.2.2         | newly registered  |
| Core Struct Registry               | 1.11.0        | newly registered  |
| Core Struct Templates              | 1.0.5         | newly registered  |

#### Grundlegende Änderungen

- Upgrade nur von **v2.18** unterstützt.
- Nach dem Einspielen des optionalen Konfigurations-Migrations-Pakets müssen Grafana-Dashboards neu konfiguriert werden.

---

## 2.18.2

*2025-12-05*

> **Kritischer Patch — Updater**
> Abhängig von der eingesetzten Hardware konnten größere Update-Pakete nicht vollständig hochgeladen werden. Der Upload brach mit einem Timeout ab.

---

### Highlights

> Version 2.18.2 behebt ein Problem, bei dem der Upload größerer Update-Pakete je nach Hardware mit einem Timeout abbrach. Ein vollständiger Fix des zugrundeliegenden Problems im API-Service erfolgt in Version 2.19.

---

### Fehlerbehebungen

- **Updater: Upload größerer Pakete schlug fehl** — Abhängig von der Hardware-Ausstattung führte die hohe Systemauslastung während des Uploads dazu, dass der Vorgang mit einem Timeout abbrach und das Update-Paket nicht vollständig übertragen wurde. Der Upload wird nun direkt an den Updater-Dienst weitergeleitet.

---

### Technischer Anhang

#### Komponentenversionen

| Komponente      | Version            | Hinweise |
|----------------|--------------------|-------|
| System Proxy   | new nginx config   |       |

#### Grundlegende Änderungen

Keine.

---

## 2.18.1

*2025-11-08*

> **Kritischer Patch — Gateway**
> Ohne diesen Patch konnte der Gateway-Dienst den Hostnamen des Geräts nicht abrufen, der für die Anmeldung an der Cloud benötigt wird. Die Gateway-Funktion war damit vollständig außer Betrieb.

---

### Highlights

> Version 2.18.1 ist ein kritischer Patch, der die Gateway-Verbindung zur Cloud wiederherstellt.

---

### Fehlerbehebungen

- **Gateway: Verbindung zur Cloud unterbrochen** — Nach dem Infrastruktur-Umbau in Version 2.18 konnte der Gateway-Dienst den Hostnamen des Geräts nicht mehr abrufen. Die Gateway-Verbindung zur Cloud war damit vollständig unterbrochen.

---

### Technischer Anhang

#### Komponentenversionen

| Komponente      | Version            | Hinweise |
|----------------|--------------------|-------|
| System Proxy   | new nginx config   |       |

#### Grundlegende Änderungen

Keine.

---

## 2.18.0

*2025-10-09*

> **Hinweis: Zweifacher Neustart erforderlich**
> Dieses Update erfordert zwei aufeinanderfolgende Neustarts, da OS-Komponenten und der Linux-Kernel ebenfalls aktualisiert werden.
>
> Das Update beinhaltet eine Vorab-Validierung der installierten Pakete (Voraussetzung: Version 2.17) sowie eine Prüfung des verfügbaren Speicherplatzes. Schlägt eine der Prüfungen fehl, wird der Update-Vorgang abgebrochen — es werden keine Änderungen vorgenommen.

---

### Highlights

> Version 2.18.0 bringt eine vollständig überarbeitete Update-Oberfläche und eine neue Docker-Infrastruktur, die direkte Updates einzelner Komponenten ermöglicht. Netzwerk-Konfiguration und Discovery wurden für die Companion-App erweitert. Mehrere Stabilitätsprobleme im Simatic-Konnektor wurden behoben.

---

### Neue Funktionen

- **Updater: Neue Oberfläche** — Der Updater verfügt über eine vollständig überarbeitete Benutzeroberfläche mit Update-Historie und einer dedizierten Prozess-Seite. Der verfügbare Speicherplatz wird vor dem Update geprüft.
- **Setup Wizard: Eingabevalidierung** — Fehleingaben werden während des Einrichtungsprozesses abgefangen und direkt gemeldet.
- **Netzwerk-Konfiguration (Ersteinrichtung)** — Netzwerk-Interfaces lassen sich über die Ersteinrichtung konfigurieren.
- **Discovery: Erweiterte Geräteinformationen** — Der Discovery-Service zeigt zusätzliche Felder zu gefundenen Geräten an.
- **Firmware-Update über Companion** — Die Grundlage für Firmware-Update-Funktionalität über die Companion-App wurde implementiert.

### Fehlerbehebungen

- **Simatic: Hohe Speicherlast** — Der Simatic-Konnektor verursachte unter bestimmten Bedingungen unkontrollierten Speicherverbrauch. Das Problem wurde mit dem Fix aus Patch 2.17.1 in diese Version übernommen.
- **Simatic: Exclude-List ignorierte Variablen** — Eine fehlerhafte Exclude-List-Implementierung führte dazu, dass Variablen fälschlicherweise ignoriert wurden.
- **Simatic: NaN-Fehler in Quick Insights** — Beim Abfragen der Device ID trat ein NaN-Fehler auf, der zu fehlerhaften Anzeigen in Quick Insights führte.
- **IO-Last-Problem** — Ein seit Version 2.16 bestehendes Problem mit erhöhter IO-Last wurde durch Anpassung der Influx-Konfiguration behoben.
- **CSV-Config-Import: Ungültige Zeichen** — Ungültige Zeichen im Adressfeld werden beim CSV-Import jetzt abgefangen.

---

### Technischer Anhang

#### Komponentenversionen

| Komponente                    | Version        | Notes                          |
|------------------------------|----------------|--------------------------------|
| OS Image                     |                |                                |
| Web UI Advanced              | 4.9.8          |                                |
| Web UI API                   | 1.20.0         |                                |
| Web UI Basic                 | 2.2.1          |                                |
| Web UI Configuration         | 1.0.3          |                                |
| Core CSV-Config-Import       | 1.2.2          |                                |
| Core Kapacitor               | 1.5.3-udf      |                                |
| Core Watchdog                | 0.1.3          |                                |
| Host Docker Environment      | 1.0.0          |                                |
| Host Discovery               | 2.0.6          |                                |
| Host Network API             | 2.6.5          |                                |
| Host OS Info                 | 1.0.4          |                                |
| Host Secure Pack             | 2025.1         |                                |
| Host Updater                 | 2.1.2          |                                |
| Source Simatic               | 4.3.2          |                                |
| System Grafana               | 7.4.5          |                                |
| System Influx                | 1.8            |                                |
| System Postgres              | 11.4           |                                |
| System Proxy                 | 1.20           |                                |
| System Worker Insights       | 1.20.4         |                                |
| System Worker Measurements   | 1.20.4         |                                |
| APP Docu                     | 1.0.0          | new Compose config only        |
| System Broker                | 3.8.0          | new Compose config only        |

#### Grundlegende Änderungen

- Upgrade nur von **v2.17** unterstützt.
- Docker-Infrastruktur überarbeitet: alle Dienste auf neue Docker-Compose-Struktur migriert. Direkte Updates einzelner Container sind nun möglich.

---

## 2.17.1

*2025-08-28*

> [!CAUTION]
> **Kritischer Patch — Simatic Konnektor**
> Dieser Patch sollte zeitnah auf allen Crawlern eingespielt werden. Der Fehler kann zum **vollständigen Ausfall des Crawlers** führen, da der Simatic-Service den verfügbaren Arbeitsspeicher der übrigen Anwendungen belegt.


### Hintergrund

Der Simatic-Service beanspruchte beim Verbindungsaufbau zur SPS übermäßig viel Arbeitsspeicher. Infolgedessen stand anderen Diensten kein ausreichender Speicher mehr zur Verfügung, was zum Totalausfall des Crawlers führen konnte.


### Änderungen

| Bereich | Änderung |
|---|---|
| Source Simatic | Speicherleck beim Verbindungsaufbau zur SPS behoben |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Source | Simatic | 4.3.2 |

---

## 2.17.0

*2025-03-17*

> **Hinweis: Systemneustart erforderlich**
> Dieses Update erfordert einen Systemneustart, da Duplikate in der Core-Compose-Konfiguration bereinigt werden. Beim Neustart werden alle betroffenen Container neu erstellt.

---

### Highlights

> Version 2.17.0 bringt umfangreiche Erweiterungen am Simatic-Konnektor: Live-Ansicht, Quick-Preview, Passwortschutz und Quick Insights. Der Modbus-Konnektor wurde um IP-Adressänderung und Endianness-Konfiguration ergänzt. Die Bedienoberfläche wurde mit einem überarbeiteten Navigationsmenü und verbessertem Verbindungsstatus aktualisiert.

---

### Neue Funktionen

- **Simatic: Live-Ansicht** — Der aktuellste Messwert einer Variable wird direkt im Variablen-Browser angezeigt.
- **Simatic: Quick Preview** — Schnelle Zeitreihen-Vorschau eines Variablenwerts als Diagramm, direkt aus dem Browser aufrufbar.
- **Simatic: Passwortgeschützte Geräte** — Verbindungen zu passwortgeschützten Simatic-Geräten werden unterstützt.
- **Simatic: Quick Insights** — Dynamischer Verbindungsstatus und Log-Meldungen werden direkt aus dem Simatic-Service angezeigt.
- **Simatic: Verbessertes Timeout-Verhalten** — Das Verbindungs-Timeout bei Verbindungsabbrüchen wurde überarbeitet.
- **Modbus: IP-Adresse ändern** — Die IP-Adresse eines Modbus-Geräts kann nachträglich geändert werden, ohne das Gerät neu anlegen zu müssen.
- **Modbus: Endianness konfigurierbar** — Big-Endian und Little-Endian sind auf Geräte- und Variablenebene konfigurierbar.
- **UI: Source Extensions aus UI neu starten** — Simatic- und Modbus-Container können direkt aus der Oberfläche neu gestartet werden.
- **UI: Navigationsmenü** — Das Navigationsmenü wurde überarbeitet und verbessert.

### Fehlerbehebungen

- **WebUI startet nicht nach Geräteneustart** — Die Benutzeroberfläche startete nach einem Neustart des Crawlers nicht korrekt.
- **Fehler beim Initial Setup** — Beim erstmaligen Einrichten des Geräts trat ein Fehler auf.
- **Gateway Manager: Konfigurationsübermittlung** — Die Konfiguration wurde nicht korrekt an den Gateway Dispatcher übermittelt (betrifft nur Installationen mit aktivierter Gateway-Funktion).

---

### Technischer Anhang

#### Komponentenversionen

| Komponente                        | Version   | Notes   |
|----------------------------------|-----------|---------|
| OS Image                         |           |         |
| Web UI Advanced                  | 4.8.18    |         |
| Web UI Basic                     | 2.2.0     |         |
| Web UI API                       | 1.17.6    |         |
| Core Source Control (SourceConfig) | 1.2.1   |         |
| Core Source Info                 | 1.0.0     | new     |
| Source Simatic                   | 4.2.3     |         |
| Source Modbus                    | 3.5.1     |         |
| Gateway Manager                  | 1.9.7     |         |

#### Grundlegende Änderungen

Keine.

---

## 2.16.1

*2025-02-26*

> **Kritischer Patch — Gateway**
> Nach einem Systemneustart wurden keine Messdaten mehr in Richtung Cloud gesendet. Die Gateway-Funktion war damit vollständig außer Betrieb.

---

### Highlights

> Version 2.16.1 ist ein kritischer Patch, der die Gateway-Datenübertragung nach einem Geräteneustart wiederherstellt.

---

### Fehlerbehebungen

- **Gateway: Daten nach Neustart nicht gesendet** — Nach einem Systemneustart wurden kontinuierliche Messwerte nicht mehr an die Cloud übertragen. Strukturdaten und Insights wurden korrekt gesendet; ausschließlich die Messdaten blieben aus. Der Fehler ließ sich nur durch eine manuelle Variablenänderung am Gateway umgehen.

---

### Technischer Anhang

#### Komponentenversionen

| Komponente        | Version | Hinweise |
|------------------|---------|-------|
| Gateway Manager  | 1.9.6   |       |

#### Grundlegende Änderungen

Keine.

---

## 2.16.0

*2025-02-06*

> **Hinweis: Datenbankneustarts — kurzer Datenverlust möglich**
> Durch dieses Update werden die Datenbanken neu gestartet. Dabei entsteht ein kurzer Datenverlust. Dies ist durch die enthaltenen Datenbank-Migrationen technisch notwendig.

> **Hinweis:** Dieses Update enthält die Änderungen aus Patch 2.15.1 und kann direkt über Version 2.15.0 eingespielt werden.

---

### Highlights

> Version 2.16.0 führt gesteuertes Versenden von Messdaten über den Gateway-Trigger ein. IO-Lastprobleme aus früheren Versionen wurden dauerhaft behoben.

---

### Neue Funktionen

- **Gateway: Gesteuertes Versenden (Conditional Dispatching)** — Bei aktiviertem Gateway können Variablen gezielt über einen Source-Trigger in die Cloud gesendet werden, anstatt kontinuierlich zu übertragen.
- **Variablen: Kaskadierendes Löschen** — Beim Löschen eines Geräts oder einer Gruppe werden zugehörige Variablen automatisch mitgelöscht.

### Fehlerbehebungen

- **IO-Last-Problem** — Eine überhöhte IO-Last, die seit früheren Versionen bekannt war, wurde durch Anpassung der InfluxDB-Konfiguration und Einführung von Ressourcenbeschränkungen dauerhaft behoben.

---

### Technischer Anhang

#### Komponentenversionen

| Komponente          | Version  | Hinweise |
|--------------------|----------|-------|
| OS Image           |          |       |
| Web UI Advanced    | 4.7.2    |       |
| Web UI API         | 1.16.8   |       |
| Gateway Manager    | 1.9.4    |       |

#### Grundlegende Änderungen

- Upgrade von **v2.15 oder höher** unterstützt (Änderungen aus 2.15.1 sind enthalten).
- Datenbankmigrationen werden während des Updates angewendet — kurzzeitiger Datenverlust möglich.

---

## 2.15.1

*26. November 2024*

> [!NOTE]
> Dieser Patch wird mit Version 2.16.0 gebündelt ausgeliefert und kann daher direkt über Version 2.15.0 eingespielt werden.


### Fehlerbehebungen

#### Bedienoberfläche (Web UI)

| Bereich | Beschreibung |
|---|---|
| Geräteverwaltung | Fehler bei Erreichen der maximalen Geräteanzahl behoben |
| PLC-Anlage | Anlegen von PLCs mit gleicher IP-Adresse korrigiert |
| Variablen-Browser | Einzelne Variablen können wieder korrekt gelöscht werden |

#### CSV-Importer

| Bereich | Beschreibung |
|---|---|
| Zeichencodierung | UTF-8-Unterstützung für aus Excel exportierte Dateien |
| Sonderzeichen | Fehler bei Sonderzeichen „…" (Auslassungspunkte) behoben |

#### Simatic-Konnektor

| Bereich | Beschreibung |
|---|---|
| Stabilität | Allgemeine Stabilitätsverbesserungen |
| Reconnect | Verbindungswiederaufbau zur PLC korrigiert |
| ExcludeList | Bei absoluter Adressierung war das Deaktivieren der ExcludeList nicht möglich — behoben |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced | 4.5.17 |
| Core | CSV Parser | 1.2.1 |

---

## 2.15.0

*9. Oktober 2024*

### Neue Funktionen

#### Performance-Analyse

- Soll-Ist-Vergleich der Abtastrate: Die gemessene Abtastrate der SPS wird mit der eingestellten verglichen, um sicherzustellen, dass keine Daten verpasst oder verzerrt werden

#### Partial Exploration

- Beim Importieren von Messgrößen werden Gruppen und Variablen jetzt partiell geladen — verbesserte Performance bei großen Datenstrukturen

#### Dokumentation (Offline-Handbuch)

- Crawler-Dokumentation im PDF-Format direkt in der Web UI abrufbar (Advanced und Basic UI)

#### Basic UI — Geräte-Seite

- Neue Seite zeigt alle Geräte mit ihrem aktuellen Verbindungsstatus an


### Verbesserungen

#### CSV-Import (Advanced UI)

| Verbesserung | Beschreibung |
|---|---|
| Excel-Kompatibilität | CSV-Dateien aus Excel werden unterstützt (automatische Konvertierung nach UTF-8) |
| Gruppenstrukturen | Importieren von Gruppenstrukturen über Pfadangabe (beliebige Hierarchie-Tiefe) |
| Duplikaterkennung | Doppelte Adressen innerhalb einer Gruppe werden erkannt und gemeldet |
| Optionale Spalten | Spalte „Datentyp Crawler" ist optional; Spalte „isActive" kann leer sein (Standard: `true`) |
| Fehlermeldungen | Verbesserte Fehlermeldungen bei ungültigen CSV-Dateien (z.B. leere Datei) |

#### Allgemein (Advanced UI)

| Bereich | Änderung |
|---|---|
| Benachrichtigungen | Reduzierte Anzahl doppelter Benachrichtigungen |

#### Simatic-Konnektor

- Allgemeine Verbesserungen der Funktionsweise


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced | 4.5.13 |
| Web UI | Basic | 2.1.6 |
| Web UI | API | 1.16.7 |
| Core | CSV Parser | 1.1.8 |
| Source | Simatic | 4.0.2 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.14 auf 2.15**. Stellen Sie sicher, dass Version 2.14 vollständig installiert ist, bevor Sie das Update einspielen.

---

## 2.14.4

*28. August 2024*

> [!WARNING]
> **Neustart erforderlich**
> Nach dem Update muss der Crawler neu gestartet werden, andernfalls greifen die Anpassungen nicht.

> [!NOTE]
> Dieser Patch beinhaltet alle Änderungen aus Version 2.14.3 und ersetzt diesen vollständig.


### Hintergrund

Dieser Patch konsolidiert die Stabilitätsmaßnahmen aus 2.14.3 und ergänzt sie um eine neue Simatic-Version, die alle Funktionen aus Version 2.13 und 2.14.0 vereint sowie die Möglichkeit zur partiellen Exploration enthält.


### Änderungen

| Bereich | Änderung |
|---|---|
| Core Dumps | In System-Services und Konnektoren deaktiviert |
| Log-Dateien | Größe auf max. 10 MB begrenzt, max. 3 Dateien pro Service |
| Host Service | Bestehende Log-Daten werden beim Update bereinigt |
| Source Simatic | Update auf Version 4.0.1 — überarbeiteter Service mit partieller Exploration und Arcon-Abstraktion |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Core | Source Control (SourceConfig) | 1.1.2 |
| Source | Simatic | 4.0.1 |

---

## 2.14.3

*1. August 2024*

> [!WARNING]
> **Neustart erforderlich**
> Nach dem Update muss der Crawler neu gestartet werden, andernfalls greifen die Anpassungen nicht.


### Hintergrund

Dieser Patch verbessert die Gesamtstabilität des Systems durch das Deaktivieren von Core Dumps und die Begrenzung der Log-Dateigrößen. Beide Maßnahmen reduzieren unkontrollierten Speicherverbrauch im laufenden Betrieb.


### Änderungen

| Bereich | Änderung |
|---|---|
| Core Dumps | In System-Services und Konnektoren deaktiviert |
| Log-Dateien | Größe auf max. 10 MB begrenzt, max. 3 Dateien pro Service |
| Host Service | Bestehende Log-Daten werden beim Update bereinigt |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Core | Source Control (SourceConfig) | 1.1.2 |

---

## 2.14.2

*7. Juli 2024*

### Hintergrund

Dieser Patch stellt die Unterstützung für neuere Simatic-Steuerungen wieder her, die mit TIA Portal V18 oder neuer projektiert wurden. Die Verbindungsinitialisierung wurde korrigiert.


### Änderungen

| Bereich | Änderung |
|---|---|
| Source Simatic | Update auf Version 3.5.6 |
| TIA V18+ | Unterstützung für Steuerungen ab TIA Portal V18 wiederhergestellt |
| Init String | Mindestlänge des Init-Strings wird korrekt behandelt, wenn dieser nicht gesetzt wurde |
| Accon Lib | Aktualisierung der Bibliothek zur Steuerungsansteuerung |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Source | Simatic | 3.5.6 |

---

## 2.14.1

*23. Juni 2024*

> [!WARNING]
> **Eingeschränkte Simatic-Kompatibilität**
> Diese Version unterstützt **keine** Simatic-Steuerungen, die ab TIA Portal V18 projektiert wurden. Für TIA V18+ bitte auf Version 2.14.2 aktualisieren.


### Hintergrund

Der Simatic-Service aus Version 2.14.0 wies Stabilitätsprobleme auf. Diese Version enthält einen Downgrade auf die letzte bekannte stabile Simatic-Version (3.5.4). Als Folge des Downgrades sind bestimmte Funktionen temporär nicht verfügbar.


### Änderungen

| Bereich | Änderung |
|---|---|
| Source Simatic | Downgrade auf Version 3.5.4 (letzte stabile Version) |
| IP-Adresse | Änderung der Geräte-IP nicht möglich (temporär deaktiviert) |
| ExcludeList | Deaktivierung der ExcludeList nicht möglich (temporär deaktiviert) |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Source | Simatic | 3.5.4 |

---

## 2.14.0

*13. März 2024*

> [!CAUTION]
> **Nicht empfohlen — Bekannte Stabilitätsprobleme**
> Diese Version enthält bekannte Stabilitätsprobleme mit dem Simatic-Konnektor. Es wird empfohlen, **direkt auf Version 2.14.4** zu aktualisieren.

> [!WARNING]
> **Neustart erforderlich**
> Dieses Update erfordert einen Systemneustart, da Konfigurationsänderungen erst nach einem Neustart wirksam werden.


### Neue Funktionen

#### Gateway

| Funktion | Beschreibung |
|---|---|
| Bulk-Bearbeitung | Messgrößen im Gateway können im Pulk bearbeitet und gelöscht werden |
| Meta-Info Import | Messgrößen können über Meta-Informationen der Gerätemessgrößen importiert werden |
| Mehrere Dispatcher | Unterstützung mehrerer Dispatcher pro Endpoint (z.B. periodischer + Ad-Hoc-Versand) |
| Structure Dispatcher | Neuer Dispatcher: überträgt Crawler Geräte- und Messgrößen-Strukturen *(buchbar)* |
| Ad-Hoc-Dispatcher | Neuer Dispatcher: hochaufgelöste Datenpunkte für einzelne Messgrößen in einem begrenzten Zeitbereich *(buchbar)* |
| Aggregationsintervalle | Intervalle 1s und 5s wurden entfernt (zu hohe Systemlast) |

#### Bedienoberfläche (Web UI)

| Bereich | Änderung |
|---|---|
| Navigation | Navigation zum NuP-Dispatcher direkt über das Advanced UI möglich |
| Layout | Allgemeine Layout-Verbesserungen |
| Setup-Wizard | Bugfix: Darstellungsfehler beim Netzwerkadapter behoben |


### Verbesserungen

#### Gateway — Technische Infrastruktur

| Bereich | Änderung |
|---|---|
| AWS Endpoint | Angepasster Endpoint für verbesserte Stabilität des Verbindungsaufbaus |
| Origin ID | Eingeführt zur Unterstützung mehrerer gleichzeitiger Dispatcher |
| MXS / MXH | Separate Update-Pakete für MXS und MXH (zusätzlich zum Standard-Update) |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced | 4.0.26 |
| Web UI | API | 1.16.3 |
| Gateway | Manager | 1.8.8 |
| Gateway (MXS, MXH) | Dispatcher MX | 2.6.0 |
| Gateway (MXS, MXH) | Structure Dispatcher | 1.2.0 *(neu)* |
| Gateway (MXH) | Ad-Hoc-Dispatcher | 1.1.1 *(neu)* |
| Gateway (MXS, MXH) | AWS Endpoint | 1.3.0 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.13 auf 2.14**. Stellen Sie sicher, dass Version 2.13 vollständig installiert ist, bevor Sie das Update einspielen.

---

## 2.13.0

*15. Januar 2024*

> [!CAUTION]
> **Nicht empfohlen — Bekannte Stabilitätsprobleme**
> Diese Version enthält bekannte Stabilitätsprobleme mit dem Simatic-Konnektor. Es wird empfohlen, **direkt auf Version 2.14.4** zu aktualisieren.


### Neue Funktionen

#### CSV-Import

- Messgrößen können für alle Gerätetypen per CSV-Datei importiert werden

#### Notification Hub

- E-Mail-Versand für Grafana-Alarme (neuer Service)


### Verbesserungen

#### Bedienoberfläche (Web UI)

| Bereich | Änderung |
|---|---|
| Geräte-Favoriten | Hinweis, wenn die maximale Anzahl an Favoriten erreicht ist |
| Optik | Überarbeitetes Design der Web UI |

#### Simatic-Konnektor

| Bereich | Änderung |
|---|---|
| ExcludeList | Vollständige Überarbeitung (bisher: BlackList) — verbesserte Funktionsweise |
| ExcludeList | Kann im UI deaktiviert werden |
| IP-Adresse | IP-Adresse eines Geräts kann geändert werden (Verbindung wird automatisch neu aufgebaut) |


### Fehlerbehebungen

| Komponente | Beschreibung |
|---|---|
| StructService | Beim Factory-Reset wurden Variablen in der StructDB nicht vollständig gelöscht |


### Technische Verbesserungen

#### RabbitMQ — Queue-Begrenzung

Zur Verhinderung einer Kaskadierung von Problemen bei vielen Messgeräten wurden Queue-Längen für alle Worker begrenzt:

| Worker | prefetch_count |
|---|---|
| system.worker.insights.log | 1000 |
| system.worker.insights.endpoint | 100 |
| system.worker.insights.source | 50 |
| system.worker.measurement | 100 |
| system.worker.measurement.metric | 100 |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced | 4.0.19 |
| Web UI | Basic | 2.0.0 |
| Web UI | API | 1.15.2 |
| Core | Notification Hub | 1.0.21 *(neu)* |
| Core | CSV Parser | 1.0.7 *(neu)* |
| Source | Simatic | 3.9.5 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.12.2 auf 2.13**. Stellen Sie sicher, dass Version 2.12.2 vollständig installiert ist, bevor Sie das Update einspielen.

---

## 2.12.2

*24. Oktober 2023*

### Hintergrund

Bei unbekannten symbolischen Datentypen auf der SPS wurden hochfrequent Log-Meldungen erzeugt, was je nach System zu erheblichen Performance-Einbußen führen konnte. Betroffene Datentypen: `S7_HW_SUBMODULE`, `S7_HW_ANY`, `S7_CONN_OUC`, `S7_Pointer`, `S7_Variant`. Diese Log-Einträge wurden deaktiviert.


### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| Source Simatic | Hochfrequente Log-Meldungen bei unbekannten SPS-Datentypen deaktiviert |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Source | Simatic | 3.5.4 |


> Kein separates VM-Paket erforderlich. Das Update-Bundle unterstützt eine Migration von **Version 2.12.1 auf 2.12.2**.

---

## 2.12.1

*18. September 2023*

> [!NOTE]
> Version 2.12.0 enthielt Fehler beim Ändern der IP-Adresse und beim Simatic-Discovery-Timeout. Es wird empfohlen, **Version 2.12.0 zu überspringen** und direkt auf 2.12.1 zu aktualisieren. Das Update-Paket unterstützt die Installation sowohl auf Basis von 2.11 als auch von 2.12.


### Neue Funktionen

#### Simatic-Konnektor

| Funktion | Beschreibung |
|---|---|
| Array-Datentyp | Simatic unterstützt nun den Datentyp Array |

#### Modbus-Konnektor

| Funktion | Beschreibung |
|---|---|
| String-Datentyp | Modbus unterstützt nun den Datentyp String |

#### Bedienoberfläche (Web UI)

| Bereich | Änderung |
|---|---|
| Favoriten | Max. 3 Geräte-Favoriten im Advanced UI |
| Gerätelimit | Max. 5 Geräte im Advanced UI |
| Login-Dauer | Gültigkeit des Logins auf 1 Stunde verlängert |
| Firefox | Login im Firefox-Browser nun möglich |


### Verbesserungen

#### Gateway

| Bereich | Änderung |
|---|---|
| Insights Dispatcher | Sendeintervall auf 5 Minuten verlängert (sofern eingerichtet) |
| Cloud-Datenlast | Reduzierung der Datenlast Richtung Cloud — Messwerte priorisiert gegenüber Service-Infos |

#### Technische Aspekte

| Bereich | Änderung |
|---|---|
| Konnektoren | Begrenzung der gleichzeitigen Konnektoren zur Leistungsgarantie |
| Auth Service | Beim Zurücksetzen wird immer das konfigurierte Passwort aus den App-Einstellungen verwendet |
| Simatic Discovery | Timeout auf 60 Sekunden erhöht |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced | 3.20.10 |
| Web UI | API | 1.14.6 |
| Web UI | Auth | 1.1.1 |
| Source | Simatic | 3.5.3 |
| Source | Modbus | 3.3.3 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.11 oder 2.12.0 auf 2.12.1**. Kein separates VM-Paket erforderlich.

---

## 2.12.0

*September 2023*

> [!CAUTION]
> **Nicht empfohlen — Bekannte Fehler**
> Diese Version enthält Fehler beim Ändern der IP-Adresse von Geräten sowie beim Timeout während des Simatic-Discoverys. Es wird empfohlen, **direkt auf Version 2.12.1** zu aktualisieren. Das Update-Paket von 2.12.1 unterstützt die Installation sowohl auf Basis von 2.11 als auch von 2.12.0.

---

## 2.11.0

*30. Mai 2023*

### Neue Funktionen

#### Gateway — Aggregations-Intervalle

| Funktion | Beschreibung |
|---|---|
| Intervall-Auswahl | Beim Hinzufügen einer Messgröße wird das gewünschte Aggregations-Intervall direkt gesetzt |
| Intervall-Änderung | Das Intervall kann nachträglich geändert werden |
| Verfügbare Intervalle | 1s, 15s, 30s, 1m, 10m, 30m, 1h |
| Bestandsdaten | Bereits vorhandene Einträge behalten nach dem Update den bisherigen Standardwert von 1 Minute |

> Variablen mit einem 10-Sekunden-Intervall werden beim Update automatisch auf 60 Sekunden umgestellt.

#### Gateway — Transparenz & Anzeige

| Funktion | Beschreibung |
|---|---|
| Senderückstand | Aktueller Modus, Zeitstempel des aktuellsten und zurückhängenden Messpunkts sowie letzter Sendezeitpunkt werden im Web-Frontend angezeigt |
| Variablen-Adresse | Adresse der im Gateway eingerichteten Messgrößen wird angezeigt |


### Verbesserungen

#### Gateway — Technische Infrastruktur

- Healthchecks für Manager, Dispatcher und Endpoint verfügbar
- Alle Gateway-Projekte auf .NET 6.0 migriert
- Verbesserte Logging-Level und Queue-Namen
- Manager: unnötige Kapacitor-Tasks werden automatisch gelöscht
- Manager: Variablen-Konfigurationsänderungen propagieren den vollständigen Datensatz
- API-Fehlermeldungen verwenden RFC7807-Format


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| UI | Advanced UI | 3.18.4 |
| UI | Web API | 1.14.3 |
| Gateway | Manager | 1.7.8 |
| Gateway | Dispatcher MX | 2.5.0 |
| Gateway | Endpoint AWS | 1.1.4 |


> Kein separates VM-Paket erforderlich. Das Update-Bundle unterstützt eine Migration von **Version 2.10 auf 2.11**.

---

## 2.10.0

*20. Februar 2023*

### Neue Funktionen

#### Bedienoberfläche (Web UI)

| Funktion | Beschreibung |
|---|---|
| Login für Einstellungen | Die Einstellungsseite erfordert einen Login (Nutzer: `admin`) |
| Passwort-Verwaltung | Passwort wird bei der Ersteinrichtung gesetzt und kann in den Einstellungen jederzeit geändert werden |
| Werkseinstellung | Passwort wird beim Zurücksetzen auf Werkseinstellung ebenfalls zurückgesetzt |

#### Netzwerk

| Funktion | Beschreibung |
|---|---|
| Haupt-Adapter | Ein primärer Netzwerk-Adapter muss für Internet-Anfragen (Routing) definiert werden |
| Standard-Adapter | Bei Auslieferung und nach Werksreset ist der **X1-Adapter** als primärer Adapter konfiguriert |
| Discovery Tool | Netzwerkeinstellungen über das DiscoveryTool beziehen sich immer auf den ersten Adapter, unabhängig vom konfigurierten Haupt-Adapter |


### Verbesserungen

#### Docker-Infrastruktur

- Docker-Infrastruktur aktualisiert
- Containerd-Konfiguration angepasst (behebt Fehler im Suspend Mode bei VMs)
- I/O-Last durch Konfigurationsanpassungen reduziert
- `compose-up.sh` ist nun im Update-Paket enthalten (bisher wurde die lokale Datei direkt modifiziert)
- Health Checks für Web UI Advanced und Auth Service ergänzt


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced UI | 3.17.4 |
| Web UI | Web API | 1.14.2 |
| Core | Auth Service | 1.0.0 *(neu)* |


> Das Update-Bundle unterstützt eine Migration von **Version 2.9 auf 2.10**.

---

## 2.9.0

*1. Dezember 2022*

### Neue Funktionen

#### Gateway — Catchup-Mechanismus

| Funktion | Beschreibung |
|---|---|
| Aktuelle Datenpakete | Nach einem Verbindungsabbruch werden neben historischen Daten regelmäßig auch aktuelle Datenpakete gesendet |

#### Bedienoberfläche (Web UI)

| Funktion | Beschreibung |
|---|---|
| Startseite | Beim Aufrufen der Crawler-Adresse wird zuerst das Nutzer-UI (Basic UI) geöffnet; zu den Einstellungsseiten kann über einen Button navigiert werden |
| Verbindungsstatus | Der Verbindungsstatus der eingerichteten Feldgeräte wird auf den Geräte-Seiten und der Geräteliste angezeigt; Verbindungsänderungen werden als Meldungen angezeigt |
| Notifications | Verbesserte Notifikationen und Alerts |


### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| Basic UI | Node Red kann im Basic UI eingebettet aufgerufen werden |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced UI | 3.16.1 |
| Web UI | Basic UI | 1.2.3 |
| Gateway | Dispatcher MX | 2.1.6 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.8 auf 2.9**.

---

## 2.8.0

*6. September 2022*

### Neue Funktionen

#### Datenbankmanagement

| Funktion | Beschreibung |
|---|---|
| Übersicht | Anzeige aller Influx-Datenbanken |
| Datenbank leeren | Einzelne Datenbanken können geleert werden |
| Retention Policies | Aufbewahrungsrichtlinien können konfiguriert werden |
| Festplattenprognose | Anzeige des aktuellen Festplattenverbrauchs und grobe Prognose für den Zeitpunkt einer vollen Festplatte |

#### Watchdog

| Funktion | Beschreibung |
|---|---|
| Individuelle Filterung | Watchdog mit konfigurierbaren Filtern für individuelle Überwachung |
| UI-Integration | Anzeige des Geräte-Verbindungsstatus direkt im Web UI |
| Gateway-Integration | Watchdog-Daten werden in den Insights Dispatcher (Gateway) integriert |


### Verbesserungen

#### Bedienoberfläche (Web UI)

- Überarbeitete Geräte-Seiten und Einstellungsseiten
- Neue Alerts und Notifications auf den Geräte-Seiten
- Umbenennung von „Variablen" in **Messgrößen** im gesamten UI
- Netzwerkeinstellungen werden erst nach Bestätigung von „Abschließen" angewandt
- VariableBrowser: Navigationsstruktur bleibt bei Änderungen an Messgrößen erhalten

#### Simatic-Konnektor

- Bugfix: Asynchronitäts-Problem in der Publisher-Bibliothek behoben
- Bugfix: Messgrößen, die nicht von der SPS bezogen werden konnten, werden nun mehrfach versucht bevor sie verworfen werden


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Core | Datenbank-Manager | 2.6.1 |
| Source | Simatic | 3.4.7 |
| Web UI | Advanced UI | 3.13.9 |
| Web UI | Basic UI | 1.1.0 |
| Web UI | Web API | 1.0.13.7 |
| Core | Watchdog | 0.1.3 |
| Gateway | Dispatcher Insights | 1.10.0 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.7.1 auf 2.8**.

---

## 2.7.1

*28. Juli 2022*

### Neue Funktionen

#### Source-Konnektoren

| Bereich | Änderung |
|---|---|
| Remote-Controlled Konnektoren | Konnektoren können als „remote-controlled" markiert werden und werden dann nicht vom SourceConfig-Service angelegt, gestartet, gestoppt oder gelöscht |

#### Grafana-Connector

| Bereich | Änderung |
|---|---|
| Gruppen-Selektierung | Neben „Gerät + Messgröße" kann nun auch die Gruppenstruktur zur Dashboard-Selektion genutzt werden; bestehende Dashboards bleiben kompatibel |


### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| StructService | IPCC-Events beim Löschen einer Messgröße wurden nicht in allen Fällen korrekt gesendet |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Core | StructService | 1.11.0 |
| Core | SourceConfig | 1.0.2 |
| Core | Grafana Connector | 1.3.1 |
| Core | Device Config Management | 1.0.5 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.7 auf 2.7.1**.

---

## 2.7.0

*11. Juli 2022*

### Neue Funktionen

#### Crawler Insights

| Funktion | Beschreibung |
|---|---|
| Feldgeräte-Monitoring | Erfassung kritischer Informationen der eingerichteten Feldgeräte (Simatic und Modbus) |
| Verbindungsstatus | Abruf von Verbindungsstatus und weiteren Gerätedaten |
| Lokale Speicherung | Speicherung in der InfluxDB zur lokalen Visualisierung und Auswertung |
| Vorinstallierte Dashboards | Insights: System, Insights: Feldgeräte *(neu)*, Insights: Logs *(neu)* |
| Cloud-Übermittlung | Übermittlung an die Cloud (AWS-Endpoint): System-Metriken, Feldgeräte-Zustände, Crawler-Service-Daten |


### Verbesserungen

#### Grafana

- System-Metric Dashboard um Informationen weiterer Partitionen erweitert

#### Simatic-Konnektor

- Fehlerbehebung: gelegentlicher Absturz der Datenaufzeichnung bei Verbindungsabbrüchen (0 Messstellen) behoben


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Source | Simatic | 3.4.3 |
| Source | Modbus | 3.2.3 |
| Core | SourceConfig | 1.0.0 |
| Gateway | Endpoint AWS | 1.1.0 |
| Gateway | Dispatcher Insights | 1.9.0 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.6.1 auf 2.7**.

---

## 2.6.1

*31. Mai 2022*

### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| Simatic-Konnektor | Eingerichtete Messgrößen, die auf der SPS nicht mehr vorhanden sind, führen nicht mehr zu einem Absturz |
| Simatic-Konnektor | Das Beziehen der Struktur (symbolisch) beeinflusst die Datenaufzeichnung nicht mehr; häufige Fehler beim Struktur-Discovery sollten ebenfalls nicht mehr auftreten |
| Grafana-Connector | Strukturen werden initial und bei IPCC-Events bezogen und im RAM gecacht; Anfragen erfolgen daher immer aus dem Cache (Performance-Optimierung) |
| System-Metrik | System-Metrik-Funktion für Docker-Container wiederhergestellt |


> Das Update-Bundle unterstützt eine Migration von **Version 2.6 auf 2.6.1**.

---

## 2.6.0

*26. April 2022*

### Neue Funktionen

#### Gateway — Neue Architektur

Mit Version 2.6 wird das Gateway auf drei eigenständige Dienste aufgeteilt: **Manager**, **Dispatcher** und **Endpoint**.

| Funktion | Beschreibung |
|---|---|
| Übertragungssteuerung | Stoppen der Datenübertragung hält die Verbindung aufrecht; Stoppen ist pro Dispatcher möglich |
| Verbindungskonfiguration | Verbindungsdaten und Zugangsdaten können über das Web UI konfiguriert werden |
| Verbindungsstatus | Der Verbindungsstatus zum Endpoint wird im Web UI angezeigt |
| Messgrößen-Verwaltung | Bereits eingerichtete Messgrößen können für den Versand über das Gateway ausgewählt, angepasst oder entfernt werden (Auswahl über den Variablen-Browser) |

#### DataProcessor

| Funktion | Beschreibung |
|---|---|
| Event-Detection | Event-Detection funktioniert nun korrekt (Puffer-Anpassung in Telegraf) |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced UI | 3.10.18 |
| Web UI | Web API | 1.0.12.5 |
| Gateway | Manager | 1.0.0 *(neu)* |
| Gateway | Dispatcher MX | 1.0.0 *(neu)* |
| Gateway | Endpoint AWS | 1.0.0 *(neu)* |
| Core | Telegraf | 1.20.4 |


> Das Update-Bundle unterstützt eine Migration von **Version 2.5 auf 2.6**.

---

## 2.5.0

*11. März 2022*

### Neue Funktionen

#### System-Status

| Funktion | Beschreibung |
|---|---|
| Health-Übersicht | Unter „Einstellungen" wird eine Übersicht über den Health-Status von System- und Core-Services angezeigt |
| Nutzungssperre | Das UI blockiert die Bedienung, solange nicht alle System- und Core-Services verfügbar sind (z. B. nach einem Neustart) |

#### DataProcessor

| Funktion | Beschreibung |
|---|---|
| Überarbeitetes UI | Assistenz-geführte Einrichtung von Berechnungen; Variablenauswahl erfolgt über den VariableBrowser |

#### Variablen-Browser (manuell)

| Funktion | Beschreibung |
|---|---|
| Messgrößen anlegen | Messgrößen können manuell über Eingabe aller erforderlichen Parameter angelegt werden |
| Messgrößen löschen | Einzelne oder mehrere Messgrößen können gelöscht werden |

#### Simatic S7 — Selektiver Import

| Funktion | Beschreibung |
|---|---|
| Selektiver Import | Einzelne Variablen einer Simatic S7 (symbolische Adressierung) können selektiv zu bestehenden Messgrößen hinzugefügt werden |
| Hervorhebung | Bereits importierte und nicht mehr vorhandene Variablen werden optisch hervorgehoben |
| Strukturerhalt | Bestehende Strukturen werden beim Import nicht gelöscht |


### Verbesserungen

#### Bedienoberfläche (Web UI)

- Angular-Framework auf Version 13 aktualisiert
- Diverse Bugfixes: Netzwerkeinstellungen, Ladeanimationen, Firefox-Layout, Übersetzungsfehler


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced UI | 3.9.33 |


> Für diese Version sind keine separaten Download-Pfade hinterlegt.

---

## 2.4.2

*21. Februar 2022*

> [!WARNING]
> **Host-Updater muss vor der Installation aktualisiert werden**
> Das Update-Paket von Version 2.4.1 hat das manuelle Update des Host-Updaters überschrieben. Vor der Installation dieses Pakets muss der Host-Updater daher erneut manuell aktualisiert werden.


### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| Modbus & Simatic | Fehler beim Vorwärtsstellen der Systemuhr des Crawlers behoben |
| Simatic | Messgrößen mit gleicher Adresse werden nun nur einmal von der SPS abgerufen; der Wert wird in alle entsprechenden Messgrößen geschrieben |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Source | Modbus | 3.0.11.1 |
| Source | Simatic | 3.2.0 |

---

## 2.4.1

*2022-01-21*

> [!WARNING]
> **Host-Updater wird durch dieses Update überschrieben**
> Das Update-Paket überschreibt das manuelle Update des Host-Updaters. Vor der Installation des nächsten Update-Pakets (Version 2.4.2) muss der Host-Updater daher erneut manuell aktualisiert werden.


### Neue Funktionen

#### Netzwerk

| Funktion | Beschreibung |
|---|---|
| DNS-Konfiguration | Bis zu 5 DNS-Einträge konfigurierbar |
| Mehrere Adapter | Alle verfügbaren Netzwerk-Adapter (alle eth-Adapter) konfigurierbar |
| Hot-Apply | Netzwerkänderungen können ohne Neustart angewandt werden |

#### Datum und Uhrzeit

| Funktion | Beschreibung |
|---|---|
| Zeiteinstellung | Datum, Uhrzeit und Zeitzone können ohne Zurücksetzen auf Werkseinstellung geändert werden |
| NTP-Konfiguration | NTP-Adresse und Aktivierungszustand konfigurierbar |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced UI | 3.7.83 |

---

## 2.4.0

*20. September 2021*

### Neue Funktionen

#### Source-Extension — Neue Architektur

| Funktion | Beschreibung |
|---|---|
| Automatisierte Orchestrierung | Konnektoren werden automatisch verwaltet — kein manuelles Erstellen von Containern mehr erforderlich |
| Verbindungsstatus | Verbindungsstatus wird über Docker-Container-HealthChecks ermittelt |
| Metric & Alignment | Einstellung von Messmethode und Zeitausrichtung direkt im UI (pro Gerät und pro Messgröße) |

#### Neuer Updater-Service

| Funktion | Beschreibung |
|---|---|
| Updater (Beta) | Neuer Updater-Service für komfortablere Software-Updates |

#### Basic UI

| Funktion | Beschreibung |
|---|---|
| Neues Basic UI | Ergänzendes Endnutzer-UI zum Advanced UI |
| Enthaltene Funktionen | DigiDoc, Dashboards, RedProcessor |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Advanced UI | 3.7.17 |
| Web UI | Basic UI | 1.0.7 *(neu)* |
| Web UI | Web API | 1.0.9.6 |
| Source | Simatic | 3.0.7 |
| Source | Modbus | 3.0.10 |
| Core | Source-Config | 0.1.10 |
| Core | StructService | 1.10.9 |
| Core | DeviceConfigMgr | 1.0.4 |
| Core | DBMgr | 1.0.2 |
| APP | DigiDoc | 0.1.4 |

---

## 2.3.4

*2021-05-11*

### Neue Funktionen

#### RedProcessor (Alpha)

| Funktion | Beschreibung |
|---|---|
| Menü-Navigation | RedProcessor ist als Menüpunkt im Hauptmenü verfügbar; öffnet sich in einem neuen Tab |


### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| DigiDoc | Upload von neuen Strukturen kann nun auch direkt im UI erfolgen (bisher nur über Swagger möglich) |
| DigiDoc | Datenbank für DigiDoc startet beim Systemstart nun automatisch |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Web UI | Web-Frontend | 3.6.31 |
| APP | RedProcessor | 0.1.0.0 *(neu)* |

---

## 2.3.3

### Neue Funktionen

#### DigiDoc (Beta)

| Funktion | Beschreibung |
|---|---|
| Dokumentation | Neuer Menüpunkt „Dokumentation" im Hauptmenü |
| Datei-Explorer | Dateien können exploriert und heruntergeladen werden |

> [!NOTE]
> **Bekannter Fehler:** Der Upload neuer Strukturen ist in dieser Version nur über Swagger möglich (`http://<IP-CRAWLER>:8028/swagger`). Eine Behebung erfolgt in Version 2.3.4.

---

## 2.3.2

### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| Messwert-Verarbeitung | Ungültige Messwerte (`NaN`, `INF`) führen nicht mehr zum Datenverlust anderer Messwerte |


### Aktualisierte Komponenten

| Gruppe | Komponente | Version |
|---|---|---|
| Source | Modbus | 1.0.12.0 |
| Source | Simatic | 2.5.7.0 |
| Source | OPC UA | 1.0.5.0 |

---

## 2.3.1

### Neue Funktionen

#### DataProcessor

| Funktion | Beschreibung |
|---|---|
| Integration | DataProcessor ist in das System integriert und über das Hauptmenü erreichbar |


### Fehlerbehebungen

| Bereich | Beschreibung |
|---|---|
| Kapacitor | Falsche Adressierung des Kapacitors (entstanden nach der Umstellung auf Docker-Compose) behoben |

---

## 2.3.0

> [!CAUTION]
> **Nicht empfohlen — Bekannte Fehler**
> Diese Version enthält einen Fehler. Es wird empfohlen, **direkt auf Version 2.3.1** zu aktualisieren.

---

## 2.2.0

### Neue Funktionen

#### Infrastruktur

| Funktion | Beschreibung |
|---|---|
| Docker-Compose | Gesamte Dienst-Infrastruktur auf Docker-Compose umgestellt |
| MQTT-Logger | MQTT-Logger als Ersatz für das MessageCenter eingeführt; in allen Container-Diensten integriert |


> Für diese Version sind keine separaten Download-Pfade hinterlegt.

---

## 2.1.0

### Neue Funktionen

#### Gateway

| Funktion | Beschreibung |
|---|---|
| SSL-Unterstützung | Gateway unterstützt nun SSL-gesicherte Verbindungen zur Cloud |
| Verbindungswiederherstellung | Verbessertes Verhalten bei Verbindungsverlust zur Cloud |


> Für diese Version sind keine separaten Download-Pfade hinterlegt.

---

## 2.0.0

### Neue Funktionen

#### Grundlegende Architektur

| Funktion | Beschreibung |
|---|---|
| Meta-Datentrennung | Trennung der Speicherung von Mess-Metadaten: UUID als Tags in der InfluxDB, Meta-Daten in relationaler Datenbank |
| IPCC | Internes Event- und Kommandosystem zur Propagierung von Änderungen an Geräte- und Messgröße-Strukturen |

#### Bedienoberfläche (Web UI)

| Funktion | Beschreibung |
|---|---|
| Modernisiertes UI | Überarbeitete und erweiterte Benutzeroberfläche |
| Variablen-Browser | Neuer Variablen-Browser zur Übersicht und Verwaltung der Messgrößen |

#### Gateway

| Funktion | Beschreibung |
|---|---|
| Neues Gateway | Neues Gateway mit Unterstützung für diverse Kunden |


> Für diese Version sind keine separaten Download-Pfade hinterlegt.
