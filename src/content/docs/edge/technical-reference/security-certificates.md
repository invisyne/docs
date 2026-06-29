---
title: Security Certificates
description: Why the web interface uses HTTPS by default, why browsers show a certificate warning, and what to do about it.
sidebar:
  badge:
    text: "2.22+"
    variant: note
---

From Edge 2.22, the web interface is served by default over **HTTPS**. This page explains why, why your browser shows a security warning on first access, and what your options are. For the step-by-step procedures, see the how-to guides linked at the end.

## Why the web interface uses HTTPS

HTTPS encrypts everything exchanged between your browser and the Edge device — login credentials, session tokens, configuration, and measurement data. Serving the interface over plain HTTP would send all of that across your network in clear text.

Encryption in transit is also increasingly a regulatory and procurement requirement for industrial equipment. Frameworks such as **IEC 62443**, the EU **NIS2** directive, the **Cyber Resilience Act**, and the EU **Machinery Regulation** all point toward encrypted communication for connected devices. Running the interface over HTTPS by default keeps Edge deployments ready for these requirements without a later retrofit.

## Why the browser shows a warning

By default, the Edge device presents a **self-signed certificate**. The connection is fully encrypted, but the browser cannot trace the certificate back to a public Certificate Authority (CA), so it cannot automatically confirm the device's identity — and it warns you.

:::note
The warning is about **identity verification, not encryption**. The connection is encrypted whether or not the warning is shown. The browser is telling you it cannot vouch for *who* is on the other end, not that the channel is insecure.
:::

A publicly trusted certificate (the kind that produces an automatic padlock, e.g. from Let's Encrypt) is not an option for a typical Edge device:

- Public CAs only issue certificates for **publicly resolvable domain names**. Edge devices are normally reached by **IP address** on a private or factory network.
- Domain validation requires **internet access**, which many Edge networks do not have — some are fully air-gapped.

A self-signed certificate is the standard approach for private infrastructure; its encryption strength is identical to a publicly trusted certificate. The only difference is that the browser does not already know to trust it.

## The default certificate

The certificate shipped with the device is **generated once and remains stable** — it is not regenerated automatically when the device's IP address changes. This is deliberate: a certificate that silently changes would break the trust you have already established and could leave the interface in a partially loaded, hard-to-recover state. Because the default certificate is fixed, the browser's behaviour stays predictable once you have decided how to handle the warning.

## Is it safe to proceed past the warning?

In most deployments, yes. The browser warning is designed for the open internet, where you could be tricked into connecting to an impostor of a public website you have no other way to identify. Reaching an Edge device is a different situation: you connect to a **specific device at a known address on your own local or industrial network**, and the traffic stays within that network. The warning appears only because the certificate is self-signed — not because the connection is insecure or the device has been tampered with. The connection is encrypted either way.

## How to handle the warning

1. **Proceed past the warning — the right choice for most cases.** No setup is required, the connection remains encrypted, and — as explained above — this is perfectly acceptable for an Edge device on your own network. Every browser lets you continue; once you do, it remembers the decision for that device.

2. **Upload your own certificate.** When your organization already has a certificate infrastructure — a PKI or internal CA such as **Active Directory Certificate Services (AD CS)** — or for applications where clicking past the warning is impractical (shared or kiosk machines, automated access), you can install a certificate your machines already trust. The warning then disappears entirely, with HTTPS still active. See **[Install a Custom HTTPS Certificate](/edge/how-to/https-certificate)**.

## Optional: Allow HTTP

If HTTPS is impractical in your environment, Edge 2.22 can also serve the interface over plain **HTTP** — *alongside* HTTPS, not instead of it. The setting is called **Allow HTTP**:

- **By default** (Allow HTTP off), any request that arrives over HTTP is automatically redirected to HTTPS, so all traffic ends up encrypted.
- **With Allow HTTP on**, requests that arrive over HTTP are served over HTTP, while requests over HTTPS continue to be served over HTTPS. Clients that connect over HTTP are simply no longer redirected.

Serving requests over HTTP removes transport encryption: all communication between the browser and the device travels in clear text. Whether that is acceptable is a decision to make **together with your IT or security team**, and typically only for isolated networks.

Keep in mind that the only real inconvenience of staying on HTTPS is the occasional certificate warning — which a custom certificate removes entirely. See **[Allow HTTP](/edge/how-to/http-mode)** for the full list of risks and the procedure.

## How-to guides

- **[Install a Custom HTTPS Certificate](/edge/how-to/https-certificate)** — obtain a certificate from your organization's CA (or create one) and upload it to the device to remove the warning.
- **[Allow HTTP](/edge/how-to/http-mode)** — serve the interface over HTTP alongside HTTPS, and the security trade-offs involved.
