
import StateTools from './CYLHDStateTools';

export default class AssistFunc {

	// 设置带背景的头像
	static setHeadIcon(url:string, node:cc.Node, w:number=98, h:number=98) {
		if(cc.isValid(node)){
			if( hqq )
			{
				if( hqq.commonTools )
				{
					if( hqq.commonTools.loadHeadRes )
					{
						hqq.commonTools.loadHeadRes( url , node.getComponent( cc.Sprite ) , w );
					}
				}
			}
		}
	}
	// 设置不带背景的头像
	// static setAlphaHeadIcon(t:cc.SpriteAtlas, url:string, node:cc.Node, w:number=98, h:number=98) {
	// 	if(!cc.isValid(node))return;
	// 	if(!cc.isValid(t))return;
	// 	const ind = StateTools.getUrlHead(url);
	// 	// cc.resources.load("/lhd/head_alpha/im_thead", cc.SpriteAtlas,(err, t)=>{
	// 		var spriteFrame = t.getSpriteFrame("tAvatar"+ind);
	// 		node.width = w;
	// 		node.height = h;
	// 		node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
	// 	// });
	// }
	// 设置不同类型投注筹码的纹理
	// static setJetSprite(ind:number, node:cc.Node) {
	// 	cc.resources.load("/lhd/chips/bet_chip", cc.SpriteAtlas,(err, t)=>{
	// 		var spriteFrame = t.getSpriteFrame("ui_chip_bet_"+ind);
	// 		node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
	// 	});
	// }


	/**
	 * 播放spine动画函数
	 * @param node spine动画节点
	 * @param animName 动画名称
	 * @param loop 是否循环播放动画
	 * @param callback 结束回调
	 */
	static playSpine(node:cc.Node, animName:string, loop:boolean, callback:Function, speed:number=1) :void{
		if(!cc.isValid(node))return;
		let spine = node.getComponent(sp.Skeleton);
		let track = spine.setAnimation(0, animName, loop);
		spine.timeScale = speed;
		if (track) {
			// 注册动画的结束回调
			spine.setCompleteListener((trackEntry, loopCount) => {
				let name = trackEntry.animation ? trackEntry.animation.name : '';
				if (name === animName && callback) {
					callback(); // 动画结束后执行自己的逻辑
				}
			});
		}
	}

}