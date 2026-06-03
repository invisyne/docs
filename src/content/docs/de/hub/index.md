---
title: "Hub-Übersicht"
description: "Crawler.Hub ist eine webbasierte Management-Plattform für registrierte Edge (Crawler)-Geräte."
---

Crawler.Hub ist eine webbasierte Management-Plattform für registrierte Edge (Crawler)-Geräte. Nutzer behalten den Überblick über alle Geräte, Firmware-Versionen und Software-Downloads — ohne direkten Gerätezugriff. Zugriff und Sichtbarkeit richten sich nach der zugewiesenen Rolle.

<div class="screenshot-frame">
  <img src="../../../../assets/images/hub/hub-login.png" alt="Hub Login" />
</div>

## Funktionsumfang

Jeder Account hat eine Rolle — entweder **User** oder **Admin**. Admins können zusätzlich neue Benutzer innerhalb ihrer Organisation anlegen und Rollen vergeben.

<div class="screenshot-frame">
  <img src="../../../../assets/images/hub/hub-devices.png" alt="Hub Geräteübersicht" />
</div>

<div class="role-badge">User</div>

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-card-title">Geräte</div>
    <p>Übersicht aller registrierten Edge (Crawler)-Geräte mit Seriennummer, Name, Typ, Ort und Firmware-Version. Ein Klick öffnet die Detailansicht.<sup>*</sup></p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Software</div>
    <p>Aktuelle und ältere Firmware- sowie Companion-App-Versionen auf einen Blick. Je Version sind neue Features aufgelistet, inklusive Links zu Dokumentation, Changelog und Download.</p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Kontoeinstellungen</div>
    <p>Persönliche Daten bearbeiten (Name, E-Mail-Adresse) und Passwort ändern.</p>
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

## Sicherheitshinweise

<div class="security-grid">
  <div class="security-item">
    <div class="security-item-title">Session-Timeout</div>
    <p>Hub meldet Sie nach einer Inaktivitätsphase automatisch ab. Melden Sie sich auf gemeinsam genutzten Computern immer manuell ab.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">Zwei-Faktor-Authentifizierung</div>
    <p>Hub verwendet E-Mail-basierte Bestätigungscodes beim Login.</p>
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
