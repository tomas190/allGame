/*
 * @Author: burt
 * @Date: 2019-08-01 11:28:43
 * @LastEditors: burt
 * @LastEditTime: 2019-09-03 13:25:10
 * @Description: log日志 管理器
 */

let hqqHttp = require("hqqHttp");
let logManager = {
    isRealTimeLog: true, // 是否在控制台实时打印
    logMaxLine: 1000, // 最大的打印行数
    depth: 0,
    parentSizes: [0],
    currentResult: '',
    output: '', // 全部日志
    serverUrl: null,
    /**
     * 初始化
     */
    init: function (logserver) {
        this.serverUrl = logserver;
        this.key = "Logtxt.js";
        window.localStorage.setItem(this.key, "");
        this.output = window.localStorage.getItem(this.key);
        window.addEventListener('error', (e) => {
            // console.log("error")
            this.logerror(e);
        })
        window.addEventListener('unhandledrejection', (e) => {
            // console.log("unhandledrejection")
            this.logerror(e);
        })
        return this;
    },
    /**
     * 正常打印，注意：只会打印字符串
     * @return: 
     */
    log: function () {
        let data = ""
        for (let i = 0; i < arguments.length; i++) {
            data += " " + arguments[i]
        }
        this.isRealTimeLog && console.log(data);
        this.output += this.getNowTime() + ":log:" + data + "\n";
        this.logCheck();
    },
    /**
     * 报错信息捕获打印
     * @param {ErrorEvent} data
     * @return: 
     */
    logerror: function (data) {
        this.isRealTimeLog && console.log(data);
        var type = this.determineType(data);
        if (type != null) {
            var addition = this.formatType(type, data);
            this.output += this.getNowTime() + ":error:" + addition + "\n";
        }
        this.logCheck();
    },
    saveLog: function () {
        window.localStorage.setItem(this.key, this.output);
    },
    // setLogFunc: function (func) {
    //     this.log = func;
    // },
    // serCCLogFunc: function (func) {
    //     this.cclog = func;
    // },
    getLog: function () {
        let saved = window.localStorage.getItem(this.key);
        if (saved) {
            saved = JSON.parse(saved);
            this.saved = saved;
            return saved;
        }
    },
    getNowTime: function () {
        let date = new Date();
        let time = "" + date.getMonth() + "/";
        time += date.getDate() + "/";
        time += date.getHours() + "/";
        time += date.getMinutes() + "/";
        time += date.getSeconds();
        return time;
    },
    logCheck: function () {
        let lines = this.output.split("\n");
        if (lines.length > this.logMaxLine) {
            // todo log足够多直接发送至log服务器
            console.log("log足够多直接发送至log服务器")
            let tempoutput = this.output + "endTime-" + this.getNowTime();
            this.serverUrl && hqqHttp.sendRequestPost(this.serverUrl, tempoutput);
            this.output = "startTime-" + this.getNowTime() + "\n";
            window.localStorage.setItem(this.key, this.output);
        } else {
            // this.saveLog();
        }
    },

    determineType: function (object) {
        if (object != null) {
            var typeResult;
            var type = typeof object;
            if (type == 'object') {
                var len = object.length;
                if (len == null) {
                    if (typeof object.getTime == 'function') {
                        typeResult = 'Date';
                    }
                    else if (typeof object.test == 'function') {
                        typeResult = 'RegExp';
                    }
                    else {
                        typeResult = 'Object';
                    }
                } else {
                    typeResult = 'Array';
                }
            } else {
                typeResult = type;
            }
            return typeResult;
        } else {
            return null;
        }
    },

    formatType: function (type, obj) {
        if (this.maxDepth && this.depth >= this.maxDepth) {
            return '... (max-depth reached)';
        }

        switch (type) {
            case 'Object':
                let currentResult = '{\n';
                this.depth++;
                this.parentSizes.push(this.objectSize(obj));
                var i = 0;
                for (var prop in obj) {
                    currentResult += this.indentsForDepth(this.depth);
                    if (prop == "filename" || prop == "message") { // 只截取取报错信息中的这两个
                        currentResult += prop + ': ';
                        var subtype = this.determineType(obj[prop]);
                        var subresult = this.formatType(subtype, obj[prop]);
                        if (subresult) {
                            currentResult += subresult;
                            if (i != this.parentSizes[this.depth] - 1) currentResult += ',';
                            currentResult += '\n';
                        } else {
                            if (i != this.parentSizes[this.depth] - 1) currentResult += ',';
                            currentResult += '\n';
                        }
                    }
                    i++;
                }
                this.depth--;
                this.parentSizes.pop();
                currentResult += this.indentsForDepth(this.depth);
                currentResult += '}';
                if (this.depth == 0) {
                    this.currentResult += currentResult;
                    return this.currentResult;
                }
                break;
            case 'Array':
                this.currentResult += '[';
                this.depth++;
                this.parentSizes.push(obj.length);
                let add = false;
                for (var i = 0; i < obj.length; i++) {
                    var subtype = this.determineType(obj[i]);
                    if (subtype == 'Object' || subtype == 'Array') {
                        this.currentResult += '\n' + this.indentsForDepth(this.depth);
                        add = true;
                    }
                    var subresult = this.formatType(subtype, obj[i]);
                    if (subresult) {
                        this.currentResult += subresult;
                        if (i != this.parentSizes[this.depth] - 1) this.currentResult += ', ';
                        if (subtype == 'Array') this.currentResult += '\n';
                    } else {
                        if (i != this.parentSizes[this.depth] - 1) this.currentResult += ', ';
                        if (subtype != 'Object') this.currentResult += '\n';
                        else if (i == this.parentSizes[this.depth] - 1) this.currentResult += '\n';
                    }
                }
                this.depth--;
                this.parentSizes.pop();
                add && (this.currentResult += this.indentsForDepth(this.depth));
                this.currentResult += ']';
                if (this.depth == 0) return this.currentResult;
                break;
            case 'function':
                // obj += '';
                // var lines = obj.split('\n');
                // for (var i = 0; i < lines.length; i++) {
                //     if (lines[i].match(/\}/)) this.depth--;
                //     this.currentResult += this.indentsForDepth(this.depth);
                //     if (lines[i].match(/\{/)) this.depth++;
                //     this.currentResult += lines[i] + '\n';
                // }
                return this.currentResult;
                break;
            case 'RegExp':
                return '/' + obj.source + '/';
                break;
            case 'Date':
            case 'string':
                if (this.depth > 0 || obj.length == 0) {
                    return '"' + obj + '"';
                } else {
                    return obj;
                }
            case 'boolean':
                if (obj) return 'true';
                else return 'false';
            case 'number':
                return obj + '';
                break;
        }
    },
    trimLog: function (log, maxLines) {
        var lines = log.split('\n');
        if (lines.length > maxLines) {
            lines = lines.slice(lines.length - maxLines);
        }
        return lines.join('\n');
    },
    objectSize: function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    },
    indentsForDepth: function (depth) {
        var str = '';
        for (var i = 0; i < depth; i++) {
            str += '\t';
        }
        return str;
    }
}

module.exports = logManager;