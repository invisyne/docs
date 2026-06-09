---
title: "Hub-Übersicht"
description: "Crawler.Hub ist eine webbasierte Management-Plattform für registrierte Edge-Geräte."
---

Crawler.Hub ist das zentrale, webbasierte Verwaltungsportal für registrierte Edge-Geräte. Es bietet Teams einen einheitlichen Zugriffspunkt, um alle eingesetzten Geräte zu überwachen, Firmware-Versionen nachzuverfolgen und Software-Downloads bereitzustellen — ohne physischen oder Netzwerkzugriff auf einzelne Geräte.

Hub ist für Organisationen konzipiert, die mehrere Edge-Einheiten an verschiedenen Standorten betreiben. Anstatt jedes Gerät einzeln zu verwalten, fasst Hub alle relevanten Informationen an einem Ort zusammen: Gerätestatus, installierte Firmware, Standort und Metadaten. Software-Releases — sowohl Edge-Firmware als auch Companion-App-Updates — werden direkt in Hub veröffentlicht und machen es zur zentralen Anlaufstelle für alle deployment-relevanten Downloads.

Der Zugriff wird über Rollen gesteuert. Jedem Benutzer wird entweder die Rolle **User** oder **Admin** zugewiesen. User können Geräte einsehen und auf Software zugreifen; Admins verwalten zusätzlich Benutzerkonten und Einladungen innerhalb ihrer Organisation.

<div class="screenshot-frame">
  <img src="/images/hub/hub-login.png" alt="Hub Login" />
</div>

## Funktionsumfang

Jeder Account hat eine Rolle — entweder **User** oder **Admin**. Admins können zusätzlich neue Benutzer innerhalb ihrer Organisation anlegen und Rollen vergeben.

<div class="screenshot-frame">
  <img src="/images/hub/hub-devices.png" alt="Hub Geräteübersicht" />
</div>

<div class="role-badge">User</div>

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-card-title">Geräte</div>
    <p>Übersicht aller registrierten Edge-Geräte mit Seriennummer, Name, Typ, Ort und Firmware-Version. Ein Klick öffnet die Detailansicht.<sup>*</sup></p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Software</div>
    <p>Aktuelle und ältere Firmware- sowie Companion-App-Versionen auf einen Blick. Je Version sind neue Features aufgelistet, inklusive Links zu Dokumentation, Changelog und Download.</p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Kontoeinstellungen</div>
    <p>Namen bearbeiten und Passwort ändern.</p>
  </div>
</div>

<p class="feature-footnote">* Name, Ort, Bestellnummer, Lieferdatum und Notiz können in der Detailansicht bearbeitet werden.</p>

<div class="role-badge">Admin</div>

<div class="feature-grid one-col">
  <div class="feature-card">
    <div class="feature-card-title">Benutzerverwaltung</div>
    <p>Benutzer per E-Mail einladen, Rollen zuweisen (Admin oder User) und Zugänge innerhalb der Organisation verwalten.</p>
  </div>
</div>

<p class="feature-footnote">* Admins verfügen zusätzlich über alle Funktionen der User-Rolle.</p>

## Sicherheitshinweise

<div class="security-grid">
  <div class="security-item">
    <div class="security-item-title">Session-Timeout</div>
    <p>Hub meldet Sie nach einer Inaktivitätsphase automatisch ab. Melden Sie sich auf gemeinsam genutzten Computern immer manuell ab.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">Kontoeinrichtung</div>
    <p>Konten werden von einem Admin angelegt. Die Zugangsdaten werden Ihnen vom Super-Admin händisch zugeschickt. Das Passwort können Sie jederzeit selbst ändern.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">Rollenbasierter Zugriff</div>
    <p>Ihr Zugriff ist auf die Funktionen beschränkt, die Ihrer Rolle zugewiesen sind.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">Nur HTTPS</div>
    <p>Hub ist ausschließlich über eine verschlüsselte HTTPS-Verbindung erreichbar.</p>
  </div>
</div>
