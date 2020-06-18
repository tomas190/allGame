
const {ccclass, property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Group: cc.Node[] = [];
    
    info = []//配置信息
    activity_id = 0
    app = null
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.info.forEach((item,index) => {
            let bonusLabel = this.Group[index].getChildByName("bonus").getComponent(cc.Label)
            let commissionLabel = this.Group[index].getChildByName("commission").getComponent(cc.Label)
            bonusLabel.string = item.bonus
            commissionLabel.string = `${Math.floor(item.minincome)} +`
        });
    }
    setIdInfo(id,info){
        this.activity_id = id
        this.info = info
        cc.log(this.info)
    }
    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/proxyApplyIncome`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                console.log("当前佣金:",response.data.current_income,"是否已领取：",response.data.can_receive == 0 ?'未领取':"已领取")
                let CurrentIndex = -1;
                this.info.forEach((item,index) => {
                    if(response.data.current_income >= item.minincome){
                        CurrentIndex = index
                    }
                    this.Group[index].getChildByName("btn").active  = false
                    this.Group[index].getChildByName("btnDone").active  = false
                });
                if(CurrentIndex < 0 ){return}
                //显示按钮
                if(response.data.can_receive == 0){
                    // 默认值 0  1 已领取过
                    this.Group[CurrentIndex].getChildByName("btn").active  = true
                }else{
                    this.Group[CurrentIndex].getChildByName("btnDone").active  = true
                }
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    fetchPayBonus(){
        var url = `${this.app.UrlData.host}/api/activity/proxyPayBonus`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.app.showAlert("领取成功！")
                this.fetchIndex()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    onClick(){
        this.fetchPayBonus()
    }
}
