class IMDatabase  {

    private static Instance:IMDatabase = null;//单利应用
    private NewMsg  = new Map();//保存与所有用户的聊天记录

    private constructor(){
        for(let i=0; i<5;++i){
            let data = {uid:"123456",msg:"床前明月光，疑似地上霜。举头望明月，低头思故乡。"+i,status:2}
            this.receiveNewMsg(data);
        }
        
    }

    /**
     * @method 接受新消息 根据用户ID区分
     * @param data 
     */
    receiveNewMsg(data:any){
        let Id2Msgs = this.NewMsg.get(data.uid);
        if(Id2Msgs){//已经存在则加入新信息
            Id2Msgs.push(data.msg);  
        }else{//不存在则创建并保存
            Id2Msgs = [];
            Id2Msgs.push(data.msg);
            this.NewMsg.set(data.uid,Id2Msgs);
        }
    }
   
    /**
     * @method 根据id返回与当前用户的所有聊天记录
     * @param uid 
     */
    getNewMsgsById(uid){
        let msgs = this.NewMsg.get(uid);
        return msgs;
    }

    public static getInstance(){
        if(!IMDatabase.Instance){
            IMDatabase.Instance = new IMDatabase();
        }
        return IMDatabase.Instance;
    }
   
}

export = IMDatabase.getInstance();