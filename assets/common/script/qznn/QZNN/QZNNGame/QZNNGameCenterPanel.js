/*
 *  Dawnson 2019-8-01
 *  15302765815@163.com
 */
var cmd = require("QZNNCMD")
var Tool = require("QZNNTool");
cc.Class({
    extends: cc.Component,

    properties: {
        lock: true,
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
            cc.gg.utils.addClickEventEND(this.grabBankerBtn.children[i], this.funGrandBanker.bind(this), { flag: true });
        }

        //闲家下注事件
        for (var i = 0; i < this.betBtn.childrenCount; i++) {
            cc.gg.utils.addClickEventEND(this.betBtn.children[i], this.funBetBtn.bind(this), { flag: true });
        }

        //测试按钮事件
        for (var i = 0; i < this.test.childrenCount; i++) {
            cc.gg.utils.addClickEventEND(this.test.children[i], this.funTest.bind(this), { flag: true });
        }

        //rule mask 的事件
        cc.gg.utils.addClickEventEND(this.ruleMask, this.funRuleMask.bind(this), { flag: true });
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

        //wait等待下一局标示
        this.wait = this.node.getChildByName("wait");

        //规则的按钮 
        this.rule = this.node.getChildByName("rule");

        //规则的mask
        this.ruleMask = this.rule.getChildByName("mask");
        this.ruleMask.active = false

    },
    //重置视图
    resetView: function() {
        this.status.active = false;
        this.wait.active = false;
    },
    showWait: function() {
        this.wait.active = true;
    },
    //点击mask隐藏规则 动画完成后隐藏自己
    funRuleMask: function() {
        var self = this;
        if (!this.lock) {
            return
        }
        this.lock = false;
        var width = this.rule.width;
        var status = this.ruleMask.active;
        if (status) {
            self.ruleMask.active = false;
            var active = cc.sequence(cc.moveBy(.3, width, 0), cc.callFunc(function() {
                self.lock = true;
            }))
        } else {
            var active = cc.sequence(cc.moveBy(.3, -width, 0), cc.callFunc(function() {
                self.ruleMask.active = true;
                self.lock = true;
            }))
        }
        console.log(12)
        this.rule.runAction(active);

    },
    funTest: function(target) {
        //测试
        //按钮一  发牌显示抢庄按钮
        //按钮二  显示抢庄标志 倍数  抢庄动画
        //按钮三  显示闲家倍数标志
        //按钮四  摊派并结算飘分
        if (target.name == "btn1") {
            console.log("发牌测试")
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
        this._GameView._cardPanel.setSendCardAni([3, 3, 3, 3, 3])
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
        cc.loader.loadRes("public/prefab/GameStartAni", function(e, t) {
            if (e) console.log("加载出错:", e);
            else {
                var i = cc.instantiate(t);
                a._GameView.node_UI.addChild(i), a.scheduleOnce(function() { a._GameView.node_UI.removeChild(i) }, 1)
            }
        });
        cc.gg.audioMgr.playSFX("public/nnMusic/gameStart")
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
        this._GameView._scene.sendPlayerMultiples(num)
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