/*
 *  Dawnson 2019-8-01
 *  15302765815@163.com
 */
var msgSender = require("QZNNMsgSender");
var cmd = require("QZNNCMD");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    initzation: function (e, t) {
        this.node = e;
        this._GameView = t;
        this.gameCardType = t.gameCardType;
        this.initView();
        this.addEvenListener(this.node);
    },

    addEvenListener: function (e) {
        cc.gg.utils.addClickEventALL(this.backRoomList, null, null, this.funBack.bind(this), null, null, { flag: true });
        cc.gg.utils.addClickEventALL(this.rule, null, null, this.funRule.bind(this), null, null, { flag: true });
        cc.gg.utils.addClickEventALL(this.music, null, null, this.funMusic.bind(this), null, null, { flag: true });
    },

    initView: function () {
        this.backRoomList = this.node.getChildByName("backRoomList");
        this.rule = this.node.getChildByName("rule")
        this.music = this.node.getChildByName("music");
    },

    resetView: function () {

    },

    funBack: function () {
        let func = () => {
            msgSender.sendLeaveRoom();
            // cc.gg.protoBuf.dispatchEvent("TipMgr",101,{chair:cmd.MY_SEAT});
        }
        if ((cmd.CUR_STAGE != 10 || cmd.CUR_STAGE <= 27) && cmd.MY_STATUS) {
            let _str = "本局游戏结算还未结束，请在本局结算完成后再退出游戏。"
            cc.gg.protoBuf.dispatchEvent("TipMgr", 1001, { str: _str, callfunc: null, eObj: this, close: false });
        } else {
            func();
        }
    },

    funRule: function () {
        this._GameView._centerPancel.funRuleMask()
    },

    funMusic: function () {
        let on_off = hqq.audioMgr.getBgState();
        hqq.audioMgr.setBgState(!on_off);
        this.playBGM();
    },

    playBGM() {
        cc.audioEngine.stopAll();
        let on_off = hqq.audioMgr.getBgState();
        hqq.qznnRes.load("language/CN/nnMusic/roomBG", cc.AudioClip, function (err, _clip) {
            if (on_off) {
                cc.audioEngine.playMusic(_clip, true);
            } else {
                cc.audioEngine.stopAll();
            }
        });
        var sprite_normal = undefined, sprite_pressed = undefined;
        if (!on_off) {//换成关闭
            sprite_normal = this._GameView.musicClose
            sprite_pressed = this._GameView.musicClosePress
        } else {//换成开启
            sprite_normal = this._GameView.musicNormal
            sprite_pressed = this._GameView.musicNormalPress
        }
        this.music.getComponent(cc.Button).normalSprite = sprite_normal;
        this.music.getComponent(cc.Button).pressedSprite = sprite_pressed;
        this.music.getComponent(cc.Button).hoverSprite = sprite_normal;
        this.music.getComponent(cc.Button).disabledSprite = sprite_normal;
    }

});