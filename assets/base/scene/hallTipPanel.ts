import * as cc from 'cc';
import { hqqLanguage } from '../common/hqqLanguage';
const { ccclass, property } = cc._decorator;

@ccclass('hallTipPanel')
export class hallTipPanel extends cc.Component {
    @property(cc.Node)
    public bg: cc.Node | null = null;
    @property(cc.RichText)
    public label: cc.RichText | null = null;

    private data: any = null;
    private dataList: Array<any> = null;
    private isRun: boolean = false;
    private flytime: number = null;
    private delaytime: number = null;
    private movedis: number = null;
    private closeSprite: cc.Node = null;

    onLoad() {
        this.data = null;
        this.closeSprite = null;
    }

    start() {
    }

    UILoad() {
        if (hqq.app.pinpai === "ninetwo") {
            hqq.setSprite(this.bg, { path: "base/ninetwo/img/psomf" });
        }
    }

    init(data: any) {
        this.data = data
        this.UILoad();
        let msg = data
        if (data && data.msg) {
            msg = data.msg
        }
        if (!this.dataList) {
            this.dataList = []
            this.isRun = false
            this.flytime = 0.6
            this.delaytime = 1.5
            this.movedis = 150
        }
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i] == msg) {
                return
            }
        }
        if (this.isRun) {
            this.dataList.push(msg)
        } else {
            this.node.active = true
            this.showTip(msg)
        }
    }

    showTip(data: any) {
        this.isRun = true
        this.label.string = data
        // this.label._updateRichText()
        this.bg.getComponent(cc.UITransform).width = this.label.getComponent(cc.UITransform).width + 100
        this.bg.getComponent(cc.UITransform).height = this.label.getComponent(cc.UITransform).height
        if (this.data && this.data.position) {
            this.node.setPosition(this.data.position.x, this.data.position.y - this.movedis)
        } else {
            this.node.setPosition(cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height / 2 - this.movedis)
        }
        if (cc.isValid(this.closeSprite)) {
            this.closeSprite.setPosition(-((this.bg.getComponent(cc.UITransform).width / 2) - 24), this.closeSprite.getPosition().y);
        }
        if(!cc.isValid(this.node.getComponent(cc.UIOpacity))){
            this.node.addComponent(cc.UIOpacity);
        }
        this.node.getComponent(cc.UIOpacity).opacity = 150

        cc.tween(this.node)
            .by(this.flytime, { position: cc.v3(0, this.movedis, 0) })
            .delay(this.delaytime).by(this.flytime, { position: cc.v3(0, this.movedis, 0) })
            .by(this.flytime, { position: cc.v3(0, this.movedis, 0) })
            .call(() => {
                if (this.dataList.length > 0) {
                    this.showTip(this.dataList.shift())
                } else {
                    this.isRun = false
                    this.node.removeFromParent()
                }
            })
            .start()
        cc.tween(this.node.getComponent(cc.UIOpacity))
            .to(this.flytime, { opacity: 255 })
            .delay(this.delaytime)
            .to(this.flytime, { opacity: 150 })
            .start();
    }

}