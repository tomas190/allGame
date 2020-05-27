var cmd = {}
//订单唯一状态
cmd.transactionStatus = null;
cmd.orderStatus = 0; //9代表截单了
cmd.isConfirmStatus = 12;
cmd.sendCancelTransaction = 12;
cmd.sendBuyerCancelOrder = 24;
cmd.ConfirmCollecting = 13;
cmd.GetBuyerApplyWay = 14
cmd.BuyerApplyConfirm = 15
cmd.sendSellerDunning = 16;
cmd.sendBuyerApplyConfirmAgain = 17;
cmd.SellerReceiveConfirm = 18;
//订单唯一ID  string类型
cmd.order_id = null;
cmd.alertStyle = {
    "-1": {
        "title": "请求失败",
        "text": "服务拥挤 异常请求失败",
        "confirm": "确定",
        "cancel": "返回大厅",
    },
    "-2": {
        title: "异常错误",
        text: "连接数据库失败",
        "confirm": "确定",
        "cancel": "取消",
    },
    "-3": {
        title: "订单通知",
        text: "创建订单失败",
        "confirm": "确定",
        "cancel": "取消"
    },
    "-44": {
        title: "付款失败",
        text: "对方未收到您的付款信息",
        "confirm": "请重试",
        "cancel": "取消"
    },
    "-45": {
        title: "付款失败",
        text: "无法获取对方的付款信息",
        "confirm": "请重试",
        "cancel": "取消"
    },
    "-5": {
        title: "警告",
        text: "获取支付信息失败",
        confirm: "请重试",
        cancel: "取消"
    },
    "-6": {
        title: "警告",
        text: "买家未收到你的收款确认",
        confirm: "请重试",
        cancel: "取消"
    },
    "-8": {
        title: "警告",
        text: "取消订单失败",
        confirm: "重试",
        cancel: "取消"
    },
    "-9": {
        title: "警告",
        text: "您已选择过此流程",
        confirm: "关闭",
        cancel: ""
    },
    "-10": {
        title: "警告",
        text: "复制失败内容为空",
        "confirm": "关闭"
    },
    "-11": {
        title: "警告",
        text: "请选择支付方式",
        "confirm": "关闭"
    },
    "-12": {
        title: "警告",
        text: "请选择商家收款方式",
        "confirm": "关闭"
    },
    "-13": {
        title: "提示",
        text: "此笔订单记录已被您删除",
        "confirm": "关闭"
    },
    "-14": {
        title: "提示",
        text: "此笔订单超过30秒未交易 已关闭",
        "confirm": "关闭"
    },
    "-15": {
        title: "提示",
        text: "取消订单失败",
        "confirm": "关闭"
    },
    "-16": {
        title: "提示",
        text: "此笔订单已被买家取消",
        "confirm": "关闭"
    },
    "-17": {
        title: "警告",
        text: "此笔订单未结束 不允许开启对话模式",
        "confirm": "关闭"
    },
    "-18": {
        title: "警告",
        text: "取消交易失败",
        confirm: "关闭",

    },
    "-20": {
        title: "提示",
        text: "此笔交易已取消",
        confirm: "返回大厅",
    },
    "-21": {
        title: "提示",
        text: "此交易已被系统自动取消",
        confirm: "返回大厅",
    },
    "-22": {
        title: "提示",
        text: " 客服介入 订单冻结 请复制订单号联系客服",
        confirm: "确定 ",
    },
    "-23": {
        title: "提示",
        text: "此交易已被系统自动完成",

    },
    "2": {
        title: "交易取消",
        text: "此笔订单已取消",
        confirm: "确定",
        cancel: "返回大厅"
    },
    "3": {
        title: "交易取消",
        "text": "商家已拒绝 交易取消",
        confirm: "确定",
        cancel: "返回大厅"
    },
    "4": {
        title: "取消交易",
        text: "您确定取消此订单吗?",
        confirm: "确定",
        "cancel": "取消",
    },
    "5": {
        title: "警告",
        text: "此商家无收款数据 请联系新卖家进行交易",
        confirm: "确定",
        cancel: "返回大厅",
    },
    "6": {
        title: "警告",
        text: "系统检测到您暂时没有付款资料 请前往大厅收益中进行绑定",
        confirm: "确定",
        cancel: "取消"
    },

    "11": {
        title: "发送失败",
        text: "重新发送消息？",
        confirm: "重发消息",
        cancel: "取消"
    },
    "12": {
        title: "友情提示",
        text: "订单模式下卖家买家无法使用聊天功能",
        confirm: "确定",
        cancel: 0,
    },
    "13": {
        title: "提示",
        text: "此笔交易买家已拒绝",
        confirm: "确定",
        cancel: 0,
    },
    "8": {
        title: "交易成功",
        text: "交易完成 请退出",
        confirm: " 返回大厅",
        cancel: "多待一会~"
    },
    "9": {
        title: "交易成功",
        text: "交易完成 请退出",
        confirm: " 返回大厅",
        cancel: "多待一会~"
    },
    "10": {
        title: "交易成功",
        text: "交易完成 请不要重复点击",
    },
    "100": {
        title: "删除失败",
        text: "订单未完成 记录不允许删除",
        confirm: " 确定",
        cancel: ""
    },
    "101": {
        title: "网络异常",
        text: "网络环境异常",
        confirm: "确定",
        cancel: "重新载入"
    }
}
module.exports = cmd