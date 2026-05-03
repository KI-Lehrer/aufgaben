# Transfer-Checkliste fuer einen neuen PC

## Diese Dateien muessen mit

- `index.html`
- `package.json`
- `.env.example`
- `vercel.json`
- `firestore.rules`
- `local-dev-server.mjs`
- `README.md`
- `FIREBASE_VERCEL_SETUP.md`
- `TRANSFER_STOP_AND_LEARN.md`
- `api/config.js`
- `api/_lib/firebase-admin.js`
- `api/admin/users.js`
- `logo-stop-learn-square.png`
- optional `logo-stop-learn.png`

## Auf dem neuen PC

1. Projektordner oeffnen.
2. `npm install` ausfuehren.
3. Lokal mit `npm run start:local` testen.
4. Firebase-Projektwerte bereithalten.
5. In Vercel die Variablen aus `.env.example` setzen.
6. In Firebase `E-Mail/Passwort` aktivieren.
7. Firestore-Regeln aus `firestore.rules` verwenden.
8. Fuer den Adminbereich einen Service Account und `ADMIN_EMAILS` setzen.

## Wenn du online weiterdeployen willst

- Vercel-Konto
- Firebase-/Google-Cloud-Konto
- Web-App-Konfiguration
- Service-Account fuer Adminfunktionen

## Wichtig

- Lokale alte Daten werden beim ersten Login automatisch in die Cloud uebernommen, wenn fuer dieses Konto noch kein Firestore-Zustand existiert.
