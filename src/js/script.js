import calc from "./modules/calc";
import forms from "./modules/forms";
import menu from "./modules/menu";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", ()=> {    
    const modalTimer = setTimeout(() => openModal(".modal", modalTimer), 30000);

    timer(".timer", "2023-12-11");
    calc();
    forms("form", modalTimer);
    menu();
    modal("[data-modal]", ".modal", modalTimer);
    slider({
        containerSelector: ".offer__slider",
        sliderWrapperSelector: ".offer__slider-wrapper",
        nextArrowSelector: ".offer__slider-next",
        prevArrowSelector: ".offer__slider-prev",
        currentSlideSelector: "#current",
        totalSlidesSelector: "#total" 
    });
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
});
