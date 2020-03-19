<<<<<<< HEAD


let gHandler = {
    appDownUrl: '', // app下载地址
    hqqisShowNotice: false, // 首次从登陆进入
    hqqisShowFree: false, // 首次从登陆进入
=======
/*
 * @Author: burt
 * @Date: 2019-08-01 13:44:52
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-12 15:23:53
 * @Description: 游戏中央模块管理器
 */

let gHandler = {

>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
}
let gameGlobal = {
    isdev: false, // 是否开发状态
    gameNow: "hall", // 当前游戏的名字
    iconPath: "", // 头像地址前缀
    playerKey: "playerKey",
    tokenKey: "tokenKey",
    token: "", // 通信token
    huanjin: "", // dev pre online
    subGameType: 0, // number类型 真人视讯子游戏类型
    player: { // 玩家信息
        gold: 0, // 金币
        nick: "", // 昵称
        sex: 0,// 男 0  女 1
        headurl: "1.png", // 头像
        account_name: 0, // number类型 账号
        account_pass: "", // string类型 密码
        proxy_pid: 0, // 代理id
        uuid: 0,
        id: 0,
        code: 0, // 上级id  邀请码
        phonenum: "", // 手机号码
        alipay: "", //  支付宝账号
        yinhangka: "", //  银行卡
        deviceid: "", // 设备id
    },
    im_host: "",
    proxy: { // 全民代理数据结构
        package_id: null, // number类型
        balance: null, // number类型
        temp_host: "", // string类型
        proxy_host: "", // proxy_host
    },
    pay: { // 充提数据结构
        from_scene: "", // 跳转过来的场景名
        client: "",
        pay_host: "",
        user_id: "",
        user_name: "",
        proxy_user_id: "",
        proxy_name: "",
        package_id: null, // number类型
    },
    noticeList: [], // 公告列表
    slideNoticeList: [], // 滚动公告
    imReceive: 0, // im收到的消息
    payReceive: 0, // 收益消息
    ipList: [], // 本地ip地址列表
<<<<<<< HEAD
    ipapiData: {}, // 通过ipapi获得的数据
=======
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
}
gHandler.gameGlobal = gameGlobal

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
        },
        "payActivity": {
            zhname: "精彩活动", // 中文名
            enname: "payActivity", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payActivity", // 跳转场景名
        },
    },
    gamelist: {
        "qznn": {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "NNGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251714",
            serverUrl: "/qznn", // 游戏服务器地址
            endUrl: "/qznn", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 0,
            resid: 13,
            isDown: false,
        },
        "zjh": {
            zhname: "扎金花", // 中文游戏名
            enname: "zjh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ZJHLoad", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251715",
            serverUrl: "/zhajh", // 游戏服务器地址
            endUrl: "/zhajh", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 1,
            resid: 17,
            isDown: false,
        },
        "zrsx2": {
            zhname: "真人视讯-龙虎斗", // 中文游戏名
            enname: "zrsx2", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "LiveGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25173",
            serverUrl: "/zhenrensx", // 游戏服务器地址
            endUrl: "/zhenrensx", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 2,
            resid: 18,
            isDown: false,
        },
        "sgj": {
            zhname: "水果机", // 中文游戏名
            enname: "sgj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "FruitGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251712",
            serverUrl: "/shuigj", // 游戏服务器地址
            endUrl: "/shuigj", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 3,
            resid: 14,
            isDown: false,
        },
        "bcbm": {
            zhname: "奔驰宝马", // 中文游戏名
            enname: "bcbm", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bcbmloading", // 跳转场景名
            // lanchscene: "bcbmload_me", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251716",
            serverUrl: "/bcbm", // 游戏服务器地址
            endUrl: "/bcbm", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 4,
            resid: 2,
            isDown: false,
        },
        "hh": {
            zhname: "新红黑大战", // 中文游戏名
            enname: "hh", // 英文游戏名 （子游戏文件路径，更新子路径）ssss
            lanchscene: "hhlobby", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251719",
            serverUrl: "/redblackwar", // 游戏服务器地址
            endUrl: "/redblackwar", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 5,
            resid: 8,
            isDown: false,
        },
        "hwby": {
            zhname: "海王捕鱼", // 中文游戏名
            enname: "hwby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hwby", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f2517a6",
            serverUrl: "/haiwangby", // 游戏服务器地址
            endUrl: "/haiwangby", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 6,
            resid: 5,
            isDown: false,
        },
        "brnn": {
            zhname: "新百人牛牛", // 中文游戏名
            enname: "brnn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "brnn", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251718",
            serverUrl: "/bairennn", // 游戏服务器地址
            endUrl: "/bairennn", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 7,
            resid: 4,
            isDown: false,
        },
        "ebg": {
            zhname: "新二八杠", // 中文游戏名
            enname: "ebg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ebg", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251720",
            serverUrl: "/erbg", // 游戏服务器地址
            endUrl: "/erbg", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 8,
            resid: 0,
            isDown: false,
        },
        "lp": {
            zhname: "轮盘游戏", // 中文游戏名
            enname: "lp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lp", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251713",
            serverUrl: "/lunpan", // 游戏服务器地址
            endUrl: "/lunpan", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 9,
            resid: 11,
            isDown: false,
        },
        "bjl": {
            zhname: "百家乐", // 中文游戏名
            enname: "bjl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bjl_baccarat_hall", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251721",
            serverUrl: "/baijl", // 游戏服务器地址
            endUrl: "/baijl", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 10,
            resid: 3,
            isDown: false,
        },
        "lhd": {
            zhname: "龙虎斗", // 中文游戏名
            enname: "lhd", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lhd", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251717",
            serverUrl: "/go_lhd", // 游戏服务器地址
            endUrl: "/go_lhd", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 11,
            resid: 10,
            isDown: false,
        },
        "ddz": {
            zhname: "斗地主", // 中文游戏名
            enname: "ddz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ddzloading_bg", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251711",
            serverUrl: "/landlord", // 游戏服务器地址
            endUrl: "/landlord", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 12,
            resid: 6,
            isDown: false,
        },
        "sss": {
            zhname: "十三水", // 中文游戏名
            enname: "sss", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "SSSLoad", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25171",
            serverUrl: "/shisanshui", // 游戏服务器地址
            endUrl: "/shisanshui", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 13,
            resid: 15,
            isDown: false,
        },
        "hbsl": {
            zhname: "新红包扫雷", // 中文游戏名
            enname: "hbsl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hbslGame", // 跳转场景名
            game_id: "5b1f3a3cb76alkje7f25170",
            serverUrl: "/hongbaosl", // 游戏服务器地址
            endUrl: "/hongbaosl", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 14,
            resid: 7,
            isDown: false,
        },
        "zrsx1": {
            zhname: "真人视讯-百家乐", // 中文游戏名
            enname: "zrsx1", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "LiveGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25173",
            serverUrl: "/zhenrensx", // 游戏服务器地址
            endUrl: "/zhenrensx", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 15,
            resid: 16,
            isDown: false,
        },
        "2rmj": {
            zhname: "二人麻将", // 中文游戏名
            enname: "2rmj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25170",
            serverUrl: "/ermj", // 游戏服务器地址
            endUrl: "/ermj", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 16,
            resid: 1,
            isDown: false,
        },
        "pdk": {
            zhname: "跑得快", // 中文游戏名
            enname: "pdk", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pdkroom", // 跳转场景名
            game_id: "5c6a62be7ff09a54amb446aa",
            serverUrl: "/paodekuai", // 游戏服务器地址
            endUrl: "/paodekuai", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 17,
            resid: 12,
            isDown: false,
        },
        "jbpby": {
            zhname: "聚宝盆", // 中文游戏名
            enname: "jbpby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "jbpby", // 跳转场景名
            game_id: "5c6a62be56209ac117d446aa",
            serverUrl: "/jbpby", // 游戏服务器地址
            endUrl: "/jbpby", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 18,
            resid: 9,
            isDown: false,
        },
        "hbld": {
            zhname: "红包乱斗", // 中文游戏名
            enname: "hbld", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hbldGame", // 跳转场景名
            game_id: "5c6a62be7ff587m117d446aa",
            serverUrl: "/hongbaold", // 游戏服务器地址
            endUrl: "/hongbaold", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 19,
            resid: 19,
            isDown: false,
        },
        "pccp": {
            zhname: "派彩", // 中文游戏名
            enname: "pccp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "PaiCai", // 跳转场景名
            game_id: "569a62be7ff123m117d446aa",
<<<<<<< HEAD
            serverUrl: "/paicai", // 游戏服务器地址
            endUrl: "/paicai", // 游戏服务器地址
=======
            serverUrl: "", // 游戏服务器地址
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 20,
            resid: 20,
            isDown: false,
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
        'ddz': {
            zhname: "斗地主",
            enname: "ddz",
            game_id: "5c6a62be7ff09ac117d446aa",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },

    }
}
gHandler.gameConfig = gameConfig

gHandler.setGameInfo = function (game_user, proxy_user, prev_proxy) {
    // cc.log("gHandler.setGameInfo", game_user)
    let data = { token: gHandler.gameGlobal.token }
    data.ischangeAccount = false
    if (game_user) {
        if (game_user.id) {
            if (gHandler.gameGlobal.player.id != "" && gHandler.gameGlobal.player.id != game_user.id) {
                data.ischangeAccount = true
            }
            gHandler.gameGlobal.player.account_name = game_user.id;
            gHandler.gameGlobal.pay.user_id = game_user.id;
            gHandler.gameGlobal.player.id = game_user.id;
            data.id = game_user.id;
        }

        if (game_user.game_gold || game_user.game_gold == 0) {
            let gold = game_user.game_gold
            if (gold < 0.01) {
                gold = 0;
            } else {
                gold = gHandler.commonTools.formatGold(game_user.game_gold);
            }
            gHandler.gameGlobal.player.gold = gold;
            data.game_gold = gold
        }
        if (game_user.game_img) {
            gHandler.gameGlobal.player.headurl = game_user.game_img;
            data.game_img = game_user.game_img;
        }
        if (game_user.game_nick || game_user.game_nick == '') {
            gHandler.gameGlobal.player.nick = game_user.game_nick;
            gHandler.gameGlobal.pay.user_name = game_user.game_nick
            data.game_nick = game_user.game_nick;
        }
        if (game_user.phone_number || game_user.phone_number == "") {
            gHandler.gameGlobal.player.phonenum = game_user.phone_number;
            data.phone_number = game_user.phone_number;
        }
        if (game_user.uuid) {
            gHandler.gameGlobal.player.uuid = game_user.uuid
            gHandler.gameGlobal.pay.proxy_user_id = game_user.proxy_user_id
            gHandler.gameGlobal.pay.package_id = game_user.package_id
        }
    }

    for (let k in game_user) {
        gHandler.appGlobal.gameuser[k] = gHandler.appGlobal.gameuser[k] || game_user[k]
    }

    if (prev_proxy) {
        gHandler.gameGlobal.player.proxy_pid = prev_proxy.proxy_pid;
        gHandler.gameGlobal.pay.proxy_name = prev_proxy.proxy_nick
    }
    if (proxy_user) {
        gHandler.gameGlobal.proxy.package_id = proxy_user.package_id
        gHandler.gameGlobal.proxy.balance = proxy_user.balance
        data.balance = proxy_user.balance
    }
    gHandler.eventMgr.dispatch(gHandler.eventMgr.refreshPlayerinfo, data)
}

gHandler.setPlayerinfo = function (info) {
    // cc.log("设置玩家数据")
    let data = {}
    if (info.game_gold || info.game_gold == 0) {
        let gold = info.game_gold
        if (gold < 0.01) {
            gold = 0;
        } else {
            gold = gHandler.commonTools.formatGold(info.game_gold);
        }
        gHandler.gameGlobal.player.gold = gold;
        data["game_gold"] = gold
    }
    if (info.game_img) {
        gHandler.gameGlobal.player.headurl = info.game_img;
        data["game_img"] = info.game_img;
    }
    if (info.game_nick) {
        gHandler.gameGlobal.player.nick = info.game_nick;
        gHandler.gameGlobal.pay.user_name = info.game_nick;
        data["game_nick"] = info.game_nick;
    }
    if (info.id) {
        gHandler.gameGlobal.player.id = info.id;
        gHandler.gameGlobal.pay.user_id = info.id;
        data["id"] = info.id;
    }
    if (info.proxy_user_id) {
        gHandler.gameGlobal.pay.proxy_user_id = info.proxy_user_id
        data["proxy_user_id"] = info.proxy_user_id;
    }
    if (info.package_id) {
        gHandler.gameGlobal.pay.package_id = info.package_id
        data["package_id"] = info.package_id;
    }
    if (info.phone_number) {
        gHandler.gameGlobal.player.phonenum = info.phone_number;
        data["phone_number"] = info.phone_number;
    }
    if (info.balance) {
        gHandler.gameGlobal.proxy.balance = info.balance
        data["balance"] = info.balance;
    }

    gHandler.eventMgr.dispatch(gHandler.eventMgr.refreshPlayerinfo, data)
}


module.exports = gHandler;