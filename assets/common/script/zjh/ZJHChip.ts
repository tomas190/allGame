const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHChip extends cc.Component {

    @property(cc.Node)
    valueLayout: cc.Node = null;

    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;

    @property
    value: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    setValue(val: number, k: number){
        this.value = val;
        this.valueLayout.removeAllChildren();
        let str = String(this.value);
        let arr = str.split("");
        for(let i=0; i<arr.length; ++i){
            let node = new cc.Node()
            let url = "num_chip_s_";
            if(arr[i] === "."){
                url = url+"dot";
            }else{
                url = url+arr[i];
            }
            node.addComponent(cc.Sprite);
            node.scale = 0.8;
            node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(url);
            this.valueLayout.addChild(node);
        }
        this.node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("chip_"+k);
    }

    getValue():number{
        return this.value;
    }
    // update (dt) {}
}
