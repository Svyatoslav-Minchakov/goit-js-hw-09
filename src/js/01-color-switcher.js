const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const pagebody = document.querySelector('body');

btnStart.addEventListener('click', beginChangrColor);
btnStop.addEventListener('click', stopChangeColor);

let timerId = null;

function beginChangrColor() {
    timerId = setInterval(() => {
        return pagebody.style.backgroundColor = getRandomHexColor();
    }, 1000)

    btnStart.disabled = true;
    btnStop.disabled = false;
}

function stopChangeColor() {
    clearInterval(timerId)

    btnStart.disabled = false;
    btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


