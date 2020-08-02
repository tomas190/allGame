/*
 *  Dawnson 2019-4-02
 */

let gHandler = require("gHandler");

cc.Class({
    extends: cc.Component,

    properties: {
        look: true
    },


    initzation: function (e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        this.addEvenListener(this.node)
        // this.initContent()
    },
    addEvenListener: function (e) {
        cc.gg.utils.addClickEventEND(this.headerLeft, this.hallBack.bind(this));
        cc.gg.utils.addClickEventEND(this.headerRight, this.isShowMoreList.bind(this));
        cc.gg.utils.addClickEventEND(this.copy, this.copyID.bind(this));
    },
    resetView: function () {
        this.initContent()
    },
    initView: function () {
        this.headerLeft = this.node.getChildByName("headerLeft");
        this.headerCenter = this.node.getChildByName("headerCenter");
        this.headerMask = this.headerCenter.getChildByName("userHeadMask");
        this.headerRight = this.node.getChildByName("headerRight");
        this.headerTop = this.node.getChildByName("headerTop");

        this.headerTop.active = false;

        this.userBg = this.headerMask.getChildByName("userBg"); //用戶頭像
        this.userP = this.headerMask.getChildByName("userP"); //用戶頭像背景色調
        this.SP = this.userP.getChildByName("SP"); //用戶首拼
        this.onLine = this.node.getChildByName("isOnLine");
        this.UserName = this.headerCenter.getChildByName("msgName");
        this.id = this.headerCenter.getChildByName("id");

        //复制按钮
        this.copy = this.id.getChildByName("copy");
        //顶部通知
        this.headerTopText = this.headerTop.getChildByName("title");
    },
    initContent: function () {
        this.UserName.getComponent(cc.Label).string = cc.gg.global.chatObj.to_nick;
        this.id.getComponent(cc.Label).string = "ID: " + cc.gg.global.chatObj.to_id;
        if (cc.gg.global.chatObj.to_img) {
            this.userBg.active = true;
            this.userP.active = false;
            cc.gg.utils.getUserImgSourceByNumber(cc.gg.global.chatObj.to_img, (err, spriteFrame) => {
                if (err) {
                    return;
                }
                const userBgSprite = this.userBg.getComponent(cc.Sprite);
                userBgSprite.spriteFrame = spriteFrame;
            });
            // cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(this.userBg, cc.gg.global.chatObj.to_img)
        } else {
            this.userBg.active = false;
            this.userP.active = true;
            this.SP.getComponent(cc.Label).string = (cc.gg.global.chatObj.to_nick + "").substr(0, 1);
        }

    },
    copyID: function () {
        //取一下id值
        var id = cc.gg.global.chatObj.to_id

        if (cc.sys.isNative) {
            if (gHandler.Reflect) {
                if (gHandler.Reflect.setClipboard(id)) {
                    this.runAlert("复制成功");
                } else {
                    this.runAlert("复制失败");
                }
            }
            return;
        }

        //调取一下顶部弹窗
        if (id) {
            cc.gg.utils.webCopyString(id);
            this.runAlert("复制成功");
        } else {
            this.runAlert("复制失败");
        }
    },
    isShowMoreList: function () {
        this._gameView.isShowMoreList()
    },
    hallBack: function () {
        this._gameView._scene.sendReadMsg();
        cc.gg.global.chatObj = null;
    },
    runAlert: function (title, data) {
        this.headerTop.active = true;

        var height = this.headerTop.height;
        var actionOne = cc.moveTo(0.1, cc.v2(0, 0));
        var actionTwo = cc.moveTo(0.2, cc.v2(0, height + 20));
        var o = cc.sequence(actionOne, cc.delayTime(1.5), actionTwo)
        this.headerTopText.getComponent(cc.Label).string = title;
        this.headerTop.runAction(o);
        this.scheduleOnce(() => {
            this.headerTop.active = false;
        },1.5);
    }
});