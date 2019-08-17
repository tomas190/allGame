import gameController from "./GameController"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Load extends cc.Component {
    
 
    onLoad () {
        // cc.director.loadScene('Game');
        cc.loader.loadResDir("",function(completedCount,totalCount,item){
            // cc.log("###1",completedCount)
            // cc.log("###2",totalCount)
            // cc.log("###3",item)
        }.bind(this),
        function(err, assets){
            let onLoaded = function() {
                cc.log("game onLoaded~!!");
                gameController.Init();
            }
            cc.director.preloadScene('Hall',onLoaded.bind(this));
        }.bind(this))
    }

    start () {

    }

    // update (dt) {}
}
