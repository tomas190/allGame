

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    iconSprite: cc.Node = null;

    @property()
    app = null;
    data = null;
    isClick =null;
    init(data,index){
        this.nameLabel.string = `${data.nick_name}`,
        this.data = data;
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.app.loadPublicIcon(`icon/${index%7+1}`,this.iconSprite,60,56)
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }

   onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.app.showWriteMoneyAlert(this,1,this.data);
        
   }
   setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let guanfrz= this.node.getChildByName('layout').getChildByName('guanfrz')
        let zhuanxkf= this.node.getChildByName('layout').getChildByName('zhuanxkf')
        let bg_fan= this.node.getChildByName('layout').getChildByName('bg_fan')
        let pingjiLabel= this.node.getChildByName('layout').getChildByName('pingjiLabel').getComponent(cc.Label)

        this.app.loadIconLg(`${src}/btn/guanfrz`,guanfrz)
        this.app.loadIconLg(`${src}/btn/zhuanxkf`,zhuanxkf)
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 10 || this.app.UrlData.package_id == 12){
            bg_fan.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('充值')
        }else{
            this.app.loadIconLg(`${src}/btn/btn_chongzhi`,bg_fan)
        }
        
        pingjiLabel.string=`${Language_pay.Lg.ChangeByText('月评级5星+')}`
    }
}

