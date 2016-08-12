const {ipcMain, dialog} = require('electron')

/**
 * This runs in the main process and offer the open file dialog
 *  used by the choose files page
 */

ipcMain.on('open-file-dialog', event => {
  dialog.showOpenDialog(
    {
      properties: ['openFile', 'multiSelections']
    },
    files => {
      if (files) event.sender.send('selected-files', files)
    }
  )
})
