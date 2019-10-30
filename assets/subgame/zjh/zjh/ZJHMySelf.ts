class ZJHMySelf{

    private nick:string = "";

    private money:number = 0;

    private headURL:string = "";

    private chair:number = -1;

    private id: number = -1;

    private _cards: any = null;

    private static Instance:ZJHMySelf = null;

    private constructor(){
    }

    public static getInstance(data?: any): ZJHMySelf{
        if(!ZJHMySelf.Instance){
            ZJHMySelf.Instance = new ZJHMySelf();
        }
        return ZJHMySelf.Instance;
    }

    setId(_id: number){
        this.id = _id;
    }

    getId(){
        return this.id
    }

    setChair(chair: number){
        this.chair = chair;
    }

    getChair(){
        return this.chair;
    }

    setNick(_nick:string){  
        this.nick = _nick;
    }

    getNick(){
        return this.nick
    }

    setMoney(num: number){
        this.money = num;
    }

    getMoney(){
        return this.money;
    }

    setHeadURL(url: string){
        this.headURL = url;
    }

    gteHeadURL(){
        return this.headURL;
    }

    updateMoney(delta: number){
        this.money +=delta;
    }

    saveCards(list:number []){
        this._cards = list;
    }

    getCards(){
        return this._cards;
    }

    clearCards(){
        this._cards = null;
    }
}
export = ZJHMySelf.getInstance();