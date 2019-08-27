var SettingManager = cc.Class({
    GetBGMValue() {
        return cc.sys.localStorage.getItem("BMG");   
    },

    GetSoundValue() {
        return cc.sys.localStorage.getItem("Sound");
    },

    SetBGMValue(value) {
        cc.log("setBGMValue",value);
        cc.sys.localStorage.setItem("BMG", value);      
    },

    SetSoundValue(value) {
        cc.log("SetSoundValue",value);
        cc.sys.localStorage.setItem("Sound", value);   
    },    

    ApplyBGMSoundValue() {
        let bv = this.GetBGMValue();       
        let sv = this.GetSoundValue();

        if(bv && sv) {

            cc.log("set bgm and sound value to ",bv,sv);
            cc.audioEngine.setMusicVolume(bv);
            cc.audioEngine.setEffectsVolume(sv);  
        } else {
            cc.log("no user set ,set bgm and sound value to 1");
            cc.audioEngine.setMusicVolume(1);
            cc.audioEngine.setEffectsVolume(1);   
            
            this.SetBGMValue(1);
            this.SetSoundValue(1);
        }
        
               
    },
})

module.exports = new SettingManager();