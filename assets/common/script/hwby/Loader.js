// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var gameStatMgr = require('GameStateMgr');
var commTools = require('CommTools');
var debugManager = require('DebugManager');
var BaseDef = require('BaseDef');

cc.Class({
    extends: cc.Component,

    properties: {
        //通用弹出消息框
        MessageboxPrefab:
        {
            default:null,
            type:cc.Prefab
        }, 
        
        WaitLayerAniPrefab:
        {
            default:null,
            type:cc.Prefab            
        },

        DebugPanelPrefab:
        {
            default:null,
            type:cc.Prefab                 
        },

        LoadImg:{ //加载背景

            default:[],
            type:[cc.SpriteFrame]
        },     
        
        BGSprite: {
            type:cc.Sprite,
            default:null,
        },        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("Loader onLoad~!!!");
        gameStatMgr.setCurSceneRootNode(this.node);
        commTools.setMessageboxPrefab(this.MessageboxPrefab);
        commTools.setWaitLayerPrefab(this.WaitLayerAniPrefab);
        debugManager.setDebugPanelPrefab(this.DebugPanelPrefab);

        let loadimg = this.LoadImg[BaseDef.eCurPlatform];
        if(loadimg) {
            this.BGSprite.spriteFrame = loadimg;
        }

    },

    start () {
        //debugManager.PopDebugPanel(this.node);
        debugManager.DebugInfo("进入捕鱼Loading~！start!");
        let cbInit = function() {
            cc.log("gameStatMgr init~~~!!!");
            debugManager.DebugInfo("gameStatMgr init~~~!!!");
            
            gameStatMgr.Init();
        }
        
        cc.director.preloadScene(gameStatMgr.getHallName(),cbInit);   
        debugManager.DebugInfo("进入捕鱼Loading~！end!");    
    },

    // HttpTest() {
    //     var xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
    //             var response = xhr.responseText;
    //             console.log(response);
    //         }
    //     };
    //     xhr.open("GET", "http://swoole.0717996.com/Token/getToken?dev_key=4362265&dev_name=海王捕鱼", true);
    //     xhr.send();        
    // }

    // update (dt) {},
});
