import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('IosReflect')
export class IosReflect extends Component {
    callback:Function = null;
    
    ctor () {
    }

    setCallback (callback: any) {
        this.callback = callback
    }

    testWebSpeedAction (url: any) {
        if (url) {
           if (this.callback) {
               this.callback(url);
           }
        }
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// cc.Class({
//     extends: cc.Component,
//     ctor: function () {
//     },
//     setCallback(callback) {
//         this.callback = callback
//     },
//     testWebSpeedAction(url) {
//         if (url) {
//             if (this.callback) {
//                 this.callback(url);
//             }
//         }
//     }
// });
