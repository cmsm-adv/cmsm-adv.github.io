(function () {
  const config = window.CMSM_CONFIG;
  const form = document.querySelector("#contact-form");
  const emailLink = document.querySelector("#contact-email");
  const hours = document.querySelector("#contact-hours");
  if (emailLink) { emailLink.href = `mailto:${config.email}`; emailLink.textContent = config.email; }
  if (hours) hours.textContent = config.hours;
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const message = ["Olá, vim pelo site da CMSM Advogados.", "", `Nome: ${data.get("nome")}`, `Cidade/país: ${data.get("local")}`, `Área: ${data.get("assunto")}`, `Contato: ${data.get("retorno")}`, `Urgência ou prazo: ${data.get("urgencia") || "Não informado"}`, "", "Resumo:", data.get("resumo")].join("\n");
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { method: "whatsapp", language: "pt-BR" });
    }
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
})();
