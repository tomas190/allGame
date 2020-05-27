
const {ccclass, property} = cc._decorator;
import gHandler = require("../../../../common/script/common/gHandler");
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property()
    public app = null;
    parentComponent  = null;
    type  = null;
    data = null;
    public init(data){
        this.parentComponent = data.parentComponent;
        this.type = data.type;
        this.data = data.data
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    setMoney() {
        this.app.showKeyBoard(this.amountLabel,1);
    }
    onClick(){
        //按键音效
        this.app.clickClip.play();
        
        if(this.amountLabel.string == '点击输入' ){
            this.app.showAlert('金额不能为空!')
        }else if(Number(this.amountLabel.string ) < 10 ){
            this.app.showAlert('最低充值金额为10金币')
        }else if(Number(this.amountLabel.string ) > 10000 ){
            this.app.showAlert('最高充值金额为10000金币')
        }else{
            this.fetchCheckOrder()
            this.node.removeFromParent();
        }
    }
    fetchCheckOrder(){
        let url = `${this.app.UrlData.host}/api/trading_order/checkOrder?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&version=${this.app.version}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                //判断是否存在订单
                if(response.data.is_exist == 0){
                    self.fetchVeify();
                }else{
                    self.app.showAlert(`上一笔交易未完成！，请先至聊天工具里取消订单！`)
                }
                self.node.removeFromParent();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    fetchVeify(){
        let imHost = this.app.UrlData.imHost;
        let url = `${imHost}/im/api/artificialVerify`;
        let dataStr = `user_id=${this.app.UrlData.user_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.code == 0){
                self.fetchBindAccountPay();
            }else{
                // self.app.showAlert(`${response.msg}请到聊天工具取消或确认！`)
                //弹出取消订单确认框
                self.app.showTipAlert()
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })

    }
    fetchBindAccountPay(){
        let imHost = this.app.UrlData.imHost;
        let url = `${imHost}/im/api/artificial`;
        let amount = Number(this.amountLabel.string);
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&replace_id=${this.data.user_id}&replace_name=${this.data.nick_name}&gold=${this.amountLabel.string}&amount=${amount}&exchange_price=1&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.code == 0){
                self.app.showAlert('操作成功,请移至聊天中心交易！');
                // 唤起IM
                gHandler.Reflect.setOrientation("portrait", 640, 1136)
                cc.director.loadScene('IMappStart');
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    deletePassword(){
        //按键音效
        this.app.clickClip.play();

        this.amountLabel.string = '点击输入';
        this.app.setInputColor('',this.amountLabel);
    }
    
    removeSelf(){
        //按键音效
        this.app.clickClip.play();

        this.node.destroy();
    }
    // update (dt) {}
}
