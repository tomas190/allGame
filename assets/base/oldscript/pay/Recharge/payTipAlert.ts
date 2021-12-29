

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    app  = null;

    onLoad(){
        this.label.string = `${Language_pay.Lg.ChangeByText('上一笔交易未完成，请到聊天工具中取消！')}`;
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
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
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
        // 唤起IM
        this.app.gHandler.reflect.setOrientation("portrait", 640, 1136)
        cc.director.loadScene('IMappStart');
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let surebtn1= this.node.getChildByName('popWindowBG').getChildByName('surebtn1')
        this.app.loadIconLg(`${src}/btn/surebtn1`,surebtn1)
    }
    // update (dt) {}
}
