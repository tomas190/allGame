import CommonTool = require("./ZJHCommonTool");
import Notification = require("./ZJHnet/ZJHNotification");
import Event = require("./ZJHnet/ZJHEventCustom")
import gHandler = require("../../../common/script/common/gHandler")
import baseDef from "./ZJHBaseDef"
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHPlayer extends cc.Component {

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Label)
    nick: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null

    @property(cc.ProgressBar)
    timeProgress: cc.ProgressBar = null;

    @property(cc.Node)
    notice: cc.Node = null;

    @property(cc.Node)
    winSkeleton: cc.Node = null;

    @property(cc.Prefab)
    flyPb: cc.Prefab = null; 

    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null; 

    @property
    timer:any = null;

    @property
    id: number = -1;

    @property
    chair: number = -1;

    @property
    headUrl: string = null;

    @property
    money: number = 0;

    @property
    _nick: string = "";

    @property
    _parent: any = null;

    @property
    _cards: any = null;

    onLoad () {
        this._parent = this.node.parent.getComponent("ZJHGame");
        this.headClick();
    }


    headClick(){
        CommonTool.addBtnEvent(this.head,null,null,(event)=>{
            this._parent.openInfo(this)
            event.stopPropagation();
        },null,this)
    }

    setId(id: number){
        this.id = id
    }

    getId(){
        return this.id
    }
    
    getChair(){
        return this.chair;
    }

    saveCards(list:number[]){
        this._cards = list;
    }

    setInfo(data: any){
        this.updateUserGold(data.money);
        this.updateUserHead(data.avatar);
        this.updateUserName(data.nick);
        this.chair = data.chair;
        this.node.active = true;
    }

    //更新用户金币
    updateUserGold(count: number)
    {
        count = count < 0 ? 0 : count;
        this.money = count;
        this.gold.string = CommonTool.getShortMoney(this.money);
    }

    refreshUserGold(val: number){
        this.money += val;
        this.money = this.money < 0 ? 0 : this.money;
        this.gold.string =  CommonTool.getShortMoney(this.money);
    }

    //更新用户头像
    updateUserHead(url:string)
    {   
        let index = url.indexOf(".");
        url = url.substring(0,index);
        url = Number(url) > 10 ? url : "0"+url
        var newurl = "/head/im_head"+url;
        cc.loader.loadRes(newurl,function(err,texture){
            this.head.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        }.bind(this))
    }


    updateUserName(nick: string){
        this._nick = nick;
        this.nick.string = CommonTool.getShortNick(nick);
    }

    //输赢飘字动画
    flyNumber(value: any)
    {
        let delay1 = cc.delayTime(1.0);
        let call1 = cc.callFunc(()=>{
            let fly = cc.instantiate(this.flyPb);
            fly.getComponent("ZJHFlyNum").create(value);
            this.node.addChild(fly);
            var pos = cc.v2(0,this.head.getContentSize().height/2+5);
            fly.setPosition(pos);
            let mb = cc.moveBy(0.2,cc.v2(0,50));
            let delay = cc.delayTime(2.0);
            let call = cc.callFunc((sender)=>{
                sender.destroy()
            });
            let seq = cc.sequence(mb,delay,call);
            fly.name = "fly"
            fly.runAction(seq);
        })
        let seq = cc.sequence(delay1,call1);
        this.node.runAction(seq);
    }

    reSet(){
        this.head.opacity = 255;
        this.node.opacity = 255;
        this.notice.opacity = 255
        this.notice.active = false;
        this.stopCountDown();
    }

    //用户弃牌
    fold(){
        this.head.opacity = 150;
        this.stopCountDown();
    }

    funcnotice(id: number){
        let _tag = baseDef.CEffect.FEMALE;
        Notification.sendNotify(Event.EVENT_MUSIC_EFFECT,{tag:_tag,mid:id,isLoop:false});
        let spr = this.notice.getChildByName("spr");
        spr.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("option_"+id);
        let call = cc.callFunc(()=>{
            this.notice.opacity = 255
            this.notice.active = false;
        })
        let fadeout = cc.fadeOut(1.5);
        this.notice.opacity = 255;
        this.notice.active = true;
        let seq = this.notice.getActionByTag(1);
        if(seq) this.notice.stopActionByTag(1);
        seq = cc.sequence(fadeout,call);
        seq.setTag(1);
        this.notice.runAction(seq);
    }

    //头像置灰
    greyHead(){
        CommonTool.Sprite2Grey(this.head.getComponent(cc.Sprite))
    }

    StartCount:boolean = false;
    //倒计时
    countDown(totalTime: number,remainTime:number){
        this.totalTime = totalTime;
        this.remainTime = remainTime;
        if(this.timeProgress.node.active) return;
        this.timeProgress.node.active = true;
        let percent = this.remainTime/this.totalTime;
        let color = null;
        let passTime = totalTime-remainTime;
        if(percent <= 0.5){
            color = cc.color(255,255*(totalTime/(passTime*2)),0)
        }else{
            color = cc.color(255*(passTime*2/totalTime),255,0)
        }
        this.timeProgress.node.getChildByName("bar").color = color
        this.timeProgress.progress = percent;
        this.StartCount = true;
    }

    reCountDown(totalTime: number,remainTime:number){
        this.stopCountDown();
        this.countDown(totalTime,remainTime);
    }

    stopCountDown(){
        this.StartCount = false;
        this.alltime = 0;
        this.remainTime = 0;
        this.totalTime = 0;
        this.alltime = 0;
        this.percent = 1;
        this.timeProgress.progress = 1;
        this.timeProgress.node.active = false;
        this.timeProgress.node.getChildByName("bar").color = cc.color(0,255,0)
    }

    win(){
        this.winSkeleton.active = true;
        this.winSkeleton.getComponent(sp.Skeleton).setAnimation(1,"win",false);
    }

    lose(){
       this.node.opacity = 155; 
    }

    onExit(){
        this.node.stopAllActions();
        let fly = this.node.getChildByName("fly");
        if(fly) {
            fly.stopAllActions();
            fly.destroy();
        }
        this.id = -1;
        this.chair = -1;
        this.reSet();
        this.node.active = false;
        this._cards = null;
        this.node.stopActionByTag(99);

    }

    remainTime:number = 0;
    totalTime:number = 0;
    alltime:number = 0;
    percent:number = 1;

    update (dt) {
        if(!this.StartCount) return;
        this.remainTime -= dt;
        this.timeProgress.progress = this.remainTime/this.totalTime;
        let deltaRGB = 510/this.totalTime/6;//10帧的颜色差值
        if(this.alltime === 10){//每十帧改变一下颜色
            let _color = this.timeProgress.node.getChildByName("bar").color
            let R = _color.getR();
            let G = _color.getG();
            R =  R+deltaRGB
            R = R > 255 ? 255: R;
            if(R == 255) {
                G = G-deltaRGB
                G = G <= 0 ? 0 : G;
            }
            this.timeProgress.node.getChildByName("bar").color = cc.color(R,G,0);
            this.alltime = 0
        }
        this.alltime++;
        if(this.remainTime <= 0) this.stopCountDown();
        
    }
}
