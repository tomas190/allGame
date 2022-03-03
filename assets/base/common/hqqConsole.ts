import { color, log,warn, Color, error, view, UITransform } from "cc";
import { Node ,_decorator,Component,Vec2,Vec3,v2,instantiate,game,Label} from "cc";
import * as cc from "cc";

const { ccclass, property } = _decorator;

@ccclass('hqqConsole')
export class hqqConsole extends Component {
    @property(Node)
    public btn: Node | null = null;
    @property(Node)
    public window: Node | null = null;
    @property(Node)
    public view: Node | null = null;
    @property(Node)
    public content: Node | null = null;
    @property(Node)
    public dragBar: Node = null;

    private contentlist:Array<Node> = [];
    private num:number = null;
    private poslist:Array<Vec2> = [];
    private btnpos:Vec3 = null;
    onLoad () {
        this.contentlist = [this.content]
        this.num = 0
        this.poslist = [v2(0, 0)]
        for (let i = 0; i < 19; i++) {
           let node = instantiate(this.content)
           let pos = v2(0, 19 * (i + 1))
           this.poslist.push(pos);
           node.setPositionEx(0,pos.y);
           this.contentlist.push(node)
           this.view.addChildEx(node)
        }
        game.addPersistRootNode(this.node);
        this.node.setSiblingIndex(Math.pow(2, 15) - 1);
        this.btnpos = this.btn.getPosition()
        this.btn.on(Node.EventType.TOUCH_MOVE, this.onClickMove, this);
        this.btn.on(Node.EventType.TOUCH_END, this.onClickEnd, this);
    }

    init () {
        var self = this;
        console.error = function () {
           let data = ""
           for (let i = 0; i < arguments.length; i++) {
               data += arguments[i] + " "
           }
           self.contentlist[self.num].getComponent(Label).string = 'console.error:' + data;
           self.contentlist[self.num].getComponent(Label).color = color(255, 0, 0)
           self.check(self)
        };
        console.warn = function () {
           let data = ""
           for (let i = 0; i < arguments.length; i++) {
               data += arguments[i] + " "
           }
           self.contentlist[self.num].getComponent(Label).string = 'console.warn:' + data;
           self.contentlist[self.num].getComponent(Label).color = color(0, 0, 255)
           self.check(self)
        };
        console.log = function () {
           let data = ""
           for (let i = 0; i < arguments.length; i++) {
               data += arguments[i] + " "
           }
           self.contentlist[self.num].getComponent(Label).string = 'log:' + data;
           self.contentlist[self.num].getComponent(Label).color = color(0, 0, 0)
           self.check(self)
        };
        // log = function () {
        //    let data = ""
        //    for (let i = 0; i < arguments.length; i++) {
        //        data += arguments[i] + " "
        //    }
        //    self.contentlist[self.num].getComponent(Label).string = 'log:' + data;
        //    self.contentlist[self.num].getComponent(Label).color = color(0, 0, 0)
        //    self.check(self)
        // };
        // warn = function () {
        //    let data = ""
        //    for (let i = 0; i < arguments.length; i++) {
        //        data += arguments[i] + " "
        //    }
        //    self.contentlist[self.num].getComponent(Label).string = 'warn:' + data;
        //    self.contentlist[self.num].getComponent(Label).color = color(0, 0, 255)
        //    self.check(self)
        // };
        // error = function () {
        //    let data = ""
        //    for (let i = 0; i < arguments.length; i++) {
        //        data += arguments[i] + " "
        //    }
        //    self.contentlist[self.num].getComponent(Label).string = 'error:' + data;
        //    self.contentlist[self.num].getComponent(Label).color = color(255, 0, 0)
        //    self.check(self)
        // };
        // syslog = function () {
        //    let data = ""
        //    for (let i = 0; i < arguments.length; i++) {
        //        data += arguments[i] + " "
        //    }
        //    self.contentlist[self.num].getComponent(Label).string = 'syslog:' + data;
        //    self.contentlist[self.num].getComponent(Label).color = color(255, 0, 0)
        //    self.check(self)
        // };
        self.dragBar.on('touchmove', function (touch) {
           var x = touch.getPreviousLocation().x - touch.getLocationX();
           var y = touch.getPreviousLocation().y - touch.getLocationY();
           self.window.setPositionEx( self.window.getPosition().x + (-x) ,self.window.getPosition().y+(-y))
        //    self.window.x += -x;
        //    self.window.y += -y;
        });
    }

    check (self: any) {
        let start = self.num
        for (let i = 19; i >= 0; i--) {
           self.contentlist[start].y = self.poslist[i].y
           start++
           if (start > 19) {
               start = 0
           }
        }
        self.num++
        if (self.num >= 20) {
           self.num = 0
        }
    }

    onClickMove (event: any) {
        let pos = event.touch.getLocation()
        pos = this.node.getComponent(UITransform).convertToNodeSpaceAR(pos)
        if (pos.x <= -view.getVisibleSize().width / 2 + 50 || pos.y >= -25 || pos.x >= view.getVisibleSize().width / 2 - 50 || pos.y <= -view.getVisibleSize().height + 25) {
        } else if (this.btnpos.x != pos.x || this.btnpos.y != pos.y) {
           this.btn.setPosition(pos)
        } else {
        }
        event.stopPropagation();
    }

    onClickEnd (event: any) {
        if (this.btnpos.x != this.btn.getPosition().x || this.btnpos.y != this.btn.getPosition().y) {
        } else {
           this.onClickBtn()
        }
        this.btnpos = this.btn.getPosition()
        event.stopPropagation();
    }

    onClickBtn () {
        this.window.active = !this.window.active;
    }

}