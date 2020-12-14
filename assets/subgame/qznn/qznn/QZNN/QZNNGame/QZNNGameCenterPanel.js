/*
 *  Dawnson 2019-8-01
 *  15302765815@163.com
 */
var cmd = require("QZNNCMD")
var msgSender = require("QZNNMsgSender")
cc.Class({
    extends: cc.Component,

    properties: {
        lock: true,
    },

    initzation: function (e, t) {
        this.node = e;
        this._GameView = t;
        this.initView();
        this.addEvenListener(this.node);
        this.gameCardType = this._GameView.gameCardType; //公用图集
    },

    addEvenListener: function (e) {
        //抢庄按钮事件
        for (var i = 0; i < this.grabBankerBtn.childrenCount; i++) {
            cc.gg.utils.addClickEventALL(this.grabBankerBtn.children[i], this.dark.bind(this), null, this.funGrandBanker.bind(this), this.hideMaskSpr.bind(this), this, { flag: true })
        }

        //闲家下注事件
        for (var i = 0; i < this.betBtn.childrenCount; i++) {
            cc.gg.utils.addClickEventALL(this.betBtn.children[i], this.dark.bind(this), null, this.funBetBtn.bind(this), this.hideMaskSpr.bind(this), this, { flag: true })
        }

    },

    hideBtnMask() {
        //抢庄按钮事件
        for (var i = 0; i < this.grabBankerBtn.childrenCount; i++) {
            this.hideMaskSpr(this.grabBankerBtn.children[i])
        }
        //闲家下注事件
        for (var i = 0; i < this.betBtn.childrenCount; i++) {
            this.hideMaskSpr(this.betBtn.children[i])
        }
    },

    dark: function (target) {
        target.getChildByName("maskSpr").active = true;
    },

    hideMaskSpr: function (target) {
        target.getChildByName("maskSpr").active = false;
    },

    initView: function () {
        var self = this;
        //抢庄按钮
        this.grabBankerBtn = this.node.getChildByName("grabBanker");
        //闲家按钮
        this.betBtn = this.node.getChildByName("bet");
        //游戏状态标示
        this.gameStatus = this.node.getChildByName("gameStatus");
        this.status = this.gameStatus.getChildByName("status");
        this.time = this.gameStatus.getChildByName("time");

        //底注标示
        this.dizhu = cc.find("dizhu/difen_box/difen", this.node);
        this.grabBankerBtn.active = false;
        this.betBtn.active = false;

        this.status.active = false;
        this.time.active = false;

        this.dizhu.active = false;

        //金币节点
        this.node_gold = this.node.getChildByName("goldPosition");
        //测试按钮
        this.test = this.node.getChildByName("test");

        //规则的mask
        hqq.qznnRes.load("language/CN/prefab/rule", cc.Prefab, function (err, res) {
            if (err) {
                console.log("加载失败")
                return
            }
            self.rule = cc.instantiate(res);
            self.ruleMask = self.rule.getChildByName("mask");
            //rule mask 的事件
            cc.gg.utils.addClickEventEND(self.ruleMask, self.funRuleMask.bind(self), { flag: true });

            var width = cc.winSize.width / 2 + (self.rule.width / 2);
            console.log(width + "rule的位置")
            self.rule.setPosition(width, 0);
            self.rule.active = true;
            self._GameView.node_UI.addChild(self.rule);
        });
        this.waitOther = this.node.getChildByName("waitPerson");
        this.waitNextRound = this.node.getChildByName("waitNextRound");
        //中间扑克牌大节点
        this.back_node_card = this.node.getChildByName("node_card");

        //this.poker = this.node_card.getChildByName("poker");
    },

    //重置视图
    resetView: function () {
        this.status.active = false;
        this.waitOther.active = false;
        this.grabBankerBtn.active = false;
        this.betBtn.active = false;
        this.waitNextRound.active = false;
        this.resetCenterPoker();
        this.unscheduleAllCallbacks();
    },


    resetCenterPoker: function () {
        this.back_node_card.removeAllChildren();
    },

    isWaitOther: function (isShow) {
        this.waitOther.active = isShow;
        this.status.active = !isShow;
        this.time.active = !isShow;
    },

    isWaitNextRound(bVisible) {
        this.waitNextRound.active = bVisible;
    },

    //点击mask隐藏规则 动画完成后隐藏自己
    funRuleMask: function () {
        this.rule.stopAllActions();
        var status = this.ruleMask.active;
        var active = null;
        if (status) {
            this.ruleMask.active = false;
            var x = cc.winSize.width / 2 + this.rule.width / 2;
            active = cc.moveTo(.3, cc.v2(x, 0));
        } else {
            var x = cc.winSize.width / 2 - this.rule.width / 2;
            active = cc.sequence(cc.moveTo(.3, cc.v2(x, 0)), cc.callFunc(() => {
                this.ruleMask.active = true;
            }))
        }
        this.rule.runAction(active);
    },

    funTest: function (target) {
        //测试
        //按钮一  发牌显示抢庄按钮
        //按钮二  显示抢庄标志 倍数  抢庄动画
        //按钮三  显示闲家倍数标志
        //按钮四  摊派并结算飘分
        if (target.name == "btn1") {
            console.log("发牌测试")
            this.test1()
        } else if (target.name == "btn2") {
            this.test2()
        } else if (target.name == "btn3") {
            this.test3()
        } else if (target.name == "btn4") {
            this.test4()
        }
    },

    setBankerShow: function (_playMode, type) {
        this.grabBankerBtn.active = true
        this.grabBankerBtn.active = (type ? true : false)
    },

    //游戏开始动画
    playGameOpen: function () {
        hqq.qznnRes.load("language/CN/prefab/GameStartAni", function (e, t) {
            if (e) console.log("加载出错:", e);
            else {
                var ani = cc.instantiate(t);
                ani.name = "startAni";
                this._GameView.node_UI.addChild(ani);
                this.scheduleOnce(() => {
                    this._GameView.setSendCardAni()
                    ani.destroy();
                }, 1.5)
            }
        }.bind(this));
        cc.gg.audioMgr.playSFX("language/CN/nnMusic/kaishi2")
    },

    funGrandBanker: function (target) {
        this.hideMaskSpr(target);
        this.grabBankerBtn.active = false;
        target.name += "";
        let index = target.name.indexOf("_")
        var num = Number(target.name.substring(index + 1));
        //派发抢庄事件
        msgSender.sendGrabBanker(num);
    },

    funBetBtn: function (target) {
        this.hideMaskSpr(target);
        this.betBtn.active = false;
        target.name += "";
        let index = target.name.indexOf("_")
        var num = Number(target.name.substring(index + 1));
        //派发下注事件
        msgSender.sendPlayerMultiples(num);
    },

    funModify: function () {
        console.log("编辑信息")
    },

    funAddGold: function () {
        console.log("添加金币")
    },

    created(value) {
        var s = value.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },

    //设置底分
    setDifen: function (data) {
        this.dizhu.active = true;
        this.dizhu.getComponent(cc.Label).string = data + "";
    },

    //切换状态标示
    setViewStatus: function (name) {
        if (!name) {
            this.status.getComponent(cc.Sprite).spriteFrame = null;
            return;
        }
        this.status.active = true;
        this.status.getComponent(cc.Sprite).spriteFrame = this.gameCardType.getSpriteFrame(name)
    },

    //砸牌的背景展示
    setZaPaiBG: function (index) {
        var node_bg1 = this.node.getChildByName("user_head2").getChildByName("node_card2").getChildByName("zapai_1")
        var node_bg2 = this.node.getChildByName("user_head2").getChildByName("node_card2").getChildByName("zapai_2")
        var node_bg3 = this.node.getChildByName("user_head2").getChildByName("node_card2").getChildByName("zapai_3");
        node_bg1.active = true;
        this.scheduleOnce(function () {
            node_bg1.active = false
            node_bg2.active = true;
            node_bg3.active = false;
            cc.gg.audioMgr.playSFX("language/CN/nnMusic/zapai")
        }, 0.2);
        this.scheduleOnce(function () {
            node_bg2.active = false;
            node_bg3.active = true;
        }, 0.4);
        this.scheduleOnce(function () {
            node_bg3.active = false;
        }, 0.6)
        // node_bg1.active = false;
        // node_bg2.active = false;
        // node_bg3.active = false;
        // for (var i = 0; i < 3; i++) {
        //     if (index == 1) {
        //         node_bg1.active = true
        //     } else if (index == 2) {
        //         node_bg2.active = true
        //     } else {
        //         node_bg3.active = true
        //     }
        // }
    },
});