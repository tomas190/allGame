/*
 * @Author: burt
 * @Date: 2019-08-14 13:15:03
 * @LastEditors: burt
 * @LastEditTime: 2019-08-23 11:54:35
 * @Description: 
 */

let hallmsg_pb = require("hallmsg_pb");

let hallSocket = {
    handlers: {},
    nameToIdList: {
        "": 0,
    },
    init(param) {
        this.ws = param.webSocket;
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
    getIdByName(name) {
        return this.nameToIdList[name];
    },
    /** 接受到消息派发 */
    receiveMsg(id, msg) {
        console.log("receiveMsg", id, msg)
        if (this.handlers[id]) {
            this.handlers[id](msg);
        } else {
            console.log("消息回调未注册")
        }
    },
    /** 创建心跳消息 */
    createHeartBeat() {
        let msg = new hallmsg_pb.heartBeat();
        msg = msg.serializeBinary();
        var buf = this.protoBufAddtag(0, msg);
        return buf;
    },
    /** 创建消息 */
    createMsgByName(name, data) {
        let msg = new hallmsg_pb.msg();
        msg.setId(this.getIdByName(name));
        var jsondata = JSON.stringify(data);
        msg.setData(jsondata);
        let pblist = msg.serializeBinary();
        var buf = this.protoBufAddtag(1, pblist);
        return buf;
    },
    /** 解析消息 读取msg id 内容 */
    decodeMsg(obj) {
        if (cc.sys.isBrowser) {
            let blob = obj.data
            let reader = new FileReader()
            reader.readAsArrayBuffer(blob)
            let self = this
            reader.onload = function (e) {
                let dataUnit8Array = new Uint8Array(e.target.result)
                let id = self.Uint8ArrayToInt(dataUnit8Array.slice(0, 2))
                dataUnit8Array = dataUnit8Array.slice(2)
                self.distrubuteMsg(id, dataUnit8Array)
            }
        } else if (cc.sys.isNative) {
            var arrbuf = obj.data // ArrayBuffer
            var uint8buf = new Uint8Array(arrbuf)
            let id = this.Uint8ArrayToInt(uint8buf.slice(0, 2))
            uint8buf = uint8buf.slice(2)
            this.distrubuteMsg(id, uint8buf);
        }
    },
    /** 将unit8数组转换为int.. */
    Uint8ArrayToInt(uint8Ary) {
        let retInt = 0
        for (let i = 0; i < uint8Ary.length; i++) {
            retInt |= (uint8Ary[i] << (8 * (uint8Ary.length - i - 1)))
        }
        return retInt
    },
    /** 派发消息，pb解析 */
    distrubuteMsg(id, data) {
        if (id == 0) { // 心跳包
            this.ws.m_receivePong();
        } else {
            let pbdata = hallmsg_pb.msg.deserializeBinary(data);
            let msg = {};
            msg.id = pbdata.getId();
            msg.data = JSON.parse(pbdata.getData());
            this.receiveMsg(id, msg)
        }
    },
    /** 将int转换为uint8数组 */
    IntToUint8Array(num, Bits) {
        let resArry = [];
        let xresArry = [];
        let binaryStr = num.toString(2);
        for (let i = 0; i < binaryStr.length; i++) {
            resArry.push(parseInt(binaryStr[i]))
        }
        if (Bits) {
            for (let r = resArry.length; r < Bits; r++) {
                resArry.unshift(0);
            }
        }
        let resArryStr = resArry.join("");
        for (let j = 0; j < Bits; j += 8) {
            xresArry.push(parseInt(resArryStr.slice(j, j + 8), 2))
        }
        return xresArry
    },
    /** leaf 消息前面必须有一个id，加上 */
    protoBufAddtag(tag, buffer) {
        let addtag_buffer = new Uint8Array(buffer.length + 2);
        let tagBinary = this.IntToUint8Array(tag, 16);
        let tagUnit8 = new Uint8Array(tagBinary);
        addtag_buffer.set(tagUnit8, 0);
        addtag_buffer.set(buffer.subarray(0, buffer.length), 2);
        return addtag_buffer;
    },
}

module.exports = hallSocket;