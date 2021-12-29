
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    parentContent = null;
    parentLabel
    app = null;
    // LIFE-CYCLE CALLBACKS:
    public init(data){
        this.label.string = data.text;
        this.parentContent = data.Content;
        this.parentLabel = data.Label;
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }


    onClick(){
        //按键音效
        this.app.loadMusic(1);

        this.parentContent.active = false;
        this.parentLabel.string = this.label.string;
    }
    // update (dt) {}
}
