// create by smash 2019/4/4
import Notification from "./Notification"
let Connection = {

    Create(serverUrl:string)
    {
        this.ws = new WebSocket(serverUrl);
        this.ws.onopen = this.onOpen.bind(this) 
        this.ws.onmessage = this.onMessage.bind(this) 
        this.ws.onclose = this.onClose.bind(this) 
        this.ws.onerror =  this.onError.bind(this) 
    },

    onOpen()
    {
        cc.log("Connection open ...")
        if (this.fonConnected)
        {
            this.fonConnected();
        }
    },

    onMessage(evt: any)
    {
        var blob = evt.data;
        var reader = new FileReader();
        reader.readAsText(blob.slice(0,blob.size,'text/plain;charset=UTF-8'))
        reader.onload = function(e) {
                var _result: string  = String(reader.result);
                var jsonData = JSON.parse(_result)
                var base = jsonData.R2C
                Notification.sendNotify(base.code,base.data);
                cc.log(_result)
        }
    },

    send(msg: any)
    {
        let data = JSON.stringify(msg)
        this.ws.send(data);
        cc.log(data)
    },

    onClose()
    {
        cc.log("Connection closed")
        if(this.fonDisconnected)
        {
            this.fonDisconnected();
        }
    },

    onError(){
    },

    setConnectedCallBack(fCallBack: Function)
    {
        this.fonConnected = fCallBack
    },

    setDisconnectedCallBack(fCallBack: Function)
    {
        this.fonDisconnected = fCallBack        
    },
}

export default Connection;