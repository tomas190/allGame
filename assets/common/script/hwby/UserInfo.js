// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    InitCtrl() {
        
        
        this.Coin = cc.find("Frame/CoinFrame/coinnum",this.node);
        this.Nick = cc.find("Frame/NickFrame/nick",this.node);
        this.Head = cc.find("Frame/HeadFrame/head",this.node);

        this.CoinLable = this.Coin.getComponent(cc.Label);
        this.NickLabel = this.Nick.getComponent(cc.Label);
        this.HeadSprite = this.Head.getComponent(cc.Sprite);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("userinfo onLoad~~~!!!");
        this.InitCtrl();
    },

    SetCoinNum(nNum) {
        if(nNum < 0)
        {
            nNum = 0;            
        }         
        this.CoinLable.string = nNum.toFixed(2) + "元";
    },

    SetNick(sNick) {
        this.NickLabel.string = sNick
    },

    SetHeadImg(sImg) {
        cc.log("2222222222222222222222");
        cc.log("SetHeadImg",sImg);
        let callback = function (err, texture) {
            cc.log("11111111111111111111111111");
            cc.log("err:",err);
            let frame=new cc.SpriteFrame(texture);
            this.HeadSprite.spriteFrame=frame;
        }
        cc.loader.load(sImg,callback.bind(this));
      
    },

    start () {

    },

    // update (dt) {},
});
