(function () {
  "use strict";
  const config = window.CMSM_CONFIG;
  const form = document.querySelector("#contact-form");
  const en = document.documentElement.lang.startsWith("en");
  const email = document.querySelector("#contact-email");
  const hours = document.querySelector("#contact-hours");
  if (email) { email.href = "mailto:" + config.email; email.textContent = config.email; }
  if (hours) hours.textContent = en ? "Monday–Friday, 10:00 a.m.–6:00 p.m. BRT" : config.hours;
  if (!form) return;
  const status = document.querySelector("#form-status");
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector("span");
  const initialLabel = label.textContent;
  let pending = false;
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get("_honey")) return;
    pending = true;
    button.disabled = true;
    label.textContent = en ? "Sending…" : "Enviando…";
    status.textContent = "";
    const payload = Object.fromEntries(data.entries());
    payload._subject = en ? "CMSM — website enquiry (English)" : "CMSM — contato pelo site";
    payload._template = "table";
    payload.Idioma = en ? "English" : "Português";
    const controller = new AbortController();
    const timer = setTimeout(function () { controller.abort(); }, 20000);
    try {
      const response = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(config.email), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Submission not accepted");
      status.textContent = en ? "Your enquiry has been submitted. CMSM will contact you using the details provided." : "Sua mensagem foi enviada. A CMSM entrará em contato pelos dados informados.";
      status.dataset.state = "success";
      if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { method: "contact_form", language: en ? "en" : "pt-BR" });
      form.reset();
    } catch (_) {
      status.dataset.state = "error";
      status.textContent = en ? "We could not confirm submission. Your details have been kept in the form. Please try again or contact us by email or WhatsApp below." : "Não foi possível confirmar o envio. Seus dados foram mantidos no formulário. Tente novamente ou utilize o e-mail ou WhatsApp abaixo.";
    } finally {
      clearTimeout(timer);
      pending = false;
      button.disabled = false;
      label.textContent = initialLabel;
      status.focus();
    }
  });
  const whatsapp = document.querySelector("#contact-whatsapp");
  if (whatsapp) whatsapp.href = "https://wa.me/" + config.whatsapp;
})();
