
import Config from "../../payConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    selectLabel = null;
    showSelect = null;
    selectContent= null;
    data = null;
    parentCom = null;
    config = null;
    app = null;
    // LIFE-CYCLE CALLBACKS:
    public init(data){
        this.label.string = data.text;
        this.selectLabel = data.Label;
        this.showSelect = data.showSelect;
        this.selectContent = data.selectContent;
        this.data = data.data;
        this.parentCom = data.parentCom;
    }
    onLoad () {
        this.config = new Config();
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    start () {

    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        this.showSelect = false;
        this.parentCom.bankId = this.data.id;
        this.selectLabel.string = this.config.testBankNum(this.label.string) ;
        this.selectContent.removeAllChildren();
        let info =JSON.parse(this.data.info);
        let type = this.data.type;
        info = {
            ...info,
            type
        };
            this.parentCom.Info = info;

    }
    // update (dt) {}
}
