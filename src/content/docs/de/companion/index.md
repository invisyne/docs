---
title: "Companion-Übersicht"
description: "Der Crawler.Companion ist eine Windows-Desktop-Anwendung zur Erkennung und Verwaltung von Edge (Crawler)-Geräten im lokalen Netzwerk."
---

Der Crawler.Companion ist eine Windows-Desktop-Anwendung zur Erkennung und Verwaltung von Edge (Crawler)-Geräten im lokalen Netzwerk. Er ist für das Vor-Ort-Management ausgelegt — während der Crawler.Hub die zentrale Verwaltung über mehrere Standorte hinweg übernimmt, wird der Companion direkt vor Ort von Technikern und Administratoren eingesetzt.

:::note
Der PC muss sich im selben Netzwerk wie das Edge (Crawler)-Gerät befinden.
:::

## Funktionsumfang

1. **Geräteerkennung** — Automatische Erkennung aller aktiven Edge (Crawler)-Geräte im lokalen Netzwerk
2. **Geräteverwaltung** — Anzeige von Gerätedetails und Bearbeitung wichtiger Parameter
3. **Netzwerkeinstellungen** — Konfiguration der IP-Adresse und anderer Netzwerkeigenschaften
4. **Software-Updates** — Firmware- und Software-Updates der Edge (Crawler)-Geräte durchführen
5. **Datenexport** — Konfigurations- oder Messdaten als CSV exportieren
6. **WebUI-Zugriff** — Web-Oberfläche des ausgewählten Geräts direkt im Browser öffnen

## Sicherheitshinweise

:::caution
Der Crawler.Companion kann Netzwerkeinstellungen der Edge (Crawler)-Geräte ändern. Unsachgemäße Änderungen können dazu führen, dass Geräte nicht mehr erreichbar sind.
:::

- Führen Sie Konfigurationsänderungen nur durch, wenn Sie mit den Grundlagen der Netzwerkkonfiguration (IP-Adressen, Subnetzmasken, Gateways) vertraut sind.
- Stellen Sie vor der Installation von Updates sicher, dass die Stromversorgung des Edge (Crawler)-Geräts nicht unterbrochen wird.

## Fehlerbehebung

| Problem | Mögliche Ursache | Lösung |
| --- | --- | --- |
| Gerät nicht gefunden | Gerät ist ausgeschaltet oder im falschen Netzwerk | Überprüfen Sie die Stromversorgung und stellen Sie sicher, dass sich das Gerät im selben Subnetz wie der PC mit dem Companion befindet |
| Fehler bei Netzwerkeinstellung | Falsche IP-Adresse oder Subnetzmaske eingegeben | Überprüfen Sie, ob die eingegebene statische IP-Adresse nicht bereits vergeben ist und im richtigen IP-Bereich liegt |
| Kein Zugriff auf WebUI | Gerät hat eine neue, unbekannte IP-Adresse | Überprüfen Sie die aktuelle IP-Adresse in der Geräteübersicht und versuchen Sie den manuellen Zugriff über den Browser |
| Update schlägt fehl | Unterbrechung der Netzwerkverbindung | Überprüfen Sie die Netzwerkstabilität; stellen Sie sicher, dass keine Firewall den Zugriff blockiert |
