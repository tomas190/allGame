/*
 * @Descripttion: gamelogic
 * @Author: Palos
 * @Date: 2019-09-05 14:38:56
 * @LastEditors  : Palos
 * @LastEditTime : 2019-12-31 14:31:36
 */
import { ISendDelegate, IReceiveDelegate } from "./transmit";
import { initSender } from "./sendMsg";
import { initReceiver } from "./handle";
import { app } from "../conf/config";
import { msg } from "../proto/proto_cdx_msg";
import { events, EventKind } from "../conf/event";
import Stoarge from "../cdx_Storage";
import gHandler = require("../../../../base/common/gHandler")

type IResponseFunc = (ddz_msg: any) => void;
const { ccclass } = cc._decorator;

@ccclass
class Client implements ISendDelegate, IReceiveDelegate {
    private static _instance: Client;
    private io: WebSocket;
    private timer: any;
    private mapHandler: Map<number, IResponseFunc>;

    constructor() {
        this.timer = 0;     // 时间间隔
        this.io = undefined;
        this.mapHandler = new Map();

        initSender(this);
        initReceiver(this);
    }

    // 单例，外部访问进来
    public static getInstance(): Client {
        this._instance || (this._instance = new Client());
        return this._instance;
    }

    // 移除客户端，清除数据
    public remove() {
        this.ReConnet();
        this.io.onopen = this.io.onerror = this.io.onclose = this.io.onmessage = null;
        this.io.close();
        if (this.idTimerReconnect) clearTimeout(this.idTimerReconnect);
        this.idTimerReconnect = null;
        this.io = null;
    }

    // name
    public init(): void {
        this.io || this.initSocket();
    }

    private connectNum: number = 0;
    private initSocket() {
        // app.ServerURL = "ws://game.539316.com/caidaxiao"
        // app.ServerURL = "ws://game.tampk.club/caidaxiao"
        
        if (gHandler.subGameList['cdx'].serverUrl) { 
            app.ServerURL = gHandler.subGameList['cdx'].serverUrl;
        } 
        if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID) {
            //在浏览器调试中，cc.sys.os === cc.sys.OS_ANDROID 是true
            if (app.ServerURL.indexOf('wss') == -1) {
                this.io = new WebSocket(app.ServerURL);
            } else {
                this.io = new WebSocket(app.ServerURL,cc.url.raw('resources/hall/cacert.pem'));
            }
        } else {
            this.io = new WebSocket(app.ServerURL);
        }
        
        this.io.binaryType = "arraybuffer";  // 赋值编码类型
        console.log("连接服务器:", app.ServerURL);

        this.io.onopen = (evt: Event) => {
            this.startPing();
            this.onLogin();
            this.connectNum = 0;
            console.log("连接服务器成功~");
        }

        // 处理收发事件
        this.io.onmessage = (evt: MessageEvent) => {
            this.onReceiveMessageEvent(evt);
        }

        this.io.onerror = (evt: Event) => {
            console.log("连接服务器失败~");
            this.connectNum++;
            console.log("重连次数:", this.connectNum);
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络断开，正在努力连接中")
            this.ReConnet();
            events.dispatch(EventKind.Event_onerror, {});
        }

        this.io.onclose = (evt: CloseEvent) => {
            console.log("连接服务器关闭~");
            this.ReConnet();
            events.dispatch(EventKind.Event_onclose, {});
        }
    }

    // 重连服务器
    private idTimerReconnect: any = null;
    private ReConnet(reconnect: boolean = true) {
        if (this.connectNum < 30) {
            if (this.timer) {
                clearInterval(this.timer);  // 清除定時器
                this.timer = null;
            }
            if (reconnect) {
                if (this.idTimerReconnect == null) {
                    this.idTimerReconnect = setTimeout(() => {
                        this.initSocket();
                        this.idTimerReconnect = null;
                    }, 1000);
                }
            }
        }else {
            let networkTip = cc.find("Canvas/roomScens/promptBox/networkTip")
            networkTip.active = true
            events.dispatch(EventKind.Event_timeOut, {});
        }
    }

    private startPing() {
        this.timer = setInterval(() => {   // 定时器
            this.sendMessage(msg.MessageID.MSG_Ping, {});
        }, 5000);
    }

    private onLogin() {
        // 处理大厅事件
        let num: number = Stoarge.random(app.UserID.length, 0)
        let Id = gHandler.gameGlobal.player.id;
        if (Id == 0) {
            let data: msg.ILogin_C2S = {Id: app.UserID[num] + "", PassWord: app.Password}
            events.dispatch(EventKind.C2S_Login, data)
        } else {
            let data: msg.ILogin_C2S = {Id: '' + gHandler.gameGlobal.player.id, Token: gHandler.gameGlobal.token}
            events.dispatch(EventKind.C2S_Login, data)
        }
        // let data: msg.ILogin_C2S = {Id: app.UserID[num] + "", PassWord: app.Password}
        // events.dispatch(EventKind.C2S_Login, data)
    }

    // 接收服务器传送的协议
    private onReceiveMessageEvent(evt: MessageEvent): void {
        const retData: { id: number, data: Uint8Array } = this.parseProtoBufId(evt.data);
        let bodyClass: any;

        switch (retData.id) {
            case msg.MessageID.MSG_Pong:
                bodyClass = msg.Pong;
                console.log("Recevier msg.Pong");
                break
            case msg.MessageID.MSG_Login_S2C:
                bodyClass = msg.Login_S2C;
                console.log("Recevier msg.Login_S2C");
                break
            case msg.MessageID.MSG_Logout_S2C:
                bodyClass = msg.Logout_S2C;
                console.log("Recevier msg.Logout_S2C");
                break
            case msg.MessageID.MSG_JoinRoom_S2C:
                bodyClass = msg.JoinRoom_S2C;
                console.log("Recevier msg.JoinRoom_S2C");
                break
            case msg.MessageID.MSG_EnterRoom_S2C:
                bodyClass = msg.EnterRoom_S2C;
                console.log("Recevier msg.EnterRoom_S2C");
                break
            case msg.MessageID.MSG_LeaveRoom_S2C:
                bodyClass = msg.LeaveRoom_S2C;
                console.log("Recevier msg.LeaveRoom_S2C");
                break
            case msg.MessageID.MSG_ActionTime_S2C:
                bodyClass = msg.ActionTime_S2C;
                // console.log("Recevier msg.ActionTime_S2C");
                break
            case msg.MessageID.MSG_PlayerAction_S2C:
                bodyClass = msg.PlayerAction_S2C;
                // console.log("Recevier msg.PlayerAction_S2C");
                break
            case msg.MessageID.MSG_PotChangeMoney_S2C:
                bodyClass = msg.PotChangeMoney_S2C;
                // console.log("Recevier msg.PotChangeMoney_S2C");
                break
            case msg.MessageID.MSG_UptPlayerList_S2C:
                bodyClass = msg.UptPlayerList_S2C;
                console.log("Recevier msg.UptPlayerList_S2C");
                break
            case msg.MessageID.MSG_ResultData_S2C:
                bodyClass = msg.ResultData_S2C;
                console.log("Recevier msg.ResultData_S2C");
                break
            case msg.MessageID.MSG_BankerData_S2C:
                bodyClass = msg.BankerData_S2C;
                console.log("Recevier msg.BankerData_S2C");
                break
            case msg.MessageID.MSG_EmojiChat_S2C:
                bodyClass = msg.EmojiChat_S2C;
                console.log("Recevier msg.EmojiChat_S2C");
                break
            case msg.MessageID.MSG_SendActTime_S2C:
                bodyClass = msg.SendActTime_S2C;
                // console.log("Recevier msg.SendActTime_S2C");
                break
            default:
                break;
        }
        const gameMsg: any = bodyClass.decode(retData.data);

        const func: IResponseFunc = this.mapHandler.get(retData.id);
        if (func) {
            func(gameMsg);
        }
    }

    // 发送协议，kind：协议名，data：数据
    public sendMessage(kind: msg.MessageID, data: any): void {
        if (this.io.readyState !== WebSocket.OPEN) {
            return;
        }
        let bodyClass: any;
        switch (kind) {
            case msg.MessageID.MSG_Ping:
                bodyClass = msg.Ping;
                break
            case msg.MessageID.MSG_Login_C2S:
                bodyClass = msg.Login_C2S;
                break
            case msg.MessageID.MSG_Logout_C2S:
                bodyClass = msg.Logout_C2S;
                break
            case msg.MessageID.MSG_JoinRoom_C2S:
                bodyClass = msg.JoinRoom_C2S;
                break
            case msg.MessageID.MSG_LeaveRoom_C2S:
                bodyClass = msg.LeaveRoom_C2S;
                break
            case msg.MessageID.MSG_PlayerAction_C2S:
                bodyClass = msg.PlayerAction_C2S;
                break
            case msg.MessageID.MSG_BankerData_C2S:
                bodyClass = msg.BankerData_C2S;
                break
            case msg.MessageID.MSG_EmojiChat_C2S:
                bodyClass = msg.EmojiChat_C2S;
                break
            default:
                break;
        }

        const message = bodyClass.create(data);
        const buffer = bodyClass.encode(message).finish();
        // leaf 前两位为协议序号，故需包装一下
        const addTagBuffer = this.protoBufAddTag(kind, buffer);
        this.io.send(addTagBuffer.buffer);
    }

    public registerCallBack(kind: msg.MessageID, func: IResponseFunc): void {
        this.mapHandler.set(kind, func);

    }

    private protoBufAddTag(tag: number, buffer: Uint8Array): Uint8Array {
        const bufferAddTag = new Uint8Array(buffer.length + 2);
        const tagBinary = this.IntToUint8Array(tag, 16);
        const tagUnit8 = new Uint8Array(tagBinary);

        bufferAddTag.set(tagUnit8, 0);
        bufferAddTag.set(buffer.subarray(0, buffer.length), 2);

        return bufferAddTag;
    }
    private parseProtoBufId(buffer: ArrayBuffer): { id: number, data: Uint8Array } {
        const arrayBuffer: ArrayBuffer = buffer;
        let dataUnit8Array = new Uint8Array(arrayBuffer);
        const id = this.Uint8ArrayToInt(dataUnit8Array.slice(0, 2));
        dataUnit8Array = dataUnit8Array.slice(2);

        return { id, data: dataUnit8Array };
    }

    private IntToUint8Array(num: number, bits: number): number[] {
        const resArry = [];
        const xresArry = [];
        const binaryStr: string = num.toString(2);
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
    }

    /**
     * Uint8Array[]转int
     * 相当于二进制加上4位。同时，使用|=号拼接数据，将其还原成最终的int数据
     * @param uint8Ary Uint8Array类型数组
     * @return int数字
     */
    private Uint8ArrayToInt(uint8Ary: Uint8Array): number {
        let retInt = 0;
        for (let i = 0; i < uint8Ary.length; i++) {
            retInt |= (uint8Ary[i] << (8 * (uint8Ary.length - i - 1)));
        }
        return retInt;
    }
}

export const initWebSocket = () => {
    Client.getInstance().init();
}
export const initio = () => {
    Client.getInstance().remove();
}