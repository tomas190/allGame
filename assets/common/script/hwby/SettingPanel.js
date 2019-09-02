// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var intercepttouch = require('InterceptTouch');
var BaseDef = require('BaseDef');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var SettingManager = require('SettingManager');
var gameStatMgr = require('GameStateMgr');

cc.Class({
    extends: cc.Component,
    mixins:[intercepttouch],

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        this.sliderBGM = this.node.getChildByName("sliderBGM").getComponent("CustomSlider");
        this.sliderSound = this.node.getChildByName("sliderSound").getComponent("CustomSlider");
        
        
        this.sliderBGM.setCallBackOnChange(this.onMusicChange.bind(this))
        this.sliderSound.setCallBackOnChange(this.onSoundChange.bind(this))

        this.LabelVersion = this.node.getChildByName("Version").getComponent(cc.Label);

        this.LabelVersion.string = BaseDef.Version + " - " + gameStatMgr.GetServerVersion();
        this.Intercept();    
    },




    PlayButtonHitSound()
    {
        Notification.SendNotify(NoticeDef.PlayEffect,BaseDef.SOUND_DEF.SUD_HITBUTTON);
    },

    setGameUI(gameUI)
    {
        this.GameUI = gameUI;
    },

    onCancel()
    {        
        cc.log("cancel setting~~~!");
        this.PlayButtonHitSound();
        this.Close();
    },

    onMusicChange(value)
    {
        cc.audioEngine.setMusicVolume(value);
    },

    onSoundChange(value)
    {
        cc.audioEngine.setEffectsVolume(value); 
    },

    onOK()
    {
        cc.log("apply setting~~~!");
        this.PlayButtonHitSound();

        let bgmv = this.sliderBGM.getProgress();
        let sundv = this.sliderSound.getProgress();        
        cc.log("BGM value is ",bgmv);
        cc.log("sound value is ",sundv);

        SettingManager.SetBGMValue(bgmv);
        SettingManager.SetSoundValue(sundv);
        
        this.Close();
    },

    Close()
    {
        SettingManager.ApplyBGMSoundValue();
        this.GameUI.onCloseSettingPanel();
        this.node.destroy();
    },


    start () 
    {
        let bgmv = SettingManager.GetBGMValue();
        let sudv = SettingManager.GetSoundValue();
        cc.log("bmgv sudv",bgmv,sudv);
        if(bgmv == null) {
            bgmv = 0.5
        }

        if(sudv == null) {
            sudv = 0.5
        }        
        this.sliderBGM.setProgress(bgmv);
        this.sliderSound.setProgress(sudv);
    },

    // update (dt) {},
});
