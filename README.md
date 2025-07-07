# 📦 RSE PrivacySuite

Willkommen zur offiziellen RSE PrivacySuite – der datenschutzkonformen Cookie- & Tracking-Lösung mit Modularsystem.  
Diese Suite ermöglicht DSGVO-, TTDSG-, CH-DSG- und CCPA-konforme Einbindungen für Websites aller Branchen.

---

## 🔐 Lizenzierung

- Jeder Kunde erhält eine individuelle Lizenz-ID: `RSE_CLIENT_ID`
- Die ID wird in `/core/rse-suite-loader.js` hinterlegt
- Module werden nur geladen, wenn sie für diese Lizenz freigeschaltet sind

---

## 📁 Projektstruktur

/rse-privacysuite/
│
├── core/ → Hauptlogik & Loader
│ └── rse-suite-loader.js
│
├── modules/ → JavaScript-Funktionalitäten
│ ├── privacy-core.js
│ ├── tracking-control.js
│ └── ...
│
├── templates/ → HTML-Templates je Branche
│ ├── base.html
│ ├── technik.html
│ ├── ecommerce.html
│ └── ...
│
├── styles/ → zentrales Banner- und Design-CSS
│ ├── banner.css
│ ├── design-tourismus.css
│ └── ...
│
├── LICENSE.txt → individuelle Lizenzvereinbarung
├── datenschutzmuster.txt → Muster-DSGVO-Textbausteine
└── README.md → diese Datei


---

## 🧩 Enthaltene Module

| Modulname             | Beschreibung                                  |
|-----------------------|-----------------------------------------------|
| `privacy-core`        | Speichert & prüft Zustimmung (LocalStorage)   |
| `tracking-control`    | Aktiviert/Deaktiviert Tracker                 |
| `seo-boost`           | Optimiert Meta-/Strukturdaten                |
| `audit-safe`          | Consent-Logging (lokal oder extern)           |
| `marketing-optin`     | Checkbox-Erzwingung für Formulare             |
| `multilanguage`       | Sprache des Nutzers erkennen und anpassen     |
| `performance-shield`  | Blockiert Medien, Karten bis Zustimmung       |
| `design-fit`          | Passt CI (Farben, Fonts) automatisch an       |
| `legal-plus`          | Fügt rechtlich empfohlene Hinweise hinzu      |
| `quick-scan`          | Analysiert gesetzte Cookies lokal             |
| `cmp-simulation`      | Entwicklertool für Consent-Simulation         |

---

## 🚀 Integration auf der Kundenseite

Füge **nur diesen einen Script-Tag** ein (z. B. in `base.html` oder Footer):

```html
<script src="/rse-privacysuite/core/rse-suite-loader.js"></script>

Die restliche Konfiguration erfolgt intern durch RSE-Systems.

📬 Support
Fehler, Fragen oder Wünsche:
👉 support@rse-systems.com mit Lizenz-ID & Domain
