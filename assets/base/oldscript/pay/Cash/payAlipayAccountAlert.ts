

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    titleIcon: cc.Node = null;

    @property(cc.EditBox)
    accountInput: cc.EditBox = null;

    @property(cc.EditBox)
    account_nameInput: cc.EditBox = null;


    @property()
    showSelect = false;
    action = 'add';
    itemId = null;
    app = null;

    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        let iconPath = data.text =='设置支付宝' ? `${src}/font/title_szzfb` :`${src}/font/title_xgzfb`;
        this.app.loadIcon(iconPath,this.titleIcon,283,51);
        this.action = data.action;
        this.itemId = data.itemId;
    }

    changeContent(data){
        this.accountInput.string = data.account_card;
        this.account_nameInput.string = data.account_name;
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.accountInput.node.on('text-changed',(e)=>{
            e.string=e.string.replace(/[^\a-\z\A-\Z0-9\?\.\@\+\$]/g,'')
        })
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);

        if(this.accountInput.string == ''
            || this.account_nameInput.string == '')
        {
            this.app.showAlert(Language_pay.Lg.ChangeByText('输入不能为空!'))
        }else{
            this.fetchBindAccountPay();
            this.node.removeFromParent();
        }
    }

    fetchBindAccountPay(){
        let url = `${this.app.UrlData.host}/api/payment_account/saveAccount`;
        let obj = {};
        obj = {
            account_card:this.accountInput.string,
            account_name:this.account_nameInput.string,
        };
        let info = JSON.stringify(obj);
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&withdraw_type=1&type=2&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let zfbCom = cc.find('Canvas/Cash/Content/Dh').getComponent('payDh');
                zfbCom.fetchIndex();
                self.app.showAlert(Language_pay.Lg.ChangeByText('操作成功!'))
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }

    deleteAccount_name(){
        //按键音效
        this.app.loadMusic(1);

        this.account_nameInput.string = '';
    }

    deleteAccount(){
        //按键音效
        this.app.loadMusic(1);

        this.accountInput.string = '';
    }
    
    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let bdali_form= cc.find('Canvas/AlipayAccountAlert/Layout/content/bdali_form')
        let btn1= cc.find('Canvas/AlipayAccountAlert/Layout/btn1')
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 12){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            this.app.loadIconLg(`${src}/font/zfbzh`,bdali_form.children[0])
            this.app.loadIconLg(`${src}/font/skrxm`,bdali_form.children[1])
            bdali_form.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("*温馨提示：绑定支付宝成功后无法自行修改!请仔细填写您的姓名和账号!")
        }else if(this.app.UrlData.package_id == 10){
            this.titleIcon.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("绑定支付宝")
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            bdali_form.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("支付宝账户:")
            bdali_form.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("收款人姓名:")
            bdali_form.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("*温馨提示：绑定支付宝成功后无法自行修改!请仔细填写您的姓名和账号!")
        }else if(this.app.UrlData.package_id == 15){
            
        }else{
            this.app.loadIconLg(`${src}/form/bdali_form`,bdali_form)
            this.app.loadIconLg(`${src}/btn/surecg`,btn1)
        }
        this.accountInput.placeholder = Language_pay.Lg.ChangeByText('输入支付宝帐号')
        this.account_nameInput.placeholder = Language_pay.Lg.ChangeByText('输入收款人姓名')
    }
    // update (dt) {}
}
