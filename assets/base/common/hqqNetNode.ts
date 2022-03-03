import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('hqqNetNode')
export class hqqNetNode extends cc.Component {
   @property(cc.Node)
   public spritenode: cc.Node | null = null;
   @property([cc.SpriteFrame])
   public backSprite: cc.SpriteFrame[] = [];
   @property(cc.Label)
   public label: cc.Label | null = null;
   @property(cc.Node)
   public tipnode: cc.Node | null = null;

   private upTime: number = null;
   private centerTime: number = null;
   private blinkaction: cc.Tween<cc.UIOpacity> = null;
   private isOnAction: boolean = false;
   private subdata:any = null;
   onLoad() {
      this.UILoad()
      this.upTime = 0;
      this.centerTime = 0;
      //   this.blinkaction = cc.tween(this.spritenode.getComponent(cc.UIOpacity))
      //                               .sequence(
      //                                   cc.tween()
      //                                   .to(0.5,{opacity:0})
      //                                   .to(0.5,{opacity:255})
      //                               )
      //                               .repeat(3);
      this.isOnAction = false
   }

   start() {
      hqq.eventMgr.register(hqq.eventMgr.refreshNetState, "netnode", this.refreshNetState.bind(this))
   }

   UILoad() {
      if (hqq.app.pinpai == "xinsheng") {
      } else {
      }
   }

   init(data: any) {
      this.subdata = {
         upgradeList: hqq.localStorage.globalGet(hqq.app.hotServerKey),
         centerList: hqq.app.serverList,
         uptime: this.upTime,
         centertime: this.centerTime,
         restartGame: false,
      }
      if (data && data.subdata) {
         for (let k in data.subdata) {
            this.subdata[k] = data.subdata[k]
         }
      }
      if (data && data.isLoading) {
         this.tipnode.active = true
         this.subdata.restartGame = true
         // this.tipnode.on(cc.Node.EventType.TOUCH_END, (event) => {
         //    hqq.eventMgr.dispatch(hqq.eventMgr.showLineChoiceLayer, this.subdata)
         // })
         hqq.setBtn(this.tipnode,{callback:"onClickNetNode",script:this})
      }
      hqq.setBtn(this.node,{callback:"onClickNetNode",script:this})
      // this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
      //    cc.log("==========================hqqNetNode refreshNetState event=",event," subdata=",subdata)
      //    hqq.eventMgr.dispatch(hqq.eventMgr.showLineChoiceLayer, subdata)
      // })
   }

   onClickNetNode(){
      cc.log("==========================hqqNetNode refreshNetState subdata=",this.subdata)
      hqq.eventMgr.dispatch(hqq.eventMgr.showLineChoiceLayer, this.subdata);
   }
   refreshNetState(data: any) {
      if (!cc.isValid(this.node)) return;
      this.upTime = data.timelist[0] > data.timelist[1] ? data.timelist[0] : data.timelist[1]
      this.centerTime = data.timelist[2]
      this.label.color = this.getColor(data.time);
      if (data.time <= hqq.app.netState.outstanding) {
         this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[4]
         cc.Tween.stopAllByTarget(this.spritenode);
         this.isOnAction = false
         this.spritenode.getComponent(cc.Sprite).color = cc.color(this.spritenode.getComponent(cc.Sprite).color.r,this.spritenode.getComponent(cc.Sprite).color.g,this.spritenode.getComponent(cc.Sprite).color.b,255)
         this.label.string = data.time + "ms"
      } else if (data.time <= hqq.app.netState.good) {
         this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[3]
         cc.Tween.stopAllByTarget(this.spritenode);
         this.isOnAction = false
         this.spritenode.getComponent(cc.Sprite).color = cc.color(this.spritenode.getComponent(cc.Sprite).color.r,this.spritenode.getComponent(cc.Sprite).color.g,this.spritenode.getComponent(cc.Sprite).color.b,255)
         this.label.string = data.time + "ms"
      } else if (data.time <= hqq.app.netState.kind) {
         this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[2]
         if (!this.isOnAction) {
            cc.tween(this.spritenode.getComponent(cc.Sprite).color)
               .sequence(
                  cc.tween(this.spritenode.getComponent(cc.Sprite).color)
                     .to(0.5, { a: 0 })
                     .to(0.5, { a: 255 })
               )
               .repeat(3)
               .start();
            this.isOnAction = true
         }
         this.label.string = data.time + "ms"
      } else if (data.time <= hqq.app.netState.bad) {
         this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[1]
         if (!this.isOnAction) {
            cc.tween(this.spritenode.getComponent(cc.Sprite).color)
               .sequence(
                  cc.tween(this.spritenode.getComponent(cc.Sprite).color)
                     .to(0.5, { a: 0 })
                     .to(0.5, { a: 255 })
               )
               .repeat(3)
               .start();
            this.isOnAction = true
         }
         this.label.string = data.time + "ms"
      } else {
         this.spritenode.getComponent(cc.Sprite).spriteFrame = this.backSprite[0]
         if (!this.isOnAction) {
            cc.tween(this.spritenode.getComponent(cc.Sprite).color)
               .sequence(
                  cc.tween(this.spritenode.getComponent(cc.Sprite).color)
                     .to(0.5, { a: 0 })
                     .to(0.5, { a: 255 })
               )
               .repeat(3)
               .start();
            this.isOnAction = true
         }
         this.label.string = hqq.getTip("showtip72")
      }
   }

   getColor(time: any) {
      if (time <= hqq.app.netState.outstanding) {
         return cc.color(146, 255, 24)
      } else if (time <= hqq.app.netState.good) {
         return cc.color(255, 185, 29)
      } else if (time <= hqq.app.netState.kind) {
         return cc.color(255, 21, 36)
      } else if (time <= hqq.app.netState.bad) {
         return cc.color(145, 145, 145)
      } else {
         return cc.color(255, 255, 255)
      }
   }

   onDestroy() {
      hqq.eventMgr.unregister(hqq.eventMgr.refreshNetState, "netnode")
   }

}