const path = require('path');
const electron = require('electron');

const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Menu = electron.Menu;

module.exports = function (app) {

    var template = [
        {
            label: "메뉴",
            submenu: [
                {label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
                {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
                {type: "separator"},
                {label: "잘라내기", accelerator: "CmdOrCtrl+X", selector: "cut:"},
                {label: "복사", accelerator: "CmdOrCtrl+C", selector: "copy:"},
                {label: "붙혀넣기", accelerator: "CmdOrCtrl+V", selector: "paste:"},
                {label: "모두선택", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
            ]
        },
        {
            label: '창옵션',
            role: 'window',
            submenu: [
                /*
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click: function () {

                        // Create the browser window.
                        var win = new BrowserWindow();

                        // Open the DevTools.require('./default').window
                        if (process.env.NODE_ENV === 'DEVELOPMENT') {
                            win.webContents.openDevTools({
                                detach: true
                            });
                        }

                        // Emitted when the window is closed.
                        win.on('closed', function () {

                            // Dereference the window object, usually you would store windows
                            // in an array if your app supports multi windows, this is the time
                            // when you should delete the corresponding element.
                            //if (win && windows.indexOf(win) >= 0) {
                            //  windows.splice(windows.indexOf(win), 1);
                            //  win = null;
                            //}

                        });

                        var menu = Menu.buildFromTemplate(require('./menu')(app));
                        Menu.setApplicationMenu(menu);

                        win.setMenu(menu);

                        // and load the index.html of the app.
                        win.loadURL('file://' + path.join(__dirname, '../index.html'));
                        //windows.push(win);


                    }
                },
                */
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {type: "separator"},
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },

                {
                    label: '개발자모드',
                    accelerator: (function () {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                },
                {type: "separator"},
                {
                    label: '닫기',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                }

            ]
        },
        {
            label: '정보',
            role: 'help',
            submenu: [
                {
                    label: '(주)아이패밀리SC',
                    click: function () {
                        require('electron').shell.openExternal('http://www.ifamily.co.kr')
                    }
                },
                {
                    label: '버전정보',
                    click: function () {
                        //require('electron').shell.openExternal('http://electron.atom.io')
                    }
                }
            ]
        }
    ];

    if (process.platform == 'darwin') {

        var name = app.getName();

        template.unshift({

            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function () {
                        app.quit();
                    }
                }
            ]
        });

        // Window menu.
        template[3].submenu.push(
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        );
    }

    return template;

};