
import ACM from "./AC/ACCYLHDMain";
import SceneMgr from "./CYLHDSceneMgr";
// import { Evts } from "./LHDStateConfig";
import AudioMgr from "./CYLHDAudioMgr";
import * as Conf from "./CYLHDStateConfig";
import * as Com from "./CYLHDStateCommon";

const {ccclass, property} = cc._decorator;
@ccclass
export default class CYLHDMain extends cc.Component {

	@property(cc.Node)
	load: cc.Node = null;

	@property(cc.Node)
	lobby: cc.Node = null;

	@property(cc.Node)
	game: cc.Node = null;

	@property(cc.Prefab)
	prefTip: cc.Prefab = null;

	@property(cc.Node)
	popExit: cc.Node = null;

	private audioMgr:AudioMgr;

	onLoad () {
		// this.node.on(Conf.Evts.TOGGLE_LOAD+'', this.togglePageLoad, this);
		// this.node.on(Conf.Evts.LEAVE_GAME+'', this.leaveGame, this);
		if( hqq.eventMgr ){
            if(hqq.eventMgr.refreshHallChongFuDenLu ){
                hqq.eventMgr.register( hqq.eventMgr.refreshHallChongFuDenLu , "CYLHDMain" , this.backHall.bind(this) );
            }
        }
	}

	start () {
		ACM.init(this);
		this.audioMgr = new AudioMgr();
		this.registerEvts();
		SceneMgr.init(this, this.load, this.lobby, this.game);
		cc.log( "version=" , Conf.AppConfig.Version );
	}

	private togglePageLoad(s:boolean) {
		this.load.active = s;
	}

	// update (dt) {}
	private registerEvts() {

		ACM.getEvtMgrIns.register(Conf.EventKind.POP_MSG, "CYLHDMain", this.popMsg.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.BACK_HALL, "CYLHDMain", this.backHall.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.TO_PAY_SCENE, "CYLHDMain", this.toPayScene.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.EXIT_SERVER_TIMEOUT, "CYLHDMain", this.exitServerTimeout.bind(this));

		cc.game.on(cc.game.EVENT_HIDE,()=>{
			if( ACM.getSocketInst )
			{
				ACM.getSocketInst.closeConn(true,false);
			}
		})
		cc.game.on(cc.game.EVENT_SHOW,()=>{
			if( ACM.getSocketInst )
			{
				ACM.getSocketInst.init();
			}
		})
	}

	private backHall() {
		SceneMgr.destroy();
		ACM.destroy("hall");
		// cc.log("backHall")
	}

	private toPayScene() {
		SceneMgr.destroy();
		ACM.destroy("pay");
	}

	private exitServerTimeout() {
		this.popExit.active = true;
	}

	onDestroy(){
		cc.game.off(cc.game.EVENT_HIDE );
        cc.game.off(cc.game.EVENT_SHOW );
		cc.log("onDestroy-LHD")

		if( hqq.eventMgr ){
            if(hqq.eventMgr.refreshHallChongFuDenLu ){
                hqq.eventMgr.unregister( hqq.eventMgr.refreshHallChongFuDenLu , "CYLHDMain" );
            }
        }
	}

	private popMsg(msg) {
		if(msg=="")		return;
		if(!cc.isValid(this.node))return;
		const p = cc.instantiate(this.prefTip);
		p.getComponent("CYLHDTipMsg").init(msg);
		this.node.addChild(p);
	}


	stopTouchPropgration() {

	}
}
