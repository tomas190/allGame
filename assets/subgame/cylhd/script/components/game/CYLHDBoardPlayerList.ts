//  在线用户排名弹窗
import ACM from "../../AC/ACCYLHDMain";
import * as Conf from "../../CYLHDStateConfig";
import * as Com from "../../CYLHDStateCommon";
// import StateTools from "../../LHDStateTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDBoardPlayerList extends cc.Component {
	
	@property(cc.Prefab)
	itemList:cc.Prefab = null;

	@property(cc.Node)
	listUsers:cc.Node = null;

	@property(cc.Node)
	aniRotate:cc.Node = null;

	@property(cc.ScrollView)
	scrollList:cc.ScrollView = null;

	show(roomNum:string) {
		this.node.active = true;
		this.toggleAniRotate(true);
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.UserRankR, this.receiveData.bind(this));
		this.req(roomNum);
	}

	hide() {
		this.toggleAniRotate(false);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.UserRankR)
		this.node.active = false;
	}


	private req(roomNum:string) {
		ACM.getSocketInst.sendMessage(Conf.MsgKind.UserRank, {roomNumber: roomNum});
	}
	private receiveData(data:any) {
		this.toggleAniRotate(false);
		this.renderList(data.Users);
	}

	private renderList(data:any){
		if(!cc.isValid(this.node))return;
		this.scrollList.scrollToTop()
		this.listUsers.removeAllChildren();
		
		for(var i=0; i<data.length; i++) {
		    var if0 = data[i];
		    var cmp = cc.instantiate(this.itemList);
			cmp.getComponent("CYLHDPlayerListItem").init(i, if0);
		    this.listUsers.addChild(cmp);
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
