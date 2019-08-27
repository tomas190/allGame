// var jspbcomp = require('google-protobuf');
// var COMPILED = jspbcomp.COMPILED;
// var jspb = jspbcomp.jspb;
// var goog = jspbcomp.goog;

var msg_pb = require('msg_pb_by');

var msgnamemap = {
    Test1:0,
    Test2:1,
    Track:2,
    Login:3,
    EnterGameReq:4,
    EnterGameRsp:5,
    GenFish:6,
    HitFish:7,
    KillFish:8,
    PlayerJoin:9,
    Fire:10,
    OffLine:11,
    CannonLevel:12,
    CannonType:13,
    LockFish:14,
    CoinChange:15,
    GenBatchFishes:16,
    Scene:17,
    SpecialFishGroup:18,
    LoginRsp:19,
    LeaveGameReq:20,
    RefreshScore:21,
    Breathe:22,
    HitInvalid:23,
    ServerInfo:24
}

var messagemap = {
    0:msg_pb.Test1,
    1:msg_pb.Test2,
    2:msg_pb.Track,
    3:msg_pb.Login,
    4:msg_pb.EnterGameReq,
    5:msg_pb.EnterGameRsp,
    6:msg_pb.GenFish,
    7:msg_pb.HitFish,
    8:msg_pb.KillFish,
    9:msg_pb.PlayerJoin,
    10:msg_pb.Fire,
    11:msg_pb.OffLine,
    12:msg_pb.CannonLevel,
    13:msg_pb.CannonType,
    14:msg_pb.LockFish,
    15:msg_pb.CoinChange,
    16:msg_pb.GenBatchFishes,
    17:msg_pb.Scene,
    18:msg_pb.SpecialFishGroup,
    19:msg_pb.LoginRsp,
    20:msg_pb.LeaveGameReq,
    21:msg_pb.RefreshScore,
    22:msg_pb.Breathe,
    23:msg_pb.HitInvalid,
    24:msg_pb.ServerInfo
}

module.exports.namemap = msgnamemap;
module.exports.msgmap = messagemap;

module.exports.getmsgobj = function(tag){
    return messagemap[tag];
}

module.exports.test1 = function(){
    cc.log("this messagedef script~!!")
}
