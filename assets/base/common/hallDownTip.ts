import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('hallDownTip')
export class hallDownTip extends cc.Component {
    @property(cc.RichText)
    public label: cc.RichText | null = null;
    @property(cc.Node)
    public bg: cc.Node | null = null;

    private dataList:any[] = [];
    private isRun:boolean = false;
    private movedis:number = null;
    private delaytime:number = null;
    private flytime:number = null;

    onLoad () {
        this.dataList = []
        this.isRun = false
        this.movedis = this.node.getComponent(cc.UITransform).contentSize.height
        this.delaytime = 3
        this.flytime = 0.5
        this.node.setPositionEx(cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height + this.node.getComponent(cc.UITransform).contentSize.height / 2)
    }

    start () {
    }

    init (data: any) {
        if (this.isRun) {
           this.dataList.push(data)
        } else {
           this.showTip(data)
        }
    }

    showTip (data: any) {
        this.isRun = true
        if (data.msg.length > 8) {
           data.msg = data.msg.substring(0, 8) + "..."
        }
        let str = "<color=#000000>" + data.msg + "</c>"
        if (data.nick) {
           str = "<color=#000000>" + data.nick + "</c> " + str
        }
        this.label.string = str
        // let m0 = cc.moveBy(this.flytime, cc.v2(0, -this.movedis))
        // let d0 = cc.delayTime(this.delaytime)
        // let m1 = cc.moveBy(this.flytime, cc.v2(0, +this.movedis))
        // let ca = cc.callFunc(() => {
        //    if (this.dataList.length > 0) {
        //        this.showTip(this.dataList.shift())
        //    } else {
        //        this.isRun = false
        //        this.node.destroy()
        //    }
        // }, this)
        // this.node.runAction(cc.sequence(m0, d0, m1, ca))
        cc.tween(this.node)
            .by( this.flytime , {position:cc.v3(0,-this.movedis,0)} )
            .delay(this.delaytime)
            .by(this.flytime , {position:cc.v3(0,-this.movedis,0)} )
            .call(()=>{
                if (this.dataList.length > 0) {
                    this.showTip(this.dataList.shift())
                } else {
                    this.isRun = false
                    this.node.destroy()
                }
            })
            .start();
    }

}