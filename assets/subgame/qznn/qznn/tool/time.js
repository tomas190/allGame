cc.Class({
    extends: cc.Component,

    properties: { openTime: !1 },

    onLoad: function() {
        this._LeftCount = 0,
        this.time = this.node,
        this.timeCount = this.time.getComponent(cc.Label)
    },

    onEnable: function() {
        this.openTime
    },

    setGameTimer: function(e) {
        var t = this,
            i = e.TimeCount;
        this.updateTimer && (this.unschedule(this.updateTimer),
            this.updateTimer = null)
        if (this.flag = e.flag, this.onTimerMessageFunc_ = e.onTimerMessageFunc, this.onTimerMessageENDFunc_ = e.onTimerMessageENDFunc.bind(e.obj), this.node.active = this.flag, !i || i <= 0)
            return console.log("error time***************!"), void(this.node.active = !1);
        this._LeftCount = i,
        this.timeCount.string = i,
        this.updateTimer = function() {
            t.onUpdateTimer()
        },
        this.schedule(this.updateTimer, 1);
    },

    getRemainTimer: function() { return this._LeftCount },

    hideTimer: function() { this.node.opacity = 0 },

    showTimer: function() { this.node.opacity = 255 },

    onUpdateTimer: function() {
        this._LeftCount--;
        this._LeftCount < 0 ? this.updateTimer && (this.unschedule(this.updateTimer),
            this.updateTimer = null) : (this.timeCount.string = this._LeftCount, this._LeftCount <= 0 && (this.node.active = !1),
            this.onTimerMessageFunc_ && this.onTimerMessageFunc_(this._LeftCount))
            if(this._LeftCount<=0) this.onTimerMessageENDFunc_ && this.onTimerMessageENDFunc_(this._LeftCount);
    },

    onKillTimer: function() {
        this._LeftCount = 0;
        this.node.active = false;
        this.timeCount.string = "";
    }
})