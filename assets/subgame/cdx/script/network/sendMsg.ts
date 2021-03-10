/*
 * @Descripttion: gamelogic
 * @Author: Palos
 * @Date: 2019-09-05 14:38:56
 * @LastEditors: Palos
 * @LastEditTime: 2019-11-26 13:13:46
 */
import { ISendDelegate } from "./transmit";
import { events, EventKind } from "../conf/event";
import { msg } from "../proto/proto_cdx_msg";

const { ccclass } = cc._decorator;

@ccclass
class Sender {
    private static _instance: Sender;
    private _delegate: ISendDelegate;

    constructor() {
        // URLSearchParams
    }

    public static getInstance(): Sender {
        this._instance || (this._instance = new Sender());
        return this._instance;
    }

    public init(dg: ISendDelegate): void {
        this._delegate = dg;
        events.register(EventKind.C2S_Login, "sendMsg", this.Login.bind(this));
        events.register(EventKind.C2S_Logout, "sendMsg", this.Logout.bind(this));
        events.register(EventKind.C2S_JoinRoom, "sendMsg", this.JoinRoom.bind(this));
        events.register(EventKind.C2S_LeaveRoom, "sendMsg", this.LeaveRoom.bind(this));
        events.register(EventKind.C2S_PlayerAction, "sendMsg", this.PlayerAction.bind(this));
        events.register(EventKind.C2S_BankerData, "sendMsg", this.BankerData.bind(this));
        events.register(EventKind.C2S_EmojiChat, "sendMsg", this.EmojiChat.bind(this));
    }

    // 发送登陆
    private Login(data) {
        this.send(msg.MessageID.MSG_Login_C2S, data)
    }
    // 发送登出
    private Logout(data) {
        this.send(msg.MessageID.MSG_Logout_C2S, data)
    }
    // 发送进入房间
    private JoinRoom(data) {
        this.send(msg.MessageID.MSG_JoinRoom_C2S, data)
    }
    // 发送离开房间
    private LeaveRoom(data) {
        this.send(msg.MessageID.MSG_LeaveRoom_C2S, data)
    }
    // 发送玩家行动
    private PlayerAction(data) {
        this.send(msg.MessageID.MSG_PlayerAction_C2S, data)
    }
    // 发送庄家状态
    private BankerData(data) {
        this.send(msg.MessageID.MSG_BankerData_C2S, data)
    }
    // 发送聊天动画
    private EmojiChat(data) {
        this.send(msg.MessageID.MSG_EmojiChat_C2S, data)
    }
    // 发送数据
    private send(msgId: msg.MessageID, data: any) {
        console.log("发送数据:", msgId, data)
        this._delegate && this._delegate.sendMessage(msgId, data);
    }
}

export const initSender = (dg: ISendDelegate) => {
    Sender.getInstance().init(dg);
}
