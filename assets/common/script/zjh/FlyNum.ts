
import comTools from "./CommonTool"
const {ccclass, property} = cc._decorator;

@ccclass
export default class FlyNum extends cc.Component {

    @property(cc.Node)
    money: cc.Node = null;

    @property(cc.Node)
    spr: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    create(value: number){
        let sprUrl = value > 0 ? "golden_plus" : "silver_minus";
        let LabelUrl = value > 0 ? "LabelWin" : "LabelLose";
        value = value > 0 ? value : -value;
        value = comTools.cutNum(value,3);
        let newValue = String(value).replace(".","/");
        this.money.getComponent(cc.Label).string = newValue;
        comTools.loadFont(this.money,LabelUrl);
        comTools.loadSpriteFrame(this.spr,sprUrl);
    }

    start () {

    }

    // update (dt) {}
}
