/**
 * ==============================================================================
 * 📦 MODUL:         TrackingControl
 * 📁 DATEIPFAD:     /rse-privacysuite/modules/tracking-control.js
 * 🆔 MODUL-ID:      RSE-MOD-TRACKINGCTRL-V1
 * 📅 ERSTELLT AM:   05.07.2025
 * ✏️ GEÄNDERT AM:   05.07.2025 – RSE-Systems (riber@rse-systems.com)
 * 🧩 ABHÄNGIGKEITEN: Benötigt PrivacyCore (Consent-Status muss vorhanden sein)
 * 🔒 SICHTBARKEIT:  Wird per Script eingebunden (nicht öffentlich aufrufbar)
 * 📌 BESCHREIBUNG:
 *     Das Modul TrackingControl verwaltet die Ausführung von externen Trackern
 *     wie Google Analytics, Meta Pixel oder LinkedIn Insight, abhängig von der
 *     durch PrivacyCore gespeicherten Einwilligung des Nutzers.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 *     Tracking wird nur aktiviert, wenn ein gültiger Consent für "marketing"
 *     oder "analytics" vorliegt. Keine Tracker werden ohne Zustimmung geladen.
 * ==============================================================================
 */

(function () {
  function injectGoogleAnalytics() {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX", { anonymize_ip: true });

    console.info("[RSE] Google Analytics aktiviert.");
  }

  function injectMetaPixel() {
    !(function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '123456789012345'); 
    fbq('track', 'PageView');

    console.info("[RSE] Meta Pixel aktiviert.");
  }

  function checkAndActivateTrackers() {
    if (!window.RSEPrivacyCore) {
      console.warn("[RSE] TrackingControl: PrivacyCore nicht geladen.");
      return;
    }

    if (RSEPrivacyCore.hasConsent("analytics")) {
      injectGoogleAnalytics();
    }

    if (RSEPrivacyCore.hasConsent("marketing")) {
      injectMetaPixel();
    }
  }

  // Aktiviere Tracking nach Consent-Auswahl (wird bei PageLoad geprüft)
  window.addEventListener("DOMContentLoaded", function () {
    checkAndActivateTrackers();
  });

})();
