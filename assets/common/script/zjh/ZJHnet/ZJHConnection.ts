// create by smash 2019/4/4
import Notification from "./ZJHNotification"

let ZJHConnection = {

    Create(serverUrl:string)
    {
        if(!this.ws || this.ws.readyState === WebSocket.CLOSED){
            this.ws = new WebSocket(serverUrl);
            this.ws.onopen = this.onOpen.bind(this) 
            this.ws.onmessage = this.onMessage.bind(this) 
            this.ws.onclose = this.onClose.bind(this) 
            this.ws.onerror =  this.onError.bind(this) 
        }
    },

    onOpen()
    {
        cc.log("ZJHConnection open ...")
        if (this.fonConnected)
        {
            this.fonConnected();
        }
    },

    onMessage(evt: any)
    {
        var blob = evt.data;
        if(cc.sys.isBrowser){
            var reader = new FileReader();
            reader.readAsText(blob.slice(0,blob.size,'text/plain;charset=UTF-8'))
            reader.onload = function(e) {
                let _result = String(reader.result);
                var jsonData = JSON.parse(_result)
                var base = jsonData.R2C
                Notification.sendNotify(base.code,base.data);
                cc.log(_result)
            }
        }else if(cc.sys.isNative){
            // let _result = String.fromCharCode.apply(null,new Uint8Array(blob));
            let _result = this.Utf8ArrayToStr(new Uint8Array(blob))
            var jsonData = JSON.parse(_result)
            var base = jsonData.R2C
            Notification.sendNotify(base.code,base.data);
            cc.log(_result)
        }
    },

     Utf8ArrayToStr(array) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while(i < len) {
            c = array[i++];
            switch(c >> 4)
            { 
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7://unicode
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13://gbk
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14://utf-8
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                                ((char2 & 0x3F) << 6) |
                                ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    },

    Uint8ArrayToString(fileData: Uint8Array){
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }
    
        return dataString
    },

    send(msg: any)
    {
        let data = JSON.stringify(msg)
        if(this.ws.readyState === WebSocket.OPEN) this.ws.send(data);
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

    close(){
        if(this.ws && this.ws.readyState === WebSocket.OPEN ) this.ws.close();
    }

}

export default ZJHConnection;