/*
 * @Author: burt
 * @Date: 2019-07-29 15:11:55
 * @LastEditors: burt
 * @LastEditTime: 2019-08-12 16:24:30
 * @Description: 长连接与心跳包
 */
let gHandler = require("gHandler");
let hqqWebSocket = {
    ip: "",
    ws: null,
    pingTime: 0,
    pongTime: 0,
    reConnectTime: 0,
    reConnectDelayTime: 5, // 多久重连一次（秒）
    heartbeatTime: 3, // 心跳间隔（秒）
    protoType: 0, // 0 json格式解析 1 pb格式解析 2 leaf框架
    events: {},
    handlers: {},
    msgDealFunc: (msg) => { // 重载的接收消息数据处理函数
        let data;
        if (this.protoType == 0) {
            data = JSON.parse(msg);
        } else if (this.protoType == 1) {
            // data = pbfunc(data);
        } else {
            return gHandler.logManager.log("消息协议类型错误");
        }
        let event = data.name;
        if (this.handlers[event]) {
            this.handlers[event](data);
        } else {
            gHandler.logManager.log("消息处理函数未注册");
        }
    },
    sendDealFunc: (msg) => { // 重载的发送消息数据处理函数
        // todo 消息转换处理
        return msg;
    },
    init(param) {
        this.protoType = param.protoType || this.protoType;
        this.ip = param.ip || this.ip;
        this.reConnectTime = param.reConnectTime || this.reConnectTime;
        this.reConnectDelayTime = param.reConnectDelayTime || this.reConnectDelayTime;
        this.msgDealFunc = param.msgDealFunc || this.msgDealFunc;
        this.sendDealFunc = param.sendDealFunc || this.sendDealFunc;
        this.heartbeatTime = param.heartbeatTime || this.heartbeatTime;
    },
    connect(param) {
        this.ip = param || this.ip
        this.ws = new WebSocket(this.ip)
        this.ws.onopen = this.m_onopen.bind(this)
        this.ws.onmessage = this.m_onmessage.bind(this)
        this.ws.onerror = this.m_onerror.bind(this)
        this.ws.onclose = this.m_onclose.bind(this)
    },
    sendMessage(msg) {
        let data = this.sendDealFunc(msg);
        (this.ws || console.log("websocket未初始化")) && this.ws.send(data);
    },
    close() {
        this.ws && this.ws.close();
        this.ws = null;
    },
    addHandler(event, callback) {
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
        this.m_startPingPong();
    },
    m_onmessage(msg) {
        this.msgDealFunc(msg);
    },
    m_onerror(e) {
        gHandler.logManager.logerror(e);
        this.m_stopPingPong();
    },
    m_onclose() {
        this.m_stopPingPong();
    },
    /** 开始心跳 */
    m_startPingPong() {
        this.heartbeat = setInterval(() => {
            this.m_checkPingPong();
        }, this.heartbeatTime * 1000)
    },
    m_stopPingPong() {
        clearInterval(this.heartbeat);
    },
    /** 心跳逻辑 */
    m_checkPingPong() {
        if (this.pingTime >= 3) {
            this.m_sendPing();
        } else {
            this.pingTime++;
        }
        if (this.pongTime >= 9) {
            this.m_reconnect();
        } else {
            this.pongTime++;
        }
    },
    m_sendPing() {
        this.pingTime = 0;
        this.ws.send('ping');
    },
    m_receivePong() {
        this.pongTime = 0;
    },

}

module.exports = hqqWebSocket
