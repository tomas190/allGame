var y = require("QZNNCMD")
cc.Class({
    extends: cc.Component,
    properties: {
        cardNodes: [],
        pangyaNodes: [],
        mycardNode: cc.Node,
        cardData: null
    },
    initzation: function(e, t) {
        this.node = e,
            this._gameView = t,
            this._scene = t._scene,
            this.initView(),
            this.initNode(),
            this.gameCardType = this._gameView.gameCardType;
        this.pokerDianshu = this._gameView.pokerDianshu
    },
    initView: function() {
        for (var e = 0; e < 5; e++) {
            this.cardNodes[e] = cc.find("user_head" + e + "/node_card" + e, this.node),
                this.cardNodes[e].active = !1,
                2 == e && (this.mycardNode = this.cardNodes[e]);
            for (var i = 0; i < 5; i++) {
                y.PokerNode[e + ""].push(this.cardNodes[e].getChildByName("poker" + i).getPosition());
            }
        };
        console.log("poker" + y.PokerNode)
    },

    initNode: function() {
        // this.spr_look = this.mycardNode.getChildByName("spr_look"), 19046
        //     this.btn_look = this.mycardNode.getChildByName("btn_look"),
        //     this.btn_look4 = this.mycardNode.getChildByName("btn_look4"),
        //     this.btn_look5 = this.mycardNode.getChildByName("btn_look5"),
        //     cc.gg.utils.addClickEventEND(this.btn_look, this.onBtnLookClick.bind(this)),
        //     cc.gg.utils.addClickEventEND(this.btn_look4, this.onBtnLookClick.bind(this)),
        //     cc.gg.utils.addClickEventEND(this.btn_look5, this.onBtnLookClick.bind(this));
    },
    resetView: function(e) {
        for (var t = 0; t < e; t++) {
            for (var i = 0; i < y.MAX_COUNT; i++) {
                var poker = this.cardNodes[t].getChildByName("poker" + i);
                if (t == 2) {
                    this.cardNodes[t].setPosition(40, -40);
                    this.cardNodes[t].scaleX = 0.9;
                    this.cardNodes[t].scaleY = 0.9
                }
                poker.getComponent("createPoker").createPoker(0);
                // console.log(y.PokerNode[t + ""][i]);
                poker.setPosition(y.PokerNode[t + ""][i].x, y.PokerNode[t + ""][i].y);
                //     0 == t && (this.btn_look.active = !1,
                //         this.btn_look4.active = !1,
                //         this.btn_look5.active = !1,
                //         this.spr_look.active = !1);
                var r = this.cardNodes[t].getChildByName("sprCard");
                r.active = !1;
                r.getChildByName("valueBox").getChildByName("value").getComponent(cc.Sprite).spriteFrame = null;
                this.cardNodes[t].active = !1
            }
        }
    },
    setUserCount: function(e) {
        for (var t = 0; t < e; t++) {
            // if (15 == e && 9 == t) return;
            // 0 == t && this.cardNodes[t].setScale(1);
            // var i = this.cardNodes[t].getChildByName("poker0"),
            //     a = this.cardNodes[t].getChildByName("poker1"),
            //     o = this.cardNodes[t].getChildByName("poker2"),
            //     n = this.cardNodes[t].getChildByName("poker3"),
            //     s = this.cardNodes[t].getChildByName("poker4");
            // 6 == e ? this.cardNodes[t].setPosition(y.SIX_CARD_POS[t]) :
            //     9 == e ? this.cardNodes[t].setPosition(y.Nine_CARD_POS[t]) :
            //     10 == e ? this.cardNodes[t].setPosition(y.TEN_CARD_POS[t]) :
            //     12 == e ? this.cardNodes[t].setPosition(y.Twelve_CARD_POS[t]) : 1
            // 3 == e ? this.cardNodes[t].setPosition(y.THIRTEEN_CARD_POS[t]) :
            //     15 == e ? this.cardNodes[t].setPosition(y.fifteen_CARD_POS[t]) :
            //     17 == e && 0 == t && this.cardNodes[t].setScale(1),
            //     i.stopAllActions(),
            //     a.stopAllActions(),
            //     o.stopAllActions(),
            //     n.stopAllActions(),
            //     s.stopAllActions(),
            //     0 == t ?
            //     (i.setPosition(-110, 0),
            //         a.setPosition(7, 0),
            //         o.setPosition(124, 0),
            //         n.setPosition(241, 0),
            //         s.setPosition(358, 0)) :
            //     (i.setPosition(-100, 0),
            //         a.setPosition(-50, 0),
            //         o.setPosition(0, 0),
            //         n.setPosition(50, 0),
            //         s.setPosition(100, 0))
        }
    },
    showUserCardBack: function(e) {
        this.cardNodes[e].active = !0;
        var t = this.cardNodes[e].getChildByName("poker0"),
            i = this.cardNodes[e].getChildByName("poker1"),
            a = this.cardNodes[e].getChildByName("poker2"),
            o = this.cardNodes[e].getChildByName("poker3"),
            n = this.cardNodes[e].getChildByName("poker4");
        t.getComponent("createPoker").createPoker(0),
            i.getComponent("createPoker").createPoker(0),
            a.getComponent("createPoker").createPoker(0),
            o.getComponent("createPoker").createPoker(0),
            n.getComponent("createPoker").createPoker(0)
    },
    // setSendCardAni: function(e, t, i) {
    //     var a;
    //     this.setUserCount(y.GAME_PLAYER)
    //     if (e && 0 != e.length) {
    //         var o = 0,
    //             n = [];
    //         for (var s = 0; s < y.GAME_PLAYER; s++) {
    //             if (3 <= e[s]) {
    //                 o++;
    //                 n[n.length] = s
    //             }
    //         }
    //         var c = this._gameView.node_center.convertToWorldSpaceAR(this._gameView.node_gold.position);
    //         for (s = 0; s < o; s++) {
    //             var r = n[s],
    //                 l = this.cardNodes[r];
    //             l.active = !0;
    //             var d = l.convertToNodeSpaceAR(c),
    //                 h = l.getChildByName("poker0"),
    //                 g = l.getChildByName("poker1"),
    //                 u = l.getChildByName("poker2"),
    //                 m = l.getChildByName("poker3"),
    //                 _ = l.getChildByName("poker4");
    //             h.opacity = 255,
    //                 g.opacity = 0,
    //                 u.opacity = 0,
    //                 m.opacity = 0,
    //                 _.opacity = 0;
    //             var p = h.getPosition(),
    //                 f = g.getPosition(),
    //                 C = u.getPosition(),
    //                 b = m.getPosition(),
    //                 ii = null,
    //                 v = _.getPosition();
    //             //h.setPosition(d);
    //             // h.runAction(cc.spawn(cc.moveTo(.15, p),
    //             //     cc.fadeIn(.15))),
    //             // ii = [cc.v2(d.x, d.y), cc.v2(p.x, p.y), cc.v2(p.x, p.y)],
    //             //     h.runAction(cc.bezierTo(.1, ii));
    //             g.setPosition(d),
    //                 // g.runAction(cc.sequence(cc.delayTime(.075),
    //                 //     cc.spawn(cc.moveTo(.15, f),
    //                 //         cc.fadeIn(.15)))),
    //                 g.runAction(
    //                     cc.bezierTo(0.1, [cc.v2(d.x, d.y), cc.v2(f.x, f.y), cc.v2(f.x, f.y)]), cc.callFunc(function() {
    //                         console.log("第二张牌");
    //                     }))
    //                 // u.setPosition(d),
    //                 //     u.runAction(cc.sequence(cc.delayTime(.15), cc.bezierTo(0.1, [cc.v2(d.x, d.y), cc.v2(u.x, u.y), cc.v2(u.x, u.y)])))
    //                 //     // u.runAction(cc.sequence(cc.delayTime(.15),
    //                 //     //     cc.spawn(cc.moveTo(.15, C),
    //                 //     //         cc.fadeIn(.15)))),
    //                 // m.setPosition(d),
    //                 //     // m.runAction(cc.sequence(cc.delayTime(.15 * 1.5),
    //                 //     //     cc.spawn(cc.moveTo(.15, b),
    //                 //     //         cc.fadeIn(.15)))),
    //                 //     m.runAction(cc.sequence(cc.delayTime(.225), cc.bezierTo(0.1, [cc.v2(d.x, d.y), cc.v2(m.x, m.y), cc.v2(m.x, m.y)]))
    //                 //     )
    //                 // _.setPosition(d),
    //                 //     // _.runAction(cc.sequence(cc.delayTime(.3),
    //                 //     //     cc.spawn(cc.moveTo(.15, v),
    //                 //     //         cc.fadeIn(.15))))
    //                 //     _.runAction(cc.sequence(cc.delayTime(.3), cc.bezierTo(0.1, [cc.v2(d.x, d.y), cc.v2(_.x, _.y), cc.v2(_.x, _.y)])))
    //         }
    //         if (t) {
    //             console.log("延时时间CallBack->>>", .8), this.scheduleOnce(function() {
    //                 t()
    //             }, .8)
    //         }
    //         cc.gg.audioMgr.playSFX("nn/game/send_card.mp3")
    //     } else console.log("发牌动画出错->>>>setSendCardAni")
    // },
    setSendCardAni: function(e, t, i) {
        var a;
        this.setUserCount(y.GAME_PLAYER)
        if (e && 0 != e.length) {
            var o = 0,
                n = [];
            for (var s = 0; s < y.GAME_PLAYER; s++) {
                if (3 <= e[s]) {
                    o++;
                    n[n.length] = s
                }
            }
            var c = this._gameView.node_center.convertToWorldSpaceAR(this._gameView.node_gold.position);
            var bsr_l = this._gameView.node_center.convertToWorldSpaceAR(cc.v2(150, 600));
            var bsr_r = this._gameView.node_center.convertToWorldSpaceAR(cc.v2(600, 200));
            var bsr_me = this._gameView.node_center.convertToWorldSpaceAR(cc.v2(0, 300));
            for (s = 0; s < o; s++) {
                var r = n[s],
                    l = this.cardNodes[r];
                l.active = !0;
                var d = l.convertToNodeSpaceAR(c),
                    bsr_left = cc.v2(-150, 1200),
                    bsr_right = cc.v2(-150, 1200),
                    bsr_meSelf = l.convertToWorldSpaceAR(bsr_me),
                    h = l.getChildByName("poker0"),
                    g = l.getChildByName("poker1"),
                    u = l.getChildByName("poker2"),
                    m = l.getChildByName("poker3"),
                    _ = l.getChildByName("poker4");
                h.opacity = 0;
                g.opacity = 0;
                u.opacity = 0;
                m.opacity = 0;
                _.opacity = 0;
                var p = h.getPosition();
                var f = g.getPosition();
                var C = u.getPosition();
                var b = m.getPosition();
                var ii = null;
                var v = _.getPosition();
                var count = null;
                var positionBSR = null;

                count = s;
                positionBSR = bsr_left

                h.setPosition(d);
                ii = [cc.v2(d.x, d.y), cc.v2(positionBSR.x, positionBSR.y), cc.v2(p.x, p.y)],
                    h.runAction(cc.sequence(cc.delayTime(0.4 * count), cc.spawn(cc.bezierTo(.3, ii), cc.fadeIn(.15))));
                g.setPosition(d);
                g.runAction(cc.sequence(cc.delayTime(.025 + (0.4 * count)), cc.spawn(
                    cc.bezierTo(0.3, [cc.v2(d.x, d.y), cc.v2(positionBSR.x, positionBSR.y), cc.v2(f.x, f.y)]), cc.fadeIn(.15))))
                u.setPosition(d),
                    u.runAction(cc.sequence(cc.delayTime(.05 + (0.4 * count)), cc.spawn(
                        cc.bezierTo(0.3, [cc.v2(d.x, d.y), cc.v2(positionBSR.x, positionBSR.y), cc.v2(C.x, C.y)]),
                        cc.fadeIn(.15))))
                m.setPosition(d),
                    m.runAction(cc.sequence(cc.delayTime(.075 + (0.4 * count)), cc.spawn(
                        cc.bezierTo(0.3, [cc.v2(d.x, d.y), cc.v2(positionBSR.x, positionBSR.y), cc.v2(b.x, b.y)]), cc.fadeIn(.15))))
                _.setPosition(d),
                    _.runAction(cc.sequence(cc.delayTime(.1 + (0.4 * count)), cc.spawn(
                        cc.bezierTo(0.3, [cc.v2(d.x, d.y), cc.v2(positionBSR.x, positionBSR.y), cc.v2(v.x, v.y)]), cc.fadeIn(.15))))
                this.scheduleOnce(function() {
                    cc.gg.audioMgr.playSFX("qznnPublic/nnMusic/send_card")
                }, 0.4 * count)
            }
            if (t) {
                console.log("延时时间CallBack->>>", o * 0.4), this.scheduleOnce(function() {
                    t()
                }, o * 0.4 + 0.8)
            }

            //cc.gg.audioMgr.playSFX("qznnPublic/nnMusic/send_card")
        } else console.log("发牌动画出错->>>>setSendCardAni")
    },
    setViewOpenCard: function(e, t, fun) {
        if (this.setUserCount(y.GAME_PLAYER), e < 0 || e >= y.GAME_PLAYER || !t) console.log("error--\x3e>>展示动画有错");
        else {
            var i = this.cardNodes[e];
            i.active = !0;
            for (var a = 0; a < t.length; a++) {
                i.getChildByName("poker" + a).getComponent("createPoker").createPoker(t[a])
            }
        }
        fun && fun()
    },
    //摊牌动画
    setOpenCardAni: function(e, t, fun) {
        if (this.setUserCount(y.GAME_PLAYER), e < 0 || e >= y.GAME_PLAYER || !t) console.log("error--\x3e>>展示动画有错");
        else {
            var i = this.cardNodes[e];
            i.active = !0;
            if (e == 2) {
                for (var k = t.length - 1; k > t.length - 3; k--) {
                    // console.log("我进入了几次 ???????? 自己摊牌");
                    i.getChildByName("poker" + k).getComponent("createPoker").setCardAni(t[k])
                }
            } else {
                for (var j = 0; j < t.length; j++) {
                    i.getChildByName("poker" + j).getComponent("createPoker").setCardAni(t[j])
                }
            }
        }
        this.scheduleOnce(function() {
            fun && fun()
        }, .8)

    },
    //砸牌动画
    setZaPai: function(pos, indexArr, kind, callFunc, card) {
        if (pos == 2) {
            if (kind != 0) {
                //执行摊牌动画
                var sortArr = [];
                var isBreak = false;
                for (var i = 0; i < indexArr.length; i++) {

                    var poker = this.cardNodes[pos].getChildByName("poker" + indexArr[i]);
                    var active = cc.sequence(cc.delayTime(0.3 * i), cc.moveTo(0.3, poker.getPosition().x, 35));
                    poker.runAction(active);
                }
                for (var k = 0; k < card.length; k++) {
                    isBreak = false
                    for (var j = 0; j < indexArr.length; j++) {
                        if (indexArr[j] == k) {
                            sortArr.unshift(card[k]);
                            isBreak = true
                            break;
                        }
                    }
                    if (!isBreak) {
                        sortArr.push(card[k]);
                    }
                }
                console.log(sortArr)
                this.scheduleOnce(function() {
                    callFunc && callFunc(sortArr)
                }, indexArr.length * 0.4)
            } else {
                //执行抖动动画
                for (var k = 0; k < 5; k++) {
                    var poker = this.cardNodes[pos].getChildByName("poker" + k);
                    var t = cc.skewTo(.08, 5, -5),
                        i = cc.skewTo(.08, 0, 0),
                        a = cc.skewTo(.08, -5, 5),
                        o = cc.repeat(cc.sequence(t, i, a, i), 4);
                    poker.runAction(o);
                }
                this.scheduleOnce(function() {
                    callFunc && callFunc()
                }, .08 * 3 * 4)
            }
        } else {
            this._cardPanel.setTypeSprite(pos, "", kind)
        }
    },
    //自己的砸牌动作
    mySelfZaPai: function(sortArr, callFunc) {
        var pos = 2
        this.setCardPosition(pos);
        if (sortArr) {
            for (var i = 0; i < sortArr.length; i++) {
                this.cardNodes[pos].getChildByName("poker" + i).getComponent("createPoker").createPoker(sortArr[i])
            }
        }
        var action = cc.spawn(cc.moveTo(0.2, cc.v2(180, 180)), cc.scaleTo(0.2, 0.5))
        this.cardNodes[pos].runAction(cc.sequence(action, cc.callFunc(function() {
            //播放声音
            cc.gg.audioMgr.playSFX("qznnPublic/nnMusic/zapai")
                //播放动画
            console.log("我进入吗 ?")
            callFunc && callFunc()
        })));
    },
    //定位某一个人的牌
    setCardPosition: function(pos) {
        for (var i = 0; i < 5; i++) {
            var item = this.cardNodes[pos].getChildByName("poker" + i);
            console.log(y.PokerNode[pos + ""][i])
            item.setPosition(y.PokerNode[pos + ""][i].x, y.PokerNode[pos + ""][i].y);
        }
    },
    // setOpenCardAni: function(e, t, i) {
    //     if (console.log("我进入了几次？？" + e),
    //         e < 0 || e >= y.GAME_PLAYER)
    //         console.log("error..............setOpenCardAni");
    //     else {
    //         var a = 0,
    //             o = 0,
    //             n = this.cardNodes[e];
    //         var s = n.getChildByName("poker0"),
    //             c = n.getChildByName("poker1"),
    //             r = n.getChildByName("poker2"),
    //             l = n.getChildByName("poker3"),
    //             d = n.getChildByName("poker4"),
    //             h = parseInt(s.getPosition().x),
    //             g = parseInt(c.getPosition().x),
    //             u = parseInt(r.getPosition().x),
    //             m = parseInt(l.getPosition().x),
    //             _ = parseInt(d.getPosition().x);
    //         s.getComponent("createPoker").createPoker(t.cards[0]),
    //             c.getComponent("createPoker").createPoker(t.cards[1]),
    //             r.getComponent("createPoker").createPoker(t.cards[2]),
    //             l.getComponent("createPoker").createPoker(t.cards[3]),
    //             d.getComponent("createPoker").createPoker(t.cards[4]);
    //         // s.runAction(cc.moveTo(.1, cc.v2(h + 3 * a + -o, 0))),
    //         // console.log(h + 3 * a + -o + "我是第一张牌"),
    //         // c.runAction(cc.moveTo(.1, cc.v2(g + a + 2 * -o, 0))),
    //         // console.log(h + a + 2 * o + "我是第二张牌"),
    //         // r.runAction(cc.moveTo(.1, cc.v2(u + -a + 3 * -o, 0))),
    //         // console.log(u + -a + 3 * -o + "我是第三张牌"),
    //         // l.runAction(cc.moveTo(.1, cc.v2(m + -a + 3 * o, 0))),
    //         // console.log(m + -a + 3 * o + "我是第四张牌"),
    //         // d.runAction(cc.sequence(cc.moveTo(.1, cc.v2(_ + 3 * -a + o, 0)),
    //         //     cc.callFunc(function() {
    //         //         console.log(_ + 3 * -a + o + "我是第五张牌"), i && i()
    //         //     })))
    //     }
    // },
    // setOpenCardAni: function(e, t, i) {
    //     if (console.log("我进入了几次？？" + e),
    //         e < 0 || e >= y.GAME_PLAYER)
    //         console.log("error..............setOpenCardAni");
    //     else {
    //         var a = 0,
    //             o = 0,
    //             n = this.cardNodes[e];
    //         0 == e ? (o = 0,
    //                 1 <= t.kind && t.kind <= 10 ?
    //                 (a = y.Mydistance,
    //                     console.log("自己有牛")) : (a = 0,
    //                     console.log("自己五牛"))) :
    //             (a = 0, 1 <= t.kind && t.kind <= 10 ?
    //                 (o = y.otherDistance, console.log("他人有牛")) :
    //                 (o = 0, console.log("他人无牛")));
    //         var s = n.getChildByName("poker0"),
    //             c = n.getChildByName("poker1"),
    //             r = n.getChildByName("poker2"),
    //             l = n.getChildByName("poker3"),
    //             d = n.getChildByName("poker4"),
    //             h = parseInt(s.getPosition().x),
    //             g = parseInt(c.getPosition().x),
    //             u = parseInt(r.getPosition().x),
    //             m = parseInt(l.getPosition().x),
    //             _ = parseInt(d.getPosition().x);
    //         s.getComponent("createPoker").createPoker(t.cards[0]),
    //             c.getComponent("createPoker").createPoker(t.cards[1]),
    //             r.getComponent("createPoker").createPoker(t.cards[2]),
    //             l.getComponent("createPoker").createPoker(t.cards[3]),
    //             d.getComponent("createPoker").createPoker(t.cards[4]),
    //             s.runAction(cc.moveTo(.1, cc.v2(h + 3 * a + -o, 0))),
    //             console.log(h + 3 * a + -o + "我是第一张牌"),
    //             c.runAction(cc.moveTo(.1, cc.v2(g + a + 2 * -o, 0))),
    //             console.log(h + a + 2 * o + "我是第二张牌"),
    //             r.runAction(cc.moveTo(.1, cc.v2(u + -a + 3 * -o, 0))),
    //             console.log(u + -a + 3 * -o + "我是第三张牌"),
    //             l.runAction(cc.moveTo(.1, cc.v2(m + -a + 3 * o, 0))),
    //             console.log(m + -a + 3 * o + "我是第四张牌"),
    //             d.runAction(cc.sequence(cc.moveTo(.1, cc.v2(_ + 3 * -a + o, 0)),
    //                 cc.callFunc(function() {
    //                     console.log(_ + 3 * -a + o + "我是第五张牌"), i && i()
    //                 })))
    //     }
    // },

    setTurnCardAni: function(e) {
        var t = this.mycardNode
        if (e) {
            for (var i = 0; i < e.length; i++) {
                console.log(e[i] + "我是复职的牌")
                t.getChildByName("poker" + i).getComponent("createPoker").setCardAni(e[i]);
            }
        } else {
            console.log("未有牌的数据setTurnCardAni")
        }
    },
    setLastCardTurnAni: function(e, t) {
        if (t) {
            var i = this.mycardNode;
            console.log(i + "我是开牌数据"), e -= 1, i.getChildByName("poker" + e).getComponent("createPoker").setCardAni(t[e])
        } else console.log("setLastCardTurnAni->>>>未有牌的数据")
    },
    setTypeSprite: function(e, t, i) {
        var a = this.cardNodes[e].getChildByName("sprCard");
        var valueBox = a.getChildByName("valueBox");
        var value = valueBox.getChildByName("value");
        var bet = valueBox.getChildByName("beishu");
        value.scaleX = 2;
        value.scaleY = 2;
        bet.scaleX = 2;
        bet.scaleY = 2;

        value.getComponent(cc.Sprite).spriteFrame = this.pokerDianshu.getSpriteFrame("poker" + i);
        a.active = !0;
        bet.active = true;
        if (i == 7 || i == 8 || i == 9) {
            bet.getComponent(cc.Label).string = "/" + 2
        } else if (i == 10) {
            bet.getComponent(cc.Label).string = "/" + 3
        } else if (i > 10) {
            bet.getComponent(cc.Label).string = "/" + 4
        } else if (i == 0) {
            bet.active = false
        } else {
            bet.getComponent(cc.Label).string = "/" + 1
        }
        value.runAction(cc.sequence(cc.scaleTo(.3, 1, 1), cc.callFunc(function() {
            if (bet.active) {
                bet.runAction(cc.scaleTo(.3, 1, 1))
            }
            cc.gg.audioMgr.playSFX("qznnPublic/nnMusic/kind/kind" + i)
        })))

    },
    setBtnLook: function(e, t) {
        this._gameView._scene;
        if (t)
            if (1 == e || 6 == e || 8 == e) this.spr_look.active = !0, this.btn_look.active = !0, this.btn_look4.active = !1, this.btn_look5.active = !1;
            else if (2 == e || 3 == e || 5 == e) {
            if (this.spr_look.active = !0, this.btn_look.active = !1, this.btn_look4.active = !0, this.btn_look5.active = !0, this.cardData) {
                var i = [this.cardData.origin_cards[0], this.cardData.origin_cards[1], this.cardData.origin_cards[2]];
                this.setTurnCardAni(i)
            }
        } else 4 == e ? (this.spr_look.active = !0, this.btn_look.active = !0, this.btn_look4.active = !1, this.btn_look5.active = !1) : 7 == e && (this.spr_look.active = !0, this.btn_look.active = !1, this.btn_look4.active = !0, this.btn_look5.active = !0);
        else this.btn_look.active = !1, this.btn_look4.active = !1, this.btn_look5.active = !1, this.spr_look.active = !1
    },
    onPangYa: function(e) {
        this.initPangyaView();
        var t = e.name.substr(6);
        y.beiMaiMaPos = t, this._gameView._centerPanel.node_bet.active = !0
    },
    onBtnLookClick: function(e) {
        if (this.cardData) {
            var t;
            if (e.active = !1, "btn_look4" == e.name ? t = 4 : ("btn_look" == e.name && (this.spr_look.active = !1, this._gameView._centerPanel.btn_open.active = !0), t = 5), "btn_look" == e.name && 4 == this._scene._playMode) return this.setTurnCardAni(this.cardData), void(this._gameView._centerPanel.btn_open.active = !0);
            console.log(e.name);
            var i = this.cardData.origin_cards;
            this.setLastCardTurnAni(t, i), this.btn_look4.active || this.btn_look5.active ? (this.spr_look.active = !0, this._gameView._centerPanel.btn_open.active = !1) : (this.spr_look.active = !1, this._gameView._centerPanel.btn_open.active = !0)
        } else console.log("看牌数据有误")
    }
})