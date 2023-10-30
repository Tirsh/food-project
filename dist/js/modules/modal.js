function openModal(modalSelector, modalTimer){
    const modal = document.querySelector(modalSelector);
    modal.classList.add("modal_show");
    document.body.style.overflow = "hidden";
    if (modalTimer) {
        clearTimeout(modalTimer);
    }    
}      

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove("modal_show");
    document.body.style.overflow = "";
}

function modals(trigerSelector, modalSelector, modalTimer) {
    // Modal

    const modalTriger = document.querySelectorAll(trigerSelector),
          modal = document.querySelector(modalSelector); 

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    
    modalTriger.forEach(btn => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimer));
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") === "") {
            closeModal(modalSelector);
        }
    });
    document.addEventListener("keydown", e => {
        if (modal.classList.contains("modal_show") && e.code == "Escape") {
            closeModal(modalSelector);
        }
    });

    window.addEventListener("scroll", showModalByScroll);
}

export default modals;
export {openModal, closeModal};