/*
 * @Author: burt
 * @Date: 2020-01-01 21:46:19
 * @LastEditors  : burt
 * @LastEditTime : 2020-01-02 18:43:30
 * @Description: ios网页提示
 */
let gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start() {

    },
    init(data) { },
    onClickClose() {
        this.node.removeFromParent(true);
        gHandler.localStorage.globalSet("noShowIosWebTip", true)
    },
    // update (dt) {},
});
