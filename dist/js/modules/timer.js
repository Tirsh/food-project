function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function timer(id, deadline) {

    function getCurrentTimerData(endTime) {
        let day, hour, minute, seconds;
        const data = endTime - new Date();
        if (data <= 0) {
            day = 0;
            hour = 0;
            minute = 0;
            seconds = 0;
        } else {
            day = Math.floor(data / (1000 * 60 *60 *24));
            hour = Math.floor((data / (1000 * 60 * 60) % 24));
            minute = Math.floor((data / (1000 * 60) % 60));
            seconds = Math.floor((data / 1000) % 60);
        }        
        return {data, day, hour, minute, seconds}
    }
    function setTimer(container, endTime) {
        const timer = document.querySelector(container),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateTimer, 1000);
        updateTimer();

        function updateTimer() {
            const t = getCurrentTimerData(endTime);
            console.log(t);
            days.innerHTML = getZero(t.day);
            hours.innerHTML = getZero(t.hour);
            minutes.innerHTML = getZero(t.minute);
            seconds.innerHTML = getZero(t.seconds);
            if (t.data <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setTimer(id, new Date(deadline));
} 

export default timer;
export {getZero};