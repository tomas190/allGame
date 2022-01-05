import { IReceiveDelegate } from "./zhibo_delegate";
import { msg } from "../proto/ZHIBOproto_msg";
import { events, EventKind } from "../tools/zhibo_event";

const { ccclass } = cc._decorator;

@ccclass
class Receiver {
    private static instance: Receiver;
    private delegate: IReceiveDelegate;

    constructor() {
    }

    public static getInstance(): Receiver {
        this.instance || (this.instance = new Receiver());
        return this.instance;
    }

    public init(dg: IReceiveDelegate): void {
        this.delegate = dg;
        this.register(msg.SubCommand.EnumSubLoginResp, this.loginR.bind(this));
    }

    private register(kind: msg.SubCommand, func: (data: any) => {}): void {
        this.delegate && this.delegate.registerCallBack(kind, func);
    }

    private loginR(data: msg.LoginResp): void {
        events.dispatch(EventKind.S2C_Login, data);
    }
}

export const initReceiver = (dg: IReceiveDelegate) => {
    Receiver.getInstance().init(dg);
}