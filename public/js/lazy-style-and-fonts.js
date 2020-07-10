$(() => {
    const font = $(`link[type="font"]`);
    const style = $(`link[type="style"]`);
    setTimeout(() => {
        for(const link of style) {
            link.setAttribute("href", link.dataset.href);
            link.removeAttribute("data-href");
            link.removeAttribute("type");
        }
    }, 300);
    setTimeout(() => {
        for(const link of font) {
            link.setAttribute("href", link.dataset.href);
            link.removeAttribute("data-href")
            link.removeAttribute("type");
        }
    }, 700);
});