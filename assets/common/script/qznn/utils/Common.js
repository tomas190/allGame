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
    addClickEventEND: function(t, i, a) {
        t.on(cc.Node.EventType.TOUCH_END, function(e) {
            e.stopPropagation(),
                i && i(t, a), a && a.flag && cc.gg.audioMgr.playSFX()
        })
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

        var iconPath = this.urlParse(window.location.href).iconPath;
        iconPath = "https://cdnresource.sempxw.com/com.test.pre/icon/"
        console.log(o);
        if (o.split("http://")[1] || o.split("https://")[1] || o.split('data:image')[1]) {} else {
            o = iconPath + o
        }
        // if (!iconPath) {
        //     return
        // }
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
    isName: function(e) {
        return !!/^[\u4e00-\u9fa5]{2,4}$/.test(e) || (c.Show('prefabs/', 'TipsNode', function(e) {
            e._strText = '真实姓名填写有误'
        }), !1)
    },
    isIdCardNum: function(e) {
        var t = '',
            i = !0
        if (e && /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e))
            if ({
                    11: '北京',
                    12: '天津',
                    13: '河北',
                    14: '山西',
                    15: '内蒙古',
                    21: '辽宁',
                    22: '吉林',
                    23: '黑龙江',
                    31: '上海',
                    32: '江苏',
                    33: '浙江',
                    34: '安徽',
                    35: '福建',
                    36: '江西',
                    37: '山东',
                    41: '河南',
                    42: '湖北',
                    43: '湖南',
                    44: '广东',
                    45: '广西',
                    46: '海南',
                    50: '重庆',
                    51: '四川',
                    52: '贵州',
                    53: '云南',
                    54: '西藏',
                    61: '陕西',
                    62: '甘肃',
                    63: '青海',
                    64: '宁夏',
                    65: 'xinjiang',
                    71: '台湾',
                    81: '香港',
                    82: '澳门',
                    91: '国外'
                }[e.substr(0, 2)]) {
                if (18 == e.length) {
                    e = e.split('')
                    for (var a = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], o = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2], n = 0, s = 0; s < 17; s++) n += e[s] * a[s]
                    o[n % 11] != e[17] && (i = !(t = '校验位错误'))
                }
            } else i = !(t = '地址编码错误')
        else i = !(t = '身份证号格式错误')
        return i || c.Show('prefabs/', 'TipsNode', function(e) {
            e._strText = t
        }), i
    },
    addSpriteFrameByAltas: function(a, e, o) {
        cc.loader.loadRes(e, cc.SpriteAtlas, function(e, t) {
            var i = t.getSpriteFrame(o)
            a.getComponent(cc.Sprite).spriteFrame = i
        })
    },
    addEditBoxEvent: function(e, t, i, a) {
        var o = new cc.Component.EventHandler
        o.target = t,
            o.component = t.__classname__,
            o.handler = i,
            o.customEventData = a,
            e.getComponent(cc.EditBox).textChanged.push(o)
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
    ErrorLOG: function(e, t) {
        var i = cc.gg.hallNetMgr._userInfo,
            a = {
                operation: 'BetTest',
                room_id: e,
                account_id: i.account_id,
                session: i.session,
                data: {
                    room_id: e,
                    txt: JSON.stringify(t)
                }
            }
        this.ccLog('上传数据》》', a), cc.gg.net.send(a)
    },
    webCopyString: function(e) {
        var t = '' + e,
            i = document.createElement('input');
        i.value = t, i.setAttribute('readonly', 'readonly'), i.id = 'cut', i.style.contain = 'strict', i.style.position = 'absolute', i.style.width = '100px', i.style.height = '100px', i.style.left = '-9999px', i.style.fontSize = '18px', i.style.opacity = 0, i.setSelectionRange(0, 9999), document.body.appendChild(i), i.select(), i.selectionStart = 0, i.selectionEnd = t.length
        var a = !1
        return document.execCommand('Copy', 'false', null) ? a = document.execCommand('Copy') : prompt('您的手机不支持复制功能 请长按选择全选复制', e), a
    },
    all_copy: function() {
        if (cc.gg.global.isCopy) cc.gg.http.sendRequestPost('/k/getShare', {
            param: (window.location.href + '').split('?')[1] + '&platform=' + cc.gg.global.httpPlatform
        }, function(e) {
            if (0 == e.result)
                if (this.ccLog(e), cc.gg.global.isShortDomainNames) {
                    var t = e.share_url,
                        i = cc.gg.utils.getCopyStr(cc.gg.global.game_type, cc.gg.hallNetMgr._roomNumber, t)
                    c.Show('game/public/prefabs/', 'copyUI', function(e) {
                        e.str = i
                    })
                } else {
                    t = e.share_url + '/?' + (window.location.href + '').split('?')[1] + '&platform=' + cc.gg.global.httpPlatform, i = cc.gg.utils.getCopyStr(cc.gg.global.game_type, cc.gg.hallNetMgr._roomNumber, t)
                    c.Show('game/public/prefabs/', 'copyUI', function(e) {
                        e.str = i
                    })
                }
        })
        else {
            var t = cc.gg.utils.getCopyStr(cc.gg.global.game_type, cc.gg.hallNetMgr._roomNumber, window.location.href)
            c.Show('game/public/prefabs/', 'copyUI', function(e) {
                e.str = t
            })
        }
    },
    removeCut: function() {},
    getCopyStr: function(e, t, i) {
        var a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : '',
            o = (i = i.split('nsukey')[0]).indexOf('&')
        if (-1 != o && (i = i.substring(0, o)), s[e - 1]) {
            var n = '火狐大厅：'
            n = (n = n + a + s[e - 1] + t + '房间\n') + '房间链接：' + i
        }
        return n
    },
    b64EncodeUnicode: function(e) {
        return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
            return String.fromCharCode('0x' + t)
        }))
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