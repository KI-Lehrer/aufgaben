# Stop & Learn – Aktueller Stand

Stand: 04.05.2026

## Projektstatus

- Die App `Stop & Learn` läuft lokal als Single-Page-App aus `index.html`.
- Die App ist zusätzlich auf Vercel veröffentlicht.
- Firebase Auth und Firestore sind im Projekt vorgesehen und in Vercel mit Umgebungsvariablen hinterlegt.
- Das Projekt nutzt keinen Build-Step für das Frontend. Die Oberfläche steckt vollständig in `index.html`.

## Wichtige URLs

- Lokale App:
  - `http://127.0.0.1:4173/`
- Öffentliche Produktions-URL:
  - `https://aufgaben-omega.vercel.app`
- Letzte Vercel-Produktionsdeployments:
  - `https://aufgaben-aeq5zcr4z-ki-lehrers-projects.vercel.app`
  - `https://aufgaben-5nhvkihdz-ki-lehrers-projects.vercel.app`

## Zuletzt umgesetzt

- App-Name und Branding auf `Stop & Learn` angepasst.
- Logo `logo-stop-learn-square.png` wird als App-Logo verwendet.
- Rechter Druck-/Floating-Button aus der App entfernt.
- Datumslogik auf lokale Systemzeit umgestellt.
  - Ursache war eine frühere UTC-Berechnung via `toISOString()`.
- Formular `Neue Lektion` vereinfacht:
  - Feld `Raum` wurde entfernt.
  - Beschreibung im Modal angepasst.
- Fächer-Modal verbessert:
  - Folgelektionen können schneller nacheinander erfasst werden.
  - Startzeit springt nach dem Anlegen automatisch weiter.
  - Wochentag und eingegebener Raum im Schnellformular bleiben erhalten.
- Lokaler Dev-Server sendet Cache-Header mit `no-store`, damit alte Stände weniger hängen bleiben.

## Aktuelle wichtige Dateien

- `index.html`
  - komplette App mit HTML, CSS und JavaScript
- `local-dev-server.mjs`
  - lokaler Dev-Server für `/api/config` und statische Dateien
- `CHANGELOG.md`
  - Änderungsprotokoll der letzten Session
- `FIREBASE_VERCEL_SETUP.md`
  - Firebase-/Vercel-Setup-Dokumentation
- `firebase.json`
  - Firestore-Regelzuordnung
- `.firebaserc`
  - verknüpft das Projekt mit `stop-and-learn`
- `api/config.js`
  - liefert Firebase-Konfiguration aus Vercel- oder lokalen Env-Variablen
- `api/_lib/firebase-admin.js`
  - Firebase-Admin-Helfer
- `api/admin/users.js`
  - Admin-Endpunkt

## Lokale Ausführung

- Startbefehl:
  - `npm run start:local`
- Der lokale Server läuft auf:
  - `127.0.0.1:4173`

## Vercel / Deployment

- Vercel-Projektname:
  - `aufgaben`
- Vercel-Team:
  - `ki-lehrers-projects`
- Die Produktions-Umgebungsvariablen für Firebase sind in Vercel bereits vorhanden.
- Deployment erfolgt mit:
  - `npx vercel deploy --prod --yes`

## Firebase-Stand

- Firebase-Projekt:
  - `stop-and-learn`
- Firebase-Web-App wurde angelegt.
- Firestore-/Auth-Setup ist projektrelevant und aktiv vorbereitet.
- Keine Secrets oder Schlüssel in Markdown-Dateien dokumentieren.

## Offene / sinnvolle nächste Schritte

- Prüfen, ob die Vercel-Produktionsversion exakt mit dem lokalen Stand übereinstimmt.
- Falls nötig: Git-Commit und GitHub-Push der letzten lokalen Änderungen.
- UI weiter vereinfachen für die Klassenstufe:
  - weitere unnötige Felder reduzieren
  - Mobile-Navigation ggf. verschlanken
- Optional:
  - Dashboard weiter vereinfachen
  - Kalender- und Stundenplan-UX verbessern

## Zuletzt lokal geänderte Dateien

- `index.html`
- `local-dev-server.mjs`
- `CHANGELOG.md`
- `firebase.json`
- `.firebaserc`

## Hinweise für die nächste Session

- Wenn etwas im Browser trotz Änderung gleich aussieht:
  - lokale URL mit Query-Parameter öffnen, z. B. `?v=20260504`
  - oder Seite hart neu laden
- Datumsfehler zuerst in `formatISODate()` prüfen.
- UI-Änderungen hauptsächlich in `index.html` suchen.
