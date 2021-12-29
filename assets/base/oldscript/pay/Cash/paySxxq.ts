
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    ListItem : cc.Prefab = null;

    @property(cc.Node)
    List : cc.Node = null;

    @property(cc.Label)
    pageLabel : cc.Label = null;

    @property()
    public results : any = {};
    public page = 1;
    public app = null;
    public page_set = 6;
    // LIFE-CYCLE CALLBACKS:
    ReturnToHall = false
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchgetLimitDetailData();
        this.node.getChildByName("Content").getChildByName("titlebg").children[0].getComponent(cc.Label).fontFamily = "Microsoft YaHei"
    }
    public fetchgetLimitDetailData(){
        var url = `${this.app.UrlData.host}/api/activity/getLimitDetailData?user_id=${this.app.UrlData.user_id}&page=${this.page}&pageset=${this.page_set}`;
        let self = this;
        this.app.showLoading()
        this.ReturnToHall = false
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading();
            this.ReturnToHall = true;
            //结果返回之前先清空列表
            self.List.removeAllChildren();
            if(response.status == 0){
                self.results = response;
                self.pageLabel.string = `${self.page} / ${response.data.total_page == 0 ? '1' : response.data.total_page}`;
                let pageLabel2 = this.node.getChildByName("Content").getChildByName("pageLabel").getComponent(cc.Label)
                pageLabel2.string = `每页6条 共${response.data.total_page}页`
                var dataList = response.data.list;
                for(var i = 0; i < dataList.length; i++){
                    var Item = dataList[i];
                    var node = cc.instantiate(self.ListItem);
                    self.List.addChild(node);
                    node.getComponent('paySxxqItem').init({
                        amount : Item.amount,
                        created_at : Item.created_at,
                        remark : Item.remark,
                    })
                }
                let zwsj = this.node.getChildByName("Content").getChildByName("zwsj")
                if(response.data.list.length == 0 ){
                    zwsj.active = true
                }else{
                    zwsj.active = false
                }
            }else{
                self.app.showAlert(response.msg);
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.app.hideLoading()
            this.ReturnToHall = true
        })
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1)
        //接口有返回结果后才能返回大厅
        if(this.ReturnToHall){
            this.node.destroy();
        }
    }

    pageUp(){
        //按键音效
        this.app.loadMusic(1);
        if(this.page > 1){
            this.page = this.page - 1;
            this.fetchgetLimitDetailData();
        }
    }

    pageDown(){
        //按键音效
        this.app.loadMusic(1);

        if(this.page < this.results.data.total_page ){
            this.page = this.page + 1;
            this.fetchgetLimitDetailData();
        }
    }
    pageFirst(){
        this.page = 1
        this.fetchgetLimitDetailData();
    }
    pageLast(){
        this.page = this.results.data.total_page
        this.fetchgetLimitDetailData();
    }
    // update (dt) {}
}
