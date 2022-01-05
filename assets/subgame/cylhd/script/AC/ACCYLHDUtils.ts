import * as ACC from "./ACCYLHDCom";
import * as Conf from "../CYLHDStateConfig"

module AGame {

	export class Utils {

		static timeStampMilSec() :number {
			// let date2 = '2019-05-16 12:00'
			// date2 = date2.replace(/-/g, '/')
			// return new Date().getTime(date2
			return new Date().getTime() - (this.clientTimeDelay*1000);//(new Date()).valueOf();
		}
		
		static timeStampSec() :number {
			return parseInt(this.timeStampMilSec()/1000+"");
		}

		static clientTimeDelay:number = 0;
		static adjustTimeStamp(ts:number) {
			if(!ts)	return;
			const tc = parseInt((new Date().getTime())/1000+"");
			this.clientTimeDelay = tc - ts;
			// cc.log("delay = ", ts, tc, this.clientTimeDelay);
		}

		static secondsPassedFromSecStamp(nSecStamp:number) :number {
			return this.timeStampSec()-nSecStamp;
		}

		static toFixed2(num:number): string {
			return num.toFixed(2);
		}

		static transformPosToCC(pt:{x:number,y:number}) {
			return {x:pt.x, y:Conf.AppConfig.StageTargetSize.height-pt.y};
		}

		static distTwoPoint(p1:ACC.Point, p2:ACC.Point) {
			var dx = Math.abs(p2.x - p1.x);
		    var dy = Math.abs(p2.y - p1.y);
		    var dis = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
			return parseInt(dis+"");
		}
		
		static calcuteTimeByDistance(nDist:number, speed:number) {
			return nDist/speed;
		}

		static cloneOneArr(arr: any[]) {
			return arr.slice();
		}
		
		static paramUrl = () => {
			var url = window.location.search //获取url中"?"符后的字串 ('?modFlag=business&role=1')
			var theRequest = {};//new Object()
			if (url.indexOf('?') !== -1) {
				var str = url.substr(1) //substr()方法返回从参数值开始到结束的字符串；
				var strs = str.split('&')
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
				}
			}
			return theRequest
		}
		
		/**
		 * 切换图片
		 * @param node 图片（node节点）
		 * @param url  资源地址 "路径加资源名"
		 */
		static loadSpriteFrame(node: any, url: string) {
			if(cc.isValid(node))return;
			let spr = node.getComponent(cc.Sprite);
			//固定值对应（加载资源地址，类型，回调）

			cc.resources.load(url, cc.SpriteFrame, function (err, spriteFrame) {
				if (err) {
					console.error('图片加载错误: url = ', url);
					return;
				}
				spr.spriteFrame = spriteFrame;
			});
		}
		 
		/**
		 * //闪烁特效
		 * @param i 是要闪硕的节点
		 */
		static blink(i) {
			let light = i;
			var seq = cc.repeat(
				cc.sequence(
					cc.fadeTo(0.5, 0),
					cc.fadeTo(0.5, 255),
				), 3);
			light.runAction(seq)
	
		}
		
	}
}

export default AGame.Utils;
