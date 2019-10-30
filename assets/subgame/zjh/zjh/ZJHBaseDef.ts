const type = {
    ESW:0,
    SINGLE:1,//单张
    TWAIN:2,//对子
    STRAIGHT:3,//顺子
    FLOWER:4,//金花
    STRAIGHT_FLOWER:5,//顺金
    LEOPARD:6//豹子
}

const ZOrder = {
    BOTTOM:0,
    LOW:250,
    MIDDLE:500,
    HIGH:750,
    TOP:1000
}

const strings = {
    QUIt_TXT:"您正在游戏中,退出将无法加入其它游戏,是否确认退出?",
    MONEY_NOT_ENOUGH:"金币余额不足!!",
    CHAT_FREQUENT:"聊天过于频繁!",
    REPEAT_LOGIN:"账号在其他设备登录!",
    CONTINUE:"您正在炸金花level游戏中，点确定继续游戏",
    CONNECTION_FAILED:"连接失败,点击确定再次重连"
}

const version = "版本号:0.0.7";

const effect = {
    MALE:1,//男音效
    FEMALE:2,//女音效
}

export default {
    CARD_TYPE:type,
    ZOrder:ZOrder,
    LOCAL_TXT:strings,
    VERSION:version,
    CEffect:effect,
} 