var httpUrl = "120.78.210.241";
cc.Class({
    extends: cc.Component,

    statics: {
        sessionId: 0,
        userId: 0,
        master_url: null,
        url: httpUrl,
        sendRequestPost: function(t, i, a, o) {
            /**
             * t => k/api
             * i => data
             * a => callback(e)
             */
            var s = this;
            a.count ? a.count++ : a.count = 1;
            var c = cc.loader.getXMLHttpRequest();
            c.timeout = 3e3;
            //i.platform = cc.gg.global.httpPlatform;
            //cc.gg.global.isOfficial ? !1 !== n && cc.gg.global.WxData && (cc.gg.utils.ccLog(2, cc.gg.global.WxData), i.auth = cc.gg.global.WxData.auth) : i.deviceToken = JSON.parse(cc.sys.localStorage.getItem("Youke")), null == o && (o = r.url);
            var e = o + t;
            return c.open("POST", e, !0), !1 === n ? c.setRequestHeader("Content-Type", "application/json") : c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), !(c.onreadystatechange = function() {
                if (4 === c.readyState && 200 <= c.status && c.status < 300) {
                    cc.gg.utils.ccLog("<<http res(" + c.responseText.length + "):《 " + t + " 》" + c.responseText);
                    try {
                        var e = JSON.parse(c.responseText);
                        if (null !== a)
                            if (-1e3 == e.result || "登录失效" == e.result_message) cc.gg.utils.ccLog("微信验证失效"), window.location.href = window.location.href;
                            else {
                                if (-100 == e.result) return alert("你以被拉入黑名单"), !1;
                                a(e)
                            }
                    } catch (e) {
                        a.count < 3 && (void 0 !== n && (i.isChangeData = n), s.sendRequestPost(t, i, a, o)), cc.gg.utils.ccLog("err:" + e)
                    }
                } else 200 != c.status && a.count < 3 && (void 0 !== n && (i.isChangeData = n), s.sendRequestPost(t, i, a, o))
            }) === n ? (delete i.deviceToken, delete i.platform, c.send(JSON.stringify(i)), cc.gg.utils.ccLog(JSON.stringify(i))) : c.send(JSON.stringify(i)), c
        },
        sendRequestGet: function(e, t, i) {
            if (t && !Array.isArray(t)) {
                var a = cc.loader.getXMLHttpRequest();
                a.timeout = 5e3;
                var o = e + t;
                return cc.gg.utils.ccLog("RequestURL:" + o), a.onreadystatechange = function() {
                    if (4 === a.readyState && 200 <= a.status && a.status < 300) {
                        cc.gg.utils.ccLog("http res(" + a.responseText.length + "):" + a.responseText);
                        try {
                            var e = JSON.parse(a.responseText);
                            null !== i && i(e)
                        } catch (e) {
                            cc.gg.utils.ccLog("catch:" + e)
                        } finally {
                            cc.gg.utils.ccLog("finally")
                        }
                    } else cc.gg.utils.ccLog("请求数据失败：：：：：状态：" + a.readyState)
                }, a.open("GET", o, !0), a.send(), a
            }
            alert("GET请求问题！！！", t)
        }
    }


});