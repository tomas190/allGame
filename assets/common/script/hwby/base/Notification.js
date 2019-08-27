
var Notification = cc.Class({
    ctor()
    {
        cc.log("this instance of Notification");

        //注册的通知消息的接收者
        this.mapReciver = {};
        //待处理的通知消息
        this.mapNoticer = [];

        setInterval(this.onTick.bind(this),0);
    },  
    
    //注册某对像的一个消息
    Regsiter(id,obj,callback)
    {
        //cc.log("Regsiter:",obj);
        let objname = obj.getClassName();
        //cc.log("Regsiter id~~~",id,objname);
        if (!(objname in this.mapReciver))
        {
            //cc.log("Regsiter id for",obj);
            this.mapReciver[objname] = {};            
        }

        //cc.log("Regsiter 11111111111111",id);
        
      
        this.mapReciver[objname][id] = callback.bind(obj);

        //obj.TestShow();
    },

    //注销某对像的一个消息
    UnReg(id,obj)
    {
        let objname = obj.getClassName();
        //cc.log("UnReg",id,objname);
        if(this.mapReciver[objname] && this.mapReciver[objname][id])
        {
            delete this.mapReciver[objname][id]; 
        }
    },

    UnRegAll(obj)
    {
        let objname = obj.getClassName();
        //cc.log("UnRegAll",objname);
        delete this.mapReciver[objname];
    },

    //发送消息，异步处理，先进入队例
    SendNotify(id,data)
    {
        //放入队例本身也要异步，否则在消息处理中的消息入不了队例
        let delayfun = function() {
            //cc.log("SendNotify",id,data);
            let noticer = {}
            noticer.ID = id;
            noticer.data = data;
    
            //cc.log("SendNotify 1111111111111");
            this.mapNoticer.push(noticer)
            //cc.log("SendNotify 222222222222");
            //this.ProcessOne(noticer);
        }

        setTimeout(delayfun.bind(this),0);

    },

    //处理一个消息
    ProcessOne(noticer)
    {
        // if(noticer.ID == 19)
        // {
        //     cc.log("ProcessOne",noticer);
        //     cc.log("this.mapReciver",this.mapReciver)
        // }

        for(let obj in this.mapReciver)
        {
            // cc.log("obj is ",obj);
            // if(obj == "GameUI") {
            //     cc.log("this.mapReciver[obj]",this.mapReciver[obj]);
            //     cc.log("noticer",noticer);
            //     cc.log("noticer.ID",noticer.ID);
            //     cc.log("this.mapReciver[obj][noticer.ID]",this.mapReciver[obj][noticer.ID]);
            // }

            let callback = this.mapReciver[obj][noticer.ID];
            if (callback)
            {
                //cc.log("ProcessOne obj",obj);
                //cc.log("callback",callback);
                //obj.TestShow();
                //callback = callback.bind(obj);
                callback(noticer.data,noticer.ID); 
            }

        }
    },

    onTick()
    {
        //cc.log("notification onTick 111111111111~!")
        for(let i in this.mapNoticer)
        {
            //cc.log(i,"notification onTick",this.mapNoticer[i])
            this.ProcessOne(this.mapNoticer[i]);
        }

        this.mapNoticer = [];
    },
})

module.exports=new Notification();