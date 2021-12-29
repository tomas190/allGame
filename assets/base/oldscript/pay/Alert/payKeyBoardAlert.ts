
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    inputlabel: cc.Label = null;

   

    @property(cc.Node)
    lowerContent :cc.Node = null;

    @property(cc.Node)
    CapContent :cc.Node = null;

    @property
    label = null;
    isCap = false;
    type = null;
    app = null;
    init(label,type){
        this.label = label;
        if(label.string == '点击输入'){
            this.inputlabel.string = '';
        }else{
            this.inputlabel.string = label.string;
        }
        
        this.type = type;
    }

    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.CapContent.active = false;
        let dom = document.getElementById('GameCanvas');
        let self = this;
        dom.onkeydown = (e)=>{
            if(e.key.length>1){
                switch(e.key){
                    case 'Backspace':
                        self.deleteString();
                        break;
                    case 'Enter':
                        self.onClick();
                        break;
                    default:
                        break;
                }
            }else{
                self.inputlabel.string = self.inputlabel.string+e.key
            }
        }
        this.setLanguageResource()
    }
    add1(e){
        //按键音效
        this.app.loadMusic(1);

        let font  = e.target.children[0].getComponent(cc.Label).string;
        this.inputlabel.string = this.inputlabel.string+font;
        if(this.type == 4){
            this.inputlabel.string = this.inputlabel.string.substring(0,4)
        }
    }
    deleteString(){
        //按键音效
        this.app.loadMusic(1);

        this.inputlabel.string = this.inputlabel.string.substr(0,this.inputlabel.string.length-1);
    }

    deleteAll(e){
        //按键音效
        this.app.loadMusic(1);

        this.inputlabel.string ='';
    }

    toCap(){
        //按键音效
        this.app.loadMusic(1);

        if(this.isCap){
            this.CapContent.active = false;
            this.lowerContent.active = true;
            this.isCap = false;
        }else{
            this.CapContent.active = true;
            this.lowerContent.active = false;
            this.isCap = true;
        }
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        let string = this.app.labelType(this.inputlabel.string,this.type);
        if(string == ''){
            string = '点击输入'
            this.app.setInputColor("",this.label);
        }else{
            this.app.setInputColor("2",this.label);
        }
        this.label.string = string;
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        
        this.node.removeFromParent();
    }
    setLanguageResource(){
        if(this.app.UrlData.package_id != 16){
            let wancheng_label= this.node.getChildByName('Content').getChildByName('input').getChildByName('wancheng').getChildByName('label').getComponent(cc.Label)
            wancheng_label.string = Language_pay.Lg.ChangeByText('完成')
        }
    }
}
