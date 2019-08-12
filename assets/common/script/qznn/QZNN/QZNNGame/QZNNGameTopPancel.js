/*
 *  Dawnson 2019-8-01
 *  15302765815@163.com
 */
cc.Class({
    extends: cc.Component,

    properties: {

    },

    initzation: function(e, t) {
        this.node = e;
        this._GameView = t;
        this.initView();
        this.addEvenListener(this.node);
    },
    addEvenListener: function(e) {
        cc.gg.utils.addClickEventEND(this.backRoomList, this.funBack.bind(this));
        cc.gg.utils.addClickEventEND(this.rule, this.funRule.bind(this));
        cc.gg.utils.addClickEventEND(this.music, this.funMusic.bind(this));
    },
    initView: function() {
        this.backRoomList = this.node.getChildByName("backRoomList");
        this.rule = this.node.getChildByName("rule")
        this.music = this.node.getChildByName("music");
    },
    resetView: function() {

    },
    funBack: function() {
        console.log("返回大厅")
        this._GameView.backRoomList()
    },
    funRule: function() {
        console.log("规则")
    },
    funMusic: function() {
        console.log("开关闭音乐");
    },


});