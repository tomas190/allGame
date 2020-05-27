
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    arrival_amount : cc.Label = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;

    @property(cc.Label)
    typeLabel: cc.Label = null;

    @property(cc.Label)
    firstTimeLabel: cc.Label = null;

    @property(cc.Label)
    lastTimeLabel: cc.Label = null;

    @property(cc.Node)
    orderBtn: cc.Node = null;

    @property
    public results = {};
    public app = null;

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    public init(data){
        this.amountLabel.string = this.app.config.toDecimal(data.amount);
        this.arrival_amount.string = this.app.config.toDecimal(data.arrival_amount);
        this.statusLabel.string = data.status ==6 ?'已完成' :(data.status == 4 ? '已撤销' : '未完成' );
        this.typeLabel.string = data.type == 1 ? '支付宝充值' :
            (data.type == 2 ? '转账到银行卡' :
                (data.type == 3?'交易所':
                    (data.type == 5?'赠送':
                        (data.type == 6? '微信支付':
                            (data.type == 7?'银联支付' :
                                (data.type == 8?'网银支付' :
                                    (data.type == 9? '快捷支付' :
                                        (data.type == 14?'专享快付':
                                            ((data.type == 18 ||data.type == 19 ||data.type == 20 || data.type ==21)? "IM充值" :"")
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        this.firstTimeLabel.string = data.firstTime == 0 ? '无' : this.app.config.getTime(data.firstTime);
        this.lastTimeLabel.string = data.lastTime == 0 ? '无' : this.app.config.getTime(data.lastTime);
        this.results = data.results;
        if(data.status != 6 && data.type == 2){

        }else{
            this.orderBtn.removeFromParent()
        }
    }

    start () {

    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        var data = {
            data : this.results
        }
        this.app.showOrderAlert(2,data);
    }
    // update (dt) {}
}
