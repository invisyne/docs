---
title: "Erst-Einrichtung"
description: "In dieser Anleitung finden Sie Informationen für die Erst-Einrichtung des Edges."
sidebar:
  order: 1
---

In dieser Anleitung finden Sie Informationen für die Erst-Einrichtung des Edges. Mithilfe eines Wizards werden Sie durch mehrere Schritte geleitet. Erst nach Abschluss des Wizards ist der Edge-betriebsbereit.

:::caution
💡  Bitte beachten Sie, dass nach dem Abschluss der Wizard der Edge neu   gestartet werden muss. Dies kann wenige Minuten in Anspruch nehmen.
:::

---
# Verbindung mit dem Edge herstellen

:::tip
🌏 💻  Der Zugriff auf den Edge erfolgt mit dem **Browser**. 
*           Es wird empfohlen Chrome, Edge oder Firefox zu nutzen.*
:::

Um Verbindung mit dem Edge aufzubauen, muss man über das Netzwerk verbunden sein. Bei Auslieferung oder nach dem Zurücksetzen auf Werkseinstellungen werden die IP-Adresse auf Standard-Werte gesetzt:

- X1: 192.168.0.5
- X2: 192.168.1.5

Ist der Edge in einem anderen Subnetz, kann das *Discovery-Tool* behilflich sein. Dieses ermöglicht den X1 Adapter zu konfigurieren, sodass im Anschluss direkt auf die Web-Oberfläche zugegriffen werden kann.

---
# Einrichtungs-Wizard

Mit dem Wizard wird die Erst-Konfiguration des Edge-Systems vorgenommen. Diese Vorgang wird nach einem Zurücksetzen des Edges erneut erforderlich.

---
## Sprache

![](../../../../../assets/images/x1alKZp6lyxr-fbTtpQGS_7f7e5f5a-bca8-49ab-98fc-4a2c4237de6b.png)

- Auswahl der Sprache
- aktuelle Auswahl-Möglichkeiten: Deutsch und Englisch
- Hinweis: Diese Einstellung ist nur lokal im Browser, nicht Nutzer-Übergreifend
- kann später geändert werden: ja

---
## Bezeichnung und Orts-Kennzeichen

![](../../../../../assets/images/a-OsD-8bXRxnwjsQCW8L0_263ac1d6-ad55-4e84-b3be-580a45f8c2dc.png)

- erfordeliche Angaben:
  - Name = Bezeichner im Netzwerk, in der Anzeige, und im Gateway 
    -  ⚠ kann später **nicht** geändert werden (zurücksetzen auf Werkseinstellungen erfoderlich)
    - Längen-Beschränkung: max. 20 Zeichen 
      *(es wird empfohlen, keine Sonder- und Leerzeichen zu verwenden)*
  - OKZ / BMK = freie Angaben, dienen der Zuordnung
    - kann später geändert werden
    - können u.u. bei Funktionen zur Daten-Weiterleitung verwendet werden

---
## Sicherheit

![](../../../../../assets/images/xFG8jzw_vn_exe19_2qxN_bd868d7a-2df6-423c-9a5e-bff2e4aec58f.png)

Im nächsten Schritt ist das Passwort für den Einstellungsbereich im Edge zu setzen. Dieses Passwort kann später geändert werden.

:::note
- Das Passwort muss eine Länge von mind. 6 Zeichen haben.
- Für den Login wird der Benutzer “admin” und das hier bei der Einrichtung gesetzte Passwort benötigt.
:::

---
## Uhrzeit und Datum

![](../../../../../assets/images/Rui9C5o0WnVl2PK7A2KcL_88b9f2f9-edb8-42cc-85a8-9f203d50ae05.png)

### Allgemein

- Manuell und automatisch (NTP-Server) wird unterstützt

![](../../../../../assets/images/4rIBbIJzqOw3jY0-b5pm6_6da4de6f-8d64-4bb7-9f78-1957fafd8aee.png)

Modus kann umgeschaltet werden 

- Angabe der Zeitzone (Auswahl aus Liste)

### Automatisch (per NTP-Server)

- automatische Synchronisation (Intervall???)
- Nutzung des angegebenen Servers, kann geändert werden
- Voraussetzung: Server kann vom Edge erreicht werden (egal, welche `LAN-Adapter`)

![](../../../../../assets/images/Ss9ye-RBXOTtskYXePN43_6ead054f-276a-408b-8f87-601a7a771231.png)

### Manuell

- umstellen auf „manuell“
- Uhrzeit und Datum können händisch angegeben werden
- Uhrzeit bezieht sich auf die ausgewählten Zeitzone

![](../../../../../assets/images/M9EB-z9cuRGbD2u2_nh5N_aadcc55a-537e-4386-a5bb-47297dab94ea.png)

---
## Netzwerk-Einstellungen

![](../../../../../assets/images/V_Nczs6Jtzcz0s7MtbLnw_927a33c3-432e-4e37-9612-944e3067d72e.png)

- es gibt, je nach Gerät, mehrere Netzwerkadapter
- Jeder Adapter hat eine voreinstellte IP bei der Auslieferung bzw. nach einem Zurücksetzen auf Werkseinstellungen
- Je nach Hardware-Variante, z.B. WAGO oder Siemens, sind Netzwerkadapter am Gerät mit X1 (=eth0) und X2 (=eth1) bezeichnet.

                                                        

::::VerticalSplit{layout="middle"}
:::VerticalSplitItem
**Siemens:** 

![](../../../../../assets/images/3KF07gM4AtNX1tbb3PAAH_31d569fb-0578-4caf-9f6d-8208bf6c4fd9.jfif)
:::

:::VerticalSplitItem
**WAGO:**

![](../../../../../assets/images/h3TMS_WgYJdIBIdk17Z5U_8b3534a5-b223-486d-bdd6-2d00235f3dad.jfif)
:::
::::

**                                                                 **

Bei dem Einsatz als VM kann es zu Abweichungen bei der Anzahl der Netzwerkadapter kommen.

---
### Adapter

- für jeden Anschluss/Adapter kann eingestellt werden:
  - IP-Adresse
  - Subnetz-Maske
  - Standard-Gateway
  - de-/aktivieren von DHCP

![](../../../../../assets/images/musrzhm8p20NsmpkeYVUa_d8b18e61-d175-41db-a216-09bb7ec893a4.png)

### DNS + Domain

- Zusätzlich kann Adapter-übergreifend die Domain und DNS angegeben werden
- alle Angaben sind optional
- es können bis zu 5 DNS angegeben werden
- einzelne DNS können gelöscht werden

![](../../../../../assets/images/jZZo3hKtul3yab7UoA8Tq_fb430aab-4258-43f4-bd31-94b4335c2ded.png)

---
## Abschließen

![](../../../../../assets/images/xw_nuC9k3G67iwYiAPWQf_1afbc729-882a-414d-93ca-65c125ab77ae.png)

Die Erst-Einrichtung ist abgeschlossen. Mit Drücken des „Abschließen“ Buttons wird der Edge neu gestartet. Es kann anschließend mit der Einrichtung der Datenaufzeichnung fortgesetzt werden.
