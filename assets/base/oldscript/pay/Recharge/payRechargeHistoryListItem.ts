
const {ccclass, property} = cc._decorator;
import {Language_pay} from "./../language/payLanguage"
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

    @property(cc.Prefab)
    JisuOrderAlert: cc.Prefab = null;

    @property(cc.Prefab)
    JisuOrderAlert2: cc.Prefab = null;

    @property(cc.Node)
    wyfk: cc.Node = null;

    @property
    public results :any= {};
    public app = null;
    type = 0
    callback = null; // 充值历史传入callback
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }

    public init(data,callback = ()=>{}){
        this.callback = callback
        this.type = data.type
        if(this.wyfk && data.type == 26){
            this.wyfk.active = true
            this.orderBtn.active = false
            if(data.status == 6||data.status == 5 || data.status == 4){
                this.wyfk.getComponent(cc.Button).interactable = false
            }
        }else{
            this.wyfk.active = false
            this.orderBtn.active = true
        }
        this.amountLabel.string = this.app.config.toDecimal(data.amount);
        this.arrival_amount.string = this.app.config.toDecimal(data.arrival_amount);
        if(data.status == 6){
            this.statusLabel.string = "已完成"
        }else if(data.status == 4){
            this.statusLabel.string = "已撤销"
        }else if(data.status == 2){
            this.statusLabel.string = "已过期"
        }else{
            this.statusLabel.string = "未完成"
        }
        if(this.app.UrlData.package_id != 16){
            this.lastTimeLabel.string = data.lastTime == 0 ? `${Language_pay.Lg.ChangeByText('无')}` : this.app.config.getTime(data.lastTime);
            this.typeLabel.string = data.type == 1 ? `${Language_pay.Lg.ChangeByText('支付宝充值')}`  :
            (data.type == 2 ? `${Language_pay.Lg.ChangeByText('转账到银行卡')}` :
                (data.type == 3?`${Language_pay.Lg.ChangeByText('交易所')}`:
                    (data.type == 5?`${Language_pay.Lg.ChangeByText('赠送')}`:
                        (data.type == 6? `${Language_pay.Lg.ChangeByText('微信支付')}`:
                            (data.type == 7? `${Language_pay.Lg.ChangeByText('银联支付')}`:
                                (data.type == 8?`${Language_pay.Lg.ChangeByText('网银支付')}` :
                                    (data.type == 9? `${Language_pay.Lg.ChangeByText('快捷支付')}` :
                                        (data.type == 14?`${Language_pay.Lg.ChangeByText('专享快付')}`:
                                            ((data.type == 18 ||data.type == 19 ||data.type == 20 || data.type ==21)? `${Language_pay.Lg.ChangeByText("IM充值")}` :
                                                (data.type == 23?`ERC20`:
                                                    (data.type == 24?`TRC20`:
                                                        (data.type == 26?`极速充值`: 
                                                            (data.type == 27?`匹配充值`: "")
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        }
        this.firstTimeLabel.string = data.firstTime == 0 ?`${Language_pay.Lg.ChangeByText('无')}`  : this.app.config.getTime(data.firstTime);
        this.results = data.results;
        if(data.status != 6 && (data.type == 2 || data.type == 26 || data.type == 27)){

        }else {
            if(this.app.UrlData.package_id != 16){
                this.orderBtn.removeFromParent()
            }
        }
    }

    start () {

    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        var data = {
            data : this.results
        }
        if(this.app.UrlData.package_id == 16){
            if(this.type == 26){
                //极速充值
                console.log("data",data)
                this.showJisuOrderAlert(2,data);
            }else if(this.type == 27){
                //极速充值
                console.log("data",data)
                this.showJisuOrderAlert2(2,data);
            }else{
                if (this.app.gHandler.reflect) {
                    if (this.app.gHandler.reflect.setClipboard(this.results.order_id)) {
                        this.app.showAlert(`复制成功!:${this.results.order_id}`)
                    } else {
                        this.app.showAlert(`复制失败!请升级系统版本`)
                    }
                }
            }
        }else{
            if(this.type == 26){
                //极速充值
                console.log("data",data)
                this.showJisuOrderAlert(2,data);
            }else if(this.type == 27){
                //匹配充值
                this.showJisuOrderAlert2(2,data);
            }else{
                this.app.showOrderAlert(2,data,false);
            }
            
        }
    }
    /**
     * 显示订单弹窗
     * @param type 
     * @param data 
     */
    public showJisuOrderAlert(type,data){
        var node = null
        node = cc.instantiate(this.JisuOrderAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/JisuOrderAlert")){
            canvas.addChild(node);
        }
        node.getComponent('payJisuOrderAlert').init(type,data,this.callback)
    }
    public showJisuOrderAlert2(type,data){
        var node = null
        node = cc.instantiate(this.JisuOrderAlert2);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/JisuOrderAlert")){
            canvas.addChild(node);
        }
        node.getComponent('payJisuOrderAlert2').init(type,data,this.callback)
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let btn_dingdan1= this.node.getChildByName('5').getChildByName('btn_dingdan1')
        if(this.app.UrlData.package_id == 10 || this.app.UrlData.package_id == 9 || this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
            btn_dingdan1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('订 单')
        }else if(this.app.UrlData.package_id == 16 ){

        }else{
            this.app.loadIconLg(`${src}/btn/btn_dingdan1`,btn_dingdan1)
        }
    }
    // update (dt) {}
}
