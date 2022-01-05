
import EventMgr from "./ACCYLHDEventMgr";
import SocketClient from "./ACCYLHDSocketClient";
import Tick from "./ACCYLHDTick";
import * as Conf from "../CYLHDStateConfig";
// import gHandler = require("../../../../main/common/gHandler")
import Utils from "./ACCYLHDUtils";
import State from "../CYLHDState";
module AC {
  export class LHDMain {

	private static socketInst:SocketClient;
	private static evtInst:EventMgr;

	static init(cmp:cc.Component) {
		this.setScheduleFunc(cmp);
		this.evtInst = new EventMgr();
		this.socketInst = new SocketClient();
		
		var playerInfoFromHall = hqq.gameGlobal.player;
		if(playerInfoFromHall.account_name!=0 && !hqq.isDebug) {//Conf.AppConfig.IsDebug hqq.isDebug
			this.setAccountInfo();
			var urlFromLobby = hqq.subGameList.cylhd.serverUrl;
			if(urlFromLobby && urlFromLobby!="") {
				Conf.AppConfig.ServerURL = urlFromLobby;
			}
		} 
		else {
			var ps = Utils.paramUrl();
			if(ps['uid']) {// && ps['psw']
				Conf.AppConfig.UserID = Number(ps['uid']);
				// Conf.AppConfig.Password = ps['psw'];
			} else {
				var ran = parseInt(localStorage.getItem("UserInd") || "-1");// Math.floor(Math.random()*Conf.AppConfig.DevAccount.length);
				ran = (ran+1)%Conf.AppConfig.DevAccount.length;
				Conf.AppConfig.UserID = Conf.AppConfig.DevAccount[ran];
				// Conf.AppConfig.Password = Conf.AppConfig.DevAccountPsw[ran];
				localStorage.setItem("UserInd", ran+"");
			}
		}
		hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "cylhd", this.setPlayerInfo.bind(this))
		hqq.eventMgr.register(hqq.eventMgr.refreshBgState, "cylhd", this.bgStateChange.bind(this))
		
		if(hqq.audioMgr.getBgState)
			Conf.AppConfig.AUDIO_SWITCH = hqq.audioMgr.getBgState();
		// setTimeout(()=>{
		// 	this.setPlayerInfo({id:128222027, token:"123456"})
		// }, 8000);
	}

	private static setAccountInfo() {
		var playerInfoFromHall = hqq.gameGlobal.player;
		Conf.AppConfig.UserID = playerInfoFromHall.id;
		Conf.AppConfig.Password = hqq.gameGlobal.token;
		Conf.AppConfig.HeadUrl = playerInfoFromHall.headurl;
		Conf.AppConfig.UserName = playerInfoFromHall.nick;
	}

	private static setPlayerInfo(msg) {
		if(msg && msg.id != Conf.AppConfig.UserID) {
			Conf.AppConfig.UserID = msg.id;
			Conf.AppConfig.Password = msg.token;
			this.socketInst.closeConn(false);
		}
	}

	private static bgStateChange(bgIsOpen) {
		if(Conf.AppConfig.AUDIO_SWITCH == bgIsOpen) 	return;
		this.evtInst.dispatch(Conf.EventKind.SWITCH_AUDIO);
	}

	private static setScheduleFunc(cm:cc.Component) {
		Tick.schedule = cm.schedule.bind(cm);
		Tick.scheduleOnce = cm.scheduleOnce.bind(cm);
		Tick.unschedule = cm.unschedule.bind(cm);
		Tick.unscheduleAllCallbacks = cm.unscheduleAllCallbacks.bind(cm);
	}

	static callHallNotice(){
		hqq.eventMgr.dispatch(hqq.eventMgr.showNotice, null) // 显示公告界面
	}
	static callHallRegister(){
	  	hqq.eventMgr.dispatch(hqq.eventMgr.showRegister, null) // 显示免费金币界面
	}
	static callHallPerson(){
	  	hqq.eventMgr.dispatch(hqq.eventMgr.showPerson, null) // 显示个人设置界面
	}
	static callHallPay(){
		hqq.eventMgr.dispatch(hqq.eventMgr.showPayScene, hqq.subGameList["cylhd"].lanchscene)
		//cc.director.loadScene(hqq.subModel.cash.lanchscene); // 跳转充提场景
	}
	static callHallBack(){// 返回大厅
		if(hqq.gameGlobal.zhibo)
        {
            if(hqq.gameGlobal.zhibo.GameCode=="cylhd" && hqq.gameGlobal.zhibo.RoomCode == State.myComInfo.roomNumber )
            {
                hqq.eventMgr.dispatch(hqq.eventMgr.showZhiBoPanel, false );
				hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene, "zhibo");
				return;
            }
        }
		cc.director.loadScene(hqq.hallConfig.lanchscene);
	}

	static destroy(backScene) {
		hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "cylhd");
		hqq.eventMgr.unregister(hqq.eventMgr.refreshBgState, "cylhd");
		this.getSocketInst.closeConn(true);
		this.evtInst.clearAllEvt();
		Tick.unscheduleAllCallbacks();
		
		this.evtInst = null;
		this.socketInst = null;

		if(backScene=="hall")
			this.callHallBack()
		else if(backScene=="pay")
			this.callHallPay()
	}

	static get getSocketInst() {
	  	return this.socketInst;
	}

	static get getEvtMgrIns() {
	  	return this.evtInst;
	}


  }
}

export default AC.LHDMain;