
export enum SceneIndex {
	LOAD,
	LOBBY,
	GAME
}

export enum EAudioType {
	BG_LOBBY,
	BG_GAME_ROOM,
	
	BACK_BTN,

	BET_JET_S0,
	BET_JET_S1,
	BET_JET_SM,
	BET_JET_SL,
	JETS_COLLECT,
	BEGIN_BET,
	END_BET,
	TIP_REMIND, // 配合begin/end bet
	
	COUNT_DOWN,
	END_RING,
	N1,
	N2,
	N3,
	N4,
	N5,
	N6,
	N7,
	N8,
	N9,
	N10,
	N11,
	N12,
	N13,

	RESULT_0,
	RESULT_1,
	RESULT_2,

	YOU_WIN,
	YOU_LOSE,

	CHANGE_BANKER,
	CARD_CLIP,

	JETS_FLY_TO_USER,
	JETS_BANKER_SPIT,
//   CLICK_AREA_BET,
	CLICK,
	CLICK_JET_FLOAT,		  
}
export enum RoundState {
	BETTING,
	BLOCK_BETTING,
	GET_PRIZE,
	SHOW_PRIZE,
	CANCEL_ROUND,
	// ACCOUNTING // 结算中
}

export enum GameStatus {
	LOBBY,
	GAME
}

export interface RoomInfoOfLobby {
	roomNumber: string,
	open: number,
	// startTime: number,
	// arrLuckyHistory: number[],
	// redLimitVal: number
}
export interface UserInfoOnDesk {
	userID: number,
	headUrl: string,
	balance: number,
	lockMoney: number,
	userName: string
}

export interface Banker {
	userID: number,
	userName: string,
	headUrl: string,
	bankerBalance: number,
}

export interface RoomPlayInfo {
	// 空字符串""表示不在任何房间 -S
	// roomNumber:string,
	// 局ID -S 
	roundID: number,
	// 该轮开始的时间戳 -S
	startTimeOfRound: number,
	// 桌面上3个玩家的信息 -S
	arrUserInfoDesk: UserInfoOnDesk[],
	// 所在房间最近7轮中奖号码 -S
	numsLuckyRecent7: number[],
	// 我这局的全部投注信息 -S
	infoBetsMeRound: InfoBet[],
	// 全部玩家这轮的投注信息 -S
	infoBetsAllRound: InfoBet[],
	// 该局中奖号码 -S
	luckyNum: string,
	// 上局号码
	luckyNumLastRound: string,
	// 房间状态
	roundState: RoundState,
	// 当前投注倒计时秒数
	betTimeCount: number,
	// 开局以来的时间（s）
	timeProgress: number,
	// “个”区域位置 万～个：1～5，每局开局时重置为0
	positionSelect: number,
}
  // export interface 
export enum TypeBet {
	Equal,
	Dragon,
	Tiger,
	Big,
	Small,
	Odd,
	Even,
	None
}
	// LuckyEqual int32 = 0 
	// LuckyDragon int32 = 1
	// LuckyTiger int32 = 2
	// LuckyNone  int32 = 3 
export interface InfoBet {
	type: TypeBet,// 投注类型 0～6:龙虎和大小单双
	val: number, // 投注筹码数 1/5/10/50/100/500/1000
	position: number //"个"区域大小单双投注的数字位置 1～5分别为万位～个位
}

export enum ActionBanker {
	DOWN,
	UP,
	CHANGE
}

export const EmptyRoomNumber = "";
