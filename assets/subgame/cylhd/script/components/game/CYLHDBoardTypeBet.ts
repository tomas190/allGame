//  龙虎手牌
const {ccclass, property} = cc._decorator;
// import * as Conf from "../../LHDStateConfig";
// import * as StateCom from "../../LHDStateCommon";

@ccclass
export default class CYLHDBoardTypeBet extends cc.Component {
    
    @property
	type: number = 0;// 投注类型 StateCom.TypeBet
	
	private lbVal:cc.Label;
	// private lbValMine:cc.Label;
	// private imgPrize:cc.Node;
	private imgShine:cc.Node;
	
	private numAll:number = 0;
	private numMine:number = 0;

    onLoad() {
		this.lbVal = this.node.getChildByName('sum').getComponent(cc.Label);
		// this.lbValMine = this.node.getChildByName('Label_myBets').getComponent(cc.Label);
		// this.imgPrize = this.node.getChildByName('xiazhu_win');
		this.imgShine = this.node.getChildByName('light');
    }

	public resetBoard() {
		this.numMine = this.numAll = 0;
		this.lbVal.string = '';// = this.lbValMine.string
		// this.imgPrize.active = false;
		// this.toggleStar(false);
		this.updateValLabel()
	}

	onTouchToShine(evt) {
		cc.Tween.stopAllByTarget(this.imgShine)
		cc.tween(this.imgShine)
			.set({opacity: 255, active:true})
			.to(0.1, {opacity: 0})
			.set({active: false})
			.start()
	} 

	// 设置赌注盘的投注增加值
	public setBoardBetVal(val:number) {
		this.lbVal.string = '' + (val>0?val:'')
		this.numAll = val
		this.updateValLabel()
	}

	// 设置赌注盘的投注增加值
	public setBoardBetValMe(val:number) {
		if(val<0)	return
		this.numMine = val
		this.updateValLabel()
		// this.lbValMine.string = '' + val;// (val>0?val:'');
	}

	public setTouchable(can:boolean) {
		if(!cc.isValid(this.node))return;
		this.node.getComponent(cc.Button).interactable = can
	}

	private updateValLabel() {
		this.lbVal.string = this.numMine + '/' + this.numAll
	}

	// // 闪烁赌注盘类型
	// public shineBoardBet() {
	// 	this.imgPrize.stopAllActions();
	// 	this.imgPrize.active = true;
	// 	this.imgPrize.opacity = 255;
		
	// 	const fadeShow = cc.fadeTo(0.5, 255);
	// 	const fadeHide = cc.fadeTo(0.5, 0);
	// 	const wait = cc.delayTime(0.15);
	// 	const sq = cc.sequence(fadeShow, fadeHide, wait).repeat(3);
	// 	this.imgPrize.runAction(sq);
	// }
}
