import { openModal, closeModal } from "./modal";
import { postData } from "./services/services";

function forms(formSelector, timer) {

    const messages = {
        loading: "icons/spinner.png",
        sussess: "Спасибо! Мы скоро с вами свяжемся.",
        fail: "Что-то пошло не так!"
    }

    function bindPostData(form){
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const info = document.createElement("img");
            info.src = messages.loading;
            info.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", info);
 
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
            .then(data => {
                modalMessage(messages.sussess);
            }).catch(() => {
                modalMessage(messages.fail);
            }).finally(() => {
                info.remove();
                form.reset();
            });
        });
    }

    function modalMessage(text){
        document.querySelector(".modal__dialog").style.display = "none";
        openModal(".modal", timer);

        const newDialog = document.createElement("div");
        newDialog.classList.add("modal__dialog");
        newDialog.innerHTML = `
                <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${text}</div>
            </div>
        `;
        const modal = document.querySelector(".modal").append(newDialog);
        setTimeout(() => {
            closeModal(".modal");
            newDialog.remove();
            document.querySelector(".modal__dialog").style.display = "block";      

        }, 4000)

    }

    document.querySelectorAll(formSelector).forEach(f => bindPostData(f));
}

export default forms;