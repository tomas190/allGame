
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    publicAlert : cc.Prefab = null;

    @property(cc.Prefab)
    SelectItem : cc.Prefab =null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    czArea: cc.Label = null;
    @property(cc.Label)
    accountLabel: cc.Label = null;

    @property(cc.Node)
    accountBtn: cc.Node = null;

    @property(cc.Node)
    selectContent :cc.Node = null;

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Prefab)
    CashAlert: cc.Prefab = null;

    @property(cc.Node)
    DhBtn: cc.Node = null;

    @property(cc.Node)
    JsQrAlert: cc.Node = null;

    @property(cc.Node)
    JsTimeOutAlert: cc.Node = null;

    @property(cc.Label)
    timerLabel: cc.Label = null;

    @property(cc.Node)
    hongliGroup:cc.Node = null;

    @property(cc.Label)
    depostLabel:cc.Label = null;

    @property(cc.Label)
    boundsLabel:cc.Label = null;

    @property
    public data : any = {};
    public showSelect = false;
    public results= null ;
    public current = {channel_name: "银行卡1",
        channel_type: "2",
        max_amount: "40000",
        min_amount: "1"};
    //当前选择的银行卡信息
    public Info = {
        bank_name:'',
        branch_name:'',
        card_name:'',
        card_num:'',
        bank_province:'',
        bank_city:''
    };
    public bankData = [];
    public showBankSelect = false;
    public bankId = null;
    public action = 'add';
    app = null;
    timer = null;
    depostFee = 0.02 //保证金费率 
    depost = 0 //保证金
    order_id = ''//未完成的order_id
    countdown = 0 //倒计时
    withdraw_bonus = {}
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
        
        this.fetchgetHighSpeedWithdrawOrder()
        this.fetchgetHighSpeedWithdrawCountDown()
        this.fetchgetHighSpeedWithdrawSecurityRate()
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1,this.setDepostLabel.bind(this));
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                self.data = response;
                self.init();
                self.initRender();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    // 取得兑换确认倒数时间+獎勵%數
    public fetchgetHighSpeedWithdrawCountDown(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawCountDown?`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                this.withdraw_bonus = response.data.withdraw_bonus
                this.hongliGroup.children[0].getComponent(cc.Label).string  = `加赠红利${this.withdraw_bonus[5]*100}%`
                this.hongliGroup.children[1].getComponent(cc.Label).string  = `加赠红利${this.withdraw_bonus[10]*100}%`
                this.hongliGroup.children[2].getComponent(cc.Label).string  = `加赠红利${this.withdraw_bonus[15]*100}%`
                this.boundsLabel.getComponent(cc.Label).string = `使用此渠道兑换成功加赠${this.withdraw_bonus[15]*100}%起`
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    //获取保证金费率
    public fetchgetHighSpeedWithdrawSecurityRate(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawSecurityRate?`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                this.depostFee = Number(response.data.security_rate)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    //取得訂單
    public fetchgetHighSpeedWithdrawOrder(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawOrder`;
        let dataStr=`user_id=${this.app.UrlData.user_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(response.data.order.length > 0){
                    let time = parseInt(`${new Date().getTime()/1000}`) // 现在的时间
                    let daoqi = response.data.order[0].created_at+900 // 到期时间
                    console.log(time,"到期时间",daoqi)
                    this.countdown = (daoqi - Number(time) )>0 ? (daoqi - Number(time)):0 //
                    this.openJsQrAlert()
                    //如果有订单，显示订单的金额的保证金
                    this.setDepostLabel(response.data.order[0].amount)
                    this.order_id = response.data.order[0].order_id
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    //确认到账
    public fetchconfirmHighSpeedWithdraw(){
        var url = `${this.app.UrlData.host}/api/with_draw/confirmHighSpeedWithdraw`;
        let dataStr=`order_id=${this.order_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                //确认到账后将order_id清空
                this.order_id = ''
                self.app.showAlert(response.msg)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    init(){
        this.results = this.data.data.withDraw_info.jisu_withdraw.channel;
        this.results.sort((a,b)=>a.sort-b.sort);
        for(let i = 0;i<this.results.length;i++){
            if(Number(this.results[i].is_close)>0){
                this.current = this.results[i];
                break;
            }
        }
        this.radioList();
    }

    //selectItem回调
    public initRender(){
        this.bankData = [];
        var data = this.data.data;
        for(let i = 0 ;i < data.list.length ;i++){
            let data = this.data.data.list[i];
            if (data.type == 3){
                this.bankData.push(data)
            }
        }
        
        if(this.bankData.length>0){
            let Info =JSON.parse(this.bankData[0].info)
            for (var k in Info) {
                this.Info[k] = Info[k]
            }
            this.bankId = this.bankData[0].id;
        }
        this.action = this.bankData.length != 0 ? 'edit' :'add';
        this.goldLabel.string = this.app.config.toDecimal(data.game_gold);

        //最小金额也需要根据package_id判断
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        
        withdraw_min_amount['bank'].forEach(item => {
            //9.1日增加,兑换的最小金额，取渠道和支付方式相比，较大的最小兑换金额
            if(item.package_id == this.app.UrlData.package_id && Number(this.current.min_amount) <Number(item.min_amount)){
                this.current.min_amount = item.min_amount
            }
        });

        this.czArea.string = `${Language_pay.Lg.ChangeByText('兑换范围')}:(${this.current? this.current.min_amount:100} - ${this.current?this.current.max_amount:10000})`;
        this.accountLabel.string = this.bankData.length != 0 ? this.app.config.testBankNum(this.Info.card_num) :Language_pay.Lg.ChangeByText('未设置');
        if(this.Info.bank_province == '' ||this.Info.bank_city =='' || this.Info.card_num == ''){
            this.accountBtn.active = true;
        }else{
            this.accountBtn.active = false;
        }
    }

    deleteAmount(){
        //按键音效
        this.app.loadMusic(1);

        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.amountLabel);
        this.setDepostLabel(0)
    }

    //兑换提示
    showCashAlert(){
        var node =null;
        node = cc.instantiate(this.CashAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/CashAlert")){
            canvas.addChild(node);
        }
        let cash = cc.find('Canvas/Cash').getComponent('payCash')
        let package_rate = JSON.parse(cash.results.data.package_rate)
        let package_rate_byPackage = "0"
        package_rate.list.forEach(e => {
            if(e.package_id == this.app.UrlData.package_id){
                package_rate_byPackage = e.rate
            }
        });
        let rate = package_rate_byPackage ?Number (package_rate_byPackage)  : 0;
        console.log('package_rate_byPackage',package_rate_byPackage)
        let rate2 =cash.results.data.channel_rate ?Number (cash.results.data.channel_rate)  : 0;
        let rateMount = (rate+rate2)*Number(this.amountLabel.string);
        node.getComponent('payCashAlert').init({
            parentComponent:this,
            rateMount: rateMount,
            amount:Number(this.amountLabel.string)
        })
    }
    //显示弹窗
    showAccountAlert(){
        this.app.showBankAccountAlert({
            text:this.bankData.length != 0  ?'修改银行卡' : '设置银行卡',
            action:this.action,
            itemId:this.bankId,
            parentComponent:this,
            //修改界面初始数据
            changeData:this.Info
        });
    }
    //兑换
    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawApply`;
        let dataStr=''
        //如果proxy_name为“”，则不传
        if(this.app.UrlData.proxy_name == ""){
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=8&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=8&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        }
        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(response.msg !="Success!"){
                    self.app.showAlert(response.msg.msg);
                }else{
                    this.countdown = 900 //默认15分钟后超时
                    self.openJsQrAlert()
                }
                self.fetchIndex();
            }else{
                self.app.showAlert(response.msg)
            }
            self.DhBtn.getComponent(cc.Button).interactable  = true;
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            if(Number(this.results[i].is_close) > 0){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('paySelectItem').init({
                    text:this.results[i].channel_name,
                    parentComponent:this,
                    index:i,
                    channel :'bank_pay'
                })
            }
         }
    }
    btn1Click(){
        //按键音效
        this.app.loadMusic(1);
        this.showAccountAlert()
    }
    onClick(){
        //按键音效
        if(this.order_id!= ""){
            this.openJsQrAlert()
            return
        }
        this.app.loadMusic(1);
        var amount = Number(this.amountLabel.string);

        var minAmount = Number(this.current?this.current.min_amount:100);
        var maxAmount = Number(this.current?this.current.max_amount:10000);
        //增加渠道对于兑换金额和倍数的判断
        var multiple_amount = 1;
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        withdraw_min_amount['bank'].forEach(item => {
            if(item.package_id == this.app.UrlData.package_id ){    
                minAmount = minAmount < Number(item.min_amount) ? Number(item.min_amount):Number(minAmount)
                multiple_amount = item.multiple_amount
            }
        });
        
        if(this.results.length==0){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('渠道未开放，请选择其他兑换方式!')}`)
        }else if(this.Info.bank_province == '' ||this.Info.bank_city =='' || this.Info.card_num == ''){
            this.app.showBankTipAlert(this)
        }else if(this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('兑换金额不能为空'))
        }else if(Number(this.amountLabel.string)%multiple_amount != 0 && amount != minAmount ){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('兑换金额必须为')}${multiple_amount}${Language_pay.Lg.ChangeByText('的倍数')}！`)
        }
        else if(amount + this.depost > Number(this.goldLabel.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert(Language_pay.Lg.ChangeByText('超出兑换范围'))
        }else{
            this.showCashAlert();
        }
    }
    //点击确认到账
    qrdzClick(){
        if(this.order_id == ''){
            console.log("订单号为空，请等待订单号生成！")
            this.app.showAlert("订单号为空，请等待订单号生成！")
            return
        }
        this.fetchconfirmHighSpeedWithdraw()
        this.closeJsQrAlert()
    }
    closeJsQrAlert(){
        this.JsQrAlert.active = false
        clearInterval(this.timer)
    }
    closeJsTimeOutAlert(){
        this.JsTimeOutAlert.active = false
    }
    openJsQrAlert(){
        if(this.order_id == ''){
            this.fetchgetHighSpeedWithdrawOrder()
        }
        if(this.countdown <=0){
            this.openJsTimeOutAlert()
            return
        }
        this.JsQrAlert.active = true
        clearInterval(this.timer )
        this.timer = setInterval(() => {
            this.timerLabel.string =this.app.config.getTime3(this.countdown) 
            this.countdown -- 
            if(this.countdown < 0){
                //倒计时结束
                this.closeJsQrAlert()
                this.openJsTimeOutAlert()
                clearInterval(this.timer )
            }
        }, 1000);
    }
    openJsTimeOutAlert(){
        this.JsTimeOutAlert.active = true
    }
    setDepostLabel(amount){
        this.depost = this.depostFee * Number(amount)
        this.depostLabel.string = `温馨提示：本次兑换保证金：${this.depost > 0 ? this.depost : 0} 元 \n您发起兑换后平台将会为您暂时冻结保证金，待兑换完成后保证金会返还您的账户，请您收到兑换后及时点击【确认到账】，否则保证金将暂时不会自动返还`
    }
    onDestroy(){
        clearInterval(this.timer)
    }
}
