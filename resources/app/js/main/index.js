/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 250);
/******/ })
/************************************************************************/
/******/ ({

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(36);

function confirmRestart(releaseNotes) {
  return new Promise(function (resolve, reject) {
    // 다시 실행해도 괜찮은지 묻는 대화 상자 출력하기
    _electron.dialog.showMessageBox({
      type: "info",
      title: "Update Available",
      message: "The new version has been downloaded. Restart the application to apply the updates.",
      detail: releaseNotes,
      buttons: ["Restart", "Later"]
    }, function (response) {
      if (response === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

function checkUpdate() {
  var feedURL = void 0;
  if (process.platform === "win32") {
    // 배포 통지 서버의 URL 설정(Windows의 경우)
    //autoUpdater.setFeedURL("https://github.com/yoonCY/0922project/releases?version=0.0.2");
    feedURL = "https://github.com/yoonCY/0922project/releases/${app.getVersion()}";
    //feedURL = `https://[your-app-release-server].herokuapp.com/update/win32/${app.getVersion()}`;
  } else if (process.platform === "darwin") {
    // 배포 통지 서버의 URL 설정(macOS의 경우)
    feedURL = "https://[your-app-release-server].herokuapp.com/update/darwin_" + process.arch + "/" + _electron.app.getVersion();
  }

  if (!feedURL) return;
  ////"package:sign-exe": "signcode './out/Electron API Demos-win32-ia32/Electron API Demos.exe' --cert ~/electron-api-demos.p12 --prompt --name 'Electron API Demos' --url 'http://electron.atom.io'",
  //"package:sign-installer": "signcode './out/windows-installer/ElectronAPIDemosSetup.exe' --cert ~/electron-api-demos.p12 --prompt --name 'Electron API Demos' --url 'http://electron.atom.io'",

  // 최신 버전 다운로드 완료 때의 처리
  _electron.autoUpdater.on("update-downloaded", function (event, releaseNotes) {
    confirmRestart(releaseNotes).then(function () {
      // 최신 버전 설치 후 다시 실행하기
      _electron.autoUpdater.quitAndInstall();
    });
  });

  _electron.autoUpdater.on("error", function (e) {
    console.error(e.message);
  });

  _electron.autoUpdater.setFeedURL(feedURL);
  _electron.autoUpdater.checkForUpdates();
}

exports.default = checkUpdate;

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(36);

var _createWindow = __webpack_require__(74);

var _createWindow2 = _interopRequireDefault(_createWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAppMenu() {

  // 템플릿 정의
  var template = [{
    label: "File",
    submenu: [{ label: "New Window", accelerator: "CmdOrCtrl+N", click: _createWindow2.default }, { type: "separator" }, { label: "Close", accelerator: "CmdOrCtrl+W", role: "close" }]
  }, {
    label: "Edit",
    submenu: [{ label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" }, { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" }, { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" }, { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" }]
  }, {
    label: "View",
    submenu: [{
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: function click(item, focusedWindow) {
        return focusedWindow && focusedWindow.reload();
      }
    }, {
      label: "Toggle DevTools",
      accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
      click: function click(item, focusedWindow) {
        return focusedWindow && focusedWindow.toggleDevTools();
      }
    }]
  }];

  // macOS의 경우
  if (process.platform === "darwin") {
    // 템플릿 앞에 메인 메뉴 추가하기
    template.unshift({
      label: _electron.app.getName(),
      submenu: [{ role: "about" }, { type: "separator" }, { role: "services", submenu: [] }, { type: "separator" }, { role: "hide" }, { role: "hideothers" }, { role: "unhide" }, { type: "separator" }, { role: "quit" }]
    });
    // 템플릿 뒤에 윈도 메뉴 추가하기
    template.push({
      role: "window",
      submenu: [{ role: "minimize" }, { role: "zoom" }]
    });
  }

  // 템플릿으로 Menu 객체 생성하기
  var appMenu = _electron.Menu.buildFromTemplate(template);

  // 생성한 Menu 객체를 애플리케이션에 설정하기
  _electron.Menu.setApplicationMenu(appMenu);
}

exports.default = setAppMenu;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(36);

var _setAppMenu = __webpack_require__(115);

var _setAppMenu2 = _interopRequireDefault(_setAppMenu);

var _createWindow = __webpack_require__(74);

var _createWindow2 = _interopRequireDefault(_createWindow);

var _checkUpdate = __webpack_require__(114);

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.app.on("ready", function () {
  (0, _setAppMenu2.default)();
  (0, _createWindow2.default)();
  (0, _checkUpdate2.default)();
});

_electron.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    _electron.app.quit();
  }
});

_electron.app.on("activate", function (_e, hasVisibleWindows) {
  if (!hasVisibleWindows) {
    (0, _createWindow2.default)();
  }
});

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(36);

var win = void 0;
function createWindow() {
  win = new _electron.BrowserWindow();
  win.loadURL("file://" + __dirname + "/../../index.html");
  win.on("close", function () {
    win = null;
  });
}

exports.default = createWindow;

/***/ })

/******/ });