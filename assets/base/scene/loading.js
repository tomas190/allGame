
cc.Class({
    extends: cc.Component,

    properties: {
        hallmanifest: {
            type: cc.Asset,
            default: null
        },
    },

    onLoad() {
        this.initHQQ()
        this.UILoad()

        this.tempTime = 0;
        this.state = 0;
        this.info = "";
        this.progress = 0
        if (!cc.isBrowser && (!hqq.app.apkVersion || hqq.app.apkVersion == '1.0.0')) {
            !hqq.isDebug && hqq.logMgr.log('获取安装包固定信息失败')
            let appversionname = hqq.reflect && hqq.reflect.getAppVersion()
            if (appversionname && appversionname != "") {
                hqq.app.apkVersion = appversionname
            } else {
                !hqq.isDebug && hqq.logMgr.log("获取本地安装包版本失败");
                hqq.app.apkVersion = '1.0.0';
            }
        } else {
            hqq.logMgr.log('getHqqPackageInfo 从app获得的品牌和环境', hqq.reflect.getHqqPackageInfo())
        }
        let mainversion = "   V:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
        let os = ""
        if (hqq.app.packageInfo) {
            os = hqq.app.packageInfo.system + ","
        }
        this.apkversion.getComponent(cc.Label).string = os + "App:" + hqq.app.apkVersion + mainversion;

        if (hqq.app.idDownApk) {
            this.onclickDownApk()
            return
        }
        this.register()
        // if (CC_DEBUG) {
        //     // hqq.subGameList = {
        //     // }
        // }
        // if(hqq.app.pinpai == "ninetwo"){
        //     this.setPinpaiRes()
        //     this.layer.active = false;
        //     return;
        // }
        if (cc.sys.platform == cc.sys.MOBILE_BROWSER || cc.sys.platform == cc.sys.DESKTOP_BROWSER) { // 浏览器
            this.cocosWebOrientationChange()
            this.layer.active = true;
            let url = window.location.search;
            if (url.includes("params=")) { // 第三方加密链接
                hqq.isOtherGame = true
                this.getPrivateKey()
            } else { // 本地生成的简单链接
                if (url.includes("?")) {
                    let strs = url.split("?")[1].split("&");
                    for (let i = 0; i < strs.length; i++) {
                        let temp = strs[i].split("=")[1];
                        if (strs[i].split("=")[0] == "acconunt") {
                            hqq.webAcconunt = temp;
                        } else if (strs[i].split("=")[0] == "deviceid") {
                            hqq.webDeviceid = temp;
                        } else if (strs[i].split("=")[0] == "token") {
                            hqq.webToken = temp;
                        }
                        cc.log(temp)
                    }
                    if (!hqq.localStorage.globalGet("noShowIosWebTip")) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showIosWebTip, null) // ios 网页提示添加桌面
                    }
                }
                this.setPinpaiRes()
                this.runApplogin()
            }
        } else if (hqq.app.pinpai != 'debi') {
            this.setPinpaiRes()
            this.layer.active = true;
            this.runApplogin()
        } else {
            this.setPinpaiRes()
            this.layer.active = false;
        }
        // hqq.eventMgr.dispatch(hqq.eventMgr.showLineChoiceLayer, {})
        // hqq.eventMgr.dispatch(hqq.eventMgr.showPerson, null)
        // hqq.eventMgr.dispatch(hqq.eventMgr.showNotice, null)
        // hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 6 })
        // hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 3)
        // hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 2)
        // hqq.eventMgr.dispatch(hqq.eventMgr.showNotice, null)
        // hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 8, msg: hqq.getTip("showtip68") })
    },

    start() {

    },
    // 初始化全局模块
    initHQQ() {
        let _global = typeof window === 'undefined' ? global : window;
        let gHandler = require("gHandler")
        _global.hqq = gHandler;
        hqq.languageTip = require("hqqLanguage")
        let hqqBase64 = require("hqqBase64");
        hqq.base64 = hqqBase64;
        let myReflect = require("myReflect");
        hqq.reflect = myReflect;
        let appGlobal = require("appGlobal");
        if (cc.sys.platform === cc.sys.ANDROID || cc.sys.os === cc.sys.OS_ANDROID) {
            hqq.app = appGlobal.init(0);
        } else if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.MACOS || cc.sys.platform === cc.sys.IPAD
            || cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) {
            hqq.app = appGlobal.init(0);
        } else if (cc.sys.platform === cc.sys.WIN32 || cc.sys.os === cc.sys.OS_WINDOWS) {
            hqq.app = appGlobal.init(2);
        } else {
            hqq.app = appGlobal.init(-1);
        }
        let iosReflect = require("iosReflect");
        hqq.iosReflect = new iosReflect();
        let hqqHttp = require("hqqHttp");
        hqq.http = hqqHttp;
        let hqqEvent = require("hqqEvent");
        hqq.eventMgr = hqqEvent.init();
        let hqqCommonTools = require("hqqCommonTools");
        hqq.commonTools = hqqCommonTools;
        let hqqLocalStorage = require("hqqLocalStorage");
        hqq.localStorage = hqqLocalStorage.init();
        let hqqLogMgr = require("hqqLogMgr");
        hqq.logMgr = hqqLogMgr.init();
        let hqqViewCtr = require("hqqViewCtr")
        hqq.viewCtr = hqqViewCtr.init();
        let hqqAudioMgr = require("hqqAudioMgr");
        hqq.audioMgr = hqqAudioMgr.init();
    },
    UILoad() {
        if(!cc.isValid(this.node)){
            console.log("loading UILoad 节点不存在")
            return;
        }
        let background = cc.find("Canvas/background")
        this.layer = cc.find("Canvas/layer")
        this.progressnode = cc.find("Canvas/layer/progress")
        this.progressBar = this.progressnode.getComponent(cc.ProgressBar)
        this.apkversion = cc.find("Canvas/layer/apkversion")
        this.label = cc.find("Canvas/layer/layoutnode/infolabel").getComponent(cc.Label)
        this.bg = cc.find("Canvas/brandnode/bg")
        this.ani = cc.find("Canvas/brandnode/ani").getComponent(sp.Skeleton)
        if (hqq.app.pinpai == "xinhao") {
            hqq.setSprite(background, { path: "bigimg/xinhao/logo_hj" })
            hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if (hqq.app.pinpai == "fuxin" ) {
            hqq.setSprite(background, { path: "bigimg/fuxin/bg" })
            hqq.setSprite(this.progressnode, { path: "base/fuxin/img/jd1", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/fuxin/img/jd2" })
        } else if (hqq.app.pinpai == "xingui") {
            hqq.setSprite(background, { path: "bigimg/xingui/back" })
            hqq.addNode(background, { path: "base/language/" + hqq.language + "/xingui/logo", widget: { top: 70, left: 10 } })
            hqq.setSprite(this.progressnode, { path: "base/xingui/img/progressback", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/xingui/img/progress" })
        } else if (hqq.app.pinpai == "xinsheng") {
            hqq.setSprite(background, { path: "bigimg/xinsheng/back" })
            hqq.setSprite(this.progressnode, { path: "base/xinsheng/img/panel1", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/xinsheng/img/panel" })
        } else if (hqq.app.pinpai == "xinlong") {
            hqq.setSprite(background, { path: "bigimg/xinlong/xl_loading3" })
            hqq.setSprite(this.progressnode, { path: "base/xinsheng/img/panel1", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/xinsheng/img/panel" })
        } else if (hqq.app.pinpai == "huangshi") {
            hqq.setSprite(background, { path: "bigimg/huangshi/bg" })
            hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if (hqq.app.pinpai == "juding") {
            hqq.setSprite(background, { path: "bigimg/juding/loading" })
            hqq.setSprite(this.progressnode, { path: "base/juding/img/jd1", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/juding/img/jd2" })
        } else if (hqq.app.pinpai == "huaxing") {
            hqq.setSprite(background, { path: "bigimg/huaxing/bg" })
            hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if (hqq.app.pinpai == "ninetwo") {
            hqq.setSprite(background, { path: "bigimg/ninetwo/beijingtu" })
            hqq.setSprite(this.progressnode, { path: "base/ninetwo/img/loading_bar", active: false , y:-343})
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/ninetwo/img/shang" })
            this.progressicon = hqq.addNode(this.progressnode, { path: "base/ninetwo/img/touzi", x:-385.5 })
            
            let canvas = cc.find("Canvas");
            let scalex = cc.view.getVisibleSize().width / 1334;
            let scaley = cc.view.getVisibleSize().height / 690;
            if(scalex < scaley ){
                scalex = scaley;
            }
            // this.ninetwovideo = cc.find("Canvas/92video").getComponent(cc.WebView);
            // this.ninetwovideo.node.active = true;
            // let webviewEventHandler = new cc.Component.EventHandler();
            // webviewEventHandler.target = this.node;
            // webviewEventHandler.component = "loading";
            // webviewEventHandler.handler = "onWebviewEvent";
            // cc.log("this.ninetwovideo=",this.ninetwovideo)
            // this.ninetwovideo.webviewEvents.push(webviewEventHandler);
            // this.ninetwovideo.url = "https://web_static.539316.com/";
            this.video = hqq.addNode(canvas,{videopath:"base/ninetwo/92mv",width:1334*scalex,height:690*scalex,callback: "videocompleteListener", script: this})
            this.video.active = false;
            // this.videotimeout = setTimeout(() => {
            //     this.videocompleteListener( this.video , cc.VideoPlayer.EventType.CLICKED );
            // }, 16 * 1000 );
        } else if (hqq.app.pinpai == "chaofan") {
            hqq.setSprite(background, { path: "bigimg/chaofan/jiaz" })
            hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if(hqq.app.pinpai == "tianqi") {
            hqq.setSprite(background, { path: "bigimg/tianqi/loading" })
            hqq.setSprite(this.progressnode, { path: "base/tianqi/img/ditiao", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/tianqi/img/shangitap" })
            let barEff = new cc.Node();
            barEff.name = "tianqi_barEff";
            let barEff_widget = barEff.addComponent(cc.Widget);
            this.progressnode.getChildByName('bar').addChild(barEff);
            hqq.setSprite(barEff, { path: "base/tianqi/img/loading_light"});
            barEff_widget.target = barEff_widget.node.parent;
            barEff_widget.isAlignTop = true; 
            barEff_widget.isAlignRight  = true; 
            barEff_widget.right = 0;
            barEff_widget.top = -26;
            barEff.scalex = 1;
            barEff.scaley = 0.8;
            barEff.setPosition(0, 0);
            barEff.active = false;
        } else if(hqq.app.pinpai == "wansheng") {
            hqq.setSprite(background, { path: "bigimg/wansheng/loading" })
            hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
            this.label.node.color = cc.color("#350058");
            this.apkversion.color = cc.color("#350058");
        } else {
            hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
            if (hqq.app.pinpai != "debi") {
                hqq.setSprite(background, { path: "bigimg/language/" + hqq.language + "/web_loading" })
            }
        }
    },

    onWebviewEvent(webview, eventType) {
        // if (eventType === cc.WebView.EventType.LOADED) {
        //     console.log("=======尝试播放影片")
        //     this.ninetwovideo.evaluateJS(`javascript:(function() { var videos = document.getElementsByTagName(‘video’); for(var i=0;i<videos.length;i ){videos[i].play();}})()`);
        // }
    },

    // 注册事件
    register() {
        hqq.eventMgr.register(hqq.eventMgr.hotCheckup, "loading", this.hotCheckup.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFail, "loading", this.hotFail.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotProgress, "loading", this.progressCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFinish, "loading", this.hotFinish.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotCheck, "loading", this.hotCheck.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showLoadingInfo, "loading", this.showLoadingInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.refreshLoading, "loading", this.refreshLoading.bind(this))
    },
    // 登陆
    runApplogin() {
        try {
            let appLogin = require("appLogin")
            hqq.loginMgr = appLogin;
            hqq.loginMgr.init({
                hallmanifest: this.hallmanifest,
            })
        } catch (error) {
            hqq.logMgr.logerror(error)
            hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, "error:" + error)
        }
    },
    // 加载设置品牌logo资源
    setPinpaiRes() {
        if (hqq.app.pinpai != 'debi') {
            if (hqq.app.pinpai == "xinhao") {

            } else if (hqq.app.pinpai == "juding") {

            } else if (hqq.app.pinpai == "fuxin" ) {
                // hqq.setSprite(this.background, { path: "base/fuxin/bg" })
            } else if (hqq.app.pinpai == "xingui") {
                // hqq.setSprite(this.background, { path: "base/xingui/back" })
            } else if (hqq.app.pinpai == "xinsheng") {
                // hqq.setSprite(this.background, { path: "base/xinsheng/bigimg/back" })
            } else if (hqq.app.pinpai == 'xingba') {
                // hqq.setSprite(this.background, { path: "bigimg/language/" + hqq.language + "/web_loading" })
                hqq.setSprite(this.bg, { path: "bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai + "/xb_loading_bg" })
                // cc.resources.load("/base/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai + "/xb_loading_bg", cc.SpriteFrame, (err, frame) => {
                //     if (err) {
                //         cc.log(" 加载图片失败", err)
                //         return;
                //     }
                //     this.bg.spriteFrame = frame;
                // })
            } else {
                // hqq.setSprite(this.background, { path: "bigimg/language/" + hqq.language + "/web_loading" })
                hqq.setSprite(this.bg, { path: "bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai + "/test_loading_bg" })
                // cc.resources.load("/base/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai + "/test_loading_bg", cc.SpriteFrame, (err, frame) => {
                //     if (err) {
                //         cc.log(" 加载图片失败", err)
                //         return;
                //     }
                //     this.bg.spriteFrame = frame;
                // })
            }
        }
        if (hqq.app.pinpai == "fuxin" ) {
            let node = new cc.Node()
            let sprite = node.addComponent(cc.Sprite)
            cc.resources.load("base/language/" + hqq.language + "/fuxin/logo", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log(" 加载图片失败", err)
                    return;
                }
                if(cc.isValid(sprite))
                {
                    sprite.spriteFrame = frame;
                }
            })
            this.bg.addChild(node)
        } else if (hqq.app.pinpai == "xinsheng") {
            // let node = new cc.Node()
            // let sprite = node.addComponent(cc.Sprite)
            // cc.resources.load("base/language/" + hqq.language + "/xinsheng/brand", cc.SpriteFrame, (err, frame) => {
            //     if (err) {
            //         console.log(" 加载图片失败", err)
            //         return;
            //     }
            //     if(cc.isValid(sprite))
            //     {
            //         sprite.spriteFrame = frame;
            //     }
            // })
            // this.bg.addChild(node)
        } else if (hqq.app.pinpai == "juding") {
            let node = new cc.Node()
            let sprite = node.addComponent(cc.Sprite)
            cc.resources.load("base/language/" + hqq.language + "/juding/judinglogo", cc.SpriteFrame, (err, frame) => {
                if (err) {
                    cc.log(" 加载图片失败", err)
                    return;
                }
                if(cc.isValid(sprite))
                {
                    sprite.spriteFrame = frame;
                }
            })
            this.bg.addChild(node)
        } else if (hqq.app.pinpai == "ninetwo"){
            hqq.addNode(this.bg,{path:"base/ninetwo/img/yuan"})
        } else if (hqq.app.pinpai == "chaofan"){
            hqq.addNode(this.bg,{path:"base/chaofan/img/1"})
        } else if(hqq.app.pinpai == "tianqi") {
            cc.resources.loadDir("bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai, sp.SkeletonData, (err, Data) => {
                if (err) {
                    cc.log("加载骨骼动画失败", err)
                    return;
                }
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].__classname__ == "sp.SkeletonData") {
                        this.ani.skeletonData = Data[i];
                        this.ani.setAnimation(0, "ani_enter", false);
                        this.ani.setCompleteListener(function() {
                            this.ani.setAnimation(0, "ani_loop", true);
                        }.bind(this));
                    }
                }
            });

        } else if(hqq.app.pinpai == "wansheng") {
            hqq.addNode(this.bg,{path:"base/wansheng/wansheng_logo", scale:1.8, widget:{top: 30, right: 30}});
        } else {
            cc.resources.loadDir("bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai, sp.SkeletonData, (err, Data) => {
                if (err) {
                    cc.log("加载骨骼动画失败", err)
                    return;
                }
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].__classname__ == "sp.SkeletonData") {
                        this.ani.skeletonData = Data[i];
                        if (hqq.app.pinpai == 'debi') {
                            this.ani.setCompleteListener(this.completeListener.bind(this))
                            this.ani.setAnimation(0, "animation", false);
                        } else {
                            this.ani.setAnimation(0, "animation", true);
                        }
                    }
                }
            });
        }
    },
    completeListener() {
        this.ani.setCompleteListener(null);
        this.layer.active = true;
        if (hqq.isDebug) {
            cc.director.loadScene('hall')
        } else {
            this.runApplogin()
        }
    },
    videocompleteListener(videoplayer, eventType, customEventData) {
        if(!cc.isValid(this.node))return;
        if(eventType == cc.VideoPlayer.EventType.COMPLETED){
            if(cc.isValid(this.video)){
                this.video.destroy();
            }
            hqq.loginMgr.videoplayering = false;
            if(hqq.loginMgr.updatefininshed){
                hqq.loginMgr.jumpToNextScene();
            }
        } else if(eventType == cc.VideoPlayer.EventType.READY_TO_PLAY){
            if(cc.isValid( this.video ) ){
                this.video.getComponent(cc.VideoPlayer).play();
            }
        } else if(eventType == cc.VideoPlayer.EventType.CLICKED){
            if(cc.isValid(this.video)){
                this.video.destroy();
            }
            hqq.loginMgr.videoplayering = false;
            if(hqq.loginMgr.updatefininshed){
                hqq.loginMgr.jumpToNextScene();
            }
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

        // cc.view.setResizeCallback(function(){

        //     onRotateView()
        
        // })

        // function onRotateView(){
        //     let w = window.innerWidth

        //     let h = window.innerHeight
        //     cc.log("w=",w , " h=",h);
        //     if(h > w){  

        //         cc.game.container.style['-webkit-transform'] = 'rotate(-90deg)';

        //         cc.game.container.style.transform = 'rotate(-90deg)';

        //         setTimeout(function () {

        //             cc.game.container.style['margin'] = cc.view.getFrameSize().width + 'px 0px 0px';

        //         });

        //         cc.view.convertToLocationInView = function (tx, ty, relatedPos) {

        //             let result = cc.v2();

        //             let posLeft = relatedPos.adjustedLeft ? relatedPos.adjustedLeft : relatedPos.left;

        //             let posTop = relatedPos.adjustedTop ? relatedPos.adjustedTop : relatedPos.top;

        //             let x = this._devicePixelRatio * (tx - posLeft);

        //             let y = this._devicePixelRatio * (posTop + relatedPos.height - ty);

        //             if (this._isRotated) {

        //                 result.x = y;

        //                 result.y = cc.view.getViewportRect().height - x;

        //             }

        //             else {

        //                 result.x = x;

        //                 result.y = y;

        //             }

        //             return result;

        //         }

        //     }else{

        //         cc.view.convertToLocationInView = function (tx, ty, relatedPos) {

        //             let result = cc.v2();

        //             let posLeft = relatedPos.adjustedLeft ? relatedPos.adjustedLeft : relatedPos.left;

        //             let posTop = relatedPos.adjustedTop ? relatedPos.adjustedTop : relatedPos.top;

        //             let x = this._devicePixelRatio * (tx - posLeft);

        //             let y = this._devicePixelRatio * (posTop + relatedPos.height - ty);

        //             if (this._isRotated) {

        //                 result.x = cc.game.canvas.width - y;

        //                 result.y = x;

        //             }

        //             else {

        //                 result.x = x;

        //                 result.y = y;

        //             }

        //             return result;

        //         }

        //     }
        // }

        // onRotateView();
    },
    // 清除本地缓存及可读写路径
    clearLocalData() {
        let islocalstorageClear = false
        if (hqq.localStorage) {
            islocalstorageClear = hqq.localStorage.clear()
            if (hqq.app.huanjin == 'dev') {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip19"), islocalstorageClear)
            }
        }
        if (cc.sys.isBrowser) {
            return
        }
        let directory = jsb.fileUtils.getWritablePath()
        let isok = jsb.fileUtils.removeDirectory(directory)
        return isok
    },
    // 下载安装包
    onclickDownApk() {
        if (!this.isapkdown) {
            this.isapkdown = true
            if (this.clearLocalData()) {
                if (hqq.gameGlobal.player.account_name && hqq.app.packageID && hqq.gameGlobal.proxy.temp_host) {
                    hqq.app.downloadUrl = hqq.gameGlobal.proxy.temp_host + "?p=" + hqq.app.packageID + "&u=" + hqq.gameGlobal.player.account_name + "&m=" + hqq.app.huanjin;
                    cc.sys.openURL(hqq.app.downloadUrl)
                } else if (hqq.app.packageID && hqq.gameGlobal.proxy.temp_host) {
                    hqq.app.downloadUrl = hqq.gameGlobal.proxy.temp_host + "?p=" + hqq.app.packageID + "&u=" + hqq.app.getGeneralAgency() + "&m=" + hqq.app.huanjin;
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 8 })
                } else {
                    if (hqq.app.pinpai == "test") {
                        cc.sys.openURL("https://temp.wepic666.com?p=1&u=442619406")
                    } else if (hqq.app.pinpai == "debi") {
                        cc.sys.openURL("https://temp.wepic666.com?p=2&u=770256905")
                    } else if (hqq.app.pinpai == "xingba") {
                        cc.sys.openURL("https://temp.wepic666.com?p=3&u=811425071")
                    } else if (hqq.app.pinpai == "xinsheng") {
                        cc.sys.openURL("https://temp.wepic666.com?p=8&u=779681851")
                    } else if (hqq.app.pinpai == "xingui") {
                        cc.sys.openURL("https://temp.wepic666.com?p=9&u=800242589")
                    } else if (hqq.app.pinpai == "fuxin" ) {
                        cc.sys.openURL("https://temp.wepic666.com?p=10&u=250188151")
                    } else if (hqq.app.pinpai == "xinhao") {
                        cc.sys.openURL("https://temp.wepic666.com?p=11&u=341292395")
                    } else if (hqq.app.pinpai == "xinlong") {
                        cc.sys.openURL("https://temp.wepic666.com?p=12&u=736282263")
                    } else if (hqq.app.pinpai == "nineone"){
                        cc.sys.openURL("https://temp.wepic666.com?p=6&u=541999022")
                    } else if (hqq.app.pinpai == "huangshi"){
                        cc.sys.openURL("https://temp.wepic666.com?p=13&u=195201705")
                    } else if (hqq.app.pinpai == "juding"){
                        cc.sys.openURL("https://temp.wepic666.com?p=15&u=855395847")
                    } else if (hqq.app.pinpai == "huaxing"){
                        cc.sys.openURL("https://temp.wepic666.com?p=18&u=657592379")
                    } else if (hqq.app.pinpai == "ninetwo"){
                        cc.sys.openURL("https://temp.wepic666.com?p=16&u=186959995")
                    }
                }
            }
        }
    },
    // 获取账号信息
    getAccess(privateKey) {
        let callback = (data) => {
            if (data.code != 200) {
                cc.log('getAccess error', data)
                return
            }
            var decrypt = new JSEncrypt();
            decrypt.setPrivateKey(privateKey);
            var uncrypted = decrypt.decrypt(data.data.split('=')[1]);
            cc.log("uncrypted", uncrypted)
            uncrypted = JSON.parse(uncrypted)
            cc.log("uncrypted.account", uncrypted.account)
            cc.log("uncrypted.password", uncrypted.password)
            cc.log("uncrypted.device_id", uncrypted.device_id)
            cc.log("uncrypted.superior_agent", uncrypted.superior_agent)
            hqq.webAcconunt = uncrypted.account
            hqq.webAcconuntPass = uncrypted.password
            hqq.webDeviceid = uncrypted.device_id
            hqq.webUpAgent = uncrypted.superior_agent
            if (!hqq.localStorage.globalGet("noShowIosWebTip")) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showIosWebTip, null) // ios 网页提示添加桌面
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("getAccess failcallback", status)
        }
        hqq.http.sendXMLHttpRequest({
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
    // 获取密钥
    getPrivateKey() {
        let hasreceive = false
        let callback = (data) => {
            if (hasreceive) {
                return
            }
            hasreceive = true
            this.browserDeal(data)
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("getPrivateKey failcallback", status)
        }
        let urllist = ["http://agpe.539316.com"]
        if (hqq.app.huanjin == 'dev') {
            urllist = ["http://agpe.539316.com"]
        } else if (hqq.app.huanjin == 'pre') {
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
            hqq.http.sendXMLHttpRequest({
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
    // 获取公钥
    getPublicKey() {
        let callback = (data) => {
            // cc.log("getPubliceKey", data)
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("getPublicKey failcallback", status)
        }
        let url = "http://agpe.539316.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        if (hqq.app.huanjin == 'dev') {
            url = "http://agpe.539316.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        } else if (hqq.app.huanjin == 'pre') {
            url = "https://agpe.lymrmfyp.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        } else {

        }
        hqq.http.sendXMLHttpRequest({
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
    // web端需要做的处理
    browserDeal(privateKey) {
        let url = window.location.search;
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        var uncrypted = decrypt.decrypt(url.split('=')[1]);
        uncrypted = JSON.parse(uncrypted)
        cc.log("uncrypted.account", uncrypted.account)
        cc.log("uncrypted.password", uncrypted.password)
        cc.log("uncrypted.device_id", uncrypted.device_id)
        cc.log("uncrypted.superior_agent", uncrypted.superior_agent)
        cc.log("uncrypted.game_id", uncrypted.game_id)
        hqq.webAcconunt = uncrypted.account
        hqq.webAcconuntPass = uncrypted.password
        hqq.webDeviceid = uncrypted.device_id
        hqq.webUpAgent = uncrypted.superior_agent
        hqq.webGameID = uncrypted.game_id
        if(uncrypted.language){
            hqq.language = uncrypted.language
        }
        this.runApplogin()
    },
    // 更新检查
    hotCheckup(bool, enname,isfail=false) {
        if (bool) { // 需要更新
            this.progressnode.active = true
            if (enname == "hall") {
                this.info = hqq.getTip("showtip61")
            } else if (enname == "apk") {
                this.isapkdown = true
                this.info = hqq.getTip("showtip73")
            } else {
                this.info = enname + hqq.getTip("showtip74")
            }
            this.label.string = this.info;
        } else {
            this.info = hqq.getTip("showtip63")
        }
    },
    // 更新失败
    hotFail(enname) {
        if (enname == 'hall') {
            hqq.logMgr.log("m更新失败");
            this.info = hqq.getTip("showtip75")
        } else if (enname == 'apk') {
            hqq.logMgr.log("安装包下载失败");
            this.info = hqq.getTip("showtip76")
            this.isapkdown = false
        } else {
            hqq.logMgr.log(enname + "更新失败");
            this.info = hqq.getTip("showtip75")
        }
        this.label.string = this.info;
    },
    // 更新进度
    progressCallback(progress, enname) {
        if (isNaN(progress) || progress == 0) {
            return
        }
        if (!this.progressnode.active) {
            this.progressnode.active = true
        }
        this.progressBar.progress = progress
        progress = progress * 100
        progress += ""
        if (progress.includes(".")) {
            progress = progress.substring(0, progress.indexOf("."))
        }
        progress += "%"
        this.progress = progress

        let hallStr = "hall_" + hqq.app.pinpai;
        for(let i = 0; i < hqq.loginMgr.hallversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.hallversionList[i]){
                hallStr = "hall_test";
                break;
            }
        }

        let proxyStr = "proxy_" + hqq.app.pinpai;
        for(let i = 0; i < hqq.loginMgr.proxyversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.proxyversionList[i]){
                proxyStr = "proxy_test";
                break;
            }
        }
        if(hqq.app.pinpai === "debi"){
            proxyStr = "proxy_xingba";
        }

        let IMStr = "IM_test";
        for(let i = 0; i < hqq.loginMgr.IMversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.IMversionList[i]){
                IMStr = "IM_" + hqq.app.pinpai;
                break;
            }
        }

        let payStr = "pay_" + hqq.app.pinpai;
        for(let i = 0; i < hqq.loginMgr.payversionList.length;i++){
            if(hqq.app.pinpai == hqq.loginMgr.payversionList[i]){
                payStr = "pay_test";
                break;
            }
        }
        if(hqq.app.pinpai === "xinlong"){
            payStr = "pay_xinsheng";
        }

        if (enname == "hall") {
            this.info = hqq.getTip("showtip77")
        } else if (enname == "apk") {
            this.info = hqq.getTip("showtip60")
        } else if (enname == "jiazai") {
            this.info = hqq.getTip("showtip78")
        } else if(enname === hallStr ){
            this.info = hqq.getTip("showtip86")
        } else if(enname === payStr ){
            this.info = hqq.getTip("showtip89")
        } else if(enname === proxyStr ){
            this.info = hqq.getTip("showtip92")
        } else if(enname === IMStr ){
            this.info = hqq.getTip("showtip95")
        } else {
            this.info = enname + hqq.getTip("showtip79")
        }
        this.label.string = this.info + " " + this.progress;

        if(hqq.app.pinpai === "ninetwo" ){
            // console.log("this.progressBar.progress=",this.progressBar.progress)
            // this.ninetwovideo.evaluateJS(`setProgressBar(${JSON.stringify(this.progressBar.progress)})`);
            if(cc.isValid(this.progressicon)){
                this.progressicon.x = -385.5 + (this.progressBar.progress * this.progressnode.width);
            }
        }

        if(hqq.app.pinpai === "tianqi") {
            if(this.progressnode.getChildByName('bar').getChildByName('tianqi_barEff')) {
                let barEff_widget = this.progressnode.getChildByName('bar').getChildByName('tianqi_barEff').getComponent(cc.Widget);
                barEff_widget.updateAlignment();
                if(progress == 0 || progress == 1) {
                    barEff_widget.node.active = false;
                } else {
                    barEff_widget.node.active = true;
                }
            }
        }
    },
    // 更新结束
    hotFinish(enname) {
        this.info = hqq.getTip("showtip80")
        this.label.string = this.info;
    },
    // 更新后检查
    hotCheck(enname) {
        this.info = hqq.getTip("showtip81")
        this.label.string = this.info;
    },
    // 显示加载信息
    showLoadingInfo(info) {
        if(info === "showChoiceLimeLayer" ){
            if(cc.isValid(this.video)){
                this.video.setPosition(5000,5000);
                this.video.getComponent(cc.VideoPlayer).mute = true;
                this.video.getComponent(cc.VideoPlayer).pause();
            }
            return;
        }else if(info === "closeChoiceLimeLayer" ){
            if(cc.isValid(this.video)){
                this.video.active = true;
                this.video.setPosition(0,0);
                this.video.getComponent(cc.VideoPlayer).mute = false;
                if(this.video.getComponent(cc.VideoPlayer).isPlaying()){
                    this.video.getComponent(cc.VideoPlayer).resume();
                } else{
                    this.video.getComponent(cc.VideoPlayer).play();
                }
            }
            return;
        }
        this.info = info
        this.label.string = this.info;
    },
    // 刷新ip地址信息
    refreshLoading(info, region, api) {
        this.apkversion.string += "\n" + api + ",ip:" + info + ",addr:" + region
    },

    // update (dt) {},
    onDestroy() {
        hqq.eventMgr.unregister(hqq.eventMgr.showSamlllayer, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.showTip, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheckup, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFail, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotProgress, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFinish, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheck, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.showLoadingInfo, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshLoading, "loading")
    },
});
