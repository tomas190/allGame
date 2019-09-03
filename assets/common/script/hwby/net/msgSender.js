var msgdef = require('messagedef');
var connection = require('Connection');
var msg_pb = require('msg_pb_by');

var msgSender ={
    sendMessage(msgtag,fsetvalue) {
        //cc.log("msgtag",msgtag);
        let msgclass = msgdef.getmsgobj(msgtag);
        //cc.log("msgclass",msgclass)  
        
        //cc.log("msgdef.msgmap",msgdef.msgmap);
        //cc.log("msg_pb",msg_pb);

        let msgobj = new msgclass();

        if (fsetvalue){
            //cc.log("here go to call callback for setvalue~!!!")
            msgobj = fsetvalue(msgobj);
        }
        
        //cc.log(msgobj)
        connection.SendMessage(msgtag,msgobj);        

    },

    sendLogin(token,userId,userPassword){
        cc.log("sendLogin~!!!!");
        console.trace('SendLogin~~~~!!!!');
        let msgtag = msgdef.namemap.Login;
        let fnsetvalue = function(msgobj){
            msgobj.setToken(token);
            msgobj.setUserid(userId);  
            msgobj.setUserpassword(userPassword);
            return msgobj;
        }
        this.sendMessage(msgtag,fnsetvalue);        
    },

    sendGameEnterReq(roomlevel){
        let msgtag = msgdef.namemap.EnterGameReq;
        let fnsetvalue = function(msgobj){
            msgobj.setRoomlevel(roomlevel);            
            return msgobj;
        }        
        this.sendMessage(msgtag,fnsetvalue);
    },

    sendHitFish(fishid,score,bulletid) {
        let msgtag = msgdef.namemap.HitFish;
        let fnsetvalue = function(msgobj){
            msgobj.setFishid(fishid);
            //cc.log("sendHitFish score",score);
            msgobj.setScore(score);
            msgobj.setBulletid(bulletid);
            return msgobj;
        }
        this.sendMessage(msgtag,fnsetvalue);
    },

    sendFire(pos) {
        let msgtag = msgdef.namemap.Fire;
        let fnsetvalue = function(msgobj){
            let msgPos =  new msg_pb.Pos();
            //cc.log("sendFire",pos.x,pos.y)
            msgPos.setX(pos.x);
            msgPos.setY(pos.y);
            msgobj.setPos(msgPos);
            return msgobj;
        }
        this.sendMessage(msgtag,fnsetvalue);      
    },

    sendCannonLevel(level) {
        let msgtag = msgdef.namemap.CannonLevel;
        let fnsetvalue = function(msgobj){
            msgobj.setLevel(level);
            return msgobj;
        }
        this.sendMessage(msgtag,fnsetvalue)          
    },

    sendCannonType(type) {
        let msgtag = msgdef.namemap.CannonType;
        let fnsetvalue = function(msgobj){
            msgobj.setType(type);
            return msgobj;
        }
        this.sendMessage(msgtag,fnsetvalue)         
    },

    sendLockFish(fishid) {
        let msgtag = msgdef.namemap.LockFish;
        let fnsetvalue = function(msgobj){
            msgobj.setFishid(fishid);
            return msgobj;
        }
        this.sendMessage(msgtag,fnsetvalue)  
    },

    sendLeaveGameReq() {
        let msgtag = msgdef.namemap.LeaveGameReq;
        this.sendMessage(msgtag);        
    },

    sendBreathe() {
        let msgtag = msgdef.namemap.Breathe;
        this.sendMessage(msgtag);         
    },
}

module.exports = msgSender;