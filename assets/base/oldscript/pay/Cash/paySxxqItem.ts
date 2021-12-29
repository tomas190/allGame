
const {ccclass, property} = cc._decorator;
import {Language_pay} from "./../language/payLanguage"
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    created_atLabel: cc.Label = null;

    @property(cc.Label)
    remarkLabel : cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property
    public results :any= {};
    public app = null;

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    public init(data){
        this.amountLabel.string = this.app.config.toDecimal(data.amount);
        this.remarkLabel.string = data.remark;
        this.created_atLabel.string = data.created_at == 0 ? `${Language_pay.Lg.ChangeByText('无')}` : this.app.config.getTime(data.created_at);
    }
    // update (dt) {}
}
