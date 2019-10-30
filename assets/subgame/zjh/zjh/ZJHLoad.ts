import gameController = require("./ZJHGameController")
import pbFactory = require("./ZJHPBFactory")
import commonTools = require("./ZJHCommonTool");
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHLoad extends cc.Component {
    
    @property(cc.Prefab)
    toastPrefab:cc.Prefab = null;

    @property(cc.Prefab)
    marqueePrefab:cc.Prefab = null;

    @property(cc.Prefab)
    dialogPrefab:cc.Prefab = null;

    @property(cc.Node)
    persistNode: cc.Node = null;

    onLoad () {
        commonTools.resize();
        this.persistNode.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        cc.game.addPersistRootNode(this.persistNode);//设置常驻节点
        this.savePbs();
        this.loadRes();
    }
    loadRes(){
        let onProgress = function(completedCount,totalCount,item ) {
            // this.labelLoadProgress.string = "Loading:" + completedCount + "/" + totalCount;
            // this.progressBarView.progress = completedCount/totalCount;
            // cc.log("completedCount",completedCount);
            // cc.log("totalCount",totalCount);
            // cc.log("item",item);
        }

        let onLoaded1 = function() {

            let onLoaded2 = function() {
                gameController.Init();
            }
            cc.director.preloadScene('ZJHHall',onLoaded2.bind(this));
        }
        cc.director.preloadScene('ZJHGame',onProgress.bind(this),onLoaded1.bind(this));

    }

    savePbs(){
        pbFactory.savePb("toast",this.toastPrefab);
        pbFactory.savePb("marquee",this.marqueePrefab);
        pbFactory.savePb("dialog",this.dialogPrefab);
    }

    back2Hall(){
        gameController.back();
    }

    start () {

    }

    // update (dt) {}
}
