import CommonTool from "./CommonTool";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Chip extends cc.Component {

    @property(cc.Label)
    lblvalue: cc.Label = null;

    @property
    value: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    setValue(val: number, k: number){
        this.value = val;
        this.lblvalue.string = String(this.value);
        CommonTool.loadSpriteFrame(this.node,"chips/chip_"+k);
    }

    getValue():number{
        return this.value;
    }
    // update (dt) {}
}
