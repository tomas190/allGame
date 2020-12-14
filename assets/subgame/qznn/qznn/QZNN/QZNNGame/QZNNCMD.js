var cmd = {}
cmd.uid = null;//玩家登陆信息
cmd.RELEASE = false;
cmd.MAX_COUNT = 5; //几张牌
cmd.area_number = null //场号
cmd.MY_SEAT = null; //自己的座位号
cmd.GAME_PLAYER = 5; //游戏总的玩家
cmd.PLAYER_DATAS = []; //房间玩家游戏数据
cmd.BANKER_CHAIR = null;//庄家座位号
cmd.MY_STATUS = false;//标志我自己是否在游戏中
cmd.CUR_STAGE = null;//当前阶段
cmd.SENDDATA = null;//发牌数据
cmd.RANDOM_BANKER = false; //随机庄动画是否播完
cmd.DEAL_FALG = false;//发牌动画是否播完
cmd.REGISTER = true;
cmd.ISCONFIG = false;//是否配牌
cmd.COUNTTIME = 0; //每个阶段的倒计时
cmd.TIMESTAMP = 0; //收到阶段消息的时间戳
cmd.CANSWITCH = true; //标记能否切换场景
cmd.PokerNode = { //每张牌的位置
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
};
//计算剩余时间
cmd.getRemainTime = function(){
    let delatTime = Math.round((new Date().getTime() - cmd.TIMESTAMP)/1000);
    let remainTime = cmd.COUNTTIME - delatTime;
    return remainTime;
},

cmd.PokerBase = []
cmd.Game_Status = {
    10: "gameStatus1",//开始倒计时
    22: "gameStatus2",//抢庄
    23: "gameStatus3",//下注
}
cmd.REQUESTCODE = {
    REQ_LOGIN:0, // 用户登录
    REQ_LOGOUT:1, // 用户登出
    REQ_BREATH:2,// 客户端心跳
    REQ_LEAVE:3, // 请求离开房间
    REQ_MATCH:4, // 匹配房间
    REQ_RECOVER:5, // 恢复场景
    REQ_COMPETE:7, // 抢庄
    REQ_SELECT:8, // 选择下注
    REQ_TEST:12,//配牌
}

cmd.RESPONCECODE = {
    RSP_USER_LEAVE:101, // 玩家离开
    RSP_USER_JOIN:103, // 玩家离开
    RSP_USER_LOGIN:111, // 玩家登录
    RSP_USER_KICKED:113,// 踢出房间
    RSP_USER_MATCH:116, // 匹配房间返回
    RSP_USER_RECOVER:130, // 恢复游戏场景
    RSP_USER_STARTCOUNT:131,//开局倒计时
    RSP_USER_DEALCARD:132, // 通知发牌
    RSP_USER_COMPETE:133, // 通知抢庄
    RSP_USER_GRAB_TIMEOUT:134,//抢庄超时
    RSP_USER_GRAB_RETURN:135,//抢庄返回
    RSP_USER_GRAB_RESULT:136,//抢庄结果
    RSP_USER_STARTBETING:137,//通知开始下注
    RSP_USER_NOTIFYTIMES:138,//通知选择倍数
    RSP_USER_BET_TIMEOUT:139,//下注超时
    RSP_USER_SETTLE:143,//比牌及结算
    RSP_USER_ERROR:400, // 异常
    RSP_NET_ERROR:999,//网络连接异常
    RSP_NET_NORMAL:1000,//网络连接恢复
    RSP_NET_RECONNECT:1001,//网络再次重连
}

cmd.pushUser = function(user){
    for(let i=0; i<cmd.PLAYER_DATAS.length; ++i){
        if(cmd.PLAYER_DATAS[i].chair == user.chair) return
    }
    cmd.PLAYER_DATAS.push(user);
}

module.exports = cmd