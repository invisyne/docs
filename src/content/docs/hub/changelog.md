---
title: Changelog
description: Release notes for the Invisyne Hub.
---

## 1.3.0

*2026-04-16*

### Highlights

> Version 1.3.0 fundamentally redesigns the software area: major versions now have their own detail page with highlights, version history, and release notes.
> In addition, a link to request account creation is provided on the login page.

---

### New Features

- **Redesigned Software Area** — Major versions are now listed individually; a detail page shows highlights, the full version history, and the release notes. Patch versions appear within the respective detail view. The file size is displayed directly below the download link.

- **Account Request** — A "No account yet?" link is available on the login page, through which an account creation can be requested by email.

### Bug Fixes

None.

---

## 1.2.0

*2026-03-19*

### Highlights

> Version 1.2.0 improves the software area in the customer area: the release date is now displayed per version, and the presentation has been corrected in several places.

---

### New Features

- **Release Date** — The release date is displayed per firmware version in the software area.

### Bug Fixes

- **Download Button** — The download button is hidden when no download is available for a version.

- **Version Label** — The label in the software area always displayed "Bug Fixes" regardless of the release type. This has been corrected.

---

## 1.1.0

*2026-03-05*

### Highlights

> Version 1.1.0 introduces a new software download area in the customer area.
> In addition, account management has been extended with a profile page and password change, and the registration process now includes email confirmation.

---

### New Features

- **Software Downloads** — New "Software" area with an overview of all available Edge and Companion firmware versions. Each version provides a download, documentation, and release notes.

- **My Account** — New profile page for viewing and editing personal account details and changing the password.

- **Email Confirmation** — Newly created users must confirm their email address before login is possible.

### Bug Fixes

None.

---

## 1.0.0

*2025-11-12*

### Highlights

> First release of Invisyne Hub — a new web-based platform for the centralised management of crawler fleets.
> Edge devices can be managed and installed firmware versions tracked via a role-based web interface.
> This release delivers the complete core functionality for device and user management.

---

### New Features

- **Login** — Secure authentication via JWT token; login is also possible via a refresh token, allowing the Companion app to communicate with the Hub continuously.

- **Device Management** — Crawlers can be created and edited. An overview and detail view shows the current status of all assigned devices including location and notes.

- **User Management** — Custom users can be created and their access rights managed.

- **Interface** — New UI/UX design, sorting and filtering functions in all lists, and multilingual support (German/English).

### Bug Fixes

- **Incorrect Response for Invalid Tokens** — Invalid access tokens incorrectly triggered a server error instead of an authentication error message.

---

### Technical Appendix

#### Breaking Changes

None — initial release.
