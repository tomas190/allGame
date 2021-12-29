const {ccclass, property} = cc._decorator;

@ccclass
export default class hqqkefu extends cc.Component {

    @property(cc.WebView)
    kefuweb: cc.WebView = null;
    start () {
        let scalex = cc.view.getVisibleSize().width/cc.view.getDesignResolutionSize().width;
        let scaley = cc.view.getVisibleSize().height/cc.view.getDesignResolutionSize().height;
        
        if( cc.isValid(this.kefuweb) ){
            this.kefuweb.url = hqq.app.versionJson.live_service.url1;
            this.kefuweb.node.width *= scalex;
            this.kefuweb.node.height *= scaley;   
        }

        let zxkf = cc.find("kefulayer/btncontainer/zxkf")
        if( cc.isValid(zxkf) ){
            zxkf.width *= scalex;
            zxkf.height *= scalex;   
        }

        let zxkfd_menu = cc.find("kefulayer/btncontainer/zxkf/d_menu")
        if( cc.isValid(zxkfd_menu) ){
            zxkfd_menu.width *= scalex;
            zxkfd_menu.height *= scalex;   
        }

        let zxkfunselect = cc.find("kefulayer/btncontainer/zxkf/d_menu/Background");
        if(cc.isValid(zxkfunselect)){
            zxkfunselect.width *= scalex;
            zxkfunselect.height *= scalex;
        }

        let zxkfselect = cc.find("kefulayer/btncontainer/zxkf/checkmark/dating_menu_btn_selected");
        if(cc.isValid(zxkfselect)){
            zxkfselect.scaleX = scalex;
            zxkfselect.scaleY = scalex;
        }

        let contact_CS_bg = cc.find("kefulayer/btncontainer/zxkf/checkmark/contact_CS_bg");
        if(cc.isValid(contact_CS_bg)){
            contact_CS_bg.width *= scalex;
            contact_CS_bg.height *= scaley;
        }

        let cjwtcontent = cc.find("kefulayer/btncontainer/zxkf/checkmark/cjwt");
        if(cc.isValid(cjwtcontent)){
            cjwtcontent.width *= scalex;
            cjwtcontent.height *= scaley;
        }

        let menu_bottom_particle = cc.find("kefulayer/menu_bottom_particle")
        if(cc.isValid(menu_bottom_particle)){
            menu_bottom_particle.width *= scalex;
            menu_bottom_particle.height *= scaley;
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
