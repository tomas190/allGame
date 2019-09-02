//var msg_pb = require('msg_pb');
// var playerManager = require('PlayerManager');
// var fishManager = require('FishManager');
var msgdef = require('messagedef');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');

// var game;
// var scene;
//var hall;
//var gameStateMgr;

var onTest1 = function(newmsg) {
    cc.log("onTest1");
    //let newmsg = msg_pb.Test1.deserializeBinary(data);
    cc.log("sever return:");
    console.log(newmsg.getId());
    console.log(newmsg.getName());     
}

var onTest2 = function(newmsg) {
    cc.log("onTest2");
    //let newmsg = msg_pb.Test2.deserializeBinary(data);
    cc.log("sever return:");
    console.log(newmsg.getPhone());
    console.log(newmsg.getName());  
}

var onTrack = function(newmsg) {
    //cc.log("onTrack");
    //let newmsg = msg_pb.Track.deserializeBinary(data);
    //cc.log("server return:");
    //cc.log(newmsg);
    let listpos = newmsg.getPosList();
    //cc.log(listpos)
    for(let i in listpos)
    {
        cc.log("x,y",listpos[i].getX(),listpos[i].getY());
    }    

}

var onEnterGameRsp = function(msg) {
    cc.log("onEnterGameRsp");
    cc.log(msg);
    Notification.SendNotify(NoticeDef.EnterGame,msg);
}

var onGenFish = function(msg) {
    //cc.log("onGenFish");
    //let msg = msg_pb.GenFish.deserializeBinary(data);
    //cc.log("gen fish:",msg.getFishtype())

    Notification.SendNotify(NoticeDef.GenFish,msg);
}

var onGenBatchFishes = function(msg) {
    //cc.log("onGenBatchFishes");
    //cc.log(msg);

    Notification.SendNotify(NoticeDef.GenBatchFishes,msg);
}

var onKillFish = function(msg) {
    //cc.log("onKillFish")
    //let msg = msg_pb.KillFish.deserializeBinary(data);
    //cc.log(msg)
    //cc.log("multiple",msg.getMultiple())
    //cc.log("kill fish",msg.getChair(),msg.getFishid(),msg.getScore(),msg.getBulletid());
    Notification.SendNotify(NoticeDef.KillFish,msg);
    // fishManager.onKillFish(msg.getChair(),msg.getFishid(),msg.getScore(),msg.getBulletid());
}

var onPlayerJoin = function(msg) {
    //cc.log("onPlayerJoin")
    //let msg = msg_pb.PlayerJoin.deserializeBinary(data);
    Notification.SendNotify(NoticeDef.PlayerJoin,msg);

}

var onFire = function(msg) {
    //cc.log("onFire")
    //let msg = msg_pb.Fire.deserializeBinary(data);
    Notification.SendNotify(NoticeDef.Fire,msg);       
}

var onUserOffline = function(msg) {
    cc.log("onUserOffline");
    //let msg = msg_pb.OffLine.deserializeBinary(data);
    cc.log(msg);
    
    Notification.SendNotify(NoticeDef.PlayerLeave,msg);
}

var onCannonLevel = function(msg) {
    cc.log("onCannonLevel");
    //let msg = msg_pb.CannonLevel.deserializeBinary(data);
    cc.log(msg);

    Notification.SendNotify(NoticeDef.CannonLevel,msg);

}

var onCannonType = function(msg) {
    cc.log("onCannonType");
    //let msg = msg_pb.CannonType.deserializeBinary(data);
    cc.log(msg);

    Notification.SendNotify(NoticeDef.CannonType,msg);

}

var onLockFish = function(msg) {
    //cc.log("onLockFish");
    //let msg = msg_pb.LockFish.deserializeBinary(data);
    //cc.log(msg);
    Notification.SendNotify(NoticeDef.LockFish,msg);
}

var onCoinChange = function(msg) {
    //cc.log("onCoinChange");
    //let msg = msg_pb.CoinChange.deserializeBinary(data);
    //cc.log(msg);

    Notification.SendNotify(NoticeDef.CoinChange,msg);
}

var onChangeScene = function(msg) {
    //cc.log("onChangeScene");
    //cc.log(msg);
    Notification.SendNotify(NoticeDef.ChangeScene,msg);

    //scene.ChangeSceneImg(msg.getSceneindex());
    //fishManager.AllFishRushToEnd();
}

var onSpecialFishGroup = function(msg) {
    cc.log("onSpecialFishGroup");
    cc.log(msg);
    Notification.SendNotify(NoticeDef.SpecialFishGroup,msg);
    //fishManager.StartSpeicalFishGroup(msg.getGrouptype(),msg.getInfoList());
    //cc.log("onSpecialFishGroup end~!!!");
}

var onLoginRsp =  function(msg) {
    cc.log("onLoginRsp");
    cc.log(msg);   
    //hall.SetPlayerScore(msg.getScore());
    Notification.SendNotify(NoticeDef.LoginRsp,msg);
    //Notification.SendNotify(NoticeDef.Score,msg.getScore());
    //Notification.SendNotify(NoticeDef.RefrshUserInfo,msg);
}

var onRefreshScore = function(msg) {
    cc.log("onRefreshScore");
    cc.log(msg);
    Notification.SendNotify(NoticeDef.Score,msg.getScore());
}

var onBreathe = function(msg) {
    //cc.log("onBreathe");
    Notification.SendNotify(NoticeDef.Breathe);
}

var onHitInvalid = function(msg) {
    Notification.SendNotify(NoticeDef.HitInvalid,msg);
}

var onServerInfo = function(msg) {
    Notification.SendNotify(NoticeDef.ServerVersion,msg.getVersion());
}

var FuncMap = {
    0:onTest1,
    1:onTest2,
    2:onTrack,
    5:onEnterGameRsp,
    6:onGenFish,
    8:onKillFish,
    9:onPlayerJoin,
    10:onFire,
    11:onUserOffline,
    12:onCannonLevel,
    13:onCannonType,
    14:onLockFish,
    15:onCoinChange,
    16:onGenBatchFishes,
    17:onChangeScene,
    18:onSpecialFishGroup,
    19:onLoginRsp,
    21:onRefreshScore,
    22:onBreathe,
    23:onHitInvalid,
    24:onServerInfo
}

var msgDispatcher = {
    onMessageDispatcher(tag,data)
    {
        let msgclass = msgdef.getmsgobj(tag);
        let msg = msgclass.deserializeBinary(data);
        let callback = FuncMap[tag];
        callback(msg);
    },

    // setGame(gamescript)
    // {
    //     game = gamescript;
    // },

    // setScene(scenescript)
    // {
    //     scene = scenescript;
    // }
}

module.exports = msgDispatcher;