/*
 * @Author: burt
 * @Date: 2019-07-29 15:11:55
 * @LastEditors: burt
 * @LastEditTime: 2019-08-15 10:54:31
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
    protoType: 2, // 0 json格式解析 1 pb格式解析 2 leaf框架
    events: {},
    handlers: {},

    init(param) {
        if (!param.protoDeal) {
            return console.log("请提供消息处理模块")
        }
        this.protoDeal = param.protoDeal;
        this.protoType = param && param.protoType || this.protoType;
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
        // this.addHandler(0, this.m_receivePong.bind(this))
    },
    sendPing() {
        console.log("发送心跳")
        this.pingTime = 0;
        let msg = this.protoDeal.createHeartBeat();
        this.ws.send(msg);
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
        if (this.protoType == 2) {
            let data = this.protoDeal.createMsgByName(name, msg);
            (this.ws || console.log("websocket未初始化")) && this.ws.send(data);
        }
    },
    close() {
        this.ws && this.ws.close();
        this.ws = null;
    },
    addHandler(event, callback) {
        console.log("addHandler", event)
        if (this.handlers[event]) {
            console.log("该事件已经监听")
        } else {
            this.handlers[event] = callback;
        }
    },
    removeHandler(event) {
        this.handlers[event] && (this.handlers[event] = null);
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
    m_reconnect() {
        let reConnectInterval = setInterval(() => {
            this.reConnectTime++;
            if (this.ws.readyState == WebSocket.OPEN || this.reConnectTime >= 5) {// 重连5次
                clearInterval(reConnectInterval);
            }
            this.connect();
        }, this.reConnectDelayTime * 1000) // 5秒重连一次
    },
    m_onopen() {
        this.reConnectTime = 0;
        this.startPingPong();
    },
    m_onmessage(msg) {
        if (this.protoType == 2) {
            this.protoDeal.decodeMsg(msg);
        } else {
            // 解析数据
        }
    },
    m_EmitMsg() {
        if (this.handlers[info.id]) {
            this.handlers[info.id](info.data);
        } else {
            console.log('没有注册回调函数')
        }
    },
    m_onerror(e) {
        gHandler.logManager.logerror(e);
        this.m_stopPingPong();
    },
    m_onclose() {
        this.m_stopPingPong();
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
        if (this.pongTime >= this.closeTime) {
            this.m_reconnect();
        } else {
            this.pongTime++;
        }
    },
    m_receivePong() {
        console.log("接受心跳")
        this.pongTime = 0;
    },
}
module.exports = hqqWebSocket
