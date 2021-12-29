//兑换首页
import { Language_pay } from "./../language/payLanguage";
import appGlobal = require("../../../../base/app/appGlobal");
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content:cc.Node = null;

    @property(cc.Prefab)
    CashHistory:cc.Prefab = null;

    @property(cc.Prefab)
    Sxxq:cc.Prefab = null 

    @property()
    public results : any = {};
    public zfbResults : any = {};
    public app : any = {};
    timer = null;
    canExit= null;
    sxAmount = 0 //受限金额
    onLoad () {

        this.app = cc.find('Canvas/Main').getComponent('payMain');

        this.fetchIndex();

        //设置延迟，避免用户频繁操作导致报错
        this.timer = setTimeout(() => {
            this.canExit = true;
            clearTimeout(this.timer)
        }, 1000);
        let scalex = cc.winSize.width / 1334;
        console.log("scalex",scalex);
        if(this.app.UrlData.package_id != 16){
            if(scalex >1.1){
                this.Content.scaleY = scalex/1.1;
            }
            this.node.scaleX = scalex;
        }
        if(this.app.UrlData.package_id == 9)
        {  
            let fanhui = cc.find("header/fanhui",this.node);
            fanhui.scaleY/=this.node.scaleY;
            fanhui.scaleX/=this.node.scaleX;
        }else if(this.app.UrlData.package_id == 16){
            //渠道16才显示受限金额 
        }
        this.ToggleContainer.parent.parent.height = Number(this.ToggleContainer.parent.parent.height)-Number(this.ToggleContainer.parent.parent.height)*(scalex-1)
        this.setLanguageResource()
    }
    public exitBtnClick(){
        if(!this.canExit) return
        //按键音效
        this.app.loadMusic(1)
        let scree = this.app.gHandler.gameGlobal.pay.from_scene;
        this.app.gHandler.gameGlobal.pay.from_scene = "";
        if (scree == ""){
            scree = "hall"
        }
        
        cc.director.preloadScene(scree,()=>{
            cc.director.loadScene(scree);
        })
    }

    public historyBtnClick() {
        //按键音效
        this.app.loadMusic(1);
        this.app.showLoading()
        var node = cc.instantiate(this.CashHistory);
        var Cash = cc.find('Canvas/Cash');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/Cash/DhHistory")){
            Cash.addChild(node);
        }
    }
    //受限详情
    sxxqClick(){
        //按键音效
        this.app.loadMusic(1);
        this.app.showLoading()
        var node = cc.instantiate(this.Sxxq)
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/Cash/Sxxq")){
            cc.find("Canvas/Cash").addChild(node)
        }
    }
    public fetchIndex(){
        // 20210508_支付系统, 正式环境富鑫II游戏(package_id=10)屏蔽充值界面和收益界面信息
        // if(this.app.UrlData.package_id == 10 && appGlobal.huanjin == 'online') {
        //     this.app.hideLoading()
        //     return
        // }
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.results = response;
                this.addNavToggle()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public addNavToggle(){
        var arr = [];
        if(!this.results.data.withDraw_info) return;
        if(this.results.data.withDraw_info.artificial){
            if(this.results.data.withDraw_info.artificial.is_close > 0){
                //15不开放人工兑换
                if(this.app.UrlData.package_id == 15|| this.app.UrlData.package_id == 16|| this.app.UrlData.package_id == 20){
                    return
                }
                arr.push('人工兑换')
            }
        }
        if(this.results.data.withDraw_info.bankcard){
            if(this.results.data.withDraw_info.bankcard.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.bankcard.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                        arr.push('银行卡兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.alipay){
            if(this.results.data.withDraw_info.alipay.is_close > 0){
                arr.push('支付宝兑换')
            }
        }
        if(this.results.data.withDraw_info.usdt){
            if(this.results.data.withDraw_info.usdt.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.usdt.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('USDT兑换')
                   }
                })
            }
        }
        if(arr.length>0){
            //有兑换渠道时才显示兑换记录
            if(this.app.UrlData.package_id == 16){
                // arr.push('银行卡管理')
            }else{
                arr.push('兑换记录')
            }
        }
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payDhToggle').init({
                text:arr[i]
            })
        }
        //首次加载，顺序第一的显示
        if(arr[0]=='人工兑换'){
            this.ToggleContainer.children[0].getComponent('payDhToggle').addContent('RgDh')
        }else if(arr[0] == "银行卡兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle').addContent('BankDh')
        }else if(arr[0] == "支付宝兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle').addContent('Dh')
        }else if(arr[0] == "USDT兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle').addContent('USDT')
        }else if(arr[0] == "兑换记录"){
            this.ToggleContainer.children[0].getComponent('payDhToggle').addContent('DhHistory')
        }
    }
    onDestroy(){
        clearTimeout(this.timer)
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let title= cc.find('Canvas/Cash/header/title')
        this.app.loadIconLg(`${src}/font/title_shouyi`,title)
        
        let loadSP = cc.find('Loading/loadSP')
        loadSP.children.forEach((e)=>{
            if (e.name == Language_pay.Lg.Language){
                e.active = true
            }else{
                e.active = false
            }
        })
    }
}
