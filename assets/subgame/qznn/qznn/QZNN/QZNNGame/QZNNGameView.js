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
cc.Class({
    extends: cc.Component,

    properties: {
        backMsgLock: true,
        gameCardType: cc.SpriteAtlas, // 17381
        pokerDianshu: cc.SpriteAtlas,
        goldImg: cc.Sprite,
        backPoker: cc.Node, //中间牌
        TestView: {
            default: null,
            type: cc.Node
        },
        musicNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        musicNormalPress: {
            default: null,
            type: cc.SpriteFrame
        },
        musicClose: {
            default: null,
            type: cc.SpriteFrame
        },
        musicClosePress: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    onLoad: function () {
        cc.gg ? cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE) : cc.director("appStart");
        this._scene = this.node.getComponent("QZNNGameScene");
        this.seq = null;
        this.dataMap = null;
        this.settleInfo = null;
        this.countStage = null;
        this.tempNode = [];//保存临时的节点 方便在退出时清理

    },

    start: function () {
        // this.initView();
        // this.initNode();
        var e = cc.view.getVisibleSize();
        e.width / 750 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);

    },

    initView: function () {
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
        // this.QZNNGame = cc.find("nnGame", this.node._parent);
        // this.roomList = cc.find("roomList", this.node._parent);

        this.node_UI = cc.find("node_UI", this.node);
    },

    resetView: function () {
        // cc.director.getActionManager().removeAllActions();
        this._topPancel.resetView();
        this._centerPancel.resetView();
        this._avatarPanel.resetView();
        this._cardPanel.resetView();
        this.clearTempNode();
        this.TestView.getComponent("TestView").initPokers()
        cmd.COUNTTIME = 0;
        cmd.TIMESTAMP = 0;
        cmd.CUR_STAGE = null;
        cmd.SENDDATA = null;
        this.TestView.active = false;
        let ani = this.node_UI.getChildByName("startAni")
        ani && ani.destroy();
    },

    initNode: function () {
        this._TimerClass = this._centerPancel.time.getComponent("time");
        this.node_gold = this._centerPancel.node_gold;
    },

    initUsers: function (users) {
        this._centerPancel.isWaitOther(users.length == 1);//等待其他玩家
        for (let i = 0; i < users.length; ++i) {
            let index = nnTool.getLocalIndex(users[i].chair);
            this._avatarPanel.setUserInfo(index, users[i]);
            // cc.log("######initUsers===>>",users[i].chair,users[i].isInGame)
            if (users[i].isInGame && (cmd.CUR_STAGE == 20 || cmd.CUR_STAGE == 22 || cmd.CUR_STAGE == 23)) {
                cmd.DEAL_FALG = true;
                this._avatarPanel.setUserMultiple(index, users[i].multiple, cmd.CUR_STAGE, users[i].chair == cmd.BANKER_CHAIR);
                this._cardPanel.revocerCards(index, users[i].cards);//除了抢庄和下注阶段其余阶段都不显示牌
            }
            if (index == 0) cmd.MY_STATUS = users[i].isInGame;
            if (index == 0 && cmd.MY_STATUS) {//我自己
                if (cmd.CUR_STAGE == 22) {
                    this.btnVisible(false, 3);
                    this.btnVisible(users[i].multiple == -1, 2);
                } else if (cmd.CUR_STAGE === 23) {
                    this.btnVisible(false, 2);
                    cmd.BANKER_CHAIR != users[i].chair && this.btnVisible(users[i].multiple == -1, 3);
                }
            }
        }
    },

    onEnterGame(data) {
        let users = data.allPlayers;
        this._TimerClass.onKillTimer();//停止倒计时
        if (data.countDown > 0) this.setGameTimer(data.countDown);//设置倒计时
        this._centerPancel.setDifen(data.basePoint);//设置房间低分
        if (data.bankerChair != -1) {
            cmd.RANDOM_BANKER = true;
            cmd.BANKER_CHAIR = data.bankerChair;
        }
        this.initUsers(users);//初始玩家列表
        this._centerPancel.isWaitNextRound(false);//先隐藏等待下一局提示
        if (data.countDown > 0) this.setViewStatus(cmd.CUR_STAGE);
        switch (cmd.CUR_STAGE) {
            case 10:
                break;
            case 20: //发牌阶段
                this._centerPancel.isWaitNextRound(!cmd.MY_STATUS);
                if (cmd.SENDDATA) {//收到发牌通知
                    this._cardPanel.setSendCardAni2(cmd.SENDDATA.sendCardsPlayer, cmd.SENDDATA.myCards)
                }
            case 22://抢庄
                this._centerPancel.isWaitNextRound(!cmd.MY_STATUS);
                cmd.RANDOM_BANKER && this.setBanker();
                break;
            case 23://下注
                this._centerPancel.isWaitNextRound(!cmd.MY_STATUS);
                this.setBanker();
                break;
            case 27://等待结算
                cmd.MY_STATUS = false
                this._TimerClass.onKillTimer();//停止倒计时
                this._centerPancel.isWaitNextRound(true);
                this._cardPanel.showSettleCards(users)
                break;
            case 28://牌局结束
            case 29://游戏结束
                this._TimerClass.onKillTimer();//停止倒计时
                this.resetView();
                break;
        }
    },

    setBanker() {
        this.hideUserStatus()
        this._avatarPanel.setViewBankerSign(nnTool.getLocalIndex(cmd.BANKER_CHAIR), true)//设置庄家
    },

    //发牌的动画
    setSendCardAni: function () {
        if (cmd.SENDDATA) {
            this._cardPanel.setSendCardAni(cmd.SENDDATA.sendCardsPlayer, cmd.SENDDATA.myCards)
        }
    },

    setGameTimer: function (e) {
        if (e < 0) return;
        console.log("设置定时器：：：", e);
        this._centerPancel.isWaitOther(false);
        this._TimerClass.setGameTimer({
            TimeCount: e,
            flag: true,
            onTimerMessageFunc: this._scene.onTimerMessage,
            onTimerMessageENDFunc: this._scene.onTimerMessageENDFunc,
            obj: this._scene,
        })
    },

    clearTempNode() {
        for (let i = 0; i < this.tempNode.length; ++i) {
            if (cc.isValid(this.tempNode[i])) {
                this.tempNode[i].destroy();
            }
        }
        this.tempNode.length = 0;
    },

    //设置游戏状态标示
    setViewStatus: function (stage) {
        let types = cmd.Game_Status[stage];
        types = types ? types : false;
        this._centerPancel.setViewStatus(types);
    },

    //清除离开玩家
    clearViewUser: function (e) {
        this._avatarPanel.clearUserFace(e)
    },

    //清除所有玩家
    clearAllUser() {
        for (let i = 0; i < 5; ++i) {
            this._avatarPanel.clearUserFace(i)
        }
    },

    //设置玩家信息
    onUpdateUser: function (data) {
        var index = nnTool.getLocalIndex(data.chair);
        this._avatarPanel.setUserInfo(index, data);
    },

    hideUserStatus: function () {
        this._avatarPanel.hideUserStatus();
    },

    setCountDown(key) {
        if (this.countStage != key) {
            this.countStage = key;
        } else {
            return;
        }
        let remainTime = cmd.getRemainTime();
        this._TimerClass.onKillTimer();//停止倒计时
        this.setViewStatus(this.countStage);
        this.setGameTimer(remainTime);//设置倒计时
    },

    //随机庄家动画
    RandomBanker(list) {
        let func = () => {
            let index = nnTool.getLocalIndex(cmd.BANKER_CHAIR);
            this.hideUserStatus(); //隐藏所有人的状态
            this._avatarPanel.setUserGrabMultiple(index, cmd.BANKER_MUL);
            this._avatarPanel.setViewBankerSign(index, true); //设置庄家标示
            cc.gg.audioMgr.playSFX("language/CN/nnMusic/zhuang32");
            cmd.RANDOM_BANKER = true//标记动画已播完
            if (cmd.CUR_STAGE == 23) {
                this.scheduleOnce(() => {
                    this.setCountDown(cmd.CUR_STAGE);
                    cmd.BANKER_CHAIR != cmd.MY_SEAT && this.btnVisible(true, 3);
                }, .3);

            }
        }
        if (list.length <= 1) {
            func();
        } else {
            let a = [];
            for (let i = 0; i < list.length; ++i) {
                let index = nnTool.getLocalIndex(list[i]);
                let _blink = this._avatarPanel.player[index].getChildByName("blink");
                a.push(_blink);
            }
            let g = 0;
            let action = cc.sequence(cc.delayTime(0.1), cc.callFunc(() => {
                a.forEach(element => {
                    element.active = false;
                });
                a[g].active = true;
                g = g >= a.length - 1 ? 0 : ++g;
                cc.gg.audioMgr.playSFX("language/CN/nnMusic/qznn_dengdeng2")
            }))
            this.node.runAction(cc.sequence(cc.repeat(action, 20), cc.callFunc(() => {
                a.forEach(element => {
                    element.active = false;
                });
                func();
            })))
        }
    },

    //结算飞金币动画
    goldFlyAni() {
        let winner = [],//保存赢钱玩家
            loser = [];//保存输钱玩家
        if (!this.settleInfo) return;
        for (let i = 0; i < this.settleInfo.length; ++i) {
            if (this.settleInfo[i].chair != cmd.BANKER_CHAIR) {
                this.settleInfo[i].moneyChange > 0 ? winner.push(this.settleInfo[i].chair) : loser.push(this.settleInfo[i].chair);
            }
        }
        let fly = (startPos, endPos) => {
            for (let i = 0; i < 10; ++i) {
                let gold = cc.instantiate(this.goldImg.node);
                gold.active = true;
                this.node_center.addChild(gold);
                gold.setPosition(startPos);
                let v2 = [startPos, cc.v2(0, 0), endPos];
                let delay = cc.delayTime(0.02 * i);
                let b2 = cc.bezierTo(0.4, v2);
                let call = cc.callFunc((sender) => {
                    sender.destroy();
                    // if(i == 9) cc.gg.audioMgr.playSFX("sg_ss/game/drop_gold.mp3"); 
                });
                let seq = cc.sequence(delay, b2, call);
                gold.runAction(seq);
                this.tempNode.push(gold);
            }
        }
        let bankerIndex = nnTool.getLocalIndex(cmd.BANKER_CHAIR)
        let bankerPos = this._avatarPanel.player[bankerIndex].getPosition();
        //庄家飞向赢家
        let winFlay = () => {
            for (let i = 0; i < winner.length; ++i) {
                let index = nnTool.getLocalIndex(winner[i]);
                let Pos = this._avatarPanel.player[index].getPosition();
                fly(bankerPos, Pos);
            }
        }
        //输家飞向庄家
        let loseFly = () => {
            for (let i = 0; i < loser.length; ++i) {
                let index = nnTool.getLocalIndex(loser[i]);
                let player = this._avatarPanel.player[index];
                let Pos = player.getPosition();
                fly(Pos, bankerPos);
            }
        }
        let func = () => {
            for (let i = 0; i < this.settleInfo.length; ++i) {
                let index = nnTool.getLocalIndex(this.settleInfo[i].chair);
                this._avatarPanel.flutterScore(index, this.settleInfo[i].moneyChange);
                this._avatarPanel.setUserScore(index, this.settleInfo[i].residueMoney);
                if (index == 0) {
                    this.node.parent.getChildByName("roomList")
                        .getComponent("QZNNRoomView")
                        ._topPancel
                        .updateGold(this.settleInfo[i].residueMoney);
                }
            }
            this.resetDatas();
        }
        loseFly();
        winFlay();
        this.scheduleOnce(func, 0.5);
    },

    //重置一些临时数据
    resetDatas() {
        cmd.CUR_STAGE = 10;
        cmd.BANKER_CHAIR = null;
        cmd.ISCONFIG = false;
        cmd.MY_STATUS = false;
        cmd.DEAL_FALG = false;
        cmd.SENDDATA = null;
        cmd.RANDOM_BANKER = false;
        this.seq = null;
        this.dataMap = null;
        this.settleInfo = null;
        this.countStage = null;
        this.unscheduleAllCallbacks();
    },

    //开始翻牌
    openCardsAni() {
        if (this.seq && this.seq.length != 0) {
            let index = this.seq.shift();
            let info = this.dataMap[index];
            if (nnTool.getLocalIndex(cmd.BANKER_CHAIR) == index) this._avatarPanel.hideUserStatus();//到庄家开牌隐藏所有倍数
            if (index == 0) {
                this._cardPanel.myselfOpenCards(info.cards, info.cardType);
            } else {
                this._cardPanel.OtherOpenCards(index, info.cards, info.cardType);
            }
        } else {
            cc.log('####开始结算金币#######');
            this.seq = null;
            this.dataMap = null;
            this.goldFlyAni();
        }
    },

    //抢庄以及下注按钮的显示
    btnVisible(bVisible, type) {
        this._centerPancel.hideBtnMask();
        if (cmd.MY_STATUS) {//确保我在游戏中
            if (type == 2) {//抢庄
                this._centerPancel.grabBankerBtn.active = bVisible;
            } else if (type == 3) {
                this._centerPancel.betBtn.active = bVisible;
            } else if (type == 4) {
                this._centerPancel.grabBankerBtn.active = bVisible;
                this._centerPancel.betBtn.active = bVisible;
            }
        }
    },

    update(dt) {
        if (cmd.PLAYER_DATAS.length == 1) {//其他人离开
            this._TimerClass.onKillTimer();//停止倒计时
            this.setViewStatus(false);
            this._centerPancel.isWaitOther(true);
        }
    }

});