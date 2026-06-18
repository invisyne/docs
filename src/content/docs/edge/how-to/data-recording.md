---
title: "Configuring Data Recording"
description: "- Determine the IP address of the field device - Determine the device type of the field device (e.g. Modbus, Simatic S7)"
---

# Preparation

- Determine the IP address of the field device
- Determine the device type of the field device (e.g. Modbus, Simatic S7 → see "Supported Device Types" \[TODO])
- Connect the field device to the Edge's network

---
# General workflow

1. Make the field device available in the Edge's network

2. Determine the IP address and type of the field device

3. Add a new device

4. Import variables or *configure them manually*

5. Visualize data

---
# Adding a device

![](../../../../assets/images/HEm7w-Oz81hDyMKRU3X3l_f0d68851-5541-4ad6-9f5b-b833468793dd.png)

- Go to "+ Add devices" in the main menu
- Select the appropriate device type

![](../../../../assets/images/rW7ixqU4nTlXfVXWML1Ma_46c4772d-8da2-4d89-8e43-c77430720168.png)

- Enter the required information (may vary depending on device type)

![](../../../../assets/images/urz5KiPHHs0gtVljc7XMc_3ebe959f-664a-480b-b790-5df825f99b0d.png)

1. Network address of the field device

2. Identifier (required later when setting up the visualization; **can only be changed from version 2.7 onwards**)

3. Additional device-specific entries

4. Optional: select a template

- You can provide additional information in the form of "tags" (key-value pairs)

![](../../../../assets/images/5wb_8nRHTdX30YjSCM4W8_b097cab7-3952-4dbb-84ff-a05a23b3be35.png)

- This information is only used to store additional metadata
- The information is displayed later on the device page, but has no further use within the Edge system.

---
# Setting up measured variables

![](../../../../assets/images/guKgA1SN7v6h2YtVHt3BB_0c13a31f-c3c2-43ef-97a2-073b602c3beb.png)

## Import (only for "S7 symbolic addressing")

:::note
ℹ Importing measured variables and their structure from the field device is currently only supported for S7 controllers with symbolic addressing.
:::

:::caution
⚠ For large PLC structures, the import may fail. We are currently working on an optimization. As an alternative, use the CSV import or manual configuration.
:::

![](../../../../assets/images/G0y767wYW5Yz7SCnIV_iP_2b72c54a-4a30-4b5c-b40c-518b60957d2f.png)

![](../../../../assets/images/AuQq3LpmYhMEZecmh5pZg_0ae1cf9b-6a4d-489b-a61f-f8adcbe7a51a.png)

- Prerequisite: a connection to the field device has been established
  - This is shown on the device page, or displayed as a notification when it changes

![](../../../../assets/images/bxEPTzq4YCVT3HDXtvPca_379c4f7e-8eb7-4499-aea1-85fefc54f32f.png)

- Pressing "From device" retrieves the structure and measured variables from the field device
- The "Variable Browser" then displays the available measured variables and their surrounding structure
  - Already imported measured variables are highlighted in ***grey***
  - Measured variables that are configured on the Edge but were not found on the field device during import are highlighted in ***yellow***
- Select all desired measured variables that you want to add for data recording
- Then go to the "Cart" → "Import all"

![](../../../../assets/images/b1jCLMOdbanoCovIfYC_u_ae07631c-d42c-41f9-ad4f-1e60c4934ba7.png)

- Set the desired configuration for this import

![](../../../../assets/images/GfeehQUvmJfg7QNOwx3LG_4d466d1f-638d-44b4-8a88-4f98d1a524d8.png)

## Manual configuration of measured variables

- Navigate to "Edit" under "Measured variables" on the device page
- In the "Variable Browser" you can create new groups and measured variables

![](../../../../assets/images/PFy-PaSxlcfRmGigFS5Dh_f8b122ff-ad68-481d-b983-c5805276c46c.png)

New group:

![](../../../../assets/images/QRuLLKssD5TtOCTtWIhnh_12e25c85-b946-4d9b-ba4e-cbdc36cdaee8.png)

New measurement point:

![](../../../../assets/images/TRWy90rnDJ0spGuuJnoXo_5836592d-e5c6-4335-b618-b9ba38c1d49f.png)

### **Creating groups**

![](../../../../assets/images/iQizEWHoyDWk5waH_mJvm_7dfe15e7-fca8-4da7-bb8d-ed6ab088ef36.png)

- Identifier for the group (has no effect on the later address of the measured variable and serves for organization purposes)
- Should subordinate measured variables be recorded (**recommended = Yes;** this setting cannot be changed)
- Optional: metadata (currently not in use)

### Creating a measured variable

![](../../../../assets/images/VMCMcYJUgkUAj8PXqlc3T_49abdb27-d7da-4fc5-b067-c1097970c396.png)

- Name = identifier of the measured variable, used for later selection in Grafana (can be changed later)
- Logging = should recording be started immediately after creating this measured variable
- Interval = sampling rate
- Address = address on the PLC (follow the schema: Specification: Protocols and Field Devices | Manual address entry (!!!LINK))
- Data type = select from supported data types
- Optional: metadata (currently not in use in the system)

---
# Modifying configured measured variables

:::note
**Planned content:**

- What can be edited and how.
- Editing individually and in bulk
- Deleting (individually, in bulk, and groups)
- Expert mode (via JSON)
:::

![](../../../../assets/images/3YKuA_26ghp_5PR29I5HF_3f95bf93-0f97-48c0-b390-2b6ea6cdba35.png)

## Which settings can be changed for a measured variable?

- Name
  - NOTE: Changes to the name require adjustments in already configured dashboards
  - The name should be unique within a group level; otherwise incorrect values may be displayed in the visualization
- Sampling rate
  - Data range: 10ms to 500 h
  - Specified in milliseconds
- Start and stop recording
- Enable/disable timestamp alignment
- Enable/disable recording metrics
- Add/remove tags

## Editing or deleting a single measured variable

- Identify / search for measured variables
  - TODO: Explain filter area
- Edit in place
  - Name and sampling rate (ms)

Dialog via icon:

![](../../../../assets/images/-BN0jruPXCl3rb90bJwWu_825c59cb-f73e-457d-bcdc-88f6f3fa3581.png)

1. Sampling rate

2. Start and stop recording

3. Enable/disable timestamp alignment

4. Enable/disable recording metrics

5. Add/remove tags

6. Delete (confirmation required)

   - NOTE: Measured variables can no longer be retrieved in the visualization. Already configured panels may display incorrect or no data.

   - Currently, recorded data is not deleted and used disk space is therefore not freed.

![](../../../../assets/images/HCTQtSKs86BJvUvvFGbRp_ed1f01ed-db82-4653-8648-4ecfaabfc3bd.png)

## Editing or deleting multiple measured variables in bulk

- Select the desired measured variables in the Variable Browser (add to the "Shopping Cart")
  - Selection is **highlighted in color**
  - The number of selected measured variables is shown on the Shopping Cart
    - top right:

![](../../../../assets/images/gpD2N74aKBYWeECwawSDM_f81a2b65-65f9-449e-a28b-f13a8796e2b6.png)

- Open the Shopping Cart

![](../../../../assets/images/lQRtKhztnHEPi-E2p-nA__bde43692-1bbe-4199-bccc-bb84758d618f.png)

- Adjust the selection if needed ("x" only removes the measured variable from the Shopping Cart; it is not deleted)
- "Edit all"

![](../../../../assets/images/319IztUg9uvx2cPHPFB3T_d571b121-6401-49ff-9d98-f637c23ff8bf.png)

- Overwrite individual settings for all measured variables
- If the current settings differ across the current selection, this is indicated

![](../../../../assets/images/JnMdmwJR9gN49Kadfg_r0_aa08845b-5150-4fea-bcbb-ae8690e764e9.png)

- By checking the checkbox, an individual setting can be overwritten
  - The setting can be applied to all selected measured variables using "Apply"
- After applying, you are returned to the Shopping Cart. It can now be closed or further edits can be made.
