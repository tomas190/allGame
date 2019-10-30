class ZJHPBFactory{

    private static Instance:ZJHPBFactory = null;

    private prefabs:any = null

    private constructor(){
        this.prefabs = {};
    }

    public static getInstance(){
        if(!this.Instance){
            this.Instance = new ZJHPBFactory();
        }
        return this.Instance;
    }

    savePb(name:string, pb:cc.Prefab){
        this.prefabs[name] = pb;
    }
   
    getPbObject(name:string){
        return cc.instantiate(this.prefabs[name]);
    }

}

export = ZJHPBFactory.getInstance();