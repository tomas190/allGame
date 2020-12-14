var msgSender = require("QZNNMsgSender");
var cmd = require("QZNNCMD")
var nnTool = require("QZNNTool");
cc.Class({
    extends: cc.Component,

    properties: {
        dialog: {
            default: null,
            type: cc.Node
        },

        load: {
            default: null,
            type: cc.Node,
        },

        mask: {
            default: null,
            type: cc.Node,
        },

        roomView: {
            default: null,
            type: cc.Node,
        },

        gameView: {
            default: null,
            type: cc.Node,
        },

        loading: {
            default: null,
            type: cc.Node,
        },

        nick: {
            default: null,
            type: cc.Label,
        },

        money: {
            default: null,
            type: cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.onEvenHandle();
        this.onIsShowEvenHandle();
        this._gameView = this.gameView.getComponent("QZNNGameView");
        this._gameScene = this.gameView.getComponent("QZNNGameScene");
        this._roomView = this.roomView.getComponent("QZNNRoomView");
        this._roomScene = this.roomView.getComponent("QZNNRoomScene");
        this.loading.active = cmd.RELEASE;
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "NNGame", this.setPlayerInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.refreshBgState, "NNGame", this.bgstatechange.bind(this))
    },

    bgstatechange(bgIsOpen) {
        cc.audioEngine.stopAll();//先停止播放
        if (bgIsOpen) cc.gg.audioMgr.playBGM("language/CN/nnMusic/roomBG")
    },

    setPlayerInfo(msg) {
        if (msg) { // 如果有信息
            if (cmd.uid && cmd.uid != msg.id) {//切换账号
                cmd.uid = null;
                msgSender.sendLoginOut();//先退出当前登录
                if (msg.game_nick) this.nick.string = msg.game_nick;
                if (msg.msg.game_gold) this.money.string = String(~~(msg.game_gold * 100) / 100);
                msgSender.sendLogin(msg.id, "", msg.token);//发送新的登录请求

            }
        } else {
            cc.log("#############==切换账号失败")
        }
    },

    onIsShowEvenHandle: function () {
        cc.game.on(cc.game.EVENT_HIDE, this.background, this);
        cc.game.on(cc.game.EVENT_SHOW, this.wakeUp, this);
    },

    background() {
        console.log("@@@@@@@@@@@@@###########################background")
        cc.gg.protoBuf.close();
    },

    wakeUp() {
        console.log("@@@@@@@@@@@@@###########################wakeUp")
        cc.gg.protoBuf.init(cc.gg.global.socket)
    },

    onEvenHandle: function () {
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_LEAVE, this.listenEvent.bind(this));//玩家离开
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_LOGIN, this.listenEvent.bind(this));//玩家登录
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_KICKED, this.listenEvent.bind(this));//踢出房间 
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_MATCH, this.listenEvent.bind(this));//匹配房间响应 
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_RECOVER, this.listenEvent.bind(this));//恢复游戏场景
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_DEALCARD, this.listenEvent.bind(this));//通知发牌
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_COMPETE, this.listenEvent.bind(this));//通知抢庄
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_USER_ERROR, this.listenEvent.bind(this));
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_NET_ERROR, this.listenEvent.bind(this));//网络连接异常
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_NET_NORMAL, this.listenEvent.bind(this));//网络连接恢复
        cc.gg.protoBuf.addHandler(this, cmd.RESPONCECODE.RSP_NET_RECONNECT, this.listenEvent.bind(this));//再次重连
    },

    listenEvent: function (eventId, data) {
        switch (eventId) {
            case cmd.RESPONCECODE.RSP_USER_LEAVE:
                this.LeaveRoom(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_LOGIN:
                this.manageLoginRsp(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_KICKED:
                this.RepeatLogin(data);//重复登录
                break;
            case cmd.RESPONCECODE.RSP_USER_MATCH:
                this.matchRsp(data);//匹配房间返回
                break;
            case cmd.RESPONCECODE.RSP_USER_RECOVER:
                this.recoverGame(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_DEALCARD:
                this.onSubSendCard(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_COMPETE:
                this.GrabBaker(data);
                break;
            case cmd.RESPONCECODE.RSP_USER_ERROR:
                this.ERROR(data);//异常返回
                break;
            case cmd.RESPONCECODE.RSP_NET_ERROR:
                this.NetException(data);
                break;
            case cmd.RESPONCECODE.RSP_NET_NORMAL:
                this.NetRecovery(data);
                break;
            case cmd.RESPONCECODE.RSP_NET_RECONNECT:
                this.openDialog(data);
                break;
        }
    },

    getClassName() {
        return "TipMgr";
    },

    //开始抢庄
    GrabBaker(data) {
        cmd.CUR_STAGE = 22;
        cmd.COUNTTIME = data.countDown;
        cmd.TIMESTAMP = new Date().getTime();
        if (cmd.DEAL_FALG) {//发牌完成
            this._gameView.setCountDown(cmd.CUR_STAGE);
            this._gameView.btnVisible(true, 2);
        }
    },
    //发牌动画
    onSubSendCard: function (data) {
        cmd.CUR_STAGE = 20;//发牌阶段
        cmd.MY_STATUS = true;
        cmd.SENDDATA = data;
        this._gameView._TimerClass.onKillTimer();//停止倒计时
        this._gameView.setViewStatus(99);
        this._gameView._centerPancel.playGameOpen();//游戏开始动画
    },

    manageLoginRsp: function (data) {
        this.loading.active = false;
        cmd.uid = data.uid;
        cc.gg.global.RoomData = data;
        this._roomView.node_UI.removeAllChildren();
        this._roomView._centerPancel.initRoomListView(cc.gg.global.RoomData);//先刷新房间列表
        this.nick.string = data.playerInfo.nick;
        this.money.string = String(~~(data.playerInfo.money.toFixed(6) * 100) / 100);
        msgSender.sendRecover();//登录成功 请求恢复场景
    },

    resetGame() {
        cc.gg.protoBuf.UnRegAll("Game");//移除Game内监听的事件
        this._gameView._TimerClass.onKillTimer();//停止倒计时
        this._gameView.setViewStatus(false);
        this._gameView.resetView();
        this._gameView.clearAllUser();
        this._gameView.resetDatas();
        this._gameView._topPancel.playBGM();
    },

    //请求进入房间 
    recoverGame: function (data) {
        let players = data.allPlayers;
        let flag = players.length > 0;
        this.gameView.active = flag;
        this.roomView.active = !flag;
        if (flag) {
            //满足跑马灯需求临时处理
            this._gameView.initView();
            this._gameView.initNode();
            //========================
            this.resetGame();
            this._gameScene.onEvenHandle();//注册游戏内消息
            cmd.MY_SEAT = data.myChair//保存自己的座位号
            cmd.CUR_STAGE = data.currStatus;//当前游戏阶段
            cmd.BANKER_CHAIR = data.bankerChair;//庄家座位号
            for (let i = 0; i < data.allPlayers.length; ++i) {
                cmd.pushUser(data.allPlayers[i])
            }
            this._gameView.onEnterGame(data);
            cc.gg.protoBuf.tickInGame();//切换到游戏心跳
        } else {
            cc.gg.protoBuf.tickInHall();
        }
    },

    //退出房间
    LeaveRoom: function (data) {
        var index = nnTool.getLocalIndex(data.chair);
        this._gameView.clearViewUser(index);
        if (index == 0) {//我自己离开
            cmd.PLAYER_DATAS.length = 0;
            cc.gg.protoBuf.UnRegAll("Game");//移除Game内监听的事件
            this._gameView._TimerClass.onKillTimer();//停止倒计时
            this._gameView.setViewStatus(false);
            this._gameView.resetView();
            this._gameView.clearAllUser();
            this._gameView.resetDatas();
            this.roomView.active = true;
            this.gameView.active = false;
            cc.gg.protoBuf.tickInHall();//切换到大厅心跳
            this._gameView._topPancel.playBGM();
        }
        for (var i = 0; i < cmd.PLAYER_DATAS.length; i++) {
            cmd.PLAYER_DATAS[i].chair == data.chair && cmd.PLAYER_DATAS.splice(i, 1)
        }
        if (cmd.PLAYER_DATAS.length == 1) {//其他人离开
            cmd.MY_STATUS = false
            this._gameView._TimerClass.onKillTimer();//停止倒计时
            this._gameView.setViewStatus(false);
            this._gameView.resetView();
            this._gameView.resetDatas();
            this._gameView._centerPancel.isWaitOther(true);
        }
    },

    NetException() {
        if (!this.load.active) {
            // this.mask.active = true;
            this.load.active = true;
        }
    },

    NetRecovery() {
        if (this.load.active) {
            this.load.active = false;
            // this.mask.active = false;
        }
    },

    RepeatLogin() {
        let _str = "账号在其他设备登录!";
        cc.gg.protoBuf.stopTick();
        cc.gg.protoBuf.close();
        let func = () => {
            this.backToHall();
        }
        this.openDialog({ str: _str, callfunc: func, eObj: this, close: false })
    },

    matchRsp(data) {
        let func = function () {
            msgSender.sendRecover();//请求恢复场景
        }.bind(this);
        let config = { 1: "体验场", 2: "初级场", 3: "中级场", 4: "高级场" }
        let preStr = "您正在抢庄牛牛level游戏中，点确定继续游戏"
        let _str = preStr.replace("level", config[data.level]);
        this.openDialog({ str: _str, callfunc: func, eObj: this, close: true })
    },

    ERROR(data) {
        let _str = data.text;
        this.openDialog({ str: _str, eObj: this, close: true })
    },

    openDialog(data) {
        this.dialog.active = true;
        this.dialog.getComponent("QZNNNotice").updateData(data);
    },

    backToHall() {
        //返回时先预加载大厅场景
        cc.director.preloadScene("hall", () => {
            cc.audioEngine.stopAll();
            cc.gg.protoBuf.isAutoConnect = false;
            hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "NNGame")
            hqq.eventMgr.unregister(hqq.eventMgr.refreshBgState, "NNGame")
            msgSender.sendLoginOut();
            cc.gg.protoBuf.close();
            this.offGameEvent();
            cc.director.loadScene("hall");
        })
    },

    offGameEvent() {
        cc.game.off(cc.game.EVENT_HIDE, this.background, this);
        cc.game.off(cc.game.EVENT_SHOW, this.wakeUp, this);
    },

    onDestroy() {
        cc.gg.protoBuf.removeAllHandler();
        this.offGameEvent();
    }
});
