import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hallPublicAlert')
export default class hallPublicAlert extends Component {
    @property(Label)
    label: Label | null = null;
    // LIFE-CYCLE CALLBACKS:
    public init(data) {
        this.label.string = data.str.substring(0, 80)
    }
    onLoad() {
        // this.timer = setTimeout(() => {
        //     this.node.destroy()
        // }, 3000)
    }
    removeSelf() {
        this.node.destroy()
    }
    onDestroy() {
    }
    start() {

    }
    // update (dt) {}
}