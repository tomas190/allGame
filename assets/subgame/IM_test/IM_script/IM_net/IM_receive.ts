import { IReceiveDelegate } from "./IM_delegate";
import { events, EventKind } from "../IM_tools/IM_event";
import { mproto } from "../../IM_proto/im_proto_msg";
import { data } from "../../../../main/app/hotUpdateMgr";

const { ccclass } = cc._decorator;

@ccclass
class Receiver {
    private static _instance: Receiver;
    private _delegate: IReceiveDelegate;
    private _object: any;
    constructor() {

    }

    public static getInstance(): Receiver {
        this._instance || (this._instance = new Receiver());
        return this._instance;
    }

    public init(dg: IReceiveDelegate): void {
        this._delegate = dg;
        //收到登入房间成功
        this.register(mproto.MessageID.RESP_LOGIN_RESP, this.loginR.bind(this));
        //pong
        this.register(mproto.MessageID.RESP_PONG, this.pong.bind(this));
        //房间列表
        this.register(mproto.MessageID.RESP_CONVERSION_LIST, this.conversionList.bind(this));
        //发送消息成功回调
        this.register(mproto.MessageID.RESP_SEND_CHAT_MSG, this.receiveSendChatMsg.bind(this));
        //聊天列表
        this.register(mproto.MessageID.RESP_CHAT_MSG_LIST, this.receiveChatMsgList.bind(this));
        //错误消息
        this.register(mproto.MessageID.MSG_ERR_MSG_PUSH, this.onError.bind(this));
        //收到聊天消息
        this.register(mproto.MessageID.PUSH_RECEIVE_CHAT_MSG, this.receiveChatMsg.bind(this));
        //收到消息未读数
        this.register(mproto.MessageID.RESP_GET_UNREAD_NUM, this.receiveUnReadNumAction.bind(this));
        //消息已读
        this.register(mproto.MessageID.RESP_READ_MSG, this.receiveReadMsgAction.bind(this));
        //搜索用户回调
        this.register(mproto.MessageID.RESP_SEARCH_USER, this.searchUserBackAction.bind(this));
        //搜索下级用户
        this.register(mproto.MessageID.RESP_SEARCH_SUB_USER, this.searchSubUserAction.bind(this));
        //加载下级用户列表
        this.register(mproto.MessageID.RESP_GET_SUB_USER_LIST, this.loadSubUserList.bind(this));
        //人工代充
        this.register(mproto.MessageID.PUSH_AUTO_ENTER_CONVERSION, this.pushAutoEnterConversion.bind(this));
        //删除会话列表
        this.register(mproto.MessageID.RESP_DELETE_CONVERSION, this.respDeleteConversion.bind(this));
        //快捷回复
        this.register(mproto.MessageID.RESP_GET_QUICK_REPLY,this.getQuickReplyList.bind(this));
    }
    private register(kind, func: (data: any) => {}): void {
        this._delegate && this._delegate.registerCallBack(kind, func);
    }

    //pong回调
    private pong(data): void {
        // cc.log('pongData == ', data);
    }
    //登录回调
    private loginR(data: mproto.RespLogin): void {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_Login, data.userInfo);
    }
    //房间列表
    private conversionList(data): void {
        // console.log("conversionList: ", data);
        events.dispatch(EventKind.S2C_Conversionlist, data);
    }

    //发送聊天消息成功 receiveSendChatMsg
    private receiveSendChatMsg(data): void {
        // console.log("发送聊天消息成功回调： ", data);
        events.dispatch(EventKind.S2C_SEND_CHAT_MSG, data);

    }

    //收到消息推送
    private receiveChatMsg(data): void {
        // console.log("收到消息：", data);
        events.dispatch(EventKind.S2C_RECEIVE_CHAT_MSG, data);
    }

    //聊天列表
    private receiveChatMsgList(data): void {
        // console.log("聊天列表：", data);
        events.dispatch(EventKind.S2C_CHAT_MSG_LIST, data);
    }

    //收到消息未读数
    private receiveUnReadNumAction(data): void {
        // console.log("消息未读数：", data);
        events.dispatch(EventKind.S2C_GET_UNREAD_NUM, data);
    }

    //消息已读成功
    private receiveReadMsgAction(data): void {
        events.dispatch(EventKind.S2C_READ_MSG, data);
    }
    //搜索用户成功
    private searchUserBackAction(data): void {
        events.dispatch(EventKind.S2C_SEARCH_USER, data);
    }
    //搜索下级用户返回
    private searchSubUserAction(data): void {
        events.dispatch(EventKind.S2C_SEARCH_SUB_USER, data);
    }
    //加载下级用户列表
    private loadSubUserList(data): void {
        events.dispatch(EventKind.S2C_GET_SUB_USER_LIST, data);
    }
    //人工代充推送
    private pushAutoEnterConversion(data): void {
        events.dispatch(EventKind.PushAutoEnterConversion, data);
    }

    //删除会话列表
    private respDeleteConversion(data: mproto.IRespDeleteConversion): void {
        events.dispatch(EventKind.S2C_RESP_DELETE_CONVERSION, data);
    }

    //收到快速回复列表
    private getQuickReplyList(data: mproto.IRespGetQuickReplyList): void {
        events.dispatch(EventKind.S2C_RESP_GET_QUICK_REPLY,data);
    }

    //失败回调
    private onError(data): void {
        events.dispatch(EventKind.S2C_MSG_ERR_MSG_PUSH, data);

    }
}

export const initReceiver = (dg: IReceiveDelegate) => {
    Receiver.getInstance().init(dg);
}
