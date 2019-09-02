var CResManager = cc.Class({
    //资源管理类，实现读取资源GetRes（如果没有资源则先load），引用计数(在有使用的地方主动Retian,当不再引用时Release,引用降为零则释放资源)
    ctor()
    {
        cc.log("this instance of CResManager");

        //引用的资源记录
        this.mapResource = {}
        //基础资源引用记录（像诸如不同的prefab等资源可能引用相同的png）
        this.mapBaseRes = {}
    },
        
    LoginRes(oResObj) {
        let deps = cc.loader.getDependsRecursively(oResObj);
        for(let i in deps) {
            //cc.log("baseres:",i);
            let one = deps[i];
            //cc.log("baseres:",one);
            this.mapBaseRes[one] = 0;
        }

        cc.log("mapBaseRes",this.mapBaseRes);
    },


    RetianRes(oResObj) {
        let deps = cc.loader.getDependsRecursively(oResObj);
        for(let i in deps) {
            //cc.log("baseres retian:",i);
            let one = deps[i];
            //cc.log("baseres:",one);
            //cc.log("this.mapBaseRes[one]",this.mapBaseRes[one]);
            if(this.mapBaseRes[one] || this.mapBaseRes[one] == 0) {
                //cc.log("this.mapBaseRes[one]",this.mapBaseRes[one]);
                this.mapBaseRes[one]++;
            }
        }

        cc.log("mapBaseRes",this.mapBaseRes);
    },

    //callback是可选项，如果有callback函数，则传入读取的sprite执行，并且修改引用计数
    LoadSpriteFrame(sRes,callback) {
        if(this.mapResource[sRes] && this.mapResource[sRes].SpriteFrame) {
            //cc.log(sRes + "is exsit~!!refnum is" + this.mapResource[sRes].RefNum);
            if(callback) {
                this.RetianRes(this.mapResource[sRes].SpriteFrame);
                this.mapResource[sRes].RefNum++;
                callback(this.mapResource[sRes].SpriteFrame)
            }
        } else {
            let self = this;
            self.mapResource[sRes] = {}
            self.mapResource[sRes].bReady = false;
            cc.loader.loadRes(sRes, cc.SpriteFrame, function (err, spriteFrame) {
                if(err) {
                    cc.log("read resource err:",err);
                } else {     
                    //cc.log("LoadSpriteFrame 111111111")               
                    self.mapResource[sRes].SpriteFrame = spriteFrame;
                    self.mapResource[sRes].RefNum = 0;
                    self.mapResource[sRes].bReady = true;
                    //cc.log("LoadSpriteFrame 222222222222")               
                    self.LoginRes(spriteFrame);
                    if(callback) {
                        self.mapResource[sRes].RefNum = 1;
                        self.RetianRes(spriteFrame);
                        callback(spriteFrame)
                    }
                }            
            })
        }
    },

    GetSpriteFrame(sRes) {
        if(this.mapResource[sRes] && this.mapResource[sRes].bReady) {
            return this.mapResource[sRes].SpriteFrame;
        }
    },

    LoadRes(sRes,callback) {
        if(this.mapResource[sRes] && this.mapResource[sRes].ResObj) {
            //cc.log(sRes + "is exsit~!!refnum is" + this.mapResource[sRes].RefNum);
            if(callback) {
                this.RetianRes(this.mapResource[sRes].ResObj);
                this.mapResource[sRes].RefNum++;
                callback(this.mapResource[sRes].ResObj);
            }
        } else {
            let self = this;
            self.mapResource[sRes] = {}
            self.mapResource[sRes].bReady = false;
            cc.loader.loadRes(sRes, function (err, oObj) {
                if(err) {
                    //cc.log("read resource err:",err);
                } else {          
                    //cc.log("222222222222 loadres oObj",oObj);  
                    self.mapResource[sRes].ResObj = oObj;
                    self.mapResource[sRes].RefNum = 0;
                    self.mapResource[sRes].bReady = true;
                    //cc.log("444444444444444 loadres oObj",oObj);  
                    self.LoginRes(oObj);
                    if(callback) {
                        self.RetianRes(oObj);
                        self.mapResource[sRes].RefNum = 1;
                        callback(oObj);

                    }                    
                }            
            })           
    
        }
    },

    GetRes(sRes) {
        if(this.mapResource[sRes] && this.mapResource[sRes].bReady) {
            return this.mapResource[sRes].ResObj
        } 
    },

    Retian(sRes) {
        if(this.mapResource[sRes] && this.mapResource[sRes].bReady) {
            this.mapResource[sRes].RefNum++;
        }
    },

    //释放所有资源，在切换回房间列表界面调用
    ReleaseAll() {
        for(let i in this.mapBaseRes) {
            this.mapBaseRes[i] = 0;
        }

        for(let sRes in this.mapResource) {
            this.mapResource[sRes].RefNum = 1;
            this.Release(sRes);
        }
    },

    ReleaseBaseRes(oObj) {
        let deps = cc.loader.getDependsRecursively(oObj);
        //cc.log("release res",deps);
        //cc.log("mapBaseRes",this.mapBaseRes);
        for(let i in deps) {
            let one = deps[i];
            if(this.mapBaseRes[one] || this.mapBaseRes[one] > 0) {
                this.mapBaseRes[one]--;
                if(this.mapBaseRes[one] >= 1) {
                    cc.log("this base res",one,"refnum over 1 yet,don't release~!!!",this.mapBaseRes[one]);
                } else {
                    cc.log("release base res",one);
                    cc.loader.release(one);       
                }
            } else {
                cc.log("!!! release base res",one);
                cc.loader.release(one);
            }
        }        
    },

    Release(sRes) {
        if(this.mapResource[sRes] && this.mapResource[sRes].bReady && this.mapResource[sRes].RefNum > 0) {
            this.mapResource[sRes].RefNum--;            
            if(this.mapResource[sRes].RefNum == 0) {
                
                cc.log("Release res",sRes);
                let oTarget = null;
                if(this.mapResource[sRes].ResObj) {
                    oTarget = this.mapResource[sRes].ResObj;
                    this.mapResource[sRes].ResObj = null;
                } else if (this.mapResource[sRes].SpriteFrame){
                    oTarget = this.mapResource[sRes].SpriteFrame;
                    this.mapResource[sRes].SpriteFrame = null;
                }                

                this.mapResource[sRes].bReady = false;
                this.ReleaseBaseRes(oTarget);
            }            
        }
    }
})

module.exports=new CResManager();