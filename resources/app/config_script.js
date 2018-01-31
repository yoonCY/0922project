//"use strict";

/**
 * 알림창 관련 함수
 */

function notifications_fnc( data ){

    /**
     * 0 - 메시지 타이틀
     * 1 - 메시지 내용
     * 2 - 메시지 이동 body
     * 3 - 아이콘
     * 4 - 버튼 배열
     */
    console.log(data);
    data[0] = data[0] ? data[0] : "메시지 알림";
    data[1] = data[1] ? data[1] : "메시지가 도착 했습니다.";
    data[2] = data[2] ? data[2] : {
        url : "http://withmini.iwedding.co.kr/with_mini/"
    };

    data[3] = data[3] ? data[3] : "http://www.ifamily.co.kr/image/iFamily/main/index/visual_artist07.png";
    data[4] = data[4] ? data[4] : ["보기", "닫기"];

    var imessage_notifier = notifier.notify(  data[0] ,{
        message: data[1],
        body : data[2],
        icon: data[3],
        buttons: data[4],
        //duration : 10000,
        flat : true,

    });

    imessage_notifier.on('buttonClicked', function( text, buttonIndex, options ){

        if(text ==='닫기')  {
            // Snooze!



        } else if(buttonIndex === 0) {
            //open options.url
            ipcRenderer.send("new_window", options.body);
        }
        console.log("버튼 클릭옵션 ",options);
        imessage_notifier.close();
    });

    imessage_notifier.on('swipedRight', function(){
        imessage_notifier.close()
    });

}

/**
 * 유저 소켓 스크립트 이벤트
 */
function insert_user_data( e ){
    var send_param = {
        user_id : e.args[0],
        user_type : e.args[1],
        end_code : e.args[2],
    };
    ipcRenderer.send("user_insert", send_param);
}