
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Node)
    selectContent :cc.Node = null;

    @property(cc.Label)
    accountLabel :cc.Label = null;

    @property(cc.Prefab)
    SelectItem :cc.Prefab = null;

    @property(cc.Node)
    DhBtn :cc.Node = null;

    @property(cc.Label)
    area :cc.Label = null;

    @property(cc.Prefab)
    CashAlert : cc.Prefab =null;

    @property
    app = null;
    data = null;
    results =null;
    zfbAccount = [];
    bankAccount= [];
    selectArr = [];
    type = null;
    account_id = null;
    account_type =null;
    init(data){
       
        //results，保存当前代充信息；
        //data，保存兑换index信息；
        this.results = data.results
        this.data = data.data;
        console.log('this.results',this.results,'this.data',this.data)
        //显示余额
        this.goldLabel.string = this.app.config.toDecimal(this.data.data.game_gold);
        let list = this.data.data.list;
        list.map(e => {
            if(e.type == 2){
                this.zfbAccount.push(e)
            }else if(e.type==3){
                this.bankAccount.push(e);
            }
        });
        //得到支付宝，银行卡
        if(this.zfbAccount[0]){
            this.selectArr[0]=this.zfbAccount[0]
        }else{
            this.selectArr[0]=false;
        }
        if(this.bankAccount[0]){
            this.selectArr[1]=this.bankAccount[0]
        }else{
            this.selectArr[1]=false;
        }
        this.initRender(0)
        this.radioList()
    }
    initRender(index){
        if(index==0 ){
            if(this.selectArr[index]){
                let info= JSON.parse(this.selectArr[index].info);
                this.accountLabel.string = info.account_card;
                this.account_id = this.selectArr[index].id;
                this.account_type = 1
            }else{
                this.accountLabel.string = '未设置'
            }
           
        }else if(index==1){
            if(this.selectArr[index]){
                let info= JSON.parse(this.selectArr[index].info);
                this.accountLabel.string = this.app.config.testBankNum(info.card_num)
                this.account_id = this.selectArr[index].id;
                this.account_type = 2
            }else{
                this.accountLabel.string = '未设置'
            }
        }
        let min_amount = Number(this.data.data.withDraw_info.artificial.min_amount);
        let max_amount = Number(this.data.data.withDraw_info.artificial.max_amount);
        this.area.string = `兑换范围:(${min_amount}-${max_amount})`
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }

    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.selectArr.length ; i++){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('paySelectItem').init({
                    text:i ==0 ?'支付宝':'银行卡',
                    parentComponent:this,
                    index:i,
                    channel :i ==0 ?'alipay':'bank_pay'
                })
         }
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();

        let amount = Number(this.amountLabel.string) ;
        let gold = Number(this.goldLabel.string);
        let min_amount = Number(this.data.data.withDraw_info.artificial.min_amount);
        let max_amount = Number(this.data.data.withDraw_info.artificial.max_amount);
        if(amount> gold){
            this.app.showAlert('余额不足！')
        }else if(amount < min_amount || amount > max_amount){
            this.app.showAlert(`不符合兑换范围！(${min_amount}-${max_amount})`)
        }else if(this.accountLabel.string =='未设置'){
            this.app.showAlert('兑换账户未设置,请选择其他兑换方式！')
        }else{
            this.showCashAlert()
        }
    }

    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/artificial_order/withDrawApply`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&replace_id=${this.results.user_id}&replace_name=${this.results.nick_name}&account_id=${this.account_id}&amount=${this.amountLabel.string}&order_type=4&withdraw_type=3&account_type=${this.account_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`

        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert('申请成功！');
                //刷新余额
                let RgDh = cc.find('Canvas/Cash/Content/RgDh').getComponent('payRgDh');
                RgDh.fetchIndex();
                self.removeSelf();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    //兑换提示
    showCashAlert(){
        var node = cc.instantiate(this.CashAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        let rateMount = Number(this.data.data.withDraw_info.artificial.rate)*Number(this.amountLabel.string);
        node.getComponent('payCashAlert').init({
            parentComponent:this,
            rateMount: rateMount,
            amount:Number(this.amountLabel.string)
        })
    }
    
    
    deleteAmount(){
        //按键音效
        this.app.clickClip.play();

        this.amountLabel.string = '点击输入';
        this.app.setInputColor('',this.amountLabel);
    }

    removeSelf(){
        //按键音效
        this.app.clickClip.play();

        this.node.destroy();
    }

    // update (dt) {}
}
