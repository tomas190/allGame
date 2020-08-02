cc.Class({
    extends: cc.Component,
    ctor: function () {
        this.initData()
    },
    initData: function () {
        this.ip = "";
        this.socket = "";
        this.handlers = {};
        this.events = {};
        this.pong = 0;
        this.timeout = 0;
        this.reconnectCount = 0;
        this.cbPonging = 0;
        this.ISclose = null;
    },
    removeAllEvent: function () {
        this.events = {}
    },
    removeAllHandler: function (e) {
        this.handlers = {}
    },
    addEvent: function (e, t) {
        this.events[e] || (this.events[e] = []), this.events[e].push(t)
    },
    addHandler: function (e, t) {
        this.handlers[e] ? cc.gg.utils.ccLog("该事件已经监听") : this.handlers[e] = t
    },
    onmessage: function (e) {
        var t = this.events[e];
        if (t)
            for (var i = 0; i < t.length; i++) "function" == typeof t[i] && t[i]()
    },
    reConnect: function () {
        this.connect(this.ip, !1)
    },
    connect: function (e, t) {
        if (this.ISclose) {
            cc.gg.utils.ccLog("此用户已经登陆")
            return
        }
        this.ip = e;
        var i = this;
        t ? this.cbPonging = 0 : i.reconnectCount = 0, i.socket && i.socket.close();
        var a = cc.gg.hallNetMgr._userInfo,
            o = a ? i.ip + "?session=" + a.session + "&account_id=" + a.account_id : i.ip;
        // i.socket = new WebSocket(o),

        //关于socket连接，原生android需要另外处理
        if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID) { //在浏览器调试中，cc.sys.os === cc.sys.OS_ANDROID 是true
            if (o.indexOf('wss') == -1) {
                i.socket = new WebSocket(o);
            } else {
                i.socket = new WebSocket(o, {}, cc.url.raw('resources/hall/cacert.pem'));
            }
        } else {
            i.socket = new WebSocket(o);
        }

        i.socket.onopen = function () {
            i.reconnectCount = 0,
                i.reConnetTime && (clearInterval(i.reConnetTime), i.reConnetTime = void 0), cc.gg.utils.ccLog("websock连接成功: ", i.ip),
                i.socket.onmessage = function (e) {
                    if ("@" == e.data) return i.cbPonging = 0, !1;
                    e = "string" == typeof e.data ? JSON.parse(e.data) : e.data, "function" == typeof i.handlers[e.operation] && i.handlers[e.operation](e)
                },
                i.socket.onclose = function (e) {
                    cc.gg.utils.ccLog("websock断开连接", e)
                },
                i.socket.onerror = function (e) {
                    cc.gg.utils.ccLog("websock连接异常", e),
                        i.onmessage("onerror")
                },
                i.pong || (i.pong = setInterval(function () {
                    console.log("断线重连00===========");
                    i.cbPonging < 2 ? (i.socket.send("@"), i.cbPonging++) : (i.onmessage("onclose"),
                        cc.gg.utils.ccLog("用户断线！！！"),
                        clearInterval(i.pong),
                        i.pong = void 0,
                        i.reConnetTime = setInterval(function () {
                            i.reconnectCount < 5 ? (
                                i.reconnectCount++ , i.close(), i.connect(i.ip, !0)
                            ) : (cc.gg.global.isOfficial && (cc.gg.utils.ccLog("socket>>>>>>>", window.location.href),
                                cc.gg.http.sendRequestPost("k/getApi", {
                                    url: window.location.href
                                }, function (e) {
                                    -1e3 == data.result || "登录失效" == data.result_message ? (
                                        window.localStorage.removeItem(window.location.WxdataName),
                                        window.location.reload(!1)
                                    ) : i.connect(data.socket)
                                })
                            ), i.onmessage("onfail"))
                        }, 5000))
                }.bind(this), 6000)), i.onmessage("onopen")
        }
    },
    send: function (e) {
        this.socket && 1 == this.socket.readyState ? (null != e && "object" == (void 0 === e ? "undefined" : a(e)) && (e = JSON.stringify(e)), this.socket.send(e)) : this.connect(this.ip)
    },
    close: function () {
        this.socket && this.socket.close()
    }

});