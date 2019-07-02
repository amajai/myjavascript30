// Listen for pressed key event to play
window.addEventListener('keydown', pressKey)

// nodeList = Find all element with class="key"
const keys = document.querySelectorAll('.key') 

// Get key that completed its transition
keys.forEach(key =>{
  key.addEventListener('transitionend', removeTrans)
})

// Play the key pressed
function pressKey(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
  if (!audio) return
  audio.currentTime = 0
  audio.play()
  key.classList.toggle('playing')
}
// Remove class="playing"
function removeTrans(e){
  if (e.propertyName !== 'transform') return
  this.classList.remove('playing')
}