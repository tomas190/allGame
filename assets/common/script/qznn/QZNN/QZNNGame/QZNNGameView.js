/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
var headerPanel = require("QZNNGameTopPancel");
var centerPanel = require("QZNNGameCenterPanel");
var pokerPanel = require("PokerNode");
var avatarPanel = require("QZNNGameAvatarPanel");
var nnTool = require("QZNNTool");
var cmd = require("QZNNCMD");
var Animation = require("Animation");
cc.Class({
    extends: cc.Component,

    properties: {
        backMsgLock: true,
        gameCardType: cc.SpriteAtlas, // 17381
    },

    onLoad: function() {
        cc.gg ? cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE) : cc.director("appStart");
        this._scene = this.node.getComponent("QZNNGameScene");
    },
    start: function() {
        this.initView();
        this.initNode();
        //this.resetView();
        this.addEvenListener();
        var e = cc.view.getVisibleSize();
        e.width / 750 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);

    },
    initView: function() {
        this.node_header = cc.find("header", this.node);
        this.node_center = cc.find("center", this.node);


        this._topPancel = new headerPanel;
        this._centerPancel = new centerPanel;
        this._cardPanel = new pokerPanel;
        this._avatarPanel = new avatarPanel;


        this._topPancel.initzation(this.node_header, this);
        this._centerPancel.initzation(this.node_center, this);
        this._cardPanel.initzation(this.node_center, this);
        this._avatarPanel.initzation(this.node_center, this);


        //主节点
        this.QZNNGame = cc.find("nnGame", this.node._parent);
        this.roomList = cc.find("roomList", this.node._parent);
        this.node.active = false;

    },
    resetView: function() {
        this._topPancel.resetView();
        this._centerPancel.resetView();
        this._avatarPanel.resetView(cmd.GAME_PLAYER);
        this._cardPanel.resetView(cmd.GAME_PLAYER);
    },
    addEvenListener: function() {
        //cc.gg.utils.addClickEventEND(this.backHall, this.backHallFun.bind(this));
        //cc.gg.utils.addClickEventEND(this.backHall, this.test.bind(this));
    },

    initNode: function() {
        //this.node_loading.active = false;
        this._TimerClass = this._centerPancel.time.getComponent("time");
        this.node_gold = this._centerPancel.node_gold;
        Animation.Init()
    },
    //翻牌的动画
    setSendCardAni: function(e, t, i) {
        this._cardPanel.setSendCardAni(e, t, i)
    },
    setTurnCardAni: function(e) {
        this._cardPanel.setTurnCardAni(e)
    },
    test: function(target) {
        console.log(target.name + "ceshi")
    },
    setTableUserCount: function() {

    },
    setGameTimer: function(e) {
        var self = this;
        console.log("设置定时器：：：", e);
        this._TimerClass.setGameTimer({
            TimeCount: e,
            flag: !0,
            onTimerMessageFunc: self._scene.onTimerMessage
        })
    },
    // 提供一个函数退出游戏
    backRoomList: function(data) {
        console.log("我在退出游戏")
            //销毁此场景监听的所有事件
        cc.gg.protoBuf.removeAllHandler();
        var self = this;
        if (!this.backMsgLock) {
            return
        }
        self.backMsgLock = false;
        this.scheduleOnce(function() {
            self.roomList.active = true;
            self.roomList.getComponent("QZNNRoomView").resetView()
            self.roomList.getComponent("QZNNRoomScene").resetSence()
            self.QZNNGame.active = false;
            self.backMsgLock = true;

        }, 0.2)
    },
    //设置游戏状态标示
    setViewStatus: function(type) {
        var types = type ? cmd.Game_Status[type] : false
        this._centerPancel.setViewStatus(types);
    },
    clearViewUser: function(e) {
        this._avatarPanel.clearUserFace(e)
    },
    //调取牌类组件的发牌动画
    // setSendCardAni: function(data) {
    //     this._cardPanel.setSendCardAni(data);
    // },
    onUpdateUser: function(e) {
        console.log("更新用户头像" + e.serial_num), console.log(e);
        var t = e.account_id,
            i = nnTool.getLocalIndex(t);
        // console.log(i), 2 == e.account_status && this.setViewReadySign(i, !0),
        this._avatarPanel.setUserInfo(i, e);
        // 0 == e.online_status ? this.setViewUserOffLine(i, !0) : 1 == e.online_status && this.setViewUserOffLine(i, !1)
    },
    onGrabBankerAni: function(e, t) {
        var i = this,
            a = [],
            o = cmd.INVALE_CHAIR;
        if (e.players_status) {
            for (var n = 0; n < e.players_status.length; n++) {
                a[n] = nnTool.getLocalIndex(e.players_status[n].account_id);
            }
            for (n = 0; n < e.players_status.length; n++) {
                1 == e.players_status[n].is_banker &&
                    (o = nnTool.getLocalIndex(e.players_status[n].account_id));
            }

            this.setViewGrabBankerAni(a, o, function() {
                //隐藏所有人的状态
                i.hideUserStatus();
                //设置庄家标示
                i._avatarPanel.setViewBankerSign(o, !0);
                //设置庄家倍数
                e.grab_multiple = e.grab_multiple ? e.grab_multiple : "1";
                i._avatarPanel.setUserGrabMultiple(o, cmd.GrabMultiple[e.grab_multiple]);
                //设置下注标示
                i._centerPancel.setViewStatus(cmd.Game_Status["StarBet"])
                if (nnTool.UserisExist()) {
                    //自己是庄家
                    console.log(o + "我是庄家对座位号");
                    if (0 === o) {

                    } else {
                        console.log(i._scene._wMeStatus + "我是当前玩家对状态");
                        //非观战玩家
                        if (i._scene._wMeStatus > 2) {
                            i._centerPancel.betBtn.active = !0
                        } else {
                            //显示等待下一句
                        }
                    }

                } else {
                    console.log("都不存在 ??????????")
                }
                console.log("->>>>>>>>抢庄动画结束设置庄家", new Date), t && t()
            })
        } else console.log("已经定庄啦")
    },
    hideUserStatus: function() {
        this._avatarPanel.hideUserStatus()
    },
    setViewGrabBankerAni: function(t, e, i) {
        console.log("&&&&&&&&&&抢庄动画开始->>>1111111111111", new Date);
        if (t.length <= 1) {
            i && i()
        } else {
            for (var a = [], o = 0, n = 0; n < t.length; n++) a[n] = this._avatarPanel.player[t[n]].getChildByName("blink"), e == t[n] && (o = n);
            var s = .1,
                c = 20;
            t.length <= 4 && (s = .2, c = 10);
            var r = 0,
                l = 0,
                d = cc.sequence(cc.delayTime(s), cc.callFunc(function() {
                    for (var e = 0; e < t.length; e++) a[e].active = !1;
                    c - 1 <= ++l ? a[o].active = !0 : a[r].active = !0, r++, r = parseInt(r % t.length)
                })),
                h = cc.sequence(cc.repeat(d, c), cc.delayTime(.5), cc.callFunc(function() {
                    for (var e = 0; e < t.length; e++) a[e].active = !1;
                    i && i()
                }));
            this.node.runAction(h)
        }
    },
    onGameViewEndAni: function(data) {
        var a = this,
            o = data,
            t = [],
            i = [],
            n = [],
            s = [];
        for (var c in o.game_scores) {
            var r = c,
                l = y.getLocalIndex(r),
                d = o.game_scores[r];
            n.push(l), s.push(d), d <= 0 ? r != o.banker_id && t.push(this._avatarPanel.player[l]) : r != o.banker_id && i.push(this._avatarPanel.player[l])
        }
        var h = {};
        for (var g in o.scores) {
            r = g, l = y.getLocalIndex(r);
            var u = o.scores[g];
            h[l] = u
        }
        var m = nnTool.getLocalIndex(o.banker_id),
            _ = this._avatarPanel.player[m],
            p = this.gameCardType.getSpriteFrame("chip_s"),
            f = this.node_gold;
        if (4 != this._scene._playMode) 6 != this._scene._playMode ? Animation.SetGoldAnimation(f, p, _, t, !0, function() {
            Animation.SetGoldAnimation(f, p, _, i, !1, function() {
                a.setViewScoreAni(n, s, function() {
                    for (var e in h) {
                        var t = e,
                            i = h[e];
                        a._avatarPanel.setUserScore(t, i)
                    }
                    a._scene._gameNewNum == a._scene._gameTotalNum ? a._scene.gameTotalData && a.setGameEndLayer(a._scene.gameTotalData) : 1 == a.getAutoReady() ? a._scene.onSendUserReady() : (0 != a._scene._wMeStatus && (a._scene._wMeStatus = 1), 1 == y.UserisExist() && (a._centerPanel.btn_ready.setScale(1), a._centerPanel.btn_ready.active = !0, 0 == m && 5 == a._scene._playMode && 3 <= o.game_num && (console.log("显示下庄按钮"), a._centerPanel.setBtnReaby()), a.setViewStatus("reset")))
                })
            })
        }) : Animation.SetGoldAnimation(f, p, f, i, !1, function() {
            a.setViewScoreAni(n, s, function() {
                for (var e in h) {
                    var t = e,
                        i = h[e];
                    a._avatarPanel.setUserScore(t, i)
                }
                a._scene._gameNewNum == a._scene._gameTotalNum ? a._scene.gameTotalData && a.setGameEndLayer(a._scene.gameTotalData) : 1 == a.getAutoReady() ? a._scene.onSendUserReady() : (0 != a._scene._wMeStatus && (a._scene._wMeStatus = 1), 1 == y.UserisExist() && (console.log("我进入了结算啊啊啊"), a._centerPanel.btn_ready.active = !0, a.setViewStatus("reset")))
            })
        });
        else {
            var C = nnTool.getLocalIndex(o.winner_id),
                b = this._avatarPanel.player[C];
            Animation.SetGoldAnimation(f, p, b, t, !0, function() {
                a.setViewScoreAni(n, s, function() {
                    for (var e in h) {
                        var t = e,
                            i = h[e];
                        a._avatarPanel.setUserScore(t, i)
                    }
                    a._scene._gameNewNum == a._scene._gameTotalNum ? a._scene.gameTotalData && a.setGameEndLayer(a._scene.gameTotalData) : 1 == a.getAutoReady() ? a._scene.onSendUserReady() : (0 != a._scene._wMeStatus && (a._scene._wMeStatus = 1), 1 == y.UserisExist() && (console.log("我进入了结算啊啊啊"), a._centerPanel.btn_ready.active = !0, a.setViewStatus("reset")))
                })
            })
        }
    },
    setViewScoreAni: function(e, t, i) {
        console.log("setViewScoreAni..>....................>setViewScoreAni");
        var a = this.node_gold;
        o = new cc.Color(255, 246, 0),
            n = new cc.Color(36, 255, 0);
        0 == e.length && i && i();
        for (var s = 0; s < e.length; s++) {
            var c = e[s],
                r = this.players[c].getPosition(),
                l = !0;
            c < Math.floor(cmd.GAME_PLAYER / 2) && (l = !1);
            var d = new cc.Node,
                h = new cc.Node,
                g = new cc.Node;
            h.addComponent(cc.Sprite),
                h.getComponent(cc.Sprite).spriteFrame = this.publicAtlas.getSpriteFrame("df_1"),
                t[c] < 0 && (h.getComponent(cc.Sprite).spriteFrame = this.publicAtlas.getSpriteFrame("df_2")),
                r.y = r.y + 40, 1 == l ? (r.x = r.x + 95, d.anchorX = 0) : (r.x = r.x - 95, d.anchorX = 1),
                d.setPosition(r), d.addChild(h),
                a.addChild(d),
                g.addComponent(cc.Label),
                g.getComponent(cc.Label).string = 0 < t[c] ? "+" + t[c] : t[c],
                g.color = o, t[c] < 0 && (g.color = n), d.addChild(g);
            var u = cc.sequence(cc.moveTo(1, cc.v2(r.x, r.y - 40)),
                cc.delayTime(1.4),
                cc.callFunc(function() {
                    a.removeAllChildren(),
                        i && i()
                }));
            d.runAction(u)
        }
    },
    setViewOpenCard: function(e) {
        var self = this,
            t = nnTool.getLocalIndex(e.account_id),
            i = nnTool.getUserSexByID(e.account_id),
            a = e.cards_info;
        console.log("用户视图座位号:", t);
        console.log("摊牌类型:", a.kind);
        // 0 == t && (console.log("自己的展示牌值:", a.cards),
        //         this._cardPanel.cardData = null,
        //         this._centerPanel.btn_open.active = !1,
        //         this._cardPanel.setBtnLook(1, !1)),
        // this._cardPanel.setOpenCardAni(t, a);
        // this._cardPanel.setTypeSprite(t, i, a.kind)
        this._cardPanel.setViewOpenCard(t, a.cards, function() {
            self._cardPanel.setTypeSprite(t, i, a.kind)
        })
    },
    //我在恢复别人的场景
    onScenePlayerView: function(e) {
        for (var t = 0; t < e.all_gamers.length; t++) {
            // var i = e.all_gamers[t],
            //     a = nnTool.getLocalIndex(i.account_id);
            // if (0 != a || 1 != nnTool.UserisExist()) {
            //     var o = i.account_status;
            //     console.log("其他玩家状态", a, o), 
            //     2 < o && o < 8 && (5 == this._scene._playMode && o <= 5 || 
            //         this._cardPanel.showUserCardBack(a)), 
            //         4 == o ? this.setViewGrabSign(a, 0) : 5 == o ? this.setViewGrabSign(a, 1) : 6 == o ? 6 
            //         != this._scene._playMode && i.account_id == e.banker_id 
            //         && this._avatarPanel.setUserMultiple(a, 1) : 7 == o ? 
            //         6 == this._scene._playMode ? this._avatarPanel.setUserChipScore(a, i.multiples) : 
            //         this._avatarPanel.setUserMultiple(a, i.multiples) : 8 == o 
            //         && (this._cardPanel.setViewOpenCard(a, i.cards), 
            //         7 == this._scene._playMode ? this._cardPanel.setJXTypeSprite(a, null, i.kind) : 
            //         this._cardPanel.setTypeSprite(a, null, i.kind), 
            //         6 == this._scene._playMode ? this._avatarPanel.setUserChipScore(a, i.multiples) : 
            //         this._avatarPanel.setUserMultiple(a, i.multiples))
            // }
        }
    },
    //我在恢复自己的场景
    onSceneView: function(e) {
        if (console.log("当前账户状态->>>>>", e.account_status), e.account_status <= 2) console.log("中途进入游戏");
        // else {
        //     if (2 < e.account_status && e.account_status < 8 && (5 == this._scene._playMode && e.account_status <= 5 || this._cardPanel.showUserCardBack(0)), 3 == e.account_status) {
        //         this._centerPanel.node_banker.active = !0, 5 == this._scene._playMode && this.setBankerShow();
        //         var t = "qiangzhuang";
        //         this._centerPanel.setSprScene(t)
        //     } else if (4 == e.account_status) {
        //         this.setViewGrabSign(0, 0);
        //         t = "qiangzhuang";
        //         this._centerPanel.setSprScene(t)
        //     } else if (5 == e.account_status) {
        //         this.setViewGrabSign(0, 1);
        //         t = "qiangzhuang";
        //         this._centerPanel.setSprScene(t)
        //     } else if (6 == e.account_status)
        //         if (6 == this._scene._playMode) {
        //             this._centerPanel.node_slider.active = !0;
        //             t = "waitthrowchip";
        //             this._centerPanel.setSprScene(t)
        //         } else {
        //             if (cc.gg.hallNetMgr._userInfo.account_id != e.banker_id) {
        //                 this._centerPanel.node_bet.active = !0;
        //                 t = "xianjiaxiazhu";
        //                 this._centerPanel.setSprScene(t)
        //             } else {
        //                 this._avatarPanel.setUserMultiple(0, 1);
        //                 t = "dengdaixiazhu";
        //                 this._centerPanel.setSprScene(t)
        //             }
        //         }
        //     else if (7 == e.account_status) {
        //         6 == this._scene._playMode ? this._avatarPanel.setUserChipScore(0, e.multiples) : this._avatarPanel.setUserMultiple(0, e.multiples);
        //         t = "dengdaitanpai";
        //         this._centerPanel.setSprScene(t), this._cardPanel.btn_look.active = !1, this._centerPanel.btn_open.active = !0
        //     } else if (8 == e.account_status) {
        //         6 == this._scene._playMode ? this._avatarPanel.setUserChipScore(0, e.multiples) : this._avatarPanel.setUserMultiple(0, e.multiples);
        //         t = "dengdaitanpai";
        //         this._centerPanel.setSprScene(t)
        //     }
        //     console.log("->>>>>>>>>>>重连牌值->>>>>>", e.cards), e.cards && this._cardPanel.setViewOpenCard(0, e.cards), e.kind && (7 == this._scene._playMode ? this._cardPanel.setJXTypeSprite(0, null, e.kind) : this._cardPanel.setTypeSprite(0, null, e.kind))
        // }
    },
});