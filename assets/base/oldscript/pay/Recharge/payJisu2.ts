
//充值子界面
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
import appGlobal = require("../../../../base/app/appGlobal");
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    huodongLabel: cc.Label = null;

    @property(cc.Prefab)
    SelectItem: cc.Prefab =null;

    @property(cc.Node)
    selectContent: cc.Node =null;

    @property(cc.Label)
    czArea: cc.Label = null;

    @property(cc.Label)
    wxtsLabel: cc.Label = null;

    @property
    showSelect = false;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Prefab)
    BindBankAccountTipAlert : cc.Prefab = null;

    @property(cc.Node)
    neikuagn : cc.Node = null;

    @property(cc.Prefab)
    btnNum : cc.Prefab = null;

    @property(cc.Prefab)
    JisuOrderAlert :cc.Prefab = null;

    @property(cc.Prefab)
    BeforePayOrderAlert :cc.Prefab = null;

    @property()
    public app  = null;
    public results : any = {};
    public current : any = {
        min_amount:0,
        max_amount:0
    };
    public channel  = 'alipay';
    conf_val = 0 // usdt充值汇率
    login_ip = ''
    IsBindBankAccount = false // 判断是否已经绑卡
    free_num = 0//免费次数
    handling_fee = 0//手续费
    first_min = 0//小额渠道显示的充值金额第一次
    second_min = 0//小额渠道显示的充值金额第二次
    handling_feeName = ""//需要显示手续费的渠道名
    game_gold = 0 // 余额
    showBaopeiTip = false
    payment_id = 1 // 极速充值payment_id
    amount_list = []//常用金额
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        //请求支付宝
        this.fetchZfb()
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        //聚鼎娱乐 新用户包赔活动判断
        if(this.app.UrlData.package_id == 15){
            this.fetchgetApplyReimburseInfo()
        }
        this.fetchAmounts()
        cc.systemEvent.on('closeRechargeHistory',this.fetchAmounts.bind(this))
    }
    setAmount() {
        this.app.showAlert("请点选充值金额")
    }
    public fetchZfb(){
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}`;
        let index = `0`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                let discount_rate = response.data.discount_rate
                self.results = response.data.pipei_pay;
                this.setDiscount_rate(discount_rate.jisu_recharge)
                //验证有没有绑卡
                this.fetchIndex()
                self.current = self.results[0];
                self.handling_feeName = self.results[0]
                self.radioList();
                self.initRender(0);
            }else{
                self.app.hideLoading()
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading()
        })
    }
    //充值匹配 - 查詢可用充值額度 (根據提現單決定 沒有回空陣列)
    public fetchAmounts(){
        var url = `${this.app.UrlData.host}/api/payment/jisu/amounts?user_id=${this.app.UrlData.user_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                //删除旧的选项
                this.neikuagn.removeAllChildren()
                this.amount_list = response.data
                console.log("更新常用金额",response.data,this.amount_list)
                if(response.data.length > 18){
                    response.data= response.data.slice(0,18)
                }
                response.data.forEach((e)=>{
                    var node = cc.instantiate(this.btnNum)
                    node.getComponent("payBtnNum").init(e,this.addGold.bind(this))
                    this.neikuagn.addChild(node)
                })
                
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    public fetchgetApplyReimburseInfo(){
        //          PRE环境 活动ID=140
        //          OL环境  活动ID=115
        let activity_id= 140
        if (appGlobal.huanjin == 'online'){
            activity_id = 115
        }
        console.log("appGlobal.huanjin",appGlobal.huanjin)
        var url = `${this.app.UrlData.host}/api/activity/getApplyReimburseInfo?user_id=${this.app.UrlData.user_id}&activity_id=${activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                //申请了，未领取 ,余额大于限制金额
                let data = response.data
                if(data.config.is_close == "2" && !data.is_received && data.is_withdraw == 0 && data.is_apply && data.first_pay_amount > 100 && (this.game_gold < 10 || this.game_gold >= data.max_withdraw_amount  )){
                    this.showBaopeiTip = true
                }else{
                    this.showBaopeiTip = false
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    setDiscount_rate(discount_rate_item) {
        let percent = 0
        let minAmount = 0
        let maxAmount = 0
        discount_rate_item.forEach( (e,i) => {
            if(e.package_id == this.app.UrlData.package_id) {
                percent = e.interval[0].percent
                minAmount = e.interval[0].min
                maxAmount = e.interval[0].max
            }
        });
        if(percent >0){
            this.wxtsLabel.string = `${this.wxtsLabel.string}${Language_pay.Lg.ChangeByText("充值优惠")}: ${Language_pay.Lg.ChangeByText('充值')}${minAmount}-${maxAmount},${Language_pay.Lg.ChangeByText('赠送')} ${percent*100}%,`
        }
    }
    public initRender(index){
        //根据选择的index不同，选择对应的渠道
        if(this.results[index].rate != "" && this.results[index].rate !="0.0000"){
            let rate = {}
            try{
                rate = JSON.parse(this.results[index].rate)
            }catch(err){
                console.log("err",err,"rate",this.results[index])
            }
            //当rate不为空时要根据渠道id判断是否需要显示
            let packageArr= []
            for(let k in rate){
                packageArr.push(Number(k))
            }
            if(packageArr.indexOf(this.app.UrlData.package_id)>-1){
                this.free_num = rate[this.app.UrlData.package_id].free_num
                this.handling_fee = rate[this.app.UrlData.package_id].handling_fee
                this.first_min = rate[this.app.UrlData.package_id].first_min
                this.second_min = rate[this.app.UrlData.package_id].second_min
                this.handling_feeName = this.results[index].name
            }
        }
        this.czArea.string = `${Language_pay.Lg.ChangeByText('充值范围')}:(${this.current.min_amount}-${this.current.max_amount})`
    }
    public deleteAmount(){
        this.amountLabel.string = '';
        this.app.setInputColor("sum",this.amountLabel);
    }

    //确认充值按钮回调
    public onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.DelayBtn()
        if(this.showBaopeiTip){
            this.app.showAlert("您正在参加新用户包赔活动, 为了避免造成不必要的损失, 请您完成新用户包赔活动再进行充值（领取包赔金或兑换过即视为完成活动）！") 
            return
        }
        if((this.channel == 'bankcard_transfer' || this.channel =="bank_pay" )&& !this.IsBindBankAccount){
            this.showBindBankAccountTip()
            return
        }
        if(this.amountLabel.string == ''){
            this.app.showAlert('充值金额不能为空!')
        }else{
            this.fetchpaymentjisulist()
        }
    }
    
    DelayBtn(){
        let czgoldbt1= cc.find("Canvas/Recharge/Content/Jisu/czgoldbt1").getComponent(cc.Button)
        czgoldbt1.interactable = false
        this.scheduleOnce(()=>{
            czgoldbt1.interactable = true
        },1)
    }
    fetchOrder(){
        let data = {
            amount:this.amountLabel.string,
            channel_id:this.current.channel_id,
            pay_type:this.current.pay_type,
            order_type:1,
            payment_id:this.payment_id
        };
        this.showJisuOrderAlert(1,data);
    }
    /**
     * 显示订单弹窗
     * @param type 
     * @param data 
     */
    public showJisuOrderAlert(type,data,beforePay = true){
        var node = null
        var beforePayOrder = null
        node = cc.instantiate(this.JisuOrderAlert);
        beforePayOrder = cc.instantiate(this.BeforePayOrderAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/JisuOrderAlert")){
            canvas.addChild(node);
        }
        //弹出提示确认框
        if(beforePay){
             //检测是否已存在弹窗，避免重复显示
            if(!cc.find("Canvas/BeforePayOrderAlert")){
                canvas.addChild(beforePayOrder);
            }
        }
        node.getComponent('payJisuOrderAlert2').init(type,data)
    }
    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            let show = false
            let package_ids = this.results[i].package_ids.split(",")
            package_ids.forEach(e=>{
                if(Number(e) == this.app.UrlData.package_id){
                    show = true
                }
            })
            console.log("this.results[i]",this.results[i])
            if(show){
                if(this.results[i].rate != "" && this.results[i].rate !="0.0000"){
                    let rate = {}
                    try{
                        rate = JSON.parse(this.results[i].rate)
                    }catch(err){
                        console.log("err",err,"rate",this.results[i])
                    }
                    //当rate不为空时要根据渠道id判断是否需要显示
                    let packageArr= []
                    for(let k in rate){
                        packageArr.push(Number(k))
                    }
                    if(packageArr.indexOf(this.app.UrlData.package_id)>-1){
                        var node = cc.instantiate(this.SelectItem);
                        this.selectContent.addChild(node);
                        node.getComponent('paySelectItem').init({
                            text:this.results[i].name,
                            parentComponent:this,
                            index:i,
                            channel:this.channel,
                            min_amount:this.current.min_amount,
                            max_amount:this.current.max_amount,
                            handling_fee:rate[this.app.UrlData.package_id].handling_fee,
                        })
                    }
                }else{
                    var node = cc.instantiate(this.SelectItem);
                    this.selectContent.addChild(node);
                    node.getComponent('paySelectItem').init({
                        text:this.results[i].name,
                        parentComponent:this,
                        index:i,
                        channel:this.channel,
                        min_amount:this.current.min_amount,
                        max_amount:this.current.max_amount,
                    })
                }
            }
        }
    }
    addGold(e,payment_id){
        //按键音效
        this.app.loadMusic(1);
        var string = e.currentTarget.children[1].getComponent(cc.Label).string;
        let amount = this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入') ? '0': this.amountLabel.string;
        var sum = Number(amount)+Number(string);
        this.amountLabel.string = string;
        this.app.setInputColor(sum,this.amountLabel);
        this.payment_id = payment_id
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let bankData = [];
                let data = response.data;
                for(let i = 0 ;i < data.list.length ;i++){
                    let data = response.data.list[i];
                    if (data.type == 3){
                        bankData.push(data)
                    }
                }
                if(bankData.length == 0){
                    //提示绑卡
                    this.showBindBankAccountTip()
                }else{
                    this.IsBindBankAccount =true
                }
                this.game_gold = response.data.game_gold
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            this.app.hideLoading();
        })
    }
    //取得訂單
    public fetchpaymentjisulist(){
        var url = `${this.app.UrlData.host}/api/payment/jisu/list`;
        let dataStr=`user_id=${this.app.UrlData.user_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if (response.data.length == 0){
                    this.fetchOrder()
                }else{
                    this.app.showAlert("请先完成上一笔充值!")
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    showBindBankAccountTip(){
        let canvas = cc.find("Canvas")
        let node = null
        node = cc.instantiate(this.BindBankAccountTipAlert)
        node.getComponent("payBindBankAccountTipAlert").init(this)
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/BindBankAccountTipAlert")){
            canvas.addChild(node);
        }
    }
    //显示弹窗
    showAccountAlert(){
        this.app.showBankAccountAlert({
            text: '设置银行卡',
            action:"add",
            itemId:null,
            parentComponent:this,
            changeData:false
        });
    }
    //渠道16显示绑卡
    showAccountAlert_16(){
        this.node.getChildByName("bindBankAccount").active = true
        this.node.getChildByName("Bank").active = false
        if(this.node.name == "Jisu"){
            this.node.getChildByName("zi").active = false
        }
        this.node.getComponent("payBankAccountAlert").init({
            text:'设置银行卡',
            action:"add",
            itemId:null,
            parentComponent:this,
            //修改界面初始数据
            changeData:false
        })
    }
    onDestroy(){
        cc.systemEvent.off('closeRechargeHistory')
    }
}
