  const panels = document.querySelectorAll('.panel')

  function closeOtherPanels(currentPanel) {
    panels.forEach(panel => {
      if (panel.classList.contains('open') && !panel.classList.contains(currentPanel)) {
        panel.classList.remove('open')
      }
    })
  }

  function toggleOpen(e) {
    let currentPanel = this.dataset.panel
    closeOtherPanels(currentPanel)
    this.classList.toggle('open')
  }

  function toggleOpenActive(e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active')
    }
  }
  panels.forEach(panel => {
    panel.addEventListener('click', toggleOpen)
    panel.addEventListener('transitionend', toggleOpenActive)
  })