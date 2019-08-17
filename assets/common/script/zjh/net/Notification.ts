// Learn cc.Class:
class Notification{

    private receiver = {};
    static Instance: Notification = null;

    private constructor(){
    }

    public static getInstance(){
        if(!Notification.Instance){
            Notification.Instance = new Notification();
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
export default Notification.getInstance() ;