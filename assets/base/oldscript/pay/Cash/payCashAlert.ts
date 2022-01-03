

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    parentComponent = null;
    cash = null;
    app  = null;
    
    init(data,UsdtDh :any=false){
        this.parentComponent = data.parentComponent;
        let rateMount = data.rateMount;
        let amount = data.amount;
        if(UsdtDh){
            this.label.string = `${Language_pay.Lg.ChangeByText('申请兑换金额为')}${amount} (USDT),${Language_pay.Lg.ChangeByText('扣除手续费')}${this.app.config.toDecimal2(rateMount)} (USDT),${Language_pay.Lg.ChangeByText('实际到账金额为')}${amount -rateMount} (USDT),${Language_pay.Lg.ChangeByText('确认要提交兑换申请吗？')}`;
        }else{
            this.label.string = `${Language_pay.Lg.ChangeByText('申请兑换金额为')}${amount},${Language_pay.Lg.ChangeByText('扣除手续费')}${this.app.config.toDecimal2(rateMount)},${Language_pay.Lg.ChangeByText('实际到账金额为')}${amount -rateMount},${Language_pay.Lg.ChangeByText('确认要提交兑换申请吗？')}`;
        }
       
    }
    onLoad(){
        this.cash = cc.find('Canvas/Cash').getComponent('payCash')
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);

        this.parentComponent.DhBtn.getComponent(cc.Button).interactable =false;
        this.parentComponent.fetchwithDrawApply();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let btn1= cc.find('Canvas/CashAlert/popWindowBG/btn1')
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 10){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
        }else if(this.app.UrlData.package_id == 15|| this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 16|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){

        }else{
            this.app.loadIconLg(`${src}/btn/surebtn1`,btn1)
        }
    }
    // update (dt) {}
}
