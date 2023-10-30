function getData() {
    // Send to server

    const messages = {
        loading: "icons/spinner.svg",
        sussess: "Спасибо! Мы скоро с вами свяжемся.",
        fail: "Что-то пошло не так!"
    }

    const postData = async (url, data) => {
         const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
         });
         return await  res.json();
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
            const object = {};
            formData.forEach(function (value, key){
                object[key] = value;
            })
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", JSON.stringify(json))
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
        openModal();

        const newDialog = document.createElement("div");
        newDialog.classList.add("modal__dialog");
        newDialog.innerHTML = `
                <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${text}</div>
            </div>
        `;
        document.querySelector(".modal").append(newDialog);
        setTimeout(() => {
            closeModal();
            newDialog.remove();
            document.querySelector(".modal__dialog").style.display = "block";      

        }, 4000)

    }

    document.querySelectorAll("form").forEach(f => bindPostData(f));
}

export default getData;