import commmonTools = require("./ZJHCommonTool");
import msgSender from "./ZJHnet/ZJHmsgSender"
import MySelf = require("./ZJHMySelf")
import ZJHNoticeMgr = require("./ZJHNoticeMgr")
import Notification from "./ZJHnet/ZJHNotification"
import Event from "./ZJHnet/ZJHEventCustom"
import Desk = require("./ZJHDesk")
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHHall extends cc.Component {

    @property([cc.Node])
    roomList: [cc.Node] = [null];

    @property(cc.Label)
    nick: cc.Label = null;

    @property(cc.Node)
    nums: cc.Node = null;

    @property(cc.Node)
    bg:cc.Node = null;

    @property(cc.Node)
    Top:cc.Node = null;

    @property(cc.SpriteAtlas)
    atlas:cc.SpriteAtlas = null;

    @property([cc.Node])
    topMoney: cc.Node [] = [null];

    @property([cc.Node])
    bottomMoney: cc.Node [] = [null];

    onLoad () {
        commmonTools.resize();
        commmonTools.addBtnEvent(this.bg,()=>{return;},null,null,null,this);
        this.initRoomList();
        this.updateGold(MySelf.getMoney());
        this.updateNick(MySelf.getNick());
        ZJHNoticeMgr.initCurrentNode(this.node)
    }

    showCtrl(bVisible: boolean){
        if(!this.roomList) return;
        for(let i=0; i<this.roomList.length; ++i){
            this.roomList[i].active = bVisible;
        }
        this.Top.active = bVisible
    }

    initRoomList(){
        let func = (id: number)=>{
            msgSender.randomMatchReq(id+1)
        }
        for(let i=0; i<this.roomList.length; ++i){
            commmonTools.addBtnEvent(this.roomList[i],()=>{
                this.roomList[i].runAction(cc.scaleTo(0.1,0.9));
            },null,()=>{
                this.roomList[i].runAction(cc.scaleTo(0.1,1));
                func(i);
            },()=>{
                this.roomList[i].runAction(cc.scaleTo(0.1,1));
            },this);
        }
        let roomData = Desk.getRoomData(); 
        for(let i=0; i < this.topMoney.length; ++i){
            this.getSprite(roomData[i].basemoney,this.topMoney[i],"");
            this.getSprite(roomData[i].minlimit,this.bottomMoney[i],"number_");
        } 

    }

    getSprite(shuzi:number,baseNode:cc.Node,prefix:string){
        baseNode.removeAllChildren();
        let str = String(Math.round(shuzi*100)/100);
        let arr = str.split("");
        for(let i=0; i<arr.length; ++i){
            let node = new cc.Node()
            let url = prefix;
            if(arr[i] === "."){
                url = prefix+"_dot";
            }else{
                url = arr[i];
            }
            node.addComponent(cc.Sprite);
            node.scale = 0.8;
            node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(url)
            this.nums.addChild(node);
        }

    }

    updateGold(money: number){
        let newMoney = money < 0 ? 0 : money
        this.nums.removeAllChildren();
        this.getSprite(newMoney,this.nums,"")
    }

    updateNick(nstr: string){
        this.nick.string = nstr;
    }
    
    back(){
        Notification.sendNotify(Event.EVENT_BACK_TO_HALL,{})
    }

    // update (dt) {}
}
