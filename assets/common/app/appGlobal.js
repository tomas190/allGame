/*
 * @Author: burt
 * @Date: 2019-07-29 18:52:11
 * @LastEditors: burt
 * @LastEditTime: 2019-08-09 15:35:17
 * @Description: 游戏壳全局索引和数据
 */
let javaReflect = require("javaReflect");
let appGlobal = {
    /* ------------------------------------------------------------------- */
    secretlist: [ // 密码本
        "https://lgroup000.gitlab.io/meta/data_q.json",
        // "https://gitee.com/lgroup111/lobbygame/raw/master/data_q.json",
        "https://vvv56789.github.io/lobbygame/data_q.json",
    ],

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

    gameCanel: "bochen", // 渠道
    gameMode: "dev", //"dev" "pre" "online"

    packgeName: "com.test.pre.android", // 包名
    os: "android", // 平台 ios

    remotePort: ":12345",
    remotePath: "/entry/info/",
    remoteGetSeverInfo: "getserverinfo",
    remoteGetGameList: "getGameList",
    remoteToken: "123789",
    packgeId: "1",
    remoteSeverinfoKey: "remoteSeverinfoKey",
    remoteSeverinfo: null,
    remoteGamelistKey: "remoteGamelistKey",
    remoteGamelist: null,

    officialLogin: "/Game/login/officialLogin", // 账号密码登录api
    loginWithUUID: "/Game/login/loginWithUUID", // 设备uuid登录api
    firstLogin: "/Game/login/firstLogin", // 唯一码登录api

    tempName: "549997801",
    tempPass: "914221",

    deviceID: "123456789",
    deviceInfo: "", // 设备信息
    clipboard: "", // 剪贴板
    code: "",
    unique_id: "",

    pinpai: "test",
    huanjin: "pre",

    init(sys) {
        this.platform = "/com." + this.pinpai + "." + this.huanjin + ".android/";
        this.androidPlatform = "/com." + this.pinpai + "." + this.huanjin + ".android/";
        this.iosPlatform = "/com." + this.pinpai + "." + this.huanjin + ".ios/";
        this.androidPackgeName = "com." + this.pinpai + "." + this.huanjin + ".android"; // 包名
        this.iosPackgeName = "com." + this.pinpai + "." + this.huanjin + ".ios"; // 包名
        if (sys == 0) { // android
            this.packgeName = this.androidPackgeName;
            this.platform = this.androidPlatform;
            this.deviceID = javaReflect.getDeviceId();
            this.clipboard = javaReflect.getClipboard();
            this.os = "android";
        } else if (sys == 1) { // ios
            this.packgeName = this.iosPackgeName;
            this.platform = this.iosPlatform;
            this.os = "ios";
        } else if (sys == 2) { // windows
            this.packgeName = this.androidPackgeName;
            this.platform = this.androidPlatform;
        } else {
            this.packgeName = this.androidPackgeName;
            this.platform = this.androidPlatform;
        }
        return this;
    },
}

module.exports = appGlobal;