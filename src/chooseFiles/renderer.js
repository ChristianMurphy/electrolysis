const {ipcRenderer: ipc} = require('electron')
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
  sessionStorage.files = JSON.stringify(event.dataTransfer.files.map(file => file.path))
  ipc.send('goto-view', 'chooseSettings')
  return false
}

// Capture clicks event
// Opens a system dialog
button.addEventListener('click', () => ipc.send('open-file-dialog'))

// Listens for when files have been selected
// Stores file list to sessionStorage
// Then changes view
ipc.on('selected-files', (event, files) => {
  sessionStorage.files = JSON.stringify(files)
  ipc.send('goto-view', 'chooseSettings')
})
