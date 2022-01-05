
import * as StCom from "./CYLHDStateCommon";
import ACUtils from "./AC/ACCYLHDUtils";
import * as StateCom from "./CYLHDStateCommon";
import StateTools from "./CYLHDStateTools";
import * as Conf from "./CYLHDStateConfig";

module LHD {

export class State {

	// 说明：
	// -S 服务器缓存，重连时需要发送过来
	// -C 客户端缓存，重连时无需发送过来

	public clientIntInfo = {
		logined:  false,// 是否已经登陆
		onLine:  false,// 是否在线
		onService: true,// 中心服是否连接正常
		// soundSwitch:  true,// 声音控制
		kickedOutByServer:  false,// 是否因异地登陆被踢，此后不再自动重连
		canTouchMap: true, // 地图层控件的触摸事件是否可触发
		showRankList: false, // 在线排名列表是否已显示
		enabledBalanceUpdate: true // 是否可以刷新余额，在一局结果显示阶段不可自动刷新
	}
	public serverInfo:{
		taxPt:number
	} = {
		taxPt:0.05
	}
	// 我的玩家信息 
	public myComInfo :{
		userID: number,
		userName: string,
		balance: number,
		lockMoney: number,
		roomNumber: string,
	} = {
		userID: 0,
		userName: "",
		balance: 0,
		lockMoney: 0,
		roomNumber: StCom.EmptyRoomNumber,// 空房间""
	}

	// 大厅房间列表数据 -S
	public roomListInfo:StCom.RoomInfoOfLobby[] = [];
	// 在游戏房间的数据
	public roomPlayInfo: StCom.RoomPlayInfo = {
		roundID: 0,
		startTimeOfRound: 0,
		roundState: StateCom.RoundState.BETTING,
		betTimeCount: 30,
		arrUserInfoDesk:[],
		numsLuckyRecent7: [],
		infoBetsMeRound:[],
		infoBetsAllRound: [],
		luckyNum: "",//"0,0,0,0,0",
		luckyNumLastRound: "",
		timeProgress: 0,
		positionSelect: 0,
	}
	public issueIDCancelRound:string = ""
	// 我在房间的的数据信息
	public myLocalPlayInfo = {
		// 我的最近一次投注信息 用于续投功能 -C
		myKeepBetInfo:[],// StCom.InfoBet[] = 
		// 我的最近一次投注总额，用于续投显示 -C
		sumLatestBet:0,
		// 我可以押注的种类数0～4 动态化 -C
		levelBetCan:0,
		// 刚进入房间时余额低于50，需要充值后才能投注 -C
		cannotBetBeforeBuyCoin:false
	}

	// 展示到桌面上的投注数组，仅展示类型和数字即可 -C
	// public arrObjBetInfoDesk:StCom.InfoBet[];
	// 该轮中奖号码信息
	// public objLuckyInfo:StCom.InfoBet;
	public roundUserOffset = {// 结算增减值
		myOffset:0,
		usersDeskOffset:[],
		bankerOffset:0,
		bankerTypeOffset: []
	}

	public curScene:string;
	
	//------------------------ 用户类 ------------

	public balanceAvailable() :number {
		var val = this.myComInfo.balance - this.myComInfo.lockMoney;
		if(val<0)   val = 0;
		return val;
	}

	public isInGameRoom(): boolean {
		return this.myComInfo.roomNumber != StCom.EmptyRoomNumber;
	}

	public isMyID(uID:number) {
		return this.myComInfo.userID==uID;
	}

	public updateMyBalanceAndLock(balance:number, lock:number) {
		this.myComInfo.balance = balance;
		this.myComInfo.lockMoney = lock;
	}

	public updateBanlanceAnyUserOnDeskOrMe(userID:number, balance:number, lock:number) {
		// balance = parseFloat(balance.toFixed(2))
		if(this.isMyID(userID)) {
			this.updateMyBalanceAndLock(balance, lock);
		}
		var arr = this.roomPlayInfo.arrUserInfoDesk;
		for(var i=0; i<arr.length; i++) {
			var u = arr[i];
			if(userID!=u.userID)  continue;
			u.balance = balance;
			u.lockMoney = lock;
		}
	}

	public canUpdateBalance(){
		return this.clientIntInfo.enabledBalanceUpdate;
	}
	public toggleEnabledBalanceUpdate(enable:boolean) {
		this.clientIntInfo.enabledBalanceUpdate = enable;
	}
	// 在大厅收到结算后清除房间号
	// public clearRoomNumberAccounted(roomNumber:string) {
	//     if(this.roomPlayInfo.roomNumber==roomNumber) {
	//         this.roomPlayInfo.roomNumber = "";
	//     }
	// }
	//------------------------ 用户类 ------------

	//------------------------ 其它 ------------
	public updateRoundStatus() {
		// const s0 = this.roomPlayInfo.roundState

		let timeStampMilNow = ACUtils.timeStampMilSec() - 200
		let secondProgOfRound :number = Math.max(0, parseInt((timeStampMilNow)/1000+"") - this.roomPlayInfo.startTimeOfRound);// 防止<0?
		// console.log('SecondProg', secondProgOfRound);
		
		if(secondProgOfRound <= Conf.GamePlayWay.BLOCK_BETTING_TIME) {// 押注时间
			this.roomPlayInfo.roundState = StateCom.RoundState.BETTING;
			this.roomPlayInfo.betTimeCount = Conf.GamePlayWay.BLOCK_BETTING_TIME - secondProgOfRound;
		} else if(secondProgOfRound <= Conf.GamePlayWay.ACCOUNTING_TIME) {// 提前6秒封盘时间
			this.roomPlayInfo.roundState = StateCom.RoundState.BLOCK_BETTING;
			this.roomPlayInfo.betTimeCount = 0
		} else if(this.roomPlayInfo.luckyNum == "") {// 获取奖源状态，等待奖源推送
			this.roomPlayInfo.roundState = StateCom.RoundState.GET_PRIZE;
		} else {// 已开完奖，等待下一局
			this.roomPlayInfo.roundState = StateCom.RoundState.SHOW_PRIZE;
		}

		this.roomPlayInfo.timeProgress = secondProgOfRound
		
		// cc.log('second = ', secondProgOfRound, this.roomPlayInfo.roundState)
		// if(s0!=this.roomPlayInfo.roundState) {
		// 	cc.log('RoundState-Changed : ', this.roomPlayInfo.roundState)
		// }
	}

	public isStatusNotBetting() {
		return this.roomPlayInfo.roundState!=StateCom.RoundState.BETTING;
	}
	
	public canTouchMap() {
		return this.clientIntInfo.canTouchMap;
	}

	public updateLevelBetCan() {
		let l = StateTools.levelCanBetByBalance(this.balanceAvailable());// 0~4
		if(l==0 && this.balanceAvailable()>=1 && !this.myLocalPlayInfo.cannotBetBeforeBuyCoin) {// 在该局有投注
			l = 1;
		}

		this.myLocalPlayInfo.levelBetCan = l;
	}

	//------------------------ 其它 ------------

	//------------------------------------------- 投注信息相关 -------------------------------
	public amIBettedCurRound() {
		return this.roomPlayInfo.infoBetsMeRound.length>0;
	}
	public clearMyBetInfo() {
		this.roomPlayInfo.infoBetsMeRound = [];
	}
	public getMyBetValByType(tp:StCom.TypeBet):number{
		for(var i=0; i<this.roomPlayInfo.infoBetsMeRound.length; i++) {
			var bt = this.roomPlayInfo.infoBetsMeRound[i];
			if(bt.type==tp) return bt.val;
		}
		return 0
	}

	public pushMyBetInfo(info:StCom.InfoBet) {
		var ifN0 = {
			val:info.val,
			type:info.type,
			position: info.position,
		}
		var bHasSameType:boolean = false;
		for(var i in this.roomPlayInfo.infoBetsMeRound) {
			var one = this.roomPlayInfo.infoBetsMeRound[i];
			bHasSameType = this.theSameTypeBet(ifN0, one);
			if(bHasSameType) {
				one.val += ifN0.val;
				break;
			}
		}
		if(!bHasSameType)   this.roomPlayInfo.infoBetsMeRound.push(ifN0);

		// cc.log(`info.position=${info.position}`)
		if(info.type>=StCom.TypeBet.Big && info.position!=this.roomPlayInfo.positionSelect) {
			this.roomPlayInfo.positionSelect = info.position
			cc.log('投注位置变化', info.position)
		}
	}

	public pushInfoBetsAll(info:StCom.InfoBet) {
		var ifN0 = {
			val:info.val,
			type:info.type,
			position: info.position,
		}
		var bHasSameType:boolean = false;
		for(var i in this.roomPlayInfo.infoBetsAllRound) {
			var one = this.roomPlayInfo.infoBetsAllRound[i];
			bHasSameType = this.theSameTypeBet(ifN0, one);
			if(bHasSameType) {
				one.val += ifN0.val;
				break;
			}
		}
		if(!bHasSameType)   this.roomPlayInfo.infoBetsAllRound.push(ifN0);
	}
	public getValSumOneType(tp:StCom.TypeBet) {
		var v = 0;
		for(var i in this.roomPlayInfo.infoBetsAllRound) {
			var if0 = this.roomPlayInfo.infoBetsAllRound[i];
			if(if0.type==tp){
				v = if0.val;
				break;
			}
		}
		return v;
	}
	public updateMyPositionSelect(bets:StCom.InfoBet[]) {
		let p = 0
		for(let i in bets) {
			let b = bets[i]
			if(b.type<StCom.TypeBet.Big)	continue
			p = b.position
			break
		}

		this.roomPlayInfo.positionSelect = p
		cc.log(`updateMyPositionSelect - positionSelect=${this.roomPlayInfo.positionSelect}`)
	}

	private theSameTypeBet(if0:StCom.InfoBet, if1:StCom.InfoBet) {
		return if0.type == if1.type;
	}

	public unlockAllUserBetMoney() {
		this.myComInfo.lockMoney = 0;

		var arrU = this.roomPlayInfo.arrUserInfoDesk;
		for(var i=0; i<arrU.length; i++) {
			var u = arrU[i];
			u.lockMoney = 0
		}
	}
	// // 保存续投信息 在投注结束时调用
	// public saveInfoToKeeptBet() {
	// 	if(this.roomPlayInfo.infoBetsMeRound.length==0)  return;// 此轮未投注
	// 	var numSum = 0;
	// 	for(var i=0; i<this.roomPlayInfo.infoBetsMeRound.length; i++) {
	// 		var objInfo = this.roomPlayInfo.infoBetsMeRound[i];
	// 		numSum += objInfo.val;
	// 	}
		
	// 	this.myLocalPlayInfo.sumLatestBet = numSum;
	// 	this.myLocalPlayInfo.myKeepBetInfo = this.roomPlayInfo.infoBetsMeRound.slice();
	// }

	//-------------------------------------------- 投注信息相关 ------------------------------



}
}
export default new LHD.State();