/*
 * @Author: burt
 * @Date: 2019-07-27 16:57:02
 * @LastEditors: burt
 * @LastEditTime: 2019-08-16 14:15:27
 * @Description: 通用加载场景
 */
const SubgameManager = require("SubgameManager");
const gameConfig = require('gameConfig');
let hqqLocalStorage = require("hqqLocalStorage");
let hqqLogMgr = require("hqqLogMgr");
let hqqHttp = require("hqqHttp");
let gHandler = require("gHandler");
let hqqBase64 = require("hqqBase64");
let gameGlobal = require("gameGlobal");
let appGlobal = require("appGlobal");
let javaReflect = require("javaReflect");
let ocReflect = require("ocReflect");
let hqqCommonTools = require("hqqCommonTools");

cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        progresslabel: cc.Label,
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        if (cc.sys.platform === cc.sys.ANDROID && cc.sys.os === cc.sys.OS_ANDROID) {
            gHandler.appGlobal = appGlobal.init(0);
            gHandler.Reflect = javaReflect;
        } else if (cc.sys.platform === cc.sys.IPHONE && cc.sys.platform === cc.sys.IPAD && cc.sys.os === cc.sys.OS_IOS) {
            gHandler.appGlobal = appGlobal.init(1);
            gHandler.Reflect = ocReflect;
        } else if (cc.sys.platform === cc.sys.WIN32 && cc.sys.os === cc.sys.OS_WINDOWS) {
            gHandler.appGlobal = appGlobal.init(2);
        } else {
            gHandler.appGlobal = appGlobal.init(-1);
        }
        gHandler.localStorage = hqqLocalStorage.init();
        this.localInit();
        gHandler.logManager = hqqLogMgr.init();
        gHandler.http = hqqHttp;
        gHandler.SubgameManager = SubgameManager;
        gHandler.commonTools = hqqCommonTools;

        console.log("platform - ", cc.sys.platform)
        console.log("language - ", cc.sys.language)
        console.log("os - ", cc.sys.os)
        if (cc.sys.platform === cc.sys.ANDROID && cc.sys.os === cc.sys.OS_ANDROID
            || cc.sys.platform === cc.sys.IPHONE && cc.sys.platform === cc.sys.IPAD && cc.sys.os === cc.sys.OS_IOS) {
            console.log("DeviceId - " + gHandler.Reflect.getDeviceId())
            console.log("Clipboard - " + gHandler.Reflect.getClipboard());
            console.log("NetworkType - " + jsb.Device.getNetworkType());
            console.log("DeviceModel - " + jsb.Device.getDeviceModel());
        }

        this.state = 0;
        this.tempTime = 0;
        this.isFirstLogin = false;
        this.info = "资源加载中";

        if (cc.sys.isBrowser) {
            this.requestSecret();
        } else {
            this.mainLocalCheck();
            // gHandler.localStorage.clear();
        }
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
    },
    /** 本地初始化 */
    localInit() {
        let global = gHandler.localStorage.getGlobal();
        appGlobal.server = global.serverKey;
        appGlobal.hotServer = global.hotServerKey;
        appGlobal.codeBook = global.codeBookKey;
        appGlobal.enterServer = global.enterServerKey;
        appGlobal.serverList = global.serverListKey;
        appGlobal.remoteSeverinfo = global.remoteSeverinfoKey;
        appGlobal.remoteGamelist = global.remoteGamelistKey;
    },
    /** 主包本地检查 */
    mainLocalCheck() {
        if (SubgameManager.isSubgameDownLoad(gameConfig.mainconfig)) {
            this.mianUpdateCheck();
        } else {
            console.log("main not download");
            if (appGlobal.server) { // 主包从未热更过
                this.mianUpdateCheck();
            } else {
                this.isFirstLogin = true;
                this.requestSecret(); // 首次登陆
            }
        }
    },
    /** 主包更新判断 */
    mianUpdateCheck() {
        this.info = "本地包更新检测";
        SubgameManager.needUpdateSubgame( // 已下载，判断是否需要更新
            gameConfig.mainconfig,
            (success) => {
                if (success) {
                    console.log("main need hotupdate")
                    this.updateMain();
                } else {
                    console.log("main not need hotupdate", appGlobal.server)
                    this.requestGameSeverInfo(appGlobal.server);
                }
            },
            () => {
                console.log("hotupdate error");
                this.requestGameSeverInfo(appGlobal.server);
            }
        );
    },
    /** 更新主包 */
    updateMain() {
        this.info = "本地包更新中";
        this.state = 1;
        SubgameManager.downloadSubgame(
            gameConfig.mainconfig,
            (progress) => {
                console.log("main update...");
            },
            (success) => {
                if (success) {
                    console.log("update success");
                    cc.game.restart()
                } else {
                    cc.log("download fail");
                    // this.label.string = "多次连接失败，请到网络优良的地方重新登录";
                    gHandler.logManager.log("热更主包失败");
                    this.requestGameSeverInfo();
                }
            }
        );
    },
    /** 密码本解密 */
    decodeSecret(response) {
        let data = "";
        for (let i = 0; i < response.length; i++) {
            if (i % 6 !== 0) {
                data += response[i];
            }
        }
        let data2 = hqqBase64.decode(data);
        return JSON.parse(data2);
    },
    /** 请求密码本 */
    requestSecret() {
        this.info = "请求云端资源";
        let hasreceive = false;
        let callback = (response) => {
            if (!hasreceive && response) {
                hasreceive = true;
                let data = this.decodeSecret(response);
                let book = data[appGlobal.gameMode];
                gHandler.logManager.log("requestSecret:upgrade:" + book.upgrade + ";select:" + book.select);
                appGlobal.hotServer = book.upgrade;
                gHandler.localStorage.globalSet(appGlobal.hotServerKey, book.upgrade)
                appGlobal.codeBook = book.select;
                gHandler.localStorage.globalSet(appGlobal.codeBookKey, book.select);
                this.requestFastestEnterServer(book.select);
            }
        }
        for (let i = 0; i < appGlobal.secretlist.length; i++) {
            gHandler.http.sendSecretRequestGet(appGlobal.secretlist[i], null, callback)
        }
    },
    /** 请求最快的接待服务器 */
    requestFastestEnterServer(urllist) {
        // console.log("requestFastestEnterServer", urllist)
        this.info = "云端资源检测";
        let hasreceive = false;
        let callback = (url) => {
            if (!hasreceive && url) {
                hasreceive = true;
                appGlobal.enterServer = url;
                gHandler.localStorage.globalSet(appGlobal.enterServerKey, url);
                this.requestServerList(url, true);
            }
        }
        for (let i = 0; i < urllist.length; i++) {
            gHandler.http.ping(urllist[i], callback)
        }
    },
    /** 节点服务器解码 */
    decodeServer(response) {
        let data = "";
        for (let i = 0; i < response.length; i++) {
            if (i !== 0 && i != response.length - 1) {
                data += response[i];
            }
        }
        let data2 = hqqBase64.decode(data);
        return data2;
    },
    /** 请求点服务器列表 */
    requestServerList(url) {
        this.info = "请求云端资源点";
        gHandler.logManager.log("requestServerList:" + url)
        let hasreceive = false;
        let callback = (response) => {
            let url = this.decodeServer(response);
            let urllist = url.split(",");
            if (!hasreceive) {
                hasreceive = true;
                appGlobal.serverList = urllist;
                gHandler.localStorage.globalSet(appGlobal.serverListKey, urllist);
                this.requestFastestServer(urllist);
            }
        }
        gHandler.http.sendSecretRequestGet(url, null, callback);
    },
    /** 请求最快的节点服务器 */
    requestFastestServer(urllist) {
        this.info = "云端资源点检测";
        console.log("requestFastestServer", urllist)
        let hasreceive = false;
        let callback = (url) => {
            if (!hasreceive) {
                hasreceive = true;
                appGlobal.server = url;
                gHandler.localStorage.globalSet(appGlobal.serverKey, url);
                this.requestGameSeverInfo(url);
            }
        }
        for (let i = 0; i < urllist.length; i++) {
            let endurl = "/checked";
            gHandler.http.pingIp(urllist[i], endurl, callback);
        }
    },
    /** 请求游戏服务器信息 */
    requestGameSeverInfo(url) {
        this.info = "更新检测";
        gHandler.logManager.log("requestGameSeverInfo:" + url)
        let callback = (data, url) => {
            console.log("requestGameSeverInfo callback", data)
            if (data.code === 200) {
                this.requestGameListInfo(url, data.msg);
            }
        }
        let outcallback = () => {
            this.requestSecret();
        }
        let endurl = appGlobal.remotePath + appGlobal.remoteGetSeverInfo + "?token=" + appGlobal.remoteToken + "&package_name=" + appGlobal.packgeName + "&os=" + appGlobal.os;
        gHandler.http.sendRequestIpGet(url, endurl, callback, outcallback);
    },
    /** 请求游戏列表 */
    requestGameListInfo(url, msg) {
        // console.log("requestGameListInfo")
        let callback = (data, url) => {
            console.log("requestGameListInfo callback", data)
            if (data.code === 200) {
                appGlobal.remoteGamelist = data.msg;
                gHandler.localStorage.globalSet(appGlobal.remoteGamelistKey, data.msg);
                if (this.isFirstLogin) {
                    this.isFirstLogin = false;
                    this.mianUpdateCheck();
                } else {
                    this.halUpdateCheck(msg);
                }
            }
        }
        let endurl = appGlobal.remotePath + appGlobal.remoteGetGameList + "?token=" + appGlobal.remoteToken + "&package_name=" + appGlobal.packgeName + "&os=" + appGlobal.os;
        gHandler.http.sendRequestIpGet(url, endurl, callback);
    },
    /** 检查大厅更新 */
    halUpdateCheck(msg) {
        if (appGlobal.remoteSeverinfo && appGlobal.remoteSeverinfo[appGlobal.os]) {
            let vlist = appGlobal.remoteSeverinfo[appGlobal.os].hall_version.split(".");
            console.log("hall version check: local:", vlist, "remote:", msg[appGlobal.os].hall_version)
            if (!vlist || vlist[2] !== msg[appGlobal.os].hall_version.split(".")[2]) {
                console.log("dating need hotupdate")
                appGlobal.remoteSeverinfo = msg;
                gHandler.localStorage.globalSet(appGlobal.remoteSeverinfoKey, msg);
                this.updateHall();
            } else {
                console.log("dating not need hotupdate")
                appGlobal.remoteSeverinfo = msg;
                gHandler.localStorage.globalSet(appGlobal.remoteSeverinfoKey, msg);
                this.login();
            }
        } else {
            console.log("dating not download");
            appGlobal.remoteSeverinfo = msg;
            gHandler.localStorage.globalSet(appGlobal.remoteSeverinfoKey, msg);
            this.updateHall();
        }
    },
    /** 更新大厅 */
    updateHall() {
        this.info = "大厅更新中";
        this.state = 1;
        SubgameManager.downloadSubgame(
            gameConfig.hallconfig,
            (progress) => {
                console.log("dating update...");
            },
            (success) => {
                if (success) {
                    console.log("entry game");
                    this.login();
                } else {
                    console.log("download fail");
                    gHandler.logManager.log("多次热更大厅失败");
                    this.login();
                }
            }
        );
    },
    /** 登录服务器 */
    login() {
        this.info = "登录中";
        cc.director.preloadScene("hall");
        if (appGlobal.tempName && appGlobal.tempPass) {
            this.officialLogin();
        } else if (appGlobal.deviceID) {
            this.loginWithUUID();
        } else if (appGlobal.code && appGlobal.unique_id) {
            this.firstLogin();
        } else {
            // todo 弹出登陆框
            console.log("pop tips login")
        }
    },
    /** 根据api拼接登陆url */
    getLoginURL(type) {
        let endurl = "";
        if (type == 0) {
            endurl = appGlobal.officialLogin + "?"
        } else if (type == 1) {
            endurl = appGlobal.loginWithUUID + "?"
        } else {
            endurl = appGlobal.firstLogin + "?"
        }
        endurl += "uuid=" + appGlobal.deviceID;
        endurl += "&package_name=" + appGlobal.packgeName;
        endurl += "&os=" + appGlobal.os;
        endurl += "&code=" + appGlobal.code;
        endurl += "&unique_id=" + appGlobal.unique_id;
        endurl += "&account_name=" + appGlobal.tempName;
        endurl += "&account_pass=" + appGlobal.tempPass;
        return endurl;
    },
    /** 账号密码 */
    officialLogin() {
        // console.log("officialLogin")
        let callback = (data, url) => {
            console.log("officialLogin callback", data, url)
            if (data.code !== 200) {
                this.loginWithUUID();
            } else {
                this.setPlayerInfo(data)
            }
        }
        let outcallback = () => { // 账号密码登录超时，uuid登录
            this.loginWithUUID();
        }
        let endurl = this.getLoginURL(0);
        gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
    },
    /** uuid登陆 */
    loginWithUUID() {
        // console.log("loginWithUUID")
        let callback = (data, url) => {
            console.log("loginWithUUID callback", data, url)
            if (data.code !== 200) {
                this.firstLogin();
            } else {
                this.setPlayerInfo(data)
            }
        }
        let outcallback = () => {
            this.firstLogin();
        }
        let endurl = this.getLoginURL(1);
        gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
    },
    /** code和unique_id登陆 */
    firstLogin() {
        // console.log("firstLogin")
        if (appGlobal.code && appGlobal.unique_id) {
            let callback = (data, url) => {
                console.log("firstLogin callback", data, url)
                if (data.code !== 200) {
                    // todo 弹出登陆框
                    console.log("login fail")
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let outcallback = () => {
                this.requestSecret();
            }
            let endurl = this.getLoginURL(2);
            gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
        } else {
            // todo 弹出登陆框
            console.log("login fail")
        }
    },
    /** 设置玩家信息 */
    setPlayerInfo(data) {
        // console.log("setPlayerInfo")
        let msg = data.msg;
        gameGlobal.player.name = msg.account.account_name;
        gameGlobal.player.pass = msg.account.account_base_pass;
        gameGlobal.player.code = msg.prev_proxy.proxy_pid;
        gameGlobal.player.uuid = msg.game_user.uuid;
        gHandler.localStorage.globalSet(gameGlobal.playerKey, gameGlobal.player);
        gHandler.logManager.saveLog();
        gHandler.localStorage.savaLocal();
        console.log("load hall scene ")
        cc.director.loadScene("hall");
    },
    /** 每帧调用一次 // called every frame */
    update(dt) {
        this.tempTime += dt;
        if (this.tempTime >= 0.2) {
            this.tempTime = 0;
            if (this.state == 0) {
                if (this.label.string.length >= 8) {
                    this.label.string = this.info;
                } else {
                    this.label.string = this.label.string + ".";
                }
            } else if (this.state == 1) {
                this.progresslabel.string = this.progresslabel.string + ">";
                if (this.label.string.length >= 8) {
                    this.label.string = this.info;
                } else {
                    this.label.string = this.label.string + ".";
                }
            }
        }
    },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    // onDestroy() { },
});

