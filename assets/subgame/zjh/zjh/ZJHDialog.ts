
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    lbl_content: cc.Label = null;

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property
    _call: any = null;

    onLoad(){

    }

    show(data:any){
        this.btnClose.active = data.close;
        if(data.str) this.lbl_content.string = data.str;
        if(data.callfunc && data.obj) {
            this._call = data.callfunc.bind(data.obj);
        }
    }

    confirm(){
        if(this._call) this._call();
        this.close();
    }

    close(){
        let mask = this.node.parent.getChildByName("mask");
        if(mask) mask.active = false;
        this.node.destroy();
    }
}
