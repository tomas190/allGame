
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.subGameBtnMap = {};
        this.subGameBtnArr = [];
        this.subGameBtnState = { // 子游戏按钮状态
            needDown: 0,
            isWait: 1,
            progress: 2,
            canClick: 3,
            noOpen: 4,
        }
        hqq.eventMgr.register(hqq.eventMgr.hotCheckup, "hallAgaLayer", this.isupdataCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFail, "hallAgaLayer", this.failCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotProgress, "hallAgaLayer", this.progressCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFinish, "hallAgaLayer", this.finishCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotUp, "hallAgaLayer", this.setSubGameBtnUp.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotCheck, "hallAgaLayer", this.setSubGameBtnCheck.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotWait, "hallAgaLayer", this.setSubGameBtnUpWait.bind(this))

        this.UILoad();
    },

    UILoad(){
        this.back = cc.find("p_new_saver_return", this.node)
        hqq.setBtn(this.back, { callback: "onClickExit", script: this, })
        hqq.setSprite(cc.find("roombgmin", this.node), { Res:hqq["hall_"+hqq.app.pinpai],path:"test/bigimg/roombgmin" ,widget:{top:0,bottom:0,left:0,right:0}});
        hqq.setSprite(cc.find("plaza_top_bg", this.node), { Res:hqq["hall_"+hqq.app.pinpai],path:"test/bigimg/plaza_top_bg",widget:{top:0,left:0,right:0} });
        hqq.setSprite(cc.find("p_new_saver_return", this.node), { Res:hqq["hall_"+hqq.app.pinpai],path:"test/img/p_new_saver_return" });
        this.sublayer = cc.find("sublayer", this.node)
        this.itembtn = cc.find("itembtn", this.node)

        for (let k in hqq.agaSubGameList) {
            let itembtn = cc.instantiate(this.itembtn)
            itembtn.active = true
            this.sublayer.addChild(itembtn);
            let tempdata = hqq.agaSubGameList[k];
            let itemhot = itembtn.getChildByName("hot");
            let itemwait = itembtn.getChildByName("wait");
            let itemexp = itembtn.getChildByName("experience");
            itembtn.downflag = itembtn.getChildByName('downFlag');
            itembtn.progress = itembtn.getChildByName('progress');
            itembtn.jiantou = itembtn.getChildByName('jiantou');
            hqq.setNode(itembtn.downflag, { x: 0, y: 0, width: 235, height: 235, opacity: 200 })
            hqq.setNode(itembtn.progress, { opacity: 100 })
            hqq.setSprite(itembtn, {
                Res:hqq["hall_"+hqq.app.pinpai],path: "language/" + hqq.language + "/" + "fuxin" + "/icon" + hqq.agaSubGameList[k].enname,
                x: -cc.winSize.width / 2 + 200 + tempdata.hallid * 300, y: 150
            })
            hqq.setSprite(itemhot, { path: "base/language/" + hqq.language + "/img/hot2", position: { x: -60, y: 57 } })
            hqq.setSprite(itemwait, { path: "base/language/" + hqq.language + "/img/wait2", position: { x: -50, y: 57 } })
            hqq.setSprite(itemexp, { path: "base/language/" + hqq.language + "/img/experience2", position: { x: -50, y: 57 } })
            itembtn.progresslabel = itembtn.getChildByName('progresslabel').getComponent(cc.Label);
            this.subGameBtnMap[tempdata.enname] = itembtn;
            this.subGameBtnArr[tempdata.hallid] = itembtn;

            if (hqq.hotUpdateMgr.getSubGameIsOnUp(tempdata.enname)) { // 子游戏在更新列表中
                this.setSubGameBtnUpWait(tempdata.enname);
            } else if (!hqq.isDebug) {
                this.checkSubGameDownload(tempdata.enname);
            } else {
                let subgamern = tempdata.enname
                if (tempdata.enname == "zrsx1" || tempdata.enname == "zrsx2") {
                    subgamern = "zrsx"
                    if (tempdata.enname == "zrsx1") {
                        this.loadBundle(subgamern)
                    }
                } else if (tempdata.enname == "sbty1" || tempdata.enname == "sbty2") {
                    subgamern = "sbty"
                    if (tempdata.enname == "sbty1") {
                        this.loadBundle(subgamern)
                    }
                } else {
                    this.loadBundle(subgamern)
                }
                this.setSubGameBtnState(tempdata.enname, this.subGameBtnState.canClick);
            }
        }
    },

    start() {

    },
    init() {

    },
    // 设置子游戏按钮等待下载状态
    setSubGameBtnUp(enname) {
        if (enname == "zrsx") {
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.needDown)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.needDown)
        } else if (enname == "sbty") {
            this.setSubGameBtnState("sbty1", this.subGameBtnState.needDown)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.needDown)
        } else {
            if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
                if( hqq.game1to2[ enname ] ){
                    enname = hqq.game1to2[ enname ];
                }
            }
            this.setSubGameBtnState(enname, this.subGameBtnState.needDown)
        }
    },
    // 设置按钮状态为检测文件
    setSubGameBtnCheck(enname) {
        if (!this.subGameBtnMap[enname]) {
            return
        }
        let str1 = hqq.getTip("str1")
        if (enname == 'zrsx') {
            this.subGameBtnMap['zrsx1'].progresslabel.string = str1;
            this.subGameBtnMap['zrsx2'].progresslabel.string = str1;
        } else if (enname == 'sbty') {
            this.subGameBtnMap['sbty1'].progresslabel.string = str1;
            this.subGameBtnMap['sbty2'].progresslabel.string = str1;
        } else {
            if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
                if( hqq.game1to2[ enname ] ){
                    enname = hqq.game1to2[ enname ];
                }
            }
            this.subGameBtnMap[enname].progresslabel.string = str1;
        }
    },
    // 设置子游戏按钮更新状态为等待
    setSubGameBtnUpWait(subgamern) {
        if (subgamern == "zrsx") {
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.isWait)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.isWait)
        } else if (subgamern == "sbty") {
            this.setSubGameBtnState("sbty1", this.subGameBtnState.isWait)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.isWait)
        } else {
            if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
                if( hqq.game1to2[ enname ] ){
                    subgamern = hqq.game1to2[ enname ];
                }
            }
            this.setSubGameBtnState(subgamern, this.subGameBtnState.isWait)
        }
    },
    // 是否热更新返回
    isupdataCallback(bool, enname,isfail=false) {
        if (bool) { // 需要更新 自动更新，无需处理
            if(hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng" ){
                if(hqq.game1to2[enname]){
                    enname = hqq.game1to2[enname];
                }
            }
            if (enname == "zrsx") {
                this.setSubGameBtnState("zrsx1", this.subGameBtnState.isWait)
                this.setSubGameBtnState("zrsx2", this.subGameBtnState.isWait)
            } else if (enname == "sbty") {
                this.setSubGameBtnState("sbty1", this.subGameBtnState.isWait)
                this.setSubGameBtnState("sbty2", this.subGameBtnState.isWait)
            }else {
                this.setSubGameBtnState(enname, this.subGameBtnState.isWait)
            }
        } else {
            this.finishCallback(enname);
        }
    },
    // 子游戏热更新失败
    failCallback(enname) {
        hqq.logMgr.log("子游戏", enname, "下载失败");
        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip44"))
        if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
            if( hqq.game1to2[ enname ] ){
                enname = hqq.game1to2[ enname ];
            }
        }
        this.setSubGameBtnUp(enname)
    },
    // 下载进度
    progressCallback(progress, enname) {
        if (!this.subGameBtnMap[enname]) {
            return
        }
        if (enname == "apk" || enname == "hall" || enname == "jiazai") {
            return
        }
        if (isNaN(progress) || progress == 0) {
            return
        }
        let mprogress = (progress * 100).toString()
        if (mprogress.includes(".")) {
            mprogress = mprogress.substring(0, mprogress.indexOf("."))
        }
        if( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng" ){
            if(hqq.game1to2[enname]){
                enname = hqq.game1to2[enname];
            }
        }
        mprogress += "%"
        if (enname == "zrsx") {
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.progress)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.progress)
            this.subGameBtnMap["zrsx1"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["zrsx1"].progresslabel.string = mprogress
            this.subGameBtnMap["zrsx2"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["zrsx2"].progresslabel.string = mprogress
        } else if (enname == "sbty") {
            this.setSubGameBtnState("sbty1", this.subGameBtnState.progress)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.progress)
            this.subGameBtnMap["sbty1"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["sbty1"].progresslabel.string = mprogress
            this.subGameBtnMap["sbty2"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["sbty2"].progresslabel.string = mprogress
        } else {
            this.setSubGameBtnState(enname, this.subGameBtnState.progress)
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap[enname].progresslabel.string = mprogress
        }
    },
    // 子游戏热更新结束
    finishCallback(enname) {
        if (!hqq.agaSubGameList[enname]) {
            return
        }
        if( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng" ){
            if(hqq.game1to2[enname]){
                enname = hqq.game1to2[enname];
            }
        }

        console.log("finishCallback", enname)
        if (enname == "zrsx") {
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.canClick)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.canClick)
            if (!hqq.agaSubGameList['zrsx1'].hasAccount && !hqq.isDebug) {
                this.createSubAccount("zrsx1")
            }
        } else if (enname == "sbty") {
            this.setSubGameBtnState("sbty1", this.subGameBtnState.canClick)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.canClick)
            if (!hqq.agaSubGameList['sbty1'].hasAccount && !hqq.isDebug) {
                this.createSubAccount("sbty1")
            }
        } else {
            this.setSubGameBtnState(enname, this.subGameBtnState.canClick)
            if (!hqq.agaSubGameList[enname].hasAccount && !hqq.isDebug) {
                this.createSubAccount(enname)
            }
        }
        if (hqq.app.isRelease) {
            this.loadBundle(enname)
        }
    },
    // 设置子游戏按钮状态
    setSubGameBtnState(enname, state) {
        if (!this.subGameBtnMap[enname]) {
            return
        }
        if (this.subGameBtnMap[enname].subGameState == state) {
            return
        }
        this.subGameBtnMap[enname].subGameState = state
        if (state == this.subGameBtnState.needDown) { // 需要下载状态
            hqq.agaSubGameList[enname].isDown = false
            this.subGameBtnMap[enname].downflag.active = true;
            this.subGameBtnMap[enname].jiantou.active = true;
            this.subGameBtnMap[enname].progresslabel.string = "";
            this.subGameBtnMap[enname].progress.active = true;
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallAgaLayer";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.isWait) { // 下载检测准备状态
            hqq.agaSubGameList[enname].isDown = false
            this.subGameBtnMap[enname].downflag.active = true;
            this.subGameBtnMap[enname].jiantou.active = false;
            this.subGameBtnMap[enname].progresslabel.string = hqq.getTip("str2");
            this.subGameBtnMap[enname].progress.active = true;
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallAgaLayer";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.progress) { // 下载进度状态
            this.subGameBtnMap[enname].downflag.active = true;
            this.subGameBtnMap[enname].jiantou.active = false;
            this.subGameBtnMap[enname].progress.active = true;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallAgaLayer";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.canClick) { // 可点击状态
            hqq.agaSubGameList[enname].isDown = true
            this.subGameBtnMap[enname].downflag.active = false;
            this.subGameBtnMap[enname].jiantou.active = false;
            this.subGameBtnMap[enname].progresslabel.string = "";
            this.subGameBtnMap[enname].progress.active = false;
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallAgaLayer";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "onClickSubgame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.noOpen) { // 不开放状态
            this.subGameBtnMap[enname].getChildByName("wait").active = true;
            hqq.agaSubGameList[enname].isDown = false
            this.subGameBtnMap[enname].downflag.active = true;
        }
    },
    // 按钮点击延时
    clickDelay(event) {
        event.target.getComponent(cc.Button).interactable = false
        this.scheduleOnce(function () {
            if(cc.isValid(event.target)){
                event.target.getComponent(cc.Button).interactable = true
            }
        }, 0.5)
    },
    /** 下载子游戏 */
    downloadSubGame(event, enname) {
        this.clickDelay(event)
        let mycallback = () => {
            let mainversion = hqq.localStorage.globalGet(hqq.app.versionKey)
            mainversion = mainversion ? mainversion : ''
            if (mainversion != hqq.app.subGameVersion.hall) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                    type: 10,
                    msg: hqq.getTip("showtip69") + "\nlocalv:" + mainversion + "remotev:" + hqq.app.subGameVersion.hall,
                    ensurefunc: () => {
                        hqq.hallWebSocket.close();
                        cc.audioEngine.stopAll();
                        cc.game.restart();
                    }
                })
            } else {
                let localsubv = hqq.localStorage.get(enname, "versionKey") || null;
                if(hqq.pinpaiSubGameList[hqq.app.pinpai])
                {
                    if( hqq.pinpaiSubGameList[hqq.app.pinpai][enname])
                    {
                        enname = enname + "_" + hqq.app.pinpai;
                    }
                }
                let upstate = hqq.hotUpdateMgr.checkUpdate({
                    subname: enname,
                    version: localsubv || "1.0.0",
                })
                if (upstate) {
                    this.setSubGameBtnState(enname, this.subGameBtnState.isWait)
                } else {
                    this.setSubGameBtnState(enname, this.subGameBtnState.needDown)
                }
            }
        }
        hqq.loginMgr.requestVersionJson(mycallback)
    },
    /**
    * @Description: 根据id获取服务器子游戏信息
    */
    getRemoteSubgame(game_id) {
        if (!hqq.app || !hqq.app.remoteGamelist) {
            return
        }
        let remotedata = hqq.app.remoteGamelist[0];
        for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
            if (game_id === hqq.app.remoteGamelist[i].game_id) {
                remotedata = hqq.app.remoteGamelist[i];
                break;
            }
        }
        return remotedata;
    },
    /** 判断子游戏是否下载更新等 */
    checkSubGameDownload(enname) {
        let subdata = this.getRemoteSubgame(hqq.agaSubGameList[enname].game_id)
        if (subdata && subdata.open == 0) {
            this.setSubGameBtnState(enname, this.subGameBtnState.noOpen)
        } else {
            let subgamev;
            let localsubv = hqq.localStorage.get(enname, "versionKey");
            if (enname == 'zrsx1' || enname == 'zrsx2') {
                localsubv = hqq.localStorage.get('zrsx', "versionKey");
                subgamev = hqq.app.subGameVersion['zrsx'];
            } else if (enname == 'sbty1' || enname == 'sbty2') {
                localsubv = hqq.localStorage.get('sbty', "versionKey");
                subgamev = hqq.app.subGameVersion['sbty'];
            } else {
                subgamev = hqq.app.subGameVersion[enname];
            }
            let needup = hqq.commonTools.versionCompare(localsubv, subgamev)
            if (needup && !cc.sys.isBrowser && enname != "aga") { //  && cc.sys.os != "Windows"
                this.setSubGameBtnState(enname, this.subGameBtnState.needDown)
            } else {
                this.setSubGameBtnState(enname, this.subGameBtnState.canClick)
                if (hqq.app.isRelease) {
                    let subgamern = enname
                    if (enname == "zrsx1" || enname == "zrsx2") {
                        subgamern = "zrsx"
                        if (enname == "zrsx1") {
                            this.loadBundle(subgamern)
                        }
                    } else if (enname == "sbty1" || enname == "sbty2") {
                        subgamern = "sbty"
                        if (enname == "sbty1") {
                            this.loadBundle(subgamern)
                        }
                    } else {
                        this.loadBundle(subgamern)
                    }
                }
            }
        }
    },
    // 加载子游戏的子包 包含静态子包和动态子包
    loadBundle(subname) {
        // if (CC_DEBUG) {
        //     return
        // }
        cc.assetManager.loadBundle(subname + "_" + hqq.app.pinpai, function (err) {
            if (err) {
                cc.assetManager.loadBundle(subname, function (err2) {
                    if (err2) {
                        return cc.log('load subpackage script fail.', subname);
                    }
                    cc.log('load subpackage script successfully.', subname);
                });
                return cc.log('load subpackage script fail.', subname + "_" + hqq.app.pinpai);
            }
            cc.log('load subpackage script successfully.', subname + "_" + hqq.app.pinpai);
        });
    },
    // 跳转至子游戏场景
    jumpToSubGame(enname) {
        let key = enname
        if (enname == "sbty1" || enname == "sbty2") {
            key = "sbty"
        } else if (enname == "zrsx1" || enname == "zrsx2") {
            key = "zrsx"
        }
        hqq.audioMgr.stopBg();
        if (enname == "hbsl" || enname == 'zrsx1' || enname == 'zrsx2'
            || enname == 'pccp' || enname == 'sbty1' || enname == 'sbty2'
            || enname == 'fctbj' ) { //  真人视讯 红包扫雷 派彩 沙巴体育 发财推币机 竖屏
            hqq.reflect && hqq.reflect.setOrientation("portrait")
            if (enname == 'zrsx1') {
                hqq.gameGlobal.subGameType = 40
            } else if (enname == 'zrsx2') {
                hqq.gameGlobal.subGameType = 24
            } else if (enname == 'sbty1') {
                hqq.gameGlobal.subGameType = 0
            } else if (enname == 'sbty2') {
                hqq.gameGlobal.subGameType = 1
            }
        }
        this.loadNextScene(enname);
    },
    loadNextScene(enname) {
        if (hqq.app.pinpai == "fuxin" ) {
            cc.director.preloadScene(hqq.agaSubGameList[enname].fuxin_lanchscene, this.preloadSceneOnProgress, (err, scene) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                cc.director.loadScene(hqq.agaSubGameList[enname].fuxin_lanchscene);
            })
        } else {
            cc.director.preloadScene(hqq.agaSubGameList[enname].lanchscene, this.preloadSceneOnProgress, (err, scene) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                cc.director.loadScene(hqq.agaSubGameList[enname].lanchscene);
            })
        }
    },
    // 点击子游戏icon
    onClickSubgame(event, customEventData) {
        if (hqq.isDebug) {
            this.jumpToSubGame(customEventData)
        } else if (hqq.agaSubGameList[customEventData].hasAccount) {
            this.jumpToSubGame(customEventData)
        } else {
            hqq.loginMgr.createFuxinSubAccount(customEventData, this.jumpToSubGame.bind(this))
        }
    },
    // 退出界面
    onClickExit() {
        this.node.destroy()
    },
    /** 创建子游戏账号 */
    createSubAccount(enname, mcallback, custom) {
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
    // update (dt) {},
    onDestroy() {
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheckup, "hallAgaLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFail, "hallAgaLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.hotProgress, "hallAgaLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFinish, "hallAgaLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.hotUp, "hallAgaLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheck, "hallAgaLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.hotWait, "hallAgaLayer")
    },
});
