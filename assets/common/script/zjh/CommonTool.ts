
var CommonTool = {

    setMyselfId(id: number){
        this.Myid = id;
        // this.myIndex = myIndex;
    },

    getMyselfId(){
        return this.Myid
    },

    Sprite2Grey(Sprite){
        Sprite.setMaterial(0, cc.Material.getBuiltinMaterial('gray-sprite'));
    },

    Sprite2Normal(Sprite){
        Sprite.setMaterial(0,cc.Material.getBuiltinMaterial('normal-sprite'));
    },

    setIconPath(path:String){
       this.icon = path;
    },

    getIconPath(): String{
        return this.icon
    },

    loadSpriteFrame(node: any,url: string)
    {
        let spr = node.getComponent(cc.Sprite); 
        cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
            spr.spriteFrame = spriteFrame;
        });
    },

    loadFont(node: any,url: string)
    {
        cc.loader.loadRes(url, cc.Font, function (err, obj) {
            if(err) { 
                cc.error(err.message || err);
                return; 
            }
            node.getComponent(cc.Label).font = obj;
        });
    },

     //添加点击事件
     addBtnEvent(node: cc.Node ,_satrt: Function,_move: Function,_end: Function,_cancel: Function,obj: any){
        if(_satrt) node.on('touchstart', _satrt, obj);
        if(_move) node.on('touchmove', _move, obj);
        if(_end) node.on('touchend', _end, obj);
        if(_cancel) node.on('touchcancel', _cancel, obj);
    },

    removeBtnEvent(node: cc.Node ,_satrt: Function,_move: Function,_end: Function,_cancel: Function,obj: any){
        node.off('touchstart', _satrt, obj);
        node.off('touchmove', _move, obj);
        node.off('touchend', _end, obj);
        node.off('touchcancel', _cancel, obj);
    },

    stringToByte(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for(var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if(c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if(c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if(c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    },
    
    byteToString(arr:any) {
        if(typeof arr === 'string') {
            return arr;
        }
        var str = '',
        _arr = arr;
        for(var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if(v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for(var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    },
    
    getShortNick(nick:string){
        let byte = this.stringToByte(nick)
        let name = []
        let total = 0
        for(let i=0;i<byte.length;i){
            if(byte[i]<128){
                total+=0.5
                if(total>5) break;
                name.push(byte[i]);
                i++
            }else{
                total++
                if(total>5) break;
                name.push(byte[i],byte[i+1],byte[i+2]);
                i+=3
            }
        }
        let shortNick = this.byteToString(name);
        if(shortNick == nick) return nick;
        return shortNick+"..";
    },
    
    //金币缩写
    getShortMoney(money:number){
        let yw = 10000
        let sw = 100000
        let bw = 1000000
        let qw = 10000000
        let bi = 100000000
        let num = null;
        let add = "万"
        if(money<sw){
            num = Math.floor(money*100)/100
            add = ""
        }else if(money<bw){//小于百万保留两位小数
            num = Math.floor(money/yw*100)/100
        }else if(money<qw){//小于千万保留一位小数
            num = Math.floor(money/yw*10)/10
        }else if(money<bi){//千万不保留小数
            num = Math.floor(money/yw)
        }else{
            num = Math.floor(money/bi*100)/100
            add = "亿" 
        }
        return num+add
    },

    resize() {
        var cvs = cc.find('Canvas').getComponent(cc.Canvas);
        //保存原始设计分辨率，供屏幕大小变化时使用
        if(!this.curDR){
            this.curDR = cvs.designResolution;
        }
        var dr = this.curDR;
        var s = cc.view.getFrameSize();
        var rw = s.width;
        var rh = s.height;
        if((rw/rh) > (dr.width / dr.height)){
            //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
            cvs.fitHeight = true;
            //如果更长，则用定高
        }
        else{
            /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
            cvs.fitWidth = true;

        }

    },

    reConversion(list:any){
        let arr = [];
        for(var i=0;i<list.length;i++){
            let flower = list[i]%4;
            let value = Math.floor(list[i]/4);
            if(value == 14){
                value = 1;
            }
            let cValue = flower*13+value;
            arr.push(cValue);
        }
        return arr;
    },

    //保留几位小数
    cutNum(val: number,x: number){
        let t = Math.pow(10,x);
        val = Math.floor(val*t)/t;
        return val
    }

}

export default CommonTool;