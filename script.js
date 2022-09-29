// settings variables 
let short_break = 5;
let long_break = 15;
let focus = 25;
let interval = 4; // long break each for focus-short break sections

// logics variables 
let minutes = focus;
let seconds = 0;
let pause = false;

// This variable must be < 2 * interval 
// If it's odd, resset to focus section 
// If it's even, reset to short break section 
// If it's equal to 2 * interval - 1, reset to long break
let count = 0; 

function toggle_pause() {
    pause = !pause;

    if (pause) document.getElementById("pause_btn").innerHTML = "Play";
    else document.getElementById("pause_btn").innerHTML = "Pausar";
}

function next() {
    count = count + 1;
    seconds = 0;
    minutes = 0;
    pomodoro();
}

function settings(event) {
    event.preventDefault();
    
}

function pomodoro() {
    if (pause) return;

    if (seconds == 0) {

        if (minutes == 0) { // Reset!
            seconds = 0;
            let msg;

            if (count == 2 * interval - 1) {
                count = 0;
                minutes = long_break;
                msg = "Long Break!";

            } else {
                if (count % 2 == 0) {
                    minutes = short_break;
                    msg = "Short Break!";
                    
                } else {
                    minutes = focus;
                    msg = "Focus";
                }
            }

            document.getElementById("msg").innerHTML = msg;
        } else {
            // reset the seconds and decresed the minutes
            minutes -= 1;
            seconds = 59;
        }
    } else {
        seconds -= 1; // decresed the second
    }

    // update the results
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    return (null);
}

window.onload = () => {
    setInterval(pomodoro, 1000);
    document.querySelector('form').addEventListener('submit', event => settings(event))
}