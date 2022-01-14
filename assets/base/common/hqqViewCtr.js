
let hqqViewCtr = {
    parentNode: null,
    personalcenterIndex:cc.macro.MAX_ZINDEX - 18,
    netpanelIndex: cc.macro.MAX_ZINDEX - 17,
    noticelayerIndex: cc.macro.MAX_ZINDEX - 16,
    registerlayerIndex: cc.macro.MAX_ZINDEX - 15,
    personlayerIndex: cc.macro.MAX_ZINDEX - 14,
    bigsublayerIndex: cc.macro.MAX_ZINDEX - 13,
    smallsublayerIndex: cc.macro.MAX_ZINDEX - 12,
    congratulationIndex: cc.macro.MAX_ZINDEX - 11, // 恭喜获得金币层级
    consoleIndex: cc.macro.MAX_ZINDEX - 10,
    tipPanelIndex: cc.macro.MAX_ZINDEX - 1,
    publicalertIndex: cc.macro.MAX_ZINDEX - 1,

    nodelist:{},

    config: {
        smallsublayer: { path: "base/prefab/smallsublayer", scriptName: "hallPSubsLayer" },
        bigsublayer: { path: "base/prefab/bigsublayer", scriptName: "hallPSubbLayer" },
        tippanel: { path: "base/prefab/tippanel", scriptName: "hallTipPanel" },
        registerlayer: { path: "base/prefab/registerlayer", scriptName: "hallRegisterLayer" },
        personallayer: { path: "base/prefab/personallayer", scriptName: "hallPersonLayer" },
        noticelayer: { path: "base/prefab/noticelayer", scriptName: "hallNoticeLayer" },
        congratulation: { path: "base/prefab/congratulation", scriptName: "hallCongratulation" },
        downtip: { path: "base/prefab/downtip", scriptName: "hallDownTip" },
        console: { path: "base/prefab/Console", scriptName: "hqqConsole" },
        ioswebtip: { path: "base/prefab/ioswebtip", scriptName: "ioswebtip" },
        iostiplayer: { path: "base/prefab/iostiplayer", scriptName: "iostiplayer" },
        netpanel: { path: "base/prefab/netpanel", scriptName: "hqqNetPanel" },
        netnode: { path: "base/prefab/netnode", scriptName: "hqqNetNode" },
        hby: { path: "base/prefab/hbylayer", scriptName: "hallHBY" },
        aga: { path: "base/prefab/agalayer", scriptName: "hallAgaLayer" },
        payactivityweb: { path: "base/prefab/PayActivityWeb", scriptName: "" },
        zhibopanel: { path: "base/prefab/zhibopanel", scriptName: "" },
        publicalert: { path: "base/prefab/publicalert", scriptName: "hallPublicAlert" },
        kefulayer: { path: "prefab/kefulayer", scriptName: "" },
        personalcenter: { path: "prefab/personalcenter", scriptName: "" },
    },
    setParentNode(node) {
        this.parentNode = node;
    },

    showLayer(path, script, data, zindex, ispersist,tempRes=null) {
        zindex = zindex || 1000
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        cc.log("this.nodelist[nodename]=",this.nodelist[nodename])
        if (cc.isValid(this.nodelist[nodename])){
            cc.log("已经存在节点", nodename)
            if (nodename == "tippanel" || nodename == "downtip" || nodename == "publicalert" || nodename == "smallsublayer") {
                this.nodelist[nodename].getComponent(script).init(data)
            }
        } else {
            let Res = cc.resources;
            if(tempRes){
                Res = tempRes;
            }
            cc.log("不存在节点", nodename)
            Res.load(path, cc.Prefab, (err, prefab) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                if(cc.isValid(this.nodelist[nodename])){
                    cc.log("已存在节点", nodename,"不产生新的",this.nodelist[nodename])
                    return;
                }
                let node = cc.instantiate(prefab)
                if (data && data.position) {
                    node.setPosition(data.position)
                }
                if (data && data.scale) {
                    node.scaleX = data.scale
                    node.scaleY = data.scale
                } else if (cc.view._orientation == cc.macro.ORIENTATION_PORTRAIT && nodename == "smallsublayer") {
                    let scale = cc.winSize.width * 1.4 / node.width
                    node.scaleX = scale
                    node.scaleY = scale
                }
                if (data && cc.isValid( data.parent ) ) {
                    data.parent.addChild(node, zindex)
                } else if ( cc.isValid( this.parentNode ) ) {
                    this.parentNode.addChild(node, zindex)
                } else if (cc.isValid( cc.director.getScene() )) {
                    cc.director.getScene().addChild(node, zindex)
                }
                else
                {
                    node.destroy();
                    return;
                }
                this.nodelist[nodename] = node;
                let comp = node.getComponent(script);
                if(!comp){
                    comp = node.addComponent(script);
                }
                comp.init(data)
                if (ispersist) {
                    cc.game.addPersistRootNode(node);
                }

                if(cc.director.getScene()){
                    let Noticelayer = cc.director.getScene().getChildByName("noticelayer");
                    let PayActivityWeb = cc.director.getScene().getChildByName("PayActivityWeb");
                    if( cc.isValid(Noticelayer) && cc.isValid(PayActivityWeb) ){
                        if(Noticelayer.zIndex > PayActivityWeb.zIndex ){
                            let zIndex = Noticelayer.zIndex;
                            Noticelayer.zIndex = PayActivityWeb.zIndex;
                            PayActivityWeb.zIndex = zIndex;
                        } else if( Noticelayer.zIndex == PayActivityWeb.zIndex ){
                            let zIndex = Noticelayer.zIndex;
                            Noticelayer.zIndex = PayActivityWeb.zIndex;
                            PayActivityWeb.zIndex = zIndex + 1;
                        }
                    }
                }
            })
        }
    },
    init() {
        this.oldpinpailist = ["test","fuxin","xingui","xingba","nineone","xinsheng",
                              "xinhao","xinlong","huangshi","juding","huaxing","ninetwo","tianqi"];

        hqq.eventMgr.register(hqq.eventMgr.showSamlllayer, "hqqViewCtr", this.showSmallsublayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showBiglayer, "hqqViewCtr", this.showBigsublayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showTip, "hqqViewCtr", this.showTippanel.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showRegister, "hqqViewCtr", this.showRegisterlayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPerson, "hqqViewCtr", this.showPersonallayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showNotice, "hqqViewCtr", this.showNoticelayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showCongratulation, "hqqViewCtr", this.showCongratulation.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPayScene, "hqqViewCtr", this.showPayScene.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showDownTip, "hqqViewCtr", this.showDownTip.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showConsole, "hqqViewCtr", this.showConsole.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showIosWebTip, "hqqViewCtr", this.showIosWebTip.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showIosTipLayer, "hqqViewCtr", this.showIosTipLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showLineChoiceLayer, "hqqViewCtr", this.showLineChoiceLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showNetStateNode, "hqqViewCtr", this.showNetStateNode.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showHBYLayer, "hqqViewCtr", this.showHBYLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showAgaLayer, "hqqViewCtr", this.showAgaLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPayActivityWeb, "hqqViewCtr", this.showPayActivityWeb.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showJumpScene, "hqqViewCtr", this.showJumpScene.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.openZhiBoPanel, "hqqViewCtr", this.openZhiBoPanel.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPublicAlert, "hqqViewCtr", this.showPublicAlert.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showKeFuPanel, "hqqViewCtr", this.showKeFuPanel.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPersonalCenter, "hqqViewCtr", this.showPersonalCenter.bind(this))
        return this
    },
    showSmallsublayer(data) {
        let path = this.config.smallsublayer.path
        let scriptname = this.config.smallsublayer.scriptName
        this.showLayer(path, scriptname, data, this.smallsublayerIndex)
    },
    showBigsublayer(data) {
        let path = this.config.bigsublayer.path
        let scriptname = this.config.bigsublayer.scriptName
        this.showLayer(path, scriptname, data, this.bigsublayerIndex)
    },
    showTippanel(data) {
        let path = this.config.tippanel.path
        let scriptname = this.config.tippanel.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showRegisterlayer(data) {
        let path = this.config.registerlayer.path
        let scriptname = this.config.registerlayer.scriptName
        this.showLayer(path, scriptname, data, this.registerlayerIndex)
    },
    showPersonallayer(data) {
        if( hqq.app.pinpai == "ninetwo" ){
            this.showPersonalCenter(true);
        } else{
            let path = this.config.personallayer.path
            let scriptname = this.config.personallayer.scriptName
            this.showLayer(path, scriptname, data, this.personlayerIndex)
        }
    },
    showNoticelayer(data) {
        let path = this.config.noticelayer.path
        let scriptname = this.config.noticelayer.scriptName
        this.showLayer(path, scriptname, data, this.noticelayerIndex);
    },
    showCongratulation(data) {
        let payactivitywebpath = this.config.payactivityweb.path
        let payactivitywebnodename = payactivitywebpath.substring(payactivitywebpath.lastIndexOf('/') + 1)
        if (cc.director.getScene() && cc.director.getScene().getChildByName(payactivitywebnodename))
        {
            //活动网页开启时不显示恭喜获得金币
            return;
        }
        let path = this.config.congratulation.path
        let scriptname = this.config.congratulation.scriptName
        this.showLayer(path, scriptname, data, this.congratulationIndex)
    },
    showPayScene(data) {
        if (hqq.gameGlobal.pay.pay_host == "") {
            hqq.logMgr.time("最快的pay地址")
            let callback = (mdata, url) => {
                hqq.logMgr.timeEnd("最快的pay地址", url)
                hqq.gameGlobal.pay.pay_host = url;
                if (hqq.subModel.pay.lanchscene != "") {
                    hqq.gameGlobal.pay.from_scene = data
                    
                    cc.assetManager.loadBundle(hqq.loginMgr.payStr, (err)=> {
                        if (err) {
                            return cc.log('load subpackage script fail.', hqq.loginMgr.payStr + "_" + hqq.app.pinpai);
                        }
                        hqq[hqq.loginMgr.payStr] = cc.assetManager.getBundle(hqq.loginMgr.payStr);
                        cc.log('load subpackage script successfully.', hqq.loginMgr.payStr);
                        cc.director.preloadScene(hqq.subModel.pay.lanchscene, (err, scene) => {
                            if (err) {
                                cc.log(err)
                                hqq.logMgr.logerror(err)
                                return
                            }
                            cc.director.loadScene(hqq.subModel.pay.lanchscene);
                        })
                    })
                } else {
                    cc.log("请配置充值场景")
                }
            }
            hqq.http.requestFastestUrlLine({
                urllist: hqq.app.remoteSeverinfo.pay_host,
                endurl: "/checked",
                callback: callback,
                needJsonParse: false,
            })
        } else {
            if (hqq.subModel.pay.lanchscene != "") {
                hqq.gameGlobal.pay.from_scene = data
                
                cc.assetManager.loadBundle(hqq.loginMgr.payStr, (err)=> {
                    if (err) {
                        return cc.log('load subpackage script fail.', hqq.loginMgr.payStr + "_" + hqq.app.pinpai);
                    }
                    hqq[hqq.loginMgr.payStr] = cc.assetManager.getBundle(hqq.loginMgr.payStr);
                    cc.log('load subpackage script successfully.', hqq.loginMgr.payStr);
                    cc.director.preloadScene(hqq.subModel.pay.lanchscene, (err, scene) => {
                        if (err) {
                            cc.log(err)
                            hqq.logMgr.logerror(err)
                            return
                        }
                        cc.director.loadScene(hqq.subModel.pay.lanchscene);
                    })
                })
            } else {
                cc.log("请配置充值场景")
            }
        }
    },
    showDownTip(data) {
        let path = this.config.downtip.path
        let scriptname = this.config.downtip.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showConsole(data) {
        let path = this.config.console.path
        let scriptname = this.config.console.scriptName
        this.showLayer(path, scriptname, data, this.consoleIndex)
    },
    showIosWebTip(data) {
        let path = this.config.ioswebtip.path
        let scriptname = this.config.ioswebtip.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex, true)
    },
    showIosTipLayer(data) {
        let path = this.config.iostiplayer.path
        let scriptname = this.config.iostiplayer.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showLineChoiceLayer(data) {
        hqq.app.hasLineChoiceLayer = true
        let path = this.config.netpanel.path
        let scriptname = this.config.netpanel.scriptName
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showNetStateNode(data) {
        let path = this.config.netnode.path
        let scriptname = this.config.netnode.scriptName
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showHBYLayer(data) {
        let path = this.config.hby.path
        let scriptname = this.config.hby.scriptName
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showAgaLayer(data) {
        let path = this.config.aga.path
        let scriptname = this.config.aga.scriptName
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showPayActivityWeb(data,forcedelete=false,prefabpath = "",script="" ){
        let path = this.config.payactivityweb.path;
        if(prefabpath){
            path = prefabpath;
        }
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let payactivityweb = null;
        if (cc.director.getScene() && cc.director.getScene().getChildByName(nodename)) {
            payactivityweb = cc.director.getScene().getChildByName(nodename)
        }
        if(forcedelete){
            if(cc.isValid(payactivityweb)){
                payactivityweb.destroy();
            }
        }
        else if( !data ){
            if(cc.isValid(payactivityweb)){
                payactivityweb.active = false;
                // payactivityweb.destroy();
            }
        } else{
            let setpayactivityweb = ( node )=>{
                let tempurl = "";
                if(hqq.app.huanjin=="pre"){
                    tempurl = hqq.app.canHotServer+"/com.test.pre.android/events/index.html";
                }else if(hqq.app.huanjin=="online"){
                    tempurl = hqq.app.canHotServer+"/com.test.online.android/events/index.html";
                }
                
                let dataStr = "?host="+hqq.gameGlobal.pay.pay_host;
                // dataStr += "&imHost=" +  hqq.gameGlobal.im_host;
                dataStr += "&user_id=" + hqq.gameGlobal.pay.user_id;
                dataStr += "&user_name=" + decodeURI(hqq.gameGlobal.pay.user_name);
                dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id;
                dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532";
                dataStr += "&center_auth=" + hqq.gameGlobal.token;
                dataStr += hqq.gameGlobal.ipList[0]?"&login_ip=" + hqq.gameGlobal.ipList[0]:"&login_ip=" + hqq.gameGlobal.regin_ip;
                dataStr += "&regin_ip=" + hqq.gameGlobal.regin_ip;
                dataStr += "&device_id=" + hqq.app.deviceID;
                if(data instanceof Array && data.length > 1 ){
                    dataStr += "&firstPage=" + data[1];
                }
                let webview = node.getChildByName("web").getComponent(cc.WebView);
                webview.url = encodeURI(tempurl+dataStr);
                webview = null;
                if(cc.director.getScene()){
                    let Noticelayer = cc.director.getScene().getChildByName("noticelayer");
                    let PayActivityWeb = node;
                    if( cc.isValid(Noticelayer) && cc.isValid(PayActivityWeb) ){
                        if(Noticelayer.zIndex > PayActivityWeb.zIndex ){
                            let zIndex = Noticelayer.zIndex;
                            Noticelayer.zIndex = PayActivityWeb.zIndex;
                            PayActivityWeb.zIndex = zIndex;
                        }
                    }
                }
            }
            if(cc.isValid(payactivityweb)){
                payactivityweb.active = true;
                setpayactivityweb(payactivityweb);
            } else{
                let tempRes = cc.resources;
                if(prefabpath){
                    tempRes = hqq["hall_"+hqq.app.pinpai];
                }
                tempRes.load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        cc.director.getScene().addChild(node,cc.macro.MAX_ZINDEX);
                    }else{
                        node.destroy();
                        return;
                    }
                    if(script){
                        if(!node.getComponent(script)){
                            node.addComponent(script);
                        }
                    }
                    setpayactivityweb(node);
                })
            }
        }
        payactivityweb = null;
    },
    showJumpScene(data){
        if(data === "hall" ){
            cc.assetManager.loadBundle(hqq.loginMgr.hallStr, (err)=>{
                if (err) {
                    cc.log(err);
                    return;
                }
                hqq[hqq.loginMgr.hallStr] = cc.assetManager.getBundle(hqq.loginMgr.hallStr);
                
                for(let i = 0; i < this.oldpinpailist.length; i++ ){
                    if(hqq.app.pinpai === this.oldpinpailist[ i ] ){
                        cc.director.preloadScene("hall", (completedCount, totalCount, item)=>{
                            hqq.eventMgr.dispatch(hqq.eventMgr.hotProgress, completedCount / totalCount, "jiazai")
                        }, (err6, scene) => {
                            if (err6) {
                                cc.log(err6)
                                hqq.logMgr.logerror(err6)
                                return
                            }
                            cc.director.loadScene("hall");
                        })
                        return;
                    }
                }
                hqq[hqq.loginMgr.hallStr].preloadScene("hall", (completedCount, totalCount, item)=>{
                    hqq.eventMgr.dispatch(hqq.eventMgr.hotProgress, completedCount / totalCount, "jiazai")
                }, (err7, scene) => {
                    if (err7) {
                        cc.log(err7)
                        hqq.logMgr.logerror(err7)
                        return
                    }
                    hqq[hqq.loginMgr.hallStr].loadScene("hall",(err8,scene)=>{
                        if(err8){
                            cc.log(err8);
                            return;
                        }
                        cc.director.runScene(scene);
                    });
                })
            })
            return;
        } else if( data === "proxy" ){

            cc.assetManager.loadBundle(hqq.loginMgr.proxyStr, (err)=> {
                if (err) {
                    return cc.log('load subpackage script fail.', hqq.loginMgr.proxyStr + "_" + hqq.app.pinpai);
                }
                hqq[hqq.loginMgr.proxyStr] = cc.assetManager.getBundle(hqq.loginMgr.proxyStr);
                cc.log('load subpackage script successfully.', hqq.loginMgr.proxyStr);

                for(let i = 0; i < this.oldpinpailist.length; i++ ){
                    if(hqq.app.pinpai === this.oldpinpailist[ i ] ){
                        cc.director.preloadScene(hqq.subModel.proxy.lanchscene, (err3, scene) => {
                            if (err3) {
                                cc.log(err3)
                                hqq.logMgr.logerror(err3)
                                return
                            }
                            cc.director.loadScene(hqq.subModel.proxy.lanchscene);
                        })
                        return;
                    }
                }

                hqq[hqq.loginMgr.proxyStr].preloadScene(hqq.loginMgr.proxyStr,  (err7, scene) => {
                    if (err7) {
                        cc.log(err7)
                        hqq.logMgr.logerror(err7)
                        return
                    }
                    hqq[hqq.loginMgr.proxyStr].loadScene(hqq.loginMgr.proxyStr,(err8,scene)=>{
                        if(err8){
                            cc.log(err8);
                            return;
                        }
                        cc.director.runScene(scene);
                    });
                })
            });
            return;
        }
        let GameCode = hqq.gameGlobal.zhibo.GameCode
        if(data)
        {
            GameCode = data;
        }
        if( hqq.subGameList[ GameCode ] ){
            if(hqq.hotUpdateMgr.getSubGameIsOnUp(GameCode)){
                hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                    type: 10,
                    msg: hqq.getTip("str9"),
                })
            } else{
                if (!hqq.app || !hqq.app.remoteGamelist) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("str9"),
                    })
                    return
                }
                let subdata = null;
                for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
                    if (hqq.subGameList[GameCode].game_id === hqq.app.remoteGamelist[i].game_id) {
                        subdata = hqq.app.remoteGamelist[i];
                        break;
                    }
                }

                if (subdata && subdata.open == 0) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("str9"),
                    })
                } else {
                    let subgamev;
                    let localsubv = hqq.localStorage.get(GameCode, "versionKey");
                    if (GameCode == 'zrsx1' || GameCode == 'zrsx2') {
                        localsubv = hqq.localStorage.get('zrsx', "versionKey");
                        subgamev = hqq.app.subGameVersion['zrsx'];
                    } else if (GameCode == 'sbty1' || GameCode == 'sbty2') {
                        localsubv = hqq.localStorage.get('sbty', "versionKey");
                        subgamev = hqq.app.subGameVersion['sbty'];
                    } else {
                        subgamev = hqq.app.subGameVersion[GameCode];
                    }
                    // let txt = "local version: " + localsubv + " | remote version:" + subgamev;
                    let needup = hqq.commonTools.versionCompare(localsubv, subgamev);
                    if (needup && !cc.sys.isBrowser && GameCode != "aga") { // && cc.sys.os != "Windows"
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                            type: 10,
                            msg: cc.js.formatStr(hqq.getTip("str10"),hqq.subGameList[ GameCode ].zhname),
                        })
                    } else {
                        let nowd = new Date().getTime()
                        let deletenum = 0
                        let loginHistory = hqq.localStorage.get(GameCode, "loginHistory");
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
                        } else{
                            loginHistory = [];
                        }
                        loginHistory.push(new Date().getTime())
                        hqq.localStorage.set(GameCode, "loginHistory", loginHistory)
                        if(subdata.hasAccount){
                            this.jumpToSubGame( GameCode );
                        } else{
                            hqq.loginMgr.createSubAccount(GameCode, this.jumpToSubGame.bind(this))
                        }
                    }
                }
            }
        } else{
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                type: 10,
                msg: hqq.getTip("str9"),
            })
        }
    },
    // 跳转至子游戏场景
    jumpToSubGame(subgamern) {
        let key = subgamern
        if (subgamern == "sbty1" || subgamern == "sbty2") {
            key = "sbty"
        } else if (subgamern == "zrsx1" || subgamern == "zrsx2") {
            key = "zrsx"
        }
        cc.assetManager.loadBundle(subgamern, (err)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if (hqq.app.pinpai == "fuxin"||hqq.app.pinpai=="juding") {
                cc.director.preloadScene(hqq.subGameList[key].fuxin_lanchscene, (err, scene) => {
                    if (err) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                            type: 10,
                            msg: hqq.getTip("str9"),
                        })
                        hqq.logMgr.logerror(err)
                        return
                    }
                    cc.director.loadScene(hqq.subGameList[key].fuxin_lanchscene);
                })
            } else {
                cc.director.preloadScene(hqq.subGameList[key].lanchscene, (err, scene) => {
                    if (err) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                            type: 10,
                            msg: hqq.getTip("str9"),
                        })
                        hqq.logMgr.logerror(err)
                        return
                    }
                    cc.director.loadScene(hqq.subGameList[key].lanchscene);
                })
            }
        })
    },
    openZhiBoPanel(data){
        let path = this.config.zhibopanel.path;
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let zhibopanel = null;
        if(cc.director.getScene()){
            zhibopanel = cc.director.getScene().getChildByName(nodename)
        }
        if(data){
            if ( cc.isValid( zhibopanel ) ) {
                
            } else {
                cc.resources.load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        cc.director.getScene().addChild(node,cc.macro.MAX_ZINDEX)
                    }else{
                        node.destroy();
                        return;
                    }
                    cc.game.addPersistRootNode(node);
                })
            }
        } else{
            if ( cc.isValid( zhibopanel )){
                cc.game.removePersistRootNode(zhibopanel);
                zhibopanel.destroy();
            }
        }
       
        zhibopanel = null;
    },
    showPublicAlert(data){
        let path = this.config.publicalert.path
        let scriptname = this.config.publicalert.scriptName
        this.showLayer(path, scriptname, data, this.publicalertIndex)
    },
    showKeFuPanel(data){
        let path = this.config.kefulayer.path;
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let kefulayer = null;
        if(cc.director.getScene()){
            kefulayer = cc.director.getScene().getChildByName(nodename)
        }
        if(data){
            if ( cc.isValid( kefulayer ) ) {
                kefulayer.active = true;
            } else {
                hqq["hall_ninetwo"].load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        cc.director.getScene().addChild(node,cc.macro.MAX_ZINDEX-1)
                    }else{
                        node.destroy();
                        return;
                    }
                })
            }
        } else{
            if ( cc.isValid( kefulayer )){
                kefulayer.active = false;
            }
        }
       
        kefulayer = null;
    },
    showPersonalCenter(data){
        let path = this.config.personalcenter.path;
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let personalcenter = null;
        if(cc.director.getScene()){
            personalcenter = cc.director.getScene().getChildByName(nodename)
        }
        if(data){
            if ( cc.isValid( personalcenter ) ) {
                personalcenter.active = true;
            } else {
                hqq["hall_ninetwo"].load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        cc.director.getScene().addChild(node,this.personalcenterIndex)
                    }else{
                        node.destroy();
                        return;
                    }
                })
            }
        } else{
            if ( cc.isValid( personalcenter )){
                personalcenter.active = false;
            }
        }
       
        personalcenter = null;
    },
}
module.exports = hqqViewCtr