
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
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
                this.accountLabel.string = Language_pay.Lg.ChangeByText('未设置')
            }
           
        }else if(index==1){
            if(this.selectArr[index]){
                let info= JSON.parse(this.selectArr[index].info);
                this.accountLabel.string = this.app.config.testBankNum(info.card_num)
                this.account_id = this.selectArr[index].id;
                this.account_type = 2
            }else{
                this.accountLabel.string = Language_pay.Lg.ChangeByText('未设置')
            }
        }
        let min_amount = Number(this.data.data.withDraw_info.artificial.min_amount);
        let max_amount = Number(this.data.data.withDraw_info.artificial.max_amount);
        this.area.string = `${Language_pay.Lg.ChangeByText('兑换范围')}:(${min_amount}-${max_amount})`
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
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
        this.app.loadMusic(1);

        let amount = Number(this.amountLabel.string) ;
        let gold = Number(this.goldLabel.string);
        let min_amount = Number(this.data.data.withDraw_info.artificial.min_amount);
        let max_amount = Number(this.data.data.withDraw_info.artificial.max_amount);
        if(amount> gold){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else if(amount < min_amount || amount > max_amount){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('超出兑换范围')}(${min_amount}-${max_amount})`)
        }else if(this.accountLabel.string ==Language_pay.Lg.ChangeByText('未设置')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('兑换账户未设置,请选择其他兑换方式!'))
        }else{
            this.showCashAlert()
        }
    }

    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/artificial_order/withDrawApply`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&replace_id=${this.results.user_id}&replace_name=${this.results.nick_name}&account_id=${this.account_id}&amount=${this.amountLabel.string}&order_type=4&withdraw_type=3&account_type=${this.account_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`

        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'));
                //刷新余额
                let RgDh = cc.find('Canvas/Cash/Content/RgDh').getComponent('payRgDh');
                RgDh.fetchIndex();
                self.removeSelf();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }

    //兑换提示
    showCashAlert(){
        var node = null;
        node = cc.instantiate(this.CashAlert);
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
        this.app.loadMusic(1);

        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.amountLabel);
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);

        this.node.destroy();
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let toutpd= cc.find("Canvas/RgDhAlert/Layout/toutpd")
        let txt_zhye2= cc.find("Canvas/RgDhAlert/Layout/content/txt_zhye2")
        let txt_dhje2= cc.find("Canvas/RgDhAlert/Layout/content/txt_dhje2")
        let btn_75= cc.find("Canvas/RgDhAlert/Layout/content/group2/75")
        let txt_dhfs= cc.find("Canvas/RgDhAlert/Layout/content/txt_dhfs")
        let txt_dhzh= cc.find("Canvas/RgDhAlert/Layout/content/txt_dhzh")
        let btn1= cc.find("Canvas/RgDhAlert/Layout/btn1")

        
        
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 12){
            this.app.loadIconLg(`${src}/font/txt_zhye`,txt_zhye2)
            this.app.loadIconLg(`${src}/font/txt_dhje`,txt_dhje2)
            this.app.loadIconLg(`${src}/font/title_rgdh`,toutpd)
            this.app.loadIconLg(`${src}/font/txt_dhfs`,txt_dhfs)
            this.app.loadIconLg(`${src}/font/txt_dhzh`,txt_dhzh)
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            btn_75.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("重置")
        }else if(this.app.UrlData.package_id == 10){
            toutpd.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("人工兑换")
            txt_zhye2.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("账户余额")
            txt_dhje2.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("兑换金额")
            txt_dhfs.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("兑换方式")
            txt_dhzh.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("兑换账户")
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
        }else{
            this.app.loadIconLg(`${src}/font/title_rgdh`,toutpd)
            this.app.loadIconLg(`${src}/font/txt_dhfs`,txt_dhfs)
            this.app.loadIconLg(`${src}/font/txt_dhzh`,txt_dhzh)
            this.app.loadIconLg(`${src}/font/txt_zhye2`,txt_zhye2)
            this.app.loadIconLg(`${src}/font/txt_dhje2`,txt_dhje2)
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
            this.app.loadIconLg(`${src}/btn/surecg`,btn1)
        }

        let label= cc.find("Canvas/RgDhAlert/Layout/content/group2/label").getComponent(cc.Label)
        label.string = Language_pay.Lg.ChangeByText('点击输入')
    }

    // update (dt) {}
}
