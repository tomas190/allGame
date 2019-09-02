var BaseNodeFun = cc.Class({
    ctor()
    {
        cc.log("BaseNodeFun~!!");
    },

    InstantiatePrefab(pos,prefab,nZIndex)
    {
        if(nZIndex == undefined) {
            nZIndex = 0;
        }
        let oObj = cc.instantiate(prefab);
        //cc.log("play blast");       
        this.node.addChild(oObj,nZIndex);
        oObj.setPosition(pos); 
        return oObj
    },    
})

module.exports = BaseNodeFun;