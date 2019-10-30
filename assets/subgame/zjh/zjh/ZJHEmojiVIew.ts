import comTools = require("./ZJHCommonTool")
import msgSender from "./ZJHnet/ZJHmsgSender"
import MySelf = require("./ZJHMySelf")
import baseDef from "./ZJHBaseDef"
import NoticeMgr = require("./ZJHNoticeMgr")
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
                    NoticeMgr.showToast(baseDef.LOCAL_TXT.CHAT_FREQUENT);
                }
                this.node.parent.getComponent("ZJHGame").movePanel();
            },null,this)
        }
    }

    countTime(){
        setTimeout(()=>{this.canSend = true},3500);
    }
  
}
