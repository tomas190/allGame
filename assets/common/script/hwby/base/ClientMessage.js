var ClientMessage = cc.Class({
    ctor()
    {
        cc.log("this instance of ClientMessage");
        this.onMessage();
    }, 

    onMessage() {
        let callbakc = function(event) {
            cc.log("recive a message~!",event)
        }

        window.addEventListener("message", callbakc, false);        
    },

    sendPostMessage(eventName,data) {
        let message = {
            type: eventName,
            data: {}
        }

        cc.log("post message eventName",eventName);
        cc.log("JSON.stringify(message)",JSON.stringify(message));

        let rst = window.parent.postMessage(JSON.stringify(message), '*');
        cc.log("rst:",rst);
    }
})

module.exports = new ClientMessage();