const {ipcRenderer: ipc} = require('electron')
const ffmpeg = require('fluent-ffmpeg')
const button = document.getElementById('ele-button')
const progressBar = document.getElementById('ele-progress')
const toast = document.getElementById('ele-toast')
const backButton = document.getElementById('ele-back')
const timeout = 5000

progressBar.addEventListener('mdl-componentupgraded', function () {
  this.MaterialProgress.setProgress(0)
})

backButton.addEventListener('click', () => ipc.send('goto-view', 'chooseFiles'))

button.addEventListener('click', () => {
  button.disabled = true
  const format = document.querySelector('input[name=format]:checked').value
  const files = JSON.parse(sessionStorage.files)
  files
    .reduce((ff, file) =>
      ff
        .input(file)
        .format(format)
        .output(`${file}.${format}`),
      ffmpeg()
    )
    .on('start', () => {
      toast.MaterialSnackbar.showSnackbar({message: 'Conversion Started', timeout})
    })
    .on('progress', progress =>
      progressBar.MaterialProgress.setProgress(progress.percent)
    )
    .on('error', err => {
      console.log(err)
      button.disabled = false
      progressBar.MaterialProgress.setProgress(0)
      toast.MaterialSnackbar.showSnackbar({message: 'Files could not be processed', timeout})
    })
    .on('end', () => {
      button.disabled = false
      toast.MaterialSnackbar.showSnackbar({message: 'Conversion Complete', timeout})
    })
    .run()
})
