import { msg } from "./proto/proto_cdx_msg"

class NewClass {
    // 玩家信息
    UserInfo: msg.IPlayerInfo = null;
    // 房间数据
    RoomData: msg.IRoomData = null;
    // 玩家数据
    PlayerData: msg.IPlayerData = null;
    // 桌面玩家
    TablePlayer: msg.IPlayerData[] = null;

    SetUserInfo(data: msg.IPlayerInfo) {
        this.UserInfo = data;
    }
    SetRoomData(data: msg.IRoomData) {
        // 更新房间数据
        this.RoomData = data;
        // 更新玩家列表
        for (let i = 0; i < this.RoomData.playerData.length; i++) {
            if (this.RoomData.playerData[i] != null && this.RoomData.playerData[i].playerInfo.Id == this.UserInfo.Id) {
                this.PlayerData = this.RoomData.playerData[i]
            }
        }
        // 更新桌面玩家
        for (let i = 0; i < this.RoomData.tablePlayer.length; i++) {
            for (let i = 0; i < this.RoomData.playerData.length; i++) {
                if (this.RoomData.tablePlayer[i] != null && this.RoomData.playerData[i] != null) {
                    if (this.RoomData.tablePlayer[i].playerInfo.Id ==  this.RoomData.playerData[i].playerInfo.Id) {
                        this.RoomData.tablePlayer[i] = this.RoomData.playerData[i]
                    }
                }
            }
        }
    }

    SetPlayerData(data: msg.IPlayerData) {
        this.PlayerData = data;
    }
    SetTablePlayer(data: msg.IPlayerData[]) {
        this.TablePlayer = data;
    }

    // 随机值
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 公用去除小数点后两位方法
     * 使用方法   将数字转换为string
     * let gold = Storage.PlayerData.chips
     * Dtext.string =  gold.replace(dzpk_Storage.decimals, "$1");
     */
    decimals = /([0-9]+.[0-9]{2})[0-9]*/;

    /**
     * 金币数值若小数点后为0,则不显示小数点 
     * 规则：请以后台所显示的金额小数点后第7位四舍五入到第6位，然后截取小数点后二位
     * @param coins 用户金币
     */
    ShowMoney(coins: number): string {
        let coinsStr = Number(coins).toFixed(3).slice(0, -1)
        return coinsStr;
        
    }
    
    ShowFixed2(coins: number): string {
        let coinsStr = coins.toFixed(2).slice(0, -1)
        let value = Number(coinsStr).toFixed(3).slice(0, -1)
        return value;
    }

    ShowAddBet(coins: number): string {
        let coinsStr = coins.toFixed(6);

        if (coinsStr.indexOf('.') > -1) {
            let coinsArr = coinsStr.split('.');
            let decimalStr = coinsArr[1];
            if (Number(decimalStr) == 0) {
                coinsStr = coinsArr[0];
            }
        }
        if (Number(coinsStr) < 0) {
            coinsStr = '0';
        }else{
            //正则 公式      /([0-9]+.[0-9]{2})[0-9]*/;
            coinsStr = coinsStr.replace(this.decimals, "$1")
        }
        return coinsStr;
    }

    GetPlayerHead(head: string) {
        let headIndex: string[] = head.split(".");
        let headString: string = headIndex[0]
        return headString 
    }

    // 玩家头像加载
    loadSpriteAtlas(node: any, url: string) {
        if (url == '' || url == null) {
            console.log("资源名不能为空！");
            return;
        }

        let index: number = parseInt(url);
        index %= 10;

        let spr: cc.Sprite = node.getComponent(cc.Sprite);
        cc.resources.load("head/im_head", cc.SpriteAtlas, function (err, altas) {
            if (err) {
                console.log("图集资源加载失败！");
                console.log("资源路径！", index);
                return;
            }
            spr.spriteFrame = altas.getSpriteFrame("Avatar"+index);
        });
    }
}

export default new NewClass