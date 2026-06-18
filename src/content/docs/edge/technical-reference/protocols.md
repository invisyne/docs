---
title: "Protocols and Field Devices"
description: "- Absolute addressing - TIA, symbolic addressing - S7 300/400 and 1200 & 1500. The supported data types depend on the addressing mode."
---

# Siemens S7

- Absolute addressing
- TIA, symbolic addressing
- S7 300/400 and `1200 & 1500`

## Supported Data Types

The supported data types depend on the addressing mode (absolute or symbolic). You can find them in the following table.

| **Data type**         | **In Edge (read only)** | **Supported by PLC**    |                |                                                                        |                                                          |                                                          |                                                              |
| --------------------- | -------------------------- | ----------------------- | -------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **Edge VarType**   | **Edge InfluxType**     | **Bits**                | **Symbolic**   | **Absolute**                                                           | **S7-300/400**                                           | **S7-1200**                                              | **S7-1500**                                                  |
| **Binary numbers**    |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Bool              | FLOAT                      | 1                       | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_Byte              | FLOAT                      | 8                       | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_Word              | FLOAT                      | 16                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_DWord             | FLOAT                      | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_LWord             | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| **Integers**          |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_SInt              | FLOAT                      | 8                       | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_Int               | FLOAT                      | 16                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_DInt              | FLOAT                      | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_USInt             | FLOAT                      | 8                       | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_UInt              | FLOAT                      | 16                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_UDInt             | FLOAT                      | 32                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_LInt              | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| S7\_ULInt             | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| **Floating-point numbers** |                       |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Real              | FLOAT                      | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_LReal             | FLOAT                      | 64                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| **Times**             |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_S5Time            | STRING                     | 16                      | ✔              | ✔                                                                      | ✔                                                        |                                                          | ✔                                                            |
| S7\_Time              | STRING                     | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| FLOAT
(millisec.) | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_LTime             | STRING                     | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| FLOAT
(nanosec.)  | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| **Date and time**     |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Date              | STRING                     | 16                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| FLOAT
(days)      | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Time\_Of\_Day     | STRING                     | 32                      | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| FLOAT
(millisec.) | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_LTOD              | STRING                     | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| FLOAT
(ticks)     | ❌                          | ❌                       |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Date\_And\_Time   | STRING                     | 64                      | ✔              | ✔                                                                      | ✔                                                        |                                                          | ✔                                                            |
| S7\_LDT               | STRING                     | 64                      | ✔              | ✔                                                                      |                                                          |                                                          | ✔                                                            |
| S7\_DTL               | STRING                     | 96                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| **Characters**        |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Char              | STRING                     | 8                       | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_WChar             | STRING                     | 16                      | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| S7\_String            | STRING                     | n+2 Bytes               | ✔              | ✔                                                                      | ✔                                                        | ✔                                                        | ✔                                                            |
| S7\_WString           | STRING                     | n+2 Words               | ✔              | ✔                                                                      |                                                          | ✔                                                        | ✔                                                            |
| **Array**             |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| S7\_Array             |                            |                         | ✔              | ✔<br />Individual access to each element via its specific address | ✔<br />Max. dimensions: 6
Max. number of bytes: 32,767 | ✔<br />Max. dimensions: 6
Max. number of bytes: 65,535 | ✔<br />Max. dimensions: 6
Max. number of bytes: 16,777,216 |
| **Pointers**          |                            |                         |                |                                                                        |                                                          |                                                          |                                                              |
| Pointer               |                            | 48                      | ❌              | ❌                                                                      | ✔                                                        |                                                          | ✔                                                            |
| Any                   |                            | 80                      | ❌              | ❌                                                                      | ✔                                                        |                                                          | ✔                                                            |
| Variant               |                            | 0                       | ❌              | ❌                                                                      |                                                          | ✔                                                        | ✔                                                            |

 
Manual address entry
-----------------------------

If measured variables are entered manually via the UI or imported via a CSV file, the following points must be observed when specifying addresses.

### Absolute addressing

For absolute-addressed data access, the address schema must follow the common, fully qualified schema consisting of data block number, operand, and byte/bit offset.

Structure: `DB<Nr>.DB<B|W|D|X><ByteOffset>.<BitOffset>`; noting:

- The operand type described by DBB, DBD, DBX, or DBW can *currently* be used arbitrarily; it could be set to DBB for all data types as well (it merely serves the familiar readability for the PLC programmer)
- The bit offset is optional and may be omitted (including the separating period) as needed
- Spaces must be removed

**Examples:**

- `DB9.DBX200.2`
  Addresses the second bit of byte 200 in data block no. 9
- `DB30.DBW558`
  Addresses byte 558 of data block no. 30

### 
Symbolic addressing

For symbolic-addressed data access, the address is composed hierarchically from the program structure and groups, separated by a period. It always begins with the two group elements PLC (not the device name such as `PLC_1`!) and `Blocks.` Note the following:

- If group elements or variables contain a period, that address part must be enclosed in double quotation marks (ASCII code 0x22)
- If group elements or variables contain a double quotation mark, that address part must be enclosed in double quotation marks and the contained quotation mark must additionally be doubled
- Case sensitivity must be observed
- Certain special characters also require escaping with double quotation marks
  (e.g.: \<>\[ ] . \{ } )

**Examples:**

- `PLC.Blocks.TestDB.MyFunkyVariable`
  Addresses a variable named `MyFunkyVariable` in the data block named `TestDB` (directly subordinate to the main structure)
- `PLC.Blocks.TestDB."My.Funky.Struktur".MyFunkyVariable`
  Addresses a variable named `MyFunkyVariable` in a UDT instance `My.Funky.Struktur` in the data block named `TestDB` (directly subordinate to the main structure)
- `PLC.Blocks.TestDB."My""Funky""Struktur"."My""Funky""Variable"`
  Addresses a variable named `My"Funky"Variable` in a UDT instance `My"Funky"Struktur` in the data block named `TestDB` (directly subordinate to the main structure)
- `PLC.Blocks.TestDB.TestArray.MyFunkyElement[28]`
  Addresses the 28th element of the one-dimensional array `TestArray` in the data block named `TestDB` (directly subordinate to the main structure)
- `PLC.Blocks.TestDB.TestArray.MyFunkyElement[2,1,28]`
  Addresses element no. \[2,1,28] of the multi-dimensional array `TestArray` in the data block named `TestDB` (directly subordinate to the main structure)

:::caution
⚠ Invalid address entries, which frequently occur with manual input, prevent proper data access! By using the import function, this source of error is eliminated — variables are correctly formatted and escaped when transferred into the Edge structure.
:::

## Modbus TCP

| **Function**                              | **Comment**                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Supported access methods**              | READ\_COIL, READ\_DISCRETE\_INPUT, READ\_INPUT\_REGISTER, READ\_HOLDING\_REGISTER                                                                                                                                                                                                                                                                                                                                            |
| **Supported data types**                  | BOOLEAN\*, INT16, UINT16, INT32, UINT32, INT64, UINT64, FLOAT, DOUBLE, STRING\*\*<br />\*Boolean is only supported for bit-level access methods (read coils, read discrete input).<br />\*\* The STRING data type is set to 8 characters by default. If a different number of characters is required, please contact support.                                                             |
| **Slave ID**
**(Modbus RTU)**    | For Modbus RTU, the "Slave ID" can be specified. **Default = 1**<br />                                                                                                                                                                                                                                                                                                                                                  |
| **Byte order**
**(endianness)** | Big-endian\*, **little-endian\* (default)**<br />\* For data types larger than 16 bits (INT32, UINT32, INT64, UINT64, FLOAT, DOUBLE, STRING). Defines which REGISTER (not bytes) contains the most significant bit.<br />Byte order is an optional configuration parameter that cannot currently be configured in the UI. If a deviation from the default is required, please contact support. |
