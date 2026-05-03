# Stop & Learn

`Stop & Learn` ist eine schulische Organisations-App als Single-Page-Webapp mit:

- Dashboard
- Stundenplan
- Hausaufgaben
- Prüfungen
- Kalender
- Einstellungen
- Adminbereich für freigegebene Konten

Die App läuft ohne Frontend-Buildprozess. Das Frontend steckt in `index.html`. Für Cloud-Speicherung und Login nutzt das Projekt `Firebase`. Für Hosting und Serverless-Endpunkte nutzt es `Vercel`.

## Projektdateien

- `index.html`: komplette Frontend-App
- `api/config.js`: liefert die öffentliche Firebase-Webkonfiguration
- `api/admin/users.js`: geschützter Admin-Endpunkt
- `api/_lib/firebase-admin.js`: Firebase-Admin-Helfer für Vercel
- `firestore.rules`: empfohlene Firestore-Regeln
- `.env.example`: Vorlage für alle nötigen Umgebungsvariablen
- `FIREBASE_VERCEL_SETUP.md`: Setup von Firebase und Vercel
- `TRANSFER_CHECKLIST.md`: kurze Schritt-für-Schritt-Checkliste für einen neuen PC

## Lokal weiterarbeiten

1. Projektordner auf den neuen PC kopieren.
2. Im Projektordner `npm install` ausführen.
3. Optional `.env.example` als Vorlage verwenden.
4. Lokal starten mit:

```bash
npm run start
```

Dann im Browser öffnen:

- [http://127.0.0.1:4173/](http://127.0.0.1:4173/)

## Deployment

Die vollständige Anleitung liegt in [FIREBASE_VERCEL_SETUP.md](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private Ablage/2-Eigene Projekte/Aufgaben-App/FIREBASE_VERCEL_SETUP.md:1).

## Wichtige Hinweise

- Die App nutzt lokal weiter `localStorage` als Cache.
- Die eigentlichen Nutzerdaten werden nach Login in `Cloud Firestore` gespeichert.
- Der Adminbereich funktioniert erst, wenn `ADMIN_EMAILS` und die `FIREBASE_ADMIN_*` Variablen in Vercel gesetzt sind.
