/**
 * ==============================================================================
 * 📦 MODUL:         MarketingOptin
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/marketing-optin.js
 * 🆔 MODUL-ID:      RSE-MOD-MARKETINGOPTIN-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: Optional AuditSafe für Logging
 * 🔒 SICHTBARKEIT:  Aktiv in Formularen mit ID /rse-optin oder class .rse-optin
 * 📌 BESCHREIBUNG:
 *     Dieses Modul prüft, ob eine Opt-in-Checkbox für Marketing gesetzt wurde,
 *     bevor ein Formular abgeschickt werden darf (z. B. für Newsletter-Anmeldung).
 *     Optionale Logik zur Speicherung im Audit-Modul ist integriert.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Es wird kein Tracking oder Datenversand durchgeführt. Dieses Modul
 *     arbeitet rein lokal im Browser und schützt vor versehentlichem Opt-in.
 * ==============================================================================
 */

(function () {
  const optinSelector = ".rse-optin-form";

  function blockSubmitWithoutConsent(form) {
    form.addEventListener("submit", function (e) {
      const checkbox = form.querySelector('input[type="checkbox"][name="rse_optin"]');
      if (!checkbox || !checkbox.checked) {
        e.preventDefault();
        alert("Bitte stimmen Sie der Verwendung Ihrer Daten für Marketingzwecke zu.");
        return false;
      }

      if (window.RSEAuditSafe) {
        window.RSEAuditSafe.logEvent("marketing_optin", {
          formId: form.id || "unbenannt",
          page: window.location.pathname
        });
      }

      return true;
    });
  }

  function initAllOptinForms() {
    const forms = document.querySelectorAll(optinSelector);
    if (!forms.length) return;
    forms.forEach(blockSubmitWithoutConsent);
    console.info(`[RSE] ${forms.length} Marketing-Opt-in-Formulare überwacht.`);
  }

  window.addEventListener("DOMContentLoaded", initAllOptinForms);
})();
