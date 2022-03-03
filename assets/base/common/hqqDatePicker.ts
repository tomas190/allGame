// /**
// * 日期组件
// */

import { _decorator, Component, Label, Node, Prefab } from 'cc';
import * as cc from "cc";
 const {ccclass, property} = _decorator;

 @ccclass('hqqDatePicker')
export default class hqqDatePicker extends Component{
     @property(Label)
     lbYearMonth:Label | null = null;
     @property(Label)
     lbYearMonth2:Label | null = null;
     @property(Node)
     ndDays:Node | null = null;
     @property(Node)
     ndDays2:Node | null = null;
     @property(Prefab)
     pfbDay:Prefab | null = null;
     date:Date = null;
     year:number = null;
     month:number = null;
     day:number = null;
     year2:number = null;
     month2:number = null;
     day2:number = null;
     selectyear:number = null;
     selectmonth:number = null;
     selectday:number = null;
     selectyear2:number = null;
     selectmonth2:number = null;
     selectday2:number = null;
     pfgListDay:Array<Node> = [];
     pfgListDay2:Array<Node> = [];
     cb:Function = null;
     onLoad () {
        this.initData();
        this.updateDate();
    }
    initData() {
        this.date = this.date ? this.date : new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();

        this.pfgListDay = [];
        for (let i = 0; i < 31; ++i) {
        let node = cc.instantiate(this.pfbDay);
        node.parent = this.ndDays;
        this.pfgListDay.push(node);

        let node2 = cc.instantiate(this.pfbDay);
        node2.parent = this.ndDays2;
        this.pfgListDay2.push(node2);
        }
    }
    // 设置显示的日志，默认为当前日期
    setDate(year, month, day) {
        this.date = new Date(year, month, day);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();

        this.updateDate();
    }
    updateDate () {
        this.lbYearMonth.string = cc.js.formatStr("%s年%s月", this.year, this.month + 1);

        this.month2 = this.month;
        this.year2 = this.year;
        if (this.month2 > 0) {
        this.month2 -= 1;
        } else {
        this.month2 = 11;
        this.year2 -= 1;
        }

        this.lbYearMonth2.string = cc.js.formatStr("%s年%s月", this.year2, this.month2 + 1);

        let date = new Date(this.year, this.month+1, 0);
        let totalDays = date.getDate();
        //当前年份月份 第一天周几
        let yymmdd = this.year + ',' + (this.month + 1) + ', 01'
        var myDate = new Date(yymmdd);
        let fromWeek = myDate.getDay();

        cc.log("this.selectday=",this.selectday);
        for (let i = 0; i < this.pfgListDay.length; ++i) {
        let node = this.pfgListDay[i];
        if (i < totalDays) {
        node.active = true;
        let index = fromWeek + i;
        let row = Math.floor(index / 7);
        let col = index % 7;
        let x = -(this.ndDays.getComponent(cc.UITransform).width - node.getComponent(cc.UITransform).width) * 0.5 + col * node.getComponent(cc.UITransform).width;
        let y = (this.ndDays.getComponent(cc.UITransform).height - node.getComponent(cc.UITransform).height) * 0.5 - row * node.getComponent(cc.UITransform).height;
        node.setPosition(x, y);
        let script = node.getComponent("hqqItemDay");
        let cansecondselect = false;

        if( this.selectmonth === this.month && this.selectyear === this.year && ( i + 1 >= this.selectday-2 && i +1 <= this.selectday + 2 ) ){
        cansecondselect = true;
        }
        if( this.selectday - 1 <= 0 ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 0) {
        tempmonth -= 1;
        } else {
        tempmonth = 11;
        tempyear -= 1;
        }
        let tempdate = new Date(tempyear, tempmonth+1, 0);
        let temptotalDays = tempdate.getDate();
        if( i + 1 === temptotalDays && tempmonth === this.month && tempyear === this.year ){
        cansecondselect = true;
        }
        }
        if( this.selectday - 2 <= 0 ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 0) {
        tempmonth -= 1;
        } else {
        tempmonth = 11;
        tempyear -= 1;
        }
        if( this.selectday - 1 <= 0 ){
        let tempdate = new Date(tempyear, tempmonth+1, 0);
        let temptotalDays = tempdate.getDate()-1;
        if( i + 1 === temptotalDays && tempmonth === this.month && tempyear === this.year ){
        cansecondselect = true;
        }
        } else{
        let tempdate = new Date(tempyear, tempmonth+1, 0);
        let temptotalDays = tempdate.getDate();
        if( i + 1 === temptotalDays && tempmonth === this.month && tempyear === this.year ){
        cansecondselect = true;
        }
        }
        }
        let selectdate = new Date(this.selectyear, this.selectmonth+1, 0);
        let selcttotalDays = selectdate.getDate();
        if( this.selectday + 1 > selcttotalDays ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 11 ) {
        tempmonth = 0;
        tempyear += 1;
        } else {
        tempmonth += 1;
        }
        if( i + 1 === 1 && tempmonth === this.month && tempyear === this.year ){
        cansecondselect = true;
        }
        }
        if( this.selectday + 2 > selcttotalDays ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 11 ) {
        tempmonth = 0;
        tempyear += 1;
        } else {
        tempmonth += 1;
        }
        if( this.selectday + 1 > selcttotalDays ){
        if( i + 1 === 2 && tempmonth === this.month && tempyear === this.year ){
        cansecondselect = true;
        }
        } else{
        if( i + 1 === 1 && tempmonth === this.month && tempyear === this.year ){
        cansecondselect = true;
        }
        }
        }
        script.setDay(i,this.year,this.month, i + 1, this.selectday === i + 1 && this.selectmonth === this.month && this.selectyear === this.year, cansecondselect , (selIndex, selYear, selMonth, selDay,issecondselect)=>{
        if(issecondselect){
        this.selectyear2 = selYear;
        this.selectmonth2 = selMonth;
        this.selectday2 = selDay;
        this.onClickClose();
        } else{
        this.selectyear = selYear;
        this.selectmonth = selMonth;
        this.selectday = selDay;
        this.updateDate();
        }
        });
        } else {
        node.active = false;
        }
        }

        let date2 = new Date(this.year2, this.month2+1, 0);
        let totalDays2 = date2.getDate();
        //当前年份月份 第一天周几
        let yymmdd2 = this.year2 + ',' + (this.month2 + 1) + ', 01'
        let myDate2 = new Date(yymmdd2);
        let fromWeek2 = myDate2.getDay();
        for (let i = 0; i < this.pfgListDay2.length; ++i) {
        let node = this.pfgListDay2[i];
        if (i < totalDays2) {
        node.active = true;
        let index = fromWeek2 + i;
        let row = Math.floor(index / 7);
        let col = index % 7;
        let x = -(this.ndDays2.getComponent(cc.UITransform).width - node.getComponent(cc.UITransform).width) * 0.5 + col * node.getComponent(cc.UITransform).width;
        let y = (this.ndDays2.getComponent(cc.UITransform).height - node.getComponent(cc.UITransform).height) * 0.5 - row * node.getComponent(cc.UITransform).height;
        node.setPosition(x, y);
        let script = node.getComponent("hqqItemDay");
        let cansecondselect2 = false;

        if( this.selectmonth === this.month2 && this.selectyear === this.year2 && ( i + 1 >= this.selectday-2 && i +1 <= this.selectday + 2 ) ){
        cansecondselect2 = true;
        }
        if( this.selectday - 1 <= 0 ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 0) {
        tempmonth -= 1;
        } else {
        tempmonth = 11;
        tempyear -= 1;
        }
        let tempdate = new Date(tempyear,tempmonth+1 , 0);
        let temptotalDays = tempdate.getDate();
        if( i + 1 === temptotalDays && tempmonth === this.month2 && tempyear === this.year2 ){
        cansecondselect2 = true;
        }
        }
        if( this.selectday - 2 <= 0 ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 0) {
        tempmonth -= 1;
        } else {
        tempmonth = 11;
        tempyear -= 1;
        }
        if( this.selectday - 1 <= 0 ){
        let tempdate = new Date(tempyear, tempmonth+1, 0);
        let temptotalDays = tempdate.getDate()-1;
        cc.log("temptotalDays=",temptotalDays , "  i+1=",i)
        if( i + 1 === temptotalDays && tempmonth === this.month2 && tempyear === this.year2 ){
        cansecondselect2 = true;
        }
        } else{
        let tempdate = new Date(tempyear, tempmonth+1, 0);
        let temptotalDays = tempdate.getDate();
        if( i + 1 === temptotalDays && tempmonth === this.month2 && tempyear === this.year2 ){
        cansecondselect2 = true;
        }
        }
        }
        let selectdate = new Date(this.selectyear, this.selectmonth+1, 0);
        let selcttotalDays = selectdate.getDate();
        if( this.selectday + 1 > selcttotalDays ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 11 ) {
        tempmonth = 0;
        tempyear += 1;
        } else {
        tempmonth += 1;
        }
        if( i + 1 === 1 && tempmonth === this.month2 && tempyear === this.year2 ){
        cansecondselect2 = true;
        }
        }
        if( this.selectday + 2 > selcttotalDays ){
        let tempmonth = this.selectmonth;
        let tempyear = this.selectyear;
        if (tempmonth > 11 ) {
        tempmonth = 0;
        tempyear += 1;
        } else {
        tempmonth += 1;
        }
        if( this.selectday + 1 > selcttotalDays ){
        if( i + 1 === 2 && tempmonth === this.month2 && tempyear === this.year2 ){
        cansecondselect2 = true;
        }
        } else{
        if( i + 1 === 1 && tempmonth === this.month2 && tempyear === this.year2 ){
        cansecondselect2 = true;
        }
        }
        }
        script.setDay(i, this.year2,this.month2, i + 1,this.selectday === i + 1 && this.selectmonth === this.month2 && this.selectyear === this.year2, cansecondselect2 , (selIndex, selYear, selMonth, selDay,issecondselect)=>{
        if(issecondselect){
        this.selectyear2 = selYear;
        this.selectmonth2 = selMonth;
        this.selectday2 = selDay;
        this.onClickClose();
        } else{
        this.selectyear = selYear;
        this.selectmonth = selMonth;
        this.selectday = selDay;
        this.updateDate();
        }
        });
        } else {
        node.active = false;
        }
        }
    }
    onClickLeft () {
        if (this.month > 0) {
        this.month -= 1;
        } else {
        this.month = 11;
        this.year -= 1;
        }

        if (this.month2 > 0) {
        this.month2 -= 1;
        } else {
        this.month2 = 11;
        this.year2 -= 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    }
    onClickRight () {
        if (this.month < 11) {
        this.month += 1;
        } else {
        this.month = 0;
        this.year += 1;
        }
        if (this.month2 < 11) {
        this.month2 += 1;
        } else {
        this.month2 = 0;
        this.year2 += 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    }
    // 设置选中日期之后的回调
    setPickDateCallback(cb) {
        this.cb = cb;
    }
    onClickClose () {
        if (this.cb) {
        this.cb(this.selectyear, this.selectmonth+1, this.selectday,this.selectyear2, this.selectmonth2+1, this.selectday2);
        }
        this.node.destroy()
    }
    onClickToday(){
        this.selectyear = this.year;
        this.selectmonth = this.month;
        this.selectday = this.day;
        this.selectyear2 = this.year;
        this.selectmonth2 = this.month;
        this.selectday2 = this.day;
        this.onClickClose();
    }
    onClickYesterday(){
        let nowtimemap = new Date(this.year,this.month,this.day).getTime()
        let date = new Date(nowtimemap-(86400 * 1000));
        this.selectyear = date.getFullYear();
        this.selectmonth = date.getMonth();
        this.selectday = date.getDate();

        this.selectyear2 = date.getFullYear();
        this.selectmonth2 = date.getMonth();
        this.selectday2 = date.getDate();
        this.onClickClose();
    }
    onClickNearThree(){
        let nowtimemap = new Date(this.year,this.month,this.day).getTime()
        let date = new Date(nowtimemap-(86400 * 1000*3));
        let date2 = new Date(nowtimemap-(86400 * 1000));
        this.selectyear = date.getFullYear();
        this.selectmonth = date.getMonth();
        this.selectday = date.getDate();

        this.selectyear2 = date2.getFullYear();
        this.selectmonth2 = date2.getMonth();
        this.selectday2 = date2.getDate();
        this.onClickClose();
    }
}