---
title: "Weiterleitung an AWS (IoT)"
description: "Damit ein Crawler eine Verbindung mit dem IoT Core von AWS aufbauen kann, muss das Gerät in AWS ange"
---

:::note
This page has not been translated yet. Content is shown in German.
:::

:::danger
ℹ Diese Funktion ist mit dem hinzubuchbaren AWS Gateway Modul verfügbar. Sprechen Sie uns gerne an.
:::

# At-a-glance

Damit ein Crawler eine Verbindung mit dem IoT Core von AWS aufbauen kann, muss das Gerät in AWS angelegt und mit einem Zertifikat eingerichtet werden. Das Zertifikat kann vom Gateway-Endpoint genutzt werden, um sich zu authentifizieren. 

Folgende Anleitung beschreibt die erforderlichen Schritte, um ein Crawler als ein IoT-Gerät einzurichten.

# Gerät (Thing) im IoT Core anlegen

1. im AWS Console Portal einloggen und zum AWS IoT Core wechseln
2. unter „Manage“ → “Things” ein neues Gerät anlegen
   - ⚠ Der Thing-Name muss mit dem “Hostname” des Crawlers übereinstimmen
   - “Thing Type” auswählen
3. “Device certificate” erstellen
   - Die Zertifikats-Dateien gut aufbewahren!!!!
   - **Wichtig**: Policies vergeben 

# Zertifikat einrichten und konvertieren

Sowohl das Zertifikat, als auch die zugeordnete Policy kann im Nachhinein geändert werden. Wobei das Zertifikat nicht erneut heruntergeladen werden kann, es kann allerdings ein weiteres erstellt werden.

Die Zertifikats-Dateien sind nach dem Download von AWS nicht im erforderlichen Format für den Endpoint. Es wird eine “.pfx” Datei erforderlich. Diese wird aus dem privaten Schlüssel (`...-private.pem.key`), dem Zertifikat (`...-certificate.pem.crt`) und dem AWS Root Zertifikat (`AmazonRootCA1.pem`) erstellt.

### Linux

1. WSL-Umgebung öffnen
2. zum Verzeichnis mit den heruntergeladenen Zertifikats-Dateien navigieren
3. Folgenden Befehl nutzen:

```
openssl pkcs12 -export -in certificate.pem.crt -inkey private.pem.key -out THINGNAME\_certificate.pfx -certfile AmazonRootCA1.pem
```

4. Es wird nach einem „Export“ Passwort gefragt, dieses muss aktuell ein definiertes sein, da der Endpoint zum Öffnen des Zertifikats dieses festgelegt bekommen hat
   - Passwort kann bei AK oder RM erfragt werden
   - Alternativ könnte es Einträge in der Crawler-Keypass geben, bei denen das Passwort angegeben wurde.

### Windows

Unter Windows kann in der Powershell das Tool “CertUtil” verwendet werden.

1. Zertifikats- und Privat-Key-Datei muss den gleichen Namen haben und die jeweilige Dateiendung “crt” und “key” haben
2. in der Shell

```
certutil -mergepfx \<certificate-name>.crt \<result-name>.pfx
```

3. Es wird nach einem Kennwort gefragt. Diesen muss aktuell ein vordefiniertes sein, welches vom Crawler-Endpoint erwartet wird. (Passwort ist beim Kundensupport anzufragen).

:::note
ℹ Es wird empfohlen, sowohl alle Dateien, das genutzte Passwort bei der Konvertierung als auch den Hostname abzulegen.
:::

# Gateway Endpoint einrichten

1. Um Crawler-UI navigieren zu: “System > Einstellungen” → Gateway → gewünschten Endpoint 
2. unter “Login-Daten”: Zertifikats-Datei hochladen und speichern

# Messgrößen hinzufügen

## Manuell

1. Navigieren Sie zum gewünschten Dispatcher: „Weiterleitung“ → „Endpoint“ → „gewünschte Dispatcher“ (z.B. Dispatcher NuP)
2. Klicken Sie um unteren Bereich auf den “+” Button
3. Wählen Sie die gewünschte(n) Messgröße(n) aus.
4. Geben Sie die initiale Einstellung, wie das Aggregations-Intervall an (diese Einstellung kann jederzeit geändert werden)
5. Speichern

Es können weitere Messgrößen hinzugefügt werden.

## Automatisiertes Beziehen verfügbar ab Version 2.14 

### 1. Messgrößen markieren

Zum automatisierten Beziehen von Messgrößen muss die für den Versand vorgesehenen Messgröße mit einem Parameter ausgestattet werden. Gehen Sie hierzu in die Auflistung der Messgrößen eines Geräts und öffnen den Bearbeitungs-Dialog für die jeweilige Messgröße. Hier fügen Sie einen weiteren Parameter mit dem Bezeichner gateway\_aggregation hinzu.

![](../../../../assets/images/Zf1sFrRI-o_2fofhEwEhG_75b4bffc-2c19-49a2-92fe-5bed121ef1e4.png)

**Aggregations-Intervall**

Das Aggregations-Intervall wird als String-Literal angegeben und folgt folgendem Schema:

- s = Sekunden
- m = Minuten
- h = Stunden

Ein Wert kann also beispielsweise folgendermaßen aussehen:

- 15s
- 1m
- 2h

**Roh-Werte übertragen**

Soll die Messstelle roh (nicht aggregiert) übertragen werden, ist als Wert „0“ (“Null”, ohne Zeit-Literale) für den Parameter anzugeben.

:::caution
Aufgrund eines Bugs können Parameter nicht mehr aus einer Messgröße vollständig gelöscht werden. Damit dennoch die Messgröße nicht mehr für das Gateway selektiert ist, kann der Wert für den Eintrag **LEER **&#x67;elassen werden.
:::

![](../../../../assets/images/usOM1383pTcEx3KCCaQ2h_8d2c4afe-adb6-4733-ba79-62e1019c4365.png)

### 2. Beziehen im Gateway

Um das automatisierte Beziehen anzustoßen, klicken Sie im jeweiligen Dispatcher den Button „Messgrößen beziehen“.

![](../../../../assets/images/bWMOYYHRn-q1wzaibKVzj_1b7428a9-badb-4931-b176-7f57f709a00f.png)

Nach einem kurzen Moment werden die zuvor markierten Messgrößen dem Dispatcher mit der jeweiligen Aggregation eingerichtet.

:::note
Der automatisierte Import ist nur möglich, solang keine Messgröße aktuell dem Gateway hinzugefügt sind. Manuelle Änderungen werden somit nicht überschrieben. Sind bereits Messgrößen hinzugefügt, müssen diese vom Gateway entfernt werden. Mit der neuen Pulk-Bearbeitungsfunktionen kann dies mit wenigen Klicks erfolgen.
:::
