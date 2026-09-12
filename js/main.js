const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const currentYear = document.getElementById("currentYear");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}