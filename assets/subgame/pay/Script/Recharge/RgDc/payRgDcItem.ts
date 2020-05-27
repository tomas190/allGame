

const {ccclass, property} = cc._decorator;

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
        this.app.loadIcon(`icon/${index%7+1}`,this.iconSprite,60,56)
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

   onClick(){
        //按键音效
        this.app.clickClip.play();
        this.app.showWriteMoneyAlert(this,1,this.data);
        
   }
}

