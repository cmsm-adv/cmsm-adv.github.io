(function () {
  "use strict";
  const measurementId = "G-Y37XS7EXYM";
  const storageKey = "cmsm_cookie_consent_v1";
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
  let analyticsLoaded = false;
  const copy = isEnglish ? {
    title: "Your privacy",
    text: "We use optional analytics cookies to understand how this website is used and improve its content. You may accept or decline them.",
    accept: "Accept analytics", reject: "Decline", settings: "Cookie settings", privacy: "Privacy notice"
  } : {
    title: "Sua privacidade",
    text: "Utilizamos cookies opcionais de análise para entender o uso do site e melhorar seu conteúdo. Você pode aceitar ou recusar.",
    accept: "Aceitar análise", reject: "Recusar", settings: "Preferências de cookies", privacy: "Política de Privacidade"
  };

  function getConsent() {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  }
  function saveConsent(value) {
    try { localStorage.setItem(storageKey, value); } catch (_) {}
  }
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(script);
  }
  function removeBanner() {
    const banner = document.getElementById("cmsm-cookie-banner");
    if (banner) banner.remove();
  }
  function choose(value) {
    window["ga-disable-" + measurementId] = value !== "accepted";
    saveConsent(value);
    removeBanner();
    if (value === "accepted") loadAnalytics();
    else {
      window.gtag = undefined;
      document.cookie.split(";").forEach(function (cookie) {
        const name = cookie.split("=")[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) return;
        [location.hostname, ".cmsm.com.br", ""].forEach(function (domain) {
          document.cookie = name + "=; Max-Age=0; path=/" + (domain ? "; domain=" + domain : "");
        });
      });
      if (analyticsLoaded) location.reload();
    }
  }
  function addStyles() {
    if (document.getElementById("cmsm-cookie-styles")) return;
    const style = document.createElement("style");
    style.id = "cmsm-cookie-styles";
    style.textContent = `
      #cmsm-cookie-banner{position:fixed;z-index:2147483646;left:24px;right:24px;bottom:24px;max-width:760px;margin:auto;padding:22px 24px;background:#071722;color:#f4f0e7;border:1px solid rgba(179,147,89,.65);box-shadow:0 18px 55px rgba(0,0,0,.35);font-family:Arial,Helvetica,sans-serif}
      #cmsm-cookie-banner h2{margin:0 0 8px;color:#f4f0e7;font:400 22px/1.2 Georgia,serif;letter-spacing:0}
      #cmsm-cookie-banner p{margin:0;color:#c7cdcf;font-size:13px;line-height:1.55}
      #cmsm-cookie-banner a{color:#d2b77e;text-decoration:underline;text-underline-offset:3px}
      .cmsm-cookie-actions{display:flex;gap:10px;align-items:center;margin-top:17px;flex-wrap:wrap}
      .cmsm-cookie-actions button{min-height:42px;padding:0 17px;border-radius:0;border:1px solid #b39359;background:transparent;color:#f4f0e7;font:700 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}
      .cmsm-cookie-actions .cmsm-cookie-accept{background:#b39359;color:#071722}
      .cmsm-cookie-settings{display:block;margin-top:4px;border:0;background:transparent;color:inherit;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:0}
      @media(max-width:600px){#cmsm-cookie-banner{left:10px;right:10px;bottom:10px;padding:20px}.cmsm-cookie-actions{align-items:stretch;flex-direction:column}.cmsm-cookie-actions button{width:100%}}
    `;
    document.head.appendChild(style);
  }
  function showBanner() {
    removeBanner();
    addStyles();
    const privacyUrl = isEnglish ? "privacy.html" : "privacidade.html";
    const banner = document.createElement("section");
    banner.id = "cmsm-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "cmsm-cookie-title");
    banner.innerHTML = `<h2 id="cmsm-cookie-title">${copy.title}</h2><p>${copy.text} <a href="${privacyUrl}">${copy.privacy}</a>.</p><div class="cmsm-cookie-actions"><button type="button" class="cmsm-cookie-accept">${copy.accept}</button><button type="button" class="cmsm-cookie-reject">${copy.reject}</button></div>`;
    banner.querySelector(".cmsm-cookie-accept").addEventListener("click", function () { choose("accepted"); });
    banner.querySelector(".cmsm-cookie-reject").addEventListener("click", function () { choose("rejected"); });
    document.body.appendChild(banner);
    banner.querySelector(".cmsm-cookie-accept").focus();
  }
  function addSettingsControl() {
    const footer = document.querySelector("footer");
    if (!footer || footer.querySelector(".cmsm-cookie-settings")) return;
    const privacyLink = footer.querySelector('a[href$="privacidade.html"], a[href$="privacy.html"]');
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cmsm-cookie-settings";
    button.textContent = copy.settings;
    button.addEventListener("click", showBanner);
    (privacyLink ? privacyLink.parentElement : footer).appendChild(button);
  }
  if (getConsent() === "accepted") loadAnalytics();
  function initializeInterface() {
    addStyles();
    addSettingsControl();
    if (!getConsent()) showBanner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeInterface);
  else initializeInterface();
  window.CMSMCookieConsent = { open: showBanner };
})();
