

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property
    app  = null;

    parentComponent = null;
    init(component){
        this.parentComponent = component
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        //payBankDh
        this.parentComponent.showAccountAlert();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let btn1= cc.find('Canvas/BankTipAlert/Layout/btn1')
        let Label= cc.find('Canvas/BankTipAlert/Layout/Label').getComponent(cc.Label)

        if(this.app.UrlData.package_id == 10){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
        }else if(this.app.UrlData.package_id == 15|| this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 16 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
        }else{
            this.app.loadIconLg(`${src}/btn/surecg`,btn1)
        }

        Label.string = Language_pay.Lg.ChangeByText('请完善银行卡绑定信息')
    }
    // update (dt) {}
}
