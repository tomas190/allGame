// Learn cc.Class:
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHMarquee extends cc.Component {
    
    @property(cc.Node)
    mask:cc.Node = null;

    @property
    speed:number = 200;

    @property
    flag:boolean = false;//当前是否正在播放跑马灯

    @property
    message:any [] = [];

    onLoad () {
        this.message = [];
    }

    pushMsg(data)
    {
        this.message.push({content:data.string,times:data.times});
    }

    assembleText(name,cardType,money){
        return "<size=26>玩家<color=yellow>"+name+
        "</color>在高级场中人品爆发拿到<color=yellow>"+cardType+
        "</color>赢取金币<color=yellow>"+money+"!!!</color></size>"
    }

    run(str,times)
    {
        let richNode = new cc.Node()
        let richText = richNode.addComponent(cc.RichText);
        richText.string = str
        this.flag = true;
        let excuteTime = 0;
        this.mask.addChild(richNode)
        let size1 = this.mask.getContentSize();
        let size2 = richNode.getContentSize()
        var startPos = cc.v2(size1.width/2+size2.width/2,0);
        var endPos = cc.v2(-size1.width/2-size2.width/2,0);
        richNode.setPosition(startPos);
        let runTime = (size1.width+size2.width)/this.speed;
        richNode.runAction(cc.repeat(
            cc.sequence(
                cc.moveTo(runTime,endPos),
                cc.callFunc((sender)=>{
                        sender.setPosition(startPos)
                        excuteTime++;
                        if( excuteTime == times) {
                            this.flag = false;
                            richNode.destroy();
                        }
                    }
                )
            ),times)
        )
    }
    
    excuteAction()
    {
        if (!this.flag && this.message.length!=0)
        {
            let data = this.message[0];
            this.run(data.content,data.times)
            this.message.shift();
        }
        if(!this.flag && this.message.length==0)
        {
            this.node.destroy();
        }
    }

    update (dt) {
        this.excuteAction()
    }
}
