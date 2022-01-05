import MessageBox from "./cdx_MessageBox"

// export default class GameUtils extends cc.Component {
class CYLHD_GameUtils {
    protected static instance: CYLHD_GameUtils;
    public static getInstance(): CYLHD_GameUtils {
        if (!this.instance) {
            this.instance = new CYLHD_GameUtils();
        }
        return this.instance;
    }
    /**
     * 判断是否是整数
     * @param number 传入的值 输入整数返回ture  输入其他返回false
     */
    determineIsInteger(number) {
        if (Number.isInteger(number) == true) {
            number = number.toString() + ".00";
        } else {

        }
    }
    /**
     * 去除整数小数点后的0 或者小数点后两位有0部分去除
     * @param number 传入的数字
     */
    removeAfterInteger(number) {
        return parseFloat(number);

    }

    //n位小数(四舍五入)
    roundFun(value, n) {
        return Number(Math.round(value*Math.pow(10,n))/Math.pow(10,n));
    }

    //n位小数(无条件舍去)
    floorFun(value, n) {
        return Number((Math.floor(Math.round(value*Math.pow(10,n)))/Math.pow(10,n)).toFixed(n));
    }
    
    /**
     * 后台所显示的金额小数点后第7位四舍五入到第6位，并截取后台四舍五入后的金额到第2位
     * @param number 传入的数字
     */
    removeDecimalpoint(number) {
        return hqq.commonTools.formatGold( number );
    }

    /**
     * 整数不显示小数点儿 小数只显示两位且只有一位小数后补0 
     * @param number 传入的数字
     */
    displaytwodecimalplaces(number) {
        let number1 = number.toString().split(".");
        if (number1.length == 1) {
            return parseFloat(number);
        }
        if (number1.length > 1) {
            if (number1[1].length < 2) {
                number = number.toString() + "0";
            }
            if (number1[1].length > 2) {
                number = number1[0] + "." + number1[1].substring(2, 0);
            }
            return number;
        }
    }
    /**
   * 艺术字体若第一个字体是. 以/代替 然后再转换
   * @param gold 金币钱数
   */
    Conversion(gold: number) {
        var str: string = "";
        str = gold.toString().replace(".", "/")
        return str;
    }
    /**
     * 切换图片
     * @param node 图片（node节点）
     * @param url  资源地址 "路径加资源名"
     */
    loadSpriteFrame(node: any, url: string,callback:Function=null) {
        if (!cc.isValid(node)) {
            cc.warn("loadSpriteFrame 资源加载失败！url:" + url + " , Node:"+ node);
            return;
        }
        let spr = node.getComponent(cc.Sprite);
        // url = "cylhdRes/"+url; 
        hqq.cylhd.load(url, cc.SpriteFrame, (err, spriteFrame:cc.SpriteFrame)=> {
            if (err) {
                cc.warn("loadSpriteFrame 资源加载失败！url:" + url + " , Node:"+ node+ " , spr:"+ spr+"  err="+err);
                return;
            }
            if( cc.isValid(spr) )
            {
                spr.spriteFrame = spriteFrame;

                if( callback )
                {
                    callback();
                }
            }
            else
            {
                cc.warn("loadSpriteFrame 资源加载失败！url:" + url + " , Node is null");
            }
        });
    }

    /**
       * 切换图集资源
       * @param node 图片（node节点）
       * @param atlasurl   "图片集资源名"
       * @param url  资源地址 "路径加资源名"
       */
    loadSpriteAtlasFrame(node: any, atlasurl: string, url: string) {
        if (!cc.isValid( node )) {
            return;
        }
        // atlasurl = "cylhdRes/" + atlasurl
        hqq.cylhd.load(atlasurl, cc.SpriteAtlas, (err, atlas:cc.SpriteAtlas)=> {
            if (err) {
                cc.log("图片集资源加载失败 err="+err);
                return;
            }
            if( !cc.isValid(node) )
            {
                cc.log("图片集资源加载失败 node is null");
                return;
            }
            else
            {
                let sp = node.getComponent(cc.Sprite);
                if( cc.isValid( sp ) )
                {
                    sp.spriteFrame = atlas.getSpriteFrame(url);
                }
                else
                {
                    cc.log("图片集资源加载失败 node="+ node + "no Sprite" );
                }
            }
        })
    }
    /**
     * 切换网络图片
     * @param node 图片（node节点）
     * @param url  资源地址 "路径加资源名"
     * @param imgtype  图片类型 (png jpg)
     */
    loadNetworkSpriteFrame(node: any, url: string, imgtype: string) {
        if(!cc.isValid(node))
        {
            return;
        }
        let spr = node.getComponent(cc.Sprite);
        cc.loader.load({ url: url, type: imgtype }, (err, img) => {
            if( cc.isValid( spr ))
            {
                spr.spriteFrame = new cc.SpriteFrame(img);
            }
        });
    }
    /**
     * 图片地址
     * @param num 图片编号
     */
    img(num: number) {
        var str: string = "";
        switch (num) {
            case 0: str = "chips/chip_green-s"; break;
            case 1: str = "chips/chip_blue-s"; break;
            case 2: str = "chips/chip_purple-s"; break;
            case 3: str = "chips/chip_red-s"; break;
            case 4: str = "chips/chip_orange-s"; break;
            default:
                break;
        }
        return str;
    }

    /**
     * 产生一个随机数 包含上下限
     * @param lower 最小值
     * @param upper 最大值
     */
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    /**
     * 分数组方法
     * @param arr 出入要分的数组
     * @param num 几个数组为一段
     */
    chunk(arr, num) {
        num = num * 1 || 1;
        let ret = [];
        let count:number = 0;
        arr.forEach( (item, i)=> {
            if ( ret.length <= Math.ceil( count / num ) && count % num === 0)
            {
                ret.push([]);
            }
            if( cc.isValid( item ) )
            {
                ret[ret.length - 1].push(item);
                count++;
            }
        });
        return ret;
    };

    ParaUrlString(src,SeparatorM,SeparatoS)
    {
        let ParaMap = {};
        let factors = src.split(SeparatorM);
        for(var i = 0; i < factors.length; i ++) 
        {
            let finals = factors[i].split(SeparatoS);
            ParaMap[finals[0]] = finals[1];
        }

        return ParaMap;
    }

    showMessageBox( parent:cc.Node , tips:string , fnCallbackOK:Function = null, fnCallbackCancel:Function = null , isOK:boolean = true , isCancel:boolean = false , isClose:boolean = false , prefabPath:string = "Prefabs/Messgebox" )
    {
        // prefabPath = "cylhdRes/" + prefabPath
        hqq.cylhd.load( prefabPath, cc.Prefab, (err, prefab:cc.Prefab )=> {
            if (err) {
                cc.log("资源加载失败！url:" + prefabPath + " ,err="+err);
                return;
            }
            if( cc.isValid( prefab ) )
            {
                let messagebox = cc.instantiate( prefab );
                if( cc.isValid( messagebox ) )
                {
                    if( cc.isValid( parent ) )
                    {
                        parent.addChild(messagebox,100);
                    }
                    setTimeout( ()=>{
                        if( cc.isValid(messagebox) )
                        {
                            let msgboxscript:MessageBox = messagebox.getComponent("CYLHDMessageBox");
                            msgboxscript.init( tips , fnCallbackOK , fnCallbackCancel , isOK , isCancel , isClose );
                            // messagebox.active = true;
                        }
                        } , 0.1 * 1000 );
                }
            }
        });
    }

    /**
     * 数字自增或自减到某一值动画参数
     * @param current 当前数字
     * @param money 要增加的数字
     * @param label 要显示的Label 
     * @param prefix 前缀文字(可选参数 预设为空)
     * @param suffix 后缀文字(可选参数 预设为空)
     */
    NumAutoAnimation(current:number,money: number, label: cc.Label, prefix: string = "",suffix:string=""): void {
        if( current == null || current == undefined || money == null || money == undefined )
        {
            return;
        }
        if( current == money )
        {
            return;
        }

        let repeatCount = Math.floor(Math.abs(money-current) * 100);
        let isAdd = true;
        if( current > money )
        {
            isAdd = false;
            // repeatCount = Math.floor(money * 100);
        }

        repeatCount = repeatCount > 30 ? 30 : repeatCount;
        if( cc.isValid( label ) )
        {
            label.unscheduleAllCallbacks();
            
            if( isAdd )
            {
                label.schedule( () => {
                    if( cc.isValid( label ) )
                    {
                        current += money / repeatCount;
                        if (current > money) {
                            label.string = prefix + this.removeDecimalpoint(money)+suffix;
                        } else {
                            label.string = prefix + current.toFixed(3).slice(0, -1)+suffix;
                        }
                    }
                } , 1 / 60, repeatCount);
                
            }
            else
            {
                let subnum = Math.abs(money-current);
                label.schedule( () => {
                    if( cc.isValid( label ) )
                    {
                        current -= subnum / repeatCount;
                        if (current < money) {
                            label.string = prefix + this.removeDecimalpoint(money)+suffix;
                        } else {
                            label.string = prefix + current.toFixed(3).slice(0, -1)+suffix;
                        }
                    }
                } , 1 / 60, repeatCount);
            }
            
        }
    }

     /**
     * 切换骨骼动画(SPINE)
     * @param node 图片（node节点）
     * @param url  资源地址 "路径加资源名"
     */
      loadSpine(node: any, url: string,callback:Function=null,animationname:string="",loop:boolean=false) {
        if (!cc.isValid(node)) {
            cc.warn("loadSpine 资源加载失败！url:" + url + " , Node:"+ node);
            return;
        }
        let Skeleton:sp.Skeleton = node.getComponent(sp.Skeleton);
        // url = "cylhdRes/" + url;
        hqq.cylhd.load(url, sp.SkeletonData, (err, skeletonData:sp.SkeletonData)=> {
            if (err) {
                cc.warn("loadSpine 资源加载失败！url:" + url + " , Node:"+ node+ " , Skeleton:"+ Skeleton+"  err="+err);
                return;
            }
            if( cc.isValid(Skeleton) )
            {
                Skeleton.skeletonData = skeletonData;
                Skeleton.node.active = true;
                if( animationname != "" )
                {
                    Skeleton.setAnimation(0,animationname,loop);
                }
                if( callback )
                {
                    callback();
                }
            }
            else
            {
                cc.warn("loadSpine 资源加载失败！url:" + url + " , Node is null");
            }
        });
    }

    /**
     * 检查是不是个位数是的话补0显示(例如:传1回传01)
     * @param num 要检查的数字
     */
    fixedZero( num:number ):string
    {
        if( num < 10 && num > 0 )
        {
            return "0" + num;
        }
        return num.toString();
    }
}

export const GameUtil = CYLHD_GameUtils.getInstance();