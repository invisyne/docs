---
title: "Einrichten der Datenaufzeichnung"
description: "- IP-Adresse des Feldgeräts bestimmen - Geräte-Typ vom Feldgerät bestimmen (z.B."
sidebar:
  order: 2
---

# Vorbereitung

- IP-Adresse des Feldgeräts bestimmen
- Geräte-Typ vom Feldgerät bestimmen (z.B. Modbus, Simatic S7)
- Feld-Gerät mit dem Netzwerk des Edges verbinden

---
# Allgemeiner Ablauf

1. Feldgerät im Netzwerk vom Edge verfügbar machen

2. IP-Adresse und Typ vom Feldgerät ermitteln

3. Neues Gerät hinzufügen

4. Variablen importieren oder *manuell einrichten*

5. Daten visualisieren

---
# Gerät hinzufügen

![](../../../../../assets/images/edge/edge-device-add-menu.png)

- gehen sie im Hauptmenü auf “+ Geräte hinzufügen”
- Wählen Sie den passenden Geräte-Typen aus

![](../../../../../assets/images/edge/edge-device-add-type.png)

- geben sie die erforderlichen Informationen an (können je nach Geräte-Typ variieren)

![](../../../../../assets/images/edge/edge-device-add-details.png)

:::Paragraph{listStyleType="circle" indent="2"}
Netzwerk-Adresse vom Feldgerät
:::

:::Paragraph{listStyleType="circle" listStart="2" indent="2"}
Bezeichner (wird später bei der Einrichtung der Visualisierung benötigt, **kann erst ab Version 2.7 geändert werden**)
:::

:::Paragraph{listStyleType="circle" listStart="3" indent="2"}
weitere Geräte-spezifische Angaben
:::

:::Paragraph{listStyleType="circle" listStart="4" indent="2"}
optional: Vorlage auswählen
:::

- Sie können zusätzliche Informationen in Form von “Tags” angeben (Schlüssel-Wert-Paar)

![](../../../../../assets/images/edge/edge-device-add-tags.png)

- diese Informationen dienen lediglich weitere Meta-Informationen zu hinterlegen
- die Informationen werden später auf der Geräte-Seite angezeigt, aber haben im Edge-System keine weitere Verwendung.

---
# Messgrößen einrichten

![](../../../../../assets/images/edge/edge-device-list-edit-icon.png)

## Importieren (nur für “S7 symbolische Adressierung”)

:::note
ℹ Der Import der Messgrößen und deren Struktur auf dem Feldgerät wird aktuell nur für S7 Steuerung mit einer symbolischen Adressierung unterstützt.
:::

:::caution
⚠ Bei großen SPS-Strukturen kann der Import fehlschlagen. Wir arbeiten aktuell an einer Optimierung. Nutzen Sie alternativ den CSV-Import oder die manuelle Einrichtung.
:::

![](../../../../../assets/images/edge/edge-measured-variables-widget.png)

![](../../../../../assets/images/edge/edge-import-source-dialog.png)

- Voraussetzung: Verbindung zum Feldgerät konnte hergestellt werden
  - Dies wird auf der Geräte-Seite angezeigt bzw. wird mit einer Meldung bei Änderung im angezeigt

![](../../../../../assets/images/edge/edge-device-connected-status.png)

- mit Drücken von “von Gerät” werden Struktur und Messgrößen vom Feldgerät bezogen
- Es wird anschließend im “VariablenBrowser” die verfügbaren Messgrößen und deren umliegende Struktur angezeigt
  - Bereits importierte Messgrößen sind ***grau*** hinterlegt
  - Messgrößen, welche auf dem Edge eingerichtet sind, aber nicht beim Import auf dem Feldgerät gefunden wurden, sind ***gelb*** hinterlegt
- wählen Sie alle gewünschten Messgrößen aus, welche für die Datenaufzeichnung hinzufügen wollen
- gehen Sie anschließend zum “Warenkorb” → “Alle Importieren”

![](../../../../../assets/images/edge/edge-import-cart-basket.png)

- stellen Sie die gewünschte Konfiguration für diesen Import ein

![](../../../../../assets/images/edge/edge-import-global-config.png)

## Manuelle Einrichtung von Messgrößen

- Navigieren Sie auf der Geräte-Seite unter “Messgrößen” auf “Bearbeiten”
- In dem “VariablenBrowser” können Sie neue Gruppen und Messgröße

![](../../../../../assets/images/edge/edge-variable-browser-group-row.png)

Neue Gruppe:

![](../../../../../assets/images/edge/edge-variable-browser-new-group-icon.png)

Neue Messstelle: 

![](../../../../../assets/images/edge/edge-variable-browser-new-variable-icon.png)

### **Gruppen anlegen**

![](../../../../../assets/images/edge/edge-create-group-dialog.png)

- Bezeichner für die Gruppe (hat keinen Einfluss auf die spätere Adresse der Messgröße und dient zur Organisation)
- Sollen unterlagerter Messgrößen aufgezeichnet werden (**empfohlen = Ja,** diese Einstellung kann nicht geändert werden)
- optional: Meta-Informationen (haben aktuell keine Verwendung)

### Messgröße anlegen

![](../../../../../assets/images/edge/edge-create-variable-dialog.png)

- Name = Bezeichner der Messgröße, wird zur späteren Selektion in Grafana genutzt (kann später geändert werden)
- Logging = Soll die Aufzeichnung direkt nach dem Erstellen für diese Messgröße gestartet werden
- Intervall = Abtastrate
- Adresse = Adresse auf der SPS (Schema beachten: Spezifikation: Protokolle und Feldgeräte | Manuelle Eingabe der Adressen (!!!LINK) )
- Datentyp = Auswahl unterstützter Datentypen
- optional: Meta-Informationen (haben aktuell keine Verwendung im System)

---
# Anpassung eingerichteter Messgrößen

:::note
**Geplante Inhalte:**

- Was kann, wie bearbeitet werden.
- Bearbeiten einzeln und im Pulk
- Löschen (einzeln und im Pulk und Gruppen)
- Experten Modus (über JSON)
:::

![](../../../../../assets/images/edge/edge-device-details-variablen-link.png)

## Welche Einstellungen können bei einer Messgröße geändert werden?

- Name
  - ACHTUNG: Änderungen des Namen erfordern eine Anpassung in den bereits eingerichteten Dashboards
  - Der Name sollte innerhalb einer Gruppe-Ebene eindeutig sein, andernfalls kann es in der Visualisierung zu falschen Anzeigen kommen
- Abtastrate
  - Datenbereich: 10ms bis 500 h
  - Angabe in Millisekunden
- Aufzeichnung starten und stoppen
- Ausrichtung der Zeitstempel de-/aktivieren
- Aufzeichnungs-Metriken de-/aktivieren
- Tags hinzufügen/entfernen

## Einzelne Messgröße bearbeiten oder löschen

- Messgrößen identifiezieren / suchen
- inplace editieren
  - Name und Abtastrate (ms)

Dialog über Icon:

![](../../../../../assets/images/edge/edge-variable-edit-icon.png)

:::Paragraph{listStyleType="circle" indent="2"}
Abtastrate
:::

:::Paragraph{listStyleType="circle" listStart="2" indent="2"}
Aufzeichnung starten und stoppen
:::

:::Paragraph{listStyleType="circle" listStart="3" indent="2"}
Ausrichtung der Zeitstempel de-/aktivieren
:::

:::Paragraph{listStyleType="circle" listStart="4" indent="2"}
Aufzeichnungs-Metriken de-/aktivieren
:::

:::Paragraph{listStyleType="circle" listStart="5" indent="2"}
Tags hinzufügen/entfernen
:::

:::Paragraph{listStyleType="circle" listStart="6" indent="2"}
Löschen (Bestätigung erforderlich)
:::

:::Paragraph{listStyleType="square" indent="3"}
ACHTUNG: Messgrößen können in der Visualisierung nicht mehr abgerufen werden. Bereits eingerichtete Panels zeigen u.u. fehlerhafter oder keine Daten an.
:::

:::Paragraph{listStyleType="square" listStart="2" indent="3"}
Aktuell werden die aufgezeichneten Daten nicht gelöscht, verbrauchter Speicherplatz wird daher nicht freigegeben
:::

:::Paragraph{listStyleType="square" indent="2"}

:::

![](../../../../../assets/images/edge/edge-variable-edit-dialog.png)

## Mehrere Messgrößen im Pulk bearbeiten oder löschen

- gewünschte Messgrößen im VariablenBrowser selektieren (Hinzufügen zum “Shopping Card”)
  - Auswahl wir&#x64;** farblich markiert**
  - Anzahl ausgewählter Messgrößen wird am Shopping Card angezeigt
    - oben rechts:

![](../../../../../assets/images/edge/edge-cart-badge-count.png)

- Shopping Card öffnen

![](../../../../../assets/images/edge/edge-cart-selection-list.png)

- Auswahl bei Bedarf anpassen (“x” entfernt die Messgröße nur vom Shopping Card, diese wird nicht gelöscht)
- “Alle Bearbeiten”

![](../../../../../assets/images/edge/edge-bulk-edit-dialog.png)

- überschreiben einzelner Einstellungen für alle Messgrößen
- sind die bisherigen Einstellungen unterschiedlich in der aktuellen Auswahl, wird dies angezeigt

![](../../../../../assets/images/edge/edge-bulk-edit-mixed-values.png)

- durch Markieren der Checkbox, kann eine einzelne Einstellung überschrieben werden
  - die Einstellung kann mit „übernehmen“ auf alle ausgewählten Messgrößen angewandt werden.
- Nach übernehmen gelangt man in den Shopping Card zurück. Dieser kann nun geschlossen oder es können weitere Bearbeitungen vorgenommen werden.
