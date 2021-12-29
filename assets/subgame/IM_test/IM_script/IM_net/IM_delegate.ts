
// export interface INetDelegate {
//     loginRequest(): void;
//     logoutRequest(): void;
//     transferInRequest(money: number): void;
//     transferOutRequest(money: number): void;
//     forwardGameRequest(): void;
// }

// export interface ISendDelegate {
//     sendMessage(msgId: msg.MessageKind, msgData: any): void;
// }
export interface ISendDelegate {
    sendMessage(msgId, msgData: any): void;
}

export interface IReceiveDelegate {
    registerCallBack(msgId, func: (msgData: any) => {}): void;
}