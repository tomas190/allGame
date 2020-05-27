/**
 * Dawnson 2019-04-03
 */
var headerPanel = require("msgTopNode");
var bottomPanel = require("msgBottomNode");
var centerPanel = require("msgCenterNode");

cc.Class({
    extends: cc.Component,
    properties: {
        orderOtherType1: cc.Prefab,
        orderOtherType2: cc.Prefab,
        orderOtherType3: cc.Prefab,
        orderOtherType4: cc.Prefab,
        orderOtherType5: cc.Prefab,
        orderOtherType6: cc.Prefab,
        orderOtherType7: cc.Prefab,
        orderOtherType8: cc.Prefab,
        orderOtherType9: cc.Prefab,
        orderOtherType10: cc.Prefab,
        orderOtherType11: cc.Prefab,
        orderMeType1: cc.Prefab,
        orderMeType2: cc.Prefab,
        orderMeType3: cc.Prefab,
        orderMeType4: cc.Prefab,
        orderMeType5: cc.Prefab,
        orderMeType6: cc.Prefab,
        orderMeType7: cc.Prefab,
        orderMeType8: cc.Prefab,
        orderMeType9: cc.Prefab,
        orderMeType10: cc.Prefab,
        orderMeType11: cc.Prefab,
        orderEnd: cc.Prefab,
        meImg: cc.Prefab,
        otherMsgText: cc.Prefab,
        meMsgText: cc.Prefab,
        otherImg: cc.Prefab,
        outherMsgType5: cc.Prefab,
        meMgsType5: cc.Prefab,
    },

    onLoad: function() {
        cc.gg ? cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT) : cc.director.loadScene("appStart");
        this._scene = this.node.getComponent("msgScenes");
        // cc.director.preloadScene("msg");
        // cc.gg.utils.ccLog("我进入了msg")
        this.initView();
        this.initNode();
        this.addEvenListener()
        var e = cc.view.getVisibleSize();
        e.height / 1334 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);
    },
    start: function() {},
    resetView: function() {
        this._topPancel.resetView();
        this._centerPancel.resetView();
        this._bottomPancel.resetView();
        this.alert.active = false;
        this.moreList.active = false;
    },
    initView: function() {
        // console.log(this.orderMeType5, "啊啊啊啊啊啊阿");
        this.node_header = cc.find("header", this.node);
        this.node_center = cc.find("center", this.node);
        this.node_buttom = cc.find("bottom", this.node);

        //loading 层后续单独加吧~~
        // this.node_loading = cc.find("loading", this.node);
        // this.particlesystem = this.node_loading.getChildByName("particlesystem");

        this._topPancel = new headerPanel;
        this._centerPancel = new centerPanel;
        this._bottomPancel = new bottomPanel;

        this._topPancel.initzation(this.node_header, this);
        this._centerPancel.initzation(this.node_center, this);
        this._bottomPancel.initzation(this.node_buttom, this);

        //alert  单独处理
        this.alert = this.node.getChildByName("alert");
        this.mask = this.alert.getChildByName("mask");
        this.alertImg = this.alert.getChildByName("alertImg");

        //moreItem 单独处理
        this.moreList = this.node.getChildByName("moreList");
        this.deleteHistory = this.moreList.getChildByName("deleteHistory");
        this.moreList.active = false;

        //sendImg 单独处理
        this.sendImg = this.node.getChildByName("sendImg");
        this.sendImg.active = false;
        //this.node.active = false

    },
    addEvenListener: function() {
        cc.gg.utils.addClickEventEND(this.alert, this.hideAlert.bind(this));
        cc.gg.utils.addClickEventEND(this.mask, this.hideAlert.bind(this));
        cc.gg.utils.addClickEventEND(this.deleteHistory, this.deleteMsg.bind(this))
    },
    showSendImg: function(data) {
        this.sendImg.active = true;
        //把数据交给自己的脚本处理
        this.sendImg.getComponent("sendFile").resetView(data)
    },
    hideSendImg: function() {
        this.sendImg.active = false;
    },
    initNode: function() {
        //this.node_loading.active = false;
    },
    deleteMsg: function() {
        //交给center层自己处理
        this.moreList.active = false;
        this._centerPancel.deleteHistory()
    },
    fangda: function(data) {
        cc.gg.utils.ccLog(data);
    },
    isShowMoreList: function() {
        var status = this.moreList.active;
        if (status) {
            this.moreList.active = false;
        } else {
            this.moreList.active = true;
        }
    },
    hideAlert: function() {
        this.alert.active = false
    },

    showAlert: function(url) {
        var self = this;
        this._centerPancel.autoImg(url, this.alertImg, function () {
            self.alert.active = true;
        })
        // cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(this.alertImg, url);
        // self.alert.active = true;
    },
    onDestroy: function() {
        cc.gg.utils.ccLog('我的场景被销毁啦');
        //停止本场景所有监听事件
        cc.gg.protoBuf.removeAllHandler();
    },
});