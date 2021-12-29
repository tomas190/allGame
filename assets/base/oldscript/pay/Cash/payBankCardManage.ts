// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    BankCardItem: cc.Prefab = null;

    @property(cc.Node)
    BankCardList: cc.Node = null;

    app = null;
    public data : any = {};
    public bankData = [];
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading();
            if(response.status == 0){
                this.data = response.data;
                this.renderList()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误`)
            this.app.hideLoading();
        })
    }
    renderList(){
        for(let i = 0 ;i < this.data.list.length ;i++){
            let data = this.data.list[i];
            if (data.type == 3){
                this.bankData.push(data)
            }
        }
        this.bankData.forEach((e)=>{
            let node = cc.instantiate(this.BankCardItem)
            this.BankCardList.addChild(node)
            node.getComponent("payBankCardItem").init(e.info)
        })
    }
    //显示绑定银行卡
    showAccountAlert(){
        this.node.getChildByName("bindBankAccount").active = true
        this.node.getChildByName("Bank").active = false
        this.node.getComponent("payBankAccountAlert").init({
            text:'设置银行卡',
            action:"add",
            itemId:0,
            parentComponent:this,
        })
    }
}
