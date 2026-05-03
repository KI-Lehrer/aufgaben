# Stop & Learn mit Vercel und Firebase

## 1. Firebase-Projekt anlegen

1. Öffne die [Firebase Console](https://console.firebase.google.com/).
2. Erstelle ein neues Projekt.
3. Füge eine Web-App hinzu.
4. Kopiere die Firebase-Konfigurationswerte.

## 2. Authentication aktivieren

1. Öffne in Firebase `Authentication`.
2. Aktiviere den Provider `E-Mail/Passwort`.
3. Aktiviere optional zusätzlich den Provider `Google`.
4. Hinterlege bei Bedarf deine Support-E-Mail.

## 3. Firestore aktivieren

1. Öffne `Firestore Database`.
2. Erstelle die Datenbank im Produktionsmodus.
3. Nutze zum Start diese Sicherheitsregeln:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 4. Vercel-Umgebungsvariablen setzen

Lege in Vercel diese Variablen an:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`
- `ADMIN_EMAILS`

`ADMIN_EMAILS` enthält eine oder mehrere E-Mail-Adressen, durch Komma getrennt. Nur diese Konten sehen den Adminbereich.

Für die Admin-Variablen brauchst du einen Firebase Service Account:

1. Öffne in Firebase oder Google Cloud die Service-Accounts deines Projekts.
2. Erstelle einen privaten Schlüssel für ein Serverkonto.
3. Übertrage `project_id`, `client_email` und `private_key` in die Vercel-Variablen.
4. Achte darauf, dass `FIREBASE_ADMIN_PRIVATE_KEY` inklusive Zeilenumbrüchen korrekt übernommen wird.

## 5. Deployment

1. Importiere das Projekt in Vercel.
2. Setze die Umgebungsvariablen.
3. Deploye die App.

Vercel hostet die statische `index.html`, stellt unter `/api/config` die Firebase-Konfiguration für das Frontend bereit und schützt den Adminbereich über serverseitige Firebase-Admin-APIs.

## 6. Datenmodell

Die App speichert den kompletten Zustand pro Benutzer in einem Firestore-Dokument:

- Pfad: `users/{uid}`
- Feld: `state`

Beim ersten Login werden vorhandene lokale Browser-Daten automatisch als erste Cloud-Version übernommen, falls in Firestore noch nichts vorhanden ist.

## 7. Adminbereich

- Nur Konten aus `ADMIN_EMAILS` sehen den Menüpunkt `Adminbereich`
- Der Adminbereich liest alle registrierten Nutzerkonten sowie deren gespeicherten Firestore-Zustand
- Die Prüfung erfolgt serverseitig über eine verifizierte Firebase-ID-Token-Anfrage an `/api/admin/users`
