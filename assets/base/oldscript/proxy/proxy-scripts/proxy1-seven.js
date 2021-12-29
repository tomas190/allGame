let commonVal = require("./public_script/proxy-http");
var Database = require("./public_script/Database");
let gHandler = require("gHandler");

cc.Class({
    extends: cc.Component,
    properties: {
        grid: {//单个表格
            type: cc.Node,
            default: null,
        },
        scroll_view: {//表格视窗
            type: cc.Node,
            default: null,
        },
        hj: {//合计表格
            type: cc.Node,
            default: null,
        },

    },
    onLoad() {

    },

    setview() {
        cc.log('进来了', Database.p1_seven_info);
        this.scroll_view.removeAllChildren()
        let keys = [];//得到所有数据的key
        for (var key in Database.p1_seven_info) {
            keys.push(key)
        }
        keys.sort(function (a, b) {//排序
            return a < b ? 1 : -1;
        })

        //单项业绩    棋牌 彩票 体育 视讯 单日总计
        let dr_qp = 0
        let dr_cp = 0
        let dr_ty = 0
        let dr_sx = 0
        let dr_hy = 0
        //合计业绩 棋牌 彩票 体育 视讯 总计
        let hj_qp = 0
        let hj_cp = 0
        let hj_ty = 0
        let hj_sx = 0
        let hj_zy = 0

        //开始遍历
        for (let i = 0; i < keys.length; i++) {
            //每次遍历单日部分清空
            dr_qp = 0
            dr_cp = 0
            dr_ty = 0
            dr_sx = 0
            dr_hy = 0
            let arr = Database.p1_seven_info[keys[i]]

            //遍历 arr 计算单日数据
            // 视讯团队业绩:   统计 game_id= 5b1f3a3cb76a591e7f25173   对应 bet_money 的值

            // 彩票团队业绩:  统计game_id= 569a62be7ff123m117d446aa  对应 bet_money 的值

            // 体育团队业绩:  统计 game_id= 5b1f3a3cb76a591e7f25179  对应bet_money 的值
            if (gHandler.app.pinpai == 'xinlong') {
                for (let a = 0; a < arr.length; a++) {
                    if (arr[a].game_id == '5b1f3a3cb76a591e7f25173') {
                        //视讯
                        dr_sx +=parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))  //乘百分比
                        hj_sx += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//乘百分比

                        dr_hy += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//单日总计
                        hj_zy += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//总计
                    } else if (arr[a].game_id == '569a62be7ff123m117d446aa') {
                        //彩票
                        dr_cp += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//乘百分比
                        hj_cp += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//乘百分比

                        dr_hy += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//单日总计
                        hj_zy += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//总计
                    } else if (arr[a].game_id == '5b1f3a3cb76a591e7f25179') {
                        //体育
                        dr_ty += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//乘百分比
                        hj_ty += arr[a].bet_money//乘百分比

                        dr_hy += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//单日总计
                        hj_zy += parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))//总计
                    } else {
                        cc.log('棋牌系列==========', arr[a].bet_money, '税后==========', arr[a].bet_money * Database.base_dividend_discount);
                        //棋牌
                        dr_qp += (parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))) * Database.base_dividend_discount//乘百分比
                        hj_qp += (parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))) * Database.base_dividend_discount//乘百分比

                        dr_hy += (parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))) * Database.base_dividend_discount//单日总计
                        hj_zy +=(parseFloat(arr[a].win_total)  + Math.abs(parseFloat(arr[a].lose_total))) * Database.base_dividend_discount//总计
                    }

                }
            } else {
                for (let a = 0; a < arr.length; a++) {
                    if (arr[a].game_id == '5b1f3a3cb76a591e7f25173') {
                        //视讯
                        dr_sx += arr[a].bet_money //乘百分比
                        hj_sx += arr[a].bet_money//乘百分比

                        dr_hy += arr[a].bet_money//单日总计
                        hj_zy += arr[a].bet_money//总计
                    } else if (arr[a].game_id == '569a62be7ff123m117d446aa') {
                        //彩票
                        dr_cp += arr[a].bet_money//乘百分比
                        hj_cp += arr[a].bet_money//乘百分比

                        dr_hy += arr[a].bet_money//单日总计
                        hj_zy += arr[a].bet_money//总计
                    } else if (arr[a].game_id == '5b1f3a3cb76a591e7f25179') {
                        //体育
                        dr_ty += arr[a].bet_money//乘百分比
                        hj_ty += arr[a].bet_money//乘百分比

                        dr_hy += arr[a].bet_money//单日总计
                        hj_zy += arr[a].bet_money//总计
                    } else {
                        cc.log('棋牌系列==========', arr[a].bet_money, '税后==========', arr[a].bet_money * Database.base_dividend_discount);
                        //棋牌
                        dr_qp += arr[a].bet_money * Database.base_dividend_discount//乘百分比
                        hj_qp += arr[a].bet_money * Database.base_dividend_discount//乘百分比

                        dr_hy += arr[a].bet_money * Database.base_dividend_discount//单日总计
                        hj_zy += arr[a].bet_money * Database.base_dividend_discount//总计
                    }

                }
            }

            let item = cc.instantiate(this.grid);//单日表格
            item.active = true;
            //日期
            cc.find("l1", item).getComponent(cc.Label).string = keys[i] + '';
            //ID
            cc.find("l2", item).getComponent(cc.Label).string = gHandler.gameGlobal.player.account_name;
            //棋牌
            cc.find("l3", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(dr_qp);
            //彩票
            cc.find("l4", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(dr_cp);
            //体育
            cc.find("l5", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(dr_ty);
            //视讯
            cc.find("l6", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(dr_sx);
            //合计
            cc.find("l7", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(dr_hy);
            this.scroll_view.addChild(item);


        }
        let item1 = cc.instantiate(this.hj);//合计表格
        item1.active = true;

        //棋牌
        cc.find("l1", item1).getComponent(cc.Label).string = Database.countCoinsShowLabel(hj_qp);
        //彩票
        cc.find("l2", item1).getComponent(cc.Label).string = Database.countCoinsShowLabel(hj_cp);
        //体育
        cc.find("l3", item1).getComponent(cc.Label).string = Database.countCoinsShowLabel(hj_ty);
        //视讯
        cc.find("l4", item1).getComponent(cc.Label).string = Database.countCoinsShowLabel(hj_sx);
        //合计
        cc.find("l5", item1).getComponent(cc.Label).string = Database.countCoinsShowLabel(hj_zy);
        this.scroll_view.addChild(item1);

    },
    onClose: function () {
        //音效
        Database.clickSound(Database.hall_sound)
        this.node.active = false;
        this.scroll_view.removeAllChildren()

    },

});
