
class ZJHDesk {

    static Instance: ZJHDesk = null;

    private Users:any [] = [];//桌子内的玩家
    private Indexs:any [] = [];//游戏中的玩家

    private RoomList:any = null;//房间列表配置

    private constructor(){
    }

    public static getInstance(){
        if(!ZJHDesk.Instance){
            ZJHDesk.Instance = new ZJHDesk();
        }
        return ZJHDesk.Instance;
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

    //是否正在玩牌
    isPlaying(chair: number): boolean{
        let i = this.Indexs.indexOf(chair)
        return i > -1;
    }

    getUsersInGame(){
        return this.Indexs;
    }
    /**
     * 
     * @param Index 庄家桌位号
     */
    getDealSequence(Index:number){
        let tempList = [];
        tempList.push(Index);//先加入庄家
        while(tempList.length < this.Users.length){
            Index = Index >= 4 ? 0 : Index+1;
            for(let i=0; i< this.Users.length; ++i){
                if(this.Users[i].chair === Index){//当前座位号存在
                    tempList.push(Index);
                }
            }
        }
        return tempList;
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

    setRoomData(data){
        this.RoomList = data;
    }

    getRoomData(){
        return this.RoomList;
    }
}
export = ZJHDesk.getInstance();