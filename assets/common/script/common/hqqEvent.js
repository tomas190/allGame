/*
 * @Author: burt
 * @Date: 2019-09-11 13:46:20
 * @LastEditors: burt
 * @LastEditTime: 2019-10-14 09:49:34
 * @Description: 事件派发中心
 */

let hqqEvent = {
    hotFail: 0, // 热更失败
    hotCheckup: 1, // 热更检查
    hotProgress: 2, // 热更过程
    hotFinish: 3, // 热更结束

    setPlayerinfo: 4, // 设置玩家数据
    refreshPlayerinfo: 5, // 刷新玩家数据显示
    setnoticelist: 6, // 设置公告列表数据
    refreshHallTips: 7, // 刷新大厅提示
    addSliderNotice: 8, // 显示滚动公告
    showSamlllayer: 9, // 显示小的设置界面  修改头像 绑定支付宝 修改昵称 切换账号
    showBiglayer: 10, // 显示大的设置界面 重置密码 绑定银行卡 注册正式账号
    showTip: 11, // 显示浮动提示框
    showInfo: 12, // loading 页显示

    onReceiveNologin: 13, // 
    onReceiveBroadcast: 14, // 
    onReceiveLogin: 15, // 
    onReceiveNotice: 16, // 
    onReceiveLoginout: 17, // 
    onReceiveChangeBanlance: 18, // 

    getPayInfo: 19,  // 主动获取支付宝银行卡绑定信息

    init() {
        this.mapReciver = {};
        return this;
    },
    /**
     * 注册监听事件
     * @param event 事件类型
     * @param className 响应函数所属类名
     * @param callback 响应函数
     */
    register: function (event, className, callback) {
        if (!this.mapReciver[event]) {
            this.mapReciver[event] = {};
        }
        this.mapReciver[event][className] = callback
    },

    /**
     * 取消监听事件
     * @param kind 事件类型
     * @param className 响应函数所属类名
     */
    unregister: function (event, className) {
        if (this.mapReciver[event] && this.mapReciver[event][className]) {
            delete this.mapReciver[event][className];
        }
    },

    /**
     * 派发事件
     * @param kind 事件类型
     * @param data 传递的数据 可传递多个参数
     */
    dispatch: function (event, data) {
        if (this.mapReciver[event]) {
            for (let className in this.mapReciver[event]) {
                let paralist = []
                for (let i = 1; i < arguments.length; i++) {
                    paralist.push(arguments[i])
                }
                this.mapReciver[event][className](...paralist)
            }
        }
    },
}

module.exports = hqqEvent