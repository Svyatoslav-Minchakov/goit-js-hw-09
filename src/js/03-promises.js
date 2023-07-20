

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

    createPromise(currentPromise, delay)
      .then((position) => {
        console.log(`✅ Виконано ${position} через ${step}мс`);
      })
      .catch((position) => {
        console.log(`❌ Відхилено ${position} через ${step}мс`);
      });

    currentPromise += 1;
  }, step);
}
