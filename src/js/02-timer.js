import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const btnReset = document.querySelector('[data-reset]');
const countDounDays = document.querySelector('[data-days]');
const countDounHours = document.querySelector('[data-hours]');
const countDounMinutes = document.querySelector('[data-minutes]');
const countDounSeconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', beginCountStart);
btnReset.addEventListener('click', clearCountDownValue);

btnStart.disabled = true;
btnReset.disabled = true;
const currentDate = new Date();
let timeDifference = null;
let countDownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      timeDifference = selectedDate - currentDate;

      if (selectedDate < currentDate) {
          Notiflix.Report.failure('Please choose a date in the future');
      } else {
          btnStart.disabled = false;
          beginCountDown()
      }
  },
};

flatpickr(inputDate, options);

function beginCountDown() {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countDounDays.textContent = days.toString().padStart(2, '0');
    countDounHours.textContent = hours.toString().padStart(2, '0');
    countDounMinutes.textContent = minutes.toString().padStart(2, '0');
    countDounSeconds.textContent = seconds.toString().padStart(2, '0');
    
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(countDownInterval)
        Notiflix.Report.info('FINISH');
    } else {timeDifference -= 1000}
}

function beginCountStart() {
    countDownInterval = setInterval(beginCountDown, 1000);
    inputDate.disabled = true;
    btnStart.disabled = true;
    btnReset.disabled = false;
}

function clearCountDownValue() {
    location.reload();
}



