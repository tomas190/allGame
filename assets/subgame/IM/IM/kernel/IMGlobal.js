/**
 *  274 appStart 启动脚本
 *  相对于自身的上下级客服type
 *  自身上级 type4
 *  自身客服 type3
 *  新消息   type2
 *  自身下级 type1
 * 
 * dev WS   http://im.80rxjhsf.com/upload  ws://im.80rxjhsf.com  pre  im.sempxw.com
 * test         
 */
cc.Class({
    extends: cc.Component,
    ctor: function () {
        this.initData()
    },
    initData: function () {
        this.imageFile = null; //发送图片文件
        this.isH5 = false; //原生app false  网页 webview true
        this.chatObj = null;
        this.url = null;
        this.os = null;
        this.socket = null;
        if (this.isH5) {
            var urlData = cc.gg.utils.urlParse(window.location.href);
            if (urlData.host) {
                this.url = urlData.host
            }
            if (urlData.os) {
                this.os = urlData.os
            }
            if (this.url) {
                var socket = this.url.split("://")[1];
                var header = this.url.split("://")[0];
                cc.gg.utils.ccLog(socket, header, "aaaaa")
                var socketHeader = null;
                if (header == "http") {
                    socketHeader = "ws://"
                } else if (header == "https") {
                    socketHeader = "wss://"
                }
                cc.gg.utils.ccLog(socket);
                this.socket = socketHeader + socket;
                this.file = this.url + "/upload";
            } else {
                this.socket = 'ws://swoole.0717996.com/';
                this.file = "http://im.80rxjhsf.com/upload";
            }
        }

        this.chatObjID = null;
        this.chatType = null;
        this.isLog = !1;
        this.version = "1.1.2";
        this.historySum = "30"; //保存的历史记录条数
        this.userInfo = null;
        this.accountID = null;
        this.isOfficial = true;
        this.deleAccountID = null //要删除的会话ID
        this.agentServerUserData = []; // 代理和客服的人员数组
        this.isGoDirectlyMsg = false; // 是否直接进入聊天室
        this.isMoreMsg = false;
        this.isMoreCenter = false; // 是否加载更多联系
        this.uploadMsgCount = 0; //加载的联系人次数
        this.instructions = {
            "Login": 101,
            "Pong": 102,
            "PushHistorySession": 103,
            "ChatRespBody": 104,
            "PushHistoryMsg": 105,
            "ReadMsg": 106,
            "PullSubList": 107,
            "GetSub": 108,
            "GetUser": 109,
            "DelConversion": 110,
            "isGoDirectlyMsg": 111,
            "file": 200, //自定义派发指令   选取图片指令  web
            "FileUI": 201, // 自定义指令   读取图片详情指令 web
            "CreateImg": 202, //自定义指令  创建cocos图片精灵指令
            "XhrProgress": 203, //自定义指令  上传进度指令 web
            "UpLoad": 204, //自定义指令 上传完成指令
            "XhrError": 205, //上传失败
            "Keydown": 210, //自定义指令  回车键
            "101": "Login",
            "102": "Pong",
            "103": "PushHistorySession",
            "104": "ChatRespBody",
            "105": "PushHistoryMsg",
            "106": "ReadMsg",
            "107": "PullSubList",
            "108": "GetSub",
            "109": "GetUser",
            "110": "DelConversion",
            "111": "isGoDirectlyMsg",
            "500": "da",
            "1": "Pong",
            '2': "ChatReqBody",
            "3": "ChatRespBody",
            "4": "LoginRsp",
            "500": "ofical",
            "5": "PullServiceList",
            "6": "PullSupList",
            "7": "PullSubList",
            "8": "IsSub",
            "9": "IsSubData",
            "10": "UserData",
            "11": "MoreUserData",
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
        this.orderData = {};
        this.alertType = null;
        this.orderType = null; //订单类型
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
        this.sortList = function (arr) {
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
            this.MsgList = function (arr) {

            }
    },

    /**
     * android 原生上传图片回调
     * @param {*} code 1上传图片成功，2上传图片失败，3上传图片中
     * @param {*} imageStr 上传图片成功返回的图片链接，其他情况为提示信息
     */
    onUploadImageCallback(code,imageStr) {
        if(code == 1) {
            cc.gg.protoBuf.onmessage("FileUI", {
                type: 'img',
                datas: imageStr,
            }, true);
        }
    },

    onUploadImageCallbackIOS(imgStr) {
        if(imgStr) {
            let imgData = JSON.parse(imgStr);
            if(imgData.code == 200) {
                let imageStr = imgData.data.url;
                cc.gg.protoBuf.onmessage("FileUI", {
                    type: 'img',
                    datas: imageStr,
                }, true);
            }  
        }    
    }


});