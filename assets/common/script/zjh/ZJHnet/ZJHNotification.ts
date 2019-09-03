// Learn cc.Class:
class ZJHNotification{

    private receiver = {};
    static Instance: ZJHNotification = null;

    private constructor(){
    }

    public static getInstance(){
        if(!ZJHNotification.Instance){
            ZJHNotification.Instance = new ZJHNotification();
        }
        return this.Instance;
    }

    register(id:number,obj: object,callback: Function)
    {
        if(!(id in this.receiver))
        {
            this.receiver[id] = callback.bind(obj);
        }
    }

    sendNotify(id: number,data?: any)
    {
        let callback = this.receiver[id];
        if(callback)
        {
            callback(data);
        }
    }
    
}
export default ZJHNotification.getInstance() ;