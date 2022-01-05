// const {ccclass, property} = cc._decorator;

/**
 * 场景管理器
 */
import ACM from "./AC/ACCYLHDMain";
import * as Conf from "./CYLHDStateConfig";
import ModelMgr from "./CYLHDModelMgr";
import State from "./CYLHDState";
import * as Com from "./CYLHDStateCommon";
import { GameUtil } from "./CYLHDGameUtils";
import { cylhd_language } from "../language/cylhd_language";
// import gHandler = require("../../../main/common/hqq")



module LHD {
//   @ccclass
export class SceneMgr {
	
	public root: cc.Component;

	public sceneNodes: cc.Node[];
	public sceneScript: string[] = ["CYLHDSceneLoad", "CYLHDSceneLobby", "CYLHDSceneGame"];
	private sceneCurIndex: Com.SceneIndex = null;

	private reconnecting: boolean = false;

	init(cmpRoot:cc.Component, ndLoad:cc.Node, ndLobby:cc.Node, ndGame:cc.Node) {
		this.root = cmpRoot;
		this.sceneNodes = [ndLoad, ndLobby, ndGame];
		this.reconnecting = false;

		ACM.getSocketInst.init();
		new ModelMgr().initModel();
		
		this.registerEvts();

		this.sceneCurIndex = Com.SceneIndex.LOAD;
		if(!cc.isValid(this.getCurSceneScript))return;
		this.getCurSceneScript.enterScene();
	}

	private registerEvts() {
		ACM.getEvtMgrIns.register(Conf.EventKind.SOCKET_CONNECTED, "SceneMgr", this.onSocketConnected.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.SOCKET_CLOSED, "SceneMgr", this.onSocketClosed.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.CHANGE_SCENE, "SceneMgr", this.changeScene.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.TOUCH_BACK_IN_LOAD, "SceneMgr", this.onTouchBackInLoad.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.TOGGLE_LOAD_PAGE, "SceneMgr", this.onToggleLoadPage.bind(this));


		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.LoginR, this.onLoginRes.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.LogoutR, this.onLogoutRes.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.UpdateServiceP, this.onServiceReconnected.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.PauseServiceP, this.onServicePause.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.KickedOutP, this.onKickOut.bind(this));
		
	}

	private onLoginRes(data:any) {
		if(!cc.isValid(this.getCurSceneScript))return;
		State.clientIntInfo.logined = true;
		this.getCurSceneScript.onLogined();
	}
	private onLogoutRes() {

	}
	private onSocketConnected() {
		State.clientIntInfo.onLine = true;
		
		if(this.reconnecting){
			hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "连接成功！");
			this.reconnecting = false;
		}
	}
	private onSocketClosed(data?: any) {
		if(!cc.isValid(this.getCurSceneScript))return;
		State.clientIntInfo.onLine = false;
		State.clientIntInfo.logined = false;

		this.getCurSceneScript.onSocketClosed(data);

		if(!this.reconnecting){
			hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "网络断开，正在努力连接中")
			this.reconnecting = true;
		}
	}
	private onServicePause() {
		State.clientIntInfo.onService = false;
		ACM.getSocketInst.closeConn(true);
		GameUtil.showMessageBox( this.sceneNodes[this.sceneCurIndex] , cylhd_language.getTextByID(17),()=>{ACM.getEvtMgrIns.dispatch(Conf.EventKind.BACK_HALL)},null )
	}
	private onServiceReconnected() {
		State.clientIntInfo.onService = true;
	}
	private onKickOut() {
		hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "账号登录异常")
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.BACK_HALL);
	}

	private onTouchBackInLoad() {
		if(!cc.isValid(this.getCurSceneScript)){
			hqq.logMgr.log("彩源龙虎斗 SceneMgr 没有初始化 强制返回大厅 root=",this.root," sceneCurIndex=",this.sceneCurIndex);
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.BACK_HALL);
			return;
		}
		this.getCurSceneScript.tapBackInLoadPage();
	}
	private onToggleLoadPage(show: boolean) {
		this.getSceneNode(Com.SceneIndex.LOAD).active = show;
	}

	private changeScene(data: any) {
		if(!cc.isValid(this.getCurSceneScript))return;
		this.getCurSceneScript.exitScene();
		this.sceneCurIndex = data;
		this.sceneNodes.forEach((val,ind)=>{
			val.active = ind==this.sceneCurIndex;
		});
		this.getCurSceneScript.enterScene();
	}

	private get getCurSceneScript() {
		if(!cc.isValid(this.sceneNodes[this.sceneCurIndex]))return null;
		const scrName = this.sceneScript[this.sceneCurIndex];
		return this.sceneNodes[this.sceneCurIndex].getComponent(scrName);
	}

	private getSceneNode(index) {
		return this.sceneNodes[index];
	}

	public isInSceneLobby() {
	  	return this.sceneCurIndex==Com.SceneIndex.LOBBY;
	}

	public isInSceneGame() {
	  	return this.sceneCurIndex==Com.SceneIndex.GAME;
	}
	
	destroy() {
		
		if(this.sceneCurIndex == Com.SceneIndex.LOAD) {
			return;
		}
		if(!cc.isValid(this.getCurSceneScript))return;
		this.getCurSceneScript.exitScene();
		
	}
	

}
}

export default new LHD.SceneMgr();