import IM_DataTool from "../IM_util/IM_DataTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IMChatItemP extends cc.Component {

    @property(cc.Label)
    date: cc.Label = null;

    @property(cc.Sprite)
    picture: cc.Sprite = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property
    root: any = null;

    // LIFE-CYCLE CALLBACKS:

    setContent(url: any, status: Number, node: any, flag: Number, sendTime: Number) {
        this.date.string = IM_DataTool.timestampToTime(sendTime);
        this.root = node;
        cc.assetManager.loadRemote(url, (err, obj) => {
            if (err) cc.log(err);
            let spr = new cc.SpriteFrame(obj);
            this.picture.spriteFrame = spr;
            let pSize = this.picture.node.getContentSize();
            this.picture.node.active = false;
            // this.picture.node.setScale(0.4);
            console.log("newSize11 = ", pSize);
            let maxWidth = Number((cc.winSize.width / 2).toFixed(2));
            let maxHeight = Number((cc.winSize.height / 4).toFixed(2));
            let picSize = IM_DataTool.countImgShowSize(maxWidth, maxHeight, pSize);
            let newSize = cc.size(picSize.width + 30, picSize.height + 20);
            this.bg.setContentSize(newSize);
            //延时后才能更改图片大小
            this.scheduleOnce(() => {
                this.picture.node.active = true;
                this.picture.node.setContentSize(picSize);
            }, 0.5);
            let pos = null;
            if (status == 1) {
                pos = cc.v2(-newSize.width / 2, -newSize.height / 2);
            } else {
                pos = cc.v2(newSize.width / 2, -newSize.height / 2);
            }
            this.picture.node.position = pos;
            if (flag == 1) {//接收新图片
                this.root.getComponent("IMChatScene").adaptation(this.node);
            } else {//加载历史图片
                this.root.getComponent("IMChatScene").adaptation2(this.node);
            }
        })
    }

    //展示大图
    showBigPicture() {
        if (this.root) this.root.getComponent("IMChatScene").showPicture(this.picture.spriteFrame);
    }
    // update (dt) {}
}
