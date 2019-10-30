
import pbFactory = require("./ZJHPBFactory")
import Notification = require ("./ZJHnet/ZJHNotification")
import Event  = require("./ZJHnet/ZJHEventCustom")
import baseDef from "./ZJHBaseDef"
class ZJHNoticeMgr {

    private static Instance:ZJHNoticeMgr = null;

    private timer:number = null;

    private constructor(){
    }

  
    public static getInstance(){
        if(!this.Instance){
            this.Instance = new ZJHNoticeMgr();
        }
        return this.Instance;
    }

    connectionSuccess(){
        this.clearTimer();
        let baseNode = cc.director.getScene().getChildByName("persistNode")
        if(baseNode){
            // baseNode.getChildByName("mask").active = false;
            baseNode.getChildByName("jiazai").active = false;
        }
    }

    connection(){
        let baseNode = cc.director.getScene().getChildByName("persistNode")
        if(baseNode){
            let load = baseNode.getChildByName("jiazai");
            // let mask = baseNode.getChildByName("mask");
            if(cc.director.getScene().name!="ZJHLoad") load.active = true;
            // mask.active = true;
            if(this.timer) return;
            this.timer = setTimeout(()=>{
                this.openDialog({str:baseDef.LOCAL_TXT.CONNECTION_FAILED,callfunc:this.clearTimer,obj:this,close:true})
            },10000)
        }
    }

    clearTimer(){
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    openDialog(args:any){
        let baseNode = cc.director.getScene().getChildByName("persistNode")
        if(baseNode){
            let dialog =  pbFactory.getPbObject("dialog");
            // baseNode.getChildByName("mask").active = true;
            dialog.scale = 0.7;
            dialog.getComponent("ZJHDialog").show(args);
            baseNode.addChild(dialog);
            dialog.setPosition(cc.v2(0,0));
            dialog.zIndex = baseDef.ZOrder.TOP;
        }
    }

    showToast(str: string){
        let baseNode = cc.director.getScene().getChildByName("persistNode")
        if(baseNode){
            let toast = pbFactory.getPbObject("toast")
            toast.getChildByName("lbl_notice").getComponent(cc.Label).string = str;
            baseNode.addChild(toast);
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

}

export = ZJHNoticeMgr.getInstance();