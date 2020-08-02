
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    typeLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    exchangeLabel: cc.Label = null;

    @property(cc.Label)
    arrival_amountLabel: cc.Label = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;
    
    @property(cc.Label)
    created_atLabel: cc.Label = null;

    @property(cc.Label)
    arrival_atLabel: cc.Label = null;

    @property(cc.Label)
    admin_remarkLabel: cc.Label = null;


    @property
    public results = {};
    public app = null;

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    public init(data){
        this.typeLabel.string = data.type == 1 ? '支付宝'
            :(data.type == 2 ? '银行卡'
                :(data.type ==4 ? '交易所'
                    :(data.type == 5 ? "赠送"
                        :(data.type == 3 ? "人工兑换"
                            :''))));
        this.amountLabel.string = this.app.config.toDecimal(data.amount);
        // 类型=兑换渠道
        // 当类型=人工兑换时，费率为玩家填写费率
        // 当类型=人工代提时，费率为0
        // 当类型=银行卡、支付宝时，费率=平台费率+渠道费率
        // 当类型=赠送时，费率均为0
        if(data.type == 3){
            this.exchangeLabel.string  = `${this.app.config.toDecimal1(data.handling_fee*100)}%`;
        }else if(data.type == 4 || data.type == 5){
            this.exchangeLabel.string  = '0.0%';
        }else if(data.type == 1 || data.type == 2) {
            //平台费率➕渠道费率
            var sum = Number(data.results.platform_rate) + Number(data.results.channel_rate);
            this.exchangeLabel.string  = `${this.app.config.toDecimal1(sum*100)}%`;
        }
        this.arrival_amountLabel.string  = this.app.config.toDecimal(data.arrival_amount);
        this.statusLabel.string = data.status == 4 ?'已成功':(data.status == 5? '已失败':'审核中');
        this.created_atLabel.string = this.app.config.getTime(data.created_at);
        this.arrival_atLabel.string = data.arrival_at == 0 ? '无' : this.app.config.getTime(data.arrival_at);
        this.admin_remarkLabel.string = data.user_remark ? data.user_remark.substring(0,14) :"" ;
        this.results = data.results;
    }
    // update (dt) {}
}
