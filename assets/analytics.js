(function () {
  const measurementId = "G-Y37XS7EXYM";

  function loadAnalytics() {
    if (window.cmsmAnalyticsLoaded) return;
    window.cmsmAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.cmsmLoadAnalytics = loadAnalytics;

  if (localStorage.getItem("cmsm_cookie_consent") === "accepted") {
    loadAnalytics();
  }
})();
