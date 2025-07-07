/**
 * ==============================================================================
 * 📦 MODUL:         PerformanceShield
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/performance-shield.js
 * 🆔 MODUL-ID:      RSE-MOD-PERFSHIELD-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: PrivacyCore (Consent-Status prüfen)
 * 🔒 SICHTBARKEIT:  Nur als eingebettetes Script aktiv – nicht öffentlich direkt nutzbar
 * 📌 BESCHREIBUNG:
 *     Dieses Modul verhindert das automatische Nachladen externer Inhalte
 *     (z. B. YouTube, Google Maps), wenn der Nutzer nicht eingewilligt hat.
 *     Erst nach Zustimmung wird das "data-src"-Attribut in ein echtes "src"
 *     umgewandelt, wodurch das Laden ausgelöst wird.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Keine Weitergabe von Nutzerdaten – Inhalte werden nur lokal gesteuert.
 * ==============================================================================
 */

(function () {
  function enableDeferredContent(category) {
    if (!window.RSEPrivacyCore || !RSEPrivacyCore.hasConsent(category)) {
      console.info(`[RSE] ${category} deaktiviert – kein Consent.`);
      return;
    }

    const deferredElements = document.querySelectorAll(`[data-rse-category="${category}"][data-src]`);
    deferredElements.forEach(el => {
      const actualSrc = el.getAttribute("data-src");
      if (actualSrc) {
        el.setAttribute("src", actualSrc);
        el.removeAttribute("data-src");
        console.info(`[RSE] ${category} geladen: ${actualSrc}`);
      }
    });
  }

  window.addEventListener("DOMContentLoaded", function () {
    enableDeferredContent("media");     // z. B. YouTube
    enableDeferredContent("maps");      // z. B. Google Maps
    enableDeferredContent("social");    // z. B. Twitter Widgets
  });
})();
