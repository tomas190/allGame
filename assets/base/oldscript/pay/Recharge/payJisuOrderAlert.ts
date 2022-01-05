
import Config from "../payConfig"
import { Language_pay } from "./../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    bank_nameLabel: cc.Label = null;

    @property(cc.Label)
    card_numLabel: cc.Label = null;

    @property(cc.Label)
    card_nameLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    nickNameLabel: cc.Label = null;

    @property(cc.Label)
    remarkLabel : cc.Label = null;

    @property(cc.Prefab)
    publicAlert : cc.Prefab = null;

    @property(cc.Node)
    popWindowBG : cc.Node = null;

    @property(cc.Button)
    btn : cc.Button = null;

    @property
    public results = {};
    public token = null;
    public config = null;
    public UrlData : any = [];
    app : any= {};
    login_ip = '';
    order_id = ''//订单生成后返回的order_id
    callback = null // 充值历史传入
    public init(type,data,callback= ()=>{}){
        this.callback = callback
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        if(type ===1 ){
            this.popWindowBG.active=false;
            this.fetchOrder(data)
        }else{
            //充值历史里面打开订单，这时候已经有了订单号
            this.order_id = data.data.order_id
            if(data.data.status == 5){
                this.btn.interactable = false
            }
            this.initRender(data)
        }
        
    }
    
    fetchOrder(data){
        var url = `${this.app.UrlData.host}/api/payment/HighSpeedTransfer`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${data.amount}&channel_id=${data.channel_id}&pay_type=${data.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_type=${data.order_type}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${this.app.gHandler.app.deviceID}&payment_id=${data.payment_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.popWindowBG.active=true;
                self.initRender(response);
                this.order_id = response.data.order_id
            }else{
                self.app.showAlert(response.msg);
                self.removeSelf();
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    initRender(data){
        this.amountLabel.string = this.config.toDecimal(data.data.amount);
        this.bank_nameLabel.string = data.data.bank_name;
        this.card_nameLabel.string = data.data.card_name;
        this.card_numLabel.string = data.data.card_num;
        this.nickNameLabel.string = data.data.user_name;
        this.remarkLabel.string = data.data.remark;
    }
    onLoad () {
        this.config = new Config();
        this.UrlData = this.config.getUrlData();
        this.token = this.config.token;

        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
    copyCard_num(){
        //按键音效
        this.app.loadMusic(1);
        
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.card_numLabel.string)) {
                this.app.showAlert(`复制成功!:${this.card_numLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
       
    }
    copyCard_name(){
        //按键音效
        this.app.loadMusic(1);
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.card_nameLabel.string)) {
                this.app.showAlert(`复制成功!:${this.card_nameLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }
    copyAmount(){
        //按键音效
        this.app.loadMusic(1);

        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.amountLabel.string)) {
                this.app.showAlert(`复制成功!:${this.amountLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }

    copyBankName(){
        //按键音效
        this.app.loadMusic(1);
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.bank_nameLabel.string)) {
                this.app.showAlert(`复制成功!:${this.bank_nameLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }
    copyRemark(){
        //按键音效
        this.app.loadMusic(1);
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.remarkLabel.string)) {
                this.app.showAlert(`复制成功!:${this.remarkLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }
    
    removeSelf(){
        //按键音效
        this.app.loadMusic(1);

        this.node.removeFromParent()
    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        //确认付款
        this.btn.interactable = false;
        this.fetchconfirmHighSpeedTransferPay()
    }
    fetchconfirmHighSpeedTransferPay(){
        var url = `${this.app.UrlData.host}/api/payment/confirmHighSpeedTransferPay`;
        let dataStr = `order_id=${this.order_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert("确认付款成功！");
                //调用回调，更新充值历史数据
                self.callback()
                self.removeSelf();
            }else{
                self.app.showAlert(response.msg);
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public showAlert(data){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payPublicAlert').init(data)
    }
    // update (dt) {}
}
