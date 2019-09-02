//这个类用来存存调试信息。。显示在调试面板上
var DebugManager = cc.Class({
    ctor()
    {
        cc.log("this instance of DebugManager");
        this.DebugPanelPrefab = null;
        this.DebugInfoList = [];
        this.DebugPanelInstance = null;
        this.DebugPanelScript = null;
        this.bShowDebug = false;
    },    

    setDebugPanelPrefab(prefab)
    {
        this.DebugPanelPrefab = prefab;
    },
    
    DebugInfo(info)
    {
        cc.log("DebugInfo:",info);
        cc.log("arguments length",arguments.length);
        let finaltxt = "";
        for(let i in arguments) {
            finaltxt += arguments[i];
            finaltxt += "  ";
        }
        
        this.DebugInfoList.push(finaltxt);
        this.RefreshInfo();
    },

    GetShowInfo() 
    {
        let allshow = "";
        for(let i in this.DebugInfoList)
        {
            allshow += String(this.DebugInfoList[i]);
            allshow += '\n';
        }

        return allshow;
    },

    SetDebugInfo(info)
    {
        this.DebugPanelScript.SetDebugInfo(info);
    },

    RefreshInfo()
    {
        if(this.bShowDebug && this.DebugPanelScript)
        {
            this.DebugPanelScript.SetDebugInfo(this.GetShowInfo());
        }
    },

    PopDebugPanel(root)
    {
        this.DebugPanelInstance = cc.instantiate(this.DebugPanelPrefab);
        this.bShowDebug = true;
        root.addChild(this.DebugPanelInstance,50);
        this.DebugPanelScript = this.DebugPanelInstance.getComponent("DebugPanel");
        this.RefreshInfo();
    },

    CloseDebugPanel()
    {
        if(this.DebugPanelInstance)
        {
            this.DebugPanelInstance.destroy();
        }        
    }

})

module.exports = new DebugManager();