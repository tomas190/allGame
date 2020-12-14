
var proto = require("QZNNprotores");
var msgSender = require("QZNNMsgSender");
var CMD = require("QZNNCMD");
var qznnPb = cc.Class({
    // extends: cc.Component,

    ctor: function () {
        this.initData()
    },

    initData: function () {
        this.ip = 0;
        this.handlers = {};
        this.socket = null;
        this.events = {};
        this.tickGame = null;
        this.tickHall = null;
        this.connect_time = 0;
        this.isAutoConnect = true;
    },

    init(ip) {
        this.connect_time = 0;
        this.isAutoConnect = true;
        this.connect(ip)
    },

    removeAllEvent: function () {
        this.events = {};
    },

    removeAllHandler: function (e) {
        this.handlers = {}
    },

    addEvent: function (e, t) {
        this.events[e] || (this.events[e] = []), this.events[e].push(t)
    },

    addHandler: function (obj, e, callBack) {
        let className = obj.getClassName();
        if (!this.handlers[className]) this.handlers[className] = {};
        this.handlers[className][e] = callBack
        // this.handlers[e] ? cc.gg.utils.ccLog("该事件已经监听" + e) : this.handlers[e] = t;
    },

    //注销某个对象的消息
    UnReg(className, id) {
        if (this.handlers[className] && this.handlers[className][id]) {
            delete this.handlers[className][id];
        }
    },

    //注销某个对象的所有消息
    UnRegAll(className) {
        if (this.handlers[className]) delete this.handlers[className]
    },


    onmessage: function (id, data) {
        let Mydata = null;
        switch (id) {
            case CMD.RESPONCECODE.RSP_USER_LEAVE: //玩家离开
                Mydata = proto.msg.LeaveRoomResp.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_JOIN: //其他玩家加入
                Mydata = proto.msg.DeskPlayer.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_LOGIN: //登陆响应
                Mydata = proto.msg.PlayerLoginResp.decode(data);
                break;
            // case CMD.RESPONCECODE.112: //用户登出
            //     // Mydata = proto.msg.PlayerLoginResp.decode(data);
            //     break;
            case CMD.RESPONCECODE.RSP_USER_KICKED: //其他地点登陆
                Mydata = proto.msg.KickedPlayer.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_MATCH://匹配房间响应
                Mydata = proto.msg.RandomMatchResp.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_RECOVER://恢复游戏场景
                Mydata = proto.msg.GameScene4Gaming.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_STARTCOUNT://开局倒计时
                Mydata = proto.msg.NotifyCountDown.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_DEALCARD://通知发牌
                Mydata = proto.msg.SendCardsInfo.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_COMPETE://通知抢庄
                Mydata = proto.msg.NotifyCountDown.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_GRAB_TIMEOUT://抢庄超时
                Mydata = proto.msg.OperationOutTimeNotify.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_GRAB_RETURN://抢庄返回
                Mydata = proto.msg.CompeteBankerResp.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_GRAB_RESULT://抢庄结果
                Mydata = proto.msg.CompeteResult.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_STARTBETING://通知开始下注
                Mydata = proto.msg.NotifyCountDown.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_NOTIFYTIMES://通知选择的倍数
                Mydata = proto.msg.CompeteBankerResp.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_BET_TIMEOUT://下注超时
                Mydata = proto.msg.OperationOutTimeNotify.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_SETTLE://结算
                Mydata = proto.msg.AllPlayersResults.decode(data);
                break;
            case CMD.RESPONCECODE.RSP_USER_ERROR://错误提示
                Mydata = { text: this.byteToString(data) };
                break;
            case 510:
                Mydata = {};
                break
        }
        cc.log("##############====onmessage>", id, Mydata)
        for (var key in this.handlers) {
            let func = this.handlers[key][id];
            func && func(id, Mydata)
        }
    },

    byteToString(arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var str = '',
            _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    },

    connect: function (ip) {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID) { //在浏览器调试中，cc.sys.os === cc.sys.OS_ANDROID 是true
                if (ip.indexOf('wss') == -1) {
                    this.socket = new WebSocket(ip);
                } else {
                    this.socket = new WebSocket(ip, {}, cc.url.raw('resources/hall/cacert.pem'));
                }
            } else {
                this.socket = new WebSocket(ip);
            }
            this.socket.onopen = this._OnOpen.bind(this);
            this.socket.onmessage = this._OnMessage.bind(this);
            this.socket.onclose = this._OnClose.bind(this);
            this.socket.onerror = this._OnError.bind(this);
        }
    },

    _OnError(err) {
        console.log("Error:Network unavailable")
        // this.reconnect();
    },

    dispatchEvent(className, id, data) {
        if (this.handlers[className] && this.handlers[className][id]) {
            this.handlers[className][id](id, data);
        }
    },

    _OnClose(err) {
        this.stopTick();//先停止心跳
        this.reconnect();
    },

    reconnect() {
        if (this.isAutoConnect) {
            setTimeout(() => {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "网络断开,正在努力连接中")
                this.connect_time++;
                if (this.connect_time >= 30) {
                    this.connect_time = 0;
                    this.isAutoConnect = false;
                    let func2 = () => {
                        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "NNGame")
                        hqq.eventMgr.unregister(hqq.eventMgr.refreshBgState, "NNGame")
                        cc.director.loadScene("hall");
                        this.close();
                    }
                    this.dispatchEvent("TipMgr", 1001, { str: "连接超时,请您返回游戏大厅后重新进入", callfunc: func2, eObj: this, close: false });
                } else {
                    this.connect(hqq.subGameList.qznn.serverUrl);
                }
            }, 1000);
        }
    },

    _OnMessage(data) {
        this.parseProtoBufId(data);
    },

    _OnOpen() {
        cc.log("###############Connect successful#######")
        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "连接成功")
        this.isAutoConnect = true;
        // msgSender.sendLogin(Number(hqq.gameGlobal.player.account_name), hqq.gameGlobal.player.account_pass, hqq.gameGlobal.token);
        msgSender.sendLogin(Number("550776064"), "123456", null);
    },

    tickInGame() {
        this.stopTick();
        this.tickGame = setInterval(function () {
            cc.log("##########Tick############")
            msgSender.tickBreath();
        }, 1000);
    },

    tickInHall() {
        this.stopTick();
        this.tickHall = setInterval(function () {
            msgSender.tickBreath();
        }, 4500);
    },

    stopTick() {
        if (this.tickGame) {
            clearInterval(this.tickGame);
            this.tickGame = null;
        }
        if (this.tickHall) {
            clearInterval(this.tickHall);
            this.tickHall = null;
        }
    },

    send: function (sendId, data) {
        sendId == 2 || cc.log("##########@@@=====send>", sendId, data)
        if (this.socket && this.socket.readyState == 1) {
            //0 代表发送  1 代表接收
            let body = null;
            switch (sendId) {
                case CMD.REQUESTCODE.REQ_LOGIN:
                    body = proto.msg.UserLogin
                    break;
                case CMD.REQUESTCODE.REQ_LOGOUT:
                    body = proto.msg.UserLogout
                    break;
                case CMD.REQUESTCODE.REQ_BREATH:
                    body = proto.msg.ClientBreath
                    break;
                case CMD.REQUESTCODE.REQ_LEAVE:
                    body = proto.msg.LeaveRoomReq
                    break;
                case CMD.REQUESTCODE.REQ_MATCH:
                    body = proto.msg.RandomMatchReq
                    break;
                case CMD.REQUESTCODE.REQ_RECOVER:
                    body = proto.msg.RecoverGameScene
                    break;
                case CMD.REQUESTCODE.REQ_COMPETE:
                    body = proto.msg.CompeteBanker
                    break;
                case CMD.REQUESTCODE.REQ_SELECT:
                    body = proto.msg.PlayerSelectBet
                    break;
                case CMD.REQUESTCODE.REQ_TEST:
                    body = proto.msg.TestCardsType
                    break;
            }
            const message = body.create(data);
            const buffer = body.encode(message).finish();
            // leaf 前两位为协议序号，故需包装一下
            const addTagBuffer = this.protoBufAddTag(sendId, buffer);
            this.socket.send(addTagBuffer);
        } else {
            console.log("网络异常不支持通信")
        }
    },

    close: function () {
        cc.log("###########主动关闭链接#############close");
        this.isAutoConnect = false;
        this.stopTick();
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.close();
            this.socket = null;
        }
    },

    //把数据解析成ID 和 data
    parseProtoBufId: function (obj) {
        if (cc.sys.isBrowser) {
            var arrayBuffer = obj.data;
            var reader = new FileReader();
            reader.readAsArrayBuffer(arrayBuffer);
            reader.onload = function (e) {
                var dataUnit8Array = new Uint8Array(e.target.result);
                let data1 = proto.msg.S2C.decode(dataUnit8Array);
                this.onmessage(data1.code, data1.data)
            }.bind(this);
        } else if (cc.sys.isNative) {
            var uint8buf = new Uint8Array(obj.data)
            let data1 = proto.msg.S2C.decode(uint8buf);
            this.onmessage(data1.code, data1.data)
        }
    },

    //把ID 和数据解析成二进制
    protoBufAddTag: function (tag, buffer) {
        var addtag_buffer = new Uint8Array(buffer.length + 2);
        var tagBinary = this.IntToUint8Array(tag, 16);
        var tagUnit8 = new Uint8Array(tagBinary);
        addtag_buffer.set(tagUnit8, 0);
        addtag_buffer.set(buffer.subarray(0, buffer.length), 2)
        return addtag_buffer;
    },

    //Uint8转 int
    Uint8ArrayToInt: function (uint8Ary) {
        var retInt = 0;
        for (var i = 0; i < uint8Ary.length; i++) {
            retInt |= (uint8Ary[i] << (8 * (uint8Ary.length - i - 1)));
        }
        return retInt
    },

    //Uint8转 int包含ID和内容
    IntToUint8Array: function (num, Bits) {
        var resArry = [];
        var xresArry = [];
        var binaryStr = num.toString(2);
        for (var i = 0; i < binaryStr.length; i++)
            resArry.push(parseInt(binaryStr[i]));

        if (Bits) {
            for (var r = resArry.length; r < Bits; r++) {
                resArry.unshift(0);
            }
        }

        var resArryStr = resArry.join("");
        for (var j = 0; j < Bits; j += 8)
            xresArry.push(parseInt(resArryStr.slice(j, j + 8), 2));

        return xresArry;
    },
});

module.exports = qznnPb;