/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
cc.Class({
    extends: cc.Component,

    properties: {
        area_number: null, //场号
    },
    onLoad: function() {
        this._gameView = this.node.getComponent("QZNNRoomView");
    },
    start: function() {
        this.initSence();
        this.initData();

    },
    initSence: function() {
        //this._gameView._centerPancel.InitViewList();
        this.onEvenHandle();

    },
    resetSence: function() {
        this.area_number = null;
        cc.gg.global.gameRoomData = null;
        this.onEvenHandle();
    },
    initData: function() {

    },
    onEvenHandle: function() {
        var listenArr = ["GameAreaDetail", "OnOpen", "OnIsContent", "JoinRoom", "LeaveRoom", "Login"];
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
            //this._gameView.node_UI.removeAllChildren()
            //自定义指令
            if (instructionsName == "OnOpen") {

            } else if (instructionsName == "OnIsContent") {
                this.alert("net_content", data.text, this._gameView.node_UI);
            }
            return;
        }
        var data = proto.msg.Resp.deserializeBinary(data);
        var result = data.getResult();
        var resultMessage = data.getResultmessage();
        var datas = data.getData();
        console.log(datas, "listenEvent ROOM");
        if (result == 1) {
            if (instructionsName == "GameAreaDetail") {
                this.manageGameAreaDetail(datas);
            } else if (instructionsName == "JoinRoom") {
                this.manageJoinRoom(datas);
            } else if (instructionsName == "LeaveRoom") {
                this.manageLeaveRoom(datas)
            } else if (instructionsName == "Login") {
                this.manageLogin(datas)
            }

        } else {
            if (instructionsName == "JoinRoom") {
                this.alert("game_err", resultMessage, this._gameView.node_UI);
                return
            } else if (instructionsName == "Login") {
                cc.gg.protoBuf.ISclose = true;
                cc.gg.protoBuf.close();
                return
            }
            console.log(resultMessage, "异常返回")
            console.log(datas, "datas 的内容")

            this.alert("game_err", resultMessage, this._gameView.node_UI);
        }
    },
    alert: function(type, resultMessage, node) {
        var self = this;
        cc.loader.loadRes("qznnPublic/prefab/alert", cc.Prefab, function(err, res) {
            if (err) {
                return
            }
            var data = cc.instantiate(res);
            data.getComponent("alert").setView(type, resultMessage, self._gameView.node_UI)
            self._gameView.node_UI.addChild(data);
        })
    },
    manageLogin: function(data) {
        this._gameView.node_UI.removeAllChildren();
        //拉取房间信息
        this.sendGameAreaDetail();
        // if (!data || data == "") {
        //     return
        // }
        // var datas = JSON.parse(data);
        // console.log(datas, "Login");

    },
    //请求进入房间
    manageJoinRoom: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        //console.log("manageJoinRoom", datas);
        this._gameView.joinGameRoom(data);
    },
    //退出房间的监听
    manageLeaveRoom: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log("manageLeaveRoom", datas);
    },
    manageGameAreaDetail: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log("房间数据", datas);
        //将数据派发给center处理
        this._gameView._centerPancel.initRoomListView(datas);
    },
    //发送用户进入房间
    sendsendJoinRoom: function(area_number) {
        cc.gg.global.area_number = area_number;
        var data = {
            "account_id": cc.gg.global.userID,
            "password": "123456",
            area_number: parseInt(area_number),
        }
        cc.gg.protoBuf.send("JoinRoom", 1, data)
    },
    //请求游戏详情
    sendGameAreaDetail: function() {
        var data = {
            account_id: cc.gg.global.userID || 1
        }
        cc.gg.protoBuf.send("GameAreaDetail", 1, data)
    },
    //发送登陆
    sendLogin: function() {
        var data = {
            account_id: cc.gg.global.userID + "" || 1,
            password: cc.gg.global.password + ""
        }
        cc.gg.protoBuf.send("Login", 1, data)
    },
});