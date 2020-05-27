

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    parentComponent = null;
    cash = null;
    app  = null;
    
    init(data){
        this.parentComponent = data.parentComponent;
        let rateMount = data.rateMount;
        let amount = data.amount;
        this.label.string = `申请兑换金额为${amount},扣除手续费${rateMount},实际到账金额为${amount -rateMount},确认要提交兑换申请吗？`;
    }
    onLoad(){
        this.cash = cc.find('Canvas/Cash').getComponent('payCash')
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
    onClick(){
        //按键音效
        this.app.clickClip.play();

        this.parentComponent.DhBtn.getComponent(cc.Button).interactable =false;
        this.parentComponent.fetchwithDrawApply();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
    }
    // update (dt) {}
}
