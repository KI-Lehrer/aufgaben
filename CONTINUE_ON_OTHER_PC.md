# Stop & Learn – Weiterarbeit auf anderem PC

Stand: 05.05.2026

## Kurzüberblick

- Projektname: `Stop & Learn`
- Frontend: komplette Single-Page-App in `index.html`
- Backend/Cloud: Firebase Auth + Firestore + kleine Vercel-API-Endpunkte
- Deployment: Vercel
- Lokaler Dev-Server: `local-dev-server.mjs`

## Wichtige URLs

- Lokale App:
  - `http://127.0.0.1:4173/`
- Öffentliche Produktion:
  - `https://aufgaben-omega.vercel.app`
- Letztes bestätigtes Produktionsdeployment:
  - `https://aufgaben-jh56jfah7-ki-lehrers-projects.vercel.app`

## Was zuletzt umgesetzt wurde

- App komplett auf helles Design umgestellt.
- Dark Mode vollständig entfernt:
  - kein Toggle mehr
  - keine Dark-Mode-Einstellung mehr
  - App ist fest auf Light Theme gesetzt
- Login, Dashboard, Hausaufgaben, Stundenplan, Prüfungen, Kalender und Einstellungen visuell neu gestaltet.
- Textkontraste auf farbigen Karten verbessert.
- Datumslogik auf lokale Systemzeit korrigiert.
- Rechter Druck-/Floating-Button entfernt.
- Feld `Raum` aus dem Lektionen-Formular entfernt.
- Hausaufgaben sind jetzt im aufgeklappten Zustand direkt löschbar.
- Adminbereich vereinfacht:
  - Filter `Wartend / Freigegeben / Alle`
  - Checkboxen für Auswahl
  - Sammel-Freigabe für wartende Nutzer
  - auch bereits freigegebene Nutzer sind per Checkbox auswählbar

## Wichtige Dateien

- `index.html`
  - gesamte App inklusive HTML, CSS, JS
- `local-dev-server.mjs`
  - lokaler Server für statische Dateien und `/api/config`
- `api/config.js`
  - Firebase-Konfiguration aus Env-Variablen
- `api/_lib/firebase-admin.js`
  - Firebase-Admin-Helfer
- `api/admin/users.js`
  - Admin-Userliste und Detaildaten
- `api/admin/approve.js`
  - Freigabe/Sperrung/Löschen von Nutzern
- `firestore.rules`
  - Firestore-Regeln
- `vercel.json`
  - Vercel-Konfiguration
- `CURRENT_STATUS.md`
  - älterer Status-Überblick
- `CHANGELOG.md`
  - ergänzendes Änderungsprotokoll

## Lokal starten

Im Projektordner:

```bash
npm install
npm run start:local
```

Dann im Browser:

```text
http://127.0.0.1:4173/
```

Wenn der Browser einen alten Stand zeigt, einen Cache-Buster anhängen:

```text
http://127.0.0.1:4173/?v=20260505
```

## Deployment

Produktiv deployen mit:

```bash
npx vercel deploy --prod --yes
```

Vercel-Projekt:

- Projektname: `aufgaben`
- Team: `ki-lehrers-projects`

## Firebase / Cloud

- Firebase-Projekt: `stop-and-learn`
- Firebase ist bereits an Vercel angebunden
- Auth + Firestore sind aktiv vorgesehen
- Produktions-Env-Variablen sind in Vercel bereits gesetzt

Wichtig:

- Keine Secrets in Markdown-Dateien speichern
- `.env.local` oder echte Schlüssel nicht in Git oder Doku kopieren

## Aktueller lokaler Arbeitsstand

Zum Zeitpunkt dieser Übergabe gibt es lokale Änderungen, die nicht automatisch bedeuten, dass alles bereits in Git committed wurde.

Zuletzt lokal verändert:

- `index.html`
- `api/admin/approve.js`
- `local-dev-server.mjs`
- `CHANGELOG.md`
- `CURRENT_STATUS.md`

Vor Weiterarbeit auf einem anderen PC daher zuerst prüfen:

```bash
git status
```

und danach bei Bedarf:

```bash
git pull
```

oder die fehlenden Änderungen zuerst sauber übernehmen.

## Wichtige Funktionslogik

- Fächer sind global und zentrale Datenquelle.
- Dashboard verwendet den Kontonamen bevorzugt aus dem angemeldeten Firebase-User.
- Neue Benutzer bekommen beim ersten Cloud-Start einen frischen Zustand statt den lokalen Zustand des vorherigen Kontos zu übernehmen.
- Hausaufgaben, Prüfungen und Stundenplan hängen alle an denselben globalen Fächern.
- Kalender aggregiert Hausaufgaben, Prüfungen und Lektionen.

## Bekannte nächste sinnvolle Schritte

- Adminbereich weiter verfeinern:
  - echte Sammelaktionen für bereits ausgewählte freigegebene Nutzer
  - z. B. Sammel-Sperren oder Sammel-Löschen
- Git-Stand sauber committen und pushen, falls das noch offen ist
- Optional UI-Feinschliff auf Mobile-Abständen und Typografie
- Optional Adminliste noch stärker auf Freigabe-Workflow reduzieren

## Schneller Wiedereinstieg

Wenn du auf einem anderen PC direkt weitermachen willst:

1. Projektordner öffnen
2. `npm install`
3. `npm run start:local`
4. `git status` prüfen
5. `index.html` als Hauptdatei für UI/Logik öffnen
6. bei Cloud-/Admin-Themen zusätzlich `api/admin/*.js` prüfen

## Wichtigster Hinweis

Fast alle UI- und Funktionsänderungen passieren in `index.html`.
Wenn etwas visuell oder logisch angepasst werden soll, ist das fast immer die erste Datei, die geprüft werden muss.
