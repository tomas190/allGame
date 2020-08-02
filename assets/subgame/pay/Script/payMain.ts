import gHandler = require("../../../common/script/common/gHandler");
import Config from "./payConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    publicAlert: cc.Prefab = null;

    @property(cc.Prefab)
    PublicInputAlert: cc.Prefab = null;

    @property(cc.Prefab)
    PublicOrderAlert: cc.Prefab = null;

    @property(cc.Prefab)
    AlipayAccountAlert: cc.Prefab = null;

    @property(cc.Prefab)
    BankAccountAlert: cc.Prefab = null;

    @property(cc.Prefab)
    keyBoardAlert : cc.Prefab = null;

    @property(cc.Prefab)
    WriteMoneyAlert : cc.Prefab = null;

    @property(cc.Prefab)
    TipAlert :cc.Prefab = null;

    @property(cc.Node)
    Loading : cc.Node = null;

    @property()
    clickClip :cc.Component = null;
    public UrlData : any = [];
    public config :Config = null;
    public token :string = null;
    isTestPassworld = false;
    public version :number = 1 ;//充值后台接口，现默认为1

    onLoad () {
        this.config = new Config();
        this.UrlData =  {
            user_id:gHandler.gameGlobal.pay.user_id,
            user_name:gHandler.gameGlobal.pay.user_name,
            client:gHandler.gameGlobal.pay.client,
            host:gHandler.gameGlobal.pay.pay_host,
            proxy_user_id:gHandler.gameGlobal.pay.proxy_user_id,
            proxy_name:gHandler.gameGlobal.pay.proxy_name,
            package_id:gHandler.gameGlobal.pay.package_id,
            imHost:gHandler.gameGlobal.im_host
        };

        this.token = this.config.token;
        //音效
        this.clickClip = this.node.getComponent(cc.AudioSource)
    }
    /**
     * 全局提示框
     * @param data 
     */
    public showAlert(data:string){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payPublicAlert').init(data)
    }
    /**
     * 显示公共输入界面
     * @param input 输入框
     * @param type 
     */
    public getPublicInput(input :cc.EditBox,type :number) {
        var PublicInputAlert = cc.instantiate(this.PublicInputAlert);
        var canvas = cc.find('Canvas');
        input.node.on('editing-did-began', (e) => {
            canvas.addChild(PublicInputAlert);
            PublicInputAlert.getComponent('payPublicInputAlert').init({
                text: e.string,
                input: input
            })
        })
        input.node.on('text-changed', (e:cc.Label) => {
            if(type == 1){
                //验证input type = 1 不能以0开头的整数
                input.string = e.string.replace(/[^\d]/g, '').replace(/^0{1,}/g, '');
            }else if(type == 2){
                //验证input type = 2 不能输入特殊字符
                var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
                input.string = e.string.replace(patrn,'');
            }else if(type == 3){
                //验证input,可以输入两位小数
                let reg = /^\d{0,8}\.{0,1}(\d{0,2})?$/;
                input.string = !reg.test(e.string) ? '' :e.string ;
            }else if(type == 4){
                //验证input,密码
                input.string = e.string.replace(/[^\w\.\/]/ig,'');
            }

            PublicInputAlert.getComponent('payPublicInputAlert').init({
                text: e.string,
                input: input
            })
        })
        input.node.on('editing-return', (e) => {

            PublicInputAlert.getComponent('payPublicInputAlert').readyClick()
        })
    }
    /**
     * 自制键盘输入的类型
     * @param e 内容
     * @param type 类型
     */
    public labelType(e,type){
        let msg = e;
        if(type == 1){
            //验证input type = 1 不能以0开头的整数
            msg  = e.replace(/[^\d]/g, '').replace(/^0{1,}/g, '').substring(0,6);
        }else if(type == 2){
            //验证input type = 2 不能输入特殊字符，保留5位
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
            msg  = e.replace(patrn,'').substring(0,10);
        }else if(type == 3){
            //验证input,可以输入三位小数
            let reg = /^\d{0,8}\.{0,1}(\d{0,3})?$/;
            msg  = !reg.test(e) ? '' : e ;
        }else if(type == 4){

            //验证input,密码
            // msg  = e.replace(/[^\d]/g, '');
            msg = msg.substring(0,10)
        }else if(type == 5){
            //验证input type = 5 不能输入特殊字符,保留20位
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
            msg  = e.replace(patrn,'').substring(0,20);
        }else if(type == 6){
            //验证input type = 6 不能以0开头的整数 ,保留19位
            msg  = e.replace(/[^\d]/g, '').replace(/^0{1,}/g, '').substring(0,19);
        }
        else if(type == 7){
            //验证input type = 7 可以输入英文
            msg = e.replace(/[\W]/g,'').substring(0,8);
        }
        return msg
    }
    /**
     * 显示订单弹窗
     * @param type 
     * @param data 
     */
    public showOrderAlert(type,data){
        var node = cc.instantiate(this.PublicOrderAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payPublicOrderAlert').init(type,data)
    }

    /**
     * 添加支付宝账号弹窗
     * @param data 
     */
    public showAlipayAccountAlert(data){
        var canvas = cc.find('Canvas');
        var node = cc.instantiate(this.AlipayAccountAlert);
        canvas.addChild(node);
        let AlipayAccountAlert = node.getComponent('payAlipayAccountAlert');
        AlipayAccountAlert.init({
            text:data.text,
            action:data.action,
            itemId:data.itemId
        });
        if(data.changeData){
            AlipayAccountAlert.changeContent(data.changeData);
        }

    }
    /**
     * 添加银行卡类型弹窗
     * @param data 
     */
    public showBankAccountAlert(data){
        var canvas = cc.find('Canvas');
        var node = cc.instantiate(this.BankAccountAlert);
        canvas.addChild(node);
        let BankAccountAlert = node.getComponent('payBankAccountAlert');
        BankAccountAlert.init({
            text:data.text,
            action:data.action,
            itemId:data.itemId
        })
        if(data.changeData){
            BankAccountAlert.changeContent(data.changeData);
        }
    }
    /**
     * 小键盘 
     * @param label 
     * @param type 
     */
    public showKeyBoard(label,type){
        var node = cc.instantiate(this.keyBoardAlert);
        let canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payKeyBoardAlert').init(label,type)
    }
    /**
     * 设置输入框字体颜色
     * @param msg 
     * @param input 
     */
    setInputColor(msg,input){
        let color1 = new cc.Color(255, 255, 255);
        let color2 = new cc.Color(187, 187, 187);
        //设置字的颜色
        msg == '' ? input.node.color = color2:input.node.color = color1;
    }
    /**
     * WriteMoneyAlert弹窗
     * @param component 
     * @param type 
     * @param data 
     */
    showWriteMoneyAlert(component,type,data){
        var node = cc.instantiate(this.WriteMoneyAlert);
        let canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payWriteMoneyAlert').init(component,type,data)
    }
    /**
     * 图片加载
     * @param url 路径 
     * @param node 节点
     * @param w 宽
     * @param h 高
     */
    public loadIcon(url,node,w,h){
        cc.loader.loadRes(`pay/${url}`,cc.SpriteFrame,(err, spriteFrame)=>{
            node.width = w;
            node.height = h;
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    }
    public loadTitle(url,node){
        cc.loader.loadRes(`pay/${url}`,cc.SpriteFrame,(err, spriteFrame)=>{
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    }
    /**
     * 网络请求
     * @param method 方式
     * @param url 网址
     * @param data 参数
     * @param successFn 成功回调
     * @param faildFn 失败回调 
     */
    ajax(method,url,data,successFn,faildFn){   
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 ) {
                if(xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    successFn(response)
                }else {
                    if(faildFn) {
                        faildFn(xhr.status)
                    }
                }
                xhr.abort()
            }
        };
        xhr.open(method, url, true);
        xhr.ontimeout = () => {
            xhr.abort()
        }
        xhr.onerror = () => {
            xhr.abort()
        }
        xhr.setRequestHeader("Content-Type"
			, "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    //显示加载动画
    showLoading(){
        this.Loading.active = true;
    }
    //隐藏加载动画
    hideLoading(){
        this.Loading.active = false;
    }
    loadMusic(num :number):void{
        let path :string='';
        switch(num){
            case 0 : path ='Button_Click';break;
        }
        cc.loader.loadRes(`pay/sounds/${path}`, cc.AudioClip, function(err, clip) {
            if (err) {
                console.log(err);
                return
            }
            var audioID =  cc.audioEngine.playEffect(clip, false);
            return audioID;
        })
    }
    public showTipAlert(){
        var node = cc.instantiate(this.TipAlert);
        let canvas = cc.find('Canvas');
        canvas.addChild(node);
    }
}
