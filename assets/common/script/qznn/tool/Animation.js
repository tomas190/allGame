var Animation = cc.Class({
    ctor: function() {},
    setGoldAnimation: function(e, t, i, a, o, n, s) {
        /**
         * e 是金币定位节点   
         * t是金币图集 
         * i是庄家头像 
         * a是输钱头像节点数组 
         * 或赢钱数组 
         * o是不是庄家 
         * n回调函数
         */
        if (null == a || a.length <= 0) return n && n(),
            void(s ? cc.gg.audioMgr.playSFX("sg_ss/game/drop_gold.mp3") : cc.gg.audioMgr.playSFX("paijiu/status/goldDrift.mp3"));
        for (var c = i.getPosition(), r = 0, l = 0; l < a.length; l++)
            for (var d = a[l].getPosition(), h = d, g = c, u = 0; u < 10; u++) {
                var m = new cc.Node;
                m.addComponent(cc.Sprite),
                    m.getComponent(cc.Sprite).spriteFrame = t,
                    o ? (h = d, g = c) : (h = c, g = d),
                    m.setPosition(h), e.addChild(m);
                var _ = [cc.v2(0, g.x), cc.v2(g.x, g.y), cc.v2(g.x, g.y)],
                    p = cc.bezierTo(.1 * u, _),
                    f = cc.sequence(p, cc.callFunc(function() {++r == 10 * a.length - 1 && (e.removeAllChildren(), n && n(), s ? cc.gg.audioMgr.playSFX("sg_ss/game/drop_gold.mp3") : cc.gg.audioMgr.playSFX("paijiu/status/goldDrift.mp3")) }));
                m.runAction(f)
            }
        if (s) cc.gg.audioMgr.playSFX("sg_ss/game/drop_gold.mp3");
        else { cc.gg.audioMgr.playSFX("drop_gold.mp3") }
    },
    viewGrabBankerAnimation: function(e, t, i, a) {
        if (t.length <= 1) a && a();
        else {
            var o = .1,
                n = 20;
            t.length <= 4 && (o = .2, n = 10);
            var s = 0,
                c = 0,
                r = cc.sequence(cc.delayTime(o), cc.callFunc(function() {
                    for (var e = 0; e < t.length; e++) t[e].active = !1;
                    n - 1 <= ++c ? t[i].active = !0 : t[s].active = !0, s++, s = parseInt(s % t.length)
                })),
                l = cc.sequence(cc.repeat(r, n), cc.delayTime(.5), cc.callFunc(function() {
                    for (var e = 0; e < t.length; e++) t[e].active = !1;
                    a && a()
                }));
            e.runAction(l)
        }
    },
    gainAndEffortByGoldRush: function(e, t, i) {
        for (var a = e.getPosition(), o = 0; o < t.length; o++) {
            var n = t[o],
                s = [cc.v2(0, a.x), cc.v2(a.x, a.y), cc.v2(a.x, a.y)],
                c = .5;
            1 < t.length && (c = .123 * (o + 1));
            var r = cc.bezierTo(c, s),
                l = cc.sequence(r, cc.callFunc(function() { i && i(), cc.gg.audioMgr.playSFX("paijiu/status/goldDrift.mp3") }));
            n.runAction(l)
        }
        cc.gg.audioMgr.playSFX("drop_gold.mp3")
    }
})
var c = null;
module.exports = {
    Init: function() {
        c = new Animation;
    },
    SetGoldAnimation: function(e, t, i, a, o, n, s) {
        c.setGoldAnimation(e, t, i, a, o, n, s)
    },
    ViewGrabBankerAnimation: function(e, t, i, a) {
        c.viewGrabBankerAnimation(e, t, i, a)
    },
    GainAndEffortByGoldRush: function(e, t, i) {
        c.gainAndEffortByGoldRush(e, t, i)
    }
}