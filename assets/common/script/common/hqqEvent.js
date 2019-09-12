/*
 * @Author: burt
 * @Date: 2019-09-11 13:46:20
 * @LastEditors: burt
 * @LastEditTime: 2019-09-12 10:14:53
 * @Description: 
 */

let hqqEvent = {
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