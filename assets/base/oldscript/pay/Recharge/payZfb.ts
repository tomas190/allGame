
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

    @property(cc.Node)
    blinkNode: cc.Node = null;

    @property(cc.Prefab)
    BindBankAccountTipAlert : cc.Prefab = null;

    @property(cc.Node)
    neikuagn : cc.Node = null;

    @property(cc.Prefab)
    btnNum : cc.Prefab = null;

    @property(cc.Prefab)
    cyjeItem : cc.Prefab = null;

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
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        //请求支付宝
        this.fetchZfb()
        this.setLanguageResource()
        this.getLocalConf()
        
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
    }
    init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.channel = data;
        this.blinkNode.active = false
        let p_id = this.app.UrlData.package_id;
        if(this.channel == 'alipay' ){
            this.app.loadPublicIcon(`recharge/flag_alipay`,this.icon,100,100)
            if(p_id == 16){
                this.wxtsLabel.string = `1.充值比例1元=1金币`
            }else{
                this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}。2.${Language_pay.Lg.ChangeByText('需要安装支付宝')}。`
            }
            this.app.loadPublicIcon(`recharge/subbg_alipay`,this.shuiyin,368,270)
            if(p_id == 8 || p_id == 10 || p_id == 15|| p_id == 9 ||p_id ==12||p_id ==16 ||p_id ==18 ||p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('支付宝')
            }else{
                this.app.loadIcon(`${src}/font/flagname_alipay`,this.iconFont.children[0],126,45)
            }
        }
        else if(this.channel == 'union_pay'){
            this.app.loadPublicIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            if(p_id == 16){
                this.wxtsLabel.string = `1.充值比例1元=1金币`
            }else{
                this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
            }
            if(p_id == 8|| p_id == 10 || p_id == 15 || p_id == 9||p_id ==12||p_id ==16 ||p_id ==18||p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('银联扫码')
            }else{
                this.app.loadIcon(`${src}/font/flagname_scan_code_unionpay`,this.iconFont.children[0],168,45)
            }
        }else if(this.channel == 'wechat_pay'){
            this.app.loadPublicIcon(`recharge/flag_wxpay`,this.icon,100,100)
            if(p_id == 16){
                this.wxtsLabel.string = `1.充值比例1元=1金币`
            }else{
                this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}。2.${Language_pay.Lg.ChangeByText('需要安装微信')}。`;
            }
            this.app.loadPublicIcon(`recharge/subbg_wxpay`,this.shuiyin,368,270)
            if(p_id == 8|| p_id == 10 || p_id == 15|| p_id == 9||p_id ==12||p_id ==16 ||p_id ==18 ||p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('微信')
            }else{
                this.app.loadIcon(`${src}/font/flagname_wxpay`,this.iconFont.children[0],84,45)
            }
        }else if(this.channel == 'bankcard_transfer'){
            this.app.loadPublicIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            if(p_id == 16){
                this.wxtsLabel.string = `1.充值比例1元=1金币`
            }else{
                this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
            }
            if(p_id == 8 || p_id == 10 || p_id == 15|| p_id == 9||p_id ==12||p_id ==16 ||p_id ==18 ||p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('转账到银行卡')
            }else{
                this.app.loadIcon(`${src}/font/flagname_unionpay3`,this.iconFont.children[0],252,45) 
            }
            let blinkNodeLabel = this.blinkNode.getComponent(cc.Label)
            blinkNodeLabel.string = "请使用与绑定银行卡相同账户名的账户进行支付"
            blinkNodeLabel.fontSize = 23
            blinkNodeLabel.lineHeight = 27
            this.blinkFun(this.blinkNode)
        }
        else if(this.channel == 'quick_pay'){
            this.app.loadPublicIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            if(p_id == 16){
                this.wxtsLabel.string = `1.充值比例1元=1金币`
            }else{
                this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
            }
            if(p_id == 8 || p_id == 10 || p_id == 15|| p_id == 9||p_id ==12||p_id ==16 ||p_id ==18||p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('快捷支付')
            }else{
                this.app.loadIcon(`${src}/font/flagname_unionpay2`,this.iconFont.children[0],168,45)
            }
        }else if(this.channel == 'bank_pay'){
            this.app.loadPublicIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            if(p_id == 16){
                this.wxtsLabel.string = `1.充值比例1元=1金币`
            }else{
                this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
            }
            if(p_id == 8|| p_id == 10 || p_id == 15|| p_id == 9||p_id ==12||p_id ==16 ||p_id ==18||p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('网银充值')
            }else{
                this.app.loadIcon(`${src}/font/flagname_unionpay`,this.iconFont.children[0],168,45)
            }
            let blinkNodeLabel = this.blinkNode.getComponent(cc.Label)
            blinkNodeLabel.string = "请使用与绑定银行卡相同账户名的账户进行支付"
            blinkNodeLabel.fontSize = 23
            blinkNodeLabel.lineHeight = 27
            this.blinkFun(this.blinkNode)
        }else if(this.channel =='im_pay'){
            this.app.loadPublicIcon(`recharge/icon_im`,this.icon,100,100)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('1.充值比例1元=1金币')}`
            if(p_id == 8|| p_id == 10 || p_id == 15|| p_id == 9||p_id ==12||p_id ==16 ||p_id ==18||p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('IM充值')
            }else{
                if(p_id == 2){
                    this.app.loadIcon(`${src}/font/flagname_rgpay`,this.iconFont.children[0],136,42)
                }else{
                    this.app.loadIcon(`${src}/font/title_im`,this.iconFont.children[0],136,45)
                }
            }
        }else if(this.channel =='digiccy'){
            this.app.loadPublicIcon(`recharge/flag_usdt`,this.icon,100,100)
            
            this.wxtsLabel.string = `1. 请依照选择的渠道链类型进行支付。2.${Language_pay.Lg.ChangeByText(`参考汇率：1USDT`)} ≈ ${this.conf_val}${Language_pay.Lg.ChangeByText(`金币`)}。`;
            this.app.loadPublicIcon(`recharge/subbg_usdt`,this.shuiyin,368,270)
            if(p_id == 8|| p_id == 10 || p_id == 15|| p_id == 9||p_id ==12||p_id ==16 ||p_id ==18|| p_id ==20){
                this.iconFont.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('USDT充值')
            }else{
                this.app.loadIcon(`${src}/font/flagname_usdt`,this.iconFont.children[0],200,45)
            }
        }
        if(this.app.UrlData.package_id  == 18 && this.channel =='digiccy'){
            this.wxtsLabel.node.active = true
        }else if(this.app.UrlData.package_id == 18){
            this.wxtsLabel.node.active = false
        }
    }
    setAmount() {
        if(this.current.name == this.handling_feeName && this.handling_fee !=0 ){
            //如果是小额充值方式，则禁用输入
            if(this.app.UrlData.package_id == 16){
                this.node.getChildByName("cyje").active = true
            }else{
                this.app.showAlert("请点选充值金额")
            }
        }else{
            this.app.showKeyBoard(this.amountLabel,1);
        }
    }
    public fetchZfb(){
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}`;
        let index = `0`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                let discount_rate = response.data.discount_rate
                if(self.channel == 'alipay' ){
                    self.results = response.data.alipay;
                    this.setInterval(discount_rate.alipay)
                }else if(self.channel == 'union_pay'){
                    self.results = response.data.union_pay;
                    this.setInterval(discount_rate.union_pay)
                    
                }else if(self.channel == 'wechat_pay'){
                    self.results = response.data.wechat_pay;

                    this.setInterval(discount_rate.wechat_pay)
                }else if(self.channel == 'bankcard_transfer'){
                    self.results = response.data.bankcard_transfer;
                    // self.huodongLabel.node.active=true;

                    this.setInterval(discount_rate.bankcard_transfer)
                    //验证有没有绑卡
                    this.fetchIndex()
                }else if(self.channel == 'quick_pay'){
                    self.results = response.data.quick_pay;
                    this.setInterval(discount_rate.quick_pay)
                }else if(self.channel == 'bank_pay'){
                    self.results = response.data.bank_pay;
                    this.setInterval(discount_rate.bank_pay)
                    //验证有没有绑卡
                    this.fetchIndex()
                }else if(self.channel =='im_pay'){
                    self.results = response.data.im_pay;
                    this.setInterval(discount_rate.im_pay)
                }else if(self.channel =='digiccy'){
                    self.results = response.data.digiccy;
                }
                self.current = self.results[0];
                self.handling_feeName = self.results[0]
                self.init(this.channel)
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
    setInterval(discount_rate_item) {
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
        var arr = []
        var span_amount = this.current.span_amount.split(',');
        this.czArea.string = `${Language_pay.Lg.ChangeByText('充值范围')}:(${this.current.min_amount}-${this.current.max_amount})`
        span_amount.forEach(e=>{
            if(arr.indexOf(e)=== -1){
                arr.push(e)
            }
        })
        console.log("out arr",arr)
        if(this.current.name == this.handling_feeName && this.handling_fee !=0 ){
            let blinkNodeLabel = this.blinkNode.getComponent(cc.Label)
            if(this.app.UrlData.package_id == 18){
                blinkNodeLabel.string = "此通道只能选择固定金额，必须1分钟内支付完成，若超时需要重新发起订单，切勿保存手机号重复支付，不然无法到账，损失自行承担。"
            }else if(this.app.UrlData.package_id == 16){
                blinkNodeLabel.string = ""
            }else{
                blinkNodeLabel.string = "温馨提示：此通道只能选择固定金额，必须1分钟内支付完成，若超时需要重新发起订单，切勿保存手机号重复支付，不然无法到账，损失自行承担。"
            }
            
            blinkNodeLabel.fontSize = 23
            blinkNodeLabel.lineHeight = 28
            this.blinkFun(this.blinkNode)
            let handling_feeLabel = this.iconFont.children[1]
            if( this.handling_fee!=0){
                handling_feeLabel.getComponent(cc.Label).string = `前${this.free_num}笔免费，手续费率${this.app.config.toDecimal(this.handling_fee*100)}%`
                handling_feeLabel.getComponent(cc.Label).fontSize = 30
                if(this.app.UrlData.package_id == 18){
                    handling_feeLabel.getComponent(cc.Label).fontSize = 23 
                }
                this.blinkFun(handling_feeLabel)
            }
            //请求获取当前的免费次数
            let callBack = (is_first)=>{
                //0 代表二次  1 代表 首次
                if(this.first_min <=0) {
                    //first_min 配置小于等于0，则沿用外面arr值
                    //删除旧的选项
                    this.neikuagn.removeAllChildren()
                    arr.forEach((e)=>{
                        var node = cc.instantiate(this.btnNum)
                        node.getComponent("payBtnNum").init(e,this.addGold.bind(this))
                        this.neikuagn.addChild(node)
                    })
                    //渠道16常用金额添加
                    if(this.app.UrlData.package_id  == 16){
                        this.node.getChildByName("cyje").removeAllChildren()
                        arr.forEach((e)=>{
                            var node = cc.instantiate(this.cyjeItem)
                            node.getComponent("payCyjeItem").init(e,this.addGold.bind(this))
                            this.node.getChildByName("cyje").addChild(node)
                        })
                    }
                }else{
                    arr = []
                    if(is_first == 1){
                        span_amount.forEach((e)=>{
                            if(Number(e)>= this.first_min && arr.indexOf(e)=== -1){
                                arr.push(e)
                            }
                        })
                        //删除旧的选项
                        this.neikuagn.removeAllChildren()
                        arr.forEach((e)=>{
                            var node = cc.instantiate(this.btnNum)
                            node.getComponent("payBtnNum").init(e,this.addGold.bind(this))
                            this.neikuagn.addChild(node)
                        })
                        //渠道16常用金额添加
                        if(this.app.UrlData.package_id  == 16){
                            this.node.getChildByName("cyje").removeAllChildren()
                            arr.forEach((e)=>{
                                var node = cc.instantiate(this.cyjeItem)
                                node.getComponent("payCyjeItem").init(e,this.addGold.bind(this))
                                this.node.getChildByName("cyje").addChild(node)
                            })
                        }
                    }else if(is_first == 0){
                        span_amount.forEach((e)=>{
                            if(Number(e)>= this.second_min && arr.indexOf(e)=== -1){
                                arr.push(e)
                            }
                        })
                        //删除旧的选项
                        this.neikuagn.removeAllChildren()
                        arr.forEach((e)=>{
                            var node = cc.instantiate(this.btnNum)
                            node.getComponent("payBtnNum").init(e,this.addGold.bind(this))
                            this.neikuagn.addChild(node)
                        })
                        //渠道16常用金额添加
                        if(this.app.UrlData.package_id  == 16){
                            this.node.getChildByName("cyje").removeAllChildren()
                            arr.forEach((e)=>{
                                var node = cc.instantiate(this.cyjeItem)
                                node.getComponent("payCyjeItem").init(e,this.addGold.bind(this))
                                this.node.getChildByName("cyje").addChild(node)
                            })
                        }
                    }
                }
            }
            this.getPayFlagbyPayType(callBack)
        }else {
            //删除旧的选项
            this.neikuagn.removeAllChildren()
            arr.forEach((e)=>{
                var node = cc.instantiate(this.btnNum)
                node.getComponent("payBtnNum").init(e,this.addGold.bind(this))
                this.neikuagn.addChild(node)
            })
            //渠道16常用金额添加
            if(this.app.UrlData.package_id  == 16){
                arr.forEach((e)=>{
                    var node = cc.instantiate(this.cyjeItem)
                    node.getComponent("payCyjeItem").init(e,this.addGold.bind(this))
                    this.node.getChildByName("cyje").addChild(node)
                })
            }
            if(this.channel != 'bankcard_transfer' && this.channel != 'bank_pay'){
                this.blinkNode.active = false
                this.iconFont.children[1].active = false
            }
        }
        
    }

    public deleteAmount(){
        
        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
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
        var amount = Number(this.amountLabel.string);
        var min_amount = Number(this.current.min_amount);
        var max_amount = Number(this.current.max_amount);
        if(this.amountLabel.string ==Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert('充值金额不能为空!')
        }else if(amount < min_amount || amount > max_amount){
            this.app.showAlert('不符合充值范围!')
        }else{
            if(this.channel == 'bankcard_transfer'){
                this.fetchOrder();
            }
            else if(this.app.UrlData.package_id == 16 && this.current.name == this.handling_feeName && this.handling_fee !=0){
                //小额渠道提示
                let url = `${this.app.UrlData.host}/api/payment/payment?user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&payment_amount=${this.amountLabel.string}&channel_type=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${this.app.gHandler.app.deviceID}&token=${this.app.token}&center_auth=${this.app.login_token}`
                this.app.showZfbWxAlert(url);
            }
            else{
                var url = `${this.app.UrlData.host}/api/payment/payment?user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&payment_amount=${this.amountLabel.string}&channel_type=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${this.app.gHandler.app.deviceID}&token=${this.app.token}&center_auth=${this.app.login_token}`;
                cc.sys.openURL(encodeURI(url))
                cc.log(encodeURI(url))
            }
        }
    }
    
    DelayBtn(){
        let czgoldbt1= cc.find("Canvas/Recharge/Content/Zfb/czgoldbt1").getComponent(cc.Button)
        czgoldbt1.interactable = false
        this.scheduleOnce(()=>{
            czgoldbt1.interactable = true
        },1)
    }

    showPayIM(){
        var url = `${this.app.UrlData.host}/api/payment/payment?user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&payment_amount=${this.amountLabel.string}&channel_type=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${this.app.gHandler.app.deviceID}&token=${this.app.token}&center_auth=${this.app.login_token}`;
        cc.find('payGlobal').getComponent('payGlobal').imWebViewUrl = encodeURI(url)
        cc.director.preloadScene("payIM",()=>{
            this.app.gHandler.reflect.setOrientation("portrait", 640, 1136)
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
            let show = false
            let package_ids = this.results[i].package_ids.split(",")
            package_ids.forEach(e=>{
                if(Number(e) == this.app.UrlData.package_id){
                    show = true
                }
            })
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
    addGold(e){
        //按键音效
        this.app.loadMusic(1);
        var string = e.currentTarget.children[1].getComponent(cc.Label).string;
        let amount = this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入') ? '0': this.amountLabel.string;
        var sum = Number(amount)+Number(string);
        if(this.app.UrlData.package_id == 16){
            //渠道16点击金额不累加
            this.amountLabel.string = string;
        }else{
            this.amountLabel.string = `${sum}`;
        }
        this.app.setInputColor(sum,this.amountLabel);
    }
    getLocalConf(){
        let pay_usdt = cc.sys.localStorage.getItem(`pay_usdt`)
        let time = new Date().getTime()/1000
        if(pay_usdt){
            let created_time = JSON.parse(pay_usdt).time
            if((time - created_time) > 6*3600){
                //如果超过六个小时，则重新拉取数据
                this.fetchGetConfigInfo()
            }else{
                //否则使用本地缓存的数据
                this.setConf_val(JSON.parse(pay_usdt))
            }
        }else{
            this.fetchGetConfigInfo()
        }
    }
    setConf_val(pay_usdt){
        this.conf_val = pay_usdt.conf_val
        this.init(this.channel)
    }
    public fetchGetConfigInfo(){
        var url = `${this.app.UrlData.host}/api/config/getConfigInfo?conf_key=usdt_to_cny1`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let time = new Date().getTime()/1000
                let JsonConfval = JSON.parse(response.data[0].conf_val)
                let Package_conf_val = 7
                for (var i in JsonConfval){
                    if( i == this.app.UrlData.package_id){
                        Package_conf_val = JsonConfval[i]
                    }
                }
                let pay_usdt = {
                    conf_val :Number(Package_conf_val), //汇率
                    time : time, //保存的时间
                }
                cc.sys.localStorage.setItem(`pay_usdt`,JSON.stringify(pay_usdt))
                this.setConf_val(pay_usdt)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
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
    public getPayFlagbyPayType(callBack){
        var url = `${this.app.UrlData.host}/api/payment/getPayFlagbyPayType?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&pay_type=${this.current.pay_type}&channel_type=${this.current.channel_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                // 0 代表二次  1 代表 首次
                callBack(response.data["is_first"])
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            this.app.hideLoading();
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
        if(this.node.name == "Zfb"){
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
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let qudao= cc.find("Canvas/Recharge/Content/Zfb/titlebg/group2/qudao")
        let txt_czje= cc.find("Canvas/Recharge/Content/Zfb/titlebg/group3/txt_czje")
        let btn_75= cc.find("Canvas/Recharge/Content/Zfb/titlebg/group3/group2/75")
        let czgoldbt1= cc.find("Canvas/Recharge/Content/Zfb/czgoldbt1")
        let label = null
        if(this.app.UrlData.package_id == 16){
            label= this.node.getChildByName('zi').getChildByName('labelTip').getComponent(cc.Label)
        }else{
            label= this.node.getChildByName('label').getComponent(cc.Label)
        }
        let blinkLabel = this.blinkNode.getComponent(cc.Label)

        if(this.app.UrlData.package_id != 15 && this.app.UrlData.package_id != 20 && this.app.UrlData.package_id != 16 && this.app.UrlData.package_id != 18){
            this.app.loadIconLg(`${src}/font/txt_qudao`,qudao)
            this.app.loadIconLg(`${src}/font/txt_czje`,txt_czje)
            label.string = `温馨提醒：\n该充值渠道只能使用专属充值方式，若使用其他支付方式支付，会影响即时到帐上分`
        }
        if(this.app.UrlData.package_id == 8||this.app.UrlData.package_id == 12){
            this.app.loadIconLg(`${src}/font/lijigoumai`,czgoldbt1.children[0])
            btn_75.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('重置')
        }else if(this.app.UrlData.package_id == 9){
            this.app.loadIconLg(`${src}/font/lijigoumai`,czgoldbt1.children[0])
            btn_75.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('重置')
        }else if(this.app.UrlData.package_id == 10){
            this.app.loadIconLg(`${src}/font/ljcz`,czgoldbt1.children[0])
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
        }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 16 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20){
        }else{
            this.app.loadIconLg(`${src}/btn/75`,btn_75)
            this.app.loadIconLg(`${src}/btn/czgoldbt1`,czgoldbt1)
        }
        blinkLabel.string =Language_pay.Lg.ChangeByText("请使用与绑定银行卡相同账户名的账户进行支付")
    }
    blinkFun(blinkNode){
        if(this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 16){
            //18不闪烁
            blinkNode.active = true
            return
        }
        blinkNode.stopAllActions()
        blinkNode.active = true
        var action1 = cc.tintTo(0.2, 255, 212, 105);
        var action2 = cc.tintTo(0.2, 229, 49, 20);
        blinkNode.runAction(cc.sequence(action1,action2).repeatForever())
    }
}
