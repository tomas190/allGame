
import ACM from "./AC/ACCYLHDMain"
import { msg } from "./proto/CYLHDproto_msg"
import { MsgKind } from "./CYLHDStateConfig"
module LHD {
  export class ReqModel {

    public constructor() {
      ACM.getSocketInst.registerReqModel(MsgKind.Ping, msg.HeartBeatRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.Login, msg.LoginRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.Logout, msg.LogoutRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.JoinRoom, msg.JoinRoomRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.ExitRoom, msg.ExitRoomRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.Bet, msg.BetRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.KeepBet, msg.KeepBetRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.UserRank, msg.UserRankRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.History, msg.HistoryRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.BetRecord, msg.BetRecordRequest);
      ACM.getSocketInst.registerReqModel(MsgKind.RoomRedLimit, msg.RoomRedLimitRequest);
    }
  }
}
export default LHD.ReqModel;