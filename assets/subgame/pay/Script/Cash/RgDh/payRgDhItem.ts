
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    iconSprite: cc.Node = null;

    @property(cc.Prefab)
    TestPasswordAlert:cc.Prefab = null;

    @property(cc.Prefab)
    RgDhAlert :cc.Prefab = null;
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
        this.app.loadIcon(`icon/${index%7+1}`,this.iconSprite,60,56)
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
   
   onClick(){
       //按键音效
       this.app.clickClip.play();
       console.log(this.data)
        if(this.data.data.list.length == 0){
            this.app.showAlert('请先设置账户!')
        }else{
            this.showRgDhAlert();
        }
   }

   showRgDhAlert(){
        var node = cc.instantiate(this.RgDhAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payRgDhAlert').init({
            results:this.results,
            data : this.data
        })
    }
   
}
