//版本号
const Version = "1.0.25"
//游戏平台
const ePlatform = {
    Native:0,               //原生...
    QiBao:1,                //七宝平台
    BoChen:2
} 

const Platform2Hall = {
    0:"Buyu_Hall",
    1:"Buyu_Hall_qibao",
    2:"Buyu_Hall_bochen"
}

const eCurPlatform = ePlatform.Native;

//玩家模式..
const PlayerMode = {
    None:0,             //玩家不受任何控制，傻呆着不动吧
    Manual:1,           //本机手动控制
    Remote:2,           //远程控制，就是其它玩家了，由服务器同步其它玩家指令
    AI:3,               //本机AI控制，调试用
}

//射击模式
const FireMode = {
    None:0,
    Manual:1,           //手动控制，普通射击
    Auto:2,             //自动射击
    Lock:3              //锁定射击
}

const ClientWindowEvent = {
        /**脚本加载完成后通过window.postMessage发送 */
        CLIENT_LOAD: '__Loading',
        /**服务器连接成功后通过window.postMessage发送 */
        CLIENT_ENTER: '__enter',
        /**游戏登陆成功后通过window.postMessage发送 */
        CLIENT_DONE: '__done',
        /**用户确认退出游戏返回大厅后通过window.postMessage发送 */
        CLIENT_RETURN: '__back',    
}

const MaxPlayerNum = 4;

const BGM_DEF = {
    BGM_NORMAL:1,
    BGM_TENSION:2,
    BGM_FIERCE:3
}

const SOUND_DEF = {
    SUD_COIN:1,
    SUD_SWITCHLevel:2,
    SUD_SHOOT:3,
    SUD_BOOM:4,
    SUD_LASER:5,
    SUD_CATCHBOSS:6,
    SUD_WAVE:7,
    SUD_HITBUTTON:8,
    SUD_CATCHFISH01:9,
    SUD_CATCHFISH02:10,
    SUD_CATCHFISH03:11,
    SUD_COINJUMP1:12,
    SUD_COINJUMP2:13,
    SUD_COINJUMP3:14,
    SUD_COINBACK1:15,
    SUD_COINBACK2:16,
    SUD_ALERT:17,
}

const WaitType = {
    WT_EnterGame:1,
    WT_Breath:2,
    WT_Login:3,
    WT_Connecting:4,
    WT_ExitGame:5
}

module.exports ={
    PlayerMode:PlayerMode,
    MaxPlayerNum:MaxPlayerNum,
    FireMode:FireMode,
    ClientWindowEvent:ClientWindowEvent,
    BGM_DEF:BGM_DEF,
    SOUND_DEF:SOUND_DEF,
    Version:Version,
    eCurPlatform:eCurPlatform,
    Platform2Hall:Platform2Hall,
    WaitType:WaitType,
} 