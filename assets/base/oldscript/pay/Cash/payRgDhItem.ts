
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    iconSprite: cc.Node = null;

    @property(cc.Prefab)
    RgDhAlert :cc.Prefab = null;

    @property(cc.Prefab)
    RgDhAlert_8 :cc.Prefab = null;

    @property(cc.Prefab)
    RgDhAlert_9 :cc.Prefab = null;

    @property(cc.Prefab)
    RgDhAlert_10 :cc.Prefab = null;

    @property()
    app = null;
    results = null;
    data=null;
    isClick =null;
    init(results,index,data){
        this.nameLabel.string = `${results.nick_name}`,
        this.results = results;
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
       console.log(this.data)
        if(this.data.data.list.length == 0){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('请先设置账户!')}`)
        }else{
            this.showRgDhAlert();
        }
   }

   showRgDhAlert(){
        var node = null
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 12){
            node = cc.instantiate(this.RgDhAlert_8);
        }else  if(this.app.UrlData.package_id == 9){
            node = cc.instantiate(this.RgDhAlert_9);
        }else  if(this.app.UrlData.package_id == 10){
            node = cc.instantiate(this.RgDhAlert_10);
        }else{
            node = cc.instantiate(this.RgDhAlert);
        }
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payRgDhAlert').init({
            results:this.results,
            data : this.data
        })
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let guanfrz= this.node.getChildByName('Layout').getChildByName('guanfrz')
        let zhuanxkf= this.node.getChildByName('Layout').getChildByName('zhuanxkf')
        let bg_fan= this.node.getChildByName('Layout').getChildByName('bg_fan')
        let pingji= this.node.getChildByName('Layout').getChildByName('pingji').getComponent(cc.Label)

        this.app.loadIconLg(`${src}/btn/guanfrz`,guanfrz)
        this.app.loadIconLg(`${src}/btn/zhuanxkf`,zhuanxkf)
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 12){
            bg_fan.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('兑换')
        }else{
            this.app.loadIconLg(`${src}/btn/btn_chongzhi`,bg_fan)
        }

        pingji.string = Language_pay.Lg.ChangeByText(`月评级5星+`)
    }
}
