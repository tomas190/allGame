/*
 *  Dawnson 2019-8-01
 *  15302765815@163.com
 */
var cmd = require("QZNNCMD")
var Tool = require("QZNNTool");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    initzation: function(e, t) {
        this.node = e;
        this._GameView = t;
        this.initView();
        this.addEvenListener(this.node);
        this.gameCardType = this._GameView.gameCardType; //公用图集
    },
    addEvenListener: function(e) {
        //抢庄按钮事件
        for (var i = 0; i < this.grabBankerBtn.childrenCount; i++) {
            cc.gg.utils.addClickEventEND(this.grabBankerBtn.children[i], this.funGrandBanker.bind(this));
        }

        //闲家下注事件
        for (var i = 0; i < this.betBtn.childrenCount; i++) {
            cc.gg.utils.addClickEventEND(this.betBtn.children[i], this.funBetBtn.bind(this));
        }

        //测试按钮事件
        for (var i = 0; i < this.test.childrenCount; i++) {
            cc.gg.utils.addClickEventEND(this.test.children[i], this.funTest.bind(this));
        }
    },
    initView: function() {

        //抢庄按钮
        this.grabBankerBtn = this.node.getChildByName("grabBanker");
        //闲家按钮
        this.betBtn = this.node.getChildByName("bet");
        //游戏状态标示
        this.gameStatus = this.node.getChildByName("gameStatus");
        this.status = this.gameStatus.getChildByName("status");
        this.time = this.gameStatus.getChildByName("time");

        //底注标示
        this.dizhu = cc.find("dizhu/difen_box/difen", this.node);
        this.grabBankerBtn.active = false;
        this.betBtn.active = false;

        this.status.active = false;
        this.time.active = false;

        this.dizhu.active = false;

        //金币节点
        this.node_gold = this.node.getChildByName("goldPosition");
        //测试按钮
        this.test = this.node.getChildByName("test");


    },
    //重置视图
    resetView: function() {
        this.status.active = false;
    },
    funTest: function(target) {
        //测试
        //按钮一  发牌显示抢庄按钮
        //按钮二  显示抢庄标志 倍数  抢庄动画
        //按钮三  显示闲家倍数标志
        //按钮四  摊派并结算飘分
        if (target.name == "btn1") {
            console.log("抢庄测试")
            this.test1()
        } else if (target.name == "btn2") {
            this.test2()
        } else if (target.name == "btn3") {
            this.test3()
        } else if (target.name == "btn4") {
            this.test4()
        }
    },
    test1: function() {
        var self = this;
        //页面初始化
        // this._GameView.resetView();
        // //显示房间游戏状态
        // this.setViewSattus("gameStatus1");
        // //显示玩家座位
        this._GameView._cardPanel.setUserCount(cmd.GAME_PLAYER);
        this._GameView._avatarPanel.setUserCount(cmd.GAME_PLAYER);
        // //清除倒计时
        // this._GameView._TimerClass.onKillTimer();
        // //播放游戏开始动画
        // this.playGameOpen();
        this.scheduleOnce(function() {
            self.onSubSendCard() //开始发牌
        }, 1)
    },
    test2: function() {
        console.log("测试抢庄动画")
    },
    test3: function() {
        console.log("闲家下注显示 和摊牌")
    },
    test4: function() {
        console.log("头顶飘分 加金币动画")
    },


    setBankerShow: function(_playMode, type) {
        this.grabBankerBtn.active = true
        this.grabBankerBtn.active = (type ? true : false)
    },
    //游戏开始动画
    playGameOpen: function() {
        var a = this;
        // cc.loader.loadRes("game/public/animation/gameopen/GameOpen", function(e, t) {
        //     if (e) console.log("加载出错:", e);
        //     else {
        //         var i = cc.instantiate(t);
        //         a._GameView.node_UI.addChild(i), a.scheduleOnce(function() { a._GameView.node_UI.removeChild(i) }, 1)
        //     }
        // });
        cc.gg.audioMgr.playSFX("game_open.mp3")
    },

    funGrandBanker: function(target) {
        console.log(target.name + "抢庄倍数");
        this.grabBankerBtn.active = false;
        target.name += "";
        var num = target.name.substr(target.name.length - 1);
        //派发抢庄事件
        this._GameView._scene.sendGrabBanker(num - 1)
    },
    funBetBtn: function(target) {
        console.log(target.name + "下注倍数");
        this.betBtn.active = false;
        target.name += "";
        var num = target.name.substr(target.name.length - 1);
        //派发下注事件
        this._GameView._scene.sendPlayerMultiples(num - 1)
    },

    funModify: function() {
        console.log("编辑信息")
            //this._GameView._rightPancel.toggleStatus()
    },
    funAddGold: function() {
        console.log("添加金币")
    },
    ModifyStr: function(str) {
        return str.replace(".", "/")
    },
    //设置底分
    setDifen: function(data) {
        this.dizhu.active = true;
        this.dizhu.getComponent(cc.Label).string = data;
    },
    //切换状态标示
    setViewStatus: function(name) {
        console.log(name + "我进入了房间状态的改变")
        if (!name) {
            this.status.getComponent(cc.Sprite).spriteFrame = null;
            return;
        }
        this.status.active = true;
        this.status.getComponent(cc.Sprite).spriteFrame = this.gameCardType.getSpriteFrame(name)
    }
});