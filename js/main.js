const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navigationLinks = navLinks.querySelectorAll("a");
const currentYear = document.getElementById("currentYear");

menuButton.addEventListener("click", () => {
    const menuIsOpen = navLinks.classList.toggle("open");

    menuButton.classList.toggle("active");
    menuButton.setAttribute("aria-expanded", menuIsOpen);
    document.body.classList.toggle("menu-open", menuIsOpen);
});

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }
});

currentYear.textContent = new Date().getFullYear();

const elementsToAnimate = document.querySelectorAll(
    ".product-card, .feature-card, .promotion-content, .promotion-image"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

elementsToAnimate.forEach((element) => {
    observer.observe(element);
});