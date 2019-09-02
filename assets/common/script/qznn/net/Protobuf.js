// var proto = require("bundle")
cc.Class({
    extends: cc.Component,
    ctor: function() {
        this.initData()
    },
    initData: function() {
        this.ip = 0;
        this.pong = null;
        this.cbPongCount = 0; //单个心跳包间网络延时次数
        this.closeCount = 2; //断网次数开始重连配置 默认2次断网开始重连
        this.timer = null;
        this.handlers = {};
        this.pongTime = 3000;
        this.socket = null;
        this.events = {};
        this.reconnectCount = 0; //重连次数
        this.ISclose = false; //是否关闭连接
    },
    removeAllEvent: function() {
        this.events = {};
    },
    removeAllHandler: function(e) {
        this.handlers = {}
    },
    addEvent: function(e, t) {
        this.events[e] || (this.events[e] = []), this.events[e].push(t)
    },
    addHandler: function(e, t) {
        this.handlers[e] ? cc.gg.utils.ccLog("该事件已经监听" + e) : this.handlers[e] = t;
    },
    onmessage: function(id, data, isCustom) {
        if (isCustom) {
            //自定义指令派发
            var t = this.handlers[id];
            console.log(id, "aaaaaa")
                //cc.gg.utils.ccLog(t);
            if (t) {
                t(id, data, true);
            } else {
                cc.gg.utils.ccLog("自定义指令派发失败")
            }
            return
        }
        //直接在这里解析
        if (id === 1) {
            var instructionsName = proto.msg.Resp.deserializeBinary(data);
            var operationId = instructionsName.getOperationid();
            var name = cc.gg.global.instructions[operationId];
            console.log(name + "指令名")
            if (operationId == 102) {
                this.cbPongCount = 0;
                this.reconnectCount = 0;
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
            return
        } else if (id == 500) {
            if (this.ISclose) {
                console.log("已不允许重新连接");
                clearInterval(this.pong);
                this.onmessage("OnIsContent", { text: "您的网络环境太差 请重新连接!" }, true);
                return
            }

            if (this.reconnectCount < 5) {
                this.reconnectCount++;
                //开始重连
                this.reConnect();
            } else {
                //这里开始不进行重连  调取弹框提示
                this.ISclose = true;
                console.log("我开始派发了弹窗");
                clearInterval(this.pong);
                this.onmessage("OnIsContent", { text: "您的网络环境太差 请重新连接!" }, true);
                //this.reconnectCount = 0
            }

        }
    },
    reConnect: function() {
        this.connect(this.ip, false);
    },
    connect: function(ip, whetherClose) {
        this.ISclose = false;
        this.ip = ip;
        var self = this;
        if (self.socket) {
            self.socket.close();
            this.cbPongCount = 0;
        }
        self.socket = new WebSocket(self.ip);
        self.socket.onopen = function() {
            self.onmessage("OnOpen", {}, true)

            if (self.timer) {
                clearInterval(self.timer);
                self.timer = false;
            };
            self.socket.onmessage = function(data) {
                self.parseProtoBufId(data);
            }
            self.socket.onclose = function(err) {
                cc.gg.utils.ccLog("webSocket断开连接", err);
                // this.closeCouzz++;
                // self.onmessage("500", err);
            }
            self.socket.onerror = function(err) {
                cc.gg.utils.ccLog("webSocket异常断开断开", err);
                // this.closeCouzz++;
                // self.onmessage("500", err);
            }


            if (cc.gg.global.userID) {
                self.send('Login', 1, {
                    "account_id": cc.gg.global.userID,
                    "password": cc.gg.global.password,
                })

            } else {
                // self.send('Login', 1, {
                //     account_id: "90677662",
                //     "password": "123456",
                // })
            }
            // var data = {
            //     account_id: 1
            // };

            // self.send("GameAreaDetail", 1, data)
            if (self.pong) {
                clearInterval(self.pong);
            }
            self.pong = setInterval(function() {
                    if (self.cbPongCount < 2) {
                        self.send('Pong', 1, {
                            ping: 100
                        })
                        self.cbPongCount++;

                    } else {
                        self.closeCount++;
                        self.onmessage(500, {}, );
                        cc.gg.utils.ccLog("用户断线");

                    }
                }, self.pongTime)
                //这里最好发送一下登录
        }
    },

    send: function(instructName, instructType, data) {
        var self = this;
        if (self.socket && self.socket.readyState == 1) {
            //0 代表发送  1 代表接收

            var operationId = cc.gg.global.instructions[instructName]
            var Reception = new proto.msg.Reception();

            Reception.setOperationid(operationId);
            Reception.setOperationtype(instructType);
            var data = JSON.stringify(data);
            Reception.setData(data);
            if (instructName != "Pong") {
                console.log("发送指令名" + instructName + "指令id" + operationId + "发送内容" + data)
            }
            var ReceptionArray = Reception.serializeBinary()
            var buf = self.protoBufAddtag(0, ReceptionArray);
            self.socket.send(buf);
        } else {
            //self.onmessage("OnIsContent", { text: "网络异常不支持通信" }, true);
            console.log("网络异常不支持通信")
        }
    },
    close: function() {
        if (this.socket) {
            this.socket.close();
        }
    },
    //把数据解析成ID 和 data
    parseProtoBufId: function(obj) {
        var self = this;
        if (cc.sys.isBrowser) {
            var arrayBuffer = obj.data;
            //var dataUnit8Array = new Uint8Array(arrayBuffer);
            var reader = new FileReader();
            reader.readAsArrayBuffer(arrayBuffer);
            var self = this
            reader.onload = function(e) {
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
    protoBufAddtag: function(tag, buffer) {
        var addtag_buffer = new Uint8Array(buffer.length + 2);
        var tagBinary = this.IntToUint8Array(tag, 16);
        var tagUnit8 = new Uint8Array(tagBinary);
        addtag_buffer.set(tagUnit8, 0);
        addtag_buffer.set(buffer.subarray(0, buffer.length), 2)
        return addtag_buffer;
    },
    //Uint8转 int
    Uint8ArrayToInt: function(uint8Ary) {
        var retInt = 0;
        for (var i = 0; i < uint8Ary.length; i++) {
            retInt |= (uint8Ary[i] << (8 * (uint8Ary.length - i - 1)));
        }
        return retInt
    },
    //Uint8转 int包含ID和内容
    IntToUint8Array: function(num, Bits) {
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