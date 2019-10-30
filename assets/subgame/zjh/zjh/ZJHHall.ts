import commmonTools = require("./ZJHCommonTool");
import msgSender from "./ZJHnet/ZJHmsgSender"
import MySelf = require("./ZJHMySelf")
import Desk = require("./ZJHDesk")
import baseDef from "./ZJHBaseDef"
import gameController = require("./ZJHGameController")
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

    @property(cc.Label)
    lbl_version: cc.Label = null;

    @property
    clickFlag:boolean = true; 

    onLoad () {
        commmonTools.resize();
        commmonTools.addBtnEvent(this.bg,()=>{return;},null,null,null,this);
        this.initRoomList();
        this.updateGold(MySelf.getMoney());
        this.updateNick(MySelf.getNick());
        this.lbl_version.string = baseDef.VERSION;
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
                if(this.clickFlag){
                    func(i);
                    this.clickFlag = false
                }
            },()=>{
                this.roomList[i].runAction(cc.scaleTo(0.1,1));
            },this);
        }
        let roomData = Desk.getRoomData(); 
        let compare = function(level:string){
            return function(obj1,obj2){
               let i =  obj1[level] > obj2[level] ? 1 : -1;
               return i;
            }
        }
        roomData.sort(compare("level"));
        for(let i=0; i < this.topMoney.length; ++i){
            this.getSprite(roomData[i].basemoney,this.topMoney[i],"");
            this.getSprite(roomData[i].minlimit,this.bottomMoney[i],"num_");
        } 
    }
    
    getSprite(shuzi:number,baseNode,prefix:string){
        let str = String(~~(shuzi*100)/100);
        let arr = str.split("");
        for(let i=0; i<arr.length; ++i){
            let node = new cc.Node()
            let url = prefix;
            if(arr[i] === "."){
                url = prefix+"dot";
            }else{
                url = prefix+arr[i];
            }
            node.addComponent(cc.Sprite);
            node.scale = 0.8;
            node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(url)
            baseNode.addChild(node);
        }

    }

    updateGold(money: number){
        let newMoney = money < 0 ? 0 : money
        this.nums.getComponent(cc.Label).string = String(~~(newMoney*100)/100);
    }

    updateNick(nstr: string){
        this.nick.string = nstr;
    }
    
    back(){
        gameController.back();
    }

    @property
    timer:number = 0
    update (dt) {
        if(this.timer >= 0.5){
            this.clickFlag = true;
            this.timer = 0;
        }
        this.timer+=dt;
    }
}
