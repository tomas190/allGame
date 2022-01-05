//提示
const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDTipMsg extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // @property(cc.Node)
    // tipNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    public init(data :string) : void{
        this.label.string = data.substring(0,30)
    }

    onLoad () {
        var action = cc.moveTo(1.5,cc.v2(0,150));
        var action2 = cc.moveTo(0.5,cc.v2(0,150));
        this.node.runAction(cc.sequence(action,action2,cc.callFunc(()=>{
            this.removeSelf()
        })))
    }
    removeSelf(){
        this.node.destroy()
    }

}
