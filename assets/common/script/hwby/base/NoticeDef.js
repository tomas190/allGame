const NoticeDef = {
    Score:0,             //玩家分数刷新
    EnterGame:1,         //玩家进入游戏   
    GenFish:2,          //生成一条鱼 
    GenBatchFishes:3,   //生成一批鱼
    KillFish:4,         //杀死一条鱼
    PlayerJoin:5,       //其它玩家加入房间
    Fire:6,             //其它玩家开火
    PlayerLeave:7,      //其它玩家离开游戏
    CannonLevel:8,      //玩家改变炮台等级
    CannonType:9,       //玩家改变炮台类型
    LockFish:10,        //玩家锁定鱼
    CoinChange:11,      //玩家金币增量变化
    ChangeScene:12,     //切换场景
    SpecialFishGroup:13,//鱼阵
    SwitchFireMode:14,  //切换射击模式
    RefrshUserInfo:15,  //刷新玩家信息
    Breathe:16,         //收到服务器心跳
    LoginRsp:17,        //收到用户登录成功返回
    HitInvalid:18,      //有人无效命中，清除无效鱼（如果本地也有的话）
    WaitFishGroup:19,   //刚进入游戏时适逢鱼阵，等待鱼阵结束
    IdleOverTip:20,     //闲置超时提示
    PlayerWakeUp:21,    //玩家重新开始活动
    ShowCommTips:22,    //弹出通用提示
    PlayMusic:23,       //播放音乐
    PlayEffect:24,      //播放音效
    PlayEffectInfo:25,  //复杂控制播放音效
    StopMusic:26,       //停止播放音乐
    StopEffect:27,      //停止播放音效
    ServerVersion:28,   //服务器版本号
    ReqLeavaGame:29,    //玩家请求离开游戏
    FishZIndex:30,      //鱼的ZIndex
    //ClearFishZIndex:31, //清空鱼的ZIndex调试信息
}

module.exports = NoticeDef;