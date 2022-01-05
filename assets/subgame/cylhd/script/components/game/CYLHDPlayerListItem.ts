// 玩家列表item
const {ccclass, property} = cc._decorator;
// import ebgMusicMgr from './ebgMusicMgr';
import StateTools from "../../CYLHDStateTools";
import AssistFunc from "../../CYLHDAssistFunc";
@ccclass
export default class CYLHDPlayerListItem extends cc.Component {

    @property(cc.Sprite)
    p_icon: cc.Sprite = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Label)
    id: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;//剩余金币

    @property(cc.Label)
    allBet: cc.Label = null;//下注金额

    @property(cc.Label)
    winTime: cc.Label = null;//获胜局数
    
    @property(cc.SpriteFrame)
    p_icon_sprite: cc.SpriteFrame[] = [];

    @property(cc.Node)
    p_num: cc.Node= null;

    // MusicMgr : ebgMusicMgr = null;
    // rootCom = null;
    onLoad () {
        // this.MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr');
        // this.rootCom =  cc.find('RootNode').getComponent('ebgRootNode');
    }

    init(i :number, listItem:any, callBack?:Function):void{
        if(!cc.isValid(this.node))return;
        if(i>=0 && i <=3 ) {
            this.p_icon.spriteFrame = this.p_icon_sprite[i]
        }else if(i <=5 ){
            this.p_num.getChildByName('p_fh').getComponent(cc.Sprite).spriteFrame = this.p_icon_sprite[5]
            this.p_num.getChildByName('p_icon').getComponent(cc.Sprite).spriteFrame = this.p_icon_sprite[4]
            this.p_num.getChildByName('p_lab').getComponent(cc.Label).string = `${i}`;
        }else{  
            this.p_num.getChildByName('p_icon').getComponent(cc.Sprite).spriteFrame = this.p_icon_sprite[4]
            this.p_num.getChildByName('p_lab').getComponent(cc.Label).string = `${i}`;
        }
        let callfunc = cc.callFunc(()=>{
            if(callBack)    callBack()
        })
        var action = cc.moveBy(0.15,cc.v2(-1000,0));
        var action2 = cc.moveBy(0,cc.v2(0,0));
        this.node.runAction(cc.sequence(action,action2,callfunc));
        
        this.id.string = listItem.userName;
        this.score.string = StateTools.balanceShow(listItem.balanceAvail);
        this.allBet.string = listItem.sumBetVal;
        this.winTime.string = `${listItem.sumWinRound}局`;
        let headerIcon =this.icon;
        AssistFunc.setHeadIcon(listItem.headUrl, headerIcon, 90, 90);
    }
    // update (dt) {}
}
