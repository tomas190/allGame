//充值首页
import { Language_pay } from "./../language/payLanguage";
import appGlobal = require("../../../../base/app/appGlobal");
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Prefab)
    RechargeHistory: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content: cc.Node = null;

    @property()
    public zfbResults: any = {};
    public app  = null;
    timer = null;
    canExit = false;
    indexData = {}
    onLoad() {
        var Global = cc.find('payGlobal');
        cc.game.addPersistRootNode(Global); 
        
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        //请求支付宝
        this.fetchZfb();
        //设置延迟，避免用户频繁操作导致报错
        this.timer = setTimeout(() => {
            this.canExit = true;
            clearTimeout(this.timer)
        }, 1000);
        let scalex = cc.winSize.width / 1334;
        console.log("scalex",scalex)
        if(this.app.UrlData.package_id != 16){
            if(scalex >1.1){
                this.Content.scaleY = scalex/1.1;
            }
            this.node.scaleX = scalex;
        }
        if(this.app.UrlData.package_id == 9)
        {  
            let fanhui = cc.find("header/fanhui",this.node);
            // fanhui.scaleY/=this.node.scaleY;
            fanhui.scaleX/=this.node.scaleX;
        }
        this.ToggleContainer.parent.parent.height = Number(this.ToggleContainer.parent.parent.height)*cc.winSize.height/750
        this.setLanguageResource()
        if(this.app.UrlData.package_id == 16){
            this.fetchIndex()
        }
    }
    //返回大厅
    public exitBtnClick() {
        if(!this.canExit) return
        //按键音效
        this.app.loadMusic(1)
        // let scree = this.app.gHandler.gameGlobal.pay.from_scene;
        // this.app.gHandler.gameGlobal.pay.from_scene = "";
        // if (scree == ""){
        //     scree = "hall"
        // }
        // if(this.app.gHandler.subGameList['hbsl']&&this.app.gHandler.subGameList['zrsx1']&&this.app.gHandler.subGameList['zrsx1']){
        //     if (scree == this.app.gHandler.subGameList['hbsl'].lanchscene
        //         || scree == this.app.gHandler.subGameList['zrsx1'].lanchscene
        //         || scree == this.app.gHandler.subGameList['pccp'].lanchscene) { //  真人视讯 红包扫雷 派彩 竖屏
        //         this.app.gHandler.reflect && this.app.gHandler.reflect.setOrientation("portrait")
        //     }
        // }
        this.app.gHandler.eventMgr.dispatch(this.app.gHandler.eventMgr.showJumpScene,"hall")
    }
    //充值历史
    public historyBtnClick() {
        //按键音效
        this.app.loadMusic(1);
        this.app.showLoading();
        var node = cc.instantiate(this.RechargeHistory);
        var Recharge = cc.find('Canvas/Recharge');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/Recharge/RechargeHistory")){
            Recharge.addChild(node);
        }
    }

    public fetchZfb() {
         // 20210508_支付系统, 正式环境富鑫II游戏(package_id=10)屏蔽充值界面和收益界面信息
        //  if(this.app.UrlData.package_id == 10 && appGlobal.huanjin == 'online') {
        //     this.app.hideLoading()
        //     return
        // }
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if (response.status == 0) {
                self.zfbResults = response;
                //动态渲染左侧导航
                self.addNavToggle()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                let goldlabel = this.node.getChildByName("header").getChildByName("zyd").getChildByName("label").getComponent(cc.Label)
                goldlabel.string = this.app.config.toDecimal(response.data.game_gold);
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading()
        })
    }
    public addNavToggle() {
        let  payment_mode_sort = {}
        if (this.zfbResults.data.payment_mode_sort){
            payment_mode_sort = this.zfbResults.data.payment_mode_sort;
        }else{
            payment_mode_sort = {
                daichong:1,
                bankcard_transfer: 2,
                im_pay: 3,
                alipay: 4,
                quick_pay: 5,
                bank_pay: 6,
                wechat_pay: 7,
                union_pay: 8,
                digiccy :9,
            }
        }
        var sortArr = []
        for (var k in payment_mode_sort){
            sortArr[payment_mode_sort[k]] = k
        }
        var arr = [];
        //根据排序渲染值,同时也起到开关的作用
        sortArr.forEach((e) => {
            switch (e){
                case "alipay" :
                     //新增渠道判断
                     if(this.zfbResults.data.alipay.length  >= 1){
                        this.zfbResults.data.alipay.forEach(e=>{
                            let results = e
                            //先看大渠道是否显示
                            let package_ids = results.package_ids.split(",")
                            let show = false
                            package_ids.forEach(e=>{
                                if(Number(e) == this.app.UrlData.package_id){
                                    show = true
                                }
                            })
                            if(show && results.rate != "" && results.rate !="0.0000"){
                                let rate = {}
                                try{
                                    rate = JSON.parse(results.rate)
                                }catch(err){
                                    console.log("err",err)
                                }
                                //当rate不为空时要根据渠道id判断是否需要显示
                                let packageArr= []
                                for(let k in rate){
                                    packageArr.push(Number(k))
                                }
                                if(packageArr.indexOf(this.app.UrlData.package_id)>-1 && arr.indexOf("支付宝")== -1){
                                    arr.push('支付宝')
                                }
                            }
                        })
                        
                    }
                    break
                case "bankcard_transfer":
                    if (this.zfbResults.data.bankcard_transfer.length > 0 ) {
                         //先看大渠道是否显示
                         let show = false
                         this.zfbResults.data.bankcard_transfer.forEach(e=>{
                             let package_ids = e.package_ids.split(",")
                             package_ids.forEach(e=>{
                                 if(Number(e) == this.app.UrlData.package_id){
                                     show = true
                                 }
                             })
                         })
                         if(show){
                             arr.push('转账到银行卡')
                         }
                    }
                    break
                case "quick_pay" :
                    if (this.zfbResults.data.quick_pay.length > 0 ) {
                        //先看大渠道是否显示
                        let show = false
                        this.zfbResults.data.quick_pay.forEach(e=>{
                            let package_ids = e.package_ids.split(",")
                            package_ids.forEach(e=>{
                                if(Number(e) == this.app.UrlData.package_id){
                                    show = true
                                }
                            })
                        })
                        if(show){
                            arr.push('快捷支付')
                        }
                    }
                    break
                case "bank_pay" :
                    if (this.zfbResults.data.bank_pay.length > 0  ) {
                        //先看大渠道是否显示
                        let show = false
                        this.zfbResults.data.bank_pay.forEach(e=>{
                            let package_ids = e.package_ids.split(",")
                            package_ids.forEach(e=>{
                                if(Number(e) == this.app.UrlData.package_id){
                                    show = true
                                }
                            })
                        })
                        if(show){
                            arr.push('网银支付')
                        }
                    }
                    break
                case "wechat_pay" :
                    //新增渠道判断
                    if(this.zfbResults.data.wechat_pay.length  >= 1){
                        this.zfbResults.data.wechat_pay.forEach(e=>{
                            let results = e
                            //先看大渠道是否显示
                            let package_ids = results.package_ids.split(",")
                            let show = false
                            package_ids.forEach(e=>{
                                if(Number(e) == this.app.UrlData.package_id){
                                    show = true
                                }
                            })
                            if(show && results.rate != "" && results.rate !="0.0000"){
                                let rate = {}
                                try{
                                    rate = JSON.parse(results.rate)
                                }catch(err){
                                    console.log("err",err)
                                }
                                //当rate不为空时要根据渠道id判断是否需要显示
                                let packageArr= []
                                for(let k in rate){
                                    packageArr.push(Number(k))
                                }
                                
                                if(packageArr.indexOf(this.app.UrlData.package_id)>-1&& arr.indexOf("微信")== -1 ){
                                    arr.push('微信')
                                }
                            }
                        })
                    }
                    break
                case "union_pay" :
                    if (this.zfbResults.data.union_pay.length > 0 ) {
                        //先看大渠道是否显示
                        let show = false
                        this.zfbResults.data.union_pay.forEach(e=>{
                            let package_ids = e.package_ids.split(",")
                            package_ids.forEach(e=>{
                                if(Number(e) == this.app.UrlData.package_id){
                                    show = true
                                }
                            })
                        })
                        if(show){
                            arr.push('银联扫码')
                        }
                    }
                    break
                case "im_pay" :
                    if ( this.zfbResults.data.im_pay.length > 0  ) {
                        //先看大渠道是否显示
                        let show = false
                        this.zfbResults.data.im_pay.forEach(e=>{
                            let package_ids = e.package_ids.split(",")
                            package_ids.forEach(e=>{
                                if(Number(e) == this.app.UrlData.package_id){
                                    show = true
                                }
                            })
                        })
                        if(show){
                            arr.push('IM充值')
                        }
                    }
                    break
                case "daichong" :
                    //15不开发人工代充
                    if(this.app.UrlData.package_id == 15){
                        break
                    }
                    //人工代充不显示 10.8
                    // arr.push('人工代充值')
                    break 
                case "digiccy" :
                    if ( this.zfbResults.data.digiccy.length > 0  ) {
                        //先看大渠道是否显示
                        let show = false
                        this.zfbResults.data.digiccy.forEach(e=>{
                            let package_ids = e.package_ids.split(",")
                            package_ids.forEach(e=>{
                                if(Number(e) == this.app.UrlData.package_id){
                                    show = true
                                }
                            })
                        })
                        if(show){
                            arr.push('USDT')
                        }
                    }
                    break
            }
        });
        for (let i: number = 0; i < arr.length; i++) {
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payNavToggle').init({
                text: arr[i]
            },this.zfbResults.data.discount_rate)
        }
        //首次加载，顺序第一的显示
        if(arr[0]=='人工代充值'){
            node.getComponent('payNavToggle').addDc()
        }else if(arr[0]=='支付宝' && this.zfbResults.data.alipay.length > 0  ){
            node.getComponent('payNavToggle').addContent('alipay')

        }else if(arr[0]=='转账到银行卡' &&  this.zfbResults.data.bankcard_transfer.length > 0 ){
            node.getComponent('payNavToggle').addContent('bankcard_transfer')

        }else if(arr[0]=='银联扫码' && this.zfbResults.data.union_pay.length > 0 ){
            node.getComponent('payNavToggle').addContent('union_pay')

        }else if(arr[0]=='微信' && this.zfbResults.data.wechat_pay.length > 0 ){
            node.getComponent('payNavToggle').addContent('wechat_pay')

        }else if(arr[0]=='快捷支付' && this.zfbResults.data.quick_pay.length > 0){
            node.getComponent('payNavToggle').addContent('quick_pay')

        }else if(arr[0]=='网银支付' && this.zfbResults.data.bank_pay.length > 0  ){
            node.getComponent('payNavToggle').addContent('bank_pay')
        }else if(arr[0]=='IM充值' && this.zfbResults.data.im_pay.length > 0  ){
            node.getComponent('payNavToggle').addContent('im_pay')
        }else if(arr[0]=='USDT' && this.zfbResults.data.digiccy.length > 0  ){
            node.getComponent('payNavToggle').addContent('digiccy')
        }
    }
    //银商
    webLinkClick(){
        let url = "https://www.xiniugongzuoshi.vip/"
        cc.sys.openURL(encodeURI(url))
        cc.log(encodeURI(url))
    }
    //金鼎
    webLinkJinDingClick(){
        let url = "https://www.jdcfwealth.com/"
        cc.sys.openURL(encodeURI(url))
        cc.log(encodeURI(url))
    }
    //刷新金额
    reFreshGold(){
        this.fetchIndex()
        let node = this.node.getChildByName("header").getChildByName("zyd").getChildByName("sx")
        let action = cc.rotateBy(1,720)
        node.stopAllActions()
        node.runAction(action)
        let goldlabel = this.node.getChildByName("header").getChildByName("zyd").getChildByName("label").getComponent(cc.Label)
        goldlabel.string = "刷新中...";
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let title= cc.find('Canvas/Recharge/header/title')
        let chongzhilishi= cc.find('Canvas/Recharge/chongzhilishi')
        console.log("this.app.UrlData.package_id",this.app.UrlData.package_id)
        this.app.loadIconLg(`${src}/font/9`,title);
        if(this.app.UrlData.package_id == 9)
        {
            chongzhilishi.getComponent(cc.Widget).target = cc.find('Canvas');
        }else if(this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 16 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20){

        }else{
            this.app.loadIconLg(`${src}/btn/chongzhilishi`,chongzhilishi);
        }
        
        let loadSP = cc.find('Loading/loadSP')
        loadSP.children.forEach((e)=>{
            if (e.name == Language_pay.Lg.Language){
                e.active = true
            }else{
                e.active = false
            }
        })
    }
    onDestroy(){
        clearTimeout(this.timer)
    }
}
