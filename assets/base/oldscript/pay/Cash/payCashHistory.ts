
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
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
    public page_set = 8;
    // LIFE-CYCLE CALLBACKS:
    ReturnToHall = false
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
        if(this.app.UrlData.package_id == 16){
            this.page_set = 6
        }else{
            this.page_set = 8
        }
        this.fetchIndex();
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawHistory?user_id=${this.app.UrlData.user_id}&order_status=${this.order_status}&page=${this.page}&page_set=${this.page_set}`;
        let self = this;
        this.app.showLoading()
        this.ReturnToHall = false
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            self.ReturnToHall = true
            self.List.removeAllChildren();
            if(response.status == 0){
                self.results = response;
                self.pageLabel.string = `${self.page} / ${response.data.total_page == 0 ? '1' : response.data.total_page}`
                if(this.app.UrlData.package_id == 16){
                    let pageLabel2 = this.node.getChildByName("Content").getChildByName("pageLabel").getComponent(cc.Label)
                    pageLabel2.string = `每页6条 共${response.data.total_page == 0 ? '1' : response.data.total_page}页`
                    let zwsj = this.node.getChildByName("Content").getChildByName("zwsj")
                    if(response.data.list.length == 0 ){
                        zwsj.active = true
                    }else{
                        zwsj.active = false
                    }
                }
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
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
            this.ReturnToHall = true
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
        this.app.loadMusic(1)
        if(this.ReturnToHall){
            this.node.destroy();
        }
    }

    pageUp(){
        //按键音效
        this.app.loadMusic(1);
        if(this.page > 1){
            this.page = this.page - 1
            this.fetchIndex();
        }
    }

    pageDown(){
        //按键音效
        this.app.loadMusic(1);
        if(this.page < this.results.data.total_page ){
            this.page = this.page + 1
            this.fetchIndex();
        }

    }
    pageFirst(){
        this.page = 1
        this.fetchIndex();
    }
    pageLast(){
        this.page = this.results.data.total_page == 0 ? 1:this.results.data.total_page
        this.fetchIndex();
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let titlebg= this.node.getChildByName("Content").getChildByName("titlebg")

        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id==9 ||this.app.UrlData.package_id == 10 || this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 16|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22) {
            titlebg.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('类型')
            titlebg.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('兑换金额')
            titlebg.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('费率')
            titlebg.children[3].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('到账金额')
            titlebg.children[4].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('状态')
            titlebg.children[5].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('申请时间')
            titlebg.children[6].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('到账时间')
            titlebg.children[7].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('备注')
        }else{
            this.app.loadIconLg(`${src}/form/dh_title_kuang`,titlebg)
        }
    }
    // update (dt) {}
}
