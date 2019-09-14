/*
 * @Author: burt
 * @Date: 2019-07-29 16:40:03
 * @LastEditors: burt
 * @LastEditTime: 2019-09-14 12:30:36
 * @Description: http 
 */

let hqqHttp = {
    m_remoteUrl: "",

    sendRequestPost(urlto, param, callBack) {
        let str = JSON.stringify(param);
        let xhr = new XMLHttpRequest();
        let alreadyCallBack = false;
        let m_url = urlto || this.m_remoteUrl;
        // 异步请求
        xhr.open("POST", m_url, true); // 初始化一个请求
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            cc.log(xhr.readyState, xhr.status)
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText
                    // console.log("RemoteData", response)
                    if (callBack && !alreadyCallBack) {
                        callBack(response)
                        alreadyCallBack = true
                    }
                } else {
                    if (callBack && !alreadyCallBack) {
                        callBack(null)
                        alreadyCallBack = true
                    }
                }
            }
        }

        let timer = setTimeout(() => {
            if (callBack && !alreadyCallBack) {
                xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                callBack(null);
                alreadyCallBack = true;
            }
            clearTimeout(timer);
        }, 3000)

        xhr.send(str); // 发送请求，默认是异步请求，请求发送后立刻返回
    },

    sendRequestLogPost(urlto, param, filepath, callBack) {
        let str = JSON.stringify(param);
        let xhr = new XMLHttpRequest();
        let m_url = urlto;
        // 异步请求
        xhr.open("POST", m_url, true); // 初始化一个请求
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            cc.log(xhr.readyState, xhr.status)
            if (xhr.readyState == 4) {
                console.log(xhr.responseText)
                if (xhr.status >= 200 && xhr.status < 400) {
                    callBack && callBack(true, filepath)
                } else {
                    callBack && callBack(false)
                }
            }
        }
        let timer = setTimeout(() => {
            xhr.abort(); // 如果请求已经被发送，则立刻终止请求
            callBack && callBack(false)
            clearTimeout(timer);
        }, 3000)
        xhr.send(str); // 发送请求，默认是异步请求，请求发送后立刻返回
    },

    // sendRequestGet(urlto, param, callback) {
    //     let alreadyCallBack = false;
    //     let xhr = new XMLHttpRequest();
    //     let m_url = urlto || this.m_remoteUrl;
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4) {
    //             if (xhr.status >= 200 && xhr.status < 400) {
    //                 try {
    //                     if (callback && !alreadyCallBack) {
    //                         let response = JSON.parse(xhr.responseText);
    //                         console.log(response);
    //                         callback(response);
    //                         alreadyCallBack = true;
    //                     }
    //                 } catch (e) {
    //                     console.log("catch:" + e);
    //                 } finally {
    //                     // console.log("finally");
    //                 }
    //             } else {
    //                 if (callback && !alreadyCallBack) {
    //                     callback(null);
    //                     alreadyCallBack = true;
    //                 }
    //             }
    //         }
    //     };
    //     xhr.open("GET", m_url, true);
    //     let timer = setTimeout(() => {
    //         if (callback && !alreadyCallBack) {
    //             console.log("sendRequestGet RequestGet timeout");
    //             xhr.abort(); // 如果请求已经被发送，则立刻终止请求
    //             callback(null);
    //             alreadyCallBack = true;
    //         }
    //         clearTimeout(timer);
    //     }, 3000)
    //     xhr.send();
    // },

    sendSecretRequestGet(urlto, param, callback) {
        let alreadyCallBack = false;
        let xhr = new XMLHttpRequest();
        let m_url = urlto || this.m_remoteUrl;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    try {
                        if (callback && !alreadyCallBack) {
                            callback(xhr.responseText);
                            alreadyCallBack = true;
                        }
                    } catch (e) {
                        console.log("catch:" + e);
                    } finally {
                        // console.log("finally");
                    }
                } else {
                    if (callback && !alreadyCallBack) {
                        callback(null);
                        alreadyCallBack = true;
                    }
                }
            }
        };
        xhr.open("GET", m_url, true);
        let timer = setTimeout(() => {
            if (callback && !alreadyCallBack) {
                // console.log("sendSecretRequestGet RequestGet timeout");
                xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                // callback(null);
                // alreadyCallBack = true;
            }
            clearTimeout(timer);
        }, 3000)
        xhr.send();
    },

    ping(urlto, endurl, callback) {
        let xhr = new XMLHttpRequest();
        let m_url = urlto || this.m_remoteUrl;
        if (endurl) {
            m_url = "http://" + urlto + endurl || this.m_remoteUrl;
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    try {
                        if (callback) {
                            // let response = JSON.parse(xhr.responseText);
                            callback(urlto);
                        }
                    } catch (e) {
                        // console.log("catch:" + e);
                    } finally {
                        // console.log("finally");
                    }
                } else {
                    if (callback) {
                        callback(null);
                    }
                }
            }
        };

        xhr.open("GET", m_url, true);
        let timer = setTimeout(() => {
            if (callback) {
                xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                // callback(null);
                // console.log("ping RequestGet timeout", urlto);
            }
            clearTimeout(timer);
        }, 3000)
        xhr.send();
    },

    sendRequestIpGet(urlto, endurl, callback, outcallback) {
        let alreadyCallBack = false;
        let xhr = new XMLHttpRequest();
        let m_url = "http://" + urlto + endurl || this.m_remoteUrl;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    try {
                        if (callback && !alreadyCallBack) {
                            let response = JSON.parse(xhr.responseText);
                            callback(response, urlto);
                            alreadyCallBack = true;
                        }
                    } catch (e) {
                        console.log("catch:" + e);
                    } finally {
                        // console.log("finally");
                    }
                } else {
                    if (callback && !alreadyCallBack) {
                        callback(null);
                        alreadyCallBack = true;
                    }
                }
            }
        };
        xhr.open("GET", m_url, true);
        let timer = setTimeout(() => {
            if (outcallback && !alreadyCallBack) {
                console.log("sendRequestGlobalGet RequestGet timeout");
                // xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                outcallback(null);
                alreadyCallBack = true;
            }
            clearTimeout(timer);
        }, 3000)
        xhr.send();
    },

    sendRequestIpPost(urlto, endurl, callback, outcallback) {
        // let str = JSON.stringify(param);
        let xhr = new XMLHttpRequest();
        let alreadyCallBack = false;
        let m_url = "http://" + urlto + endurl || this.m_remoteUrl;
        // 异步请求
        xhr.open("POST", m_url, true); // 初始化一个请求
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText
                    // console.log("RemoteData", response)
                    if (callback && !alreadyCallBack) {
                        callback(response)
                        alreadyCallBack = true
                    }
                } else {
                    if (callback && !alreadyCallBack) {
                        callback(null)
                        alreadyCallBack = true
                    }
                }
            }
        }

        let timer = setTimeout(() => {
            if (outcallback && !alreadyCallBack) {
                console.log("sendRequestIpPost RequestGet timeout");
                // xhr.abort(); // 如果请求已经被发送，则立刻终止请求
                outcallback(null);
                alreadyCallBack = true;
            }
            clearTimeout(timer);
        }, 3000)

        xhr.send(); // 发送请求，默认是异步请求，请求发送后立刻返回
    },
}

module.exports = hqqHttp;
