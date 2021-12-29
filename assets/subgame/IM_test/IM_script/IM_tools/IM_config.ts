export const app = {
    Version: "1.0.0",
    IconPath: "",
    GameKind: "NewIM",
    UserID: '785940376',
    Password: "123456",
    GameID: "5b1f3a3cb76a591e7f251721",
    //客服账号:  
    // 444244122
    // 518738112

    // 玩家账号:
    // 669072170
    // 208947531
    // 390355306
    // 密码:123456

    //Pre: ws://18.176.74.76:12352  im.lymrmfyp.com
    //Dev: im.539316.com  http://im.539316.com/im
    //online : http://im1.whhclsb.com  或者  http://im2.ncpxnjh.com/

    // cc.gg.global.socket = "ws://18.176.74.76:12352";
    // cc.gg.global.file = "http://18.176.74.76:12352/upload";
    ServerURL: "ws://im.lymrmfyp.com",
    UploadImgURL:"http://im.lymrmfyp.com/im/api/upload",
    AppImgUrl:"http://im.lymrmfyp.com",
    AppImgPath:"/im/api/file/"
};
export const postMsg = {
    /** 脚本加载完成后通过window.postMessage发送 */
    CLIENT_LOAD: "__loading",
    /** 服务器连接成功后通过window.postMessage发送 */
    CLIENT_ENTER: "__enter",
    /** 游戏登陆成功后通过window.postMessage发送 */
    CLIENT_DONE: "__done",
    /** 用户确认退出游戏返回大厅后通过window.postMessage发送 */
    CLIENT_RETURN: "__back",
    /** 资源加载进度 */
    CLIENT_PROGRESS: "__progress",
};
export const audios = {
    BACKGROUND: "music_background_mp3",
    NEW_RED_PACK: "effect_new_pack_mp3",
    EFFECT_DRUM: "effect_drum_mp3",
    EFFECT_CLICK: "effect_click_mp3",
    EFFECT_BOOM: "effect_boom_mp3",
    EFFECT_OPEN: "effect_open_mp3",
};
