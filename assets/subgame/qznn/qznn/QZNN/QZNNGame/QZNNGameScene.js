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

    onLoad: function () {
        this._GameView = this.node.getComponent("QZNNGameView");
        this.roomList = cc.find("roomList", this.node._parent);
        let pn = cc.find('Canvas/nnGame/header/wifi')
        hqq.eventMgr.dispatch(hqq.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })
    },

    start: function () {
        // this.initSence();
    },

    initSence: function () {
        this.onEvenHandle();
    },

    resetSence: function () {
        cc.gg.protoBuf.removeAllHandler();
        this.area_number = null;
        this.onEvenHandle();
    },

    onEvenHandle: function () {
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_JOIN, this.listenEvent.bind(this));//其他玩家加入
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_STARTCOUNT, this.listenEvent.bind(this));//开局倒计时
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_GRAB_TIMEOUT, this.listenEvent.bind(this));//枪庄超时
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_GRAB_RETURN, this.listenEvent.bind(this));//抢庄返回
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_GRAB_RESULT, this.listenEvent.bind(this));//抢庄结果
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_STARTBETING, this.listenEvent.bind(this));//通知开始下注
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_NOTIFYTIMES, this.listenEvent.bind(this));//通知选择的倍数
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_BET_TIMEOUT, this.listenEvent.bind(this));//下注超时
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_SETTLE, this.listenEvent.bind(this));//开始比牌以及结算
    },

    onDestroy: function () {
        cc.gg.protoBuf.removeAllHandler();
    },

    listenEvent: function (eventId, data) {
        switch (eventId) {
            case cmd.RESPONCECODE.RSP_USER_JOIN:
                this.UserJoin(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_STARTCOUNT:
                this.GameStart(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_GRAB_TIMEOUT:
                this.GrabBakerOverTime(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_GRAB_RETURN:
                this.GrabBankerRsp(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_GRAB_RESULT:
                this.GrabBankerResult(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_STARTBETING:
                this.StartBet(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_NOTIFYTIMES:
                this.PlayerMultiplesRsp(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_BET_TIMEOUT:
                this.BetOverTime(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_SETTLE:
                this.settle(data);
                break;
        }
    },

    getClassName() {
        return "Game";
    },

    onTimerMessage: function (e) {
    },

    onTimerMessageENDFunc: function (e) {
        this.node.getComponent("QZNNGameView").setViewStatus(99);
        this.node.getComponent("QZNNGameView").btnVisible(false, 4);
    },

    //游戏开始
    GameStart: function (data) {
        this._GameView.resetView();
        cmd.CUR_STAGE = 10;
        this.recordTime(data.countDown);
        this._GameView.setCountDown(cmd.CUR_STAGE);
    },

    //用户抢庄返回
    GrabBankerRsp: function (data) {
        var index = nnTool.getLocalIndex(data.chair);
        this._GameView._avatarPanel.setUserGrabMultiple(index, data.multiple);
        if (index == 0) this._GameView.btnVisible(false, 2)//自己抢庄隐藏按钮
    },

    //抢庄结果
    GrabBankerResult(data) {
        cmd.BANKER_CHAIR = data.bankerChair;//暂存庄家座位号
        cmd.BANKER_MUL = data.multiple;//庄家抢庄倍数
        this._GameView._TimerClass.onKillTimer();//停止倒计时
        this._GameView.setViewStatus(99);
        this._GameView.RandomBanker(data.competeList);
        cmd.RANDOM_BANKER = (data.competeList.length <= 1);
    },

    //抢庄超时
    GrabBakerOverTime(data) {
        this._GameView.btnVisible(false, 2);
        for (let i = 0; i < data.chairSet.length; ++i) {
            let index = nnTool.getLocalIndex(data.chairSet[i]);
            this._GameView._avatarPanel.setUserMultiple(index, data.multiple, 22);
        }
    },

    //开始下注
    StartBet(data) {
        cmd.CUR_STAGE = 23;
        this.recordTime(data.countDown);
        this._GameView.btnVisible(false, 4);//隐藏所有按钮

        if (cmd.MY_STATUS) {//在游戏中
            cmd.RANDOM_BANKER && this._GameView.setCountDown(cmd.CUR_STAGE);
            (cmd.BANKER_CHAIR != cmd.MY_SEAT && cmd.RANDOM_BANKER) && this._GameView.btnVisible(true, 3);
        } else {
            this._GameView.setCountDown(cmd.CUR_STAGE);//我在旁观
        }
    },

    recordTime(time) {
        cmd.COUNTTIME = time;
        cmd.TIMESTAMP = new Date().getTime();
    },

    //用户下注返回
    PlayerMultiplesRsp: function (data) {
        var index = nnTool.getLocalIndex(data.chair);
        if (data.multiple === 0) data.multiple = 5;
        cc.gg.audioMgr.playSFX("language/CN/nnMusic/beishu2")
        this._GameView._avatarPanel.setUserMultiple(index, data.multiple, 23);
        if (index == 0) this._GameView.btnVisible(false, 3);//自己下注隐藏按钮
    },

    //下注超时
    BetOverTime(data) {
        this._GameView.btnVisible(false, 3)
        for (let i = 0; i < data.chairSet.length; ++i) {
            if (data.chairSet[i] == cmd.BANKER_CHAIR) continue;
            let index = nnTool.getLocalIndex(data.chairSet[i]);
            this._GameView._avatarPanel.setUserMultiple(index, data.multiple, 23);
        }
    },

    //比牌以及结算
    settle(data) {
        cmd.CUR_STAGE = 27;
        this._GameView._TimerClass.onKillTimer();//停止倒计时
        this._GameView.setViewStatus(99);
        this._GameView.btnVisible(false, 4);//先隐藏操作按钮
        let allCards = data.results;
        let openSequence = [];
        let a = [3, 4, 0, 1, 2];
        let dataMap = {};
        if (cmd.BANKER_CHAIR != cmd.MY_SEAT && cmd.MY_STATUS) openSequence.push(0);//我不是庄 第一个开
        for (let i = 0; i < allCards.length; ++i) {
            let index = nnTool.getLocalIndex(allCards[i].chair);
            dataMap[index] = allCards[i];
        }
        for (let j = 0; j < a.length; j++) {
            for (let i = 0; i < allCards.length; ++i) {
                let chair = allCards[i].chair;
                let index = nnTool.getLocalIndex(chair);
                if (a[j] == index && index != 0 && chair != cmd.BANKER_CHAIR) openSequence.push(index);
            }
        }
        openSequence.push(nnTool.getLocalIndex(cmd.BANKER_CHAIR))//庄家最后开
        this._GameView.seq = openSequence;
        this._GameView.dataMap = dataMap;
        this._GameView.settleInfo = data.results;
        this._GameView.openCardsAni();
    },


    //玩家加入
    UserJoin: function (data) {
        cmd.pushUser(data)
        this._GameView.onUpdateUser(data);
    },


});