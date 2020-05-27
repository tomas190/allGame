

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.EditBox)
    input: cc.EditBox = null;

    @property
    app = null;
    
    public init(data){
        this.input = data.input;
        this.label.string = data.text;
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    start () {

    }

    deleteClick(){
        //按键音效
        this.app.clickClip.play();

        this.input.string = '';
        this.node.removeFromParent();
    }

    readyClick(){
        //按键音效
        this.app.clickClip.play();

        this.node.removeFromParent();
    }
    // update (dt) {}
}
