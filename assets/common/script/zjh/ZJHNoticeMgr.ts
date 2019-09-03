
import pbFactory = require("./ZJHPBFactory")
import Notification from "./ZJHnet/ZJHNotification"
import Event from "./ZJHnet/ZJHEventCustom"
class ZJHNoticeMgr {

    private static Instance:ZJHNoticeMgr = null;

    private currentNode:cc.Node = null;

    private constructor(){
        this.registerMessage()
    }

    initCurrentNode(node:cc.Node){
        this.currentNode = node;
    }

    public static getInstance(){
        if(!this.Instance){
            this.Instance = new ZJHNoticeMgr();
        }
        return this.Instance;
    }

    registerMessage(){
        Notification.register(Event.EVENT_ERROR_RSP,this,this.showToast);//结算
    }

    showToast(str: string){
        let toast = pbFactory.getPbObject("toast")
        toast.getChildByName("lbl_notice").getComponent(cc.Label).string = str;
        this.currentNode.addChild(toast);
        let pos1 = cc.v2(0,-100);
        let pos2 = cc.v2(0,0);
        let pos3 = cc.v2(0,100);
        let fadeIn = cc.fadeIn(0.3);
        let fadeOut = cc.fadeOut(0.3);
        let moveTo1 = cc.moveTo(0.3,pos2);
        let moveTo2 = cc.moveTo(0.3,pos3);
        let spawn1 = cc.spawn(fadeIn,moveTo1);
        let spawn2 = cc.spawn(fadeOut,moveTo2);
        let delay = cc.delayTime(1.0);
        let call = cc.callFunc(function(sender:cc.Node) {
           sender.destroy()
        }.bind(this))
        let seq = cc.sequence(spawn1,delay,spawn2,call);
        toast.setPosition(pos1);
        toast.runAction(seq);
     }

}

export = ZJHNoticeMgr.getInstance();