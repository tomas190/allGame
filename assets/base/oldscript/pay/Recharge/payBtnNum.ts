
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    id = 1;
    callBack = null;
    init(num,callBack,id = 1){
        this.callBack = callBack
        this.label.string = num
        this.id = id
    }
    onClick(e){
        this.callBack(e,this.id)
    }
}
