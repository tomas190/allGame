
let gHandler = require("gHandler");
let hallWebSocket = require("hallWebSocket");

cc.Class({
    extends: cc.Component,

    properties: {
        btnmenu: cc.Node, // 左侧菜单
        btnmunuselect: cc.Node, // 左侧菜单选择效果

        youkeicon: cc.Node, // 游客
        headimg: cc.Sprite, // 玩家头像
        namelabel: cc.Label, // 玩家昵称
        coinlabel: cc.Label, // 玩家金币

        gonggaobtn: cc.Node, // 公告按钮
        chatbtn: cc.Node, // 聊天按钮
        duihuanbtn: cc.Node, // 兑换按钮

        itembtn: cc.Node, // 子游戏按钮
        subgameview: cc.ScrollView, // 子游戏按钮缓动面板
        web: cc.WebView, // 网页
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        this.subGameBtnMap = {};
        this.subGameBtnArr = [];

        gHandler.audioMgr.setButtonEffect(true);
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
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
        if (gHandler.hqqisShowFree) {
            gHandler.hqqisShowFree = false
            this.checkFastPayUrl(() => { // 测速后有返回了，再弹出绑定手机的界面
                if (gHandler.gameGlobal.player.phonenum == "") {
                    if (gHandler.appGlobal.huanjin == "dev") return
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
        gHandler.audioMgr.playBg("hallbg");
        this.huodonghongdian = cc.find('Canvas/Main Camera/toppanel/btnpanel/btn_huodong/redpoint')
        this.huodonghongdian && !gHandler.hallactivitybtn && (this.huodonghongdian.active = true);
        this.scheduleOnce(() => {
            this.initSubGameBtn();
        }, 0)
    },
    /** 子游戏初始化 */
    initSubGameBtn() {
        let mscale = 1 // 1334 * hs / cc.view.getFrameSize().width
        this.subgameview.content.width = (Math.ceil(Object.getOwnPropertyNames(gHandler.gameConfig.gamelist).length / 2) * (this.itembtn.width + 15)) * mscale + 15;
        this.subgameview.content.x = -this.subgameview.node.width / 2
        for (let key in gHandler.gameConfig.gamelist) {
            let i = gHandler.gameConfig.gamelist[key].hallid;
            let tempdata = gHandler.gameConfig.gamelist[key];
            let itembtn = cc.instantiate(this.itembtn);
            this.setSubBtnPos(itembtn, i)
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
            itembtn.tempdata = tempdata
            if (key == "zjh" || key == "ddz" || key == "hwby") {
                itembtn.getChildByName("experience").active = true;
            }
            if (key == "hbld" || key == "brnn" || key == 'jbpby') {
                itembtn.getChildByName("hot").active = true;
            }
            this.subGameBtnMap[tempdata.enname] = itembtn;
            this.subGameBtnArr[tempdata.hallid] = itembtn;
            if (gHandler.hotUpdateMgr.getSubGameIsOnUp(tempdata.enname)) { // 子游戏在更新列表中
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
            this.initMenuBtn()
        }, 0.5)
        this.scheduleOnce(() => {
            this.setPlayerInfo();
            this.checkSubModule();
        }, 0)
    },
    // 对左侧菜单按钮初始化
    initMenuBtn() {
        this.btnmenu.hqq_infolist = ["all", "changyong", "duizhan", "touzhu", "shixun", "zuqiu", "jieji"]
        for (let i = 0; i < this.btnmenu.children.length; i++) {
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "hallScene";
            clickEventHandler.customEventData = this.btnmenu.hqq_infolist[i];
            clickEventHandler.handler = "onClickMenuBtn";
            let button = this.btnmenu.children[i].getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
        let pos = this.btnmenu.children[0].getPosition().add(this.btnmenu.getPosition())
        this.btnmunuselect.x = pos.x
        this.btnmunuselect.y = pos.y
        this.btnmenu.children[0].getComponent(cc.Button).interactable = false
    },
    // 点击左侧菜单按钮统一回调
    onClickMenuBtn(event, customEventData) {
        for (let i = 0; i < this.btnmenu.children.length; i++) {
            if (this.btnmenu.children[i].name.match(customEventData)) {
                this.btnmenu.children[i].getComponent(cc.Button).interactable = false
                let pos = this.btnmenu.children[i].getPosition().add(this.btnmenu.getPosition())
                this.btnmunuselect.x = pos.x
                this.btnmunuselect.y = pos.y
                this.refreshSubGameBtn(customEventData)
            } else {
                this.btnmenu.children[i].getComponent(cc.Button).interactable = true
            }
        }
    },
    // 刷新子游戏按钮
    refreshSubGameBtn(customEventData) {
        this.subgameview.scrollToLeft(0.5)
        let btnnum = 0
        if (customEventData == 'all') {
            for (let i = 0; i < this.subGameBtnArr.length; i++) {
                this.setSubBtnPos(this.subGameBtnArr[i], i)
                btnnum++
            }
        } else if (customEventData == 'changyong') {
            let subgemesortlist = []
            for (let key in gHandler.gameConfig.gamelist) {
                let loginHistory = this.getSubGameLoginHistory(key)
                subgemesortlist.push({ "key": key, "num": loginHistory.length || 0 })
            }
            subgemesortlist.sort(function (a, b) {
                return b.num - a.num
            })
            let index = 0
            for (let i = 0; i < subgemesortlist.length; i++) {
                let key = subgemesortlist[i].key
                if (subgemesortlist[i].num) {
                    this.setSubBtnPos(this.subGameBtnMap[key], index)
                    btnnum++
                    index++
                } else {
                    let itembtn = this.subGameBtnMap[key]
                    itembtn.active = false
                }
            }
        } else {
            let type = 0
            for (let i = 0; i < this.btnmenu.hqq_infolist.length; i++) {
                if (customEventData.match(this.btnmenu.hqq_infolist[i])) {
                    type = i - 2
                    break
                }
            }
            let index = 0
            for (let i = 0; i < this.subGameBtnArr.length; i++) {
                let key = this.subGameBtnArr[i].tempdata.enname
                if (gHandler.gameConfig.gamelist[key].gameType == type) {
                    this.setSubBtnPos(this.subGameBtnMap[key], index)
                    btnnum++
                    index++
                } else {
                    let itembtn = this.subGameBtnMap[key]
                    itembtn.active = false
                }
            }
        }
        this.subgameview.content.width = (Math.ceil(btnnum / 2) * (this.itembtn.width + 15)) + 15;
        this.subgameview.content.x = -this.subgameview.node.width / 2
    },
    setSubBtnPos(itembtn, index) {
        itembtn.active = true
        itembtn.x = Math.floor(index / 2) * (this.itembtn.width + 15) + this.itembtn.width / 2 + 15;
        itembtn.y = -index % 2 * (this.itembtn.height + 15) + this.itembtn.height / 2 + 8;
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
                let callback = (receive, url) => {
                    gHandler.logMgr.timeEnd("最快的im地址", url)
                    gHandler.gameGlobal.im_host = url;
                }
                gHandler.http.requestFastestUrlLine({
                    urllist: gHandler.appGlobal.remoteSeverinfo.im_host,
                    endurl: "/checked",
                    callback: callback,
                    needJsonParse: false,
                })
            }
            if (gHandler.gameGlobal.proxy.temp_host == "") {
                gHandler.logMgr.time("最快的temp_host地址")
                let callback0 = (receive, url) => {
                    gHandler.logMgr.timeEnd("最快的temp_host地址", url)
                    gHandler.gameGlobal.proxy.temp_host = url;
                }
                gHandler.http.requestFastestUrlLine({
                    urllist: gHandler.appGlobal.remoteSeverinfo.temp_host,
                    endurl: "/checked",
                    callback: callback0,
                    needJsonParse: false,
                })
            }
            if (gHandler.gameGlobal.proxy.proxy_host == "") {
                gHandler.logMgr.time("最快的proxy_host地址")
                let callback1 = (receive, url) => {
                    gHandler.logMgr.timeEnd("最快的proxy_host地址", url)
                    gHandler.gameGlobal.proxy.proxy_host = url;
                }
                gHandler.http.requestFastestUrlLine({
                    urllist: gHandler.appGlobal.remoteSeverinfo.proxy_host,
                    endurl: "/checked",
                    callback: callback1,
                    needJsonParse: false,
                })
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
        if (!needup || gHandler.appGlobal.isRelease) {
            this.getSgjPool()
            if (!cc.director.getScheduler().isScheduled(this.getSgjPool, this)) {
                this.schedule(this.getSgjPool, 3)
            }
        }
    },
    getSgjPool() {
        let failcallback = () => {
            this.unschedule(this.getSgjPool, this)
        }
        let url = gHandler.gameConfig.gamelist["sgj"].serverUrl.replace("ws", "http") + "/api/jackpot"
        this.sgjxhr = gHandler.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: this.showsgjPoolNum.bind(this),
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    showsgjPoolNum(data) {
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = gHandler.commonTools.formatGold(data);
        }
        if (this && this.subGameBtnMap && this.subGameBtnMap["sgj"]) {
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
        if (!needup || gHandler.appGlobal.isRelease) {
            this.getHbslPool()
            if (!cc.director.getScheduler().isScheduled(this.getHbslPool, this)) {
                this.schedule(this.getHbslPool, 3)
            }
        }
    },
    getHbslPool() {
        let failcallback = () => {
            this.unschedule(this.getHbslPool, this)
        }
        let url = gHandler.gameConfig.gamelist["hbsl"].serverUrl.replace("ws", "http") + "/api/jackpot"
        this.hbslxhr = gHandler.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: this.showhbslPoolNum.bind(this),
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    showhbslPoolNum(data) {
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = gHandler.commonTools.formatGold(data);
        }
        if (this && this.subGameBtnMap && this.subGameBtnMap["hbsl"]) {
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
        if (!needup || gHandler.appGlobal.isRelease) {
            this.getHbldPool()
            if (!cc.director.getScheduler().isScheduled(this.getHbldPool, this)) {
                this.schedule(this.getHbldPool, 3)
            }
        }
    },
    getHbldPool() {
        let failcallback = () => {
            this.unschedule(this.getHbldPool, this)
        }
        let url = gHandler.gameConfig.gamelist["hbld"].serverUrl.replace("ws", "http") + "/api/jackpot"
        this.hbldxhr = gHandler.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: this.showhbldPoolNum.bind(this),
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    showhbldPoolNum(data) {
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = gHandler.commonTools.formatGold(data);
        }
        if (this && this.subGameBtnMap && this.subGameBtnMap["hbld"]) {
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
                            let needinsert = true
                            for (let i = 0; i < gHandler.gameGlobal.slideNoticeList.length; i++) {
                                if (gHandler.gameGlobal.slideNoticeList[i].notice == e.words.replace(/\s+/g, "")) {
                                    needinsert = false
                                    break
                                }
                            }
                            if (needinsert) {
                                gHandler.gameGlobal.slideNoticeList.push({
                                    time: 1,
                                    rollforver: true,
                                    notice: e.words.replace(/\s+/g, "")
                                })
                            }
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
        let failcallback = (status, forcejump, url, err) => {
        }
        let endurl = gHandler.appGlobal.getIpGetEndurl(4);
        gHandler.http.sendXMLHttpRequest({
            method: "GET",
            urlto: gHandler.appGlobal.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
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
            this.coinlabel.string = player.gold;
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
        for (let i = 0; i < this.subGameBtnArr.length; i += 2) {
            this.subGameBtnArr[i] && this.subGameBtnArr[i].runAction(cc.sequence(cc.delayTime(i * 0.02), cc.scaleTo(0.1, 1.1), cc.scaleTo(0.1, 1)))
            this.subGameBtnArr[i + 1] && this.subGameBtnArr[i + 1].runAction(cc.sequence(cc.delayTime(i * 0.02), cc.scaleTo(0.1, 1.1), cc.scaleTo(0.1, 1)))
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
            // let subgamev = subdata.version;
            let subgamev;
            let localsubv = gHandler.localStorage.get(enname, "versionKey");
            if (enname == 'zrsx1' || enname == 'zrsx2') {
                localsubv = gHandler.localStorage.get('zrsx', "versionKey");
                subgamev = gHandler.appGlobal.subGameVersion['zrsx'];
            } else {
                subgamev = gHandler.appGlobal.subGameVersion[enname];
            }
            // let txt = "local version: " + localsubv + " | remote version:" + subgamev;
            let needup = false
            if (!localsubv || !subgamev) {
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
                            if (cc.sys.isBrowser) {
                                setTimeout(() => {
                                    cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                                        if (err) {
                                            return console.error(err);
                                        }
                                        console.log('load subpackage script successfully.', subgamern);
                                    });
                                }, 3000)
                            } else {
                                cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                                    if (err) {
                                        return console.error(err);
                                    }
                                    console.log('load subpackage script successfully.', subgamern);
                                });
                            }
                        }
                    } else {
                        if (cc.sys.isBrowser) {
                            setTimeout(() => {
                                cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                                    if (err) {
                                        return console.error(err);
                                    }
                                    console.log('load subpackage script successfully.', subgamern);
                                });
                            }, 3000)
                        } else {
                            cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                                if (err) {
                                    return console.error(err);
                                }
                                console.log('load subpackage script successfully.', subgamern);
                            });
                        }
                    }
                }
            }
            let button = this.subGameBtnMap[enname].getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
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
        if (enname == "apk" || enname == "hall" || enname == "jiazai") {
            return
        }
        if (isNaN(progress)) {
            progress = 0;
        }
        let mprogress = progress * 100
        mprogress += ""
        if (mprogress.includes(".")) {
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
                gHandler.loginMgr.createSubAccount("zrsx1")
            }
        } else {
            this.subGameBtnMap[enname].progress.active = false;
            this.subGameBtnMap[enname].downflag.active = false;
            this.subGameBtnMap[enname].progresslabel.string = ""
            this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame";
            if (!gHandler.gameConfig.gamelist[enname].hasAccount && !gHandler.gameGlobal.isdev) {
                gHandler.loginMgr.createSubAccount(enname)
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
            cc.loader.downloader.loadSubpackage(enname, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage script successfully.', enname);
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
    getSubGameLoginHistory(enname) {
        let nowd = new Date().getTime()
        let deletenum = 0
        let loginHistory = gHandler.localStorage.get(enname, "loginHistory")
        if (loginHistory) {
            for (let i = 0; i < loginHistory.length; i++) {
                let jumptime = nowd - loginHistory[i]
                let days = Math.floor(jumptime / (24 * 3600 * 1000))
                if (days > 7) {
                    deletenum++
                }
            }
            if (deletenum > 0) {
                loginHistory.splice(0, deletenum)
            }
            return loginHistory
        }
        return []
    },
    /** 点击子游戏按钮统一回调 */
    onClickSubgame(event, enname) {
        this.clickDelay(event)
        let loginHistory = this.getSubGameLoginHistory(enname)
        loginHistory.push(new Date().getTime())
        gHandler.localStorage.set(enname, "loginHistory", loginHistory)
        if (gHandler.gameGlobal.isdev) {
            this.jumpToSubGame(enname)
        } else if (gHandler.gameConfig.gamelist[enname].hasAccount) {
            this.jumpToSubGame(enname)
        } else {
            gHandler.loginMgr.createSubAccount(enname, this.jumpToSubGame)
        }
    },
    /** 玩家设置 */
    onClickPlayerBtn(event) {
        // console.log("玩家设置")
        this.clickDelay(event)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showPerson, null)
    },
    /** 充值 */
    onClickChongZhiBtn(event) {
        // console.log("充值")
        this.clickDelay(event)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showPayScene, "hall")
    },
    /**
     * @description: 批量创建子游戏账号
     */
    _creatSubAccount() {
        let mgameid = "5b1f3a3cb76a591e7f25179"

        let sub = [
            329841791,
            225211712,
            162917854,
            794577984,
            527442811,
            291756511,
            677500990,
            282514026,
            616854128,
            668417726,
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
            let failcallback = () => {
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
            gHandler.http.sendXMLHttpRequest({
                method: 'POST',
                urlto: gHandler.appGlobal.server + endurl,
                param: data,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            })
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
            let callback0 = (receive, url) => {
                gHandler.logMgr.timeEnd("最快的temp_host地址", url)
                gHandler.gameGlobal.proxy.temp_host = url;
                if (gHandler.gameGlobal.proxy.proxy_host != "") {
                    mcallback && mcallback();
                }
            }
            gHandler.http.requestFastestUrlLine({
                urllist: gHandler.appGlobal.remoteSeverinfo.temp_host,
                endurl: "/checked",
                callback: callback0,
                needJsonParse: false,
            })
            gHandler.logMgr.time("最快的proxy_host地址")
            let callback1 = (receive, url) => {
                gHandler.logMgr.timeEnd("最快的proxy_host地址", url)
                gHandler.gameGlobal.proxy.proxy_host = url;
                if (gHandler.gameGlobal.proxy.temp_host != "") {
                    mcallback && mcallback();
                }
            }
            gHandler.http.requestFastestUrlLine({
                urllist: gHandler.appGlobal.remoteSeverinfo.proxy_host,
                endurl: "/checked",
                callback: callback1,
                needJsonParse: false,
            })
        } else {
            mcallback && mcallback();
        }
    },
    /** 全民代理  */
    onClickQMDL(event) {
        console.log("全民代理")
        this.clickDelay(event)
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
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showNotice, null)
    },
    /** 聊天 */
    onClickChatBtn(event) {
        console.log("聊天")
        this.clickDelay(event)
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
            let callback = (receive, url) => {
                gHandler.logMgr.timeEnd("最快的pay地址", url)
                gHandler.gameGlobal.pay.pay_host = url;
                mcallback && mcallback();
            }
            gHandler.http.requestFastestUrlLine({
                urllist: gHandler.appGlobal.remoteSeverinfo.pay_host,
                endurl: "/checked",
                callback: callback,
                needJsonParse: false,
            });
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
        this.checkFastPayUrl(this.jumpToPayActivityScene.bind(this))
    },
    onClickFreeGold(event) {
        console.log("免费金币", event)
        this.clickDelay(event)
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
        gHandler.audioMgr.setButtonEffect(false);
        this.unschedule(this.getSgjPool, this)
        this.unschedule(this.getHbslPool, this)
        this.unschedule(this.getHbldPool, this)
        this.sgjxhr && this.sgjxhr.abort()
        this.hbslxhr && this.hbslxhr.abort()
        this.hbldxhr && this.hbldxhr.abort()
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