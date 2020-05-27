/*
 *  Dawnson 2019-4-02
 */
cc.Class({
    extends: cc.Component,

    properties: {
        lock: true
    },
    initzation: function (e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        this.addEvenListener(this.node);
    },
    addEvenListener: function (e) {
        cc.gg.utils.addClickEventEND(this.mask, this.toggleStatus.bind(this));
    },
    initView: function () {
        this.mask = this.node.getChildByName("mask");
    },
    toggleStatus: function () {
        var self = this;
        if (!this.lock) {
            return
        }
        this.lock = false;
        var width = this.node.width;
        var status = this.mask.active;
        if (status) {
            self.mask.active = false;
            var active = cc.sequence(cc.moveBy(.3, -width, 0), cc.callFunc(function () {
                self.lock = true;
            }))
        } else {
            var active = cc.sequence(cc.moveBy(.3, width, 0), cc.callFunc(function () {
                self.mask.active = true;
                self.lock = true;
            }))
        }
        this.node.runAction(active);
    }
});