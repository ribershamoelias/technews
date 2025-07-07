/**
 * ==============================================================================
 * 📦 MODUL:         SEOBoost
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/seo-boost.js
 * 🆔 MODUL-ID:      RSE-MOD-SEBOOST-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: keine (optional konfigurierbar je nach Branche)
 * 🔒 SICHTBARKEIT:  Eingebettet via Lizenz-Schlüssel / Projektkonfiguration
 * 📌 BESCHREIBUNG:
 *     Dieses Modul verbessert die Sichtbarkeit in Suchmaschinen durch strukturierte
 *     JSON-LD Daten im HTML <head>-Bereich. Die Daten werden automatisch erzeugt
 *     und bei Bedarf branchenspezifisch erweitert (z. B. Tourism, E-Commerce).
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Dieses Modul wird nur eingebunden, wenn eine gültige Freischaltung in der
 *     Projektkonfiguration erfolgt ist. Keine Verbindung zu externen Quellen.
 * ==============================================================================
 */

(function () {
  const seoData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ACME Systems GmbH",
    "url": "https://www.acme-website.de",
    "logo": "https://www.acme-website.de/assets/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+49-123-456789",
      "contactType": "customer support",
      "areaServed": "DE",
      "availableLanguage": ["German", "English"]
    }
  };

  function injectSeoStructuredData(data) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
    console.info("[RSE] SEO-Boost: JSON-LD Struktur eingefügt.");
  }

  window.addEventListener("DOMContentLoaded", function () {
    injectSeoStructuredData(seoData);
  });
})();
