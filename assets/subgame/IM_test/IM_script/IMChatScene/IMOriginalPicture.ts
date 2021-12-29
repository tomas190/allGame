import IM_DataTool from "../IM_util/IM_DataTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IMOriginalPicture extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null
    @property(cc.Node)
    content: cc.Node = null;
    // onLoad () {}

    init(spriteFrame: cc.SpriteFrame) {
        this.content.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        //图片等比缩放
        let maxWidth = cc.winSize.width;
        let maxHeight = Number((cc.winSize.height / 1.5).toFixed(2));
        let pSize = this.content.getContentSize();
        let picSize = IM_DataTool.countImgShowSize(maxWidth, maxHeight, pSize);
        this.content.active = false;
        this.scheduleOnce(() => {
            this.content.active = true;
            this.content.setContentSize(picSize);
        },0.5);
        let oldPos = this.content.position;
        this.content.on("touchmove", (event) => {
            let delta = event.getDelta();
            let pos = this.content.position;
            this.content.position = cc.v2(pos.x + delta.x, pos.y + delta.y);
        }, this)

        this.content.on("touchend", (event) => {
            if (oldPos.x == this.content.position.x &&
                oldPos.y == this.content.position.y) {
                this.node.destroy();
            } else {
                oldPos = this.content.position;
            }
        }, this);
    }

    hidePicture() {
        this.node.destroy();
    }
}
