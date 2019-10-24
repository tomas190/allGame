/*
 * @Author: burt
 * @Date: 2019-10-23 11:22:51
 * @LastEditors: burt
 * @LastEditTime: 2019-10-24 16:06:36
 * @Description: 
 */
let gHandler = require("gHandler");
let hqqViewCtr = {
    registerlayerIndex: 1000,
    noticelayerIndex: 1001,
    personlayerIndex: 1002,
    bigsublayerIndex: 1003,
    smallsublayerIndex: 1004,
    tipPanelIndex: 1005,
    congratulationIndex: 2000, // 恭喜获得金币层级

    showLayer(path, script, data, zindex) {
        zindex = zindex || 1000
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        if (cc.director.getScene().getChildByName(nodename)) {
            if (nodename == "tippanel") {
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
        console.log("showRegister")
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
        if (gHandler.gameGlobal.pay.pay_host == "" && !gHandler.gameGlobal.isdev) {
            let starttime = gHandler.commonTools.getSM();
            let callback = (url) => {
                let endtime = gHandler.commonTools.getSM();
                gHandler.logMgr.log("最快的pay地址", url, "时间间隔：", endtime.miao - starttime.miao, 's', endtime.mill - starttime.mill, 'ms')
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


}
module.exports = hqqViewCtr