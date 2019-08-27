// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var bulletManager = require('BulletManager');
var playerManager = require('PlayerManager');
var commTools = require('CommTools');
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');
var resManager = require('ResManager');
var msg_pb = require('msg_pb_by');

const BossFishStartID = 15;

var Em_FishGroup_Type = {
    None:0,
    LineTo:1,
    Circle:2,
    Cross:3,
    GroupMove:4,
    Spiral:5,
}

var FishManager = cc.Class({
    ctor()
    {
        cc.log("this instance of FishManager");
        this.time = 0;
        this.fishList = [];
        this.emFishGroupType = Em_FishGroup_Type.None;
        this.nDrawAbelTime = 0;
        this.fishresList = {};

        this.fishresList[15] = "15_Shark";
        this.fishresList[16] = "16_KillerWhale";
        this.fishresList[17] = "17_HumpBackWhale";
        this.fishresList[18] = "18_King_SpiderCrab";
        this.fishresList[19] = "19_King_AnglerFish_Effect";
        this.fishresList[20] = "20_King_Sturgeon";
        this.fishresList[21] = "21_King_Lacoste";
        this.fishresList[22] = "22_King_JerryFish";
        this.fishresList[23] = "23_King_InkFish";
        this.fishresList[24] = "24_King_Lobster";

        this.listReadyRelease = [];
    },

    getClassName()
    {
        return "FishManager";
    },    

    init(game)
    {
        cc.log("fishmanager init!!!!");
        this.game = game;
        this.FishPools = game.FishPrefab;

        var node = new cc.Node('Sprite');
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = this.sprite;
        this.game.node.addChild(node);

        Notification.Regsiter(NoticeDef.KillFish,this,this.onKillFishFormMsg);
        Notification.Regsiter(NoticeDef.ChangeScene,this,this.onChangeScene);
        Notification.Regsiter(NoticeDef.SpecialFishGroup,this,this.onSpecialFishGroup);
        Notification.Regsiter(NoticeDef.HitInvalid,this,this.ClearValidFish);
        
        
    },

    getFish(id)
    {
        return this.fishList[id];
    },

    genFishTest(Id,index,pos,spemark)
    {
        cc.log("生成一条测试用鱼~！");
        let PrefabFish = this.FishPools[index];        
               
        //cc.log("PrefabFish name:" + PrefabFish.name)


        let newFish = cc.instantiate(PrefabFish);
        cc.log("newFish",newFish);
        //cc.log("newFish name:" + newFish.name)
        this.game.node.addChild(newFish);
        let FishScript = newFish.getComponent("Fish");
        FishScript.setID(Number(Id));
        FishScript.node.setPosition(pos);
        
        //FishScript.startAction();
        FishScript.setGame(this.game);
        FishScript.setSpcialMark(spemark);

        this.fishList[Id] = FishScript;               
    },

    LightningChainTest(fish)
    {
        let fishlist = this.getFishListbyType(fish.fishType);
        //释放闪电打击同类鱼
        fish.LightningSphereBlast(fishlist);         
    },

    ShowAllFishCount(tag)
    {
        let count = 0;
        let descfishlist = "cur fishlist is {";
        for (let i in this.fishList)
        {
            descfishlist += i;
            descfishlist += " ";
            count++;
        }
        descfishlist += "}";

        cc.log(tag);
        cc.log(descfishlist);
        cc.log("all fish count is",count);        
    },

    ClearValidFish(msg)
    {
        let fishID = msg.getFishid();
        cc.log("InValidFish fishID",fishID);
        if(fishID && this.fishList[fishID]) {
            this.fishList[fishID].RushToEnd();
        }
    },

    CreateFish(fishPrefab,Id,index,arrPos,tracktype,liveTime,spcialmark,callback)
    {
        let newFish = cc.instantiate(fishPrefab);

        // cc.log("fishPrefab:",fishPrefab);
        // cc.log("newFish:",newFish);
        // cc.log("newFish name:" + newFish.name);
        // cc.log("1111111111111111111111111111111");
        // cc.log("this.game:",this.game);
        // cc.log("this.game.node:",this.game.node);
        this.game.node.addChild(newFish);
        //cc.log("2222222222222222222222222222222");
        let FishScript = newFish.getComponent("Fish");
        //cc.log("2222222222222222222222222222222333333333");
        FishScript.setID(Id);
        FishScript.setType(index);
        FishScript.setGame(this.game);
        FishScript.setSpcialMark(spcialmark);
        //cc.log("22222222222222222222222222222224444444444444");
        
       
        
        FishScript.setTrack(arrPos,tracktype);
    
        //如果有设生存时间，设置时间后开始运行。有些鱼需要特殊处理，不设时间也不运行
        if (liveTime && liveTime > 0)
        {
            FishScript.SetLiveTime(liveTime);
            FishScript.startAction();            
        }                
        

        //cc.log("3333333333333333333333333333333333333");
        FishScript.enabledHit(this.game.bLockMode);
        this.fishList[Id] = FishScript;
        

        if(callback) {
            //cc.log("444444444444444444444444444");
            callback(FishScript);
        }

        //cc.log("5555555555555555555555555");
        return FishScript;

    },

    genFish(Id,index,arrPos,tracktype,liveTime,spcialmark,callback)
    {
        // cc.log("genFish",Id,index,arrPos,liveTime);
        // if (liveTime == 0)
        // {
        //     let e = new Error('liveTime set to zero');
        //     let stack = e.stack;
        //     cc.log(stack);
        // }
        //cc.log("this function make a fish whose index is "+ index + " on pos:" + pos.x + " " + pos.y);

        //cc.log(arrPos);

        if (Id in this.fishList) {
            cc.log("error,fish id is exsit~",Id);
            //this.fishList[Id].ShowCoord();
            //this.fishList[Id].onPlayDeadEnd();
            //this.fishList[Id].MarkSelf();
            this.fishList[Id].RushToEnd();
        }

        
        if(index >= BossFishStartID) {
            let sPrefab = "hwby/fish/Prefab/" + this.fishresList[index];
            let cbLoad = function(prefab,err) {                
                let fish = this.CreateFish(prefab,Id,index,arrPos,tracktype,liveTime,spcialmark,callback);
                fish.SetRes(sPrefab);
            }
            resManager.LoadRes(sPrefab,cbLoad.bind(this));
        } else {
            let PrefabFish = this.FishPools[index];
            this.CreateFish(PrefabFish,Id,index,arrPos,tracktype,liveTime,spcialmark,callback);
        }
               
        //cc.log("PrefabFish name:" + PrefabFish.name)


        // 为鱼设置一个随机位置
        //newFish.setPosition(pos);   
        //cc.log("this gen fish~!current fish num:",this.fishList.length);
        //this.ShowAllFishCount("Gen fish");
    },

    EnableHitFish(bEnable)
    {
        for (let i in this.fishList)
        {
            this.fishList[i].enabledHit(bEnable)
        }
    },

    onKillFishFormMsg(msg)
    {
        this.onKillFish(msg.getChair(),msg.getFishid(),msg.getScore(),msg.getMultiple(),msg.getBulletid(),msg.getDirectkill());
    },

    getFishListbyType(fishtype)
    {
        let fishlist = new Array();
        for (let i in this.fishList)
        {
            if (this.fishList[i].fishType == fishtype)
            {
                fishlist.push(this.fishList[i]);
            }
        }

        return fishlist;
    },

    onKillFish(charid,fishid,score,multiple,bulletid,dirctekill)
    {
        if(fishid in this.fishList)
        {
            let fish = this.getFish(fishid)
            //cc.log("kill fish gain score:",score);
            fish.onKilled(charid,score,multiple) 
            if(dirctekill && fish.haveLightningMark()) 
            {//如果有闪电球标志，寻找同类鱼，PS.包含自己
                let fishlist = this.getFishListbyType(fish.fishType);
                //释放闪电打击同类鱼
                fish.LightningSphereBlast(fishlist);
            }    
        } else {
            //找不到鱼就直接加钱，否则客户端服务器钱会不一致
            let killer = playerManager.getPlayer(charid)
            killer.onScoreChange(score);
        }
        
        bulletManager.DelBullet(bulletid)
    },

    DelFish(fish)
    {
        this.ReleseFishRes(fish.sRes);
        delete this.fishList[fish.ID];
        //this.ShowAllFishCount("Del fish,its id is " + fish.ID);
        //cc.log("this delelet fish~!current fish num:",this.fishList.length);
    },

    ReleseFishRes(sRes) 
    {
        if(this.eSceneState == msg_pb.EmRoomRunState.EMRS_NORMAL) {
            resManager.Release(sRes);
        } else {
            //如果是特殊场景，在切换场景时一起释放
            this.listReadyRelease.push(sRes);            
        }
    },

    onChangeScene(msg)
    {
        cc.log("fish manager changescene~!!!",msg.getState());
        this.eSceneState = msg.getState();
        this.AllFishRushToEnd();

        //释放准备释放资源
        for(let i in this.listReadyRelease) {
            let sRes = this.listReadyRelease[i];
            resManager.Release(sRes);
        }

        this.listReadyRelease = [];
    },

    onSpecialFishGroup(msg)
    {
        this.StartSpeicalFishGroup(msg.getGrouptype(),msg.getInfoList(),msg.getUpara(),msg.getNpara());
    },

    AllFishRushToEnd()
    {
        //鱼阵结束~
        this.arrFishGroupInfoByType = null;
        this.emFishGroupType = Em_FishGroup_Type.None;

        let count = 0;
        for (let i in this.fishList)
        {
            this.fishList[i].RushToEnd()
            count++;
        }
        cc.log("this is set allfish rushtoend,count is",count);
    },

    GenCrossFish4(fishtype)
    {
        //cc.log("fishmanager",this);
        //cc.log("this.FGPosData",this.FGPosData)
        this.GenCrossFish(fishtype,this.FGPosData.line1[0],this.FGPosData.line1[1]);
        this.GenCrossFish(fishtype,this.FGPosData.line1[1],this.FGPosData.line1[0]);
        this.GenCrossFish(fishtype,this.FGPosData.line2[1],this.FGPosData.line2[0]);
        this.GenCrossFish(fishtype,this.FGPosData.line2[0],this.FGPosData.line2[1]);        
    },

    GenCrossFish(fishtype,startpos,endpos)
    {
        //cc.log("this.arrFishGroupInfoByType[fishtype].length",this.arrFishGroupInfoByType[fishtype].length);
        //cc.log("this.arrFishGroupInfoByType",this.arrFishGroupInfoByType)
        if (this.arrFishGroupInfoByType[fishtype].length > 0 )
        {
            let fishupId = this.arrFishGroupInfoByType[fishtype].pop();    
        
            let arrPos = new Array();
            arrPos.push(cc.v2(startpos.x,startpos.y));
            arrPos.push(cc.v2(endpos.x,endpos.y));
            this.genFish(fishupId,fishtype,commTools.covertTrackCoord(arrPos),0,20);          
        }        
    },

    GenPairFish(fishtype,lineupidx,linedownidx)
    {   
        //cc.log("this.arrFishGroupInfoByType[fishtype].length",this.arrFishGroupInfoByType[fishtype].length);
        if (this.arrFishGroupInfoByType[fishtype].length > 0 )
        {
            let fishupId = this.arrFishGroupInfoByType[fishtype].pop();    
        
            let posUpStart = cc.v2(this.FGPosData.startx,this.FGPosData.arrPosY[lineupidx]);
            let posUpEnd = cc.v2(this.FGPosData.endx,this.FGPosData.arrPosY[lineupidx]);
            let arrUpPos = new Array();
            arrUpPos.push(posUpStart);
            arrUpPos.push(posUpEnd);
            this.genFish(fishupId,fishtype,commTools.covertTrackCoord(arrUpPos),0,20);

            if (lineupidx != linedownidx)
            {
                if (this.arrFishGroupInfoByType[fishtype].length > 0)
                {
                    let fishdownId = this.arrFishGroupInfoByType[fishtype].pop();
                    let posDownStart = cc.v2(this.FGPosData.startx,this.FGPosData.arrPosY[linedownidx]);
                    let posDownEnd = cc.v2(this.FGPosData.endx,this.FGPosData.arrPosY[linedownidx]); 
                    let arrDownPos = new Array();    
                    arrDownPos.push(posDownStart);
                    arrDownPos.push(posDownEnd);   
                    this.genFish(fishdownId,fishtype,commTools.covertTrackCoord(arrDownPos),0,20);
                }
            }            
        }
    },

    GenFishForSpiral(fishtype,track)
    {
        if (this.arrFishGroupInfoByType[fishtype].length > 0)
        {
            let fishid = this.arrFishGroupInfoByType[fishtype].pop();
            let callback = function(fish) {
                fish.SetTimePerstep(0.25);
                fish.SetDircteRotation(true);
                fish.startAction();                                
            }
            this.genFish(fishid,fishtype,track,0,0,null,callback);
        }
    },

    GenFishForCricle(fishtype,track)
    {
        if (this.arrFishGroupInfoByType[fishtype].length > 0)
        {
            let fishid = this.arrFishGroupInfoByType[fishtype].pop();
            let callback = function(fish) {
                fish.SetTimePerstep(2);
                fish.SetDircteRotation(true);
                fish.SetCirclestep(1,-1,4,0.1);
                fish.startAction();                                
            }
            this.genFish(fishid,fishtype,track,0,0,null,callback);
        }
    },

    onTickForCircleFishGroup(dt)
    {
        this.FishGroupTimeContorl.uTotalTime += dt;
        this.FishGroupTimeContorl.smallfishtime += dt;
        this.FishGroupTimeContorl.middlefishtime += dt;
        this.FishGroupTimeContorl.largefishtime += dt;

        //cc.log("TotalTime",this.FishGroupTimeContorl.uTotalTime);
        //this.uLTFTickCount++;
        for( let fishtype in this.arrFishGroupInfoByType){
            //cc.log("fish type:",fishtype,typeof(fishtype));
            switch(Number(fishtype)) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:  
                case 5:
                case 6:                                              
                    if(this.FishGroupTimeContorl.smallfishtime > this.FishGroupTimeContorl.smallfishinterval)
                    {
                        this.FishGroupTimeContorl.smallfishtime = 0;
                        //this.GenFishForCricle(fishtype,this.FGPosData.trackFromDown);
                        this.GenFishForCricle(fishtype,this.FGPosData.trackFromUp);
                    }                
                    break;
    
                case 7:
                case 8:
                case 9:
                case 10:  
                case 11:
                case 12:                 
                case 13:
                case 14:                                
                    if(this.FishGroupTimeContorl.middlefishtime > this.FishGroupTimeContorl.middlefishinterval)
                    {
                        this.FishGroupTimeContorl.middlefishtime = 0;
                        //this.GenFishForCricle(fishtype,this.FGPosData.trackFromUp);
                        this.GenFishForCricle(fishtype,this.FGPosData.trackFromDown);
                    }                
                    break;                              
                default:
                    cc.log("don't identify fish type");                
            }
        }
    },

    onTickForSpiralFishGroup(dt)
    {
        this.FishGroupTimeContorl.uTotalTime += dt;
        this.FishGroupTimeContorl.smallfishtime += dt;
        this.FishGroupTimeContorl.middlefishtime += dt;
        this.FishGroupTimeContorl.largefishtime += dt;

        //cc.log("TotalTime",this.FishGroupTimeContorl.uTotalTime);
        //this.uLTFTickCount++;
        for( let fishtype in this.arrFishGroupInfoByType){
            //cc.log("fish type:",fishtype,typeof(fishtype));
            switch(Number(fishtype)) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:  
                case 5:
                case 6:                                              
                    if(this.FishGroupTimeContorl.smallfishtime > this.FishGroupTimeContorl.smallfishinterval)
                    {
                        this.FishGroupTimeContorl.smallfishtime = 0;
                        //this.GenFishForCricle(fishtype,this.FGPosData.trackFromDown);
                        this.GenFishForSpiral(fishtype,this.FGPosData.arrSpiralPos1);
                        this.GenFishForSpiral(fishtype,this.FGPosData.arrSpiralPos2);
                    }                
                    break;
    
                case 7:
                case 8:
                case 9:
                case 10:  
                case 11:
                case 12:                 
                case 13:
                case 14:                                
                    if(this.FishGroupTimeContorl.middlefishtime > this.FishGroupTimeContorl.middlefishinterval)
                    {
                        this.FishGroupTimeContorl.smallfishtime = 0;
                        this.FishGroupTimeContorl.middlefishtime = 0;
                        
                        //this.GenFishForCricle(fishtype,this.FGPosData.trackFromUp);
                        this.GenFishForSpiral(fishtype,this.FGPosData.arrSpiralPos1);
                        this.GenFishForSpiral(fishtype,this.FGPosData.arrSpiralPos2);
                    }                
                    break;                              
                default:
                    cc.log("don't identify fish type");                
            }
        }
    },

    onTickForLinetoFishGroup(dt)
    {
        //cc.log("dt",dt);
        this.FishGroupTimeContorl.uTotalTime += dt;
        this.FishGroupTimeContorl.smallfishtime += dt;
        this.FishGroupTimeContorl.middlefishtime += dt;
        this.FishGroupTimeContorl.largefishtime += dt;
        this.FishGroupTimeContorl.bossfishtime += dt;


        //cc.log("TotalTime",this.FishGroupTimeContorl.uTotalTime);
        //this.uLTFTickCount++;
        for( let fishtype in this.arrFishGroupInfoByType){
            //cc.log("fish type:",fishtype,typeof(fishtype));
            switch(Number(fishtype)) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:                                
                case 5:  
                case 6:  
                    if(this.FishGroupTimeContorl.smallfishtime > this.FishGroupTimeContorl.smallfishinterval)
                    {
                        this.FishGroupTimeContorl.smallfishtime = 0;
                        this.GenPairFish(fishtype,0,4);
                    }                
                    break;  
                case 7:
                case 8:
                case 9:
                case 10:  
                case 11:
                case 12:                 
                case 13:                           
                    if(this.FishGroupTimeContorl.middlefishtime > this.FishGroupTimeContorl.middlefishinterval)
                    {
                        this.FishGroupTimeContorl.middlefishtime = 0;
                        this.GenPairFish(fishtype,1,3);
                    }                
                    break;  
                case 14:                      
                case 15:                             
                case 16:
                case 17:
                    if(this.FishGroupTimeContorl.largefishtime > this.FishGroupTimeContorl.largefishinterval)
                    {
                        this.FishGroupTimeContorl.largefishtime = 0;
                        this.GenPairFish(fishtype,2,2);
                    }  
                    break;
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:     
                case 24:    
                    if(this.FishGroupTimeContorl.bossfishtime > this.FishGroupTimeContorl.bossfishinterval)
                    {
                        this.FishGroupTimeContorl.bossfishtime = 0;
                        this.FishGroupTimeContorl.largefishtime = 0;
                        this.GenPairFish(fishtype,2,2);
                    }  
                    break;                                       
                default:
                    cc.log("don't identify fish type");                
            }
        }
    },

    onTickForCrossFishGroup(dt)
    {
        this.FishGroupTimeContorl.largefishtime += dt;
        this.FishGroupTimeContorl.bossfishtime += dt;

        for( let fishtype in this.arrFishGroupInfoByType){
            //cc.log("fish type:",fishtype,typeof(fishtype));
            switch(Number(fishtype)) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:                                
                case 5:  
                case 6:  
                    //没有小型鱼~！！！           
                    break;  
                case 7:
                case 8:
                case 9:
                case 10:  
                case 11:
                case 12:                 
                case 13:                           
                    //没有中型鱼~！！！               
                    break;  
                case 14:                      
                case 15:                             
                case 16:
                case 17:
                    if(this.FishGroupTimeContorl.largefishtime > this.FishGroupTimeContorl.largefishinterval)
                    {
                        this.FishGroupTimeContorl.largefishtime = 0;
                        this.GenCrossFish4(fishtype);
                    }  
                    break;
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:     
                case 24:    
                    if(this.FishGroupTimeContorl.bossfishtime > this.FishGroupTimeContorl.bossfishinterval)
                    {
                        this.FishGroupTimeContorl.bossfishtime = 0;
                        this.FishGroupTimeContorl.largefishtime = 0;
                        this.GenCrossFish4(fishtype);
                    }  
                    break;                                       
                default:
                    cc.log("don't identify fish type");                
            }
        }        
    },

    ProcessFishGroupInfo(infolist)
    {
        //cc.log("StartLineToFishGroup~!!!");
        //生成鱼阵信息，表示每帧生成哪些鱼
        let arrFishGroupInfo = [];
        for (let i=0;i<infolist.length;i++) {
            //cc.log("infolist[i].getFishtype:",infolist[i].getFishtype());
            for(let id = infolist[i].getStartid();id <= infolist[i].getEndid();id++) {
                arrFishGroupInfo[id] = {};               
                arrFishGroupInfo[id].fishtype = infolist[i].getFishtype();
            }
        }

        //保存在鱼群管理器上，每帧处理一些鱼，首先要按类型分开。
        //cc.log("StartLineToFishGroup~111111111111111");
        this.arrFishGroupInfoByType = [];
        for (let id in arrFishGroupInfo) {
            let fishtype = arrFishGroupInfo[id].fishtype
            if (!( fishtype in this.arrFishGroupInfoByType)) {
                this.arrFishGroupInfoByType[fishtype] = new Array();
            }

            //服务器传过来的相当于是索引，要转换为ID要加一
            //详见服务器代码 = =~！
            //cc.log("Number(id) + 1",Number(id) + 1)
            this.arrFishGroupInfoByType[fishtype].push(Number(id) + 1);  
        }

        // for(let type in this.arrFishGroupInfoByType) {
        //     cc.log("this.arrFishGroupInfoByType length",type,this.arrFishGroupInfoByType[type].length);
        // }

        this.FishGroupTimeContorl = {};
        this.FishGroupTimeContorl.uTotalTime = 0;

        this.FishGroupTimeContorl.smallfishtime = 0;
        this.FishGroupTimeContorl.middlefishtime = 0;
        this.FishGroupTimeContorl.largefishtime = 0;
        this.FishGroupTimeContorl.bossfishtime = 0;

        //鱼阵的坐标信息,每个鱼阵不同
        this.FGPosData = {}        
    },

    StartLineToFishGroup(infolist,uPara,nPara)
    {

        //分装鱼群~~
        this.ProcessFishGroupInfo(infolist);

        //小鱼1秒生成一次
        this.FishGroupTimeContorl.smallfishinterval = 1;
        //中型鱼1.5秒生成一次
        this.FishGroupTimeContorl.middlefishinterval = 1.5;
        //大型鱼3秒生成一只
        this.FishGroupTimeContorl.largefishinterval = 3;  
        //BOSS鱼10秒生成一只   
        this.FishGroupTimeContorl.bossfishinterval = 10;     

        //开始横行鱼阵...
        //this.bLineToFishGroup = true;

        //起止X点。。
        if (uPara == 0) {
            this.FGPosData.startx = -0.8;
            this.FGPosData.endx = 0.8;    
        } else {
            this.FGPosData.startx = 0.8;
            this.FGPosData.endx = -0.8;    
        }

        //Y阵列坐标，鱼阵有几行，数组就多大
        this.FGPosData.arrPosY = [0.25,0.15,0,-0.15,-0.25];
        
    },

    StartSpiralFishGroup(infolist,uPara,nPara)
    {
        //分装鱼群~~
        this.ProcessFishGroupInfo(infolist);
        this.FishGroupTimeContorl.smallfishinterval = 0.2;
        this.FishGroupTimeContorl.middlefishinterval = 0.6;    
        
        let v = 10;
        let w = 6;
        this.FGPosData.arrSpiralPos1 = new Array();
        for(let t=0;t<60;t++)
        {
            let x = (v*t) * Math.cos(w*t);
            let y = (v*t) * Math.sin(w*t);
            this.FGPosData.arrSpiralPos1.push(cc.v2(x,y));
        }   
        
        this.FGPosData.arrSpiralPos2 = new Array();
        for(let t=0;t> -60;t--)
        {
            let x = (v*t) * Math.cos(w*t);
            let y = (v*t) * Math.sin(w*t);
            this.FGPosData.arrSpiralPos2.push(cc.v2(x,y));
        }         
    },

    StartCircleFishGroup(infolist,uPara,nPara)
    {
        //分装鱼群~~
        this.ProcessFishGroupInfo(infolist);

        
        this.FishGroupTimeContorl.smallfishinterval = 0.2;
        
        this.FishGroupTimeContorl.middlefishinterval = 1;
       
        
        //先考虑圆的位置，(0,0)为圆心，半径为0.4
        //上面出鱼的进出点是圆正上切线的屏幕两端(0.8,0.4)，(-0.8,0.4)
        //下面出鱼的进出点是圆的下线切线(0.8,-0.4),(-0.8,0.4)
        let xr = 0.8 * cc.winSize.width;
        let xl = -xr; 
        let yu = 0.4 * cc.winSize.height;
        let yd = -yu;

        let posUpR = cc.v2(xr ,yu);
        let posUpL = cc.v2(xl ,yu);
        let posDownL = cc.v2(xl,yd);
        let posDownR = cc.v2(xr,yd);

        //以原心为中心取32个点，绕圆一周，半径以较短的屏幕高的0.4倍计
        let radius = 0.4 * cc.winSize.height;
        let arrCricyPos = new Array();
        for(let i=0;i<32;i++)
        {
            let radian = Math.PI/16 * i;// 2*PI/32 = PI/16
            let x = radius * Math.cos(radian);
            let y = radius * Math.sin(radian);
            arrCricyPos.push(cc.v2(x,y));
        }

        this.FGPosData.trackFromUp = new Array();

        //先添加屏幕上方的起始点。。
        this.FGPosData.trackFromUp.push(posUpR);

        //添加从90度方向开始的24点。
        for(let i=8;i<32;i++)
        {
            this.FGPosData.trackFromUp.push(arrCricyPos[i]);
        }

        //再添加从0度到90到的8个点。。
        for(let i=0;i<8;i++)
        {
            this.FGPosData.trackFromUp.push(arrCricyPos[i]);
        }

        //最后添加离开时屏幕下方的点。。
        this.FGPosData.trackFromUp.push(posUpL);

        //内圈，半径从0.4缩小成0.3
        radius = 0.3 * cc.winSize.height;
        arrCricyPos = new Array();
        for(let i=0;i<32;i++)
        {
            let radian = Math.PI/16 * i;// 2*PI/32 = PI/16
            let x = radius * Math.cos(radian);
            let y = radius * Math.sin(radian);
            arrCricyPos.push(cc.v2(x,y));
        } 

        this.FGPosData.trackFromDown = new Array();
        this.FGPosData.trackFromDown.push(posDownL);

        //先从负90度方向添加到0度方向
        for(let i=24;i<32;i++)
        {
            this.FGPosData.trackFromDown.push(arrCricyPos[i]);
        }

        //再从0度方向添加到270度方向
        for(let i=0;i<24;i++)
        {
            this.FGPosData.trackFromDown.push(arrCricyPos[i]);
        }

        this.FGPosData.trackFromDown.push(posDownR);

        //this.StartGenBossForCircle();
    },

    StartCrossFishGroup(infolist,uPara,nPara)
    {
        this.ProcessFishGroupInfo(infolist);
        //大型鱼3秒生成一只
        this.FishGroupTimeContorl.largefishinterval = 3;  
        //BOSS鱼10秒生成一只   
        this.FishGroupTimeContorl.bossfishinterval = 9;     

        this.FGPosData.line1 = [cc.v2(-0.8,0.8),cc.v2(0.8,-0.8)];
        this.FGPosData.line2 = [cc.v2(0.8,0.8),cc.v2(-0.8,-0.8)];
    },

    //生成定点移动的鱼，传入的是中心点，加减X平移量得到平行移动起止点。
    //也考虑添加减Y轴偏移纵向移动
    GenFishMove(fishtype,pos) 
    {
        if (this.arrFishGroupInfoByType[fishtype].length > 0 )
        {
            let fishupId = this.arrFishGroupInfoByType[fishtype].pop();    
        
            let arrPos = new Array();
            arrPos.push(cc.v2(pos.x - 0.8,pos.y));
            arrPos.push(cc.v2(pos.x + 0.8,pos.y));
            //用50秒走完
            this.genFish(fishupId,fishtype,commTools.covertTrackCoord(arrPos),0,50);          
        }  
        
        if (this.arrFishGroupInfoByType[fishtype].length > 0 )
        {
            let fishupId = this.arrFishGroupInfoByType[fishtype].pop();    
        
            let arrPos = new Array();
            arrPos.push(cc.v2(pos.x + 0.8,pos.y));
            arrPos.push(cc.v2(pos.x - 0.8,pos.y));
            //用50秒走完
            this.genFish(fishupId,fishtype,commTools.covertTrackCoord(arrPos),0,50);          
        }         
    },

    StartMoveFishGroup(infolist,uPara,nPara)
    {
        this.ProcessFishGroupInfo(infolist);

        
        let radius = 0.3;
        let arrBigCricy = new Array();
        let arrSmallCricy = new Array();
        let centerpos = cc.v2(0,0);

        //圆中心取一个点
        //arrCricyPos.push(cc.v2(0,0));

        //先来画一个大圆
        let stepnum = 32;
        for(let i=0;i<stepnum;i++)
        {
            let radian = 2 * Math.PI/stepnum * i;// 2*PI/32 = PI/16
            let x = radius * Math.cos(radian);
            let y = radius * Math.sin(radian);
            arrBigCricy.push(cc.v2(x,y));
        }

        

        //再来画四个小圆
        let scenter = [cc.v2(1,1),cc.v2(-1,1),cc.v2(1,-1),cc.v2(-1,-1)];
        //arrCricyPos.push(cc.v2(0,0));  

        stepnum = 16;
        for(let idx = 0;idx<4;idx++) {
            let sradius = 0.1;
            for(let i=0;i<stepnum;i++) {
                let radian = 2 * Math.PI/stepnum * i;// 2*PI/32 = PI/16
                let x = sradius * Math.cos(radian) + sradius * scenter[idx].x;
                let y = sradius * Math.sin(radian) + sradius * scenter[idx].y;
                arrSmallCricy.push(cc.v2(x,y));
            }               
        }

        for( let fishtype in this.arrFishGroupInfoByType){
            cc.log("groupmove fishtype",fishtype);
            switch(Number(fishtype)) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:                                
                case 5:  
                case 6:  
                    //小型鱼~！！！    
                    for(let i =0;i<arrSmallCricy.length;i++) {
                        this.GenFishMove(fishtype,arrSmallCricy[i]);
                    }       
                    break;  
                case 7:
                case 8:
                case 9:
                case 10:  
                case 11:
                case 12:                 
                case 13:                           
                    //中型鱼~！！！  
                    for(let i =0;i<arrBigCricy.length;i++) {
                        this.GenFishMove(fishtype,arrBigCricy[i]);
                    }                                    
                    break;  
                case 14:                      
                case 15:                             
                case 16:
                case 17:
                    //大型鱼
                    break;
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:     
                case 24:   
                    //BOSS 
                    this.GenFishMove(fishtype,centerpos);
                    break;                                       
                default:
                    cc.log("don't identify fish type",fishtype);  
            }
        }
    },
        
    StartGenBossForCircle()
    {
        for( let fishtype in this.arrFishGroupInfoByType){
            if(fishtype >=18 && fishtype <= 24) {
                if (this.arrFishGroupInfoByType[fishtype].length > 0 )
                {
                    let track = new Array();
                    track.push(cc.v2(0,0));                
                    let fishId = this.arrFishGroupInfoByType[fishtype].pop();  
                    let callback = function(fish) {
                        fish.ScaleIn(1);
                    }
                    this.genFish(fishId,fishtype,track,0,0,null,callback);                    
                }                                
            }
        }        
    },

    StartSpeicalFishGroup(fgtype,infolist,uPara,nPara)
    {
        this.emFishGroupType = fgtype;
        cc.log("StartSpeicalFishGroup~~~start~!!!",fgtype,typeof(fgtype))
        switch(this.emFishGroupType)
        {
            case Em_FishGroup_Type.LineTo:
                this.StartLineToFishGroup(infolist,uPara,nPara);
                break;
            case Em_FishGroup_Type.Circle:
                //cc.log("旋转鱼阵~~！！！");
                this.StartCircleFishGroup(infolist,uPara,nPara);
                //this.StartLineToFishGroup(infolist);
                break;
            case Em_FishGroup_Type.Cross:
                this.StartCrossFishGroup(infolist,uPara,nPara);
                break;
            case Em_FishGroup_Type.GroupMove:
                this.StartMoveFishGroup(infolist,uPara,nPara);
                break;
            case Em_FishGroup_Type.Spiral:
                this.StartSpiralFishGroup(infolist,uPara,nPara);
                break;
            default:
                cc.log("don't identify fish group type",fgtype);
        }

        cc.log("StartSpeicalFishGroup~~~end~!!!")
    },

    onExitGame()
    {
        this.ClearAllfish();
        Notification.UnRegAll(this);
    },

    ClearAllfish()
    {
        this.fishList = [];
        this.emFishGroupType = Em_FishGroup_Type.None;
        this.arrFishGroupInfoByType = [];
    },

    update (dt)
    {
        //cc.log("fishmanager update")
        switch(this.emFishGroupType)
        {
            case Em_FishGroup_Type.None:
                break;
            case Em_FishGroup_Type.LineTo:
                this.onTickForLinetoFishGroup(dt);
                break;
            case Em_FishGroup_Type.Circle:
                //cc.log("旋转鱼阵~~！！！");
                this.onTickForCircleFishGroup(dt);
                //this.StartLineToFishGroup(infolist);
                break;
            case Em_FishGroup_Type.Cross:
                this.onTickForCrossFishGroup(dt);
                break;
            case Em_FishGroup_Type.GroupMove:
                break;
            case Em_FishGroup_Type.Spiral:
                this.onTickForSpiralFishGroup(dt);
                break;
            default:
                cc.log("don't identify fish group type",this.emFishGroupType);
        }

        
        // this.nDrawAbelTime += dt;
        // if(this.nDrawAbelTime > 1) {
        //     let graphics = this.game.node.getComponent(cc.Graphics);
        //     graphics.clear();
                    
        //     for(let fishid in this.fishList)
        //     {
        //         this.fishList[fishid].DrawDebugLine();       
        //     } 
            
        //     this.nDrawAbelTime  = 0;
        // }
      
    },
});


module.exports = new FishManager();
