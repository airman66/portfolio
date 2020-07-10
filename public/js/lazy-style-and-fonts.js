$(() => {
    const font = $(`link[link-type="font"]`);
    const style = $(`link[link-type="style"]`);
    setTimeout(() => {
        for(const link of style) {
            link.setAttribute("href", link.dataset.href);
            link.removeAttribute("data-href");
            link.removeAttribute("link-type");
        }
    }, 500);
    setTimeout(() => {
        for(const link of font) {
            link.setAttribute("href", link.dataset.href);
            link.removeAttribute("data-href");
            link.removeAttribute("link-type");
        }
    }, 1000);
});