"use strict";

window.onload = function() {
    var electron = require('electron');
    var shell = electron.shell;
    var BrowserWindow = electron.BrowserWindow;

    //var child = new BrowserWindow({ modal: true, show: false});


    var script = document.createElement("script");
    script.src = "./script/jquery.js";
    script.onload = script.onreadystatechange = function() {
        $(document).on('click', 'a[href^="http"]', function(event) {
            event.preventDefault();
            shell.openExternal(this.href);
        });

    };
    document.body.appendChild(script);


};

const electron = require('electron');

global.pingHost = function( event_name, data, param ) {
    console.log("ipc 메시지 통신 완료 : ", event_name, data );
    electron.ipcRenderer.sendToHost( event_name, data, param );
};
