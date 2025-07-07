/**
 * ==============================================================================
 * 📦 MODUL:         PrivacyCore
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/privacy-core.js
 * 🆔 MODUL-ID:      RSE-MOD-PRIVACYCORE-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: Keine – kann unabhängig geladen werden
 * 🔒 SICHTBARKEIT:  Eingebettet auf Kundenseite (nicht direkt zugänglich)
 * 📌 BESCHREIBUNG:
 *     Das Modul PrivacyCore speichert und liest den Consent-Zustand eines
 *     Webseitenbesuchers lokal im Browser (via LocalStorage). Es stellt zentrale
 *     Hilfsfunktionen bereit, die von allen anderen Modulen genutzt werden können.
 *     Dazu gehören: Consent speichern, laden, prüfen, widerrufen.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Dieses Modul darf nur in Webseiten mit gültiger RSE-Lizenz-ID eingebunden
 *     werden. Änderungen am Code nur nach Rücksprache mit dem RSE-Team.
 * ==============================================================================
 */

(function () {
  const rseConsentKey = "rse_user_consent";

  window.RSEPrivacyCore = {
    /**
     * Speichert die Consent-Daten als JSON im LocalStorage.
     * @param {{marketing: boolean, analytics: boolean, essential: boolean}} data
     */
    saveConsent: function (data) {
      try {
        localStorage.setItem(rseConsentKey, JSON.stringify(data));
        console.info("[RSE] Consent gespeichert:", data);
      } catch (error) {
        console.error("[RSE] Fehler beim Speichern des Consent:", error);
      }
    },

    /**
     * Liest den Consent-Zustand aus dem LocalStorage.
     * @returns {object|null}
     */
    getConsent: function () {
      try {
        const data = localStorage.getItem(rseConsentKey);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error("[RSE] Fehler beim Auslesen des Consent:", error);
        return null;
      }
    },

    /**
     * Prüft, ob für eine bestimmte Kategorie Consent erteilt wurde.
     * @param {string} category – z. B. "marketing" oder "analytics"
     * @returns {boolean}
     */
    hasConsent: function (category) {
      const data = this.getConsent();
      return data && data[category] === true;
    },

    /**
     * Widerruft alle gespeicherten Zustimmungen.
     */
    revokeConsent: function () {
      localStorage.removeItem(rseConsentKey);
      console.warn("[RSE] Consent wurde vollständig widerrufen.");
    }
  };
})();
