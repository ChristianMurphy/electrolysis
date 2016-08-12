const {ipcRenderer} = require('electron')
const holder = document.getElementById('ele-holder')
const button = document.getElementById('ele-button')

/**
 * This offers several ways to get a list of file paths
 * and stores the file paths to sessionStorage
 */

// Prevents default events on these actions
holder.ondragover = holder.ondragleave = holder.ondragend = () => false

// Captures the drop event
// Stores file list to sessionStorage
// Then changes view
holder.ondrop = event => {
  event.preventDefault()
  sessionStorage.files = event.dataTransfer.files.map(file => file.path)
  ipcRenderer.send('goto-view', 'chooseSettings')
  return false
}

// Capture clicks event
// Opens a system dialog
button.addEventListener('click', () => ipcRenderer.send('open-file-dialog'))

// Listens for when files have been selected
// Stores file list to sessionStorage
// Then changes view
ipcRenderer.on('selected-files', (event, files) => {
  sessionStorage.files = files
  ipcRenderer.send('goto-view', 'chooseSettings')
})
