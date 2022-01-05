import { GameUtil } from './CYLHDGameUtils';
import { cylhd_language } from "../language/cylhd_language";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CYLHDMessageBox extends cc.Component{
    ButtonOK:cc.Node = null;
    ButtonCancel:cc.Node = null;
    ButtonClose:cc.Node = null;
    fnCallbackOK:Function = null;
    fnCallbackCancel:Function = null;
    messageLabel:cc.Label = null;
    FrameBox:cc.Node = null;

    start(){
        let MaskLayer = cc.find( "MaskLayer" , this.node );
        MaskLayer.width = cc.winSize.width;
        MaskLayer.height = cc.winSize.height;

        this.ButtonOK = cc.find( "FrameBox/BtnOK" , this.node );
        
        this.ButtonCancel = cc.find( "FrameBox/BtnCancel" , this.node );
        this.ButtonClose = cc.find( "FrameBox/BtnClose" , this.node );

        let messagenode = cc.find("FrameBox/Message",this.node);
        if( cc.isValid( messagenode ) )
        {
            this.messageLabel = messagenode.getComponent(cc.Label);
        }

        this.FrameBox = cc.find( "FrameBox" , this.node );

        GameUtil.loadSpriteFrame( this.ButtonOK , "language/" + cylhd_language.getCurLanguage() + "/game/a52" );
        GameUtil.loadSpriteFrame( this.ButtonCancel , "language/" + cylhd_language.getCurLanguage() + "/game/cancelbtn1" );

        this.FrameBox.active = false;
    }

    close(){
        if( cc.isValid( this.node ) )
        {
            this.node.destroy();
        } 
    }

    /**
     * 弹窗初始化
     * @param tips              信息内容 
     * @param fnCallbackOK      确认回调
     * @param fnCallbackCancel  取消回调 
     * @param isOK              是否显示确认按钮
     * @param isCancel          是否显示取消按钮
     * @param isClose           是否显示关闭按钮
     */
    init( tips:string , fnCallbackOK:Function = null , fnCallbackCancel:Function = null , isOK:boolean = false , isCancel:boolean = false , isClose:boolean = false )
    {
        if( cc.isValid(this.messageLabel) )
        {
            this.messageLabel.string = tips;
        }

        if( fnCallbackOK )
        {
            this.fnCallbackOK = fnCallbackOK;
        }

        if( fnCallbackCancel )
        {
            this.fnCallbackCancel = fnCallbackCancel;
        }

        if( cc.isValid(this.ButtonOK) )
        {
            this.ButtonOK.active = isOK;
        }

        if( cc.isValid(this.ButtonCancel) )
        {
            this.ButtonCancel.active = isCancel;
        }

        if( cc.isValid(this.ButtonClose) )
        {
            this.ButtonClose.active = isClose;
        }

        if( isOK && !isCancel && cc.isValid( this.ButtonOK ) )
        {
            this.ButtonOK.x = 0;
        }

        if( cc.isValid( this.FrameBox ) )
        {
            this.FrameBox.active = true;
        }
    }

    onClickOK(event, customEventData){
        if(this.fnCallbackOK){
            this.fnCallbackOK();
        }

        this.close();
    }

    onClickCancel(event, customEventData){
        if(this.fnCallbackCancel){
            this.fnCallbackCancel();
        }
        
        this.close();     
    }  
};
