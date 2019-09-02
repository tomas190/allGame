
var Notification = require('Notification');
var NoticeDef = require('NoticeDef');

var SoundPlayCtrl = cc.Class({
    ctor()
    {
        this.soundID = null;
    },

    PlaySoundCustom(resID) {

        this.StopEffectSound();

        let Sounddata = {}
        Sounddata.ResID = resID;
        Sounddata.bLoop = true;
        let callback = function(soundID) {
            cc.log("set laser soundID~!!!",soundID);
            this.soundID = soundID;
        }
        Sounddata.ReciveSoundID = callback.bind(this);

        Notification.SendNotify(NoticeDef.PlayEffectInfo,Sounddata);        
    },

    StopEffectSound(){
        if(this.soundID) {
            Notification.SendNotify(NoticeDef.StopEffect,this.soundID);
            this.soundID = null;
        }
    },    

    PlayEffectSoundTime(resID,time) {
        let Sounddata = {}
        Sounddata.ResID = resID;

        this.playtime = time;
    
        let cbfinished = function() {
            cc.log("repeat play effect",resID,this.playtime);
            this.playtime--;
            if(this.playtime > 0) {
                Notification.SendNotify(NoticeDef.PlayEffectInfo,Sounddata); 
            }
        }

        Sounddata.callbackFinished = cbfinished.bind(this);

        Notification.SendNotify(NoticeDef.PlayEffectInfo,Sounddata);          
    }
})

module.exports = SoundPlayCtrl;