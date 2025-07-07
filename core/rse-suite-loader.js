/**
 * ==============================================================================
 * 🔗 RSE PrivacySuite – Modul-Ladezentrale
 * 📁 Pfad         : /rse-privacysuite/core/rse-suite-loader.js
 * 🆔 Datei-ID     : RSE-CORE-LOADER-V1
 * 📅 Erstellt     : 05.07.2025
 * ✏️ Geändert     : 05.07.2025 – RSE-Systems
 * 📌 Beschreibung :
 *     Lädt alle freigeschalteten Module abhängig von der Lizenz-ID. Verhindert
 *     unautorisierte Nutzung und ermöglicht modulare Einbindung nach Branche.
 * ==============================================================================
 */

(function () {
  // --------------------------------------
  // 🔐 Konfiguration (je Kunde individuell)
  // --------------------------------------
  const RSE_CLIENT_ID = "acme-xyz";
  const ACTIVE_MODULES = [
    "privacy-core",
    "tracking-control",
    "seo-boost",
    "audit-safe",
    "marketing-optin",
    "multilanguage",
    "performance-shield",
    "design-fit",
    "legal-plus",
    "quick-scan"
  ];

  const MODULE_BASE_URL = "modules/";

  // --------------------------------------
  // 🧠 Dynamischer Ladevorgang
  // --------------------------------------
  function loadModule(name) {
    const script = document.createElement("script");
    script.src = `${MODULE_BASE_URL}${name}.js`;
    script.defer = true;
    script.onload = () => console.info(`[RSE] Modul geladen: ${name}.js`);
    script.onerror = () => console.warn(`[RSE] ⚠️ Modul NICHT geladen: ${name}`);
    document.head.appendChild(script);
  }

  function initSuiteLoader() {
    console.group(`[RSE] 🔧 PrivacySuite geladen für ID: ${RSE_CLIENT_ID}`);
    ACTIVE_MODULES.forEach(loadModule);
    console.groupEnd();
  }

  window.addEventListener("DOMContentLoaded", initSuiteLoader);
})();
