import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('hallNoticeBoard')
export class hallNoticeBoard extends cc.Component {
    @property(cc.RichText)
    public label: cc.RichText | null = null;
    @property(cc.ScrollView)
    public noticeScroll: cc.ScrollView | null = null;

    private isRoll:boolean = false;
    private className:string  = "";
    private noticeList:Array<noticeItem> = [];

    onLoad () {
        this.isRoll = false
        this.className = 'temp'
        hqq.eventMgr.register(hqq.eventMgr.addSliderNotice, "hallNoticeBoard", this.addSliderNotice.bind(this))
    }

    onEnable () {
        if (hqq.gameGlobal.slideNoticeList.length > 0) {
           this.addSliderNotice(hqq.gameGlobal.slideNoticeList)
        }
    }

    start () {
    }

    changeRegister (className: string) {
        this.className = className
        hqq.eventMgr.unregister(hqq.eventMgr.addSliderNotice, "hallNoticeBoard")
        hqq.eventMgr.register(hqq.eventMgr.addSliderNotice, className, this.addSliderNotice.bind(this))
    }

    addSliderNotice (msg: any) {
        cc.log("addSliderNotice", this.isRoll, msg)
        setTimeout(() => {
           if (!cc.isValid(this.node) || !cc.isValid(this.label)) {
               return
           }
           for (let i = 0; i < msg.length; i++) {
               this.addNotice(msg[i])
           }
           if (!this.isRoll) {
               this.isRoll = true;
               this.noticeStartRoll();
           }
        }, 30000);
    }

    addNotice (notice: any) {
        if (!this.noticeList) {
           this.noticeList = [];
        }
        let tempnoticeItem:noticeItem = {
           text: notice.notice,
           time: notice.time,
           rollforver: notice.rollforver,
        }
        this.noticeList.push(tempnoticeItem);
    }

    noticeStartRoll () {
        let item = this.noticeList.shift();
        if (item) {
           if (!item.rollforver) { // tyep = 1 永久滚动 2 滚动一次
               item.time--;
           }
           let text = item.text;
           if (item.time > 0) {
               this.noticeList.push(item);
           }
           let time = text.length * 0.1 + 15;
           this.label.string = text;
           let x = this.noticeScroll.node.getComponent(cc.UITransform).contentSize.width / 2 + this.label.node.getComponent(cc.UITransform).width / 2;
           this.label.node.setPositionEx(x, 0);
        //    let move1 = cc.moveTo(time / 3, cc.v2(0, 0));
        //    let move2 = cc.moveTo(time / 3, cc.v2(-x, 0));
        //    let callfunc = cc.callFunc(() => {
        //        this.noticeStartRoll();
        //    }, this)
        //    let seq = cc.sequence(move1, move2, callfunc);
        //    this.label.node.runAction(seq);
           cc.tween(this.label.node)
                .to(time / 3 , {position:cc.v3( 0, 0, 0 ) } )
                .to(time / 3 , {position:cc.v3( -x, 0, 0 ) } )
                .call(()=>{
                    this.noticeStartRoll();
                })
                .start();
        } else {
           this.isRoll = false;
        }
    }

    onDestroy () {
        hqq.eventMgr.unregister(hqq.eventMgr.addSliderNotice, "hallNoticeBoard")
        hqq.eventMgr.unregister(hqq.eventMgr.addSliderNotice, this.className)
    }

}
