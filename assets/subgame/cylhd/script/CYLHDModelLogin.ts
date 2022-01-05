
import ACM from "./AC/ACCYLHDMain"
import { msg } from "./proto/CYLHDproto_msg"
import { EventKind, StatusCode, MsgKind } from "./CYLHDStateConfig"
import State from "./CYLHDState";
import * as Conf from "./CYLHDStateConfig";
import Utils from "./AC/ACCYLHDUtils";

module LHD {

  export class ModelLogin {

	constructor() {
	  	this.registerModel();
	}
	private registerModel() {
		ACM.getSocketInst.registerResModel(MsgKind.Pong, msg.HeartBeatResponse, this.execute.bind(this));
		ACM.getSocketInst.registerResModel(MsgKind.LoginR, msg.LoginResponse, this.execute.bind(this));
		ACM.getSocketInst.registerResModel(MsgKind.LogoutR, msg.LogoutResponse, this.execute.bind(this));

		ACM.getSocketInst.registerResModel(MsgKind.UpdateBalanceP, msg.UpdateBalancePush, this.execute.bind(this));
		ACM.getSocketInst.registerResModel(MsgKind.UpdateServiceP, msg.UpdateServicePush, this.execute.bind(this));
		ACM.getSocketInst.registerResModel(MsgKind.PauseServiceP, msg.PauseServicePush, this.execute.bind(this));
		ACM.getSocketInst.registerResModel(MsgKind.KickedOutP, msg.KickedOutPush, this.execute.bind(this));
	}

	private execute(kind: MsgKind, data:any) {
		// cc.log("LoginModel-execute:",kind, data);
		Utils.adjustTimeStamp(data.serverTime);
		if(data.code != StatusCode.SUCCESS){
			cc.warn("LoginModel,", kind, data.code);
			return;
		}
		switch(kind) {
			case MsgKind.Pong:
				break;
			case MsgKind.LoginR:
				var userInfo = data.user;
				Conf.AppConfig.HeadUrl = userInfo.headUrl;
				State.myComInfo = {
					userID: userInfo.userID,
					userName: userInfo.userName,
					balance: userInfo.balance,
					lockMoney: userInfo.lockMoney,
					roomNumber: userInfo.roomNumber,
				};
				State.serverInfo.taxPt = data.taxPt;
				State.clientIntInfo.logined = true;
				break;
			case MsgKind.LogoutR:
				State.clientIntInfo.logined = false;


				break;
			case MsgKind.UpdateBalanceP:
				var uid = data.userID
				if(State.isMyID(uid)) {
					State.myComInfo.balance = data.balance;
					State.myComInfo.lockMoney = data.lockMoney;
				}
				var arrU = State.roomPlayInfo.arrUserInfoDesk;
				for(var i=0,l=arrU.length; i<l; i++) {
					var u = arrU[i];
					if(u.userID!=uid) continue;
					u.balance = data.balance;
					u.lockMoney = data.lockMoney
					break;
				}
				break;
			case MsgKind.UpdateServiceP:
				
				break;
			case MsgKind.PauseServiceP:

				break;
			case MsgKind.KickedOutP:
				State.clientIntInfo.kickedOutByServer = true;
				State.clientIntInfo.logined = false;
				// 显示提示控件
				// var pop = new PopMsgClose();
				// pop.show("您的账号在其它地方登陆！")
				break;
			default:
				cc.warn("未注册-LoginModel", kind);
				return;
		}
		ACM.getSocketInst.notifyEvtModel(kind, data);
	}

  }
}
export default LHD.ModelLogin;