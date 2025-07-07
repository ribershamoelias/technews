/**
 * ==============================================================================
 * 🔍 MODUL:         QuickScan
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/quick-scan.js
 * 🆔 MODUL-ID:      RSE-MOD-QUICKSCAN-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: Keine – läuft autark
 * 🔒 SICHTBARKEIT:  Nur in Dev/Scan-Modus aktiv (nicht im Live-Modus!)
 * 📌 BESCHREIBUNG:
 *     Dieses Modul liest beim Laden der Seite alle gesetzten Cookies aus
 *     und erstellt eine strukturierte Cookie-Liste zur Analyse und ggf. Übergabe
 *     an Datenschutzberater oder RSE-Support.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Es erfolgt keine externe Übertragung der Ergebnisse – reine lokale Analyse.
 * ==============================================================================
 */

(function () {
  if (!location.hostname.includes("localhost") && !location.hostname.includes("preview") && !window.rseEnableQuickScan) {
    console.info("[RSE][QuickScan] Nicht aktiv – nur in Dev/Scan-Umgebung.");
    return;
  }

  function parseCookies() {
    const cookies = document.cookie.split(";").map(cookieStr => {
      const [name, ...rest] = cookieStr.trim().split("=");
      return {
        name,
        value: rest.join("="),
        domain: location.hostname,
        path: "/",
        detected: new Date().toISOString()
      };
    });
    return cookies.filter(c => c.name);
  }

  function showScanResults(cookies) {
    console.groupCollapsed(`[RSE][QuickScan] ${cookies.length} Cookies gefunden:`);
    cookies.forEach(c => {
      console.table([c]);
    });
    console.groupEnd();
  }

  function exportScan(cookies) {
    return JSON.stringify({
      scannedAt: new Date().toISOString(),
      domain: location.hostname,
      cookies
    }, null, 2);
  }

  window.addEventListener("DOMContentLoaded", function () {
    const cookies = parseCookies();
    showScanResults(cookies);
    window.RSEQuickScan = {
      export: () => exportScan(cookies),
      data: cookies
    };
    console.info("[RSE][QuickScan] Modul ausgeführt – exportierbar via RSEQuickScan.export()");
  });
})();
