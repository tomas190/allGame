var cmd = require("QZNNCMD");
cc.Class({
    extends: cc.Component,
    properties: {
        player: []
    },
    initzation: function(e, t) {
        this.node = e,
            this._gameView = t,
            this.initView(),
            this.initNode()
    },
    initView: function() {
        for (var e = 0; e < 5; e++) this.player[e] = cc.find("user_head" + e,
                this.node),
            this.player[e].active = !1,
            this.player[e].head = this.player[e].getChildByName("head").getChildByName("head_img").getComponent(cc.Sprite),
            this.player[e].head.spriteFrame = null,
            // this.player[e].head_bg = this.player[e].getChildByName("head_bg"),
            // this.player[e].head_bg.active = !1,
            this.player[e].username = this.player[e].getChildByName("name").getComponent(cc.Label),
            this.player[e].username.string = "",
            this.player[e].score = this.player[e].getChildByName("score").getChildByName("score").getComponent(cc.Label),
            this.player[e].score.string = "",
            // this.player[e].leave = this.player[e].getChildByName("leave"),
            // this.player[e].leave.active = !1,
            this.player[e].blink = this.player[e].getChildByName("blink"),
            this.player[e].blink.active = !1,
            // this.player[e].ready = this.player[e].getChildByName("ready"),
            // this.player[e].ready.active = !1,
            this.player[e].banker = this.player[e].getChildByName("banker"),
            this.player[e].banker.active = !1,
            this.player[e].status = this.player[e].getChildByName("status"),
            this.player[e].status.active = !1,
            this.player[e].windUp = this.player[e].getChildByName("windUp"),
            this.player[e].windUp.active = !1
    },

    initNode: function() {
        this.gameCardType = this._gameView.gameCardType
    },
    resetView: function(e) {
        for (var t = 0; t < e; t++)
        //this.player[t].head.spriteFrame = null,
        // this.player[t].head_bg.active = !1,
        //this.player[t].username.string = "",
        //this.player[t].score.string = "",
        // this.player[t].leave.active = !1,
            this.player[t].blink.active = !1,
            // this.player[t].ready.active = !1,
            this.player[t].banker.active = !1,
            this.player[t].windUp.active = !1,
            this.player[t].status.active = !1;

    },
    setUserCount: function(e) {
        for (var i = 0; i < e; i++) {
            this.player[i].active = !0;
        }
        // for (var t = 0; t < e; t++)
        //     this.player[t].active = !0,
        //     this.player[t].setScale(1.1),
        //     6 == e ? (this.player[t].setPosition(c.SIX_USER_POS[t]), 1 == t || 2 == t ? (this.player[t].status.position = a[1],
        //         this.player[t].ready.position = o[1],
        //         this.player[t].banker.position = n[1],
        //         this.player[t].chipSpr.position = s[1]) : 3 != t && 4 != t && 5 != t || (this.player[t].status.position = a[0],
        //         this.player[t].ready.position = o[0],
        //         this.player[t].banker.position = n[0],
        //         this.player[t].chipSpr.position = s[0])) :
        //     9 == e || 15 == e ? (9 == e ?
        //         this.player[t].setPosition(c.Nine_USER_POS[t]) :
        //         this.player[t].setPosition(c.fifteen_USER_POS[t]),
        //         1 == t || 2 == t || 3 == t || 4 == t ?
        //         (this.player[t].status.position = a[1],
        //             this.player[t].ready.position = o[1],
        //             this.player[t].banker.position = n[1],
        //             this.player[t].chipSpr.position = s[1]) : 5 != t && 6 != t && 7 != t && 8 != t || (this.player[t].status.position = a[0],
        //             this.player[t].ready.position = o[0], this.player[t].banker.position = n[0],
        //             this.player[t].chipSpr.position = s[0])) :
        //     10 == e ? (this.player[t].setPosition(c.TEN_USER_POS[t]), 1 == t || 2 == t || 3 == t || 4 == t ?
        //         (this.player[t].status.position = a[1], this.player[t].ready.position = o[1],
        //             this.player[t].banker.position = n[1],
        //             this.player[t].chipSpr.position = s[1]) : 5 != t && 6 != t && 7 != t && 8 != t && 9 != t || (this.player[t].status.position = a[0],
        //             this.player[t].ready.position = o[0], this.player[t].banker.position = n[0], this.player[t].chipSpr.position = s[0])) : 12 == e ?
        //     (this.player[t].setPosition(c.Twelve_USER_POS[t]),
        //         1 == t || 2 == t || 3 == t || 4 == t || 5 == t ? (this.player[t].status.position = a[1],
        //             this.player[t].ready.position = o[1], this.player[t].banker.position = n[1],
        //             this.player[t].chipSpr.position = s[1]) : 6 != t && 7 != t && 8 != t && 9 != t && 10 != t && 11 != t || (this.player[t].status.position = a[0], this.player[t].ready.position = o[0],
        //             this.player[t].banker.position = n[0], this.player[t].chipSpr.position = s[0])) : 13 == e ?
        //     (this.player[t].setPosition(c.THIRTEEN_USER_POS[t]), 1 == t || 2 == t || 3 == t || 4 == t || 5 == t || 6 == t ?
        //         (this.player[t].status.position = a[1], this.player[t].ready.position = o[1], this.player[t].banker.position = n[1],
        //             this.player[t].chipSpr.position = s[1]) : 7 != t && 8 != t && 9 != t && 10 != t && 11 != t && 12 != t || (this.player[t].status.position = a[0], this.player[t].ready.position = o[0], this.player[t].banker.position = n[0], this.player[t].chipSpr.position = s[0])) : 17 == e && this.player[t].setScale(1)
    },
    setUserInfo: function(e, t) {
        var i = t;
        var a = this.player[e].head;
        var o = i.headimgurl += "?aa=aa.jpg";
        console.log("用户头像信息：" + o), cc.gg.utils.changeSpriteFrameWithServerUrlForWeb(a, o);
        var n = i.nickname;
        var s = cc.gg.utils.getSubStringLengTxt(n);
        this.player[e].username.string = s;
        this.player[e].score.string = i.account_score;
        this.player[e].active = true;
    },
    setViewUserReady: function(e, t) {
        this.player[e].ready.active = t
    },
    setViewUserOffLine: function(e, t) {
        this.player[e].leave.active = t
    },
    setUserScore: function(e, t) {
        this.player[e].score.string = t
    },
    refreshUserScore: function(e, t) {
        var i = 1 * this.player[e].score.string + -1 * t;
        this.player[e].score.string = i
    },
    //设置X几倍
    setUserGrabMultiple: function(e, t) {
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
    },
    //显示庄家标志
    setViewBankerSign: function(e, t) {
        this.player[e].banker.active = t
    },
    //设置闲家配置
    setUserMultiple: function(e, t) {
        var i = this.player[e].status;
        i.active = !0, i.getChildByName("grab").active = !1;
        i.getChildByName("noGrab").active = !1
        var a = i.getChildByName("bet").getComponent(cc.Label);
        a.node.active = !0, a.string = "/" + t
    },
    // setUserChipScore: function(e, t) {
    //     var i = this.player[e].chipSpr;
    //     i.active = !0, i.getChildByName("Num").getComponent(cc.Label).string = t
    // },
    //隐藏倍数
    hideUserStatus: function() {
        for (var e = 0; e < cmd.GAME_PLAYER; e++) {
            this.player[e].status.active = !1
        }
    },
    //隐藏所有用户标志
    hideUserBanker: function() {
        for (var e = 0; e < c.GAME_PLAYER; e++) { this.player[e].banker.active = !1 }
    },
    resetUserChipScore: function() {
        for (var e = 0; e < c.GAME_PLAYER; e++) {
            var t = this.player[e].chipSpr;
            t.active = !1, t.getChildByName("Num").getComponent(cc.Label).string = 0
        }
    },
    clearUserFace: function(e) {
        this.player[e].head.spriteFrame = null,
            // this.player[e].head_bg.active = !1,
            this.player[e].username.string = "",
            this.player[e].score.string = "",
            // this.player[e].leave.active = !1,
            this.player[e].blink.active = !1,
            // this.player[e].ready.active = !1,
            this.player[e].banker.active = !1,
            // this.player[e].chipSpr.active = !1,
            this.player[e].status.active = !1
    },
    flutterScore: function(e, t, i) {
        this.actionFlutterScore(this.player[e], { x: 0, y: 20 }, t, i)
    },
    showGoldAni: function(e, t, i, a) {
        for (var o = this.player[e].x, n = this.player[e].y, s = i, c = 0; c < t; c++) {
            var r = cc.instantiate(s);
            r.setPosition(o, n), r.setScale(.1);
            var l = -80,
                d = -100,
                h = 0;
            h = 0 == parseInt(100 * Math.random()) % 2 ? .9 : 1.1, l += parseInt(400 * Math.random() * h) % 160, d += parseInt(400 * Math.random()) % 200, a.addChild(r);
            var g = cc.spawn(cc.moveTo(.2, cc.p(l, d)), cc.scaleTo(.2, 1));
            r.runAction(g)
        }
        cc.gg.audioMgr.playSFX("sg/game/drop_gold.mp3")
    },
    actionFlutterScore: function(node, e, t, i) {
        // var a = this;
        // a.node.x = a.firstX, a.node.y = a.firstY;

        var scoreBox = node.getChildByName("windUp");
        var firstX = scoreBox.x;
        var firstY = scoreBox.y;
        var addNode = scoreBox.getChildByName("addGold");
        var minusNode = scoreBox.getChildByName("subGold");
        scoreBox.active = true;
        var o = e.x,
            n = e.y;
        t = parseFloat(t).toFixed(2);
        if (parseFloat(t) >= 0) {
            scoreBox.getComponent(cc.Sprite).spriteFrame = this.gameCardType.getSpriteFrame("eff_win");
        } else {
            scoreBox.getComponent(cc.Sprite).spriteFrame = this.gameCardType.getSpriteFrame("eff_lose");
        }
        addNode.active = 0 <= parseFloat(t),
            minusNode.active = parseFloat(t) < 0,
            t < 0 && (t = (t + "").substr(1, t.length)),
            addNode.getChildByName("score").getComponent(cc.Label).string = this.ModifyStr(t),
            minusNode.getChildByName("score").getComponent(cc.Label).string = this.ModifyStr(t),
            scoreBox.opacity = 100;
        var s = cc.moveBy(.5, o, n),
            c = cc.spawn(s, cc.fadeTo(.2, 255)),
            r = cc.callFunc(function(e) { scoreBox.x = 0, scoreBox.y = 63, i && i() }),
            l = cc.sequence(c, cc.delayTime(.5), cc.fadeTo(1, 0), r);
        scoreBox.runAction(l)
    },
    ModifyStr: function(str) {
        str += "";
        return str.replace(".", "/")
    },
})