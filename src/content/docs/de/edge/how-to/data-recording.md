---
title: "Einrichten der Datenaufzeichnung"
description: "- IP-Adresse des Feldgeräts bestimmen - Geräte-Typ vom Feldgerät bestimmen (z.B."
---

# Vorbereitung

- IP-Adresse des Feldgeräts bestimmen
- Geräte-Typ vom Feldgerät bestimmen (z.B. Modbus, Simatic S7 → siehe “Unterstützte Geräte-Typen” \[TODO])
- Feld-Gerät mit dem Netzwerk des Crawlers verbinden

---
# Allgemeiner Ablauf

1. Feldgerät im Netzwerk vom Crawler verfügbar machen

2. IP-Adresse und Typ vom Feldgerät ermitteln

3. Neues Gerät hinzufügen

4. Variablen importieren oder *manuell einrichten*

5. Daten visualisieren

---
# Gerät hinzufügen

![](../../../../../assets/images/HEm7w-Oz81hDyMKRU3X3l_f0d68851-5541-4ad6-9f5b-b833468793dd.png)

- gehen sie im Hauptmenü auf “+ Geräte hinzufügen”
- Wählen Sie den passenden Geräte-Typen aus

![](../../../../../assets/images/rW7ixqU4nTlXfVXWML1Ma_46c4772d-8da2-4d89-8e43-c77430720168.png)

- geben sie die erforderlichen Informationen an (können je nach Geräte-Typ variieren)

![](../../../../../assets/images/urz5KiPHHs0gtVljc7XMc_3ebe959f-664a-480b-b790-5df825f99b0d.png)

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

![](../../../../../assets/images/5wb_8nRHTdX30YjSCM4W8_b097cab7-3952-4dbb-84ff-a05a23b3be35.png)

- diese Informationen dienen lediglich weitere Meta-Informationen zu hinterlegen
- die Informationen werden später auf der Geräte-Seite angezeigt, aber haben im Crawler-System keine weitere Verwendung.

---
# Messgrößen einrichten

![](../../../../../assets/images/guKgA1SN7v6h2YtVHt3BB_0c13a31f-c3c2-43ef-97a2-073b602c3beb.png)

## Importieren (nur für “S7 symbolische Adressierung”)

:::note
ℹ Der Import der Messgrößen und deren Struktur auf dem Feldgerät wird aktuell nur für S7 Steuerung mit einer symbolischen Adressierung unterstützt.
:::

:::caution
⚠ Bei großen SPS-Strukturen kann der Import fehlschlagen. Wir arbeiten aktuell an einer Optimierung. Nutzen Sie alternativ den CSV-Import oder die manuelle Einrichtung.
:::

![](../../../../../assets/images/G0y767wYW5Yz7SCnIV_iP_2b72c54a-4a30-4b5c-b40c-518b60957d2f.png)

![](../../../../../assets/images/AuQq3LpmYhMEZecmh5pZg_0ae1cf9b-6a4d-489b-a61f-f8adcbe7a51a.png)

- Voraussetzung: Verbindung zum Feldgerät konnte hergestellt werden
  - Dies wird auf der Geräte-Seite angezeigt bzw. wird mit einer Meldung bei Änderung im angezeigt

![](../../../../../assets/images/bxEPTzq4YCVT3HDXtvPca_379c4f7e-8eb7-4499-aea1-85fefc54f32f.png)

- mit Drücken von “von Gerät” werden Struktur und Messgrößen vom Feldgerät bezogen
- Es wird anschließend im “VariablenBrowser” die verfügbaren Messgrößen und deren umliegende Struktur angezeigt
  - Bereits importierte Messgrößen sind ***grau*** hinterlegt
  - Messgrößen, welche auf dem Crawler eingerichtet sind, aber nicht beim Import auf dem Feldgerät gefunden wurden, sind ***gelb*** hinterlegt
- wählen Sie alle gewünschten Messgrößen aus, welche für die Datenaufzeichnung hinzufügen wollen
- gehen Sie anschließend zum “Warenkorb” → “Alle Importieren”

![](../../../../../assets/images/b1jCLMOdbanoCovIfYC_u_ae07631c-d42c-41f9-ad4f-1e60c4934ba7.png)

- stellen Sie die gewünschte Konfiguration für diesen Import ein

![](../../../../../assets/images/GfeehQUvmJfg7QNOwx3LG_4d466d1f-638d-44b4-8a88-4f98d1a524d8.png)

## Manuelle Einrichtung von Messgrößen

- Navigieren Sie auf der Geräte-Seite unter “Messgrößen” auf “Bearbeiten”
- In dem “VariablenBrowser” können Sie neue Gruppen und Messgröße

![](../../../../../assets/images/PFy-PaSxlcfRmGigFS5Dh_f8b122ff-ad68-481d-b983-c5805276c46c.png)

Neue Gruppe:

![](../../../../../assets/images/QRuLLKssD5TtOCTtWIhnh_12e25c85-b946-4d9b-ba4e-cbdc36cdaee8.png)

Neue Messstelle: 

![](../../../../../assets/images/TRWy90rnDJ0spGuuJnoXo_5836592d-e5c6-4335-b618-b9ba38c1d49f.png)

### **Gruppen anlegen**

![](../../../../../assets/images/iQizEWHoyDWk5waH_mJvm_7dfe15e7-fca8-4da7-bb8d-ed6ab088ef36.png)

- Bezeichner für die Gruppe (hat keinen Einfluss auf die spätere Adresse der Messgröße und dient zur Organisation)
- Sollen unterlagerter Messgrößen aufgezeichnet werden (**empfohlen = Ja,** diese Einstellung kann nicht geändert werden)
- optional: Meta-Informationen (haben aktuell keine Verwendung)

### Messgröße anlegen

![](../../../../../assets/images/VMCMcYJUgkUAj8PXqlc3T_49abdb27-d7da-4fc5-b067-c1097970c396.png)

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

![](../../../../../assets/images/3YKuA_26ghp_5PR29I5HF_3f95bf93-0f97-48c0-b390-2b6ea6cdba35.png)

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
  - TODO: Filter-Bereich erklären
- inplace editieren
  - Name und Abtastrate (ms)

Dialog über Icon:

![](../../../../../assets/images/-BN0jruPXCl3rb90bJwWu_825c59cb-f73e-457d-bcdc-88f6f3fa3581.png)

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

![](../../../../../assets/images/HCTQtSKs86BJvUvvFGbRp_ed1f01ed-db82-4653-8648-4ecfaabfc3bd.png)

## Mehrere Messgrößen im Pulk bearbeiten oder löschen

- gewünschte Messgrößen im VariablenBrowser selektieren (Hinzufügen zum “Shopping Card”)
  - Auswahl wir&#x64;** farblich markiert**
  - Anzahl ausgewählter Messgrößen wird am Shopping Card angezeigt
    - oben rechts:

![](../../../../../assets/images/gpD2N74aKBYWeECwawSDM_f81a2b65-65f9-449e-a28b-f13a8796e2b6.png)

- Shopping Card öffnen

![](../../../../../assets/images/lQRtKhztnHEPi-E2p-nA__bde43692-1bbe-4199-bccc-bb84758d618f.png)

- Auswahl bei Bedarf anpassen (“x” entfernt die Messgröße nur vom Shopping Card, diese wird nicht gelöscht)
- “Alle Bearbeiten”

![](../../../../../assets/images/319IztUg9uvx2cPHPFB3T_d571b121-6401-49ff-9d98-f637c23ff8bf.png)

- überschreiben einzelner Einstellungen für alle Messgrößen
- sind die bisherigen Einstellungen unterschiedlich in der aktuellen Auswahl, wird dies angezeigt

![](../../../../../assets/images/JnMdmwJR9gN49Kadfg_r0_aa08845b-5150-4fea-bcbb-ae8690e764e9.png)

- durch Markieren der Checkbox, kann eine einzelne Einstellung überschrieben werden
  - die Einstellung kann mit „übernehmen“ auf alle ausgewählten Messgrößen angewandt werden.
- Nach übernehmen gelangt man in den Shopping Card zurück. Dieser kann nun geschlossen oder es können weitere Bearbeitungen vorgenommen werden.
