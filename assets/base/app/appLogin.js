let appLogin = {
    init: function (data) {
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip49"))
        this.errinfo = ""
        if (hqq.isDebug) {
            this.isRealTimeLog = false;
        } else {
            this.isRealTimeLog = true;
        }
        let hotUpdateMgr = require("hotUpdateMgr");
        hqq.hotUpdateMgr = hotUpdateMgr;
        hqq.hotUpdateMgr.init(data);
        this.upgradeIndex = 0
        this.isfirst = true
        let templog = "language:" + cc.sys.language
            + ",platform:" + cc.sys.platform
            + ",os:" + cc.sys.os
            + ",osVersion:" + cc.sys.osVersion
            + ",osMainVersion:" + cc.sys.osMainVersion
            + ",Cocos Creator v" + cc.ENGINE_VERSION;

        this.hallversionList = [ "test","xingba","nineone","xinhao","huangshi","tianqi"];
        this.proxyversionList = [ "test"];
        this.IMversionList = [];
        this.payversionList = [ "test","debi","xingba","nineone","xinhao","huangshi","chaofan"];
        
        this.hallStr = "hall_" + hqq.app.pinpai;
        for(let i = 0; i < hqq.loginMgr.hallversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.hallversionList[i]){
                this.hallStr = "hall_test";
                break;
            }
        }
        
        this.proxyStr = "proxy_" + hqq.app.pinpai;
        for(let i = 0; i < hqq.loginMgr.proxyversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.proxyversionList[i]){
                this.proxyStr = "proxy_test";
                break;
            }
        }
        if(hqq.app.pinpai === "debi"){
            this.proxyStr = "proxy_xingba";
        }

        this.IMStr = "IM_test";
        for(let i = 0; i < hqq.loginMgr.IMversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.IMversionList[i]){
                this.IMStr = "IM_" + hqq.app.pinpai;
                break;
            }
        }

        this.payStr = "pay_" + hqq.app.pinpai;
        for(let i = 0; i < hqq.loginMgr.payversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.payversionList[i]){
                this.payStr = "pay_test";
                break;
            }
        }
        if(hqq.app.pinpai === "debi"){
            this.payStr = "pay_jincheng";
        } else if(hqq.app.pinpai === "xinlong"){
            this.payStr = "pay_juding";
        }

        if (CC_JSB) {
            if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID
                || cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD || cc.sys.os === cc.sys.OS_IOS) {
                hqq.app.deviceID = hqq.reflect.getDeviceId()
                hqq.app.clipboard = hqq.reflect.getClipboard()
                let clipboard = hqq.app.clipboard
                let nettype = jsb.Device.getNetworkType() // 0 网络不通  1 通过无线或者有线本地网络连接因特网  2 通过蜂窝移动网络连接因特网
                if (clipboard && clipboard.match("&&")) {
                    let and = clipboard.indexOf("&&")
                    let andend = and + 2
                    hqq.gameGlobal.player.code = clipboard.substring(0, and)
                    if (hqq.gameGlobal.player.code.length < 6) {
                        hqq.gameGlobal.player.code = 0
                    }
                    hqq.app.clipboard = clipboard.substring(andend)
                    clipboard = clipboard.substring(0, and) + clipboard.substring(andend)
                }
                !hqq.isDebug && hqq.logMgr.log(templog + ",Clipboard:" + clipboard
                    + ",NetworkType:" + (nettype != 0 ? nettype == 1 ? "通过无线或者有线本地网络连网" : "通过蜂窝移动网络连网" : "网络不通")
                    + ",getBatteryLevel:" + jsb.Device.getBatteryLevel()
                    + ",DeviceModel:" + jsb.Device.getDeviceModel()
                    + ",isMobile:" + cc.sys.isMobile
                    + ',getAppPackageName:' + hqq.reflect.getAppPackageName());
            }
        } else {
            !hqq.isDebug && hqq.logMgr.log(templog + ",browserType:" + cc.sys.browserType + ",browserVersion:" + cc.sys.browserVersion);
        }
        this.localInit();
        this.getLocalIp(3)
        this.secretMaxTry = 200
        this.secretTry = 0
        this.testTime = 0
        this.testTimeList = []
        this.errList = []
        this.tryIndex = 0
        this.serverinfoTryIndex = 0
        this.gamelistTryIndex = 0
        this.videoplayering = false;
        this.updatefininshed = false;
        if(hqq.app.pinpai == "ninetwo" || CC_DEBUG ){
            this.videoplayering = true;
        }
        // if (hqq.isDebug) {
        //     cc.director.preloadScene("hall", this.onProgress.bind(this), () => {
        //         cc.director.loadScene("hall");
        //     })
        //     return
        // }
        if (hqq.app.server && hqq.app.canHotServer) { // 本地已经有记录了 老玩家
            this.requestUpgradeInfo()
        } else {
            this.requestSecret(); // 新玩家首次登陆 或者 本地数据已清空
        }
    },
    getLocalIp(trynum) {
        if (CC_DEBUG) {
            return
        }
        let callback = (data) => {
            // hqq.logMgr.log("ipapiData:" + JSON.stringify(data))
            hqq.gameGlobal.ipapiData = data
            hqq.gameGlobal.ipList.push(data.query)
            hqq.eventMgr.dispatch(hqq.eventMgr.refreshLoading, data.query, data.regionName, "ip-api")
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("ipapi获得信息失败：" + status + ",err:" + err + ",trynum:" + trynum + ",forcejump" + forcejump + ",readyState" + readyState);
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getLocalIp(trynum)
                }, 500);
            } else {
                this.getLocalIp2(3)
            }
        }
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: "http://ip-api.com/json/" + "?lang=zh-CN",
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    getLocalIp2(trynum, next) {
        let callback = (data) => {
            // cc.log("ipinfoData", data)
            hqq.gameGlobal.ipinfoData = data
            hqq.gameGlobal.ipList.push(data.ip)
            hqq.eventMgr.dispatch(hqq.eventMgr.refreshLoading, data.ip, data.region, "ipinfo")
            if (next) {
                this.getReginIp2()
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("ipinfo获得信息失败：" + status + ",err:" + err + ",trynum:" + trynum + ",forcejump" + forcejump + ",readyState" + readyState);
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getLocalIp2(trynum)
                }, 500);
            }
        }
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: "https://ipinfo.io/json",
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    /** 本地初始化 */
    localInit() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip50"))
        let global = hqq.localStorage.getGlobal();
        hqq.app.version = global.versionKey || hqq.app.version;
        hqq.app.server = global.serverKey || hqq.app.server;
        hqq.app.canHotServer = global.canHotServerKey || hqq.app.canHotServer;
        hqq.app.hotServer = global.hotServerKey || hqq.app.hotServer;
        hqq.app.codeBook = global.codeBookKey || hqq.app.codeBook;
        hqq.app.selectServerIndex = global.selectServerIndexKey || hqq.app.selectServerIndex;
        hqq.app.hotServerIndex = global.hotServerIndexKey || hqq.app.hotServerIndex;
        hqq.app.serverIndex = global.serverIndexKey || hqq.app.serverIndex;
        hqq.app.tempServerIndex = global.tempServerIndexKey || hqq.app.tempServerIndex;
        hqq.app.payServerIndex = global.payServerIndexKey || hqq.app.payServerIndex;
        hqq.app.serverList = global.serverListKey || hqq.app.serverList;
        hqq.app.reginIpData = global.reginIpDataKey || hqq.app.reginIpData;
        hqq.app.reginIpData2 = global.reginIpData2Key || hqq.app.reginIpData2;
        hqq.gameGlobal.player = global.playerKey || hqq.gameGlobal.player;
        if (!hqq.app.deviceID && hqq.gameGlobal.player.uuid) {
            hqq.app.deviceID = hqq.gameGlobal.player.uuid
        }

        if (cc.sys.isBrowser) {
            hqq.gameGlobal.token = global.tokenKey || hqq.webToken || ''
            hqq.gameGlobal.player.account_name = (global.playerKey && global.playerKey.account_name) || hqq.webAcconunt
            hqq.gameGlobal.player.account_pass = (global.playerKey && global.playerKey.account_pass) || hqq.webAcconuntPass
            hqq.gameGlobal.player.deviceid = hqq.app.deviceID = (global.playerKey && global.playerKey.deviceid) || hqq.webDeviceid || hqq.app.deviceID
            hqq.localStorage.globalSet(hqq.gameGlobal.tokenKey, hqq.gameGlobal.token);
            hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
        } else {
            hqq.gameGlobal.token = global.tokenKey || hqq.gameGlobal.token;
        }

        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.audioEngine.pauseMusic();
            cc.audioEngine.pauseAllEffects();
            hqq.logMgr.saveLog();
            hqq.localStorage.savaLocal();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.audioEngine.resumeMusic();
            cc.audioEngine.resumeAllEffects();
            hqq.eventMgr.dispatch(hqq.eventMgr.eventShowToSetHall);
        });
    },
    /** 密码本解密 */
    decodeSecret(response) {
        let data = "";
        for (let i = 0; i < response.length; i++) {
            if (i % 6 !== 0) {
                data += response[i];
            }
        }
        let data2 = hqq.base64.decode(data);
        return JSON.parse(data2);
    },
    /** 请求密码本 */
    requestSecret() {
        if (this.secretMaxTry == this.secretTry) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 8, msg: hqq.getTip("showtip68") })
            return
        }
        this.secretTry++
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip51"))
        // hqq.logMgr.time("requestSecret")
        let callback = (response) => {
            let data = this.decodeSecret(response);
            let book = data[hqq.app.huanjin];
            // hqq.logMgr.timeEnd("requestSecret", "upgrade:", book.upgrade, ";select:", book.select)
            hqq.app.hotServer = (book.upgrade && book.upgrade != "") ? book.upgrade : []
            hqq.localStorage.globalSet(hqq.app.hotServerKey, hqq.app.hotServer)
            hqq.app.codeBook = book.select;
            hqq.localStorage.globalSet(hqq.app.codeBookKey, book.select);
            this.requestFastestSelectServer();
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip52") + status + ",err:" + err)
            hqq.logMgr.log('请求密码本失败，重新请求密码本' + status, forcejump, url, err, readyState)
            this.reStartAtSecret();
        }
        hqq.http.requestFastestUrlLine({
            urllist: hqq.app.secretlist,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: false,
        })
    },
    /**
     * @Description: 从密码本开始重试登陆
     */
    reStartAtSecret() {
        hqq.app.canHotServer = ""
        hqq.localStorage.globalSet(hqq.app.hotServerKey, "");
        hqq.app.codeBook = ""
        hqq.localStorage.globalSet(hqq.app.codeBookKey, "");
        hqq.app.server = ""
        this.upgradeIndex = 0
        this.isfirst = false
        hqq.http.stopRequestStableUrlLine();
        setTimeout(() => {
            this.requestSecret()
        }, 500);
    },
    requestUpgradeInfo() {
        let callback = (response, url) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, "closeChoiceLimeLayer");
            cc.log("response", response)
            hqq.app.versionJson = response
            hqq.app.subGameVersion = response.version
            if (response[hqq.app.pinpai]) {
                hqq.app.packageID = response[hqq.app.pinpai].packageID
                if (response[hqq.app.pinpai][hqq.app.huanjin]) {
                    hqq.app.proxyUserID = response[hqq.app.pinpai][hqq.app.huanjin].proxyUserID
                }
            }
            hqq.app.setGeneralAgency(response)
            this.checkApkUpdata(response)
            let pn = cc.find('Canvas/layer/netnodepos')
            hqq.eventMgr.dispatch(hqq.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("requestUpgradeInfo 请求热更服务器信息失败", status, forcejump, url, err, readyState)
            this.reStartAtSecret()
        }
        let tempurlto = hqq.app.canHotServer + "/" + hqq.app.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 1000000);
        console.log("tempurlto=",tempurlto)
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: tempurlto,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
        !hqq.isDebug && this.refreshServerList()
    },
    showChoiceLimeLayer() {
        let data = {
            exitFunc: this.requestUpgradeInfo.bind(this),
            upgradeList: hqq.localStorage.globalGet(hqq.app.hotServerKey),
            choicetype:1,
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.showLineChoiceLayer, data)
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, "showChoiceLimeLayer");
    },
    refreshServerList() {
        let urllist = hqq.localStorage.globalGet(hqq.app.codeBookKey)
        let hasreceive = false;
        if (hqq.app.selectServerIndex) {
            urllist = hqq.commonTools.swapItem(urllist, hqq.app.selectServerIndex, 0);
        }
        let callback = (response, url, checknum) => {
            hqq.app.selectServerIndex = checknum;
            hqq.localStorage.globalSet(hqq.app.selectServerIndexKey, checknum);
            let responseurl = this.decodeServer(response);
            let murllist = responseurl.split(",");
            // cc.log("murllist", murllist)
            if (!hasreceive) {
                hasreceive = true;
                hqq.app.serverList = []
                for (let i = 0; i < murllist.length; i++) {
                    if (murllist[i].match("upgrade")) {
                        hqq.app.hotServer = []
                        break
                    }
                }
                for (let i = 0; i < murllist.length; i++) {
                    if (murllist[i].match("center")) {
                        hqq.app.serverList.push(murllist[i]);
                    } else if (murllist[i].match("upgrade")) {
                        hqq.app.hotServer.push(murllist[i]);
                    }
                }
                hqq.localStorage.globalSet(hqq.app.hotServerKey, hqq.app.hotServer)
                hqq.localStorage.globalSet(hqq.app.serverListKey, hqq.app.serverList);
                this.requestStableServerUrl();
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("所有请求最快的接待服务器失败，重新请求密码本", status, forcejump, err, readyState)
            this.reStartAtSecret();
        }
        let tipcallback = (checknum) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip53") + checknum + hqq.getTip("showtip54"))
        }
        for(let i = 0; i < urllist.length;i++){
            if(!urllist[i].match("&package_name=")){
                urllist[i]+= "&package_name=" + hqq.app.pinpai;
            }
        }
        hqq.http.requestFastestUrlLine({
            urllist: urllist,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: false,
            timeout: 5000,
            failtimeout: 7000,
            tipcallback: tipcallback,
        })
    },
    /** 请求最快的select服务器 */
    requestFastestSelectServer() {
        let urllist = hqq.localStorage.globalGet(hqq.app.codeBookKey)
        if(CC_DEBUG && hqq.app.huanjin === "dev" ){
            urllist = ["http://select.539316.com/Get/EntryHosts?mode=dev"]
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip55"))
        let hasreceive = false;
        if (hqq.app.selectServerIndex) {
            urllist = hqq.commonTools.swapItem(urllist, hqq.app.selectServerIndex, 0);
        }
        hqq.logMgr.time("requestFastestSelectServer")
        let callback = (response, url, checknum) => {
            hqq.logMgr.timeEnd("requestFastestSelectServer", url)
            hqq.app.selectServerIndex = checknum;
            hqq.localStorage.globalSet(hqq.app.selectServerIndexKey, checknum);
            let responseurl = this.decodeServer(response);
            let murllist = responseurl.split(",");
            if (!hasreceive) {
                hasreceive = true;
                hqq.app.serverList = []
                for (let i = 0; i < murllist.length; i++) {
                    if (murllist[i].match("upgrade")) {
                        hqq.app.hotServer = []
                        break
                    }
                }
                for (let i = 0; i < murllist.length; i++) {
                    if (murllist[i].match("center")) {
                        hqq.app.serverList.push(murllist[i]);
                    } else if (murllist[i].match("upgrade")) {
                        hqq.app.hotServer.push(murllist[i]);
                    }
                }
                if (hqq.app.huanjin == "dev" && hqq.app.hotServer.length == 0) {
                    hqq.app.hotServer = ["http://upgrade.0717996.com"]
                }
                hqq.localStorage.globalSet(hqq.app.hotServerKey, hqq.app.hotServer)
                hqq.localStorage.globalSet(hqq.app.serverListKey, hqq.app.serverList);
                if (hqq.app.server && hqq.app.canHotServer && this.isfirst) {
                    this.requestGameSeverInfo();
                    hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, "closeChoiceLimeLayer");
                } else {
                    this.showChoiceLimeLayer();
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("所有请求最快的接待服务器失败，重新请求密码本", status, forcejump, err, readyState)
            this.reStartAtSecret();
        }
        let tipcallback = (checknum) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip53") + checknum + hqq.getTip("showtip54"))
        }
        for(let i = 0; i < urllist.length;i++){
            if(!urllist[i].match("&package_name=")){
                urllist[i]+= "&package_name=" + hqq.app.pinpai;
            }
        }
        hqq.http.requestFastestUrlLine({
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
        let data = "";
        for (let i = 0; i < response.length; i++) {
            if (i !== 0 && i != response.length - 1) {
                data += response[i];
            }
        }
        let data2 = hqq.base64.decode(data);
        return data2;
    },
    /** 请求游戏服务器信息 */
    requestGameSeverInfo(url) {
        if (!hqq.app.server) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip56"))
            return setTimeout(() => {
                this.requestGameSeverInfo();
            }, 100);
        }
        url = url ? url : hqq.app.server
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip57"))
        cc.director.preloadScene("hall");
        let callback = (data, murl) => {
            this.log(" getserverinfo callback", data)
            if (data.code === 200) {
                this.serverinfoTryIndex = 0
                hqq.app.remoteSeverinfo = data.msg;
                this.requestGameListInfo(hqq.app.server);
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip0"))
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip0") + JSON.stringify(data))
                this.reStartAtSecret();
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("获取服务器信息失败，重新刷选select线路", status, forcejump, err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip58") + status + ",err:" + err)
            if (hqq.app.serverList[this.serverinfoTryIndex]) {
                let newserver = hqq.app.serverList[this.serverinfoTryIndex]
                this.serverinfoTryIndex++
                this.requestGameSeverInfo(newserver)
            } else {
                this.reStartAtSecret();
            }
        }
        let endurl = hqq.app.remotePath + hqq.app.remoteGetSeverInfo + "?platform_key=" + hqq.app.remoteToken + "&package_name=" + hqq.app.packgeName + "&os=" + hqq.app.os;
        if(CC_DEBUG && hqq.app.huanjin === "dev" ){
            endurl = hqq.app.remotePath + hqq.app.remoteGetSeverInfo + "?platform_key=" + hqq.app.remoteToken + "&package_name=" + "com.test.online.android" + "&os=" + hqq.app.os;
        }
        hqq.http.sendXMLHttpRequest({
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
            this.log("getGameList callback", data)
            if (data.code === 200) {
                this.gamelistTryIndex = 0
                if (data.msg) {
                    hqq.app.remoteGamelist = data.msg;
                    for (let k in hqq.subGameList) {
                        for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
                            if (hqq.subGameList[k].game_id == hqq.app.remoteGamelist[i].game_id) {
                                // 除了五龙捕鱼跟财神捕鱼才更新remote资料
                                if(hqq.subGameList[k].enname != "wlby" && hqq.subGameList[k].enname != "csby" ){
                                    hqq.subGameList[k].remoteData = hqq.app.remoteGamelist[i]
                                }
                                // 如果是华兴且是JDB游戏 五龙捕鱼在JDD前两个 财神捕鱼在JDB前一个
                                if(hqq.app.pinpai=="huaxing" && k == "jdb" ){
                                    hqq.subGameList["wlby"].remoteData = hqq.commonTools.jsonCopy(hqq.app.remoteGamelist[i]);
                                    hqq.subGameList["wlby"].remoteData.sort = hqq.app.remoteGamelist[i].sort + 2;
                                    hqq.subGameList["wlby"].remoteData.enname = "wlby";
                                    hqq.subGameList["csby"].remoteData = hqq.commonTools.jsonCopy(hqq.app.remoteGamelist[i]);
                                    hqq.subGameList["csby"].remoteData.sort = hqq.app.remoteGamelist[i].sort + 1;
                                    hqq.subGameList["csby"].remoteData.enname = "csby";
                                }
                                break;
                            }
                        }
                    }

                    if(hqq.app.pinpai == "xinhao"||hqq.app.pinpai == "xinsheng"){
                        delete hqq.subGameList["lhd"];
                        delete hqq.subGameList["ebg"];
                        delete hqq.subGameList["zjh"];
                        delete hqq.subGameList["hbld"];
                        delete hqq.subGameList["suoha"];
                        delete hqq.subGameList["szwg"];
                        delete hqq.subGameList["brnn"];
                        delete hqq.subGameList["ddz"];
                        delete hqq.subGameList["bcbm"];
                        delete hqq.subGameList["hh"];
                        delete hqq.subGameList["dzpk"];
                        delete hqq.subGameList["qznn"];
                        delete hqq.subGameList["shaibao"];
                        delete hqq.subGameList["sss"];
                        delete hqq.subGameList["ermj"];
                        // delete hqq.subGameList["pdk"];
                        // delete hqq.subGameList["21d"];
                        delete hqq.subGameList["bjl"];
                        delete hqq.subGameList["lp"];
                        delete hqq.subGameList["sbty1"];
                        delete hqq.subGameList["sbty2"];
                        delete hqq.subGameList["cylhd"];
                        delete hqq.subGameList["cdx"];
                        delete hqq.subGameList["pccp"];
                        delete hqq.subGameList["zrsx1"];
                        delete hqq.subGameList["zrsx2"];
                        delete hqq.subGameList["cyqp"];
                        delete hqq.subGameList["ygxb"];
                        delete hqq.subGameList["zhibo"];
                        delete hqq.subGameList["pg2"];
                        delete hqq.subGameList["pg"];
                        delete hqq.subGameList["ag"];
                        delete hqq.subGameList["cq9"];
                        delete hqq.subGameList["pt"];
                        delete hqq.subGameList["jdb"];
                    } else {
                        delete hqq.subGameList["lhd2"];
                        delete hqq.subGameList["ebg2"];
                        delete hqq.subGameList["zjh2"];
                        delete hqq.subGameList["hbld2"];
                        delete hqq.subGameList["suoha2"];
                        delete hqq.subGameList["szwg2"];
                        delete hqq.subGameList["brnn2"];
                        delete hqq.subGameList["ddz2"];
                        delete hqq.subGameList["bcbm2"];
                        delete hqq.subGameList["hh2"];
                        delete hqq.subGameList["dzpk2"];
                        delete hqq.subGameList["qznn2"];
                        delete hqq.subGameList["shaibao2"];
                        delete hqq.subGameList["sss2"];
                        delete hqq.subGameList["ermj2"];
                        // delete hqq.subGameList["pdk2"];
                        // delete hqq.subGameList["21d2"];
                        delete hqq.subGameList["bjl2"];
                        delete hqq.subGameList["lp2"];
                    }

                    if( hqq.app.pinpai != "huaxing" ){
                        delete hqq.subGameList["wlby"];
                        delete hqq.subGameList["csby"];
                    }

                    if (hqq.app.pinpai == "fuxin" ) {
                        hqq.subGameList["aga"] = hqq.agaGame
                        delete hqq.subGameList["cyqp"];
                        delete hqq.subGameList["mg"];
                        delete hqq.subGameList["qt"];
                        delete hqq.subGameList["szffc"];
                        hqq.setFuxinHallIdType()
                    } else if (hqq.app.pinpai == "juding" ) {
                        delete hqq.subGameList["cyqp"]
                        hqq.setJudingHallIdType()
                    } else {
                        if(hqq.app.pinpai!= "test" && hqq.app.pinpai != "ninetwo" && hqq.app.pinpai != "huangshi"  && hqq.app.pinpai != "chaofan" ){
                            delete hqq.subGameList["mg"];
                            delete hqq.subGameList["qt"];
                            delete hqq.subGameList["szffc"];
                            delete hqq.subGameList["sanshengtiyu"];
                            delete hqq.subGameList["ppdz"];
                        }
                        
                        if(hqq.app.pinpai == "xinlong")
                        {
                            delete hqq.subGameList["pg"];
                            delete hqq.subGameList["pg2"];
                            delete hqq.subGameList["cq9"];
                            delete hqq.subGameList["pt"];
                            delete hqq.subGameList["ag"];
                            delete hqq.subGameList["jdb"];
                            // delete hqq.subGameList["hbsl"];
                            delete hqq.subGameList["cyqp"];
                            delete hqq.subGameList["pccp"];
                            delete hqq.subGameList["sbty1"];
                            delete hqq.subGameList["sbty2"];
                            delete hqq.subGameList["zrsx1"];
                            delete hqq.subGameList["zrsx2"];
                            delete hqq.subGameList["cdx"];
                            delete hqq.subGameList["cylhd"];
                            delete hqq.subGameList["ygxb"];
                            delete hqq.subGameList["zhibo"];
                        } else if(hqq.app.pinpai == "nineone"||hqq.app.pinpai == "huaxing" ){
                            // delete hqq.subGameList["hbsl"];
                            delete hqq.subGameList["cyqp"];
                        } else if( hqq.app.pinpai == "ninetwo" ){
                            // delete hqq.subGameList["hbsl"];
                            delete hqq.subGameList["cyqp"];
                            delete hqq.subGameList["qt"];
                            delete hqq.subGameList["szffc"];
                            delete hqq.subGameList["sanshengtiyu"];
                        } else if( hqq.app.pinpai == "huangshi" ){
                            // delete hqq.subGameList["hbsl"];
                            delete hqq.subGameList["cyqp"];
                            // delete hqq.subGameList["mg"];
                            // delete hqq.subGameList["qt"];
                            delete hqq.subGameList["szffc"];
                            delete hqq.subGameList["sanshengtiyu"];
                        } else if( hqq.app.pinpai == "tianqi" ) {
                            delete hqq.subGameList["cyqp"];
                        }
                        let sortarray = []
                        for (let k in hqq.subGameList) {
                            if (!hqq.checkIsAgaSubgame(k)) {
                                sortarray.push(hqq.subGameList[k])
                            }
                        }
                        for (let k in hqq.oldGameList) {
                            for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
                                if (hqq.oldGameList[k].game_id == hqq.app.remoteGamelist[i].game_id) {
                                    hqq.oldGameList[k].remoteData = hqq.app.remoteGamelist[i]
                                    break;
                                }
                            }
                        }
                        sortarray.sort(function (a, b) {
                            if (b.remoteData && a.remoteData) {
                                return b.remoteData.sort - a.remoteData.sort
                            }
                        })
                        for (let k in hqq.subGameList) {
                            for (let i = 0; i < sortarray.length; i++) {
                                if (hqq.subGameList[k].game_id == sortarray[i].game_id && k == sortarray[i].enname && !hqq.checkIsAgaSubgame(k)) {
                                    hqq.subGameList[k].hallid = i
                                    break;
                                }
                            }
                        }
                    }
                }
                hqq.app.checkSubServer();
                this.login();
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip1"))
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip1") + JSON.stringify(data))
                this.reStartAtSecret();
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("获取游戏列表失败，重新刷选select线路", status, forcejump, err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip58") + status + ",err:" + err)
            if (hqq.app.serverList[this.gamelistTryIndex]) {
                let newserver = hqq.app.serverList[this.gamelistTryIndex]
                this.gamelistTryIndex++
                this.requestGameListInfo(newserver)
            } else {
                this.reStartAtSecret();
            }
        }
        let endurl = hqq.app.remotePath + hqq.app.remoteGetGameList + "?platform_key=" + hqq.app.remoteToken + "&package_id=" + hqq.app.remoteSeverinfo.id;
        hqq.http.sendXMLHttpRequest({
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
     * @Description: 检查apk更新
     */
    checkApkUpdata(data) {
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip59"))
        this.checkFatestTempHost()
        let vA = data.apkversion.split('.');
        let needUp = false
        this.log(" 本地 apkVersion", hqq.app.apkVersion, "服务端 apkVersion", data.apkversion)
        if (hqq.app.apkVersion) {
            let vB = hqq.app.apkVersion.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    if (a > b) { // 线上版本大于本地版本
                        needUp = true;
                    } else if (a < b) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip2"))
                    }
                    break;
                }
            }
            if (vA.length > vB.length) {
                needUp = true;
            }
        }
        if (hqq.isDebug) {
            this.requestGameSeverInfo()
            return
        }
        if (needUp && !cc.sys.isBrowser && cc.sys.os != "OS X" && cc.sys.os != "Windows") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip60"))
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 8 })
        } else {
            if (cc.sys.isBrowser || cc.sys.os == "OS X" || cc.sys.os == "Windows" ) { // || cc.sys.os == "Windows"
                this.requestGameSeverInfo()
            } else if (hqq.app.version != hqq.app.subGameVersion.hall) {
                this.mainUpdataCheck(hqq.app.subGameVersion.hall)
            } else {
                this.isupdataCallback(false, "hall");
            }
        }
    },
    /** 主包检查 */
    mainUpdataCheck(main_version) {
        if (hqq.app.canHotServer == "") {
            hqq.logMgr.sendMLog('主包更新检测 热更服务器地址为空')
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip3"))
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip3"))
            return
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip61"))
        hqq.eventMgr.register(hqq.eventMgr.hotCheckup, "appLogin", this.isupdataCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFail, "appLogin", this.failCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotProgress, "appLogin", this.progressCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFinish, "appLogin", this.finishCallback.bind(this))
        main_version = main_version == '1.0.0' ? '' : main_version
        //第一步 hall更新(base的资源)
        console.log("第一步 hall更新(base的资源)")
        hqq.hotUpdateMgr.checkUpdate({
            subname: "hall",
            version: hqq.app.version,
            remotev: main_version,
        })
    },
    checkFatestTempHost() {
        let data = hqq.app.versionJson
        if( data[hqq.app.pinpai]){
            if(data[hqq.app.pinpai][hqq.app.huanjin] )
            {
                if (data[hqq.app.pinpai][hqq.app.huanjin].temp_host) {
                    if(hqq.gameGlobal.proxy.temp_host == ""){
                        hqq.gameGlobal.proxy.temp_host = hqq.commonTools.swapItem(data[hqq.app.pinpai][hqq.app.huanjin].temp_host, hqq.app.tempServerIndex, 0);
                    }
                    hqq.logMgr.time("最快的temp_host地址")
                    if (hqq.app.tempServerIndex) {
                        data[hqq.app.pinpai][hqq.app.huanjin].temp_host = hqq.commonTools.swapItem(data[hqq.app.pinpai][hqq.app.huanjin].temp_host, hqq.app.tempServerIndex, 0);
                    }
                    let callback = (response, url, checknum) => {
                        !hqq.isDebug && hqq.logMgr.timeEnd("最快的temp_host地址", url, response)
                        hqq.gameGlobal.proxy.temp_host = url;
                        hqq.app.downloadUrl = url + "?p=" + hqq.app.packageID + "&u=" + hqq.gameGlobal.player.account_name + "&m=" + hqq.app.huanjin;
                        hqq.app.tempServerIndex = checknum;
                        hqq.localStorage.globalSet(hqq.app.tempServerIndexKey, checknum);
                    }
                    let failcallback = (status, forcejump, url, err, readyState) => {
                        hqq.logMgr.log("tempHost请求失败", status, forcejump, err, readyState)
                    }
                    hqq.http.requestFastestUrlLine({
                        urllist: data[hqq.app.pinpai][hqq.app.huanjin].temp_host,
                        endurl: "/checked?" + Math.floor(Math.random() * 1000000),
                        callback: callback,
                        failcallback: failcallback,
                        needJsonParse: false,
                    })
                }
                else
                {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip4"))
                }
            }
            else
            {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip4"))
            }
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip4"))
        }
    },
    isupdataCallback(bool, subname,isfail=false) {
        console.log("isupdataCallback bool=",bool , " subname",subname , " isfail=",isfail);
        if (bool) {
            hqq.logMgr.log(subname + "需要更新")
        } else {
            hqq.logMgr.log(subname + "不需要更新")
            
            //第二步 hall_品牌更新
            if (subname == "hall" || subname == "") {
                if(isfail){
                   console.log("第二步 hall_品牌更新 失败")
                   this.failCallback(subname);
                   return;
                }
                console.log("第二步 hall_品牌更新")
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip61"))
                hqq.eventMgr.register(hqq.eventMgr.hotCheckup, "appLogin", this.isupdataCallback.bind(this))
                hqq.eventMgr.register(hqq.eventMgr.hotFail, "appLogin", this.failCallback.bind(this))
                hqq.eventMgr.register(hqq.eventMgr.hotProgress, "appLogin", this.progressCallback.bind(this))
                hqq.eventMgr.register(hqq.eventMgr.hotFinish, "appLogin", this.finishCallback.bind(this))

                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip84"))

                hqq.localStorage.globalSet(hqq.app.versionKey, hqq.app.subGameVersion.hall)
                
                let localsubv = hqq.localStorage.get(this.hallStr, "versionKey") || null;
                
                hqq.hotUpdateMgr.checkUpdate({
                    subname: this.hallStr,
                    version: localsubv || "1.0.0",
                })
            } else if( subname === this.hallStr ){
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip87"))
                let localsubv = hqq.localStorage.get(this.payStr, "versionKey") || null;
                console.log("=================isupdataCallback payStr localsubv=",localsubv)
                hqq.hotUpdateMgr.checkUpdate({
                    subname: this.payStr,
                    version: localsubv || "1.0.0",
                })
            } else if( subname === this.payStr ){
                if(isfail){
                    console.log("第二步 pay_品牌更新 失败")
                    this.failCallback(subname);
                    return;
                }
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip90"))
                let localsubv = hqq.localStorage.get(this.proxyStr, "versionKey") || null;
                console.log("=================isupdataCallback proxyStr localsubv=",localsubv)
                hqq.hotUpdateMgr.checkUpdate({
                    subname: this.proxyStr,
                    version: localsubv || "1.0.0",
                })
            } else if( subname === this.proxyStr ){
                if(isfail){
                    console.log("第二步 proxy_品牌更新 失败")
                    this.failCallback(subname);
                    return;
                }
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip93"))
                let localsubv = hqq.localStorage.get(this.IMStr, "versionKey") || null;
                console.log("=================isupdataCallback IMStr localsubv=",localsubv)
                hqq.hotUpdateMgr.checkUpdate({
                    subname: this.IMStr,
                    version: localsubv || "1.0.0",
                })
            } else if(subname === this.IMStr ){
                if(isfail){
                    console.log("第二步 IM_品牌更新 失败")
                    this.failCallback(subname);
                    return;
                }
                console.log("全部更新完毕进入大厅")
                this.requestGameSeverInfo()
            }
        }
    },
    failCallback(subname) {
        console.log("failCallback subname",subname);

        if (subname == "hall") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip62"))
        } else if(subname === this.hallStr ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip85"))
        } else if(subname === this.payStr ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip88"))
        } else if(subname === this.proxyStr ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip91"))
        } else if(subname === this.IMStr ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip94"))
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, subname + hqq.getTip("showtip63"))
        }
        hqq.logMgr.sendLog();
        this.reStartAtSecret();
    },
    progressCallback(progress) {
    },
    finishCallback(subname) {
        //第二步
        if( subname === this.hallStr ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip87"))
            let localsubv = hqq.localStorage.get(this.payStr, "versionKey") || null;
            console.log("=================finishCallback payStr localsubv=",localsubv)
            hqq.hotUpdateMgr.checkUpdate({
                subname: this.payStr,
                version: localsubv || "1.0.0",
            })
        } else if( subname === this.payStr ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip90"))
            let localsubv = hqq.localStorage.get(this.proxyStr, "versionKey") || null;
            console.log("=================finishCallback proxyStr localsubv=",localsubv)
            hqq.hotUpdateMgr.checkUpdate({
                subname: this.proxyStr,
                version: localsubv || "1.0.0",
            })
        } else if( subname === this.proxyStr ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip93"))
            let localsubv = hqq.localStorage.get(this.IMStr, "versionKey") || null;
            console.log("=================finishCallback IMStr localsubv=",localsubv)
            hqq.hotUpdateMgr.checkUpdate({
                subname: this.IMStr,
                version: localsubv || "1.0.0",
            })
        } else if(subname === this.IMStr ){
            console.log("全部更新完毕进入大厅")
            this.requestGameSeverInfo()
        }
    },
    /** 登录服务器 */
    login() {
        this.log("login")
        if (hqq.isDebug) {
            if (hqq.app.account_name) {
                hqq.gameGlobal.player.account_name = hqq.app.account_name
                hqq.gameGlobal.player.account_pass = hqq.app.account_pass
                this.officialLogin()
            } else {
                cc.log("请在appGlobal文件中配置自己的账号密码进行登录")
                this.loginWithUUID();
            }
        } else {
            this.login2()
        }
    },
    // 登陆前检测，选择登陆方式
    login2() {
        this.log('login2', hqq.app.server)
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip64"));
        if (hqq.webUpAgent && hqq.webAcconunt && hqq.webDeviceid) { // 网页版
            // 第三方游戏列表
            let thirdgamelist = [
                "5b1f3a3cb76a591e7f25173",//真人视讯

                "569a62be7ff123m117d446aa",//派彩
                
                "5b1f3a3cb76a591e7f25179",//沙巴体育
                "5b1f3a3cb76a451e211109",//三昇体育
                
                "5b1f3a3cb76a591e7f251736",//AG游戏
                "5b1f3a3cb1005251736",//PG游戏
                "5b1f3a3cb76a451e210629",//PG2游戏
                "5b1f3a3cb76a591e7f251735",//CQ9游戏
                "5b1f3a3cb76a451e7f251739",//JDB游戏
                "5b1f3a3cb76a591e7f251737",//PT游戏
                "5b1f3a3cb76a451e210821",//MG游戏
                "5b1f3a3cb76a451e210822",//QT游戏
                "5b1f3a3cb76a451e211110",//PP游戏
                // "5b1f3a3cb76a451e211229",//PQ游戏
            ]
            let remotedata = null;
            // 取得运维工具资料
            for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
                if (hqq.webGameID === hqq.app.remoteGamelist[i].game_id) {
                    remotedata = hqq.app.remoteGamelist[i];
                    break;
                }
            }
            if(remotedata){
                // 没开放此游戏
                if(remotedata.open === 0 ){
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("b2bwebtip1"),
                    })
                    hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("b2bwebtip1") )
                    return;
                }
            }
            for (let i = 0; i < thirdgamelist.length; i++) {
                // 第三方游戏
                if (hqq.webGameID === thirdgamelist[i]) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("b2bwebtip1"),
                        horizontalAlign:cc.Label.HorizontalAlign.CENTER
                    })
                    hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("b2bwebtip1") )
                    return;
                }
            }

            hqq.gameGlobal.player.account_name = hqq.webAcconunt
            hqq.gameGlobal.player.account_pass = hqq.webAcconuntPass
            hqq.app.deviceID = hqq.webDeviceid
            hqq.gameGlobal.player.code = hqq.webUpAgent
            this.loginWithUUID();
        } else if(!CC_DEBUG&&!hqq.isOtherGame&&(cc.sys.platform == cc.sys.MOBILE_BROWSER || cc.sys.platform == cc.sys.DESKTOP_BROWSER)){
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer,{type:15,hideexitbtn:true});
        } else if (hqq.gameGlobal.token && hqq.gameGlobal.token != "") {
            this.loginWithToken();
        } else if (hqq.gameGlobal.player.account_name && hqq.gameGlobal.player.account_pass) {
            this.officialLogin();
        } else if (hqq.app.deviceID) {
            this.loginWithUUID();
        } else if (hqq.gameGlobal.player.code) {
            this.firstLogin();
        } else {
            this.getOnlineCode(20)
        }
        hqq.logMgr.sendMLog("最优热更地址:" + hqq.app.canHotServer)
    },
    /**
     * @Description: token方式登陆
     */
    loginWithToken() {
        hqq.logMgr.log("loginWithToken")
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip64") + "1")
        let callback = (data, url) => {
            this.log("loginWithToken callback", data)
            if (data.code !== 200) {
                this.loginWithUUID();
            } else {
                this.setPlayerInfo(data)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("loginWithToken failcallback", status, forcejump, err, readyState)
            this.loginWithUUID();
        }
        let endurl = hqq.app.getIpGetEndurl(3);
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: hqq.app.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },
    /** 账号密码 */
    officialLogin() {
        hqq.logMgr.log("officialLogin", hqq.gameGlobal.player.account_name, hqq.gameGlobal.player.account_pass)
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip64") + "4")
        if (hqq.gameGlobal.player.account_name && hqq.gameGlobal.player.account_pass) {
            let callback = (data, url) => {
                this.log("officialLogin callback", data, url)
                if (data.code !== 200) {
                    this.loginWithUUID();
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                hqq.logMgr.log("officialLogin failcallback", status, forcejump, err, readyState)
                this.loginWithUUID();
            }
            let endurl = hqq.app.getIpGetEndurl(0);
            hqq.http.sendXMLHttpRequest({
                method: "GET",
                urlto: hqq.app.server,
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
        hqq.logMgr.log("loginWithUUID", hqq.app.deviceID)
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip64") + "2")
        let callback = (data, url) => {
            this.log(" loginWithUUID callback", data, url)
            if (data.code !== 200) {
                this.errinfo += "uuidLogin 失败:" + data.code + ",msg:" + data.msg + ";"
                if(!hqq.webAcconunt){
                    this.firstLogin();
                }
            } else {
                this.setPlayerInfo(data)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log(" loginWithUUID failcallback", status, forcejump, err, hqq.app.deviceID, readyState)
            this.reStartAtSecret();
        }
        let endurl = hqq.app.getIpGetEndurl(1);
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: hqq.app.server,
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
        hqq.logMgr.log("firstLogin", hqq.gameGlobal.player.code)
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip64") + "3")
        if (hqq.gameGlobal.player.code) {
            if (!this.checkHasDeviceID()) {
                return
            }
            let callback = (data, url) => {
                this.log(" firstLogin callback", data, url)
                if (data.code !== 200) {
                    if (!this.errinfo.match("firstLogin")) {
                        this.errinfo += "firstLogin 失败:" + data.code + ",msg:" + data.msg + ";"
                    }
                    hqq.logMgr.log("firstLogin 失败：" + data.code + data.msg)
                    hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip5") + data.code + data.msg)
                    if (data.code == 404 && data.msg == "prev proxy user not found") {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip6"))
                    } else {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip5") + data.code + data.msg)
                    }
                    if(hqq.app.getGeneralAgency() == hqq.app.proxyUserID){
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                            type: 13,
                            hideexitbtn: true,
                            exitfunc: null,
                            ensurefunc: (code) => {
                                hqq.gameGlobal.player.code = code
                                this.firstLogin();
                            }
                        })
                        return;
                    }
                    this.autoLogin()
                } else {
                    this.setPlayerInfo(data)
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                hqq.logMgr.log('firstLogin请求失败，重新请求密码本', status, forcejump, err, readyState)
                this.reStartAtSecret();
            }
            let endurl = hqq.app.getIpGetEndurl(2);
            hqq.http.sendXMLHttpRequest({
                method: "GET",
                urlto: hqq.app.server,
                endurl: endurl,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            });
        } else {
            if (!navigator) {
                hqq.logMgr.log("没有 navigator", navigator)
                if (!navigator.userAgent) {
                    hqq.logMgr.log("没有 navigator.userAgent", navigator.userAgent)
                }
            }
            this.getOnlineCode(10)
        }
    },
    // 检查设备id
    checkHasDeviceID() {
        if ((!hqq.app.deviceID || hqq.app.deviceID == "empty")) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("autologinios1"))
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                type: 10,
                msg: hqq.getTip("autologinios2"),
                fontSize: 23,
                hideexitbtn: true,
                ensurefunc: () => {
                    let mynode = cc.director.getScene().getChildByName('smallsublayer')
                    mynode.destroy()
                    setTimeout(() => {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 12, hideexitbtn: true })
                    }, 200); 
                }
            })
            return false
        }
        return true
    },
    // 获取上级代理id
    getOnlineCode(trynum, server) {
        hqq.logMgr.log("getOnlineCode", trynum , " hqq.app.clipboard=",hqq.app.clipboard)
        if (hqq.app.clipboard == "" || !hqq.app.clipboard) {
            hqq.app.clipboard = 'empty'
        }
        if (hqq.app.deviceID == "" || !hqq.app.deviceID) {
            hqq.app.deviceID = 'empty'
        }
        let endurl = "/Game/Code/getOnlineCode?"
        endurl += "package_name=" + hqq.app.packgeName;
        endurl += "&os=" + hqq.app.os;
        endurl += "&uuid=" + hqq.app.deviceID;
        endurl += "&keys=" + hqq.app.clipboard;
        let callback = (response, urlto) => {
            this.tryIndex = 0
            if (response.code == 200) {
                hqq.gameGlobal.player.code = response.msg.proxy_user_id
                hqq.gameGlobal.player.id = response.msg.account_name
                hqq.logMgr.log("getOnlineCode sucess hqq.gameGlobal.player.code", hqq.gameGlobal.player.code , " hqq.gameGlobal.player.id=",hqq.gameGlobal.player.id," endurl=",endurl)
                this.firstLogin()
            } else {
                hqq.logMgr.log('getOnlineCode没有获取到玩家code,自动登录,' + urlto + "," + JSON.stringify(response) + "," +
                    hqq.gameGlobal.player.code + ",", hqq.app.deviceID + "," + hqq.app.clipboard)
                if(hqq.app.getGeneralAgency() == hqq.app.proxyUserID){
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 13,
                        hideexitbtn: true,
                        exitfunc: () => {
                            this.autoLogin();
                        },
                        ensurefunc: (code) => {
                            hqq.gameGlobal.player.code = code
                            this.firstLogin();
                        }
                    })
                } else{
                    this.autoLogin();
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log('getOnlineCode failcallback status:' + status + ",forcejump:" + forcejump + ",url:" + url
                + ",err:" + err + ",readyState:" + readyState)
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getOnlineCode(trynum)
                }, 500);
            } else if (trynum == 0) {
                hqq.logMgr.log('getOnlineCode获取到玩家code失败,自动登录,', hqq.app.deviceID, hqq.app.clipboard)
                if (hqq.app.serverList[this.tryIndex]) {
                    let newserver = hqq.app.serverList[this.tryIndex]
                    this.tryIndex++
                    this.getOnlineCode(20, newserver)
                } else {
                    this.autoLogin()
                }
            }
        }
        server = server ? server : hqq.app.server
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },
    /** 设置玩家信息 */
    setPlayerInfo(data, ischange) {
        this.checkFatestTempHost();
        let msg = data.msg;
        hqq.app.gameUser = data.msg.game_user;
        hqq.gameGlobal.player.account_pass = "";
        hqq.gameGlobal.player.alipay = "";
        hqq.gameGlobal.player.yinhangka = "";
        hqq.gameGlobal.huanjin = hqq.app.huanjin
        hqq.gameGlobal.pay.client = hqq.app.os
        hqq.gameGlobal.token = msg.token
        hqq.gameGlobal.regin_ip = msg.game_user.regin_ip
        
        hqq.localStorage.globalSet(hqq.gameGlobal.tokenKey, hqq.gameGlobal.token);
        this.getReginIp()
        for (let key in hqq.subGameList) {
            hqq.subGameList[key].hasAccount = false
        }
        for (let key in hqq.oldGameList) {
            hqq.oldGameList[key].hasAccount = false
        }
        for (let index in msg.game_accounts) {
            for (let key in hqq.subGameList) {
                if (hqq.subGameList[key].game_id == msg.game_accounts[index].game_id) {
                    hqq.subGameList[key].hasAccount = true
                }
            }
            for (let key in hqq.oldGameList) {
                if (hqq.oldGameList[key].game_id == msg.game_accounts[index].game_id) {
                    hqq.oldGameList[key].hasAccount = true
                    break;
                }
            }
            for (let key in hqq.agaSubGameList) {
                if (hqq.agaSubGameList[key].game_id == msg.game_accounts[index].game_id) {
                    hqq.agaSubGameList[key].hasAccount = true
                    break;
                }
            }
        }
        hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
        hqq.app.setGameInfo(msg.game_user, msg.proxy_user, msg.prev_proxy)
        if (!ischange) {
            hqq.logMgr.sendLog()
            this.m_destroy()
            // if ((hqq.app.pinpai != "fuxin") && hqq.gameGlobal.player.phonenum != "" && hqq.subModel.payActivity.lanchscene != "" && !hqq.isDebug) {
            if(false){
                hqq.needShowNotice = true;
                if (hqq.gameGlobal.pay.pay_host == "") {
                    hqq.logMgr.time("最快的pay地址")
                    if (hqq.app.payServerIndex) {
                        hqq.app.remoteSeverinfo.pay_host = hqq.commonTools.swapItem(hqq.app.remoteSeverinfo.pay_host, hqq.app.payServerIndex, 0);
                    }
                    let callback = (response, url, checknum) => {
                        hqq.logMgr.timeEnd("最快的pay地址", url)
                        hqq.gameGlobal.pay.pay_host = url;
                        hqq.app.payServerIndex = checknum;
                        hqq.localStorage.globalSet(hqq.app.payServerIndexKey, checknum);
                        if(hqq.gameGlobal.showPayActivityWeb)
                        {
                            if(hqq.app.packageID >= 9 || hqq.app.pinpai == "nineone"){
                                hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, true);
                            }else{
                                cc.director.preloadScene(hqq.subModel.payActivity.lanchscene, this.onProgress.bind(this), (err, scene) => {
                                    if (err) {
                                        console.log(err)
                                        hqq.logMgr.logerror(err)
                                        return
                                    }
                                    cc.director.loadScene(hqq.subModel.payActivity.lanchscene);
                                })
                            }
                        }
                        else
                        {
                            cc.director.preloadScene(hqq.subModel.payActivity.lanchscene, this.onProgress.bind(this), (err, scene) => {
                                if (err) {
                                    console.log(err)
                                    hqq.logMgr.logerror(err)
                                    return
                                }
                                cc.director.loadScene(hqq.subModel.payActivity.lanchscene);
                            })
                        }
                    }
                    let failcallback = (status, forcejump, url, err, readyState) => {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, "pay_host" + hqq.getTip("requestfail") + status + ",err:" + err)
                        hqq.logMgr.log("pay_host请求失败", status, forcejump, err, readyState)
                    }
                    let tipcallback = (checknum) => {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip65") + checknum + hqq.getTip("showtip54"))
                    }
                    hqq.http.requestFastestUrlLine({
                        urllist: hqq.app.remoteSeverinfo.pay_host,
                        endurl: "/checked",
                        callback: callback,
                        failcallback: failcallback,
                        needJsonParse: false,
                        tipcallback: tipcallback,
                    });
                } else {
                    if(hqq.gameGlobal.showPayActivityWeb)
                    {
                        if(hqq.app.packageID >= 9 || hqq.app.pinpai == "nineone"){
                            hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, true);
                        }else{
                            cc.director.preloadScene(hqq.subModel.payActivity.lanchscene, this.onProgress.bind(this), (err, scene) => {
                                if (err) {
                                    console.log(err)
                                    hqq.logMgr.logerror(err)
                                    return
                                }
                                cc.director.loadScene(hqq.subModel.payActivity.lanchscene);
                            })
                        }
                    }
                    else
                    {
                        cc.director.preloadScene(hqq.subModel.payActivity.lanchscene, this.onProgress.bind(this), (err, scene) => {
                            if (err) {
                                console.log(err)
                                hqq.logMgr.logerror(err)
                                return
                            }
                            cc.director.loadScene(hqq.subModel.payActivity.lanchscene);
                        })
                    }
                }
            } else {
                hqq.app.needShowFree = true;
                hqq.needShowNotice = true;
                this.jumpToNextScene();
            }
        }
        let callback = (response, url) => {
            cc.log("/Proxy/User/login返回:", response);
            if (response.code === 200){
                hqq.gameGlobal.proxy.token = response.msg.token;
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("/Proxy/User/login failcallback:", status, forcejump, url, err, readyState);
        }
        let url = hqq.gameGlobal.proxy.proxy_host+"/Proxy/User/login";
        
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: url,
            param: `account_name=${hqq.gameGlobal.player.account_name}&token=${hqq.gameGlobal.token}`,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    },
    getReginIp(trynum) {
        // if (CC_DEBUG) {
        //     hqq.gameGlobal.ipCheck = true
        //     return
        // }
        if (hqq.gameGlobal.player.phonenum != "") {
            hqq.gameGlobal.ipCheck = true
            return
        }
        if (!hqq.gameGlobal.ipapiData) {
            this.getReginIp2()
            return
        }
        if (hqq.app.reginIpData && hqq.app.reginIpData.query == hqq.gameGlobal.regin_ip) {
            let regindata = hqq.app.reginIpData
            if (hqq.gameGlobal.ipapiData.regionName == regindata.regionName) {
                hqq.gameGlobal.ipCheck = true
            } else {
                this.getLocalIp2(3, true)
            }
            return
        }
        trynum = trynum || 2
        let callback = (data) => {
            hqq.app.reginIpData = data
            hqq.localStorage.globalSet(hqq.app.reginIpDataKey, data);
            if (hqq.gameGlobal.ipapiData && hqq.gameGlobal.ipapiData.regionName == hqq.app.reginIpData.regionName) {
                hqq.gameGlobal.ipCheck = true
            } else {
                this.getLocalIp2(3, true)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("ipapi获得信息失败：" + status + ",err:" + err + ",trynum:" + trynum, readyState);
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getReginIp(trynum)
                }, 500);
            }
        }
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: "http://ip-api.com/json/" + hqq.gameGlobal.regin_ip + "?lang=zh-CN",
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    getReginIp2(trynum) {
        if (hqq.app.reginIpData2 && hqq.app.reginIpData2.ip == hqq.gameGlobal.regin_ip) {
            if (hqq.gameGlobal.ipinfoData && hqq.gameGlobal.ipinfoData.region == hqq.app.reginIpData2.region) {
                hqq.gameGlobal.ipCheck = true
            } else {
                this.getHavePay()
            }
            return
        }
        trynum = trynum || 2
        let callback = (data) => {
            hqq.app.reginIpData2 = data
            hqq.localStorage.globalSet(hqq.app.reginIpData2Key, data);
            if (hqq.gameGlobal.ipinfoData && hqq.gameGlobal.ipinfoData.region == hqq.app.reginIpData2.region) {
                hqq.gameGlobal.ipCheck = true
            } else {
                this.getHavePay()
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("ipapi获得信息失败：" + status + ",err:" + err + ",trynum:" + trynum, readyState);
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getReginIp2(trynum)
                }, 500);
            } else {
                this.getHavePay()
            }
        }
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: "https://ipinfo.io/" + hqq.gameGlobal.regin_ip + "/json",
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    getHavePay(trynum) {
        trynum = trynum || 2
        let callback = (data) => {
            cc.log("data", JSON.stringify(data))
            if (data.status != 0) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip7") + data.msg)
            }
            if (data.data.frist_pay_amount) {
                hqq.gameGlobal.ipCheck = true
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("getHavePay获得信息失败：" + status + ",err:" + err + ",trynum:" + trynum, readyState);
            trynum--
            if (trynum > 0) {
                setTimeout(() => {
                    this.getReginIp2(trynum)
                }, 500);
            }
        }
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: hqq.gameGlobal.pay.pay_host + "/api/activity/getFristPayAmount?token=e40f01afbb1b9ae3dd6747ced5bca532&user_id=" + hqq.gameGlobal.player.id + "&is_hall=1",
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    onProgress(completedCount, totalCount, item) {
        hqq.eventMgr.dispatch(hqq.eventMgr.hotProgress, completedCount / totalCount, "jiazai")
    },
    // 跳转至下一个场景
    jumpToNextScene() {
        this.updatefininshed = true;
        if (hqq.webGameID) {
            let mcallback = (subdata) => {
                this.webgamedelete();
                if (subdata == "hbsl" || subdata == 'zrsx1' || subdata == 'zrsx2'
                    || subdata == 'pccp' || subdata == 'sbty1' || subdata == 'sbty2'
                    || subdata == 'fctbj') { //  真人视讯 红包扫雷 派彩 沙巴体育 发财推币机 竖屏
                    hqq.reflect && hqq.reflect.setOrientation("portrait")
                    if (subdata == 'zrsx1') {
                        hqq.gameGlobal.subGameType = 40
                    } else if (subdata == 'zrsx2') {
                        hqq.gameGlobal.subGameType = 24
                    } else if (subdata == 'sbty1') {
                        hqq.gameGlobal.subGameType = 0
                    } else if (subdata == 'sbty2') {
                        hqq.gameGlobal.subGameType = 1
                    }
                }
                let key = subdata
                if (subdata == "sbty1" || subdata == "sbty2") {
                    key = "sbty"
                } else if (subdata == "zrsx1" || subdata == "zrsx2") {
                    key = "zrsx"
                }
                let self = this;
                //有分皮肤加载的子游戏资源
                let subGamePinPaiResList = { 
                    // "fuxin":["bjl","lhd"]
                };
                
                if(subGamePinPaiResList[hqq.app.pinpai] ){
                    let key2 = null;
                    for( key2 in subGamePinPaiResList[hqq.app.pinpai] ){
                        if( key2 == subdata ){
                            cc.assetManager.loadBundle(subdata + "_" + hqq.app.pinpai, (err) => {
                                if (err) {
                                    return cc.log('load subpackage script fail.', subdata + "_" + hqq.app.pinpai);
                                }
                                hqq[subdata + "_" + hqq.app.pinpai] = cc.assetManager.getBundle(subdata + "_" + hqq.app.pinpai );
                                cc.log('load subpackage script successfully.', subdata + "_" + hqq.app.pinpai );
                                this.loadNextScene(subdata);
                            });
                            return;
                        }
                    }
                }
                if (hqq.subGameList[subdata] && hqq.subGameList[subdata].hasRes) {
                    cc.assetManager.loadBundle(subdata , (err3) => {
                        if (err3) {
                            return cc.log('load subpackage script fail.', subdata );
                        }
                        hqq[subdata] = cc.assetManager.getBundle(subdata  );
                        cc.log('load subpackage script successfully.', subdata );
                        this.loadNextScene(subdata);
                    });
                } else {
                    cc.log('load subpackage script successfully.', subdata);
                    this.loadNextScene(subdata);
                }
            }
            for (let k in hqq.subGameList) {
                if (hqq.subGameList[k].game_id == hqq.webGameID) {
                    if (!hqq.subGameList[k].hasAccount) {
                        hqq.loginMgr.createSubAccount(k, mcallback);
                    } else {
                        mcallback(k);
                    }
                    break;
                }
            }
        } else {
            if(hqq.webAcconunt){
                this.webgamedelete();
            }
            hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall");
        }
    },
    loadNextScene(enname) {
        if (hqq.app.pinpai == "fuxin" ) {
            cc.director.preloadScene(hqq.subGameList[enname].fuxin_lanchscene, this.preloadSceneOnProgress, (err, scene) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                cc.director.loadScene(hqq.subGameList[enname].fuxin_lanchscene);
            })
        } else {
            cc.director.preloadScene(hqq.subGameList[enname].lanchscene, this.preloadSceneOnProgress, (err, scene) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                cc.director.loadScene(hqq.subGameList[enname].lanchscene);
            })
        }
    },
    // 创建富鑫aga子游戏账号
    createFuxinSubAccount(enname, mcallback, custom) {
        if (hqq.agaSubGameList[enname].hasAccount) {
            if (custom) {
                mcallback && mcallback(custom);
            } else {
                mcallback && mcallback(enname);
            }
            return
        }
        let subdata = hqq.app.remoteGamelist[0]
        for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
            if (hqq.agaSubGameList[enname].game_id == hqq.app.remoteGamelist[i].game_id) {
                subdata = hqq.app.remoteGamelist[i]
                break;
            }
        }
        let callback = (data) => {
            cc.log("创建子游戏账号 callback", data)
            if (data.code == 200 || data.code == 203 || (data.code == 404 && data.msg == "account already exists")) {
                for (let gname in hqq.agaSubGameList) {
                    if (hqq.agaSubGameList[gname].game_id == subdata.game_id) {
                        hqq.agaSubGameList[gname].hasAccount = true;
                        hqq.localStorage.set(gname, "hasAccount", true);
                    }
                }
                if (custom) {
                    mcallback && mcallback(custom);
                } else {
                    mcallback && mcallback(enname);
                }
            } else {
                hqq.logMgr.log("创建子游戏账号返回失败", data)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip8") + data.code);
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip9") + status + ",err:" + err);
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip9") + status + ",err:" + err)
            hqq.logMgr.log("请求创建子游戏账号失败", status, forcejump, err, readyState)
        }
        let endurl = "/Game/User/createGameAccount";
        let data = {
            game_id: subdata.game_id,
            package_id: subdata.package_id,
            balance: 0,
            id: hqq.gameGlobal.player.id,
            token: hqq.gameGlobal.token,
        }
        hqq.http.sendXMLHttpRequest({
            method: "POST",
            urlto: hqq.app.server + endurl,
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
        });
    },
    /** 创建子游戏账号 */
    createSubAccount(enname, mcallback, custom) {
        if (hqq.subGameList[enname].hasAccount) {
            if (custom) {
                mcallback && mcallback(custom);
            } else {
                mcallback && mcallback(enname);
            }
            return
        }
        let subdata = hqq.app.remoteGamelist[0]
        for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
            if (hqq.subGameList[enname].game_id == hqq.app.remoteGamelist[i].game_id) {
                subdata = hqq.app.remoteGamelist[i]
                break;
            }
        }
        let callback = (data) => {
            cc.log("创建子游戏账号 callback", data)
            if (data.code == 200 || data.code == 203 || (data.code == 404 && data.msg == "account already exists")) {
                for (let gname in hqq.subGameList) {
                    if (hqq.subGameList[gname].game_id == subdata.game_id) {
                        hqq.subGameList[gname].hasAccount = true;
                        hqq.localStorage.set(gname, "hasAccount", true);
                    }
                }
                if (custom) {
                    mcallback && mcallback(custom);
                } else {
                    mcallback && mcallback(enname);
                }
            } else {
                hqq.logMgr.log("创建子游戏账号返回失败", data)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip8") + data.code);
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip9") + status + ",err:" + err);
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip9") + status + ",err:" + err)
            hqq.logMgr.log("请求创建子游戏账号失败", status, forcejump, err, readyState)
        }
        let endurl = "/Game/User/createGameAccount";
        let data = {
            game_id: subdata.game_id,
            package_id: subdata.package_id,
            balance: 0,
            id: hqq.gameGlobal.player.id,
            token: hqq.gameGlobal.token,
        }
        hqq.http.sendXMLHttpRequest({
            method: "POST",
            urlto: hqq.app.server + endurl,
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
        hqq.logMgr.log("accountChange")
        let callback = (data, url) => {
            this.log(" accountChange callback", data, url)
            if (data.code !== 200) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip5") + data.msg)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip5") + data.msg)
            } else {
                if (!hqq.isDebug && hqq.hallWebSocket) {
                    hqq.hallWebSocket.close()
                    let url = hqq.app.server;
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
                    hqq.hallWebSocket.connect(url);
                } else {
                    this.setPlayerInfo(data, false)
                }
                mcallback && mcallback(true, data.msg.token)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("accountChange failcallback", status, forcejump, url, err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip10") + status + ";err:" + err)
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip10") + status + ";err:" + err)
        }
        let endurl = "/Game/login/officialLogin?"
        endurl += "uuid=" + hqq.app.deviceID;
        endurl += "&package_name=" + hqq.app.packgeName;
        endurl += "&os=" + hqq.app.os;
        if (hqq.gameGlobal.player.code == "0") {
            hqq.gameGlobal.player.code = hqq.app.getGeneralAgency();
        }
        endurl += "&code=" + hqq.gameGlobal.player.code;
        endurl += "&unique_id=" + hqq.app.unique_id;
        endurl += "&account_name=" + account;
        endurl += "&account_pass=" + pass;
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: hqq.app.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },
    // 自动登录(总代登陆，不要修改代理code了)
    autoLogin() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip66"))
        if (!this.checkHasDeviceID()) {
            return
        }
        let callback = (data, url) => {
            hqq.logMgr.log("autologin callback", url, JSON.stringify(data.msg))
            if (data.code !== 200) {
                this.errinfo += "autoLogin:" + data.msg + ",p:" + hqq.app.packgeName + ",c:" + hqq.gameGlobal.player.code
                    + ",a:" + hqq.app.getGeneralAgency() + ";d:" + hqq.app.deviceID + ";"
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, this.errinfo)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip11"))
            } else {
                this.setPlayerInfo(data)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("showtip12") + status + ";err:" + err)
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip12") + status + ";err:" + err)
            hqq.logMgr.log("登陆超时，正在重新登陆:", status, forcejump, url, err, readyState)
            this.reStartAtSecret();
        }
        let endurl = "/Game/login/firstLogin?"
        endurl += "&uuid=" + hqq.app.deviceID;
        endurl += "&package_name=" + hqq.app.packgeName;
        endurl += "&os=" + hqq.app.os;
        endurl += "&code=" + hqq.app.getGeneralAgency();
        endurl += "&unique_id=" + hqq.app.unique_id;
        endurl += "&account_name=" + hqq.gameGlobal.player.account_name;
        endurl += "&account_pass=" + hqq.gameGlobal.player.account_pass;
        endurl += "&token=" + hqq.gameGlobal.token;
        hqq.logMgr.log("autologin", endurl)
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: hqq.app.server,
            endurl: endurl,
            callback: callback.bind(this),
            failcallback: failcallback.bind(this),
            needJsonParse: true,
        });
    },
    m_destroy() {
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheckup, "appLogin")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFail, "appLogin")
        hqq.eventMgr.unregister(hqq.eventMgr.hotProgress, "appLogin")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFinish, "appLogin")
        hqq.logMgr.sendLog()

        this.testCurLine()
    },
    log() {
        this.isRealTimeLog && cc.log("__appLogin__", ...arguments)
    },
    stableRestartAtSecret() {
        setTimeout(() => {
            let callback = (response) => {
                let data = this.decodeSecret(response);
                let book = data[hqq.app.huanjin];
                hqq.localStorage.globalSet(hqq.app.hotServerKey, book.upgrade)
                hqq.app.codeBook = book.select;
                hqq.localStorage.globalSet(hqq.app.codeBookKey, book.select);
                this.stableRequestSelect();
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                hqq.logMgr.log('stable请求密码本失败，重新请求密码本', status, forcejump, err, readyState)
                this.stableRestartAtSecret()
            }
            hqq.http.requestFastestUrlLine({
                urllist: hqq.app.secretlist,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: false,
            })
        }, 500)
    },
    stableRequestSelect() {
        let urllist = hqq.localStorage.globalGet(hqq.app.codeBookKey)
        if (hqq.app.selectServerIndex) {
            urllist = hqq.commonTools.swapItem(urllist, hqq.app.selectServerIndex, 0);
        }
        let callback = (response, url, checknum) => {
            hqq.app.selectServerIndex = checknum;
            hqq.localStorage.globalSet(hqq.app.selectServerIndexKey, checknum);
            let murl = this.decodeServer(response);
            let urllist = murl.split(",");
            hqq.app.serverList = urllist;
            hqq.localStorage.globalSet(hqq.app.serverListKey, urllist);
            this.requestStableServerUrl();
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("请求最快的接待服务器失败，重新请求密码本", status, forcejump, err, readyState)
            this.stableRestartAtSecret();
        }
        hqq.http.requestFastestUrlLine({
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
        let urllist = hqq.app.serverList
        let storageList = hqq.localStorage.globalGet(hqq.app.stableServerListKey)
        storageList = this.dealDiffLine(storageList, urllist)

        let murllist = hqq.localStorage.globalGet(hqq.app.hotServerKey)
        let hotserverList = hqq.localStorage.globalGet(hqq.app.stableHotServerListKey)
        hotserverList = this.dealDiffLine(hotserverList, murllist)

        let templist
        let callback = (returnList, checknum, isServer) => {
            let ipresult = "沒有获取到ip信息"
            if (hqq.gameGlobal.ipapiData && hqq.gameGlobal.ipapiData.country) {
                ipresult = "country:" + hqq.gameGlobal.ipapiData.country
                    + ",city:" + hqq.gameGlobal.ipapiData.city
                    + ",query:" + hqq.gameGlobal.ipapiData.query
                    + ",lat:" + hqq.gameGlobal.ipapiData.lat
                    + ",lon:" + hqq.gameGlobal.ipapiData.lon
                    + ",isp:" + hqq.gameGlobal.ipapiData.isp
                    + ",as:" + hqq.gameGlobal.ipapiData.as
            }
            if (isServer) {
                hqq.localStorage.globalSet(hqq.app.stableServerListKey, returnList);
                if (returnList.stable && returnList.stable.url && hqq.app.server != returnList.stable.url) {
                    hqq.app.server = returnList.stable.url
                    hqq.localStorage.globalSet(hqq.app.serverKey, hqq.app.server);
                    hqq.app.serverIndex = returnList.stable.index || checknum;
                    hqq.localStorage.globalSet(hqq.app.serverIndexKey, hqq.app.serverIndex);
                    hqq.app.checkSubServer();
                }
                for (let k = 0; k < returnList.serverList.length; k++) {
                    if (returnList.serverList[k].status == 0) {
                        return // 有线路没有测完
                    }
                }
                templist = JSON.stringify(returnList)
            } else {
                hqq.localStorage.globalSet(hqq.app.stableHotServerListKey, returnList);
                hqq.app.canHotServer = returnList.stable.url;
                hqq.localStorage.globalSet(hqq.app.canHotServerKey, hqq.app.canHotServer);
                for (let k = 0; k < returnList.serverList.length; k++) {
                    if (returnList.serverList[k].status == 0) {
                        return // 有线路没有测完
                    }
                }
                hqq.app.hotServerIndex = returnList.stable.index || checknum;
                hqq.localStorage.globalSet(hqq.app.hotServerIndexKey, hqq.app.hotServerIndex);
                hqq.logMgr.sendLog()
                hqq.logMgr.sendMLog("一次测试后的结果:" + ipresult + ",恒定线路检测:" + templist + ",恒定热更线路检测：" + JSON.stringify(returnList)+ "Pinpai="+ hqq.app.pinpai +",select:"+JSON.stringify(hqq.app.codeBook)+ "select2:"+JSON.stringify(hqq.localStorage.globalGet(hqq.app.codeBookKey)))
            }
        }
        hqq.http.requestStableUrlLine({
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
                storageList.serverList.push({ "index": storageList.serverList.length, "url": urllist[i], "lastTime": 0, "averageTime": 0, testnum: 0, status: 0, info: "" })
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
            storageList.serverList.push({ "index": storageList.serverList.length, "url": addList[i], "lastTime": 0, "averageTime": 0, testnum: 0, status: 0, info: "" })
        }
        if (addList.length > 0) { // 有新增，全部重置
            for (let i = 0; i < storageList.serverList.length; i++) {
                storageList.serverList[i] = ({ "index": i, "url": storageList.serverList[i].url, "lastTime": 0, "averageTime": 0, testnum: 0, status: 0, info: "" })
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
        urllist.push(hqq.app.canHotServer + "/" + hqq.app.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 9999999))
        urllist.push(hqq.app.server + "/checked?" + Math.floor(Math.random() * 9999999))
        hqq.http.testLine(urllist, this.testCurLineCallback.bind(this), 1)
    },
    testCurLineCallback(url, index, spendtime, err) {
        this.testTimeList.push(spendtime)
        if (err) {
            this.errList.push(err)
        }
        this.testTime = this.testTime < spendtime ? spendtime : this.testTime
        if (index == 1) {
            if (this.errList && this.errList.length == 2) {
                this.testTime = hqq.app.netState.bad + 1
                hqq.eventMgr.dispatch(hqq.eventMgr.refreshNetState, { time: this.testTime, timelist: this.testTimeList, errlist: this.errList })
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.refreshNetState, { time: this.testTime, timelist: this.testTimeList, errlist: this.errList })
            }
            setTimeout(() => {
                this.testTime = 0;
                this.testTimeList = [];
                this.errList = [];
                this.testCurLine();
            }, 5000);
        }
    },
    // 云端品牌资源 废除
    getBrandRes() {
        let reslist = hqq.app.versionJson[hqq.app.pinpai].brandRes;
        if (!reslist && !hqq.isDebug) {
            cc.log("云端未配置品牌资源信息")
            return
        }
        // let index = 0;
        // for (let i = 0; i < reslist.length; i++) {
        //     if (reslist[i]) {
        //         index = i
        //         break
        //     }
        // }
        // let urlto = hqq.app.canHotServer + "/" + hqq.app.hotupdatePath + "/brandres/" + hqq.app.pinpai + "/" + reslist[index]
        // let storagepath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'brand\\');
        // let localpath = storagepath + reslist[index]
        // if (!jsb.fileUtils.isFileExist(localpath)) {
        //     jsb.fileUtils.createDirectory(storagepath)
        //     let callback = (response) => {
        //         cc.log("getBrandRes callback")
        //         if (!jsb.fileUtils.writeDataToFile(new Uint8Array(response), localpath)) {
        //             cc.log('Remote write file failed.');
        //         }
        //         index++
        //         if (index < reslist.length) {
        //             urlto = hqq.app.canHotServer + "/" + hqq.app.hotupdatePath + "/brandres/" + hqq.app.pinpai + "/" + reslist[index]
        //             localpath = storagepath + reslist[index]
        //             hqq.http.getRes(urlto, callback, failcallback)
        //         } else {
        //             this.setBrandRes()
        //         }
        //     }
        //     let failcallback = (status, forcejump, url, err, readyState) => {
        //         hqq.http.getRes(urlto, callback, failcallback)
        //     }
        //     hqq.http.getRes(urlto, callback, failcallback)
        // } else {
        this.setBrandRes()
        // }
    },
    // 云端品牌资源 废除
    setBrandRes() {
        if (cc.director.getScene().name == "loading") {
            let reslist = hqq.app.versionJson[hqq.app.pinpai].brandRes;
            if (!reslist && !hqq.isDebug) {
                cc.log("云端未配置品牌资源信息")
                return
            }
            // let storagepath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'brand\\');
            let urlto = hqq.app.canHotServer + "/" + hqq.app.hotupdatePath + "/brandres/" + hqq.app.pinpai + "/"
            reslist[3] && cc.assetManager.loadRemote(urlto + reslist[3], function (err, tex) {
                if (err) {
                    cc.error(err);
                } else {
                    let bg = cc.find("Canvas/Main Camera/brandnode/bg")
                    if (!cc.isValid(bg) || !bg || !bg.getComponent || cc.director.getScene().name != "loading") {
                        return
                    }
                    let mspriteFrame = new cc.SpriteFrame(tex);
                    let bgsprite = bg.getComponent(cc.Sprite)
                    bgsprite.spriteFrame = mspriteFrame
                }
            });
            if (reslist[0] && reslist[1] && reslist[2]) {
                cc.assetManager.loadAny([{ url: urlto + reslist[1], ext: '.txt' }, { url: urlto + reslist[2], ext: '.txt' }], (error, assets) => {
                    cc.assetManager.loadRemote(urlto + reslist[0], (error, texture) => {
                        var asset = new sp.SkeletonData();
                        asset.skeletonJson = assets[1];
                        asset.atlasText = assets[0];
                        asset.textures = [texture];
                        asset.textureNames = [reslist[0]];
                        asset._uuid = "000000000" // 手动设置一个uuid，骗过引擎检测
                        let ani = cc.find("Canvas/Main Camera/brandnode/ani")
                        if (!ani) {
                            return
                        }
                        let skeleton = ani.getComponent(sp.Skeleton)
                        if (!skeleton || !skeleton.node || !skeleton.node.setContentSize || cc.director.getScene().name != "loading") {
                            return
                        }
                        skeleton.skeletonData = asset;
                        if (hqq.app.pinpai == 'debi') {
                            skeleton.setAnimation(0, "animation", false);
                        } else {
                            skeleton.setAnimation(0, "animation", true);
                        }
                    });
                });

                // cc.assetManager.loadRemote(storagepath + reslist[0], function (err, loadimg) {
                //     if (err) {
                //         cc.error(err);
                //         return
                //     }
                //     cc.assetManager.loadRemote(storagepath + reslist[1], (err, loadatlas) => {
                //         if (err) {
                //             cc.error(err);
                //             cc.log("加载logo动画资源报错：", err)
                //             return
                //         }
                //         cc.assetManager.loadRemote(storagepath + reslist[2], (err, loadjson) => {
                //             if (err) {
                //                 cc.error(err);
                //                 cc.log("加载logo动画资源报错：", err)
                //                 return
                //             }
                //             let ani = cc.find("Canvas/Main Camera/brandnode/ani")
                //             let skeleton = ani.getComponent(sp.Skeleton)
                //             var asset = new sp.SkeletonData();
                //             asset.skeletonJson = loadjson;
                //             asset.atlasText = loadatlas;
                //             asset.textures = [loadimg];
                //             asset.textureNames = [reslist[0]];
                //             skeleton.skeletonData = asset;
                //             if (hqq.app.pinpai == 'debi') {
                //                 skeleton.setAnimation(0, "animation", false);
                //             } else {
                //                 skeleton.setAnimation(0, "animation", true);
                //             }
                //         });
                //     });
                // });
            }
        }
    },
    requestVersionJson(callback) {
        let mycallback = (response, url) => {
            hqq.app.versionJson = response
            hqq.app.subGameVersion = response.version
            hqq.app.packageID = response[hqq.app.pinpai].packageID
            hqq.app.proxyUserID = response[hqq.app.pinpai][hqq.app.huanjin].proxyUserID
            hqq.app.setGeneralAgency(response)
            callback && callback()
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("requestUpgradeInfo 请求热更服务器信息失败", status, forcejump, url, err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip13"))
        }
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: hqq.app.canHotServer + "/" + hqq.app.hotupdatePath + "/" + 'version.json?' + Math.floor(Math.random() * 1000000),
            callback: mycallback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    },
    // b2bweb网页版 删除不显示游戏
    webgamedelete(){
        delete hqq.subGameList["zrsx1"];
        delete hqq.subGameList["zrsx2"];

        delete hqq.subGameList["pccp"];

        delete hqq.subGameList["sbty1"];
        delete hqq.subGameList["sbty2"];
        delete hqq.subGameList["sanshengtiyu"];

        delete hqq.subGameList["ag"];
        delete hqq.subGameList["pg"];
        delete hqq.subGameList["pg2"];
        delete hqq.subGameList["cq9"];
        delete hqq.subGameList["jdb"];
        delete hqq.subGameList["pt"];
        delete hqq.subGameList["mg"];
        delete hqq.subGameList["qt"];
        delete hqq.subGameList["pp"];
        // delete hqq.subGameList["pq"];
        let sortarray = []
        for (let k in hqq.subGameList) {
            if (!hqq.checkIsAgaSubgame(k)) {
                sortarray.push(hqq.subGameList[k])
            }
        }
        for (let k in hqq.oldGameList) {
            for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
                if (hqq.oldGameList[k].game_id == hqq.app.remoteGamelist[i].game_id) {
                    hqq.oldGameList[k].remoteData = hqq.app.remoteGamelist[i]
                    break;
                }
            }
        }
        sortarray.sort(function (a, b) {
            if (b.remoteData && a.remoteData) {
                return b.remoteData.sort - a.remoteData.sort
            }
        })
        for (let k in hqq.subGameList) {
            for (let i = 0; i < sortarray.length; i++) {
                if (hqq.subGameList[k].game_id == sortarray[i].game_id && k == sortarray[i].enname && !hqq.checkIsAgaSubgame(k)) {
                    hqq.subGameList[k].hallid = i
                    break;
                }
            }
        }
    },
}

module.exports = appLogin