cc.Class({
    extends: cc.Component,
    properties: {
        pokerAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },


        _bShoot: !1,
        _cbCardData: 0
    },
    onLoad: function() {
        this.card_bg = this.node.getChildByName("card_bg");
        this.num = this.node.getChildByName("num");
        this.color1 = this.node.getChildByName("color1");
        this.color2 = this.node.getChildByName("color2");
        this.back = this.node.getChildByName("back");
    },


    start: function() {},
    onDestroy: function() { this.node.off(cc.Node.EventType.TOUCH_END, function(e) {}) },
    movePoker: function(e) { 0 != this._cbCardData && (this._bShoot ? (this._bShoot = !1, e.runAction(cc.moveTo(0, e.getPositionX(), 0))) : (this._bShoot = !0, e.runAction(cc.moveTo(0, e.getPositionX(), 35)))) },
    setShoot: function(e) { 1 == e ? (this._bShoot = !0, console.log("挑起手牌的牌值：：" + this._cbCardData), this.node.setPosition(cc.v2(this.node.getPositionX(), 35))) : (this._bShoot = !1, this.node.setPosition(cc.v2(this.node.getPositionX(), 0))) },
    setCanClick: function() {
        var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.bAllowShoot = e
    },
    setGrey: function(e) { e ? (this.border.active = !0, this.back.color = cc.color(110, 110, 110)) : (this.border.active = !1, this.back.color = cc.color(255, 255, 255)) },
    setBorderBling: function() { this.bling.active = !0 },

    createPoker: function(poker) {
        //初始化 
        this.bAllowShoot = false;
        this.card_bg.stopAllActions();
        this.back.stopAllActions();
        this.card_bg.scaleX = 1;
        this.back.scaleX = 1;
        this.back.color = cc.color(255, 255, 255);
        //this.border.active = !1;
        if (poker) {
            //位运算方法  需要后端将16进制转换为10进制
            // var i = parseInt((240 & poker) / 16);
            // var a = 15 & poker;
            //当前方法 切割   首位代表花色 个位代表值
            var data = (poker + "").split("");
            var i = data[0];
            var a = data[1];
            if (a == "a") a = 10;
            if (a == "b") a = 11;
            if (a == "c") a = 12;
            if (a == "d") a = 13;
            var num, smallHua, large_Hua;
            console.log(i + "花色" + a + "点数");
            if (i <= 4) {
                //普通花色
                if (a > 0 && a <= 10) {
                    if (i == 1 || i == 3) {
                        num = "black_" + a;
                        smallHua = "small_" + i;
                        large_Hua = "large_" + i
                    } else if (i == 2 || i == 4) {
                        num = "red_" + a;
                        smallHua = "small_" + i;
                        large_Hua = "large_" + i
                    }
                } else if (a > 10) {
                    if (i == 1) {
                        num = "black_" + a;
                        smallHua = "small_" + i;
                        large_Hua = "hua_" + "hei" + a
                    } else if (i == 2) {
                        num = "red_" + a;
                        smallHua = "small_" + i;
                        large_Hua = "hua_" + "h" + a
                    } else if (i == 3) {
                        num = "black_" + a;
                        smallHua = "small_" + i;
                        large_Hua = "hua_" + "m" + a
                    } else if (i == 4) {
                        num = "red_" + a;
                        smallHua = "small_" + i;
                        large_Hua = "hua_" + "f" + a
                    }
                }
            } else if (i == 5 || i == 6) {
                //大小王
            }
            this.num.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(num),
                this.color1.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(smallHua),
                this.color2.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(large_Hua)
            this.back.active = false;
            //this.card_bg = true
        } else {
            this.back.active = true;
            //this.card_bg.active = false
        }
    },

    // createPoker: function(e) {
    //     var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
    //     if (Array.isArray(e)) console.log("create Poker error!", e, t);
    //     else {
    //         if (this._cbCardData = e,
    //             this.bAllowShoot = t || !1,
    //             this.card_bg.stopAllActions(),
    //             this.back.stopAllActions(),
    //             this.card_bg.setScale(1),
    //             this.back.setScale(1),
    //             this.back.color = cc.color(255, 255, 255),
    //             this.border.active = !1,
    //             0 == e)
    //             return this.card_bg.active = !1,
    //                 this.back.active = !0,
    //                 void this.back.setScale(1);
    //         this.card_bg.active = !0,
    //             this.back.active = !1,
    //             this.card_bg.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame("poker"),
    //             this.num.active = !0,
    //             this.color1.active = !0,
    //             this.color2.active = !0,
    //             this.xiaowang.active = !1,
    //             this.dawang.active = !1;
    //         var i = parseInt((240 & e) / 16),
    //             a = 15 & e; //点数
    //         console.log(i + "花色" + a + "点数");
    //         if (i < 5 || 6 == i) {
    //             var o = "";
    //             1 == i || 3 == i ? o = "red_" + a : 2 == i || 4 == i ? o = "black_" + a : 0 == i ? o = "cheng_" + a : 6 == i && (o = "wlian_" + a);
    //             var n = "small_" + i,
    //                 s = "large_" + i;
    //             m = null;
    //             11 <= a ? (
    //                     s = "hua_" + a,
    //                     this.color2.setPosition(10, -20)) : this.color2.setPosition(18, -31),
    //                 this.num.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(o),
    //                 this.color1.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(n),
    //                 this.color2.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(s)
    //         } else 5 == i ? (this.num.active = !1,
    //             this.color1.active = !1,
    //             this.color2.active = !1, sequence
    //             14 == a ? this.xiaowang.active = !0 : 15 == a && (this.dawang.active = !0)) : 8 <= i && i <= 15 ? (this.num.active = !1, this.color1.active = !1, this.color2.active = !1, this.card_bg.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame("special_" + i)) : console.log("create Poker  DATA error!", e)
    //     }
    // },
    setCardAni: function(e) {
        // var t = this;
        // if (0 != e) {
        //     this.createPoker(e),
        //         this.back.active = !0,
        //         this.card_bg.scaleX = -0.2,
        //         this.card_bg.skewY = -40,
        //         this.card_bg.skewY = -10,
        //         this.back.scaleX = 1;

        //     this.back.skewY = 0;
        //     var i = cc.spawn(cc.scaleTo(.2, -.2, 1), cc.skewTo(.2, 10, 40),
        //         cc.callFunc(function() {
        //             t.back.active = !1;
        //             t.card_bg.runAction(cc.spawn(cc.scaleTo(.2, -1, 1), cc.skewTo(.2, 0, 0)))
        //         }));
        //     this.back.runAction(i)
        // }
        /**
         * scaleX  减小 逆时针旋转
         * scaleX 增加顺时针旋转
         */
        var t = this;
        if (0 != e) {
            this.createPoker(e),
                this.back.active = !0,
                this.card_bg.scaleX = 0,
                this.card_bg.skewY = -40,
                this.card_bg.skewY = -10,
                this.back.scaleX = -1;

            this.back.skewY = 0;
            var i = cc.spawn(cc.scaleTo(.2, 0, 1), cc.skewTo(.2, 10, 40),
                cc.callFunc(function() {
                    t.back.active = !1;
                    t.card_bg.runAction(cc.spawn(cc.scaleTo(.2, 1, 1), cc.skewTo(.2, 0, 0)))
                }));
            this.back.runAction(i);
        }
    },
    getCardValue: function() { return this._cbCardData },
})