/*
 * @Author: burt
 * @Date: 2019-07-29 18:52:11
 * @LastEditors  : burt
 * @LastEditTime : 2019-12-27 10:23:27
 * @Description: 游戏壳全局索引和数据
 */
let gHandler = require("gHandler");
let appGlobal = {
    /* ------------------------------------------------------------------- */
    pinpai: "test", // 渠道 test debi qibao
    huanjin: "dev", // pre online
    // huanjin: "pre", // pre online
    // huanjin: "online", // pre online
    os: "android", // 平台 ios

    // deviceID: "100000004",
    // deviceID: "1000000000",
    deviceID: "123456789",

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

    serverKey: "serverKey", // 长连接服务器
    server: "", // 长连接服务器

    hotServerKey: "hotServerKey", // 热更服务器
    hotServer: "", // 热更服务器

    noticeKey: "noticeKey",

    packgeName: "com.test.pre.android", // 包名

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

    init(sys) {
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
            if (cc.sys.isBrowser) {
                this.addJsClip()
            }
        } else {
            this.packgeName = this.androidPackgeName;
            this.platform = this.androidPlatform;
        }
        return this;
    },
    addJsClip() {
        // demo 程序将粘贴事件绑定到 document 上
        document.addEventListener("paste", function (e) {
            var cbd = e.clipboardData;
            var ua = window.navigator.userAgent;

            // 如果是 Safari 直接 return
            if (!(e.clipboardData && e.clipboardData.items)) {
                return;
            }

            // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
            if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
                cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
                ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
                return;
            }

            for (var i = 0; i < cbd.items.length; i++) {
                var item = cbd.items[i];
                if (item.kind == "file") {
                    var blob = item.getAsFile();
                    if (blob.size === 0) {
                        return;
                    }
                    // blob 就是从剪切板获得的文件 可以进行上传或其他操作
                    cc.log("从剪切板获得的文件", blob)
                }
            }
        }, false);
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

    getAutoLoginEndurl() { // code 为 总代号
        let endurl = ""
        endurl += "/Game/login/firstLogin?" // 首次登陆
        endurl += "&uuid=" + appGlobal.deviceID;
        endurl += "&package_name=" + appGlobal.packgeName;
        endurl += "&os=" + appGlobal.os;
        if (this.pinpai == "test") {
            if (this.huanjin == 'dev') {
                endurl += "&code=" + 873797373;
            } else if (this.huanjin == 'pre') {
                endurl += "&code=" + 818392292;
            } else {
                endurl += "&code=" + 442619406;
            }
        } else if (this.pinpai == "debi") {
            if (this.huanjin == 'dev') {
                endurl += "&code=" + 638044957;
            } else if (this.huanjin == 'pre') {
                endurl += "&code=" + 818392292;
            } else {
                endurl += "&code=" + 442619406;
            }
        } else if (this.pinpai == "qibao") {
            if (this.huanjin == 'dev') {
                endurl += "&code=" + 638044957;
            } else if (this.huanjin == 'pre') {
                endurl += "&code=" + 818392292;
            } else {
                endurl += "&code=" + 442619406;
            }
        }
        endurl += "&unique_id=" + appGlobal.unique_id;
        endurl += "&account_name=" + gHandler.gameGlobal.player.account_name;
        endurl += "&account_pass=" + gHandler.gameGlobal.player.account_pass;
        endurl += "&token=" + gHandler.gameGlobal.token;
        return endurl
    },
}

module.exports = appGlobal;