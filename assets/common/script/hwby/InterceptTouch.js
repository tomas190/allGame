var InterceptTouch = cc.Class({
    ctor()
    {
        cc.log("InterceptTouchBase~!!");
    },  

    Intercept()
    {
        let fnClick = function(event)
        {                                             
            event.stopPropagation();
        }

        let fnClickStart = function(event)
        {
            event.stopPropagation();            
        }

        this.node.on(cc.Node.EventType.TOUCH_END, fnClick,this);
        this.node.on(cc.Node.EventType.TOUCH_START, fnClickStart,this);         
    }
})

module.exports = InterceptTouch;