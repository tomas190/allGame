/*
 * @Author: burt
 * @Date: 2019-10-02 09:09:29
 * @LastEditors: burt
 * @LastEditTime: 2019-10-02 13:36:37
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

    onClickExit() {
        this.node.active = false
    },
    
    onClickRegister() {
        console.log("??")
        this.node.active = false
        gHandler.eventMgr.dispatch("showbigsublayer",3)
    },

    // update (dt) {},
});
