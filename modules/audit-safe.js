/**
 * ==============================================================================
 * 📦 MODUL:         AuditSafe
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/audit-safe.js
 * 🆔 MODUL-ID:      RSE-MOD-AUDITSAFE-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: PrivacyCore (Consent muss geladen sein)
 * 🔒 SICHTBARKEIT:  Nicht öffentlich sichtbar – Debug/Log-Funktion nur intern
 * 📌 BESCHREIBUNG:
 *     Dieses Modul speichert lokal eine Audit-Timeline der wichtigsten
 *     Datenschutzaktionen des Nutzers (Einwilligung, Widerruf, Änderung).
 *     Diese Daten sind nicht personalisiert, aber für Prüfzwecke geeignet.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Es erfolgt KEINE Übertragung an externe Server. Alles bleibt lokal im
 *     Browser. Logs können durch RSE-Support ausgelesen oder exportiert werden.
 * ==============================================================================
 */

(function () {
  const LOG_KEY = "rse_audit_log";

  function loadLog() {
    try {
      return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveLog(logArray) {
    localStorage.setItem(LOG_KEY, JSON.stringify(logArray));
  }

  function logEvent(eventType, details = {}) {
    const logArray = loadLog();
    const entry = {
      timestamp: new Date().toISOString(),
      event: eventType,
      meta: details
    };
    logArray.push(entry);
    saveLog(logArray);
    console.info("[RSE][Audit] Ereignis gespeichert:", entry);
  }

  // Ereignisse manuell verfügbar machen für andere Module:
  window.RSEAuditSafe = {
    logConsentGiven: (source) => {
      const consent = window.RSEPrivacyCore?.getConsent?.() || {};
      logEvent("consent_given", { consent, source });
    },
    logConsentRevoked: () => {
      logEvent("consent_revoked");
    },
    logConsentChanged: (updatedConsent) => {
      logEvent("consent_updated", { updatedConsent });
    },
    exportLog: () => {
      const log = loadLog();
      return JSON.stringify(log, null, 2);
    },
    clearLog: () => {
      localStorage.removeItem(LOG_KEY);
      console.warn("[RSE][Audit] Audit-Log gelöscht.");
    }
  };
})();
