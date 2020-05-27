//兑换首页
import gHandler = require("../../../../common/script/common/gHandler");

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content:cc.Node = null;

    @property()
    public results : any = {};
    public zfbResults : any = {};
    public app : any = {};
    timer = null;
    canExit= null;
    onLoad () {

        this.app = cc.find('Canvas/Main').getComponent('payMain');

        this.fetchIndex();

        //设置延迟，避免用户频繁操作导致报错
        this.timer = setTimeout(() => {
            this.canExit = true;
            clearTimeout(this.timer)
        }, 1000);
        let scalex = cc.winSize.width / 1334;
        this.node.scaleY = scalex;
        this.node.scaleX = scalex;
    }
    public exitBtnClick(){
        if(!this.canExit) return
        //按键音效
        this.app.clickClip.play()
        let scree = gHandler.gameGlobal.pay.from_scene;
        gHandler.gameGlobal.pay.from_scene = "";
        if (scree == ""){
            scree = "hall"
        }
        
        cc.director.preloadScene(scree,()=>{
            cc.director.loadScene(scree);
        })
    }

    public fetchIndex(){

        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                self.results = response;
                self.addNavToggle()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    public addNavToggle(){
        var arr = [];
        if(!this.results.data.withDraw_info) return;
        if(this.results.data.withDraw_info.artificial){
            if(this.results.data.withDraw_info.artificial.is_close > 0){
                arr.push('人工兑换')
            }
        }
        if(this.results.data.withDraw_info.bankcard){
            if(this.results.data.withDraw_info.bankcard.is_close > 0){
                arr.push('银行卡兑换')
            }
        }
        if(this.results.data.withDraw_info.alipay){
            if(this.results.data.withDraw_info.alipay.is_close > 0){
                arr.push('支付宝兑换')
            }
        }
        arr.push('兑换记录')
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payDhToggle').init({
                text:arr[i]
            })
        }
        //首次加载，顺序第一的显示
        if(arr[0]=='人工兑换'){
            node.getComponent('payDhToggle').addContent('RgDh')
        }else if(this.results.data.withDraw_info.bankcard.channel.length > 0){
            node.getComponent('payDhToggle').addContent('BankDh')
        }else if(this.results.data.withDraw_info.alipay.channel.length > 0){
            node.getComponent('payDhToggle').addContent('Dh')
        }
    }
    onDestroy(){
        clearTimeout(this.timer)
    }
}
