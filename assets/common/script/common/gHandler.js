/*
 * @Author: burt
 * @Date: 2019-08-01 13:44:52
 * @LastEditors: burt
 * @LastEditTime: 2019-10-09 12:00:00
 * @Description: 游戏中央模块管理器
 */

let gHandler = {

}
let gameGlobal = {
    isdev: true, // 是否开发状态
    gameNow: "hall", // 当前游戏的名字
    iconPath: "", // 头像地址前缀
    playerKey: "playerKey",
    tokenKey: "tokenKey",
    token: "", // 通信token
    player: { // 玩家信息
        gold: 0, // 金币
        nick: "", // 昵称
        sex: 0,// 男 0  女 1
        headurl: "", // 头像
        account_name: 0, // number类型 账号
        account_pass: "", // string类型 密码
        proxy_pid: 0, // 代理id
        uuid: 0,
        id: 0,
        phonenum: 0, // 手机号码
        alipay: "", //  支付宝账号
        yinhangka: "", //  银行卡
    },
    im_host: "",
    proxy: { // 全民代理数据结构
        package_id: null, // number类型
        balance: null, // number类型
    },
    pay: { // 充提数据结构
        client: "",
        pay_host: "",
        user_id: "",
        user_name: "",
        proxy_user_id: "",
        proxy_name: "",
        package_id: "",
    },
    noticeList: [], // 公告列表
    slideNoticeList: [], // 滚动公告
}
gHandler.gameGlobal = gameGlobal

gHandler.setGameUserInfo = function (game_user) {
    console.log("设置玩家数据")
    gHandler.appGlobal.gameuser = game_user;
    gHandler.gameGlobal.player.account_name = game_user.id
    gHandler.gameGlobal.player.uuid = game_user.uuid;
    let gold = game_user.game_gold
    if (gold < 0.01) {
        gold = 0;
    } else {
        gold = gHandler.commonTools.fixedFloat(game_user.game_gold);
        gold = parseFloat(gold)
    }
    gHandler.gameGlobal.player.gold = gold;
    gHandler.gameGlobal.player.headurl = game_user.game_img;
    gHandler.gameGlobal.player.nick = game_user.game_nick;
    gHandler.gameGlobal.player.id = game_user.id;
    gHandler.gameGlobal.pay.user_id = game_user.id
    gHandler.gameGlobal.pay.user_name = game_user.game_nick
    gHandler.gameGlobal.pay.proxy_user_id = game_user.proxy_user_id
    gHandler.gameGlobal.pay.package_id = game_user.package_id

    gHandler.eventMgr.dispatch("changePlayerInfo", {
        nick: game_user.game_nick,
        gold: game_user.game_gold,
        headurl: game_user.game_img,
        id: game_user.id,
    })
}

let gameConfig = {
    hallconfig: {
        zhname: "大厅", // 中文游戏名
        enname: "hall", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "hall", // 跳转场景名
    },
    subModel: {
        "pay": {
            zhname: "充值", // 中文名
            enname: "pay", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payRecharge", // 跳转场景名
        },
        "cash": {
            zhname: "提现", // 中文名
            enname: "cash", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payCash", // 跳转场景名
        },
        "im": {
            zhname: "聊天", // 中文名
            enname: "im", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "IMappStart", // 跳转场景名
        },
        "proxy": {
            zhname: "全民代理", // 中文名
            enname: "proxy", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "proxy-proxy", // 跳转场景名
        }
    },
    gamelist: {
        "qznn": {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "NNGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251714",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 0,
            resid: 12,
        },
        "zjh": {
            zhname: "扎金花", // 中文游戏名
            enname: "zjh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ZJHLoad", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251715",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 1,
            resid: 20,
        },
        "zrsx": {
            zhname: "真人视讯", // 中文游戏名
            enname: "zrsx", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "LiveGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25173",
            serverUrl: "ws://game.539316.com/zhenrensx", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 2,
            resid: 15,
        },
        "sgj": {
            zhname: "水果机", // 中文游戏名
            enname: "sgj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "FruitGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251712",
            serverUrl: "ws://game.539316.com/shuigj", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 3,
            resid: 17,
        },
        "bcbm": {
            zhname: "奔驰宝马", // 中文游戏名
            enname: "bcbm", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bcbmroom", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251716",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 4,
            resid: 3,
        },
        "hh": {
            zhname: "新红黑大战", // 中文游戏名
            enname: "hh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hhlogin", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251719",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 5,
            resid: 8,
        },
        "hwby": {
            zhname: "海王捕鱼", // 中文游戏名
            enname: "hwby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hwby", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f2517a6",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 6,
            resid: 5,
        },
        "brnn": {
            zhname: "新百人牛牛", // 中文游戏名
            enname: "brnn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "brnn", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251718",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 7,
            resid: 4,
        },
        "ebg": {
            zhname: "新二八杠", // 中文游戏名
            enname: "ebg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ebg", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251720",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 8,
            resid: 13,
        },
        "lp": {
            zhname: "轮盘游戏", // 中文游戏名
            enname: "lp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lp", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251713",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 9,
            resid: 10,
        },
        "bjl": {
            zhname: "百家乐", // 中文游戏名
            enname: "bjl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bjl_baccarat_hall", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251721",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 10,
            resid: 2,
        },
        "dz": {
            zhname: "德州扑克", // 中文游戏名
            enname: "dz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "dz", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25176",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 11,
            resid: 6,
        },
        "ddz": {
            zhname: "斗地主", // 中文游戏名
            enname: "ddz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ddz", // 跳转场景名
            game_id: "5c6a62be7ff09ac117d446aa",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 12,
            resid: 7,
        },
        "2rmj": {
            zhname: "二人麻将", // 中文游戏名
            enname: "2rmj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "2rmj", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25170",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 13,
            resid: 1,
        },
        "lhd": {
            zhname: "新龙虎斗", // 中文游戏名
            enname: "lhd", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lhd", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251717",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 14,
            resid: 9,
        },
        "sss": {
            zhname: "十三水", // 中文游戏名
            enname: "sss", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sss", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25171",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 15,
            resid: 14,
        },
        "pdk": {
            zhname: "跑得快", // 中文游戏名
            enname: "pdk", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pdk", // 跳转场景名
            game_id: "",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 16,
            resid: 11,
        },
        "21d": {
            zhname: "二十一点", // 中文游戏名
            enname: "21d", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "21d", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25172",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 17,
            resid: 0,
        },
        "szwg": {
            zhname: "狮子王国", // 中文游戏名
            enname: "szwg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "szwg", // 跳转场景名
            game_id: "",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 18,
            resid: 16,
        },
        "sh": {
            zhname: "梭哈", // 中文游戏名
            enname: "sh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sh", // 跳转场景名
            game_id: "",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 19,
            resid: 18,
        },
        "xlch": {
            zhname: "血流成河", // 中文游戏名
            enname: "xlch", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "xlch", // 跳转场景名
            game_id: "",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 20,
            resid: 19,
        },
    },
    oldGameList: {
        "bjl": {
            zhname: "百家乐",
            enname: "bjl",
            game_id: "5b1f3a3cb76a591e7f2517a5",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'brnn': {
            zhname: "百人牛牛",
            enname: "brnn",
            game_id: "5bd00260e847f16fb65a13c1",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'hh': {
            zhname: "红黑大战",
            enname: "hh",
            game_id: "5b306af74f435269eea74b94",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'ebg': {
            zhname: "二八杠",
            enname: "ebg",
            game_id: "5bd0022be847f16fb65a137d",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'lhd': {
            zhname: "龙虎斗",
            enname: "lhd",
            game_id: "5b1f3a98b76a591e7f2517b6",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'hbsl': {
            zhname: "红包扫雷",
            enname: "hbsl",
            game_id: "5c5b8c3a7ff09ac117c3a7c2",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },

    }
}
gHandler.gameConfig = gameConfig

module.exports = gHandler;