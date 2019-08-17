

class LocalData{
    static Instance: LocalData = null;

  
    private constructor(){
    }

    public static getInstance(){
        if(!LocalData.Instance){
            LocalData.Instance = new LocalData();
        }
        return LocalData.Instance;
    }
    
    setData(key:string, data: any){
        data = JSON.stringify(data);
        cc.sys.localStorage.setItem(key,data);
    }

    getData(key:string){
        let data = JSON.parse(cc.sys.localStorage.getItem(key));
        return data;
    }
}

export default LocalData.getInstance();