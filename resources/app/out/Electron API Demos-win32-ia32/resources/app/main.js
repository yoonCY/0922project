const path = require('path');
const glob = require('glob');
const electron = require('electron');
const {ipcMain} = require('electron');
const autoUpdater = require('./auto-updater');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const Menu = electron.Menu;

const debug = /--debug/.test(process.argv[2]);
//const io = require('socket.io-client')('http://1.235.21.145:4113/iweddingb');


if (process.mas) app.setName('IWEDDING B');

var mainWindow = null;

function initialize () {
    var shouldQuit = makeSingleInstance();
    if (shouldQuit) return app.quit();

    //loadDemos();

    function createWindow () {
        var windowOptions = {

            minWidth: 680,
            minheight: 540,
            title: "IWEDDINGB",//app.getName(),
            resizable: true,
            //backgroundColor : "#2e2c29",
            //transparent : true,
            webPreferences : {
                javascript      : true,
                plugins         : true,
                nativeWindowOpen: true,

            },
        };
        //alwaysOnTop 항상 위에
        //skipTaskbar 작업표시줄에
        //icon 아이콘
        //backgroundColor 브라우저 백그라운드 색
        //

        if (process.platform === 'linux') {

            windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png');
        }

        mainWindow = new BrowserWindow(windowOptions);

        var menu = Menu.buildFromTemplate(require('./config/menu')(app));
        Menu.setApplicationMenu(menu);
        mainWindow.setMenu(menu);

        mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));
        //mainWindow.loadURL('http://withmini.iwedding.co.kr/with_mini/');
        mainWindow.focus();
       // mainWindow.webContents.openDevTools();
        // Launch fullscreen with DevTools open, usage: npm run debug
        if (debug) {

            mainWindow.webContents.openDevTools();
            mainWindow.maximize();
            require('devtron').install();
        }else{
            //mainWindow.maximize();
        }

        mainWindow.webContents.openDevTools();

        mainWindow.on('closed', function () {
            mainWindow = null;
            app.quit();
        });



        mainWindow.on('focus', function(){
            mainWindow.flashFrame(false);
        });




    }

    // 새창 띄우기 이벤트 ipc 메시지
    ipcMain.on('new_window', function(event, arg){
        console.log( event );
        var win = new BrowserWindow( arg.options);
        win.loadURL( arg.url );
        //mainWindow.flashFrame(true);
    });

    // 디비 저장 이벤트 ipc 메시지
    ipcMain.on('user_insert', function(event, arg){


        io.emit("send:desktop_info",  arg );

    });





    // 앱시작시 업데이트 확인및 창 실행
    app.on('ready', function () {

        createWindow();
        autoUpdater.initialize();
    });

    // 모두 닫혔을때
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', function () {
        if (mainWindow === null) {
            createWindow();
        }
    });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
    if (process.mas) return false;

    return app.makeSingleInstance(function () {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

// Require each JS file in the main-process dir
function loadDemos () {
    var files = glob.sync(path.join(__dirname, 'main-process/**/*.js'));
    files.forEach(function (file) {
        require(file);
    });
    autoUpdater.updateMenu();
}

// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
    case '--squirrel-install':
        autoUpdater.createShortcut(function () { app.quit() });
        break;
    case '--squirrel-uninstall':
        autoUpdater.removeShortcut(function () { app.quit() });
        break;
    case '--squirrel-obsolete':
    case '--squirrel-updated':
        app.quit();
        break;
    default:
        initialize();
}


