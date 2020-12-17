/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
var headerPanel = require("QZNNRoomTopPanel");
var centerPanel = require("QZNNRoomCenterPanel");
var cmd = require("QZNNCMD");
const gHandler = require("../../../../../base/common/gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        notice: {
            default: null,
            type: cc.Node
        },
        backBtn: {
            default: null,
            type: cc.Node
        },
        editBtn: {
            default: null,
            type: cc.Node
        },
        loadBtn: {
            default: null,
            type: cc.Node
        },
        testBtn: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
        this.notice.active = true;
        if (hqq.isOtherGame) {
            this.backBtn.active = false;
            this.editBtn.active = false;
            this.loadBtn.active = false;
        }
        //延迟一秒生效 避免过快的点击
        this.scheduleOnce(() => {
            this.backBtn.getComponent(cc.Button).interactable = true
            this.loadBtn.getComponent(cc.Button).interactable = true
        }, 1)
        cc.gg ? cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE) : cc.director("appStart");
        this._scene = this.node.getComponent("QZNNRoomScene");
        cc.gg.audioMgr.pauseAll();
        let on_off = hqq.audioMgr.getBgState();
        // on_off && cc.gg.audioMgr.playBGM("language/CN/nnMusic/roomBG")
        hqq.audioMgr.register("test", "language/CN/nnMusic/qznn_lose2")
    },

    onClieckTest() {
        hqq.audioMgr.playEffect("test", hqq.qznnRes)
    },

    start: function () {
        this.initView();
        var e = cc.view.getVisibleSize();
        if (1334 / 750 < e.width / e.height) {
            //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
            cc.Canvas.fitHeight = true;
            //如果更长，则用定高
            this.node_center.setScale(e.width / 1334);
            this.notice.setScale(e.width / 1334)
        } else {
            /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
            //使用定宽
            cc.Canvas.fitWidth = true;
            this.node_center.setScale(e.height / 750);
            this.notice.setScale(e.height / 750)
        }
    },

    initView: function () {
        this.node_header = cc.find("header", this.node);
        this.node_center = cc.find("center", this.node);

        this._topPancel = new headerPanel;
        this._centerPancel = new centerPanel;

        this._topPancel.initzation(this.node_header, this);
        this._centerPancel.initzation(this.node_center, this);

        //主节点
        this.QZNNGame = cc.find("nnGame", this.node._parent);
        this.roomList = cc.find("roomList", this.node._parent);

        //Ui节点
        this.node_UI = cc.find("node_UI", this.node);
    },

    resetView: function () {
        this._topPancel.resetView();
        this._centerPancel.resetView();
        this.node_UI.removeAllChildren();
    },

    funBack: function () {
        if (cmd.CANSWITCH) {
            cmd.CANSWITCH = false;
            this.node.parent
                .getChildByName("noticeView")
                .getComponent("QZNNNoticeMgr")
                .backToHall();
        }
    },

});