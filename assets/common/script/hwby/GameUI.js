// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// var gameStatMgr = require('GameStateMgr');
var BaseDef = require('BaseDef');
var NoticeDef = require('NoticeDef');
var baseNodeFun = require('BaseNodeFun');
var Notification = require('Notification');
var gameStatMgr = require('GameStateMgr');
var resManager = require('ResManager');

cc.Class({
    extends: cc.Component,
    mixins:[baseNodeFun],

    properties: {
        FishListPanelPrefab:
        {
            default:null,
            type:cc.Prefab
        }, 
        
        SettingPanelPrefab:
        {
            default:null,
            type:cc.Prefab
        },

        LightCirclePrefab:
        {
            default:null,
            type:cc.Prefab            
        },

        FishGroupComingPrefab:
        {
            default:null,
            type:cc.Prefab            
        },  
        
        ScreenTipWaitFGRPrefab:
        {
            default:null,
            type:cc.Prefab               
        },

        ScreenTipLogout4IdlePrefab:
        {
            default:null,
            type:cc.Prefab
        },

        // buttonSwitch:
        // {
        //     default:null,
        //     type:cc.Node
        // }

    },

    // LIFE-CYCLE CALLBACKS:

    getClassName()
    {
        return "GameUI";
    },      

    onLoad () 
    {
        gameStatMgr.setCurSceneRootNode(this.node);

        this.InitControlMenuUI();

        this.bMenuOpen = false;

        //是否有子菜单打开
        this.bSubMenuOpen = false;

        this.sFishListPrefab = "hwby/ui/FishListPanel";

        cc.log("Regsiter NoticeDef.WaitFishGroup on GameUI~1111111111111");

        Notification.Regsiter(NoticeDef.SpecialFishGroup,this,this.PopFishGroupComing);
        Notification.Regsiter(NoticeDef.WaitFishGroup,this,this.PopScreenTipWaitFGR);
        Notification.Regsiter(NoticeDef.IdleOverTip,this,this.PopLogoutTip4Idle);  
        Notification.Regsiter(NoticeDef.PlayerWakeUp,this,this.CloseLogoutTip4Idle);   

        this.curTestIndex = 0;
        
        
    },

    PopScreenTipWaitFGR(time) {
        cc.log("PopScreenTipWaitFGR~~11111111111111111!!!");
        let st = this.InstantiatePrefab(cc.v2(0,0),this.ScreenTipWaitFGRPrefab);
        let sts = st.getComponent("WaitFGTip");
        sts.setTime(time);
        sts.Run();
    },

    CloseLogoutTip4Idle() {
        cc.log("CloseLogoutTip4Idle~!!!")
        this.IdleTipPanel.stopTick();
    },

    PopLogoutTip4Idle(time) {
        let st = this.InstantiatePrefab(cc.v2(0,0),this.ScreenTipLogout4IdlePrefab);
        this.IdleTipPanel = st.getComponent("Logout4Idel");
        this.IdleTipPanel.setTime(time);
        this.IdleTipPanel.Run();
    },

    onExitGame()
    {

        // if(this.curTestIndex == 0) {
        //     this.curTestIndex = 3            
        // } else {
        //     this.curTestIndex = 0
        // }

        // let index = this.curTestIndex;
        
        // let msg = {}
        // msg.getSceneindex = function()
        // {
        //     return index;
        // }

        // msg.getState = function() {
        //     return 0;
        // }

        
        // Notification.SendNotify(NoticeDef.ChangeScene,msg);

        if(this.bMenuOpen)
        {
            cc.log("hit back button~~~");
            gameStatMgr.ReqExitLeaveGameReq();
        }

        //this.PopLogoutTip4Idle();

        //this.PopScreenTipWaitFGR();
        //this.PopFishGroupComing();
    },

    PopFishGroupComing() {
        let fgcPanel = cc.instantiate(this.FishGroupComingPrefab);
        //cc.log("newFish name:" + newFish.name)
        this.node.addChild(fgcPanel);  
    },

    PlayButtonHitSound()
    {
        Notification.SendNotify(NoticeDef.PlayEffect,BaseDef.SOUND_DEF.SUD_HITBUTTON);
    },

    InitBackButton()
    {
        //控制菜单切换按钮
        this.buttonBack =  this.ControlMenuRoot.getChildByName("back");

        let fnClick = function(event)
        {     
            this.PlayButtonHitSound();
            this.onExitGame();                               
            event.stopPropagation();
        }

        let fnClickStart = function(event)
        {
            event.stopPropagation();            
        }

        this.buttonBack.on(cc.Node.EventType.TOUCH_END, fnClick,this);
        this.buttonBack.on(cc.Node.EventType.TOUCH_START, fnClickStart,this);         
    },

    PopSettingPanel()
    {
        if(!this.settingPanel && !this.bSubMenuOpen && this.bMenuOpen)
        {
            let settingPanel = cc.instantiate(this.SettingPanelPrefab);
            //cc.log("newFish name:" + newFish.name)
            this.node.addChild(settingPanel);  
    
            this.settingPanel = settingPanel.getComponent("SettingPanel");
            this.settingPanel.setGameUI(this);
            this.bSubMenuOpen = true;
        }

    },    

    onCloseSettingPanel()
    {
        if(this.settingPanel)
        {
            this.settingPanel = null;
            this.bSubMenuOpen = false;
        }
    },

    InitSettingButton()
    {
        //控制菜单切换按钮
        this.buttonSetting =  this.ControlMenuRoot.getChildByName("setting");

        let fnClick = function(event)
        {                        
            cc.log("hit setting button~~~!");
            this.PlayButtonHitSound();
            this.PopSettingPanel();
            event.stopPropagation();
        }

        let fnClickStart = function(event)
        {
            event.stopPropagation();            
        }

        this.buttonSetting.on(cc.Node.EventType.TOUCH_END, fnClick,this);
        this.buttonSetting.on(cc.Node.EventType.TOUCH_START, fnClickStart,this);   
    },

    DynamicLoadFishList()
    {
        let cbLoad = function(prefab,err) {
            let flPanel = cc.instantiate(prefab);
            //cc.log("newFish name:" + newFish.name)
            this.node.addChild(flPanel);   
            
            this.FishListPanel = flPanel.getComponent("FishListPanel");
            
            this.FishListPanel.setGameUI(this);
            this.bSubMenuOpen = true;
        }
        resManager.LoadRes(this.sFishListPrefab,cbLoad.bind(this));
    },

    StaticLoadFishList()
    {
        let flPanel = cc.instantiate(this.FishListPanelPrefab);
        //cc.log("newFish name:" + newFish.name)
        this.node.addChild(flPanel);   
        
        this.FishListPanel = flPanel.getComponent("FishListPanel");
        
        this.FishListPanel.setGameUI(this);
        this.bSubMenuOpen = true;
    },

    PopFishListPanel()
    {
        if(!this.bSubMenuOpen && this.bMenuOpen)
        {     
            this.StaticLoadFishList();
            //this.DynamicLoadFishList();
        }
        
    },

    onCloseFishListPanel()
    {
        if(this.FishListPanel) 
        {
            //resManager.Release(this.sFishListPrefab);
            this.FishListPanel = null;
            this.bSubMenuOpen = false;
        }
    },

    InitFishPanelButton()
    {
        this.buttonFishpanel =  this.ControlMenuRoot.getChildByName("fishpanel");

        let fnClick = function(event)
        {                        
            cc.log("hit Fishpanel button~~~!");
            this.PlayButtonHitSound();
            this.PopFishListPanel();
            event.stopPropagation();
        }

        let fnClickStart = function(event)
        {
            event.stopPropagation();            
        }

        this.buttonFishpanel.on(cc.Node.EventType.TOUCH_END, fnClick,this);
        this.buttonFishpanel.on(cc.Node.EventType.TOUCH_START, fnClickStart,this);   
    },

    InitSwtichButton()
    {
        //控制菜单切换按钮
        this.buttonSwitch =  this.ControlMenuRoot.getChildByName("but_bg");

        let fnSwitchTouch = function(event)
        {                        
            cc.log("switch menu~~~!");
            this.SwtichControlMenu();
            this.PlayButtonHitSound(); 
            
            event.stopPropagation();
        }

        let fnSwitchTouchStart =  function(event)
        {
            event.stopPropagation();            
        }

        this.buttonSwitch.on(cc.Node.EventType.TOUCH_END, fnSwitchTouch,this);
        this.buttonSwitch.on(cc.Node.EventType.TOUCH_START, fnSwitchTouchStart,this); 
    },

    SwitchFireMode(mode)
    {
        Notification.SendNotify(NoticeDef.SwitchFireMode,mode); 

        switch(mode)
        {
            case BaseDef.FireMode.Lock:
                this.LightCircleAni.parent = this.buttonLock;                
                break;
            case BaseDef.FireMode.Auto:
                this.LightCircleAni.parent = this.buttonAuto;                
                break;
            case BaseDef.FireMode.Manual:
                this.LightCircleAni.parent = this.buttonManual;                
                break;
        }        
    },

    InitLockButton()
    {
        //控制菜单切换按钮
        this.buttonLock =  this.node.getChildByName("lock_on");

        let fnClick = function(event)
        {          
            this.SwitchFireMode(BaseDef.FireMode.Lock);                    
            cc.log("Lock Mode~!!");   
            this.PlayButtonHitSound();        
            event.stopPropagation();
        }

        let fnClickStart =  function(event)
        {
            event.stopPropagation();            
        }

        this.buttonLock.on(cc.Node.EventType.TOUCH_END, fnClick,this);
        this.buttonLock.on(cc.Node.EventType.TOUCH_START, fnClickStart,this); 
    },

    InitAutoButton()
    {
        //控制菜单切换按钮
        this.buttonAuto =  this.node.getChildByName("auto");

        let fnClick = function(event)
        {                        
            cc.log("Auto Mode~~~!");
            this.SwitchFireMode(BaseDef.FireMode.Auto);  
            this.PlayButtonHitSound();          
            event.stopPropagation();
        }

        let fnClickStart =  function(event)
        {
            event.stopPropagation();            
        }

        this.buttonAuto.on(cc.Node.EventType.TOUCH_END, fnClick,this);
        this.buttonAuto.on(cc.Node.EventType.TOUCH_START, fnClickStart,this); 
    },

    InitManualButton()
    {
        //控制菜单切换按钮
        this.buttonManual =  this.node.getChildByName("manual");

        let fnClick = function(event)
        {                        
            cc.log("Manual Mode~~~!");  
            this.SwitchFireMode(BaseDef.FireMode.Manual);  
            this.PlayButtonHitSound();
            //Notification.SendNotify(NoticeDef.SwitchFireMode,BaseDef.FireMode.Manual);         
            event.stopPropagation();
        }

        let fnClickStart =  function(event)
        {
            event.stopPropagation();            
        }

        this.buttonManual.on(cc.Node.EventType.TOUCH_END, fnClick,this);
        this.buttonManual.on(cc.Node.EventType.TOUCH_START, fnClickStart,this); 
    },

    InitLightCircle()
    {
        this.LightCircleAni = cc.instantiate(this.LightCirclePrefab);
        this.LightCircleAni.setPosition(cc.v2(0,6));
        this.LightCircleAni.parent = this.buttonManual;        
    },

    InitControlMenuUI()
    {
        //控制菜单根节点动画播放控制
        this.ControlMenuRoot =  this.node.getChildByName("ControlMenuRoot");

        this.ControlMenuAni = this.ControlMenuRoot.getComponent(cc.Animation);
        this.ControlMenuAniState = this.ControlMenuAni.getAnimationState("ControlMenuOpen");

        this.InitSwtichButton();
        this.InitBackButton();
        this.InitSettingButton();
        this.InitFishPanelButton();
        this.InitAutoButton();
        this.InitLockButton();
        this.InitManualButton();
        this.InitLightCircle();
    },

    SwtichControlMenu()
    {   
        if(this.bMenuOpen)
        {
            this.ControlMenuAniState.wrapMode = cc.WrapMode.Reverse;
        }
        else
        {
            this.ControlMenuAniState.wrapMode = cc.WrapMode.Normal;
        }

        this.ControlMenuAni.play("ControlMenuOpen");

        this.bMenuOpen = !this.bMenuOpen;                
    },

    start () {

    },

    onDestroy() {
        Notification.UnRegAll(this);
    },

    // update (dt) {},
});
