import Connection from "./ZJHConnection"

var ZJHmsgSender = {

    //用户登录
    userLogin(uid:number, pwd:string){
        let obj = {
            UserLogin:{
                UID:uid,
                Pwd:pwd,
                GameID:"5b1f3a3cb76a591e7f251715",
            }
        }
        Connection.send(obj)
    },
    //用户登出
    userLogout(){
        let obj = {
            UserLogout:{
            }
        }
        Connection.send(obj)
    },
    //大厅心跳
    sendBreatheHall(){
        let obj = {
            BreathInHallReq:{}
        }
        Connection.send(obj) 
    },
    //加入房间
    joinRoomReq(rid: number){
        let obj = {
            JoinRoomReq:{
                RoomID:rid
            }
        }
        Connection.send(obj) 
    },
    //创建房间
    createRoomReq(oid:number, level:number, limit:number, point:number, pwd:string){
        let obj = {
            CreateRoomReq:{
                OwnerID:oid,
                Level:level,
                Limit:limit, 
                Point:point,
                Pwd:pwd
            }
        }
        Connection.send(obj) 
    },
    
    //离开房间
    leaveRoomReq(chair:number){
        let obj = {
            LeaveRoomReq:{
                Chair:chair
            }
        }
        Connection.send(obj) 
    },
   
    //请求下注
    betReq (rid:number, area:number, money:number){
        let obj = {
            BetReq:{
                RoomID:rid,
                BetInfo:[],
            }
        }
        let Bet = {Area:Number(area),Count:money};
        obj.BetReq.BetInfo.push(Bet);
        Connection.send(obj) 
    },
    //查询战绩
    queryZhanJiReq(uid:number){
        let obj = {
            QueryZhanJiReq:{
                UID:uid 
            }
        }
        Connection.send(obj)   
    },

    //随机匹配
    randomMatchReq(level: number){
        let obj = {
            RandomMatchReq:{
                Level:level
            }
        }
        Connection.send(obj) 
    },

    //看牌请求
    playerSeeCardReq(){
        let obj = {
            PlayerSeeCardReq:{
            }
        }
        Connection.send(obj)  
    },

    //弃牌请求
    playerDisCardReq(){
        let obj = {
            PlayerDisCardReq:{
            }
        }
        Connection.send(obj)
    },

    //ALL-IN
    playerAllInReq(){
        let obj = {
            PlayerAllInReq:{
            }
        }
        Connection.send(obj)
    },

    //加注跟注
    playerBetReq(money: number){
        let obj = {
            PlayerBetReq:{
                Money:money
            }
        }
        Connection.send(obj)
    },

    playerCmpWithOther(chair: number){
        let obj = {
            PlayerCmpWithOther:{
                ComparedChair:chair
            }
        }
        Connection.send(obj) 
    },

    showCards2AllPlayer(){
        let obj = {
            ShowCards2AllPlayer:{}
        }
        Connection.send(obj); 
    },

    recoverGameScene(){
        let obj = {
            RecoverGameScene:{}
        }
        Connection.send(obj); 
    },

    interactExpression(chair:number, type:number){
        let obj = {
            InteractExpression:{
                DstChair:chair,
                Emoji:type
            }
        }
        Connection.send(obj); 
    }
}

export default ZJHmsgSender;