// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
//var msgDispatcher = require('msgDispatcher');
//var msgSender = require('msgSender');
var gameStatMgr = require('GameStateMgr');
var BaseDef = require('BaseDef');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var baseNodeFun = require('BaseNodeFun');
var SoundPlayCtrl = require('SoundPlayCtrl');
var resManager = require('ResManager');
//var msg_pb = require('msg_pb_by');

cc.Class({
    extends: cc.Component,
    mixins:[baseNodeFun,SoundPlayCtrl],

    properties: {

        BubblePrefab:
        {
            default:null,
            type:cc.Prefab
        },        

        SceneCtrlRoot:
        {
            default:null,
            type:cc.Node
        }

        //场景背景
        // SceneSprite:
        // {
        //     default:[],
        //     type:[cc.SpriteFrame],
        // },

        //场景挂件
        // SceneAddtionItem:
        // {
        //     default:[],
        //     type:[cc.Node],
        // },
    },

    getClassName()
    {
        return "scene";
    },    
    
    // LIFE-CYCLE CALLBACKS:
    onLoad ()
    {
        //msgDispatcher.setScene(this);
        gameStatMgr.setScene(this);

        this.SurfNode = this.node.getChildByName("surf"); 
        this.SurfNode.zIndex = 10;
        this.SurfNode.active = false; 

        this.SceneFillAniNode = this.node.getChildByName("SceneImgFillAni"); 
        this.SceneFillAniSpr = this.SceneFillAniNode.getComponent(cc.Sprite);

        //this.SceneImgList = ["scene_01_back","scene_02_back","scene_03_back","scene_04_back","scenegoldbright"];

        this.sCurSceneFrame = "";

        this.sCurPrefabRes = "";

        this.curSceneImgIndex = 0;

        this.testSceneImgIndex = 0;
        
        // let delayCallBack = function()
        // {            
        //     cc.log("尝试播放切换场波浪~~！！");
        //     this.testSceneImgIndex++;

        //     if(this.testSceneImgIndex > 2){
        //         this.testSceneImgIndex = 0;
        //     }

        //     this.ChangeSceneImg(this.testSceneImgIndex)
        // }

        //setTimeout(delayCallBack.bind(this),3000);        
        //setInterval(delayCallBack.bind(this),6000);   
        
        //以下几个属性用来控制填充动画播放，分别为填充完成总时间和当前时间
        this.fillnai_totalTime = 5;
        this.fillani_curTime = this.fillnai_totalTime;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        
        this.commTip = this.node.getChildByName("CommonTip");
        this.commTip.opacity = 0;
        this.bReadyExit = false;

        this.bLoadingFrame = false;        
        this.bLoadingPrefab = false;

        //frame和prefab是否已经准备好
        this.bFrameReady = false;
        this.bPrefabReady = false;

        //是否需要切换场景
        this.bNeedSwitchScene = true;

        Notification.Regsiter(NoticeDef.ChangeScene,this,this.onChangeScene);
        Notification.Regsiter(NoticeDef.ShowCommTips,this,this.showCommTip);

        //气泡时间控制
        this.BubbleTimectl = 0;

        //遮罩层控制
        this.MaskLayer = this.node.getChildByName("MaskLayer").getComponent("MaskLayer");

        this.bCanPlayEnterAni = true;

        //场景切换方式，如果为真淡入淡出，为假就是波浪
        this.bSwitchFade = false;

        this.InitAddtionScript();        
    },

    InitAddtionScript()
    {
        this.SceneCtrl = [];
        for(let i=0;i<5;i++) {
            this.SceneCtrl[i] = {};
        }

        //this.SceneImgList = ["scene_01_back","scene_02_back","scene_03_back","scene_04_back","scenegoldbright"];

        this.SceneCtrl[0].sImg = "scene_01_back";
        this.SceneCtrl[1].sImg = "scene_02_back";
        this.SceneCtrl[2].sImg = "scene_03_back";
        this.SceneCtrl[3].sImg = "scene_04_back";
        this.SceneCtrl[4].sImg = "scenegoldbright";


        this.SceneCtrl[0].sPrefab = "Scene_01_Root";
        this.SceneCtrl[1].sPrefab = "Scene_02_Cover";
        this.SceneCtrl[2].sPrefab = "Scene_03_Root";
        this.SceneCtrl[3].sPrefab = "Scene_04_Root";
        this.SceneCtrl[4].sPrefab = "Scene_05_Mask";

        this.SceneCtrl[0].sScript = "Scene01Ctrl";
        this.SceneCtrl[1].sScript = "Scene02Ctrl";
        this.SceneCtrl[2].sScript = "Scene03Ctrl";
        this.SceneCtrl[3].sScript = "Scene04Ctrl";
        this.SceneCtrl[4].sScript = "Scene05Ctrl";
        
        // for(let i in this.SceneCtrl) 
        // {            
        //     let name = this.SceneCtrl[i].scriptname;
        //     cc.log("name",name);               
        //     this.SceneCtrl[i].script = this.SceneAddtionItem[i].getComponent(name);
        //     this.SceneCtrl[i].script.SetIndex(i);
        //     this.SceneCtrl[i].script.SetScene(this);            
        //     //this.Scene03Script = this.SceneAddtionItem[2].getComponent("Scene03Ctrl");            
        // }        
    },

    onMaskLayerFadeOutEnd()
    {
        cc.log("1111111111 onMaskLayerFadeOutEnd");
        this.SwitchSceneAddtion()
        // if(this.SceneCtrl[this.curSceneImgIndex] && this.SceneCtrl[this.curSceneImgIndex].script) {
        //     this.SceneCtrl[this.curSceneImgIndex].script.EnterScene();
        // }        
    },

    onMaskLayerFadeInEnd()
    {
        if(!this.bBossDark){
            cc.log("1111111111 onMaskLayerFadeInEnd");
            this.curSceneImgIndex = this.newSceneIdx;
            this.RefreshSceneImg();
            
            this.MaskLayer.FadeOut();
        }        
    },  
    
    onCurSceneExit() {
        let data = new Date()
        cc.log("11111 onCurSceneExit:",data.getTime());
        //let curSceneCtrl = this.SceneCtrl[this.curSceneImgIndex];
        if ( this.curSceneScript)
        {
            this.curSceneScript.ExitScene();
        }
        else
        {
            this.onSceneExitDone();
        } 
    },

    onNewSceneReady(newIndex) {        
        this.newSceneIdx = newIndex;        
        cc.log("SetNewSceneIndex to ",this.newSceneIdx)        
        this.LoadNewScene(this.newSceneIdx);         
        // let newscenectl = this.SceneCtrl[this.newSceneIdx]
        // if( newscenectl && newscenectl.script)
        // {
        //     newscenectl.script.ready();
        // }   
    },

    ChangeSceneReady(index) 
    {
        this.bSwitchFade = false;
        this.bCanPlayEnterAni = false;

        this.onCurSceneExit();
        this.onNewSceneReady(index); 
    },

    ChangeSceneFade(index) {  
        this.bSwitchFade = true; 
        this.bBossDark = false;

        this.onCurSceneExit();
        //this.MaskLayer.FadeIn();
        this.onNewSceneReady(index);             
    },

    ChangeToDark4Boss(time) {
        this.bBossDark = true;
        this.nBossTime = time;
        cc.log("ChangeToDark4Boss");
        //this.MaskLayer.FadeIn();
    },

    onChangeScene(msg)
    {
        cc.log("onChangeScene",msg);
        //cc.log("msg.getState()",msg.getState());
        //cc.log("msg.getType()",msg.getType());

        // if(msg.getState() ==  msg_pb.EmRoomRunState.EMRS_BOSS) {
        //     if(msg.getType() == 1) { //类型为一表示遁入黑暗
        //         cc.log("msg.getTime()",msg.getTime());
        //         this.ChangeToDark4Boss(msg.getTime());
        //     }                        
        // } else {                 
        //     this.ChangeSceneFade(msg.getSceneindex());  
        // }

        this.ChangeSceneFade(msg.getSceneindex());  
        
        //this.ChangeSceneReady(msg.getSceneindex());


        // cc.log("11111 onChangeScene",msg.getSceneindex());
        // if (this.curSceneImgIndex == 3 || msg.getSceneindex() == 3) {
        //     this.ChangeSceneFade(msg.getSceneindex());
        // } else if(this.curSceneImgIndex ==  2 || msg.getSceneindex() == 2) {            
        //     //this.ChangeSceneFade(msg.getSceneindex());
        //     this.ChangeSceneReady(msg.getSceneindex());
        //     //this.Scene03Script.InitStonePos();
        // } else {
        //     cc.log("22222 onChangeScene",msg.getSceneindex());
        //     this.ChangeSceneFade(msg.getSceneindex());
        //     //this.ChangeSceneImg(msg.getSceneindex());  
        // }
    },

    onSceneEnterDone(sceneIdx) {
        cc.log("11111Enter Scene",sceneIdx);
    },

    onSceneExitDone(sceneIdx) {
        cc.log("111111Exit Scene",sceneIdx);
        if(this.bSwitchFade) {
            this.MaskLayer.FadeIn();
        }else {
            this.ChangeSceneImg(this.newSceneIdx);
        }
        
    },


    ReleaseOldSceneFrame()
    {
        if(this.oldSceneFrame) {
            cc.log("release scene frame 1111111111111~~~!!!");
            //cc.loader.releaseAsset(this.oldSceneFrame);
            cc.log("release this.oldSceneFrame",this.oldSceneFrame);
            cc.log("this.newSceneFrame",this.newSceneFrame);
            let deps = cc.loader.getDependsRecursively(this.oldSceneFrame);
            cc.loader.release(deps);   
            
            console.log(new Error().stack);
           
            this.oldSceneFrame =  null;
            cc.log("release scene frame 222222222222222~~~!!!");
        }

        // cc.log("ReleaseOldSceneFrame~~~!!!",this.sCurSceneRes)
        // if(this.sOldSceneRes) {
        //     cc.log("ReleaseOldSceneFrame~~~!!!1111111111111")
        //     cc.loader.releaseRes(this.sOldSceneRes, cc.SpriteFrame);        
        //     this.sOldSceneRes = null;
        //     cc.log("ReleaseOldSceneFrame~~~!!!2222222222222")
        // }
        
    },

    ReleaseOldSceneAddtionNode()
    {
        cc.log("ReleaseOldSceneAddtionNode11111111111111");

        if(this.oldSceneAddtionNode) {
            this.oldSceneAddtionNode.destroy();
            this.oldSceneAddtionNode = null;
        }

        if(this.oldScenePrefab) {
            cc.log("release sceneprefab~~~!!!");
            let deps = cc.loader.getDependsRecursively(this.oldScenePrefab);
            cc.loader.release(deps);   
            this.oldScenePrefab = null;
        }
    }, 

    ApplySceneFrame(spriteFrame,index)
    {        
        let sSceneRes = "hwby/scene/img/" + this.SceneCtrl[index].sImg;

        if(this.sCurSceneFrame !="" && this.sCurSceneFrame != sSceneRes) {
            resManager.Release(this.sCurSceneFrame);            
        }

        this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        this.sCurSceneFrame = sSceneRes;
    },

    ApplyNewSceneFrame(index)
    {
        cc.log("ApplyNewSceneFrame",index);
        let sSceneRes = "hwby/scene/img/" + this.SceneCtrl[index].sImg;
        cc.log("apply new res",sSceneRes);
        let spriteFrame = resManager.GetSpriteFrame(sSceneRes);
        if(spriteFrame) {
            resManager.Retian(sSceneRes);
            this.ApplySceneFrame(spriteFrame,index);
        } else {
            let callback = function(spriteFrame,err) {
                this.ApplySceneFrame(spriteFrame,index);                
            }
            resManager.LoadSpriteFrame(sSceneRes,callback.bind(this));
        }        
    },


    ApplyScenePrefab(prefab,index)
    {
        let sPrefabRes = "scene/Prefab/" + this.SceneCtrl[index].sPrefab;
        

        //释放的话要不为空，并且不等于当前加载资源
        if(this.sCurPrefabRes != "" && this.sCurPrefabRes != sPrefabRes) {
            cc.log("release prefab:",this.sCurPrefabRes);
            resManager.Release(this.sCurPrefabRes);            
        }  
        
        this.sCurPrefabRes = sPrefabRes;

        this.curSceneAddtionNode = cc.instantiate(prefab);
        this.SceneCtrlRoot.addChild(this.curSceneAddtionNode);

        cc.log("ApplyNewScenePrefab",index);
        let name = this.SceneCtrl[index].sScript;        
        cc.log("name",name);      
        cc.log("this.curSceneAddtionNode:",this.curSceneAddtionNode);
        this.curSceneScript = this.curSceneAddtionNode.getComponent(name);
        this.curSceneScript.SetIndex(index);
        this.curSceneScript.SetScene(this);
        this.curSceneScript.ready();
        if(this.bCanPlayEnterAni) {
            this.curSceneScript.EnterScene();
        }      

    },

    ApplyNewScenePrefab(index)
    {
        let sPrefabRes = "hwby/scene/Prefab/" + this.SceneCtrl[index].sPrefab;
        cc.log("apply new prefab res",sPrefabRes);

        let prefab = resManager.GetRes(sPrefabRes);
        
        cc.log("prefab:",prefab);
        if(prefab) {
            cc.log("prefab:",prefab);            
            resManager.Retian(sPrefabRes);
            this.ApplyScenePrefab(prefab,index);
        } else {
            let callback = function(prefab,err) {
                cc.log("prefab:",prefab);
                this.ApplyScenePrefab(prefab,index);
            }
            resManager.LoadRes(sPrefabRes,callback.bind(this));
        }

        
        //     //this.Scene03Script = this.SceneAddtionItem[2].getComponent("Scene03Ctrl");            
        
        // this.ReleaseOldSceneAddtionNode();

    },

    LoadNewSceneFrame(index)
    {
        let sSceneRes = "hwby/scene/img/" + this.SceneCtrl[index].sImg;
        //this.sCurSceneFrame = sSceneRes
        cc.log("sSceneRes:",sSceneRes);
        let callback = function() {
            this.bFrameReady = true;
        }
        resManager.LoadSpriteFrame(sSceneRes,callback.bind(this));

    },

    LoadNewScenePrefab(index)
    {        
                
        let sPrefabRes = "hwby/scene/Prefab/" + this.SceneCtrl[index].sPrefab;
        //this.sCurPrefabRes = sPrefabRes;
        cc.log("sPrefabRes:",sPrefabRes);
        let callback = function() {
            this.bPrefabReady = true;
        }
        resManager.LoadRes(sPrefabRes,callback.bind(this));
    },

    LoadNewScene(index) 
    {
        this.bFrameReady = false;
        this.bPrefabReady = false;
        
        this.LoadNewSceneFrame(index);
        this.LoadNewScenePrefab(index);
    },

    CheckSwitchScene()
    {
        if(this.bNeedSwitchScene && this.bFrameReady && this.bPrefabReady) {
            try {
                cc.log("SwitchScene 11111111");
                this.SwitchScene(this.curSceneImgIndex);
                cc.log("SwitchScene 22222222222");
            } catch (err) {
                cc.log("switchscene err",err);
            }
            
            this.bNeedSwitchScene = false;
            this.bFrameReady = false;
            this.bPrefabReady = false;
        }
    },

    SwitchScene(index) 
    {      
        this.ApplyNewSceneFrame(index);
        this.ApplyNewScenePrefab(index);    
    },

    RefreshSceneImg()
    {
        // let data = new Date()
        
        // cc.log("11111 RefreshSceneImg:",data.getTime());
        //================废弃~~
        //this.node.getComponent(cc.Sprite).spriteFrame = this.SceneSprite[this.curSceneImgIndex];
        //this.SwitchSceneAddtion();
        //----end-----
        cc.log("RefreshSceneImg:",this.curSceneImgIndex);
        this.bNeedSwitchScene = true;
        
        let BGM_DEF = BaseDef.BGM_DEF;
        this.StopEffectSound();
        switch(this.curSceneImgIndex) {
            case 0:
            case 2:
                this.PlaySoundCustom(BaseDef.SOUND_DEF.SUD_WAVE);
                Notification.SendNotify(NoticeDef.PlayMusic,BGM_DEF.BGM_NORMAL); 
                break;
            case 1:
                
                Notification.SendNotify(NoticeDef.PlayMusic,BGM_DEF.BGM_NORMAL); 
                break;
            case 3:
                this.PlayEffectSoundTime(BaseDef.SOUND_DEF.SUD_ALERT,3);
                Notification.SendNotify(NoticeDef.PlayMusic,BGM_DEF.BGM_TENSION);  
                break; 
            case 4:
            this.PlayEffectSoundTime(BaseDef.SOUND_DEF.SUD_ALERT,3);
                Notification.SendNotify(NoticeDef.PlayMusic,BGM_DEF.BGM_FIERCE); 
                break;
        }        
    },

    SetSceneImg(index)
    {
        this.curSceneImgIndex = index;
        this.LoadNewScene(index);
        this.RefreshSceneImg();
        //this.SwitchSceneAddtion();
    },

    ChangeSceneImg(index)
    {
        this.SceneFillAniSpr.spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
        this.SceneFillAniSpr.fillRange  = 1;

        this.fillani_curTime = this.fillnai_totalTime;
        this.curSceneImgIndex = index;

        //波浪动画播放的起点
        this.SurfStartX = this.SceneFillAniNode.width/2;
        this.SurfEndX = -this.SceneFillAniNode.width/2;
        
        this.RefreshSceneImg();
        //this.PlaySurf();

        this.SurfStartPlay();         
    },   
    
    SurfStartPlay(){
        this.SurfNode.active = true;
        this.SurfNode.opacity = 255;
        this.SurfNode.setPosition(this.SurfStartX,0);
    },

    //播放波浪移动
    PlaySurf()
    {
        //cc.log("PlaySurf 11111111111111111111");
        //let windowSize=cc.view.getVisibleSize();
        //cc.log("VisbleSize width="+windowSize.width+",height="+windowSize.height);
        //let windowSize=cc.winSize;

        //cc.log("PlaySurf 2222222222222222222");

        this.SurfNode.active = true;
        //this.SurfNode.setPosition(cc.winSize/2+this.SurfNode.width,0);
        //cc.log("cc.winSize/2",cc.winSize.width/2 + this.SurfNode.width);
        this.SurfNode.setPosition(cc.winSize.width/2 + this.SurfNode.width,0);

        //cc.log("PlaySurf 3333333333333333333333");
        //let fnMoveto = cc.moveTo(5,cc.v2(-cc.winSize/2-this.SurfNode.width,0));
        let fnMoveto = cc.moveTo(5,cc.v2(-cc.winSize.width/2 - this.SurfNode.width,0));

       
        let setActivefalse = function(){
            //cc.log("#####set active false~!!!")
            this.SurfNode.active = false;
        }
        let callback = cc.callFunc(setActivefalse, this);

        //cc.log("PlaySurf 4444444444444444444");
        this.SurfNode.runAction(cc.sequence(fnMoveto, callback));        
        //this.SurfNode.runAction(fnMoveto,callback);        

        //cc.log("PlaySurf end~!!!");
    },    

    start () {

    },

    onKeyDown(event) {

    },

    exitGame() {
        gameStatMgr.SwitchHall();     
    },

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.back:                                            
            case cc.macro.KEY.escape:
                cc.log('event.keyCode',event.keyCode);   
                if (this.bReadyExit) {
                    this.exitGame();
                } else {
                    this.showExitTip();
                }
                                
                break;
        }
    },    
    

    onChangeSceneUpdate(dt)
    {
        if (this.SceneFillAniSpr.fillRange > 0) {
            this.fillani_curTime -= dt;
            if( this.fillani_curTime <= 0) {
                this.fillani_curTime = 0;
                this.SurfNode.active = false;  
                this.bCanPlayEnterAni = true;
                this.SwitchSceneAddtion();
                //this.SceneFillAniSpr.spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
            }

            let percent = this.fillani_curTime/this.fillnai_totalTime;

            let SurfposX = this.SceneFillAniNode.width * percent - this.SceneFillAniNode.width/2;

            this.SurfNode.setPosition(SurfposX,0);

            this.SceneFillAniSpr.fillRange = percent;            
        }
    },

    SwitchSceneAddtion()
    {
        cc.log("111111 SwitchSceneAddtion");
        // for(let i=0;i<this.SceneAddtionItem.length;i++)
        // {            
        //     this.SceneAddtionItem[i].active = false;
        // }

        // let self = this;
        // let sPrefabRes = "scene/Prefab" + this.SceneAddtionItem[this.curSceneImgIndex].sPrefab;
        // cc.log("sPrefabRes:",sPrefabRes);
        
        // cc.loader.loadRes(sPrefabRes, function (err, sceneprefab) {
        //     self.oldSceneFrame = self.newSceneFrame;            
        //     self.newSceneFrame = spriteFrame;
        //     cc.log("self.bImmediatelySwitchSceneFrame",self.bImmediatelySwitchSceneFrame);
        //     if(self.bImmediatelySwitchSceneFrame) {
        //         self.ApplyNewSceneFrame();
        //         self.bImmediatelySwitchSceneFrame = false;
        //     }
        // });         

        // if (this.SceneAddtionItem[this.curSceneImgIndex])
        // {
        //     cc.log("SwitchSceneAddtion22222222",this.bCanPlayEnterAni);

        //     if(this.SceneCtrl[this.curSceneImgIndex].script){
        //         this.SceneCtrl[this.curSceneImgIndex].script.ready()
        //         if(this.bCanPlayEnterAni){                   
        //             cc.log("SwitchSceneAddtion33333333");
        //             this.SceneCtrl[this.curSceneImgIndex].script.EnterScene();
        //         }
        //     }
        // }
        // else
        // {
        //     this.onSceneEnterDone();
        // }    
    },

    RandomPlayBubble()
    {
        let x = Math.random() - 0.5;
        let y = Math.random() - 0.5;
        x *= 0.8;
        y *= 0.6;

        x *= this.node.width;
        y *= this.node.height;

        let pos = cc.v2(x,y);
        //cc.log("play bubble",pos);
        this.InstantiatePrefab(pos,this.BubblePrefab);
    },

    onBubbleUpdate(dt) {
        this.BubbleTimectl += dt;
        if(this.BubbleTimectl > 0.1) {
            this.RandomPlayBubble()
            this.BubbleTimectl = 0;
        }
    },   

    showCommTip(tips)
    {
        this.bReadyExit = true;
        this.commTip.opacity = 255;
        let label = this.commTip.getComponent(cc.Label);
        label.string = tips;

        let callback = function() {
            this.bReadyExit = false;
            let fout = cc.fadeOut(1);
            this.commTip.runAction(fout); // 物體還是在的    
            this.tExitTip = null;    
        }

        this.tExitTip = setTimeout(callback.bind(this),2000);
    },
    
    showExitTip()
    {
        let tips = "两秒内再次点击返回将退出游戏";
        this.showCommTip(tips);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);


        Notification.SendNotify(NoticeDef.StopMusic); 

        if(this.tExitTip)
        {
            //如果有tip计时，要清除掉
            clearTimeout(this.tExitTip);
            this.tExitTip = null;
        }

        Notification.UnRegAll(this);
    },
    

    update (dt) 
    {
        //this.onBubbleUpdate(dt);
        this.CheckSwitchScene();
        this.onChangeSceneUpdate(dt);
    },
});
