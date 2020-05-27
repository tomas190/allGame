cc.Class({
    extends: cc.Component,

    properties: {
        os: null
    },
    init: function (callbacks) {
        this.GameDom = document.getElementById("Cocos2dGameContainer");
        this.fileDOM = document.getElementById("fileDOM");
        if (!this.fileDOM) {
            this.create(callbacks)
        }
    },
    //发送图片按钮创建（网页端）
    create: function (callbacks) {
        var self = this;
        var e = document.createElement("div");
        e.id = "fileDOM"
        // e.style.position = "absolute";
        // e.style.top = 0;
        // e.style.left = "10px";
        // e.style.height = "100%";
        // e.style.width = "10px";
        //var urlData = cc.gg.utils.urlParse(window.location.href);
        var html = `<input type="file"  accept="image/*"  size="30"  id="file" name="myfile" style="opacity:0;width:45px;height:45px;position:absolute;bottom:0;left:0;background:red">`;

        // if (cc.gg.global.os == "ios") {
        //     html += `<textarea type="text"  id="text" name="myfile" style="
        //     opacity:0;
        //     background:red;
        //     color: rgb(255, 255, 255);
        //     border: 0px;
        //     /* background: transparent; */
        //     width: 550px;
        //     height: 95px;
        //     outline: medium;
        //     padding: 0px;
        //     text-transform: none;
        //     position: absolute;
        //     top: 0px;
        //     left: 2px;
        //     font-family: Arial;
        //     font-size: 30px;
        //     transform: matrix(0.5, 0, 0, 0.5, 49.5, -1.5);
        //     transform-origin: 0px 100% 0px;
        //     /* display: none; */
        //     ">`
        // }
        e.innerHTML = html
        this.GameDom.appendChild(e);
        var file = document.getElementById("file");
        file.onchange = function () {
            //cc.gg.global.isfiles = true;
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    // var img = new Image();
                    // img.src = e.target.result; //获取编码后的值,也可以用this.result获取
                    // img.onload = function () {
                    //     console.log('height:' + this.height + '----width:' + this.width)
                    //     var self = this;
                    //     cc.gg.protoBuf.onmessage(201, {
                    //         type: 'img',
                    //         datas: e.target.result,
                    //         sizeX: self.width,
                    //         sizeY: self.height,
                    //     });
                    // }
                    // console.log('图片选择回调：',e.target.result);
                    cc.gg.protoBuf.onmessage("FileUI", {
                        type: 'img',
                        datas: e.target.result,
                    }, true);
                }
                reader.readAsDataURL(file.files[0]);
            }
        };
        if (cc.gg.global.os == "ios") {
            // this.addEventListenerFocus();
            // this.addEventListenerChange();
            // this.addEventListenerBlur();
        }


    },
    focus: function () {
        var textDom = document.getElementById("text");
        if (textDom) {
            textDom.focus();
            textDom.select();
            var timer = setTimeout(function () {
                textDom.focus();
                textDom.select();
                clearTimeout(timer)
            }, 10)
        } else {
            console.log("未找到input节点")
        }
    },
    //监听获取焦点
    addEventListenerFocus: function () {
        var input = document.getElementById("text");
        input.onfocus = function () {
            cc.gg.protoBuf.onmessage(300, {
                focus: true
            })
        }
    },
    //监听内容改变
    addEventListenerChange: function () {
        var input = document.getElementById("text");
        input.oninput = function (val) {
            var value = document.getElementById("text").value
            cc.gg.protoBuf.onmessage(301, {
                msg: value
            })
        }
    },
    //监听失去焦点
    addEventListenerBlur: function () {
        // var input = document.getElementById("text");

        // input.onblur = function () {
        //     var value = input.value;
        //     cc.gg.protoBuf.onmessage(302, {
        //         focus: false,
        //         msg: value
        //     });
        // }
    },
    //上传file
    upLoad: function () {
        var self = this;
        var fileObj = document.getElementById("file").files[0];
        var fileDom = document.getElementById("file");
        var url = cc.gg.global.file;
        if (!fileObj) {
            cc.gg.utils.ccLog("文件未选择");
            //cc.gg.global.isfiles = false
            return
        } else {
            var from = new FormData();
            from.append("file", fileObj);
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    //console.log('上传中' + percentComplete + "%");
                    //派发上传事件
                    cc.gg.protoBuf.onmessage("XhrProgress", {
                        percentComplete: percentComplete
                    }, true)
                } else {
                    console.log("计算失败")
                }
            }, false);
            xhr.onload = function (data) {
                //var datas = JSON.parse(data.target.response);
                    fileDom.value = "";
                // callbacks(datas)
                cc.gg.protoBuf.onmessage("UpLoad", data.target.response, true)
            };
            xhr.onerror = function (data) {
                cc.gg.protoBuf.onmessage("XhrError", {}, true)
                //cc.gg.global.isfiles = true
                    fileDom.select();
                    fileDom.value = "";

            };
            xhr.upload.onloadstart = function (data) {
                    fileDom.select();
                    fileDom.value = "";
                
            };
            xhr.responseType = 'json';
            xhr.open("post", url);
            xhr.send(from);
        }
    },
    uploadComplete: function (evt) {
        var data = JSON.parse(evt.target.response);
        //cc.gg.utils.ccLog(data)
    },
    uploadFailed: function () {
        cc.gg.utils.ccLog("上传失败")
    },
    showFile: function () {
        // var e = document.getElementById("fileDOM");
        // // e.style.display = "block"
        // if (e) {
        //     e.style.display = "block"
        // } else {
        //     cc.gg.utils.ccLog("我没有找到filejiedian")
        // }
    },
    hideFile: function () {
        // var e = document.getElementById("fileDOM");
        // e.style.display = "none"
        // var e = document.getElementById("fileDOM");
        // if (e) {
        //     e.style.display = "none";
        // } else {
        //     cc.gg.utils.ccLog("我没有找到fileJIedian")
        // }
    },

});