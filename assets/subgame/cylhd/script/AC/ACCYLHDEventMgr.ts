
const { ccclass, property } = cc._decorator;

import { EventKind } from "../CYLHDStateConfig"

module AC {
    @ccclass
    export class EventMgr {
        // private static _instance: EventMgr;
        private _mapHandler: Map<EventKind, Map<string, (data: any) => void>>;//kind: EventKind, 

        constructor() {
            this._mapHandler = new Map();
        }

        public clearAllEvt(){
            this._mapHandler.clear();
        }

        // public static getInstance(): EventMgr {
        //     this._instance || (this._instance = new EventMgr());
        //     return this._instance;
        // }
        /** 
         * 注册监听事件（可以为不同类注册同一个事件）
         * @param kind 事件类型
         * @param className 响应函数所属类名
         * @param func 响应函数
         */
        public register(kind: EventKind, className: string, func: (data: any) => void): void {
            const funcs = this._mapHandler.get(kind) || (new Map());
            if (funcs.has(className)) {
                return
            }
            funcs.set(className, func);
            this._mapHandler.set(kind, funcs);
            // console.info("register", kind, className, this._mapHandler)
        }

        /**
         * 取消监听事件
         * @param kind 事件类型
         * @param className 响应函数所属类名
         */
        public unregister(kind: EventKind, className: string): void {

            if (!this._mapHandler.has(kind)) {
                return
            }
            const funcs = this._mapHandler.get(kind);
            funcs.has(className) && funcs.delete(className);
            this._mapHandler.set(kind, funcs);
        }

        /**
         * TODO 删除一个类名元素上注册的所有指令
         * @param className 
         */
        public unregisterInComp (className: string): void {
            this._mapHandler.forEach((value,key)=>{
                this.unregister(key, className)
            })
        }

        /**
         * 派发事件
         * @param kind 事件类型
         * @param data 传递的数据
         */
        public dispatch(kind: EventKind, data?: any): void {
            if (!this._mapHandler.has(kind)) {
                return
            }
            const funcs = this._mapHandler.get(kind);
            funcs.forEach((value: (data: any) => void) => {
                value(data);//kind, kind: EventKind
            })
        }
    }

}
// export type IBindFunc = (kind: EventKind, data: any) => void;

export default AC.EventMgr;

