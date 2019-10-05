
/*
 * @Author: burt
 * @Date: 2019-09-30 10:18:57
 * @LastEditors: burt
 * @LastEditTime: 2019-10-03 16:27:32
 * @Description: 
 */


cc.Class({
    extends: cc.Component,

    properties: {
        time: cc.Label,
        txt: cc.Label,
        scroll: cc.ScrollView,
    },

    onLoad() {

    },

    start() {

    },

    onClickClose() {
        this.node.active = false
    },

    init(custom, isemail) {
        this.time.node.active = isemail
        if (isemail) {
            this.time.string = custom.strtime
        }
        this.txt.string = custom.words
        this.txt._updateRenderData(true)
        this.scroll.content.height = this.time.node.height + this.txt.node.height
    }

    // update (dt) {},
});
