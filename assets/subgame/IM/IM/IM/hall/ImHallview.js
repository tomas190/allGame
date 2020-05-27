/**
 * Dawnson 2019-04-02
 * 側邊欄 37506
 */
var headerPanel = require("ImHalltopNode");
var bottomPanel = require("ImHallbottomNode");
var centerPanel = require("ImHallcenterNode");
var leftPanel = require("ImHallleftNode");
var rightPanel = require("ImHallRightNode");
// var msgPanel = require("ImHallMsgNode");
cc.Class({
    extends: cc.Component,

    properties: {
        lock: true,
        backHallLock: true,
        backMsgLock: true,
        userList: cc.Prefab,
    },

    onLoad: function() {
        cc.gg ? cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT) : cc.director("appStart");
        this._scene = this.node.getComponent("ImHallsence");
        // cc.director.preloadScene("IMhallMain");
        // cc.gg.utils.ccLog("我进入了hallmain");
        cc.gg.file.hideFile()
    },
    start: function() {
        this.initView();
        this.initNode();
        this.resetView();
        this.addEvenListener();
        var e = cc.view.getVisibleSize();
        e.height / 1334 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);

    },
    initView: function() {
        this.node_header = cc.find("hall/header", this.node);
        this.node_center = cc.find("hall/center", this.node);
        this.node_buttom = cc.find("hall/bottom", this.node);
        this.node_left = cc.find("hall/left", this.node);
        this.node_right = cc.find("hall/right", this.node);
        // this.node_msg = cc.find("msg", this.node);

        //loading 层后续单独加吧~~
        this.node_loading = cc.find("loading", this.node);
        this.particlesystem = this.node_loading.getChildByName("particlesystem");

        this._topPancel = new headerPanel;
        this._centerPancel = new centerPanel;
        this._bottomPancel = new bottomPanel;
        this._leftPancel = new leftPanel;
        this._rightPancel = new rightPanel;
        // this._msgPancel = new msgPanel;

        this._topPancel.initzation(this.node_header, this);
        this._centerPancel.initzation(this.node_center, this);
        this._bottomPancel.initzation(this.node_buttom, this);
        this._rightPancel.initzation(this.node_right, this);
        this._leftPancel.initzation(this.node_left, this);
        //this._msgPancel.initzation(this.node_msg, this);

        //主节点
        this.msg = cc.find("msg", this.node);
        this.hall = cc.find("hall", this.node);

        //msg返回节点 
        this.backHall = cc.find("msg/header/headerLeft", this.node)
    },
    resetView: function() {
        this._topPancel.initUserView();
        this._centerPancel.InitViewList()
        this._bottomPancel.resetView();
        this._rightPancel.resetView();
        cc.gg.file.hideFile()
    },
    addEvenListener: function() {
        cc.gg.utils.addClickEventEND(this.backHall, this.backHallFun.bind(this));
    },

    initNode: function() {
        this.node_loading.active = false;

    },
    switchLoading: function() {
        // if (this.node_loading.active) {
        //     this.node_loading.active = false
        // } else {
        //     this.node_loading.active = true;
        //     // var width = this.node_loading.width;
        //     // var active = cc.moveBy(.3, width, 0)
        //     // this.particlesystem.runAction(active);
        // }
    },
    backMsgFun: function() {
        //销毁此场景监听的所有事件
        cc.gg.protoBuf.removeAllHandler();
        var self = this;
        if (!this.backMsgLock) {
            return
        }
        self.backMsgLock = false;
        self.msg.getComponent("msgView").resetView()
        self.msg.getComponent("msgScenes").resetSence()
        this.scheduleOnce(function() {

            self.hall.active = false;
            self.msg.active = true;
            self.backMsgLock = true;

        }, 0.2)
    },
    backHallFun: function(e) {
        cc.gg.utils.ccLog("我监听了几次 ？")
        var self = this;
        cc.gg.protoBuf.removeAllHandler();
        cc.gg.global.isGoDirectlyMsg = false;
        if (!this.backHallLock) {
            return
        }

        self.backHallLock = false;
        self.resetView()
        self._scene.resetSence();
        this.scheduleOnce(function() {

            self.hall.active = true;
            self.msg.active = false;
            self.backHallLock = true
        }, 0.2)
    }
});