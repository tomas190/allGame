//人工代充

import gHandler = require("../../../../../common/script/common/gHandler");

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    ScrollView : cc.Node = null

    @property(cc.Node)
    content: cc.Node = null;
    
    @property(cc.Prefab)
    RgDcItem : cc.Prefab = null;

    @property()
    results = null;
    app = null;
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.resizeCenter()
    }
    fetchIndex(){
        let url = `${this.app.UrlData.imHost}/im/api/recharge/list?skip=0&limit=6&token=c7a9d6g21v87s&package_id=${this.app.UrlData.package_id}&user_type=1`
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            //避免快速点击退出大厅报错
            if(self.app){
                self.app.hideLoading()
            }else{
                return
            }
            if(response.code== 0){
                self.results = response;
                self.renderItem()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.app.hideLoading()
        })
    }
    resizeCenter(){
        let scalex = cc.winSize.width / 1334;
        let scrollH = this.ScrollView.height 
        this.ScrollView.height = scrollH/Number(scalex.toFixed(2))
    }
    renderItem(){
        if(this.results.data != null){
            this.results.data.forEach((e,index )=> {
                var node = cc.instantiate(this.RgDcItem);
                this.content.addChild(node);
                node.getComponent('payRgDcItem').init(e,index);
            });
        }
    }
    //联系客服
    onClick(){
        // 唤起IM
        gHandler.Reflect.setOrientation("portrait", 640, 1136)
        cc.director.loadScene('IMappStart');
    }
}
