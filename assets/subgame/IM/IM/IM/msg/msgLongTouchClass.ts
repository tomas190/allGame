const { ccclass, property } = cc._decorator;
import gHandler = require("../../../../../common/script/common/gHandler");

@ccclass
export default class msgLongTouchClass extends cc.Component {

    @property({ type: cc.Label, tooltip: "消息文本信息" })
    msgLabelTextLabel: cc.Label = null;



    holdTimeEclipse = 0;    //用来检测长按
    holdClick = false;       //用来检测点击
    doubleTimeEclipse = 0;   //用来检测双击
    hold_one_click = 0;      //用来检测单击
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.holdClick = true;
            this.holdTimeEclipse = 0;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.holdClick = false;
            if (this.holdTimeEclipse >= 30) {
                this.btn_status('long');
            }
            else {
                this.btn_status('short');
            }
            //开始记录时间
            this.holdTimeEclipse = 0;
        }, this);
    }

    btn_status(status) {
        if (status == 'short') {
            console.log(this.hold_one_click)
            this.hold_one_click++;
            setTimeout(() => {
                if (this.hold_one_click == 1) {
                    console.log('short');
                    this.hold_one_click = 0;

                }
                else if (this.hold_one_click == 2) {
                    console.log('double');
                    this.hold_one_click = 0;
                }
            }, 400);

        }
        else {
            this.hold_one_click = 0;
            console.log(status);
            console.log("msgTouchText: ", this.msgLabelTextLabel.string);
            let msgStr = this.msgLabelTextLabel.string;
            var name = this.node.getChildByName("name");
            var unitPrice = this.node.getChildByName("unitPrice");
            var orderSum = this.node.getChildByName("orderSum");
            var money = this.node.getChildByName("money");
            if (name && unitPrice && orderSum && money) {
                msgStr += '，商家id：' + name.getChildByName("name").getComponent(cc.Label).string;
                msgStr += '，玩家id：' + unitPrice.getChildByName("price").getComponent(cc.Label).string;
                msgStr += '，订单金额：' + money.getChildByName("money").getComponent(cc.Label).string;
            }
            if (gHandler.Reflect && gHandler.Reflect.setClipboard(msgStr)) {
                this.node.dispatchEvent(new cc.Event.EventCustom('copyTextSuccess',true));
            } else {
                this.node.dispatchEvent(new cc.Event.EventCustom('copyTextFailed', true));
            }
        }
    }

    start() {

    }

    runAlertAction(text) {
        console.log('aaaaaaa');
    }

    update(dt) {
        if (this.holdClick) {
            this.holdTimeEclipse++;
            if (this.holdTimeEclipse > 120)//如果长按时间大于2s，则认为长按了2s
            {
                this.holdTimeEclipse = 120;
            }
        }
    }
}