
let gHandler = require("gHandler");
let appGlobal = require("appGlobal");
let hotUpdateMgr = require("hotUpdateMgr");

let appLogin = {
    init: function (data) {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "开始登陆")
        this.errinfo = ""
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
        gHandler.logMgr.log("language:" + cc.sys.language
            + ",platform:" + cc.sys.platform
            + ",os:" + cc.sys.os
            + ",osVersion:" + cc.sys.osVersion
            + ",osMainVersion:" + cc.sys.osMainVersion
            + ",Cocos Creator v" + cc.ENGINE_VERSION);
        if (CC_JSB) {
            if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID
                || cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD || cc.sys.os === cc.sys.OS_IOS) {
                appGlobal.deviceID = gHandler.Reflect.getDeviceId()
                appGlobal.clipboard = gHandler.Reflect.getClipboard()
                let nettype = jsb.Device.getNetworkType()            // 0 网络不通  1 通过无线或者有线本地网络连接因特网  2 通过蜂窝移动网络连接因特网
                gHandler.logMgr.log("Clipboard:" + appGlobal.clipboard
                    + ",NetworkType:" + (nettype != 0 ? nettype == 1 ? "通过无线或者有线本地网络连网" : "通过蜂窝移动网络连网" : "网络不通")
                    + ",getBatteryLevel:" + jsb.Device.getBatteryLevel()
                    + ",DeviceModel:" + jsb.Device.getDeviceModel()
                    + ",isMobile:" + cc.sys.isMobile
                    + ',getAppPackageName:' + gHandler.Reflect.getAppPackageName())
            }
        } else {
            gHandler.logMgr.log("browserType:" + cc.sys.browserType + ",browserVersion:" + cc.sys.browserVersion);
        }
        this.getLocalIp(5)
        this.secretMaxTry = 200
        this.secretTry = 0
        if (appGlobal.server) { // 本地已经有记录了 老玩家
            this.requestFastestDownloadHotServer();
        } else {
            gHandler.logMgr.log("没有服务器地址")
        }
    },
    getLocalIp(trynum) {
        let callback = (data) => {
            // gHandler.logMgr.log("ipapiData:" + JSON.stringify(data))
            gHandler.gameGlobal.ipapiData = data
            gHandler.gameGlobal.ipList.push(data.query)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.refreshLoading, data.query)
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("ipapi获得信息失败：" + status + ",err:" + err + ",trynum:" + trynum);
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getLocalIp(trynum)
                }, 500);
            }
        }
        gHandler.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: "http://ip-api.com/json/",
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    /** 本地初始化 */
    localInit() {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "本地初始化")
        let global = gHandler.localStorage.getGlobal();
        appGlobal.version = global.versionKey || appGlobal.version;
        appGlobal.server = global.serverKey || appGlobal.server;
        appGlobal.canHotServer = global.canHotServerKey || appGlobal.canHotServer;
        appGlobal.hotServer = global.hotServerKey || appGlobal.hotServer;
        appGlobal.codeBook = global.codeBookKey || appGlobal.codeBook;
        appGlobal.selectServerIndex = global.selectServerIndexKey || appGlobal.selectServerIndex;
        appGlobal.hotServerIndex = global.hotServerIndexKey || appGlobal.hotServerIndex;
        appGlobal.serverIndex = global.serverIndexKey || appGlobal.serverIndex;
        appGlobal.tempServerIndex = global.tempServerIndexKey || appGlobal.tempServerIndex;
        appGlobal.payServerIndex = global.payServerIndexKey || appGlobal.payServerIndex;
        appGlobal.serverList = global.serverListKey || appGlobal.serverList;
        gHandler.gameGlobal.player = global.playerKey || gHandler.gameGlobal.player;

        if (cc.sys.isBrowser) {
            gHandler.gameGlobal.token = global.tokenKey || gHandler.webToken || ''
            gHandler.gameGlobal.player.account_name = (global.playerKey && global.playerKey.account_name) || gHandler.webAcconunt
            gHandler.gameGlobal.player.account_pass = (global.playerKey && global.playerKey.account_name) || gHandler.webAcconuntPass
            gHandler.gameGlobal.player.deviceid = appGlobal.deviceID = (global.playerKey && global.playerKey.deviceid) || gHandler.webDeviceid || appGlobal.deviceID
            gHandler.localStorage.globalSet(gHandler.gameGlobal.tokenKey, gHandler.gameGlobal.token);
            gHandler.localStorage.globalSet(gHandler.gameGlobal.playerKey, gHandler.gameGlobal.player);
        } else {
            gHandler.gameGlobal.token = global.tokenKey || gHandler.gameGlobal.token;
        }
    },
    /**
     * @Description: 请求下载速度最快的热更服务器
     */
    requestFastestDownloadHotServer() {
        if (gHandler.gameGlobal.isdev) {
            let callback = (response, url, checknum) => {
                this.checkApkUpdata(response)
                appGlobal.subGameVersion = response.version
                appGlobal.packageID = response[appGlobal.pinpai].packageID
                appGlobal.proxyUserID = response[appGlobal.pinpai][appGlobal.huanjin].proxyUserID
                gHandler.appGlobal.setGeneralAgency(response)
            }
            let failcallback = (status, forcejump, url, err) => {
                gHandler.logMgr.log("requestFastestDownloadHotServer 所有热更服务器都失败", status, forcejump, url, err)
            }
            if ((appGlobal.hotServer instanceof Array)) {
                appGlobal.hotServer = appGlobal.hotServer[0]
            }
            gHandler.http.sendXMLHttpRequest({
                method: "GET",
                urlto: appGlobal.hotServer,
                endurl: "/" + gHandler.appGlobal.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 10000),
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
                timeout: 5000,
                failtimeout: 7000,
            });
            return
        }
        let urllist = gHandler.localStorage.globalGet(gHandler.appGlobal.hotServerKey)
        if ((urllist instanceof Array)) {
            if (appGlobal.hotServerIndex) {
                urllist = gHandler.commonTools.swapItem(urllist, appGlobal.hotServerIndex, 0);
            }
            gHandler.logMgr.time('requestFastestDownloadHotServer')
            let callback = (response, url, checknum) => {
                gHandler.logMgr.timeEnd('requestFastestDownloadHotServer', url)
                appGlobal.canHotServer = appGlobal.hotServer = url;
                appGlobal.hotServerIndex = checknum;
                gHandler.localStorage.globalSet(appGlobal.hotServerIndexKey, checknum);
                this.checkApkUpdata(response)
                appGlobal.subGameVersion = response.version
                appGlobal.packageID = response[appGlobal.pinpai].packageID
                appGlobal.proxyUserID = response[appGlobal.pinpai][appGlobal.huanjin].proxyUserID
                gHandler.appGlobal.setGeneralAgency(response)
            }
            let failcallback = (status, forcejump, url, err) => {
                gHandler.logMgr.log("requestFastestDownloadHotServer 所有热更服务器都失败", status, forcejump, url, err)
            }
            let tipcallback = (checknum) => {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "U服务器线路" + checknum + "连接中")
            }
            gHandler.http.requestFastestUrlLine({
                urllist: urllist,
                endurl: "/" + gHandler.appGlobal.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 10000),
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
                timeout: 5000,
                failtimeout: 7000,
                tipcallback: tipcallback,
            })
        } else {
            this.isupdataCallback(false) // 直接跳过更新
        }
    },

    /** 请求游戏服务器信息 */
    requestGameSeverInfo(url) {
        gHandler.logMgr.log("请求游戏服务器信息", url)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "站点请求")
        cc.director.preloadScene("hall");
        let callback = (data, url) => {
            this.log(" getserverinfo callback", data)
            if (data.code === 200) {
                appGlobal.remoteSeverinfo = data.msg;
                this.requestGameListInfo(appGlobal.server);
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("获取服务器信息失败，重新刷选select线路", status, forcejump, err)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "网络太差，重新刷选select线路" + status + ",err:" + err)
        }
        let endurl = appGlobal.remotePath + appGlobal.remoteGetSeverInfo + "?platform_key=" + appGlobal.remoteToken + "&package_name=" + appGlobal.packgeName + "&os=" + appGlobal.os;
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: url,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
        });
    },
    /**
     * @Description: 子游戏服务器线路选择
     */
    checkSubGameServer() {
        let url = appGlobal.server

        // let logstr = ''
        if (url.includes("center")) {
            gHandler.gameGlobal.pay.pay_host = url.replace("center", "pay")
            // logstr += "pay_host地址" + gHandler.gameGlobal.pay.pay_host
        }
        // console.lozZg("pay_host地址", gHandler.gameGlobal.pay.pay_host)

        if (url.includes("center")) {
            gHandler.gameGlobal.im_host = url.replace("center", "im")
            // logstr += "im_host地址" + gHandler.gameGlobal.im_host
        }
        // console.log("im_host地址", gHandler.gameGlobal.im_host)

        if (url.includes("center")) {
            gHandler.gameGlobal.proxy.proxy_host = url.replace("center", "proxy")
            // logstr += "proxy_host地址" + gHandler.gameGlobal.proxy.proxy_host
        }
        // console.log("proxy_host地址", gHandler.gameGlobal.proxy.proxy_host)

        for (let k in gHandler.gameConfig.gamelist) {
            let url = appGlobal.server
            if (url.includes("http:")) {
                url = url.replace("http", "ws")
            } else if (url.includes("https:")) {
                url = url.replace("https", "ws")
            }
            if (url.includes("center")) {
                url = url.replace("center", "game")
            }
            gHandler.gameConfig.gamelist[k].serverUrl = url + gHandler.gameConfig.gamelist[k].endUrl
            // logstr += "子游戏服务器地址" + k + gHandler.gameConfig.gamelist[k].serverUrl
            // console.log('子游戏服务器地址', k, gHandler.gameConfig.gamelist[k].serverUrl)
        }
        // gHandler.logMgr.sendMLog(logstr)
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
                this.checkSubGameServer()
                this.login();
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("获取游戏列表失败，重新刷选select线路", status, forcejump, err)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "网络太差，重新刷选select线路" + status + ",err:" + err)
        }
        let endurl = appGlobal.remotePath + appGlobal.remoteGetGameList + "?platform_key=" + appGlobal.remoteToken + "&package_id=" + appGlobal.remoteSeverinfo.id;
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: url,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
        });
    },
    /**
     * @Description: 检查apk更新  "/com.test.dev.android/temp/1/?packageID=1&M=dev&proxyUserID=351027469"
     */
    checkApkUpdata(data) {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "检测安装包更新")
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
                    if (a > b) { // 线上版本大于本地版本
                        needUp = true;
                    } else if (a < b) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "本地安装包版本大于线上版本")
                    }
                    break;
                }
            }
            if (vA.length > vB.length) {
                needUp = true;
            }
        }
        this.checkFatestTempHost(data)
        if (needUp && !cc.sys.isBrowser && cc.sys.os != "OS X" && cc.sys.os != "Windows") {
            gHandler.logMgr.log("安装包需要更新")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "安装包更新")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 8 })
        } else {
            gHandler.logMgr.log("apk不需要更新")
            if (cc.sys.isBrowser) { // || cc.sys.os == "Windows"
                if (appGlobal.server) {
                    this.requestGameSeverInfo(appGlobal.server)
                }
            } else {
                this.isupdataCallback(false);
            }
        }
    },
    checkFatestTempHost(data) {
        if (data.temp_host[appGlobal.huanjin]) {
            gHandler.logMgr.time("最快的temp_host地址")
            if (appGlobal.tempServerIndex) {
                data.temp_host[appGlobal.huanjin] = gHandler.commonTools.swapItem(data.temp_host[appGlobal.huanjin], appGlobal.tempServerIndex, 0);
            }
            let callback = (response, url, checknum) => {
                gHandler.logMgr.timeEnd("最快的temp_host地址", url, response)
                gHandler.gameGlobal.proxy.temp_host = url;
                gHandler.appDownUrl = url + "?p=" + gHandler.appGlobal.packageID + "&u=" + gHandler.gameGlobal.player.account_name + "&m=" + gHandler.appGlobal.huanjin;
                appGlobal.tempServerIndex = checknum;
                gHandler.localStorage.globalSet(appGlobal.tempServerIndexKey, checknum);
            }
            let failcallback = (status, forcejump, url, err) => {
                gHandler.logMgr.log("tempHost请求失败", status, forcejump, err)
            }
            gHandler.http.requestFastestUrlLine({
                urllist: data.temp_host[appGlobal.huanjin],
                endurl: "/checked",
                callback: callback,
                failcallback: failcallback,
                needJsonParse: false,
            })
        }
    },
    isupdataCallback(bool) {
        if (bool) {
            gHandler.logMgr.log("大厅需要更新")
        } else {
            gHandler.logMgr.log("大厅不需要更新")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "大厅不需要更新")
            if (appGlobal.server) {
                this.requestGameSeverInfo(appGlobal.server)
            }
        }
    },
    failCallback() {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "大厅更新检测失败")
    },
    progressCallback(progress) {
    },
    finishCallback() {
    },

    /** 大厅检查 */
    hallUpdataCheck(hall_version) {
        if (gHandler.appGlobal.hotServer == "") {
            gHandler.logMgr.sendMLog('大厅更新检测 热更服务器地址为空')
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "热更地址为空，更新失败")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "热更地址为空，更新失败")
            return
        }
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
        this.log("login")
        if (gHandler.gameGlobal.isdev) {
            if (appGlobal.account_name) {
                gHandler.gameGlobal.player.account_name = appGlobal.account_name
                gHandler.gameGlobal.player.account_pass = appGlobal.account_pass
                this.officialLogin()
            } else {
                this.loginWithUUID();
            }
        } else {
            this.login2()
        }
    },
    // 登陆前检测，选择登陆方式
    login2() {
        this.log('login2')
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中")
        if (gHandler.webUpAgent && gHandler.webAcconunt && gHandler.webDeviceid) { // 网页版
            gHandler.gameGlobal.player.account_name = gHandler.webAcconunt
            gHandler.gameGlobal.player.account_pass = gHandler.webAcconuntPass
            appGlobal.deviceID = gHandler.webDeviceid
            gHandler.gameGlobal.player.code = gHandler.webUpAgent
            this.loginWithUUID();
        } else if (gHandler.gameGlobal.token && gHandler.gameGlobal.token != "") {
            this.loginWithToken();
        } else {
            this.loginWithUUID();
        }
        gHandler.logMgr.sendMLog("最优热更地址:" + appGlobal.hotServer)
    },
    /**
     * @Description: token方式登陆
     */
    loginWithToken() {
        gHandler.logMgr.log("loginWithToken")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中1")
        let callback = (data, url) => {
            this.log("loginWithToken callback", data)
            if (data.code !== 200) {
                this.loginWithUUID();
            } else {
                this.setPlayerInfo(data)
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("loginWithToken failcallback", status, forcejump, err)
            this.loginWithUUID();
        }
        let endurl = appGlobal.getIpGetEndurl(3);
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: appGlobal.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },
    /** 账号密码 */
    officialLogin() {
        gHandler.logMgr.log("officialLogin", gHandler.gameGlobal.player.account_name, gHandler.gameGlobal.player.account_pass)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中4")
        if (gHandler.gameGlobal.player.account_name && gHandler.gameGlobal.player.account_pass) {
            let callback = (data, url) => {
                this.log("officialLogin callback", data, url)
                if (data.code !== 200) {
                    this.loginWithUUID();
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let failcallback = (status, forcejump, url, err) => {
                gHandler.logMgr.log("officialLogin failcallback", status, forcejump, err)
                this.loginWithUUID();
            }
            let endurl = appGlobal.getIpGetEndurl(0);
            gHandler.http.sendXMLHttpRequest({
                method: "GET",
                urlto: appGlobal.server,
                endurl: endurl,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            });
        } else {
            this.loginWithUUID();
        }
    },
    /** uuid（设备id）登陆 */
    loginWithUUID() {
        gHandler.logMgr.log("loginWithUUID")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中2")
        let callback = (data, url) => {
            this.log(" loginWithUUID callback", data, url)
            if (data.code !== 200) {
                this.errinfo += "loginWithUUID 失败:" + data.code + ",msg:" + data.msg + ";"
                this.firstLogin();
            } else {
                this.setPlayerInfo(data)
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log(" loginWithUUID failcallback", status, forcejump, err, appGlobal.deviceID)
        }
        let endurl = appGlobal.getIpGetEndurl(1);
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: appGlobal.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
        });

    },
    /** 玩家首次登陆 */
    firstLogin() {
        gHandler.logMgr.log("firstLogin")
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登录中3")
        if (gHandler.gameGlobal.player.code) {
            let callback = (data, url) => {
                this.log(" firstLogin callback", data, url)
                if (data.code !== 200) {
                    this.errinfo += "firstLogin 失败:" + data.code + ",msg:" + data.msg + ";"
                    gHandler.logMgr.log("firstLogin 失败：" + data.code + data.msg)
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登陆失败:" + data.code + data.msg)
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "登陆失败:" + data.code + data.msg)
                    this.autoLogin()
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let failcallback = (status, forcejump, url, err) => {
                gHandler.logMgr.log('firstLogin请求失败，重新请求密码本', status, forcejump, err)
            }
            let endurl = appGlobal.getIpGetEndurl(2);
            gHandler.http.sendXMLHttpRequest({
                method: "GET",
                urlto: appGlobal.server,
                endurl: endurl,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            });
        } else {
            if (!navigator) {
                gHandler.logMgr.log("没有 navigator", navigator)
                if (!navigator.userAgent) {
                    gHandler.logMgr.log("没有 navigator.userAgent", navigator.userAgent)
                }
            }
            this.autoLogin()
            // this.getOnlineCode(20)
        }
    },
    getOnlineCode(trynum) {
        let failcallback = (status, forcejump) => {
            gHandler.logMgr.log('getOnlineCode failcallback status:' + status + ",forcejump:" + forcejump)
            gHandler.logMgr.log('getOnlineCode failcallback endurl:' + endurl)
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getOnlineCode(trynum)
                }, 500);
            } else if (trynum == 0 || forcejump) {
                this.autoLogin()
            }
        }
        if (appGlobal.clipboard == "" || !appGlobal.clipboard) {
            appGlobal.clipboard = 'empty'
        }
        if (appGlobal.deviceID == "" || !appGlobal.deviceID) {
            appGlobal.deviceID = 'empty'
        }
        let endurl = "/Game/Code/getOnlineCode?"
        endurl += "package_name=" + appGlobal.packgeName;
        endurl += "&os=" + appGlobal.os;
        endurl += "&uuid=" + appGlobal.deviceID;
        endurl += "&keys=" + appGlobal.clipboard;
        endurl += "&userAgent=" + navigator.userAgent;
        gHandler.logMgr.log('getOnlineCode endurl', endurl)
        let callback = (response, urlto) => {
            if (response.code == 200) {
                gHandler.gameGlobal.player.code = response.msg.proxy_user_id
                gHandler.gameGlobal.player.id = response.msg.account_name
                this.firstLogin()
            } else {
                trynum--
                if (trynum > 0) {
                    setTimeout(() => {
                        this.getOnlineCode(trynum)
                    }, 500);
                } else if (trynum == 0) {
                    gHandler.logMgr.log('getOnlineCode没有获取到玩家code,弹自动登录框,' + gHandler.gameGlobal.player.code)
                    this.autoLogin()
                }
                gHandler.logMgr.log("getOnlineCode没有获取到玩家code,clipboard:" + appGlobal.clipboard + ",response.msg:" + response.code + ",response.msg:" + response.msg)
                gHandler.logMgr.log("getOnlineCode没有获取到玩家code,endurl:" + endurl)
            }
        }
        gHandler.logMgr.log('getOnlineCode server', appGlobal.server)
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: appGlobal.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },
    /** 设置玩家信息 */
    setPlayerInfo(data, ischange) {
        let msg = data.msg;
        appGlobal.gameuser = data.msg.game_user;
        gHandler.gameGlobal.player.account_pass = "";
        gHandler.gameGlobal.player.alipay = "";
        gHandler.gameGlobal.player.yinhangka = "";
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
        gHandler.logMgr.log("游戏id：", gHandler.gameGlobal.player.id + ",已有子游戏账号 ", txt)
        gHandler.localStorage.globalSet(gHandler.gameGlobal.playerKey, gHandler.gameGlobal.player);
        if (!ischange) {
            this.m_destroy()
            if (gHandler.gameGlobal.player.phonenum != "") {
                if (gHandler.gameConfig.subModel.payActivity.lanchscene != "") {
                    gHandler.hqqisShowNotice = true;
                    if (gHandler.gameGlobal.pay.pay_host == "") {
                        gHandler.logMgr.time("最快的pay地址")
                        if (appGlobal.payServerIndex) {
                            gHandler.appGlobal.remoteSeverinfo.pay_host = gHandler.commonTools.swapItem(gHandler.appGlobal.remoteSeverinfo.pay_host, appGlobal.payServerIndex, 0);
                        }
                        let callback = (response, url, checknum) => {
                            gHandler.logMgr.timeEnd("最快的pay地址", url)
                            gHandler.gameGlobal.pay.pay_host = url;
                            appGlobal.payServerIndex = checknum;
                            gHandler.localStorage.globalSet(appGlobal.payServerIndexKey, checknum);
                            cc.director.loadScene(gHandler.gameConfig.subModel.payActivity.lanchscene)
                        }
                        let failcallback = (status, forcejump, url, err) => {
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "pay_host请求失败:" + status + ",err:" + err)
                            gHandler.logMgr.log("pay_host请求失败", status, forcejump, err)
                        }
                        let tipcallback = (checknum) => {
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "P服务器线路" + checknum + "连接中")
                        }
                        gHandler.http.requestFastestUrlLine({
                            urllist: gHandler.appGlobal.remoteSeverinfo.pay_host,
                            endurl: "/checked",
                            callback: callback,
                            failcallback: failcallback,
                            needJsonParse: false,
                            tipcallback: tipcallback,
                        });
                    } else {
                        cc.director.loadScene(gHandler.gameConfig.subModel.payActivity.lanchscene)
                    }
                } else {
                    console.log("请配置精彩活动场景")
                    gHandler.hqqisShowNotice = true;
                    gHandler.hqqisShowFree = true;
                    this.jumpToNextScene();
                }
            } else {
                gHandler.hqqisShowFree = true;
                gHandler.hqqisShowNotice = true;
                this.jumpToNextScene();
            }
        }
    },
    jumpToNextScene() {
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.hotProgress, completedCount / totalCount, "jiazai")
        }
        if (gHandler.webGameID) {
            let mcallback = (subdata) => {
                if (subdata == "hbsl" || subdata == 'zrsx1' || subdata == 'zrsx2' || subdata == 'pccp') { //  真人视讯 红包扫雷 派彩 竖屏
                    gHandler.Reflect && gHandler.Reflect.setOrientation("portrait")
                    if (subdata == 'zrsx1') {
                        gHandler.gameGlobal.subGameType = 22
                    } else if (subdata == 'zrsx2') {
                        gHandler.gameGlobal.subGameType = 24
                    }
                }
                cc.director.loadScene(gHandler.gameConfig.gamelist[subdata].lanchscene, () => {
                    cc.loader.onProgress = null
                });
            }
            for (let k in gHandler.gameConfig.gamelist) {
                if (gHandler.gameConfig.gamelist[k].game_id == gHandler.webGameID) {
                    let subname = k
                    if (k == "zrsx1" || k == "zrsx2") {
                        subname = "zrsx"
                    }
                    if (gHandler.appGlobal.isRelease) {
                        cc.loader.downloader.loadSubpackage(subname, (err) => {
                            if (err) {
                                return console.error(err);
                            } else {
                                if (!gHandler.gameConfig.gamelist[k].hasAccount) {
                                    gHandler.loginMgr.createSubAccount(k, mcallback);
                                } else {
                                    mcallback(subname);
                                }
                            }
                        });
                    } else {
                        if (!gHandler.gameConfig.gamelist[k].hasAccount) {
                            gHandler.loginMgr.createSubAccount(k, mcallback);
                        } else {
                            mcallback(subname);
                        }
                    }
                    break;
                }
            }
        } else {
            cc.director.loadScene("hall", () => {
                cc.loader.onProgress = null
            });
        }
    },
    /** 创建子游戏账号 */
    createSubAccount(enname, mcallback, custom) {
        if (gHandler.gameConfig.gamelist[enname].hasAccount) {
            if (custom) {
                mcallback && mcallback(custom);
            } else {
                mcallback && mcallback(enname);
            }
            return
        }
        let subdata = gHandler.appGlobal.remoteGamelist[0]
        for (let i = 0; i < gHandler.appGlobal.remoteGamelist.length; i++) {
            if (gHandler.gameConfig.gamelist[enname].game_id == gHandler.appGlobal.remoteGamelist[i].game_id) {
                subdata = gHandler.appGlobal.remoteGamelist[i]
                break;
            }
        }
        let callback = (data) => {
            console.log("创建子游戏账号 callback", data)
            if (data.code == 200 || data.code == 203) {
                for (let gname in gHandler.gameConfig.gamelist) {
                    if (gHandler.gameConfig.gamelist[gname].game_id == subdata.game_id) {
                        gHandler.gameConfig.gamelist[gname].hasAccount = true;
                        gHandler.localStorage.set(gname, "hasAccount", true);
                    }
                }
                if (custom) {
                    mcallback && mcallback(custom);
                } else {
                    mcallback && mcallback(enname);
                }
            } else {
                console.log("创建子游戏账号失败")
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "创建子游戏账号失败:" + status + ",err:" + err)
            gHandler.logMgr.log("创建子游戏账号 超时", status, forcejump, err)
        }
        let endurl = "/Game/User/createGameAccount";
        let data = {
            game_id: subdata.game_id,
            package_id: subdata.package_id,
            balance: 0,
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
        }
        gHandler.http.sendXMLHttpRequest({
            method: "POST",
            urlto: gHandler.appGlobal.server + endurl,
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
        });
    },
    /**
     * @Description: 切换账号
     */
    accountChange(account, pass, mcallback) {
        gHandler.logMgr.log("accountChange")
        let callback = (data, url) => {
            this.log(" accountChange callback", data, url)
            if (data.code !== 200) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登陆失败:" + data.msg)
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
                    this.setPlayerInfo(data, true)
                    gHandler.hallWebSocket.connect(url);
                } else {
                    this.setPlayerInfo(data, false)
                }
                mcallback && mcallback(true, data.msg.token)
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "网络太差，登陆超时:" + status + ";err:" + err)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络太差，登陆超时:" + status + ";err:" + err)
        }
        let endurl = appGlobal.officialLogin + "?"
        endurl += "uuid=" + appGlobal.deviceID;
        endurl += "&package_name=" + appGlobal.packgeName;
        endurl += "&os=" + appGlobal.os;
        if (gHandler.gameGlobal.player.code == "0") {
            gHandler.gameGlobal.player.code = gHandler.appGlobal.getGeneralAgency();
        }
        endurl += "&code=" + gHandler.gameGlobal.player.code;
        endurl += "&unique_id=" + appGlobal.unique_id;
        endurl += "&account_name=" + account;
        endurl += "&account_pass=" + pass;
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: appGlobal.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },
    /**
     * @Description: 自动登录(总代登陆，不要修改代理code了)
     */
    autoLogin() {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "自动登录中")
        if (cc.sys.os === cc.sys.OS_IOS && (!gHandler.appGlobal.deviceID || gHandler.appGlobal.deviceID == "empty")) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "请打开手机的'设置'里的'隐私'-'广告'，将'限制广告跟踪'设置为关闭，然后重新进入\ndid:" + gHandler.appGlobal.deviceID)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 10, msg: "请打开手机的'设置'里的'隐私'-'广告'，将'限制广告跟踪'设置为关闭，然后重新进入。" })
            return
        }
        let callback = (data, url) => {
            gHandler.logMgr.log("autologin callback", url, data.msg)
            if (data.code !== 200) {
                this.errinfo += "自动登录失败:" + data.msg + ",p:" + gHandler.appGlobal.packgeName + ",c:" + gHandler.gameGlobal.player.code
                    + ",a:" + gHandler.appGlobal.getGeneralAgency() + ";d:" + gHandler.appGlobal.deviceID + ";"
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, this.errinfo)
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "自动登录失败")
            } else {
                this.setPlayerInfo(data)
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "登陆超时，正在重新登陆:" + status + ";err:" + err)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "登陆超时，正在重新登陆:" + status + ";err:" + err)
        }
        let endurl = ""
        endurl += "/Game/login/firstLogin?"
        endurl += "&uuid=" + gHandler.appGlobal.deviceID;
        endurl += "&package_name=" + gHandler.appGlobal.packgeName;
        endurl += "&os=" + gHandler.appGlobal.os;
        endurl += "&code=" + gHandler.appGlobal.getGeneralAgency();
        endurl += "&unique_id=" + gHandler.appGlobal.unique_id;
        endurl += "&account_name=" + gHandler.gameGlobal.player.account_name;
        endurl += "&account_pass=" + gHandler.gameGlobal.player.account_pass;
        endurl += "&token=" + gHandler.gameGlobal.token;
        gHandler.logMgr.log("autologin", endurl)
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: appGlobal.server,
            endurl: endurl,
            callback: callback.bind(this),
            failcallback: failcallback.bind(this),
            needJsonParse: true,
        });
    },
    m_destroy() {
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotCheckup, "appLogin")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFail, "appLogin")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotProgress, "appLogin")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFinish, "appLogin")
        gHandler.logMgr.sendLog()
    },
    log() {
        this.isRealTimeLog && console.log("__appLogin__", ...arguments)
    },
}

module.exports = appLogin
