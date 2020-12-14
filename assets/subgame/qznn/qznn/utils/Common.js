cc.Class({
    extends: cc.Component,
    properties: {},
    ctor: function() {
        this.clickArr = [];
    },
    addClickEvent: function(e, t, i, a, o) {
        var n = new cc.Component.EventHandler
        n.target = t
        n.component = i
        n.handler = a
        n.customEventData = o
        e.getComponent(cc.Button).clickEvents.push(n)
        e.on(cc.Node.EventType.TOUCH_END, function(e) {
            // o && o.flag && cc.gg.audioMgr.playSFX()
        })
    },
    addTextChanged: function(t, i) {
        t.on("text-changed", function(e) {
            i && i(t, e)
        })
    },
    addEditingDidBegan: function(t, i) {
        t.on("editing-did-began", function(e) {
            i && i(t, e)
        })
    },
    addEditingDidEnded: function(t, i) {
        t.on("editing-did-ended", function(e) {
            i && i(t, e)
        })
    },
    addEditingReturn: function(t, i) {
        t.on("editing-return", function(e) {
            i && i(t, e)
        })
    },
    addClickEventEND: function(t, i, a,m) {
        t.on(cc.Node.EventType.TOUCH_END, function(e) {
            e.stopPropagation(),
                i && i(t, a);
                if(a && a.flag && m){
                    cc.gg.audioMgr.playSFX(m)
                }else if(a && a.flag){
                    cc.gg.audioMgr.playSFX()
                }
        })
    },

    addClickEventBEGAN: function(t, i, a) {
        t.on(cc.Node.EventType.TOUCH_START, function(e) {
            e.stopPropagation(),
                i && i(t, a), a && a.flag && cc.gg.audioMgr.playSFX()
        })
    },

    addClickEventALL: function(node,_start,_move,_end,_cancel,obj,a){
        node.on(cc.Node.EventType.TOUCH_START,function(event){
            event.stopPropagation(),
            _start && _start(node, a), a && a.flag && cc.gg.audioMgr.playSFX()
        }.bind(obj));

        node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            event.stopPropagation(),
            _move && _move(node, a)
        }.bind(obj));

        node.on(cc.Node.EventType.TOUCH_END,function(event){
            event.stopPropagation(),
            _end && _end(node, a)
        }.bind(obj));

        node.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            event.stopPropagation(),
            _cancel && _cancel(node, a)}.bind(obj));
    },

    addClickEventENDOne: function(t, i, a, self) {
        for (var k = 0; k < this.clickArr.length; k++) {
            if (this.clickArr[k] == t) {
                return
            }
        };
        this.clickArr.push(t);
        this.ccLog(this.clickArr)
        t.on(cc.Node.EventType.TOUCH_END, function(e) {
            e.stopPropagation(), i && i(t, a);
        }, self)
    },
    addTouchesBegan: function(t, i, a) {
        t.on(cc.handleTouchesBegin, function(e) {
            e.stopPropagation(), i && i(t, a), a && a.flag || cc.gg.audioMgr.playSFX()
        })
    },

    addTouches: function(t, i, a) {
        // t.on(cc.handleTouchesBegin , )
    },
    addSlideEvent: function(t, i, a) {
        t.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            e.stopPropagation(), i && i(t, e, a)
        })
    },
    addEscEvent: function(e) {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(e, t) {},
            onKeyReleased: function(e, t) {
                e == cc.KEY.back && cc.vv.alert.show('提示', '确定要退出游戏吗？', function() {
                    cc.game.end()
                }, !0)
            }
        }, e)
    },
    //滚动条监听事件
    addScrollToTop: function(t, i, a) {
        t.on("scroll-to-top", function(e) {
            i && i(t, e, a)
        })
    },
    // changeSpriteFrameWithServerUrlForWeb: function (a, o) {
    //     if (a) {
    //         var n = this
    //         cc.loader.load(o, function (e, t) {
    //             if (e) setTimeout(function () {
    //                 n.changeSpriteFrameWithServerUrlForWeb(a, o)
    //             }, 1e3)
    //             else {
    //                 var i = new cc.SpriteFrame
    //                 var img = new Image();
    //                 img.src = o;
    //                 texture.initWithElement(img)
    //                 i.setTexture(t), a.spriteFrame = i, cc.textureCache.addImage(o)
    //             }
    //         })
    //     }
    // },
    changeSpriteFrameWithServerUrlForWeb: function(a, o) {

        var iconPath = cc.gg.global.iconPath || "https://cdnresource.sempxw.com/com.test.pre/icon/";
        console.log(o);
        if (o.split("http://")[1] || o.split("https://")[1] || o.split('data:image')[1]) {} else {
            o = iconPath + o
        }
        cc.loader.load({
            url: o,
            type: "png"
        }, (err, texture) => {
            if (err) {
                return
            }
            a.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
        })
    },
    imgForWeb: function(a, o) {
        // var i = new cc.SpriteFrame
        // var img = new Image();
        // img.src = o;
        // i = cc.texture.initWithElement(img)
        // a.spriteFrame = i;
    },
    isEmpty: function(e) {
        return 0 != e.replace(/(^s*)|(s*$)/g, '').length
    },
  
    getSubStringLengTxt: function(e, l) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : l
        return e.length > t ? e.substring(0, t) + '..' : e
    },
    timestampToTime: function(e) {
        var t = new Date(e);
        var time = new Date().getTime();
        if (time - e > 1000 * 60 * 60 * 24) {
            //显示日期 t.getFullYear() + '-' +
            return ((t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1) + '-') +
                ((t.getDate()) < 10 ? '0' + t.getDate() : t.getDate())
        } else {
            //显示时间
            return ((t.getHours()) < 10 ? '0' + t.getHours() + ":" : t.getHours() + ':') +
                ((t.getMinutes()) < 10 ? '0' + t.getMinutes() : t.getMinutes())
        }

    },
    timeNow: function(e) {
        if (e) {
            var t = new Date(e);
        } else {
            var t = new Date();
        }

        return (t.getHours() < 10 ? '0' + t.getHours() + ":" : t.getHours() + ':') + ((t.getMinutes()) < 10 ? '0' + t.getMinutes() : t.getMinutes())
    },
 
    ccLog: function(data) {
        if (window.isOfficial) {

        } else {
            console.log(data)
        }
    },
    urlParse: function(url) {
        var a = {};
        if (null == window.location) return a;
        if (url.indexOf("?") < 0) {
            url = "?" + url
        }
        var dataSum = url.split("?")[1].split("&");
        for (var i = 0; i < dataSum.length; i++) {
            var arr = dataSum[i].split("=");
            a[arr[0]] = arr[1];
        }
        return a;
    },
    winUrlParse: function(e) {
        var t, i, a = {};
        if (null == window.location) return a;
        for (var o = e, n = o.indexOf("?"),
                s = o.indexOf("&"),
                c = (o = -1 != s ? o.substring(n + 1, s) : o.substr(n + 1)).split("_uiui"), r = 0; r < c.length; r++) 0 < (n = c[r].indexOf("=")) && (t = c[r].substring(0, n), i = c[r].substr(n + 1), a[t] = i);
        return a
    },
    getUUid: function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
})