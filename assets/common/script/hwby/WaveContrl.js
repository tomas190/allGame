// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var msg_pb = require('msg_pb_by');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    getClassName()
    {
        return "WaveContrl";
    },      

    onLoad () {
        Notification.Regsiter(NoticeDef.ChangeScene,this,this.onChangeScene);
    },

    onChangeScene(msg) {
        if(msg.getState() ==  msg_pb.EmRoomRunState.EMRS_BOSS) {
            this.node.runAction(cc.fadeTo(0.5,0));
        } else if(msg.getSceneindex() == 4){
            this.node.runAction(cc.fadeTo(0.5,50));
        } else {
            this.node.runAction(cc.fadeTo(0.5,255));
        }
    },
      
    onDestroy() {
        cc.log("WaveContrl onDestroy~!!!");
        Notification.UnRegAll(this);    
    },    

    start () {

    },

    // update (dt) {},
});
