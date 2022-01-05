module AC {


    export class Tick {
        static schedule: (callback: Function, interval?: number, repeat?: number, delay?: number)=>void;
        static unschedule: (callback_fn: Function)=>void;
        static scheduleOnce: (callback_fn: Function, delay?: number)=>void;
        static unscheduleAllCallbacks: ()=>void;

        // private idTick: number;
        private nDuration: number;
        private funCb:Function;
        // private targ:any;
        private nRepeat: number;// -1表示无限次
        // public nRepeatNow: number;
        // private args:any[];
        public running:boolean;

        constructor(nDuration:number, funCb:Function, targ:any, nRepeat: number=-1, args?:any[]) {
            this.nDuration = nDuration;
            this.funCb = funCb.bind(targ, args);
            // this.targ = targ;
            this.nRepeat = nRepeat;
            // this.args = args;
            this.running = false;
        }

        public start() {
            Tick.schedule(this.funCb, this.nDuration, this.nRepeat);
            this.running = true;
        }

        public stop() {
            Tick.unschedule(this.funCb);
            this.running = false;
        }

        public restart() {
            this.stop();
            this.start();
        }

        public destroy() {
            this.stop();
            this.funCb = null;
        }
        // 次数默认为无限循环 nRepeat:number=cc.macro.REPEAT_FOREVER 
        static newTick(nDuration:number, funCb:Function, targ:any, nRepeat:number=cc.macro.REPEAT_FOREVER, args?:any[]) {
            return new Tick(nDuration, funCb, targ, nRepeat, args);
        }

        public resetDuration(nD:number) {
            this.nDuration = nD;
        }
        // private onDispatch() {
        //     this.funCb.apply(this.targ, this.args);
        //     this.willStop();
        // }
        // private willStop() {
        //     this.nRepeatNow++;
        //     if(this.nRepeat==-1)   return;
        //     if(this.nRepeatNow>=this.nRepeat)   this.stop();
        // }
    }
}

export default AC.Tick;
