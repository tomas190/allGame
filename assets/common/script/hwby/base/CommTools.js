
var CommTools = cc.Class({
    ctor()
    {
        cc.log("this instance of CommTools");
        this.prefabMessagebox = null;

        this.prefabWaiting = null;  
        
        //等待请求，相当于引用计数。每次调用showwait+1,每次调用closewait-1
        //为零则关闭waitpanel
        this.waitReqCount = 0;
        //等待引用，要全为假才关等待界面
        this.waitRef = {}
        this.waitlayer == null;
    }, 

    ParaUrlString(src,SeparatorM,SeparatoS)
    {
        let ParaMap = {};
        let factors = src.split(SeparatorM);
        for(var i = 0; i < factors.length; i ++) 
        {
            let finals = factors[i].split(SeparatoS);
            ParaMap[finals[0]] = finals[1];
        }

        cc.log("ParaMap:",ParaMap);
        return ParaMap;
    },

    setWaitLayerPrefab(prefab)
    {
        this.prefabWaiting = prefab;
    },

    IsWaitRefZero() {
        for(let i in this.waitRef) {
            if(this.waitRef[i]) {
                return false;
            }
        }

        return true;
    },

    ShowWaiting(parent,type)
    {
        cc.log("this.waitReqCount:",this.waitReqCount);
        cc.log("this.waitlayer",this.waitlayer);        
        if (this.IsWaitRefZero() && this.waitlayer == null)
        {         
            cc.log("pop waitlayer~~");
            cc.log("ShowWaiting",parent);
            this.waitlayer = cc.instantiate(this.prefabWaiting);
            if(this.waitlayer) {
                parent.addChild(this.waitlayer,100);
            }
                     
        }

        this.waitRef[type] = true;
    },

    CloseWaiting(type) {
        this.waitRef[type] = false;
        if(this.waitlayer != null && this.IsWaitRefZero()) {
            this.waitlayer.destroy();
            this.waitlayer = null;            
        } 
    },

    CloseWaiting1()
    {
        if(this.waitlayer != null)
        {
            if(this.waitReqCount > 0)
            {
                this.waitReqCount--;
                if(this.waitReqCount == 0)
                {
                    this.waitlayer.destroy();
                    this.waitlayer = null;
                }
            }
            else
            {
                cc.error("waitlayer is exist but waitreqcount <= 0！！！force fix it~!");
                this.waitlayer.destroy();
                this.waitlayer = null;
                this.waitReqCount = 0;
            }

        }
        else
        {            
            this.waitReqCount = 0;
        }

    },    
    
    setMessageboxPrefab(prefab)
    {
        this.prefabMessagebox = prefab;        
    },

    showMessageBoxWithTwoOption(parent,tips,fnCallback,fnCallbackNo) {
        let messagebox = cc.instantiate(this.prefabMessagebox);
        //cc.log("newFish name:" + newFish.name)
        parent.addChild(messagebox,100); 
        let msgboxscript = messagebox.getComponent("MessageBox");
        msgboxscript.setMessageTips(tips);
        msgboxscript.setCallBackOK(fnCallback);
        msgboxscript.setCallBackCancel(fnCallbackNo);        
    },

    showMessagebox(parent,tips,fnCallback,bOnlyConfirm)
    {
        let messagebox = cc.instantiate(this.prefabMessagebox);
        //cc.log("newFish name:" + newFish.name)
        parent.addChild(messagebox,100); 
        let msgboxscript = messagebox.getComponent("MessageBox");
        msgboxscript.setMessageTips(tips);
        msgboxscript.setCallBackOK(fnCallback);
        msgboxscript.SetConfirmMode(bOnlyConfirm);
    },
    //随机一个bool值
    randomBool()
    {
        return Math.random() > 0.5;
    },

    //把从-0.5~0.5坐标换成屏幕坐标
    convertCoord(pos)
    {
        let windowSize=cc.winSize;
        //cc.log("WinSize width="+windowSize.width+",height="+windowSize.height);
        let x = pos.x * windowSize.width;
        let y = pos.y * windowSize.height;

        return cc.v2(x, y)
    },  
    
    convertPosX(x)
    {
        return x * cc.winSize.width;
    },

    convertPosY(y)
    {
        return y * cc.winSize.height;
    },

    covertTrackCoord(arrPos)
    {

        //let arrRes = new Array(); 
        for(let i=0; i<arrPos.length;++i)
        {
            //arrRes.push(commTools.convertCoord(arrPos[i]));
            arrPos[i].x = this.convertPosX(arrPos[i].x);
            arrPos[i].y = this.convertPosY(arrPos[i].y);
        }

        // for(let i=0;i<arrPos.length;++i)
        // {
        //     //cc.log("converted Res pos",arrRes[i].x,arrRes[i].y);
        //     //cc.log("converted Src Pos",arrPos[i].x,arrPos[i].y);
        // }

        return arrPos;
        
    },         

    revConvertPos(pos)
    {
        let windowSize=cc.winSize;
        //cc.log("WinSize width="+windowSize.width+",height="+windowSize.height);
        let x = pos.x / windowSize.width;
        let y = pos.y / windowSize.height;

        return cc.v2(x, y)        
    },

    revConvertPosX(x)
    {
        return x/cc.winSize.width
    },

    revConvertPosY(y)
    {
        return y/cc.winSize.height
    },

    CalAngel2(sx,sy,tx,ty)
    {      
        //cc.log("sx,sy,tx,ty",sx,sy,tx,ty)  
        let disX = tx - sx;
        let disY = ty - sy;

        //通过两点距离求反正切
        let nRadian = Math.atan2(disY,disX);
        //let nAngel = (Math.PI*2 - nRadian) * (180/Math.PI);
        //let nAngel = (180 * nRadian / Math.PI + 90) % 360;

        let nAngel = nRadian * (180/Math.PI);

        if (nAngel >= 360)
        {
            nAngel -= 360;
        }

        return nAngel;
        //this.node.rotation = nAngel;
    },    

    //跟据两点返回角度
    CalAngel(sx,sy,tx,ty)
    {      
        //cc.log("sx,sy,tx,ty",sx,sy,tx,ty)  
        let disX = tx - sx;
        let disY = ty - sy;

        //通过两点距离求反正切
        let nRadian = Math.atan2(disY,disX);
        let nAngel = (Math.PI*2 - nRadian) * (180/Math.PI);

        //let nAngel = nRadian * (180/Math.PI);

        if (nAngel >= 360)
        {
            nAngel -= 360;
        }

        return nAngel;
        //this.node.rotation = nAngel;
    },

    //将unit8数组转换为int..
    Uint8ArrayToInt(uint8Ary)
    {
        let retInt = 0;
        for(let i= 0;i<uint8Ary.length;i++)
            retInt|=(uint8Ary[i] << (8*(uint8Ary.length-i-1)));

        return retInt;
    },

    //将int转换为uint8数组
    IntToUint8Array (num, Bits)
    {
        let resArry = [];
        let xresArry = [];
        let binaryStr = num.toString(2);
        for(let i=0;i<binaryStr.length;i++)
            resArry.push(parseInt(binaryStr[i]));

        if (Bits) {
            for(let r = resArry.length; r < Bits; r++) {
                resArry.unshift(0);
            }
        }

        let  resArryStr= resArry.join("");
        for(let j=0;j<Bits;j+=8)
            xresArry.push(parseInt(resArryStr.slice(j,j+8),2));

        return xresArry;
    },

    //随机取得玩家ID，调试用
    GetPlayerIdRandom()
    {
        //模拟玩家ID，随机取一个
        //let arrPlayerId = ["sking2018","lilith","sking2020"];
        //let index = Math.floor(Math.random() * 3);
        //cc.log("this index is",index);
        //return arrPlayerId[index];
        return "510271922";
    }
})

module.exports = new CommTools();