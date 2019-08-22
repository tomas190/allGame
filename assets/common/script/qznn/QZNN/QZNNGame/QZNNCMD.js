var cmd = {}

cmd.room_number = null //房间号
cmd.MAX_COUNT = 5; //几张牌
cmd.area_number = null //场号
cmd.room_status = null //房间状态
cmd.MY_SEAT = null; //自己的座位号
cmd.GAME_PLAYER = 5; //正在游戏中的玩家
cmd.PLAYER_DATAS = null; //房间玩家游戏数据
cmd.MY_DATA = null; //自己的游戏数据
cmd.MY_ID = null; //自己的id
cmd.PokerNode = { //每张牌的位置
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
};
cmd.GrabMultiple = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 4
}
cmd.Multiple = {
    "0": 5,
    "1": 10,
    "2": 15,
    "3": 20
}

cmd.Game_Status = {
    "StartLimitTime": "gameStatus1",
    "GameStart": "gameStatus2",
    "StarBet": "gameStatus3",
    "Wait": "gameStatus4",
}
module.exports = cmd