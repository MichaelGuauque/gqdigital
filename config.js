/**
 * config.js
 * Configuración centralizada de contacto para GQ Digital.
 * Si el número de WhatsApp o el mensaje predeterminado cambian,
 * este es el único lugar que hay que editar.
 */

const WHATSAPP_NUMBER = "573185717309"; // Formato internacional, sin '+' ni espacios (57 = Colombia)
const WHATSAPP_DEFAULT_MESSAGE = "Hola GQ Digital, quiero una cotización para mi proyecto";

/**
 * Construye un link de WhatsApp (wa.me) con el número configurado.
 * @param {string} [message] - Mensaje personalizado. Si no se pasa, usa el mensaje por defecto.
 */
function buildWhatsAppLink(message) {
  const text = message || WHATSAPP_DEFAULT_MESSAGE;
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Da formato legible al número: 573185717309 -> 318 571 7309
 */
function formatDisplayNumber(number) {
  const local = number.startsWith("57") ? number.slice(2) : number;
  return local.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}

/**
 * Recorre el documento y completa automáticamente:
 * - Cualquier elemento con [data-wa-link] -> le asigna el href de WhatsApp
 *   (puede llevar un data-wa-msg opcional con un mensaje personalizado)
 * - Cualquier elemento con [data-wa-text] -> le asigna el número formateado como texto
 */
function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa-link]").forEach((el) => {
    const customMessage = el.getAttribute("data-wa-msg");
    el.setAttribute("href", buildWhatsAppLink(customMessage));
  });

  document.querySelectorAll("[data-wa-text]").forEach((el) => {
    const prefix = el.getAttribute("data-wa-text") || "";
    el.textContent = `${prefix}${formatDisplayNumber(WHATSAPP_NUMBER)}`;
  });
}

document.addEventListener("DOMContentLoaded", initWhatsAppLinks);
