/*
 * @Author: burt
 * @Date: 2019-07-27 16:57:02
 * @LastEditors: burt
 * @LastEditTime: 2019-10-24 14:44:59
 * @Description: 通用加载场景
 */
let gHandler = require("gHandler");
let hqqLocalStorage = require("hqqLocalStorage");
let hqqLogMgr = require("hqqLogMgr");
let hqqHttp = require("hqqHttp");
let hqqCommonTools = require("hqqCommonTools");
let hqqEvent = require("hqqEvent");
// let appGlobal = require("appGlobal");
// let javaReflect = require("javaReflect");
// let ocReflect = require("ocReflect");
let hqqViewCtr = require("hqqViewCtr")

cc.Class({
    extends: cc.Component,

    properties: {
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

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        console.log("开始游戏代码，loading界面加载")
        // if (cc.sys.platform === cc.sys.ANDROID && cc.sys.os === cc.sys.OS_ANDROID) {
        //     gHandler.appGlobal = appGlobal.init(0);
        //     gHandler.Reflect = javaReflect;
        // } else if (cc.sys.platform === cc.sys.IPHONE && cc.sys.platform === cc.sys.IPAD && cc.sys.os === cc.sys.OS_IOS) {
        //     gHandler.appGlobal = appGlobal.init(1);
        //     gHandler.Reflect = ocReflect;
        // } else if (cc.sys.platform === cc.sys.WIN32 && cc.sys.os === cc.sys.OS_WINDOWS) {
        //     gHandler.appGlobal = appGlobal.init(2);
        // } else {
        //     gHandler.appGlobal = appGlobal.init(-1);
        // }
        gHandler.http = hqqHttp;
        gHandler.eventMgr = hqqEvent.init();
        gHandler.commonTools = hqqCommonTools;
        gHandler.logMgr = hqqLogMgr.init();
        gHandler.viewCtr = hqqViewCtr.init();
        gHandler.localStorage = hqqLocalStorage.init();

        this.tempTime = 0;
        this.state = 0;
        this.info = "资源加载中";
        this.progress = 0
        this.progressnode.node.active = false
        if (gHandler.gameGlobal.isdev) {
            cc.director.loadScene('hall')
        } else {
            let appLogin = require("appLogin")
            gHandler.loginMgr = appLogin;
            gHandler.loginMgr.init({
                hallmanifest: this.hallmanifest,
            })
        }
        this.apkversion.string = gHandler.localStorage.getGlobal().apkVersionKey || "1.0.0"
    },

    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheckup, "loading", this.hotCheckup.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFail, "loading", this.hotFail.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotProgress, "loading", this.progressCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFinish, "loading", this.hotFinish.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showLoadingInfo, "loading", this.showLoadingInfo.bind(this))
    },

    showLoadingInfo(info) {
        this.info = info
        this.label.string = this.info;
    },

    hotCheckup(bool, enname) {
        if (bool) { // 需要更新
            this.progressnode.node.active = true
            if (enname == "apk") {
                this.info = "apk更新"
            } else {
                this.info = "大厅更新"
            }
            this.label.string = this.info;
        } else {
        }
    },
    hotFail(enname) {
        gHandler.logMgr.log("hall download fail");
        this.info = "更新失败"
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
        this.label.string = this.info + " " + this.progress;
    },
    hotFinish(enname) {
        this.info = "更新完成"
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
        gHandler.eventMgr.unregister(gHandler.eventMgr.showLoadingInfo, "loading")
    },
});

