import payDailyActivity from "./payDailyActivity"
import gHandler = require("../../../../../common/script/common/gHandler") 
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    goldLabel: cc.Label = null; // 金币数量 , X3

    @property(cc.Label)
    targetLabel: cc.Label = null; // 目标

    @property(cc.Label)
    rewardLabel: cc.Label = null; // 奖励

    @property(cc.Label)
    progressLabel: cc.Label = null; // 完成进度

    @property(cc.Node)
    lingquBtn: cc.Node = null; // 领取按钮

    @property(cc.Node)
    lingquDoneBtn: cc.Node = null; // 领取完成

    @property(cc.Node)
    goToBtn: cc.Node = null; // 前往按钮

    payDailyCompoment :payDailyActivity = null
    key = ''
    data = null
    task_id = 0
    onLoad () {
        this.goldLabel.string = `x${this.data.gold}`
        this.rewardLabel.string = `奖励: ${this.data.gold}金币, ${this.data.integral}积分`
        switch (this.key){
            case "game" :
                var gameName = this.switchGameId(this.data.game_id)
                if(this.data.rounds){
                    this.targetLabel.string = `完成${this.data.rounds}局${gameName}`
                }else if(this.data.winround){
                    this.targetLabel.string = `${gameName}获胜${this.data.winround}局`
                }
                break
            case "proxy" :
                this.targetLabel.string = `发展下级完成首充${this.data.children_firstpay_num}人`
                break
            case "recharge" :
                if(this.data.recharge_num){
                    this.targetLabel.string = `今日充值${this.data.recharge_num}次`
                }else if(this.data.recharge_amount){
                    this.targetLabel.string = `今日充值${this.data.recharge_amount}金币`
                }
                break
        }
    }
    init(key,data){
        this.key = `${key}`
        this.data = data
        this.task_id = data.task_id
    }
    setDetail(Detail,payDailyCompoment){
        this.payDailyCompoment = payDailyCompoment
        let isReceive = false
        if(Detail.receive_task_id.indexOf(`${this.task_id}`) != -1) {
            //数组里存在，则表示已领取
            isReceive = true
        }
        switch (this.key){
            case "game" :
                let GameData =  Detail["game"][this.data.game_id]
                if(!GameData) break
                if(this.data.rounds){
                    this.progressLabel.string = `${GameData.totalrounds > this.data.rounds ?this.data.rounds:GameData.totalrounds}/${this.data.rounds}`
                    if(GameData.totalrounds >= this.data.rounds){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }else if(this.data.winround){
                    this.progressLabel.string = `${GameData.winround > this.data.winround ?this.data.winround:GameData.winround}/${this.data.winround}`
                    if(GameData.winround >= this.data.winround){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }
                break
            case "proxy" :
                this.progressLabel.string = `${Detail.children_firstpay_num > this.data.children_firstpay_num ? this.data.children_firstpay_num :Detail.children_firstpay_num}/${this.data.children_firstpay_num}`
                if(Detail.children_firstpay_num >= this.data.children_firstpay_num){
                    if(!isReceive){
                        this.switchBtn("lingquBtn")
                    }else{
                        this.switchBtn("lingquDoneBtn")
                    }
                }else{
                    this.switchBtn("goToBtn")
                }
                break
            case "recharge" :
                if(this.data.recharge_num){
                    this.progressLabel.string = `${Detail.recharge_num > this.data.recharge_num ? this.data.recharge_num: Detail.recharge_num}/${this.data.recharge_num}`
                    if(Detail.recharge_num >= this.data.recharge_num){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }else if(this.data.recharge_amount){
                    this.progressLabel.string = `${Detail.recharge_amount > this.data.recharge_amount ? this.data.recharge_amount :Detail.recharge_amount}/${this.data.recharge_amount}`
                    if(Detail.recharge_amount >= this.data.recharge_amount){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }
                break
        }
    }
    switchGameId(Gameid){
        switch(Gameid) {
            case "5b1f3a3cb76a591e7f251715" :
                return "炸金花"
            case "5b1f3a3cb76a591e7f251711" :
                return "斗地主"
            default :
                return ""
        }
    }
    switchBtn(btnName){
        this.lingquBtn.active = false
        this.lingquDoneBtn.active = false
        this.goToBtn.active = false
        if(btnName == 'lingquBtn'){
            this.lingquBtn.active = true
        }else if (btnName =="lingquDoneBtn") {
            this.lingquDoneBtn.active = true
        }else if (btnName =="goToBtn") {
            this.goToBtn.active = true
        }
    }
    linquBtnClick(){
        this.lingquBtn.getComponent(cc.Button).interactable = false
        let self = this;
        this.payDailyCompoment.fetchGetTask(this.key,this.task_id,()=>{
            self.lingquBtn.getComponent(cc.Button).interactable = true
        })
    }
    //点击前往
    goToBtnClick(){
         switch (this.key){
            case "game" :
                var gameName = this.switchGameId(this.data.game_id)
                if(gameName == "炸金花"){
                    this.checkSubGameDownload("zjh")
                }else if(gameName == "斗地主"){
                    this.checkSubGameDownload("ddz")
                }
                break
            case "proxy" :
                cc.director.loadScene(gHandler.gameConfig.subModel["proxy"].lanchscene);
                break
            case "recharge" :
            cc.director.loadScene(gHandler.gameConfig.subModel["pay"].lanchscene);
                break
        }
    }
    /** 根据id获取服务器子游戏信息 */
    getRemoteSubgame(game_id) {
        if (!gHandler.appGlobal || !gHandler.appGlobal.remoteGamelist) {
            return
        }
        let remotedata = gHandler.appGlobal.remoteGamelist[0];
        for (let i = 0; i < gHandler.appGlobal.remoteGamelist.length; i++) {
            if (game_id === gHandler.appGlobal.remoteGamelist[i].game_id) {
                remotedata = gHandler.appGlobal.remoteGamelist[i];
                break;
            }
        }
        return remotedata;
    }
    /** 判断子游戏是否下载更新等 */
    checkSubGameDownload(enname) {
        let subdata = this.getRemoteSubgame(gHandler.gameConfig.gamelist[enname].game_id)
        cc.log(enname)
        cc.log("gHandler.gameConfig.gamelist",gHandler.gameConfig.gamelist)
        if (subdata.open == 0) {
            cc.log(" | subgame : " + enname + " subdata.open 等于0");
            gHandler.gameConfig.gamelist[enname].isDown = false
        } else {
            let subgamev;
            let localsubv = gHandler.localStorage.get(enname, "versionKey");
            if (enname == 'zrsx1' || enname == 'zrsx2') {
                localsubv = gHandler.localStorage.get('zrsx', "versionKey");
                subgamev = gHandler.appGlobal.subGameVersion['zrsx'];
            } else {
                subgamev = gHandler.appGlobal.subGameVersion[enname];
            }
            let needup = false
            cc.log("活动前往子游戏","subgamev",subgamev,"localsubv",localsubv)
            if (!localsubv) {
                needup = true;
            } else {
                let vA = subgamev.split('.');
                let vB = localsubv.split('.');
                for (let i = 0; i < vA.length; ++i) {
                    let a = parseInt(vA[i]);
                    let b = parseInt(vB[i] || 0);
                    if (a != b) {
                        needup = true;
                        break;
                    }
                }
                if (vB.length != vA.length) {
                    needup = true;
                }
            }
            let self = this
            if (needup && !cc.sys.isBrowser) {
                cc.log(" | subgame : " + enname + " need update");
                self.payDailyCompoment.app.showAlert("游戏需要更新!请返回大厅更新");
                gHandler.gameConfig.gamelist[enname].isDown = false
            } else {
                cc.log(" | subgame : " + enname + " not need update")
                gHandler.gameConfig.gamelist[enname].isDown = true
                let subgamern = enname
                if (gHandler.appGlobal.isRelease) {
                    !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                        if (err) {
                            cc.log(err)
                            return self.payDailyCompoment.app.showAlert("加载游戏失败！请返回大厅进入！");
                        }
                        cc.director.loadScene(gHandler.gameConfig.gamelist[subgamern].lanchscene);
                        // console.log('load subpackage script successfully.', subgamern);
                    });
                }else{
                    cc.director.loadScene(gHandler.gameConfig.gamelist[subgamern].lanchscene);
                }
            }
        }
    }
}
