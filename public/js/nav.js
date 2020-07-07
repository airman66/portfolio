$(function() {
    /* Mobile nav */

    const navToggle = $("#navToggle");
    const nav = $("#nav");
    const navLinks = $(".nav__link");

    navLinks.on("click", () => {
        nav.removeClass("show");
    });

    $("body").on("click", ({target: {classList}}) => {
        if (!classList.contains("nav") && !classList.contains("burger__icon")) {
            nav.removeClass("show");
        }
    });

    navToggle.on("click", function(event) {
        event.preventDefault();

        nav.toggleClass("show");
    });
});
