/*
 *  Dawnson 2019-8-01
 * 15302765815@163.com
 */
cc.Class({
    extends: cc.Component,

    properties: {
        roomListArr: [], //房间场次列表
        roomListGold: [], //房间金币
        roomListBottomScore: [], //房间底分
    },

    initzation: function(e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        this.addEvenListener(this.node)
    },
    initView: function() {
        this.content = cc.find("scrollview/view/content", this.node)
            //房间列表节点
        for (var i = 1; i < 5; i++) {
            this.roomListArr.push(this.content.getChildByName("item" + i))
            this.roomListGold.push(this.content.getChildByName("item" + i).getChildByName("gold"))
            this.roomListBottomScore.push(this.content.getChildByName("item" + i).getChildByName("difen"))
        }

        //test
        this.youkeBox = this.content.getChildByName("youke_box")
        this.editBox = this.youkeBox.getChildByName("editbox");
        this.youkeBottom = this.youkeBox.getChildByName("btn_youke")
    },
    resetView: function() {
        this._gameView._scene.sendGameAreaDetail()
    },
    addEvenListener: function(e) {
        for (var i = 0; i < 4; i++) {
            cc.gg.utils.addClickEventEND(this.roomListArr[i], this.createRoom.bind(this), { flag: true });
        }
        cc.gg.utils.addClickEventEND(this.youkeBottom, this.login.bind(this), { flag: true });
    },
    login: function() {
        cc.gg.global.userID = this.editBox.getComponent(cc.EditBox).string
        cc.gg.global.password = "123456"
        this._gameView._scene.sendLogin()
    },
    createRoom: function(traget) {
        console.log(traget.name + "进入房间信息");
        traget.name += ""
        this._gameView._scene.sendsendJoinRoom(traget.name.substr(traget.name.length - 1));
        //调取加载动画
        this._gameView.playLoading();
    },
    //初始化游戏列表参数
    initRoomListView: function(data) {
        for (var i = 0; i < data.length; i++) {
            this.roomListGold[i].getComponent(cc.Label).string = this.ModifyStr(data[i].require_gold_min);
            this.roomListBottomScore[i].getComponent(cc.Label).string = this.ModifyStr(data[i].base_score)
        }
    },
    ModifyStr: function(str) {
        return (str + "").replace(".", "/")
    },

});