import { AppConfig, EventKind, MsgKind } from "../CYLHDStateConfig";
import EventMgr from "./ACCYLHDEventMgr";
import StateGame from "../CYLHDState";
import ACM from "./ACCYLHDMain"
import ACTick from "./ACCYLHDTick"

// type IResponseFunc = (kind :MsgKind, msg :any) => void;
type IEvtFunc = (kind :MsgKind, msg: any) => void;


const { ccclass } = cc._decorator;
module AC {
    @ccclass
    export class SocketClient {
        private io: WebSocket;
        private timer: number;
        // private timerReconn:number;
        private mapReqModel: Map<MsgKind, any>;
        private mapResModel: Map<MsgKind, {protoClass: any,handle: IEvtFunc}>;
        private mapEvtModel: Map<MsgKind, (msg: any) => void>;
        private nTimesReconnect: number = 0;
        private nTimesMost:number = 30;

        constructor() {
            this.timer = 0;
            this.io = undefined;
            this.mapReqModel = new Map();
            this.mapResModel = new Map();
            this.mapEvtModel = new Map();
        }
        /**
         * name
         */
        public init(): void {
            this.io || this.initSocket();
        }

        public closeConn(connect:boolean,willClearModel:boolean=true) {
            if(!this.io)    return;

            this.stopPing();
            this.io.onclose = this.io.onopen = this.io.onmessage = this.io.onerror = null;
            this.io.close();
            // if(this.timerReconn) {
            //     clearTimeout(this.timerReconn);
            //     this.timerReconn = 0;
            // }
            if(!connect) {
                this.reconnect();
                return;
            }
            
            this.io = null;
            if(this.tickPing)   this.tickPing = null;
            if(this.tickReconnect) {
                this.tickReconnect.stop();
                this.tickReconnect = null;
            }

            if(willClearModel) {
                this.mapReqModel.clear();
                this.mapResModel.clear();
                this.mapEvtModel.clear();
            }
        }

        /**
         * 1. 发送消息
         * @param kind 
         * @param data 
         */
        public sendMessage(kind: MsgKind, data: any): void {
            if(!this.io)return;
            if (this.io.readyState !== WebSocket.OPEN) {
                return;
            }
            // if(kind!=MsgKind.Ping)  cc.log("C->S", kind, JSON.stringify(data))
            let bodyClass: any = this.mapReqModel.get(kind);
            if(!bodyClass){
                cc.warn('no register-MsgKind-send：', kind);
                return;
            }
            cc.log("sendMessage kind=",kind , "data=",data);
            const buf:any = this.generateBuffer(kind, bodyClass, data);
            //为了避免因为网络卡堵塞主线程，异步发送消息
            setTimeout(() => {
                if( this.io )
                {
                    this.io.send(buf);
                }
            }, 0);
        }
        /**
         * 2. 接收响应
         * @param evt 
         */
        private onReceiveMessageEvent(evt: MessageEvent): void {
            // hideNetWait();
            const retData: { id: number, data: Uint8Array } = this.parseProtoBufId(evt.data);
            // cc.warn("onReceive:", retData.id)
            const receive: any = this.mapResModel.get(retData.id);
            // console.warn("onReceiveMessageEvent - ", retData.id)
            if(!receive) {
                cc.warn('no register - MsgKind-receive：', retData.id);
                return;
            }
            
            const bodyClass = receive.protoClass;
            const gameMsg: any = bodyClass.decode(retData.data);
            // cc.log("S->C:", retData.id, JSON.stringify(gameMsg));
            if(retData.id != 19 )
            {
                cc.log("onReceiveMessageEvent id=",retData.id , "gameMsg=",gameMsg);
            }
            const func: IEvtFunc = receive.handle;
            if (func) {
                func(retData.id, gameMsg);
            }
        }
        public registerReqModel(kind: MsgKind, protoClass:any): void{
            if(!this.mapReqModel.get(kind))    this.mapReqModel.set(kind, protoClass);
            else cc.warn("已注册ReqModel : ", kind);
            // console.warn("registerReqModel:", kind, this.mapReqModel.get(kind))
        }

        public registerResModel(kind: MsgKind, protoClass:any, func: IEvtFunc): void {
            if(!this.mapResModel.get(kind))    this.mapResModel.set(kind, {protoClass:protoClass, handle:func});
            else cc.warn("已注册ResModel : ", kind);
            // console.warn("registerResModel:", kind, this.mapResModel.get(kind))
        }

        public registerEvtModel(kind: MsgKind, func: (msg: any) => void): void {
            this.mapEvtModel.set(kind, func);
            // console.warn("registerEvtModel:", kind, this.mapEvtModel.get(kind))
        }
        public unregisterEvtModel(kind:MsgKind): void{
            if(this.mapEvtModel.get(kind))  this.mapEvtModel.delete(kind);
        }
        public notifyEvtModel(kind: MsgKind, data:any) {
            const evt = this.mapEvtModel.get(kind);
            if(evt) {
                evt(data);
            }
        }

        private initSocket() {
            if ( this.io != null && this.io.readyState == WebSocket.OPEN) {
                return;
            }
            this.closeConn(true,false);

            if(cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID){
                if(AppConfig.ServerURL.indexOf('wss') == -1){
                    this.io = new WebSocket(AppConfig.ServerURL);
                }else{
                    this.io = new WebSocket(AppConfig.ServerURL, {}, cc.url.raw('resources/hall/cacert.pem'));
                }
            }else{
                this.io = new WebSocket(AppConfig.ServerURL);
            }

            // this.io = new WebSocket(AppConfig.ServerURL);

            this.io.binaryType = "arraybuffer";
            // cc.log("正在连接服务器:"+AppConfig.ServerURL);
            this.io.onopen = (evt: Event) => {
                cc.log("服务器连接成功");
                this.nTimesReconnect = 0;
                if(!this.tickPing)    this.tickPing = ACTick.newTick(4, this.sendPing, this);
                this.startPing();
                this.loginReq();
                ACM.getEvtMgrIns.dispatch(EventKind.SOCKET_CONNECTED);
            }
            this.io.onmessage = (evt: MessageEvent) => {
                this.onReceiveMessageEvent(evt);
            }
            this.io.onerror = (evt: Event) => {
                cc.log("服务器连接失败");
                this.stopPing();
                // this.reconnect();
            }
            this.io.onclose = (evt: CloseEvent) => {
                cc.log("服务器连接关闭");
                this.stopPing();
                this.reconnect();
                ACM.getEvtMgrIns.dispatch(EventKind.SOCKET_CLOSED);
            }
        }

        private loginReq() :void {
            this.sendMessage(MsgKind.Login, {
                userID: AppConfig.UserID,
                gameID: AppConfig.GameID,
                password: AppConfig.Password
            });
        }

        private tickPing:ACTick;
        private startPing(): void {
            this.tickPing.restart();
        }
        private sendPing() {
            // cc.log("SendPing")
            this.sendMessage(MsgKind.Ping, {});
        }
        private stopPing(): void {
            // cc.log("StopPing")
            if(this.tickPing)    this.tickPing.stop();
        }

        private tickReconnect:ACTick;
        private reconnect() {
            // if(this.timerReconn){
            //     clearTimeout(this.timerReconn);
            //     this.timerReconn = 0;
            // }
            if(StateGame.clientIntInfo.kickedOutByServer)    return;
            if(this.nTimesReconnect>this.nTimesMost) {
                this.closeConn(true);
                ACM.getEvtMgrIns.dispatch(EventKind.EXIT_SERVER_TIMEOUT)
                return
            }
            this.nTimesReconnect ++;
            if(!this.tickReconnect) this.tickReconnect = ACTick.newTick(1, this.initSocket, this, 0);
            this.tickReconnect.restart()
        }

        // public disableReconnect() {
        //     this.io.close();
        //     if(this.timerReconn){
        //         clearTimeout(this.timerReconn);
        //         this.timerReconn = 0;
        //     }
        // }
        

        private generateBuffer(kind: MsgKind, bodyClass:any, data: any){
            const message = bodyClass.create(data);
            const buffer = bodyClass.encode(message).finish();
            // leaf 前两位为协议序号，故需包装一下
            const addTagBuffer = this.protoBufAddTag(kind, buffer);
            // cc.log("*** generateBuffer ***", kind, data);
            return addTagBuffer.buffer;
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
            // cc.log("receive message id = " + id);
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
}

export default AC.SocketClient;