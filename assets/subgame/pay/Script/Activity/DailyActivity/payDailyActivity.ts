
import payMain from '../../payMain'
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    resizeModdle:cc.Node = null

    @property(cc.Node)
    ScrollView:cc.Node = null

    @property(cc.ProgressBar)
    Processor:cc.ProgressBar = null

    @property(cc.Prefab)
    Item:cc.Prefab = null

    @property(cc.Node)
    Content:cc.Node = null

    @property(cc.Node)
    goldGroup:cc.Node[] = []

    @property(cc.Label)
    totalScoreLabel:cc.Label = null

    @property(cc.Label)
    tishiLabel :cc.Label = null

    activity_id = 0
    app :payMain= null
    info = {}
    bylevel = []
    TaskDetail = null
    btnCanClick = true;
    onLoad() {
        
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        // this.resizeView()
        this.setGameProxyRecharge()
        this.setLevelInfo()
        this.fetchByDayTaskDetail()
    }
    public setIdInfo(id,info){
        this.activity_id = id
        this.info = info
    }
    private resizeView(){
        let scalex = cc.winSize.width / 1334;
        this.resizeModdle.scaleX = scalex;
        this.resizeModdle.scaleY = scalex;
        this.ScrollView.height = Number(this.ScrollView.height)/scalex
    }
    private setGameProxyRecharge(){
        console.log("info",this.info)
        
        for (var k in this.info){
            if (Array.isArray(this.info[k])) {
                this.info[k].forEach(e => {
                    if (k == "game"|| k =='proxy' || k== 'recharge'){
                        var node = cc.instantiate(this.Item)
                        node.getComponent("payDailyActivityItem").init(k,e)
                        this.Content.addChild(node)
                    }else if(k == "bylevel") {
                        this.bylevel = this.info[k]
                    }
                });
            }
        }
        
    }
    private setLevelInfo(){
        console.log(this.bylevel)
        this.tishiLabel.string = `积分达到${this.bylevel[0].integral}, 额外再奖${this.bylevel[0].gold}金币, 积分达到${this.bylevel[1].integral}, 额外再奖${this.bylevel[1].gold}金币`
        this.goldGroup.forEach((e,i)=>{
            let item  = this.bylevel[i]
            //奖励金币
            e.getChildByName('num').getComponent(cc.Label).string = item.gold
            //所需要的积分
            e.getChildByName('jifen').getComponent(cc.Label).string = item.integral
            let TipNode = e.getChildByName('Tip')
            TipNode.getChildByName("num").getComponent(cc.Label).string = item.gold
        })
    }
    private setLevelProgress(){
        let  current_integral = this.TaskDetail.current_integral
        this.mathProgress(current_integral)
        this.showItemTip(current_integral)
    }
    showItemTip(current_integral){
        this.goldGroup.forEach((e,i)=>{
            let item = this.bylevel[i]
            let isReceive = false
            if(this.TaskDetail.receive_task_id.indexOf(`${item.task_id}`) != -1){
                //数组里存在，则表示已领取
                isReceive = true
            }
            if(current_integral >= item.integral && !isReceive) {
                e.getChildByName("Tip").active = true
            }else{
                e.getChildByName("Tip").active = false
            }
        })
    }
    //计算进度条
    private mathProgress(current_integral){
        var progress = 0;
        var stop = false
        var step = 0.5
        this.bylevel.forEach((e,i)=>{
            if (current_integral >= e.integral && !stop){
                progress += step
            }else if(!stop){
                let diffValue = 0
                if(i-1 >= 0){
                    diffValue = e.integral - this.bylevel[i-1].integral //2个区间的差
                    progress += (current_integral - this.bylevel[i-1].integral)/diffValue*step
                    cc.log(progress)
                }else{
                    diffValue = e.integral 
                    progress += current_integral/diffValue*step
                }
                stop = true
            }
        })
        this.Processor.progress = progress;
    }
    public fetchGetTask(key,task_id,callBack = ()=>{}){
        var url = `${this.app.UrlData.host}/api/activity/getTask`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&key=${key}&task_id=${task_id}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.app.showAlert("领取成功!")
                cc.log("response",response)
                //显示当前总积分
                this.TaskDetail.current_integral = response.data.current_integral
                this.totalScoreLabel.string = response.data.current_integral
                this.TaskDetail.receive_task_id.push(`${response.data.task_id}`)
                this.setLevelProgress()
                this.setItemDetail()
                callBack()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public fetchByDayTaskDetail(){
        var url = `${this.app.UrlData.host}/api/activity/byDayTaskDetail`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            this.app.hideLoading()
            if (response.status == 0) {
                this.TaskDetail = response.data
                //显示当前总积分
                this.totalScoreLabel.string = this.TaskDetail.current_integral
                this.setItemDetail()
                this.setLevelProgress()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`${errstatus}`)
        })
    }
    setItemDetail(){
        this.Content.children.forEach((e)=>{
            let item = e.getComponent("payDailyActivityItem")
            
            item.setDetail(this.TaskDetail,this)
        })
    }
    private Item1Click(){
        if(this.btnCanClick){
            let task_id = this.bylevel[0].task_id
            this.btnCanClick = false
            this.fetchGetTask("bylevel",task_id,()=>{
                this.btnCanClick = true
            })
        }else{
            this.app.showAlert("你点的太快了！")
        }
        
    }
    private Item2Click(){
        if(this.btnCanClick){
            let task_id = this.bylevel[1].task_id
            this.btnCanClick = false
            this.fetchGetTask("bylevel",task_id,()=>{
                this.btnCanClick = true
            })
        }else{
            this.app.showAlert("你点的太快了！")
        }
    }
}
