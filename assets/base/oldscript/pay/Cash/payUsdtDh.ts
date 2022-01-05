
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    goldLabel: cc.Label = null; //余额

    @property(cc.Label)
    usdt_goldLabel: cc.Label = null; //转换usdt余额

    @property(cc.Label)
    conf_val_label: cc.Label = null; 

    @property(cc.Label)
    amountLabel: cc.Label = null; //兑换金额

    @property(cc.Label)
    dhArea: cc.Label = null; //兑换范围

    @property(cc.Label)
    walletAddressLabel: cc.Label = null; 

    @property(cc.Label)
    chanTypeLabel: cc.Label = null;

    @property(cc.Node)
    bindBtn: cc.Node = null;

    @property(cc.Node)
    selectContent :cc.Node = null;

    @property(cc.Prefab)
    CashAlert: cc.Prefab = null;

    @property(cc.Node)
    DhBtn: cc.Node = null;

    @property(cc.Prefab)
    SelectItem :cc.Prefab = null

    @property(cc.Label)
    AqmLabel :cc.Label = null;

    @property
    public data : any = {};
    public results= null ;
    app = null;
    current= null;
    walletAddress = ''
    chanType = ''
    info :any= {}
    itemID = ''
    UsdtData :any= []
    conf_val = 6 // 汇率
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
        this.setLanguageResource()
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }
    
    setAqm() {
        this.app.showKeyBoard(this.AqmLabel,4);
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
        this.results = this.data.data.withDraw_info.usdt.channel;
        this.results.sort((a,b)=>a.sort-b.sort);
        for(let i = 0;i<this.results.length;i++){
            if(Number(this.results[i].is_close)>0){
                this.current = this.results[i];
                break;
            }
        }
        this.radioList();
        this.getLocalConf()
    }

    //selectItem回调
    public initRender(){
        this.UsdtData = []
        var data = this.data.data;
        for(let i = 0 ;i < data.list.length ;i++){
            let item = data.list[i];
            if (item.type == 4 || item.type == 5){
                this.UsdtData.push(item)
            }
        }
        //最小金额也需要根据package_id判断
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        withdraw_min_amount['usdt'].forEach(item => {
            if(item.package_id == this.app.UrlData.package_id){
                this.current.min_amount = item.min_amount
            }
        });
        
        this.goldLabel.string = this.app.config.toDecimal(this.data.data.game_gold);
        this.dhArea.string = `${Language_pay.Lg.ChangeByText('兑换范围')}:(${this.current? this.current.min_amount:100} - ${this.current?this.current.max_amount:10000})`;
        
        if(this.UsdtData.length>0){
            let CurrentItem :any= null
            if(this.current.channel_type == 10 ){
                this.UsdtData.forEach((e)=>{
                    let Info =JSON.parse(e.info)
                    if(Info.protocol == "TRC20"){
                        CurrentItem = e
                    }
                })
            }else if(this.current.channel_type == 9){
                this.UsdtData.forEach((e)=>{
                    let Info =JSON.parse(e.info)
                    if(Info.protocol == "ERC20"){
                        CurrentItem = e
                    }
                })
            }
            if (CurrentItem == null){
                this.walletAddressLabel.string = Language_pay.Lg.ChangeByText('未绑定')
                this.chanTypeLabel.string = Language_pay.Lg.ChangeByText('未绑定')
            }else{
                let Info =JSON.parse(CurrentItem.info)
                this.walletAddressLabel.string = this.app.config.testAdressNum(Info.wallet_addr)
                this.chanTypeLabel.string = Info.protocol
                this.itemID = CurrentItem.id
            }
        }else{
            this.walletAddressLabel.string = Language_pay.Lg.ChangeByText('未绑定')
            this.chanTypeLabel.string = Language_pay.Lg.ChangeByText('未绑定')
        }
        if(this.walletAddressLabel.string == Language_pay.Lg.ChangeByText('未绑定')){
            this.bindBtn.active = true;
        }else{
            this.bindBtn.active = false;
        }
    }

    deleteAmount(){
        //按键音效
        this.app.loadMusic(1);

        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.amountLabel);
    }

    //兑换提示
    showCashAlert(conf_val){
        var node = cc.instantiate(this.CashAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/CashAlert")){
            canvas.addChild(node);
        }
        let cash = cc.find('Canvas/Cash').getComponent('payCash')
        let package_rate = JSON.parse(cash.results.data.package_rate)
        let package_rate_byPackage = "0"
        package_rate.usdt.forEach(e => {
            if(e.package_id == this.app.UrlData.package_id){
                package_rate_byPackage = e.rate
            }
        });
        console.log('package_rate_byPackage',package_rate_byPackage)
        let rate = package_rate_byPackage ?Number (package_rate_byPackage)  : 0;
        let rate2 =cash.results.data.channel_rate ?Number (cash.results.data.channel_rate)  : 0;
        let rateMount = (rate+rate2)*Number(this.amountLabel.string);
        node.getComponent('payCashAlert').init({
            parentComponent:this,
            rateMount: rateMount,
            amount:Number(this.amountLabel.string)
        },conf_val)
    }
    //显示弹窗
    showAccountAlert(){
        let type = this.current.channel_type == 10 ? "TRC20":"ERC20"
        this.app.showUsdtAccountAlert(this.itemID,type);
    }
    //兑换
    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawApply`;
        let dataStr=''
        //如果proxy_name为“”，则不传
        if(this.app.UrlData.proxy_name == ""){
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${this.amountLabel.string}&account_id=${this.itemID}&order_type=${this.current.channel_type}&withdraw_type=6&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}`
        }else if(this.app.UrlData.package_id == 16){
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${this.amountLabel.string}&account_id=${this.itemID}&order_type=${this.current.channel_type}&withdraw_type=6&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&password=${this.AqmLabel.string}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${this.amountLabel.string}&account_id=${this.itemID}&order_type=${this.current.channel_type}&withdraw_type=6&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
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
                self.app.showAlert(response.msg == "密码错误！"?"安全码错误！":response.msg)
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
                    channel :'usdt'
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
        this.app.loadMusic(1);
        var amount = Number(this.amountLabel.string);

        var minAmount = Number(this.current?this.current.min_amount:100);
        var maxAmount = Number(this.current?this.current.max_amount:10000);
        //增加渠道对于兑换金额和倍数的判断
        var multiple_amount = 1;
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        withdraw_min_amount['usdt'].forEach(item => {
            if(item.package_id == this.app.UrlData.package_id){
                minAmount = item.min_amount
                multiple_amount = item.multiple_amount
            }
        });

        if(this.results.length==0){
            this.app.showAlert(Language_pay.Lg.ChangeByText('渠道未开放，请选择其他兑换方式!'))
        }else if(this.walletAddressLabel.string == ''|| this.walletAddressLabel.string == Language_pay.Lg.ChangeByText('未绑定')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('请先绑定钱包地址'))
        }else if(this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('兑换金额不能为空'))
        }else if(Number(this.amountLabel.string)%multiple_amount != 0 && amount != minAmount ){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('兑换金额必须为')}${multiple_amount}${Language_pay.Lg.ChangeByText('的倍数')}！`)
        }
        else if(amount >Number(this.usdt_goldLabel.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert(Language_pay.Lg.ChangeByText('超出兑换范围'))
        }else{
            //渠道16需判断安全码
            if(this.app.UrlData.package_id == 16 && this.AqmLabel.string == "点击输入"){
                this.app.showAlert("请输入安全码")
            }else{
                this.showCashAlert(this.conf_val);
            }
        }
    }
    getLocalConf(){
        let cash_usdt = cc.sys.localStorage.getItem(`cash_usdt`)
        let time = new Date().getTime()/1000
        if(cash_usdt){
            let created_time = JSON.parse(cash_usdt).time
            if((time - created_time) > 6*3600){
                //如果超过六个小时，则重新拉取数据
                this.fetchGetConfigInfo()
            }else{
                //否则使用本地缓存的数据
                this.setConf_val(JSON.parse(cash_usdt))
            }
        }else{
            this.fetchGetConfigInfo()
        }
    }
    setConf_val(cash_usdt){
        
        this.conf_val = Number(cash_usdt.conf_val)
        this.usdt_goldLabel.string = this.app.config.toDecimal(Number(this.data.data.game_gold)/ this.conf_val)
        this.conf_val_label.string = `${this.conf_val}${Language_pay.Lg.ChangeByText('金币')}`
    }
    public fetchGetConfigInfo(){
        var url = `${this.app.UrlData.host}/api/config/getConfigInfo?conf_key=usdt_to_cny2`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let time = new Date().getTime()/1000
                let Jsonconf_val = JSON.parse(response.data[0].conf_val)
                for(var i in Jsonconf_val){
                    if(i == this.app.UrlData.package_id){
                        this.conf_val = Jsonconf_val[i]
                    }
                }
                let cash_usdt = {
                    conf_val :Number(this.conf_val), //汇率
                    time : time, //保存的时间
                }
                cc.sys.localStorage.setItem(`cash_usdt`,JSON.stringify(cash_usdt))
                this.setConf_val(cash_usdt)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let zhye= cc.find('Canvas/Cash/Content/UsdtDh/titlebg/group1/zhye')
        let ckhl= cc.find('Canvas/Cash/Content/UsdtDh/titlebg/group2/ckhl')
        let dhje= cc.find('Canvas/Cash/Content/UsdtDh/titlebg/group3/dhje')
        let btn_75= cc.find('Canvas/Cash/Content/UsdtDh/titlebg/group3/group2/75')
        let qbdz= cc.find('Canvas/Cash/Content/UsdtDh/group4/qbdz')
        let accountBtn= cc.find('Canvas/Cash/Content/UsdtDh/group4/accountBtn')
        let llx= cc.find('Canvas/Cash/Content/UsdtDh/group5/llx')
        let dhqd= cc.find('Canvas/Cash/Content/UsdtDh/group6/dhqd')
        let btn= cc.find('Canvas/Cash/Content/UsdtDh/btn')

        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 9){
            btn_75.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("重置")
            accountBtn.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("绑 定")
            this.app.loadIconLg(`${src}/font/jiesuan`,btn.children[0])
            this.app.loadIconLg(`${src}/font/txt_zhye`,zhye)
            this.app.loadIconLg(`${src}/font/txt_ckhl`,ckhl)
            this.app.loadIconLg(`${src}/font/txt_dhje`,dhje)
            this.app.loadIconLg(`${src}/font/txt_qbdz`,qbdz)
            this.app.loadIconLg(`${src}/font/txt_llx`,llx)
            this.app.loadIconLg(`${src}/font/txt_dhqd`,dhqd)
        }else if( this.app.UrlData.package_id == 10){
            zhye.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("账户余额")
            zhye.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("参考汇率")
            zhye.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("兑换金额")
            zhye.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("钱包地址")
            zhye.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("链类型")
            zhye.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("兑换渠道")
            accountBtn.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("绑 定")
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
            this.app.loadIconLg(`${src}/font/jiesuan`,btn.children[0])
        }else if(this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 18  || this.app.UrlData.package_id == 16|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){

        }else{
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
            this.app.loadIconLg(`${src}/btn/bindbt`,accountBtn)
            this.app.loadIconLg(`${src}/btn/btn_dh`,btn)
            this.app.loadIconLg(`${src}/font/txt_zhye`,zhye)
            this.app.loadIconLg(`${src}/font/txt_ckhl`,ckhl)
            this.app.loadIconLg(`${src}/font/txt_dhje`,dhje)
            this.app.loadIconLg(`${src}/font/txt_qbdz`,qbdz)
            this.app.loadIconLg(`${src}/font/txt_llx`,llx)
            this.app.loadIconLg(`${src}/font/txt_dhqd`,dhqd)
        }

        let label1 = cc.find('Canvas/Cash/Content/UsdtDh/titlebg/group3/group2/label').getComponent(cc.Label)
        label1.string = Language_pay.Lg.ChangeByText('点击输入')
    }
}
