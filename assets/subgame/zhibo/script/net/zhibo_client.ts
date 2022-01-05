import { app } from "../tools/zhibo_config";
import { ISendDelegate, IReceiveDelegate } from "./zhibo_delegate";
import { initSender, clearSender } from "./zhibo_send";
import { initReceiver } from "./zhibo_receive";
import { msg } from "../proto/ZHIBOproto_msg";
import { events, EventKind } from "../tools/zhibo_event";
import { language, textID } from "../language/zhibo_language";


type IResponseFunc = (msg: any) => void;
const { ccclass, property } = cc._decorator;

@ccclass
export default class zhibo_client implements ISendDelegate, IReceiveDelegate {
    protected static _instance;

    private io: WebSocket = null;
    private pingTimer: number = 0;
    private reconnectTimer: number = 0;
    private reconnectCount: number = 0;
    private mapHandler: Map<number, IResponseFunc> = null;
    private isPortrait: boolean = false;
    private isLogout: boolean = false;

    public static getInstance(): zhibo_client {
        this._instance || (this._instance = new zhibo_client());
        return this._instance;
    }

    /**
     * init
     */
    public init(isPortrait:boolean=false):boolean {
        this.isPortrait = isPortrait;
        if(app.isKicked) return;
        if(this.io) return true;
        clearInterval(this.pingTimer);
        this.pingTimer = 0;

        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = 0;
        this.reconnectCount = 0;

        this.io = undefined;
        this.isLogout = false;
        this.mapHandler = new Map();

        initSender(this);
        initReceiver(this);

        if (hqq.isDebug) { 
            // 测试端 - 注意DEV与PRE账号密码Token问题
            let urlPara = location.search.slice(1);
            app.UserID = app.UserIDs[urlPara] || app.UserIDs[0];
            app.Password = app.Password;
        }else{
            // 正式
            app.Token = hqq.gameGlobal.token;
            app.UserID = hqq.gameGlobal.player.account_name + "";
            app.Password = hqq.gameGlobal.token;

            app.GameID = hqq.subGameList["zhibo"].game_id;
            app.ServerURL = hqq.subGameList["zhibo"].serverUrl;
        }

        this.initSocket();
    }

    public destroy():void {
        this.clear();
        // 清除全域 踢人事件
        clearInterval(app.apiKickID);
        app.apiKickID = 0;
        cc.director.preloadScene( hqq.hallConfig.lanchscene , ()=>{
            app.isKicked = false; // 初始化 - 踢人
            if(this.isPortrait) hqq.reflect.setOrientation("landscape");
            cc.director.loadScene(hqq.hallConfig.lanchscene);
        });
    }

    public clear():void {
        clearInterval(this.pingTimer);
        this.pingTimer = 0;

        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = 0;
        this.reconnectCount = 0;

        if (this.io) {
            this.io.close();
            this.io.onopen = this.io.onmessage = this.io.onerror = this.io.onclose = null;
            this.io = undefined;
        }
        clearSender();
        this.mapHandler?.clear();
        this.isLogout = true;
    }

    public sendMessage(kind: msg.SubCommand, data: any): void {
        if (!this.io || this.io.readyState !== WebSocket.OPEN) return;

        cc.log("协议编号:", kind, "发送出的数据:", data);

        let bodyClass: any;
        switch (kind) {
            case msg.SubCommand.EnumSubLoginReq:
                bodyClass = msg.LoginReq;
                break;
            case msg.SubCommand.EnumSubFrontEndLog:
                bodyClass = msg.FrontEndLog;
                break;
            default:
                break;
        }
        const message = bodyClass.create(data);
        const buffer = bodyClass.encode(message).finish();
        // leaf 前两位为协议序号，故需包装一下
        const addTagBuffer = this.protoBufAddTag(kind, buffer);
        setTimeout(()=>{
            this.io?.send(addTagBuffer.buffer);
        });
        
    }

    public registerCallBack(kind: msg.SubCommand, func: IResponseFunc): void {
        this.mapHandler.set(kind, func);
    }

    private initSocket() {
        if (this.io  && this.io.readyState == WebSocket.OPEN) return;
        if (this.isLogout || app.isKicked) return;
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = 0;

        if ( (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID) &&
                app.ServerURL.startsWith('wss://')) { //在浏览器调试中，cc.sys.os === cc.sys.OS_ANDROID 是true
            this.io = new WebSocket(app.ServerURL, {}, cc.url.raw('resources/hall/cacert.pem'));
        } else {
            this.io = new WebSocket(app.ServerURL);
        }
        this.io.binaryType = "arraybuffer";
        cc.log("连接服务器:", app.ServerURL);
        this.io.onopen = (evt: Event) => {
            cc.log("服务器连接成功");
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = 0;
            this.reconnectCount = 0;
            // this.checkPing();
            events.dispatch(EventKind.S2C_Connect);
        }
        this.io.onmessage = (evt: MessageEvent) => {
            this.onReceiveMessageEvent(evt);
        }
        this.io.onerror = (evt: Event) => {
            cc.log("服务器连接失败");
            if(this.io.readyState !== WebSocket.OPEN){
                this.io.close();
            }
        }
        this.io.onclose = (evt: CloseEvent) => {
            cc.log("服务器连接关闭");
            if(this.io.readyState !== WebSocket.OPEN){
                this.reconnect();
            }
        }
    }

    private onReceiveMessageEvent(evt: MessageEvent): void {
        const retData: { id: number, data: Uint8Array } = this.parseProtoBufId(evt.data);
        let bodyClass: any;
        switch (retData.id) {
            case msg.SubCommand.EnumSubLoginResp:
                bodyClass = msg.LoginResp;
                break;
            default:
                break;
        }
        if(!bodyClass){
            cc.log("未知 =>",retData);
            return
        }
        const gameMsg: any = bodyClass.decode(retData.data);
        /* if (retData.id > 1) {
            cc.log("接收到的数据:", gameMsg);
            if(retData.id==msg.MessageKind.KOutPush){
                let msg:msg.KickedOutPush = gameMsg;
                switch (msg.reason) {
                    case 1: // 重复登入
                        events.dispatch(EventKind.TIP_Message,textID.KICK_API);
                        break;
                    case 2: // 强制踢人
                        events.dispatch(EventKind.TIP_Message,textID.KICK_PLAYER);
                        break;
                }
            }
        } */
        this.mapHandler.get(retData.id)?.(gameMsg);
    }

    private checkPing(): void {
        clearInterval(this.pingTimer);
        this.pingTimer = setInterval(() => {
            // this.sendMessage(msg.SubCommand.Ping, {});
        }, 5000);
    }

    private reconnect(): void {
        if (this.isLogout || this.reconnectTimer) return;
        this.reconnectCount++;
        events.dispatch(EventKind.CLI_Reconnect);
        if (this.reconnectCount > 30) {
            events.dispatch(EventKind.TIP_Message,textID.CONNECTION_TIME_OUT);
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, language.getTextByID(textID.RECONNECT));
            this.reconnectTimer = setTimeout(() => {
                if (this.io) {
                    this.io.close();
                    this.io.onopen = this.io.onmessage = this.io.onerror = this.io.onclose = null;
                    this.io = undefined;
                }
                clearInterval(this.pingTimer);
                this.pingTimer = 0;
                this.initSocket();
            }, 1000);
        }
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
        const resArray = [];
        const xResArray = [];
        const binaryStr: string = num.toString(2);
        for (const chr of binaryStr) {
            resArray.push(parseInt(chr, 10));
        }

        if (bits) {
            for (let r = resArray.length; r < bits; r++) {
                resArray.unshift(0);
            }
        }

        const resArrayStr = resArray.join("");
        for (let j = 0; j < bits; j += 8) {
            xResArray.push(parseInt(resArrayStr.slice(j, j + 8), 2));
        }

        return xResArray;
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