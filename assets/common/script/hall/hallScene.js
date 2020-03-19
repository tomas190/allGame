
let gHandler = require("gHandler");
let hallWebSocket = require("hallWebSocket");

cc.Class({
    extends: cc.Component,

    properties: {
        youkeicon: cc.Node, // 游客
        headimg: cc.Sprite, // 玩家头像
        namelabel: cc.Label, // 玩家昵称
        coinlabel: cc.Label, // 玩家金币

        gonggaobtn: cc.Node, // 公告按钮
        chatbtn: cc.Node, // 聊天按钮
        duihuanbtn: cc.Node, // 兑换按钮

        pageview: cc.PageView, // 活动页面
        pageviewchildren: [cc.Node],
        itembtn: cc.Node, // 子游戏按钮
        subgameview: cc.ScrollView, // 子游戏按钮缓动面板
        web: cc.WebView, // 网页
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        this.subGameBtnMap = {};
        this.subGameBtnArr = [];
        this.sgjsubload = false
        !gHandler.gameGlobal.isdev && this.getNotice();
        this.scheduleOnce(() => {
            this.startInit();
        }, 0)
        //网页版问题都处理完成前先屏蔽
        // if (cc.sys.os === cc.sys.OS_IOS) { // gHandler.appGlobal.huanjin == 'dev' ||
        //     if (!gHandler.localStorage.globalGet("isShowIosTip")) {
        //         gHandler.eventMgr.dispatch(gHandler.eventMgr.showIosTipLayer, {})
        //     }
        //     let btn2 = cc.find('Canvas/Main Camera/toppanel/btnpanel/btn_iosweb')
        //     btn2.active = true;
        // }
    },
    setButtonEffect(b) {
        if (b) {
            cc.Button.prototype.tocheEndClose = cc.Button.prototype._onTouchEnded
            cc.Button.prototype._soundon = true;
            cc.Button.prototype.setSoundEffect = function (on) {
                if (typeof on == 'undefined') {
                    this._soundon = true
                } else {
                    this._soundon = on
                }
            }
            cc.Button.prototype._onTouchEnded = function (event) {
                if (this.interactable && this.enabledInHierarchy && this._pressed && this._soundon) {
                    gHandler.audioMgr.playEffect("hallclick");
                }
                this.tocheEndClose(event);
            }
        } else {
            if (cc.Button.prototype.tocheEndClose) {
                cc.Button.prototype._onTouchEnded = cc.Button.prototype.tocheEndClose
            }
        }
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
        if (gHandler.hqqisShowFree) {
            gHandler.hqqisShowFree = false
            this.checkFastPayUrl(() => { // 测速后有返回了，再弹出绑定手机的界面
                if (gHandler.gameGlobal.player.phonenum == "") {
                    // if (gHandler.appGlobal.huanjin == "dev") return
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showRegister, null);
                }
            })
        }
    },
    startInit() { // 最先注册，及时监听来自子游戏的退出事件
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheckup, "hallScene", this.isupdataCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFail, "hallScene", this.failCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotProgress, "hallScene", this.progressCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotFinish, "hallScene", this.finishCallback.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotUp, "hallScene", this.setSubGameBtnUp.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotCheck, "hallScene", this.setSubGameBtnCheck.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.hotWait, "hallScene", this.setSubGameBtnUpWait.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.refreshPlayerinfo, "hallScene", this.setPlayerInfo.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.onReceiveBroadcast, "hallScene", this.onReceiveBroadcast.bind(this))
        this.setButtonEffect(true);
        gHandler.audioMgr.playBg("hallbg");
        this.huodonghongdian = cc.find('Canvas/Main Camera/toppanel/btnpanel/btn_huodong/redpoint')
        this.huodonghongdian && !gHandler.hallactivitybtn && (this.huodonghongdian.active = true);
        this.scheduleOnce(() => {
            this.addSubgame();
        }, 0)
    },
    /** 子游戏初始化 */
    addSubgame() {
        // let hs = (cc.view.getFrameSize().height / cc.view.getFrameSize().width) / (750 / 1334)
        let mscale = 1 // 1334 * hs / cc.view.getFrameSize().width
        this.subgameview.content.width = (Math.ceil(Object.getOwnPropertyNames(gHandler.gameConfig.gamelist).length / 2) * (this.itembtn.width + 15) + this.pageview.node.width + 25) * mscale;
        this.subgameview.content.x = -this.subgameview.node.width / 2
        // this.subgameview.content.scale = mscale
        for (let key in gHandler.gameConfig.gamelist) {
            let i = gHandler.gameConfig.gamelist[key].hallid;
            let tempdata = gHandler.gameConfig.gamelist[key];
            let itembtn = cc.instantiate(this.itembtn);
            itembtn.x = Math.floor(i / 2) * (this.itembtn.width + 15) + this.itembtn.width / 2 + 25 + this.pageview.node.width;
            itembtn.y = -i % 2 * (this.itembtn.height + 15) + this.itembtn.height / 2 + 8;
            itembtn.active = true;
            this.subgameview.content.addChild(itembtn);
            let namelabel = itembtn.getChildByName("nameimg").getComponent(cc.Sprite);
            namelabel.spriteFrame = gHandler.hallResManager.getHallBtnImg(tempdata.resid);
            let ani = itembtn.getChildByName("ani").getComponent('sp.Skeleton');
            ani.skeletonData = gHandler.hallResManager.getHallBtnAni(tempdata.resid);
            ani.animation = "animation";
            itembtn.downflag = itembtn.getChildByName('downFlag')
            itembtn.progress = itembtn.getChildByName('progress')
            itembtn.jiantou = itembtn.getChildByName('jiantou')
            itembtn.progresslabel = itembtn.getChildByName('progresslabel').getComponent(cc.Label)
            // itembtn.getChildByName("wait").active = false;
            if (key == "zjh" || key == "ddz" || key == "hwby") {
                itembtn.getChildByName("experience").active = true;
            }
            if (key == "hbld" || key == "brnn" || key == 'jbpby') {
                itembtn.getChildByName("hot").active = true;
            }
            this.subGameBtnMap[tempdata.enname] = itembtn;
            this.subGameBtnArr[tempdata.hallid] = itembtn;
            if (gHandler.hotUpdateMgr && gHandler.hotUpdateMgr.getSubGameIsOnUp(tempdata.enname)) { // 子游戏在更新列表中
                this.setSubGameBtnUpWait(tempdata.enname);
            } else if (!gHandler.gameGlobal.isdev) {
                this.checkSubGameDownload(tempdata.enname);
            } else {
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene";
                clickEventHandler.customEventData = tempdata.enname;
                itembtn.downflag.active = false;
                itembtn.progress.active = false;
                itembtn.jiantou.active = false;
                clickEventHandler.handler = "onClickSubgame";
                let button = itembtn.getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
        }
        this.scheduleOnce(() => {
            this.subGameBtnEffect()
            this.preRunAd()
        }, 0.5)
        this.scheduleOnce(() => {
            this.setPlayerInfo();
            this.checkSubModule();
        }, 0)
    },
    preRunAd() {
        this.oldposarr = []
        for (let i = 0; i < this.pageviewchildren.length; i++) {
            this.oldposarr[i] = this.pageviewchildren[i].getPosition()
        }
        this.oldPCP = this.pageview.content.getPosition()
        cc.PageView.m_handlePressLogic = cc.PageView._handlePressLogic
        cc.PageView.m_handleReleaseLogic = cc.PageView._handleReleaseLogic
        cc.PageView._handlePressLogic = function (touch) {
            if (this.getCurrentPageIndex() == 2) {
                this.content.stopAllActions()
            }
            this.m_handlePressLogic(touch)
        }
        cc.PageView._handleReleaseLogic = function (touch) {
            if (this.getCurrentPageIndex() == 2) {
                this._startBounceBackIfNeeded();
            } else {
                this.m_handleReleaseLogic(touch)
            }
        }
        this.schedule(this.adPageRun, 5)
    },
    adPageRun() {
        let child = this.pageviewchildren[0]
        let cur = this.pageview.getCurrentPageIndex()
        let PCP = this.pageview.content.getPosition()
        let posto = cc.v2(PCP.x - child.width, PCP.y)
        let action = cc.moveTo(1, posto)
        let n = 3.3 // cocos有自己内部的一套计算，这里只是调测出来的一个值
        action.easing(cc.easeOut(n))
        if (cur == 2) {
            child.x = this.oldposarr[cur].x + child.width
        }
        let callfunc0 = cc.callFunc(() => {
            this.pageview._curPageIdx = cur + 1 > 2 ? 0 : cur + 1
            if (this.pageview.indicator) {
                this.pageview.indicator._changedState();
            }
        }, this)
        let callfunc = cc.callFunc(() => {
            if (cur == 2) {
                this.pageview.content.setPosition(this.oldPCP)
                child.x = this.oldposarr[0].x
            }
        }, this)
        this.pageview.content.runAction(cc.sequence(action, callfunc0, callfunc))
    },
    /** 子模块更新检查 im，充提 */
    checkSubModule() {
        if (1 == gHandler.gameGlobal.imReceive) {
            this.chatbtn.getChildByName("redpoint").active = true;
        }
        if (1 == gHandler.gameGlobal.payReceive) {
            this.duihuanbtn.getChildByName("redpoint").active = true;
        }
        if (!gHandler.gameGlobal.isdev) {
            if (gHandler.gameGlobal.im_host == "") {
                gHandler.logMgr.time("最快的im地址")
                let callback = (url) => {
                    gHandler.logMgr.timeEnd("最快的im地址", url)
                    gHandler.gameGlobal.im_host = url;
                }
                gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.im_host, null, "/checked", callback)
            }
            if (gHandler.gameGlobal.proxy.temp_host == "") {
                gHandler.logMgr.time("最快的temp_host地址")
                let callback0 = (url) => {
                    gHandler.logMgr.timeEnd("最快的temp_host地址", url)
                    gHandler.gameGlobal.proxy.temp_host = url;
                }
                gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.temp_host, null, "/checked", callback0)
            }
            if (gHandler.gameGlobal.proxy.proxy_host == "") {
                gHandler.logMgr.time("最快的proxy_host地址")
                let callback1 = (url) => {
                    gHandler.logMgr.timeEnd("最快的proxy_host地址", url)
                    gHandler.gameGlobal.proxy.proxy_host = url;
                }
                gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.proxy_host, null, "/checked", callback1)
            }
        }
        this.scheduleOnce(() => {
            if (!gHandler.gameGlobal.isdev && !gHandler.hallWebSocket) {
                gHandler.hallWebSocket = new hallWebSocket();
                gHandler.hallWebSocket.init();
                let url = gHandler.appGlobal.server;
                if (url.indexOf("://") == -1) {
                    url = "ws://" + url;
                } else {
                    var socket = url.split("://")[1];
                    var header = url.split("://")[0];
                    var socketHeader = '';
                    if (header == "http") {
                        socketHeader = "ws://"
                    } else if (header == "https") {
                        socketHeader = "wss://"
                    }
                    url = socketHeader + socket;
                }
                gHandler.hallWebSocket.connect(url);
            }
            !gHandler.gameGlobal.isdev && this.sgjConnect()
            !gHandler.gameGlobal.isdev && this.hbslConnect()
            !gHandler.gameGlobal.isdev && this.hbldConnect()
        }, 0)
    },
    /**
     * @Description: 水果机奖金池连接
     */
    sgjConnect() {
        if (!gHandler.gameConfig.gamelist["sgj"]) {
            return
        }
        let subgamev = this.getRemoteSubgame(gHandler.gameConfig.gamelist["sgj"].game_id).version;
        let localsubv = gHandler.localStorage.get("sgj", "versionKey");
        let needup = false
        if (!localsubv) {
            needup = true;
        } else {
            let vA = subgamev.split('.');
            let vB = localsubv.split('.');
            for (let i = 0; i < vA.length; ++i) {
                let a = parseInt(vA[i]);
                let b = parseInt(vB[i] || 0);
                if (a != b) {
                    needup = true;
                    break;
                }
            }
            if (vB.length != vA.length) {
                needup = true;
            }
        }
        if (cc.sys.os == "Windows") { // 模拟器
            needup = false
        }
        if (!needup) {
            this.getSgjPool()
            if (!cc.director.getScheduler().isScheduled(this.getSgjPool, this)) {
                this.schedule(this.getSgjPool, 3)
            }
        }
    },
    getSgjPool() {
        let url = gHandler.gameConfig.gamelist["sgj"].serverUrl.replace("ws", "http") + "/jackpot"
        gHandler.http.sendRequestGet(url, null, this.showsgjPoolNum.bind(this))
    },
    showsgjPoolNum(data) {
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = gHandler.commonTools.formatGold(data);
        }
        if (this.subGameBtnMap["sgj"].getChildByName("goldlabel")) {
            this.subGameBtnMap["sgj"].getChildByName("goldlabel").getComponent(cc.Label).string = gold
        } else {
            let node = new cc.Node();
            let label = node.addComponent(cc.Label);
            label.font = gHandler.hallResManager.hbslnum
            label.fontSize = 28
            label.string = gold
            node.name = "goldlabel"
            node.setPosition(0, 68)
            this.subGameBtnMap["sgj"].addChild(node)
        }
    },
    /**
     * @Description: 红包扫雷奖金池连接
     */
    hbslConnect() {
        if (!gHandler.gameConfig.gamelist["hbsl"]) {
            return
        }
        let subgamev = this.getRemoteSubgame(gHandler.gameConfig.gamelist["hbsl"].game_id).version;
        let localsubv = gHandler.localStorage.get("hbsl", "versionKey");
        let needup = false
        if (!localsubv) {
            needup = true;
        } else {
            let vA = subgamev.split('.');
            let vB = localsubv.split('.');
            for (let i = 0; i < vA.length; ++i) {
                let a = parseInt(vA[i]);
                let b = parseInt(vB[i] || 0);
                if (a != b) {
                    needup = true;
                    break;
                }
            }
            if (vB.length != vA.length) {
                needup = true;
            }
        }
        if (cc.sys.os == "Windows") { // 模拟器
            needup = false
        }
        if (!needup) {
            this.getHbslPool()
            if (!cc.director.getScheduler().isScheduled(this.getHbslPool, this)) {
                this.schedule(this.getHbslPool, 3)
            }
        }
    },
    getHbslPool() {
        let url = gHandler.gameConfig.gamelist["hbsl"].serverUrl.replace("ws", "http") + "/jackpot"
        gHandler.http.sendRequestGet(url, null, this.showhbslPoolNum.bind(this))
    },
    showhbslPoolNum(data) {
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = gHandler.commonTools.formatGold(data);
        }
        if (this.subGameBtnMap["hbsl"].getChildByName("goldlabel")) {
            this.subGameBtnMap["hbsl"].getChildByName("goldlabel").getComponent(cc.Label).string = gold
        } else {
            let node = new cc.Node();
            let label = node.addComponent(cc.Label);
            label.font = gHandler.hallResManager.hbslnum
            label.fontSize = 28
            label.string = gold
            node.name = "goldlabel"
            node.setPosition(0, 68)
            this.subGameBtnMap["hbsl"].addChild(node)
        }
    },
    /**
     * @Description: hbld奖金池获取
     */
    hbldConnect() {
        if (!gHandler.gameConfig.gamelist["hbld"]) {
            return
        }
        let subgamev = this.getRemoteSubgame(gHandler.gameConfig.gamelist["hbld"].game_id).version;
        let localsubv = gHandler.localStorage.get("hbld", "versionKey");
        let needup = false
        if (!localsubv) {
            needup = true;
        } else {
            let vA = subgamev.split('.');
            let vB = localsubv.split('.');
            for (let i = 0; i < vA.length; ++i) {
                let a = parseInt(vA[i]);
                let b = parseInt(vB[i] || 0);
                if (a != b) {
                    needup = true;
                    break;
                }
            }
            if (vB.length != vA.length) {
                needup = true;
            }
        }
        if (cc.sys.os == "Windows") { // 模拟器
            needup = false
        }
        if (!needup) {
            this.getHbldPool()
            if (!cc.director.getScheduler().isScheduled(this.getHbldPool, this)) {
                this.schedule(this.getHbldPool, 3)
            }
        }
    },
    getHbldPool() {
        let url = gHandler.gameConfig.gamelist["hbld"].serverUrl.replace("ws", "http") + "/http/jackpot"
        gHandler.http.sendRequestGet(url, null, this.showhbldPoolNum.bind(this))
    },
    showhbldPoolNum(data) {
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = gHandler.commonTools.formatGold(data);
        }
        if (this.subGameBtnMap["hbld"].getChildByName("goldlabel")) {
            this.subGameBtnMap["hbld"].getChildByName("goldlabel").getComponent(cc.Label).string = gold
        } else {
            let node = new cc.Node();
            let label = node.addComponent(cc.Label);
            label.font = gHandler.hallResManager.hbslnum
            label.fontSize = 28
            label.string = gold
            node.name = "goldlabel"
            node.setPosition(0, 68)
            this.subGameBtnMap["hbld"].addChild(node)
        }
    },
    /**
     * @Description: 获取公告
     */
    getNotice() {
        if (gHandler.gameGlobal.noticeList.length > 0) {
            let isallread = true
            for (let i = 0; i < gHandler.gameGlobal.noticeList.length; i++) {
                if (gHandler.gameGlobal.noticeList[i].isread == 0) {
                    isallread = false
                    break
                }
            }
            if (!isallread) {
                this.gonggaobtn.getChildByName("redpoint").active = true;
                this.gonggaobtn.getChildByName("topbubble").active = true;
                gHandler.eventMgr.register(gHandler.eventMgr.refreshHallTips, "hallScene", this.setNoticeReadState.bind(this))
            }
            return
        }
        let callback = (data, url) => {
            // console.log("公告 callback", data)
            if (data.code == 200) {
                if (!data.msg || data.msg.length == 0) {
                    // console.log("没有公告需要显示")
                } else {
                    let deleteNotice = gHandler.localStorage.getGlobal().noticeDeleteKey
                    data.msg.sort((a, b) => a.sort - b.sort).forEach((e, i) => {
                        if (e.type === 2) { // type == 2 是公告 == 1 是活动  is_slider
                            let isdelete = false
                            if (deleteNotice) {
                                for (let j = 0; j < deleteNotice.length; j++) {
                                    if (deleteNotice[j] == e.create_time) {
                                        isdelete = true
                                        break
                                    }
                                }
                            }
                            if (!isdelete) {
                                let notice = {
                                    key: gHandler.gameGlobal.noticeList.length,
                                    isread: 0,
                                    type: e.type,
                                    title: e.title,
                                    words: e.words,
                                    create_time: e.create_time,
                                    end_time: e.end_time,
                                    start_time: e.start_time,
                                };
                                gHandler.gameGlobal.noticeList.push(notice)
                            }
                        }
                        if (e.is_slider === 1) { // 是否跑马灯
                            gHandler.gameGlobal.slideNoticeList.push({
                                time: 1,
                                rollforver: true,
                                notice: e.words.replace(/\s+/g, "")
                            })
                        }
                    })
                    if (gHandler.gameGlobal.noticeList.length > 0) {
                        this.gonggaobtn.getChildByName("redpoint").active = true;
                        this.gonggaobtn.getChildByName("topbubble").active = true;
                        gHandler.eventMgr.register(gHandler.eventMgr.refreshHallTips, "hallScene", this.setNoticeReadState.bind(this))
                        if (gHandler.hqqisShowNotice) {
                            gHandler.hqqisShowNotice = false
                            gHandler.eventMgr.dispatch(gHandler.eventMgr.showNotice, null)
                        }
                    }
                    if (gHandler.gameGlobal.slideNoticeList.length > 0) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.addSliderNotice, gHandler.gameGlobal.slideNoticeList)
                    }
                }
            }
        }
        let failcallback = (status) => {
        }
        let endurl = gHandler.appGlobal.getIpGetEndurl(4);
        gHandler.http.sendRequestIpGet(gHandler.appGlobal.server, endurl, callback, failcallback);
    },
    /**
     * @Description: 设置公告提示状态
     */
    setNoticeReadState(msg) {
        this.gonggaobtn.getChildByName("redpoint").active = !msg.hidenoticetip;
        this.gonggaobtn.getChildByName("topbubble").active = !msg.hidenoticetip;
    },
    /**
     * @Description: 设置玩家信息
     */
    setPlayerInfo(msg) {
        if (msg) {
            if (msg.game_nick) {
                this.namelabel.string = msg.game_nick;
            }
            if (msg.game_gold || msg.game_gold == 0) {
                this.coinlabel.string = msg.game_gold;
            }
            if (msg.game_img) {
                gHandler.commonTools.loadHeadRes(msg.game_img, this.headimg)
            }
            if (msg.phone_number) {
                this.youkeicon.active = false
            } else {
                this.youkeicon.active = true
            }
        } else {
            let player = gHandler.gameGlobal.player;
            this.namelabel.string = player.nick;
            this.coinlabel.string = gHandler.commonTools.formatGold(player.gold);
            gHandler.commonTools.loadHeadRes(player.headurl, this.headimg);
            if (gHandler.gameGlobal.player.phonenum != "") {
                this.youkeicon.active = false
            } else {
                this.youkeicon.active = true
            }
        }
    },

    /** 初始化后的按钮特效 */
    subGameBtnEffect() {
        this.pageview.node.runAction(cc.sequence(cc.scaleTo(0.1, 1.1), cc.scaleTo(0.1, 1)))
        for (let i = 0; i < this.subGameBtnArr.length; i += 2) {
            this.subGameBtnArr[i] && this.subGameBtnArr[i].runAction(cc.sequence(cc.delayTime((i + 1) * 0.02), cc.scaleTo(0.1, 1.1), cc.scaleTo(0.1, 1)))
            this.subGameBtnArr[i + 1] && this.subGameBtnArr[i + 1].runAction(cc.sequence(cc.delayTime((i + 1) * 0.02), cc.scaleTo(0.1, 1.1), cc.scaleTo(0.1, 1)))
        }
    },
    /**
     * @Description: 根据id获取服务器子游戏信息
     */
    getRemoteSubgame(game_id) {
        if (!gHandler.appGlobal || !gHandler.appGlobal.remoteGamelist) {
            return
        }
        let remotedata = gHandler.appGlobal.remoteGamelist[0];
        for (let i = 0; i < gHandler.appGlobal.remoteGamelist.length; i++) {
            if (game_id === gHandler.appGlobal.remoteGamelist[i].game_id) {
                remotedata = gHandler.appGlobal.remoteGamelist[i];
                break;
            }
        }
        return remotedata;
    },
    /** 判断子游戏是否下载更新等 */
    checkSubGameDownload(enname) {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "hallScene";
        clickEventHandler.customEventData = enname;
        let subdata = this.getRemoteSubgame(gHandler.gameConfig.gamelist[enname].game_id)
        if (subdata.open == 0) {
            this.subGameBtnMap[enname].getChildByName("wait").active = true;
            this.subGameBtnMap[enname].downflag.active = true;
            gHandler.gameConfig.gamelist[enname].isDown = false
        } else {
            // if (cc.sys.isBrowser) { // 浏览器
            //     this.subGameBtnMap[enname].downflag.active = false;
            //     this.subGameBtnMap[enname].progress.active = false;
            //     this.subGameBtnMap[enname].jiantou.active = false;
            //     clickEventHandler.handler = "onClickSubgame";
            //     let button = this.subGameBtnMap[enname].getComponent(cc.Button);
            //     button.clickEvents.push(clickEventHandler);
            //     return
            // }
            // if (cc.sys.os == "Windows") { // 模拟器
            //     this.subGameBtnMap[enname].downflag.active = false;
            //     this.subGameBtnMap[enname].progress.active = false;
            //     this.subGameBtnMap[enname].jiantou.active = false;
            //     clickEventHandler.handler = "onClickSubgame";
            //     let button = this.subGameBtnMap[enname].getComponent(cc.Button);
            //     button.clickEvents.push(clickEventHandler);
            //     return
            // }
            let subgamev = subdata.version;
            let localsubv = gHandler.localStorage.get(enname, "versionKey");
            if (enname == 'zrsx1' || enname == 'zrsx2') {
                localsubv = gHandler.localStorage.get('zrsx', "versionKey");
            }
            // let txt = "local version: " + localsubv + " | remote version:" + subgamev;
            let needup = false
            if (!localsubv) {
                needup = true;
            } else {
                let vA = subgamev.split('.');
                let vB = localsubv.split('.');
                for (let i = 0; i < vA.length; ++i) {
                    let a = parseInt(vA[i]);
                    let b = parseInt(vB[i] || 0);
                    if (a != b) {
                        needup = true;
                        break;
                    }
                }
                if (vB.length != vA.length) {
                    needup = true;
                }
            }
            if (needup && !cc.sys.isBrowser) {
                // console.log(txt + " | subgame : " + enname + " need update");
                gHandler.gameConfig.gamelist[enname].isDown = false
                this.subGameBtnMap[enname].downflag.active = true;
                this.subGameBtnMap[enname].progress.active = true;
                this.subGameBtnMap[enname].jiantou.active = true;
                clickEventHandler.handler = "downloadSubGame";
            } else {
                // console.log(txt + " | subgame : " + enname + " not need update")
                gHandler.gameConfig.gamelist[enname].isDown = true
                this.subGameBtnMap[enname].downflag.active = false;
                this.subGameBtnMap[enname].progress.active = false;
                this.subGameBtnMap[enname].jiantou.active = false;
                clickEventHandler.handler = "onClickSubgame";

                if (gHandler.appGlobal.isRelease) {
                    let subgamern = enname
                    if (enname == "zrsx1" || enname == "zrsx2") {
                        subgamern = "zrsx"
                        if (enname == "zrsx1") {
                            // !gHandler.gameGlobal.isdev && cc.sys.os != "Windows" && cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                            !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                                if (err) {
                                    return console.error(err);
                                }
                                // console.log('load subpackage script successfully.', subgamern);
                            });
                        }
                    } else {
                        // !gHandler.gameGlobal.isdev && cc.sys.os != "Windows" && cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                        !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            // console.log('load subpackage script successfully.', subgamern);
                        });
                    }
                }
            }
            let button = this.subGameBtnMap[enname].getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
    },
    /** 创建子游戏账号 */
    createSubAccount(enname, mcallback, custom) {
        if (gHandler.gameConfig.gamelist[enname].hasAccount) {
            // console.log("已经有账号了")
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
        let failcallback = (status, forcejump) => {
            console.log("创建子游戏账号 超时", status, forcejump)
        }
        let endurl = "/Game/User/createGameAccount";
        let data = {
            game_id: subdata.game_id,
            package_id: subdata.package_id,
            balance: 0,//gHandler.gameGlobal.player.gold,
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
        }
        // gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, failcallback); // 创建子游戏账号会有成功，但超时失败的情况，延长超时
        gHandler.http.sendRequestDetail({
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
     * @Description: 设置按钮状态为检测文件
     */
    setSubGameBtnCheck(enname) {
        if (enname == 'zrsx') {
            this.subGameBtnMap['zrsx1'].progresslabel.string = "检测";
            this.subGameBtnMap['zrsx2'].progresslabel.string = "检测";
        } else {
            this.subGameBtnMap[enname].progresslabel.string = "检测";
        }
    },
    /**
     * @Description: 设置子游戏按钮等待下载状态
     */
    setSubGameBtnUp(enname) {
        if (enname == "zrsx") {
            gHandler.gameConfig.gamelist['zrsx1'].isDown = false
            this.subGameBtnMap['zrsx1'].downflag.active = true;
            this.subGameBtnMap['zrsx1'].progress.active = true;
            this.subGameBtnMap['zrsx1'].jiantou.active = true;
            this.subGameBtnMap['zrsx1'].progresslabel.string = "";
            this.subGameBtnMap['zrsx1'].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap['zrsx1'].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap['zrsx1'].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene";
                clickEventHandler.customEventData = 'zrsx1';
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap['zrsx1'].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
            gHandler.gameConfig.gamelist['zrsx2'].isDown = false
            this.subGameBtnMap['zrsx2'].downflag.active = true;
            this.subGameBtnMap['zrsx2'].progress.active = true;
            this.subGameBtnMap['zrsx2'].jiantou.active = true;
            this.subGameBtnMap['zrsx2'].progresslabel.string = "";
            this.subGameBtnMap['zrsx2'].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap['zrsx2'].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap['zrsx2'].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene";
                clickEventHandler.customEventData = 'zrsx2';
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap['zrsx2'].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else {
            gHandler.gameConfig.gamelist[enname].isDown = false
            this.subGameBtnMap[enname].downflag.active = true;
            this.subGameBtnMap[enname].progress.active = true;
            this.subGameBtnMap[enname].jiantou.active = true;
            this.subGameBtnMap[enname].progresslabel.string = "";
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        }
    },
    /**
     * @Description: 设置子游戏按钮更新状态为等待
     */
    setSubGameBtnUpWait(subgamern) {
        if (subgamern == "zrsx") {
            this.subGameBtnMap["zrsx1"].progresslabel.getComponent(cc.Label).string = "等待";
            this.subGameBtnMap["zrsx2"].progresslabel.getComponent(cc.Label).string = "等待";
            this.subGameBtnMap["zrsx1"].jiantou.active = false;
            this.subGameBtnMap["zrsx2"].jiantou.active = false;
            this.subGameBtnMap["zrsx1"].downflag.active = true;
            this.subGameBtnMap["zrsx1"].progress.active = true;
            this.subGameBtnMap["zrsx2"].downflag.active = true;
            this.subGameBtnMap["zrsx2"].progress.active = true;
            this.subGameBtnMap["zrsx2"].progress.active = true;
            this.subGameBtnMap['zrsx1'].progress.getComponent(cc.ProgressBar).progress = 0;
            this.subGameBtnMap['zrsx2'].progress.getComponent(cc.ProgressBar).progress = 0;
        } else {
            this.subGameBtnMap[subgamern].downflag.active = true;
            this.subGameBtnMap[subgamern].progress.active = true;
            this.subGameBtnMap[subgamern].progress.getComponent(cc.ProgressBar).progress = 0;
            this.subGameBtnMap[subgamern].progresslabel.string = "等待";
            this.subGameBtnMap[subgamern].jiantou.active = false
        }
    },
    /** 下载子游戏 */
    downloadSubGame(event, enname) {
        event.target.getComponent(cc.Button).interactable = false
        this.scheduleOnce(function () {
            event.target.getComponent(cc.Button).interactable = true
        }, 0.5)
        let subgamern = enname
        if (enname == "zrsx1" || enname == "zrsx2") {
            subgamern = "zrsx"
        }
        let localsubv = gHandler.localStorage.get(subgamern, "versionKey") || null;
        let upstate = gHandler.hotUpdateMgr.checkUpdate({
            subname: subgamern,
            version: localsubv || "1.0.0",
        })
        if (upstate) {
            this.setSubGameBtnUpWait(subgamern)
        } else {
            if (subgamern == "zrsx") {
                this.subGameBtnMap["zrsx1"].progresslabel.string = "";
                this.subGameBtnMap["zrsx2"].progresslabel.string = "";
                this.subGameBtnMap["zrsx1"].jiantou.active = true
                this.subGameBtnMap["zrsx2"].jiantou.active = true
            } else {
                this.subGameBtnMap[subgamern].progresslabel.string = "";
                this.subGameBtnMap[subgamern].jiantou.active = true
            }
        }
    },

    isupdataCallback(bool, enname) {
        if (bool) { // 需要更新
            // 自动更新，无需处理
            if (enname == "zrsx") {
                this.subGameBtnMap["zrsx1"].downflag.active = true;
                this.subGameBtnMap["zrsx1"].progresslabel.string = "";
                this.subGameBtnMap["zrsx1"].jiantou.active = false;
                this.subGameBtnMap["zrsx1"].progress.active = true;
                this.subGameBtnMap["zrsx1"].progress.getComponent(cc.ProgressBar).progress = 0;
                this.subGameBtnMap["zrsx2"].downflag.active = true;
                this.subGameBtnMap["zrsx2"].progresslabel.string = "";
                this.subGameBtnMap["zrsx2"].jiantou.active = false;
                this.subGameBtnMap["zrsx2"].progress.active = true;
                this.subGameBtnMap["zrsx2"].progress.getComponent(cc.ProgressBar).progress = 0;
            } else {
                this.subGameBtnMap[enname].downflag.active = true;
                this.subGameBtnMap[enname].progresslabel.string = "";
                this.subGameBtnMap[enname].jiantou.active = false;
                this.subGameBtnMap[enname].progress.active = true;
                this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            }
        } else {
            gHandler.logMgr.log("本地实际版本与服务器版本相同，不需要更新")
            this.finishCallback(enname);
        }
    },
    /**
     * @description: 子游戏热更新失败
     */
    failCallback(enname) {
        gHandler.logMgr.log("子游戏", enname, "下载失败");
    },
    /**
     * @description: 下载进度
     */
    progressCallback(progress, enname) {
        if (isNaN(progress)) {
            progress = 0;
        }
        let mprogress = progress * 100
        mprogress += ""
        if (mprogress.indexOf(".") != -1) {
            mprogress = mprogress.substring(0, mprogress.indexOf("."))
        }
        mprogress += "%"
        if (enname == "zrsx") {
            this.subGameBtnMap['zrsx1'].downflag.active = true;
            this.subGameBtnMap['zrsx1'].jiantou.active = false;
            this.subGameBtnMap['zrsx1'].progress.active = true;
            this.subGameBtnMap["zrsx1"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["zrsx1"].progresslabel.string = mprogress

            this.subGameBtnMap['zrsx2'].downflag.active = true;
            this.subGameBtnMap['zrsx2'].jiantou.active = false;
            this.subGameBtnMap['zrsx2'].progress.active = true;
            this.subGameBtnMap["zrsx2"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["zrsx2"].progresslabel.string = mprogress
        } else {
            this.subGameBtnMap[enname].downflag.active = true;
            this.subGameBtnMap[enname].jiantou.active = false;
            this.subGameBtnMap[enname].progress.active = true;
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap[enname].progresslabel.string = mprogress
        }
    },
    /**
     * @description: 子游戏热更新结束
     */
    finishCallback(enname) {
        if (enname == "zrsx") {
            this.subGameBtnMap["zrsx1"].progress.active = false;
            this.subGameBtnMap["zrsx1"].downflag.active = false;
            this.subGameBtnMap["zrsx1"].progresslabel.string = ""
            this.subGameBtnMap["zrsx1"].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame";
            this.subGameBtnMap["zrsx2"].progress.active = false;
            this.subGameBtnMap["zrsx2"].downflag.active = false;
            this.subGameBtnMap["zrsx2"].progresslabel.string = ""
            this.subGameBtnMap["zrsx2"].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame";
            if (!gHandler.gameConfig.gamelist['zrsx1'].hasAccount && !gHandler.gameGlobal.isdev) {
                this.createSubAccount("zrsx1")
            }
        } else {
            this.subGameBtnMap[enname].progress.active = false;
            this.subGameBtnMap[enname].downflag.active = false;
            this.subGameBtnMap[enname].progresslabel.string = ""
            this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame";
            if (!gHandler.gameConfig.gamelist[enname].hasAccount && !gHandler.gameGlobal.isdev) {
                this.createSubAccount(enname)
            }
        }

        if (enname == 'sgj') {
            this.sgjConnect()
        } else if (enname == 'hbsl') {
            this.hbslConnect()
        } else if (enname == 'hbld') {
            this.hbldConnect()
        }
        if (gHandler.appGlobal.isRelease) {
            // !gHandler.gameGlobal.isdev && cc.sys.os != "Windows" && cc.loader.downloader.loadSubpackage(enname, (err) => {
            !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(enname, (err) => {
                if (err) {
                    return console.error(err);
                }
                // console.log('load subpackage script successfully.', enname);
            });
        }
    },
    // 跳转至子游戏场景
    jumpToSubGame(enname) {
        gHandler.audioMgr.stopBg();
        if (enname == "hbsl" || enname == 'zrsx1' || enname == 'zrsx2' || enname == 'pccp') { //  真人视讯 红包扫雷 派彩 竖屏
            gHandler.Reflect && gHandler.Reflect.setOrientation("portrait")
            if (enname == 'zrsx1') {
                gHandler.gameGlobal.subGameType = 22
            } else if (enname == 'zrsx2') {
                gHandler.gameGlobal.subGameType = 24
            }
        }
        cc.director.loadScene(gHandler.gameConfig.gamelist[enname].lanchscene);
    },
    /**
     * @description: 按钮点击后延时
     */
    clickDelay(event) {
        event.target.getComponent(cc.Button).interactable = false
        this.scheduleOnce(function () {
            event.target.getComponent(cc.Button).interactable = true
        }, 0.5)
    },
    /** 点击子游戏按钮统一回调 */
    onClickSubgame(event, enname) {
        this.clickDelay(event)
        let callback = () => {
            if (gHandler.gameGlobal.isdev) {
                this.jumpToSubGame(enname)
            } else if (gHandler.gameConfig.gamelist[enname].hasAccount) {
                this.jumpToSubGame(enname)
            } else {
                this.createSubAccount(enname, this.jumpToSubGame)
            }
        }
        // if (cc.sys.isBrowser) {
        callback()
        // } else {
        //     let subGameName = enname
        //     if (enname == 'zrsx1' || enname == 'zrsx2') {
        //         subGameName = 'zrsx'
        //     }
        //     let manifestpath = gHandler.hotUpdateMgr.getLocalManifestPath(subGameName)
        //     gHandler.hotUpdateMgr.checkSubGame(manifestpath, callback, { subname: subGameName })
        // }
    },
    /** 玩家设置 */
    onClickPlayerBtn(event) {
        // console.log("玩家设置")
        this.clickDelay(event)
        // if (gHandler.gameGlobal.isdev) return
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showPerson, null)
    },
    /** 充值 */
    onClickChongZhiBtn(event) {
        // console.log("充值")
        this.clickDelay(event)
        if (gHandler.gameGlobal.isdev) return
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showPayScene, "hall")
    },
    /**
     * @description: 批量创建子游戏账号
     */
    _creatSubAccount() {
        let mgameid = "569a62be7ff123m117d446aa"

        let sub = [
            691014351, 721199228, 957437641, 144461224, 597347745
        ]
        if (typeof this.tempindex == 'undefined') {
            this.tempindex = 0;
        }
        if (this.tempindex >= sub.length) {
            return
        }
        let account = sub[this.tempindex];
        let pass = "123456";

        let onReceiveLoginTemp = (token) => {
            let callback = (data) => {
                console.log("创建子游戏账号 callback", data)
                this._creatSubAccount()
            }
            let outcallback = () => {
                console.log("创建子游戏账号 超时")
            }
            let endurl = "/Game/User/createGameAccount";
            let data = {
                game_id: mgameid,
                package_id: 1,
                balance: gHandler.gameGlobal.player.gold,
                id: gHandler.gameGlobal.player.id,
                token: token,
            }
            gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
        }

        gHandler.hallWebSocket.unregister("/Game/Login/login", "hallScene")
        gHandler.hallWebSocket.close()
        let mcallback = (issucess, token) => {
            if (issucess) {
                console.log("切换账号成功", sub[this.tempindex])
                this.tempindex++
                onReceiveLoginTemp(token)
            } else {
                console.log("切换账号失败")
            }
        }
        gHandler.loginMgr.accountChange(account, pass, mcallback)
    },
    /**
     * @Description: 代理线路选择
     */
    checkFastProxyUrl(mcallback) {
        if (gHandler.gameGlobal.proxy.temp_host == "" || gHandler.gameGlobal.proxy.proxy_host == "") {
            gHandler.logMgr.time("最快的temp_host地址")
            let callback0 = (url) => {
                gHandler.logMgr.timeEnd("最快的temp_host地址", url)
                gHandler.gameGlobal.proxy.temp_host = url;
                if (gHandler.gameGlobal.proxy.proxy_host != "") {
                    mcallback && mcallback();
                }
            }
            gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.temp_host, null, "/checked", callback0)
            gHandler.logMgr.time("最快的proxy_host地址")
            let callback1 = (url) => {
                gHandler.logMgr.timeEnd("最快的proxy_host地址", url)
                gHandler.gameGlobal.proxy.proxy_host = url;
                if (gHandler.gameGlobal.proxy.temp_host != "") {
                    mcallback && mcallback();
                }
            }
            gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.proxy_host, null, "/checked", callback1)
        } else {
            mcallback && mcallback();
        }
    },
    /** 全民代理  */
    onClickQMDL(event) {
        console.log("全民代理")
        this.clickDelay(event)
        if (gHandler.gameGlobal.isdev) return
        let enterproxy = function () {
            if (gHandler.gameConfig.subModel.proxy.lanchscene != "") {
                cc.director.loadScene(gHandler.gameConfig.subModel.proxy.lanchscene)
            } else {
                console.log("请配置全民代理场景")
            }
        }
        this.checkFastProxyUrl(enterproxy.bind(this))
    },
    /** 公告 */
    onClickGongGaoBtn() {
        console.log("公告")
        // this._creatSubAccount()
        // return
        // clearInterval(gHandler.loginMgr.stableServerTest)
        // let urllist = gHandler.appGlobal.serverList
        // urllist.push('https://center.whjfxly66.com')
        // gHandler.loginMgr.requestStableServerUrl(urllist)
        // return
        if (gHandler.gameGlobal.isdev) return
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showNotice, null)
    },
    /** 聊天 */
    onClickChatBtn(event) {
        console.log("聊天")
        this.clickDelay(event)
        if (gHandler.gameGlobal.isdev) return
        if (gHandler.gameGlobal.im_host != "") {
            gHandler.gameGlobal.imReceive = 0;
            gHandler.Reflect && gHandler.Reflect.setOrientation("portrait")
            cc.director.loadScene(gHandler.gameConfig.subModel.im.lanchscene)
        }
    },
    // 最快的充提地址
    checkFastPayUrl(mcallback) {
        if (gHandler.gameGlobal.pay.pay_host == "") {
            gHandler.logMgr.time("最快的pay地址")
            let callback = (url) => {
                gHandler.logMgr.timeEnd("最快的pay地址", url)
                gHandler.gameGlobal.pay.pay_host = url;
                mcallback && mcallback();
            }
            gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host, null, "/checked", callback);
        } else {
            mcallback && mcallback();
        }
    },
    /** 跳转至充提场景 */
    jumpToCashScene() {
        if (gHandler.gameConfig.subModel.cash.lanchscene != "") {
            cc.director.loadScene(gHandler.gameConfig.subModel.cash.lanchscene)
        } else {
            console.log("请配置提现场景")
        }
    },
    /** 兑换 提现 */
    onClickDuiHuanBtn(event) {
        console.log("兑换")
        this.clickDelay(event)
        if (gHandler.gameGlobal.isdev) return
        this.checkFastPayUrl(this.jumpToCashScene.bind(this))
    },
    // 跳转至精彩活动场景
    jumpToPayActivityScene() {
        this.huodonghongdian && (this.huodonghongdian.active = false, gHandler.hallactivitybtn = true);
        if (gHandler.gameConfig.subModel.payActivity.lanchscene != "") {
            cc.director.loadScene(gHandler.gameConfig.subModel.payActivity.lanchscene)
        } else {
            console.log("请配置精彩活动场景")
        }
    },
    /** 精彩活动 */
    onClickHuoDongBtn(event) {
        console.log("精彩活动")
        if (gHandler.gameGlobal.isdev) return
        this.checkFastPayUrl(this.jumpToPayActivityScene.bind(this))
    },
    /** 活动页面 */
    onClickADPage(event, custom) {
        console.log("点击活动页面", custom)
        if (gHandler.gameGlobal.isdev) return
        if (custom == 1) { // 复制官网
            if (gHandler.appGlobal.pinpai == "debi") { // 德比直接打开推广链接
                gHandler.appDownUrl && cc.sys.openURL(gHandler.appDownUrl)
            } else {
                if (gHandler.Reflect) {
                    if (gHandler.Reflect.setClipboard(gHandler.appGlobal.officialWebsite[gHandler.appGlobal.pinpai])) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制官网到剪切板成功")
                    } else {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制官网到剪切板失败")
                    }
                }
            }
        } else if (custom == 2) {
            let enterproxy = function () {
                if (gHandler.gameConfig.subModel.proxy.lanchscene != "") {
                    cc.director.loadScene(gHandler.gameConfig.subModel.proxy.lanchscene)
                } else {
                    console.log("请配置全民代理场景")
                }
            }
            this.checkFastProxyUrl(enterproxy.bind(this))
        } else if (custom == 3) { // 保存下载地址
            if (gHandler.Reflect) {
                if (gHandler.appDownUrl) {
                    if (gHandler.Reflect.setClipboard(gHandler.appDownUrl)) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制到剪切板成功")
                    } else {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制到剪切板失败")
                    }
                } else {
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "获取下载链接失败，请重新登陆")
                }
            }
        }
    },
    onClickFreeGold(event) {
        console.log("免费金币", event)
        this.clickDelay(event)
        if (gHandler.gameGlobal.isdev) return
        if (gHandler.gameGlobal.player.phonenum != "") {
            if (gHandler.gameConfig.subModel.payActivity.lanchscene != "") {
                cc.director.loadScene(gHandler.gameConfig.subModel.payActivity.lanchscene)
            } else {
                console.log("请配置精彩活动场景")
            }
        } else {
            this.checkFastPayUrl(() => {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showRegister, null);
            })
        }
    },
    onClickIosWeb(event) {
        console.log('打开ios网页')
        this.clickDelay(event)
        let endurl = '?token=' + gHandler.gameGlobal.token + '&deviceid=' + gHandler.appGlobal.deviceID + '&acconunt=' + gHandler.gameGlobal.player.account_name
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            if (gHandler.Reflect.setClipboard('http://game.539316.com/' + endurl)) {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制地址成功")
            } else {
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制地址失败")
            }
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            cc.sys.openURL('http://game.539316.com/' + endurl)
        }
    },
    enterSubWeb(custom) {
        // let getIconPath = () => {
        //     let packageName = gHandler.appGlobal.packgeName;
        //     let pathName = packageName + "/images/icon";
        //     return gHandler.appGlobal.remoteSeverinfo.source_host[0] + "/" + pathName + "/";
        // }

        // let info = JSON.stringify({
        //     id: gHandler.gameGlobal.player.id, // 用户ID
        //     game_id: gHandler.gameConfig.oldGameList['brnn'].remoteData.game_id, // 游戏ID
        //     server_url: gHandler.gameConfig.oldGameList['brnn'].remoteData.game_host[0], // game_host
        //     password: gHandler.gameGlobal.player.account_pass // 用户密码
        // });
        // info = gHandler.base64.encode(info);

        // let url = gHandler.appGlobal.remoteSeverinfo.temp_host[0] + gHandler.gameConfig.oldGameList['brnn'].remoteData.web_down_webgl +
        //     "?info=" + info +
        //     "&os=" + gHandler.appGlobal.os +
        //     "&iconPath=" + getIconPath() + // 头像资源地址(图片地址)
        //     "&version=" + gHandler.gameConfig.oldGameList['brnn'].remoteData.version +// 游戏版本号
        //     "&env=" + "dev" + // 环境 online dev pre
        //     "&time=" + new Date().getTime();// 时间戳
        // console.log(url)
        // this.web.url = url;
        // this.web.active = true;
        // this.web.onEnable();
    },
    onReceiveBroadcast(mtype) {
        if (mtype == 1000) {
            this.chatbtn.getChildByName("redpoint").active = true;
        }
    },

    /** 每帧调用一次 // called every frame */
    // update(dt) { },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    onDestroy() {
        // console.log("hall onDestroy")
        this.setButtonEffect(false);
        this.unschedule(this.adPageRun, this)
        this.unschedule(this.getSgjPool, this)
        this.unschedule(this.getHbslPool, this)
        this.unschedule(this.getHbldPool, this)
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotCheckup, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFail, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotProgress, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotFinish, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotUp, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotCheck, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.hotWait, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.refreshPlayerinfo, "hallScene")
        gHandler.eventMgr.unregister(gHandler.eventMgr.refreshHallTips, "hallScene")
    },
});