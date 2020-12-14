/*
 * @Author: burt
 * @Date: 2019-08-13 13:18:16
 * @LastEditors: burt
 * @LastEditTime: 2019-08-14 10:52:36
 * @Description: 
 */
/**
 *  274 appStart
 * 
 * dev WS   http://im.80rxjhsf.com/upload  ws://im.80rxjhsf.com  pre  im.sempxw.com
 * test     qznn.0351sxzc.com  10.63.90.40:7778
 */
cc.Class({
    extends: cc.Component,
    ctor: function() {
        this.initData()
    },
    initData: function() {
        this.chatObj = null;
        this.url = null;
        this.os = null;
        this.GameID = null;
        this.gameRoomData = null; //房间游戏数据
        var urlData = cc.gg.utils.urlParse(window.location.href);
        if (urlData.host) {
            this.url = urlData.host
        }
        if (urlData.os) {
            this.os = urlData.os
        }
        // if (this.url) {
        //     var socket = this.url.split("://")[1];
        //     var header = this.url.split("://")[0];
        //     cc.gg.utils.ccLog(socket, header, "aaaaa")
        //     var socketHeader = null;
        //     if (header == "http") {
        //         socketHeader = "ws://"
        //     } else if (header == "https") {
        //         socketHeader = "wss://"
        //     }
        //     cc.gg.utils.ccLog(socket);
        //     this.socket = socketHeader + socket;
        //     this.file = this.url + "/upload";
        // } else {
        //     this.socket = 'ws://game.539316.com/qznn';
        //     this.file = "http://im.80rxjhsf.com/upload";
        // }
        this.socket = '';//"ws://qznn.0351sxzc.com"
        this.chatObjID = null;
        this.chatType = null;
        this.isLog = !1;
        this.version = "1.1.1";
        this.historySum = "30"; //保存的历史记录条数
        this.userInfo = null;
        this.accountID = null;
        this.isOfficial = true;
        this.deleAccountID = null //要删除的会话ID
        this.agentServerUserData = []; // 代理和客服的人员数组
        this.isGoDirectlyMsg = false; // 是否直接进入聊天室
        this.isMoreMsg = false;
        this.MsgId = {
            
        }
        this.instructions = {
            "Login": 111,
            // "Pong": 102,
            "EnterGame": 130,
            "JoinRoom": 104,
            "GameStart": 132,
            "GrabBanker": 106,
            "PlayerMultiples": 107,
            "ShowCard": 108,
            "Win": 109,
            "OnOpen": 510,
            "OnIsContent": 511,
            "LeaveRoom": 101,
            "StarBet": 111,
            "StartLimitTime": 112,
            "UserJoin": 103,
            "LoginOut": 114,
            "111": "LoginRsp",
            "102": "Pong",
            "130": "EnterGame",
            "104": "JoinRoom",
            "132": "GameStart",
            "106": "GrabBanker",
            "107": "PlayerMultiples",
            "108": "ShowCard",
            "109": "Win",
            "101": "LeaveRoom",
            // "111": "StarBet",
            "112": "StartLimitTime",
            "103": "UserJoin",
            "114": "LoginOut",
            "510": "OnOpen",
            "511": "OnIsContent",
            "file": 200, //自定义派发指令   选取图片指令  web
            "FileUI": 201, // 自定义指令   读取图片详情指令 web
            "CreateImg": 202, //自定义指令  创建cocos图片精灵指令
            "XhrProgress": 203, //自定义指令  上传进度指令 web
            "UpLoad": 204, //自定义指令 上传完成指令
            "XhrError": 205, //上传失败

            "13": "MoreHistorySession",
            "14": "PushHistoryMsg",
            "15": "MoreHistoryMsg",
            "16": "TransactionResp",
            "17": "OrderConfirm",
            "18": "ApplyWays",
            "19": "SelectApplyWay",
            "20": "ApplyData",
            "21": "GetBuyerApplyWay",
            "22": "BuyerApplyWay",
            "23": "BuyerApplyConfirm",
            "24": "ConfirmApplyResp",
            "25": "SellerReceiveConfirm",
            "26": "ConfirmReceiveResp",
            "27": "TransaMsg",
            "28": "BuyerCancelOrder",
            "29": "BuyerCancelOrderResp",
            "30": "ErrorResp",
            "31": "SellerDunning",
            "32": "SellerDunningResp",
            "33": "BuyerApplyConfirmAgain",
            "34": "BuyerApplyConfirmAgainResp",
            "35": "DelHistoryMsg",
            "36": "OperateResp",
            "37": "ChangeMsgType",
            "38": "ChangeMsgTypeResp",
            "39": "UserChildrenList",
            "40": "UserChildrenListResp",
            "41": "DelConversion",
            "42": "DelConversionResp",
            "43": "CancelTransaction",
            "44": "CancelTransactionResp",
            "45": "ReadMeg",
            "46": "CompleteOrderResp",
            "200": "file", //自定义派发指令   选取图片指令  web
            "201": "FileUI", // 自定义指令   读取图片详情指令 web
            "202": "CreateImg", //自定义指令  创建cocos图片精灵指令
            "203": "XhrProgress", //自定义指令  上传进度指令 web
            "204": "UpLoad", //自定义指令 上传完成指令
            "205": "XhrError", //上传失败
            "210": "Keydown",
            "300": "InputFocus",
            "301": "InputChange",
            "302": "InputBlur",
        };
        this.PaymentWayData = null;
        //聊天type
        this.msgType = {

        }
        this.updateFile = null;
        //订单信息
        this.orderData = null;
        this.alertType = null;
        //支付type
        this.payType = {
                weChat: 1,
                aliPay: 2,
                bank: 3,
                huabei: 4,
                creditCard: 5
            }
            //人物列表
        this.userData = [];
        //会话列表
        this.sessionData = [];
        this.sortList = function(arr) {
            if (parseInt(arr.userID) <= 0) {
                return
            }
            if (!cc.gg.global.userData[0]) {
                cc.gg.global.userData.push(arr);
                return
            }
            cc.gg.utils.ccLog(arr, "arr")
            for (var i = 0; i < cc.gg.global.userData.length; i++) {
                if (cc.gg.global.userData[i].userID == arr.userID) {
                    cc.gg.utils.ccLog("已经存在这个人");
                    return
                }
            }
            for (var k = 0; k < cc.gg.global.userData.length; k++) {
                if (cc.gg.global.userData[k].type == arr.type) {
                    cc.gg.global.userData.splice(k, 0, arr)
                    return;
                }
                if (k == (cc.gg.global.userData.length - 1)) {
                    cc.gg.global.userData.push(arr);
                    return
                }
            }
        },
        //人物会话历史记录
        this.MsgList = function(arr) {

        },

        this.GameStage = {
            WAITTING:1,
            GAMEING:2,
        }
        this.currentStage = this.GameStage.WAITTING;

    },
});