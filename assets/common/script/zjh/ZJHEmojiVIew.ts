import comTools = require("./ZJHCommonTool")
import msgSender from "./ZJHnet/ZJHmsgSender"
import notification from "./ZJHnet/ZJHNotification"
import Event from "./ZJHnet/ZJHEventCustom"
import MySelf = require("./ZJHMySelf")

const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHEmojiVIew extends cc.Component {

    @property([cc.Node])
    btnEmojis: cc.Node [] = [null];

    @property
    canSend: boolean = true;

    onLoad () {
        comTools.addBtnEvent(this.node,null,null,(event)=>{
            event.stopPropagation();
            return;
        },null,this)
        this.init();
    }

    init(){
        for(let i=0; i<this.btnEmojis.length; ++i){
            comTools.addBtnEvent(this.btnEmojis[i],null,null,()=>{
                if(this.canSend){
                    this.canSend = false;
                    msgSender.interactExpression(MySelf.getChair(),i)
                    this.countTime();
                }else{
                    notification.sendNotify(Event.EVENT_ERROR_RSP,"聊天过于频繁!")
                }
            },null,this)
        }
    }

    countTime(){
        setTimeout(()=>{this.canSend = true},3000);
    }
  
}
