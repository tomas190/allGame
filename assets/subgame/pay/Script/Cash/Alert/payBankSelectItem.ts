
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    parentComponent = null;
    index = 0;
    app = null;
    // LIFE-CYCLE CALLBACKS:
    public init(data){
        this.label.string = data.text;
        this.parentComponent = data.parentComponent;
        this.index = data.index;
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }


    onClick(){
        //按键音效
        this.app.clickClip.play();

        this.parentComponent.showSelect = false;
        this.parentComponent.selectLabel.string = this.label.string;
        this.parentComponent.selectContent.removeAllChildren();
    }
    // update (dt) {}
}
