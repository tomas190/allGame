// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var msg_pb = require('msg_pb_by');
var msgdef = require('messagedef');
var commTools = require('CommTools');
var msgDispatcher = require('msgDispatcher');

var Connection = cc.Class({

    Create(serverurl)
    {
        cc.log("Connection is creating~!");
        //gameStatMgr.ShowWaiting();
        this.ws = new WebSocket(serverurl);

        // this.ws.addEventListener('open', function (event) {
        //     cc.log("websocket opened~!!!")
        //     this.ws.send('Hello Server!');
        // });        
        this.ws.binaryType = "arraybuffer"

        this.ws.onopen = this.onOpen.bind(this);
        
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);  
        
        //msgdef.test1();
    },

    Close()
    {
        cc.log("client active close connect~!!!");
        this.ws.close();
    },

    setConnectedCallBack(fCallBack)
    {
        this.fonConnected = fCallBack
    },

    setDisconnectedCallBack(fCallBack)
    {
        this.fonDisconnected = fCallBack        
    },
    
    setGame(game)
    {
        this.game = game
        //msgDispatcher.setGame(game);
    },

    setHall(hall)
    {
        this.hall = hall
        msgDispatcher.setHall(hall);
    },

    onOpen()
    {
        //gameStatMgr.CloseWaiting();
        cc.log("websocket is opened now~!!!");
        //this.send("hello server~!!!");
        //this.TestProtobuf();
        //this.TestMsgSend();
        //this.TestMsgSend2();
        //this.TestMsgRepeatSend();
        if (this.fonConnected)
        {
            this.fonConnected();
        }
    },
    
    parseProtoBufId(obj)
    {
        let arrayBuffer = obj.data;
        let dataUnit8Array = new Uint8Array(arrayBuffer);
        let msgid = commTools.Uint8ArrayToInt(dataUnit8Array.slice(0,2));
        //console.log("receive message id = "+ msgid);
        dataUnit8Array = dataUnit8Array.slice(2);
        
        return {id: msgid,data:dataUnit8Array};
    },

    // dealMessage(id,data)
    // {
    //     cc.log("message id is",id);
    //     console.log(data);
    //     let newmsg = msg_pb.Test1.deserializeBinary(data);
    //     cc.log("sever return:")
    //     console.log(newmsg.getId());
    //     console.log(newmsg.getName());        
    // },    

    onMessage(obj)
    {        
        //cc.log(obj);
        //cc.log("obj.data is arraybuffer",obj.data instanceof ArrayBuffer);
        //cc.log("obj.data is",obj.data)
        if(obj.data instanceof ArrayBuffer)
        {
            //cc.log("!!!!!!!!");
            //leaf 前两位为协议序号，需要解一下啊协议序号
            let retdata = this.parseProtoBufId(obj);  
            let id = retdata.id;
            let data = retdata.data;
            msgDispatcher.onMessageDispatcher(id,data);
            //this.dealMessage(id,data);
        }        
    },

    onError()
    {

    },

    onClose()
    {
        cc.log("websocket is close~~!!!");
        if(this.fonDisconnected)
        {
            this.fonDisconnected();
        }
    },

    send(msg)
    {
        cc.log("send msg"+msg);
        this.ws.send(msg);

        //this.TestProtobuf();
        
    },    

    protoBufAddtag(tag,buffer)
    {
        let addtag_buffer=new Uint8Array(buffer.length+2);
        let tagBinary = commTools.IntToUint8Array(tag,16);
        let tagUnit8 = new Uint8Array(tagBinary);

        addtag_buffer.set(tagUnit8,0);
        addtag_buffer.set(buffer.subarray(0,buffer.length),2);

        return addtag_buffer;
    },

    SendMessage(tag,data)
    {
        //cc.log("tag",tag,typeof(tag))
        //cc.log("data",data)    
        
        let buffer = data.serializeBinary(); 
        let full = this.protoBufAddtag(tag,buffer)

        //为了避免因为网络卡堵塞主线程，异步发送消息
        let callback = function()
        {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(full);
            }
            else {
                cc.log("WebSocket instance wasn't ready...");
            }            
        }

        setTimeout(callback.bind(this),0);

        //this.ws.send(full);
    },

    TestMsgSend2()
    {
        let msgclass = msgdef.getmsgobj(msgdef.namemap.Test2);        
        let msgobj = new msgclass();
        msgobj.setPhone(10086);
        msgobj.setName('china mobile');

        this.SendMessage(msgdef.namemap.Test2,msgobj);
    },    

    TestMsgSend()
    {
        let msgclass = msgdef.getmsgobj(msgdef.namemap.Test1);        
        let msgobj = new msgclass();
        msgobj.setId(999);
        msgobj.setName('sking');

        this.SendMessage(msgdef.namemap.Test1,msgobj);
    },

    TestMsgRepeatSend()
    {
        let msgclass = msgdef.getmsgobj(msgdef.namemap.Track);
        let msgobj = new msgclass();
        cc.log('TestMsgRepeat 11111');
        //msgobj.addPos({x:0.5,y:0.5});
        let pos1 = new msg_pb.Pos();
        pos1.setX(0.5);
        pos1.setY(0.6);
        let pos2 = new msg_pb.Pos();
        pos2.setX(1);
        pos2.setY(-0.1);
        let pos3 = new msg_pb.Pos();
        pos3.setX(-0.1);
        pos3.setY(-0.5);
        cc.log('TestMsgRepeat 22222');
        msgobj.addPos(pos1);
        msgobj.addPos(pos2);
        msgobj.addPos(pos3);
        cc.log('TestMsgRepeat 333333');
        this.SendMessage(msgdef.namemap.Track,msgobj);
        // let buffer = msgobj.serializeBinary(); 
        // let newmsg = msg_pb.Track.deserializeBinary(buffer);
        // let listpos = newmsg.getPosList()
        // cc.log(listpos)
        // for(let i in listpos)
        // {
        //     cc.log("x,y",listpos[i].getX(),listpos[i].getY());
        // }

    },

    TestProtobuf()
    {        
        console.log(msg_pb);
        
        console.log("Test encode~~~~!!!");
        let message = new msg_pb.Test1(); 
        console.log(message);
        
        message.setId(999);
        console.log(message.getId());    
        
        message.setName("sking");
        console.log(message.getName());

        let buffer = message.serializeBinary(); 
        //this.ws.send(b);
        console.log(buffer); 

        console.log("Test decode~~~~!!!");
        let newmsg = msg_pb.Test1.deserializeBinary(buffer);
        console.log(newmsg.getId());
        console.log(newmsg.getName());

        let finalbuffer = this.protoBufAddtag(0,buffer)
  
        this.ws.send(finalbuffer);
    }

    // setTimeout(function () {
    //     if (ws.readyState === WebSocket.OPEN) {
    //         ws.send("Hello WebSocket, I'm a text message.");
    //     }
    //     else {
    //         console.log("WebSocket instance wasn't ready...");
    //     }
    // }, 3);    

});

module.exports=new Connection();
