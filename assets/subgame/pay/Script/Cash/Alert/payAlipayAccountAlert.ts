

const {ccclass, property} = cc._decorator;

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

        let iconPath = data.text =='设置支付宝' ? 'cash/title_szzfb' :'cash/title_xgzfb';
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
        this.app.clickClip.play();

        if(this.accountInput.string == ''
            || this.account_nameInput.string == '')
        {
            this.app.showAlert('输入不能为空!')
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
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&withdraw_type=1&type=2&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let zfbCom = cc.find('Canvas/Cash/Content/Dh').getComponent('payDh');
                zfbCom.fetchIndex();
                self.app.showAlert('操作成功!')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    deleteAccount_name(){
        //按键音效
        this.app.clickClip.play();

        this.account_nameInput.string = '';
    }

    deleteAccount(){
        //按键音效
        this.app.clickClip.play();

        this.accountInput.string = '';
    }
    
    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
    }
    // update (dt) {}
}
