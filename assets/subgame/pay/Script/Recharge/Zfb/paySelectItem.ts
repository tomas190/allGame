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
        }
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    start () {

    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        this.parentComponent.current = this.parentComponent.results[this.index];
        this.parentComponent.initRender(this.index);
    }
    // update (dt) {}
}
