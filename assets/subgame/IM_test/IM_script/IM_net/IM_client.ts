import { app } from "../IM_tools/IM_config";
import { ISendDelegate, IReceiveDelegate } from "./IM_delegate";
import { initSender } from "./IM_send";
import { initReceiver } from "./IM_receive";
let gHandler = require("../../../../base/common/gHandler");
import { events, EventKind } from "../IM_tools/IM_event";
import { mproto } from "../../IM_proto/im_proto_msg";
type IResponseFunc = (mproto: any) => void;
const { ccclass } = cc._decorator;

@ccclass
class Client implements ISendDelegate, IReceiveDelegate {
    private static _instance: Client;
    private io: WebSocket;
    private timer;
    private mapHandler: Map<number, IResponseFunc>;

    constructor() {
        this.timer = 0;
        this.io = undefined;
        this.mapHandler = new Map();
        // const params = new URLSearchParams(window.location.search);
        // if (params.has("iconPath")) {
        //     app.IconPath = params.get("iconPath");
        // }
        // if (params.has("info")) {
        //     const base64 = params.get("info");
        //     const str = window.atob(base64);
        //     const obj = JSON.parse(str);
        //     app.UserID = obj["id"];
        //     app.GameID = obj["game_id"];
        //     app.Password = obj["password"];
        //     app.ServerURL = obj["server_url"];
        // }
        initSender(this);
        initReceiver(this);
    }

    public static getInstance(): Client {
        this._instance || (this._instance = new Client());
        return this._instance;
    }

    /**
     * 初始化webSocket
     * @param callback 初始化socket成功回调：1成功，2失败，3断线，4链接成功
     */
    public init(callback): void {
        if (this.io) {
            callback(4);
            return;
        }
        this.initSocket((success) => {
            callback(success);
        });
    }

    /**
     * 发送协议
     * @param kind 协议名
     * @param data 数据
     */
    public sendMessage(kind, data: any): void {
        if (!this.io) {
            return;
        }
        if (this.io.readyState !== WebSocket.OPEN) {
            return;
        }
        let bodyClass: any;
        switch (kind) {
            //心跳
            case mproto.MessageID.REQ_PING:
                bodyClass = mproto.PING;
                break;
            //登录    
            case mproto.MessageID.REQ_LOGIN:
                bodyClass = mproto.ReqLogin;
                break;
            //会话列表    
            case mproto.MessageID.REQ_CONVERSION_LIST:
                bodyClass = mproto.ReqConversionList;
                break;
            //消息列表    
            case mproto.MessageID.REQ_CHAT_MSG_LIST:
                bodyClass = mproto.ReqMsgList;
                break;
            //发送聊天消息
            case mproto.MessageID.REQ_SEND_CHAT_MSG:
                bodyClass = mproto.ReqSendChatMsg;
                break;
            //消息未读数
            case mproto.MessageID.REQ_GET_UNREAD_NUM:
                bodyClass = mproto.ReqGetUnReadNum;
                break;
            //消息已读
            case mproto.MessageID.REQ_READ_MSG:
                bodyClass = mproto.ReqReadChatMsg;
                break;
            //搜索用户
            case mproto.MessageID.REQ_SEARCH_USER:
                bodyClass = mproto.ReqSearchUser;
                break;
            //查找下级返回
            case mproto.MessageID.REQ_SEARCH_SUB_USER:
                bodyClass = mproto.ReqSearchSubUser;
                break;
            //加载下级列表
            case mproto.MessageID.REQ_GET_SUB_USER_LIST:
                bodyClass = mproto.ReqGetSubUserList;
                break;
            //匹配客服
            case mproto.MessageID.REQ_MATCH_SERVICE:
                bodyClass = mproto.ReqMatchService;
                break;
            //删除会话列表
            case mproto.MessageID.REQ_DELETE_CONVERSION:
                bodyClass = mproto.ReqDeleteConversion;
                break;
            //快捷回复
            case mproto.MessageID.REQ_GET_QUICK_REPLY:
                bodyClass = mproto.ReqGetQuickReplyList;
                break;
            default:
                break;
        }
        const message = bodyClass.create(data);
        const buffer = bodyClass.encode(message).finish();
        // leaf 前两位为协议序号，故需包装一下
        const addTagBuffer = this.protoBufAddTag(kind, buffer);
        this.io.send(addTagBuffer.buffer);
    }

    public registerCallBack(kind, func: IResponseFunc): void {
        this.mapHandler.set(kind, func);
    }

    /**
     * 初始化websocket
     * @param callback 连接成功回调
     */
    private initSocket(callback) {
        if (gHandler.gameGlobal.im_host) {
            let socket = gHandler.gameGlobal.im_host.split("://")[1];
            let header = gHandler.gameGlobal.im_host.split("://")[0];
            let socketHeader = "";
            if (header == "http") {
                socketHeader = "ws://"
            } else if (header == "https") {
                socketHeader = "ws://"
            }
            app.ServerURL = socketHeader + socket;
            this.io = new WebSocket(app.ServerURL);
        } else {
            this.io = new WebSocket(app.ServerURL);
        }

        this.io.binaryType = "arraybuffer";
        console.log("连接服务器:", app.ServerURL);
        this.io.onopen = (evt: Event) => {
            events.dispatch(EventKind.EVENT_ONOPEN, {});
            this.wasColsed = false;
            console.log("服务器连接成功");
            this.startPing();
            callback(1);
            //本地测试
            // this.LoginTest();
            //登陆
            this.login_onclick();
        }
        this.io.onmessage = (evt: MessageEvent) => {
            this.onReceiveMessageEvent(evt);
        }
        this.io.onerror = (evt: Event) => {
            console.log("服务器连接失败");
            callback(2);
            events.dispatch(EventKind.EVENT_ONERROR, { showPromtNetErr: true });
            this.stopPing();
        }
        this.io.onclose = (evt: CloseEvent) => {
            callback(3);
            console.log("client 服务器连接关闭");
            this.stopPing();
            this.wasColsed = true;
            events.dispatch(EventKind.EVENT_ONERROR, { showPromtNetErr: true });
        }
    }
    //接收到的消息
    private onReceiveMessageEvent(evt: MessageEvent): void {
        let retData: { id: number, data: Uint8Array } = this.parseProtoBufId(evt.data);
        let bodyClass: any;
        switch (retData.id) {
            case mproto.MessageID.RESP_PONG:
                bodyClass = mproto.PONG;   //心跳
                break;
            case mproto.MessageID.RESP_LOGIN_RESP: //登录
                bodyClass = mproto.RespLogin;
                break;
            //会话列表
            case mproto.MessageID.RESP_CONVERSION_LIST:
                bodyClass = mproto.RespConversionList;
                break;
            //错误信息
            case mproto.MessageID.MSG_ERR_MSG_PUSH:
                bodyClass = mproto.ErrMsg;
                break;
            //消息列表
            case mproto.MessageID.RESP_CHAT_MSG_LIST:
                bodyClass = mproto.RespChatMsgList;
                break;
            //发送消息成功推送
            case mproto.MessageID.RESP_SEND_CHAT_MSG:
                bodyClass = mproto.RespSendChatMsg;
                break;
            //收到聊天消息
            case mproto.MessageID.PUSH_RECEIVE_CHAT_MSG:
                bodyClass = mproto.PushSendChatMsg;
                break;
            //收到消息未读数
            case mproto.MessageID.RESP_GET_UNREAD_NUM:
                bodyClass = mproto.RespGetUnReadNum;
                break;
            //消息已读成功回调
            case mproto.MessageID.RESP_READ_MSG:
                bodyClass = mproto.RespReadChatMsg;
                break;
            //搜索用户推送
            case mproto.MessageID.RESP_SEARCH_USER:
                bodyClass = mproto.RespSearchUser;
                break;
            //搜索下级
            case mproto.MessageID.RESP_SEARCH_SUB_USER:
                bodyClass = mproto.RespSearchSubUser;
                break;
            //加载下级列表
            case mproto.MessageID.RESP_GET_SUB_USER_LIST:
                bodyClass = mproto.RespGetSubUserList;
                break;
            //人工代充跳转到聊天
            case mproto.MessageID.PUSH_AUTO_ENTER_CONVERSION:
                bodyClass = mproto.PushAutoEnterConversion;
                break;
            //删除会话列表
            case mproto.MessageID.RESP_DELETE_CONVERSION:
                bodyClass = mproto.RespDeleteConversion;
                break;
            //快捷回复
            case mproto.MessageID.RESP_GET_QUICK_REPLY:
                bodyClass = mproto.RespGetQuickReplyList;
                break;
            default:
                break;
        }

        if (!bodyClass) {
            cc.error("bodyClass is undefined: ", retData.id);
            return;
        }

        const gameMsg: any = bodyClass.decode(retData.data);
        const func: IResponseFunc = this.mapHandler.get(retData.id);
        if (func) {
            func(gameMsg);
        }
    }

    login_onclick() {
        let Id = gHandler.gameGlobal.player.id;
        let token = gHandler.gameGlobal.token;
        //id + token的登陆
        if (Id && token) {
            events.dispatch(EventKind.C2S_Login, {
                Id: Id + '',
                token: token + ''
            })
        }
    }

    //登陆
    private LoginTest(): void {
        let data = window.location.href.split("?")[1];
        //客服：444244122 玩家：669072170 208947531 320094916  pre: 444772861 "860385958" 860385958
        // 问题账号：536205017，223591832,737884776 691048221 604958190 956803456 653545707 725508635
        //http://192.168.254.137:7456/?userId=200790275&password=123456
        let userObj = { userId: '200790275', password: '123456' };
        if (data) {
            let userInfoArr = data.split('&');
            for (let i = 0; i < userInfoArr.length; i++) {
                let userInfo = userInfoArr[i];
                if (i == 0) {
                    userObj.userId = userInfo.split('=')[1];
                } else {
                    userObj.password = userInfo.split('=')[1];
                }
            }
        }

        console.log("userObj == ", userObj);

        this.sendMessage(mproto.MessageID.REQ_LOGIN, {
            userId: userObj.userId ? userObj.userId : app.UserID,
            userPassword: userObj.password ? userObj.password : app.Password
        });
    }

    private startPing(): void {
        this.timer = setInterval(() => {
            console.log("心跳    " + mproto.MessageID.REQ_PING);
            this.sendMessage(mproto.MessageID.REQ_PING, { time: new Date().getTime() });
        }, 3000);
    }


    idTimerReconnect = null;

    reConnectTime = 0;

    wasColsed = false;

    private stopPing(reconnect: boolean = true): void {

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        console.log("this.reConnectTime == ", this.reConnectTime);

        if (reconnect) {
            if (this.reConnectTime >= 30) {
                return;
            }
            console.log("reconnect == ", reconnect);
            console.log("this.reConnectTime == ", this.reConnectTime);
            if (this.idTimerReconnect == null) {
                this.idTimerReconnect = setTimeout(() => {
                    this.initSocket(() => {
                    });
                    this.idTimerReconnect = null;
                }, 1000);
            }
        }
    }

    //断开链接
    public closeWebsocketConnect() {
        if (this.io) {
            if (!this.wasColsed) {
                this.io.close(3001, '离开IM大厅!');
            }
            this.io.onclose = this.io.onopen = this.io.onmessage = this.io.onerror = null;
            this.io = null;
        }

        clearTimeout(this.idTimerReconnect);

        this.stopPing(false);
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

export const initWebSocket = (callback) => {
    Client.getInstance().init((success) => {
        callback(success);
    });
}

export const closeWebSocket = () => {
    Client.getInstance().reConnectTime = 30;
    Client.getInstance().closeWebsocketConnect();
}

export const resetConnetTime = () => {
    Client.getInstance().reConnectTime = 0;
}