import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('hallCongratulation')
export class hallCongratulation extends cc.Component {
    @property(cc.Label)
    public label: cc.Label | null = null;
    @property(cc.sp.Skeleton)
    public spine:cc.sp.Skeleton = null;

    onLoad () {
        this.UILoad()
    }

    UILoad () {
        let aninode = cc.find("congratulation/aninode")
        hqq.skeletonLoad(aninode, "bigimg/language/" + hqq.language + "/gongxihuode", "chuxian", true,hqq["hall_"+hqq.app.pinpai])
        let ensurebtn = cc.find("congratulation/aninode/ensurebtn")
        hqq.btnLoad(ensurebtn, "language/" + hqq.language + "/img/p_btn_confirm2",null, true,hqq["hall_"+hqq.app.pinpai])
    }

    init (data: any) {
        this.spine.setCompleteListener(this.completeListener.bind(this))
        this.label.string = data + hqq.getTip("str6")
    }

    onClickEnsure () {
        if(cc.isValid(this.node)){
            this.node.destroy()
        }
    }

    completeListener () {
        this.spine.setAnimation(0, 'xunhuan', true)
        this.spine.setCompleteListener(null)
    }

}