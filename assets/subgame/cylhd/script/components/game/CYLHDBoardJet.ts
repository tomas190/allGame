// 筹码投注控制区

const {ccclass, property} = cc._decorator;
import ACM from "../../AC/ACCYLHDMain";
import SceneGame from '../../CYLHDSceneGame';
import * as StateCom from '../../CYLHDStateCommon';
import StateTools from "../../CYLHDStateTools";
import State from "../../CYLHDState";
import * as Conf from "../../CYLHDStateConfig";
// import AssistFunc from '../../CYLHDAssistFunc';

@ccclass
export default class CYLHDBoardJet extends cc.Component {

	@property(cc.Button)
	chipBtns: cc.Button[] = [];// 5个选择筹码

	@property(cc.Node)
	posHeads: cc.Node[] = [];// 筹码发出点的位置集合 0～5为桌面6个玩家，6我，7在线玩家

	@property(cc.Node)
	betTypeBoards: cc.Node[] = [];// 桌面上投注类型的位置，投注位置是以其为中心的举行

	// @property(cc.Prefab)
	// starFlashFabNode: cc.Prefab = null;

	@property(cc.Prefab)
	prefJetton: cc.Prefab = null;

    // @property(cc.SpriteAtlas)
	// ChipAtlas: cc.SpriteAtlas = null;// 筹码选择资源

    // @property(cc.SpriteAtlas)
	// JetAtlas: cc.SpriteAtlas = null;// 筹码投注资源

	@property(cc.SpriteFrame)
	JetsSprite: cc.SpriteFrame[] = [];
	
	private jetPool:cc.NodePool;// 筹码对象池

	private arrAllJets :cc.Node[];// 所有筹码
	private jetsAreas: Map<number, cc.Node[]>;// 分区域筹码
	private arrJettonTwPrize: cc.Node[];

	// @property
	private chipIndexSelect: number = -1;// 我选中的筹码的编号,初始默认为第一个

	// private chipLevelCanSelect: number = 5;// 能选筹码的等级范围
	public initHeadPos: cc.Vec3[] = [];//存储所有筹码发出点的位置，根据posHeads
	public staticPosChipBtns: cc.Vec3[] = [];//存储所有筹码按钮未选中的位置

	private sceneGame: SceneGame;
	private timeInterval:number = 0.05;// TODO 

	onLoad() {
		this.jetPool = new cc.NodePool();
		this.sceneGame = cc.find('Canvas/game').getComponent('CYLHDSceneGame');
		this.initPos();
		this.blurAllChipBtns()

		this.arrAllJets = [];
		this.arrJettonTwPrize = [];
		this.jetsAreas = new Map();

		this.adjustHeadsPos()
	}
	// 一次性添加本局之前的全部投注
	public putJetsBefore(bets:StateCom.InfoBet[]) {
		this.clear();
		for(var i in bets) {
			var b = bets[i];
			this.betValJet(b, false, 100);// 最后一个参数100无具体意义，只要大于桌面玩家总数6即可
		}
	}
	public clear() {
		this.clearAllJetBetted();
		this.clearJetTwPrize();
	}

	// 新增玩家投注
	public betValJet(bet:StateCom.InfoBet, isMyBet:boolean, indUser:number) {
		var ptStart:cc.Vec3 = this.getPosJetStart(indUser);
		var arrSplit = StateTools.splitJetKeepBet(bet.val);
		if(isMyBet) {
			ptStart = this.posHeads[6].position;
		}
		for(var i in arrSplit) {
			var ptEnd:cc.Vec3 = this.getRanPosOneNum(bet.type);
			this.oneBet(arrSplit[i], isMyBet, ptStart, ptEnd, bet.type);
		}
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {
			type:arrSplit.length==1 ? StateCom.EAudioType.BET_JET_S0 : StateCom.EAudioType.BET_JET_SL
		});
	}

	private oneBet(val:number, isMyBet:boolean, ptStart:cc.Vec3, ptEnd:cc.Vec3, tp:StateCom.TypeBet) {
		var jetton:cc.Node = this.produceJet(val);
		var ptEndAdjust = ptEnd;
		jetton.setPosition(ptStart.x, ptStart.y);
		this.node.addChild(jetton);
		this.moveJetton(jetton, ptStart, ptEndAdjust, ()=>{
			// fgui.GTween.to2(1,1, 0.9,0.9, 0.3)._to2(0.9, 0.9, 1,1, 0.1)
			// .setEase(1).setTarget(jetton, jetton.setScale);
		}, 0);

		var ar0 = this.jetsAreas.get(tp) || [];
		ar0.push(jetton);
		this.jetsAreas.set(tp, ar0);
		this.arrAllJets.push(jetton);
	}


	// 收集筹码到庄家
	public collectJetsToBanker(luckyNum:string, position:number) {
		const tps = StateTools.getPrizeTypesFromLuckyNum(luckyNum, position)
		const posBanker = this.posHeads[8].position
		let i=StateCom.TypeBet.Equal;
		if(hqq.cylhd_BetArea=="lhds" || hqq.cylhd_BetArea=="lhdx" )
		{
			i = StateCom.TypeBet.Dragon;
		}
		for(i; i<StateCom.TypeBet.None; i++) {
			if(tps.indexOf(i)!=-1)   continue
			var jets = this.jetsAreas.get(i) || []
			for(var j in jets) {
				var jt = jets[j]
				this.moveJetton(jt,  cc.v3(jt.x,jt.y), posBanker)
			}
		}
	}
	// 从庄家发筹码到中奖号码面板
	public collectJetsFromBanker(luckyNum:string, position:number) {
		const tps = StateTools.getPrizeTypesFromLuckyNum(luckyNum, position)

		const animalType = tps[0]
			, smallBigType = tps[1]
			, oddEvenType = tps[2]
		let i=StateCom.TypeBet.Equal;
		if(hqq.cylhd_BetArea=="lhds" || hqq.cylhd_BetArea=="lhdx" )
		{
			i = StateCom.TypeBet.Dragon;
			if( animalType != StateCom.TypeBet.Equal )
			{
				for(i; i<=StateCom.TypeBet.Tiger; i++) {
					if(i==animalType)	continue
		
					var jets = this.jetsAreas.get(i) || []
					for(var j=jets.length-1; j>-1; j--) {
						var jt = jets[j]
						var ptEnd = this.getRanPosOneNum(animalType)
						this.moveJetton(jt, {x:jt.x, y:jt.y}, ptEnd)
					}
				}
			}
		}
		else{
			for(i; i<=StateCom.TypeBet.Tiger; i++) {
				if(i==animalType)	continue
	
				var jets = this.jetsAreas.get(i) || []
				for(var j=jets.length-1; j>-1; j--) {
					var jt = jets[j]
					var ptEnd = this.getRanPosOneNum(animalType)
					this.moveJetton(jt, {x:jt.x, y:jt.y}, ptEnd)
				}
			}
		}

		const fromTypeSB = smallBigType==StateCom.TypeBet.Small ? StateCom.TypeBet.Big : StateCom.TypeBet.Small
			, fromTypeOE = oddEvenType==StateCom.TypeBet.Odd ? StateCom.TypeBet.Even : StateCom.TypeBet.Odd;
			
		let arrFrom = [fromTypeSB, fromTypeOE];
		if(hqq.cylhd_BetArea=="lhds"){
			arrFrom = [fromTypeOE];
		}else if(hqq.cylhd_BetArea=="lhdx"){
			arrFrom = [fromTypeSB];
		}
		tps.shift()
		for(var j=0; j<arrFrom.length; j++) {
			var f = arrFrom[j]
				, t = tps[j]

			var jets = this.jetsAreas.get(f) || []
			for(var k=jets.length-1; k>-1; k--) {
				var jt = jets[k]
				var ptEnd = this.getRanPosOneNum(t)
				this.moveJetton(jt, {x:jt.x, y:jt.y}, ptEnd)
			}			
		}

	}
	// // 1/2 开和时 - 把庄家输的钱收集到“和”面板上
	// public sendBankerJetsToEqual(sumLost:number) {
	// 	sumLost = Math.abs(sumLost);
	// 	var arrSplit = StateTools.splitJetKeepBet(sumLost);
	// 	var ar0 = this.jetsAreas.get(StateCom.TypeBet.Equal) || [];
	// 	const posBanker = this.posHeads[6];
	// 	for(var i=0,l=arrSplit.length; i<l; i++) {
	// 		var jt = this.produceJet(arrSplit[i]);
	// 		jt.setPosition(posBanker.x, posBanker.y);
	// 		// jt.group = this.groupPar;
	// 		// this.gcParent.addChild(jt);
	// 		this.node.addChild(jt);

	// 		var ptEnd = this.getRanPosOneNum(StateCom.TypeBet.Equal);
	// 		this.moveJetton(jt, {x:jt.x, y:jt.y}, ptEnd);
	// 		ar0.push(jt);
	// 		this.arrAllJets.push(jt);
	// 	}
	// 	this.jetsAreas.set(StateCom.TypeBet.Equal, ar0);
	// }
	// 从中奖号码面板发给盈利玩家
	public sendJetToUsers(myOffset:number, offsetUserDesks:number[]) {
		const me = this.posHeads[6].position;
		this.moveJetToUser(myOffset, me);

		for(var k=0; k<offsetUserDesks.length; k++) {
			var ptUser = this.posHeads[k].position;
			this.moveJetToUser(offsetUserDesks[k], ptUser);
		}

		const onlineUser = this.posHeads[7].position
		for(var i=this.arrAllJets.length-1; i>-1; i--) {
			var j = this.arrAllJets[i];
			this.moveOneJetAndHide(j, cc.v3(j.x, j.y), onlineUser);
		}

		ACM.getEvtMgrIns.dispatch(Conf.EventKind.REFRESH_MY_RESULT_BALANCE);
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.REFRESH_USER_RESULT_BALANCE);
	}
	private moveJetToUser(val:number, ptEnd:cc.Vec3) {
		if(val<=0 || Math.abs(val)==0 || val.toFixed(2)=="0.00")  return;

		var arrSplit = StateTools.splitJetKeepBet(val);
		for(var i=arrSplit.length-1; i>-1; i--) {
			var v = arrSplit[i];
			var jt = this.produceJet(v);
			var ptStart:cc.Vec3 = this.getPosOfOneAllJet();
			jt.setPosition(ptStart.x, ptStart.y);
			// jt.group = this.groupPar;
			// this.gcParent.addChild(jt);
			this.node.addChild(jt);

			this.moveOneJetAndHide(jt, ptStart, ptEnd, this.timeInterval*(i%5));// %10防止太多导致超时

			this.arrJettonTwPrize.push(jt);
		}
	}

	
	/*************************************************** 下注筹码选择相关 ************************************************/
	
	public getSelectBetVal() {
		if(this.chipIndexSelect<0)	return 0;
		return Conf.GamePlayWay.BET_VALS[this.chipIndexSelect];
	}

	// 刷新可以选择的筹码按钮0~5
	public refreshBtnsCoinEnable(level:number) {
		// console.warn('refreshBtnsCoinEnable', level)
		for (var i = 0; i < this.chipBtns.length; i++) {// 0~4
			var canBet: boolean = i < level;
			var btn = this.chipBtns[i];
			if (!canBet) {// 不可选
				if(this.chipIndexSelect==i) {// 需要取消选择
					this.chipIndexSelect = -1;
				}
				this.toggleBetCoinEnable(i, false);
			} else if (!btn.interactable) {// 原本不可选
				this.toggleBetCoinEnable(i, true);
			}
			btn.interactable = canBet;
		}

		if(level>0 && (this.chipIndexSelect>level-1 || this.chipIndexSelect==-1)) {
			this.chipIndexSelect = 0;
			this.selectBetCoin(0);
		}
	}

	public blurAllChipBtns() {
		for(let i = 0; i<this.chipBtns.length; i++) {
			this.toggleBetCoinEnable(i, false)
		}
	}
	public cancelBlurAllChipBtns() {
		if(this.chipIndexSelect<0)	return

		this.toggleBetCoinEnable(this.chipIndexSelect, true)
		this.selectBetCoin(this.chipIndexSelect)
	}

	private initPos() {
		this.chipBtns.forEach((v)=>{
			this.staticPosChipBtns.push(v.node.position);
		});
	}

	// 设置投注按钮类型的可触摸性
	private toggleBetCoinEnable(ind:number, enable:boolean) {
		if(!cc.isValid(this.node))return;
		const btn = this.chipBtns[ind];
		const indFrame = enable ? ind : (Conf.GamePlayWay.BET_VALS.length+ind);// (ind==this.chipIndexSelect?2:1) : 3;
		btn.node.getComponent(cc.Sprite).spriteFrame = this.JetsSprite[indFrame]// this.ChipAtlas.getSpriteFrame('p_ui_chip_bg_'+(ind+1)+'_'+indFrame);
		// console.warn('toggle', ind, enable, ('p_ui_chip_bg_'+(ind+1)+'_'+indFrame))
		
		if(!enable) {
			// btn.node.setPosition(this.staticPosChipBtns[ind])
			const pos = this.staticPosChipBtns[ind]
			btn.node.setPosition(pos)
		}
		
		btn.interactable = enable
	}
	// 设置投注类型按钮的选中状态
	private selectBetCoin(ind:number) {
		if(!cc.isValid(this.node))return;
		const sum = Conf.GamePlayWay.BET_VALS.length
		this.chipBtns.forEach((v,k) => {
			if(cc.isValid(v)){
				v.node.setPosition(this.staticPosChipBtns[k]);
				v.node.stopAllActions();
				const pos = this.staticPosChipBtns[k];
				if(k==ind) {
					v.node.getComponent(cc.Sprite).spriteFrame = this.JetsSprite[k]//.ChipAtlas.getSpriteFrame('p_ui_chip_bg_'+(k+1)+'_2');
					const action = cc.moveTo(0.1, cc.v2(pos.x, pos.y+18));
					v.node.runAction(action);
				} else {
					const indFrame = k<State.myLocalPlayInfo.levelBetCan ? k : (sum+k);
					v.node.getComponent(cc.Sprite).spriteFrame = this.JetsSprite[indFrame]//.ChipAtlas.getSpriteFrame('p_ui_chip_bg_'+(k+1)+'_'+indFrame);
					v.node.setPosition(pos);
				}
			}
		});
	}
	
	touchCoinBet(evt, ind:number) {
		if(this.chipIndexSelect==ind)   return;
		this.chipIndexSelect = ind;
		this.selectBetCoin(ind);
	}
	/*************************************************** 下注筹码选择相关 ************************************************/
	
	/***** 辅助类 */
    // TODO 获取一个桌面筹码的位置
	private getPosOfOneAllJet():cc.Vec3 {
		// var jts = this.jetsAreas.get(State.roomPlayInfo.luckyNum);
		// if(jts==undefined)  return this.getRanPosOneNum(State.roomPlayInfo.luckyNum);
		// var jt = jts[Math.floor(Math.random()*jts.length)];
		// if(jt==undefined)  return this.getRanPosOneNum(State.roomPlayInfo.luckyNum);
		var pt:cc.Vec3 = cc.v3(0, 0);//(jt.x, jt.y);
		return pt;
	}
	private clearAllJetBetted() {
		for(var i=0; i<this.arrAllJets.length; i++) {
			var jetton = this.arrAllJets[i];
			if(!jetton || !jetton.parent)  continue;
			jetton.removeFromParent();
			this.reclaimJet(jetton);
		}
		this.arrAllJets = [];

		this.jetsAreas.clear()
	}
	private clearJetTwPrize() {
		for(var i in this.arrJettonTwPrize) {
			var jt = this.arrJettonTwPrize[i];
			if(jt.parent)   jt.removeFromParent();
			this.reclaimJet(jt);
		}
		this.arrJettonTwPrize = [];
	}

	/***** 辅助类 */
	/*************************************************** 内部表现 ************************************************/
	// 移动筹码后隐藏
	private moveOneJetAndHide(j:cc.Node, pt0:cc.Vec3,  pt1:cc.Vec3, delayDuration:number=0) {
		this.moveJetton(j, pt0, pt1, ()=>{
			j.active = false;
		}, delayDuration);
	}
	// 移动筹码
	private moveJetton(jet:cc.Node, pStart, pEnd, completeFunc:Function=null, delayDuration:number=0) {
		
		const m = cc.moveTo(0.5, pEnd.x, pEnd.y);
		const cb = cc.callFunc(()=>{
			if(completeFunc)	completeFunc();
		}, this);
		jet.setPosition(pStart);
		jet.runAction(cc.sequence(m, cb));
	}

	// 获取玩家投注开始位置
	private getPosJetStart(indUser:number) {
		if(indUser<6) {// 桌面6个用户
			const ndHead = this.posHeads[indUser];
			var v = cc.v3(ndHead.position.x, ndHead.position.y);
			if(indUser==5) {
				v.x -= ndHead.width/2;
				v.y += ndHead.height/5;
			}
			return v;// pos.position;
		} else {// 在线用户
			return this.posHeads[7].position;
		}
	}
	// 获取在该类型盘上可以摆放筹码的随机位置
	private getRanPosOneNum(typeBet:StateCom.TypeBet) {
		const bd = this.betTypeBoards[typeBet];
		// const cf = Conf.UIConf.BetGrid;

		let xStart = bd.position.x, yStart = bd.position.y
		let w = 0, h = 0
		let horizontalAdjust = 0, verticalAdjust = 0
		let xR, yR

		switch(typeBet) {
			case StateCom.TypeBet.Equal:// 261*182
				w = 180
				verticalAdjust = -26
				h = 60
				break
			case StateCom.TypeBet.Dragon:// 388*181
			case StateCom.TypeBet.Tiger:
				w = 290
				verticalAdjust = -26
				h = 60
				break
			case StateCom.TypeBet.Small:// 259*281
				w = 180
				verticalAdjust = -15
				h = 83
				break
			case StateCom.TypeBet.Odd:
				w = 180
				verticalAdjust = -15
				h = 83
				break
			case StateCom.TypeBet.Big:// 261*264
				horizontalAdjust = 25
				w = 140
				verticalAdjust = -6
				h = 83
				break
			case StateCom.TypeBet.Even:
				horizontalAdjust = -25
				w = 140
				verticalAdjust = -6
				h = 83
				break
			default:
		}

		xR = horizontalAdjust + Math.random() * (w * 0.5) * (Math.random()<0.5?(-1):1);
		yR = verticalAdjust + Math.random() * (h * 0.5) * (Math.random()<0.5?(-1):1);

		return cc.v3(xStart+xR, yStart+yR);
	}

	private adjustHeadsPos() {
		if(!cc.isValid(this.node))return;
		let widGap = 35
			, widTarget = 1334
			, widScreen = cc.winSize.width
		if(widScreen>widTarget) {
			let widGapPlus = (widScreen - widTarget)/4
			widGap += widGapPlus
		}
			
		for(var i=0; i<6; i++) {
			let isLeft = i>0 && i<4
				, h = this.posHeads[i]
			if(isLeft)
				h.getComponent(cc.Widget).left = widGap
			else
				h.getComponent(cc.Widget).right = widGap
		}
	}

	/*************************************************** 内部表现 ************************************************/
	
	private produceJet(val:number) {
		if(!cc.isValid(this.node))return;
		let jet: cc.Node;
		if (this.jetPool.size() > 0) {
			jet = this.jetPool.get();
		} else {
			jet = cc.instantiate(this.prefJetton);
		}
		jet.active = true;
		let ind = Conf.GamePlayWay.BET_VALS.indexOf(val)
		var spriteFrame = this.JetsSprite[ind]//JetAtlas.getSpriteFrame("ui_chip_bet_"+(Conf.GamePlayWay.BET_VALS.indexOf(val)+1));
		jet.getComponent(cc.Sprite).spriteFrame = spriteFrame;
		return jet;
	}
	
	private reclaimJet(j:cc.Node) {
		if(j.parent)	j.parent.removeChild(j);
		this.jetPool.put(j);
	}

	/***************************************************  ************************************************/
	/***************************************************  ************************************************/
	
	

}
