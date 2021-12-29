

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
        if(this.app.UrlData.package_id == 16){
            this.parentComponent.showAccountAlert_16();
            this.node.removeFromParent();
        }else{
            this.parentComponent.showAccountAlert();
            this.node.removeFromParent();
        }
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let btn1= cc.find('Canvas/BindBankAccountTipAlert/Layout/btn1')
        let Label1= cc.find('Canvas/BindBankAccountTipAlert/Layout/Label1').getComponent(cc.Label)
        let Label2= cc.find('Canvas/BindBankAccountTipAlert/Layout/Label2').getComponent(cc.Label)

        Label1.string = Language_pay.Lg.ChangeByText('【温馨提示】')
        Label2.string = Language_pay.Lg.ChangeByText('请先绑定银行卡后才可以进行充值\n现在就去绑定银行卡')
        if(this.app.UrlData.package_id == 8 ||this.app.UrlData.package_id == 12 ||this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 20){
            btn1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('绑  定')
            let title_tip = cc.find('Canvas/BindBankAccountTipAlert/Layout/title_tip')
            this.app.loadIconLg(`${src}/font/title_tip`,title_tip)
        }else if(this.app.UrlData.package_id == 10){
            btn1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('绑  定')
            let title_tip = cc.find('Canvas/BindBankAccountTipAlert/Layout/title_tip')
            title_tip.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('提示')
        }else if(this.app.UrlData.package_id == 9){
            btn1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('绑  定')
        }else if(this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 16){
            
        }else{
            this.app.loadIconLg(`${src}/btn/bindbt`,btn1)
        }
    }
    // update (dt) {}
}
