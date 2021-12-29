cc.Class({
	extends    : cc.Component,

	properties : {},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {},
	setLabels  : function(labels) {
		for (let i = 1; i <= 6; i++) {
			this.node.getChildByName(`cell${i}`).getComponent("cc.Label").string =
				labels[`cell${i}`];
		}
	},
	start() {},

	// update (dt) {},
});
