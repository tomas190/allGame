var y = require("QZNNCMD")
var nnTool = require("QZNNTool")
cc.Class({
    extends: cc.Component,

    properties: {
        cardNodes: [],
        myCards: [],
        mycardNode: cc.Node,
        cardData: null
    },

    initzation: function (e, t) {
        this.node = e,
            this._GameView = t,
            this._scene = t._scene,
            this.initView(),
            this.initNode(),
            this.gameCardType = this._GameView.gameCardType;
        this.pokerDianshu = this._GameView.pokerDianshu
    },

    initView: function () {
        for (var e = 0; e < 5; e++) {
            this.cardNodes[e] = cc.find("user_head" + e + "/node_card", this.node),
                this.cardNodes[e].active = !1;
            for (var i = 0; i < 5; i++) {
                let poker = this.cardNodes[e].getChildByName("poker" + i);
                y.PokerNode[e].push(poker.getPosition());
                // poker.is3DNode = true;
            }
            y.PokerBase.push(this.cardNodes[e].getPosition());
        };
        this.throwAni = this.node.getChildByName("throwCard");
        this.throwAni.active = false;
        this.cardNodes[5] = this.node.getChildByName("myCard");
        this.cardNodes[5].active = false;
    },

    initNode: function () {

    },

    setDeskCard(cards) {
        //创建牌面
        for (let i = 0; i < 5; ++i) {
            this.cardNodes[5].getChildByName("poker" + i).getComponent("createPoker").createPoker(cards[i]);
        }
    },

    resetView: function () {
        for (var t = 0; t < 5; t++) {
            for (var i = 0; i < y.MAX_COUNT; i++) {
                this.cardNodes[t].stopAllActions()
                var poker = this.cardNodes[t].getChildByName("poker" + i);
                this.cardNodes[t].stopAllActions();
                poker.stopAllActions()
                if (t == 0) this.cardNodes[t].scale = 0.9;
                poker.getComponent("createPoker").createPoker(0);
                poker.setPosition(y.PokerNode[t][i]);
                poker.skewX = 0;
                poker.skewY = 0;
                poker.scaleY = 1;
                poker.scaleX = 1;
                var r = this.cardNodes[t].getChildByName("sprCard");
                r.active = false;
                poker.active = false;
            }
            this.cardNodes[t].setPosition(y.PokerBase[t]);
            this.cardNodes[t].active = false;
        }
        this.myCards.length = 0;
        this.cardNodes[5].active = false;
        this.unscheduleAllCallbacks();
    },

    showUserCardBack: function (e) {
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

    revocerCards(index, cards) {
        for (let i = 0; i < 5; ++i) {
            this.cardNodes[index].getChildByName("poker" + i).active = true;;
        }
        this.cardNodes[index].active = true;
        this.cardNodes[index].getChildByName("sprCard").active = false;
        index == 0 && this.setTurnCardAni(cards);
    },

    setSendCardAni: function (players, myCards) {
        let a = [3, 4, 0, 1, 2];
        let dealSequence = [];
        for (let i = 0; i < a.length; ++i) {
            for (let j = 0; j < players.length; ++j) {
                let index = nnTool.getLocalIndex(players[j]);
                if (index == 0) y.MY_STATUS = true;
                if (a[i] == index) dealSequence.push(a[i])
            }
        }
        //创建待发牌
        let totalCards = players.length * 5;
        let Zorder = totalCards;
        for (let i = 0; i < totalCards; ++i) {
            var backPoker = cc.instantiate(this._GameView.backPoker);
            backPoker.active = true;
            backPoker.zIndex = Zorder--;
            this._GameView._centerPancel.back_node_card.addChild(backPoker);
            let index = dealSequence[~~(i / 5)];
            this.cardNodes[index].active = true;
            let poker = this.cardNodes[index].getChildByName("poker" + i % 5);
            this.cardNodes[index].getChildByName("sprCard").active = false;
            poker.active = false;
            let pos = cc.v2(0, i * 2 + 50);
            backPoker.setPosition(pos);
            let target = poker.getPosition();
            target = this.cardNodes[index].convertToWorldSpaceAR(target);
            target = this._GameView._centerPancel.back_node_card.convertToNodeSpaceAR(target);
            let p2 = null;
            if (index > 2)
                p2 = cc.v2(-150, 800);
            else if (index > 0 && index < 2)
                p2 = cc.v2(150, 800);
            else
                p2 = cc.v2(0, 800);
            let points = [pos, p2, target];
            let delayTime = cc.delayTime(0.025 * i + (~~(i / 5)) * 0.3);
            let bezier = cc.bezierTo(.4, points);
            let call = cc.callFunc((sender) => {
                sender.destroy();
                poker.active = true;
                if (index == 0 && myCards) this.setTurnCardAni(myCards);
                if (i == totalCards - 1 && y.CUR_STAGE == 22) {//发完拍显示抢庄按钮
                    y.DEAL_FALG = true;
                    this._GameView.setCountDown(y.CUR_STAGE);
                    this._GameView.btnVisible(true, 2);
                }
            })
            let seq = cc.sequence(delayTime, bezier, call);
            backPoker.runAction(seq);
        }
    },

    setSendCardAni2(players, myCards) {
        for (let i = 0; i < players.length; ++i) {
            let index = nnTool.getLocalIndex(players[i]);
            this.cardNodes[index].active = true;
            for (let j = 0; j < 5; ++j) {
                var backPoker = cc.instantiate(this._GameView.backPoker);
                this._GameView._centerPancel.back_node_card.addChild(backPoker);
                backPoker.setPosition(cc.v2(0, 50));
                backPoker.active = true;
                let poker = this.cardNodes[index].getChildByName("poker" + j);
                poker.active = false;
                let pos = poker.getPosition();
                pos = this.cardNodes[index].convertToWorldSpaceAR(pos);
                pos = this._GameView._centerPancel.back_node_card.convertToNodeSpaceAR(pos);
                let m2 = cc.moveTo(0.1, pos);
                let call = cc.callFunc((sender) => {
                    sender.destroy();
                    poker.active = true;
                    if (index == 0 && myCards && j == 4) {
                        this.setTurnCardAni(myCards);
                        y.DEAL_FALG = true;
                        this._GameView.setCountDown(y.CUR_STAGE);
                        this._GameView.btnVisible(true, 2);
                    }
                });
                let seq = cc.sequence(m2, call);
                backPoker.runAction(seq);
            }
        }
    },

    showSettleCards(data) {
        for (var k = 0; k < data.length; ++k) {
            let index = nnTool.getLocalIndex(data[k].chair);
            this.cardNodes[index].active = true;
            if (data[k].cards && data[k].cards.length == 5) {
                var cards = data[k].cards;
                if (index == 0) {
                    this.setDeskCard(cards);
                    this.cardNodes[5].active = true;
                    this.setTypeSprite(5, data[k].cardType, false);
                } else {
                    this.cardNodes[index].active = true;
                    for (var i = 0; i < cards.length; i++) {
                        var poker = this.cardNodes[index].getChildByName("poker" + i)
                        poker.active = true;
                        poker.getComponent("createPoker").setCardAni(cards[i]);
                    }
                    this.setTypeSprite(index, data[k].cardType, false);
                }
            }
        }
    },

    setViewOpenCard: function (e, t, fun) {
        if (e < 0 || e >= y.GAME_PLAYER || !t) console.log("error--\x3e>>展示动画有错");
        else {
            var i = this.cardNodes[e];
            i.active = !0;
            for (var a = 0; a < t.length; a++) {
                i.getChildByName("poker" + a).getComponent("createPoker").createPoker(t[a])
            }
        }
        fun && fun()
    },

    //扔牌动画 只有我自己有
    throwPoker(type) {
        let sortArr = [];
        let func = () => {
            this.cardNodes[0].active = false;
            this.throwAni.active = true;
            var sk = this.throwAni.getComponent(sp.Skeleton);
            sk.setAnimation(1, "Animation1", false);
            sk.setEventListener(function () {
                this.cardNodes[5].active = true;
                this.setTypeSprite(5, type, true);
                this.scheduleOnce(() => {
                    this._GameView.openCardsAni();
                }, 1);
                cc.gg.audioMgr.playSFX("language/CN/nnMusic/zapai")
            }.bind(this));
        }
        if (type == 0) {//无牛
            for (var k = 0; k < 5; k++) {//执行抖动动画
                var poker = this.cardNodes[0].getChildByName("poker" + k);
                var t = cc.skewTo(.08, 5, -5),
                    i = cc.skewTo(.08, 0, 0),
                    a = cc.skewTo(.08, -5, 5),
                    o = cc.repeat(cc.sequence(t, i, a, i), 4);
                poker.runAction(o);
            }
        } else {//有牛
            let arr = this.getCardType(this.myCards.slice());
            if (arr) {
                for (let i = 0; i < arr.length; ++i) {
                    let poker = this.cardNodes[0].getChildByName("poker" + arr[i]);
                    var active = cc.sequence(cc.delayTime(0.2 * i), cc.moveTo(0.2, poker.position.x, 35));
                    poker.runAction(active);
                    sortArr.push(this.myCards[arr[i]]);
                }
                for (let i = 0; i < this.myCards.length; ++i) {
                    let ii = sortArr.indexOf(this.myCards[i]);
                    if (ii == -1) sortArr.push(this.myCards[i]);
                }
            }
        }
        this.scheduleOnce(() => {
            func();
        }, 2.0);
    },

    getCardType(cards) {
        let arr = []
        for (let i = 0; i < cards.length; ++i) {
            let a1 = (cards[i] & 0x0F);
            let val1 = a1 > 10 ? 10 : a1;
            for (let j = i + 1; j < cards.length; ++j) {
                let a2 = (cards[j] & 0x0F);
                let val2 = a2 > 10 ? 10 : a2;
                for (let k = j + 1; k < cards.length; ++k) {
                    let a3 = (cards[k] & 0x0F);
                    let val3 = a3 > 10 ? 10 : a3;
                    if ((val1 + val2 + val3) % 10 === 0) {
                        arr.push(i);
                        arr.push(j);
                        arr.push(k);
                        return arr;
                    }
                }
            }
        }
        return null;
    },

    //其他人翻牌
    OtherOpenCards(index, cards, type) {
        for (var i = 0; i < cards.length; i++) {
            this.cardNodes[index].getChildByName("poker" + i).getComponent("createPoker").setCardAni(cards[i]);
        }
        this.setTypeSprite(index, type, true);
        this.scheduleOnce(() => { this._GameView.openCardsAni() }, 1);
    },

    //我自己翻牌
    myselfOpenCards(cards, type) {
        this.setDeskCard(cards);
        this.saveMyCards(cards);
        if (this.myCards.length != 5) {
            cc.log("#######myselfOpenCards#####====>", this.myCards.length)
        }
        for (var i = 0; i < this.myCards.length; i++) {
            this.cardNodes[0].getChildByName("poker" + i).getComponent("createPoker").setCardAni(this.myCards[i]);
        }
        this.scheduleOnce(() => {
            this.throwPoker(type);
        }, .3);
    },

    saveMyCards(cards) {
        if (y.ISCONFIG) this.myCards.length = 0;
        for (var i = 0; i < cards.length; i++) {
            let T = this.myCards.indexOf(cards[i]);
            if (T == -1) this.myCards.push(cards[i]);
        }
    },

    setTurnCardAni: function (cards) {
        this.saveMyCards(cards);
        for (var i = 0; i < this.myCards.length; i++) {
            this.cardNodes[0].getChildByName("poker" + i).getComponent("createPoker").setCardAni(this.myCards[i]);
        }
    },

    setTypeSprite: function (e, i, flag) {
        var a = this.cardNodes[e].getChildByName("sprCard");
        var layout = a.getChildByName("layout")
        var paixing = layout.getChildByName("ani_paixing");
        var beishu = layout.getChildByName("ani_beishu");
        var type = "niu_" + i;
        var multiple = "X"
        a.active = true;
        beishu.active = true;
        if (i == 7 || i == 8 || i == 9) {
            multiple += 2;
        } else if (i == 10) {
            multiple += 3;
        } else if (i == 11) {
            multiple += 4;
        } else if (i > 11) {
            multiple += 5;
        } else if (i == 0) {
            beishu.active = false;
        } else {
            multiple += 1;
        }
        flag && cc.gg.audioMgr.playSFX("language/CN/nnMusic/kind/kind" + i)
        paixing.getComponent(sp.Skeleton).setAnimation(1, type, false);
        i == 0 || beishu.getComponent(sp.Skeleton).setAnimation(1, multiple, false);
    },

})