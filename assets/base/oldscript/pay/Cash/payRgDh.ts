import { Language_pay } from "./../language/payLanguage";
const {ccclass, property} = cc._decorator;
@ccclass
export default class payRgDh extends cc.Component {
    @property(cc.Node)
    ScrollView : cc.Node = null

    @property(cc.Node)
    content: cc.Node = null;
    
    @property(cc.Prefab)
    RgDcItem : cc.Prefab = null;

    @property()
    results = null;
    app = null;
    data = null;
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchImIndex();
        this.resizeCenter()
        this.setLanguageResource()
    }
    
    fetchImIndex(){
        let url = `${this.app.UrlData.imHost}/im/api/recharge/list?skip=0&limit=6&token=c7a9d6g21v87s&package_id=${this.app.UrlData.package_id}&user_type=2`
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            //避免快速点击退出大厅报错
            if(this.app){
                this.app.hideLoading()
            }else{
                return
            }
            if(response.code== 0){
                self.results = response;
                self.fetchIndex();
               
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading()
        })
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                self.data = response;
                self.renderItem();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
   
    renderItem(){
        if(this.results.data != null){
            this.content.removeAllChildren();
            this.results.data.forEach((e,index )=> {
                var node = cc.instantiate(this.RgDcItem);
                this.content.addChild(node);
                node.getComponent('payRgDhItem').init(e,index,this.data)
            });
        }
    }
    resizeCenter(){
        let scalex = cc.winSize.width / 1334;
        let scrollH = this.ScrollView.height 
        this.ScrollView.height = scrollH/Number(scalex.toFixed(2))
    }
    showIm(){
        // 唤起IM
        console.log('唤起IM','IMappStart')
        this.app.gHandler.reflect.setOrientation("portrait", 640, 1136)
        cc.director.loadScene('IMappStart');
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let VIPpay_banner_1= cc.find("Canvas/Cash/Content/RgDh/VIPpay_banner_1")
        let tips000= cc.find("Canvas/Cash/Content/RgDh/frame/layout/tips000")
        let btn_contactCS= cc.find("Canvas/Cash/Content/RgDh/frame/layout/btn_contactCS")

        this.app.loadIconLg(`${src}/form/VIPpay_banner_1`,VIPpay_banner_1)
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 9 ||this.app.UrlData.package_id == 10 || this.app.UrlData.package_id == 12){
            tips000.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('在兑换过程中，如果遇到没有回应等任何问题，请联系客服处理')
            btn_contactCS.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('联系客服')
        }else{
            this.app.loadIconLg(`${src}/font/tips000`,tips000)
            this.app.loadIconLg(`${src}/btn/btn_contactCS`,btn_contactCS)
        }
    }
}
