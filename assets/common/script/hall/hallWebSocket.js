/*
 * @Author: burt
 * @Date: 2019-07-29 15:11:55
 * @LastEditors: burt
 * @LastEditTime: 2019-10-23 11:45:11
 * @Description: 长连接与心跳包
 */
let gHandler = require("gHandler");

let hqqWebSocket = function () { }
hqqWebSocket.prototype = {
    ip: "",
    ws: null,
    pingTime: 0,
    pongTime: 0,
    reConnectTime: 0,
    reConnectDelayTime: 5, // 多久重连一次（秒）
    heartbeatTime: 3, // 心跳间隔（秒）
    closeTime: 9, // 断线判断时间
    events: {},
    handlers: {},
    needRecon: true,
    isConected: false,
    sgjmsg: null,

    init(param) {
        this.isConected = false;
        this.needRecon = true;
        this.ip = param && param.ip || this.ip;
        this.reConnectTime = param && param.reConnectTime || this.reConnectTime;
        this.reConnectDelayTime = param && param.reConnectDelayTime || this.reConnectDelayTime;
        this.heartbeatTime = param && param.heartbeatTime || this.heartbeatTime;
        this.closeTime = 3 * this.heartbeatTime;
        this.removeAllHandler();
        this.removeAllEvent();
    },
    getIsConnected() {
        return this.isConected
    },
    startPingPong() {
        let self = this
        this.heartbeat = setInterval(() => {
            self.m_checkPingPong();
        }, 1000)
    },
    sendPing() {
        // console.log("发送心跳")
        this.pingTime = 0;
        this.ws && this.ws.send('');
    },
    connect(param) {
        this.registerAll()

        this.ip = param || this.ip
        this.ws = new WebSocket(this.ip)
        this.ws.onopen = this.m_onopen.bind(this)
        this.ws.onmessage = this.m_onmessage.bind(this)
        this.ws.onerror = this.m_onerror.bind(this)
        this.ws.onclose = this.m_onclose.bind(this)
    },
    sendMessage(name, msg) {
        let data = this.protoDeal.createMsgByName(name, msg);
        (this.ws || console.log("websocket未初始化")) && this.ws.send(data);
    },
    close() {
        console.log("大厅websocket主动断开")
        this.ws && this.ws.close();
        this.needRecon = false;
    },
    register(event, className, callback) {
        if (this.handlers[event] && this.handlers[event][className]) {
            console.log("大厅该事件已经监听", event, className)
        } else {
            if (this.handlers[event]) {
                this.handlers[event][className] = callback;
            } else {
                this.handlers[event] = {};
                this.handlers[event][className] = callback;
            }
        }
    },
    unregister(event, className) {
        this.handlers[event] && this.handlers[event][className] && (delete this.handlers[event][className]);
    },
    removeAllHandler() {
        this.handlers = {}
    },
    addEvent(event, callback) {
        this.events[event] || (this.events[event] = []);
        this.events[event].push(callback);
    },
    removeEvent(event) {
        this.events[event] && (this.events[this.events] = null);
    },
    removeAllEvent() {
        this.events = {};
    },
    registerAll() {
        this.register("nologin", "hallWebSocket", this.onReceiveNologin.bind(this)) // 玩家登陆
        this.register("Broadcast", "hallWebSocket", this.onReceiveBroadcast.bind(this)) // 广播
        this.register("/Game/login/login", "hallWebSocket", this.onReceiveLogin.bind(this)) // 登陆回调
        // this.register("/GameServer/Notice/notice", "hallWebSocket", this.onReceiveNotice.bind(this)) // 公告  已废弃
        this.register("/Proxy/User/moveBalanceToGame", "hallWebSocket", this.moveBalanceToGame.bind(this)) // 代理押金转移
        this.register("/GameServer/GameUser/loginout", "hallWebSocket", this.onReceiveLoginout.bind(this)) // 玩家离开子游戏
        this.register("/GameServer/GameUser/login", "hallWebSocket", this.onReceiveLoginSubGame.bind(this)) // 玩家加入子游戏
        this.register("/GameServer/GameUser/changeGameUserBalance", "hallWebSocket", this.onReceiveChangeBanlance.bind(this)) // 
    },
    onReceiveNologin(data) {
        // console.log(" onReceiveNologin", data)
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.onReceiveNologin,data )
    },
    onReceiveBroadcast(data) {
        console.log(" onReceiveBroadcast", data)
        let message = data.message;
        let title = data.send_user.game_nick;
        let mtype = data.type;
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "onReceiveBroadcast " + data.type)
        if (mtype == 1) { // im 消息
            gHandler.gameGlobal.imReceive = 1
            gHandler.eventMgr.dispatch(gHandler.eventMgr.onReceiveBroadcast, mtype)
        }

        // gHandler.eventMgr.dispatch(gHandler.eventMgr.onReceiveBroadcast, data)
    },
    /** 登陆成功回调 */
    onReceiveLogin(data) {
        // console.log(" onReceiveLogin", data)
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.onReceiveLogin, data)
    },
    // onReceiveNotice(data) {
    //     console.log(" onReceiveNotice", data, data.msg)
    //     gHandler.eventMgr.dispatch(gHandler.eventMgr.addSliderNotice, [{
    //         time: 1,
    //         rollforver: false,
    //         notice: data.msg.notice.replace(/\s+/g, "")
    //     }])
    // },
    moveBalanceToGame(data) {
        console.log(" moveBalanceToGame", data)
        // balance game_gold 
        if (!data.balance || !data.game_gold) return;
        gHandler.setPlayerinfo({
            game_gold: data.game_gold,
            balance: data.balance,
        })
    },
    onReceiveLoginout(data) {
        // console.log(" onReceiveLoginout", data)
        gHandler.setGameInfo(data.game_user)
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.onReceiveLoginout, data)
    },
    onReceiveLoginSubGame(data) {
        // console.log(" onReceiveLoginSubGame", data)
    },
    onReceiveChangeBanlance(data) {
        console.log(" onReceiveChangeBanlance", data)
        if (!data.game_user) return;
        let changegold = data.game_user.game_gold - gHandler.gameGlobal.player.gold
        gHandler.setGameInfo(data.game_user)
        if (changegold > 0) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showCongratulation, changegold)
        }
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.onReceiveChangeBanlance, data)
    },

    m_onopen() {
        // console.log("大厅socket连接成功，并开始登陆")
        this.isConected = true;
        this.reConnectTime = 0;
        this.startPingPong();
        if (!gHandler.gameGlobal.isdev) {
            let msg = {
                "event": "/Game/login/login",
                "data": {
                    id: gHandler.gameGlobal.player.account_name,
                    token: gHandler.gameGlobal.token
                }
            }
            // console.log("发送登陆", msg)
            this.ws.send(JSON.stringify(msg))
        }
    },
    m_onmessage(msg) {
        let data = JSON.parse(msg.data)
        // console.log("data --- ", data)
        this.m_EmitMsg(data.event, data.data.msg, data)
    },
    m_EmitMsg(event, data, msg) {
        console.log("------大厅收到消息--------", event)
        if (this.handlers[event]) {
            for (let className in this.handlers[event]) {
                this.handlers[event][className] && this.handlers[event][className](data);
            }
        } else {
            // console.log("没有注册回调函数", msg)
        }
    },
    m_onerror(e) {
        this.isConected = false;
        gHandler.logMgr.logerror(e);
        this.m_stopPingPong();
    },
    m_onclose() {
        this.isConected = false;
        this.m_stopPingPong();
        if (this.needRecon) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络断开，正在努力连接中")
            setTimeout(() => {
                this.reConnectTime++;
                if (this.reConnectTime > 5) {
                    this.reConnectTime = 0;
                    return;
                }
                this.connect();
            }, 3000)
        } else {
            // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络断开")
        }
    },
    m_stopPingPong() {
        clearInterval(this.heartbeat);
    },
    /** 心跳逻辑 */
    m_checkPingPong() {
        if (this.pingTime >= this.heartbeatTime) {
            this.sendPing();
        } else {
            this.pingTime++;
        }
    },
    // ------------------------------------------------------------------------------------------
    connectSGJ(ip) {
        !this.sgjmsg && (this.sgjmsg = require("sgj_proto_msg").msg)
        ip = "ws://game.539316.com/shuigj"
        this.pingTimer = 0;
        this.waitTimer = 0;
        this.io = undefined;
        this.mapHandler = {}

        this.sgjip = ip || this.sgjip
        this.io = new WebSocket(ip)
        this.io.binaryType = "arraybuffer";
        this.io.onopen = this.m_sgjonopen.bind(this)
        this.io.onmessage = this.m_sgjonmessage.bind(this)
        this.io.onerror = this.m_sgjonerror.bind(this)
        this.io.onclose = this.m_sgjonclose.bind(this)
    },
    m_sgjonopen(receivemsg) {
        this.startsgjPing();
        const data = {
            userID: gHandler.gameGlobal.player.id,
            gameID: gHandler.gameConfig.gamelist['sgj'].game_id,
            password: "123456",
        }
        this.sendsgjMessage(this.sgjmsg.MessageKind.Login, data);
    },
    m_sgjonmessage(evt) {
        const retData = this.sgjparseProtoBufId(evt.data);
        let bodyClass;
        switch (retData.id) {
            case this.sgjmsg.MessageKind.Pong:
                bodyClass = this.sgjmsg.HeartBeatResponse;
                break;
            case this.sgjmsg.MessageKind.LoginR:
                bodyClass = this.sgjmsg.LoginResponse;
                break;
            case this.sgjmsg.MessageKind.LogoutR:
                bodyClass = this.sgjmsg.LogoutResponse;
                break;
            case this.sgjmsg.MessageKind.BetR:
                bodyClass = this.sgjmsg.BetResponse;
                break;
            case this.sgjmsg.MessageKind.OpenLuckyBoxR:
                bodyClass = this.sgjmsg.OpenLuckyBoxResponse;
                break;
            case this.sgjmsg.MessageKind.WinningP:
                bodyClass = this.sgjmsg.WinningPush;
                break;
            case this.sgjmsg.MessageKind.LotteryP:
                bodyClass = this.sgjmsg.OpenLottery;
                break;
            case this.sgjmsg.MessageKind.BonusPoolP:
                bodyClass = this.sgjmsg.BonusPoolPush;
                break;
            case this.sgjmsg.MessageKind.NoticeMessageP:
                bodyClass = this.sgjmsg.NoticeMessagePush;
                break;
            case this.sgjmsg.MessageKind.ErrorP:
                bodyClass = this.sgjmsg.ErrorPush;
                break;
            default:
                break;
        }
        const gameMsg = bodyClass.decode(retData.data);
        // if (retData.id > 1) {
        //     console.log("接收到的数据:", gameMsg);
        // }
        const func = this.mapHandler[retData.id];
        if (func) {
            func(gameMsg);
        }
    },
    m_sgjonerror(receivemsg) {
        this.stopsgjPing();
    },
    m_sgjonclose(receivemsg) {
        this.stopsgjPing(false);
    },
    startsgjPing() {
        this.pingTimer = setInterval(() => {
            this.sendsgjMessage(this.sgjmsg.MessageKind.Ping, {});
        }, 5000)
    },
    stopsgjPing(reconnect = true) {
        if (this.pingTimer) {
            clearInterval(this.pingTimer);
            this.pingTimer = 0;
        }
        if (reconnect) {
            setTimeout(() => {
                this.connectSGJ();
            }, 1000)
        }
    },
    registerCallBack(kind, func) {
        if (kind == "login") {
            kind = this.sgjmsg.MessageKind.LoginR
        } else {
            kind = this.sgjmsg.MessageKind.BonusPoolP
        }
        this.mapHandler[kind] = func
    },
    closeSGJ() {
        if (!this.io) {
            return
        }
        this.stopsgjPing(false);
        if (this.io) {
            this.io.close();
            this.io = undefined;
        }
        this.mapHandler = {};
    },
    sgjUint8ArrayToInt(uint8Ary) {
        let retInt = 0;
        for (let i = 0; i < uint8Ary.length; i++) {
            retInt |= (uint8Ary[i] << (8 * (uint8Ary.length - i - 1)));
        }
        return retInt;
    },
    sgjIntToUint8Array(num, bits) {
        const resArry = [];
        const xresArry = [];
        const binaryStr = num.toString(2);
        for (const chr of binaryStr) {
            resArry.push(parseInt(chr, 10));
        }

        if (bits) {
            for (let r = resArry.length; r < bits; r++) {
                resArry.unshift(0);
            }
        }

        const resArryStr = resArry.join("");
        for (let j = 0; j < bits; j += 8) {
            xresArry.push(parseInt(resArryStr.slice(j, j + 8), 2));
        }

        return xresArry;
    },
    sgjparseProtoBufId(buffer) {
        const arrayBuffer = buffer;
        let dataUnit8Array = new Uint8Array(arrayBuffer);
        const id = this.sgjUint8ArrayToInt(dataUnit8Array.slice(0, 2));
        dataUnit8Array = dataUnit8Array.slice(2);

        return { id, data: dataUnit8Array };
    },
    sgjprotoBufAddTag(tag, buffer) {
        const bufferAddTag = new Uint8Array(buffer.length + 2);
        const tagBinary = this.sgjIntToUint8Array(tag, 16);
        const tagUnit8 = new Uint8Array(tagBinary);

        bufferAddTag.set(tagUnit8, 0);
        bufferAddTag.set(buffer.subarray(0, buffer.length), 2);

        return bufferAddTag;
    },
    sendsgjMessage(kind, data) {
        if (this.io.readyState !== WebSocket.OPEN) {
            return;
        }
        // if (kind !== this.sgjmsg.MessageKind.Ping) {
        //     console.log("发送协议编号:", kind, "数据:", data);
        // }
        let bodyClass;
        switch (kind) {
            case this.sgjmsg.MessageKind.Ping:
                bodyClass = this.sgjmsg.HeartBeatRequest;
                break;
            case this.sgjmsg.MessageKind.Login:
                bodyClass = this.sgjmsg.LoginRequest;
                break;
            case this.sgjmsg.MessageKind.Logout:
                bodyClass = this.sgjmsg.LogoutRequest;
                break;
            case this.sgjmsg.MessageKind.Bet:
                bodyClass = this.sgjmsg.BetRequest;
                break;
            case this.sgjmsg.MessageKind.OpenLuckyBox:
                bodyClass = this.sgjmsg.OpenLuckyBoxRequest;
                break;
            default:
                break;
        }
        const message = bodyClass.create(data);
        const buffer = bodyClass.encode(message).finish();
        // leaf 前两位为协议序号，故需包装一下
        const addTagBuffer = this.sgjprotoBufAddTag(kind, buffer);
        this.io.send(addTagBuffer.buffer);
    }

}
module.exports = hqqWebSocket
