//兑换导航
const {ccclass, property} = cc._decorator;

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

    @property
    app= null;
    text = null;

    public init(data){
        this.text=data.text;
        if(this.text == '支付宝兑换'){
            this.app.loadIcon('cash/menu/menu_ali_1',this.normalIcon,242,86)
            this.app.loadIcon('cash/menu/menu_ali_2',this.currentIcon,249,86);

        }else if(this.text == '银行卡兑换'){
            this.app.loadIcon('cash/menu/menu_union_2',this.normalIcon,242,86)
            this.app.loadIcon('cash/menu/menu_union_1',this.currentIcon,249,86)
        }else if(this.text == '人工兑换'){
            this.app.loadIcon('cash/menu/menu_rengong_1',this.normalIcon,207,39)
            this.app.loadIcon('cash/menu/menu_rengong_2',this.currentIcon,249,86)
        }else if(this.text == '兑换记录'){
            this.app.loadIcon('cash/menu/menu_dhhistory_1',this.normalIcon,242,86)
            this.app.loadIcon('cash/menu/menu_dhhistory_2',this.currentIcon,249,86)
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        this.app.showLoading();
        if(this.text == '支付宝兑换'){
            this.addContent('Dh')
        }else if(this.text == '银行卡兑换'){
            this.addContent('BankDh')
        }else if(this.text == '人工兑换'){
            this.addContent('RgDh')
        }else if(this.text == '兑换记录'){
            this.addContent('DhHistory')
        }
    }

    addContent(data){
        var content = cc.find('Canvas/Cash/Content');
        let scalex = cc.winSize.width / 1334;
        if(data == 'Dh'){
            var node = cc.instantiate(this.Dh);
            content.scaleY = 1;
        }else if(data == 'BankDh'){
            var node = cc.instantiate(this.BankDh);
            content.scaleY = 1;
        }else if(data == 'RgDh'){
            var node = cc.instantiate(this.RgDh);
            content.scaleY = 1;
        }else if(data == 'DhHistory'){
            var node = cc.instantiate(this.DhHistory);
            content.scaleY = 1/scalex;
        }
        
        content.removeAllChildren();
        content.addChild(node);
    }
    // update (dt) {}
}
