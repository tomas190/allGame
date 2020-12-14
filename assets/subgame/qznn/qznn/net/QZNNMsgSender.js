var CMD = require("QZNNCMD");
var MsgSender = {
    //发送登陆
    sendLogin(id, pass, token) {
        if (token && token != "") pass = null;
        var data = {
            uid: id,
            pwd: pass,
            token: token,
            gameId: hqq.subGameList.qznn.game_id,
        }
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_LOGIN, data);
    },

    //登出 
    sendLoginOut() {
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_LOGOUT, {})
    },

    //心跳
    tickBreath() {
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_BREATH, {})
    },

    //退出房间请求
    sendLeaveRoom() {
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_LEAVE, {});
    },

    //发送用户进入房间
    JoinRoom(area_number) {
        cc.gg.global.area_number = area_number;
        var data = {
            level: area_number
        }
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_MATCH, data);
    },

    //发送回复场景 主要是用来重连
    sendRecover: function () {
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_RECOVER, {})
    },

    //抢庄请求
    sendGrabBanker: function (grab_multiple) {
        var data = {
            multiple: grab_multiple
        }
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_COMPETE, data)
    },

    //下注请求
    sendPlayerMultiples(multiples) {
        var data = {
            multiple: multiples
        }
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_SELECT, data)
    },

    //下注请求
    sendConfigCard(list) {
        var data = {
            cards: list,
            uid: hqq.gameGlobal.player.account_name,
        }
        cc.gg.protoBuf.send(CMD.REQUESTCODE.REQ_TEST, data)
    },
};

module.exports = MsgSender;