/*
 * @Author: burt
 * @Date: 2019-07-29 15:11:55
 * @LastEditors: burt
 * @LastEditTime: 2019-09-18 14:02:30
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

    init(param) {
        this.needRecon = true;
        this.ip = param && param.ip || this.ip;
        this.reConnectTime = param && param.reConnectTime || this.reConnectTime;
        this.reConnectDelayTime = param && param.reConnectDelayTime || this.reConnectDelayTime;
        this.heartbeatTime = param && param.heartbeatTime || this.heartbeatTime;
        this.closeTime = 3 * this.heartbeatTime;
        this.removeAllHandler();
        this.removeAllEvent();
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
    m_onopen() {
        console.log("连接成功")
        this.reConnectTime = 0;
        this.startPingPong();
        if (!gHandler.gameGlobal.isdev) {
            let msg = {
                "event": "/Game/login/login",
                "data": {
                    id: gHandler.gameGlobal.player.account_name,
                    pass: gHandler.gameGlobal.player.account_pass
                }
            }
            this.ws.send(JSON.stringify(msg))
        }
    },
    m_onmessage(msg) {
        let data = JSON.parse(msg.data)
        this.m_EmitMsg(data.event, data.data.msg, data)
    },
    m_EmitMsg(event, data, msg) {
        if (this.handlers[event]) {
            for (let className in this.handlers[event]) {
                this.handlers[event][className] && this.handlers[event][className](data);
            }
        } else {
            console.log("没有注册回调函数", msg)
        }
    },
    m_onerror(e) {
        gHandler.logMgr.logerror(e);
        this.m_stopPingPong();
    },
    m_onclose() {
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
