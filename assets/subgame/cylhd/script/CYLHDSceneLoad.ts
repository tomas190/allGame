
import ACM from "./AC/ACCYLHDMain";
import * as Conf from "./CYLHDStateConfig"
import * as Com from "./CYLHDStateCommon"
// import gHandler = require("../../../main/common/hqq");
import { GameUtil } from "./CYLHDGameUtils";
import { cylhd_language } from '../language/cylhd_language';

const {ccclass, property} = cc._decorator;
@ccclass
export default class CYLHDSceneLoad extends cc.Component {
    @property(cc.Button)
    btnBack:cc.Button = null;

    @property(cc.Node)
    loadPoke:cc.Node = null;

    private timeStart:number;
    private DurationAni:number = 2000;
    private timeAnimationID:number;

    enterScene() {
        this.node.active = true;
        this.timeStart = new Date().getTime()
    }
    exitScene() {
        this.node.active = false;
        this.clearAnimationTimeoutID()
    }

    tapBackInLoadPage() {
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {type:Com.EAudioType.CLICK});
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.BACK_HALL);
        // ACM.callHallBack();
    }

    onLoad () {
        if(hqq && hqq.isOtherGame) {
            this.btnBack.node.active = false
        }
        GameUtil.loadSpine( this.loadPoke , "language/" + cylhd_language.getCurLanguage() + "/lhd_loading/lhd_loading" , null , "animation" , true );
    }

    onEnable() {
        if(!cc.isValid(this.node))return;
        this.loadPoke.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
    }

    onDisable() {
        if(!cc.isValid(this.node))return;
        this.loadPoke.getComponent(sp.Skeleton).clearTracks();
    }

    onLogined() {
        let t0 = new Date().getTime()
            , t1 = t0 - this.timeStart
            , d = 0
        if(t1<this.DurationAni) {
            d = this.DurationAni - t1
        }

        this.timeAnimationID = setTimeout(()=>{
            ACM.getEvtMgrIns.dispatch(Conf.EventKind.CHANGE_SCENE, Com.SceneIndex.LOBBY);
        }, d)
    }

	onSocketClosed() {
        
	}

    back() {
        this.clearAnimationTimeoutID()
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.TOUCH_BACK_IN_LOAD);
    }

    private clearAnimationTimeoutID() {
        if(this.timeAnimationID)    clearTimeout(this.timeAnimationID)
        this.timeAnimationID = null
    }

}
