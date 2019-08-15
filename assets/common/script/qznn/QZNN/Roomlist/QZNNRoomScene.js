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
        var listenArr = ["GameAreaDetail", "OnOpen", "JoinRoom", "LeaveRoom"];
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
            //自定义指令
            if (instructionsName == "OnOpen") {
                //拉取房间信息
                this.sendGameAreaDetail();
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
            } else if (instructionsName == "LeaveRoom") {
                this.manageLeaveRoom(data)
            }

        } else {
            console.log(resultMessage, "异常返回")
            console.log(datas, "datas 的内容")
        }
    },
    //请求进入房间
    manageJoinRoom: function(data) {
        if (!data || data == "") {
            return
        }
        var datas = JSON.parse(data);
        console.log("manageJoinRoom", datas);
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
        var data = {
            "account_id": cc.gg.global.userID,
            area_number: parseInt(area_number),
        }
        cc.gg.protoBuf.send("JoinRoom", 1, data)
    },
    //请求游戏详情
    sendGameAreaDetail: function() {
        var data = {
            account_id: 1
        }
        cc.gg.protoBuf.send("GameAreaDetail", 1, data)
    }
});