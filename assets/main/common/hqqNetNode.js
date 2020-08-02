let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        spritenode: cc.Node,
        backSprite: {
            default: [],
            type: [cc.SpriteFrame],
        },
        label: cc.Label,
        tipnode: cc.Node,
    },

    onLoad() {
        this.upTime = 0;
        this.centerTime = 0;
        if (cc.director.getScene().name == "loading") {
            this.tipnode.active = true
            this.tipnode.on(cc.Node.EventType.TOUCH_END, (event) => {
                let data = {
                    upgradeList: gHandler.localStorage.globalGet(gHandler.appGlobal.hotServerKey),
                    centerList: gHandler.appGlobal.serverList,
                    notshowexitbtn: false,
                    uptime: this.upTime,
                    centertime: this.centerTime,
                }
                if (cc.director.getScene().name == "loading") {
                    data.restartGame = true
                    data.notshowexitbtn = true
                }
                gHandler.eventMgr.dispatch(gHandler.eventMgr.showLineChoiceLayer, data)
            })
        }
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            let data = {
                upgradeList: gHandler.localStorage.globalGet(gHandler.appGlobal.hotServerKey),
                centerList: gHandler.appGlobal.serverList,
                notshowexitbtn: false,
                uptime: this.upTime,
                centertime: this.centerTime,
            }
            if (cc.director.getScene().name == "loading") {
                data.restartGame = true
                data.notshowexitbtn = true
            }
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showLineChoiceLayer, data)
        })
        gHandler.eventMgr.register(gHandler.eventMgr.refreshNetState, "netnode", this.refreshNetState.bind(this))
        this.blinkaction = cc.repeatForever(cc.blink(3, 3));
        this.isOnAction = false
    },

    start() {

    },

    init() {
    },
    refreshNetState(data) {
        this.upTime = data.timelist[0] > data.timelist[1] ? data.timelist[0] : data.timelist[1]
        this.centerTime = data.timelist[2]
        this.label.node.color = this.getColor(data.time);
        if (data.time <= gHandler.appGlobal.netState.outstanding) {
            this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[4]
            this.spritenode.stopAllActions()
            this.isOnAction = false
            this.spritenode.opacity = 255
            this.label.string = data.time + "ms"
        } else if (data.time <= gHandler.appGlobal.netState.good) {
            this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[3]
            this.spritenode.stopAllActions()
            this.isOnAction = false
            this.spritenode.opacity = 255
            this.label.string = data.time + "ms"
        } else if (data.time <= gHandler.appGlobal.netState.kind) {
            this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[2]
            if (!this.isOnAction) {
                this.spritenode.runAction(this.blinkaction)
                this.isOnAction = true
            }
            this.label.string = data.time + "ms"
        } else if (data.time <= gHandler.appGlobal.netState.bad) {
            this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[1]
            if (!this.isOnAction) {
                this.spritenode.runAction(this.blinkaction)
                this.isOnAction = true
            }
            this.label.string = data.time + "ms"
        } else {
            this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[0]
            if (!this.isOnAction) {
                this.spritenode.runAction(this.blinkaction)
                this.isOnAction = true
            }
            this.label.string = "无信号"
        }
    },
    getColor(time) {
        if (time <= gHandler.appGlobal.netState.outstanding) {
            return cc.color(146, 255, 24)
        } else if (time <= gHandler.appGlobal.netState.good) {
            return cc.color(255, 185, 29)
        } else if (time <= gHandler.appGlobal.netState.kind) {
            return cc.color(255, 21, 36)
        } else if (time <= gHandler.appGlobal.netState.bad) {
            return cc.color(145, 145, 145)
        } else {
            return cc.color(255, 255, 255)
        }
    },
    onDestroy() {
        gHandler.eventMgr.unregister(gHandler.eventMgr.refreshNetState, "netnode")
    }

    // update (dt) {},
});
