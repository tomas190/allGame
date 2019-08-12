/*
 * @Author: burt
 * @Date: 2019-08-12 10:15:11
 * @LastEditors: burt
 * @LastEditTime: 2019-08-12 10:20:28
 * @Description: 
 */
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
        this.pongTime = 1000;
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
        if (this.ISclose) {
            return;
        }
        if (isCustom) {
            //自定义指令派发
            var t = this.handlers[id];
            console.log(id)
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
            //this.reConnect();
            //开始重连
            this.reConnect();


        }
    },
    reConnect: function() {
        this.connect(this.ip, false);
    },
    connect: function(ip, whetherClose) {
        if (this.ISclose) {
            return
        }
        this.ip = ip;
        var self = this;
        if (self.socket) {
            self.socket.close();
            this.cbPongCount = 0;
            this.reconnectCount = 0;
        }
        self.socket = new WebSocket(self.ip);
        self.socket.onopen = function() {
            self.onmessage("OnOpen", {}, true)
            self.reconnectCount = 0;
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

            var urlData = cc.gg.utils.urlParse(window.location.href);
            cc.gg.utils.ccLog(urlData);
            cc.gg.utils.ccLog(window.location.href);
            if (urlData.account_name) {
                self.send('Login', 1, {
                    account_id: urlData.account_name
                })

            } else {
                if (cc.gg.global.userInfo) {

                }
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
                        // this.closeCouzz++;
                        self.onmessage(500, {}, );
                        cc.gg.utils.ccLog("用户断线");
                        //clearInterval(self.pong)
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
            console.log("网络异常不支持通信")
        }
    },
    close: function() {
        if (this.socket) {
            this.socket.close();
        }
    },
    //把数据解析成ID 和 data
    parseProtoBufId: function(data) {
        var arrayBuffer = data.data;
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