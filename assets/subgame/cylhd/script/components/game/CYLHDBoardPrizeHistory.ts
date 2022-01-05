//  在线用户排名弹窗
import ACM from "../../AC/ACCYLHDMain";
import * as Conf from "../../CYLHDStateConfig";
import * as Com from "../../CYLHDStateCommon";
import State from "../../CYLHDState";
// import StateTools from "../../LHDStateTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDBoardPrizeHistory extends cc.Component {
	
	@property(cc.Prefab)
	itemList:cc.Prefab = null;

	@property(cc.Node)
	listUsers:cc.Node = null;

	@property(cc.Node)
	aniRotate:cc.Node = null;

	@property(cc.ScrollView)
	scrollList:cc.ScrollView = null;

	@property(cc.RichText)
	prizeAnchor:cc.RichText = null;

	private anchors = ["http://draw.vietlotto.org", "https://77tj.online/tencent","https://www.canadasuperdraw.com/canada30s/","https://www.lkag3.com/Issue/history?lottername=HN300"]

	show() {
		this.node.active = true;
		this.setUrl()
		this.toggleAniRotate(true);
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.HistoryR, this.receiveData.bind(this));
		this.req();
	}

	hide() {
		if(!this.node.active)	return

		this.toggleAniRotate(false);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.HistoryR)
		this.node.active = false;
		this.listUsers.removeAllChildren();
	}

	private req() {
		ACM.getSocketInst.sendMessage(Conf.MsgKind.History, {});
	}
	private receiveData(data:any) {
		this.toggleAniRotate(false);
		this.renderList(data.list);
	}

	private renderList(data:any){
		if(!cc.isValid(this.node))return;
		this.scrollList.scrollToTop()
		this.listUsers.removeAllChildren();

		const s = data.length
		for(var i=0; i<data.length; i++) {
		    var if0 = data[i];
		    var cmp = cc.instantiate(this.itemList);
			cmp.getComponent("CYLHDPrizeHistoryItem").init(i, s, if0.issueID, if0.luckyNum);
		    this.listUsers.addChild(cmp);
		}
	}


	onTouchBtnClose() {
		this.hide();
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: Com.EAudioType.CLICK });
	}

	toPrizeOriginWeb() {
		const i = parseInt(State.myComInfo.roomNumber) - 1
			, s = this.anchors[i]
		cc.sys.openURL(s)
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

	private setUrl() {
		const i = parseInt(State.myComInfo.roomNumber) - 1
			, s = this.anchors[i]
		this.prizeAnchor.string = `查询官网：<u>${s}</u>`
	}

}
