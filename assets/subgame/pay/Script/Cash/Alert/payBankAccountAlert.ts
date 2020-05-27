
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    publicAlert: cc.Prefab = null;

    @property(cc.Prefab)
    PublicInputAlert: cc.Prefab = null;

    @property(cc.Prefab)
    BankSelectItem: cc.Prefab = null;

    @property(cc.Node)
    titleIcon :cc.Node = null

    @property(cc.EditBox)
    nameInput: cc.EditBox = null;

    @property(cc.EditBox)
    accountInput: cc.EditBox = null;

    @property(cc.EditBox)
    bankNameInput: cc.EditBox = null;

    @property(cc.Label)
    selectLabel: cc.Label = null;

    @property(cc.Node)
    selectContent: cc.Node = null;

    @property()
    showSelect = false;
    action = 'add';
    itemId = null;
    app = null;

    public init(data) {
        let iconPath = data.text =='设置银行卡' ? 'cash/title_szyhk' :'cash/title_xgyhk';
        this.app.loadIcon(iconPath,this.titleIcon,283,51);
        this.action = data.action;
        this.itemId = data.itemId;
    }

    changeContent(data){
        this.accountInput.string = data.card_num;
        this.nameInput.string = data.card_name;
        this.selectLabel.string = data.bank_name;
        this.bankNameInput.string = data.branch_name;
        if(this.selectLabel.string ==''){
            this.selectLabel.string = '请选择开户行'
        }
    }

    onLoad() {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        // this.app.getPublicInput(this.accountInput,1);
        // this.app.getPublicInput(this.nameInput,2);
        // this.app.getPublicInput(this.bankNameInput,2);

        
    }


    onClick() {
        //按键音效
        this.app.clickClip.play();
        //去掉输入中的空格
        var str = this.accountInput.string.replace(/\s+/g,"");
        this.accountInput.string = str;
        if(this.accountInput.string == '' || this.nameInput.string == ''){
            this.app.showAlert('姓名和卡号不能为空!')
        }
        else if(this.selectLabel.string == '请选择开户行'||this.selectLabel.string == ''){
            this.app.showAlert('开户行不能为空！')
        }
        else if(this.accountInput.string.length>19||this.accountInput.string.length<15){
            this.app.showAlert('无效卡号！')
        }else if(this.accountInput.string.slice(0,1)=='0'){
            this.app.showAlert('无效卡号！')
        }
        else if(this.bankNameInput.string == ''){
            this.app.showAlert('开户支行不能为空！')
        }
        else{
            this.fetchBindAccountPay();
            this.node.removeFromParent();
        }
    }

    fetchBindAccountPay() {
        var url = `${this.app.UrlData.host}/api/payment_account/saveAccount`;
        let obj = {};
        obj = {
            card_num:this.accountInput.string,
            card_name:this.nameInput.string,
            bank_name:this.selectLabel.string,
            branch_name:this.bankNameInput.string,
        };
        let info = JSON.stringify(obj);
        let dataStr = `user_id=${this.app.UrlData.user_id}&id=${this.itemId}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&type=3&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let bankCom = cc.find('Canvas/Cash/Content/BankDh').getComponent('payBankDh');
                bankCom.fetchIndex();
                self.app.showAlert('操作成功!')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    selectClick() {

        var results = ['中国农业银行', '交通银行', '中国建设银行', '兴业银行', '民生银行', '中信银行', '华夏银行', '中国工商银行', '浦发银行', '招商银行', '中国银行', '光大银行', '广发银行','北京银行','杭州银行','宁波银行', '平安银行', '中国邮政']
        if (!this.showSelect) {
            for (var i = 0; i < results.length; i++) {
                var node = cc.instantiate(this.BankSelectItem);
                this.selectContent.addChild(node);
                node.getComponent('payBankSelectItem').init({
                    text: results[i],
                    parentComponent: this,
                    index: i
                })
            }
            this.showSelect = true;
        } else {
            this.selectContent.removeAllChildren();
            this.showSelect = false;
        }
    }

    deleteName() {
         //按键音效
         this.app.clickClip.play();

         this.nameInput.string = '';
    }

    deleteAccount() {
         //按键音效
         this.app.clickClip.play();
         this.accountInput.string = '';
    }

    deleteBankName() {
         //按键音效
         this.app.clickClip.play();
         this.bankNameInput.string = '';
    }

    removeSelf() {
         //按键音效
         this.app.clickClip.play();

        this.node.destroy();
    }

    // update (dt) {}
}
