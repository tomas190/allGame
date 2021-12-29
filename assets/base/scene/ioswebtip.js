
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.UILoad()
    },

    start() {

    },
    // UI动态加载
    UILoad() {
        hqq.imgLoad(this.node, "base/language/" + hqq.language + "/img/tips")
    },
    init(data) { },
    onClickClose() {
        this.node.destroy()
        hqq.localStorage.globalSet("noShowIosWebTip", true)
    },
    // update (dt) {},
});
