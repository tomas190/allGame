/*
 * @Author: burt
 * @Date: 2019-07-29 15:11:55
 * @LastEditors: burt
 * @LastEditTime: 2019-10-04 17:29:55
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
            console.log("该事件已经监听")
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
    // onReceiveNotice(msg) {
    //     // data.msg.sort((a, b) => a.sort - b.sort).forEach((e, i) => {
    //     //     let notice = {
    //     //         key: i,
    //     //         isShow: 0,
    //     //         type: e.type,
    //     //         title: e.title,
    //     //         words: e.words,
    //     //         create_time: e.create_time,
    //     //         end_time: e.end_time,
    //     //     };
    //     //     gHandler.gameGlobal.noticeList.push(notice)
    //     //     if (e.is_slider === 1) {
    //     //         gHandler.gameGlobal.slideNoticeList.push({
    //     //             type: 1,
    //     //             notice: e.words.replace(/\s+/g, "")
    //     //         })
    //     //     }
    //     // })
    // },
    onReceiveLoginout(msg) {
        console.log("hallWebSocket onReceiveLoginout", msg)
        gHandler.setGameUserInfo(msg.game_user)
    },
    m_onopen() {
        console.log("大厅socket连接成功，并开始登陆")
        this.isConected = true;
        this.reConnectTime = 0;
        this.startPingPong();
        if (!gHandler.gameGlobal.isdev) {
            // this.register("/GameServer/Notice/notice", "hallWebSocket", this.onReceiveNotice.bind(this)) // 公告
            this.register("/GameServer/GameUser/loginout", "hallWebSocket", this.onReceiveLoginout.bind(this)) // 玩家离开子游戏
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
            console.log("没有注册回调函数", msg)
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
            setTimeout(() => {
                this.reConnectTime++;
                if (this.reConnectTime > 5) {
                    this.reConnectTime = 0;
                    return;
                }
                this.connect();
            }, 3000)
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

}
module.exports = hqqWebSocket
