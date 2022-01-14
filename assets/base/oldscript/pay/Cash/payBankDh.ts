
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    PublicInputAlert : cc.Prefab = null;

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

    @property(cc.Slider)
    slider : cc.Slider = null;

    @property(cc.ProgressBar)
    progressBar : cc.ProgressBar = null;

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
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
        this.changeSlider(this.slider,this.progressBar);
        this.setLanguageResource()
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
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
    
    init(){
        this.results = this.data.data.withDraw_info.bankcard.channel;
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
        this.slider.progress = 0;
        this.progressBar.progress = 0;
    }

     //点击最大
     allGoldClick(){
          //按键音效
        this.app.loadMusic(1);
        this.amountLabel.string = `${Math.floor(Number(this.goldLabel.string))}`;
        this.slider.progress = 1;
        this.progressBar.progress = 1;
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
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=2&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=2&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        }
        

        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(response.msg !="Success!"){
                    self.app.showAlert(response.msg.msg);
                }else{
                    self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'));
                }
                self.fetchIndex();
            }else{
                if(response.msg.substring(0,4) == "频繁操作"){
                    self.app.showAlert("操作频繁,请间隔30秒后重新提交")
                }else{
                    self.app.showAlert(response.msg)
                }
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
    changeSlider(s,p){
        let self = this;
        let slider = s;
        let progressbar = p;
        if(slider == null || progressbar == null){
            return;
        }
        progressbar.progress = slider.progress;
        slider.node.on('slide', function(event){
            progressbar.progress = slider.progress;
            self.amountLabel.string = `${Math.floor(Number(self.goldLabel.string)*slider.progress)}`;
        }, this);
    }
    onClick(){
        //按键音效
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
        else if(amount >Number(this.goldLabel.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert(Language_pay.Lg.ChangeByText('超出兑换范围'))
        }else{
            this.showCashAlert();
        }
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let txt_zhye= cc.find('Canvas/Cash/Content/BankDh/titlebg/group1/txt_zhye')
        let txt_dhje= cc.find('Canvas/Cash/Content/BankDh/titlebg/group2/txt_dhje')
        let btn_75= cc.find('Canvas/Cash/Content/BankDh/titlebg/group2/group2/75')
        let btn_max= cc.find('Canvas/Cash/Content/BankDh/titlebg/group3/btn_max')
        let bankbt= cc.find('Canvas/Cash/Content/BankDh/group4/bankbt')
        let accountBtn= cc.find('Canvas/Cash/Content/BankDh/group4/accountBtn')
        let txt_dhqd= cc.find('Canvas/Cash/Content/BankDh/group3/txt_dhqd')
        let btn_dh= cc.find('Canvas/Cash/Content/BankDh/btn_dh')

        if(this.app.UrlData.package_id == 10  ){
            txt_zhye.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("账户余额")
            txt_dhje.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("兑换金额")
            bankbt.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("银行卡")
            txt_dhqd.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("兑换渠道")
        }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){

        }else{
            this.app.loadIconLg(`${src}/font/txt_zhye`,txt_zhye)
            this.app.loadIconLg(`${src}/font/txt_dhje`,txt_dhje)
            this.app.loadIconLg(`${src}/font/bankbt`,bankbt)
            this.app.loadIconLg(`${src}/font/txt_dhqd`,txt_dhqd)
        }

        if(this.app.UrlData.package_id == 8){
            btn_max.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("最 大")
            btn_75.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("重置")
            accountBtn.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("绑定银行卡")
            this.app.loadIconLg(`${src}/font/jiesuan`,btn_dh.children[0])
        }else if(this.app.UrlData.package_id == 9){
            btn_max.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("最 大")
            btn_75.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("重置")
            accountBtn.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("绑定银行卡")
            this.app.loadIconLg(`${src}/font/jiesuan`,btn_dh.children[0])
        }else if(this.app.UrlData.package_id == 10){
            btn_max.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("最 大")
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
            accountBtn.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("绑定银行卡")
            this.app.loadIconLg(`${src}/font/jiesuan`,btn_dh.children[0])
        }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18|| this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){

        }else{
            this.app.loadIconLg(`${src}/btn/btn_max`,btn_max)
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
            this.app.loadIconLg(`${src}/btn/btn_bindcard`,accountBtn)
            this.app.loadIconLg(`${src}/btn/btn_dh`,btn_dh)
        }

        let label1 = cc.find('Canvas/Cash/Content/BankDh/titlebg/group2/group2/label').getComponent(cc.Label)
        label1.string = Language_pay.Lg.ChangeByText('点击输入')
    }
    // update (dt) {}
}
