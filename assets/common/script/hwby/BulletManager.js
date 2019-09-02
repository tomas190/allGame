// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var NoticeDef = require('NoticeDef');
var Notification = require('Notification');

//为了解决其它人子弹命中鱼不消失的问是，还是来个子弹管理器
var BulletManager = cc.Class({

    getClassName()
    {
        return "BulletManager";
    },

    init()
    {
        //存放生存着所有子弹
        this.bulletList = [];
        //子弹Id,持续累加,初始置0，从1开始有效计数
        this.autoId = 0;

        Notification.Regsiter(NoticeDef.ReqLeavaGame,this,this.onClearBullets);

        NoticeDef.ReqLeavaGame
    }, 

    onClearBullets()
    {
        for(let i in this.bulletList) {
            this.bulletList[i].onPlayerLeavaDestroy();
        }

        this.bulletList = [];
    },

    AddBullet(bullet)
    {
        //先自增，有效ID从1开始
        this.autoId++
        bullet.id = this.autoId
        
        this.bulletList[bullet.id] = bullet
        //cc.log("add bullet to list,id is",bullet.id)
    },

    DelBullet(id)
    {
        //cc.log("del bullet from bulletmanager",id)
        let bullet = this.bulletList[id];

        if (bullet) {
            bullet.doBlast();
            
            delete this.bulletList[id];
        }
    }


});

module.exports = new BulletManager();
