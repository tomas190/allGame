var cmd = require("QZNNCMD");
cc.Class({
    extends: cc.Component,
    properties: {
        player: []
    },

    initzation: function (e, t) {
        this.node = e,
            this._gameView = t,
            this.initView(),
            this.initNode()
    },

    initView: function () {
        for (var e = 0; e < 5; e++) {
            this.player[e] = this.node.getChildByName("user_head" + e);
            this.player[e].active = !1;
            this.player[e].head = this.player[e].getChildByName("head").getChildByName("head_img").getComponent(cc.Sprite);
            this.player[e].head.spriteFrame = null;
            this.player[e].username = this.player[e].getChildByName("name").getComponent(cc.Label);
            this.player[e].username.string = "";
            this.player[e].score = this.player[e].getChildByName("score").getChildByName("score").getComponent(cc.Label);
            this.player[e].score.string = "";

            this.player[e].blink = this.player[e].getChildByName("blink");
            this.player[e].blink.active = !1;

            this.player[e].banker = this.player[e].getChildByName("banker");
            this.player[e].banker.active = !1;
            this.player[e].status = this.player[e].getChildByName("status");
            this.player[e].status.active = !1;
            this.player[e].windUp = this.player[e].getChildByName("windUp");
            this.player[e].windUp.active = !1;
            this.player[e].bg = this.player[e].getChildByName("bg");
            this.player[e].bg.opacity = 0;
        }
    },

    initNode: function () {
        this.gameCardType = this._gameView.gameCardType
    },

    resetView: function () {
        for (var t = 0; t < 5; t++) {
            this.player[t].blink.active = !1,
                this.player[t].banker.active = !1,
                this.player[t].windUp.active = !1,
                this.player[t].status.active = !1;
            this.player[t].windUp.stopAllActions();
            this.player[t].windUp.setPosition(cc.v2(0, 63))
        }
    },

    setUserCount: function (e) {
        for (var i = 0; i < e; i++) {
            this.player[i].active = !0;
        }
    },

    setUserInfo: function (e, data) {
        var user = data.playerInfo;
        this.player[e].username.string = cc.gg.utils.getSubStringLengTxt(user.nick);
        this.updateUserHead(e, user.avatarUrl);
        this.player[e].score.string = this.getShortMoney(user.money);
        this.player[e].active = true;
    },

    updateUserHead(e, url) {
        let num = url.substring(0, url.indexOf("."));
        num = Number(num) % 10;
        cc.resources.load("/head/im_head", cc.SpriteAtlas, function (err, atlas) {
            this.player[e].head.spriteFrame = atlas.getSpriteFrame("Avatar" + num);
        }.bind(this));
    },

    setViewUserReady: function (e, t) {
        this.player[e].ready.active = t
    },

    setViewUserOffLine: function (e, t) {
        this.player[e].leave.active = t
    },

    setUserScore: function (e, t) {
        // t = parseFloat(t + "").toFixed(2);
        // if (t < 0) t = (t + "").substr(1, t.length);
        this.player[e].score.string = this.getShortMoney(t);
    },

    //设置X几倍
    setUserGrabMultiple: function (e, t) {
        if (t == -1) return;
        var a = this.player[e].status;
        a.active = true;
        if (t > 0) {
            a.getChildByName("grab").active = true;
            a.getChildByName("noGrab").active = false;
            a.getChildByName("bet").active = true;
            a.getChildByName("bet").getComponent(cc.Label).string = "/" + t;
        } else {
            a.getChildByName("grab").active = false;
            a.getChildByName("noGrab").active = true;
            a.getChildByName("bet").active = false
        }
        a.scale = 2;
        a.runAction(cc.scaleTo(.3, 1));
        this.setUserGrabBG(e);
    },

    //显示抢不抢的一些状态
    setUserGrabBG: function (e) {
        var a = this.player[e].bg;
        a.opacity = 0;
        var i = cc.sequence(cc.fadeTo(0.2, 255), cc.scaleTo(0.2, 1.6, 1.2), cc.fadeOut(0.2, 0))
        a.runAction(i);
    },

    //显示庄家标志
    setViewBankerSign: function (e, t) {
        let blink = this.player[e].getChildByName("blink");
        this.player[e].banker.active = t
        this.player[e].banker.scale = 2;
        blink.active = t
        let s2 = cc.scaleTo(0.5, 1.2);
        let fo = cc.fadeOut(0.5);
        let call = cc.callFunc((sender) => {
            sender.scale = 1;
            sender.opacity = 255;
            sender.active = false;
        })
        blink.runAction(cc.sequence(cc.spawn(s2, fo), call));
        this.player[e].banker.runAction(cc.scaleTo(.3, 1))
    },

    //设置玩家下注倍数
    setUserMultiple(index, mul, stage, isBanker) {
        if (mul == -1) return;
        var _status = this.player[index].status;
        var grab = _status.getChildByName("grab")
        var noGrab = _status.getChildByName("noGrab")
        var lbl_mul = _status.getChildByName("bet").getComponent(cc.Label);
        if (stage == 22 || isBanker) {//在抢庄阶段或者是庄家 就显示抢庄倍数
            _status.active = true;
            lbl_mul.node.active = mul > 0;
            grab.active = !(mul <= 0);
            noGrab.active = (mul <= 0);
        } else if (stage == 23) {//下注
            _status.active = true;
            grab.active = false;
            noGrab.active = false;
            lbl_mul.node.active = (mul > 0);//表示已下注
        }
        if (mul > 0) {
            lbl_mul.string = "/" + mul;
            this.setUserGrabBG(index);
        }
        _status.scale = 2;
        let s2 = cc.scaleTo(.3, 1);
        _status.runAction(s2);
    },

    //隐藏倍数
    hideUserStatus: function () {
        for (var e = 0; e < cmd.GAME_PLAYER; e++) {
            this.player[e].status.active = false;
            this.player[e].bg.opacity = false;
        }
    },

    hideUserStatusByIndex: function (index) {
        this.player[index].status.active = false;
        this.player[index].bg.opacity = false;
    },

    //隐藏所有用户标志
    hideUserBanker: function () {
        for (var e = 0; e < c.GAME_PLAYER; e++) {
            this.player[e].banker.active = !1
        }
    },

    clearUserFace: function (index) {
        this.player[index].active = false;
        this.player[index].head.spriteFrame = null,
            this.player[index].username.string = "",
            this.player[index].score.string = "",
            this.player[index].blink.active = !1,
            this.player[index].banker.active = !1,
            this.player[index].status.active = !1,
            this.player[index].bg.opacity = 0;
    },

    flutterScore: function (e, t, i) {
        this.actionFlutterScore(this.player[e], t, i)
    },

    showGoldAni: function (e, t, i, a) {
        var o = this.player[e].x,
            n = this.player[e].y,
            s = i;
        for (var c = 0; c < t; c++) {
            var r = cc.instantiate(s);
            r.setPosition(o, n), r.setScale(.1);
            var l = -80,
                d = -100,
                h = 0;
            h = 0 == parseInt(100 * Math.random()) % 2 ? .9 : 1.1;
            l += parseInt(400 * Math.random() * h) % 160;
            d += parseInt(400 * Math.random()) % 200;
            a.addChild(r);
            var g = cc.spawn(cc.moveTo(.2, cc.p(l, d)), cc.scaleTo(.2, 1));
            r.runAction(g)
        }
        cc.gg.audioMgr.playSFX("sg/game/drop_gold.mp3")
    },

    actionFlutterScore: function (node, t, i) {
        var scoreBox = node.getChildByName("windUp");
        var addNode = scoreBox.getChildByName("addGold");
        var minusNode = scoreBox.getChildByName("subGold");
        scoreBox.active = true;
        t = parseFloat(t).toFixed(2);
        if (parseFloat(t) >= 0) {
            scoreBox.getComponent(cc.Sprite).spriteFrame = this.gameCardType.getSpriteFrame("eff_win");
        } else {
            scoreBox.getComponent(cc.Sprite).spriteFrame = this.gameCardType.getSpriteFrame("eff_lose");
        }
        if (t > 0) {
            addNode.active = true;
            minusNode.active = false;
            var a = this;
            hqq.qznnRes.load("language/CN/prefab/win", function (e, t) {
                if (e) console.log("加载出错:", e);
                else {
                    var i = cc.instantiate(t);
                    node.addChild(i), a.scheduleOnce(function () { node.removeChild(i) }, 1)
                }
            });
            cc.gg.audioMgr.playSFX("language/CN/nnMusic/qznn_win2")
        } else {
            addNode.active = false;
            minusNode.active = true;
            cc.gg.audioMgr.playSFX("language/CN/nnMusic/qznn_lose2")
        }
        scoreBox.opacity = 100;
        t < 0 && (t = (t + "").substr(1, t.length));
        addNode.getChildByName("score").getComponent(cc.Label).string = this.ModifyStr(t);
        minusNode.getChildByName("score").getComponent(cc.Label).string = this.ModifyStr(t);
        var spawn = cc.spawn(cc.moveBy(.5, 0, 20), cc.fadeTo(.2, 255));
        var call = cc.callFunc((sender) => {
            sender.position = cc.v2(0, 63);
            i && i();
        });
        var seq = cc.sequence(spawn, cc.delayTime(2), cc.fadeTo(0.5, 0), call);
        scoreBox.runAction(seq);
    },

    ModifyStr: function (str) {
        str += "";
        return str.replace(".", "/")
    },

    getShortMoney: function (money) {
        let yw = 10000
        let sw = 100000
        let bw = 1000000
        let qw = 10000000
        let bi = 100000000
        let num = null;
        let add = "万"
        if (money < sw) {
            num = ~~(money.toFixed(6) * 100) / 100
            add = ""
        } else if (money < bw) {//小于百万保留两位小数
            num = ~~((money / yw).toFixed(6) * 100) / 100
        } else if (money < qw) {//小于千万保留一位小数
            num = ~~((money / yw).toFixed(6) * 10) / 10
        } else if (money < bi) {//千万不保留小数
            num = ~~(money / yw)
        } else {
            num = ~~((money / bi).toFixed(6) * 100) / 100
            add = "亿"
        }
        return num + add
    },
})