var app = require('app');  // Module to control application life.
var path = require('path');
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// define global vars
process.env.TRANSFACER_DATA = path.join(app.getPath('userData'), '.'+ app.getName() +'.json');
process.env.TRANSFACER_HOME = path.join(app.getPath('home'), '.'+ app.getName() +'.json');
process.env.TRANSFACER_LOCAL = '.'+ app.getName() +'.json';

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/../../static/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
