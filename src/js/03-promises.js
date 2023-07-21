import Notiflix from 'notiflix';

const pageForm = document.querySelector('.form');
pageForm.addEventListener('submit', generatePromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.5;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Promise ${position} після ${delay}мс`);
      } else {
        reject(`Promise ${position} після ${delay}мс`);
      }
    }, delay);
  });
}

function generatePromises(event) {
  event.preventDefault();
  const delay = Number(document.querySelector('input[name="delay"]').value);
  const step = Number(document.querySelector('input[name="step"]').value);
  const amount = Number(document.querySelector('input[name="amount"]').value);
  
  let currentPromise = 1;

  const intervalId = setInterval(() => {
    if (currentPromise > amount) {
      clearInterval(intervalId);
      return;
    }

    if (delay === 0 || step === 0) {
      Notiflix.Report.failure('Затримка повинна бути більше нуля!');
      clearInterval(intervalId);
      document.querySelector('input[name="delay"]').value = '';
      document.querySelector('input[name="step"]').value = '';
      document.querySelector('input[name="amount"]').value = '';
      return
    }

    if (delay < 0 || step < 0) {
      Notiflix.Report.failure('Затримка не повинна бути від\'ємною');
      clearInterval(intervalId);
      document.querySelector('input[name="delay"]').value = '';
      document.querySelector('input[name="step"]').value = '';
      document.querySelector('input[name="amount"]').value = '';
      return
    }

    createPromise(currentPromise, delay)
      .then((position) => {
        console.log(`✅ Виконано ${position} через ${step}мс`);
        Notiflix.Notify.success(`✅ Виконано ${position} через ${step}мс`);
      })
      .catch((position) => {
        console.log(`❌ Відхилено ${position} через ${step}мс`);
        Notiflix.Notify.failure(`❌ Відхилено ${position} через ${step}мс`);
      });

    currentPromise += 1;
  }, step);
}
