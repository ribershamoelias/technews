/**
 * ==============================================================================
 * ⚖️ MODUL:         LegalPlus
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/legal-plus.js
 * 🆔 MODUL-ID:      RSE-MOD-LEGALPLUS-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: cookie-banner, multilanguage
 * 🔒 SICHTBARKEIT:  Optional im Banner/Overlay sichtbar
 * 📌 BESCHREIBUNG:
 *     Dieses Modul fügt auf Basis der Region/Domain rechtlich empfohlene Hinweise
 *     im Footer des Cookie-Banners oder an anderer Stelle hinzu – z. B. zu Widerrufsrechten,
 *     „Do Not Sell“-Hinweisen oder Datenlöschung.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Keine Verarbeitung oder Weitergabe – rein informativ / textbasiert.
 * ==============================================================================
 */

(function () {
  const region = window.rseRegion || "eu"; // "eu", "de", "ch", "us-ca"
  const banner = document.getElementById("rse-cookie-banner");
  if (!banner) return;

  const messages = {
    de: "Sie können Ihre Einwilligung jederzeit über den Datenschutz-Link widerrufen.",
    ch: "Gemäß CH-DSG informieren wir Sie über Art und Zweck der Datenverarbeitung.",
    eu: "Unsere Website verwendet Cookies entsprechend der DSGVO-Richtlinien.",
    "us-ca": "Under the CCPA, you have the right to opt out of the sale of your personal data."
  };

  const legalBox = document.createElement("div");
  legalBox.style.marginTop = "10px";
  legalBox.style.fontSize = "12px";
  legalBox.style.color = "#555";
  legalBox.textContent = messages[region] || messages["eu"];

  banner.appendChild(legalBox);

  console.info(`[RSE] LegalPlus: Hinweis für Region "${region}" eingefügt.`);
})();
