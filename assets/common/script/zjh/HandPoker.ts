import CommonTool from "./CommonTool";
import msgSender from "./net/msgSender";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HandPoker extends cc.Component {

    @property([cc.Node])
    pokers: cc.Node [] = [null];

    @property(cc.Node)
    pokerLayout: cc.Node = null;

    @property(cc.Node)
    state:cc.Node = null;

    @property(cc.Node)
    type:cc.Node = null;

    @property(cc.Node)
    typeBg:cc.Node = null;

    @property(cc.Node)
    btnshow:cc.Node = null;

    @property(cc.Node)
    betsBg:cc.Node = null;

    @property(cc.Node)
    light:cc.Node = null;

    @property(cc.Label)
    lblbets: cc.Label = null;

    @property
    index: number = 0;

    @property
    index2: number = 0;
    // LIFE-CYCLE CALLBACKS:
    @property
    chair:number = -1;

    onLoad () {
    }

    saveChair(chair: number){
        this.chair = chair;
    }

    onClick(){
        this.lightAction();
        this.pokerLayout.on("touchend",this.doCompare,this)
    }

    lightAction(){
        this.light.active = true;
        let s2 = cc.scaleTo(0.5,1.0);
        let fadeOut = cc.fadeOut(0.5);
        let call = cc.callFunc((sender)=>{
            sender.scale = 0.75;
            sender.opacity = 255;
        });
        let spawn = cc.spawn(s2,fadeOut)
        let seq = cc.sequence(spawn,call);
        let repeat = cc.repeatForever(seq);
        this.light.runAction(repeat);
    }
    stopLightAction(){
        this.light.stopAllActions();
        this.light.scale = 0.75;
        this.light.opacity = 255;
        this.light.active = false;
    }

    doCompare(){
        msgSender.playerCmpWithOther(this.chair)
    }
    
    offClick(){
        this.stopLightAction();
        this.pokerLayout.off("touchend",this.doCompare,this)
    }
    
    setPokerValue(data:any){
        let type = data.type == 0 ? 1 : data.type;
       CommonTool.loadSpriteFrame(this.type,"type/"+type);
       for(let i=0; i<data.cards.length; ++i){
           this.pokers[i].getComponent("Poker").setLogicValue(data.cards[i]);
       } 
       this.typeBg.active = true;
    }

    showCardReq(){
        msgSender.showCards2AllPlayer();
        this.btnshow.active = false;
    }

    ActiveShowCard(){
        this.btnshow.active = true;
        this.typeBg.active = false;
        this.state.active = false;
    }
    //翻牌
    showPoker(data: any){
        this.setPokerValue(data);
        this.pokers.forEach(poker => {
            poker.getComponent("Poker").flip();
        });
    }

    checkAnimation(){
        // this.pokers[0].runAction(cc.rotateBy(0.1,20));
        // this.pokers[2].runAction(cc.rotateBy(0.1,-20));
        // this.pokers[0].y = this.pokers[0].y-20;
        // this.pokers[2].y = this.pokers[2].y-20;
        CommonTool.loadSpriteFrame(this.state,"desk/stat_1");
        this.state.active = true;
    }

    setBets(gold: number){
        this.betsBg.active = true;
        let newGold = Number(this.lblbets.string)+gold;
        newGold = CommonTool.cutNum(newGold,2);
        this.lblbets.string = ""+newGold;
    }

    //设置状态
    setState(index: number){
        this.state.active = true;
        CommonTool.loadSpriteFrame(this.state,"desk/stat_"+index);
    }

    //发牌
    sendPoker(){
        this.pokers[this.index].active = true;
        this.index = this.index >= 2 ? 0 : ++this.index;
    }

    pokersVisible(bVisible: boolean){
        this.pokers.forEach(poker => {
            poker.active = bVisible;
        });
    }

    //隐藏手牌
    hidePoker(){
        this.pokers.forEach(poker => {
            poker.active = false;
            poker.getComponent("Poker").normal()
        });
    }

    getPokerPos():cc.Vec2{
        let pos = this.pokers[this.index2].getPosition();
        pos = this.pokerLayout.convertToWorldSpaceAR(pos);
        this.index2 = this.index2 >= 2 ? 0 : ++this.index2;
        return pos;
    }

    //弃牌或者失败
    lose(index: number){
        this.pokers.forEach(poker => {
            poker.getComponent("Poker").grey()
        });
        // this.resetAngle();
        this.setState(index);
    }

    win(){
        this.light.active = true;
        // let blink = cc.blink(1,5);
        let delay = cc.delayTime(1)
        let call = cc.callFunc((sender)=>{
            sender.active = false
        })
        let seq = cc.sequence(delay,call);
        this.light.runAction(seq);
    }

   reSet(){
        this.lblbets.string = "0";
        this.state.active = false;
        this.btnshow.active = false;
        this.typeBg.active = false;
        this.betsBg.active = false;
        this.index = 0;
        this.index2 = 0;
        // this.resetAngle();
        this.hidePoker();
   }

   resetAngle(){
    if(this.pokers[0].angle!=0){
        this.pokers[0].angle = 0;
        this.pokers[0].y = this.pokers[0].y+20;
    }
    if(this.pokers[2].angle!=0){
        this.pokers[2].angle = 0;
        this.pokers[2].y = this.pokers[2].y+20;
    } 
   }

    onExit(){
        this.chair = -1; 
        this.reSet()
    }

    // update (dt) {}
}
