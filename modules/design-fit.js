/**
 * ==============================================================================
 * 🎨 MODUL:         DesignFit
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/design-fit.js
 * 🆔 MODUL-ID:      RSE-MOD-DESIGNFIT-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: Cookie-Banner DOM-Struktur erforderlich
 * 🔒 SICHTBARKEIT:  Sichtbar bei aktiven Bannern (öffentlich)
 * 📌 BESCHREIBUNG:
 *     Dieses Modul passt das Erscheinungsbild des Cookie-Banners automatisch
 *     an das Corporate Design der Webseite an. Es nutzt eine Konfiguration
 *     im globalen Objekt `window.rseDesignConfig` oder erkennt CSS-Eigenschaften.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Keine Datenverarbeitung – reines Styling-Modul.
 * ==============================================================================
 */

(function () {
  const defaultConfig = {
    theme: "light", // Optionen: light, dark, minimal
    primaryColor: "#0050b3",
    buttonTextColor: "#ffffff",
    borderRadius: "8px",
    fontFamily: "system-ui, sans-serif"
  };

  function applyStyle(config) {
    const banner = document.getElementById("rse-cookie-banner");
    if (!banner) return;

    banner.style.background = config.primaryColor || defaultConfig.primaryColor;
    banner.style.color = config.buttonTextColor || defaultConfig.buttonTextColor;
    banner.style.borderRadius = config.borderRadius || defaultConfig.borderRadius;
    banner.style.fontFamily = config.fontFamily || defaultConfig.fontFamily;

    const buttons = banner.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.style.backgroundColor = "#ffffff";
      btn.style.color = config.primaryColor;
      btn.style.border = `1px solid ${config.primaryColor}`;
      btn.style.borderRadius = config.borderRadius;
      btn.style.padding = "8px 14px";
      btn.style.cursor = "pointer";
    });

    console.info("[RSE] DesignFit: Banner-Design angepasst.");
  }

  function initDesignFit() {
    const config = window.rseDesignConfig || {};
    applyStyle({ ...defaultConfig, ...config });
  }

  window.addEventListener("DOMContentLoaded", initDesignFit);
})();
