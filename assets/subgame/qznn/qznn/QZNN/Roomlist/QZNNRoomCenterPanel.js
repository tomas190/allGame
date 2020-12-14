/*
 *  Dawnson 2019-8-01
 * 15302765815@163.com
 */
var msgSender = require("QZNNMsgSender");
var cmd = require("QZNNCMD")
cc.Class({
    extends: cc.Component,

    properties: {
        roomListArr: [], //房间场次列表
        roomListGold: [], //房间金币
        roomListBottomScore: [], //房间底分
        flag:null,
    },

    initzation: function(e, t) {
        this.node = e;
        this._gameView = t;
        this.initView();
        this.addEvenListener(this.node)
    },

    initView: function() {
        this.content = this.node.getChildByName("layout") //cc.find("scrollview/view/content/layout", this.node)
            //房间列表节点
        for (var i = 1; i < 5; i++) {
            this.roomListArr.push(this.content.getChildByName("item" + i))
            this.roomListGold.push(this.content.getChildByName("item" + i).getChildByName("gold"))
            this.roomListBottomScore.push(this.content.getChildByName("item" + i).getChildByName("difen"))
        }
    },

    resetView: function() {
    },

    addEvenListener: function(e) {
        for (var i = 0; i < 4; i++) {
            cc.gg.utils.addClickEventALL(this.roomListArr[i], this.touchStart.bind(this),null,this.toucheEnd.bind(this),this.TouchCancel.bind(this),null,{flag:true});
        }
    },

    touchStart: function(traget) {
        if(!this.flag){
            this.flag = traget.name; 
            traget.runAction(cc.scaleTo(.1,0.9));
        }
    },

    toucheEnd(traget){
        if(this.flag && this.flag == traget.name){
            traget.name += ""
            let level = traget.name.substr(traget.name.length - 1);
            traget.runAction(cc.sequence(cc.scaleTo(.1,1),cc.callFunc(()=>{
               if(cmd.CANSWITCH){
                   cmd.CANSWITCH = false;
                    msgSender.JoinRoom(level);
               } 
                this.flag = null;
            })))
            this.scheduleOnce(()=>{
                cmd.CANSWITCH = true;
            },1)
           
        }
    },

    TouchCancel(traget){
        traget.runAction(cc.scaleTo(.1,1))
        this.flag = null;
        this.scheduleOnce(()=>{
            cmd.CANSWITCH = true;
        },1)
    },

    //初始化游戏列表参数
    initRoomListView: function(data) {
        let roomInfo = data.roomTypeList;
        let compare = function(level){
            return function(obj1,obj2){
               let i =  obj1[level] > obj2[level] ? 1 : -1;
               return i;
            }
        }
        roomInfo.sort(compare("level"));
        for (var i = 0; i < roomInfo.length; i++) {
            this.roomListGold[i].getComponent(cc.Label).string = roomInfo[i].minLimit+"";
            this.roomListBottomScore[i].getComponent(cc.Label).string = roomInfo[i].baseMoney+"";
        }
    },

});