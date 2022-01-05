//  在线用户排名弹窗
import ACM from "../../AC/ACCYLHDMain";
import * as Conf from "../../CYLHDStateConfig";
import * as Com from "../../CYLHDStateCommon";
// import StateTools from "../../LHDStateTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDBoardBetRecord extends cc.Component {
	
	@property(cc.Prefab)
	itemList:cc.Prefab = null;

	@property(cc.Node)
	listUsers:cc.Node = null;

	@property(cc.Node)
	aniRotate:cc.Node = null;

	@property(cc.ScrollView)
	scrollList:cc.ScrollView = null;

	show() {
		this.node.active = true;
		this.toggleAniRotate(true);
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.BetRecordR, this.receiveData.bind(this));
		this.req();
	}

	hide() {
		if(!this.node.active)	return
		this.unscheduleAllCallbacks();
		this.toggleAniRotate(false)
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.BetRecordR)
		this.listUsers.removeAllChildren();
		this.node.active = false
	}


	private req() {
		ACM.getSocketInst.sendMessage(Conf.MsgKind.BetRecord, {});
	}
	private receiveData(data:any) {
		this.toggleAniRotate(false);
		this.renderList(data.list);
	}

	private renderList(data:any){
		if(!cc.isValid(this.node))return;
		this.scrollList.scrollToTop(0)
		this.listUsers.removeAllChildren()
		const s = data.length
		for(let i=0; i<data.length; i++) {
			this.scheduleOnce(()=>{
				if(!cc.isValid(this.node))return;
				let if0 = data[i];
				let cmp = cc.instantiate(this.itemList);
				cmp.getComponent("CYLHDBetRecordItem").init(i, s, if0);
				this.listUsers.addChild(cmp);
			},i*0.01)
		}
	}
	


	onTouchBtnClose() {
		this.hide();
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: Com.EAudioType.CLICK });
	}


	private toggleAniRotate(s:boolean) {
		if(!cc.isValid(this.node))return;
		this.aniRotate.active = s;
		if(s) {
			this.aniRotate.getComponent(sp.Skeleton).setAnimation(0, "ani_load", true);
		} else {
			this.aniRotate.getComponent(sp.Skeleton).clearTracks();
		}
	}



}
