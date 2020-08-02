//支付宝webview
import gHandler = require("../../../../../common/script/common/gHandler");
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.WebView)
    ZfbView:cc.WebView = null;

    init(data){
        this.ZfbView.url = data.url;
        
    }
    onLoad(){
        var global = cc.find("payGlobal").getComponent("payGlobal")
        this.ZfbView.url = global.imWebViewUrl;
        this.initView()
    }
    initView(){
        var e = cc.view.getVisibleSize();
        e.height / 1334 < 1 && this.node.setScale(e.width / 750, e.height / 1334);
    }
    onClick(){
        cc.director.preloadScene('payRecharge',()=>{
            gHandler.Reflect.setOrientation("landscape", 1334, 750)
            cc.director.loadScene('payRecharge')
        })
    }
    // update (dt) {}
}
