

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    btnNum: cc.Prefab = null;

    @property
    label = null;
    cash = null;
    app  = null;
    parentcallBack = null;
    init(label,parentcallBack){
        this.parentcallBack = parentcallBack
        this.label = label;
    }
    onLoad(){
        this.cash = cc.find('Canvas/Cash').getComponent('payCash')
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchwith_drawjisuamounts()
    }
    // 提現匹配 - 查詢可用提現額度 (根據後台設定 沒有回空陣列)
    public fetchwith_drawjisuamounts(){
        var url = `${this.app.UrlData.host}/api/with_draw/jisu/amounts?`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                self.renderBtn(response.data)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    renderBtn(data){
        data.forEach((e) => {
            var node = cc.instantiate(this.btnNum)
            node.getComponent("payBtnNum").init(e,this.callBack.bind(this))
            this.content.addChild(node)
        });
    }
    callBack(e){
        this.label.string = e.currentTarget.children[1].getComponent(cc.Label).string;
        this.parentcallBack(Number(this.label.string))
        this.node.removeFromParent();
    }
    removeSelf(){
        this.node.removeFromParent();
    }
}
