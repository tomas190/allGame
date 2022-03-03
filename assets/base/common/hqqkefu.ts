import * as cc from "cc";
const {ccclass, property} = cc._decorator;

@ccclass('hqqkefu')
export default class hqqkefu extends cc.Component {
    @property(cc.WebView)
    kefuweb: cc.WebView | null = null;
    start () {
        let scalex = cc.view.getVisibleSize().width/cc.view.getDesignResolutionSize().width;
        let scaley = cc.view.getVisibleSize().height/cc.view.getDesignResolutionSize().height;

        if( cc.isValid(this.kefuweb) ){
            this.kefuweb.url = hqq.app.versionJson.live_service.url1;
            this.kefuweb.node.getComponent(cc.UITransform).setContentSize( cc.size( this.kefuweb.node.getComponent(cc.UITransform).contentSize.width*scalex,this.kefuweb.node.getComponent(cc.UITransform).contentSize.height*scaley))
        }

        let zxkf = cc.find("kefulayer/btncontainer/zxkf")
        if( cc.isValid(zxkf) ){
            zxkf.getComponent(cc.UITransform).setContentSize( cc.size( zxkf.getComponent(cc.UITransform).contentSize.width*scalex,zxkf.getComponent(cc.UITransform).contentSize.height*scalex))
        }

        let zxkfd_menu = cc.find("kefulayer/btncontainer/zxkf/d_menu")
        if( cc.isValid(zxkfd_menu) ){
            zxkfd_menu.getComponent(cc.UITransform).setContentSize( cc.size( zxkfd_menu.getComponent(cc.UITransform).contentSize.width*scalex,zxkfd_menu.getComponent(cc.UITransform).contentSize.height*scalex))
        }

        let zxkfunselect = cc.find("kefulayer/btncontainer/zxkf/d_menu/Background");
        if(cc.isValid(zxkfunselect)){
            zxkfunselect.getComponent(cc.UITransform).setContentSize( cc.size( zxkfunselect.getComponent(cc.UITransform).contentSize.width*scalex,zxkfunselect.getComponent(cc.UITransform).contentSize.height*scalex))
        }

        let zxkfselect = cc.find("kefulayer/btncontainer/zxkf/checkmark/dating_menu_btn_selected");
        if(cc.isValid(zxkfselect)){
            zxkfselect.getComponent(cc.UITransform).setContentSize( cc.size( zxkfselect.getComponent(cc.UITransform).contentSize.width*scalex,zxkfselect.getComponent(cc.UITransform).contentSize.height*scalex))
        }

        let contact_CS_bg = cc.find("kefulayer/btncontainer/zxkf/checkmark/contact_CS_bg");
        if(cc.isValid(contact_CS_bg)){
            contact_CS_bg.getComponent(cc.UITransform).setContentSize( cc.size( contact_CS_bg.getComponent(cc.UITransform).contentSize.width*scalex,contact_CS_bg.getComponent(cc.UITransform).contentSize.height*scaley))
        }

        let cjwtcontent = cc.find("kefulayer/btncontainer/zxkf/checkmark/cjwt");
        if(cc.isValid(cjwtcontent)){
            cjwtcontent.getComponent(cc.UITransform).setContentSize( cc.size( cjwtcontent.getComponent(cc.UITransform).contentSize.width*scalex,cjwtcontent.getComponent(cc.UITransform).contentSize.height*scaley))
        }

        let menu_bottom_particle = cc.find("kefulayer/menu_bottom_particle")
        if(cc.isValid(menu_bottom_particle)){
            menu_bottom_particle.getComponent(cc.UITransform).setContentSize( cc.size( menu_bottom_particle.getComponent(cc.UITransform).contentSize.width*scalex,menu_bottom_particle.getComponent(cc.UITransform).contentSize.height*scaley))
        }

        if( hqq.app.pinpai == "ninetwo" ){
            hqq.setSprite( cc.find("kefulayer/exitbtn"),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/" + hqq.language + "/ninetwo/img/fanhui"});
            hqq.setSprite( cc.find("kefulayer/title"),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/" + hqq.language + "/ninetwo/img/title_kf"});
        }
    }
    onClose(){
        if(cc.isValid(this.node)){
            this.node.active = false;
        }
    }
    onClickImWeb() {
        cc.sys.openURL(hqq.app.versionJson.live_service.url1);
    }
}