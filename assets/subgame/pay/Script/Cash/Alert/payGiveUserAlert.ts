
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property()
    public app = null;
    public parentComponent = null;

    public init(data){
        this.parentComponent = data.parentComponent;
        this.label.string = `您确认赠送${this.app.config.toDecimal(data.gold)}金币，给玩家（ID:${data.data.id},昵称:${data.data.game_nick}）吗？`
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();

        this.parentComponent.showTestPassword(6);
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        
        this.node.destroy();
    }
    // update (dt) {}
}
