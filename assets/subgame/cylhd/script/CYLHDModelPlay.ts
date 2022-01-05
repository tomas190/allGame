
import ACM from "./AC/ACCYLHDMain"
import { msg } from "./proto/CYLHDproto_msg"
import * as Conf from "./CYLHDStateConfig"
import State from "./CYLHDState";
// import StateTools from "./CYLHDStateTools";
// import SceneMgr from "./CYLHDSceneMgr";
import * as StateCommon from "./CYLHDStateCommon";
// import Utils from "./AC/ACLHDUtils";
import { cylhd_language } from "../language/cylhd_language";

module LHD {
export class ModelPlay {

	constructor() {
		this.registerModel();
	}
	private registerModel() {
		ACM.getSocketInst.registerResModel(Conf.MsgKind.JoinRoomR, msg.JoinRoomResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.ExitRoomR, msg.ExitRoomResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.BetR, msg.BetResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.KeepBetR, msg.KeepBetResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.HistoryR, msg.HistoryResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.RoundPlayInfoP, msg.RoundPlayInfoPush, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.RoomListLobbyP, msg.RoomListLobbyPush, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.BetP, msg.BetPush, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.ResultRoundP, msg.ResultRoundPush, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.UserRankR, msg.UserRankResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.BetRecordR, msg.BetRecordResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.CancelRoundP, msg.CancelRoundPush, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.RoomRedLimitR, msg.RoomRedLimitResponse, this.execute);
		ACM.getSocketInst.registerResModel(Conf.MsgKind.ZhiBoUpdateBalanceP, msg.ZhiBoUpdateBalancePush, this.execute);
	}

	private execute(kind: Conf.MsgKind, dt:any) {
		// State.myComInfo.balance = 10000;//dt.balance
		// Utils.adjustTimeStamp(dt.serverTime);
		let l = true
		if(dt.code!=Conf.ErrCode.SUCCESS && kind!=Conf.MsgKind.ZhiBoUpdateBalanceP ) {// 错误提示，有些过滤自定义
			if(kind==Conf.MsgKind.KeepBetR) {
				ACM.getEvtMgrIns.dispatch(Conf.EventKind.POP_MSG, "续投失败");
			} else 
				ACM.getEvtMgrIns.dispatch(Conf.EventKind.POP_MSG, cylhd_language.getTextByID(dt.code));
		} else
		switch(kind) {
			case Conf.MsgKind.JoinRoomR:
				var infoRound = dt.roundInfo;
				State.myComInfo.roomNumber = infoRound.roomNumber;

				State.roomPlayInfo.arrUserInfoDesk = infoRound.usersOnDesk;
				State.roomPlayInfo.roundID = infoRound.roundID;
				State.roomPlayInfo.startTimeOfRound = infoRound.startTime;
				State.roomPlayInfo.infoBetsMeRound = infoRound.infoBetMe;
				State.roomPlayInfo.infoBetsAllRound = infoRound.infoBetAll;
				State.roomPlayInfo.luckyNum = infoRound.luckyNum
				State.roomPlayInfo.luckyNumLastRound = infoRound.luckyNumLastRound;

				State.updateMyPositionSelect(infoRound.infoBetMe)
				break;
			case Conf.MsgKind.ExitRoomR:
				State.myLocalPlayInfo.myKeepBetInfo = [];
				State.myLocalPlayInfo.sumLatestBet = 0;
				break;
			case Conf.MsgKind.KeepBetR:
			case Conf.MsgKind.BetR:
				State.myComInfo.balance = dt.balance;
				State.myComInfo.lockMoney = dt.lockMoney;
				break;
			case Conf.MsgKind.RoundPlayInfoP:
				// State.clearMyBetInfo();
				
				State.myComInfo.roomNumber = dt.roomNumber;
				State.roomPlayInfo.numsLuckyRecent7 = dt.historyLucky;
				State.roomPlayInfo.arrUserInfoDesk = dt.usersOnDesk;
				State.roomPlayInfo.roundID = dt.roundID;
				State.roomPlayInfo.startTimeOfRound = dt.startTime;
				State.roomPlayInfo.infoBetsMeRound = dt.infoBetMe;
				State.roomPlayInfo.infoBetsAllRound = dt.infoBetAll;
				State.roomPlayInfo.luckyNum = dt.luckyNum;
				State.roomPlayInfo.luckyNumLastRound = dt.luckyNumLastRound;

				State.updateMyPositionSelect(dt.infoBetMe)

				ACM.getEvtMgrIns.dispatch(Conf.EventKind.REFRESH_POP_BANKER_LIST);
				break;
			case Conf.MsgKind.RoomListLobbyP:
				State.roomListInfo = dt.rooms;
				break;
			case Conf.MsgKind.BetP:
				State.pushInfoBetsAll(dt.info);
				if(State.isMyID(dt.userID)) State.pushMyBetInfo(dt.info);
				else l = false
				State.updateBanlanceAnyUserOnDeskOrMe(dt.userID, dt.balance, dt.lockMoney);
				break;
			case Conf.MsgKind.ResultRoundP:
				// State.saveInfoToKeeptBet();
				State.roomPlayInfo.luckyNum = dt.luckyNum;
				State.roundUserOffset.myOffset = dt.offsetMe;
				State.roundUserOffset.usersDeskOffset = dt.offsetUsersDesk;
				State.roomPlayInfo.roundState = StateCommon.RoundState.SHOW_PRIZE
				
				// if(State.roomPlayInfo.numsLuckyRecent7.length>71)	State.roomPlayInfo.numsLuckyRecent7 = [];
				// State.roomPlayInfo.numsLuckyRecent7.push(dt.luckyNum);
				break;
			case Conf.MsgKind.UserRankR:
				break;
			case Conf.MsgKind.HistoryR:
				break
			case Conf.MsgKind.BetRecordR:
				break;
			case Conf.MsgKind.CancelRoundP:
				State.clearMyBetInfo()
				State.unlockAllUserBetMoney()
				State.roomPlayInfo.infoBetsMeRound = []
				State.roomPlayInfo.infoBetsAllRound = []
				State.issueIDCancelRound = dt.issueID
				break;
			case Conf.MsgKind.ZhiBoUpdateBalanceP:
				break;
		}
		// if(l) cc.log("S->C", kind, JSON.stringify(dt))
		// else cc.log("****************** S->C ", kind, dt.info.val)
		ACM.getSocketInst.notifyEvtModel(kind, dt);
  	}

}
}
export default LHD.ModelPlay;