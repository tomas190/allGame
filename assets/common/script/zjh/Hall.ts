import commmonTools from "./CommonTool"
import msgSender from "./net/msgSender"
import MySelf from "./MySelf"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {

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

    @property(cc.Node)
    loading:cc.Node = null;


    onLoad () {
        commmonTools.addBtnEvent(this.bg,()=>{return;},null,null,null,this);
        this.initRoomClick();
        this.updateGold(MySelf.getMoney());
        this.updateNick(MySelf.getNick());
        this.showCtrl(false);
        this.loadRes();
    }

    loadRes(){
        let onProgress = function(completedCount,totalCount,item ) {
            // this.labelLoadProgress.string = "Loading:" + completedCount + "/" + totalCount;
            // this.progressBarView.progress = completedCount/totalCount;
            // cc.log("completedCount",completedCount);
            // cc.log("totalCount",totalCount);
            // cc.log("item",item);
        }

        let onLoaded = function() {
            cc.log("game onLoaded~!!");
            this.showCtrl(true);
            this.loading.active = false;
        }
        cc.director.preloadScene('Game',onProgress.bind(this),onLoaded.bind(this));
    }

    showCtrl(bVisible: boolean){
        for(let i=0; i<this.roomList.length; ++i){
            this.roomList[i].active = bVisible;
        }
        this.Top.active = bVisible
    }

    initRoomClick(){
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
    }

    updateGold(money: number){
        this.nums.removeAllChildren();
        money = Math.floor(money*100)/100;
        let str = String(money);
        let arr = str.split("");
        for(let i=0; i<arr.length; ++i){
            let node = new cc.Node()
            let url = "num_b/"
            if(arr[i] === "."){
                url = url+"_dot";
            }else{
                url = url+arr[i];
            }
            node.addComponent(cc.Sprite);
            node.scale = 0.8;
            commmonTools.loadSpriteFrame(node,url);
            this.nums.addChild(node);
        }
    }

    updateNick(nstr: string){
        this.nick.string = nstr;
    }
    
    bVisible(bVisible: boolean){
        this.node.active = bVisible;
    }
    // update (dt) {}
}
