import { IReceiveDelegate } from "./cdx_transmit";
import { msg } from "../proto/proto_cdx_msg";
import { events, EventKind } from "../conf/cdx_event";

const { ccclass } = cc._decorator;

@ccclass
class Receiver {
    private static _instance: Receiver;
    private _delegate: IReceiveDelegate;

    constructor() {

    }

    public static getInstance(): Receiver {
        this._instance || (this._instance = new Receiver());
        return this._instance;
    }

    public init(dg: IReceiveDelegate): void {
        this._delegate = dg;
        // 心跳
        this.register(msg.MessageID.MSG_Pong, this.Pong.bind(this));
        // 登陆成功
        this.register(msg.MessageID.MSG_Login_S2C, this.Login.bind(this));
        // 登出成功
        this.register(msg.MessageID.MSG_Logout_S2C, this.Logout.bind(this));
        // 进入房间
        this.register(msg.MessageID.MSG_JoinRoom_S2C, this.JoinRoom.bind(this));
        // 返回房间
        this.register(msg.MessageID.MSG_EnterRoom_S2C, this.EnterRoom.bind(this));
        // 离开房间
        this.register(msg.MessageID.MSG_LeaveRoom_S2C, this.LeaveRoom.bind(this));
        // 行动数据
        this.register(msg.MessageID.MSG_ActionTime_S2C, this.ActionTime.bind(this));
        // 玩家行动
        this.register(msg.MessageID.MSG_PlayerAction_S2C, this.PlayerAction.bind(this));
        // 注池变化
        this.register(msg.MessageID.MSG_PotChangeMoney_S2C, this.PotChangeMoney.bind(this));
        // 玩家列表更新
        this.register(msg.MessageID.MSG_UptPlayerList_S2C, this.UptPlayerList.bind(this));
        // 结算数据
        this.register(msg.MessageID.MSG_ResultData_S2C, this.ResultData.bind(this));
        // 庄家状态
        this.register(msg.MessageID.MSG_BankerData_S2C, this.BankerData.bind(this));
        // 聊天动画
        this.register(msg.MessageID.MSG_EmojiChat_S2C, this.EmojiChat.bind(this));
        // 桌面玩家
        this.register(msg.MessageID.MSG_SendActTime_S2C, this.SendActTime.bind(this));
    }

    private register(kind: msg.MessageID, func: (data: any) => {}): void {
        this._delegate && this._delegate.registerCallBack(kind, func);
    }
    private Pong(data) {

    }
    private Login(data: msg.ILogin_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_Login, data)
    }
    private Logout(data: msg.ILogout_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_Logout, data)
    }
    private JoinRoom(data: msg.IJoinRoom_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_JoinRoom, data)
    }
    private EnterRoom(data: msg.IEnterRoom_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_EnterRoom, data)
    }
    private LeaveRoom(data: msg.ILeaveRoom_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_LeaveRoom, data)
    }
    private ActionTime(data: msg.IActionTime_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_ActionTime, data)
    }
    private PlayerAction(data: msg.IPlayerAction_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_PlayerAction, data)
    }
    private PotChangeMoney(data: msg.IPotChangeMoney_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_PotChangeMoney, data)
    }
    private UptPlayerList(data: msg.IUptPlayerList_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_UptPlayerList, data)
    }
    private ResultData(data: msg.IResultData_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_ResultData, data)
    }
    private BankerData(data: msg.IBankerData_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_BankerData, data)
    }
    private EmojiChat(data: msg.IEmojiChat_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_EmojiChat, data)
    }
    private SendActTime(data: msg.ISendActTime_S2C) {
        if (data == null) {
            return;
        }
        events.dispatch(EventKind.S2C_SendActTime, data)
    }
    
}

export const initReceiver = (dg: IReceiveDelegate) => {
    Receiver.getInstance().init(dg);
}
