const {ipcRenderer} = require('electron')
const holder = document.getElementById('ele-holder')
const button = document.getElementById('ele-button')

/**
 * This offers several ways to get a list of file paths
 * and stores the file paths to sessionStorage
 */

// prevent default events on these actions
holder.ondragover = holder.ondragleave = holder.ondragend = () => false

// capture the drop event
holder.ondrop = event => {
  event.preventDefault()
  sessionStorage.files = event.dataTransfer.files.map(file => file.path)
  return false
}

// capture click event
button.addEventListener('click', () => ipcRenderer.send('open-file-dialog'))

// files selected from dialog
ipcRenderer.on('selected-files', (event, files) => {
  sessionStorage.files = files
})
