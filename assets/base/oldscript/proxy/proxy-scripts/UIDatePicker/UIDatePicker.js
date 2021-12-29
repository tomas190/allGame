/** 
 * 日期组件
 */
var Database = require("../public_script/Database");
cc.Class({
    extends: cc.Component,

    properties: {
        lbYearMonth: cc.Label,
        ndDays: cc.Node,
        pfbDay: cc.Prefab,
        curtData: {
            default: null,
            type: cc.Label,
        }
    },

    onLoad() {
        this.initData();
        this.updateDate();
    },

    initData() {
        cc.log('initData', this.year, 'month', this.month, 'day', this.day);
        this.date = this.date ? this.date : new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();

        this.pfgListDay = [];
        for (let i = 0; i < 31; ++i) {
            let node = cc.instantiate(this.pfbDay);
            node.parent = this.ndDays;
            this.pfgListDay.push(node);
        }
    },

    // 设置显示的日志，默认为当前日期
    setDate(year, month, day) {
        cc.log('setDate', this.year, 'month', this.month, 'day', this.day);
        this.date = new Date(year, month, day);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();


    },

    updateDate() {
        this.lbYearMonth.string = cc.js.formatStr("%s年%s月", this.year, this.month);
        // first_date 开始时间(2020 - 05 - 18)
        this.curtData.string = this.year + "/" + this.month + "/" + this.day
        Database.first_date = this.year + "-" + this.month + "-" + this.day;
        cc.log(Database.first_date);
        cc.log('updateDateyear', this.year, this.month, this.day);
        let date = new Date(this.year, this.month, 0);
        //规定月天数
        let totalDays = date.getDate();
        //当前年份月份 第一天周几
        let yymmdd = this.year +','+ this.month+', 01'
        var myDate = new Date(yymmdd);
        let fromWeek = myDate.getDay();
        console.log('fromWeek=====',fromWeek,totalDays);
        for (let i = 0; i < this.pfgListDay.length; ++i) {
            let node = this.pfgListDay[i];
            if (i < totalDays) {
                node.active = true;
                let index = fromWeek + i;
                let row = Math.floor(index / 7);
                let col = (index % 7);
                let x = -(this.ndDays.width - node.width) * 0.5 + col * node.width;
                let y = (this.ndDays.height - node.height) * 0.5 - row * node.height;
                node.setPosition(x, y);
                let script = node.getComponent("UIItemDay");
                script.setDay(i, i + 1, this.day === i + 1, (selIndex, selDay) => {
                    this.day = selDay;
                    this.updateDate();
                });
            } else {
                node.active = false;
            }
        }
    },

    onClickLeft() {
        console.log('onClickLeft');

        if (this.month > 1) {
            this.month -= 1;
        } else {
            this.month = 12;
            this.year -= 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();

    },

    onClickRight() {
        console.log('onClickRight');
        if (this.month < 12) {
            this.month += 1;
        } else {
            this.month = 1;
            this.year += 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    },

    // 设置选中日期之后的回调
    setPickDateCallback(cb) {
        this.cb = cb;

    },
    // confirm(eve) {

    //     let node =eve.target.parent.parent

    //     node.active = false;
    // },
    onClickClose() {

        if (this.cb) {
            this.cb(this.year, this.month, this.day);
        }
        this.node.parent = null;
    },
});
