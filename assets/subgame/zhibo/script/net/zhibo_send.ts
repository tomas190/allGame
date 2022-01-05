import { ISendDelegate } from "./zhibo_delegate";
import { app } from "../tools/zhibo_config";
import { msg } from "../proto/ZHIBOproto_msg";
import { events, EventKind } from "../tools/zhibo_event";

const { ccclass } = cc._decorator;

@ccclass
class Sender {
    private static instance: Sender;
    private delegate: ISendDelegate;

    constructor() {

    }

    public static getInstance(): Sender {
        this.instance || (this.instance = new Sender());
        return this.instance;
    }

    public init(dg: ISendDelegate): void {
        this.delegate = dg;
        events.register(EventKind.C2S_Login, "send", this.loginRequest.bind(this));
        events.register(EventKind.C2S_FrontEndLog, "send", this.frontEndLog.bind(this));
    }

    public clear(): void {
        this.delegate = undefined;
        events.unregister(EventKind.C2S_Login, "send");
        events.unregister(EventKind.C2S_FrontEndLog, "send");
    }

    private loginRequest(): void {
        this.send(msg.SubCommand.EnumSubLoginReq, msg.LoginReq.create({
            userID:+app.UserID,
            userName:app.UserID,
            userAvatar:app.imgUrl,
        }));
    }

    private frontEndLog(code: number,description: string): void{
        this.send(msg.SubCommand.EnumSubFrontEndLog,msg.FrontEndLog.create({
            code: code,
            description:description
        }));
    }

    private send(mId: msg.SubCommand, data: any): void {
        this.delegate && this.delegate.sendMessage(mId, data);
    }
}

export const initSender = (dg: ISendDelegate) => {
    Sender.getInstance().init(dg);
}
export const clearSender = () => {
    Sender.getInstance().clear();
}