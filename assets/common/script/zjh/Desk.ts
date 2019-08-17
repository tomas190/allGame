
class Desk {

    static Instance: Desk = null;

    private Users:any [] = [];//桌子内的玩家
    private Indexs:any [] = [];//游戏中的玩家

    private constructor(){
    }

    public static getInstance(){
        if(!Desk.Instance){
            Desk.Instance = new Desk();
        }
        return Desk.Instance;
    }

    //保存桌子内所有的玩家
    addUser(user: any){
        this.Users.push(user);
    }

    removeUser(chair:number){
        for(let i=0; i<this.Users.length; i++){
            if(this.Users[i].chair == chair){
                return this.Users.splice(i,1);
            } 
        }
        return null;
    }

    getUsers(){
        return this.Users;
    }

    //保存正在玩牌的玩家
    pushUser(chair: any){
        this.Indexs.push(chair);
    }

    getUsersInGame(){
        return this.Indexs;
    }

    //根据座位号删除正在玩牌的玩家 并返回被删除的玩家
    removeUserByChair(chair:number){
        let index = this.Indexs.indexOf(chair);
        if(index>-1) this.Indexs.splice(index,1);
    }

    //根据座位号返回正在玩牌的玩家 如果不存在返回null
    getUserByChair(chair: number): any{
        let index = this.Indexs.indexOf(chair);
        if(index>-1) return this.Indexs[index];
        return null;
    }

    getUserNumInGame(){
        return this.Indexs.length;
    }

    getUserNum(){
        return this.Users.length;
    }

    refreshIndexs(){
        this.Indexs.length = 0
        this.Users.forEach(user => {
            this.Indexs.push(user.chair);
        });
    }

    clearAll(){
        this.Indexs.length = 0
        this.Users.length = 0;
    }
}
export default Desk.getInstance();