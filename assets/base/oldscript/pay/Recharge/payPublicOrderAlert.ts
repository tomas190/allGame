
import Config from "../payConfig"
import { Language_pay } from "./../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    helpAlert: cc.Prefab = null;

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

    @property
    public results = {};
    public token = null;
    public config = null;
    public UrlData : any = [];
    app : any= {};
    login_ip = ''
    public init(type,data){
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        console.log(type,data)
        if(type ===1 ){
            this.popWindowBG.active=false;
            this.fetchOrder(data)
        }else{
            this.initRender(data)
        }
    }
    
    fetchOrder(data){
        var url = `${this.app.UrlData.host}/api/payment/bankCardTransfer`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${data.amount}&channel_id=${data.channel_id}&pay_type=${data.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_type=${data.order_type}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${this.app.gHandler.app.deviceID}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.popWindowBG.active=true;
                self.initRender(response);
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
        this.setLanguageResource()
        this.blinkFun()
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

        var node = cc.instantiate(this.helpAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
    }

    public showAlert(data){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payPublicAlert').init(data)
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let title_orderinfo= cc.find("Canvas/PublicOrderAlert/Content/title_orderinfo")
        let txt_chongzhifangshi= cc.find("Canvas/PublicOrderAlert/Content/group/group1/txt_chongzhifangshi")
        let txt_shoukuanyinhang= cc.find("Canvas/PublicOrderAlert/Content/group/group1/txt_shoukuanyinhang")
        let txt_shoukuanzhanghao= cc.find("Canvas/PublicOrderAlert/Content/group/group1/txt_shoukuanzhanghao")
        let txt_shoukuanxingming= cc.find("Canvas/PublicOrderAlert/Content/group/group1/txt_shoukuanxingming")
        let txt_zhuanzhuangjie= cc.find("Canvas/PublicOrderAlert/Content/group/group1/txt_zhuanzhuangjie")
        let txt_beizhu2= cc.find("Canvas/PublicOrderAlert/Content/group/group1/txt_beizhu2")
        let yhkzzLabel= cc.find("Canvas/PublicOrderAlert/Content/group/group2/yhkzz").getComponent(cc.Label)
        let txt_playername= cc.find("Canvas/PublicOrderAlert/Content/group/txt_playername")
        let btn_fuzhi1=cc.find("Canvas/PublicOrderAlert/Content/group/btn_fuzhi1")
        let btn_fuzhi2= cc.find("Canvas/PublicOrderAlert/Content/group/btn_fuzhi2")
        let btn_fuzhi3= cc.find("Canvas/PublicOrderAlert/Content/group/btn_fuzhi3")
        let btn_fuzhi4= cc.find("Canvas/PublicOrderAlert/Content/group/btn_fuzhi4")
        let btn_fuzhi5= cc.find("Canvas/PublicOrderAlert/Content/group/btn_fuzhi5")
        let attention= cc.find("Canvas/PublicOrderAlert/Content/attention").getComponent(cc.Label)
        let label1= cc.find("Canvas/PublicOrderAlert/Content/label1").getComponent(cc.Label)
        let label2= cc.find("Canvas/PublicOrderAlert/Content/label2").getComponent(cc.Label)
        let label3= cc.find("Canvas/PublicOrderAlert/Content/label3").getComponent(cc.Label)
        let jineTip= cc.find("Canvas/PublicOrderAlert/Content/group/group2/jineTip").getComponent(cc.Label)
        let btn1= cc.find("Canvas/PublicOrderAlert/Content/btn1")
        if(this.app.UrlData.package_id == 10 ){
            title_orderinfo.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("订单信息")
            txt_chongzhifangshi.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("充值方式:")
            txt_shoukuanyinhang.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("收款银行:")
            txt_shoukuanzhanghao.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("收款账号:")
            txt_shoukuanxingming.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("收款姓名:")
            txt_zhuanzhuangjie.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("收款金额:")
            txt_playername.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("用户昵称:")
            btn1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('如何充值')
        }else if(this.app.UrlData.package_id == 9){
            this.app.loadIconLg(`${src}/font/title_orderinfo`,title_orderinfo)
            this.app.loadIconLg(`${src}/font/txt_chongzhifangshi`,txt_chongzhifangshi)
            this.app.loadIconLg(`${src}/font/txt_shoukuanyinhang`,txt_shoukuanyinhang)
            this.app.loadIconLg(`${src}/font/txt_shoukuanzhanghao`,txt_shoukuanzhanghao)
            this.app.loadIconLg(`${src}/font/txt_shoukuanxingming`,txt_shoukuanxingming)
            this.app.loadIconLg(`${src}/font/txt_zhuanzhuangjie`,txt_zhuanzhuangjie)
            this.app.loadIconLg(`${src}/font/txt_beizhu2`,txt_beizhu2)
            this.app.loadIconLg(`${src}/font/txt_playername`,txt_playername)
            btn1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('如何充值')
        }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18  || this.app.UrlData.package_id == 16||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){

        }else{
            this.app.loadIconLg(`${src}/font/title_orderinfo`,title_orderinfo)
            this.app.loadIconLg(`${src}/font/txt_chongzhifangshi`,txt_chongzhifangshi)
            this.app.loadIconLg(`${src}/font/txt_shoukuanyinhang`,txt_shoukuanyinhang)
            this.app.loadIconLg(`${src}/font/txt_shoukuanzhanghao`,txt_shoukuanzhanghao)
            this.app.loadIconLg(`${src}/font/txt_shoukuanxingming`,txt_shoukuanxingming)
            this.app.loadIconLg(`${src}/font/txt_zhuanzhuangjie`,txt_zhuanzhuangjie)
            this.app.loadIconLg(`${src}/font/txt_beizhu2`,txt_beizhu2)
            this.app.loadIconLg(`${src}/font/txt_playername`,txt_playername)
            this.app.loadIconLg(`${src}/btn/btn_how`,btn1)
        }
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 10 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22 || this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18|| this.app.UrlData.package_id == 16||this.app.UrlData.package_id == 20){
            btn_fuzhi1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
            btn_fuzhi2.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
            btn_fuzhi3.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
            btn_fuzhi4.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
            btn_fuzhi5.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
        }else{
            this.app.loadIconLg(`${src}/btn/btn_fuzhi`,btn_fuzhi1)
            this.app.loadIconLg(`${src}/btn/btn_fuzhi`,btn_fuzhi2)
            this.app.loadIconLg(`${src}/btn/btn_fuzhi`,btn_fuzhi3)
            this.app.loadIconLg(`${src}/btn/btn_fuzhi`,btn_fuzhi4)
            this.app.loadIconLg(`${src}/btn/btn_fuzhi`,btn_fuzhi5)
        }
        
        
        attention.string = `${Language_pay.Lg.ChangeByText('特别提醒:')}`
        yhkzzLabel.string = `${Language_pay.Lg.ChangeByText('银行卡转账')}`
        jineTip.string = `${Language_pay.Lg.ChangeByText('(转账的金额请确保完全一致)')}`
        label1.string = `${Language_pay.Lg.ChangeByText('1.请使用与绑定银行卡相同账户名的账户进行支付。')}`
        label2.string = `${Language_pay.Lg.ChangeByText('2.转账的金额必须和订单上的收款金额完全一致，包括小数点。')}`
        label3.string = `${Language_pay.Lg.ChangeByText('3.单笔订单有效时间为30分钟，正常付款1-5分钟内到账， 未到账请联系客服。')}`
    }
    blinkFun(){
        let label1Node = cc.find("Canvas/PublicOrderAlert/Content/label1")
        let label2Node = cc.find("Canvas/PublicOrderAlert/Content/label2")
        label1Node.stopAllActions()
        label2Node.stopAllActions()
        var action1 = cc.tintTo(0.2, 255, 212, 105);
        var action2 = cc.tintTo(0.2, 229, 49, 20);
        var action3 = cc.tintTo(0.2, 255, 212, 105);
        var action4 = cc.tintTo(0.2, 229, 49, 20);
        label1Node.runAction(cc.sequence(action1,action2).repeatForever())
        label2Node.runAction(cc.sequence(action3,action4).repeatForever())
    }
    // update (dt) {}
}
