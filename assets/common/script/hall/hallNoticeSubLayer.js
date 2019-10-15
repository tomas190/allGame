
/*
 * @Author: burt
 * @Date: 2019-09-30 10:18:57
 * @LastEditors: burt
 * @LastEditTime: 2019-10-10 09:27:29
 * @Description: 
 */


cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Sprite,
        time: cc.Label,
        txt: cc.Label,
        scroll: cc.ScrollView,
        email: cc.SpriteFrame,
        notice: cc.SpriteFrame,

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
            this.title.spriteFrame = this.email
        } else {
            this.title.spriteFrame = this.notice
        }
        this.txt.string = custom.words
        this.txt._updateRenderData(true)
        this.scroll.content.height = this.time.node.height + this.txt.node.height
    }

    // update (dt) {},
});
