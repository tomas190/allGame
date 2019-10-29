/*
 * @Author: burt
 * @Date: 2019-09-11 13:46:20
 * @LastEditors: burt
 * @LastEditTime: 2019-10-29 15:54:55
 * @Description: 事件派发中心
 */

let hqqEvent = {
    hotFail: 0, // 热更失败
    hotCheckup: 1, // 热更检查
    hotProgress: 2, // 热更过程
    hotFinish: 3, // 热更结束

    setPlayerinfo: 10, // 设置玩家数据
    refreshPlayerinfo: 11, // 刷新玩家数据显示
    setnoticelist: 12, // 设置公告列表数据
    addSliderNotice: 13, // 显示滚动公告

    showSamlllayer: 20, // 显示小的设置界面  修改头像 绑定支付宝 修改昵称 切换账号
    showBiglayer: 21, // 显示大的设置界面 重置密码 绑定银行卡 注册正式账号
    showTip: 22, // 显示浮动提示框
    showLoadingInfo: 23, // loading 页显示
    showRegister: 24, // 注册界面
    showPerson: 25, // 个人信息界面
    showNotice: 26, // 公告界面
    showCongratulation: 27, // 恭喜获得金币
    showPayScene: 28, // 显示充提界面
    showConsole: 29, // 显示console

    onReceiveNologin: 30, // 
    onReceiveBroadcast: 31, // 
    onReceiveLogin: 32, // 
    onReceiveNotice: 33, // 
    onReceiveLoginout: 34, // 
    onReceiveChangeBanlance: 35, // 

    getPayInfo: 40,  // 主动获取支付宝银行卡绑定信息

    refreshHallTips: 50, // 刷新大厅提示 广告，聊天，收益

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