//充值首页
import { Language_pay } from "./../language/payLanguage";
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    app= null
    onLoad() {
        //渠道id 品牌对照
        //package_id = 1 (test)
        //package_id = 2 (debi)
        //package_id = 3 (xingba)
        //package_id = 6 (nineone)
        //package_id = 8 (xinsheng)
        //package_id = 9 (xingui)
        //package_id = 10 (fuxin)
        //package_id = 11 (xinhao)
        //package_id = 12 (xinlong)
        //package_id = 13 (huangshi)
        //package_id = 15 (juding)
        //package_id = 16 (ninetwo)
        //package_id = 18 (huaxing)
        //package_id = 20 (wansheng)
        //package_id = 21 (tianqi)
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.loadBundle(Language_pay.Lg.getBundleName(),"Prefab/Recharge")
    }
    loadBundle(bundleName,url){
        cc.assetManager.loadBundle(bundleName, (err, bundle) => {
            if(err){
                console.log('loadBundle:',bundleName,"失败",err)
                return
            }
            bundle.load(url,cc.Prefab,(err,Recharge)=>{
                if(err){
                    cc.log("Prefab error:",err)
                    return
                }
                if(!(Recharge instanceof cc.Prefab)){
                    cc.log("Prefab error");
                }else{
                    console.log("loadPrefab true",url)
                    var node = cc.instantiate(Recharge)
                    cc.find("Canvas").addChild(node)
                }
            })
        });
    }
    onDestroy(){

    }
}
