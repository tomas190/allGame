<<<<<<< HEAD

=======
/*
 * @Author: burt
 * @Date: 2019-07-29 18:52:11
 * @LastEditors  : burt
 * @LastEditTime : 2020-01-21 10:55:22
 * @Description: 游戏壳全局索引和数据
 */
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
let gHandler = require("gHandler");
let appGlobal = {
    isRelease: true, // 是否是版本发布状态 网页版加载子包处理
    /* ------------------------------------------------------------------- */
    pinpai: "test", // 渠道 test debi qibao
    // pinpai: "debi", // 渠道 test debi qibao
    // huanjin: "dev", // pre online
    huanjin: "pre", // pre online
    // huanjin: "online", // pre online

<<<<<<< HEAD
=======
    // deviceID: "100000005",
    // deviceID: "1000000000",
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
    deviceID: "",
    os: "android", // 平台 android ios

    secretlist: [ // 密码本
        "https://lgroup000.gitlab.io/meta/data_q.json",
        "https://gitee.com/lgroup111/lobbygame/raw/master/data_q.json",
        "https://vvv56789.github.io/lobbygame/data_q.json",
    ],

    apkVersionKey: "apkVersionKey",
    apkVersion: "1.0.0",

    versionKey: "versionKey",
    version: "1.0.0",

    codeBookKey: "codeBookKey", // 密码本
    codeBook: "", // 密码本

    enterServerKey: "enterServerKey", // 转接服务器
    enterServer: "", // 转接服务器

    serverListKey: "serverListKey", // 长连接服务器列表
    serverList: "", // 长连接服务器列表

    stableServerListKey: "stableServerListKey", // 恒定检测长连接服务器列表
    stableServerList: "", // 恒定检测长连接服务器列表

    serverKey: "serverKey", // 长连接服务器
    server: "", // 长连接服务器

    hotServerKey: "hotServerKey", // 热更服务器列表
    hotServer: "", // 热更服务器列表

    canHotServerKey: "canHotServerKey", // 热更服务器
    canHotServer: "", // 热更服务器

    recordTimeKey: "recordTimeKey", // 记录时间
    recordTime: '', // 记录时间

    noticeKey: "noticeKey", // 公告已读
    noticeDeleteKey: "noticeDeleteKey", // 公道删除

    packgeName: "com.test.pre.android", // 包名
    hotupdatePath: "com.test.pre.android", // 热更服务器下的资源路径

    remotePath: "/entry/info/",
    remoteGetSeverInfo: "getserverinfo",
    remoteGetGameList: "getGameList",
    remoteToken: "123789",
    // packgeId: "1",
    remoteSeverinfoKey: "remoteSeverinfoKey",
    remoteSeverinfo: null,
    remoteGamelistKey: "remoteGamelistKey",
    remoteGamelist: null,

    officialLogin: "/Game/login/officialLogin", // 账号密码登录api
    loginWithUUID: "/Game/login/loginWithUUID", // 设备uuid登录api
    firstLogin: "/Game/login/firstLogin", // 唯一码登录api
    loginWithToken: "/Game/login/loginWithToken", // token 登陆

    gameuser: null, // 用户信息

    deviceInfo: "", // 设备信息
    clipboard: "", // 剪贴板
    code: "0", // 邀请码
    unique_id: "0", // 代理档位
    packageID: 0, // 
    proxyUserID: 0, // 

    officialWebsite: { // 官网
        test: "https://temp.7kpi3g.cn?m=online&p=1&u=442619406",
        debi: "db31.cn"
    },
    GeneralAgency: { // 总代
        test: {
            dev: 351027469,
            pre: 319010216,
            online: 442619406
        },
        debi: {
            dev: 970374128,
            pre: 218638346,
            online: 770256905
        },
        qibao: {
            dev: 638044957,
            pre: 818392292,
            online: 442619406
        }
    },

    init(sys) { // '{"pinpai":"test","huanjin":"online","system":"android","version":"1.0.7"}'
        let packageinfo = gHandler.Reflect.getHqqPackageInfo()
        if (packageinfo) {
            let info = JSON.parse(packageinfo)
            this.pinpai = info.pinpai
            this.huanjin = info.huanjin
            this.apkVersion = info.version
            this.hotupdatePath = "com.test." + this.huanjin + ".android";
        } else {
            this.hotupdatePath = "com." + this.pinpai + "." + this.huanjin + ".android";
        }
        this.platform = "/com." + this.pinpai + "." + this.huanjin + ".android/";
        this.androidPlatform = "/com." + this.pinpai + "." + this.huanjin + ".android/";
        this.iosPlatform = "/com." + this.pinpai + "." + this.huanjin + ".ios/";
        this.androidPackgeName = "com." + this.pinpai + "." + this.huanjin + ".android"; // 包名
        this.iosPackgeName = "com." + this.pinpai + "." + this.huanjin + ".ios"; // 包名
        if (sys == 0) { // android
            this.packgeName = this.androidPackgeName;
            this.platform = this.androidPlatform;
            this.os = "android";
        } else if (sys == 1) { // ios
            this.packgeName = this.iosPackgeName;
            this.platform = this.iosPlatform;
            this.os = "ios";
        } else if (sys == 2) { // windows
            this.packgeName = this.androidPackgeName;
            this.platform = this.androidPlatform;
            this.os = "android";
<<<<<<< HEAD
=======
            if (cc.sys.isBrowser) {
                this.addJsClip()
            }
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        } else {
            this.packgeName = this.androidPackgeName;
            this.platform = this.androidPlatform;
        }
        if (this.pinpai == "test") {
            this.packageID = 1
        } else if (this.pinpai == "debi") {
            this.packageID = 2
        }
        if (CC_DEBUG) {
            this.isRelease = false
            // this.deviceID = "100000005" // 测试
            // this.deviceID = "100000006" // 测试
            // this.deviceID = "1000000000" // 测试
            // this.deviceID="123456789", // carlson
            // this.deviceID="1234567890", // fido
            this.deviceID = "987654321" // burt
        }
        return this;
    },

    getIpGetEndurl(gettype) {
        let endurl = ""
        switch (gettype) {
            case 0:
                endurl += "/Game/login/officialLogin?" // 账号密码登陆
                break;
            case 1:
                endurl += "/Game/login/loginWithUUID?" // uuid 登陆
                break;
            case 2:
                endurl += "/Game/login/firstLogin?" // 首次登陆
                break;
            case 3:
                endurl += "/Game/login/loginWithToken?" // token 登陆
                break;
            case 4:
                let now = new Date();
                let time = (now.getTime() / 1000) >> 0;
                endurl += "/Common/Notice/getNotice?" // 获取公告
                endurl += "&id=" + appGlobal.gameuser.id;
                endurl += "&platform_key=" + appGlobal.remoteToken; // terrell 1.2
                let query = JSON.stringify({
                    'package_ids': { $elemMatch: { $eq: appGlobal.gameuser.package_id } },
                    'is_open': 1,
                    'start_time': { $lte: time },
                    'end_time': { $gte: time }
                })
                endurl += "&query=" + query;
                return endurl;
            case 5:
                endurl += "/Game/Verify/getCaptcha?" // 获取下次可发送手机验证码的时间
                endurl += "&id=" + appGlobal.gameuser.id;
                endurl += "&token=" + gHandler.gameGlobal.token;
                return endurl;
        }

        endurl += "&uuid=" + appGlobal.deviceID;
        endurl += "&package_name=" + appGlobal.packgeName;
        endurl += "&os=" + appGlobal.os;
        endurl += "&code=" + gHandler.gameGlobal.player.code;
        endurl += "&unique_id=" + appGlobal.unique_id;
        endurl += "&account_name=" + gHandler.gameGlobal.player.account_name;
        endurl += "&account_pass=" + gHandler.gameGlobal.player.account_pass;
        endurl += "&token=" + gHandler.gameGlobal.token;
        return endurl
    },

    getIpPostEndUrl(gettype) {
        let endurl = ""
        switch (gettype) {
            case 1:
                endurl += "/Game/User/setGameUserNickName" // 设置昵称
                break;
            case 2:
                endurl += "/Game/User/createGameAccount" // 创建子游戏账号
                break;
            case 3:
                endurl += "/Game/User/setPrevProxyId" // 设置代理id
                break;
            case 4:
                endurl += "/Game/User/setAccountPass" // 设置账号密码
                break;
            case 5:
                endurl += "/Game/User/setGameUserPhone" // 绑定手机
                break;
            case 6:
                endurl += "/Game/Verify/createCaptcha" // 创建图形验证码
                break
            case 7:
                endurl += "/Game/Verify/sendPhoneMessage" // 请求发送手机验证码
                break
            case 8:
                endurl += "/Game/User/setGameUserImage" // 修改头像
        }
        return endurl
    },

<<<<<<< HEAD
=======
    // getAutoLoginEndurl() { // code 为 总代号
    //     let endurl = ""
    //     endurl += "/Game/login/firstLogin?" // 首次登陆
    //     endurl += "&uuid=" + appGlobal.deviceID;
    //     endurl += "&package_name=" + appGlobal.packgeName;
    //     endurl += "&os=" + appGlobal.os;
    //     endurl += "&code=" + this.getGeneralAgency();
    //     endurl += "&unique_id=" + appGlobal.unique_id;
    //     endurl += "&account_name=" + gHandler.gameGlobal.player.account_name;
    //     endurl += "&account_pass=" + gHandler.gameGlobal.player.account_pass;
    //     endurl += "&token=" + gHandler.gameGlobal.token;
    //     return endurl
    // },
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
    /**
     * @Description: 获取总代号
     */
    getGeneralAgency() {
<<<<<<< HEAD
        return this.GeneralAgency[this.pinpai][this.huanjin]
    },
    /**
     * @Description: 根据热更version.json提供的信息设置本地总代
     */
    setGeneralAgency(data) {
        for (let huanjin in data[this.pinpai]) {
            this.GeneralAgency[this.pinpai][huanjin] = data[this.pinpai][huanjin].proxyUserID
=======
        if (this.pinpai == "test") {
            if (this.huanjin == 'dev') {
                return 351027469;
            } else if (this.huanjin == 'pre') {
                return 319010216;
            } else {
                return 442619406;
            }
        } else if (this.pinpai == "debi") {
            if (this.huanjin == 'dev') {
                return 970374128;
            } else if (this.huanjin == 'pre') {
                return 218638346;
            } else {
                return 770256905;
            }
        } else if (this.pinpai == "qibao") {
            if (this.huanjin == 'dev') {
                return 638044957;
            } else if (this.huanjin == 'pre') {
                return 818392292;
            } else {
                return 442619406;
            }
>>>>>>> 1d13304ef16cf6bd8851bc1c4693c3ec45597bd8
        }
    }
}

module.exports = appGlobal;