import CYLHDSceneGame from "../../../../subgame/cylhd/script/CYLHDSceneGame";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zhibo_panel extends cc.Component {
    // view
    private web: cc.Node = null;
    private viewBg: cc.Node = null;
    private viewAni: cc.Node = null;
    private webView: cc.WebView = null;

    // slide
    private close: cc.Node = null;
    private zoomIn: cc.Node = null;
    private zoomOut: cc.Node = null;
    private drag: cc.Node = null;

    private view: cc.Node = null;
    private slide: cc.Node = null;
    private button: cc.Node = null;

    private buttonHover: cc.Node = null;

    // custom
    private isShowZhiboPanel: boolean = false;
    private dragStart: boolean = false;
    private webViewSize: cc.Size = null;
    private dragTime: number = null;
    private webViewLoaded: boolean = false;

    sceneGame: CYLHDSceneGame;

    start() {
        // find
        this.view = cc.find("view", this.node);
        this.slide = cc.find("slide", this.node);
        this.button = cc.find("button", this.node);
        this.web = cc.find("web", this.view);
        this.viewBg = cc.find("bg", this.view);
        this.viewAni = this.viewBg.getChildByName('ani');
        this.webView = this.web.getComponent(cc.WebView);
        this.close = cc.find("close", this.slide);
        this.zoomIn = cc.find("zoomIn", this.slide);
        this.zoomOut = cc.find("zoomOut", this.slide);
        this.drag = cc.find("drag", this.slide);
        this.buttonHover = cc.find("hover", this.button);

        // foreach add event
        [
            { node: this.close, handler: 'onClose' },
            { node: this.zoomIn, handler: 'onZoom', data: '1' },
            { node: this.zoomOut, handler: 'onZoom', data: '-1' }
        ].forEach((val) => {
            let evt: cc.Component.EventHandler = new cc.Component.EventHandler();
            evt.target = this.node;
            evt.component = 'zhibo_panel';
            evt.handler = val.handler;
            if (val.data) evt.customEventData = val.data;
            val.node.getComponent(cc.Button).clickEvents.push(evt);
        });

        // event
        if (cc.isValid(this.drag)) {
            this.drag.on(cc.Node.EventType.TOUCH_START, this.onDrag.bind(this));
            this.drag.on(cc.Node.EventType.TOUCH_MOVE, this.onDragMove.bind(this));
            this.drag.on(cc.Node.EventType.TOUCH_END, this.onDragCancel.bind(this));
            this.drag.on(cc.Node.EventType.TOUCH_CANCEL, this.onDragCancel.bind(this));
        }
        if (cc.isValid(this.button)) {
            this.button.on(cc.Node.EventType.TOUCH_START, this.onDrag.bind(this));
            this.button.on(cc.Node.EventType.TOUCH_MOVE, this.onDragMove.bind(this));
            this.button.on(cc.Node.EventType.TOUCH_END, this.onDragCancel.bind(this));
            this.button.on(cc.Node.EventType.TOUCH_CANCEL, this.onDragCancel.bind(this));
        }

        // init
        if (!hqq.gameGlobal.zhibo) {
            hqq.gameGlobal.zhibo = {
                WebViewPosition: cc.v3(cc.winSize.width - 240, 600, 0),
                WebViewSize: 1
            }
        }
        let url = hqq.gameGlobal.zhibo?.LoadUrl;
        if (url) {
            cc.log('zhiboPanel - start');
            hqq.eventMgr.register(hqq.eventMgr.showZhiBoPanel, "zhibo_panel", this.onShowZhiBoPanel.bind(this));
            this.buttonHover.active = false;
            this.onClose(false);
            this.webView.url = url;
            this.node.y += cc.winSize.height * 2;
        } else {
            cc.log('zhiboPanel - no url');
            hqq.eventMgr.dispatch(hqq.eventMgr.openZhiBoPanel, false);
        }
    }

    onDestroy() {
        cc.log('zhiboPanel - onDestroy');
        this.clearZhiBoPanel();

    }

    clearZhiBoPanel() {
        cc.log('zhiboPanel - clearZhiBoPanel');
        // clear hqq
        hqq.gameGlobal.zhibo.GameCode = "";
        hqq.gameGlobal.zhibo.RoomCode = "";
        hqq.gameGlobal.zhibo.ZhiBoUrl = "";
        hqq.gameGlobal.zhibo.LoadUrl = "";

        hqq.eventMgr.unregister(hqq.eventMgr.onShowZhiBoPanel, "zhibo_panel");
    }

    onShowZhiBoPanel(bool: boolean | null) {
        this.sceneGame = cc.find('Canvas/game').getComponent('CYLHDSceneGame');
        cc.log('zhiboPanel - onShowZhiBoPanel =>', bool);
        if (bool && cc.isValid(this.webView) && cc.isValid(this.node)) {
            let pos = hqq.gameGlobal.zhibo.WebViewPosition;
            pos = pos ? pos : cc.v3(cc.winSize.width - 240, 600, 0);
            this.isShowZhiboPanel = true;

            this.webView.url = hqq.gameGlobal.zhibo.ZhiBoUrl + '';
            console.log("url : " + this.webView.url)
            this.newURL();
            this.node.position = pos;
            this.onZoom(null, '0');
            this.onOverScene();
            this.viewAni.active = true;
            this.webViewSize = new cc.Size(this.web.getContentSize());
            this.web.y = this.node.y + this.webViewSize.height;
            return
        }
        this.clearZhiBoPanel();
        hqq.eventMgr.dispatch(hqq.eventMgr.openZhiBoPanel, false);
    }

    newURL() {
        let data = "http://h5.downlaod.bar/qMobile/game/index.html?"
            + 'webMobileType=' + cc.sys.platform
            + '&roomId=' + this.sceneGame.roomNumber
            + '&accountName=' + hqq.gameGlobal.player.account_name
            + '&token=' + hqq.gameGlobal.token;
            cc.log("data : " + data);
        if (cc.sys.isBrowser) {
            console.log("送出消息")
            this.webView._impl._iframe.contentWindow.postMessage(data, "*")
        } else {
            if (CC_JSB) {
                cc.WebView.Impl.prototype.evaluateJS = (str) => {
                    var iframe = this._iframe;
                    if (iframe) {
                        return iframe.evaluateJS(str)
                    }
                }
            }
            this.webView.evaluateJS(`cc.onJLQEnterRoom(${JSON.stringify({ data: data })})`)
        }
    }

    showButtonHover() {
        this.buttonHover.active = true;
    }

    onZoom(evt: cc.Event, zoom: string) {
        if (this.dragStart) return
        cc.log('zhiboPanel - onZoom', zoom);
        let size = hqq.gameGlobal.zhibo.WebViewSize;
        let zo = parseInt(zoom);
        let max = Math.floor((cc.winSize.height - this.viewBg.height) / 64) + 1;
        size = size + zo < 0 || size + zo > max ? size : size + zo;
        cc.log('zhiboPanel - size size/Max=>', size, '/', max);
        this.web.width = 270 + 36 * (size - 1);
        this.web.height = 480 + 64 * (size - 1);

        let scale = this.web.height / 480;
        this.viewBg.scale = scale;
        hqq.gameGlobal.zhibo.WebViewSize = size;
        this.onOverScene();
    }

    onClose(isZoomOut: boolean) {
        if (isZoomOut) this.webView.url = hqq.gameGlobal.zhibo.LoadUrl || '';
        this.view.active = !isZoomOut;
        this.slide.active = !isZoomOut;
        this.button.active = isZoomOut;
        if (!isZoomOut) this.webView.url = hqq.gameGlobal.zhibo.ZhiBoUrl || '';
    }

    onDrag(evt: cc.Event.EventTouch) {
        if (this.dragStart) return
        // cc.log('zhibo - onDrag',evt.currentTarget.name);
        this.dragStart = true;
        this.dragTime = new Date().getTime();
        this.viewAni.active = true;
        this.webViewSize = new cc.Size(this.web.getContentSize());
        this.web.y = this.node.y + this.webViewSize.height;
        if (evt.currentTarget == this.button) {
            this.scheduleOnce(this.showButtonHover, .1);
        }
    }

    onDragMove(evt: cc.Event.EventTouch) {
        if (!this.dragStart) return
        // cc.log("zhibo - onDragMove",evt.getDelta());
        this.node.x += evt.getDelta().x;
        this.node.y += evt.getDelta().y;
    }

    onDragCancel(evt: cc.Event.EventTouch) {
        if (!this.dragStart) return
        // cc.log('zhibo - onDragCancel',evt.type,evt.currentTarget.name);
        this.dragStart = false;
        if (this.webViewLoaded) {
            this.viewAni.active = false;
            this.web.y = 0;
        }
        hqq.gameGlobal.zhibo.WebViewPosition = this.node.position;
        let isTouch = new Date().getTime() - this.dragTime < 200; // 判断拖弋或点击
        if (evt.currentTarget == this.button) { // 开启直播的按钮
            this.unschedule(this.showButtonHover);
            this.buttonHover.active = false;
            if (isTouch) {
                this.onClose(!this.button.active);
            }
        }
        this.onOverScene();
    }

    onOverScene() {
        let viewSize = cc.winSize;
        // cc.log('viewSize/2=>',viewSize.width/2,viewSize.height/2)
        let offset = cc.v3(); // 记录最后需位移XY

        let ary = this.button.active ?
            [ // 关闭直播的按钮
                cc.v3(this.node.x, this.node.y, 0), // 左上
                cc.v3(this.node.x + 50, this.node.y, 0), // 右上
                cc.v3(this.node.x + 50, this.node.y - this.button.height, 0), // 右下
                cc.v3(this.node.x, this.node.y - this.button.height, 0) // 左下
            ] : [
                cc.v3(this.node.x - this.web.width, this.node.y, 0), // 左上
                cc.v3(this.node.x + 50, this.node.y, 0), // 右上
                cc.v3(this.node.x + 50, this.node.y - this.web.height, 0), // 右下
                cc.v3(this.node.x - this.web.width, this.node.y - this.web.height, 0) // 左下
            ]
        ary.forEach((v3) => {
            // cc.log('v3=>',v3.x,v3.y);
            if (v3.x > viewSize.width) {
                let x = 0 - (v3.x - viewSize.width + 14);
                offset.x = Math.abs(x) > offset.x ? x : offset.x;
            } else if (v3.x < 0) {
                let x = 0 - v3.x + 14;
                offset.x = Math.abs(x) > offset.x ? x : offset.x;
            }
            if (v3.y > viewSize.height) {
                let y = 0 - (v3.y - viewSize.height + 11);
                offset.y = Math.abs(y) > offset.y ? y : offset.y;
            } else if (v3.y < 0) {
                let y = 0 - v3.y + 11;
                offset.y = Math.abs(y) > offset.y ? y : offset.y;
            }
        });

        // cc.log('offset=>',offset.x,offset.y)
        if (Math.abs(offset.x) > 0 || Math.abs(offset.y) > 0) {
            cc.log('zhiboPanel - onOverScene');
            cc.tween(this.node).by(.3, { x: offset.x, y: offset.y }).call(() => {
                if (!cc.isValid(this.node)) return;
                hqq.gameGlobal.zhibo.WebViewPosition = this.node.position;
            }).start();
        }
    }

    private onWebviewEvent(webview: cc.WebView, eventType: cc.WebView.EventType): void {
        if (!this.isShowZhiboPanel) return
        switch (eventType) {
            case cc.WebView.EventType.ERROR:
                cc.log("zhiboPanel - webView=>error");
                this.node.destroy();
                break;
            case cc.WebView.EventType.LOADED:
                cc.log("zhiboPanel - webView=>load");
                this.webViewLoaded = true;
                this.viewAni.active = false;
                this.web.y = 0;
                hqq.gameGlobal.zhibo.WebViewPosition = this.node.position;
                break;
        }
        // cc.log("webView=>",eventType);
    }
}
