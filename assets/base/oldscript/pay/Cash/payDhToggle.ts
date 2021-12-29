//兑换导航
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Prefab)
    Dh : cc.Prefab = null;

    @property(cc.Prefab)
    BankDh : cc.Prefab = null;

    @property(cc.Prefab)
    RgDh : cc.Prefab = null;

    @property(cc.Prefab)
    DhHistory : cc.Prefab = null;
    
    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;

    @property(cc.Prefab)
    UsdtDh : cc.Prefab = null;

    @property(cc.Node)
    tishi : cc.Node = null;

    @property(cc.Label)
    tishiLabel : cc.Label =null;

    @property(cc.Prefab)
    BankCardManage :cc.Prefab = null;

    @property
    app= null;
    text = null;

    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.text=data.text;
        if( cc.isValid(this.tishi ) )
        {
            this.app.loadIcon(`${src}/menu/tishi`,this.tishi,97,55);
        }    
        if(this.app.UrlData.package_id == 9){
            let zi = cc.find( "zi" , this.node );
            if( cc.isValid( zi ) )
            {
                if(this.text == '支付宝兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "支付宝");
                }else if(this.text == '银行卡兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                    // this.setTishiLabel(0.02);
                }else if(this.text == '人工兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "人工兑换");
                }else if(this.text == '兑换记录'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "兑换记录");
                }else if(this.text == 'USDT兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT钱包");
                }
            }
        }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18|| this.app.UrlData.package_id == 20){
            if(this.text == '支付宝兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "支付宝");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "支付宝");
            }else if(this.text == '银行卡兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                // this.setTishiLabel(0.02);
            }else if(this.text == '人工兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "人工兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "人工兑换");
            }else if(this.text == '兑换记录'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "兑换记录");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "兑换记录");
            }else if(this.text == 'USDT兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT钱包");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT钱包");
            }
        }else if(this.app.UrlData.package_id == 16){
            if(this.text == '银行卡兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/tixiandaoyinhj2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/tixiandaoyinhj`,currentIcon,44,44);
            }else if(this.text == '银行卡管理'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡管理");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡管理");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/yinhangkaguanli`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/yinhangkaguanli2`,currentIcon,44,44);
            }else if(this.text == 'USDT兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT兑换");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/usdtcz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/usdtcz1`,currentIcon,44,44);
            }else{
                this.node.removeFromParent()
            }
        }else{
            if(this.text == '支付宝兑换'){
                this.app.loadIcon(`${src}/menu/menu_ali_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_ali_2`,this.currentIcon,249,86);  
            }else if(this.text == '银行卡兑换'){
                this.app.loadIcon(`${src}/menu/menu_union_2`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_union_1`,this.currentIcon,249,86)
            }else if(this.text == '人工兑换'){
                this.app.loadIcon(`${src}/menu/menu_rengong_1`,this.normalIcon,207,39)
                this.app.loadIcon(`${src}/menu/menu_rengong_2`,this.currentIcon,249,86)
            }else if(this.text == '兑换记录'){
                this.app.loadIcon(`${src}/menu/menu_dhhistory_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_dhhistory_2`,this.currentIcon,249,86)
            }else if(this.text == 'USDT兑换'){
                this.app.loadIcon(`${src}/menu/menu_usdtQb_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_usdtQb_2`,this.currentIcon,249,86)
            }
        }
    }

    setTishiLabel(percent) {
        cc.log("payDhToggle" , this.text , ' percent=',percent);
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
        if(this.text == '支付宝兑换'){
            this.addContent('Dh');
        }else if(this.text == '银行卡兑换'){
            this.addContent('BankDh');
        }else if(this.text == '人工兑换'){
            this.addContent('RgDh');
        }else if(this.text == '兑换记录'){
            this.addContent('DhHistory');
        }else if(this.text == 'USDT兑换'){
            this.addContent('USDT');
        }else if(this.text == "银行卡管理"){
            this.addContent("BankCardManage")
        }
    }

    addContent(data){
        var content = cc.find('Canvas/Cash/Content');
        if(data == 'Dh'){
            var node = cc.instantiate(this.Dh);
        }else if(data == 'BankDh'){
            var node = cc.instantiate(this.BankDh);
        }else if(data == 'RgDh'){
            var node = cc.instantiate(this.RgDh);
        }else if(data == 'DhHistory'){
            var node = cc.instantiate(this.DhHistory);
        }else if(data == 'USDT'){
            var node = cc.instantiate(this.UsdtDh);
        }else if(data == 'BankCardManage'){
            var node = cc.instantiate(this.BankCardManage);
        }
        content.removeAllChildren();
        content.addChild(node);
    }
    // update (dt) {}
}
