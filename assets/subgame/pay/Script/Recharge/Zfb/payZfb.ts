import gHandler = require("../../../../../common/script/common/gHandler");
//充值子界面
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    huodongLabel: cc.Label = null;

    @property(cc.Prefab)
    SelectItem: cc.Prefab =null;

    @property(cc.Node)
    selectContent: cc.Node =null;

    @property(cc.Label)
    gold1: cc.Label =null;

    @property(cc.Label)
    gold2: cc.Label =null;

    @property(cc.Label)
    gold3: cc.Label =null;

    @property(cc.Label)
    gold4: cc.Label =null;

    @property(cc.Label)
    gold5: cc.Label =null;

    @property(cc.Label)
    gold6: cc.Label =null;


    @property(cc.Label)
    czArea: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    iconFont: cc.Node = null;

    @property(cc.Label)
    wxtsLabel: cc.Label = null;

    @property
    showSelect = false;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Node)
    shuiyin: cc.Node = null;

    @property()
    public app  = null;
    public results : any = {};
    public current : any = {};
    public channel  = 'alipay';

    onLoad () {
        this.huodongLabel.node.active=false;
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        //请求支付宝
        this.fetchZfb()
    }
    init(data){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.channel = data;
        if(this.channel == 'alipay' ){
            this.app.loadIcon('recharge/flag_alipay',this.icon,100,100)
            this.app.loadIcon('recharge/flagname_alipay',this.iconFont,126,45)
            this.wxtsLabel.string = '温馨提示: 1.充值比例1元=1金币。2.需要安装支付宝。'
            this.app.loadIcon('recharge/subbg_alipay',this.shuiyin,368,270)
        }else if(this.channel == 'union_pay'){
            this.app.loadIcon('recharge/flag_scan_code_unionpay',this.icon,127,86)
            this.app.loadIcon('recharge/flagname_scan_code_unionpay',this.iconFont,168,45)
            this.wxtsLabel.string = '温馨提示: 1.充值比例1元=1金币。'
        }else if(this.channel == 'wechat_pay'){
            this.app.loadIcon('recharge/flag_wxpay',this.icon,100,100)
            this.app.loadIcon('recharge/flagname_wxpay',this.iconFont,84,45)
            this.wxtsLabel.string = '温馨提示: 1.充值比例1元=1金币。2.需要安装微信。';
            this.app.loadIcon('recharge/subbg_wxpay',this.shuiyin,368,270)
        }else if(this.channel == 'bankcard_transfer'){
            this.app.loadIcon('recharge/flag_scan_code_unionpay',this.icon,127,86)
            this.app.loadIcon('recharge/flagname_unionpay3',this.iconFont,252,45)
            this.wxtsLabel.string = '温馨提示: 1.充值比例1元=1金币。'
        }else if(this.channel == 'quick_pay'){
            this.app.loadIcon('recharge/flag_scan_code_unionpay',this.icon,127,86)
            this.app.loadIcon('recharge/flagname_unionpay2',this.iconFont,168,45)
            this.wxtsLabel.string = '温馨提示: 1.充值比例1元=1金币。'
        }else if(this.channel == 'bank_pay'){
            this.app.loadIcon('recharge/flag_scan_code_unionpay',this.icon,127,86)
            this.app.loadIcon('recharge/flagname_unionpay',this.iconFont,168,45)
            this.wxtsLabel.string = '温馨提示: 1.充值比例1元=1金币。'
        }else if(this.channel =='im_pay'){
            this.app.loadIcon('recharge/icon_im',this.icon,100,100)
            this.app.loadIcon('recharge/title_im',this.iconFont,136,45)
            this.wxtsLabel.string = '温馨提示: 1.充值比例1元=1金币。'
        }
    }
    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }

    public fetchZfb(){
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&version=${this.app.version}`;
        let index = `${this.app.UrlData.package_id -1 }`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                let discount_rate = response.data.discount_rate
                if(self.channel == 'alipay' ){
                    self.results = response.data.alipay;
                    let interval = discount_rate.alipay[index].interval
                    this.setInterval(interval)
                }else if(self.channel == 'union_pay'){
                    self.results = response.data.union_pay;

                    let interval = discount_rate.union_pay[index].interval
                    this.setInterval(interval)
                }else if(self.channel == 'wechat_pay'){
                    self.results = response.data.wechat_pay;

                    let interval = discount_rate.wechat_pay[index].interval
                    this.setInterval(interval)
                }else if(self.channel == 'bankcard_transfer'){
                    self.results = response.data.bankcard_transfer;
                    // self.huodongLabel.node.active=true;

                    let interval = discount_rate.bankcard_transfer[index].interval
                    this.setInterval(interval)
                }else if(self.channel == 'quick_pay'){
                    self.results = response.data.quick_pay;
                    let interval = discount_rate.quick_pay[index].interval
                    this.setInterval(interval)
                }else if(self.channel == 'bank_pay'){
                    self.results = response.data.bank_pay;
                    let interval = discount_rate.bank_pay[index].interval
                    this.setInterval(interval)
                }else if(self.channel =='im_pay'){
                    self.results = response.data.im_pay;
                    let interval = discount_rate.im_pay[index].interval
                    this.setInterval(interval)
                }
                self.current = self.results[0];
                self.radioList();
                self.initRender();
            }else{
                self.app.hideLoading()
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.app.hideLoading()
        })
    }
    setInterval(interval) {
        if(interval[0].percent >0){
            this.wxtsLabel.string = `${this.wxtsLabel.string}充值优惠: 充值${interval[0].min}-${interval[0].max},赠送 ${interval[0].percent*100}%,`
        }
        if(interval[1].percent >0){
            this.wxtsLabel.string = `${this.wxtsLabel.string}充值${interval[1].min}-${interval[1].max}，赠送 ${interval[1].percent*100}%`
        }
    }
    public initRender(){
        var span_amount = this.current.span_amount.split(',');
        this.czArea.string = `充值范围:(${this.current.min_amount}-${this.current.max_amount})`
        this.gold1.string = span_amount[0]?span_amount[0]:'10';
        this.gold2.string = span_amount[1]?span_amount[1]:'50';
        this.gold3.string = span_amount[2]?span_amount[2]:'100';
        this.gold4.string = span_amount[3]?span_amount[3]:'500';
        this.gold5.string = span_amount[4]?span_amount[4]:'1000';
        this.gold6.string = span_amount[5]?span_amount[5]:'5000';
    }

    public deleteAmount(){
        
        this.amountLabel.string = '点击输入';
        this.app.setInputColor('',this.amountLabel);
    }

    //确认充值按钮回调
    public onClick(){
        //按键音效
        this.app.clickClip.play();
        var amount = Number(this.amountLabel.string);
        var min_amount = Number(this.current.min_amount);
        var max_amount = Number(this.current.max_amount);
        if(this.amountLabel.string =='点击输入'){
            this.app.showAlert('充值金额不能为空!')
        }else if(amount < min_amount || amount > max_amount){
            this.app.showAlert('不符合充值范围！')
        }else{
            if(this.channel == 'bankcard_transfer'){
                this.fetchOrder();
            }else if(this.channel == 'im_pay'){
                this.showPayIM()
            }else{
                var url = `${this.app.UrlData.host}/api/payment/payment?user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&payment_amount=${this.amountLabel.string}&channel_type=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
                cc.sys.openURL(encodeURI(url))
                cc.log(encodeURI(url))
            }
        }
    }

    showPayIM(){
        var url = `${this.app.UrlData.host}/api/payment/payment?user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&payment_amount=${this.amountLabel.string}&channel_type=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
        cc.find('payGlobal').getComponent('payGlobal').imWebViewUrl = encodeURI(url)
        cc.director.preloadScene("payIM",()=>{
            gHandler.Reflect.setOrientation("portrait", 640, 1136)
            cc.director.loadScene('payIM')
        })
    }

    fetchOrder(){
        let data = {
            amount:this.amountLabel.string,
            channel_id:this.current.channel_id,
            pay_type:this.current.pay_type,
            order_type:1
        };
        this.app.showOrderAlert(1,data);
    }

    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            var node = cc.instantiate(this.SelectItem);
            this.selectContent.addChild(node);
            node.getComponent('paySelectItem').init({
                text:this.results[i].name,
                parentComponent:this,
                index:i,
                channel:this.channel
            })
        }
    }


    addGold(e){
        //按键音效
        this.app.clickClip.play();
        var string = e.currentTarget.children[1].getComponent(cc.Label).string;
        let amount = this.amountLabel.string =='点击输入' ? '0': this.amountLabel.string;
        var sum = Number(amount)+Number(string);
        this.amountLabel.string = `${sum}`;
        this.app.setInputColor(sum,this.amountLabel);
    }
    // update (dt) {}
}
