/**
 * ==============================================================================
 * 🧪 MODUL:         CMPSimulation
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/cmp-simulation.js
 * 🆔 MODUL-ID:      RSE-MOD-CMPSIM-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: PrivacyCore
 * 🔒 SICHTBARKEIT:  Nur im Entwickler-/Testmodus aktivierbar
 * 📌 BESCHREIBUNG:
 *     Dieses Modul erlaubt es Entwicklern, verschiedene Consent-Zustände
 *     manuell über das Browser-Interface zu simulieren. So kann man
 *     das Verhalten anderer Module prüfen, ohne echte Klicks auszulösen.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Dieses Modul darf NICHT in Produktivumgebungen verwendet werden!
 *     Nur lokal oder auf Staging-Seiten einbinden.
 * ==============================================================================
 */

(function () {
  if (!location.hostname.includes("localhost") && !location.hostname.includes("staging.")) {
    console.warn("[RSE][CMP-Sim] Nicht aktiviert: Nur auf localhost oder staging erlaubt.");
    return;
  }

  window.addEventListener("DOMContentLoaded", () => {
    if (!window.RSEPrivacyCore) {
      console.error("[RSE][CMP-Sim] PrivacyCore nicht geladen.");
      return;
    }

    // Dev UI
    const simBox = document.createElement("div");
    simBox.style.position = "fixed";
    simBox.style.bottom = "10px";
    simBox.style.right = "10px";
    simBox.style.background = "#eee";
    simBox.style.border = "1px solid #aaa";
    simBox.style.padding = "10px";
    simBox.style.fontFamily = "monospace";
    simBox.style.fontSize = "12px";
    simBox.style.zIndex = 10000;
    simBox.innerHTML = `
      <strong>🔧 Consent-Simulation</strong><br>
      <button id="rse-sim-accept-all">Alle akzeptieren</button>
      <button id="rse-sim-essential">Nur notwendig</button>
      <button id="rse-sim-clear">Zurücksetzen</button>
    `;

    document.body.appendChild(simBox);

    document.getElementById("rse-sim-accept-all").onclick = () => {
      RSEPrivacyCore.saveConsent({
        marketing: true,
        analytics: true,
        essential: true
      });
      location.reload();
    };

    document.getElementById("rse-sim-essential").onclick = () => {
      RSEPrivacyCore.saveConsent({
        marketing: false,
        analytics: false,
        essential: true
      });
      location.reload();
    };

    document.getElementById("rse-sim-clear").onclick = () => {
      RSEPrivacyCore.revokeConsent();
      location.reload();
    };

    console.info("[RSE][CMP-Sim] Dev-Simulation aktiviert.");
  });
})();
