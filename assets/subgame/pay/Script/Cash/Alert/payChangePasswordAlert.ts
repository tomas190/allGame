
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    oldPasswordLabel : cc.Label = null;

    @property(cc.Label)
    newPasswordLabel : cc.Label = null;

    @property(cc.Label)
    repeatPasswordLabel : cc.Label = null;

    @property()
    public app  = null;
    parentComponent  = null;
    showSelect = false;

    public init(data){
        this.parentComponent = data.parentComponent;
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
    setOldPassword() {
        this.app.showKeyBoard(this.oldPasswordLabel,4);
    }

    setNewPassword() {
        this.app.showKeyBoard(this.newPasswordLabel,4);
    }

    setRepeatPassword() {
        this.app.showKeyBoard(this.repeatPasswordLabel,4);
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        
        if(this.oldPasswordLabel.string == '点击输入' || this.newPasswordLabel.string == '点击输入'|| this.repeatPasswordLabel.string == '点击输入'){
            this.app.showAlert('密码不能为空!')
        }else if(this.newPasswordLabel.string.length < 6 || this.newPasswordLabel.string.length > 10){
            this.app.showAlert('请设置6-10位新密码！')
        }else if(this.newPasswordLabel.string != this.repeatPasswordLabel.string){
            this.app.showAlert('两次密码输入不一致！')
        }else{
            this.fetchBindAccountPay();
            this.node.removeFromParent();
        }
    }

    fetchBindAccountPay(){
        var url = `${this.app.UrlData.host}/api/user_funds_password/updatePassword`;
        let dataStr  =`user_id=${this.app.UrlData.user_id}&old_password=${this.oldPasswordLabel.string}&password=${this.newPasswordLabel.string}&token=${this.app.token}&version=${this.app.version}`;

        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.parentComponent.fetchIndex();
                self.app.showAlert('操作成功！')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    deleteOld(){
        //按键音效
        this.app.clickClip.play();

        this.oldPasswordLabel.string = '点击输入';
        this.app.setInputColor('',this.oldPasswordLabel);
    }

    deleteNew(){
        //按键音效
        this.app.clickClip.play();

        this.newPasswordLabel.string = '点击输入';
        this.app.setInputColor('',this.newPasswordLabel);
    }

    deleteRepeat(){
        //按键音效
        this.app.clickClip.play();

        this.repeatPasswordLabel.string = '点击输入';
        this.app.setInputColor('',this.repeatPasswordLabel);
    }
    
    removeSelf(){
        //按键音效
        this.app.clickClip.play();

        this.node.destroy();
    }
    // update (dt) {}
}
