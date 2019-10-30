import CommonTool = require("./ZJHCommonTool");

const {ccclass, property} = cc._decorator;
@ccclass
export default class ZJHPoker extends cc.Component {
    @property(cc.SpriteAtlas)
    pokerAtlas: cc.SpriteAtlas = null

    @property(cc.Node)
    num: cc.Node = null;

    @property(cc.Node)
    sf: cc.Node = null;

    @property(cc.Node)
    bf: cc.Node = null;

    @property(cc.Node)
    bf2: cc.Node = null;

    @property(cc.Node)
    back: cc.Node = null;

    @property
    logicValue: number = 0;

    @property
    realValue: number = 0;

    @property
    flowerValue: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    setLogicValue(val: number){
        this.logicValue = this.convert(val) || 8;
        this.setRealValue();
        this.setFlowerValue();
        this.setPokerFace()
    }

    convert(val: number){
        let value = val%13;
        let flower = Math.ceil(val/13);
        if(value == 0){
            value = 13;
        }else if(value == 1){
            value = 14;
        }
        let cValue = value*4+(flower-1);
        return cValue;
    }

    //计算实际值
    setRealValue()
    {
        this.realValue = ~~(this.logicValue/4);
    }

    //计算花色
    setFlowerValue()
    {
        this.flowerValue = this.logicValue%4;
    }

     //创建牌面
     setPokerFace()
     {
         //设置数字
         var str = "";
         if(this.flowerValue == 1 || this.flowerValue == 3)
         {
             str = "card_black_";
         }
         else
         {
             str = "card_red_";
         }
         var numberUrl = str+this.realValue;
         this.num.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(numberUrl)
         var smallUrl = "card_color_s_"+this.flowerValue
         this.sf.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(smallUrl)
         if(this.realValue > 10 && this.realValue < 14){
            this.bf2.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame("b_"+this.flowerValue+"_"+this.realValue)
            this.bf.active = false;
            this.bf2.active = true;
         }else{
            this.bf.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame("card_color_b_"+this.flowerValue)
            this.bf.active = true;
            this.bf2.active = false;
         }
     }

     backVisible(bVisible: boolean){
         this.back.active = bVisible;
     }

     flip(){
         if(!this.back.active) return;//已经翻牌了
         let scale = this.node.getScale(cc.v2());
         let s2 = cc.scaleTo(0.1,0,scale.y)
         let sk2 = cc.skewTo(0.1,0,-5)
         let spawn1 = cc.spawn(s2,sk2)
         let call = cc.callFunc(()=>{
            this.backVisible(false);
         })
         let _s2 = cc.scaleTo(0.1,scale.x,scale.y);
         let _sk2 = cc.skewTo(0.1,0,0)
         let spawn2 = cc.spawn(_s2,_sk2)
         let seq = cc.sequence(spawn1,call,spawn2)
         this.node.runAction(seq);
     }

     grey(){
        CommonTool.Sprite2Grey(this.back.getComponent(cc.Sprite));
        CommonTool.Sprite2Grey(this.num.getComponent(cc.Sprite));
        CommonTool.Sprite2Grey(this.sf.getComponent(cc.Sprite));
        CommonTool.Sprite2Grey(this.bf.getComponent(cc.Sprite));
        CommonTool.Sprite2Grey(this.bf2.getComponent(cc.Sprite));
     }

     normal(){
        if(!this.back.active) this.back.active = true;
        CommonTool.Sprite2Normal(this.back.getComponent(cc.Sprite));
        CommonTool.Sprite2Normal(this.num.getComponent(cc.Sprite));
        CommonTool.Sprite2Normal(this.sf.getComponent(cc.Sprite));
        CommonTool.Sprite2Normal(this.bf.getComponent(cc.Sprite));
        CommonTool.Sprite2Normal(this.bf2.getComponent(cc.Sprite));
     }
    // update (dt) {}
}
