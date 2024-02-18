const electron = require('electron');
const {app, BrowserWindow} = electron
const url = require('url')
const path = require('path');

require('electron-reload')(__dirname,{electron: path.join(__dirname, 'node_modules', '.bin', 'electron')})

let win = null

function createWindow(){
    win = new BrowserWindow({
      width: 589,
      height: 695,
      alwaysOnTop: false,
      maximizable: false,
      minimizable: false,
      center: true,
      autoHideMenuBar: true,
      resizable: true,
      fullscreenable: false,
      frame: false,
      titleBarStyle: 'hidden',
      transparent: true,
    });
    win.loadURL(url.format(path.join(__dirname, '/invoker.html')));  
    //win.webContents.openDevTools()
    win.on('closed', () => {
      win = null
    })
    win.on('blur', () => {
        win.setBackgroundColor('#00000000')
      })
      
      win.on('focus', () => {
        win.setBackgroundColor('#00000000')
      })
      const [w, h] = win.getSize();
      win.setSize(w, h);

      win.on('resize', function () {
        setTimeout(function () {
          var size = win.getSize();
          win.setSize(size[0], parseInt(size[0] * 10.6 / 9));
        }, 0);
      });
    
  }
  
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

 
  app.on('ready', createWindow);