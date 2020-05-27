import payMain from '../../payMain'
import gHandler = require("../../../../../common/script/common/gHandler");
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel : cc.Label = null

    @property(cc.Label)
    getGoldLabel: cc.Label = null

    @property(cc.Label)
    numLabel :cc.Label = null

    app :payMain= null;
    activity_id = 0;//活动id
    last_num  = ''; //剩余次数
    amount = 0;
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
    }

    public setIdInfo(id,info){
        cc.log(id,info)
        this.amount = info.account_balance;
        this.activity_id = id;
        this.amountLabel.string = info.account_balance
        this.getGoldLabel.string = info.money
    }
    
    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/getAlmsNum`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.last_num = response.data.last_num;
                this.numLabel.string = this.last_num;
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }

    public fetchGold(){
        let url = `${this.app.UrlData.host}/api/activity/getAlms`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&token=${this.app.token}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                cc.log('领取成功!',response)
                this.last_num = response.data.last_num;
                this.numLabel.string = this.last_num;
                self.app.showAlert('领取成功!')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    onClick(){
        if(gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        if(Number(this.last_num)<=0) {
            this.app.showAlert("免费金币次数已领完，请明天再来吧！")
            return
        }
        if(gHandler.gameGlobal.player.gold >= this.amount) {
            this.app.showAlert("金币余额不符合领取规则！")
            return
        }
        this.fetchGold()
    }
}
