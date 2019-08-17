class MySelf{

    private nick:string = "";

    private money:number = 0;

    private headURL:string = "";

    private chair:number = -1;

    private static Instance:MySelf = null;

    private constructor(){
    }

    public static getInstance(data?: any): MySelf{
        if(!MySelf.Instance){
            MySelf.Instance = new MySelf();
        }
        return MySelf.Instance;
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
}
export default MySelf.getInstance();