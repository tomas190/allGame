// var imProto = require("bundle")
cc.Class({
    extends: cc.Component,
    ctor: function () {
        this.initData()
    },
    initData: function () {
        this.ip = 0;
        this.pong = null;
        this.cbPongCount = 0; //单个心跳包间网络延时次数
        this.timer = null;
        this.handlers = {};
        this.pongTime = 5000;
        this.socket = null;
        this.events = {};
        this.reconnectCount = 0; //重连次数
        this.ISclose = false; //是否关闭连接
        this.authKey = "9iT0YQjGWpPEtQp4";
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
    addHandler: function (e, t) {
        this.handlers[e] ? cc.gg.utils.ccLog("该事件已经监听") : this.handlers[e] = t;
    },
    onmessage: function (id, data, isCustom) {
        if (this.ISclose) {
            return;
        }
        if (isCustom) {
            //自定义指令派发
            var t = this.handlers[id];
            cc.gg.utils.ccLog(t);
            if (t) {
                t(id, data, true);
            } else {
                cc.gg.utils.ccLog("自定义指令派发失败")
            }
            return
        }
        //直接在这里解析
        if (id === 0) {
            var instructionsName = imProto.msg.Resp.deserializeBinary(data);
            var operationId = instructionsName.getOperationid();
            var name = cc.gg.global.instructions[operationId];
            // console.log(name + "指令名")
            if (operationId == 102) {
                this.cbPongCount = 0;
                return;
            } else if (operationId == 501) {
                this.ISclose = true;
                this.close()
                alert("您已被挤下线")
            } else {
                var t = this.handlers[name];
                //cc.gg.utils.ccLog(t);
                if (t) {
                    t(name, data);
                } else {
                    cc.gg.utils.ccLog(operationId);
                    cc.gg.utils.ccLog("我没进来？")
                }
            }
            //return
        } else if (id == 500) {
            if (this.ISclose) {
                return;
            }
            this.reConnect();
        }
    },
    reConnect: function () {
        this.connect(this.ip, false);
    },
    connect: function (ip, whetherClose) {
        if (this.ISclose) {
            return
        }
        this.ip = ip;

        var self = this;
        if (self.socket && self.socket.readStart != 1 && self.socket.readStart != 0) {
            self.socket.close();
            this.cbPongCount = 0;
            this.reconnectCount = 0;
        }


        //关于socket连接，原生android需要另外处理
        if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID) { //在浏览器调试中，cc.sys.os === cc.sys.OS_ANDROID 是true
            if (self.ip.indexOf('wss') == -1) {
                self.socket = new WebSocket(self.ip);
            } else {
                self.socket = new WebSocket(self.ip, {}, cc.url.raw('resources/hall/cacert.pem'));
            }
        } else {
            self.socket = new WebSocket(self.ip);
        }

        self.socket.onopen = function () {
            self.reconnectCount = 0;
            if (self.timer) {
                clearInterval(self.timer);
                self.timer = false;
            };
            self.socket.onmessage = function (data) {
                self.parseProtoBufId(data);
            }
            self.socket.onclose = function (err) {
                cc.gg.utils.ccLog("onclose webSocket断开连接", err);
                self.onmessage("500", err);
            }
            self.socket.onerror = function (err) {
                cc.gg.utils.ccLog("onerror webSocket断开连接", err)
                self.onmessage("500", err);
            }
            if (cc.gg.global.isH5) {
                var urlData = cc.gg.utils.urlParse(window.location.href);
                cc.gg.utils.ccLog(urlData);
                cc.gg.utils.ccLog(window.location.href);
                if (!urlData.account_pass) {
                    alert("非法登陆 请输入密码");
                    return;
                }
            } else {
                var urlData = {
                    account_name: cc.gg.global.userID,
                    account_pass: cc.gg.global.password,
                    token: cc.gg.global.token
                }
            }

            if (urlData.token) {
                self.send('Login', 1, {
                    account_id: urlData.account_name,
                    token: urlData.token,
                })
            } else {
                self.send('Login', 1, {
                    account_id: urlData.account_name,
                    password: urlData.account_pass,
                })
            }

            // cc.gg.client.send('__done', {
            //     name: "IM"
            // }, () => {})
            if (self.pong) {
                clearInterval(self.pong);
            }
            self.pong = setInterval(function () {
                if (self.ISclose) {
                    return;
                }
                if (self.cbPongCount < 2) {
                    self.send('Pong', 1, {
                        ping: 100
                    })
                    self.cbPongCount++;

                } else {
                    self.onmessage(500, {
                        cbPongCount: 2
                    });
                    cc.gg.utils.ccLog("用户断线");
                    //clearInterval(self.pong)
                }
            }, self.pongTime)
            //这里最好发送一下登录
        }
    },

    send: function (instructName, instructType, data) {
        var self = this;
        if (self.socket) {
            //1 代表发送  0 代表接收
            var operationId = cc.gg.global.instructions[instructName]
            var Reception = new imProto.msg.Reception();
            Reception.setOperationid(operationId);
            Reception.setOperationtype(instructType);
            if (instructName == "Login") {
                Reception.setAuthkey("9iT0YQjGWpPEtQp4")
            } else {
                Reception.setAuthkey(this.authKey)
            }
            var data = JSON.stringify(data);
            // console.log(data, "发送内容")
            Reception.setData(data);
            //console.log("Reception", Reception);
            var ReceptionArray = Reception.serializeBinary()
            var buf = self.protoBufAddtag(1, ReceptionArray);
            self.socket.send(buf);
        }
    },
    close: function () {
        if (this.socket) {
            this.socket.close();
        }
    },
    //把数据解析成ID 和 data
    parseProtoBufId: function (obj) {
        var self = this;
        if (cc.sys.isBrowser) {
            var arrayBuffer = obj.data;
            //var dataUnit8Array = new Uint8Array(arrayBuffer);
            var reader = new FileReader();
            reader.readAsArrayBuffer(arrayBuffer);
            var self = this
            reader.onload = function (e) {
                //cc.gg.utils.ccLog("解析 加载", e)
                var dataUnit8Array = new Uint8Array(e.target.result)
                var msgId = self.Uint8ArrayToInt(dataUnit8Array.slice(0, 2))
                dataUnit8Array = dataUnit8Array.slice(2)
                self.onmessage(msgId, dataUnit8Array)
            }
        } else if (cc.sys.isNative) {
            var arrbuf = obj.data // ArrayBuffer
            var uint8buf = new Uint8Array(arrbuf)
            let id = this.Uint8ArrayToInt(uint8buf.slice(0, 2))
            uint8buf = uint8buf.slice(2)
            this.onmessage(id, uint8buf);
        }
    },
    //把ID 和数据解析成二进制
    protoBufAddtag: function (tag, buffer) {
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
    }
});