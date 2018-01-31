var electronInstaller = require('electron-winstaller');

var resultPromise = electronInstaller.createWindowsInstaller({
    //appDirectory: '../electron-api-demos/',
    //appDirectory: '../iweddingB/', // ./dist/myApp-win32-x64
    appDirectory: './iweB/', // ./dist/myApp-win32-x64 // 앱 폴더 경로
    outputDirectory: './iFamilySC/iweddingB/', // 설치 프로그램 생성 경로
    exe: './iweddingB.exe', // 앱 명
    setupExe: './exe_file/MyAppSetup.exe',
    //setupIcon : , // 아이콘
    //iconUrl : , // 응용프로그램 아이콘 URL
    //version : , // 버젼
    //loadingGif : , // 설치중 나올 GIF 파일 로컬경로
});

resultPromise.then(function () {
    console.log("It worked!");
}, function (e) {
    console.log('No dice: ' + e);
});