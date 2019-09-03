/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
var cmd = require("QZNNCMD");
var nnTool = require("QZNNTool");
cc.Class({
    extends: cc.Component,

    properties: {
        area_number: null, //场号
    },
    onLoad: function() {
        this._GameView = this.node.getComponent("QZNNGameView");
    },
    start: function() {
        this.initSence();
        this.initData();

    },
    initSence: function() {
        //this._GameView._centerPancel.InitViewList();
        this.onEvenHandle();

    },
    resetSence: function() {
        this.area_number = null;
        this.onEvenHandle();
        if (cc.gg.global.gameRoomData) {
            //主动调取一下加入房间
            this.manageJoinRoom(cc.gg.global.gameRoomData);
        }
    },
    initData: function() {
        if (cc.gg.global.gameRoomData) {
            //主动调取一下加入房间
            //this.manageJoinRoom(cc.gg.global.gameRoomData);
        }
    },
    onEvenHandle: function() {
        var listenArr = ["JoinRoom", "GameStart", "GrabBanker", "StartBet",
            "PlayerMultiples", "ShowCard", "Win", "LeaveRoom", "StartLimitTime", "UpdateAccountStatus",
            "StarBet", "OnOpen", "OnIsContent", "Login",
        ];
        for (var i = 0; i < listenArr.length; i++) {
            cc.gg.protoBuf.addHandler(listenArr[i], this.listenEvent.bind(this))
        }
    },

    onDestroy: function() {
        cc.gg.utils.ccLog('我的场景被销毁啦');
        cc.gg.protoBuf.removeAllHandler();
    },
    listenEvent: function(instructionsName, data, isCustom) {
        if (isCustom) {
            //this._GameView.node_UI.removeAllChildren()
            //自定义指令
            if (instructionsName == "OnOpen") {
                var data = {
                    "account_id": cc.gg.global.userID,
                    area_number: parseInt(cc.gg.global.area_number),
                }
                cc.gg.protoBuf.send("JoinRoom", 1, data)
            } else if (instructionsName == "OnIsContent") {
                this.alert("net_content", data.text, this._GameView.node_UI);
            }
            return;
        }
        var data = proto.msg.Resp.deserializeBinary(data);
        var result = data.getResult();
        var resultMessage = data.getResultmessage();
        var datas = data.getData();
        console.log(datas, "listenEvent");
        if (result == 1) {
            if (instructionsName == "GameAreaDetail") {
                this.manageGameAreaDetail(datas);
            } else if (instructionsName == "JoinRoom") {
                this.manageJoinRoom(datas);
            } else if (instructionsName == "GameStart") {
                this.manageGameStart(datas)
            } else if (instructionsName == "GrabBanker") {
                this.manageGrabBanker(datas);
            } else if (instructionsName == "PlayerMultiples") {
                this.managePlayerMultiples(datas);
            } else if (instructionsName == "ShowCard") {
                this.manageShowCard(datas)
            } else if (instructionsName == "Win") {
                this.manageWin(datas)
            } else if (instructionsName == "LeaveRoom") {
                this.manageLeaveRoom(datas)
            } else if (instructionsName == "StartLimitTime") {
                this.manageStartLimitTime(datas)
            } else if (instructionsName == "UpdateAccountStatus") {
                this.manageUpdateAccountStatus(datas)
            } else if (instructionsName == "StarBet") {
                this.manageStartBet(datas);
            } else if (instructionsName == "Login") {

            }

        } else {
            if (instructionsName == "JoinRoom") {
                var self = this;
                cc.loader.loadRes("qznnPublic/prefab/alert", cc.Prefab, function(err, res) {
                    if (err) {
                        return
                    }
                    var data = cc.instantiate(res);
                    data.getComponent("alert").setView("game_err", resultMessage, self._GameView.node_UI)
                    self._GameView.node_UI.addChild(data);
                })
            } else if (instructionsName == "Login") {
                cc.gg.protoBuf.close();
                cc.gg.protoBuf.ISclose = true;
                this.alert("game_err", resultMessage, this._GameView.node_UI);
                return;
            }
            console.log(resultMessage, "异常返回")
            console.log(datas, "datas 的内容")
        }
    },

    onTimerMessage: function(e) {},

    alert: function(type, resultMessage, node) {
        var self = this;
        cc.loader.loadRes("qznnPublic/prefab/alert", cc.Prefab, function(err, res) {
            if (err) {
                return
            }
            var data = cc.instantiate(res);
            data.getComponent("alert").setView(type, resultMessage, self._GameView.node_UI)
            self._GameView.node_UI.addChild(data);
        })
    },
    //游戏开始
    manageGameStart: function(data) {
        var t = this;
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log("游戏开始消息");
        this._GameView.setViewStatus(false);
        //清除庄家标示 什么的
        // for (var i = 0; i < cmd.GAME_PLAYER; i++){
        //     this._GameView.setViewReadySign(i, !1);
        // }
        //this._lGameStatus = cmd.GAME_SCENE_PLAYING;
        //清除定时器  设置定时器
        // this._GameView._TimerClass.onKillTimer();
        // this._GameView.setGameTimer(datas.limit_time);
        this.playGameOpen()
        this.scheduleOnce(function() {
            t.onSubSendCard(datas)
        }, 1)
    },
    //游戏开始动画
    playGameOpen: function() {
        this._GameView._centerPancel.playGameOpen();
    },

    //发牌动画
    onSubSendCard: function(data) {
        var o = this,
            e = [0, 0, 0, 0, 0];
        for (var i = 0; i < data.accounts_status.length; i++) {
            var t = data.accounts_status[i];
            e[nnTool.getLocalIndex(t.id)] = parseInt(data.accounts_status[i].status);
            if (t.id == cc.gg.global.userID) {
                this._wMeStatus = parseInt(t.status)
            }
        }
        if (this._wMeStatus < 2 && 1 == nnTool.UserisExist()) {
            this.setViewStatus("Wait")
        }
        this.cbUserCardData = data.cards;
        var n = data.cards;
        console.log(n);
        this._GameView.setSendCardAni(e, function() {
            o._GameView.setTurnCardAni(n)
            o.scheduleOnce(function() {
                var e = data.limit_time;
                o._GameView.setGameTimer(e)
                if (nnTool.UserisExist() && 2 < o._wMeStatus) {
                    o._GameView._centerPancel.setBankerShow(o._playMode, true);
                    o._GameView.setViewStatus("GameStart");
                }
            }, .8);
        })

    },
    //用户抢庄
    manageGrabBanker: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data)
        console.log(datas, "抢庄数据");
        var pos = nnTool.getLocalIndex(datas.account_id);
        this._GameView._avatarPanel.setUserGrabMultiple(pos, cmd.GrabMultiple[datas.grab_multiple + ""])
    },
    //用户下注
    managePlayerMultiples: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data)
        console.log(datas, "用户下注");
        var pos = nnTool.getLocalIndex(datas.account_id);
        if (datas.multiples === 0) {
            datas.multiples = "5";
        }
        cc.gg.audioMgr.playSFX("qznnPublic/nnMusic/beishu2")
        this._GameView._avatarPanel.setUserMultiple(pos, datas.multiples)
    },
    //通知抢庄结果 到达下注阶段
    manageStartBet: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        var self = this;
        //隐藏游戏状态 关闭倒计时
        this._GameView.setViewStatus(false);
        var t = datas.limit_time;
        this._GameView._TimerClass.onKillTimer();
        console.log(datas, "manageStarBet");
        //隐藏抢庄按钮
        this._GameView._centerPancel.grabBankerBtn.active = false;
        //播放抢庄动画
        this._GameView.onGrabBankerAni(datas, function() {
            cc.gg.audioMgr.playSFX("qznnPublic/nnMusic/zhuang32")
            self._GameView.setGameTimer(t)
        })
    },
    //通知摊牌开始 
    manageShowCard: function(data) {
        //隐藏下注按钮 和房间状态
        this._GameView._centerPancel.betBtn.active = false;
        this._GameView.setViewStatus(false)
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        this._GameView.setViewOpenCard(datas)
    },
    //结算
    manageWin: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        this._GameView.onGameViewEndAni(datas)
    },
    //退出房间
    manageLeaveRoom: function(data) {
        console.log("退出游戏 manageLeaveRoom" + data);
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log(datas.account_id + "我是退出玩家的accountid")
        var t = nnTool.getLocalIndex(datas.account_id);
        this._GameView.clearViewUser(t);
        for (var i = 0; i < cmd.PLAYER_DATAS.length; i++) {
            cmd.PLAYER_DATAS[i].account_id == datas.account_id && cmd.PLAYER_DATAS.splice(i, 1)
        }

    },
    //加入房间:
    //游戏开始倒计时
    manageStartLimitTime: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log(data, "manageStartLimitTime");
        //❤新的一局 初始化
        this._GameView.resetView(cmd.GAME_PLAYER);
        //设置状态
        this._GameView.setViewStatus("StartLimitTime");
        //开启定时器
        console.log("超过两人准备后倒计时->>>>onSubStartLimitTime");
        var t = datas.limit_time;
        this._GameView._TimerClass.onKillTimer();
        this._GameView.setGameTimer(t)
    },
    //通知用户状态改变
    manageUpdateAccountStatus: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log("manageUpdateAccountStatus", datas);

        for (var t = datas, i = !1, a = 0; a < cmd.PLAYER_DATAS.length; a++) {
            var o = cmd.PLAYER_DATAS[a];
            o.account_id == t.account_id && (o = t, i = !0)
        }
        0 == i && cmd.PLAYER_DATAS.push(t), this._GameView.onUpdateUser(t)

    },
    //请求进入房间 
    manageJoinRoom: function(data) {
        if (!data || data == "") {
            return
        }
        this._GameView.resetView();
        cc.gg.global.gameRoomData = data;
        var datas = JSON.parse(data);
        console.log("manageJoinRoom", datas);
        this._GameView.resetView(cmd.GAME_PLAYER);
        this.roomStatus = datas.roomStatus;
        this._score_rule = datas.score_rule;
        this.times = datas.times;
        this._baseScore = parseInt(datas.base_score);
        this.card_type = datas.cards;
        this._GameView._centerPancel.setDifen(datas.base_score);
        this._cbUserCount = parseInt(datas.player_count);
        this._GameView.setTableUserCount(this._cbUserCount);
        //cmd.GAME_PLAYER = this._cbUserCount;
        cmd.MY_SEAT = parseInt(datas.serial_num)
        this.onClientAllGamer(datas.all_gamers);
        //恢复她人的场景
        this._GameView.onScenePlayerView(datas);
        this._wMeStatus = datas.account_status;
        2 <= datas.room_status && this.onScenePlaying(datas)
    },
    onClientAllGamer: function(data) {
        var t = data;
        cmd.PLAYER_DATAS = t;
        for (var i = 0; i < t.length; i++) t[i].serial_num == cmd.MY_SEAT && (cmd.MY_DATA = cmd.PLAYER_DATAS[i], cmd.MY_ID = t[i].account_id);
        for (i = 0; i < cmd.GAME_PLAYER; i++) this._GameView.clearViewUser(i);
        var a = t;
        for (i = 0; i < a.length; i++) this._GameView.onUpdateUser(a[i])
    },

    onSceneFree: function(data) {

    },
    onScenePlaying: function(datas) {
        if (console.log("用户游戏状态："),
            this._lGameStatus = cmd.GAME_SCENE_PLAYING,
            this._wMeStatus < 2 && 1 == nnTool.UserisExist()) {
            this._GameView._centerPancel.showWait()
        }
        if (datas.left_time) {
            var t = datas.left_time;
            this._GameView.setGameTimer(t);
        }
        if (0 < datas.banker_id) {
            //设置庄家
            var i = nnTool.getLocalIndex(datas.banker_id);
            this._GameView._avatarPanel.setViewBankerSign(i, !0)
        }
        // if (6 == this._playMode) {
        //     var a = parseInt(e.total_bet_score);
        //     this._GameView.setViewJackPot(a);
        //     var o = a / h.PourValueArray[this._PourNum][0];
        //     this._GameView.recoverThrowGold(o)
        // }
        this._GameView.onSceneView(datas)
    },

    setTableUserCount: function(player_count) {
        //this._avatarPanel.setUserCount(player_count);
        this._cardPanel.setUserCount(player_count);
        //this._centerPanel.setStatusCount(player_count);
        this._avatarPanel.resetView(player_count);
        this._cardPanel.resetView(player_count)
    },
    manageGameAreaDetail: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log("房间数据", datas);
        //将数据派发给center处理
    },
    //发送用户进入房间 主要是用来重连
    sendsendJoinRoom: function(area_number) {
        var data = {
            "account_id": cc.gg.global.userID,
            area_number: parseInt(area_number),
        }
        cc.gg.protoBuf.send("JoinRoom", 1, data)
    },
    //抢庄请求
    sendGrabBanker: function(grab_multiple) {
        var data = {
            "room_id": JSON.parse(cc.gg.global.gameRoomData).room_id,
            "grab_multiple": parseInt(grab_multiple),
            "account_id": cc.gg.global.userID,
        }
        cc.gg.protoBuf.send("GrabBanker", 1, data)
    },
    //下注请求
    sendPlayerMultiples: function(multiples) {
        var data = {
            "room_id": JSON.parse(cc.gg.global.gameRoomData).room_id,
            "multiples": parseInt(multiples),
            "account_id": cc.gg.global.userID,
        }
        cc.gg.protoBuf.send("PlayerMultiples", 1, data)
    },
    //退出游戏请求
    sendLeaveRoom: function(data) {
        var data = {
            "account_id": cc.gg.global.userID,
        }
        cc.gg.protoBuf.send("LeaveRoom", 1, data);
    },
});