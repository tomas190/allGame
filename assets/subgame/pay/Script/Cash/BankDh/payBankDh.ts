
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    PublicInputAlert : cc.Prefab = null;

    @property(cc.Prefab)
    publicAlert : cc.Prefab = null;

    @property(cc.Prefab)
    BankAccountAlert :cc.Prefab = null;

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
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;

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
            self.app.showAlert(`网络错误${errstatus}`)
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
            this.Info =JSON.parse(this.bankData[0].info)
            this.bankId = this.bankData[0].id;
        }
        this.action = this.bankData.length != 0 ? 'edit' :'add';
        this.goldLabel.string = this.app.config.toDecimal(data.game_gold);
        this.czArea.string = `兑换范围:(${this.current? this.current.min_amount:100} - ${this.current?this.current.max_amount:10000})`;
        this.accountLabel.string = this.bankData.length != 0 ? this.app.config.testBankNum(this.Info.card_num) :'未设置';
        if(this.bankData.length != 0 ){
            this.accountBtn.active = false;
        }else{
            this.accountBtn.active = true;
        }
    }

    deleteAmount(){
        //按键音效
        this.app.clickClip.play();

        this.amountLabel.string = '点击输入';
        this.app.setInputColor('',this.amountLabel);
        this.slider.progress = 0;
        this.progressBar.progress = 0;
    }

     //点击最大
     allGoldClick(){
          //按键音效
        this.app.clickClip.play();
        this.amountLabel.string = `${Math.floor(Number(this.goldLabel.string))}`;
        this.slider.progress = 1;
        this.progressBar.progress = 1;
    }

    //兑换提示
    showCashAlert(){
        var node = cc.instantiate(this.CashAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        let cash = cc.find('Canvas/Cash').getComponent('payCash')
        let rate = cash.results.data.package_rate ?Number (cash.results.data.package_rate)  : 0;
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
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=2&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=2&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        }
        

        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert('申请成功！');
                self.fetchIndex();
            }else{
                self.app.showAlert(response.msg)
            }
            self.DhBtn.getComponent(cc.Button).interactable  = true;
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
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
        this.app.clickClip.play();
        
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
        this.app.clickClip.play();
        var amount = Number(this.amountLabel.string);

        var minAmount = Number(this.current?this.current.min_amount:100);
        var maxAmount = Number(this.current?this.current.max_amount:10000);
        if(this.results.length==0){
            this.app.showAlert('渠道未开放，请选择其他兑换方式！')
        }else if(this.bankData.length == 0){
            this.app.showAlert('请先设置账户!')
        }else if(this.amountLabel.string == '点击输入'){
            this.app.showAlert('兑换金额不能为空！')
        }else if(amount >Number(this.goldLabel.string)){
            this.app.showAlert('余额不足!')
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert('超出兑换范围!')
        }else{
            this.showCashAlert();
        }
    }
    // update (dt) {}
}
