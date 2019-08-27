// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var BaseDef = require('BaseDef');
var SettingManager = require('SettingManager');

cc.Class({
    extends: cc.Component,

    properties: {
        EmitCoin: {
            displayName:"弹出金币",
            default: null,
            type: cc.AudioClip
        },  

        CoinJump1: {
            displayName:"弹出金币1",
            default: null,
            type: cc.AudioClip
        },   

        CoinJump2: {
            displayName:"弹出金币2",
            default: null,
            type: cc.AudioClip
        },  

        CoinJump3: {
            displayName:"弹出金币3",
            default: null,
            type: cc.AudioClip
        },   
        
        CoinBack1: {
            displayName:"回收金币1",
            default: null,
            type: cc.AudioClip
        }, 
        
        CoinBack2: {
            displayName:"回收金币2",
            default: null,
            type: cc.AudioClip
        },         
        
        SwitchShootLevel: {
            displayName:"切换炮台等级",
            default: null,
            type: cc.AudioClip
        }, 
        
        Shoot:{
            displayName:"射击",
            default: null,
            type: cc.AudioClip
        }, 

        Boom:{
            displayName:"爆炸",
            default: null,
            type: cc.AudioClip
        },

        LaserAttack:{
            displayName:"闪电链",
            default: null,
            type: cc.AudioClip
        },
        
        CacthBoss:{
            displayName:"捕获BOSS级大鱼",
            default: null,
            type: cc.AudioClip
        },    
        
        Wave:{
            displayName:"水声",
            default: null,
            type: cc.AudioClip
        },    

        HitButton:{
            displayName:"按钮点击",
            default: null,
            type: cc.AudioClip
        },
        
        BGM_Tension:{
            displayName:"BGM紧张",
            default: null,
            type: cc.AudioClip            
        },

        BGM_Fierce:{
            displayName:"BGM激烈",
            default: null,
            type: cc.AudioClip            
        },    
        
        BGM_Normal:{
            displayName:"BGM普通",
            default: null,
            type: cc.AudioClip            
        },    
        
        FishCathed1:{
            displayName:"鱼被捕获1",
            default: null,
            type: cc.AudioClip            
        },  
        
        FishCathed2:{
            displayName:"鱼被捕获2",
            default: null,
            type: cc.AudioClip            
        }, 
        
        FishCathed3:{
            displayName:"鱼被捕获3",
            default: null,
            type: cc.AudioClip            
        },    
        
        Alert:{
            displayName:"警报声",
            default: null,
            type: cc.AudioClip             
        }
        
    },

    getClassName()
    {
        return "AudioManager";
    },  

    // LIFE-CYCLE CALLBACKS:
    onLoad () 
    {        
        Notification.Regsiter(NoticeDef.PlayMusic,this,this.onPlayMusic);
        Notification.Regsiter(NoticeDef.PlayEffect,this,this.onPlayEffect);  
        Notification.Regsiter(NoticeDef.PlayEffectInfo,this,this.onPlaySoundInfo); 
        Notification.Regsiter(NoticeDef.StopMusic,this,this.onStopMusic);         
        Notification.Regsiter(NoticeDef.StopEffect,this,this.onStopSound); 

        
                 


        this.BGM = {}
        let BGM_Def = BaseDef.BGM_DEF;
        this.BGM[BGM_Def.BGM_NORMAL] = this.BGM_Normal;
        this.BGM[BGM_Def.BGM_TENSION] = this.BGM_Tension;
        this.BGM[BGM_Def.BGM_FIERCE] = this.BGM_Fierce;

        this.SOUND = {}
        let SOUND_DEF = BaseDef.SOUND_DEF;
        this.SOUND[SOUND_DEF.SUD_COIN] = this.EmitCoin;
        this.SOUND[SOUND_DEF.SUD_SWITCHLevel] = this.SwitchShootLevel;
        this.SOUND[SOUND_DEF.SUD_SHOOT] = this.Shoot;
        this.SOUND[SOUND_DEF.SUD_BOOM] = this.Boom;        
        this.SOUND[SOUND_DEF.SUD_LASER] = this.LaserAttack;
        this.SOUND[SOUND_DEF.SUD_CATCHBOSS] = this.CacthBoss;
        this.SOUND[SOUND_DEF.SUD_WAVE] = this.Wave;
        this.SOUND[SOUND_DEF.SUD_HITBUTTON] = this.HitButton;
        this.SOUND[SOUND_DEF.SUD_CATCHFISH01] = this.FishCathed1;
        this.SOUND[SOUND_DEF.SUD_CATCHFISH02] = this.FishCathed2;
        this.SOUND[SOUND_DEF.SUD_CATCHFISH03] = this.FishCathed3;
        this.SOUND[SOUND_DEF.SUD_COINJUMP1] = this.CoinJump1;
        this.SOUND[SOUND_DEF.SUD_COINJUMP2] = this.CoinJump2;
        this.SOUND[SOUND_DEF.SUD_COINJUMP3] = this.CoinJump3;        
        this.SOUND[SOUND_DEF.SUD_COINBACK2] = this.CoinBack2;
        this.SOUND[SOUND_DEF.SUD_COINBACK1] = this.CoinBack1;   
        this.SOUND[SOUND_DEF.SUD_ALERT] = this.Alert;   
             


    },

 
    start () {

    },

    // update (dt) {},

    // lateUpdate() {
    //     let context = cc.sys.__audioSupport.context;
    //     if (context.state === 'suspended') {
    //         context.resume();
    //         console.log(context.state);
    //     }
    // },

    onPlayMusic( musicID) {
        let bv = SettingManager.GetBGMValue();
        if(bv > 0) {
            let music = this.BGM[musicID];
            if(music) {
                cc.log("Play Muisc",bv,music);
                cc.audioEngine.stopMusic();
                let id = cc.audioEngine.playMusic(music, true);
                cc.audioEngine.setVolume(id,bv);
            }
        }

    },

    onStopMusic() {
        cc.audioEngine.stopMusic();
    },

    onPlayEffect( soundID) {
        let sv = SettingManager.GetSoundValue();
        if(sv > 0)
        {
            let sound = this.SOUND[soundID];
            if(sound) {
                cc.log("play effect",sound);
                let id = cc.audioEngine.playEffect(sound, false);
                //cc.log("cc.audioEngine.getVolume(id)",cc.audioEngine.getVolume(id));
                cc.audioEngine.setVolume(id,sv);
                //cc.log("cc.audioEngine.getVolume(id)",cc.audioEngine.getVolume(id));
            }
        }

    },

    onPlaySoundInfo(data) {
        let sv = SettingManager.GetSoundValue();
        if(sv > 0)
        {
            let sound = this.SOUND[data.ResID];
            if(sound) {    
                cc.log("Play data.ResID",data.ResID);        
                let soundID = cc.audioEngine.playEffect(sound, data.bLoop);
                cc.audioEngine.setVolume(soundID,sv);

                if(data.ReciveSoundID) {
                    data.ReciveSoundID(soundID);
                }
                
                if(data.callbackFinished) {
                    cc.audioEngine.setFinishCallback(soundID,data.callbackFinished);
                } 
            }
        }        

    },

    onStopSound(soundID) {
        if(soundID) {
            cc.audioEngine.stopEffect(soundID); 
        }
    }
});
