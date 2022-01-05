
import ACM from './AC/ACCYLHDMain';
import ACUtils from "./AC/ACCYLHDUtils";
import ACTick from "./AC/ACCYLHDTick";
import * as Conf from "./CYLHDStateConfig";
import StateTools from "./CYLHDStateTools";
import State from "./CYLHDState";
import AssistFunc from './CYLHDAssistFunc';
import * as StateCom from "./CYLHDStateCommon";
import BoardJet from './components/game/CYLHDBoardJet';
import { GameUtil } from './CYLHDGameUtils';
import { cylhd_language } from '../language/cylhd_language';
import { msg } from './proto/CYLHDproto_msg';
// import gHandler = require("../../../main/common/hqq");

const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDSceneGame extends cc.Component {


	@property(cc.Node)
	btnSound: cc.Node = null;// 音乐开关按钮
	@property(cc.Node)
	btnMute: cc.Node = null;// 音乐开关按钮
	@property(cc.Label)
	labelCountdown: cc.Label = null;
	@property(cc.Node)
	cmpCountdown: cc.Node = null;
	// @property(cc.Node)
	// imgStatusReadyNext: cc.Node = null;
	// @property(cc.Node)
	// skeDragonTigerVS: cc.Node = null;// 开局前一秒播放的全屏VS动画

	@property(cc.Node)
	tipStartBet: cc.Node = null;// 开始下注

	@property(cc.Node)
	tipBlockBet: cc.Node = null;// 6s封盘

	@property(cc.Node)
	tipGetPrize: cc.Node = null;// 获取奖源

	@property(cc.Node)
	compMe: cc.Node = null;// 我的头像信息

	@property(cc.Node)
	readyNextTip: cc.Node = null;// 准备下一局倒数

	@property(cc.Node)
	boardWaiting: cc.Node = null;// 请耐心等待下一局

	@property(cc.Node)
	boardWatching: cc.Node = null;// 观战中

	@property(cc.Node)
	arrBetTypeBoard: cc.Node[] = [];// 3个投注点击板

	@property(cc.Node)
	arrUser: cc.Node[] = [];// 6个用户

	@property(cc.Node)
	boardPlayerList: cc.Node = null;// 在线用户排名列表弹窗

	@property(cc.Node)
	boardHelp: cc.Node = null;// 游戏规则面板

	// @property(cc.Node)
	// containerResult: cc.Node = null;// 个人输赢面板的容器

	@property(cc.Node)
	boardEnsureExitRoom: cc.Node = null;// 需要确认退出房间的弹窗

	@property(cc.Node)
	boardBetRecord: cc.Node = null;// 投注历史

	@property(cc.Node)
	boardPrizeHistory: cc.Node = null;// 开奖历史

    @property(cc.SpriteAtlas)
	AlphaHeadAtlas: cc.SpriteAtlas = null;// 透明头像

    @property(cc.Node)
    iconNetwork:cc.Node = null;

	@property(cc.Node)
	boardNums: cc.Node = null;// 开奖数字盘和个区域位置选择面板

	boardJets: BoardJet;// 筹码控制板

	private indPlayCountdown5S:number;// 5秒倒计时
	// private hasEndBet:boolean;
	private tickerRun: ACTick;
	// private timeStartToShowResult: number = -1;
	roomNumber: string;
	// private boardResult: cc.Node;

	private roomMaxRed:number=null;
	private roomMinRed:number=null;

	onLoad () {
		this.boardJets = cc.find('Canvas/game/Centerlayer/allChips').getComponent('CYLHDBoardJet');

		if(hqq.eventMgr.showNetStateNode) {
			hqq.eventMgr.dispatch(hqq.eventMgr.showNetStateNode, { 
				parent: this.iconNetwork,
				position: { x: 0, y: 0 } 
			})
		}

		this.tipGetPrize.active = true;
		GameUtil.loadSpine( this.tipGetPrize.getChildByName("ani") , "language/" + cylhd_language.getCurLanguage() + "/cylhd_kaijiang/cylhd_kaijiang" , ()=>{this.tipGetPrize.active=false;} , "animation" , true);
		this.tipBlockBet.active = true;
		GameUtil.loadSpine( this.tipBlockBet.getChildByName("ani") , "language/" + cylhd_language.getCurLanguage() + "/ani_tipDotDotDot/ani_tipDotDotDot" , ()=>{this.tipBlockBet.active=false;} , "ani_tqfp" , true );
		this.boardWatching.active = true;
		GameUtil.loadSpine( this.boardWatching.getChildByName("ani") , "language/" + cylhd_language.getCurLanguage() + "/p_ani_gzz/p_ani_gzz" , ()=>{this.boardWatching.active=false;} , "ani_gzz" , true );
	}

	onLogined() {
		cc.log("重连登陆后进房间");
		ACM.getSocketInst.sendMessage(Conf.MsgKind.JoinRoom, {
			roomNumber: this.roomNumber
		});
	}

	onSocketClosed() {
		this.tickerRun.stop();
	}

	onServicePause() {

	}

	tapBackInLoadPage() {
		
	}
	// 进场初始化
	enterScene() {
		if(!cc.isValid(this.node))return;
		// hqq.cylhd_BetArea="lhds";//龙虎单双
		hqq.cylhd_BetArea="lhdx";//龙虎大小
		if(hqq.cylhd_BetArea=="lhds")
		{
			//大小单双
			this.arrBetTypeBoard[0].active=false;
			this.arrBetTypeBoard[3].active=false;
			this.arrBetTypeBoard[4].active=false;

			this.arrBetTypeBoard[5].setPosition(-257,-90);
			this.arrBetTypeBoard[6].setPosition(256,-90);
			this.arrBetTypeBoard[1].setPosition(-257,135.5);
			this.arrBetTypeBoard[2].setPosition(256,135.5);

			this.arrBetTypeBoard[5].getChildByName("sum").setPosition(-190,110);
			this.arrBetTypeBoard[6].getChildByName("sum").setPosition(-190,110);
			this.arrBetTypeBoard[1].getChildByName("sum").setPosition(-190,63);
			this.arrBetTypeBoard[2].getChildByName("sum").setPosition(-190,63);

			this.arrBetTypeBoard[5].getComponent(cc.Widget).horizontalCenter=-257;
			this.arrBetTypeBoard[5].getComponent(cc.Widget).updateAlignment();
			this.arrBetTypeBoard[6].getComponent(cc.Widget).horizontalCenter=256;
			this.arrBetTypeBoard[6].getComponent(cc.Widget).updateAlignment();

			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[5],"language/" + cylhd_language.getCurLanguage() + "/game/dan");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[6],"language/" + cylhd_language.getCurLanguage() + "/game/shuang");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[1],"language/" + cylhd_language.getCurLanguage() + "/game/long");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[2],"language/" + cylhd_language.getCurLanguage() + "/game/hu");
			
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[5].getChildByName("light"),"res/g_dan");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[6].getChildByName("light"),"res/g_shuang");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[1].getChildByName("light"),"res/g_long");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[2].getChildByName("light"),"res/g_hu");
		}
		else if(hqq.cylhd_BetArea=="lhdx")
		{
			//大小单双
			this.arrBetTypeBoard[0].active=false;
			this.arrBetTypeBoard[5].active=false;
			this.arrBetTypeBoard[6].active=false;

			this.arrBetTypeBoard[3].setPosition(-257,-90);
			this.arrBetTypeBoard[4].setPosition(256,-90);
			this.arrBetTypeBoard[1].setPosition(-257,135.5);
			this.arrBetTypeBoard[2].setPosition(256,135.5);

			this.arrBetTypeBoard[3].getChildByName("sum").setPosition(-190,110);
			this.arrBetTypeBoard[4].getChildByName("sum").setPosition(-190,110);
			this.arrBetTypeBoard[1].getChildByName("sum").setPosition(-190,63);
			this.arrBetTypeBoard[2].getChildByName("sum").setPosition(-190,63);

			this.arrBetTypeBoard[3].getComponent(cc.Widget).horizontalCenter=-257;
			this.arrBetTypeBoard[3].getComponent(cc.Widget).updateAlignment();
			this.arrBetTypeBoard[4].getComponent(cc.Widget).horizontalCenter=256;
			this.arrBetTypeBoard[4].getComponent(cc.Widget).updateAlignment();

			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[3],"language/" + cylhd_language.getCurLanguage() + "/game/da");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[4],"language/" + cylhd_language.getCurLanguage() + "/game/xiao");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[1],"language/" + cylhd_language.getCurLanguage() + "/game/long");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[2],"language/" + cylhd_language.getCurLanguage() + "/game/hu");
			
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[3].getChildByName("light"),"res/g_dan");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[4].getChildByName("light"),"res/g_shuang");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[1].getChildByName("light"),"res/g_long");
			GameUtil.loadSpriteFrame(this.arrBetTypeBoard[2].getChildByName("light"),"res/g_hu");
		}


		State.myLocalPlayInfo.cannotBetBeforeBuyCoin = State.balanceAvailable()<10;
		this.roomNumber = State.myComInfo.roomNumber;

		this.boardJets.clear();
		this.setAccountInfoView();
		this.refreshSoundSwitch();
		this.boardNums.getComponent("CYLHDBoardNums").initPosition()
		
		this.registerEvts();

		this.refreshOneRound();

		this.tickerRun.start();
        ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {type:StateCom.EAudioType.BG_GAME_ROOM,loop:true});

		ACM.getSocketInst.sendMessage(Conf.MsgKind.RoomRedLimit, {
			roomNumber: this.roomNumber
		});

		this.toggleBoardHelp(true);
		this.toggleBoardHelp(false);

		if(hqq.gameGlobal.zhibo)
        {
            if(hqq.gameGlobal.zhibo.GameCode=="cylhd" && hqq.gameGlobal.zhibo.RoomCode == this.roomNumber )
            {
                hqq.eventMgr.dispatch(hqq.eventMgr.showZhiBoPanel, true )
            }
        }
	}
	// 退场清理
	exitScene() {
		this.unscheduleAllCallbacks();
		this.unregisterEvts();

		this.toggleBoardHelp(false);
		this.toggleBoardPlayerList(false);
		this.showTipAlert(false);
		this.hideBetRecord()
		this.hidePrizeHistory()

		this.showWaitNextRound(false);
		this.showTipBlockBet(false)
		this.showTipGetPrize(false)
		this.showTipStartBet(false)
		this.boardJets.blurAllChipBtns()
		
		this.tickerRun.destroy();
		this.node.active = false;
	}

	/*************************************************** 通信消息 ************************************************/
	private onBetR(data) {
		this.updateMyBalance();
		State.updateLevelBetCan();
		this.boardJets.refreshBtnsCoinEnable(State.myLocalPlayInfo.levelBetCan);
	}

	private onJoinRoomR(data) {
		if (data.code != 0) return;
		this.refreshOneRound();
		if (!this.tickerRun.running) {
			this.tickerRun.restart();
		}
	}

	private onRoomRedR(data) {
		if (data.code != 0) return;
		this.roomMaxRed = data.maxBet;
		this.roomMinRed = data.minBet;
	}

	private onExitRoomR(data) {
		if (data.code != 0) {
			this.toggleLoadingCover(false);
			return;
		}
		if(hqq.gameGlobal.zhibo)
        {
            if(hqq.gameGlobal.zhibo.GameCode=="cylhd" && hqq.gameGlobal.zhibo.RoomCode == this.roomNumber )
            {
				this.exitScene();
				ACM.destroy("");
                hqq.eventMgr.dispatch(hqq.eventMgr.showZhiBoPanel, false );
				hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene, "zhibo");
				return;
            }
        }
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.CHANGE_SCENE, StateCom.SceneIndex.LOBBY);
	}

	private onBetPush(dataP) {
		if(!cc.isValid(this.node))return;
		const indUser: number = StateTools.whichUserBetOnDesk(dataP.userID);
		const isMyBet: boolean = StateTools.isMe(dataP.userID);

		// 甩头像+更新余额+扔筹码
		if(indUser<6) {
			const u = this.arrUser[indUser].getComponent("CYLHDUserDesk");
			if(!isMyBet)	u.shakeHead();
			u.setCoin(dataP.balance-dataP.lockMoney);
		}
		
		const betInfo: StateCom.InfoBet = dataP.info;
		this.boardJets.betValJet(betInfo, isMyBet, indUser);

		const board = this.arrBetTypeBoard[betInfo.type].getComponent('CYLHDBoardTypeBet')
		board.setBoardBetVal(State.getValSumOneType(betInfo.type))

		if (isMyBet) {
			this.updateMyBalance()
			board.setBoardBetValMe(State.getMyBetValByType(betInfo.type))
		}
	}

	private onRoundResultPush(data) {
		this.showTipGetPrize(false)
		this.scheduleOnce(()=>{
			this.rShowNums()
		},2);
	}

	private onCancelRoundPush(data) {
		if(!cc.isValid(this.node))return;
		this.updateMyBalance()
		this.resetDeskUsers(State.roomPlayInfo.arrUserInfoDesk)
		this.boardJets.clear()
		this.resetTypeBoardsVal()
		this.showTipGetPrize(false)
		this.boardNums.getComponent("CYLHDBoardNums").setNums(State.roomPlayInfo.luckyNumLastRound)
		
		this.showTipCancelRound(true)
	}

	private ensureExitRoom() {
		this.toggleLoadingCover(true);
		this.showTipAlert(false);
		ACM.getSocketInst.sendMessage(Conf.MsgKind.ExitRoom, {});
	}

	private refreshOneRound() {
		if(!cc.isValid(this.node))return;
		// const objInfo = StateTools.computeRoundProgressByStart(State.roomPlayInfo.startTimeOfRound, ACUtils.timeStampMilSec());
		State.updateRoundStatus()
		State.updateLevelBetCan();

		const s = State.roomPlayInfo.roundState
			, isBetting = s == StateCom.RoundState.BETTING
			, isWaitingResult = s == StateCom.RoundState.BLOCK_BETTING || s == StateCom.RoundState.GET_PRIZE
			, isWaitingNext = s == StateCom.RoundState.SHOW_PRIZE || s==StateCom.RoundState.CANCEL_ROUND

		this.resetDeskUsers(State.roomPlayInfo.arrUserInfoDesk);
		this.setTypeBoardsVal();
		this.indPlayCountdown5S = 5;

		this.updateMyBalance();
		this.judgeShowWatching();
		
		if(isBetting) {// 在下注阶段
			this.boardJets.putJetsBefore(State.roomPlayInfo.infoBetsAllRound)
			this.boardJets.cancelBlurAllChipBtns()
			this.boardJets.refreshBtnsCoinEnable(State.myLocalPlayInfo.levelBetCan)
			this.boardNums.getComponent("CYLHDBoardNums").setNums(State.roomPlayInfo.luckyNumLastRound)
		} else if(isWaitingResult) {// 等待结果阶段
			this.boardJets.putJetsBefore(State.roomPlayInfo.infoBetsAllRound)
			this.boardNums.getComponent("CYLHDBoardNums").setNums(State.roomPlayInfo.luckyNumLastRound)
			this.boardNums.getComponent("CYLHDBoardNums").loopNums()
			this.boardJets.blurAllChipBtns()
		} else if(isWaitingNext) {// 等待下一局阶段
			this.boardJets.blurAllChipBtns()
			this.boardNums.getComponent("CYLHDBoardNums").setNums(State.roomPlayInfo.luckyNum)
			this.resetBoardTypeBet()
		}

		this.showTipBlockBet(s==StateCom.RoundState.BLOCK_BETTING)
		this.showTipGetPrize(s==StateCom.RoundState.GET_PRIZE)
		this.showTipStartBet(s==StateCom.RoundState.BETTING)
		this.showTipCountdown(isBetting)
		this.showWaitNextRound(isWaitingNext)
		this.setAllBoardBetTouchable(isBetting)
		this.showTipCancelRound(false)
		
		// cc.log('refreshOneRound', s)
	}
	/*************************************************** 通信消息 ************************************************/


	/*************************************************** 业务流程控制 ************************************************/
	
	// 心跳Tick
	private onTickRun() {
		if(!cc.isValid(this.node))return;
		State.updateRoundStatus()

		this.updateLbProgress()
		this.willPlayCountAudio()

		// 切换到6秒封盘时间
		if(State.roomPlayInfo.timeProgress==Conf.GamePlayWay.BLOCK_BETTING_TIME && !this.tipBlockBet.active) {
			this.showTipBlockBet(true)
			this.boardJets.blurAllChipBtns()
			this.setAllBoardBetTouchable(false)
			setTimeout(()=>{
				this.showTipCountdown(false)
			}, 200)// 需要停留显示倒计时0
		}

		// 切换到获取奖源中
		if(State.roomPlayInfo.timeProgress==(Conf.GamePlayWay.ACCOUNTING_TIME-1) && !this.tipGetPrize.active) {
			this.showTipBlockBet(false)
			this.showTipGetPrize(true)
			this.setAllBoardBetTouchable(false)

			this.boardNums.getComponent("CYLHDBoardNums").loopNums()
		}

	}
	// 判断显示“观战中，···”
	private judgeShowWatching() {
		const s = State.myLocalPlayInfo.levelBetCan == 0;
		this.toggleTipCantBet(s);
	}
	/*************************************************** 业务流程控制 ************************************************/

	/*************************************************** 其它流程 ************************************************/
	
	//-------------------------------------------- 开奖流程 8秒以内 -------------------------------
	// 亮牌2s + 闪烁结果2s(+1s复合收集庄家) + 收集庄家赢的筹码1s + 发散庄家输的筹码（更新庄家余额）1s + 发散闲家赢的筹码（更新闲家余额）1s
	// 是否要停止投注时间
	// 亮牌 TODO - 网络延时推送结果时的加速处理
	private rShowNums() {
		if(!cc.isValid(this.node))return;
		if(!this.node.active)	return

		this.boardNums.getComponent("CYLHDBoardNums").twShowNums(State.roomPlayInfo.luckyNum)
		let timescale = 1;
		if( Conf.GamePlayWay.ACCOUNTING_TIME==19)
		{
			timescale = 2;
		}
		this.scheduleOnce(this.rCollectToLucky.bind(this), 7.5/timescale)
		this.scheduleOnce(()=>{
        	let result:StateCom.TypeBet = StateTools.getAnimalFromLucky(State.roomPlayInfo.luckyNum)
			let audiolist = [StateCom.EAudioType.RESULT_0,StateCom.EAudioType.RESULT_1,StateCom.EAudioType.RESULT_2]
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO,{type: audiolist[result]});
		}, 7/timescale)
	}
	// 发散庄家输的筹码（更新庄家余额）
	private rCollectToLucky() {
		if(!cc.isValid(this.node))return;
		const isBetting = State.roomPlayInfo.roundState==StateCom.RoundState.BETTING
		if(!this.node.active || isBetting)	return;

		let timescale = 1;
		if( Conf.GamePlayWay.ACCOUNTING_TIME==19)
		{
			timescale = 2;
		}
		let p = this.boardNums.getComponent("CYLHDBoardNums").getPosition()
		this.boardJets.collectJetsToBanker(State.roomPlayInfo.luckyNum, p)
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO,{type: StateCom.EAudioType.JETS_BANKER_SPIT})

		this.scheduleOnce(this.rCollectToPrize.bind(this), 1/timescale)
	}
	private rCollectToPrize() {
		if(!cc.isValid(this.node))return;
		const isBetting = State.roomPlayInfo.roundState==StateCom.RoundState.BETTING
		if(!this.node.active || isBetting)	return

		let timescale = 1;
		if( Conf.GamePlayWay.ACCOUNTING_TIME==19)
		{
			timescale = 2;
		}

		let p = this.boardNums.getComponent("CYLHDBoardNums").getPosition()
		this.boardJets.collectJetsFromBanker(State.roomPlayInfo.luckyNum, p)
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO,{type: StateCom.EAudioType.JETS_BANKER_SPIT})

		this.scheduleOnce(this.rSendToUsers.bind(this), 1/timescale)
	}
	// 发散闲家赢的筹码（更新闲家余额）
	private rSendToUsers() {
		const isBetting = State.roomPlayInfo.roundState==StateCom.RoundState.BETTING
		if(!this.node.active || isBetting)	return;

		let timescale = 1;
		if( Conf.GamePlayWay.ACCOUNTING_TIME==19)
		{
			timescale = 2;
		}
		this.boardJets.sendJetToUsers(State.roundUserOffset.myOffset, State.roundUserOffset.usersDeskOffset);
		this.updateUserResultBalance();
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO,{type: StateCom.EAudioType.JETS_FLY_TO_USER});

		this.scheduleOnce(this.rEnd.bind(this), 0.8/timescale);
	}
	private rEnd() {
		if(!this.node.active)	return;

		// this.timeStartToShowResult = -1;
		this.resetBoardTypeBet();
		State.clearMyBetInfo();
	}

	// 倒数5秒
	private willPlayCountAudio() {
		if (State.roomPlayInfo.roundState != StateCom.RoundState.BETTING) return;
		var lessThan5 = State.roomPlayInfo.betTimeCount < 5 && this.indPlayCountdown5S >= 5;
		if (lessThan5) this.indPlayCountdown5S = State.roomPlayInfo.betTimeCount;
		if (State.roomPlayInfo.betTimeCount == this.indPlayCountdown5S) {
			this.indPlayCountdown5S--;
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.COUNT_DOWN });
		}
	}

	private toggleLoadingCover(show:boolean) {
		// this.node.emit(''+Conf.Evts.TOGGLE_LOAD,  show);
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.TOGGLE_LOAD_PAGE, show);

	}

	private refreshSoundSwitch() {
		this.btnSound.active = Conf.AppConfig.AUDIO_SWITCH;
		this.btnMute.active = !Conf.AppConfig.AUDIO_SWITCH;
	}
	/*************************************************** 其它流程 ************************************************/


	/*************************************************** 视图状态控制 ************************************************/
	
	// 设定投注板的触摸性
	private setAllBoardBetTouchable(can:boolean) {
		if(!cc.isValid(this.node))return;
		this.arrBetTypeBoard.forEach((v)=>{
			if(cc.isValid(v)){
				v.getComponent('CYLHDBoardTypeBet').setTouchable(can);
			}
		}, this);
	}

	// 两张牌中间倒计时
	private showTipCountdown(show:boolean) {
		if(this.cmpCountdown.active == show)	return
		this.cmpCountdown.active = show;
		if(show)    this.updateLbProgress();
	}
	private updateLbProgress() {
		if(!this.cmpCountdown.active)	return;
		this.labelCountdown.string = "" + State.roomPlayInfo.betTimeCount;
	}

	private showTipStartBet(s:boolean) {
		if(!cc.isValid(this.tipStartBet))return;
		if(this.tipStartBet.active == s)	return
		if(s && State.roomPlayInfo.timeProgress == 0 ){
			this.tipStartBet.active = s;
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.BEGIN_BET });
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.TIP_REMIND });
			setTimeout(()=>{
				if(!cc.isValid(this.tipStartBet))return;
				this.showTipStartBet(false)
			}, 1200)
		} else{
			this.tipStartBet.active = false;
		}
	}
	private showTipBlockBet(s:boolean) {
		if(!cc.isValid(this.node))return;
		if(this.tipBlockBet.active == s)		return
		
		let secnode:cc.Node = this.tipBlockBet.getChildByName("num");
		if( secnode )
		{
			let seclabel = secnode.getComponent(cc.Label);
			if( seclabel )
			{
				seclabel.string = Conf.GamePlayWay.BEFOREBLOCKTIME.toString();
			}
		}

		if(s && State.roomPlayInfo.timeProgress == Conf.GamePlayWay.BLOCK_BETTING_TIME ){
			this.tipBlockBet.active = s;
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.END_BET });
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.END_RING });
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.STOP_AUDIO, StateCom.EAudioType.COUNT_DOWN);
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.TIP_REMIND });
		} else{
			this.tipBlockBet.active = false;
		}
	}
	private showTipGetPrize(s:boolean) {
		if(!cc.isValid(this.node))return;
		if(this.tipGetPrize.active == s)		return
		this.tipGetPrize.active = s
		// let ani = this.tipGetPrize.getChildByName("ani").getComponent(sp.Skeleton)
		// if (!s)	{
		// 	ani.clearTracks();
		// 	return
		// }
		// ani.setAnimation(0, "animation", true);
	}

	// 设置6名桌面玩家在桌面的信息
	private resetDeskUsers(data) {
		if(!cc.isValid(this.node))return;
		this.arrUser.forEach((v, k)=>{
			if(cc.isValid(v)){
				let uf = data[k];
				v.getComponent('CYLHDUserDesk').initView(uf);
			}
		});
	}

	private updateUserResultBalance() {
		if(!cc.isValid(this.node))return;
		let arrOffset =  State.roundUserOffset.usersDeskOffset;
		let arrUsersInfo = State.roomPlayInfo.arrUserInfoDesk;
		let myOffset = State.roundUserOffset.myOffset;
		// console.info('updateUserResultBalance', arrOffset);
		for(var i=0; i<arrOffset.length && i<arrUsersInfo.length; i++) {
			var u = this.arrUser[i];
			if(cc.isValid(u)){
				u.getComponent('CYLHDUserDesk').setCoin(arrUsersInfo[i].balance-arrUsersInfo[i].lockMoney);
				u.getComponent('CYLHDUserDesk').shineWinDeskUser(arrOffset[i]);
			}
		}

		if (myOffset != 0) {
			let vs = StateTools.valShow(myOffset)
			let isWin = parseFloat(vs)>=0
			let m = this.compMe.getChildByName(isWin ? 'addMoney' : 'unaddMoney')
			m.getChildByName('label').getComponent(cc.Label).string = vs.replace(/\./g,'/').replace(/\-/,'')
			m.active = true
			setTimeout(()=>{
				m.active = false
			}, 2000)

			if(!isWin)	return

			let spine = this.compMe.getChildByName('spine');
			spine.active = true;
			AssistFunc.playSpine(spine,'tou_eff_shiny',false,()=>{});
			AssistFunc.playSpine(spine,'win',false,()=>{
				spine.active= false;
			});
		}
		this.updateMyBalance();
	}

	private setTypeBoardsVal() {
		if(!cc.isValid(this.node))return;
		State.roomPlayInfo.infoBetsAllRound.forEach((v)=>{
			if(cc.isValid(this.arrBetTypeBoard[v.type])){
				this.arrBetTypeBoard[v.type].getComponent('CYLHDBoardTypeBet').setBoardBetVal(State.getValSumOneType(v.type));
			}
		});
		State.roomPlayInfo.infoBetsMeRound.forEach((v)=>{
			if(cc.isValid(this.arrBetTypeBoard[v.type])){
				this.arrBetTypeBoard[v.type].getComponent('CYLHDBoardTypeBet').setBoardBetValMe(State.getMyBetValByType(v.type));
			}
		});
	}

	private resetTypeBoardsVal() {
		if(!cc.isValid(this.node))return;
		this.arrBetTypeBoard.forEach(v=>{
			if(cc.isValid(v)){
				v.getComponent('CYLHDBoardTypeBet').setBoardBetVal(0);
				v.getComponent('CYLHDBoardTypeBet').setBoardBetValMe(0);
			}
		})
	}

	// 设置倒计时时间 -1为隐藏,同时隐藏“下注时间”图片
	private setCountdown(num:number) {
		this.labelCountdown.string = '' + num;
	}
	// 因余额不足问题不能投注而显示观战中
	private toggleTipCantBet(show:boolean) {
		if(!cc.isValid(this.node))return;
		// var sk = this.boardWatching.getChildByName("New Node").getComponent(sp.Skeleton);
		this.boardWatching.active = show;
		// if(show) {
		// 	sk.setAnimation(0, "ani_gzz", true);
		// } else {
		// 	sk.clearTracks();
		// }
	}

	// 切换耐心等待下一局
	private showWaitNextRound(s:boolean) {
		
		if(!s) {// s==false
			const sumActions = this.boardWaiting.getNumberOfRunningActions()
			if(!this.boardWaiting.active || sumActions>0)	return
			// cc.warn('需要隐藏等待下一局 ', sumActions)
			// const actFade = cc.fadeTo(0.8, 0)
			// let a = cc.delayTime(1.2)
			// this.boardWaiting.stopAllActions()
			// this.boardWaiting.runAction(cc.sequence(a, actFade, cc.callFunc(()=>{
				this.boardWaiting.active = false
			// })))
			return
		}
		// cc.warn('需要显示等待下一局 ', s)
		this.boardWaiting.stopAllActions()
		this.boardWaiting.active = s
		this.boardWaiting.opacity = 255
		let dot1 = cc.find('Canvas/game/Waiting/wait_dot1');
		let dot2 = cc.find('Canvas/game/Waiting/wait_dot2');
		let dot3 = cc.find('Canvas/game/Waiting/wait_dot3'); 
		var action1_show = cc.fadeTo(0.5,255);
		var action1_hide = cc.fadeTo(0.5,0);
		var action2_show = cc.fadeTo(0.5,255);
		var action2_hide = cc.fadeTo(0.5,0);
		var action3_show = cc.fadeTo(0.5,255);
		var action3_hide = cc.fadeTo(0.5,0);
		dot1.stopAllActions()
		dot2.stopAllActions()
		dot3.stopAllActions()
		let callBack1 = cc.callFunc(()=>{
			dot2.runAction(cc.sequence(action2_show,action2_show,callBack2))
		})
		let callBack2 = cc.callFunc(()=>{
			dot3.runAction(cc.sequence(action3_show,action3_show,callBack3))
		})
		let callBack3 = cc.callFunc(()=>{
			dot1.runAction(action1_hide)
			dot2.runAction(action2_hide)
			dot3.runAction(action3_hide)
			dot1.runAction(cc.sequence(action1_show,action1_show,callBack1))
		})
		dot1.runAction(cc.sequence(action1_show,action1_show,callBack1))
	}
	// 初始化用户的头像和昵称
	private setAccountInfoView() {
		if(!cc.isValid(this.node))return;
		const lbID = this.compMe.getChildByName('lab_info_nick').getComponent(cc.Label);
		const nd = this.compMe.getChildByName('head').getChildByName('m').getChildByName('icon_tx')
		lbID.string = State.myComInfo.userName;
		AssistFunc.setHeadIcon(Conf.AppConfig.HeadUrl, nd, 82, 82);
	}
	private updateMyBalance() {
		if(!cc.isValid(this.node))return;
		const lb = this.compMe.getChildByName('lab_info_gold').getComponent(cc.Label);
		lb.string = StateTools.balanceShow(State.balanceAvailable());
	}
	// 清理重置3个筹码面板上的值
	private resetBoardTypeBet() {
		if(!cc.isValid(this.node))return;
		if(!cc.isValid(this.node))return;
		this.arrBetTypeBoard.forEach((v,k)=>{
			if(cc.isValid(v)){
				v.getComponent('CYLHDBoardTypeBet').resetBoard();
			}
		})
	}
	
	private toggleBoardHelp(bShow:boolean) {
		this.boardHelp.active = bShow;
        if(!bShow)  return

        let compScroll = this.boardHelp.getChildByName("pop_help")
        
        let lbsParent = compScroll.getChildByName("view").getChildByName("content")
        const r = State.myComInfo.roomNumber;
        lbsParent.getChildByName("l01").active = r=="01";
        lbsParent.getChildByName("l02").active = r=="02";
		lbsParent.getChildByName("l03").active = r=="03";
		lbsParent.getChildByName("l04").active = r=="04";
		let tempmax:string = cylhd_language.getTextByID(18);
		let tempmin:string = cylhd_language.getTextByID(18);
		if(this.roomMaxRed)
		{
			tempmax = this.roomMaxRed.toString();
		}
		if(this.roomMinRed)
		{
			tempmin = this.roomMinRed.toString();
		}

		let lbsParentList = {
			"01":[lbsParent.getChildByName("l01"),14],
			"02":[lbsParent.getChildByName("l02"),15],
			"03":[lbsParent.getChildByName("l03"),16],
			"04":[lbsParent.getChildByName("l04"),25],
		}
		if(hqq.cylhd_BetArea=="lhds"){
			lbsParentList = {
				"01":[lbsParent.getChildByName("l01"),19],
				"02":[lbsParent.getChildByName("l02"),20],
				"03":[lbsParent.getChildByName("l03"),21],
				"04":[lbsParent.getChildByName("l04"),26],
			}
		}else if(hqq.cylhd_BetArea=="lhdx"){
			lbsParentList = {
				"01":[lbsParent.getChildByName("l01"),22],
				"02":[lbsParent.getChildByName("l02"),23],
				"03":[lbsParent.getChildByName("l03"),24],
				"04":[lbsParent.getChildByName("l04"),27],
			}
		}
		if( lbsParentList[r] )
		{
			if( lbsParentList[r][0] )
			{
				let lbShow:cc.Node = lbsParentList[r][0];
				lbsParentList[r][0].getComponent(cc.Label).string = cc.js.formatStr(cylhd_language.getTextByID(lbsParentList[r][1]),tempmax);
				lbsParent.height = lbShow.height
			}
			else
			{
				this.boardHelp.active = false;
			}
		}
		else
		{
			this.boardHelp.active = false;
		}

        compScroll.getComponent(cc.ScrollView).scrollToTop();
	}

	private hidePrizeHistory() {
		if(!cc.isValid(this.node))return;
		this.boardPrizeHistory.getComponent("CYLHDBoardPrizeHistory").hide()
	}

	private hideBetRecord() {
		if(!cc.isValid(this.node))return;
		this.boardBetRecord.getComponent("CYLHDBoardBetRecord").hide()
	}
	
	toggleBoardPlayerList(bShow:boolean) {
		if(!cc.isValid(this.node))return;
		if(bShow)
			this.boardPlayerList.getComponent('CYLHDBoardPlayerList').show(this.roomNumber);
		else
			this.boardPlayerList.getComponent('CYLHDBoardPlayerList').hide();
	}
	private showCanNotExitRoom(bShow:boolean) {
		this.showTipAlert(bShow, "本局游戏结算还未结束，请在本局结算完成后再退出游戏。")
	}
	private showTipCancelRound(bShow:boolean) {
		if(!bShow) {
			this.showTipAlert(bShow)
			return
		}
		let msg = "第"+State.issueIDCancelRound+"期开奖数据延迟或者失败， 平台判定此局为流局， 您当期所下注的金币已退回您游戏账号。"
		this.showTipAlert(bShow, msg)
	}
	private showTipAlert(bShow:boolean, msg?:string) {
		if(!cc.isValid(this.node))return;
		let p = this.node.getChildByName("ReturnAlert")
		p.active = bShow
		if(!bShow)	return

		let l = p.getChildByName("tip").getComponent(cc.Label)
		l.string = msg
	}

	/*************************************************** 视图状态控制 ************************************************/

	/*************************************************** 点击事件 ************************************************/
	touchCoinBet(evt) {
		
	}
	touchBoardBet(evt, typeBet) {
		if(!cc.isValid(this.node))return;
		if (!StateTools.canBetMeNow()) {
			if (State.myLocalPlayInfo.levelBetCan < 1 && !State.isStatusNotBetting() && State.clientIntInfo.canTouchMap) {
				var msg = this.boardWatching.active ? "金币不足，请充值" : "金币不足，无法继续下注";
				ACM.getEvtMgrIns.dispatch(Conf.EventKind.POP_MSG, msg);
			}
			return;
		}

		if(State.isStatusNotBetting())		return

		// cc.warn('bet ', typeBet)
		var objBetInfo: StateCom.InfoBet = {
			type: typeBet,
			val: this.boardJets.getSelectBetVal(),
			position: typeBet < StateCom.TypeBet.Big ? 0 : this.boardNums.getComponent("CYLHDBoardNums").getPosition(),
		};
		
		ACM.getSocketInst.sendMessage(Conf.MsgKind.Bet, {
			roundID: State.roomPlayInfo.roundID,
			info: objBetInfo
		})
		hqq.logMgr.log("彩源龙虎斗 roomid=",this.roomNumber," roundID=",State.roomPlayInfo.roundID," type=",objBetInfo.type," val=",objBetInfo.val," position=",objBetInfo.position);
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.CLICK });
		
	}
	touchBtnBack() {
		if (!State.clientIntInfo.logined || !State.clientIntInfo.onService)   return;
		if(!State.clientIntInfo.canTouchMap && !State.clientIntInfo.showRankList) return;
		// const b = State.isUserReadyBanker(State.myComInfo.userID) || State.myComInfo.userID===State.roomPlayInfo.theBanker.userID
		// var hasBankerBalance = !StateTools.isBalanceZero(State.myComInfo.bankerBalance);//State.myComInfo.bankerBalance.toFixed(2) != "0.00";
		if (State.amIBettedCurRound() ) {// TODO 提示已投注 // || hasBankerBalance
			this.showCanNotExitRoom(true);
		} else {
			this.ensureExitRoom();
		}
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.CLICK });
	}
	touchBtnHelp() {
		this.toggleBoardHelp(true);
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.CLICK });
	}
	touchBtnSoundSwitch() {
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.SWITCH_AUDIO);
		this.refreshSoundSwitch();
		if(Conf.AppConfig.AUDIO_SWITCH) {
			ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, {type:StateCom.EAudioType.BG_GAME_ROOM, loop:true})
		}
	}
	touchBtnOnlineUser(evt) {
		this.toggleBoardPlayerList(true);
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.CLICK });
	}
	touchBtnEnsureExit(evt) {
		this.toggleLoadingCover(true);
		ACM.getSocketInst.sendMessage(Conf.MsgKind.ExitRoom, {});
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.CLICK });
	}
	touchBtnCloseAlert(evt) {
		this.showTipAlert(false);
		ACM.getEvtMgrIns.dispatch(Conf.EventKind.PLAY_AUDIO, { type: StateCom.EAudioType.CLICK });
	}
	touchBtnBetRecord(evt) {
		if(!cc.isValid(this.node))return;
		this.boardBetRecord.getComponent("CYLHDBoardBetRecord").show()
	}
	touchBtnPrizeHistory(evt) {
		if(!cc.isValid(this.node))return;
		this.boardPrizeHistory.getComponent("CYLHDBoardPrizeHistory").show()
	}
	/*************************************************** 点击事件 ************************************************/


	private registerEvts() {

		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.BetR, this.onBetR.bind(this));
		// ACM.getSocketInst.registerEvtModel(Conf.MsgKind.KeepBetR, this.onKeepBetR.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.JoinRoomR, this.onJoinRoomR.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.ExitRoomR, this.onExitRoomR.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.RoundPlayInfoP, this.refreshOneRound.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.BetP, this.onBetPush.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.ResultRoundP, this.onRoundResultPush.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.CancelRoundP, this.onCancelRoundPush.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.RoomRedLimitR, this.onRoomRedR.bind(this));
		ACM.getSocketInst.registerEvtModel(Conf.MsgKind.ZhiBoUpdateBalanceP, this.ZhiBoUpdateBalanceP.bind(this));

		ACM.getEvtMgrIns.register(Conf.EventKind.ENSURE_EXIT_ROOM, "SceneGame", this.ensureExitRoom.bind(this));
		ACM.getEvtMgrIns.register(Conf.EventKind.UPDATE_BALANCE_AVAILABLE, "SceneGame", this.updateMyBalance.bind(this));

		this.tickerRun = ACTick.newTick(0.2, this.onTickRun, this);// TODO

	}
	private unregisterEvts() {

		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.BetR);
		// ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.KeepBetR);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.JoinRoomR);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.ExitRoomR);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.RoundPlayInfoP);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.BetP);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.ResultRoundP);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.CancelRoundP);
		ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.ZhiBoUpdateBalanceP);
		// ACM.getSocketInst.unregisterEvtModel(Conf.MsgKind.UpdateBalanceP);

		ACM.getEvtMgrIns.dispatch(Conf.EventKind.STOP_ALL_LOOP_AUDIO);
		// ACM.getEvtMgrIns.dispatch(Conf.EventKind.CLOSE_POP_LOAD);
		ACM.getEvtMgrIns.unregisterInComp("SceneGame");
	}

	onDestroy() {

		cc.log("destroy-SceneGame");
	}

	ZhiBoUpdateBalanceP(data:msg.ZhiBoUpdateBalancePush){
		if(!cc.isValid(this.node))return;
		if(State.isMyID(data.userID))
		{
			State.myComInfo.balance = data.balance;
			const lb = this.compMe.getChildByName('lab_info_gold').getComponent(cc.Label);
			if(State.roomPlayInfo.roundState == StateCom.RoundState.SHOW_PRIZE){
				lb.string = StateTools.balanceShow(Number(lb.string)-data.giftMoney);
			} else{
				lb.string = StateTools.balanceShow(data.balance);
			}
		}
	}
}
