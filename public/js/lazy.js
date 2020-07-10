$(function() {
    $(".lazy").lazy({
        effect: "fadeIn",
        effectTime: 500,
        threshold: 0
    });

    $(".lazy-1sec").lazy({
        delay: 1000,
        effect: "fadeIn",
        effectTime: 500,
        threshold: 0
    });

    $(".lazy-script").lazy({
        delayed: 750
    });
});