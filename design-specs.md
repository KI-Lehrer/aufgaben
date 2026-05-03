# Stop & Learn - Design Specifications

Dieses Dokument enthält alle relevanten Design-Token (Variablen) und Styling-Angaben der Stop & Learn App, ideal für die Weiterbearbeitung oder Komponentenerstellung in Tools wie Stitch.

## 1. Typografie
Die App verwendet die serifenlose Schriftart **Outfit** aus Google Fonts für ein modernes und dynamisches Erscheinungsbild.

- **Schriftart:** `Outfit`, sans-serif
- **Verwendete Schriftschnitte:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold)

### Wichtige Text-Styles
- **Eyebrow** (z.B. Subtitel über Headlines): `0.8rem`, `uppercase`, `letter-spacing: 0.08em`
- **Titel** (z.B. Topbar): `1.18rem`, `font-weight: 700`, `letter-spacing: -0.02em`
- **Subtitel:** `0.95rem`

## 2. Farbpalette (Dark Mode & Light Mode)

Die App nutzt ein Token-System für Farben, das reibungslos zwischen Dark Mode (Standard) und Light Mode umschaltet.

### Dark Mode (Standard, `:root`)
| Token Name | Hex/RGBA Wert | Beschreibung / Verwendung |
| :--- | :--- | :--- |
| `--bg` | `#0f0f1a` | Haupt-Hintergrundfarbe der App |
| `--bg-elevated` | `rgba(20, 20, 36, 0.86)` | Hintergrund für schwebende Elemente (z.B. Topbar) |
| `--surface` | `#17172a` | Kartenhintergrund |
| `--surface-strong` | `#1a1a2e` | Betonte Karten (z.B. Hero-Cards) |
| `--surface-soft` | `rgba(255, 255, 255, 0.04)` | Leichter Hintergrund für Hover-States oder sekundäre Buttons |
| `--line` | `rgba(255, 255, 255, 0.08)` | Trennlinien und Rahmen |
| `--text` | `#f2f3f8` | Haupttextfarbe |
| `--muted` | `#a6accd` | Sekundärer Text, Metadaten, Labels |
| `--accent` | `#7c5cbf` | Primäre Akzentfarbe (Lila/Violett) für Buttons und aktive States |
| `--accent-soft` | `rgba(124, 92, 191, 0.18)` | Leicht transparenter Akzent für Hintergründe (z.B. Hover bei Buttons) |

### Light Mode (`html[data-theme="light"]`)
| Token Name | Hex/RGBA Wert |
| :--- | :--- |
| `--bg` | `#f2f3fb` |
| `--bg-elevated` | `rgba(255, 255, 255, 0.92)` |
| `--surface` | `#ffffff` |
| `--surface-strong` | `#ffffff` |
| `--surface-soft` | `rgba(124, 92, 191, 0.08)` |
| `--line` | `rgba(15, 23, 42, 0.08)` |
| `--text` | `#171827` |
| `--muted` | `#5f6783` |
| `--accent` | `#7456c9` |
| `--accent-soft` | `rgba(116, 86, 201, 0.12)` |

### Globale Semantische Farben (Modus-unabhängig)
Diese Farben werden für Status-Indikatoren, Tags oder Badges verwendet:
- **Erfolg (Green):** `--green` (`#22c55e`)
- **Gefahr/Fehler (Red):** `--red` (`#ef4444`)
- **Warnung (Orange):** `--orange` (`#f97316`)
- **Hinweis (Yellow):** `--yellow` (`#facc15`)
- **Info (Blue):** `--blue` (`#38bdf8`)

## 3. UI Tokens (Abstände, Radien, Schatten)

| Eigenschaft | Token Name | Wert |
| :--- | :--- | :--- |
| Schatten (Dark) | `--shadow` | `0 24px 60px rgba(2, 6, 23, 0.38)` |
| Schatten (Light) | `--shadow` | `0 20px 48px rgba(71, 85, 105, 0.16)` |
| Radius Groß | `--radius` | `18px` |
| Radius Klein | `--radius-sm`| `12px` |
| Animationen | `--transition`| `0.2s ease` |

## 4. Layout Variablen (Größen)

- `--sidebar-width`: `272px` (Standardbreite der Seitenleiste)
- `--sidebar-collapsed-width`: `96px` (Eingeklappte Seitenleiste)
- `--bottom-nav-height`: `88px` (Mobile Navigation Bar)
- `--hour-height`: `74px` (Höhe einer Stunde im Kalender/Stundenplan)
- `--max-width`: `1520px` (Maximale Breite der Content-Area)
- `--page-padding`: `18px` (Standard Abstand am Rand)

## 5. Hintergrund-Gestaltung (Aesthetics)
Die App nutzt ein dynamisches Hintergrundbild, um Tiefe zu erzeugen. Es besteht aus drei radialen Farbverläufen (Gradienten) sowie weichgezeichneten (`blur`) Blob-Elementen (via `::before` und `::after` auf dem `body`), die in den Ecken platziert sind.

- **Body Background (Dark Mode):** 
  `radial-gradient(circle at top left, rgba(124, 92, 191, 0.28), transparent 26%)` und
  `radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.12), transparent 28%)`
- **Blobs:** `filter: blur(80px)`, `opacity: 0.45`
