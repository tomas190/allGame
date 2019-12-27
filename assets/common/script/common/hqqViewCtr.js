/*
 * @Author: burt
 * @Date: 2019-10-23 11:22:51
 * @LastEditors: burt
 * @LastEditTime: 2019-11-15 16:11:32
 * @Description: 
 */
let gHandler = require("gHandler");
let hqqViewCtr = {
    registerlayerIndex: cc.macro.MAX_ZINDEX - 16,
    noticelayerIndex: cc.macro.MAX_ZINDEX - 15,
    personlayerIndex: cc.macro.MAX_ZINDEX - 14,
    bigsublayerIndex: cc.macro.MAX_ZINDEX - 13,
    smallsublayerIndex: cc.macro.MAX_ZINDEX - 12,
    congratulationIndex: cc.macro.MAX_ZINDEX - 11, // 恭喜获得金币层级
    consoleIndex: cc.macro.MAX_ZINDEX - 10,
    tipPanelIndex: cc.macro.MAX_ZINDEX - 1,

    showLayer(path, script, data, zindex) {
        zindex = zindex || 1000
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        if (cc.director.getScene().getChildByName(nodename)) {
            if (nodename == "tippanel" || nodename == "downtip") {
                let child = cc.director.getScene().getChildByName(nodename)
                child.getComponent(script).init(data)
            }
        } else {
            cc.loader.loadRes(path, cc.Prefab, function (err, prefab) {
                if (err) {
                    console.log(err)
                    gHandler.logMgr.logerror(err)
                    return
                }
                let node = cc.instantiate(prefab)
                cc.director.getScene().addChild(node, zindex)
                node.getComponent(script).init(data)
            })
        }
    },
    init() {
        gHandler.eventMgr.register(gHandler.eventMgr.showSamlllayer, "hqqViewCtr", this.showSmallsublayer.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showBiglayer, "hqqViewCtr", this.showBigsublayer.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showTip, "hqqViewCtr", this.showTippanel.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showRegister, "hqqViewCtr", this.showRegisterlayer.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showPerson, "hqqViewCtr", this.showPersonallayer.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showNotice, "hqqViewCtr", this.showNoticelayer.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showCongratulation, "hqqViewCtr", this.showCongratulation.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showPayScene, "hqqViewCtr", this.showPayScene.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showDownTip, "hqqViewCtr", this.showDownTip.bind(this))
        gHandler.eventMgr.register(gHandler.eventMgr.showConsole, "hqqViewCtr", this.showConsole.bind(this))
        return this
    },
    showSmallsublayer(data) {
        let path = "hall/prefab/smallsublayer"
        let scriptname = "hallPSubsLayer"
        this.showLayer(path, scriptname, data, this.smallsublayerIndex)
    },
    showBigsublayer(data) {
        let path = "hall/prefab/bigsublayer"
        let scriptname = "hallPSubbLayer"
        this.showLayer(path, scriptname, data, this.bigsublayerIndex)
    },
    showTippanel(data) {
        let path = "hall/prefab/tippanel"
        let scriptname = "hallTipPanel"
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showRegisterlayer(data) {
        let path = "hall/prefab/registerlayer"
        let scriptname = "hallRegisterLayer"
        this.showLayer(path, scriptname, data, this.registerlayerIndex)
    },
    showPersonallayer(data) {
        let path = "hall/prefab/personallayer"
        let scriptname = "hallPersonLayer"
        this.showLayer(path, scriptname, data, this.personlayerIndex)
    },
    showNoticelayer(data) {
        let path = "hall/prefab/noticelayer"
        let scriptname = "hallNoticeLayer"
        this.showLayer(path, scriptname, data, this.noticelayerIndex)
    },
    showCongratulation(data) {
        let path = "hall/prefab/congratulation"
        let scriptname = "hallCongratulation"
        this.showLayer(path, scriptname, data, this.congratulationIndex)
    },
    showPayScene(data) {
        if (gHandler.gameGlobal.pay.pay_host == "") {
            gHandler.logMgr.time("最快的pay地址")
            let callback = (url) => {
                gHandler.logMgr.timeEnd("最快的pay地址", url)
                gHandler.gameGlobal.pay.pay_host = url;
                if (gHandler.gameConfig.subModel.pay.lanchscene != "") {
                    gHandler.gameGlobal.pay.from_scene = data
                    cc.director.loadScene(gHandler.gameConfig.subModel.pay.lanchscene)
                } else {
                    console.log("请配置充值场景")
                }
            }
            gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host, null, "/checked", callback)
        } else {
            if (gHandler.gameConfig.subModel.pay.lanchscene != "") {
                gHandler.gameGlobal.pay.from_scene = data
                cc.director.loadScene(gHandler.gameConfig.subModel.pay.lanchscene)
            } else {
                console.log("请配置充值场景")
            }
        }
    },
    showDownTip(data) {
        let path = "hall/prefab/downtip"
        let scriptname = "hallDownTip"
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showConsole(data) {
        let path = "hall/prefab/Console"
        let scriptname = "console"
        this.showLayer(path, scriptname, data, this.consoleIndex)
    },

}
module.exports = hqqViewCtr