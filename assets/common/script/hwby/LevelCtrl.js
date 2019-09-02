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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.level = 1;   
        this.minLevel = 1;
        this.maxLevel = 9;                  
        
        cc.log("levelctl onload~!!!");
        let costnode = cc.find("lv_btn_bg/cost",this.node);
        this.costlabel = costnode.getComponent(cc.Label);
        //cc.log("levelctl cost label",this.costlabel);
    },

    setSelf(bSelf) {
        let addBtn = cc.find("lv_btn_bg/LevelAdd",this.node);
        let decBtn = cc.find("lv_btn_bg/LevelDec",this.node);

        let addMark = addBtn.getChildByName("lv_btn_plus");
        let decMark = decBtn.getChildByName("lv_btn_minus");

        addBtn.getComponent(cc.Button).interactable = bSelf;
        decBtn.getComponent(cc.Button).interactable = bSelf;
        
        addMark.active = bSelf;
        decMark.active = bSelf;

    },

    setMaxLevel(level) {
        this.maxLevel = level;
    },

    setMinLevel(level) {
        this.minLevel = level;
    },

    setLevel(level) {
        this.level = level;
        this.refreshShow();
    },

    getLevel() {
        return this.level;
    },

    getCost() {
        return this.cost;
    },

    SetRoomScore(score) {
        this.nRoomScore = score;
    },

    refreshShow() {
        this.cost = this.level * this.nRoomScore;  
        if(this.node.active) {
            this.costlabel.string = this.cost.toFixed(2) + "元";
        }      
        
    },

    setLevelChangeCallBack(callback) {
        this.onLvChangeCB = callback;
    },

    DoCallBack() {
        if(this.onLvChangeCB) {
            this.onLvChangeCB(this.level,this.getCost());
        }
    },

    onLevelDec() {
        cc.log("onLevelDec~~!!!");
        this.level--;
        if(this.level < this.minLevel) {
            this.level = this.maxLevel;
        }

        this.refreshShow();   
        this.DoCallBack();     
    },

    onLevelAdd() {
        cc.log("onLevelAdd~~!!!");
        this.level++;
        if(this.level > this.maxLevel) {
            this.level = this.minLevel;
        }

        this.refreshShow();
        this.DoCallBack();
    },

    start () {

    },

    // update (dt) {},
});
