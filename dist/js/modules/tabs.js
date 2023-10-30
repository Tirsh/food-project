function tabs(tabSelector, tabContentSelector, tabParentSelector, activeClass) {
    // Tabs
    const tabheadersWrapper = document.querySelector(tabParentSelector),
          tabheaders = document.querySelectorAll(tabSelector),          
          tabcontents = document.querySelectorAll(tabContentSelector);

    function hideAllTabcontent() {
        tabcontents.forEach(item => {
            item.classList.add("tabcontent_hide");
            item.classList.remove("tabcontent_show");
        });
        tabheaders.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function tabcontentShow(item = 0) {
        hideAllTabcontent();
        tabcontents[item].classList.remove("tabcontent_hide");
        tabcontents[item].classList.add("tabcontent_show", "tabcontent_fade");
        tabheaders[item].classList.add(activeClass);
    }

    tabcontentShow();
    tabheadersWrapper.addEventListener("click", (event)=>{
        const target = event.target;
        if (target && target.classList.contains(tabSelector.slice(1))){
            tabheaders.forEach((item, i) => {
                if (item == target) {
                    tabcontentShow(i);
                }
            });
        }
    });
}

export default tabs; 