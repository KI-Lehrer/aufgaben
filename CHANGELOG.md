# Stop & Learn – Änderungsprotokoll

## Session vom 04.05.2026

### ✅ Erledigt

#### 1. Topbar-Statusbalken ausgeblendet
- Die Chips oben rechts (Cloud aktiv, Lektionen, Aufgaben, Prüfungen) wurden entfernt.
- Nur noch der Logout-Button bleibt sichtbar.
- Umgesetzt via CSS: `.topbar-status .soft-chip { display: none; }`

#### 2. Dashboard – Fokus auf Wesentliches
- Zeigt nur noch **dringende Hausaufgaben** (fällig/überfällig heute) und **aktuelle Prüfungen** (nächste 7 Tage).
- Stundenplan-Block und Stats-Karten wurden aus dem Dashboard entfernt.

#### 3. Drucken-Button entfernt
- FAB (floating action button) wurde in einer früheren Session bereits deaktiviert (`renderFab()` ist leer).

#### 4. Light-Mode Sidebar – helles Design
- Sidebar ist im Light-Mode jetzt **weiß/hell** (`rgba(255,255,255,0.96)`), passend zum restlichen hellen Design.
- Akzentfarbe (Lila) wird für aktive Nav-Buttons und Hover-Effekte verwendet.
- Alle Texte, Buttons und Icons wurden für den hellen Hintergrund angepasst.

#### 5. Sidebar scrollbar
- `overflow-y: auto` statt `overflow: hidden` → Sidebar ist jetzt scrollbar wenn Inhalt nicht reinpasst.
- Schmaler Custom-Scrollbar (4px) mit halbtransparenter Farbe.

#### 6. Fächerverwaltung – Stundenplan direkt eingeben
- Im Fächer-Modal erscheint nach dem Anlegen/Bearbeiten eines Fachs ein Bereich **„Stunden im Plan"**.
- Dort sieht man alle bestehenden Lektionen des Fachs (mit Löschen-Button).
- Neue Lektion über Schnellformular: **Wochentag + Startzeit** → Dauer automatisch **45 Minuten**.
- **Pause-Buttons** im Modal:
  - „+ 5 Min. Pause" → schiebt die Startzeit im Formular um 5 Minuten vor
  - „+ 20 Min. Pause" → schiebt die Startzeit um 20 Minuten vor
- **Workflow**: Fach anlegen → Fach per Bearbeiten-Icon öffnen → Lektionen hinzufügen

#### 7. Fächer-Modal – Folgelektionen schneller erfassen
- Nach dem Anlegen einer Lektion springt das Schnellformular jetzt automatisch auf die **Endzeit der soeben angelegten Lektion**.
- **Wochentag** und manuell gesetzter **Raum** bleiben im Formular erhalten.
- So lassen sich mehrere Lektionen eines Fachs direkt nacheinander eingeben, ohne jedes Mal wieder bei `08:00` zu starten.

---

### 🔧 Offene Punkte / Ideen für nächste Session

- [ ] Schnellübersicht im Dashboard: Heutiger Stundenplan optional wieder einblendbar?
- [ ] Stundenplan: Lektionen direkt im Wochenraster per Drag & Drop verschieben?
- [x] Fächer-Modal: Lektionen einer anderen Lektion nacheinander eintragen (auto-advance Startzeit nach Anlegen)
- [ ] Mobile: Bottom-Nav ggf. verschlanken (6 Einträge sind viele)
- [ ] Push-Notifications (aktuell nur visuell simuliert)

---

### 📁 Projektstruktur

```
Aufgaben-App/
├── index.html          # Komplette Single-Page-App (HTML + CSS + JS)
├── api/
│   ├── config.js       # Firebase-Konfiguration (Vercel Env-Vars)
│   ├── admin/
│   │   ├── users.js    # Admin: Nutzerliste laden
│   │   ├── approve.js  # Admin: Nutzer genehmigen / löschen
│   │   ├── seed.js     # Admin: Beispieldaten laden
│   │   └── reset-password.js  # Admin: Passwort zurücksetzen
├── design-specs.md     # Designvorgaben
├── CHANGELOG.md        # Diese Datei
├── .env.local          # Lokale Firebase-Config (nicht in Git)
└── vercel.json         # Vercel-Routing
```

---

### 🔑 Technische Hinweise

- **State** wird lokal (`localStorage`) und in **Firestore** synchronisiert.
- **Auth**: Firebase Email/Passwort + Google OAuth. Nutzer brauchen Admin-Freigabe (`/approvals/{uid}`).
- **Theme**: `data-theme="dark"/"light"` auf `<html>`. Toggle über Sidebar-Button oder Einstellungen.
- **Kein Build-Step**: Alles in einer `index.html`. Firebase-SDK via CDN (ESM).
- **Lokal starten**: `node local-dev-server.mjs` (liest `.env.local`)
