/*
 * @Author: burt
 * @Date: 2019-07-27 14:58:41
 * @LastEditors: burt
 * @LastEditTime: 2019-10-05 15:47:26
 * @Description: 大厅场景
 */
let gHandler = require("gHandler");
let hqqAudioMgr = require("hqqAudioMgr");
let hallWebSocket = require("hallWebSocket");

cc.Class({
    extends: cc.Component,

    properties: {
        noticelayerPrefab: cc.Prefab,
        personlayerPrefab: cc.Prefab,
        bigsublayerPrefab: cc.Prefab,
        smallsublayerPrefab: cc.Prefab,
        registerlayerPrefab: cc.Prefab,

        headimg: cc.Sprite, // 玩家头像
        namelabel: cc.Label, // 玩家昵称
        coinlabel: cc.Label, // 玩家金币
        topbubble: cc.Node, // 你有新消息

        chatbtn: cc.Node, // 聊天按钮
        duihuanbtn: cc.Node, // 兑换按钮

        pageview: cc.PageView, // 活动页面
        itembtn: cc.Node, // 子游戏按钮
        subgameview: cc.ScrollView, // 子游戏按钮缓动面板
        web: cc.WebView, // 网页

        versionLabel: cc.Label,
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        this.noticelayer = null
        this.personlayer = null
        this.bigsublayer = null
        this.smallsublayer = null
        this.registerlayer = null

        this.registerlayerIndex = 1000
        this.noticelayerIndex = 1001
        this.personlayerIndex = 1002
        this.bigsublayerIndex = 1003
        this.smallsublayerIndex = 1004

        this.topbubble.active = false;
        if (cc.sys.isBrowser) {
            this.browserDeal();
        }
        if (gHandler.gameGlobal.isdev) {
            let hqqBase64 = require("hqqBase64");
            gHandler.base64 = hqqBase64;
            let hqqEvent = require("hqqEvent");
            gHandler.eventMgr = hqqEvent.init();
            let hqqCommonTools = require("hqqCommonTools");
            gHandler.commonTools = hqqCommonTools;
            let hqqLogMgr = require("hqqLogMgr");
            gHandler.logMgr = hqqLogMgr.init();
            let hqqLocalStorage = require("hqqLocalStorage");
            gHandler.localStorage = hqqLocalStorage.init();
            let hqqHttp = require("hqqHttp");
            gHandler.http = hqqHttp;
        }
        gHandler.audioMgr = hqqAudioMgr.init(gHandler.hallResManager);
        gHandler.audioMgr.playBg("hallbg");
        this.subGameBtnMap = {};
        this.subGameBtnArr = [];
        this.addSubgame();
        this.scheduleOnce(() => {
            this.checkSubModule();
        }, 0)
        this.isupdating = false;
        this.setPlayerInfo();
        !gHandler.gameGlobal.isdev && this.getNotice();

        this.versionLabel.string = "版本10.4.2"
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
        if (!gHandler.gameGlobal.isdev && !gHandler.hallWebSocket) {
            gHandler.hallWebSocket = new hallWebSocket();
            gHandler.hallWebSocket.init();
            let url = gHandler.appGlobal.server + "/Game/login/login";
            if (cc.sys.isBrowser) {
                url = "ws://" + url;
            }
            gHandler.hallWebSocket.connect(url);
        }
        if (!gHandler.gameGlobal.isdev) {
            this.registerWebsocketCallback()
        }

        gHandler.eventMgr.register("isupdataCallback", "hallScene", this.isupdataCallback.bind(this))
        gHandler.eventMgr.register("failCallback", "hallScene", this.failCallback.bind(this))
        gHandler.eventMgr.register("progressCallback", "hallScene", this.progressCallback.bind(this))
        gHandler.eventMgr.register("finishCallback", "hallScene", this.finishCallback.bind(this))
        gHandler.eventMgr.register("changePlayerInfo", "hallScene", this.setPlayerInfo.bind(this))
        gHandler.eventMgr.register("showbigsublayer", "hallScene", this.showbigsublayer.bind(this))
        gHandler.eventMgr.register("showsmallsublayer", "hallScene", this.showsmallsublayer.bind(this))
    },
    showbigsublayer(data) {
        if (this.bigsublayer) {
            this.bigsublayer.active = true
        } else {
            this.bigsublayer = cc.instantiate(this.bigsublayerPrefab)
            this.node.addChild(this.bigsublayer, this.bigsublayerIndex)
        }
        this.bigsublayer.getComponent("hallPSubbLayer").init(data)
    },
    showsmallsublayer(data) {
        if (this.smallsublayer) {
            this.smallsublayer.active = true
        } else {
            this.smallsublayer = cc.instantiate(this.smallsublayerPrefab)
            this.node.addChild(this.smallsublayer, this.smallsublayerIndex)
        }
        this.smallsublayer.getComponent("hallPSubsLayer").init(data)
    },
    getNotice() {
        let callback = (data, url) => {
            console.log("公告 callback", data)
            if (data.code == 200) {
                if (data.msg.length == 0) {
                    console.log("没有公告需要显示")
                } else {
                    data.msg.sort((a, b) => a.sort - b.sort).forEach((e, i) => {
                        let notice = {
                            key: i,
                            isShow: 0,
                            type: e.type,
                            title: e.title,
                            words: e.words,
                            create_time: e.create_time,
                            end_time: e.end_time,
                        };
                        gHandler.gameGlobal.noticeList.push(notice)
                        if (e.is_slider === 1) {
                            gHandler.gameGlobal.slideNoticeList.push({
                                type: 1,
                                notice: e.words.replace(/\s+/g, "")
                            })
                        }
                    })
                    this.topbubble.active = true;
                    gHandler.eventMgr.dispatch("slidernotice", gHandler.gameGlobal.slideNoticeList)
                    gHandler.eventMgr.register("noticeallread", "hallScene", this.setNoticeReadState.bind(this))
                }
            } else {
            }
        }
        let outcallback = () => { // 账号密码登录超时，uuid登录
        }
        let endurl = gHandler.appGlobal.getIpGetEndurl(4);
        gHandler.http.sendRequestIpGet(gHandler.appGlobal.server, endurl, callback, outcallback);
    },
    setNoticeReadState(msg) {
        this.topbubble.active = msg;
    },
    setPlayerInfo(msg) {
        console.log("hall setPlayerInfo")
        if (msg) {
            if (msg.nick) {
                this.namelabel.string = msg.nick;
            }
            if (msg.gold) {
                if (msg.gold < 0.01) {
                    this.coinlabel.string = 0;
                } else {
                    this.coinlabel.string = gHandler.commonTools.fixedFloat(msg.gold);
                }
            }
            if (msg.headurl) {
                this.headimg.spriteFrame = gHandler.hallResManager.getHallHeadFrame(msg.headurl.substring(0, msg.headurl.indexOf(".")))
            }
        } else {
            let player = gHandler.gameGlobal.player;
            this.namelabel.string = player.nick;
            if (player.gold < 0.01) {
                this.coinlabel.string = 0;
            } else {
                this.coinlabel.string = gHandler.commonTools.fixedFloat(player.gold);
            }
            this.headimg.spriteFrame = gHandler.hallResManager.getHallHeadFrame(player.headurl.substring(0, player.headurl.indexOf(".")))
        }
    },

    /** 子模块更新检查 im，充提 */
    checkSubModule() {
        // todo 检查子模块
        this.chatbtn.getChildByName("redpoint").active = false;
        this.duihuanbtn.getChildByName("redpoint").active = false;
        if (!gHandler.gameGlobal.isdev) {
            if (gHandler.gameGlobal.im_host == "") {
                let callback = (url) => {
                    gHandler.logMgr.log("最快的im地址", url)
                    gHandler.gameGlobal.im_host = url;
                }
                gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.im_host, null, "/checked", callback)
            }
        }

    },
    /** 子游戏初始化 */
    addSubgame() {
        this.subgameview.content.width = Math.ceil(Object.getOwnPropertyNames(gHandler.gameConfig.gamelist).length / 2) * (this.itembtn.width + 5) + this.pageview.node.width + 15;
        for (let key in gHandler.gameConfig.gamelist) {
            let i = gHandler.gameConfig.gamelist[key].hallid;
            let tempdata = gHandler.commonTools.jsonCopy(gHandler.gameConfig.gamelist[key]);
            let itembtn = cc.instantiate(this.itembtn);
            itembtn.x = Math.floor(i / 2) * (this.itembtn.width + 5) + this.itembtn.width / 2 + 15 + this.pageview.node.width;
            itembtn.y = -i % 2 * this.itembtn.height - this.itembtn.height * 0.5 - 20;
            itembtn.active = true;
            this.subgameview.content.addChild(itembtn);
            let namelabel = itembtn.getChildByName("nameimg").getComponent(cc.Sprite);
            namelabel.spriteFrame = gHandler.hallResManager.getHallBtnImg(tempdata.resid);
            let ani = itembtn.getChildByName("ani").getComponent('sp.Skeleton');
            ani.skeletonData = gHandler.hallResManager.getHallBtnAni(tempdata.resid);
            ani.animation = "animation";
            itembtn.getChildByName("wait").active = false;
            itembtn.getChildByName("experience").active = false;
            this.subGameBtnMap[tempdata.enname] = itembtn;
            this.subGameBtnArr.push(itembtn);
            tempdata.itembtn = itembtn;
            if (cc.sys.isNative && !gHandler.gameGlobal.isdev) {
                this.checkSubGameDownload(tempdata);
            } else {
                let downflag = tempdata.itembtn.getChildByName("downFlag");
                let progress = tempdata.itembtn.getChildByName("progress");
                let jiantou = tempdata.itembtn.getChildByName("jiantou");
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene";
                clickEventHandler.customEventData = tempdata;
                downflag.active = false;
                progress.active = false;
                jiantou.active = false;
                clickEventHandler.handler = "onClickSubgame";
                let button = tempdata.itembtn.getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
        }
        this.scheduleOnce(() => {
            this.subGameBtnEffect()
        }, 0.5)
    },
    /** 初始化后的按钮特效 */
    subGameBtnEffect() {
        // console.log("初始化后的按钮特效")
        for (let i = 0; i < this.subGameBtnArr.length; i += 2) {
            this.subGameBtnArr[i] && this.subGameBtnArr[i].runAction(cc.sequence(cc.delayTime(i * 0.02), cc.scaleTo(0.1, 1.03), cc.scaleTo(0.1, 1)))
            this.subGameBtnArr[i + 1] && this.subGameBtnArr[i + 1].runAction(cc.sequence(cc.delayTime(i * 0.02), cc.scaleTo(0.1, 1.03), cc.scaleTo(0.1, 1)))
        }
    },
    /** web端需要做的处理 */
    browserDeal() {
        let url = window.location.search;
        if (url.indexOf("?") != -1) {
            // var str = url.substr(1);
            // let strs = str.split("&")
            let strs = url.split("?")[1].split("&");
            for (let i = 0; i < strs.length; i++) {
                // let temp = unescape(strs[i].split("=")[1])
                let temp = strs[i].split("=")[1];
                console.log(temp)
            }
        }
    },
    /** 根据id获取服务器子游戏信息 */
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
    checkSubGameDownload(data) {
        let downflag = data.itembtn.getChildByName("downFlag");
        let progress = data.itembtn.getChildByName("progress");
        let jiantou = data.itembtn.getChildByName("jiantou");
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "hallScene";
        clickEventHandler.customEventData = data;
        let subgamev = this.getRemoteSubgame(data.game_id).version;
        let localsubv = gHandler.localStorage.get(data.enname, "versionKey");
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
        let txt = "local version: " + localsubv + " | remote version:" + subgamev;
        if (needup) {
            console.log(txt + " | subgame : " + data.enname + " need update");
            downflag.active = true;
            progress.active = true;
            jiantou.active = true;
            clickEventHandler.handler = "downloadSubGame";
        } else {
            console.log(txt + " | subgame : " + data.enname + " not need update")
            downflag.active = false;
            progress.active = false;
            jiantou.active = false;
            clickEventHandler.handler = "onClickSubgame";
            !gHandler.gameGlobal.isdev && cc.sys.os != "Windows" && cc.loader.downloader.loadSubpackage(data.enname, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage script successfully.');
            });
        }
        let button = data.itembtn.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    /** 创建子游戏账号 */
    createSubAccount(subgameconfig, mcallback, custom) {
        if (subgameconfig.hasAccount) {
            console.log("已经有账号了")
            if (custom) {
                mcallback && mcallback(custom);
            } else {
                mcallback && mcallback(subgameconfig);
            }
            return
        }
        let subdata = gHandler.appGlobal.remoteGamelist[0]
        for (let i = 0; i < gHandler.appGlobal.remoteGamelist.length; i++) {
            if (subgameconfig.game_id == gHandler.appGlobal.remoteGamelist[i].game_id) {
                subdata = gHandler.appGlobal.remoteGamelist[i]
                break;
            }
        }
        let callback = (data) => {
            console.log("创建子游戏账号 callback", data)
            if (data.code == 200 || data.code == 203) {
                for (let gname in gHandler.gameConfig.gamelist) {
                    if (gHandler.gameConfig.gamelist[gname].game_id == subgameconfig.game_id) {
                        gHandler.gameConfig.gamelist[gname].hasAccount = true;
                        gHandler.localStorage.set(gname, "hasAccount", true);
                    }
                }
                if (custom) {
                    mcallback && mcallback(custom);
                } else {
                    mcallback && mcallback(subgameconfig);
                }
            } else {
                console.log("创建子游戏账号失败")
            }
        }
        let outcallback = () => {
            console.log("创建子游戏账号 超时")
        }
        let endurl = "/Game/User/createGameAccount";
        console.log("gHandler.gameGlobal.player.id", gHandler.gameGlobal.player.id, gHandler.gameGlobal.token)
        let data = {
            game_id: subdata.game_id,
            package_id: subdata.package_id,
            balance: 0,//gHandler.gameGlobal.player.gold,
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },
    /** 下载子游戏 */
    downloadSubGame(event, data) {
        gHandler.logMgr.log("download or updata subgame", data.enname);
        if (this.isupdating) {
            console.log("正在更新中")
            // todo 图片修改
            // let progress = data.itembtn.getChildByName("progress") 
            // let jiantou = progress.getChildByName("jiantou")
            // let zanting = progress.getChildByName("zanting")
            // jiantou.active = !jiantou.active
            // zanting.active = !jiantou.active
        } else {
            this.isupdating = true
        }

        let localsubv = gHandler.localStorage.get(data.enname, "versionKey") || null;
        gHandler.hotUpdateMgr.checkUpdate({
            subname: data.enname,
            version: localsubv || "0.0.1",
        })
    },
    isupdataCallback(bool) {
        console.log("isupdataCallback", bool)
        if (bool) { // 需要更新
            // 自动更新，无需处理

        } else {
            this.isupdating = false
        }
    },
    failCallback(enname) {
        console.log("failCallback")
        this.isupdating = false
        gHandler.logMgr.log("subgame", enname, "download fail");
    },
    // 下载进度
    progressCallback(progress, enname) {
        if (isNaN(progress)) {
            progress = 0;
        }
        this.subGameBtnMap[enname].getChildByName("jiantou").active = false;
        let progressnode = this.subGameBtnMap[enname].getChildByName("progress");
        let progressbar = progressnode.getComponent(cc.ProgressBar);
        progressbar.progress = progress;
        let progresslabel = this.subGameBtnMap[enname].getChildByName("progresslabel");
        progress = progress * 100
        progress += ""
        if (progress.indexOf(".") != -1) {
            progress = progress.substring(0, progress.indexOf("."))
        }
        progress += "%"
        console.log("下载进度", progress)
        progresslabel.getComponent(cc.Label).string = progress
    },
    finishCallback(enname) {
        console.log("finishCallback & change btn callback")
        this.isupdating = false;
        this.subGameBtnMap[enname].getChildByName("progress").active = false;
        this.subGameBtnMap[enname].getChildByName("downFlag").active = false;
        let progresslabel = this.subGameBtnMap[enname].getChildByName("progresslabel");
        progresslabel.getComponent(cc.Label).string = ""
        progresslabel.active = false;
        this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame";

        if (!gHandler.gameConfig.gamelist[enname].hasAccount && !gHandler.gameGlobal.isdev) {
            this.createSubAccount(gHandler.gameConfig.gamelist[enname])
        }

        !gHandler.gameGlobal.isdev && cc.sys.os != "Windows" && cc.loader.downloader.loadSubpackage(enname, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('load subpackage script successfully.');
        });
    },
    jumpToSubGame(subgameconfig) {
        gHandler.audioMgr.stopBg();
        if (subgameconfig.enname == 'zrsx') { //  真人视讯 竖屏
            gHandler.Reflect && gHandler.Reflect.setOrientation("portrait", 640, 1136)
        }
        cc.director.loadScene(subgameconfig.lanchscene);
    },
    /** 点击子游戏按钮统一回调 */
    onClickSubgame(event, subgameconfig) {
        console.log("jump to subgame", subgameconfig.enname)
        if (gHandler.gameGlobal.isdev) {
            this.jumpToSubGame(subgameconfig)
        } else if (subgameconfig.hasAccount) {
            this.jumpToSubGame(subgameconfig)
        } else {
            this.createSubAccount(subgameconfig, this.jumpToSubGame)
        }
    },
    /** 玩家设置 */
    onClickPlayerBtn() {
        console.log("玩家设置")
        if (this.personlayer) {
            this.personlayer.active = true
        } else {
            this.personlayer = cc.instantiate(this.personlayerPrefab)
            this.node.addChild(this.personlayer, this.personlayerIndex)
        }
    },
    /** 充值 */
    onClickChongZhiBtn() {
        console.log("chongzhi")
        if (gHandler.gameGlobal.pay.pay_host == "") {
            let callback = (url) => {
                gHandler.logMgr.log("最快的pay地址", url)
                gHandler.gameGlobal.pay.pay_host = url;
                if (gHandler.gameConfig.subModel.pay.lanchscene != "") {
                    cc.director.loadScene(gHandler.gameConfig.subModel.pay.lanchscene)
                } else {
                    console.log("请配置充值场景")
                }
            }
            gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host, null, "/checked", callback)
        } else {
            if (gHandler.gameConfig.subModel.pay.lanchscene != "") {
                cc.director.loadScene(gHandler.gameConfig.subModel.pay.lanchscene)
            } else {
                console.log("请配置充值场景")
            }
        }
    },
    // 批量创建子游戏账号
    _creatSubAccount() {
        let mgameid = "5b1f3a3cb76a591e7f251714" // 5b1f3a3cb76a591e7f25173 

        let sub = [
            667736277, 622816928, 669684803, 351851107, 750364345,
            867159259, 118880312, 256311847, 785212951, 607596520,
            839520154, 153644090, 460511058, 358455995, 232726935
        ]
        if (typeof this.tempindex == 'undefined') {
            this.tempindex = 0;
        }
        if (this.tempindex >= sub.length) {
            return
        }
        let account = sub[this.tempindex];
        let pass = "e10adc3949ba59abbe56e057f20f883e";

        let onReceiveLoginTemp = (msg) => {
            console.log("登陆收到token")
            gHandler.gameGlobal.token = msg.token
            let callback = (data) => {
                console.log("创建子游戏账号 callback", JSON.parse(data))
                this.creatSubAccount()
            }
            let outcallback = () => {
                console.log("创建子游戏账号 超时")
            }
            let endurl = "/Game/User/createGameAccount";
            console.log("gHandler.gameGlobal.player.id", gHandler.gameGlobal.player.id, gHandler.gameGlobal.token)
            let data = {
                game_id: mgameid,
                package_id: 1,
                balance: gHandler.gameGlobal.player.gold,
                id: gHandler.gameGlobal.player.id,
                token: msg.token,
            }
            gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
        }

        gHandler.hallWebSocket.unregister("/Game/login/login", "hallScene")
        gHandler.hallWebSocket.close()
        let mcallback = (issucess) => {
            if (issucess) {
                console.log("切换账号成功", sub[this.tempindex])
                this.tempindex++
                if (!gHandler.gameGlobal.isdev && !gHandler.hallWebSocket.getIsConnected()) {
                    gHandler.hallWebSocket = new hallWebSocket();
                    gHandler.hallWebSocket.init();
                    let url = gHandler.appGlobal.server + "/Game/login/login";
                    if (cc.sys.isBrowser) {
                        url = "ws://" + url;
                    }
                    gHandler.hallWebSocket.register("/Game/login/login", "hallScene", onReceiveLoginTemp.bind(this))
                    gHandler.hallWebSocket.connect(url);
                }
            } else {
                console.log("切换账号失败")
            }
        }
        gHandler.loginMgr.accountChange(account, pass, mcallback)
    },
    /** 全民代理  */
    onClickQMDL() {
        console.log("全民代理")
        // this._creatSubAccount()
        cc.director.loadScene(gHandler.gameConfig.subModel.proxy.lanchscene)
    },
    /** 公告 */
    onClickGongGaoBtn() {
        console.log("公告")
        if (this.noticelayer) {
            this.noticelayer.active = true
        } else {
            this.noticelayer = cc.instantiate(this.noticelayerPrefab)
            this.node.addChild(this.noticelayer, this.noticelayerIndex)
        }
    },
    /** 设置 */
    onClickSettingBtn() {
        console.log("设置")

    },
    /** 聊天 */
    onClickChatBtn() {
        console.log("聊天")
        if (gHandler.gameGlobal.im_host != "") {
            gHandler.Reflect && gHandler.Reflect.setOrientation("portrait", 750, 1334)
            cc.director.loadScene(gHandler.gameConfig.subModel.im.lanchscene)
        }
    },
    /** 兑换 提现 */
    onClickDuiHuanBtn() {
        console.log("兑换")
        if (gHandler.gameGlobal.pay.pay_host == "") {
            let callback = (url) => {
                gHandler.logMgr.log("最快的pay地址", url)
                gHandler.gameGlobal.pay.pay_host = url;
                if (gHandler.gameConfig.subModel.cash.lanchscene != "") {
                    cc.director.loadScene(gHandler.gameConfig.subModel.cash.lanchscene)
                } else {
                    console.log("请配置提现场景")
                }
            }
            gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host, null, "/checked", callback)
        } else {
            if (gHandler.gameConfig.subModel.cash.lanchscene != "") {
                cc.director.loadScene(gHandler.gameConfig.subModel.cash.lanchscene)
            } else {
                console.log("请配置提现场景")
            }
        }
    },
    /** 活动 */
    onClickHuoDongBtn() {
        console.log("活动")
    },
    /** 活动页面 */
    onClickADPage(event, custom) {
        console.log("点击活动页面", custom)
        if (!gHandler.gameConfig.oldGameList['brnn'].hasAccount) {
            this.createSubAccount(gHandler.gameConfig.oldGameList['brnn'], this.enterSubWeb, custom)
        } else {
            this.enterSubWeb(custom)
        }
    },
    onClickFreeGold() {
        console.log("免费金币")
        if (this.registerlayer) {
            this.registerlayer.active = true
        } else {
            this.registerlayer = cc.instantiate(this.registerlayerPrefab)
            this.node.addChild(this.registerlayer, this.registerlayerIndex)
        }
    },
    enterSubWeb(custom) {
        if (custom == 1) {
            this.web.active = true;
            this.web.url = "https://www.baidu.com"
            this.web.onEnable()
        } else if (custom == 2) {
            gHandler.audioMgr.stopBg();
            cc.director.loadScene('web')
        }
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

    /** 每帧调用一次 // called every frame */
    // update(dt) { },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    registerWebsocketCallback() {
        gHandler.hallWebSocket && gHandler.hallWebSocket.register("nologin", "hallScene", this.onReceiveNologin.bind(this))
        gHandler.hallWebSocket && gHandler.hallWebSocket.register("Broadcast", "hallScene", this.onReceiveBroadcast.bind(this))
        gHandler.hallWebSocket && gHandler.hallWebSocket.register("/Game/login/login", "hallScene", this.onReceiveLogin.bind(this)) // 登陆回调
        gHandler.hallWebSocket && gHandler.hallWebSocket.register("/GameServer/Notice/notice", "hallScene", this.onReceiveNotice.bind(this)) // 公告
        // gHandler.hallWebSocket && gHandler.hallWebSocket.register("/GameServer/GameUser/loginout", "hallScene", this.onReceiveLoginout.bind(this)) // 玩家离开子游戏
        gHandler.hallWebSocket && gHandler.hallWebSocket.register("/GameServer/GameUser/changeGameUserBalance", "hallScene", this.onReceiveChangeBanlance.bind(this))
    },
    onReceiveNologin(msg) {
        console.log("halscene onReceiveNologin", msg)

    },
    /** 登陆成功回调 */
    onReceiveLogin(msg) {
        console.log("大厅登陆收到回调", msg)
    },
    onReceiveNotice(msg) {
        console.log("halscene onReceiveNotice", msg)
    },
    // onReceiveLoginout(msg) {
    //     console.log("halscene onReceiveLoginout", msg)
    //     gHandler.setGameUserInfo(msg.game_user)
    // },
    onReceiveChangeBanlance(msg) {
        console.log("halscene onReceiveChangeBanlance", msg)

    },
    onReceiveBroadcast(msg) {
        console.log("halscene onReceiveBroadcast", msg)

    },
    onDestroy() {
        console.log("onDestroy")
        if (gHandler.hallWebSocket) {
            gHandler.hallWebSocket.unregister("/Game/login/login", "hallScene")
            gHandler.hallWebSocket.unregister("/GameServer/Notice/notice", "hallScene")
            // gHandler.hallWebSocket.unregister("/GameServer/GameUser/loginout", "hallScene")
            gHandler.hallWebSocket.unregister("/GameServer/GameUser/changeGameUserBalance", "hallScene")
            gHandler.hallWebSocket.unregister("Broadcast", "hallScene")
        }
        gHandler.eventMgr.unregister("isupdataCallback", "hallScene")
        gHandler.eventMgr.unregister("failCallback", "hallScene")
        gHandler.eventMgr.unregister("progressCallback", "hallScene")
        gHandler.eventMgr.unregister("finishCallback", "hallScene")
        gHandler.eventMgr.unregister("changePlayerInfo", "hallScene")
        gHandler.eventMgr.unregister("showbigsublayer", "hallScene")
        gHandler.eventMgr.unregister("showsmallsublayer", "hallScene")
        gHandler.eventMgr.unregister("noticeallread", "hallScene")
    },

    versionbtn() {
        gHandler.Reflect && gHandler.Reflect.setKeepScreenOn(false)
    }
});