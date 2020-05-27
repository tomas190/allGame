var gHandler = require("gHandler");

cc.Class({
    extends: cc.Component,

    properties: {
        skip: 5,
    },
    onLoad: function () {
        this.camera = this.node.getChildByName("Main Camera");
        this.progressBar = this.camera.getChildByName("loading");
        //返回按钮
        this.headerLeft = this.camera.getChildByName("headerLeft");
        this.barWidth = this.progressBar.getChildByName("bar");
        this.bar_ = this.progressBar.getComponent(cc.ProgressBar);
        this.barNumber = this.progressBar.getChildByName("barNumber");
        this.alert = this.progressBar.getChildByName("alert");

        //游客编辑框
        this.editBox = this.camera.getChildByName("editbox");
        this.loginBtn = this.camera.getChildByName("loginBtn");
        //loading 灯
        // this.lantern = this.camera.getChildByName("lantern");

        this.progressValue = 0;

        //灯动作
        // this.lanternAction();
        this.progressBarCode();
        this.initMgr();
        this.initView();
        // cc.director.loadScene("IMhallMain", function () {

        // });
        //按钮添加点击事件监听
        this.addEvenListener()
        //消息事件监听
        this.onEvenHandle();

    },

    initView: function () {
        var self = this;
        var e = cc.view.getVisibleSize();
        e.height / 1334 < 1 && this.node.setScale(e.width / 750, e.height / 1334);
        if (cc.gg.global.isOfficial) {
            //正式
            this.editBox.active = false;
            this.loginBtn.active = false;
            this.times = setTimeout(function () {
                if (cc.gg.protoBuf.socket.readyState != 1) {
                    self.alert.getComponent(cc.Label).string = "与IM后台通信异常"
                    if (cc.gg.protoBuf.socket.url.indexOf("wss") > -1) {
                        self.alert.getComponent(cc.Label).string = "wss安全协议未连上"
                    }
                }
                clearTimeout(self.times);
            }, 5000)
        } else {
            //游客
        }
    },
    addEvenListener: function () {
        cc.gg.utils.addClickEventEND(this.loginBtn, this.checkLogin.bind(this));
        cc.gg.utils.addClickEventEND(this.headerLeft, this.backRN.bind(this));
    },
    onEvenHandle: function () {
        var listenArr = ['Login', 'PushHistorySession', 'isGoDirectlyMsg'];
        for (var i = 0; i < listenArr.length; i++) {
            cc.gg.protoBuf.addHandler(listenArr[i], this.listenEvent.bind(this))
        }
    },
    backRN: function () {
        //cc.gg.client.send('__backtohall', {}, () => {})
        cc.director.loadScene("hall")
        return;
    },

    /**
     * 加载页上的灯
     */
    lanternAction: function () {
        this.s = this.lantern.getChildByName("s");
        this.b = this.lantern.getChildByName("b");
        this.s1 = this.lantern.getChildByName("s1");
        var actionOne = cc.spawn(cc.moveTo(5, cc.v2(-200, -130)), cc.scaleTo(5, 0.8, 0.8));
        var actionTwo = cc.spawn(cc.moveTo(5, cc.v2(-260, 0)), cc.scaleTo(5, 1.2, 1.2));
        var o = cc.sequence(actionOne, actionTwo)
        var actionThree = cc.spawn(cc.moveTo(5, cc.v2(220, -30)), cc.scaleTo(5, 0.8, 0.8));
        var actionFour = cc.spawn(cc.moveTo(5, cc.v2(0, 30)), cc.scaleTo(5, 1.2, 1.2));
        var o1 = cc.sequence(actionThree, actionFour)
        var actionFive = cc.spawn(cc.moveTo(5, cc.v2(-30, -110)), cc.scaleTo(5, 0.8, 0.8));
        var actionSix = cc.spawn(cc.moveTo(5, cc.v2(30, -200)), cc.scaleTo(5, 1.2, 1.2));
        var o2 = cc.sequence(actionFive, actionSix)

        this.s.runAction(o.repeatForever())
        this.b.runAction(o1.repeatForever())
        this.s1.runAction(o2.repeatForever());

    },
    checkLogin: function () {
        if (this.editor) {
            var str = this.editBox.getComponent(cc.EditBox).string;
            cc.gg.utils.ccLog(str);
            if (str) {
                this.login({
                    "userID": str
                })
            } else {
                return
            }
        }
    },

    /**
     * 初始化消息，网络，登录socket
     */
    initMgr: function () {
        cc.gg = {};
        if (window) {
            window.isOfficial = false
        }
        cc.debug.setDisplayStats(false);
        //cc.DebugMode = "INFO";
        // configuration

        // The core communication
        var Http = require('IMHttp');
        cc.gg.http = new Http();
        var Net = require('IMSocket');
        cc.gg.net = new Net();

        //utils
        var Utils = require('IMCommon');
        cc.gg.utils = new Utils();

        //file
        var file = require("IMFile");
        cc.gg.file = new file()

        var AudioMgr = require('IMAudioMgr');
        cc.gg.audioMgr = new AudioMgr();

        var Global = require('IMGlobal');
        cc.gg.global = new Global;
        if (!cc.gg.global.isH5) {
            //id + token的登陆
            if (gHandler.gameGlobal.player.id && gHandler.gameGlobal.token) {
                cc.gg.global.userID = gHandler.gameGlobal.player.id + '';
                cc.gg.global.token = gHandler.gameGlobal.token;
            }

            // else {
            //     //本地测试  DEV：167736290 ， 444263347 PRE：156402027，906435472 OL：804149125
            //     //online 251119282
            //     let data = window.location.href.split("?")[1];
            //     let userObj = { userId: '502439823', password: '123456' };
            //     if (data) {
            //         let userInfoArr = data.split('&');
            //         for (let i = 0; i < userInfoArr.length; i++) {
            //             let userInfo = userInfoArr[i];
            //             if (i == 0) {
            //                 userObj.userId = userInfo.split('=')[1];
            //             } else {
            //                 userObj.password = userInfo.split('=')[1];
            //             }
            //         }
            //     }
            //     cc.gg.global.password = userObj.password;
            //     cc.gg.global.userID = userObj.userId;
            // }

            if (gHandler.gameConfig.gamelist.im) {
                cc.gg.global.GameID = gHandler.gameConfig.gamelist.im.game_id;
                var socket = gHandler.gameConfig.gamelist.im.serverUrl
                cc.gg.global.socket = socket ? socket : cc.gg.global.socket;
            }
            cc.gg.global.gold = gHandler.gameGlobal.player.gold
            cc.gg.global.iconPath = gHandler.gameGlobal.iconPath
            cc.gg.global.os = "desktop"
            //Pre: ws://18.176.74.76:12352 Dev: im.539316.com
            //online : http://im1.whhclsb.com  或者  http://im2.ncpxnjh.com/

            // cc.gg.global.socket = "ws://im.539316.com"
        }
        var ProtoBuf = require('IMProtobuf');
        cc.gg.protoBuf = new ProtoBuf();
        //子游戏登陆子游戏服务器地址，需要用大厅提供的服务器地址
        if (gHandler.gameGlobal.im_host) {
            cc.gg.global.file = gHandler.gameGlobal.im_host + "/upload";
            cc.gg.global.socket = gHandler.gameGlobal.im_host.replace("http", 'ws');
        }

        cc.gg.protoBuf.connect(cc.gg.global.socket, false)

        var Client = require("IMClient");
        //cc.gg.client = new Client();
        //发送图片按钮创建
        cc.gg.file.init();
        // $(document).keydown(function(event) {
        //     if (event.keyCode == 13) {
        //         //监听回车键 并广播派发
        //         cc.gg.protoBuf.onmessage("Keydown", "", true)
        //     }
        // });
    },
    progressBarCode: function () {
        var self = this;
        cc.loader.onProgress = function (e, t, i) {
            //资源监听器
            if (self.bar_) {
                self.bar_.progress = e / t;
                var a = Math.round(e / t * 100) + "%";
                if (self.barNumber) {
                    self.barNumber.getComponent(cc.Label).string = a;
                }
            } else {
                cc.log(1);
            }
        }
    },
    loadingText: function () {
        // 进度条提示文字
    },

    listenEvent: function (instructionsName, data) {
        var data = imProto.msg.Resp.deserializeBinary(data);
        var result = data.getResult();
        var resultMessage = data.getResultmessage();
        var datas = data.getData();
        console.log(instructionsName + "指令名字加内容")
        if (result == 1) {
            if (instructionsName == "Login") {
                this.manageLoginRsp(datas)
            } else if (instructionsName == "PushHistorySession") {
                this.managePushHistorySession(datas)
            } else if (instructionsName == "isGoDirectlyMsg") {
                this.manageIsGoDirectlyMsg(datas);
            }
        } else {
            if (instructionsName == "isGoDirectlyMsg") {
                this.PushHistorySession(0, 5)
            } else if (instructionsName == "Login") {
                //关闭了链接
                cc.gg.protoBuf.ISclose = true
            }
            if (this.alert) {
                this.alert.getComponent(cc.Label).string = resultMessage;
            }
        }

    },
    /**
     * 
     * @param {*} data                      
     */
    managePushHistorySession: function (data) {
        if (!data || data == "null") {
            cc.director.loadScene("IMhallMain");
            return
        };
        cc.gg.global.uploadMsgCount++;
        //交给center处理
        var datas = JSON.parse(data);
        if (datas.length < 5) {
            //拉完了
            for (var i = 0; i < datas.length; i++) {
                cc.gg.global.sessionData.push(datas[i]);
            }
            cc.director.loadScene("IMhallMain");
        } else if (datas.length == 5) {
            for (var i = 0; i < datas.length; i++) {
                cc.gg.global.sessionData.push(datas[i])
            }
            if (cc.gg.global.uploadMsgCount <= 2) {
                //再去拉
                this.PushHistorySession(this.skip, 5);
                this.skip += 5
            }
            if (cc.gg.global.uploadMsgCount >= 3) {
                cc.director.loadScene("IMhallMain");
            }
        }

    },
    manageIsGoDirectlyMsg: function (data) {
        if (!data || data == 'null') {
            this.PushHistorySession(0, 5)
            return
        }
        var datas = JSON.parse(data);
        cc.gg.global.isGoDirectlyMsg = true;
        console.log(datas, "manageIsGoDirectlyMsg");
        cc.gg.global.chatObj = datas
        cc.director.loadScene("IMhallMain");
    },
    manageLoginRsp: function (data) {
        var obj = JSON.parse(data);
        console.log("login", data)
        cc.gg.global.userInfo = {
            userID: obj.user_id,
            userHeadImg: obj.head_img,
            userNick: obj.nick_name,
        }
        cc.gg.protoBuf.authKey = obj.auth_key;
    },
    //发送查询会话的指令
    PushHistorySession: function (skip, limit) {
        var data = {
            "account_id": cc.gg.global.userInfo.userID,
            "skip": skip,
            "limit": limit,
        }
        cc.gg.protoBuf.send("PushHistorySession", 2, data)
    },

    onDestroy: function () {
        //注销掉所有监听事件
        cc.gg.protoBuf.removeAllHandler();
        cc.loader.onProgress = null;
        clearTimeout(this.times);
    }
});