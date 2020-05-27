/*
 *  Dawnson 2019-4-02
 */
cc.Class({
    extends: cc.Component,

    properties: {

    },


    initzation: function (e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        this.addEvenListener(this.node)
    },
    addEvenListener: function (e) {
        cc.gg.utils.addClickEventEND(this.cancelS, this.cancelFun.bind(this));
        cc.gg.utils.addClickEventEND(this.deleteSession, this.deleteSessionFun.bind(this));
    },
    initView: function () {
        this.bottom_top = this.node.getChildByName("bottom-top");
        this.deleteSession = this.bottom_top.getChildByName("deleteSession");
        this.cancelS = this.bottom_top.getChildByName("cancelS");
    },
    resetView: function () {
        this.bottom_top.setPosition(0, -105);
    },
    cancelFun: function () {
        this.bottomAnimate()
    },
    deleteSessionFun: function () {
        this.bottomAnimate();
        // for (var i = 0; i < cc.gg.global.agentServerUserData.length; i++) {
        //     if (cc.gg.global.deleAccountID == cc.gg.global.agentServerUserData[i].userID || cc.gg.global.deleAccountID == cc.gg.global.userInfo.userID) {
        //         //调起提示框   客服与代理不允许删除
        //         this._gameView._topPancel.runAlert("不允许删除代理客服与自己的会话")
        //         return
        //     }
        // }
        this._gameView._scene.sendDelConversion({
            toId: cc.gg.global.deleAccountID
        })
    },
    //底部bottom动画
    bottomAnimate: function () {
        var height = this.bottom_top.height;
        const parentNode = this.node.parent;
        const coverNode = parentNode.getChildByName("coverNode");
        var actionOne = cc.moveTo(0.1, cc.v2(0, -105));
        var actionTwo = cc.moveTo(0.1, cc.v2(0, -75 + height));
        var pos = this.bottom_top.getPosition();
        if (pos.y > -105) {
            //落下状态
            this.bottom_top.runAction(actionOne);
            coverNode.active = false;

        } else {
            //弹起状态
            this.bottom_top.runAction(actionTwo);
            coverNode.active = true;
        }
    },
    upAnimate: function () {
        var height = this.bottom_top.height;
        var actionTwo = cc.moveTo(0.1, cc.v2(0, -105 + height));
        this.bottom_top.runAction(actionTwo);
    },
    downAnimate: function () {
        var height = this.bottom_top.height;
        var action = cc.moveTo(0.1, cc.v2(0, -105));
        this.bottom_top.runAction(actionOne);
    }
});