/**
 * ==============================================================================
 * 📦 MODUL:         MultiLanguage
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/multilanguage.js
 * 🆔 MODUL-ID:      RSE-MOD-MULTILANG-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: cookie-banner (DOM-Struktur muss vorhanden sein)
 * 🔒 SICHTBARKEIT:  Wird mit dem Banner geladen, öffentlich sichtbar
 * 📌 BESCHREIBUNG:
 *     Dieses Modul erkennt die bevorzugte Sprache des Nutzers über
 *     navigator.language und passt die Texte des Cookie-Banners sowie der Buttons
 *     dynamisch an. Standardmäßig unterstützt: Deutsch, Englisch, Französisch.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Keine Datenübertragung, reine Frontend-Manipulation basierend auf Lokalisierung.
 * ==============================================================================
 */

(function () {
  const translations = {
    de: {
      text: "Wir verwenden Cookies, um Ihre Nutzererfahrung zu verbessern.",
      more: "Mehr erfahren",
      accept: "Alle akzeptieren",
      decline: "Nur notwendige"
    },
    en: {
      text: "We use cookies to enhance your user experience.",
      more: "Learn more",
      accept: "Accept all",
      decline: "Only necessary"
    },
    fr: {
      text: "Nous utilisons des cookies pour améliorer votre expérience utilisateur.",
      more: "En savoir plus",
      accept: "Tout accepter",
      decline: "Seulement nécessaires"
    }
  };

  function getPreferredLang() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.slice(0, 2).toLowerCase();
  }

  function applyTranslation(lang) {
    const t = translations[lang] || translations["de"];
    const banner = document.getElementById("rse-cookie-banner");
    if (!banner) return;

    const p = banner.querySelector("p");
    const a = banner.querySelector("a");
    const buttons = banner.querySelectorAll("button");

    if (p) p.textContent = t.text + " ";
    if (a) {
      a.textContent = t.more;
      a.href = "/datenschutz"; // Optional: Sprachabhängig anpassen
    }
    if (buttons.length >= 2) {
      buttons[0].textContent = t.accept;
      buttons[1].textContent = t.decline;
    }

    console.info(`[RSE] Sprache erkannt: ${lang} – Texte angepasst.`);
  }

  window.addEventListener("DOMContentLoaded", function () {
    const lang = getPreferredLang();
    applyTranslation(lang);
  });
})();
