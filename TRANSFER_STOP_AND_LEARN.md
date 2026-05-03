# Stop & Learn – Transferdokumentation

> Hinweis: Diese Dokumentation wurde auf den Stand mit `Firebase Authentication`, `Cloud Firestore` und `Vercel`-Deployment aktualisiert.

## Projektübersicht

- App-Name: `Stop & Learn`
- Typ: Single-Page Web App
- Zweck: Schulorganisation mit Dashboard, Stundenplan, Hausaufgaben, Prüfungen, Kalender und Einstellungen
- Technik: `Vanilla HTML5`, `CSS3`, `JavaScript (ES6+)`, `Firebase Web SDK`
- Persistenz: `Cloud Firestore` mit lokalem Browser-Cache
- Frameworks: keine
- Backend: `Firebase` für Daten/Auth, `Vercel` für Hosting, Konfigurations-API und Admin-APIs

## Projektordner

- Hauptordner: `/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private Ablage/2-Eigene Projekte/Aufgaben-App`

## Relevante Dateien

- Hauptdatei der App: [index.html](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private%20Ablage/2-Eigene%20Projekte/Aufgaben-App/index.html)
- Vercel-Konfigurations-API: [api/config.js](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private%20Ablage/2-Eigene%20Projekte/Aufgaben-App/api/config.js)
- Admin-Helfer: [api/_lib/firebase-admin.js](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private%20Ablage/2-Eigene%20Projekte/Aufgaben-App/api/_lib/firebase-admin.js)
- Admin-API: [api/admin/users.js](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private%20Ablage/2-Eigene%20Projekte/Aufgaben-App/api/admin/users.js)
- Setup-Anleitung: [FIREBASE_VERCEL_SETUP.md](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private%20Ablage/2-Eigene%20Projekte/Aufgaben-App/FIREBASE_VERCEL_SETUP.md)
- Optimiertes App-Logo: [logo-stop-learn-square.png](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private%20Ablage/2-Eigene%20Projekte/Aufgaben-App/logo-stop-learn-square.png)
- Original-Logo: [logo-stop-learn.png](/Users/saschaluscher/Library/CloudStorage/OneDrive-Persönlich/Private%20Ablage/2-Eigene%20Projekte/Aufgaben-App/logo-stop-learn.png)

## Für den Transfer unbedingt mitnehmen

- `index.html`
- `api/config.js`
- `api/_lib/firebase-admin.js`
- `api/admin/users.js`
- `.env.example`
- `FIREBASE_VERCEL_SETUP.md`
- `logo-stop-learn-square.png`

## Optional mitnehmen

- `logo-stop-learn.png`

## Branding

- Browser-Titel: `Stop & Learn`
- Sichtbarer App-Name in der Sidebar: `Stop & Learn`
- Favicon und sichtbares Logo verweisen auf: `./logo-stop-learn-square.png`

## App-Struktur

- `Dashboard`
- `Stundenplan`
- `Hausaufgaben`
- `Prüfungen`
- `Kalender`
- `Einstellungen`
- `Adminbereich` für freigegebene Administrationskonten

## Datenhaltung

- Primärer Speicherort: `Cloud Firestore`
- Firestore-Dokument pro Benutzer: `users/{uid}`
- Enthaltenes Feld: `state`
- Lokaler Cache: Browser-`localStorage`
- Cache-Key: `hausaufgaben-app-state-v1`
- Wichtig: Der bestehende Storage-Key bleibt erhalten, damit lokale Alt-Daten beim ersten Login automatisch in die Cloud übernommen werden können.

## Enthaltene Datenmodelle

### Fächer

- `id`
- `name`
- `color`
- `teacher`
- `room`

### Hausaufgaben

- `id`
- `fachId`
- `title`
- `description`
- `dueDate`
- `status`
- `note`
- `createdAt`

### Prüfungen

- `id`
- `fachId`
- `title`
- `date`
- `topics`
- `learningChecklist`
- `note`
- `createdAt`

### Stundenplan

- `id`
- `weekday`
- `fachId`
- `startTime`
- `endTime`
- `room`

### Einstellungen

- `name`
- `klasse`
- `darkMode`
- `erinnerungen`

### Entwürfe

- Formular-Zwischenspeicher werden ebenfalls lokal gehalten
- Zweck: angefangene Modal-Eingaben gehen bei Reload nicht sofort verloren

## Startverhalten

- Beim ersten Laden werden realistische Beispieldaten erzeugt
- Wenn der lokale Cache leer oder beschädigt ist, werden die Beispieldaten erneut geladen
- Nach der Anmeldung per E-Mail/Passwort oder Google werden Daten aus Firestore geladen
- Wenn in Firestore noch keine Daten vorhanden sind, wird der bestehende lokale Zustand automatisch als erste Cloud-Version übernommen
- Alle Änderungen werden lokal zwischengespeichert und anschließend mit Firestore synchronisiert

## Lokaler Start

Im Projektordner:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Danach im Browser öffnen:

- [http://127.0.0.1:4173/](http://127.0.0.1:4173/)

## Warum nicht direkt über `file://`

- Die App funktioniert grundsätzlich auch lokal als Datei
- Für einen sauberen Transfer und verlässliches Laden des Logos ist `http://127.0.0.1:4173/` die bessere Variante

## Transfer auf ein anderes Gerät oder in einen anderen Ordner

1. Neuen Zielordner anlegen
2. `index.html` kopieren
3. `logo-stop-learn-square.png` in denselben Ordner kopieren
4. Optional `logo-stop-learn.png` ebenfalls mitkopieren
5. Im Zielordner einen lokalen Server starten
6. App im Browser über `http://127.0.0.1:4173/` oder einen anderen freien Port öffnen

## Wenn bestehende Nutzerdaten mittransferiert werden sollen

- Bestehende lokale Daten werden beim ersten Login automatisch in Firestore übernommen, sofern das Benutzerkonto dort noch keinen gespeicherten Zustand hat
- Danach sind dieselben Daten auf allen Geräten mit demselben Konto verfügbar

## Technische Hinweise

- Kein Build-Prozess für das Frontend nötig
- Für die Vercel-Adminfunktionen wird `firebase-admin` über `package.json` eingebunden
- Die gesamte App-Logik bleibt inline in `index.html`
- Firebase wird über CDN-Module geladen
- Vercel stellt unter `/api/config` die öffentliche Firebase-Webkonfiguration aus Umgebungsvariablen bereit
- Vercel nutzt für den Adminbereich zusätzlich `firebase-admin` in Serverless Functions
- Druckfunktion ist eingebaut über `window.print()`
- Für einen vollständigen Test von Registrierung, Login und Adminbereich müssen die Vercel-/Firebase-Umgebungsvariablen gesetzt sein

## Dateigrößen zum Stand dieser Übergabe

- `index.html`: ca. `129 KB`
- `logo-stop-learn-square.png`: ca. `442 KB`
- `logo-stop-learn.png`: ca. `6.2 MB`

## Empfehlung für Weitergabe

- Für Schule, USB-Stick, OneDrive oder Mail reicht meistens:
  - `index.html`
  - `logo-stop-learn-square.png`

## Letzter bekannter lokaler Aufruf

- URL: [http://127.0.0.1:4173/](http://127.0.0.1:4173/)
