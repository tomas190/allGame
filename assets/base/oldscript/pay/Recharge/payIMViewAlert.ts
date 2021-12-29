//支付宝webview
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.WebView)
    ZfbView:cc.WebView = null;

    app =null
    init(data){
        this.ZfbView.url = data.url;
        
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
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
            this.app.gHandler.reflect.setOrientation("landscape", 1334, 750)
            cc.director.loadScene('payRecharge')
        })
    }
    // update (dt) {}
}
