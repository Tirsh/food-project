import { getResource } from "./services/services";
 
 function menu() {
    //Menu items
    class MenuItem {
        constructor (src, alt, title, descr, price, container, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parrent = document.querySelector(container);
            this.classes = classes;
        }

        render() {
            const element = document.createElement("div");
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                    ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            if (this.classes.length <= 0) {
                element.classList.add("menu__item");
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }
            this.parrent.append(element);
        }
    }

    getResource("./db.json")
        .then(data => {
            data.menu.forEach(({img, alt, title, descr, price}) => {
                new MenuItem(img, alt, title, descr, price, ".menu .container", "menu__item").render();
            })
        })
}

export default menu;
