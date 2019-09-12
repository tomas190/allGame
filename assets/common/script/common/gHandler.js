/*
 * @Author: burt
 * @Date: 2019-08-01 13:44:52
 * @LastEditors: burt
 * @LastEditTime: 2019-09-12 10:19:58
 * @Description: 游戏中央模块管理器
 */

let gHandler = {

}
let gameGlobal = {
    isdev: true, // 是否开发状态
    gameNow: "hall", // 当前游戏的名字
    iconPath: "", // 头像地址前缀
    playerKey: "playerKey",
    token: "", // 通信token
    player: {
        gold: 0, // 金币
        nick: "", // 昵称
        sex: 0,// 男 0  女 1
        headurl: "", // 头像
        account_name: "", // 账号
        account_pass: 0, // 密码
        proxy_pid: 0, // 代理id
        uuid: 0,
    },
}
gHandler.gameGlobal = gameGlobal

let gameConfig = {
    hallconfig: {
        zhname: "大厅", // 中文游戏名
        enname: "hall", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "hall", // 跳转场景名
    },
    gamelist: {
        "qznn": {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "NNGame", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 0,
            resid: 12,
        },
        "zjh": {
            zhname: "炸金花", // 中文游戏名
            enname: "zjh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ZJHLoad", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 1,
            resid: 20,
        },
        "zrsx": {
            zhname: "视讯百家乐", // 中文游戏名
            enname: "zrsx", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "LiveGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25173",
            serverUrl: "ws://liveagin.0351sxzc.com:80", // 游戏服务器地址
            hallid: 2,
            resid: 15,
        },
        "sgj": {
            zhname: "水果机", // 中文游戏名
            enname: "sgj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sgj", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 3,
            resid: 17,
        },
        "bcbm": {
            zhname: "奔驰宝马", // 中文游戏名
            enname: "bcbm", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bcbmloading", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 4,
            resid: 3,
        },
        "lp": {
            zhname: "轮盘", // 中文游戏名
            enname: "lp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lp", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 5,
            resid: 10,
        },
        "21d": {
            zhname: "21点", // 中文游戏名
            enname: "21d", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "21d", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 6,
            resid: 0,
        },
        "2rmj": {
            zhname: "2人麻将", // 中文游戏名
            enname: "2rmj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "2rmj", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 7,
            resid: 1,
        },
        "bjl": {
            zhname: "百家乐", // 中文游戏名
            enname: "bjl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bjl", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 8,
            resid: 2,
        },
        "brnn": {
            zhname: "百人牛牛", // 中文游戏名
            enname: "brnn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "brnn", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 9,
            resid: 4,
        },
        "hwby": {
            zhname: "捕鱼", // 中文游戏名
            enname: "hwby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hwby", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 10,
            resid: 5,
        },
        "dz": {
            zhname: "德州", // 中文游戏名
            enname: "dz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "dz", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 11,
            resid: 6,
        },
        "ddz": {
            zhname: "斗地主", // 中文游戏名
            enname: "ddz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ddz", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 12,
            resid: 7,
        },
        "hh": {
            zhname: "红黑", // 中文游戏名
            enname: "hh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hh", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 13,
            resid: 8,
        },
        "lhd": {
            zhname: "龙虎斗", // 中文游戏名
            enname: "lhd", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lhd", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 14,
            resid: 9,
        },
        "pdk": {
            zhname: "跑得快", // 中文游戏名
            enname: "pdk", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pdk", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 15,
            resid: 11,
        },
        "tb": {
            zhname: "骰宝", // 中文游戏名
            enname: "tb", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "tb", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 16,
            resid: 13,
        },
        "sss": {
            zhname: "十三水", // 中文游戏名
            enname: "sss", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sss", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 17,
            resid: 14,
        },
        "szwg": {
            zhname: "狮子王国", // 中文游戏名
            enname: "szwg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "szwg", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 18,
            resid: 16,
        },
        "sh": {
            zhname: "梭哈", // 中文游戏名
            enname: "sh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sh", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 19,
            resid: 18,
        },
        "xlch": {
            zhname: "血流成河", // 中文游戏名
            enname: "xlch", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "xlch", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hallid: 20,
            resid: 19,
        },
    },
}
gHandler.gameConfig = gameConfig

module.exports = gHandler;