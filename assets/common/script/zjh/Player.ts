import CommonTool from "./CommonTool"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

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

    // onLoad () {}


    setId(id: number){
        this.id = id
    }

    getId(){
        return this.id
    }
    
    getChair(){
        return this.chair;
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
        this.money = count;
        this.gold.string = CommonTool.getShortMoney(this.money);
    }

    refreshUserGold(val: number){
        this.money += val;
        this.gold.string =  CommonTool.getShortMoney(this.money);
    }

    //更新用户头像
    updateUserHead(url:string)
    {
        let path = CommonTool.getIconPath();
        url = path + url;
        cc.loader.load(url,function (err, texture) {
            if(err){
                cc.log(err);
                return;
            }
            var frame = new cc.SpriteFrame(texture);
            this.head.spriteFrame = frame;
        });
    }

    updateUserName(nick: string){
        this.nick.string = CommonTool.getShortNick(nick);
    }

    //输赢飘字动画
    flyNumber(value: any)
    {
        let fly = cc.instantiate(this.flyPb);
        fly.getComponent("FlyNum").create(value);
        this.node.addChild(fly);
        var pos = cc.v2(0,this.head.getContentSize().height/2+5);
        fly.setPosition(pos);
        let mb = cc.moveBy(0.2,cc.v2(0,60));
        let delay = cc.delayTime(1.0);
        let call = cc.callFunc((sender)=>{
            sender.destroy()
        });
        let seq = cc.sequence(mb,delay,call);
        fly.runAction(seq);
    }

    clearFlyNumber()
    {
        var flyNumber = this.node.getChildByName("fly")
        if(flyNumber) flyNumber.destroy();
    }

    reSet(){
        // CommonTool.Sprite2Normal(this.head.getComponent(cc.Sprite))
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
        let spr = this.notice.getChildByName("spr");
        CommonTool.loadSpriteFrame(spr,"action/option_"+id);
        let call = cc.callFunc(()=>{
            this.notice.opacity = 255
            this.notice.active = false;
        })
        let fadeout = cc.fadeOut(1.0);
        this.notice.opacity = 255;
        this.notice.active = true;
        let seq = this.notice.getActionByTag(1);
        if(!seq){
            seq = cc.sequence(fadeout,call);
            seq.setTag(1);
        }else if(seq && !seq.isDone()){
            return;
        }
        this.notice.runAction(seq);
    }

    //头像置灰
    greyHead(){
        CommonTool.Sprite2Grey(this.head.getComponent(cc.Sprite))
    }

    //倒计时
    countDown(totalTime: number,remainTime:number){
        if(this.timeProgress.node.active) return;
        this.timeProgress.node.active = true;
        let percent = remainTime/totalTime;
        let color = null;
        let passTime = totalTime-remainTime;
        if(percent <= 0.5){
            color = cc.color(255,255*(totalTime/(passTime*2)),0)
        }else{
            color = cc.color(255*(passTime*2/totalTime),255,0)
        }
        this.timeProgress.node.getChildByName("bar").color = color
        this.timeProgress.progress = percent;
        let endTime = new Date().getTime()+remainTime*1000;
        this.timer = setInterval(()=>{
            let _color = this.timeProgress.node.getChildByName("bar").color
            let R = _color.getR();
            let G = _color.getG();
            R =  R+51/totalTime;
            R = R > 255 ? 255: R;
            if(R == 255) {
                G = G-51/totalTime
                G = G <= 0 ? 0 : G;
            }
            this.timeProgress.node.getChildByName("bar").color = cc.color(R,G,0);
            let curTime = new Date().getTime();
            percent -= 1/(totalTime*10);
            this.timeProgress.progress = percent;
            if(endTime <= curTime){
                this.stopCountDown();
            }
        },100);
    }

    reCountDown(totalTime: number,remainTime:number){
        this.stopCountDown();
        this.countDown(totalTime,remainTime);
    }

    stopCountDown(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
            this.timeProgress.progress = 1;
            this.timeProgress.node.active = false;
            this.timeProgress.node.getChildByName("bar").color = cc.color(0,255,0)
        }
    }

    win(){
        this.winSkeleton.active = true;
        this.winSkeleton.getComponent(sp.Skeleton).setAnimation(1,"win",false);
    }

    lose(){
       this.node.opacity = 155; 
    }

    onExit(){
        this.id = -1;
        this.chair = -1;
        this.clearFlyNumber();
        this.reSet();
        this.node.active = false;
    }
    // update (dt) {
    // }
}
