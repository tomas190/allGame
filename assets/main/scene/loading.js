
let gHandler = require("gHandler");
let hqqLocalStorage = require("hqqLocalStorage");
let hqqLogMgr = require("hqqLogMgr");
let hqqHttp = require("hqqHttp");
let hqqCommonTools = require("hqqCommonTools");
let hqqEvent = require("hqqEvent");
let appGlobal = require("appGlobal");
let myReflect = require("myReflect");
let hqqViewCtr = require("hqqViewCtr")
let hqqAudioMgr = require("hqqAudioMgr");
let hqqBase64 = require("hqqBase64");

cc.Class({
    extends: cc.Component,

    properties: {
        brandnode: cc.Node,
        ani: sp.Skeleton,
        bg: cc.Sprite,

        webback: cc.Node,
        layer: cc.Node,
        downapklabel: cc.Node,
        apkversion: cc.Label,
        progressnode: cc.ProgressBar,
        label: cc.Label,
        mainmanifest: {
            type: cc.Asset,
            default: null
        },
        hallmanifest: {
            type: cc.Asset,
            default: null
        },
        paymanifest: {
            type: cc.Asset,
            default: null
        },
        proxymanifest: {
            type: cc.Asset,
            default: null
        },
        IMmanifest: {
            type: cc.Asset,
            default: null
        }
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */ // " 开始游戏代码，loading界面加载 D/jswrapper"
    onLoad() {
        console.log("开始游戏代码，loading界面加载 1.0.0")
        // cc.debug.setDisplayStats(false)
        gHandler.base64 = hqqBase64;
        gHandler.Reflect = myReflect;
        if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID) {
            gHandler.appGlobal = appGlobal.init(0);
        } else if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.MACOS || cc.sys.platform === cc.sys.IPAD
            || cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) {
            // gHandler.appGlobal = appGlobal.init(1);
            gHandler.appGlobal = appGlobal.init(0);
        } else if (cc.sys.platform === cc.sys.WIN32 || cc.sys.os === cc.sys.OS_WINDOWS) {
            gHandler.appGlobal = appGlobal.init(2);
        } else {
            gHandler.appGlobal = appGlobal.init(-1);
        }
        gHandler.http = hqqHttp;
        gHandler.eventMgr = hqqEvent.init();
        gHandler.commonTools = hqqCommonTools;
        gHandler.logMgr = hqqLogMgr.init();
        gHandler.viewCtr = hqqViewCtr.init();
        gHandler.localStorage = hqqLocalStorage.init();
        gHandler.audioMgr = hqqAudioMgr.init();
        if (cc.sys.isBrowser) {
        } else if (gHandler.appGlobal.pinpai == "debi") {
            this.webback.active = false
        }
        this.tempTime = 0;
        this.state = 0;
        this.info = "资源加载中";
        this.progress = 0
        this.progressnode.node.active = false
        if (!cc.isBrowser && (!appGlobal.apkVersion || appGlobal.apkVersion == '1.0.0')) {
            gHandler.logMgr.log('获取安装包固定信息失败')
            let appversionname = gHandler.Reflect && gHandler.Reflect.getAppVersion()
            if (appversionname && appversionname != "") {
                appGlobal.apkVersion = appversionname
            } else {
                gHandler.logMgr.log("获取本地安装包版本失败");
                appGlobal.apkVersion = '1.0.0';
            }
        } else {
            gHandler.logMgr.log('getHqqPackageInfo 从app获得的品牌和环境', gHandler.Reflect.getHqqPackageInfo())
        }
        let hallversion = "   V:" + (gHandler.localStorage.getGlobal().versionKey || "1.0.0")
        this.apkversion.string = "App:" + appGlobal.apkVersion + hallversion;

        if (gHandler.appGlobal.idDownApk) {
            this.downapklabel.active = false
            this.onclickDownApk()
            return
        }
        this.register()
        this.layer.active = true;

        if (cc.sys.platform == cc.sys.MOBILE_BROWSER || cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
            this.cocosWebOrientationChange()
            this.downapklabel.active = false
            let url = window.location.search;
            if (url.includes("params=")) { // 第三方加密链接
                gHandler.isOtherGame = true
                this.getPrivateKey()
            } else { // 本地生成的简单链接
                if (url.includes("?")) {
                    let strs = url.split("?")[1].split("&");
                    for (let i = 0; i < strs.length; i++) {
                        let temp = strs[i].split("=")[1];
                        if (strs[i].split("=")[0] == "acconunt") {
                            gHandler.webAcconunt = temp;
                        } else if (strs[i].split("=")[0] == "deviceid") {
                            gHandler.webDeviceid = temp;
                        } else if (strs[i].split("=")[0] == "token") {
                            gHandler.webToken = temp;
                        }
                        console.log(temp)
                    }
                    if (!gHandler.localStorage.globalGet("noShowIosWebTip")) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showIosWebTip, null) // ios 网页提示添加桌面
                    }
                }
                this.runApplogin()
            }
        } else {
            this.runApplogin()
        }
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {

    },
    register() {
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheckup, "loading", this.hotCheckup.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFail, "loading", this.hotFail.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotProgress, "loading", this.progressCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFinish, "loading", this.hotFinish.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheck, "loading", this.hotCheck.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showLoadingInfo, "loading", this.showLoadingInfo.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.refreshLoading, "loading", this.refreshLoading.bind(this))
    },
    runApplogin() {
        try {
            let appLogin = require("appLogin")
            gHandler.loginMgr = appLogin;
            gHandler.loginMgr.init({
                mainmanifest: this.mainmanifest,
                hallmanifest: this.hallmanifest,
                paymanifest: this.paymanifest,
                proxymanifest: this.proxymanifest,
                IMmanifest: this.IMmanifest,
            })
        } catch (error) {
            gHandler.logMgr.logerror(error)
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLoadingInfo, "error:" + error)
        }
    },

    /**
     * @Description: 网页版旋转屏幕引擎函数修改
     */
    cocosWebOrientationChange() {
        cc.view.oldfuncinit = cc.view._initFrameSize
        cc.view._initFrameSize = () => {
            var locFrameSize = cc.view._frameSize;
            var w = cc.game.frame.clientWidth;
            var h = cc.game.frame.clientHeight;
            var isLandscape = w >= h;
            if (CC_EDITOR ||
                (isLandscape && cc.view._orientation & cc.macro.ORIENTATION_LANDSCAPE) ||
                (!isLandscape && cc.view._orientation & cc.macro.ORIENTATION_PORTRAIT)) {
                locFrameSize.width = w;
                locFrameSize.height = h;
                cc.game.container.style['-webkit-transform'] = 'rotate(0deg)';
                cc.game.container.style.transform = 'rotate(0deg)';
                cc.view._isRotated = false;
            } else {
                locFrameSize.width = h;
                locFrameSize.height = w;
                let x = ((h + w) / 2 - h) + 0.5
                let y = w * 3 / 4 + 42
                cc.game.container.style['-webkit-transform'] = 'rotate(-90deg)';
                cc.game.container.style.transform = 'rotate(-90deg)';
                cc.game.container.style['-webkit-transform-origin'] = '-' + x + 'px ' + y + 'px' + ' 0px';
                cc.game.container.style.transformOrigin = '-' + x + 'px ' + y + 'px';
                cc.view._isRotated = true;
            }
            if (cc.view._orientationChanging) {
                setTimeout(function () {
                    cc.view._orientationChanging = false;
                }, 1000);
            }
        }
        cc.view.oldconvertToLocationInView = cc.view.convertToLocationInView
        cc.view.convertToLocationInView = (tx, ty, relatedPos, out) => {
            let result = out || cc.v2();
            let x = cc.view._devicePixelRatio * (tx - relatedPos.left);
            let y = cc.view._devicePixelRatio * (relatedPos.top + relatedPos.height - ty);
            if (cc.view._isRotated) {
                result.x = y;
                result.y = cc.game.canvas.height - x;
            } else {
                result.x = x;
                result.y = y;
            }
            return result;
        }
    },
    getAccess(privateKey) {
        let callback = (data) => {
            if (data.code != 200) {
                console.log('getAccess error', data)
                return
            }
            var decrypt = new JSEncrypt();
            decrypt.setPrivateKey(privateKey);
            var uncrypted = decrypt.decrypt(data.data.split('=')[1]);
            console.log("uncrypted", uncrypted)
            uncrypted = JSON.parse(uncrypted)
            console.log("uncrypted.account", uncrypted.account)
            console.log("uncrypted.password", uncrypted.password)
            console.log("uncrypted.device_id", uncrypted.device_id)
            console.log("uncrypted.superior_agent", uncrypted.superior_agent)
            gHandler.webAcconunt = uncrypted.account
            gHandler.webAcconuntPass = uncrypted.password
            gHandler.webDeviceid = uncrypted.device_id
            gHandler.webUpAgent = uncrypted.superior_agent
            if (!gHandler.localStorage.globalGet("noShowIosWebTip")) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showIosWebTip, null) // ios 网页提示添加桌面
            }
        }
        let failcallback = (status) => {
            console.log("getAccess failcallback", status)
        }
        gHandler.http.sendXMLHttpRequest({
            method: "POST",
            urlto: "http://agpe.539316.com//b2b/api/agent/access",
            param: {
                platform: 1000,
                token: 1000,
                gameId: "a",
                params: ""
            },
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
        });
    },
    getPrivateKey() {
        let hasreceive = false
        let callback = (data) => {
            if (hasreceive) {
                return
            }
            hasreceive = true
            this.browserDeal(data)
        }
        let failcallback = (status) => {
            console.log("getPrivateKey failcallback", status)
        }
        let urllist = ["http://agpe.539316.com"]
        if (gHandler.appGlobal.huanjin == 'dev') {
            urllist = ["http://agpe.539316.com"]
        } else if (gHandler.appGlobal.huanjin == 'pre') {
            urllist = [
                "https://agpe.lymrmfyp.com",
                "https://agpe.tampk.club",
            ]
        } else {
            urllist = [
                "https://agpe1.ahdmzx.com",
                "https://agpe2.henanjiaze.com",
                "https://agpe.ahdmzx.com",
                "https://agpe.henanjiaze.com",
            ]
        }
        for (let i = 0; i < urllist.length; i++) {
            gHandler.http.sendXMLHttpRequest({
                method: "GET",
                urlto: urllist[i] + "//b2b/api/agent/getDecryptionKey?token=982083",
                param: null,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: false,
                timeout: 5000,
                failtimeout: 7000,
            });
        }
    },
    getPublicKey() {
        let callback = (data) => {
            // console.log("getPubliceKey", data)
        }
        let failcallback = (status) => {
            console.log("getPublicKey failcallback", status)
        }
        let url = "http://agpe.539316.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        if (gHandler.appGlobal.huanjin == 'dev') {
            url = "http://agpe.539316.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        } else if (gHandler.appGlobal.huanjin == 'pre') {
            url = "https://agpe.lymrmfyp.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        } else {

        }
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: url,
            param: null,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: false,
            timeout: 5000,
            failtimeout: 7000,
        });
    },
    /**
     * @Description: web端需要做的处理
     */
    browserDeal(privateKey) {
        let url = window.location.search;
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        var uncrypted = decrypt.decrypt(url.split('=')[1]);
        uncrypted = JSON.parse(uncrypted)
        console.log("uncrypted.account", uncrypted.account)
        console.log("uncrypted.password", uncrypted.password)
        console.log("uncrypted.device_id", uncrypted.device_id)
        console.log("uncrypted.superior_agent", uncrypted.superior_agent)
        console.log("uncrypted.game_id", uncrypted.game_id)
        gHandler.webAcconunt = uncrypted.account
        gHandler.webAcconuntPass = uncrypted.password
        gHandler.webDeviceid = uncrypted.device_id
        gHandler.webUpAgent = uncrypted.superior_agent
        gHandler.webGameID = uncrypted.game_id
        this.runApplogin()
    },
    completeListener() {
        this.debistartAni.setCompleteListener(null)
        this.layer.active = true;
        if (gHandler.gameGlobal.isdev) {
            cc.director.loadScene('hall')
        } else {
            let appLogin = require("appLogin")
            gHandler.loginMgr = appLogin;
            gHandler.loginMgr.init({
                hallmanifest: this.hallmanifest,
            })
        }
    },
    // 清除本地缓存及可读写路径
    clearLocalData() {
        let islocalstorageClear = false
        if (gHandler.localStorage) {
            islocalstorageClear = gHandler.localStorage.clear()
            if (gHandler.appGlobal.huanjin == 'dev') {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "删除本地缓存", islocalstorageClear)
            }
        }
        if (cc.sys.isBrowser) {
            return
        }
        let directory = jsb.fileUtils.getWritablePath()
        let isok = jsb.fileUtils.removeDirectory(directory)
        return isok
    },
    onclickDownApk() {
        if (!this.isapkdown) {
            this.isapkdown = true
            if (this.clearLocalData()) {
                if (gHandler.gameGlobal.player.account_name && gHandler.appGlobal.packageID && gHandler.gameGlobal.proxy.temp_host) {
                    gHandler.appDownUrl = gHandler.gameGlobal.proxy.temp_host + "?p=" + gHandler.appGlobal.packageID + "&u=" + gHandler.gameGlobal.player.account_name + "&m=" + gHandler.appGlobal.huanjin;
                    cc.sys.openURL(gHandler.appDownUrl)
                } else if (gHandler.appGlobal.packageID && gHandler.gameGlobal.proxy.temp_host) {
                    gHandler.appDownUrl = gHandler.gameGlobal.proxy.temp_host + "?p=" + gHandler.appGlobal.packageID + "&u=" + gHandler.appGlobal.getGeneralAgency() + "&m=" + gHandler.appGlobal.huanjin;
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 8 })
                } else {
                    if (gHandler.appGlobal.pinpai == "test") {
                        cc.sys.openURL("https://temp.wepic666.com?p=1&u=442619406")
                    } else if (gHandler.appGlobal.pinpai == "debi") {
                        cc.sys.openURL("https://temp.wepic666.com?p=2&u=770256905")
                    } else if (gHandler.appGlobal.pinpai == "xingba") {
                        cc.sys.openURL("https://temp.wepic666.com?p=3&u=811425071")
                    }
                    // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "下载链接错误")
                }
            }
        }
    },

    hotCheckup(bool, enname) {
        if (bool) { // 需要更新
            this.progressnode.node.active = true
            if (enname == "main") {
                this.info = "m更新检测"
            } else if (enname == "apk") {
                this.isapkdown = true
                this.info = "安装包更新检测"
            } else {
                this.info = enname + "更新检测"
            }
            this.label.string = this.info;
        } else {
            this.info = "更新检测失败"
        }
    },
    hotFail(enname) {
        if (enname == 'main') {
            gHandler.logMgr.log("m更新失败");
            this.info = "更新失败"
        } else if (enname == 'apk') {
            gHandler.logMgr.log("安装包下载失败");
            this.info = "下载失败"
            this.isapkdown = false
        } else {
            gHandler.logMgr.log(enname + "更新失败");
            this.info = "更新失败"
        }
        this.label.string = this.info;
    },
    progressCallback(progress, enname) {
        if (isNaN(progress)) {
            progress = 0;
        }
        if (!this.progressnode.node.active) {
            this.progressnode.node.active = true
        }
        this.progressnode.progress = progress
        progress = progress * 100
        progress += ""
        if (progress.includes(".")) {
            progress = progress.substring(0, progress.indexOf("."))
        }
        progress += "%"
        this.progress = progress
        if (enname == "main") {
            this.info = "m更新(更新过程中请勿退出)"
        } else if (enname == "apk") {
            this.info = "安装包更新"
        } else if (enname == "jiazai") {
            this.info = "游戏加载中..."
        } else {
            this.info = enname + "更新"
        }
        this.label.string = this.info + " " + this.progress;
    },
    hotFinish(enname) {
        this.info = "更新完成"
        this.label.string = this.info;
    },
    hotCheck(enname) {
        this.info = "更新后文件检测"
        this.label.string = this.info;
    },
    showLoadingInfo(info) {
        this.info = info
        this.label.string = this.info;
    },
    refreshLoading(info) {
        let str = this.apkversion.string
        this.apkversion.string += "\nip:" + info
    },

    /** 每帧调用一次 // called every frame */
    // update(dt) { },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    onDestroy() {
        gHandler.eventMgr.unregister(gHandler.eventMgr.showSamlllayer, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.showTip, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotCheckup, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFail, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotProgress, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFinish, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotCheck, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.showLoadingInfo, "loading")
        gHandler.eventMgr.unregister(gHandler.eventMgr.refreshLoading, "loading")
    },
});

