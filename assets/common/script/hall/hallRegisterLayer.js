/*
 * @Author: burt
 * @Date: 2019-10-02 09:09:29
 * @LastEditors  : burt
 * @LastEditTime : 2020-02-13 11:24:26
 * @Description: 
 */
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        goldlabel: cc.Label,
    },

    // onLoad () {},

    start() {

    },

    init() {

    },

    onClickExit() {
        this.node.removeFromParent(true)
    },

    onClickRegister() {
        if (gHandler.gameGlobal.player.phonenum != "") {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "已经绑定过手机")
        } else {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showBiglayer, 3)
            this.node.removeFromParent(true)
        }
    },

    // update (dt) {},
});
