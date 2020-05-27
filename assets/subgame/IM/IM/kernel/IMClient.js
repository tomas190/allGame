cc.Class({
        extends: cc.Component,
        ctor: function() {
            this.initData()
        },
        initData: function() {
            // this.app = App
            this.params = this.getParams();
            this.client = window.parent;
            this.listenHandler = this.params.os === 'android' ? window.document : window.document;
            this.eventMap = {};
            this.onMessage();
            this.wait();
            this.ok = false;
            this.queue = []
        },
        getParams() {

            var p = {}
            var params = window.location.search.slice(1)
            params.split('&').forEach(e => {
                var v = e.split('=')
                p[v[0]] = v[1]
            })
            return p
        },

        wait() {
            this._t = setInterval(() => {
                if (window.postMessage.length !== 2) {
                    clearInterval(this._t)
                    this.ready()
                }
            }, 50)
        },

        ready() {
            this.ok = true
            while (this.queue.length > 0) {
                var message = this.queue.shift()
                this.send(message.type, message.data, message.fn)
            }
        },

        addEventListener(eventName, fn) {
            this.eventMap[eventName] = fn
        },

        removeEventListener(eventName) {
            delete this.eventMap[eventName]
        },

        send(eventName, data, fn) {
            if (!this.ok) {
                this.queue.push({
                    type: eventName,
                    data: data,
                    fn: fn
                })
                return false
            }

            var message = {
                type: eventName,
                data: data
            }

            // IOS __REACT_WEB_VIEW_BRIDGE
            // this.client.ReactNativeWebView.postMessage(JSON.stringify(message))
            this.client.postMessage(JSON.stringify(message), '*');

            fn && fn()
        },

        onMessage() {
            this.listenHandler.addEventListener('message', e => {
                cc.log("recive a message~!", e)
                var message = JSON.parse(e.data)
                if (this.eventMap[message.type]) return this.eventMap[message.type](message.type, message)
            }, false)
        }
        // update (dt) {}
    }

);