// import localData from "./LocalData"
(function(){
    var Super = function(){};
    Super.prototype = cc.Button.prototype;
    //实例化原型
    Super.prototype._onTouchEnded = function (t) {
        if (this.interactable && this.enabledInHierarchy) {

            // let on_off = cc.sys.localStorage.getItem("on_off");
            let node = new cc.Node() 
            let audio = node.addComponent(cc.AudioSource);
            cc.loader.loadRes("Audio/Click",cc.AudioClip,function(err,clip){
                audio.clip = clip;
                // if( on_off != false ) 
                audio.play();
            });
            if (this._pressed) {
                cc.Component.EventHandler.emitEvents(this.clickEvents, t);
                this.node.emit("click", this);
            }
            this._pressed = !1;
            this._updateState();
            t.stopPropagation();
        }
    };
})();