function calc() {
    //Calc

    const calcResult = document.querySelector(".calculating__result span");
    let sex, height, weight, age, activity;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("activity")) {
        activity = localStorage.getItem("activity");
    } else {
        activity = 1.375;
        localStorage.setItem("activity", 1.375);
    }


    function makeCalc() {
        if (!sex || !height || !weight || !age || !activity) {
            calcResult.textContent = "____";
            return;
        } 
        if (sex === "female") {
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        } else {
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        }
    }

    function initLocalSettings() {

    }

    function getStaticInfo(selector, activityClass){
        const elements = document.querySelectorAll(`${selector} div`);
        elements.forEach(item => {
            item.classList.remove(activityClass);
            if (item.getAttribute("id") === localStorage.getItem("sex")){
                item.classList.add(activityClass);
            }
            if (item.getAttribute("data-activity") === localStorage.getItem("activity")){
                item.classList.add(activityClass);
            }
            item.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-activity")){
                    activity = +e.target.getAttribute("data-activity");
                    localStorage.setItem("activity", activity);
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", sex);
                }
                elements.forEach(item => item.classList.remove(activityClass));
                e.target.classList.add(activityClass);
                makeCalc();
            })
        });

    }
    function getDinamicInfo(selector){
        const inputs = document.querySelectorAll(`${selector} input`);
        inputs.forEach(input => {

            input.addEventListener("input", (e) => {
                if (input.value.match(/\D/g)){
                    input.style.border = "1px solid red";
                } else {
                    input.style.border = "none";
                }
                switch (e.target.getAttribute("id")) {
                    case "height":
                        height = +input.value;
                        break;
                    case "weight":
                        weight = +input.value;
                        break;
                    case "age":
                        age = +input.value;
                        break;                          
                }
                console.log();
                makeCalc();
            })
        });

    }

    makeCalc();
    getStaticInfo("#gender", "calculating__choose-item_active");
    getStaticInfo(".calculating__choose_big", "calculating__choose-item_active");
    getDinamicInfo(".calculating__choose_medium");
}

export default calc;