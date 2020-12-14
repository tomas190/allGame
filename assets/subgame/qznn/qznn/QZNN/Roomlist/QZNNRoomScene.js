/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
var msgSender = require("QZNNMsgSender")
var cmd = require("QZNNCMD");
cc.Class({
    extends: cc.Component,

    properties: {
        area_number: null, //场号
    },

    onLoad: function () {
        this._gameView = this.node.getComponent("QZNNRoomView");
        let pn = cc.find('Canvas/roomList/header/wifi')
        hqq.eventMgr.dispatch(hqq.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })
    },

    start: function () {
    },

    initSence: function () {
    },

    resetSence: function () {
        this.area_number = null;
        cc.gg.global.gameRoomData = null;
        this.onEvenHandle();
    },

    onEvenHandle: function () {
    },

    onDestroy: function () {
        cc.gg.protoBuf.removeAllHandler();
    },

    getClassName() {
        return "Room";
    },

    openEdit() {
        if (cmd.CANSWITCH) {
            cmd.CANSWITCH = false;
            hqq.eventMgr.dispatch(hqq.eventMgr.showPerson, null)
            this.scheduleOnce(() => {
                cmd.CANSWITCH = true;
            }, 1)
        }
    },

    loadView() {
        if (cmd.CANSWITCH) {
            cmd.CANSWITCH = false;
            cc.gg.protoBuf.isAutoConnect = false;
            msgSender.sendLoginOut();
            hqq.eventMgr.dispatch(hqq.eventMgr.showPayScene, "NNGame") // 跳转充提场景
        }
    }

});