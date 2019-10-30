
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHEmoji extends cc.Component {

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        let animation = this.node.getComponent(cc.Animation);
        animation.on('finished',  this.onFinished,   this);
    }

    onFinished(){
        this.node.destroy();
    }

}
