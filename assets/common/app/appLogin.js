/*
 * @Author: burt
 * @Date: 2019-08-30 15:38:34
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-11 14:32:03
 * @Description: 
 */
let gHandler = require("gHandler");
let appGlobal = require("appGlobal");
let hotUpdateMgr = require("hotUpdateMgr");

let appLogin = {
    init: function (data) {
        if (CC_JSB) {
            this.isRealTimeLog = true;
        } else {
            if (cc.sys.isBrowser) {
                this.isRealTimeLog = true;
            } else {
                this.isRealTimeLog = true;
            }
        }

        this.localInit();
        gHandler.hotUpdateMgr = hotUpdateMgr;
        gHandler.hotUpdateMgr.init(data.hallmanifest);

        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.audioEngine.pauseMusic();
            cc.audioEngine.pauseAllEffects();
            gHandler.logMgr.saveLog();
            gHandler.localStorage.savaLocal();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.audioEngine.resumeMusic();
            cc.audioEngine.resumeAllEffects();
        });
        gHandler.logMgr.log("language - " + cc.sys.language);
        gHandler.logMgr.log("platform - " + cc.sys.platform);
        gHandler.logMgr.log("os - " + cc.sys.os);
        gHandler.logMgr.log("osVersion - " + cc.sys.osVersion);
        gHandler.logMgr.log("osMainVersion - " + cc.sys.osMainVersion);
        if (CC_JSB) {
            if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID
                || cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD || cc.sys.os === cc.sys.OS_IOS) {
                appGlobal.deviceID = gHandler.Reflect.getDeviceId()
                appGlobal.clipboard = gHandler.Reflect.getClipboard()
                gHandler.logMgr.log("Clipboard - " + appGlobal.clipboard);
                gHandler.logMgr.log("NetworkType - " + jsb.Device.getNetworkType());// 0 网络不通  1 通过无线或者有线本地网络连接因特网  2 通过蜂窝移动网络连接因特网
                gHandler.logMgr.log("getBatteryLevel - " + jsb.Device.getBatteryLevel());
                gHandler.logMgr.log("DeviceModel - " + jsb.Device.getDeviceModel());
                gHandler.logMgr.log("isMobile - " + cc.sys.isMobile);
            }
        } else {
            gHandler.logMgr.log("browserType - " + cc.sys.browserType);
            gHandler.logMgr.log("browserVersion - " + cc.sys.browserVersion);
        }

        // console.log("appGlobal.hotServer", appGlobal.hotServer)
        if (appGlobal.hotServer && appGlobal.server) { // 本地已经有记录了
            // this.loginIndex = 0;
            this.requestFastestHotServer()
        } else {
            this.requestSecret(); // 首次登陆
        }
    },
    /** 本地初始化 */
    localInit() {
        let global = gHandler.localStorage.getGlobal();
        appGlobal.version = global.versionKey || appGlobal.version;
        if (CC_JSB) {
            let appversionname = gHandler.Reflect && gHandler.Reflect.getAppVersion()
            if (appversionname && appversionname != "") {
                appGlobal.apkVersion = appversionname
            } else {
                gHandler.logMgr.log("获取本地安装包版本失败");
                appGlobal.apkVersion = global.apkVersionKey || appGlobal.apkVersion;
            }
        }
        appGlobal.server = global.serverKey || appGlobal.server;
        appGlobal.hotServer = global.hotServerKey || appGlobal.hotServer;
        appGlobal.codeBook = global.codeBookKey || appGlobal.codeBook;
        appGlobal.enterServer = global.enterServerKey || appGlobal.enterServer;
        appGlobal.serverList = global.serverListKey || appGlobal.serverList;
        gHandler.gameGlobal.player = global.playerKey || gHandler.gameGlobal.player;

        if (cc.sys.isBrowser) {
            gHandler.gameGlobal.token = global.tokenKey || gHandler.webToken || ''
            gHandler.gameGlobal.player.account_name = (global.playerKey && global.playerKey.account_name) || gHandler.webAcconunt
            appGlobal.deviceID = (global.playerKey && global.playerKey.deviceid) || gHandler.webDeviceid || appGlobal.deviceID
        } else {
            gHandler.gameGlobal.token = global.tokenKey || gHandler.gameGlobal.token;
        }
    },
    /** 密码本解密 */
    decodeSecret(response) {
        let data = "";
        for (let i = 0; i < response.length; i++) {
            if (i % 6 !== 0) {
                data += response[i];
            }
        }
        let data2 = gHandler.base64.decode(data);
        return JSON.parse(data2);
    },
    /** 请求密码本 */
    requestSecret() {
        // this.loginIndex = 0;
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "请求云端资源")
        let hasreceive = false;
        gHandler.logMgr.time("requestSecret")
        let callback = (response) => {
            if (!hasreceive && response) {
                hasreceive = true;
                let data = this.decodeSecret(response);
                // console.log("密碼本", data)
                let book = data[appGlobal.huanjin];
                gHandler.logMgr.timeEnd("requestSecret", "upgrade:", book.upgrade, ";select:", book.select)
                // console.log("密碼本服务器列表", book.upgrade)
                gHandler.localStorage.globalSet(appGlobal.hotServerKey, book.upgrade)
                appGlobal.codeBook = book.select;
                gHandler.localStorage.globalSet(appGlobal.codeBookKey, book.select);
                this.requestFastestHotServer();
            }
        }
        for (let i = 0; i < appGlobal.secretlist.length; i++) {
            gHandler.http.sendSecretRequestGet(appGlobal.secretlist[i], null, callback)
        }
    },
    // 请求最快的热更服务器地址
    requestFastestHotServer() {
        let urllist = gHandler.localStorage.globalGet(gHandler.appGlobal.hotServerKey)
        if ((urllist instanceof Array)) {
            appGlobal.hotServer = urllist[0]
            gHandler.logMgr.time("requestFastestHotServer")
            let callback = (url) => {
                gHandler.logMgr.timeEnd("requestFastestHotServer", url)
                appGlobal.hotServer = url;
                this.getRemoteVersionInfo();
            }
            let outcallback = () => {
                gHandler.logMgr.log("请求最快的热更服务器失败，重新请求密码本")
                this.requestSecret();
            }
            gHandler.http.requestFastestUrl(urllist, null, "/checked", callback, outcallback)
        } else {
            appGlobal.hotServer = urllist
            this.getRemoteVersionInfo();
        }
    },
    /** 请求最快的接待服务器 */
    requestFastestEnterServer(urllist) {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "云端资源检测")
        gHandler.logMgr.time("requestFastestEnterServer")
        let callback = (url) => {
            gHandler.logMgr.timeEnd("requestFastestEnterServer", url)
            appGlobal.enterServer = url;
            gHandler.localStorage.globalSet(appGlobal.enterServerKey, url);
            this.requestServerList(url, true);
        }
        let outcallback = () => {
            gHandler.logMgr.log("请求最快的接待服务器失败，重新请求密码本")
            this.requestSecret();
        }
        gHandler.http.requestFastestUrl(urllist, null, null, callback, outcallback)
    },
    /** 节点服务器解码 */
    decodeServer(response) {
        let data = "";
        for (let i = 0; i < response.length; i++) {
            if (i !== 0 && i != response.length - 1) {
                data += response[i];
            }
        }
        let data2 = gHandler.base64.decode(data);
        return data2;
    },
    /** 请求点服务器列表 */
    requestServerList(url) {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "请求云端资源点")
        // gHandler.logMgr.log("requestServerList:", url)
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
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "云端资源点检测")
        gHandler.logMgr.time("requestFastestServer")
        let callback = (url) => {
            gHandler.logMgr.timeEnd("requestFastestServer", url)
            appGlobal.server = url;
            gHandler.localStorage.globalSet(appGlobal.serverKey, url);
            this.requestGameSeverInfo(url);
        }
        let outcallback = () => {
            gHandler.logMgr.log("requestFastestServer error requestSecret again")
            this.requestSecret();
        }
        for (let i = 0; i < urllist.length; i++) {
            if (urllist[i].indexOf("http:") == -1 && urllist[i].indexOf("https:") == -1) {
                urllist[i] = "http://" + urllist[i];
            }
        }
        gHandler.http.requestFastestUrl(urllist, '', "/checked", callback, outcallback)
    },
    /** 请求游戏服务器信息 */
    requestGameSeverInfo(url) {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "站点请求")
        gHandler.logMgr.log("请求游戏服务器信息", url)
        cc.director.preloadScene("hall");
        let callback = (data, url) => {
            this.log(" getserverinfo callback", data)
            if (data.code === 200) {
                appGlobal.remoteSeverinfo = data.msg;
                this.requestGameListInfo(appGlobal.server);
            }
        }
        let outcallback = () => {
            gHandler.logMgr.log("获取服务器信息失败，重新请求密码本")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "网络太差，重新登陆")
            this.requestSecret();
        }
        let endurl = appGlobal.remotePath + appGlobal.remoteGetSeverInfo + "?platform_key=" + appGlobal.remoteToken + "&package_name=" + appGlobal.packgeName + "&os=" + appGlobal.os;
        gHandler.http.sendRequestIpGet(url, endurl, callback, outcallback);
    },
    /** 请求游戏列表 */
    requestGameListInfo(url) {
        let callback = (data, url) => {
            this.log(" getGameList callback", data)
            if (data.code === 200) {
                appGlobal.remoteGamelist = data.msg;
                let sortarray = []
                for (let k in gHandler.gameConfig.gamelist) {
                    for (let i = 0; i < appGlobal.remoteGamelist.length; i++) {
                        if (gHandler.gameConfig.gamelist[k].game_id == appGlobal.remoteGamelist[i].game_id) {
                            gHandler.gameConfig.gamelist[k].remoteData = appGlobal.remoteGamelist[i]
                            gHandler.gameConfig.gamelist[k].serverUrl = appGlobal.remoteGamelist[i].game_host[0]
                            break;
                        }
                    }
                    sortarray.push(gHandler.gameConfig.gamelist[k])
                }
                for (let k in gHandler.gameConfig.oldGameList) {
                    for (let i = 0; i < appGlobal.remoteGamelist.length; i++) {
                        if (gHandler.gameConfig.oldGameList[k].game_id == appGlobal.remoteGamelist[i].game_id) {
                            gHandler.gameConfig.oldGameList[k].remoteData = appGlobal.remoteGamelist[i]
                            break;
                        }
                    }
                }
                sortarray.sort(function (a, b) {
                    if (b.remoteData && a.remoteData) {
                        return b.remoteData.sort - a.remoteData.sort
                    }
                })
                for (let k in gHandler.gameConfig.gamelist) {
                    for (let i = 0; i < sortarray.length; i++) {
                        if (gHandler.gameConfig.gamelist[k].game_id == sortarray[i].game_id && k == sortarray[i].enname) {
                            gHandler.gameConfig.gamelist[k].hallid = i
                            break;
                        }
                    }
                }
                // this.loginIndex++;
                // if (this.loginIndex == 2) {
                this.login();
                // }
            }
        }
        let outcallback = () => {
            gHandler.logMgr.log("获取游戏列表失败，重新请求密码本")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "网络太差，重新登陆")
            this.requestSecret();
        }
        let endurl = appGlobal.remotePath + appGlobal.remoteGetGameList + "?platform_key=" + appGlobal.remoteToken + "&package_id=" + appGlobal.remoteSeverinfo.id;
        gHandler.http.sendRequestIpGet(url, endurl, callback, outcallback);
    },
    /**
     * @Description: 获取云端版本配置文件
     */
    getRemoteVersionInfo() {
        let v = Math.floor(Math.random() * 10000)
        let packageUrl = gHandler.appGlobal.hotServer + "/" + gHandler.appGlobal.packgeName + "/" + 'version.json?' + v
        let callback = (data, url) => {
            // console.log('getRemoteVersionInfo callback', data, url)
            this.checkApkUpdata(data)
        }
        let failcallback = (status) => {
            console.log('getRemoteVersionInfo failcallback', status)
            this.isupdataCallback(false) // 直接跳过更新
        }
        let outcallback = () => {
            console.log('getRemoteVersionInfo outcallback')
            this.isupdataCallback(false) // 直接跳过更新
        }
        gHandler.http.sendRequestGet(packageUrl, null, callback, failcallback, outcallback)
    },
    /**
     * @Description: 检查apk更新  "/com.test.dev.android/temp/1/?packageID=1&M=dev&proxyUserID=351027469"
     */
    checkApkUpdata(data) {
        let vA = data.apkversion.split('.');
        let needUp = false
        this.log(" 本地 apkVersion", appGlobal.apkVersion, "服务端 apkVersion", data.apkversion)
        if (appGlobal.apkVersion) {
            let vB = appGlobal.apkVersion.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    needUp = true; // 只要版本不同即更新，保证可以版本回退
                    break;
                }
            }
            if (vA.length > vB.length) {
                needUp = true;
            }
        }
        if (needUp && !cc.sys.isBrowser && cc.sys.os != "OS X" && cc.sys.os != "Windows") { //  
            let callback0 = (url) => {
                gHandler.gameGlobal.proxy.temp_host = url;
                gHandler.appDownUrl = url + "/" + appGlobal.packgeName + "/temp/1/?packageID=" + data[appGlobal.pinpai].packageID + "&M=" + appGlobal.huanjin + "&proxyUserID=" + data[appGlobal.pinpai][appGlobal.huanjin].proxyUserID
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 8 })
            }
            let outcallback = () => {
                gHandler.logMgr.log("temp_host请求失败，重新请求密码本")
                this.requestSecret();
            }
            gHandler.http.requestFastestUrl(data.temp_host[appGlobal.huanjin], null, "/checked", callback0, outcallback)
            gHandler.logMgr.log("安装包需要更新")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "安装包更新")
        } else {
            gHandler.logMgr.log("apk不需要更新")
            let callback0 = (url) => {
                gHandler.gameGlobal.proxy.temp_host = url;
                gHandler.appDownUrl = url + "/" + appGlobal.packgeName + "/temp/1/?packageID=" + data[appGlobal.pinpai].packageID + "&M=" + appGlobal.huanjin + "&proxyUserID=" + data[appGlobal.pinpai][appGlobal.huanjin].proxyUserID
            }
            let outcallback = () => {
                gHandler.logMgr.log("temp_host请求失败，重新请求密码本")
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取下载链接失败")
            }
            gHandler.http.requestFastestUrl(data.temp_host[appGlobal.huanjin], null, "/checked", callback0, outcallback)
            if (cc.sys.isBrowser || cc.sys.os == "Windows") { // 
                // this.loginIndex++;
                if (appGlobal.server) {
                    this.requestGameSeverInfo(appGlobal.server)
                } else {
                    let select = gHandler.localStorage.globalGet(appGlobal.codeBookKey)
                    this.requestFastestEnterServer(select);
                }
            } else {
                this.hallUpdataCheck(data.version.hall);
            }
        }
    },
    isupdataCallback(bool) {
        if (bool) { // 需要更新
            // 自动更新，无需处理
            gHandler.logMgr.log("大厅需要更新")
        } else {
            gHandler.logMgr.log("大厅不需要更新")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "大厅不需要更新")
            if (appGlobal.server) {
                this.requestGameSeverInfo(appGlobal.server)
            } else {
                let select = gHandler.localStorage.globalGet(appGlobal.codeBookKey)
                this.requestFastestEnterServer(select);
            }
            // this.loginIndex++;
            // if (this.loginIndex == 2) {
            //     this.login();
            // }
        }
    },
    failCallback() {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "大厅更新检测失败")
        gHandler.logMgr.sendLog()
        this.requestSecret();
    },
    progressCallback(progress) {
        //  this.log(" 下载进度：", progress)
    },
    finishCallback() {
        //  this.log(" finishCallback")
    },

    /** 大厅检查 */
    hallUpdataCheck(hall_version) {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "大厅更新检测")
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheckup, "appLogin", this.isupdataCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFail, "appLogin", this.failCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotProgress, "appLogin", this.progressCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFinish, "appLogin", this.finishCallback.bind(this))
        hall_version = hall_version == '1.0.0' ? '' : hall_version
        gHandler.hotUpdateMgr.checkUpdate({
            subname: "hall",
            version: appGlobal.version,
            remotev: hall_version,
        })
    },
    /** 登录服务器 */
    login() {
        if (!navigator) {
            gHandler.logMgr.log("没有 navigator", navigator)
            if (!navigator.userAgent) {
                gHandler.logMgr.log("没有 navigator.userAgent", navigator.userAgent)
            }
        }
        if (cc.sys.os == "Windows") {
            this.login2()
        } else {
            if ((!gHandler.gameGlobal.player.code && !gHandler.gameGlobal.player.id)) {
                let callback = (response, urlto) => {
                    this.log(" getOnlineCode", response)
                    if (response.msg != null) {
                        gHandler.gameGlobal.player.code = response.msg.proxy_user_id
                        gHandler.gameGlobal.player.id = response.msg.account_name
                        appGlobal.unique_id = response.msg.unique_id
                    } else {
                        gHandler.logMgr.log("没有获取到玩家code")
                        // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "getOnlineCode msg = null")
                    }
                    this.login2()
                }
                let outcallback = () => {
                    this.login2()
                }
                let str = "";
                if (appGlobal.clipboard) {
                    str = gHandler.base64.decode(appGlobal.clipboard);
                }
                // let str = gHandler.base64.decode(appGlobal.clipboard)
                if (str.indexOf('salt') == -1) {
                    appGlobal.clipboard = ""
                }
                let endurl = "/Game/Code/getOnlineCode?"
                endurl += "package_name=" + appGlobal.packgeName;
                endurl += "&os=" + appGlobal.os;
                endurl += "&uuid=" + appGlobal.deviceID;
                endurl += "&keys=" + appGlobal.clipboard;
                endurl += "&userAgent=" + navigator.userAgent;
                endurl = endurl.replace(/\s+/g, "")
                gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
            } else {
                this.login2()
            }
        }
    },
    // 登陆前检测
    login2() {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中")
        if (gHandler.gameGlobal.token && gHandler.gameGlobal.token != "") {
            this.loginWithToken()
        } else if (appGlobal.deviceID && appGlobal.deviceID != "") {
            this.loginWithUUID();
        } else if (gHandler.gameGlobal.player.code && appGlobal.unique_id) {
            this.firstLogin();
        } else {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 7 })
        }
    },
    loginWithToken() {
        gHandler.logMgr.log("loginWithToken")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中1")
        if (gHandler.gameGlobal.token && gHandler.gameGlobal.token != "") {
            let callback = (data, url) => {
                this.log(" loginWithToken callback", data)
                if (data.code !== 200) {
                    this.loginWithUUID();
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let outcallback = () => { // 账号密码登录超时，uuid登录
                this.loginWithUUID();
            }
            let endurl = appGlobal.getIpGetEndurl(3);
            gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
        } else {
            this.loginWithUUID();
        }
    },
    /** 账号密码 */
    officialLogin() {
        gHandler.logMgr.log("officialLogin")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中4")
        if (gHandler.gameGlobal.player.account_name && gHandler.gameGlobal.player.account_pass) {
            let callback = (data, url) => {
                this.log(" officialLogin callback", data, url)
                if (data.code !== 200) {
                    this.loginWithUUID();
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let outcallback = () => { // 账号密码登录超时，uuid登录
                this.loginWithUUID();
            }
            let endurl = appGlobal.getIpGetEndurl(0);
            gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
        } else {
            this.loginWithUUID();
        }
    },
    /** uuid登陆 */
    loginWithUUID() {
        gHandler.logMgr.log("loginWithUUID")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中2")
        if (appGlobal.deviceID) {
            let callback = (data, url) => {
                this.log(" loginWithUUID callback", data, url)
                if (data.code !== 200) {
                    this.firstLogin();
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let outcallback = () => {
                this.firstLogin();
            }
            let endurl = appGlobal.getIpGetEndurl(1);
            gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
        } else {
            this.firstLogin();
        }
    },
    /** code和unique_id登陆 */
    firstLogin() {
        gHandler.logMgr.log("firstLogin")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中3")
        if (gHandler.gameGlobal.player.code) {
            let callback = (data, url) => {
                this.log(" firstLogin callback", data, url)
                if (data.code !== 200) {
                    gHandler.logMgr.log("firstLogin 失败：" + data.code + data.msg)
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "登陆失败:" + data.code + data.msg)
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 7 })
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let outcallback = () => {
                this.requestSecret();
            }
            let endurl = appGlobal.getIpGetEndurl(2);
            gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
        } else {
            gHandler.logMgr.log("firstLogin 失败：code为空")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 7 })
        }
    },
    /** 设置玩家信息 */
    setPlayerInfo(data, ischange) {
        let msg = data.msg;
        appGlobal.gameuser = data.msg.game_user;
        gHandler.gameGlobal.player.account_pass = "";
        gHandler.gameGlobal.player.alipay = ""; //  支付宝账号
        gHandler.gameGlobal.player.yinhangka = ""; //  银行卡
        gHandler.gameGlobal.huanjin = appGlobal.huanjin
        gHandler.gameGlobal.pay.client = appGlobal.os
        gHandler.gameGlobal.token = msg.token
        gHandler.setGameInfo(data.msg.game_user, data.msg.proxy_user, data.msg.prev_proxy)
        gHandler.localStorage.globalSet(gHandler.gameGlobal.tokenKey, gHandler.gameGlobal.token);

        for (let key in gHandler.gameConfig.gamelist) {
            gHandler.gameConfig.gamelist[key].hasAccount = false
        }
        for (let key in gHandler.gameConfig.oldGameList) {
            gHandler.gameConfig.oldGameList[key].hasAccount = false
        }
        let txt = ""
        for (let index in msg.game_accounts) {
            for (let key in gHandler.gameConfig.gamelist) {
                if (gHandler.gameConfig.gamelist[key].game_id == msg.game_accounts[index].game_id) {
                    txt += key + "(n), "
                    gHandler.gameConfig.gamelist[key].hasAccount = true
                }
            }
            for (let key in gHandler.gameConfig.oldGameList) {
                if (gHandler.gameConfig.oldGameList[key].game_id == msg.game_accounts[index].game_id) {
                    txt += key + "(w), "
                    gHandler.gameConfig.oldGameList[key].hasAccount = true
                    break;
                }
            }
        }
        gHandler.logMgr.log("游戏id：", gHandler.gameGlobal.player.id)
        gHandler.logMgr.log("已有子游戏账号 ", txt)
        gHandler.localStorage.globalSet(gHandler.gameGlobal.playerKey, gHandler.gameGlobal.player);
        if (!ischange) {
            this.m_destroy()
            cc.director.loadScene("hall");
        }
    },
    /**
     * @Description: 切换账号
     */
    accountChange(account, pass, mcallback) {
        gHandler.logMgr.log("accountChange")
        let callback = (data, url) => {
            this.log(" accountChange callback", data, url)
            if (data.code !== 200) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "登陆失败:" + data.msg)
            } else {
                if (!gHandler.gameGlobal.isdev && gHandler.hallWebSocket) {
                    gHandler.hallWebSocket.close()
                    let url = gHandler.appGlobal.server;
                    if (url.indexOf("://") == -1) {
                        url = "ws://" + url;
                    } else {
                        let sourl = url.split("://")[1];
                        let header = url.split("://")[0];
                        let soHeader = "";
                        if (header == "http") {
                            soHeader = "ws://";
                        } else if (header == "https") {
                            soHeader = "wss://";
                        }
                        url = soHeader + sourl;
                    }
                    // if (cc.sys.isBrowser) {
                    //     url = "ws://" + url;
                    // }
                    this.setPlayerInfo(data, true)
                    gHandler.hallWebSocket.connect(url);
                } else {
                    this.setPlayerInfo(data, false)
                }
                mcallback && mcallback(true, data.msg.token)
            }
        }
        let outcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络太差，登陆超时")
        }
        let endurl = appGlobal.officialLogin + "?"
        endurl += "uuid=" + appGlobal.deviceID;
        endurl += "&package_name=" + appGlobal.packgeName;
        endurl += "&os=" + appGlobal.os;
        if (gHandler.gameGlobal.player.code == "0") {
            gHandler.gameGlobal.player.code = appGlobal.remoteSeverinfo.default_proxy_user_id;
        }
        endurl += "&code=" + gHandler.gameGlobal.player.code;
        endurl += "&unique_id=" + appGlobal.unique_id;
        endurl += "&account_name=" + account;
        endurl += "&account_pass=" + pass;
        gHandler.http.sendRequestIpGet(appGlobal.server, endurl, callback, outcallback);
    },
    /**
     * @Description: 总代自动登录
     */
    autoLogin() {
        gHandler.logMgr.log("autologin")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "自动登录中")
        if (cc.sys.os === cc.sys.OS_IOS && !gHandler.appGlobal.deviceID) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { msg: "请打开手机的'设置'里的'隐私'-'广告'，将'限制广告跟踪'设置为关闭，然后重新进入。" })
            return
        }
        let callback = (data, url) => {
            this.log(" autologin callback", data, url)
            if (data.code !== 200) {
                gHandler.logMgr.log("autologin fail", data.msg)
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "自动登录失败:" + data.msg)
            } else {
                this.setPlayerInfo(data)
            }
        }
        let outcallback = () => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "登陆超时，正在重新登陆")
            this.requestSecret();
        }
        let endurl = ""
        endurl += "/Game/login/firstLogin?" // 首次登陆
        endurl += "&uuid=" + gHandler.appGlobal.deviceID;
        endurl += "&package_name=" + gHandler.appGlobal.packgeName;
        endurl += "&os=" + gHandler.appGlobal.os;
        endurl += "&code=" + gHandler.appGlobal.getGeneralAgency();
        endurl += "&unique_id=" + gHandler.appGlobal.unique_id;
        endurl += "&account_name=" + gHandler.gameGlobal.player.account_name;
        endurl += "&account_pass=" + gHandler.gameGlobal.player.account_pass;
        endurl += "&token=" + gHandler.gameGlobal.token;
        // let endurl = gHandler.appGlobal.getAutoLoginEndurl();
        gHandler.http.sendRequestIpGet(gHandler.appGlobal.server, endurl, callback, outcallback);
    },
    m_destroy() {
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotCheckup, "appLogin")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFail, "appLogin")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotProgress, "appLogin")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFinish, "appLogin")
    },
    log() {
        this.isRealTimeLog && console.log("__appLogin__", ...arguments)
    },
}

module.exports = appLogin
