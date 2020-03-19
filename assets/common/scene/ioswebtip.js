
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
