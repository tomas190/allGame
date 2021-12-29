
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    callBack = null;
    init(num,callBack){
        this.callBack = callBack
        this.label.string = num
    }
    onClick(e){
        this.callBack(e)
    }
}
