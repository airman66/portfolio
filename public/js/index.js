document.addEventListener("DOMContentLoaded", () => {
    const modalCall = document.querySelectorAll(`[data-modal]`);
    const modalClose = document.querySelectorAll(`[data-close]`);
    const modals = document.querySelectorAll(".modal");
    const modalDialogs = document.querySelectorAll(".modal__dialog");

    for (let i = 0; i < modalCall.length; i++) {
        modalCall[i].addEventListener("click", e => {
            e.preventDefault();
            const modalId = modalCall[i].dataset.modal;
            const modal = document.querySelector(`${modalId}`);
            modal.classList.add("show");
            setTimeout(() => {
                modal.querySelector(".modal__dialog").style.transform = "scale(1)";
            }, 200);
        });
    }

    for (let i = 0; i < modalClose.length; i++) {
        modalClose[i].addEventListener("click", e => {
            e.preventDefault();
            const modalDialog = modalClose[i].parentNode;
            const modal = modalDialog.parentNode;
            modalDialog.style.transform = "scale(0)";
            setTimeout(() => {
                modal.classList.remove("show");
            }, 200);
        });
    }

    for (let i = 0; i < modals.length; i++) {
        modals[i].addEventListener("click", () => {
            modals[i].querySelector(".modal__dialog").style.transform = "scale(0)";
            setTimeout(() => {
                modals[i].classList.remove("show");
            }, 200);
        });
    }

    for (let i = 0; i < modalDialogs.length; i++) {
        modalDialogs[i].addEventListener("click", e => {
            e.stopPropagation();
        });
    }
});