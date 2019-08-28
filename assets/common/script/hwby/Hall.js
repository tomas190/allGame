// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// var connection = require('Connection');
//var msgSender = require('msgSender');
//var commTools = require('CommTools');
var BaseDef = require('BaseDef');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var gameStatMgr = require('GameStateMgr');
var debugManager = require('DebugManager');
var SettingManager = require('SettingManager');
var resManager = require('ResManager');
//var commTools = require('CommTools');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        LoadImg:{ //加载背景
            type:cc.SpriteFrame,
            default:null,
        },

        HallImg:{ //大厅背景
            type:cc.SpriteFrame,
            default:null,
        },

        BGSprite: {
            type:cc.Sprite,
            default:null,
        },

        progressBarView: {
            type: cc.ProgressBar,
            default: null
        }        
    },

    getClassName()
    {
        return "Hall";
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("this is onload of hall~!!");         
        gameStatMgr.setCurSceneRootNode(this.node);

        Notification.Regsiter(NoticeDef.Score,this,this.SetPlayerScore);  
        Notification.Regsiter(NoticeDef.LoginRsp,this,this.SetPlayerInfo); 
        Notification.Regsiter(NoticeDef.ServerVersion,this,this.SetServerversion); 
        

        this.ShowAllCtrl(false);

        cc.log("11111111111111111111111"); 

        this.ctrLoadProgress = this.node.getChildByName("LoadingProgress");
        this.labelLoadProgress = this.ctrLoadProgress.getComponent(cc.Label);

        cc.log("2222222222222222222222222"); 

        this.progressBarView.progress = 0;
        
        let onProgress = function(completedCount,totalCount,item ) {
            this.labelLoadProgress.string = "Loading:" + completedCount + "/" + totalCount;
            this.progressBarView.progress = completedCount/totalCount;

            //cc.log("completedCount",completedCount);
            //cc.log("totalCount",totalCount);
            //cc.log("item",item);
        }


        if(this.LoadImg) {
            this.BGSprite.spriteFrame = this.LoadImg;
        }
        

        let onLoaded = function() {
            this.ShowAllCtrl(true);
            this.ctrLoadProgress.active = false;
            this.node.getChildByName("jd_bg").active = false;
            let logospr = this.node.getChildByName("LOGO");
            if (logospr) {
                logospr.active = false;
            }

            if(this.HallImg) {
                this.BGSprite.spriteFrame = this.HallImg;
            }
    
            
            gameStatMgr.LoginCheck();
            cc.log("game onLoaded~!!");
        }
        
        cc.director.preloadScene('Buyu_game',onProgress.bind(this),onLoaded.bind(this));

        
        this.bLoginState = false;

        //动态资源现在只加载了实际游戏中的资源。进入大厅先全部释放一次。刚进大厅时里面没有任何资源，无任何负作用
        resManager.ReleaseAll();

        this.initUserInfoCtrl();
    },

    SetServerversion(sServerversion)
    {
        cc.log("server version",sServerversion);
        let sClientVersion = BaseDef.Version;

        let labelVersion = this.node.getChildByName("version").getComponent(cc.Label);
        labelVersion.string = "版本号：" + sClientVersion + "-" + sServerversion; 
    },

    PlayButtonHitSound()
    {
        Notification.SendNotify(NoticeDef.PlayEffect,BaseDef.SOUND_DEF.SUD_HITBUTTON);
    },


    ShowAllCtrl(bVisble)
    {        
        this.node.getChildByName("Back").active = bVisble;   
        this.node.getChildByName("room1x").active = bVisble;   
        this.node.getChildByName("room10x").active = bVisble;
        this.node.getChildByName("room100x").active = bVisble;         
        this.node.getChildByName("UserInfo").active = bVisble; 
        let lf_top = this.node.getChildByName("LineFrame_top");
        if(lf_top) {
            lf_top.active = bVisble;
        }

        let lf_bottom = this.node.getChildByName("LineFrame_bottom");
        if(lf_bottom) {
            lf_bottom.active = bVisble;
        }
        // this.node.getChildByName("LineFrame_top").active = bVisble;
        // this.node.getChildByName("LineFrame_bottom").active = bVisble;
        
    },

    initUserInfoCtrl() {
        cc.log("initUserInfoCtrl~~!!!!",gameStatMgr.getScore())
        let userinfo = this.node.getChildByName("UserInfo");
        let scoreNode = userinfo.getChildByName("Score");
        this.scoreLabel = scoreNode.getComponent(cc.Label);
        this.NickLabel = userinfo.getChildByName("nikename").getComponent(cc.Label);
        //this.HeadImg = userinfo.getChildByName("tou_bg2").getChildByName("HeadImgFrame").getChildByName("HeadImg");
        this.HeadImg = cc.find("tou_bg2/HeadImgFrame/HeadImg",userinfo);
        if(!this.HeadImg){
            cc.log("HeadImg can't load~!!!");
            cc.log(new Error().stack);
        }

        this.SetPlayerScore(gameStatMgr.getScore()); 
        this.SetPlayerNick(gameStatMgr.getUserNick());    
        this.SetPlayerHead(gameStatMgr.getUserHead());   
        this.SetServerversion(gameStatMgr.GetServerVersion());
        //this.NickLabel.string = gameStatMgr.getUserNick();
        
    },    

    TestShow() {
        cc.log("this test show~!!!")
    },

    SetPlayerNick(sNick) {
        if(this.NickLabel) {
            this.NickLabel.string = sNick
        }
    },

    SetPlayerHead(sHead) {
        if(sHead != "") {
            let callback = function (err, texture) {
                cc.log("err:",err)
                let frame=new cc.SpriteFrame(texture);
                this.HeadImg.getComponent(cc.Sprite).spriteFrame=frame;
            }
            cc.loader.load(sHead,callback.bind(this));
        }
    },

    SetPlayerInfo(msg) {
        cc.log("SetPlayerInfo~!!!",msg);
        this.SetPlayerScore(msg.getScore());  
        this.SetPlayerNick(msg.getNick());   
        cc.log("msg.getHeadimg():",msg.getHeadimg());
        let fullpath = gameStatMgr.getIconPath() + msg.getHeadimg()
        cc.log("fullpath",fullpath);

        //原生项目先不再设置头像等，可直接从大厅处取得头像
        //this.SetPlayerHead(fullpath);     

        this.bLoginState = true;
    },

    SetPlayerScore(score) {   
        if(score < 0)
        {
            score = 0;            
        }     
        //this.TestShow();
        if(this.scoreLabel) {
            this.scoreLabel.string = score.toFixed(2);
        }
        
        //this.bLoginState = true;
    },

    onDestroy() {
        cc.log("Hall onDestroy~!!!");
        Notification.UnRegAll(this);
        debugManager.CloseDebugPanel();    
    },

    start () {  
        cc.log("this is start of hall~!!"); 
        //debugManager.PopDebugPanel(this.node);   
        //debugManager.DebugInfo("进入捕鱼大厅~！");
        SettingManager.ApplyBGMSoundValue();
        Notification.SendNotify(NoticeDef.PlayMusic,BaseDef.BGM_DEF.BGM_NORMAL);         
    },

    onClickBack() {
        cc.log("onClickBack~~~！！");
        this.PlayButtonHitSound();
        //从本游戏(不是指游戏场)退出到平台
        gameStatMgr.ExitFromGame();        
    },

    btnClick(event, customEventData) {
        cc.log("btnClick");
        cc.log("click button:",event.target.name,customEventData);
        this.PlayButtonHitSound();
        gameStatMgr.SwitchGame(customEventData);
        //gameStatMgr.showMessagebox();

        // let fnCallback = function() {
        //     cc.log("callback to here");
        //     this.TestShow();
        // }

        // commTools.showMessagebox(this.node,"这是一条测试信息~！",fnCallback.bind(this));
    },

    // update (dt) 
    // {
    //     cc.log("this is update of hall~!!"); 
    // },
});
