/*
 *  Dawnson 2019-4-02
 */
var gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        lock: true
    },


    initzation: function (e, t) {
        this.node = e;
        this._GameView = t;
        this.initView();
        this.addEvenListener(this.node)
    },
    addEvenListener: function (e) {
        cc.gg.utils.addClickEventEND(this.headerLeft, this.showLeft.bind(this));
        cc.gg.utils.addClickEventEND(this.headerRight, this.showRight.bind(this));
    },
    initView: function () {
        this.headerLeft = this.node.getChildByName("headerLeft");
        this.headerRight = this.node.getChildByName("headerRight");
        this.headerCenter = this.node.getChildByName("headerCenter");
        this.headerMask = this.headerCenter.getChildByName("userHeadMask");
        this.headerTop = this.node.getChildByName("headerTop");

        this.userBg = this.headerMask.getChildByName("userBg"); //用戶頭像
        this.userP = this.headerMask.getChildByName("userP"); //用戶頭像背景色調
        this.SP = this.userP.getChildByName("SP"); //用戶首拼
        this.onLine = this.node.getChildByName("isOnline");

        //顶部通知
        this.headerTopText = this.headerTop.getChildByName("title");
    },
    showLeft: function () {
        //cc.gg.client.send('__backtohall', {}, () => {})
        // if (cc.sys.isNative) {
            gHandler.Reflect.setOrientation("landscape", 1334, 750);
        // }
        //离开房间，开闭IM的socket
        cc.gg.protoBuf.ISclose = true;
        cc.director.loadScene("hall");
        return;
        this._GameView._leftPancel.toggleStatus()
    },
    showRight: function () {
        this._GameView._rightPancel.toggleStatus()
    },
    initUserView: function () {
        var data = cc.gg.global.userInfo
        cc.gg.utils.ccLog(data)
        if (data.userHeadImg) {            
            //用自己头像
           cc.gg.utils.getUserImgSourceByNumber(data.userHeadImg, (err, spriteFrame) => {
                if(err) {
                    return;
                }
                const userBgSprite = this.userBg.getComponent(cc.Sprite);
                userBgSprite.spriteFrame = spriteFrame;
            });
            // cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(this.userBg, cc.gg.global.userInfo.userHeadImg)
            this.userBg.active = true
            this.SP.active = false
        } else {
            //用首拼
            this.userBg.active = false;
            this.SP.active = true;
            this.SP.getComponent(cc.Label).string = (data.userNick + "").substr(0, 1);
        }
    },
    runAlert: function (title, data) {
        var height = this.headerTop.height;
        var actionOne = cc.moveTo(0.1, cc.v2(0, 0));
        var actionTwo = cc.moveTo(0.2, cc.v2(0, height + 50));
        var o = cc.sequence(actionOne, cc.delayTime(1.5), actionTwo)
        this.headerTopText.getComponent(cc.Label).string = title;
        this.headerTop.runAction(o)
    }
});