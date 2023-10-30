import { getZero } from "./timer";

function slider({containerSelector, sliderWrapperSelector, nextArrowSelector, prevArrowSelector, currentSlideSelector, totalSlidesSelector }) {
    
    //Slider

    function makeWrapp(parrentSelector, ...classes) {
        const wrapper = document.createElement("div"),
            parrent = document.querySelector(parrentSelector);
        wrapper.classList.add(...classes);
        wrapper.innerHTML = parrent.innerHTML;
        parrent.innerHTML = "";
        parrent.append(wrapper);
        return wrapper;
    }

    const slider = document.querySelector(containerSelector),
        sliderWrapper = document.querySelector(sliderWrapperSelector),
        sliderInner = makeWrapp(sliderWrapperSelector, "offer__slider-inner"),
        currentSlide = document.querySelector(currentSlideSelector),
        totalSlides = document.querySelector(totalSlidesSelector),
        prev = document.querySelector(prevArrowSelector),
        next = document.querySelector(nextArrowSelector),
        slidesQuantity = sliderInner.childNodes.length,
        slideWidth = window.getComputedStyle(sliderWrapper).width,
        innerWidth = +slideWidth.replace(/\D/g, "") * slidesQuantity,
        indicators = document.createElement("ul");
    let slideCouter = 0;
    totalSlides.textContent = getZero(slidesQuantity);

    sliderInner.style.cssText = `
        width: ${innerWidth}px;
        display: flex;
        transition: 0.5s all;
    `;
    sliderWrapper.style.overflow = "hidden";
    slider.style.position = "relative";
    sliderInner.childNodes.forEach(item => item.style.width = slideWidth);

    function showSlide(slide){
        const move = slide * slideWidth.slice(0, slideWidth.length-2);
        currentSlide.textContent = getZero(slide + 1);
        sliderInner.style.transform = `translateX(-${move}px)`;
        indicators.childNodes.forEach(item => item.style.opacity = ".5");
        indicators.childNodes[slide].style.opacity = "1";
    }
       
    function slidesPlus(n) {
        slideCouter += n;
        if (slideCouter < 0) {
            slideCouter = slidesQuantity - 1;
        }
        if (slideCouter > slidesQuantity - 1) {
            slideCouter = 0;
        }
        showSlide(slideCouter); 
    }

    prev.addEventListener("click", () => {
        slidesPlus(-1);
    });
    next.addEventListener("click", () => {
        slidesPlus(1);
    });


    // Slider nav

    indicators.classList.add("offer__slider-indicators");
    indicators.innerHTML= "<li class='offer__slider-dot'></li>".repeat(slidesQuantity);
    slider.append(indicators);

    indicators.childNodes.forEach((item, n) => {
        item.addEventListener("click", () => {
            slideCouter = n;
            showSlide(n);
        })
    });

    showSlide(0);
}

export default slider;