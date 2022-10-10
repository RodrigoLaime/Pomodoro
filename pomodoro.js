window.onload = () => {
  /* pomodoro */
  let workTime;
  let breakTime;
  let restTime;
  let timesCompleted;
/* clock */
  let clockMinutes;
  let clockSeconds;
/*  */
  let cyclesGoal; /* almacena los ciclos que hace el usuario */
  let cyclesCompletes = 0; /* variable que se va a ir menejando cada ves que lleguemos al rest rest largo */

  /* Frontend Conection */
  let clock = document.getElementById('clock');
  let cyclesInput = document.getElementById('cycles-input');
  let startButton = document.getElementById('start-button');
  let workTimeInput = document.getElementById('work-time');
  let breakTimeInput = document.getElementById('break-time');
  let restTimeInput = document.getElementById('rest-time');

  /* button funcionality */
  startButton.onclick = () => {
    populateVariables();
    startPomodoro();
  }

  function startPomodoro(){
    console.log('started Pomodoro');
    pomodoroController();/* se encaga de todo aparatado baquend */
  }

  function populateVariables(){
    console.log('populated variables');
    workTime = workTimeInput.value;/* minutos */
    breakTime = breakTimeInput; /* minutos */
    restTime = restTimeInput; /* minutos */
    cyclesGoal = cyclesInput.value;
    timesCompleted = 0;
  }

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

  function pomodoroController() {
    if (isRestTime()) {
      /* cuando lleguemos al rest largo */
      cyclesCompletes++;
      if (!goalReached()) {
        /* pregunta si tovia no llegamos al objetivo */
        currentTime = restTime; /* va a correr el break largo */
        timer();
        timesCompleted = 0;
      } else {
        /* si llegamos al objetivo */
        console.log("Pomodoro Finished!");
      }
      return;/* para cortar antes de que siga con los demas condicionales */
    }

    if (timesCompleted % 2 == 0) {
      /* si el resultado es par */
      currentTime = workTime;
      timesCompleted++;
      timer();
      console.log("Time to work! TC" + timesCompleted + ",cicles:" + cyclesCompletes);
    } else {
      /* si es inpar o tiempo de descanso */
      currentTime = breakTime;
      timesCompleted++;
      timer();
      console.log("Time to work! TC" + timesCompleted + ",cicles:" + cyclesCompletes);
    }
  }
  function isRestTime() {
    return timesCompleted == 7;
  }

  function goalReached() {
    /* si todavia no llegamos al objetivo*/
    return (
      cyclesGoal == cyclesCompletes
    ); /* si llegamos al final del objetivo */
  }
  let currentTime; /* El tiempo que dure la etapa del pomodoro */ /* minutos */
  let seconds = 0; /* ayuda a avanzar el timer */ /* segundos */

  function timer() {
    if (currentTime > 0 || seconds > 0) {
      if (seconds == 0) {
        seconds == 59;
        currentTime--;
      } else {
        seconds--; /* siempre que second no sea igual a 0 restarle para que llegue a cerp */
      }
      updateClock();
      console.log(currentTime, seconds);
      setTimeout(timer, 1000);
    } else {
      pomodoroController();
      /*             console.log("El temporizador termino");
       */
    }
  }
  timer();
};
