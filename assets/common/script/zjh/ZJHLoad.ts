import gameController = require("./ZJHGameController")
import pbFactory = require("./ZJHPBFactory")
import Desk = require("./ZJHDesk");
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHLoad extends cc.Component {
    
    @property(cc.Prefab)
    toastPrefab:cc.Prefab = null;

    @property(cc.Prefab)
    marqueePrefab:cc.Prefab = null;

    @property(cc.Label)
    uiserId:cc.Label = null;

    onLoad () {
        this.savePbs();
        // cc.director.loadScene('ZJHGame');
        // let onLoaded = function() {
        //     cc.log("game onLoaded~!!");
        //     gameController.Init(Number(this.uiserId.string),this.pwd.string);
        // }
        // cc.director.preloadScene('ZJHHall',onLoaded.bind(this));
        // this.loadRes();
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
                gameController.Init(Number(this.uiserId.string));
            }
            cc.director.preloadScene('ZJHHall',onLoaded2.bind(this));
        }
        cc.director.preloadScene('ZJHGame',onProgress.bind(this),onLoaded1.bind(this));

    }

    confirm(){
        this.loadRes();
    }

    savePbs(){
        pbFactory.savePb("toast",this.toastPrefab);
        pbFactory.savePb("marquee",this.marqueePrefab);
    }

    start () {

    }

    // update (dt) {}
}
