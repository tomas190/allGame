const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;

    @property
    app =null;
    index = null;
    parentComponet : any = ''
    text = null;

    public init(data){
        this.text =data.text;
        this.index = data.index;
        this.parentComponet = data.parentComponet
        if(this.index == 0){
            this.app.loadIcon('recharge/menu/menu_all_2',this.normalIcon,207,44)
            this.app.loadIcon('recharge/menu/menu_all_1',this.currentIcon,249,86);
        }else if(this.index == 1){
            this.app.loadIcon('recharge/menu/menu_unfinished_2',this.normalIcon,207,44)
            this.app.loadIcon('recharge/menu/menu_unfinished_1',this.currentIcon,249,86);
        }else if(this.index == 2){
            this.app.loadIcon('recharge/menu/menu_finished_2',this.normalIcon,207,44)
            this.app.loadIcon('recharge/menu/menu_finished_1',this.currentIcon,249,86);
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();

        this.parentComponet.order_status = this.index;
        this.parentComponet.page = 1;
        this.parentComponet.fetchIndex();
    }
    // update (dt) {}
}
