const video = document.querySelector('.player video')
const playerBtn = document.querySelector('.player__button')
const ranges = document.querySelectorAll('.player__slider')
const skipButtons = document.querySelectorAll('[data-skip]')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')

let isplaying = false
  
function playBtn(){
  isplaying = !isplaying
  if(isplaying){
    playerBtn.innerText = '❚❚'
    video.play()
  }else{
    playerBtn.innerText = '►'
    video.pause()
  }
}

function handleProgress() {
  const current = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${current}%`;
}

function skipHandler() {
  const skip = Number(this.dataset.skip)
  const current = video.currentTime 
  video.currentTime = current + skip
}

function scrub(e) {
  const scrubTo = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTo
}

function rangeHandler() {
  video[this.name] = this.value
}
playerBtn.addEventListener('click', playBtn)
video.addEventListener('click', playBtn)
video.addEventListener('timeupdate', handleProgress)

ranges.forEach(range=>{
  range.addEventListener('change', rangeHandler) 
  range.addEventListener('mousemove', rangeHandler)
})

skipButtons.forEach(skip=>{
  skip.addEventListener('click', skipHandler)
})

let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
progress.addEventListener('mouseout', () => mouseDown = false)