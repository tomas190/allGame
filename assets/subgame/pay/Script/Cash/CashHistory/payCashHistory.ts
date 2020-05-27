
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle : cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer : cc.Node = null;

    @property(cc.Prefab)
    ListItem : cc.Prefab = null;

    @property(cc.Prefab)
    publicAlert : cc.Prefab = null;

    @property(cc.Node)
    List : cc.Node = null;

    @property(cc.Label)
    pageLabel : cc.Label = null;

    @property()
    public app = null;
    public results : any = {};
    public order_status = 0;
    public page = 1;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');

        this.fetchIndex();
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawHistory?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&order_status=${this.order_status}&page=${this.page}&page_set=8&version=${this.app.version}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            self.List.removeAllChildren();
            if(response.status == 0){
                self.results = response;
                self.pageLabel.string = `${self.page} / ${response.data.total_page == 0 ? '1' : response.data.total_page}`
                var listArr = response.data.list;
                for(var i = 0; i < listArr.length; i++){
                    var data = listArr[i];
                    var node = cc.instantiate(self.ListItem);
                    self.List.addChild(node);
                    node.getComponent('payCashHistoryListItem').init({
                        type : data.type,
                        amount : data.amount,
                        handling_fee:data.handling_fee,
                        replace_handling_fee:data.replace_handling_fee,
                        arrival_amount:data.arrival_amount,
                        status : data.status,
                        created_at : data.created_at,
                        arrival_at : data.arrival_at,
                        user_remark:data.user_remark,
                        results:data
                    })
                }

            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.app.hideLoading();
        })
    }
    /**
     * 增加左侧导航，北斗不需要
     */
    // public addNavToggle(){
    //     var arr = ['全部','未成功','已成功'];
    //     for(let i:number = 0; i< arr.length; i++){
    //         var node = cc.instantiate(this.NavToggle);
    //         this.ToggleContainer.addChild(node);
    //         node.getComponent('payCashHistoryToggle').init({
    //             text : arr[i],
    //             index : i,
    //             parentComponet:this
    //         })
    //     }
    // }

    removeSelf(){
        //按键音效
        this.app.clickClip.play()

        this.node.destroy();
    }

    pageUp(){
        //按键音效
        this.app.clickClip.play();
        if(this.page > 1){
            this.page = this.page - 1
            this.fetchIndex();
        }
    }

    pageDown(){
        //按键音效
        this.app.clickClip.play();
        if(this.page < this.results.data.total_page ){
            this.page = this.page + 1
            this.fetchIndex();
        }

    }
    // update (dt) {}
}
