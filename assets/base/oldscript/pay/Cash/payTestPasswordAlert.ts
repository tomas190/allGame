
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    passwordLabel: cc.Label = null;

    @property()
    public app = null;
    parentComponent  = null;
    showSelect = false;
    type  = null;

    public init(data){
        this.parentComponent = data.parentComponent;
        this.type = data.type;
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    setPassword() {
        this.app.showKeyBoard(this.passwordLabel,4);
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        
        if(this.passwordLabel.string == '点击输入' ){
            this.app.showAlert('密码不能为空!')
        }else if(this.passwordLabel.string.length < 6 || this.passwordLabel.string.length > 10){
            this.app.showAlert('密码错误！')
        }else{
            this.node.removeFromParent();
            this.fetchcheckPassword();
        }
    }

    fetchcheckPassword(){
        var url = `${this.app.UrlData.host}/api/user_funds_password/checkPassword?user_id=${this.app.UrlData.user_id}&password=${this.passwordLabel.string}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                //验证成功，保存验证结果
                self.app.isTestPassworld = true;
               // type=1,弹出绑定帐户
               // type =2  确认兑换
               // type =3  人工兑换
               if(self.type == 1){
                   var timer = setTimeout(()=>{
                       self.parentComponent.showAccountAlert();
                       clearTimeout(timer);
                   },500)
               }else if(self.type == 2){
                    self.parentComponent.showCashAlert();
               }else if(self.type == 3){
                    self.parentComponent.showRgDhAlert();
               }

           }else{
               //验证失败，保存验证结果
               self.app.isTestPassworld = false;
               self.app.showAlert(response.msg)
           }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    deletePassword(){
        //按键音效
        this.app.loadMusic(1);

        this.passwordLabel.string = '点击输入';
        this.app.setInputColor('',this.passwordLabel);
    }
    
    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    // update (dt) {}
}
