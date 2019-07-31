let countdown;
const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
const times = document.querySelectorAll('.timer__button');
const inputTime = document.querySelector('form[name=customForm]')

function timer(secs){
  clearInterval(countdown)

  const now = Date.now();
  const then = now + secs*1000;
  displayTimeLeft(secs)
  displayTimeEnd(then)

  countdown = setInterval(() => {
    const secsLeft = Math.round((then - Date.now()) / 1000);
    if(secsLeft < 0){
      clearInterval(countdown)
      return;
    }
    displayTimeLeft(secsLeft);
  }, 1000);
}

function displayTimeLeft(secs) {
  const hour = Math.floor(secs / 3600)
  secs = secs % 3600
  const mins = Math.floor(secs / 60)
  const remainingSecs = secs % 60
  const currentTime = `${hour < 10 ? '0' : ''}${hour}:${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`
  timeLeft.textContent = currentTime
  document.title = currentTime
}

function displayTimeEnd(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const mins = end.getMinutes()
  const adjustHour = hour > 12 ? hour - 12: hour;
  const hourClock = hour >= 12 ? 'PM':'AM'
  timeEnd.textContent = `Be back at ${adjustHour}:${mins < 10 ? '0' : ''}${mins} ${hourClock}`
}

inputTime.addEventListener('submit', function (e) {
  e.preventDefault()
  const text = document.querySelector('input')
  if (!isNaN(text.value)){
    clearInterval(countdown)
    timer(text.value * 60)
  }else{
    alert('NOT A NUMBER! PLEASE ENTER A NUMBER!!')
  }
  console.log(text.value)
  this.reset()
})

times.forEach(time => {
  time.addEventListener('click', function (e) {
    timer(parseInt(this.dataset.time))
  })
})