---
title: "Sicherheit: Zertifikate"
description: "Warum die Weboberfläche standardmäßig HTTPS verwendet, warum Browser eine Zertifikatswarnung anzeigen und was dagegen zu tun ist."
sidebar:
  badge:
    text: "2.22+"
    variant: note
---

Ab Edge 2.22 wird die Weboberfläche standardmäßig über **HTTPS** bereitgestellt. Diese Seite erklärt, warum das so ist, warum der Browser beim ersten Zugriff eine Sicherheitswarnung anzeigt und welche Möglichkeiten Sie haben. Die Schritt-für-Schritt-Anleitungen finden Sie über die Links am Ende der Seite.

## Warum die Weboberfläche HTTPS verwendet

HTTPS verschlüsselt alles, was zwischen dem Browser und dem Edge-Gerät ausgetauscht wird — Anmeldedaten, Sitzungs-Tokens, Konfiguration und Messwerte. Würde die Oberfläche über unverschlüsseltes HTTP bereitgestellt, würden all diese Daten im Klartext über das Netzwerk übertragen.

Verschlüsselung bei der Übertragung ist zudem zunehmend eine regulatorische und beschaffungsseitige Anforderung für Industrieausrüstung. Rahmenwerke wie **IEC 62443**, die EU-Richtlinie **NIS2**, der **Cyber Resilience Act** und die EU-**Maschinenverordnung** weisen alle in Richtung verschlüsselter Kommunikation für vernetzte Geräte. Indem die Oberfläche standardmäßig über HTTPS läuft, sind Edge-Installationen ohne spätere Nachrüstung auf diese Anforderungen vorbereitet.

## Warum der Browser eine Warnung anzeigt

Standardmäßig präsentiert das Edge-Gerät ein **selbstsigniertes Zertifikat**. Die Verbindung ist vollständig verschlüsselt, aber der Browser kann das Zertifikat nicht auf eine öffentliche Zertifizierungsstelle (CA) zurückführen und daher die Identität des Geräts nicht automatisch bestätigen — also warnt er.

:::note
Die Warnung betrifft die **Identitätsprüfung, nicht die Verschlüsselung**. Die Verbindung ist verschlüsselt, unabhängig davon, ob die Warnung angezeigt wird. Der Browser signalisiert lediglich, dass er nicht bestätigen kann, *wer* sich am anderen Ende befindet — nicht, dass der Kanal unsicher ist.
:::

Ein öffentlich vertrauenswürdiges Zertifikat (die Art, die automatisch ein Schloss-Symbol erzeugt, z. B. von Let's Encrypt) ist für ein typisches Edge-Gerät keine Option:

- Öffentliche CAs stellen Zertifikate nur für **öffentlich auflösbare Domainnamen** aus. Edge-Geräte werden normalerweise über die **IP-Adresse** in einem privaten oder Werksnetzwerk erreicht.
- Die Domain-Validierung erfordert **Internetzugang**, über den viele Edge-Netzwerke nicht verfügen — manche sind vollständig vom Netz getrennt (Air-Gap).

Ein selbstsigniertes Zertifikat ist der Standardansatz für private Infrastruktur; seine Verschlüsselungsstärke ist identisch mit der eines öffentlich vertrauenswürdigen Zertifikats. Der einzige Unterschied besteht darin, dass der Browser ihm nicht von vornherein vertraut.

## Das Standardzertifikat

Das mit dem Gerät ausgelieferte Zertifikat wird **einmalig erzeugt und bleibt unverändert** — es wird nicht automatisch neu erzeugt, wenn sich die IP-Adresse des Geräts ändert. Das ist beabsichtigt: Ein Zertifikat, das sich unbemerkt ändert, würde das bereits aufgebaute Vertrauen brechen und könnte die Oberfläche in einem nur teilweise geladenen, schwer wiederherstellbaren Zustand zurücklassen. Da das Standardzertifikat unveränderlich ist, bleibt das Verhalten des Browsers vorhersehbar, sobald entschieden wurde, wie mit der Warnung umzugehen ist.

## Ist es sicher, die Warnung zu übergehen?

In den meisten Installationen: ja. Die Browser-Warnung ist für das offene Internet gedacht, wo man dazu verleitet werden könnte, sich mit einer Fälschung einer öffentlichen Website zu verbinden, die man nicht anderweitig identifizieren kann. Der Zugriff auf ein Edge-Gerät ist eine andere Situation: Sie verbinden sich mit einem **bestimmten Gerät unter einer bekannten Adresse in Ihrem eigenen lokalen oder industriellen Netzwerk**, und der Datenverkehr bleibt innerhalb dieses Netzwerks. Die Warnung erscheint nur, weil das Zertifikat selbstsigniert ist — nicht, weil die Verbindung unsicher wäre oder das Gerät manipuliert wurde. Die Verbindung ist in jedem Fall verschlüsselt.

## Umgang mit der Warnung

1. **Die Warnung übergehen — die richtige Wahl für die meisten Fälle.** Es ist keine Einrichtung erforderlich, die Verbindung bleibt verschlüsselt, und — wie oben erläutert — ist dies für ein Edge-Gerät im eigenen Netzwerk völlig akzeptabel. Jeder Browser bietet die Möglichkeit fortzufahren; danach merkt er sich die Entscheidung für dieses Gerät.

2. **Eigenes Zertifikat hochladen.** Wenn Ihre Organisation bereits über eine Zertifikatsinfrastruktur verfügt — eine PKI oder interne CA wie **Active Directory Certificate Services (AD CS)** — oder bei Anwendungen, bei denen das Wegklicken der Warnung unpraktisch ist (gemeinsam genutzte Rechner oder Kiosk-Systeme, automatisierter Zugriff), können Sie ein Zertifikat installieren, dem Ihre Rechner bereits vertrauen. Die Warnung entfällt dann vollständig, während HTTPS aktiv bleibt. Siehe **[Eigenes HTTPS-Zertifikat installieren](/de/edge/how-to/https-certificate)**.

## Optional: HTTP erlauben

Wenn HTTPS in Ihrer Umgebung unpraktikabel ist, kann Edge 2.22 die Oberfläche auch über unverschlüsseltes **HTTP** bereitstellen — *zusätzlich* zu HTTPS, nicht anstelle davon. Die Einstellung heißt **HTTP erlauben**:

- **Standardmäßig** (HTTP erlauben aus) wird jede über HTTP eingehende Anfrage automatisch auf HTTPS umgeleitet, sodass der gesamte Datenverkehr verschlüsselt wird.
- **Bei aktiviertem „HTTP erlauben"** werden über HTTP eingehende Anfragen über HTTP bedient, während Anfragen über HTTPS weiterhin über HTTPS bedient werden. Clients, die sich über HTTP verbinden, werden lediglich nicht mehr umgeleitet.

Anfragen über HTTP zu bedienen entfernt die Transportverschlüsselung: Die gesamte Kommunikation zwischen Browser und Gerät wird im Klartext übertragen. Ob das akzeptabel ist, ist eine Entscheidung, die **gemeinsam mit Ihrer IT- oder Sicherheitsabteilung** getroffen werden sollte — und in der Regel nur für isolierte Netzwerke.

Bedenken Sie, dass der einzige wirkliche Nachteil von HTTPS die gelegentliche Zertifikatswarnung ist — die ein eigenes Zertifikat vollständig beseitigt. Siehe **[HTTP erlauben](/de/edge/how-to/http-mode)** für die vollständige Liste der Risiken und das Vorgehen.

## Anleitungen

- **[Eigenes HTTPS-Zertifikat installieren](/de/edge/how-to/https-certificate)** — ein Zertifikat von der CA Ihrer Organisation beziehen (oder erstellen) und auf das Gerät hochladen, um die Warnung zu beseitigen.
- **[HTTP erlauben](/de/edge/how-to/http-mode)** — die Oberfläche zusätzlich zu HTTPS über HTTP bereitstellen, und die damit verbundenen Sicherheitskompromisse.
