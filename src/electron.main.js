'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 853,
    height: 480,
    frame: false
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // mainWindow.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.on('close', (event, arg) => {
  app.quit();
});