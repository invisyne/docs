---
title: "Installing Updates"
description: "The Edge (Crawler) system is continuously developed. Improvements or new features are provided via update bundles."
---

The Edge (Crawler) system is continuously developed. Improvements or new features are provided via update bundles. These are delivered digitally by your contact person.

The following explains how to install them.

## Update Bundle

An update bundle can cover several functions and areas of an Edge (Crawler). Each package builds on the previous one. It is therefore important to install update packages one after another and in the correct order.

An update bundle has the file extension .zip and does **NOT** need to be unpacked before installation.

## Instructions

import { Steps } from '@astrojs/starlight/components';

<Steps>

1. Download the desired update package (e.g. crawlerUpdate\_2.12.2.zip).

2. Open the Edge (Crawler) AdvancedUI (accessible under "Advanced Settings").

3. Navigate to "System" > "Settings" > "System Control".

4. Under "Update", click the button. A new tab opens with the update area.

5. Make sure the current version of the Edge (Crawler) is the direct predecessor of the update bundle.

   - e.g. 2.12.2 requires 2.12.1

6. Click "Upload package" and then click "Add file" in the dialog.

7. Select the update bundle in the file selection dialog.

8. Then click "Upload". Depending on the connection speed, this process may take a moment.

9. After the bundle has been uploaded, updated functions/services are highlighted in a list. You can discard or start the update here.

10. Click "Start update" to begin.

11. The update may take several minutes. The steps of the update are listed during the update process.

12. When the update is complete, this is shown in a dialog (in the current version an incorrect version number is displayed. Only after confirming the dialog and possibly reloading the page will the correct version be shown).

13. Depending on the update, it is recommended to restart the system once.

14. :::note
    🔁 Repeat the steps for each update bundle.
    :::

</Steps>
