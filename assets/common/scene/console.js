
/*
 * @Author: burt
 * @Date: 2019-10-22 15:56:51
 * @LastEditors: burt
 * @LastEditTime: 2019-10-23 10:20:44
 * @Description: 
 */
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        scroll: cc.ScrollView,
        text: cc.Label,
        btn: cc.Node,
    },

    onLoad() {
        console.log("console 开始游戏代码，loading界面加载")
        // cc.game.addPersistRootNode(this.node)
        // this.node.zIndex = cc.macro.MAX_ZINDEX
        // this.btnpos = this.btn.getPosition()
        // this.infoList = []
        // gHandler.console = this.consolelog
        // // this.btn.on(cc.Node.EventType.TOUCH_START, this.onClickStart, this)
        // this.btn.on(cc.Node.EventType.TOUCH_MOVE, this.onClickMove, this)
        // this.btn.on(cc.Node.EventType.TOUCH_END, this.onClickEnd, this)
    },

    start() {

    },
    consolelog(...arg) {
        if (!this.infoList) {
            this.infoList = []
        }
        this.infoList.push(...arg)
        if (this.infoList.length >= 1000) {
            this.infoList.splice(0, this.infoList.length - 1000)
        }
        console.log.apply(console, arguments)
    },

    // onClickStart(event) {
    //     console.log("onClickStart", event)
    //     event.stopPropagation();
    // },
    onClickMove(event) {
        let pos = event.touch.getLocation()
        pos = this.node.convertToNodeSpaceAR(pos)
        if (this.btnpos.x != pos.x || this.btnpos.y != pos.y) {
            this.btn.setPosition(pos)
        } else {

        }
        event.stopPropagation();
    },
    onClickEnd(event) {
        if (this.btnpos.x != this.btn.x || this.btnpos.y != this.btn.y) {

        } else {
            this.onClickBtn()
        }
        this.btnpos = this.btn.getPosition()
        event.stopPropagation();
    },

    onClickBtn() {
        console.log("onClickBtn")
        this.scroll.node.active = !this.scroll.node.active;
    },

    // update (dt) {},
});
