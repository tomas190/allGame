

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property
    app  = null;
    
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
        this.blinkFun()
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.node.removeFromParent();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let title_tip= cc.find("Canvas/BeforePayOrderAlert/popWindowBG/title_tip")
        let btn1= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/btn1')
        let label1= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label4').getComponent(cc.Label)

        if(this.app.UrlData.package_id == 10){
            title_tip.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('提示')
        }else if(this.app.UrlData.package_id == 18){

        }else{
            this.app.loadIconLg(`${src}/font/title_tip`,title_tip)
        }
        label1.string = Language_pay.Lg.ChangeByText('【温馨提示】')
        label2.string = Language_pay.Lg.ChangeByText('       银行卡收款信息会不定期更换，请玩家不要保存！每次充值请按正常流程获得最新账户资料！若打入非指定账号，损失自重！')
        label3.string = Language_pay.Lg.ChangeByText('1.进行转账的账户名必须和绑定银行卡的账户名一样。')
        label4.string = Language_pay.Lg.ChangeByText('2.转账的金额必须和订单上的收款金额完全一致，包括小数点。')
        if(this.app.UrlData.package_id != 9 && this.app.UrlData.package_id != 15 && this.app.UrlData.package_id != 18 && this.app.UrlData.package_id != 16 && this.app.UrlData.package_id != 20 && this.app.UrlData.package_id != 12 && this.app.UrlData.package_id != 22){
            this.app.loadIconLg(`${src}/btn/surebtn1`,btn1)
        }
    }
    blinkFun(){
        let label3= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label3')
        let label4= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label4')
        label3.stopAllActions()
        label4.stopAllActions()
        var action1 = cc.tintTo(0.2, 255, 212, 105);
        var action2 = cc.tintTo(0.2, 229, 49, 20);
        var action3 = cc.tintTo(0.2, 255, 212, 105);
        var action4 = cc.tintTo(0.2, 229, 49, 20);
        label3.runAction(cc.sequence(action1,action2).repeatForever())
        label4.runAction(cc.sequence(action3,action4).repeatForever())
    }
    // update (dt) {}
}
