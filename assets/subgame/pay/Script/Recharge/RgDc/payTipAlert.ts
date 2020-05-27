
import gHandler = require("../../../../../common/script/common/gHandler");

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    app  = null;

    onLoad(){
        this.label.string = `上一笔交易未完成，请到聊天工具中取消！`;
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
    onClick(){
        //按键音效
        this.app.clickClip.play();
        this.intoIncompleteOrder()
    }
    intoIncompleteOrder(){
        let imHost = this.app.UrlData.imHost;
        let url = `${imHost}/im/api/intoIncompleteOrder`;
        let dataStr = `user_id=${this.app.UrlData.user_id}`
        let self = this;
        cc.log('intoIncompleteOrder',url,'dataStr',dataStr)
        this.app.ajax('POST',url,dataStr,()=>{
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
        // 唤起IM
        gHandler.Reflect.setOrientation("portrait", 640, 1136)
        cc.director.loadScene('IMappStart');
    }

    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
    }
    // update (dt) {}
}
