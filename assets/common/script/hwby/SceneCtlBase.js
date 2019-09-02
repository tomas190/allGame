var SceneCtlBase = cc.Class({
    ctor()
    {
        cc.log("SceneCtlBase~!!");
        this.sEnterAniName = "None";
        this.sEnterEndAniName = "None";
        this.sExitAniName = "None";
        //this.sExitEndAniName = "None";
        this.scene = null;
    },

    SetIndex(index){
        this.Index = index;
    },

    SetScene(scene) {
        this.scene = scene;
        this.InitAniCommpent();
        this.InitAllChildren();
    },

    InitAllChildren() {
        cc.log("InitAllChildren~~~!!");
    },

    InitAniCommpent() {
        this.AniCtrl = this.node.getComponent(cc.Animation);  
    },

    SetSceneIndex(index) {
        this.Index =index;
    },

    SetEnterAni(name) {
        this.sEnterAniName = name;
    },

    SetEnterEndAni(name) {
        this.sEnterEndAniName = name;
    },

    SetExitAni(name) {
        this.sExitAniName = name;
    },

    SetExitEndAni(name) {
        this.sExitEndAniName = name;
    },

    HaveAni(name) {
        return "None" != name;
    },

    CheckAndPlayAni(name) {
        if (this.HaveAni(name)){
            cc.log(" this.AniCtrl.play",name);
            this.AniCtrl.play(name);
            return false;
        }     
        
        return true;
    },

    //没有进入动画执行淡入
    Fadein4Eenter() {
        let callback = cc.callFunc(this.onEnterEnd, this);
        this.node.runAction(cc.sequence(cc.fadeTo(0.5,255), callback));
    },    

    EnterScene() {
        cc.log("11111111 EnterScene",this.Index);
        this.node.active = true; 
        
        //如果有开场动画，直接设置透明度为255
        if(this.HaveAni(this.sEnterAniName)) {
            cc.log(this.Index,"set scene add opacity to 255");
            this.node.opacity = 255;
        }
                 
        if(this.CheckAndPlayAni(this.sEnterAniName)) {
            this.Fadein4Eenter();
        }
        
        this.EnterSceneAdd();
    },

    EnterSceneAdd() {
        cc.log("exec enter scene Add~~!!this function need overload");
    },

    onEnterEnd() {
        this.CheckAndPlayAni(this.sEnterEndAniName);
        this.scene.onSceneEnterDone(this.Index);

    },

    //没有退出动画执行淡出
    Fadeout4Exit() {
        let callback = cc.callFunc(this.onExitEnd, this);
        this.node.runAction(cc.sequence(cc.fadeTo(0.5,0), callback));
    },

    ExitScene() {    
        this.ExitScenePre();
        cc.log("11111ExitScene~~!!",this.Index);
        if(this.CheckAndPlayAni(this.sExitAniName)) {
            this.Fadeout4Exit();
        }      
    },

    ExitScenePre() {
        cc.log("ExitSceneAdd~~!!!");
    },

    onExitEnd() {
        this.node.active = false;
        //this.CheckAndPlayAni(this.sExitEndAniName);
        this.scene.onSceneExitDone(this.Index);      
    },

    ready() {

    },    
    
})

module.exports = SceneCtlBase;