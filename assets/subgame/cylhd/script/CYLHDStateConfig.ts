
export const AppConfig = {
    Version: "1.4.8",
    IconPath: "head/im_head",
    UserID: 193939295,
    UserName: "193939295",
    Password: "123456",
    GameID: "5b1f3a3cb76a591e7f251733",//"5b1f3a3cb76a591e7f251717",

    // ServerURL: "ws://127.0.0.1:1354",// Local
    // DevAccount: [222163449],// DEV , 969069016, 109177324, 106174073, 782538094
    // ServerURL: "ws://game.539316.com/cylhd",// Dev 
    
    ServerURL: "ws://game.lymrmfyp.com/cylhd",// PRE
    // ServerURL:"ws://game.tiaocaigroup.com/cylhd",
    DevAccount: [759323609],// PRE 
    // DevAccount: [800880048],// PRE 

    IsDebug: true,
    StageTargetSize: {
        width:1334,
        height:750
    },
    HeadUrl:"",
    ResPath:"cylhd/",
    AUDIO_SWITCH:true,
    DevAccountPsw: "123456"
}

export enum EventKind {
    BACK_HALL,
    TO_PAY_SCENE,
    CHANGE_SCENE,
    REFRESH_ROOMLIST_LOBBY,
    INIT_ROOMLIST_LOBBY,
    UPDATE_BALANCE_AVAILABLE,

    SOCKET_CONNECTED,
    SOCKET_CLOSED,
    SOCKET_RECONNECTED,

    C2S_Login,
    C2S_Logout,

    S2C_Connect,
    S2C_Login,
    S2C_Logout,
    S2C_UpdateUserInfo,

    POP_ENSURE_EXITROOM,
    POP_IN_OTHER_ROOM,
    POP_GAME_HELP,
    POP_OFFLINE,// 掉线
    POP_SERVICE_PAUSE,// 游戏服务与中心服断连

    HIDE_EXITROOM,
    HIDE_OFFLINE,
    HIDE_SERVICE_PAUSE,

    ENSURE_EXIT_ROOM,
    TOGGLE_WATCH_PLAY,
    SHOW_LOBBY_LOADING,

    ANI_WATCH_PLAY,
    ANI_START_BET,
    ANI_END_BET,

    SET_NOTICE_INFO,
    REFRESH_USER_RESULT_BALANCE,
    REFRESH_MY_RESULT_BALANCE,

    POP_LOAD,
    CLOSE_POP_LOAD,
    POP_MSG,
    // CLOSE_POP_MSG,
    PLAY_AUDIO,
    STOP_AUDIO,
    STOP_ALL_LOOP_AUDIO,
    SWITCH_AUDIO,
    POP_USER_RANK,
    POP_APPLY_BANKER,
    POP_BANKERS_WAIT,
    POP_RESULT_ME,
    
    // TOGGLE_ENABLE_TOUCH_MAP,
    TOUCH_BOARD_BET,
    REFRESH_POP_BANKER_LIST,
    CHANGE_BANKER,
    TOGGLE_BOARD_TREND,
    CLOSE_POP_RESULT_ME,

    UPDATE_USERS_ONDESK_BALANCE,
    BTN_WAIT_ARROW,

    TOUCH_BACK_IN_LOAD,
    TOGGLE_LOAD_PAGE,

    EXIT_SERVER_TIMEOUT,
}

export enum MsgKind {
	Ping = 0,
	Pong = 1,

	Login = 2,
	LoginR = 3,

	Logout = 4,
	LogoutR = 5,

	JoinRoom = 6,
	JoinRoomR = 7,

	ExitRoom = 8,
	ExitRoomR = 9,

	Bet = 10,
	BetR = 11,

	KeepBet = 12,
	KeepBetR = 13,

	History = 14,
	HistoryR = 15,

	RoundPlayInfoP = 16,
	RoomListLobbyP = 17,

//	RoomProgressLobbyP = 18,
	CancelRoundP = 18,
	BetP = 19,

	ResultRoundP = 20,
	UpdateBalanceP = 21,

	UpdateServiceP = 22,
	PauseServiceP = 23,

	KickedOutP = 24,
	Error = 25,

	UserRank = 26,
	UserRankR = 27,

	BetRecord = 28,
	BetRecordR = 29,
    RoomRedLimit = 30,
    RoomRedLimitR = 31,
    ZhiBoUpdateBalanceP = 32,
}

export enum StatusCode {
    SUCCESS,
    FAILED,
    
}

export const GamePlayWay = {
    BALANCE_AT_LEAST_CAN_PLAY: [10, 10, 10, 50, 100, 500, 1000],
	SUM_NUMS: 3, // 0~36
	ARR_LOSS_PERCENT: [8, 1, 1, 1, 1, 1, 1], // 各押注类型的赔率
	MIN_ONE_BET: [1, 1, 1, 1, 1, 1, 1], // 投注限额
	MAX_ONE_BET: [100, 200, 300, 500, 1000, 2000, 4000], // 投注限额
    ONE_ROUND_TIME: 60,
    BETTING_TIME: 0,
    BLOCK_BETTING_TIME: 20,
    ACCOUNTING_TIME: 36,
    BET_VALS: [1, 5, 10, 50, 100, 500, 1000],
	// 比牌大小： Num%13 0～12 13～25
	SUM_FLOWER  :4 ,//0 13
    SUM_POKER_NUM  :13,// A~10~JQK 
    LEAST_BALANCE_UP_BANKER: 5000,// 上庄最低持有金额
    TypeName: ["和", "龙", "虎", "大", "小", "单", "双"],
    BEFOREBLOCKTIME:0,
}

export const UIConf = {
    BetGrid : {
        w:175,//305,//277,
        h:165,//286,//260,
        // padding:60,
        // gap: 8
    },
    RoadGrid :{
        BigRoad:{
            c: 24,
            r: 6
        },
        
        ThreeRoad:{
            c: 24,
            r: 6
        }
    }
}

enum ErrCode{
	//请求成功
	SUCCESS = 0,
	//非法数据
	DATA_ILLEGAL = 1, 
	//余额不足
	BALANCE_NOT_ENOUGH = 2,
	//数据库读写失败
	DATABASE_READ_WRITE_FAILED = 3,
	//中心服务器中断
	CENTER_SERVER_DISCONNECT = 4,
    //
    EXCEED_LIMIT_BET = 5,
	//登入登出
	//用户不存在
	USER_NOT_EXIST = 100, 
	//账号在其他设备登陆
	OTHER_DEVICES_LOGIN = 101, 
	//用户被封
	USER_DISABLE = 102, 
	//投注时间截止
	BET_TIME_END = 103,
	//投注超额
	MORETHAN_LIMIT = 104,
	// 在其它房间
	IN_OTHER_ROOM = 105,
	// 该局没有投注过
	// NOT_BET = 106,
	// 不在该房间中
	NOT_IN_THIS_ROOM = 107,
	// 上庄金额不足
	MONEY_BE_BANKER_NOT_ENOUGH = 108,
	// 已申请上庄
    ALREADY_APPLY_BANKER = 109,
    // 正在坐庄不能投注
    CAN_NOT_BET_ON_BANKER = 110,
	// 房间不存在，没有该房间号
	ROOM_NOT_EXIST = 111
}

const ErrMsg = [];
ErrMsg[ErrCode.DATA_ILLEGAL] =  "非法数据";
ErrMsg[ErrCode.BALANCE_NOT_ENOUGH] =  "余额不足";
ErrMsg[ErrCode.DATABASE_READ_WRITE_FAILED] =  "数据库读写失败";
ErrMsg[ErrCode.CENTER_SERVER_DISCONNECT] =  "中心服务器中断";
ErrMsg[ErrCode.USER_NOT_EXIST] =  "用户不存在";
ErrMsg[ErrCode.OTHER_DEVICES_LOGIN] =  "账号在其他设备登陆";
ErrMsg[ErrCode.USER_DISABLE] =  "用户被封";
ErrMsg[ErrCode.BET_TIME_END] =  "投注时间截止";
ErrMsg[ErrCode.MORETHAN_LIMIT] =  "玩家已经达到此局最大下注金额";
ErrMsg[ErrCode.IN_OTHER_ROOM] =  "";// 在其它房间
// ErrMsg[ErrCode.NOT_BET] =  "该局没有投注过";
ErrMsg[ErrCode.NOT_IN_THIS_ROOM] =  "不在该房间中";
ErrMsg[ErrCode.MONEY_BE_BANKER_NOT_ENOUGH] =  "上庄金额不足";
ErrMsg[ErrCode.ALREADY_APPLY_BANKER] =  "已申请上庄";
ErrMsg[ErrCode.CAN_NOT_BET_ON_BANKER] =  "正在坐庄不能投注";
ErrMsg[ErrCode.ROOM_NOT_EXIST] =  "房间不存在";
ErrMsg[ErrCode.EXCEED_LIMIT_BET] =  "投注无效";

function getErrMsg(nCode){
    return ErrMsg[nCode] || "";
}
export {ErrCode, getErrMsg}

export interface OnlinePlayerData{
    userName?: (string|null);

    /** OnlinePlayerData headUrl */
    headUrl?: (string|null);

    /** OnlinePlayerData userID */
    userID?: (number|null);

    /** OnlinePlayerData userGold */
    userGold?: (number|null);

    /** OnlinePlayerData total20bet */
    total20bet?: (number|null);

    /** OnlinePlayerData total20win */
    total20win?: (number|null);
}