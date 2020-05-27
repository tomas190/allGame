

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property()
    timer = null;

    // LIFE-CYCLE CALLBACKS:
    public init(data){
        this.label.string = data.substring(0,30)
    }

    onLoad () {
        var self = this;
        this.timer = setTimeout(() => {
            this.node.destroy()
        }, 1500)
    }

    removeSelf(){
        this.node.destroy()
    }

    onDestroy(){
        clearTimeout(this.timer);
    }

    start () {

    }

    // update (dt) {}
}
