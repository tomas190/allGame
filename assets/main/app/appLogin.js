
let gHandler = require("gHandler");
let appGlobal = require("appGlobal");
let hotUpdateMgr = require("hotUpdateMgr");
const { set } = require("../common/hqqLocalStorage");

let appLogin = {
    init: function (data) {
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "开始登陆")
        this.errinfo = ""
        if (CC_JSB) {
            this.isRealTimeLog = true;
        } else {
            if (cc.sys.isBrowser) {
                this.isRealTimeLog = false;
            } else {
                this.isRealTimeLog = true;
            }
        }

        this.localInit();
        gHandler.hotUpdateMgr = hotUpdateMgr;
        gHandler.hotUpdateMgr.init(data);
        this.upgradeList = ["pay", "proxy", "IM", "hall"]
        this.upgradeIndex = 0
        this.isfirst = true

        let templog = "language:" + cc.sys.language
            + ",platform:" + cc.sys.platform
            + ",os:" + cc.sys.os
            + ",osVersion:" + cc.sys.osVersion
            + ",osMainVersion:" + cc.sys.osMainVersion
            + ",Cocos Creator v" + cc.ENGINE_VERSION;
        if (CC_JSB) {
            if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID
                || cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD || cc.sys.os === cc.sys.OS_IOS) {
                appGlobal.deviceID = gHandler.Reflect.getDeviceId()
                appGlobal.clipboard = gHandler.Reflect.getClipboard()
                let nettype = jsb.Device.getNetworkType()            // 0 网络不通  1 通过无线或者有线本地网络连接因特网  2 通过蜂窝移动网络连接因特网
                gHandler.logMgr.log(templog + ",Clipboard:" + appGlobal.clipboard
                    + ",NetworkType:" + (nettype != 0 ? nettype == 1 ? "通过无线或者有线本地网络连网" : "通过蜂窝移动网络连网" : "网络不通")
                    + ",getBatteryLevel:" + jsb.Device.getBatteryLevel()
                    + ",DeviceModel:" + jsb.Device.getDeviceModel()
                    + ",isMobile:" + cc.sys.isMobile
                    + ',getAppPackageName:' + gHandler.Reflect.getAppPackageName())
            }
        } else {
            gHandler.logMgr.log(templog + ",browserType:" + cc.sys.browserType + ",browserVersion:" + cc.sys.browserVersion);
        }
        this.getLocalIp(5)
        this.secretMaxTry = 200
        this.secretTry = 0
        this.testTime = 0
        this.testTimeList = []
        this.errList = []
        if (appGlobal.server && appGlobal.canHotServer) { // 本地已经有记录了 老玩家
            this.requestUpgradeInfo()
        } else {
            // 新玩家首次登陆 或者 本地数据已清空
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
        appGlobal.hallVersion = global.hallVersionKey || appGlobal.hallVersion;
        appGlobal.payVersion = global.payVersionKey || appGlobal.payVersion;
        appGlobal.proxyVersion = global.proxyVersionKey || appGlobal.proxyVersion;
        appGlobal.IMVersion = global.IMVersionKey || appGlobal.IMVersion;
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
    },
    /**
     * @Description: 从密码本开始重试登陆
     */
    reStartAtSecret() {
        gHandler.appGlobal.canHotServer = ""
        gHandler.localStorage.globalSet(appGlobal.hotServerKey, "");
        gHandler.appGlobal.codeBook = ""
        gHandler.localStorage.globalSet(appGlobal.codeBookKey, "");
        gHandler.appGlobal.server = ""
        this.upgradeIndex = 0
        this.isfirst = false
        gHandler.http.stopRequestStableUrlLine();
    },
    requestUpgradeInfo() {
        let callback = (response, url) => {
            gHandler.appGlobal.versionJson = response
            gHandler.appGlobal.subGameVersion = response.version
            gHandler.appGlobal.packageID = response[appGlobal.pinpai].packageID
            gHandler.appGlobal.proxyUserID = response[appGlobal.pinpai][appGlobal.huanjin].proxyUserID
            gHandler.appGlobal.setGeneralAgency(response)
            this.checkApkUpdata(response)
            let pn = cc.find('Canvas/Main Camera/layer/netnodepos')
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })
            if (cc.sys.isNative) {
                this.getBrandRes()
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("requestUpgradeInfo 请求热更服务器信息失败", status, forcejump, url, err)
            this.reStartAtSecret()
        }
        gHandler.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: gHandler.appGlobal.canHotServer + "/" + gHandler.appGlobal.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 10000),
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
        if (!gHandler.gameGlobal.isdev) {
            this.refreshServerList()
        }
    },
    showChoiceLimeLayer() {
        let data = {
            exitFunc: this.requestUpgradeInfo.bind(this),
            upgradeList: gHandler.localStorage.globalGet(gHandler.appGlobal.hotServerKey),
            // centerList: gHandler.appGlobal.serverList,
            notshowexitbtn: true,
        }
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLineChoiceLayer, data)
    },
    refreshServerList() {
        let urllist = gHandler.localStorage.globalGet(appGlobal.codeBookKey)
        let hasreceive = false;
        if (appGlobal.selectServerIndex) {
            urllist = gHandler.commonTools.swapItem(urllist, appGlobal.selectServerIndex, 0);
        }
        let callback = (response, url, checknum) => {
            gHandler.appGlobal.selectServerIndex = checknum;
            gHandler.localStorage.globalSet(appGlobal.selectServerIndexKey, checknum);
            let responseurl = this.decodeServer(response);
            let murllist = responseurl.split(",");
            if (!hasreceive) {
                hasreceive = true;
                gHandler.appGlobal.serverList = []
                for (let i = 0; i < murllist.length; i++) {
                    if (murllist[i].match("upgrade")) {
                        gHandler.appGlobal.hotServer = []
                        break
                    }
                }
                for (let i = 0; i < murllist.length; i++) {
                    if (murllist[i].match("center")) {
                        gHandler.appGlobal.serverList.push(murllist[i]);
                    } else if (murllist[i].match("upgrade")) {
                        gHandler.appGlobal.hotServer.push(murllist[i]);
                    }
                }
                gHandler.localStorage.globalSet(appGlobal.hotServerKey, gHandler.appGlobal.hotServer)
                gHandler.localStorage.globalSet(appGlobal.serverListKey, gHandler.appGlobal.serverList);
                this.requestStableServerUrl();
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("所有请求最快的接待服务器失败，重新请求密码本", status, forcejump, err)
            this.reStartAtSecret();
        }
        let tipcallback = (checknum) => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "S服务器线路" + checknum + "连接中")
        }
        gHandler.http.requestFastestUrlLine({
            urllist: urllist,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: false,
            timeout: 5000,
            failtimeout: 7000,
            tipcallback: tipcallback,
        })
    },
    /** 节点服务器解码 */
    decodeServer(response) {

    },
    /** 请求最快的节点服务器 */
    requestFastestServer() {
        let urllist = gHandler.appGlobal.serverList
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "云端资源点检测")
        gHandler.logMgr.time("requestFastestServer")
        cc.director.preloadScene("hall");
        if (appGlobal.serverIndex) {
            urllist = gHandler.commonTools.swapItem(urllist, appGlobal.serverIndex, 0);
        }
        let callback = (response, url, checknum) => {
            gHandler.logMgr.timeEnd("requestFastestServer", url)
            appGlobal.server = url;
            gHandler.localStorage.globalSet(appGlobal.serverKey, url);
            appGlobal.serverIndex = checknum;
            gHandler.localStorage.globalSet(appGlobal.serverIndexKey, checknum);
            this.log(" getserverinfo callback", response)
            if (response.code === 200) {
                appGlobal.remoteSeverinfo = response.msg;
                this.requestGameListInfo(appGlobal.server);
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("所有节点请求失败，重新获取密码本", status, forcejump, err)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "网络太差，重新登陆")
            this.reStartAtSecret();
        }
        let tipcallback = (checknum) => {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "C服务器线路" + checknum + "连接中")
        }
        let endurl = appGlobal.remotePath + appGlobal.remoteGetSeverInfo + "?platform_key=" + appGlobal.remoteToken + "&package_name=" + appGlobal.packgeName + "&os=" + appGlobal.os;
        gHandler.http.requestFastestUrlLine({
            urllist: urllist,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
            tipcallback: tipcallback,
        })
    },
    /** 请求游戏服务器信息 */
    requestGameSeverInfo() {
        if (!gHandler.appGlobal.server) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "线路检测中")
            return setTimeout(() => {
                this.requestGameSeverInfo();
            }, 100);
        }
        let url = gHandler.appGlobal.server
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
            this.reStartAtSecret();
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
                gHandler.appGlobal.checkSubServer();
                this.login();
            }
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("获取游戏列表失败，重新刷选select线路", status, forcejump, err)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "网络太差，重新刷选select线路" + status + ",err:" + err)
            this.reStartAtSecret();
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
        this.checkFatestTempHost()
        if (needUp && !cc.sys.isBrowser && cc.sys.os != "OS X" && cc.sys.os != "Windows") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "安装包更新")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 8 })
        } else {
            if (cc.sys.isBrowser) { // || cc.sys.os == "Windows"
                if (gHandler.appGlobal.isRelease) {
                    for (let i = 0; i < this.upgradeList.length; i++) {
                        let subname = this.upgradeList[i]
                        cc.loader.downloader.loadSubpackage(subname, (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            console.log('load subpackage script successfully.', subname, cc.loader.downloader._subpackages[subname].loaded);
                            if (i == (this.upgradeList.length - 1)) {
                                this.requestGameSeverInfo()
                            }
                        });
                    }
                } else {
                    this.requestGameSeverInfo()
                }
            } else if (appGlobal.version != data.version.main) {
                this.mainUpdataCheck(data.version.main);
            } else {
                this.isupdataCallback(false, "main");
            }
        }
    },
    /** 主包检查 */
    mainUpdataCheck(main_version) {
        if (gHandler.appGlobal.canHotServer == "") {
            gHandler.logMgr.sendMLog('主包更新检测 热更服务器地址为空')
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "热更地址为空，更新失败")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "热更地址为空，更新失败")
            return
        }
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "m更新检测")
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheckup, "appLogin", this.isupdataCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFail, "appLogin", this.failCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotProgress, "appLogin", this.progressCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFinish, "appLogin", this.finishCallback.bind(this))
        main_version = main_version == '1.0.0' ? '' : main_version
        gHandler.hotUpdateMgr.checkUpdate({
            subname: "main",
            version: appGlobal.version,
            remotev: main_version,
        })
    },
    checkFatestTempHost() {
        let data = gHandler.appGlobal.versionJson
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
        } else {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "版本文件丢失，无法获取temp地址")
        }
    },
    isupdataCallback(bool, subname) {
        if (bool) {
            gHandler.logMgr.log(subname + "需要更新")
        } else {
            gHandler.logMgr.log(subname + "不需要更新")
            if (subname == "main") {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "m不需要更新")
                this.subModuleUpdataCheck()
            } else if (subname == "hall") {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, subname + "不需要更新")
                !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subname, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('load subpackage script successfully.', subname, cc.loader.downloader._subpackages[subname].loaded);
                    this.requestGameSeverInfo()
                });
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, subname + "不需要更新")
                !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subname, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('load subpackage script successfully.', subname, cc.loader.downloader._subpackages[subname].loaded);
                });
                this.subModuleUpdataCheck()
            }
        }
    },
    failCallback(subname) {
        if (subname == "main") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "m更新检测失败")
        } else {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, subname + "更新检测失败")
        }
        gHandler.logMgr.sendLog();
        this.reStartAtSecret();
    },
    progressCallback(progress) {
    },
    finishCallback(subname) {
        if (subname == "main") {

        } else if (subname == "hall") {
            !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subname, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage script successfully.', subname, cc.loader.downloader._subpackages[subname].loaded);
                this.requestGameSeverInfo()
            });
        } else {
            !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subname, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage script successfully.', subname, cc.loader.downloader._subpackages[subname].loaded);
            });
            this.subModuleUpdataCheck()
        }
    },
    /** 子模块检查 */
    subModuleUpdataCheck() {
        let subname = this.upgradeList[this.upgradeIndex]
        this.upgradeIndex++
        let remotev = gHandler.appGlobal.subGameVersion.hall
        let localv = gHandler.appGlobal.hallVersion
        if (subname == 'pay') {
            remotev = gHandler.appGlobal.subGameVersion.pay
            localv = gHandler.appGlobal.payVersion
        } else if (subname == 'IM') {
            remotev = gHandler.appGlobal.subGameVersion.IM
            localv = gHandler.appGlobal.IMVersion
        } else if (subname == 'proxy') {
            remotev = gHandler.appGlobal.subGameVersion.proxy
            localv = gHandler.appGlobal.proxyVersion
        }
        if (gHandler.appGlobal.canHotServer == "") {
            gHandler.logMgr.sendMLog('子模块更新检测 热更服务器地址为空')
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "热更地址为空，更新失败")
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "热更地址为空，更新失败")
            return
        }
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, subname + "更新检测")
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheckup, "appLogin", this.isupdataCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFail, "appLogin", this.failCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotProgress, "appLogin", this.progressCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFinish, "appLogin", this.finishCallback.bind(this))
        remotev = remotev == '1.0.0' ? '' : remotev
        gHandler.hotUpdateMgr.checkUpdate({
            subname: subname,
            version: localv,
            remotev: remotev,
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
        this.log('login2', appGlobal.server)
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
        gHandler.logMgr.sendMLog("最优热更地址:" + appGlobal.canHotServer)
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
            this.reStartAtSecret();
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
                this.reStartAtSecret();
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
            this.getOnlineCode(20)
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
        for (let index in msg.game_accounts) {
            for (let key in gHandler.gameConfig.gamelist) {
                if (gHandler.gameConfig.gamelist[key].game_id == msg.game_accounts[index].game_id) {
                    gHandler.gameConfig.gamelist[key].hasAccount = true
                }
            }
            for (let key in gHandler.gameConfig.oldGameList) {
                if (gHandler.gameConfig.oldGameList[key].game_id == msg.game_accounts[index].game_id) {
                    gHandler.gameConfig.oldGameList[key].hasAccount = true
                    break;
                }
            }
        }
        gHandler.localStorage.globalSet(gHandler.gameGlobal.playerKey, gHandler.gameGlobal.player);
        if (!ischange) {
            this.m_destroy()
            if (gHandler.gameGlobal.player.phonenum != "" && gHandler.gameConfig.subModel.payActivity.lanchscene != "") {
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
                gHandler.hqqisShowFree = true;
                gHandler.hqqisShowNotice = true;
                this.jumpToNextScene();
            }
        }
    },
    jumpToNextScene() {
        if (gHandler.appGlobal.isRelease || (cc.loader.downloader._subpackages['hall'] && !cc.loader.downloader._subpackages['hall'].loaded)) {
            cc.loader.downloader.loadSubpackage('hall', (err) => {
                if (err) {
                    this.jumpToNextScene()
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "抱歉，资源加载失败，请重新进入")
                    return gHandler.logMgr.log("加载大厅子模块失败：" + err);
                }
                setTimeout(() => {
                    this.jumpToNextScene()
                }, 100);
            });
            return
        }
        let hallWebSocket = null
        try {
            hallWebSocket = require("hallWebSocket");
        } catch (error) {
            gHandler.logMgr.log("加载大厅代码失败：" + error)
            cc.loader.downloader.loadSubpackage('hall', (err) => {
                if (err) {
                    this.jumpToNextScene()
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "抱歉，资源加载失败，请重新进入")
                    return console.error(err);
                }
                setTimeout(() => {
                    this.jumpToNextScene()
                }, 100);
            });
            return
        }

        cc.loader.onProgress = function (completedCount, totalCount, item) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.hotProgress, completedCount / totalCount, "jiazai")
        }
        if (gHandler.webGameID) {
            let mcallback = (subdata) => {
                if (subdata == "hbsl" || subdata == 'zrsx1' || subdata == 'zrsx2' || subdata == 'pccp') { //  真人视讯 红包扫雷 派彩 竖屏
                    gHandler.Reflect && gHandler.Reflect.setOrientation("portrait")
                    if (subdata == 'zrsx1') {
                        gHandler.gameGlobal.subGameType = 40
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
            gHandler.logMgr.log("登陆超时，正在重新登陆:", status, forcejump, url, err)
            this.reStartAtSecret();
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

        this.testCurLine()
    },
    log() {
        this.isRealTimeLog && console.log("__appLogin__", ...arguments)
    },
    stableRestartAtSecret() {
        setTimeout(() => {
            let callback = (response) => {
                let data = this.decodeSecret(response);
                let book = data[appGlobal.huanjin];
                gHandler.localStorage.globalSet(appGlobal.hotServerKey, book.upgrade)
                appGlobal.codeBook = book.select;
                gHandler.localStorage.globalSet(appGlobal.codeBookKey, book.select);
                this.stableRequestSelect();
            }
            let failcallback = (status, forcejump, url, err) => {
                gHandler.logMgr.log('stable请求密码本失败，重新请求密码本', status, forcejump, err)
                this.stableRestartAtSecret()
            }
            gHandler.http.requestFastestUrlLine({
                urllist: appGlobal.secretlist,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: false,
            })
        }, 500)
    },
    stableRequestSelect() {
        let urllist = gHandler.localStorage.globalGet(appGlobal.codeBookKey)
        if (appGlobal.selectServerIndex) {
            urllist = gHandler.commonTools.swapItem(urllist, appGlobal.selectServerIndex, 0);
        }
        let callback = (response, url, checknum) => {
            appGlobal.selectServerIndex = checknum;
            gHandler.localStorage.globalSet(appGlobal.selectServerIndexKey, checknum);
            let murl = this.decodeServer(response);
            let urllist = murl.split(",");
            appGlobal.serverList = urllist;
            gHandler.localStorage.globalSet(appGlobal.serverListKey, urllist);
            this.requestStableServerUrl();
        }
        let failcallback = (status, forcejump, url, err) => {
            gHandler.logMgr.log("请求最快的接待服务器失败，重新请求密码本", status, forcejump, err)
            this.stableRestartAtSecret();
        }
        gHandler.http.requestFastestUrlLine({
            urllist: urllist,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: false,
        })
    },
    /**
     * @Description: 恒定线路检测
     */
    requestStableServerUrl() {
        let urllist = gHandler.appGlobal.serverList
        let storageList = gHandler.localStorage.globalGet(appGlobal.stableServerListKey)
        storageList = this.dealDiffLine(storageList, urllist)

        let murllist = gHandler.localStorage.globalGet(gHandler.appGlobal.hotServerKey)
        let hotserverList = gHandler.localStorage.globalGet(appGlobal.stableHotServerListKey)
        hotserverList = this.dealDiffLine(hotserverList, murllist)

        let templist
        let callback = (returnList, checknum, isServer) => {
            let ipresult = "沒有获取到ip信息"
            if (gHandler.gameGlobal.ipapiData.country) {
                ipresult = "country:" + gHandler.gameGlobal.ipapiData.country
                    + ",city:" + gHandler.gameGlobal.ipapiData.city
                    + ",query:" + gHandler.gameGlobal.ipapiData.query
                    + ",lat:" + gHandler.gameGlobal.ipapiData.lat
                    + ",lon:" + gHandler.gameGlobal.ipapiData.lon
                    + ",isp:" + gHandler.gameGlobal.ipapiData.isp
                    + ",as:" + gHandler.gameGlobal.ipapiData.as
            }
            if (isServer) {
                gHandler.localStorage.globalSet(appGlobal.stableServerListKey, returnList);
                if (returnList.stable && returnList.stable.url && appGlobal.server != returnList.stable.url) {
                    appGlobal.server = returnList.stable.url
                    gHandler.localStorage.globalSet(appGlobal.serverKey, appGlobal.server);
                    appGlobal.serverIndex = returnList.stable.index || checknum;
                    gHandler.localStorage.globalSet(appGlobal.serverIndexKey, appGlobal.serverIndex);
                    gHandler.appGlobal.checkSubServer();
                }
                for (let k = 0; k < returnList.serverList.length; k++) {
                    if (returnList.serverList[k].status == 0) {
                        return // 有线路没有测完
                    }
                }
                templist = JSON.stringify(returnList)
            } else {
                gHandler.localStorage.globalSet(appGlobal.stableHotServerListKey, returnList);
                gHandler.appGlobal.canHotServer = returnList.stable.url;
                gHandler.localStorage.globalSet(appGlobal.canHotServerKey, gHandler.appGlobal.canHotServer);
                for (let k = 0; k < returnList.serverList.length; k++) {
                    if (returnList.serverList[k].status == 0) {
                        return // 有线路没有测完
                    }
                }
                appGlobal.hotServerIndex = returnList.stable.index || checknum;
                gHandler.localStorage.globalSet(appGlobal.hotServerIndexKey, appGlobal.hotServerIndex);
                gHandler.logMgr.sendMLog("一次测试后的结果:" + ipresult + ",恒定线路检测:" + templist + ",恒定热更线路检测：" + JSON.stringify(returnList))
            }
        }
        gHandler.http.requestStableUrlLine({
            storageList: storageList,
            hotserverList: hotserverList,
            isServer: true,
            callback: callback,
        })
    },
    dealDiffLine(storageList, urllist) {
        if (!storageList || !storageList.stable) {
            storageList = {
                stable: {},
                serverList: []
            }
            for (let i = 0; i < urllist.length; i++) {
                storageList.serverList.push({ "index": storageList.serverList.length, "url": urllist[i], "averageTime": 0, testnum: 0, status: 0, })
            }
        }

        let deletList = []
        for (let i = 0; i < storageList.serverList.length; i++) {
            let isdelet = true
            for (let j = 0; j < urllist.length; j++) {
                if (storageList.serverList[i].url == urllist[j]) {
                    isdelet = false
                    break
                }
            }
            if (isdelet) {
                deletList.push(storageList.serverList[i].url)
            }
        }
        for (let i = 0; i < deletList.length; i++) {
            for (let j = 0; j < storageList.serverList.length; j++) {
                if (deletList[i] == storageList.serverList[j].url) {
                    storageList.serverList.splice(j, 1)
                    break
                }
            }
        }
        let addList = []
        for (let i = 0; i < urllist.length; i++) {
            let idadd = true
            for (let j = 0; j < storageList.serverList.length; j++) {
                if (storageList.serverList[j].url == urllist[i]) {
                    idadd = false
                    break
                }
            }
            if (idadd) { // 新增的线路
                addList.push(urllist[i])
            }
        }
        for (let i = 0; i < addList.length; i++) {
            storageList.serverList.push({ "index": storageList.serverList.length, "url": addList[i], "averageTime": 0, testnum: 0, status: 0, })
        }
        if (addList.length > 0) { // 有新增，全部重置
            for (let i = 0; i < storageList.serverList.length; i++) {
                storageList.serverList[i] = ({ "index": i, "url": storageList.serverList[i].url, "averageTime": 0, testnum: 0, status: 0, })
            }
        } else {
            for (let i = 0; i < storageList.serverList.length; i++) {
                storageList.serverList[i].index = i
            }
        }
        return storageList
    },

    testCurLine() {
        let urllist = []
        urllist.push(gHandler.appGlobal.canHotServer + "/" + gHandler.appGlobal.hotupdatePath + "/" + 'version.json')
        urllist.push(gHandler.appGlobal.canHotServer + "/" + gHandler.appGlobal.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 10000))
        urllist.push(gHandler.appGlobal.server + "/checked")
        gHandler.http.testLine(urllist, this.testCurLineCallback.bind(this), 1)
    },
    testCurLineCallback(url, index, spendtime, err) {
        this.testTimeList.push(spendtime)
        if (err) {
            this.errList.push(err)
        }
        this.testTime = this.testTime < spendtime ? spendtime : this.testTime
        if (index == 2) {
            if (this.errList && this.errList.length == 3) {
                this.testTime = gHandler.appGlobal.netState.bad + 1
                gHandler.eventMgr.dispatch(gHandler.eventMgr.refreshNetState, { time: this.testTime, timelist: this.testTimeList, errlist: this.errList })
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.refreshNetState, { time: this.testTime, timelist: this.testTimeList, errlist: this.errList })
            }
            setTimeout(() => {
                this.testTime = 0;
                this.testTimeList = [];
                this.errList = [];
                this.testCurLine();
            }, 5000);
        }
    },

    getBrandRes() {
        let reslist = gHandler.appGlobal.versionJson[gHandler.appGlobal.pinpai].brandRes;
        if (!reslist) {
            console.log("云端未配置品牌资源信息")
            return
        }
        let index = 0;
        let urlto = gHandler.appGlobal.canHotServer + "/" + gHandler.appGlobal.hotupdatePath + "/brandres/" + gHandler.appGlobal.pinpai + "/" + reslist[0]
        let storagepath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'brand\\');
        let localpath = storagepath + reslist[0]
        if (!jsb.fileUtils.isFileExist(localpath)) {
            jsb.fileUtils.createDirectory(storagepath)
            let callback = (response) => {
                if (!jsb.fileUtils.writeDataToFile(new Uint8Array(response), localpath)) {
                    cc.log('Remote write file failed.');
                }
                index++
                if (index < reslist.length) {
                    urlto = gHandler.appGlobal.canHotServer + "/" + gHandler.appGlobal.hotupdatePath + "/brandres/" + gHandler.appGlobal.pinpai + "/" + reslist[index]
                    localpath = storagepath + reslist[index]
                    gHandler.http.getRes(urlto, callback, failcallback)
                } else {
                    this.setBrandRes()
                }
            }
            let failcallback = (status, forcejump, url, err) => {
                gHandler.http.getRes(urlto, callback, failcallback)
            }
            gHandler.http.getRes(urlto, callback, failcallback)
        } else {
            this.setBrandRes()
        }
    },
    setBrandRes() {
        if (cc.director.getScene().name == "loading") {
            let reslist = gHandler.appGlobal.versionJson[gHandler.appGlobal.pinpai].brandRes;
            if (!reslist) {
                console.log("云端未配置品牌资源信息")
                return
            }
            let storagepath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'brand\\');
            reslist[3] && cc.loader.load(storagepath + reslist[3], function (err, tex) {
                if (err) {
                    cc.error(err);
                } else {
                    let mspriteFrame = new cc.SpriteFrame(tex);
                    let bg = cc.find("Canvas/Main Camera/brandnode/bg")
                    let bgsprite = bg.getComponent(cc.Sprite)
                    bgsprite.spriteFrame = mspriteFrame
                }
            });
            cc.loader.load(storagepath + reslist[0], function (err, loadimg) {
                cc.loader.load(storagepath + reslist[1], (err, loadatlas) => {
                    cc.loader.load(storagepath + reslist[2], (err, loadjson) => {
                        let ani = cc.find("Canvas/Main Camera/brandnode/ani")
                        let skeleton = ani.getComponent(sp.Skeleton)
                        var asset = new sp.SkeletonData();
                        asset.skeletonJson = loadjson;
                        asset.atlasText = loadatlas;
                        asset.textures = [loadimg];
                        asset.textureNames = [reslist[0]];
                        skeleton.skeletonData = asset;
                        if (gHandler.appGlobal.pinpai == 'debi') {
                            skeleton.setAnimation(0, "animation", false);
                        } else {
                            skeleton.setAnimation(0, "animation", true);
                        }
                    });
                });
            });
        }
    },
}

module.exports = appLogin
