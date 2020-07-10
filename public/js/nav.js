document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector("#navToggle");
    const nav = document.querySelector("#nav");
    const navLinks = document.querySelectorAll(".nav__link");

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", () => {
            nav.classList.remove("show");
        });
    }

    document.querySelector("body").addEventListener("click", ({target: {classList}}) => {
        if (!classList.contains("nav") && !classList.contains("burger__icon")) {
            nav.classList.remove("show");
        }
    });

    navToggle.addEventListener("click", e => {
        e.preventDefault();
        if (!nav.classList.contains("show")) {
            nav.classList.add("show");
        } else {
            nav.classList.remove("show");
        }
    });
});