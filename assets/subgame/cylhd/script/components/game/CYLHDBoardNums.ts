//  在线用户排名弹窗
import ACM from "../../AC/ACCYLHDMain";
import * as Conf from "../../CYLHDStateConfig";
import * as Com from "../../CYLHDStateCommon";
import State from "../../CYLHDState";
import StateTools from "../../CYLHDStateTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDBoardNums extends cc.Component {

	// @property(cc.Label)
	// tempLabelNums:cc.Label = null;

	@property(cc.Node)
	popSelect:cc.Node = null;// 位置选择弹窗

	@property(cc.Node)
	stateBall:cc.Node = null;// 当前选择位置状态球

	@property(cc.Node)
	balls:cc.Node[] = [];

	@property(cc.SpriteFrame)
	spritesBallMode:cc.SpriteFrame[] = [];

	@property(cc.SpriteFrame)
	spritesBallPosition:cc.SpriteFrame[] = [];

	@property(cc.SpriteFrame)
	spritesBallState:cc.SpriteFrame[] = [];

	@property(cc.Node)
	bgGrids:cc.Node[] = [];// 开奖数字后面的格子背景图

	@property(cc.SpriteFrame)
	bgSpriteGrids:cc.SpriteFrame[] = [];// 开奖数字后面的格子背景纹理

	@property(cc.Node)
	numGrids:cc.Node[] = [];// 开奖数字

	private position:number = 5// 万～个：1～5
	private positionTempSelect:number// 弹窗中的位置选择

	/** 开奖数字有关 */

	loopNums() {
		if(!cc.isValid(this.node))return;
		this.numGrids.forEach(g=>{
			if(cc.isValid(g)){
				g.getComponent('CYLHDCompRoolNum').startActionLoop()
			}
		})
	}

	setNums(luckyNum:string) {
		if(!cc.isValid(this.node))return;
		const s = StateTools.getStringLucky(luckyNum)
		this.numGrids.forEach((g, ind)=>{
			if(cc.isValid(g)){
				g.getComponent('CYLHDCompRoolNum').setNumStatistic(parseInt(s[ind]))
			}
		})
	}

	twShowNums(luckyNum:string) {
		if(!cc.isValid(this.node))return;
		const s = StateTools.getStringLucky(luckyNum)
			, intervalBetweenTwoNum = 1200

		let timescale = 1;
		if( Conf.GamePlayWay.ACCOUNTING_TIME==19)
		{
			timescale = 2;
		}
		this.numGrids.forEach((g, ind)=>{
			let n = parseInt(s[ind])
			setTimeout(()=>{
				if(cc.isValid(g)){
					g.getComponent('CYLHDCompRoolNum').tweenToTargetNum(n)
				}
			}, ind*intervalBetweenTwoNum/timescale)
		})
	}

	private updateGridNum(ind:number) {
		if(!cc.isValid(this.node))return;
		this.bgGrids.forEach((v,k)=>{
			if(cc.isValid(v)){
				v.getComponent(cc.Sprite).spriteFrame = this.bgSpriteGrids[k==ind?1:0]
			}
		})

		this.numGrids.forEach((v,k)=>{
			if(cc.isValid(v)){
				v.getComponent('CYLHDCompRoolNum').updateFont(k==ind)
			}
		})
	}

	/** 开奖数字有关 */

	/** 数字位置选择弹窗有关 */
	initPosition() {
		let p = State.roomPlayInfo.positionSelect==0 ? 5 : State.roomPlayInfo.positionSelect
		this.setPosition(p)
	}
	showSelect(evt) {
		this.positionTempSelect = this.position
		this.updateBalls(this.positionTempSelect)
		this.popSelect.active = true
	}

	hideSelect() {
		this.popSelect.active = false
	}

	setPosition(ind:number) {
		this.position = ind
		this.updateStateBall(ind-1)
		this.updateGridNum(ind-1)
	}

	getPosition() {
		return this.position
	}

	onSure(evt) {
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: Com.EAudioType.CLICK })
		this.hideSelect()
		cc.log('State.roomPlayInfo.positionSelect = ', State.roomPlayInfo.positionSelect)
		if(State.roomPlayInfo.positionSelect!=0) {
			hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "你已在其它开奖球下注，不能切换下注模式！")
			return
		}
		if(this.positionTempSelect!=this.position)	this.setPosition(this.positionTempSelect)
	}

	onSelectPosition(evt, pos) {
		this.positionTempSelect = pos
		this.updateBalls(pos)
	}

	onTouchBtnClose() {
		this.hideSelect()
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: Com.EAudioType.CLICK })
	}

	// pos:1~5代表万～个，0代表全选
	private updateBalls(pos:number) {
		if(!cc.isValid(this.node))return;
		const allEnable = pos==0
		for(let i=0; i<this.balls.length; i++) {
			let b = this.balls[i]
				, e = allEnable || pos==i+1
			b.getComponent(cc.Sprite).spriteFrame = this.spritesBallMode[e ? 0 : 1]
			b.getChildByName('txt').getComponent(cc.Sprite).spriteFrame = this.spritesBallPosition[e ? i : 5+i]
		}
	}

	private updateStateBall(ind:number) {
		if(!cc.isValid(this.node))return;
		this.stateBall.getComponent(cc.Sprite).spriteFrame = this.spritesBallState[ind]
	}


	/** 数字位置选择弹窗有关 */

}
