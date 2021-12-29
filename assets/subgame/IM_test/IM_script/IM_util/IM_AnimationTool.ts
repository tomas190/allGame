//动作工具类
import DataTool from "./IM_DataTool";

class AnimationTool {
    /**
     * 随机创建一张扑克
     * @param pockerPrefabNode 扑克实例预制体
     * @param target 扑克动作监听目标
     * @param pockerPrefabClass 扑克预制体类
     * @param callback 扑克牌大小回调
     */
    createPockerRandomly(pockerPrefabNode: cc.Node, target, pockerPrefabClass, callback: Function) {
        //显示扑克牌背面
        pockerPrefabClass.changePockerBackStatus(1);
        let action1 = cc.scaleTo(0.13, 0, 0.7);
        let action2 = cc.scaleTo(0.13, 0.7, 0.7);
        pockerPrefabNode.runAction(cc.sequence(
            action1,
            action2,
            cc.callFunc(() => {
                pockerPrefabClass.changePockerBackStatus(0);
                callback();
            }, target)
        ));
    }

    /**
     * 赌神星星抛物线
     * @param t 运动时间
     * @param startPoint 开始位置
     * @param endPoint 结束位置
     * @param height 运动高度
     * @param angle 角度
     */
    createStarMoveAction(t, startPoint, endPoint, height, angle) {
        // 把角度转换为弧度
        let radian = angle * 3.14159 / 180;
        // 第一个控制点为抛物线左半弧的中点
        let q1x = startPoint.x + (endPoint.x - startPoint.x) / 4;
        let q1 = cc.v2(q1x, height + startPoint.y + Math.cos(radian) * q1x);

        // 第二个控制点为整个抛物线的中点
        let q2x = startPoint.x + (endPoint.x - startPoint.x) / 2;
        let q2 = cc.v2(q2x, height + startPoint.y + Math.cos(radian) * q2x);
        // 曲线配置
        return cc.bezierTo(t, [q1, q2, endPoint]).easing(cc.easeInOut(t));
    }

    /**
     * 
     * @param chipPrefabNode 实例化筹码预制体节点 
     * @param currentBettingTableNode 当前下注桌面
     * @param index 筹码所在桌面下标
     */
    bettingChipMoveAction(chipPrefabNode: cc.Node, currentBettingTableNode: cc.Node, index: number) {
        //获取随机数
        //x,y坐标增量
        let addX = 0;
        let addY = 0;

        //当是庄/闲时
        if (index === 0 || index === 4) {
            addX = DataTool.countRandomAction(70, -70);
            addY = DataTool.countRandomAction(88, -110);
        } else if (index === 1 || index === 2) {
            addX = DataTool.countRandomAction(50, -50);
            addY = DataTool.countRandomAction(20, -45);
        } else if (index === 3) {
            addX = DataTool.countRandomAction(120, -120);
            addY = DataTool.countRandomAction(20, -40);
        }
        //需要转坐标,不在同一个节点
        let tablePosition = currentBettingTableNode.parent.convertToWorldSpaceAR(currentBettingTableNode.position)
        tablePosition = chipPrefabNode.parent.convertToNodeSpaceAR(tablePosition);
        //x,y在桌面的位置
        let x = tablePosition.x + addX;
        let y = tablePosition.y + addY;
        let changePosition = cc.v2(x, y);

        chipPrefabNode.runAction(cc.sequence(
            cc.moveTo(0.5, changePosition),
            cc.scaleTo(0.2, 1.1, 1.1),
            cc.scaleTo(0.2, 1, 1)
        ))
    }

    /**
     * 赌神星星动画
     * @param starFlashFabNode 闪烁预制体实例
     * @param currentBettingTableNode 目标节点
     * @param index 当前投注桌面下标
     * @param callback 回调
     */
    godStarMoveAction(starFlashFabNode: cc.Node, currentBettingTableNode: cc.Node,
        index: number, callback: Function) {

        let starStartPoint = cc.v2(starFlashFabNode.x, starFlashFabNode.y);
        //如果是赌神,记录当前点击的星星的坐标
        let endDushenStarY = currentBettingTableNode.height / 2 - 20;
        if (index == 1 || index == 2) {
            endDushenStarY += 140;
        } else if (index == 0) {
            endDushenStarY += 70;
        } else if (index == 4) {
            endDushenStarY += 65;
        }
        let dushenStarEndPosition = cc.v2(currentBettingTableNode.x, endDushenStarY);

        let endPoint = dushenStarEndPosition;
        let height = starStartPoint.y - endPoint.y;
        let randomAngle = DataTool.countRandomAction(90, 60);
        let moveTime = 2;
        if (index == 3) {
            moveTime = 2.5;
            randomAngle = 90;
            height -= 80;
        } else if (index == 4) {
            randomAngle = DataTool.countRandomAction(90, 80);
        } else if (index == 1 || index == 2) {
            randomAngle = 90;
        }

        starFlashFabNode.runAction(cc.sequence(
            //星星抛物线动作
            this.createStarMoveAction(moveTime, starStartPoint, endPoint, height, randomAngle),
            cc.callFunc((sender, endPoint) => {
                callback(endPoint);
            }, this, endPoint)
        ));
    }

    /**
     * 回收筹码动作
     * @param chipPrefabArr 回收筹码数组
     * @param endPosition 回收筹码位置
     * @param callback 回收筹码动作回调
     */
    bettingChipRecycleAction(chipPrefabArr: cc.Node[], endPosition: cc.Vec2, callback: Function) {
        for (let i = 0; i < chipPrefabArr.length; i++) {
            const chipPrab = chipPrefabArr[i];
            if (chipPrab) {
                chipPrab.runAction(cc.sequence(
                    cc.moveTo(0.5, endPosition),
                    cc.callFunc((sender, chipPrab) => {
                        callback(chipPrab);
                    }, this, chipPrab)
                ))
            }
        }
    }

    /**
     * 获胜或失败的飘分动作
     * @param winOrLoseNode 获胜或失败节点
     * @param isCivilian 是否是平民
     * @param callback 动作执行完成后的回调
     */
    winOrLoseCoinsAction(winOrLoseNode: cc.Node, isCivilian, callback) {
        let startPoisiton = winOrLoseNode.position;
        const addY = isCivilian ? 60 : 100;
        winOrLoseNode.runAction(
            cc.sequence(
                cc.moveTo(1, startPoisiton.x, startPoisiton.y + addY),
                cc.callFunc(() => {
                    callback();
                }, this)
            )
        )
    }

    /**
     * 玩家投注时动作
     * @param playerNode 玩家节点
     * @param callback 回调方法
     */
    playerNodeBettingAction(playerNode: cc.Node, callback: Function) {
        const startPoisiton = playerNode.position;
        playerNode.runAction(
            cc.sequence(
                cc.moveTo(0.1, startPoisiton.x + 10, startPoisiton.y),
                cc.moveTo(0.1, startPoisiton),
                cc.callFunc(() => {
                    callback();
                })
            )
        )
    }

}
export default new AnimationTool();