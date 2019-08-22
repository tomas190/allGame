/*
 * @Author: burt
 * @Date: 2019-08-01 13:44:52
 * @LastEditors: burt
 * @LastEditTime: 2019-08-21 15:44:55
 * @Description: 游戏中央模块管理器
 */

let gHandler = {

}

let gameGlobal = {

    gameNowName: "", // 当前游戏的名字

    playerKey: "player",
    player: {
        gold: 1000,
        name: "name",
        pass: 123456,
        code: 123456,
        uuid: 123456,
    },
}
gHandler.gameGlobal = gameGlobal

let gameConfig = {
    mainconfig: {
        zhname: "主包", // 中文游戏名
        enname: "main", // 英文游戏名
        lanchscene: "main", // 跳转场景名
    },
    hallconfig: {
        zhname: "大厅", // 中文游戏名
        enname: "hall", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "hall", // 跳转场景名
    },
    gamelist: [
        {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "NNGame", // 跳转场景名
            game_id: "123456789",
            resid: 0,
        },
        {
            zhname: "2人麻将", // 中文游戏名
            enname: "2rmj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "2rmj", // 跳转场景名
            game_id: "123456789",
            resid: 1,
        },
        {
            zhname: "百家乐", // 中文游戏名
            enname: "bjl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bjl", // 跳转场景名
            game_id: "123456789",
            resid: 2,
        },
        {
            zhname: "奔驰宝马", // 中文游戏名
            enname: "bcbm", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bcbm", // 跳转场景名
            game_id: "123456789",
            resid: 3,
        },
        {
            zhname: "百人牛牛", // 中文游戏名
            enname: "brnn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "brnn", // 跳转场景名
            game_id: "123456789",
            resid: 4,
        },
        {
            zhname: "捕鱼", // 中文游戏名
            enname: "by", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "by", // 跳转场景名
            game_id: "123456789",
            resid: 5,
        },
        {
            zhname: "德州", // 中文游戏名
            enname: "dz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "dz", // 跳转场景名
            game_id: "123456789",
            resid: 6,
        },
        {
            zhname: "斗地主", // 中文游戏名
            enname: "ddz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ddz", // 跳转场景名
            game_id: "123456789",
            resid: 7,
        },
        {
            zhname: "红黑", // 中文游戏名
            enname: "hh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hh", // 跳转场景名
            game_id: "123456789",
            resid: 8,
        },
        {
            zhname: "龙虎斗", // 中文游戏名
            enname: "lhd", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lhd", // 跳转场景名
            game_id: "123456789",
            resid: 9,
        },
        {
            zhname: "轮盘", // 中文游戏名
            enname: "lp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lp", // 跳转场景名
            game_id: "123456789",
            resid: 10,
        },
        {
            zhname: "跑得快", // 中文游戏名
            enname: "pdk", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pdk", // 跳转场景名
            game_id: "123456789",
            resid: 11,
        },
        {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "qznn", // 跳转场景名
            game_id: "123456789",
            resid: 12,
        },
        {
            zhname: "骰宝", // 中文游戏名
            enname: "tb", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "tb", // 跳转场景名
            game_id: "123456789",
            resid: 13,
        },
        {
            zhname: "十三水", // 中文游戏名
            enname: "sss", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sss", // 跳转场景名
            game_id: "123456789",
            resid: 14,
        },
        {
            zhname: "视讯百家乐", // 中文游戏名
            enname: "sxbjl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sxbjl", // 跳转场景名
            game_id: "123456789",
            resid: 15,
        },
        {
            zhname: "狮子王国", // 中文游戏名
            enname: "szwg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "szwg", // 跳转场景名
            game_id: "123456789",
            resid: 16,
        },
        {
            zhname: "水果机", // 中文游戏名
            enname: "sgj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sgj", // 跳转场景名
            game_id: "123456789",
            resid: 17,
        },
        {
            zhname: "梭哈", // 中文游戏名
            enname: "sh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sh", // 跳转场景名
            game_id: "123456789",
            resid: 18,
        },
        {
            zhname: "血流成河", // 中文游戏名
            enname: "xlch", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "xlch", // 跳转场景名
            game_id: "123456789",
            resid: 19,
        },
        {
            zhname: "炸金花", // 中文游戏名
            enname: "zjh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "Load", // 跳转场景名
            game_id: "123456789",
            resid: 20,
        },
    ],

}
gHandler.gameConfig = gameConfig

module.exports = gHandler;