---
title: "Visualisieren von Messwerten"
description: "VerticalSplitItem - Für die Visualisierung der Messwerte und anderer Daten wird die Visualisierungsp"
---

:::note
This page has not been translated yet. Content is shown in German.
:::

:::tip
 Gültig ab Crawler Version = **2.7.1**
:::

## Allgemeine Informationen zur Visualisierung (Grafana)

::::VerticalSplit{layout="right"}
:::VerticalSplitItem
- Für die Visualisierung der Messwerte und anderer Daten wird die Visualisierungsplattform “Grafana” genutzt.
- Diese bietet vielseitige Möglichkeiten Daten darzustellen
- Je nach Datenpunkte und Use Case stehen diverse Anzeigemöglichkeiten zur Verfügung
- In Dashboard können mehrere Panels eingerichtet werden
- Jedes Panel kann mehrere Messgrößen umfassen und individuell eingestellt werden.
- Tutorials und allgemeine Tipps & Trick zu Grafana
  - [Grafana documentation | Grafana documentation ](https://grafana.com/docs/grafana/v7.4/)
  - [Tutorials | Grafana Labs](https://grafana.com/tutorials/)                                               
  - [Tips for Designing Grafana Dashboards](https://www.percona.com/blog/designing-grafana-dashboards/) 
  - …
:::

:::VerticalSplitItem
![](../../../../assets/images/mEJxXv-fIiPj5ye_5oWQQ_4ef10733-2865-4726-99ab-70c1d6cba655.png)

:::
::::

:::note
ℹ Im Crawler wird Grafana mit der Version 7.4 eingesetzt.
:::

---
## Viewer vs. Editor

Für die Anzeige zuvor eingerichteter Dashboards ist keine Anmeldung erforderlich. Möchten sie neue Dashboards oder Panels erstellen oder bestehende bearbeiten müssen Sie sich mich einem “Editor” Account einloggen.

Zum Einloggen gehen Sie auf das Symbol im unteren linken Bereich. Sie werden anschließend nach einem `Nutzernamen und einem Passwort` gefragt.

![](../../../../assets/images/32agWcXqkSoIr_ihLngAm_a610a4b9-56d0-4802-b533-5ea9436d77d7.gif)

## Dashboards erstellen

::::VerticalSplit{layout="right"}
:::VerticalSplitItem
Zum Erstellen eines neuen Dashboards klicken Sie in der linken Menü-Leiste auf “+”-Symbol und Wählen “Dashboard” aus. Eine Seite mit einem blanken Panel wird geöffnet.

Sie können nun Inhalte dem Dashboard hinzufügen und erweitere Einstellungen vornehmen.
:::

:::VerticalSplitItem
![](../../../../assets/images/v-PF6ACKugWYgVL2vufIp_9b7a0d95-1c78-4029-82be-f8dfd8c4b5e7.png)
:::
::::

:::::VerticalSplit{layout="middle"}
:::VerticalSplitItem
![](../../../../assets/images/pI0Ss8kjtveIQd3WdcMKc_2a350a82-24c9-45cc-9d51-534372fb16aa.png)
:::

::::VerticalSplitItem
:::caution
Damit das Dashboard dauerhaft existiert, muss dieses zunächst **gespeichert **&#x77;erden. Klicken Sie hierzu auf das 💾 -Symbol im oberen rechten Bereich.

In dem sich öffnenden Dialog können Sie dem Dashboard einen Namen geben (kann später geändert werden) und dieses in einen Ordner sortieren. Klicken Sie anschließend auf “Save”.
:::
::::
:::::

![](https://app.archbee.com/api/optimize/5QJBvgamF9LtImfLB456o/JdMThWchYHqpthwj6FkU__a4af0ef0-8615-4fc5-8267-ff03ad19e583.gif "Erstellen und Speichern eines neuen Dashboards")

### Anlegen von Ordnern

Ordner dienen der Sortierung von Dashboards. Sie können beliebig viele Ordner erstellen und Dashboards diesen zuordnen.

![](../../../../assets/images/UBxOfgr4f7qQ_u1OuwGLK_258ba3a0-24d8-45c7-99b7-e25a6234ef5e.gif)

::::VerticalSplit{layout="middle"}
:::VerticalSplitItem
Zur Erstellung eines Ordners klicken Sie im linken Menü auf das “+”-Symbol und wählen Sie im Untermenü “Folder” aus. 

Geben Sie den gewünschten Namen für den Ordner an und bestätigen mit “Create”.
:::

:::VerticalSplitItem
![](../../../../assets/images/g0MGUFIAINugOcd_gSDPf_6a18c1f6-ed48-4bd9-a17c-ad61c872fac8.png)

![](../../../../assets/images/dLspt0YbLdpmHIJ1p3Zto_62de681f-d95c-4329-a2c0-dd271ea2e8f4.png)

:::
::::

### Ex-/Import von Dashboards

Sie können Dashboards exportieren und diese auf einem anderen Gerät oder zur Wiederherstellung importieren werden.

::::VerticalSplit{layout="left"}
:::VerticalSplitItem
![](../../../../assets/images/pY8fJRbm7UDS-3f6ABJoQ_4273f10f-0b18-4624-b628-95db5f364dac.png)

:::

:::VerticalSplitItem
Öffnen Sie ein Dashboard, welches Sie **exportieren **&#x6D;öchten. Klicken Sie im oberen linken Bereich auf das “Share”-Symbol (neben dem Titel) und wählen die Option “Export” aus. Mit “Save to file” laden Sie das Dashboard (Einstellungen und Panels) als Datei herunter.
:::
::::

Um ein exportiertes Dashboard zu **importieren**, klicken Sie zunächst auf das “+”-Symbol im linken Menü und wählen “Import”. Im folgenden Dialog können Sie die Dashboard-Datei (Datei-Endung = .json) auswählen. Sie können nun den Namen, den Ordner und die UID des Dashboards ändern. Sollte es bereits ein Dashboard mit gleichem Namen oder UID geben, müssen die entsprechenden Informationen angepasst werden. Sie können auch das bestehende Dashboard überschreiben.

![](https://app.archbee.com/api/optimize/5QJBvgamF9LtImfLB456o/CEqGG03aEmZ_WikrQHL1V_527135dd-01da-4713-a07b-a37fccfad451.gif "Export und Import eines Dashboards")

## Inhalt einem Dashboard hinzufügen

Ein Dashboard besteht hauptsächlich aus sogenannten Panels. Diese können individuell erstellt und eingestellt werden.

::::VerticalSplit{layout="left"}
:::VerticalSplitItem
![](../../../../assets/images/HlERS388cP1Wbba7VFOyh_51d5dc27-a3cb-42e0-b6cb-928ab9854acc.png)

:::

:::VerticalSplitItem
Um ein neues Panel anzulegen, klicken Sie auf das “+”-Symbol im oberen rechten Bereich (links neben dem Speichern-Symbol).
:::
::::

Ein neues Panel wird immer oben eingefügt, kann dann anschließend individuell im Dashboard platziert werden. Wählen Sie in der hinzugefügten Box “+ Add new panel”. Sie werden auf die Editor-Seite für ein Panel geleitet. Dieser Bereich ermöglicht die Konfiguration der Datenquelle und der Anzeige.

![](../../../../assets/images/bCvzip4vhYgt_H5xLL8mR_5ad99297-d4e7-4ec6-8237-ff5befc7e1a3.gif)

### Messgröße auswählen

Damit Daten in einem Panel angezeigt werden können, muss mindestens eine Messgröße ausgewählt werden. Dies erfolgt im unteren Bereich, unterhalb der Vorschau für die Anzeige.

![](../../../../assets/images/BTGVpGd3Ghsgq_9K6oT7n_ddfe4ece-7576-400e-8087-cb2f38e8a9de.png)

1. **Select Measurement***:* wählen Sie hier source aus. Sollte dies nicht zur Wahl stehen, wurden noch keine Werte zu eingerichteten Messgrößen aufgezeichnet. Möchten Sie dennoch die Visualisierung einrichten, können Sie source auch manuell eingeben (beachten sie die Kleinschreibung).

2. **Feld-Gerät wählen**: Klicken Sie auf das “+”-Symbol rechts neben “WHERE” und wählen “device\_name”. Klicken Sie anschließend auf “select tag value” und wählen das gewünschte Gerät aus.

3. **Ordner wählen**: Zum Selektieren einer Messgröße muss zunächst der Ordner, in dem die Messgröße angelegt wurde, ausgewählt werden (siehe How-To: Hinzufügen von Messgrößen, How-To: Bearbeiten eingerichteter Messgrößen). Klicken Sie hierzu erneut auf “+”-Symbol und wählen “group\_\*”. Klicken Sie anschließend auf “select tag value” und wählen den gewünschten Ordner aus. Wiederholen Sie diese Schritte, bis Sie in dem Ziel-Ordner angekommen sind.

4. **Messgröße wählen**: Klicken Sie erneut auf das “+”-Symbol und wählen “variable” aus. Wählen Sie aus der Liste die gewünschte Messgröße aus. Sie können durch Text-Eingabe die Auswahl filtern.

Insofern für die ausgewählte Messgröße bereits Werte in dem aktuellen Zeitbereich aufgezeichnet wurden, sollten diese im Vorschau-Bereich anzeigt werden.

:::caution
Wurde die Auswahl der Messgröße noch nicht vollständig abgeschlossen (z. B. wurde nur das Gerät ausgewählt), werden bereits Werte in der Vorschau angezeigt. Diese sind nicht korrekt und entsprechen einer Kombination von mehreren Messgrößen. Es ist daher entscheidend, am Ende eine Messgröße (“variable”) ausgewählt zu haben.
:::

![](../../../../assets/images/C_t2FQzv6JqaX_2r_2GUb_f8bcc5fe-4faf-4db2-8019-15d0c5adaa88.gif)

### Messgrößen vom Typ “String”

::::VerticalSplit{layout="right"}
:::VerticalSplitItem
Messgrößen, welche im Crawler als String gespeichert werden `(z.B. S7_DWORD`, siehe *Spezifikation: Protokolle und Feldgeräte*) erfordern eine Änderung des Wert “field”. Klicken Sie hierzu auf “value” im Bereich “Select”. Geben Sie den Text `“stringValue” `ein (⚠ beachten Sie die Groß-/Kleinschreibung). 
:::

:::VerticalSplitItem
![](../../../../assets/images/ACfznD9vgz55KoiKz1Mnn_ba9efcf4-6e6e-4e77-9487-2df8bfad28ab.png)

:::
::::

### Anzeigetyp (“Visualization”) ändern und anpassen

::::VerticalSplit{layout="left"}
:::VerticalSplitItem
![](../../../../assets/images/jRQNreJaNDKnXsqWuR_hR_901184c9-836a-4718-adeb-eab11323d625.png)

:::

:::VerticalSplitItem
Grafana bietet diverse Darstellungsmöglichkeiten bereit. Diese sind u.a. Diagrammen (Linien, Balken), einzelne Werte, Gauges oder Tabellen. Je nach Darstellung können unterschiedliche Einstellungen (Achsen, Legende, Farben, Bezeichner) vorgenommen werden. Es sei hier auf die offizielle *Dokumentation *&#x75;nd *Tutorials *&#x76;on Grafana verwiesen.

Alle Einstellungen können im rechten Bereich vorgenommen werden.
:::
::::
