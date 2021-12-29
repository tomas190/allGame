//充值渠道选择
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    currentlabel: cc.Label = null;

    @property(cc.Node)
    normalIcon: cc.Node = null;

    @property(cc.Node)
    currentIcon: cc.Node = null;

    @property(cc.Node)

    @property
    parentComponent = null;
    index = 0;
    channel = null;
    app= null;
    // LIFE-CYCLE CALLBACKS:
    public init(data){
        this.label.string = data.text;
        this.currentlabel.string = data.text;
        this.parentComponent = data.parentComponent;
        this.index = data.index;
        this.channel = data.channel;
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.UrlData.package_id == 16){
            if(data["handling_fee"]){
                let tip2 = this.node.getChildByName("tip2")
                tip2.active = true
                tip2.children[0].getComponent(cc.Label).string = `手续费${this.app.config.toDecimal1(data.handling_fee*100)}%`
                this.node.getChildByName("tip1").active = false
                this.node.getChildByName("area").getComponent(cc.Label).string = `小额 ${data.min_amount}-${data.max_amount}`
            }else if(data["min_amount"]){
                this.node.getChildByName("tip2").active = false
                this.node.getChildByName("tip1").active = true
                this.node.getChildByName("area").getComponent(cc.Label).string = `${data.min_amount}-${data.max_amount}`
            }else{
                this.node.getChildByName("tip2").active = false
                this.node.getChildByName("tip1").active = true
            }
            
        }
        if(this.channel == 'alipay' ){
            this.app.loadIcon('recharge/icon_alipay2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_alipay1',this.currentIcon,30,30)
        }else if(this.channel == 'union_pay'){
            this.app.loadIcon('recharge/icon_unionpay2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_unionpay1',this.currentIcon,30,30)
        }else if(this.channel == 'wechat_pay'){
            this.app.loadIcon('recharge/icon_wxpay2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_wxpay1',this.currentIcon,30,30)
        }else if(this.channel == 'bankcard_transfer'){
            this.app.loadIcon('recharge/icon_unionpay2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_unionpay1',this.currentIcon,30,30)
        }else if(this.channel == 'quick_pay'){
            this.app.loadIcon('recharge/icon_unionpay2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_unionpay1',this.currentIcon,30,30)
        }else if(this.channel == 'bank_pay'){
            this.app.loadIcon('recharge/icon_unionpay2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_unionpay1',this.currentIcon,30,30)
        }else if(this.channel =='im_pay'){
            this.app.loadIcon('recharge/icon_im2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_im1',this.currentIcon,30,30)
        }else if(this.channel =='digiccy'){
            this.app.loadIcon('recharge/icon_usdt2',this.normalIcon,30,30)
            this.app.loadIcon('recharge/icon_usdt1',this.currentIcon,30,30)
        }
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.taggleAnimate()
    }

    start () {

    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.parentComponent.current = this.parentComponent.results[this.index];
        this.parentComponent.initRender(this.index);
        this.taggleAnimate()
    }
    taggleAnimate(){
        this.node.parent.children.forEach(e=>{
            e.getChildByName("checkmark").active = false
            if(e.getComponent(cc.Toggle).isChecked){
                e.getChildByName("checkmark").active = true
            }
        })
    }
    // update (dt) {}
}
