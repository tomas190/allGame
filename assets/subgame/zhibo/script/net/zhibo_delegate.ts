import { msg } from "../proto/ZHIBOproto_msg";

export interface ISendDelegate {
    sendMessage(msgId: msg.SubCommand, msgData: any): void;
}

export interface IReceiveDelegate {
    registerCallBack(msgId: msg.SubCommand, func: (msgData: any) => {}): void;
}