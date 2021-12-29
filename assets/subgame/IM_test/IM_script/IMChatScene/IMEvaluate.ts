
const {ccclass, property} = cc._decorator;

@ccclass
export default class IMEvaluate extends cc.Component {
   
    @property(cc.Node)
    node1:cc.Node = null
    @property(cc.Node)
    input:cc.Node = null
    @property(cc.SpriteFrame)
    face1:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    face1_checked:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    face2:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    face2_checked:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    face3:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    face3_checked:cc.SpriteFrame = null
    @property(cc.Label)
    content:cc.Label = null
    @property(cc.Node)
    cancelBtn:cc.Node = null
    @property
    level:Number = 1;

    enterComment(){
        this.node1.active = false;
        this.input.active = true;
        this.cancelBtn.active = true;
    }

    faceClick(event,args){
        let faces = cc.find("node1/faces",this.node);
        for(let i=1; i<=3; ++i){
            let name = "face"+ i;
            let bq = faces.getChildByName(name);
            if(Number(args) == i){
                bq.stopAllActions();
                name+="_checked";
                this.level = i;
                let st1 = cc.scaleTo(.05,1.2,.8);
                let st2 = cc.scaleTo(.1,.8,1.2);
                let st3 = cc.scaleTo(.05,1,1);
                let seq = cc.sequence(st1,st2,st3);
                bq.runAction(seq);
            }
            bq.getComponent(cc.Sprite).spriteFrame = this[name];
        }
    }

    submit(){
        cc.log("提交评价",this.level,this.content.string)
        this.node.destroy();
    }

    cancel(){
        this.node1.active = true;
        this.input.active = false;
        this.cancelBtn.active = false;
        this.content.string = ""; 
    }
    // update (dt) {}
}
