//充值导航

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Zfb : cc.Prefab = null;

    @property(cc.Prefab)
    Jisu : cc.Prefab = null;

    @property(cc.Prefab)
    Jisu2 : cc.Prefab = null;

    @property(cc.Prefab)
    RgDc : cc.Prefab = null;
    
    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;
    
    @property(cc.Node)
    tishi : cc.Node = null;

    @property(cc.Label)
    tishiLabel : cc.Label =null;
    @property
    text = null;
    app = null;

    public init(data,discount_rate){
        let src = Language_pay.Lg.getLgSrc()
        this.text=data.text;
        this.app.loadIcon(`${src}/menu/tishi`,this.tishi,97,55);
        let zi = cc.find( "zi" , this.node );

        if(this.text == '支付宝'){
            if(this.app.UrlData.package_id == 9 ){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "支付宝充值");  
            }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "支付宝充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "支付宝充值");  
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "支付宝充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "支付宝充值"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/zfbzf2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/zfbzf1`,currentIcon,44,44);
            }else{
                this.app.loadIcon(`${src}/menu/menu_alipay_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_alipay_2`,this.currentIcon,249,86);
            }
            let percent = 0
            discount_rate.alipay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '转账到银行卡'){
            if(this.app.UrlData.package_id == 9 ){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "转账到银行卡");  
            }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "转账到银行卡");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "转账到银行卡");  
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "转账到银行卡");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "转账到银行卡"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/yhkzz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/yhkzz1`,currentIcon,44,44);
            }else if(this.app.UrlData.package_id == 10){
                this.app.loadIcon(`${src}/menu/menu_tobank_1`,this.normalIcon,151,33);
                this.app.loadIcon(`${src}/menu/menu_tobank_2`,this.currentIcon,191,33);
            }else{
                this.app.loadIcon(`${src}/menu/menu_tobank_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_tobank_2`,this.currentIcon,249,86);
            }

            let percent = 0
            discount_rate.bankcard_transfer.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '银联扫码'){
            if(this.app.UrlData.package_id == 9){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银联扫码");  
            }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "银联扫码");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "银联扫码");  
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "银联扫码");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "银联扫码"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/yhkzz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/yhkzz1`,currentIcon,44,44);
            }else{
                this.app.loadIcon(`${src}/menu/menu_ylsm_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_ylsm_2`,this.currentIcon,249,86);
            }

            let percent = 0
            discount_rate.union_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '微信'){
            if(this.app.UrlData.package_id == 9 ){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "微信支付");  
            }else if(this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信支付");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信支付");  
            }else if(this.app.UrlData.package_id == 18){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信充值"); 
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信支付");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信支付"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/wxzf2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/wxzf1`,currentIcon,44,44);
            }else{
                this.app.loadIcon(`${src}/menu/menu_wxpay_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_wxpay_2`,this.currentIcon,249,86);
            }

            let percent = 0
            discount_rate.wechat_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '快捷支付'){
            if(this.app.UrlData.package_id == 9 ){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "快捷支付");  
            }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "快捷支付");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "快捷支付");  
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "快捷支付");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "快捷支付"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/yhkzz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/yhkzz1`,currentIcon,44,44);
            }else{
                this.app.loadIcon(`${src}/menu/menu_kuaijie_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_kuaijie_2`,this.currentIcon,249,86);
            }

            let percent = 0
            discount_rate.quick_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '网银支付'){
            if(this.app.UrlData.package_id == 9 ){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "网银支付");  
            }else if(this.app.UrlData.package_id == 15 ||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银支付");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银支付");  
            }else if(this.app.UrlData.package_id == 18){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银充值"); 
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银支付");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银支付"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/wyzz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/wyzz1`,currentIcon,44,44);
            }else{
                this.app.loadIcon(`${src}/menu/menu_unionpay_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_unionpay_2`,this.currentIcon,249,86);
            }

            let percent = 0
            discount_rate.bank_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '人工代充值'){
            if(this.app.UrlData.package_id == 9 ){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "专享快付");  
            }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "人工代充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "人工代充值"); 
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "人工代充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "人工代充值"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/wyzz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/wyzz1`,currentIcon,44,44);
            }else{
                this.app.loadIcon(`${src}/menu/menu_VIPpay_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_VIPpay_2`,this.currentIcon,249,86);
            }
            let percent = 0
            discount_rate.daichong.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == 'IM充值'){
            if(this.app.UrlData.package_id == 2){
                this.app.loadIcon(`${src}/menu/menu_rgpay_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_rgpay_2`,this.currentIcon,249,86);
            }else if(this.app.UrlData.package_id == 9 ){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "IM充值");  
            }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "IM充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "IM充值");  
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "IM充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "IM充值"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/wyzz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/wyzz1`,currentIcon,44,44);
            }else{
                this.app.loadIcon(`${src}/menu/menu_IMpay_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_IMpay_2`,this.currentIcon,249,86);
            }
            let percent = 0
            discount_rate.im_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == 'USDT'){
            let percent = 0
            if(this.app.UrlData.package_id == 9){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT钱包");  
            }else if(this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT钱包");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT钱包");  
            }else if(this.app.UrlData.package_id == 18){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT充值"); 
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT钱包");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT钱包"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/usdtcz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/usdtcz1`,currentIcon,44,44);
            }else
            {
                this.app.loadIcon(`${src}/menu/menu_usdt_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_usdt_2`,this.currentIcon,249,86);
            }
            discount_rate.usdt.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '极速充值'){
            let percent = 0
            if(this.app.UrlData.package_id == 9){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速充值");  
            }else if(this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
            }else if(this.app.UrlData.package_id == 18){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值"); 
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/jisu2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/jisu1`,currentIcon,44,44);
            }else
            {
                this.app.loadIcon(`${src}/menu/menu_jscz_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_jscz_2`,this.currentIcon,249,86);
            }
            discount_rate.usdt.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == "匹配充值"){
            let percent = 0
            if(this.app.UrlData.package_id == 9){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配充值");  
            }else if(this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值");  
            }else if(this.app.UrlData.package_id == 18){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值"); 
            }else if(this.app.UrlData.package_id == 16){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/menu_pipei1`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/menu_pipei2`,currentIcon,44,44);
            }else
            {
                this.app.loadIcon(`${src}/menu/menu_pipei1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_pipei2`,this.currentIcon,249,86);
            }
            discount_rate.usdt.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        } 
    }
    setTishiLabel(percent) {
        this.tishiLabel.string = `${percent * 100} %`;
        if (percent == 0){
            this.tishi.active = false
        }else{
            this.tishi.active = true
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.showAnimate()
    }
    showAnimate(){
        if(this.app.UrlData.package_id == 16){
            this.node.parent.children.forEach(e=>{
                let isChecked = e.getComponent(cc.Toggle).isChecked
                if (isChecked){
                    e.getChildByName("checkmark").active = true
                    e.getChildByName("Background").active = false
                }else{
                    e.getChildByName("checkmark").active = false
                    e.getChildByName("Background").active = true
                }
            })
        }
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.app.showLoading();
        this.showAnimate()
        if(this.text == '支付宝'){
            this.addContent('alipay')

        }else if(this.text == '转账到银行卡'){
            this.addContent('bankcard_transfer')
        }else if(this.text == '银联扫码'){
            this.addContent('union_pay')
        }else if(this.text == '微信'){
            this.addContent('wechat_pay')

        }else if(this.text == '快捷支付'){
            this.addContent('quick_pay')

        }else if(this.text == '网银支付'){
            this.addContent('bank_pay')
        }else if(this.text == '人工代充值'){
            this.addDc()
        }else if(this.text == 'IM充值'){
            this.addContent('im_pay')
        }else if(this.text == 'USDT'){
            this.addContent('digiccy')
        }else if(this.text == '极速充值'){
            this.addJisu()
        }else if(this.text == '匹配充值'){
            this.addJisu2()
        }
    }

    addContent(data){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.Zfb);
        node.getComponent('payZfb').init(data);
        content.removeAllChildren();
        content.addChild(node);
    }

    addDc(){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.RgDc);
        content.removeAllChildren();
        content.addChild(node);
    }

    addJisu(){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.Jisu);
        content.removeAllChildren();
        content.addChild(node);
    }
    addJisu2(){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.Jisu2);
        content.removeAllChildren();
        content.addChild(node);
    }
}
