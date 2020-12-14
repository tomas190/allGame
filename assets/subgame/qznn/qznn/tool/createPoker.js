cc.Class({
    extends: cc.Component,

    properties: {
        pokerAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        _bShoot: !1,
        _cbCardData: 0
    },
    
    onLoad: function() {
        this.node.is3DNode = true;
        this.card_bg = this.node.getChildByName("card_bg");
        this.num = this.node.getChildByName("num");
        this.color1 = this.node.getChildByName("color1");
        this.color2 = this.node.getChildByName("color2");
        this.back = this.node.getChildByName("back");
    },


    start: function() {},
    
    onDestroy: function() { this.node.off(cc.Node.EventType.TOUCH_END, function(e) {}) },
    
    movePoker: function(e) {
        0 != this._cbCardData && (this._bShoot ?
            (this._bShoot = !1,
                e.runAction(cc.moveTo(0, e.getPositionX(), 0))) : (this._bShoot = !0,
                e.runAction(cc.moveTo(0, e.getPositionX(), 35))))
    },

    setShoot: function(e) { 1 == e ? (this._bShoot = !0, console.log("挑起手牌的牌值：：" + this._cbCardData), this.node.setPosition(cc.v2(this.node.getPositionX(), 35))) : (this._bShoot = !1, this.node.setPosition(cc.v2(this.node.getPositionX(), 0))) },
   
    setCanClick: function() {
        var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.bAllowShoot = e
    },

    setGrey: function(e) { e ? (this.border.active = !0, this.back.color = cc.color(110, 110, 110)) : (this.border.active = !1, this.back.color = cc.color(255, 255, 255)) },
    
    setBorderBling: function() { this.bling.active = !0 },

    // 获取以本地牌作为扑克逻辑值的 card 的牌值大小
    GetLocalCardValue(value){
        return value & 0x0F
    },
    
    // 获取以本地牌作为扑克逻辑值的 card 的牌的花色
    GetLocalCardHuaSe(value){
        return value & 0xF0
    },
    /**
        //   HUASE = 0xF0 // 1111 0000  花色
        //   VALUE = 0x0F // 0000 1111  牌值
        //   FNAGKUAI = 0x10 // 0001 0000
        //   MEIHUA   = 0x20 // 0010 0000
        //   HONGTAO  = 0x40 // 0100 0000
        //   HEITAO   = 0x80 // 1000 0000
        // FNAGKUAI A - K 对应  17 - 29
        // MEIHUA  A - K 对应  33 - 45
        // HONGTAO  A - K 对应  65 - 77
        // HEITAO  A - K 对应  129 - 141
     * @param {*} poker 
     */
    createPoker: function(value) {
        // this.node.is3DNode = true;
        //初始化 
        this.bAllowShoot = false;
        this.card_bg.scaleX = 1;
        this.back.scaleX = 1;
        this.back.color = cc.color(255, 255, 255);
        if (value) {
            let color = this.GetLocalCardHuaSe(value);
            let val = this.GetLocalCardValue(value);
            let str = "";
            let smallHua = "small_"+color;
            let large_Hua = "large_"+color;
            if(color == 0x10 || color == 0x40){//方块红桃
                str = "red_"+val
            }else if(color == 0x20 || color == 0x80){//梅花黑桃
                str = "black_"+val
            }
            if(val > 10){
                large_Hua = "hua_"+ color+"_"+ val
            }
            this.num.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(str);
            this.color1.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(smallHua),
            this.color2.getComponent(cc.Sprite).spriteFrame = this.pokerAtlas.getSpriteFrame(large_Hua)
        } else {
            this.back.active = true;
        }
    },
  
    setCardAni: function(e) {
        if(!this.back.active) return;//已经翻牌了
        this.createPoker(e);
        let s2 = cc.scaleTo(0.2,0,1)
        let sk2 = cc.skewTo(0.2,0,-5)
        let spawn1 = cc.spawn(s2,sk2)
        let call = cc.callFunc(()=>{
            this.back.active = false;
        })
        let _s2 = cc.scaleTo(0.2,1,1);
        let _sk2 = cc.skewTo(0.2,0,0)
        let spawn2 = cc.spawn(_s2,_sk2)
        let seq = cc.sequence(spawn1,call,spawn2)
        this.node.runAction(seq);
    },

    getCardValue: function() { return this._cbCardData },
    
})