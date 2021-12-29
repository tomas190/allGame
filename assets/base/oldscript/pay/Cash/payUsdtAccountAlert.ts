const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    walletAddressInput: cc.EditBox = null;

    @property(cc.Label)
    chanTypeLabel: cc.Label = null;

    @property(cc.Node)
    selectContent: cc.Node = null;

    @property(cc.Label)
    AqmLabel: cc.Label = null;

    app = null
    action = 'add'
    itemId = ""

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.selectContent.active = false
        this.setLanguageResource()
    }

    public init(itemId,type){
        this.itemId = itemId;
        this.chanTypeLabel.string = type
    }
    setAqm() {
        this.app.showKeyBoard(this.AqmLabel,4);
    }
    onClick() {
        //按键音效
        this.app.loadMusic(1);
        //去掉输入中的空格
        var str = this.walletAddressInput.string.replace(/\s+/g,"");
        this.walletAddressInput.string = str;
        if(this.walletAddressInput.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('钱包地址不能为空!'))
        }else if(this.chanTypeLabel.string == ''|| this.chanTypeLabel.string == Language_pay.Lg.ChangeByText('请选择链类型')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('请选择链类型'))
        }else if(this.chanTypeLabel.string == "ERC20" && this.charCodeAddress(this.walletAddressInput.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('钱包地址不符合要求(42位16进制组合, 开头为0x), 请重新输入。'))
        }else if(this.chanTypeLabel.string == "TRC20" && this.charCodeTrc20(this.walletAddressInput.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('无效钱包地址'))
        } else{
            if(this.app.UrlData.package_id == 16 && this.AqmLabel.string == "点击输入"){
                this.app.showAlert("请输入安全码")
            }else{
                this.fetchBindAccountPay();
                this.node.removeFromParent();
            }
        }
    }
    selectClick(){
        // 需求修改 202109127 新增 USDT-TRC20 渠道
        // this.selectContent.active = !this.selectContent.active
    }
    selectItemClick(event){
        let eventlabel = event.target.getChildByName('label').getComponent(cc.Label).string
        this.chanTypeLabel.string = eventlabel
        this.selectContent.active = false
    }
    fetchBindAccountPay() {
        var url = `${this.app.UrlData.host}/api/payment_account/saveAccount`;
        let obj = {};
        if(this.app.UrlData.package_id == 16){
            obj = {
                wallet_addr:this.walletAddressInput.string,
                protocol:this.chanTypeLabel.string,
                password:this.AqmLabel.string
            };
        }else{
            obj = {
                wallet_addr:this.walletAddressInput.string,
                protocol:this.chanTypeLabel.string,
            };
        }
        let info = JSON.stringify(obj);
        let dataStr = ""
        if(this.app.UrlData.package_id == 16){
            dataStr = `user_id=${this.app.UrlData.user_id}&id=${this.itemId}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&type=${this.chanTypeLabel.string=="TRC20"?5:4}&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&password=${this.AqmLabel.string}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&id=${this.itemId}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&type=${this.chanTypeLabel.string=="TRC20"?5:4}&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        }
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let bankCom = cc.find('Canvas/Cash/Content/UsdtDh').getComponent('payUsdtDh');
                bankCom.fetchIndex();
                self.app.showAlert(Language_pay.Lg.ChangeByText('操作成功!'))
            }else{
                self.app.showAlert(response.msg == "密码错误！"?"安全码错误！":response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    removeSlef(){
        this.node.removeFromParent()
    }
    charCodeAddress(s){
        var ret = false;
        for(var i = 0;i<s.length;i++){//遍历每一个文本字符bai
            //只要包含中文,就返回true
            if(s.charCodeAt(i) >= 10000){
                ret = true
            }
        }
        if(s.charCodeAt(0)!= 48 || s.charCodeAt(1) != 120){
            //开头不是0x，返回true
            ret = true
        }
        if(s.length != 42){
            //长度不是42位，返回true
            ret = true
        }
        return ret
    }
    charCodeTrc20(s){
        var str = /^(T)?[a-zA-Z\d]{33}$/
        console.log("!str.test(s)",!str.test(s))
        return !str.test(s)
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let titleIcon= cc.find("Canvas/UsdtAccountAlert/Layout/titleIcon")
        let popup_usdt_frame= cc.find("Canvas/UsdtAccountAlert/Layout/content/popup_usdt_frame")
        let btn1= cc.find("Canvas/UsdtAccountAlert/Layout/btn1")
        let tishi= cc.find("Canvas/UsdtAccountAlert/Layout/tishi").getComponent(cc.Label)

        if(this.app.UrlData.package_id == 8||this.app.UrlData.package_id == 9 || this.app.UrlData.package_id == 12){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            this.app.loadIconLg(`${src}/font/txt_qbdz`,popup_usdt_frame.children[0])
            this.app.loadIconLg(`${src}/font/txt_llx`,popup_usdt_frame.children[1])
            this.app.loadIconLg(`${src}/font/title_usdt`,titleIcon)
        }else if(this.app.UrlData.package_id == 10){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            this.app.loadIconLg(`${src}/font/title_usdt`,titleIcon)
            this.app.loadIconLg(`${src}/font/txt_qbdz`,popup_usdt_frame.children[0])
            this.app.loadIconLg(`${src}/font/txt_llx`,popup_usdt_frame.children[1])
        }else if(this.app.UrlData.package_id == 15 ||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 16){
           
        }else{
            this.app.loadIconLg(`${src}/form/popup_usdt_frame`,popup_usdt_frame)
            this.app.loadIconLg(`${src}/btn/surecg`,btn1)
            this.app.loadIconLg(`${src}/font/title_usdt`,titleIcon)
        }

        this.walletAddressInput.placeholder = Language_pay.Lg.ChangeByText('请输入钱包地址')
        this.chanTypeLabel.string = Language_pay.Lg.ChangeByText('请选择链类型')
        tishi.string = Language_pay.Lg.ChangeByText('温馨提示：绑定钱包地址后无法自行修改！请仔细填写您的钱包地址信息，如有错误将会导致您无法收到货币。')
    }
}
