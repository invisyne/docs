---
title: "Protokolle und Feldgeräte"
description: "- absolute Adressierung - TIA, symbolische Adressierung - S7 300/400 und 1200 & 1500 Die Unterstützt"
---

# Siemens S7

- absolute Adressierung
- TIA, symbolische Adressierung
- S7 300/400 und `1200 & 1500`

## Unterstützte Datentypen

Die Unterstützten Datentypen sind von der Adressierungsart (absolut oder symbolisch) anhängig. Sie können diese der folgenden Tabelle entnehmen.

| **Datentyp**          | **Im Edge (nur Lesen)** | **Von SPS unterstützt** |                |                                                                        |                                                          |                                                          |                                                              |
| --------------------- | -------------------------- | ----------------------- | -------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **Edge VarType**   | **Edge InfluxType**     | **Bits**                | **Symbolisch** | **Absolut**                                                            | **S7-300/400**                                           | **S7-1200**                                              | **S7-1500**                                                  |
| **Binärzahlen**       |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Bool              | FLOAT                      | 1                       | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_Byte              | FLOAT                      | 8                       | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_Word              | FLOAT                      | 16                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_DWord             | FLOAT                      | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_LWord             | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| **Ganzzahlen**        |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_SInt              | FLOAT                      | 8                       | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_Int               | FLOAT                      | 16                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_DInt              | FLOAT                      | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_USInt             | FLOAT                      | 8                       | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_UInt              | FLOAT                      | 16                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_UDInt             | FLOAT                      | 32                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_LInt              | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| S7\_ULInt             | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| **Gleitpunktzahlen**  |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Real              | FLOAT                      | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_LReal             | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| **Zeiten**            |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_S5Time            | STRING                     | 16                      | ✔              | ✔                                                                      | ✔                                                        |                                                          | ✔                                                            |
| S7\_Time              | STRING                     | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| FLOAT
(Millisek.) | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_LTime             | STRING                     | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| FLOAT
(Nanosek.)  | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| **Datum und Uhrzeit** |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Date              | STRING                     | 16                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| FLOAT
(Tage)      | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Time\_Of\_Day     | STRING                     | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| FLOAT
(Millisek.) | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_LTOD              | STRING                     | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| FLOAT
(Ticks)     | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Date\_And\_Time   | STRING                     | 64                      | ✔              | ✔                                                                      | ✔                                                        |                                                          | ✔                                                            |
| S7\_LDT               | STRING                     | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| S7\_DTL               | STRING                     | 96                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| **Zeichen**           |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Char              | STRING                     | 8                       | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_WChar             | STRING                     | 16                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_String            | STRING                     | n+2 Bytes               | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_WString           | STRING                     | n+2 Words               | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| **Array**             |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Array             |                            |                         | ✔              | ✔<br />Einzelzugriff auf jedes Element mit seiner spezifischen Adresse | ✔<br />Max. Dimensionen: 6
Max. Anzahl Bytes: 32.767 | ✔<br />Max. Dimensionen: 6
Max. Anzahl Bytes: 65.535 | ✔<br />Max. Dimensionen: 6
Max. Anzahl Bytes: 16.777.216 |
| **Zeiger**            |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| Pointer               |                            | 48                      | ❌              | ❌                                                                      | ✔                                                        |                                                          | ✔                                                            |
| Any                   |                            | 80                      | ❌              | ❌                                                                      | ✔                                                        |                                                          | ✔                                                            |
| Variant               |                            | 0                       | ❌              | ❌                                                                      |                                                          | ✔                                                        | ✔                                                            |

 
Manuelle Eingabe der Adressen
-----------------------------

Werden die Messgrößen manuell über das UI oder über einen Import  mittels CSV-Datei, sind bei der Angabe der Adressen folgende Dinge zu beachten.

### Absolute Adressierung

Für absolut adressierten Datenzugriff muss das Adressschema dem gängigen, vollqualifizierten Schema aus Datenblock-Nummer, Operand und Byte-/Bit-Offset folgen.

Aufbau: `DB<Nr>.DB<B|W|D|X><ByteOffset>.<BitOffset>`; wobei zu beachten ist:

- Der durch DBB, DBD, DBX oder DBW beschriebene Operandentyp kann *gegenwärtig* beliebig genutzt werden, könnte auch bei allen Datentypen auf DBB stehen (dient lediglich der gewohnten Lesbarkeit durch den SPS-Programmierer)
- Der Bit-Offset ist optional, kann (inklusive des trennenden Punkts) bedarfsweise weggelassen werden
- Leerzeichen sind zu entfernen

**Beispiele:**

- `DB9.DBX200.2`
  Adressiert das zweite Bit des 200. Bytes im Datenblock Nr. 9
- `DB30.DBW558`
  Adressiert das 558. Byte des Datenblocks Nr. 30

### 
Symbolische Adressierung

Für symbolisch adressierten Datenzugriff setzt sich die Adresse hierarchisch aus der Programmstruktur, Gruppen, mit einem Punkt getrennt, zusammen. Sie beginnt immer mit den beiden Gruppenelementen PLC (nicht dem Gerätenamen wie bspw. `PLC_1` !) und `Blocks.` Zu beachten:

- Enthalten Gruppenelemente oder Variablen einen Punkt, so ist dieser Adressteil in doppelte Anführungszeichen (ASCII-Code 0x22) zu setzen
- Enthalten Gruppenelemente oder Variablen ein doppeltes Anführungszeichen, so ist dieser Adressteil in doppelte Anführungszeichen zu setzen und zusätzlich das enthaltene Anführungszeichen zu verdoppeln
- Die Groß-/Kleinschreibung ist zu beachten
- Gewissen Sonderzeichen erfordern ebenfalls die Maskierung mit doppeltes Anführungszeichen 
  (z.B.: \<>\[ ] . \{ } ) 

**Beispiele:**

- `PLC.Blocks.TestDB.MyFunkyVariable`
  Adressiert eine Variable namens `MyFunkyVariable` im (direkt der Hauptstruktur untergeordneten) Datenblock namens `TestDB`
- `PLC.Blocks.TestDB."My.Funky.Struktur".MyFunkyVariable`
  Adressiert eine Variable namens `MyFunkyVariable` in einer UDT-Instanz `My.Funky.Struktur` im (direkt der Hauptstruktur untergeordneten) Datenblock namens `TestDB`
- `PLC.Blocks.TestDB."My""Funky""Struktur"."My""Funky""Variable"`
  Adressiert eine Variable namens `My"Funky"Variable` in einer UDT-Instanz `My"Funky"Struktur` im (direkt der Hauptstruktur untergeordneten) Datenblock namens `TestDB `
- `PLC.Blocks.TestDB.TestArray.MyFunkyElement[28]`
  Adressiert das 28. Element des eindimensionalen Arrays `TestArray` im (direkt der Hauptstruktur untergeordneten) Datenblock namens `TestDB`
- `PLC.Blocks.TestDB.TestArray.MyFunkyElement[2,1,28]`
  Adressiert das Element Nr. \[2,1,28] des mehrdimensionalen Arrays `TestArray` im (direkt der Hauptstruktur untergeordneten) Datenblock namens `TestDB`

:::caution
⚠ Ungültige Adressangaben, wie sie häufig bei manueller Eingabe auftreten, verhindern einen ordnungsgemäßen Datenzugriff! Durch Nutzung der Import-Funktion wird diese Fehlerquelle ausgeschlossen, die Variablen werden somit korrekt formatiert und maskiert in die Edge-Struktur übernommen.
:::

## Modbus TCP

| **Funktion**                              | **Kommentar**                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Unterstützte Zugriffsmethoden**         | READ\_COIL, READ\_DISCRETE\_INPUT, READ\_INPUT\_REGISTER, READ\_HOLDING\_REGISTER                                                                                                                                                                                                                                                                                                                                            |
| **Unterstützte Datentypen**               | BOOLEAN\*, INT16, UINT16, INT32, UINT32, INT64, UINT64, FLOAT, DOUBLE, STRING\*\*<br />\*Boolean nur für Bit-level Zugriffsmethoden (read coils, read discrete input) unterstützt.<br />\*\* Der Datentyp STRING ist standardmäßig auf 8 Zeichen eingestellt. Wird eine andere Zeichenanzahl gewünscht, muss aktuell Kontakt mit dem Support aufgenommen werden.                                                             |
| **Slave ID **
**(Modbus RTU)**   | Bei Modbus RTU kann die “Slave ID” angegeben werden. **Standard = 1**<br />                                                                                                                                                                                                                                                                                                                                                  |
| **Byte-Reihenfolge**
**(endianness)** | Big-endian\*, **little-endian\* (Standard)**<br />\* Für Datentypen größer als 16 Bit (INT32, UINT32, INT64, UINT64, FLOAT, DOUBLE, STRING). Definiert in welchem REGISTER (nicht Bytes) das höchste Bit enthält.<br />Byte-Reihenfolge ist ein optionaler Konfigurationsparameter, welcher aktuell nicht im UI eingerichtet werden kann. Ist eine Abweichung vom Standard erforderlich, kontaktieren Sie bitte den Support. |
