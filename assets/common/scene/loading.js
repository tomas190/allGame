/*
 * @Author: burt
 * @Date: 2019-07-27 16:57:02
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-06 18:28:21
 * @Description: 通用加载场景
 */
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
        test: cc.Node,
        debi: cc.Node,
        teststartAni: sp.Skeleton,
        debistartAni: sp.Skeleton,
        layer: cc.Node,
        downapklabel: cc.Node,
        apkversion: cc.Label,
        tippanelPrefab: cc.Prefab,
        smallsublayerPrefab: cc.Prefab,
        progressnode: cc.ProgressBar,
        label: cc.Label,
        hallmanifest: {
            type: cc.Asset,
            default: null
        }
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */ // " 开始游戏代码，loading界面加载 D/jswrapper"
    onLoad() {
        console.log("开始游戏代码，loading界面加载")
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
        gHandler.base64 = hqqBase64;
        gHandler.Reflect = myReflect;
        gHandler.http = hqqHttp;
        gHandler.eventMgr = hqqEvent.init();
        gHandler.commonTools = hqqCommonTools;
        gHandler.logMgr = hqqLogMgr.init();
        gHandler.viewCtr = hqqViewCtr.init();
        gHandler.localStorage = hqqLocalStorage.init();
        gHandler.audioMgr = hqqAudioMgr.init();
        if (gHandler.appGlobal.pinpai == 'test') {
            this.teststartAni.setAnimation(0, 'animation', true)
            this.test.active = true
            this.debi.active = false
        } else if (gHandler.appGlobal.pinpai == 'debi') {
            this.debistartAni.setCompleteListener(this.completeListener.bind(this))
            this.debistartAni.setAnimation(0, 'animation', false)
            this.test.active = false
            this.debi.active = true
        }

        this.tempTime = 0;
        this.state = 0;
        this.info = "资源加载中";
        this.progress = 0
        this.progressnode.node.active = false
        let appversionname = gHandler.Reflect && gHandler.Reflect.getAppVersion()
        let hallversion = "   V:" + (gHandler.localStorage.getGlobal().versionKey || "1.0.0")
        if (appversionname && appversionname != "") {
            this.apkversion.string = "App:" + appversionname + hallversion
        } else {
            this.apkversion.string = "App:" + (gHandler.localStorage.getGlobal().apkVersionKey || appGlobal.apkVersion) + hallversion;
        }

        if (gHandler.appGlobal.idDownApk) {
            this.downapklabel.active = false
            this.onclickDownApk()
            return
        }
        if (cc.sys.isBrowser) {
            this.browserDeal()
        }

        this.layer.active = true;
        if (gHandler.gameGlobal.isdev) {
            cc.director.loadScene('hall')
        } else if (gHandler.appGlobal.pinpai != 'debi') {
            let appLogin = require("appLogin")
            gHandler.loginMgr = appLogin;
            gHandler.loginMgr.init({
                hallmanifest: this.hallmanifest,
            })
        }
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheckup, "loading", this.hotCheckup.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFail, "loading", this.hotFail.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotProgress, "loading", this.progressCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFinish, "loading", this.hotFinish.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheck, "loading", this.hotCheck.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showLoadingInfo, "loading", this.showLoadingInfo.bind(this))
    },
    /**
     * @Description: web端需要做的处理
     */
    browserDeal() {
        let url = window.location.search;
        console.log("window.location.search", url);
        if (url.indexOf("?") != -1) {
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
        }
        if (!gHandler.localStorage.globalGet("noShowIosWebTip")) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showIosWebTip, null) // ios 网页提示添加桌面
        }
        // this.launchFullscreen(document.documentElement); // 整个网页 启动全屏
    },
    // 判断各种浏览器，找到正确的方法
    launchFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
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
                if (gHandler.gameGlobal.player.account_name && gHandler.appGlobal.remoteSeverinfo) {
                    let callback0 = (url) => {
                        gHandler.gameGlobal.proxy.temp_host = url;
                        gHandler.appDownUrl = url + "?p=" + gHandler.appGlobal.remoteSeverinfo.id + "&u=" + gHandler.gameGlobal.player.account_name + "&m=" + gHandler.gameGlobal.huanjin;
                        cc.sys.openURL(gHandler.appDownUrl)
                    }
                    gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.temp_host, null, "/checked", callback0)
                } else if (gHandler.appGlobal.remoteSeverinfo) {
                    let callback0 = (url) => {
                        gHandler.gameGlobal.proxy.temp_host = url;
                        gHandler.appDownUrl = url + "?p=" + gHandler.appGlobal.remoteSeverinfo.id + "&u=" + gHandler.appGlobal.getGeneralAgency() + "&m=" + gHandler.appGlobal.huanjin;
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showSamlllayer, { type: 8 })
                    }
                    gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.temp_host, null, "/checked", callback0)
                } else {
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "下载链接错误")
                }
            }
        }
    },

    showLoadingInfo(info) {
        this.info = info
        this.label.string = this.info;
    },

    hotCheckup(bool, enname) {
        if (bool) { // 需要更新
            this.progressnode.node.active = true
            if (enname == "hall") {
                this.info = "大厅更新"
            } else {
                this.isapkdown = true
                this.info = "安装包更新"
            }
            this.label.string = this.info;
        } else {
        }
    },
    hotFail(enname) {
        if (enname == 'hall') {
            gHandler.logMgr.log("大厅更新失败");
            this.info = "更新失败"
        } else {
            gHandler.logMgr.log("安装包下载失败");
            this.info = "下载失败"
            this.isapkdown = false
        }
        this.label.string = this.info;
    },
    progressCallback(progress, enname) {
        if (isNaN(progress)) {
            progress = 0;
        }
        this.progressnode.progress = progress
        progress = progress * 100
        progress += ""
        if (progress.indexOf(".") != -1) {
            progress = progress.substring(0, progress.indexOf("."))
        }
        progress += "%"
        this.progress = progress
        if (enname == "hall") {
            this.info = "大厅更新"
        } else {
            this.info = "安装包更新"
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
    },
});

