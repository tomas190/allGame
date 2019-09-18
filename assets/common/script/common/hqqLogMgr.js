/*
 * @Author: burt
 * @Date: 2019-08-01 11:28:43
 * @LastEditors: burt
 * @LastEditTime: 2019-09-18 14:02:06
 * @Description: log日志 管理器
 */

let hqqHttp = require("hqqHttp");
let gHandler = require("gHandler");
let logManager = {
    isRealTimeLog: true, // 是否在控制台实时打印
    logMaxLine: 1000, // 最大的打印行数
    depth: 0,
    parentSizes: [0],
    currentResult: '',
    output: '', // 全部日志
    eoutput: '', // 错误日志
    serverUrl: null,
    tag: "\r\n",
    logpath: "",
    /**
     * 初始化
     */
    init: function () {
        if (cc.sys.isBrowser) {
            this.output = JSON.parse(cc.sys.localStorage.getItem('log'))
            this.eoutput = JSON.parse(cc.sys.localStorage.getItem('elog'))
        } else {
            this.logpath = jsb.fileUtils.getWritablePath() + "log";
            if (jsb.fileUtils.isDirectoryExist(this.logpath)) {
                this.output = jsb.fileUtils.getStringFromFile(this.logpath + "/logtemp.txt")
                this.eoutput = jsb.fileUtils.getStringFromFile(this.logpath + "/elogtemp.txt")
            } else {
                jsb.fileUtils.createDirectory(jsb.fileUtils.getWritablePath() + "log");
            }
        }
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
    /** 向服务器发送日志 */
    send: function (logstr, islog) {
        if (gHandler.gameGlobal.token != "") {
            this.serverUrl = gHandler.appGlobal.server + "/Game/User/log";
            let data = {
                token: gHandler.gameGlobal.token,
                type: islog ? "log" : "error",
                id: gHandler.gameGlobal.player.id,
                msg: logstr,
                package_name: gHandler.appGlobal.packgeName,
            }
            this.serverUrl && hqqHttp.sendRequestLogPost(this.serverUrl, data, null, (bool, filepath) => {
                if (bool) {
                    if (cc.sys.isBrowser) {
                        console.log("日志发送成功")
                    } else {
                        if (islog) {
                            jsb.fileUtils.removeFile(this.logpath + "/logtemp.txt")
                        } else {
                            jsb.fileUtils.removeFile(this.logpath + "/elogtemp.txt")
                        }
                    }
                } else {
                    if (cc.sys.isBrowser) {
                        console.log("日志发送失败")
                    } else {
                        if (islog) {
                            jsb.fileUtils.writeStringToFile(logstr, this.logpath + "/log" + this.getNowTime() + ".txt")
                        } else {
                            jsb.fileUtils.writeStringToFile(logstr, this.logpath + "/elog" + this.getNowTime() + ".txt")
                        }
                    }
                }
            });
            if (cc.sys.isNative) {
                let files = jsb.fileUtils.listFiles(this.logpath);
                for (let i = 0; i < files.length; i++) {
                    if (files[i].indexOf("logtemp") != -1 || files[i].indexOf("elogtemp") != -1) {
                        let str = jsb.fileUtils.getStringFromFile(files[i])
                        let iselog = files[i].indexOf("elog") != -1
                        let data = {
                            token: gHandler.gameGlobal.token,
                            type: iselog ? "error" : "log",
                            id: gHandler.gameGlobal.player.id,
                            msg: str,
                            package_name: gHandler.appGlobal.packgeName,
                        }
                        this.serverUrl && hqqHttp.sendRequestLogPost(this.serverUrl, data, files[i], (bool, filepath) => {
                            if (bool) {
                                if (cc.sys.isBrowser) {
                                    console.log("日志发送成功")
                                } else {
                                    jsb.fileUtils.removeFile(filepath)
                                }
                            }
                        });
                    }
                }
            }
        } else {
            if (cc.sys.isBrowser) {
                console.log("未请求到token")
            } else {
                if (islog) {
                    jsb.fileUtils.writeStringToFile(logstr, this.logpath + "/log" + this.getNowTime() + ".txt")
                } else {
                    jsb.fileUtils.writeStringToFile(logstr, this.logpath + "/elog" + this.getNowTime() + ".txt")
                }
            }
        }
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
        this.output += this.getNowTime() + ":" + data + this.tag;
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
            this.eoutput += this.getNowTime() + ":" + addition + this.tag;
            this.elogCheck();
        }
    },
    saveLog: function () {
        if (cc.sys.isBrowser) {
            cc.sys.localStorage.setItem("log", JSON.stringify(this.output))
            cc.sys.localStorage.setItem("elog", JSON.stringify(this.eoutput))
        } else {
            cc.fileUtils.writeStringToFile(this.output, this.logpath + "/logtemp.txt")
            cc.fileUtils.writeStringToFile(this.eoutput, this.logpath + "/elogtemp.txt")
        }
    },
    getNowTime: function () {
        let date = new Date();
        let time = "" + date.getMonth() + "-";
        time += date.getDate() + "-";
        time += date.getHours() + "-";
        time += date.getMinutes() + "-";
        time += date.getSeconds();
        return time;
    },
    logCheck: function () {
        let lines = this.output.split(this.tag);
        if (lines.length > this.logMaxLine) {
            let tempoutput = this.output + "endTime-" + this.getNowTime();
            this.send(tempoutput, true);
            this.output = "startTime-" + this.getNowTime() + this.tag;
        }
    },
    elogCheck: function () {
        let lines = this.eoutput.split(this.tag);
        if (lines.length > this.logMaxLine) {
            let tempoutput = this.eoutput + "endTime-" + this.getNowTime();
            this.send(tempoutput);
            this.eoutput = "startTime-" + this.getNowTime() + this.tag;
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
                let currentResult = '{' + this.tag;
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
                            currentResult += this.tag;
                        } else {
                            if (i != this.parentSizes[this.depth] - 1) currentResult += ',';
                            currentResult += this.tag;
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
                        this.currentResult += this.tag + this.indentsForDepth(this.depth);
                        add = true;
                    }
                    var subresult = this.formatType(subtype, obj[i]);
                    if (subresult) {
                        this.currentResult += subresult;
                        if (i != this.parentSizes[this.depth] - 1) this.currentResult += ', ';
                        if (subtype == 'Array') this.currentResult += this.tag;
                    } else {
                        if (i != this.parentSizes[this.depth] - 1) this.currentResult += ', ';
                        if (subtype != 'Object') this.currentResult += this.tag;
                        else if (i == this.parentSizes[this.depth] - 1) this.currentResult += this.tag;
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
                // var lines = obj.split(this.tag);
                // for (var i = 0; i < lines.length; i++) {
                //     if (lines[i].match(/\}/)) this.depth--;
                //     this.currentResult += this.indentsForDepth(this.depth);
                //     if (lines[i].match(/\{/)) this.depth++;
                //     this.currentResult += lines[i] + this.tag;
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
        var lines = log.split(this.tag);
        if (lines.length > maxLines) {
            lines = lines.slice(lines.length - maxLines);
        }
        return lines.join(this.tag);
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