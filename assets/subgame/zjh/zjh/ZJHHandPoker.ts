import msgSender from "./ZJHnet/ZJHmsgSender";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHHandPoker extends cc.Component {

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

    @property(cc.SpriteAtlas)
    atlas:cc.SpriteAtlas = null;

    @property(cc.Node)
    gaoliang:cc.Node = null;

    @property
    index: number = 0;

    @property
    index2: number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

 
    onClick(){
        this.lightAction();
        this.pokerLayout.on("touchend",this.doCompare,this)
    }

    lightAction(){
        this.gaoliang.active = true;
        let s2 = cc.scaleTo(0.5,1.0);
        let fadeOut = cc.fadeOut(0.5);
        let call = cc.callFunc((sender)=>{
            sender.scale = 0.75;
            sender.opacity = 255;
        });
        let spawn = cc.spawn(s2,fadeOut)
        let seq = cc.sequence(spawn,call);
        let repeat = cc.repeatForever(seq);
        this.gaoliang.runAction(repeat);
    }
    
    stopLightAction(){
        this.gaoliang.stopAllActions();
        this.gaoliang.scale = 0.75;
        this.gaoliang.opacity = 255;
        this.gaoliang.active = false;
    }

    doCompare(){
        let chair = this.node.parent.getComponent("ZJHGame").compareChair
        msgSender.playerCmpWithOther(chair);
    }
    
    offClick(){
        this.stopLightAction();
        this.pokerLayout.off("touchend",this.doCompare,this);
    }
    
    setPokerValue(data:any){
        let type = data.type == 0 ? 1 : data.type;
       this.type.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("type_"+type);
       for(let i=0; i<data.cards.length; ++i){
           this.pokers[i].getComponent("ZJHPoker").setLogicValue(data.cards[i]);
       } 
       this.typeBg.active = true;
    }

    showCardReq(){
        msgSender.showCards2AllPlayer();
        this.btnshow.active = false;
    }

    ActiveShowCard(){
        this.btnshow.active = true;
        this.state.active = false;
    }
    //翻牌
    showPoker(data: any){
        this.setPokerValue(data);
        this.pokers.forEach(poker => {
            poker.getComponent("ZJHPoker").flip();
        });
    }

    checkAnimation(){
        this.state.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("stat_1")
        this.state.active = true;
    }

    setBets(gold: number){
        this.betsBg.active = true;
        let total = gold + Number(this.lblbets.string)
        total = Math.round(total*100)/100;
        this.lblbets.string = ""+total;
    }

    //设置状态
    setState(index: number){
        this.state.active = true;
        this.state.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("stat_"+index)
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
            poker.getComponent("ZJHPoker").normal()
        });
    }

    //得到每一张牌的位置
    getPokerPos():cc.Vec2{
        let pos = this.pokers[this.index2].getPosition();
        pos = this.pokerLayout.convertToWorldSpaceAR(pos);
        this.index2 = this.index2 >= 2 ? 0 : ++this.index2;
        return pos;
    }

    //弃牌或者失败
    lose(index: number){
        this.pokers.forEach(poker => {
            poker.getComponent("ZJHPoker").grey()
        });
        this.setState(index);
    }

    win(){
        this.light.active = true;
        this.light.getComponent(sp.Skeleton).setAnimation(1,"zjh_win",false)
    }

    reSet(){
        this.lblbets.string = "0";
        this.state.active = false;
        this.btnshow.active = false;
        this.typeBg.active = false;
        this.betsBg.active = false;
        this.index = 0;
        this.index2 = 0;
        this.hidePoker();
    }

    onExit(){
        this.reSet()
    }

    // update (dt) {}
}
