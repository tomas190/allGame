var gHandler = require("gHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        skip: 5,
        promptBox: cc.Node
    },
    onLoad: function () {
        this._gameView = this.node.getComponent("ImHallview");
        //"IMRconnect" cc.gg.global.eventMgr.IMRconnect
        if (cc.gg.global.eventMgr) {
            cc.gg.global.eventMgr.register("IMRconnect", "IMHallSence", this.netWorkBreakDown.bind(this))
            cc.gg.global.eventMgr.register("IMConnectSuccess", "IMHallSence", this.netConnectSuccess.bind(this));
        }
    },
    start: function () {
        //this.onEvenHandle();
        this.initSence();
        this.initData();
        //这里做个判断如果当前需要直接进入聊天室 则跳过会话主页监听机制
        if (cc.gg.global.isGoDirectlyMsg) {
            this._gameView.backMsgFun();
            return
        }
    },
    initSence: function () {
        //this._gameView._centerPancel.InitViewList();
        this.onEvenHandle();

    },
    resetSence: function () {
        this.onEvenHandle();
        cc.gg.global.sessionData = [];
        cc.gg.global.uploadMsgCount = 0;
        this.skip = 5;
        this._gameView._centerPancel.isUploadCenter = false;
        this.PushHistorySession(0, 5);
    },
    initData: function () {
        this.reconnectTimes = 0;
    },
    onEvenHandle: function () {
        var listenArr = ['ChatRespBody', "PushHistorySession", "ReadMsg",
            "PullSubList", "GetUser", "GetSub", "MoreHistorySession",
            "UserChildrenListResp", "ErrorResp", "DelConversion", "Login",
            "isGoDirectlyMsg"
        ];
        //RN键盘监听事件
        var listenInputArr = ["__oninput", "__oninputing", "__oninputend"]
        // for (var i = 0; i < listenInputArr.length; i++) {
        //     cc.gg.client.addEventListener(listenInputArr[i], this.listenInputEvent.bind(this))
        // }
        for (var i = 0; i < listenArr.length; i++) {
            cc.gg.protoBuf.addHandler(listenArr[i], this.listenEvent.bind(this))
        }
    },
    listenInputEvent: function (instructionsName, data) {
        var datas = data.data;
        if (instructionsName == "__oninput") {
            console.log("调起了键盘")
            this._gameView._rightPancel.setText(datas.text);
        } else if (instructionsName == "__oninputing") {
            console.log("输入改变")
            this._gameView._rightPancel.setText(datas.text);
        } else if (instructionsName == "__oninputend") {
            console.log("键盘结束")
        }
    },
    onDestroy: function () {
        cc.gg.utils.ccLog('我的场景被销毁啦');
        //this._gameView.switchLoading();
        //停止本场景所有监听事件
        cc.gg.utils.ccLog('我的场景被销毁啦');
        cc.gg.protoBuf.removeAllHandler();
        cc.gg.protoBuf.close();
        cc.gg.protoBuf.ISclose = true;
        if (cc.gg.global.eventMgr) {
            cc.gg.global.eventMgr.unregister("IMRconnect", "IMHallSence");
            cc.gg.global.eventMgr.unregister("IMConnectSuccess", "IMHallSence");
        }
    },
    listenEvent: function (instructionsName, data) {
        var data = imProto.msg.Resp.deserializeBinary(data);
        var result = data.getResult();
        var resultMessage = data.getResultmessage();
        console.log(resultMessage, "sss消息列表监听")
        var datas = data.getData();
        if (result == 1) {
            if (instructionsName == "PushHistorySession") {
                this.managePushHistorySession(datas)
            } else if (instructionsName == "ChatRespBody") {
                console.log('================ChatRespBody====================');
                console.log(datas);
                console.log('====================================');
                this.manageChatRespBody(datas)
            } else if (instructionsName == "ReadMsg") {
                this.manageReadMsg(datas)
            } else if (instructionsName == "PullSubList") {
                this.managePullSubList(datas)
            } else if (instructionsName == "GetSub") {
                this.manageGetSub(datas)
            } else if (instructionsName == "GetUser") {
                this.manageGetUser(datas)
            } else if (instructionsName == "DelConversion") {
                this.manageDelConversion(data)
            } else if (instructionsName == "Login") {
                this.manageLogin(datas)
            }
        } else {
            console.log(resultMessage, "msg失败返回~");
            if (instructionsName == "DelConversion") {
                this._gameView._topPancel.runAlert(resultMessage)
            } else if (instructionsName == "GetSub") {
                this._gameView._rightPancel.subInitView("", resultMessage)
            } else if (instructionsName == "GetUser") {
                this._gameView._rightPancel.subInitView("", resultMessage)
            } else if (instructionsName == "PullSubList") {
                this._gameView._rightPancel.subInitView("", resultMessage)
            } else if (instructionsName == "isGoDirectlyMsg") {
                this.resetSence();
            }
            console.log(datas, "datas 的内容")
        }

    },
    //搜索用户返回
    manageGetUser: function (data) {
        if (!data) {
            return
        }
        var datas = JSON.parse(data)
        console.log(datas, "manageGetUser");
        this._gameView._rightPancel.subInitView(datas);
    },
    //登陆异常
    manageLogin: function (data) {
        console.log("manageLoginRsp", data);
        var datas = JSON.parse(data);
        cc.gg.protoBuf.authKey = datas.auth_key
    },
    //搜索下级返回
    manageGetSub: function (data) {
        if (!data) {
            return
        }
        var datas = JSON.parse(data)
        console.log(datas, "manageGetSub");
        this._gameView._rightPancel.subInitView(datas);
    },
    //删除未读
    manageReadMsg: function (data) {
        if (!data) {
            return
        }
        var datas = JSON.parse(data)
        console.log(datas);
    },
    managePushHistorySession: function (data) {
        this._gameView._centerPancel.isUploadCenter = false;
        if (!data || data == "null") {
            // this._gameView._centerPancel.InitViewList()
            return
        }
        cc.gg.global.uploadMsgCount++;
        //交给center处理
        var datas = JSON.parse(data)
        if (datas.length < 5) {
            if (cc.gg.global.uploadMsgCount == 1) {
                this._gameView._centerPancel.InitViewList(datas)
                //this._gameView._centerPancel.addViewList(data)
            } else {
                this._gameView._centerPancel.addViewList(datas)
            }

            //拉完了
            for (var i = 0; i < datas.length; i++) {
                cc.gg.global.sessionData.push(datas[i]);
            }
            this.skip += datas.length;

        } else if (datas.length == 5) {
            if (cc.gg.global.uploadMsgCount == 1) {
                this._gameView._centerPancel.InitViewList(datas);
                //this._gameView._centerPancel.addViewList(data)
            } else {
                this._gameView._centerPancel.addViewList(datas)
            }
            for (var i = 0; i < datas.length; i++) {
                cc.gg.global.sessionData.push(datas[i])
            }
            if (cc.gg.global.uploadMsgCount <= 2) {
                //再去拉
                this.PushHistorySession(this.skip, 5);
                this.skip += 5
            }

        }
    },

    manageDelConversion: function (data) {

        //删除成功  从userData里删除这个人  并刷新视图
        for (var i = 0; i < cc.gg.global.sessionData.length; i++) {
            if (cc.gg.global.deleAccountID == cc.gg.global.sessionData[i].to_id &&
                cc.gg.global.sessionData[i].user_id == cc.gg.global.userInfo.userID) {
                //cc.gg.global.userData.splice(i, 1);
                this._gameView._centerPancel.deleteNode(cc.gg.global.deleAccountID)
            }
        }

        this._gameView._topPancel.runAlert("删除成功")
    },
    manageErrorResp: function (data) {
        cc.gg.protoBuf.ISclose = true;
        alert("你已被挤下线");
        //cc.director.loadScene("appStart");
    },
    //拉取下级
    managePullSubList: function (data) {
        var datas = JSON.parse(data);
        this._gameView._rightPancel.pullView(datas);
    },
    manageUserChildrenListResp: function (data) {
        var UserChildrenListResp = imProto.msg.UserChildrenListResp.deserializeBinary(data);
        cc.gg.utils.ccLog("UserChildrenListResp", UserChildrenListResp);
        var datas = UserChildrenListResp.getData();
        datas = JSON.parse(datas);
        this._gameView._rightPancel.pullView(datas);
    },

    manageIsSubData: function (data) {
        var isSub = imProto.msg.IsSubData.deserializeBinary(data);
        isSub = isSub.getData()
        isSub = JSON.parse(isSub);
        cc.gg.utils.ccLog(isSub);
        var obj = null;
        if (isSub.code == 1) {
            obj = {
                userID: isSub.data.user_id,
                nick: isSub.data.nick,
                img: isSub.data.headImg
            }
        }
        this._gameView._rightPancel.subInitView(obj);
    },
    manageChatRespBody: function (data) {
        cc.gg.audioMgr.playMusic("chat")
        this._gameView.backHallFun()
    },



    //发送拉取下级协议 7 
    pullSubList: function (data) {
        var datas = {
            "user_id": cc.gg.global.userInfo.userID, // 用户id
            "skip": data.skip,
            "limit": 5
        }
        cc.gg.protoBuf.send("pullSubList", 2, datas);
    },
    //发送是否是自身下级协议 8
    getSub: function (data) {
        var datas = {
            "user_id": cc.gg.global.userInfo.userID, // 当前登录Id
            "find_id": data, // 查找的下级用户id
        }
        console.log(datas, "getSub")
        cc.gg.protoBuf.send("GetSub", 2, datas);
    },
    //发送搜索
    getUser: function (data) {
        var datas = {
            "user_id": cc.gg.global.userInfo.userID, // 当前登录Id
            "find_id": data, // 查找的下级用户id
        }
        console.log(datas, "getUser")
        cc.gg.protoBuf.send("GetUser", 2, datas);
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
    //发送查询下级
    sendUserChildrenList: function (data) {
        // var userID = cc.gg.global.userInfo.userID + "";
        // var skip = data.skip + "";
        // var UserChildrenList = new imProto.msg.UserChildrenList()
        // UserChildrenList.setLimit("5");
        // UserChildrenList.setSkip(skip);
        // UserChildrenList.setUserid(userID);
        // cc.gg.utils.ccLog(UserChildrenList, "UserChildrenList")
        // var UserChildrenListArray = UserChildrenList.serializeBinary(UserChildrenList);
        // cc.gg.protoBuf.send(39, UserChildrenListArray);

        var datas = {
            "user_id": cc.gg.global.userInfo.userID, // 用户id
            "skip": data.skip,
            "limit": 5
        }
        console.log(datas)
        cc.gg.protoBuf.send("PullSubList", 2, datas);
    },
    //删除会话
    sendDelConversion: function (data) {

        var data = {
            user_id: cc.gg.global.userInfo.userID,
            to_id: data.toId,
        }
        console.log(data, "sendDelConversion")
        cc.gg.protoBuf.send("DelConversion", 2, data)
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
    confirmBtnAction(param) {
        gHandler.Reflect && gHandler.Reflect.setOrientation("landscape", 1334, 750);
        cc.director.loadScene("hall");
        this.promptBox.active = false;
    },
    netWorkBreakDown(data) {
        let reConnectTimes = data.reConnectTimes;
        this.reconnectTimes = reConnectTimes;
        console.log("netWorkBreakDown Times111: ", this.reconnectTimes);
        if (this.reconnectTimes >= 30) {
            this.promptBox.active = true;
            return;
        }
        if (gHandler.eventMgr) {
            gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "网络断开，正在努力连接中");
        }
    },
    netConnectSuccess(data) {
        this.reconnectTimes = 0;
        console.log(data, this.reconnectTimes);
    }
});