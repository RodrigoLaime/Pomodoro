window.onload = () => {
/* pomodor */
let workTime;
let breakTime;
let restTime;
let timesCompleted;/* cuantos tiempos completados */
let cyclesGoal;/* almacena los ciclos que quiera hacer el usuario */
let cyclesCompleted = 0;/* vamos a manejar cada ves que llegemos al rest largo */

function pomodoroController(){
    if(isRestTime()){/* pregunta si es el momento para descansar y si es el momento para descansar que aga algo */
      cyclesCompleted++;/*  */
      if(!goalReached()){/* si todavia no llegamos al objetivo */
        currentTime = restTime;/* va a empesar a correr el break largo */
        timer();
        timesCompleted = 0;
      }else{ /* si llegamos al objetivo */
      console.log("pomodoro Finished!");
      }
      return;/* para cortar antes de que siga con los demas condicionales */
    }
    if (timesCompleted % 2 == 0){
        currentTime = workTime;
        timesCompleted++;
        timer();
        console.log(
            "Time to Work! TC:" + timesCompleted + ",cycles" + cyclesCompleted
        );
    } else {
        currentTime = breakTime;
        timesCompleted++;
        timer();
        console.log(
            "Time to Work! TC:" + timesCompleted + ",cycles" + cyclesCompleted
        );
    }
}

function isRestTime(){ /* retorna verdadero cuando  */
    return timesCompleted == 7;/* para averiguar cuando viene el descanso largo */
}


function goalReached(){
    return cyclesGoal == cyclesCompleted;/* (si es igual  0 = 0) retorna si llegamos al objetivo */
}

/* frontend connection */
let clock = document.getElementById("clock");
let cyclesInput = document.getElementById("cycles-input");
let startButton = document.getElementById("start-button");
let workTimeInput = document.getElementById("work-time");
let breakTimeInput = document.getElementById("break-time");
let restTimeInput = document.getElementById("rest-time");

/* Button functionality */
startButton.onclick = () => {
    populateVariables();
    startPomodoro();/*imprime en consola y llama a otra funcion */
}

function startPomodoro(){
    console.log("started pomodoro");
    pomodoroController();
}

function populateVariables(){
    console.log("populated variables");
    workTime = workTimeInput.value;/* minutos */
    breakTime = breakTimeInput.value;/* minutos */
    restTime = restTimeInput.value;/* minutos */
    cyclesGoal = cyclesInput.value;
    timesCompleted = 0;
}

/* clock */
let clockMinutes;
let clockSeconds;

function updateClock(){
    clockMinutes = formatNumbers(currentTime);
    clockSeconds = formatNumbers(seconds);
    clock.innerHTML = clockMinutes + ":" + clockSeconds;
}

function formatNumbers(time){
    let formattedDigits;
    if(time < 10){
        formattedDigits = "0" + time;
    } else {
        formattedDigits = time;
    }
    return formattedDigits;
}
/* timer */
let currentTime;
let seconds = 0;

function timer(){
    if(currentTime > 0 || seconds > 0){
        if(seconds == 0){
            seconds == 59;
            currentTime--;
        } else {
            seconds--;
        } 
        updateClock();
        console.log(currentTime, seconds);
        setTimeout(timer, 1000);
    }else{
        pomodoroController();
        /* console.log("El temporizador termino"); */
    }
}
};